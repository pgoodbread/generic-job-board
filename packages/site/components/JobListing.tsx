import Image from "next/image";
import { useState } from "react";
import type { Job } from "./JobBoard";

export default function JobListing({ job }: { job: Job }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div
        className="flex space-x-2 cursor-pointer"
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className="w-14 h-14 relative">
          <Image src={"/" + job.image} layout="fill" alt="job logo"></Image>
        </div>
        <div className="flex flex-col space-y-1">
          <p className="text-lg">{job.title}</p>
          <div className="flex space-x-2">
            {job.tags.map((tag, index) => (
              <span
                className="text-xxs border-gray-300 rounded-md border px-2 uppercase whitespace-nowrap truncate"
                key={index}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      {showDetails && (
        <div className="flex flex-col">
          <h3 className="text-center">{job.title}</h3>
          <p className="">{job.description}</p>
        </div>
      )}
    </>
  );
}
