import { JwtPayload } from "@/types/authInterface";

export const parseJwt = (token: string): JwtPayload | null => {
  try {
    const base64Payload = token.split(".")[1];
    const payload = atob(base64Payload);
    return JSON.parse(payload);
  } catch (e) {
    console.error("Invalid token:", e);
    return null;
  }
};
