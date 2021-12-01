import { ErrorMessage, Form, Formik, useFormikContext } from "formik";
import { ChangeEvent, useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import { JobValidation } from "../lib/validation";
import type { FormProps, JobForForm, PreviewJob } from "../types";
import ButtonStyle from "./ButtonStyle";
import JobListing from "./JobListing";

export default function JobForm({
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
}: FormProps<JobForForm>) {
  const [previewJob, setPreviewJob] = useState(
    generateJobPreview(initialValues)
  );

  return (
    <div className="relative mb-4 md:mb-16">
      <Formik
        initialValues={initialValues}
        validationSchema={JobValidation}
        onSubmit={onSubmit}
      >
        {({
          isSubmitting,
          handleBlur,
          handleChange,
          values,
          setFieldValue,
        }) => (
          <Form className="flex flex-col justify-center mt-4 md:mt-12 mx-4 md:w-1/2 md:mx-auto">
            <FormInput
              name="title"
              label="Job Title"
              hint="Example: 'Senior React Developer'"
              type="text"
            />
            <FormInput
              name="company"
              type="text"
              hint="Example: 'Apple', 'Microsoft'"
            />
            <FormInput
              name="location"
              type="text"
              hint="Example: 'Remote', 'USA', 'Europe'"
            />
            <FormInput
              name="tags"
              type="text"
              hint="Comma-separated - maximum of 3 Tags"
            />
            <FormInput
              name="link"
              label="Job Posting URL"
              type="url"
              hint="Example: 'https://company.com/careers'"
            />
            <div className="mb-4">
              <div className="flex justify-between w-full mb-2 text-sm">
                <span className="text-gray-700 block text-sm font-medium text-gray-700capitalize">
                  Company Logo
                </span>
                <span className="text-gray-400 font-normal text-sm">
                  Recommended Size: 64x64px
                </span>
              </div>
              <div className="flex justify-center">
                <label className="w-full flex flex-col items-center px-2 py-3 bg-white text-primary rounded-lg tracking-wide uppercase border  cursor-pointer hover:bg-primary hover:text-white">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span className="mt-2 text-base leading-normal">
                    Upload Logo
                  </span>

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
              <ErrorMessage
                className="text-red-600"
                name="image"
                component="div"
              />
            </div>

            <ButtonStyle>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex justify-center items-center disabled:cursor-wait"
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
                  "Checkout - 99 $"
                )}
              </button>
            </ButtonStyle>
            <UpdatePreview setPreviewJob={setPreviewJob} />
          </Form>
        )}
      </Formik>

      <div className="fixed bg-white bottom-0 w-full z-10 pt-2 md:z-0 lg:bg-gray-100">
        <div className="max-w-4xl md:w-1/2 mb-2 md:mx-auto">
          <JobListing
            preview={true}
            firstJob={false}
            job={previewJob}
            className="bg-white"
          ></JobListing>
        </div>
      </div>
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
    image: file ? file : "/react-jobs-logo.ico",
    location: initialFormJob.location || "Remote, Worldwide",
    tags: initialFormJob.tags.length
      ? initialFormJob.tags.split(",").slice(0, 3)
      : ["React", "TypeScript", "NodeJS"],
    link: initialFormJob.link || "",
    publicationDate: new Date().toISOString(),
  };
}
