import { cookies } from "next/headers";
import StackCard from "../components/StackCard";
import AnimationWhenElementOnScreen from "@/components/animations/AnimationWhenElementOnScreen";
import AnimationAllChildren from "@/components/animations/AnimationAllChildren";

const parentVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2, // delay between children
    },
  },
};

const childVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const TechStackSection = async () => {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "az";

  const res = await fetch("http://45.85.146.73:5000/api/tech", {
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
      <AnimationAllChildren
        parentVariant={parentVariant}
        childVariant={childVariant}
      >
        {data.map((item: any) => (
          <div key={item._id} className="">
            <StackCard
              stackTitle={item.techName}
              stackDescription={item.description}
              stackIcon={item.icon}
            />
          </div>
        ))}
      </AnimationAllChildren>
    </section>
  );
};

export default TechStackSection;
