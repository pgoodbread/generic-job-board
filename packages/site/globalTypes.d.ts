declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_URI: string;
    GMAIL_USER: string;
    GMAIL_PASSWORD: string;
  }
}

declare module "minimal-feedback" {
  import type { FunctionComponent } from "react";

  type states = "idea" | "issue" | "anything";

  type Props = {
    save: () => void;
    value: { feedback: string; type?: states };
    onChange: (value: { feedback: string; type: states }) => void;
  };

  const MinimalFeedback: FunctionComponent<Props>;

  export default MinimalFeedback;
}
