import { MongoClient } from "mongodb";
import type { InferGetStaticPropsType, NextPage } from "next";
import Image from "next/image";
import Header from "../components/Header";
import JobBoard, { Job } from "../components/JobBoard";
import Newsletter from "../components/Newsletter";

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  jobs,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <Header>
        <div className="w-16 h-16 relative mx-auto">
          <Image src="/logo.png" alt="logo" layout="fill" />
        </div>
        <div className="m-4">
          <Newsletter></Newsletter>
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
  const uri = process.env.MONGO_URI;

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const collection = client.db("generic_job_board").collection("jobs");
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
