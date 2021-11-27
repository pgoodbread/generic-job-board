import parser from "fast-xml-parser";
import { MongoClient } from "mongodb";
import fetch from "node-fetch";

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
  image: string;
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

function mapIndeed(indeedItem: IndeedItem): Job {
  return {
    _id: indeedItem.guid + "",
    title: indeedItem.title,
    description: indeedItem.description,
    company: "",
    publicationDate: indeedItem.pubDate,
    tags: [],
    location: "",
    link: indeedItem.link,
    image: "",
  };
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
}

run();

async function handleRemoteOk() {
  const rssResponse = await fetchRSS<RemoteOkItem>(
    "https://remoteok.com/remote-react-jobs.rss"
  );

  const jobs: Job[] = rssResponse.rss.channel.item.map(mapRemoteOk);

  await saveJobs(jobs);
}

async function handleIndeed() {
  const rssResponse = await fetchRSS<IndeedItem>(
    "https://de.indeed.com/rss?q=react&l&ts=1636040362935&rq=1&rsIdx=0&fromage=last&newcount=9087&vjk=1a99d34ad6446e7f"
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
