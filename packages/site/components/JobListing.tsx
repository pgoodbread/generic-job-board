import clsx from "clsx";
import { JobPostingJsonLd } from "next-seo";
import Image from "next/image";
import { PropsWithChildren } from "react";
import type { PreviewJob } from "../types";
import { getDayjs } from "../utils";

export default function JobListing({
  job,
  firstJob,
  preview = false,
  className,
}: {
  job: PreviewJob;
  firstJob: boolean;
  preview?: boolean;
  className?: string;
}) {
  function createDummyLogoInitials(name: string) {
    return name
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }

  return (
    <>
      <a
        className={clsx(
          "relative flex cursor-pointer mx-4 py-2 lg:border lg:rounded-lg lg:px-4 ",
          {
            "border-t": !firstJob,
            "cursor-default": preview,
            "pointer-events-none": preview,
            "border-b": preview,
          },
          className
        )}
        href={job.link}
        target="_blank noreferrer"
      >
        <div className="flex flex-none items-center mr-4">
          {job.image ? (
            <Image
              src={job.image}
              alt="job logo"
              width="43px"
              height="43px"
              className="rounded-full object-contain"
            ></Image>
          ) : (
            <span className="bg-primary p-2 rounded-full w-11 h-11 text-white flex justify-center items-center">
              {job.company
                ? createDummyLogoInitials(job.company)
                : createDummyLogoInitials(job.title)}
            </span>
          )}
        </div>
        <div className="flex flex-col flex-grow min-w-0 overflow-hidden w-full">
          <p className="text-small lg:text-lg font-bold text-gray-700 leading-tight lg:leading-normal ">
            {job.title}
          </p>
          <p className="text-xs lg:text-base leading-tight text-primary">
            {job.company}
          </p>
          <p className="flex items-center text-xxs lg:text-xs text-gray-500 mt-1 capitalize">
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
              <Tag key={index} first={index === 0}>
                {tag}
              </Tag>
            ))}
          </div>
        </div>

        <div className="flex-1 space-x-2 hidden items-center lg:flex">
          {job.tags.map((tag, index) => (
            <Tag key={index} first={index === 0}>
              {tag}
            </Tag>
          ))}
        </div>
        <div className="flex flex-col flex-none text-right ml-4 min-w-min max-w-sm justify-center">
          <p className="text-xs lg:text-base text-gray-500">
            {getDayjs().to(new Date(job.publicationDate))}
          </p>
        </div>
        {preview && (
          <div className="absolute top-0 right-2">
            <p className="text-lg text-gray-400">PREVIEW</p>
          </div>
        )}
      </a>
      {!preview && (
        <JobPostingJsonLd
          keyOverride={job._id!}
          datePosted={job.publicationDate}
          description={job.description}
          hiringOrganization={{
            name: job.company,
            sameAs: "",
          }}
          title={job.title}
          employmentType="FULL_TIME"
          validThrough={getDayjs(job.publicationDate)
            .add(30, "day")
            .toISOString()}
        />
      )}
    </>
  );
}

function Tag({ children, first }: PropsWithChildren<{ first: boolean }>) {
  return (
    <span
      className={clsx(
        "text-xxs lg:text-xs border-gray-700 rounded-md border px-2 uppercase whitespace-nowrap py-[2px] text-white bg-gray-700",
        {
          truncate: !first,
        }
      )}
    >
      {children}
    </span>
  );
}
