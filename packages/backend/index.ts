import parser from "fast-xml-parser";
import { MongoClient } from "mongodb";
import fetch from "node-fetch";
import wc from "which-country";

require("dotenv").config();

type RssResponse<T> = {
  rss: {
    channel: {
      item: T[];
    };
  };
};

type Job = {
  _id: string;
  title: string;
  description: string;
  company: string;
  publicationDate: string;
  tags: string[];
  location: string;
  link: string;
  image: string | null;
};

type RemoteOkItem = {
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

type IndeedItem = {
  title: string;
  link: string;
  source: "Indeed";
  guid: string;
  pubDate: string;
  description: string;
  "georss:point": string;
};

type RemoteIOItem = {
  title: string;
  link: string;
  guid: string;
  description: string;
  pubDate: string;
};

const taglist = [
  "react",
  "typescript",
  "javascript",
  "nodejs",
  "mongodb",
  "redux",
  "express",
  "graphql",
  "apollo",
  "prisma",
  "nextjs",
  "html",
  "css",
  "sass",
  "scss",
  "less",
  "graphql",
  "ux",
  "cloud",
  "healthcare",
  "tech lead",
  "mobile",
  "full stack",
];

function mapRemoteIO(remoteIOItem: RemoteIOItem): Job {
  return {
    _id: remoteIOItem.guid + "",
    title: remoteIOItem.title,
    description: remoteIOItem.description,
    company: "",
    publicationDate: remoteIOItem.pubDate,
    tags: taglist
      .filter((tag) => remoteIOItem.description.toLowerCase().includes(tag))
      .slice(0, 3),
    location: "worldwide",
    link: remoteIOItem.link,
    image: null,
  };
}

function mapIndeed(indeedItem: IndeedItem): Job {
  return {
    _id: indeedItem.guid + "",
    title: indeedItem.title,
    description: indeedItem.description,
    company: indeedItem.source,
    publicationDate: indeedItem.pubDate,
    tags: taglist
      .filter((tag) => indeedItem.description.toLowerCase().includes(tag))
      .slice(0, 3),
    location: getLocation(indeedItem),
    link: indeedItem.link,
    image: null,
  };
}

function getLocation(indeedItem: IndeedItem): string {
  if (!indeedItem["georss:point"]) {
    return indeedItem.link.match(/l=[^&]+/)![0].substring(2);
  }

  return wc(indeedItem["georss:point"].split(" ").map(Number).reverse());
}

function mapRemoteOk(remoteOkItem: RemoteOkItem): Job {
  return {
    _id: remoteOkItem.guid + "",
    title: remoteOkItem.title,
    description: remoteOkItem.description,
    company: remoteOkItem.company,
    publicationDate: remoteOkItem.pubDate,
    tags: remoteOkItem.tags.split(","),
    location: remoteOkItem.location,
    link: remoteOkItem.link,
    image: remoteOkItem.image,
  };
}

async function run() {
  handleIndeed();
  handleRemoteOk();
  handleRemoteIO();
}

run();

async function handleRemoteIO() {
  const rssResponse = await fetchRSS<RemoteIOItem>(
    "https://s3.remote.io/feed/rss.xml"
  );

  const jobs: Job[] = rssResponse.rss.channel.item
    .filter((x) => x.description.toLowerCase().includes("react"))
    .map(mapRemoteIO);

  await saveJobs(jobs);
}

async function handleRemoteOk() {
  const rssResponse = await fetchRSS<RemoteOkItem>(
    "https://remoteok.com/remote-react-jobs.rss"
  );

  const jobs: Job[] = rssResponse.rss.channel.item.map(mapRemoteOk);

  await saveJobs(jobs);
}

async function handleIndeed() {
  const rssResponse = await fetchRSS<IndeedItem>(
    "https://www.indeed.com/rss?q=react"
  );

  const jobs: Job[] = rssResponse.rss.channel.item.map(mapIndeed);

  await saveJobs(jobs);
}

async function fetchRSS<T>(url: string): Promise<RssResponse<T>> {
  const text = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
    },
  }).then((x) => x.text());

  return parser.parse(text);
}

async function saveJobs(jobs: Job[]) {
  const client = new MongoClient(process.env.MONGO_URI!);

  try {
    await client.connect();

    const db = client.db("generic_job_board");
    const collection = db.collection("jobs");

    await collection.bulkWrite(
      jobs.map((job) => {
        return {
          updateOne: {
            filter: { _id: job._id },
            update: { $set: job },
            upsert: true,
          },
        };
      }),
      { ordered: false }
    );
  } finally {
    await client.close();
  }
}
