import { NextSeoProps } from "next-seo";

const SEO: NextSeoProps = {
  canonical: "https://react-jobs.io",
  titleTemplate: "Reactjobs | %s",
  defaultTitle: "Reactjobs",
  description:
    "Looking for a React Job? ReactJobs connects the best React Jobs with top React Developer talent.",
  openGraph: {
    title: "Reactjobs",
    description:
      "Looking for a React Job? ReactJobs connects the best React Jobs with top React Developer talent.",
    url: "https://react-jobs.io",
    type: "website",
    images: [
      {
        url: "https://react-jobs.io/react-jobs-logo.png",
        width: 1660,
        height: 1660,
        alt: "React Logo with Worker in Center",
      },
    ],
  },
  twitter: {
    cardType: "summary",
    handle: "@jobs_react",
    site: "@jobs_react",
  },
};

export default SEO;
