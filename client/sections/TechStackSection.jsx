import { cookies } from "next/headers";
import StackCard from "../components/StackCard";

const TechStackSection = async () => {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "az";

  const res = await fetch("http://localhost:4000/api/tech", {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": lang,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return (
    <section className="w-full h-full   ">
      <h2 className="text-black header-text font-[600]">
        {" "}
        {lang === "en" ? "My stacks" : "Texnologiyalar"}
      </h2>
      <div className="grid grid-cols-2 gap-4 mt-10 ">
        {data.map((item) => (
          <StackCard
            key={item._id}
            stackTitle={item.techName}
            stackDescription={item.description}
            stackIcon={item.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default TechStackSection;
