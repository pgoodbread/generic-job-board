import { Form, Formik, FormikHelpers } from "formik";
import FormInput from "../components/FormInput";
import { JobValidation } from "../lib/validation";
import ButtonStyle from "./ButtonStyle";
import type { Job } from "./JobBoard";
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
  return (
    <>
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

      <div>
        <p>Preview:</p>
        <JobListing
          job={{
            ...initialValues,
            _id: "1",
            publicationDate: new Date(),
            description: "",
            image: "/favicon.ico",
          }}
        ></JobListing>
      </div>
    </>
  );
}

type JobForForm = Omit<Job, "_id" | "publicationDate" | "description">;
