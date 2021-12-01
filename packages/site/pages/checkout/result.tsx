import { usePlausible } from "next-plausible";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Stripe from "stripe";
import Header from "../../components/Header";

export default function CheckoutResult() {
  const router = useRouter();
  const plausible = usePlausible();

  useEffect(() => {
    const updateJobPost = async () => {
      if (router.query.session_id) {
        const result: Stripe.Checkout.Session = await fetch(
          `/api/checkout/${router.query.session_id}`
        ).then((res) => res.json());

        fetch("/api/jobs/update", {
          method: "POST",
          body: JSON.stringify({
            sessionId: router.query.session_id,
            email: result.customer_details?.email,
          }),
        });
      }
    };
    updateJobPost();
  }, [router]);

  return (
    <div>
      <Header>
        <div
          style={{
            backgroundImage: "url(background-network.svg)",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className="pb-2 mb-8 md:mb-4"
        >
          <div className="flex justify-end p-2 md:px-6 ">
            <Link href="/jobs/create">
              <a
                onClick={() => plausible("Multiple-Job-Posts")}
                className="px-4 py-2 font-medium tracking-wide text-white transition-colors duration-200 transform bg-primary rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
              >
                Post more Jobs
              </a>
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-primary text-5xl font-bold text-center font-poppins mt-8 md:mt-2">
              <Link href="/">
                <a>Reactjobs</a>
              </Link>
            </h1>
            <h2 className="flex justify-center text-3xl font-bold text-gray-700 mt-4">
              The React{" "}
              <div className="inline-block mx-2">
                <Image
                  src="/react-jobs-logo.png"
                  alt="React-Jobs Logo"
                  height="40"
                  width="40"
                />{" "}
              </div>
              <span></span>
              Job Board
            </h2>
            <p className=" text-xl text-gray-500 text-center mt-3">
              Connecting the{" "}
              <span className="text-gray-700 font-bold">best jobs </span>
              with top{" "}
              <span className="text-primary font-bold">React Developers</span>
            </p>
          </div>
        </div>
      </Header>

      <div className="flex flex-col w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex items-center justify-center w-full bg-green-500">
          <svg
            className="w-8 h-8 text-white fill-current my-2"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
          </svg>
        </div>

        <div className="px-6 py-4 -mx-3">
          <div className="mx-3">
            <p className="font-semibold text-2xl text-green-500 dark:text-green-400 mt-2 mb-2">
              Payment successful!
            </p>
            <p className="text-xl text-gray-700 dark:text-gray-200">
              Thank you for your order with{" "}
              <Link href="/">
                <a className="text-primary font-bold hover:underline">
                  Reactjobs
                </a>
              </Link>
              ! 🙏
            </p>
            <p className="text-base text-gray-400 dark:text-gray-200 mt-2">
              If you have any feedback or encounter problems, please contact us
              via{" "}
              <a
                href="mailto:jobboard.react@gmail.com"
                className="text-primary font-bold cursor-pointer hover:underline"
              >
                Mail
              </a>{" "}
              or use our feedback form.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
