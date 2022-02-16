import * as yup from "yup";

export const JobValidation = yup.object({
  title: yup.string().required("Job Title is required").max(200, "Too long"),
  company: yup.string().required("Company is required").max(200, "Too long"),
  tags: yup.string(),
  location: yup.string().required("Location is required"),
  link: yup
    .string()
    .required("Job Posting URL is required")
    .url('Hint: the link must contain "http(s)://"'),
  image: yup
    .mixed()
    .test("fileSize", "File too large", (value) => {
      //smaller than 500kb
      return !value || value.size <= 500000;
    })
    .test("fileFormat", "Unsupported Format", (value) => {
      return (
        !value || ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
      );
    }),
});

export const EmailValidation = yup.object({
  email: yup
    .string()
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Email invalid"
    )
    .required("Email is required"),
});
