import clsx from "clsx";
import { FormEvent, useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isDisabled, setDisabled] = useState(false);

  async function handleNewletterSignUp(e: FormEvent) {
    setDisabled(true);
    e.preventDefault();
    await fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  return (
    <section className="flex flex-col max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 md:flex-row md:h-48">
      <div className="md:flex md:items-center md:justify-center md:w-1/2 md:bg-gray-700 md:dark:bg-gray-800">
        <div className="px-6 py-6 md:px-8 md:py-0">
          <h2 className="text-lg font-bold text-gray-700 dark:text-white md:text-gray-100">
            Sign Up For <span className="text-primary">Project</span> Updates
          </h2>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 md:text-gray-400">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Consectetur obcaecati odio
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center pb-6 md:py-0 md:w-1/2">
        <form>
          <div className="flex flex-col overflow-hidden border rounded-lg dark:border-gray-600 lg:flex-row">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-6 py-3 text-gray-700 placeholder-gray-500 bg-white outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent"
              type="text"
              name="email"
              placeholder="Enter your email"
              aria-label="Enter your email"
            />

            <button
              onClick={handleNewletterSignUp}
              disabled={isDisabled}
              className={clsx(
                "px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-200 transform bg-gray-700 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none",
                { "opacity-50 cursor-not-allowed": isDisabled }
              )}
            >
              subscribe
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
