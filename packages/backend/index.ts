import parser from "fast-xml-parser";
import { MongoClient } from "mongodb";
import fetch from "node-fetch";

require("dotenv").config();

type RssResponse = {
  rss: {
    channel: {
      item: Item[];
    };
  };
};

type Job = {
  _id: string;
  title: string;
  description: string;
  company: string;
  publicationDate: Date;
  tags: string[];
  location: string;
  link: string;
  image: string;
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

// REMOTEOK: https://remoteok.com/remote-react-jobs.rss
// INDEED-DE: https://de.indeed.com/rss?q=react&l&ts=1636040362935&rq=1&rsIdx=0&fromage=last&newcount=9087&vjk=1a99d34ad6446e7f

async function run() {
  const text = await fetch("https://remoteok.com/remote-react-jobs.rss", {
    // const text = await fetch(
    //   "https://de.indeed.com/rss?q=react&l&ts=1636040362935&rq=1&rsIdx=0&fromage=last&newcount=9087&vjk=1a99d34ad6446e7f",
    // {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
    },
  }).then((x) => x.text());

  const jsonObj: RssResponse = parser.parse(text);

  console.log(jsonObj.rss.channel.item);

  const jobs: Job[] = jsonObj.rss.channel.item.map((item) => {
    return {
      _id: item.guid + "",
      title: item.title,
      description: item.description,
      company: item.company,
      publicationDate: new Date(item.pubDate),
      tags: item.tags.split(","),
      location: item.location,
      link: item.link,
      image: item.image,
    };
  });

  const client = new MongoClient(process.env.MONGO_URI!);

  try {
    await client.connect();

    const db = client.db("generic_job_board");
    console.log("Connected successfully to server");
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

run();
