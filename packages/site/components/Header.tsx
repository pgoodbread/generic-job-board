import { PropsWithChildren } from "react";

export default function Header({ children }: PropsWithChildren<{}>) {
  return (
    <header
      className="w-full flex flex-col"
      style={{
        backgroundImage: "url(background.jpeg)",
        backgroundPosition: "center",
      }}
    >
      {children}
    </header>
  );
}
