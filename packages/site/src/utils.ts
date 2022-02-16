import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { BaseJob, JobForForm } from "./types";

export function getDayjs(input?: string): Dayjs {
  dayjs.extend(updateLocale);

  dayjs.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s",
      s: "1 h",
      m: "1 h",
      mm: "1 h",
      h: "1 h",
      hh: "%d h",

      d: "1 d",
      dd: "%d d",
      M: "1 m",
      MM: "%d m",
      y: "1 y",
      yy: "%d y",
    },
  });

  dayjs.extend(relativeTime);

  return input ? dayjs(input) : dayjs();
}

export function convertToBaseJob(
  jobForForm: JobForForm,
  sessionId: string
): BaseJob {
  return {
    ...jobForForm,
    tags: jobForForm.tags.split(",").slice(0, 3),
    publicationDate: null,
    description: "",
    email: null,
    sessionId: sessionId,
    image: jobForForm.image.name,
  };
}
