import { PreviewJob } from "../types";
import JobListing from "./JobListing";

export default function JobBoard({ jobs }: { jobs: PreviewJob[] }) {
  return (
    <div className="flex flex-col space-y-2">
      {jobs.map((job, index) => {
        return (
          <JobListing job={job} key={index} firstJob={index === 0}></JobListing>
        );
      })}
    </div>
  );
}
