export default function getUrl() {
  const mode: "development" | "production" = process.env.MODE as
    | "development"
    | "production";

  return mode === "development"
    ? process.env.DEVELOPMENT_URL
    : process.env.PRODUCTION_URL;
}
