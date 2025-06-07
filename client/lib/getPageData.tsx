export default async function getPageData(endPoint: string, lang: "az" | "en") {
  const res = await fetch(`http://localhost:4000/api/pages/${endPoint}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": lang,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch data from ${endPoint}`);
  }

  const data = await res.json();
  return data;
}
