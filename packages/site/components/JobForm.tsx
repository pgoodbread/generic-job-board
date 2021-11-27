import { Form, Formik, FormikHelpers } from "formik";
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
    tags: [],
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
  const previewJob = generateJobPreview(initialValues);
  console.log(previewJob);
  return (
    <div className="relative">
      <Formik
        initialValues={initialValues}
        validationSchema={JobValidation}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, handleBlur, handleChange, values }) => (
          <Form className="flex flex-col justify-center mt-4 md:mt-12 mx-4 md:w-1/2 md:mx-auto">
            <FormInput name="companyName" type="text" />
            <FormInput name="companyLogo" type="file" />
            <FormInput name="jobTitle" type="text" />
            <FormInput name="location" type="text" />
            <FormInput name="tags" type="text" />
            <FormInput name="jobPostingURL" type="url" />

            <ButtonStyle>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </ButtonStyle>
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

type JobForForm = Omit<Job, "_id" | "publicationDate" | "description">;

function generateJobPreview(initialFormJob: JobForForm): JobForForm {
  return {
    title: initialFormJob.title || "Senior React Developer",
    company: initialFormJob.company || "Example Company",
    image: initialFormJob.image || "/favicon.ico",
    location: initialFormJob.location || "Remote, Worldwide",
    tags: initialFormJob.tags.length
      ? initialFormJob.tags
      : ["React", "TypeScript", "NodeJS"],
    link: initialFormJob.link || "",
  };
}
