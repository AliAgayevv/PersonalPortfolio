import getUrl from "./getUrl";

export default async function getPageData(endPoint: string, lang: "az" | "en") {
  const url = getUrl();

  const res = await fetch(`${url}/api/pages/${endPoint}`, {
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
