import parser from "fast-xml-parser";
import { MongoClient } from "mongodb";
import fetch from "node-fetch";
import puppeteer from "puppeteer";
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
  originalId: string;
  title: string;
  description: string;
  company: string;
  publicationDate: string;
  tags: string[];
  location: string;
  link: string;
  image: string | null;
  payRange: string | null;
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
  const tagList = taglist
    .filter((tag) => remoteIOItem.description.toLowerCase().includes(tag))
    .slice(0, 3);

  return {
    originalId: remoteIOItem.guid + "",
    title: remoteIOItem.title,
    description: remoteIOItem.description,
    company: "",
    publicationDate: new Date(remoteIOItem.pubDate).toISOString(),
    tags: tagList.length ? tagList : ["react", "javascript"],
    location: "Worldwide",
    link: remoteIOItem.link,
    image: null,
    payRange: null,
  };
}

function mapIndeed(indeedItem: IndeedItem): Job {
  const tagList = taglist
    .filter((tag) => indeedItem.description.toLowerCase().includes(tag))
    .slice(0, 3);

  return {
    originalId: indeedItem.guid + "",
    title: indeedItem.title.split(" -")[0],
    description: indeedItem.description,
    company: indeedItem.source,
    publicationDate: new Date(indeedItem.pubDate).toISOString(),
    tags: tagList.length ? tagList : ["react", "javascript"],
    location: getLocation(indeedItem),
    link: indeedItem.link.replace(/&amp;/g, "&"),
    image: null,
    payRange: null,
  };
}

function getLocation(indeedItem: IndeedItem): string {
  if (!indeedItem["georss:point"]) {
    return indeedItem.link.match(/l=[^&]+/)![0].substring(2);
  }

  return wc(indeedItem["georss:point"].split(" ").map(Number).reverse());
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
  const browser = await puppeteer.launch();

  const scraper = await browser.newPage();
  await scraper.goto("https://remoteok.com/remote-react-jobs");

  const jobs: Job[] = await scraper.evaluate(() => {
    return Array.from(document.querySelectorAll(".job")).map((x) => {
      return {
        company: x.querySelector("[itemprop=name]")?.innerHTML.trim()!,
        title: x.querySelector("[itemprop=title]")?.innerHTML.trim()!,
        originalId: x.getAttribute("data-id")!,
        image: x.querySelector(".logo")?.getAttribute("data-src")!,
        location: x.querySelector(".location")?.innerHTML.includes("💰")
          ? "Worlwide"
          : x
              .querySelector(".location")
              ?.innerHTML.replace(/[^\p{L}\p{N}\p{P}\p{Z}^$\n]/gu, "")
              .trim()!,
        tags: Array.from(x.querySelectorAll(".tags h3")).map((x) =>
          x.innerHTML.trim()
        ),
        publicationDate: x.querySelector("time")?.getAttribute("datetime")!,
        description:
          x.nextElementSibling?.querySelector(".markdown")?.innerHTML!,
        payRange: x.querySelector(".location")?.innerHTML.includes("💰")
          ? x.querySelector(".location")?.innerHTML!
          : x.querySelectorAll(".location")[1]?.innerHTML.includes("💰")
          ? x.querySelectorAll(".location")[1]?.innerHTML!
          : null,
        link: x.querySelector<HTMLLinkElement>(".source > a")?.href || "",
      };
    });
  });

  await browser.close();

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
  if (!jobs.length) {
    return;
  }

  const client = new MongoClient(process.env.MONGO_URI);

  try {
    await client.connect();

    const db = client.db(process.env.MONGO_DATABASE);
    const collection = db.collection("jobs");

    await collection.bulkWrite(
      jobs.map((job) => {
        return {
          updateOne: {
            filter: { originalId: job.originalId },
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
