import { useEffect, useState } from "react";
import { getItem, removeItem } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import { parseJwt } from "@/utils/parseJwt";

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getItem<string>("adminToken");

    if (!token) {
      router.push("/admin");
      return;
    }

    const decoded = parseJwt(token);

    if (!decoded || !decoded.exp) {
      removeItem("adminToken");
      router.push("/admin");
      return;
    }

    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp < currentTime) {
      removeItem("adminToken");
      router.push("/admin");
      return;
    }

    setLoading(false);
  }, [router]);

  return { loading };
};
