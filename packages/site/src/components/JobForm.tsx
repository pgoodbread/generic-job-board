import clsx from "clsx";
import { ErrorMessage, Form, Formik, useFormikContext } from "formik";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import FormInput from "./FormInput";
import { JobValidation } from "../lib/validation";
import type {
  FormProps,
  JobForForm,
  PreviewJob,
  WithClassname,
} from "../types";
import ButtonStyle from "./ButtonStyle";
import JobListing from "./JobListing";

export default function JobForm({
  className = "",
  onSubmit,
  initialValues = {
    title: "",
    company: "",
    //@ts-ignore
    image: "",
    location: "",
    tags: "",
    link: "",
  },
}: WithClassname<FormProps<JobForForm>>) {
  const [previewJob, setPreviewJob] = useState(
    generateJobPreview(initialValues)
  );

  return (
    <div className={clsx("relative", className)}>
      <Formik
        initialValues={initialValues}
        validationSchema={JobValidation}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="flex flex-col justify-center">
            <div className="lg:px-24 py-4 px-4">
              <FormInput
                name="title"
                label="Job Title"
                placeholder="Example: 'Senior React Developer'"
                type="text"
              />
              <FormInput
                name="company"
                type="text"
                placeholder="Example: 'Apple', 'Microsoft'"
              />
              <FormInput
                name="location"
                type="text"
                placeholder="Example: 'Remote', 'USA', 'Europe'"
              />
              <FormInput
                name="tags"
                type="text"
                placeholder="Comma-separated - maximum of 3 Tags"
              />
              <FormInput
                name="link"
                label="Job Posting URL"
                type="url"
                placeholder="Example: 'https://company.com/jobs/123'"
              />
              <div className="">
                <div className="flex justify-between w-full mb-2 text-sm">
                  <span className="block text-sm font-medium text-gray-700 capitalize tracking-wide">
                    Company Logo
                  </span>
                  <span className="text-gray-400 font-normal text-sm">
                    Recommended Size: 64x64px
                  </span>
                </div>
                <div className="grid grid-cols-1 space-y-2">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center cursor-pointer">
                      <div className="h-full w-full text-center flex flex-col justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-10 h-10 text-primary group-hover:text-gray-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>

                        <div className="flex justify-center items-center mb-2">
                          {previewJob.image && (
                            <Image
                              className="object-contain rounded-full"
                              src={previewJob.image}
                              alt="Upload image"
                              height={"144px"}
                              width={"144px"}
                            />
                          )}
                        </div>
                        <p className="pointer-none text-gray-500">
                          Drag and drop files here <br /> or{" "}
                          <span className="text-blue-600 hover:underline">
                            select a file
                          </span>{" "}
                          from your computer
                        </p>
                      </div>
                      <input
                        className="hidden"
                        type="file"
                        name="image"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                          setFieldValue("image", event.currentTarget.files![0]);
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <ErrorMessage
                className="text-red-600"
                name="image"
                component="div"
              />
              <UpdatePreview setPreviewJob={setPreviewJob} />
            </div>
            <div className="fixed bg-white w-full z-10 lg:pt-2 md:z-0 lg:bg-gray-100 top-0 lg:bottom-0 lg:top-auto">
              <div className="flex">
                <div className="flex-1 mb-2 lg:mx-[78px]">
                  <JobListing
                    preview={true}
                    firstJob={false}
                    job={previewJob}
                    className="bg-white"
                  ></JobListing>
                </div>
                <div className="w-1/3 hidden lg:flex justify-center my-4 pr-4">
                  <ButtonStyle>
                    <button
                      type="submit"
                      className="disabled:cursor-wait h-auto w-full text-xl flex justify-center items-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 text-white mr-3 -ml-1"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        "Post your Job - 99 $"
                      )}
                    </button>
                  </ButtonStyle>
                </div>
              </div>
            </div>
            <div className="fixed bg-white bottom-0 lg:hidden w-full z-10 lg:pt-2 md:z-0 lg:bg-gray-100 px-4 py-4 border-t">
              <ButtonStyle>
                <button
                  type="submit"
                  className="disabled:cursor-wait h-auto w-full text-xl flex justify-center items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white mr-3 -ml-1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Post your Job - 99 $"
                  )}
                </button>
              </ButtonStyle>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

const UpdatePreview = ({
  setPreviewJob,
}: {
  setPreviewJob: (job: PreviewJob) => void;
}) => {
  const { values } = useFormikContext<JobForForm>();

  useEffect(() => {
    async function setPreview() {
      let fileAsText;
      if (values.image) {
        fileAsText = await readUploadedFileAsText(values.image);
      }

      setPreviewJob(generateJobPreview(values, fileAsText));
    }

    setPreview();
  }, [values, setPreviewJob]);
  return null;
};

function readUploadedFileAsText(inputFile: File): Promise<string> {
  const temporaryFileReader = new FileReader();

  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException("Problem parsing input file."));
    };

    temporaryFileReader.onloadend = () => {
      resolve(temporaryFileReader.result as string);
    };
    temporaryFileReader.readAsDataURL(inputFile);
  });
}

function generateJobPreview(
  initialFormJob: JobForForm,
  file?: string
): PreviewJob {
  return {
    _id: null,
    title: initialFormJob.title || "Senior React Developer",
    company: initialFormJob.company || "Example Company",
    image: file ? file : "",
    location: initialFormJob.location || "Remote, Worldwide",
    tags: initialFormJob.tags.length
      ? initialFormJob.tags.split(",").slice(0, 3)
      : ["React", "TypeScript", "NodeJS"],
    link: initialFormJob.link || "",
    publicationDate: new Date().toISOString(),
    description: "",
  };
}
