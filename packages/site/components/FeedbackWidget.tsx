import MinimalFeedback from "minimal-feedback";
import "minimal-feedback/dist/index.css";
import { useState } from "react";

export default function FeedbackWidget({ className }: { className?: string }) {
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
    <div className={className}>
      <MinimalFeedback
        save={saveFeedback}
        value={text}
        onChange={(text) => setText(text)}
      />
    </div>
  );
}
