import MinimalFeedback from "minimal-feedback";
import "minimal-feedback/dist/index.css";
import { useState } from "react";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [text, setText] = useState({ feedback: "" });

  function saveFeedback() {
    fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(text),
    });
  }

  return (
    <div className="flex flex-col h-screen">
      <MinimalFeedback
        save={saveFeedback}
        value={text}
        onChange={(text) => setText(text)}
      />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
