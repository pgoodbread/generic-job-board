import Image from "next/image";
import type { Job } from "./JobBoard";

export default function JobListing({ job }: { job: Job }) {
  return (
    <a
      className="flex flex-row space-x-2 cursor-pointer mx-2 items-center border-t py-2"
      href={job.link}
    >
      <div className="w-10 h-10 relative">
        <Image
          src={job.image}
          alt="job logo"
          layout="fill"
          className="rounded-full"
        ></Image>
      </div>
      <div className="flex flex-col space-y-1 w-2/3">
        <p className="text-small font-bold">{job.title}</p>
        <p className="text-xs text-gray-500">{job.company}</p>
        <div className="flex space-x-2">
          {job.tags.map((tag, index) => (
            <span
              className="text-xxs border-gray-300 rounded-md border px-2 uppercase whitespace-nowrap truncate py-[2px]"
              key={index}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-end text-right space-y-4">
        <p className="text-xs text-gray-500">29d</p>
        <p className="flex items-center text-xs text-gray-500">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </span>
          Worldwide
        </p>
      </div>
    </a>
  );
}
