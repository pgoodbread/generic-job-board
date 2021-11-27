import clsx from "clsx";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { EmailValidation } from "../lib/validation";
import { FormProps } from "../types";

type EmailForForm = {
  email: string;
};

export default function Newsletter({
  initialValues = {
    email: "",
  },
}: Pick<FormProps<EmailForForm>, "initialValues">) {
  const [isDisabled, setDisabled] = useState(false);

  async function handleNewletterSignUp(
    values: EmailForForm,
    formik: FormikHelpers<EmailForForm>
  ) {
    setDisabled(true);
    await fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ ...values }),
    });

    formik.resetForm({});
  }

  return (
    <section className="flex flex-col max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 md:flex-row md:h-48">
      <div className="md:flex md:items-center md:justify-center md:w-1/2 md:bg-gray-700 md:dark:bg-gray-800">
        <div className="px-6 py-6 md:px-8 md:py-0">
          <h2 className="text-lg font-bold text-gray-700 dark:text-white md:text-gray-100">
            Sign Up For <span className="text-primary">Project</span> Updates
          </h2>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 md:text-gray-400">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Consectetur obcaecati odio
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center pb-6 md:py-0 md:w-1/2">
        <Formik
          initialValues={initialValues}
          validationSchema={EmailValidation}
          onSubmit={handleNewletterSignUp}
        >
          {({ isSubmitting, handleBlur, handleChange, values }) => (
            <Form className="flex flex-col">
              <ErrorMessage
                className="text-red-600"
                name="email"
                component="div"
              />
              <div className="relative flex flex-col overflow-hidden rounded-lg lg:flex-row">
                <Field
                  className="px-6 py-3 text-gray-700 placeholder-gray-500 bg-white outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />

                <button
                  type="submit"
                  disabled={isDisabled}
                  className={clsx(
                    "px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-200 transform bg-gray-700 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none",
                    { "opacity-50 cursor-not-allowed": isDisabled }
                  )}
                >
                  Subscribe
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
