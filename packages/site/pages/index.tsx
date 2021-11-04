import type { InferGetStaticPropsType, NextPage } from "next";
import Image from "next/image";
import { useRef, useState } from "react";
import Header from "../components/Header";
import JobBoard from "../components/JobBoard";
import useOutsideClick from "../components/OutsideClick";

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  jobs,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [showSearch, setShowSearch] = useState(false);
  const [tagList, setTagList] = useState<string[]>([]);
  const wrapperRef = useRef(null);

  useOutsideClick(wrapperRef, () => setShowSearch(false));

  return (
    <div>
      <Header>
        <div className="w-16 h-16 relative mx-auto">
          <Image src="/logo.png" alt="logo" layout="fill" />
        </div>
        <div className="relative mx-2 my-6" ref={wrapperRef}>
          <input
            type="text"
            className="rounded-3xl p-3 border-gray-200 border text-xl w-full"
            style={{ outlineColor: "blue" }}
            onFocus={() => setShowSearch(true)}
            onChange={async (event) => {
              if (!event.target.value) {
                setShowSearch(false);
                setTagList([]);
                return;
              }

              const tagList: string[] = await fetch(
                "/api/tags?filter=" + event.target.value
              ).then((x) => x.json());
              setShowSearch(true);
              setTagList(tagList);
            }}
          />
          {showSearch && (
            <div className="absolute bg-white w-full border-gray-200 border px-2 py-2 rounded z-50">
              {tagList.map((tag) => {
                return (
                  <div className="hover:bg-gray-100 cursor-pointer" key={tag}>
                    <p className="py-2">{tag}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Header>

      <section className="flex my-2 flex-col">
        <JobBoard jobs={jobs}></JobBoard>
      </section>

      <footer></footer>
    </div>
  );
};

export default Home;

export function getStaticProps() {
  const jobs = [
    {
      logo: "f205e8a0318a5b3edcd22449bcb0a7dc1633688203.png",
      name: "Javascript Developer gesucht",
      tags: ["JavaScript", "Frontend", "React", "Senior"],
      text: `As a Product Design Manager on our team, you will drive innovative experiences for one of our company’s top strategic pillars! By owning key workstreams, you will have the opportunity to reinvent how companies find, hire, and pay freelancers. You will be empowered by a strong design culture to design products and features that help millions of users collaborate with distributed teams!

Your Responsibilities:

Lead the design strategy for several work-streams within one of the company’s most meaningful pillars and core product experiences
Drive an innovative and entrepreneurial culture by delivering thoughtful, explorative MVPs designed to learn from and iterate with
Own end-to-end design projects consisting of several product features and touchpoints from ideation, research, through execution and production Be the subject matter authority for experience and design
Be curious. Learn about our users, build empathy for their needs, advocate for them and deliver impactful experiences that connect their goals to business context
Demonstrate high quality design practices. This includes participation in all aspects of UX: research, ideation, facilitation, strategy, interaction design, information architecture, and visual execution
Build a variety of design assets to communicate your concepts to a broad range of partners and end users; ranging from strategy and experience concepts to detailed design systems and assets
Collaborate with product, services, engineering, and operations partners; produce design solutions, and adapt your designs to emerging constraints
Drive multiple small to large projects in parallel in partnership with your team and other teams and functions in the organization
Develop your skills and expertise in the dynamics of a dual-sided marketplace
Mentor junior designers on the team; lead small teams of designers when needed
Portfolio is required
Come change how the world works. At Upwork, you’ll shape talent solutions for how the world works today. We are a remote-first organization working together to create exciting remote work opportunities for a global community of professionals. While we have physical offices in San Francisco and Chicago, currently we also support hiring of corporate full-time employees in 15 states in the United States. Please speak with a member of our recruitment team to determine whether you are located in a state in which we are hiring corporate full-time employees. Our vibrant culture is built on shared values and our mission to create economic opportunities so that people have better lives. We foster amazing teams, put our community first, and have a bias toward action. We encourage everyone to bring their whole selves to work and grow together through development opportunities, mentorship, and employee resource groups. Oh yeah, we’ve also got amazing benefits.

Check out our Life at Upwork site to learn more about the employee experience.

Be sure to mention the words ABLE EXACT UPGRADE when applying to show you read the job post completely. This is a beta feature to avoid spam applicants.

Salary and compensation
$150,000 — $170,000/year

Location
United States (Certain States)`,
    },
    {
      logo: "f205e8a0318a5b3edcd22449bcb0a7dc1633688203.png",
      name: "PHP Feuerlöscher benötigt",
      tags: ["PHP", "Bugs included", "Interred", "No money"],
      text: "Lorem ipsum",
    },
  ];

  return {
    props: {
      jobs,
    },
  };
}
