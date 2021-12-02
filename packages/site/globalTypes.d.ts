declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_URI: string;
    MONGO_DATABASE: string;
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
    STRIPE_SECRET_KEY: string;
    STRIPE_PRICE_ID: string;
    S3_UPLOAD_KEY: string;
    S3_UPLOAD_SECRET: string;
    S3_UPLOAD_BUCKET: string;
    S3_UPLOAD_REGION: string;
    EMAIL_ACCOUNT: string;
    SENDGRID_API_KEY: string;
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
