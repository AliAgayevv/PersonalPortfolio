export default function getUrl() {
  if (process.env.MODE === "development") {
    return "http://localhost:4000";
  }
  if (typeof window === "undefined") {
    return "http://localhost:5000";
  }

  return "http://45.85.146.73:5000";
}
