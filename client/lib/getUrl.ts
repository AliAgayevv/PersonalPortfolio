export default function getUrl() {
  if (typeof window === "undefined") {
    return "http://localhost:4000";
  }

  return "http://45.85.146.73:5000";
}
