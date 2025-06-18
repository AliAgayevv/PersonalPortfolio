export default function getUrl() {
  const mode: "development" | "production" = process.env.MODE as
    | "development"
    | "production";

  return "http://localhost:5000";
}
