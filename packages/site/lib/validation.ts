import * as yup from "yup";

export const JobValidation = yup.object({
  title: yup.string().required().max(200, "Too long"),
  company: yup.string().required().max(200, "Too long"),
  tags: yup.string(),
  location: yup.string().required(),
  link: yup.string().required().url('Hint: the link must contain "http(s)://"'),
  image: yup.string().required(),
});
