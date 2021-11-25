import { MongoClient } from "mongodb";
import type { InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import Header from "../components/Header";
import JobBoard, { Job } from "../components/JobBoard";
import Newsletter from "../components/Newsletter";

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  jobs,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <Header>
        <div
          style={{
            backgroundImage: "url(background-network.svg)",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className="pb-2 md:pb-[230px]"
        >
          <div className="flex justify-end p-2 md:px-6 ">
            <Link href="/post-job">
              <a className="px-4 py-2 font-medium tracking-wide text-white transition-colors duration-200 transform bg-primary rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
                Post a Job
              </a>
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-primary text-5xl font-bold text-center font-poppins mt-8">
              Reactjobs
            </h1>
            <h2 className="text-3xl font-bold text-gray-700 mt-4">
              The React ⚛️ Job Board
            </h2>
            <p className=" text-xl text-gray-500 text-center mt-3">
              Connecting the{" "}
              <span className="text-gray-700 font-bold">best jobs </span>
              with top{" "}
              <span className="text-primary font-bold">React Developers</span>
            </p>
          </div>
        </div>
        <div className="m-4 md:-mt-52">
          <Newsletter></Newsletter>
        </div>
      </Header>

      <section className="flex my-2 flex-col max-w-4xl mx-auto md:my-0">
        <JobBoard jobs={jobs}></JobBoard>
      </section>
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
    const jobs = await collection
      .find<Job>({})
      .sort({ publicationDate: -1 })
      .limit(50)
      .toArray();

    return {
      props: {
        jobs,
      },
    };
  } finally {
    await client.close();
  }
}
