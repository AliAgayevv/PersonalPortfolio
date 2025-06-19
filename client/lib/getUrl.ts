export default function getUrl() {
  if (typeof window === "undefined") {
    return "http://localhost:5000";
  }

  // Client-side için external IP kullan
  return "http://45.85.146.73:5000";
}
