import type { InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import JobForm from "../../components/JobForm";

const CreateJob: NextPage<InferGetStaticPropsType<typeof getStaticProps>> =
  ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();
    return (
      <div className="mb-4">
        <Header>
          <div className="flex flex-col items-center border-b pb-4">
            <h1 className="text-primary text-5xl font-bold text-center font-poppins mt-8">
              <Link href="/">
                <a>Reactjobs</a>
              </Link>
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
        </Header>
        <JobForm
          onSubmit={async (values, { setSubmitting }) => {
            console.log("fetiching");
            await fetch("/api/create-job", {
              method: "POST",
              body: JSON.stringify(values),
            });

            router.push("/");

            setSubmitting(false);
          }}
        />
      </div>
    );
  };

export default CreateJob;

export async function getStaticProps() {
  return {
    props: {},
  };
}
