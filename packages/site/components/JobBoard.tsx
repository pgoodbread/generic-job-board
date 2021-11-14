import JobListing from "./JobListing";

export type Job = {
  _id: string;
  title: string;
  description: string;
  company: string;
  publicationDate: Date;
  tags: string[];
  location: string;
  link: string;
  image: string;
};

export default function JobBoard({ jobs }: { jobs: Job[] }) {
  return (
    <div className="flex flex-col space-y-2">
      {jobs.map((job, index) => {
        return <JobListing job={job} key={index}></JobListing>;
      })}
    </div>
  );
}
