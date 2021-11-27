declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_URI: string;
  }
}

declare module "which-country" {
  type wc = (b: number[]) => string;

  const wc: wc;
  export default wc;
}
