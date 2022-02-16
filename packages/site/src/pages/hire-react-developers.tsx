import type aws from "aws-sdk";
import { usePlausible } from "next-plausible";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import JobForm from "../components/JobForm";
import JobInfo from "../components/JobInfoSection";
import JobInfoText from "../components/JobInfoText";

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
        <div className="flex flex-col items-center border-b lg:space-x-20 py-2 px-4 lg:px-24 lg:flex-row lg:items-center">
          <div className="flex flex-row items-center mb-2 lg:mb-0">
            <div className="hidden lg:block lg:-ml-1 lg:mr-4">
              <Image
                src="/react-jobs-logo.png"
                alt="React-Jobs Logo"
                height="80"
                width="80"
              />
            </div>

            <div className="lg:hidden mr-2">
              <Image
                src="/react-jobs-logo.png"
                alt="React-Jobs Logo"
                height="40"
                width="40"
              />
            </div>

            <h1 className="text-primary text-2xl lg:text-3xl font-bold text-center font-poppins">
              <Link href="/">
                <a>React Jobs</a>
              </Link>
            </h1>
          </div>

          <h2 className="flex justify-center text-3xl lg:text-4xl font-bold text-gray-700">
            Hire React Developers
          </h2>
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
