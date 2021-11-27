import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

export function getDayjs(): Dayjs {
  dayjs.extend(updateLocale);

  dayjs.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s",
      s: "1 h",
      m: "1 h",
      mm: "1 h",
      h: "1 h",
      hh: "%h h",

      d: "1 d",
      dd: "%d d",
      M: "1 m",
      MM: "%d m",
      y: "1 y",
      yy: "%d y",
    },
  });

  dayjs.extend(relativeTime);

  return dayjs();
}
