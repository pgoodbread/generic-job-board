import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-wrap justify-center border-t p-4 text-xs text-center text-gray-400">
      <div className="inline w-full md:w-auto">
        &copy; {new Date().getFullYear()}{" "}
        <Link href="/">
          <a className="hover:text-primary">React Jobs</a>
        </Link>{" "}
        All Rights Reserved. <span className="hidden md:inline">|</span>
      </div>
      <div className="inline mt-2 md:mt-0">
        <Link href="/imprint">
          <a className="hover:text-primary">&nbsp;Imprint</a>
        </Link>{" "}
        |{" "}
        <Link href="mailto:ENTER_EMAIL">
          <a className="hover:text-primary">Contact</a>
        </Link>
      </div>
    </footer>
  );
}
