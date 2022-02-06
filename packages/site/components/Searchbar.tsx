import throttle from "lodash.throttle";
import { useEffect, useState } from "react";

type Props = {
  setJobs: any;
  originalJobs: any;
};

export default function Searchbar({ setJobs, originalJobs }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const search = throttle(async () => {
      if (searchTerm === "") {
        setJobs(originalJobs);
      } else {
        const searchResult = await fetch("/api/search?q=" + searchTerm).then(
          (x) => x.json()
        );

        setJobs(searchResult);
      }
    }, 400000);

    search();
  }, [searchTerm, setJobs, originalJobs]);

  return <input onChange={(e) => setSearchTerm(e.target.value)}></input>;
}
