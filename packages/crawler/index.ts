import fetch from "node-fetch";

async function run() {
  const text = await fetch("https://remoteok.com/remote-react-jobs.rss").then(
    (x) => x.text()
  );
  // @ts-ignore
  text.match(/<item>([\s\S]*?)<\/item>/g).map((x) => {
    console.log(x);
    return x;
  });
}

run();
