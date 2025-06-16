import { cookies } from "next/headers";

export default async function LanguageSelector() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value === "en" ? "en" : "az";

  const otherLang = lang === "az" ? "en" : "az";

  return (
    <div>
      <form action="/api/change-language" method="POST">
        <input type="hidden" name="lang" value={otherLang} />
        <button
          type="submit"
          className="border-2 border-[#001011]/10 text-black bg-transparent px-4 py-2 rounded-[10px] font-medium text-[16px] transition-all duration-300 hover:bg-black hover:text-white hover:cursor-pointer"
        >
          {lang.toUpperCase()}
        </button>
      </form>
    </div>
  );
}
