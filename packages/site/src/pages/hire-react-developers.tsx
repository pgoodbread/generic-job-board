import type aws from "aws-sdk";
import { usePlausible } from "next-plausible";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import JobForm from "../components/JobForm";
import JobInfo from "../components/JobInfoSection";
import JobInfoText from "../components/JobInfoText";
import { NextSeo } from "next-seo";

const CreateJob = () => {
  const plausible = usePlausible();

  return (
    <div className="mt-24 lg:mt-0 mb-20 lg:mb-32">
      <NextSeo
        title="Hire React Developers"
        description="Hire the best react developer talent in the world on React Jobs and reach millions of applicants."
        canonical="https://react-jobs.io/hire-react-developers"
      />
      <Header>
        <div className="flex flex-col items-center border-b pb-4">
          <h1 className="text-primary text-5xl font-bold text-center font-poppins mt-8">
            <Link href="/">
              <a>React Jobs</a>
            </Link>
          </h1>
          <h2 className="flex justify-center text-3xl font-bold text-gray-700 mt-4">
            The React{" "}
            <div className="inline-block mx-2">
              <Image
                src="/react-jobs-logo.png"
                alt="React-Jobs Logo"
                height="40"
                width="40"
              />{" "}
            </div>
            <span></span>
            Job Board
          </h2>
          <p className=" text-xl text-gray-500 text-center mt-3">
            Connecting the{" "}
            <span className="text-gray-700 font-bold">best jobs </span>
            with top{" "}
            <span className="text-primary font-bold">React Developers</span>
          </p>
        </div>
      </Header>
      <div className="flex flex-col lg:flex-row">
        <JobInfoText className="lg:hidden"></JobInfoText>

        <JobForm
          className="flex-1"
          onSubmit={async (values) => {
            plausible("Checkout");
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

        <JobInfo></JobInfo>
      </div>
    </div>
  );
};

export default CreateJob;
