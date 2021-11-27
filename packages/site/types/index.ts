import { FormikHelpers } from "formik";

export type Job = {
  _id: string;
  title: string;
  description: string;
  company: string;
  publicationDate: string;
  tags: string[];
  location: string;
  link: string;
  image: string;
};

export type FormProps<T> = {
  onSubmit: FormikOnSubmitHandler<T>;
  initialValues?: T;
};

export type FormikOnSubmitHandler<T> = (
  values: T,
  formikHelpers: FormikHelpers<T>
) => void | Promise<unknown>;
