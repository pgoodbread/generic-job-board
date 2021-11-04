import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== "GET") {
    return response.status(405).json("Method not allowed");
  }

  const tags = [
    "Remote",
    "Embedded",
    "PHP",
    "Bugs included",
    "Interred",
    "No money",
    "JavaScript",
    "Frontend",
    "React",
    "Senior",
  ];

  const filter = request.query.filter as string;
  const filteredTags = tags.filter((tag) =>
    tag.toLowerCase().startsWith(filter.toLowerCase())
  );

  return response.status(200).json(filteredTags);
}
