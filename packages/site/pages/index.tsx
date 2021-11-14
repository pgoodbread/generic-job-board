import type { InferGetStaticPropsType, NextPage } from "next";
import Image from "next/image";
import { MongoClient } from "mongodb";
import { useRef, useState } from "react";
import Header from "../components/Header";
import JobBoard, { Job } from "../components/JobBoard";
import useOutsideClick from "../components/OutsideClick";

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  jobs,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [showSearch, setShowSearch] = useState(false);
  const [tagList, setTagList] = useState<string[]>([]);
  const wrapperRef = useRef(null);

  useOutsideClick(wrapperRef, () => setShowSearch(false));

  return (
    <div>
      <Header>
        <div className="w-16 h-16 relative mx-auto">
          <Image src="/logo.png" alt="logo" layout="fill" />
        </div>
        <div className="relative mx-2 my-6" ref={wrapperRef}>
          <input
            type="text"
            className="rounded-3xl p-3 border-gray-200 border text-xl w-full"
            style={{ outlineColor: "blue" }}
            onFocus={() => setShowSearch(true)}
            onChange={async (event) => {
              if (!event.target.value) {
                setShowSearch(false);
                setTagList([]);
                return;
              }

              const tagList: string[] = await fetch(
                "/api/tags?filter=" + event.target.value
              ).then((x) => x.json());
              setShowSearch(true);
              setTagList(tagList);
            }}
          />
          {showSearch && (
            <div className="absolute bg-white w-full border-gray-200 border px-2 py-2 rounded z-50">
              {tagList.map((tag) => {
                return (
                  <div className="hover:bg-gray-100 cursor-pointer" key={tag}>
                    <p className="py-2">{tag}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Header>

      <section className="flex my-2 flex-col">
        <JobBoard jobs={jobs}></JobBoard>
      </section>

      <footer></footer>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const uri = "mongodb://mongo:mongo@localhost:27017";

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db("generic_job_board");
    console.log("Connected successfully to server");
    const collection = db.collection("jobs");
    const jobs = await collection.find<Job>({}).toArray();
    return {
      props: {
        jobs,
      },
    };
  } finally {
    await client.close();
  }
}
