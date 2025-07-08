import getUrl from "@/lib/getUrl";
import { LoginRequest, LoginResponse } from "@/types/authInterface";

export const loginAdmin = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  // TODO: Change URL
  const url = "http://localhost:4000";
  const response = await fetch(`${url}/api/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password } as LoginRequest),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  return response.json();
};
