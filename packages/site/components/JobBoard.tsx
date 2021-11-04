import JobListing from "./JobListing";

export type Job = {
  name: string;
  text: string;
  tags: string[];
  logo: string;
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
