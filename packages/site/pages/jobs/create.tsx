import type aws from "aws-sdk";
import type { InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import JobForm from "../../components/JobForm";

const CreateJob: NextPage<InferGetStaticPropsType<typeof getStaticProps>> =
  ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
            //s3 prefetch
            const { url, fields }: aws.S3.PresignedPost = await fetch(
              `/api/images/upload?file=${values.image.name}`
            ).then((res) => res.json());

            //s3 upload
            const formData = new FormData();

            Object.entries({ ...fields, file: values.image }).forEach(
              ([key, value]) => {
                formData.append(key, value);
              }
            );

            await fetch(url, {
              method: "POST",
              body: formData,
            });

            //checkout
            const { url: sessionUrl }: { url: Location } = await fetch(
              "/api/checkout/session",
              {
                method: "POST",
                body: JSON.stringify({
                  ...values,
                  image: `${url}/${fields.key}`,
                }),
              }
            ).then((res) => res.json());

            window.location = sessionUrl;
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
