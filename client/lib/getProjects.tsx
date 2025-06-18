export default async function getProjects(lang: "az" | "en", endpoint = " ") {
  const url =
    (endpoint && `http://localhost:5000/api/projects/${endpoint}`) ||
    "http://localhost:5000/api/projects";
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": lang,
    },
  });

  const data = await res.json();

  return data;
}
