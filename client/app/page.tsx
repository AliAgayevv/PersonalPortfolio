import { cookies } from "next/headers";
import TypewriterEffect from "@/components/TypewriterEffect";

export default async function Home() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "az"; // default az

  const res = await fetch("http://localhost:4000/api/pages/hero", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch hero data");
  }

  const data = await res.json();

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="text-4xl font-bold mb-10">
        <TypewriterEffect
          stringsFromBackend={data.content?.heroText?.[lang].split("_")}
        />
      </div>

      <p>{data.content?.pageDescription?.[lang]}</p>
      <button>{data.content?.ctaButton?.[lang]}</button>
    </main>
  );
}
