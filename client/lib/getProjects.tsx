export default async function getProjects(lang: "az" | "en", endpoint = " ") {
  const url =
    (endpoint && `https://aghayev.dev/api/projects/${endpoint}`) ||
    "https://aghayev.dev/api/projects";
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
