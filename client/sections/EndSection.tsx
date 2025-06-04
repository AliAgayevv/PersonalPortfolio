import AnimatedEndSection from "@/components/animations/AnimatedEndSection";
import { cookies } from "next/headers";

// Example of how to use the animated component
export default async function Page() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "az";

  const res = await fetch("http://localhost:4000/api/pages/endSection", {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": lang,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch hero data");
  }

  const data = await res.json();

  return (
    <div>
      <AnimatedEndSection data={data} />
    </div>
  );
}
