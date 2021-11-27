import { PropsWithChildren } from "react";

export default function Header({ children }: PropsWithChildren<{}>) {
  return <header className="w-full flex flex-col">{children}</header>;
}
