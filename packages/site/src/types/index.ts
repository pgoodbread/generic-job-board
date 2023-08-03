import { FormikHelpers } from "formik";

export type Job = {
  _id: string;
  title: string;
  description?: string;
  company: string;
  publicationDate: string | null;
  tags: string[];
  location: string;
  link: string;
  image: string;
  email: string | null;
  sessionId: string | null;
};

export type FormProps<T> = {
  onSubmit: FormikOnSubmitHandler<T>;
  initialValues?: T;
};

export type FormikOnSubmitHandler<T> = (
  values: T,
  formikHelpers: FormikHelpers<T>
) => void | Promise<unknown>;

export type BaseJob = Omit<Job, "_id">;

export type PreviewJob = Omit<BaseJob, "email" | "sessionId"> & {
  publicationDate: string;
  _id: string | null;
};

export type JobForForm = Omit<
  PreviewJob,
  "tags" | "publicationDate" | "image"
> & {
  tags: string;
  image: File;
};

export type WithClassname<T = {}> = T & { className?: string };
