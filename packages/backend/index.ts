import fetch from "node-fetch";
import parser from "fast-xml-parser";

type RssResponse = {
  rss: {
    channel: {
      item: Item[];
    };
  };
};

type Item = {
  title: string;
  company: string;
  description: string;
  tags: string;
  location: string;
  pubDate: string;
  guid: number;
  link: string;
  image: string;
};

async function run() {
  const text = await fetch(
    "https://de.indeed.com/rss?q=react&l&ts=1636040362935&rq=1&rsIdx=0&fromage=last&newcount=9087&vjk=1a99d34ad6446e7f",
    {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
      },
    }
  ).then((x) => x.text());

  const jsonObj = parser.parse(text);

  console.log(jsonObj.rss.channel.item);
}

run();
