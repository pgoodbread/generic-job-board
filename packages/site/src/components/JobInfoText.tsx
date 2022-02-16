import clsx from "clsx";
import { WithClassname } from "../types";

export default function JobInfoText({ className }: WithClassname) {
  return (
    <div
      className={clsx(
        "text-xl border-b w-full leading-relaxed p-4 lg:py-8 lg:px-6",
        className
      )}
    >
      <p className="text-center">
        Post <span className="text-primary font-bold">Your</span> job now to
      </p>
      <ul className="text-base mt-2 space-y-2 flex flex-col">
        <li className="flex w-full justify-start flex-nowrap">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-primary mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Guarantee to get to the top of the jobboard
        </li>
        <li className="flex w-full justify-start flex-nowrap">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-primary mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Increase visibility
        </li>
        <li className="flex w-full justify-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-primary mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Grow the interest of highlevel react engineers
        </li>
      </ul>
    </div>
  );
}
