import { NextSeoProps } from "next-seo";

const SEO: NextSeoProps = {
  canonical: "https://react-jobs.io",
  titleTemplate: "%s | React Jobs",
  defaultTitle: "React Jobs with JavaScript, TypeScript, Python and more",
  description:
    "Looking for a react job? React Jobs is a React Job Board and has 1,000+ react jobs with JavaScript, TypeScript, NextJS, Ruby, Python and more! Find a career working with React.",
  openGraph: {
    title: "React Jobs",
    description:
      "Looking for a react job? React Jobs is a React Job Board and has 1,000+ react jobs with JavaScript, TypeScript, NextJS, Ruby, Python and more! Find a career working with React.",
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
