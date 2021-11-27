import { Form, Formik, FormikHelpers, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import { JobValidation } from "../lib/validation";
import type { Job } from "../types";
import ButtonStyle from "./ButtonStyle";
import JobListing from "./JobListing";

export default function JobForm({
  initialValues = {
    title: "",
    company: "",
    image: "",
    location: "",
    tags: "",
    link: "",
  },
  onSubmit,
}: {
  onSubmit: (
    values: JobForForm,
    formikHelpers: FormikHelpers<JobForForm>
  ) => void | Promise<unknown>;
  initialValues?: JobForForm;
}) {
  const [previewJob, setPreviewJob] = useState(
    generateJobPreview(initialValues)
  );
  return (
    <div className="relative mb-8">
      <Formik
        initialValues={initialValues}
        validationSchema={JobValidation}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, handleBlur, handleChange, values }) => (
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
            <FormInput name="image" label="Company Logo" type="file" />
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

            <ButtonStyle>
              <button type="submit" disabled={isSubmitting}>
                Checkout
              </button>
            </ButtonStyle>
            <UpdatePreview setPreviewJob={setPreviewJob} />
          </Form>
        )}
      </Formik>

      <div className="fixed bg-white bottom-0 mt-8 w-full pt-2">
        <div className="max-w-4xl md:w-1/2 mb-2 md:mx-auto">
          <JobListing
            preview={true}
            firstJob={false}
            job={{
              _id: "1",
              publicationDate: new Date().toISOString(),
              description: "",
              ...previewJob,
            }}
          ></JobListing>
        </div>
      </div>
    </div>
  );
}

const UpdatePreview = ({
  setPreviewJob,
}: {
  setPreviewJob: (job: BaseJob) => void;
}) => {
  const { values } = useFormikContext<JobForForm>();

  useEffect(() => {
    setPreviewJob(generateJobPreview(values));
  }, [values]);
  return null;
};

type BaseJob = Omit<Job, "_id" | "publicationDate" | "description">;

type JobForForm = Omit<BaseJob, "tags"> & {
  tags: string;
};

function generateJobPreview(initialFormJob: JobForForm): BaseJob {
  return {
    title: initialFormJob.title || "Senior React Developer",
    company: initialFormJob.company || "Example Company",
    image: initialFormJob.image || "/favicon.ico",
    location: initialFormJob.location || "Remote, Worldwide",
    tags: initialFormJob.tags.length
      ? initialFormJob.tags.split(",").slice(0, 3)
      : ["React", "TypeScript", "NodeJS"],
    link: initialFormJob.link || "",
  };
}
