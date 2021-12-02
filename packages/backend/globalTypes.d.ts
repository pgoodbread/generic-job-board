declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_URI: string;
    MONGO_DATABASE: string;
  }
}

declare module "which-country" {
  type wc = (b: number[]) => string;

  const wc: wc;
  export default wc;
}
