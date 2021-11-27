import clsx from "clsx";
import Image from "next/image";
import { PropsWithChildren, useCallback } from "react";
import type { Job } from "../types";
import { getDayjs } from "../utils";

export default function JobListing({
  job,
  firstJob,
  preview = false,
}: {
  job: Job;
  firstJob: boolean;
  preview?: boolean;
}) {
  const dayjs = useCallback(getDayjs, []);

  return (
    <a
      className={clsx(
        "relative flex space-x-4 cursor-pointer mx-4 py-2 lg:border lg:rounded-lg lg:p-2",
        {
          "border-t": !firstJob,
          "cursor-default": preview,
          "pointer-events-none": preview,
          "border-b": preview,
        }
      )}
      href={job.link}
    >
      <div className="relative flex items-center">
        <Image
          src={job.image}
          alt="job logo"
          width="43px"
          height="43px"
          className="rounded-full"
        ></Image>
      </div>
      <div className="flex flex-col flex-1">
        <p className="text-small lg:text-lg font-bold text-gray-700 leading-tight lg:leading-normal ">
          {job.title}
        </p>
        <p className="text-xs lg:text-base leading-tight text-primary">
          {job.company}
        </p>
        <p className="flex items-center text-xxs lg:text-xs text-gray-500 mt-1">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 pr-1"
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
          {job.location}
        </p>
        <div className="flex space-x-2 mt-1 lg:hidden">
          {job.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </div>
      </div>

      <div className="flex-1 space-x-2 lg:flex hidden items-center">
        {job.tags.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </div>
      <div className="flex flex-col text-right justify-center">
        <p className="text-xs lg:text-base text-gray-500">
          {dayjs().to(new Date(job.publicationDate))}
        </p>
      </div>
      {preview && (
        <div className="absolute top-0 right-2">
          <p className="text-lg text-gray-400">PREVIEW</p>
        </div>
      )}
    </a>
  );
}

function Tag({ children }: PropsWithChildren<{}>) {
  return (
    <span className="text-xxs lg:text-xs border-gray-700 rounded-md border px-2 uppercase whitespace-nowrap truncate py-[2px] text-white bg-gray-700">
      {children}
    </span>
  );
}
