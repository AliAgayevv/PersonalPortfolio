import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthUser {
  username: string;
  token: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const username = localStorage.getItem("adminUsername");

    if (token && username) {
      // Check token is still valid
      verifyToken(token)
        .then(() => {
          setUser({ username, token });
        })
        .catch(() => {
          // if not valid, remove token and redirect to login
          logout();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token: string): Promise<boolean> => {
    try {
      const response = await fetch("https://aghayev.dev/api/admin/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        return true;
      } else {
        throw new Error("Token invalid");
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      return false;
    }
  };

  const login = async (
    username: string,
    password: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await fetch("https://aghayev.dev/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminUsername", username);
        setUser({ username, token: data.token });
        return { success: true };
      } else {
        return { success: false, message: data.message || "Login failed" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Network error" };
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUsername");
    setUser(null);
    router.push("/admin");
  };

  const isAuthenticated = (): boolean => {
    return user !== null;
  };

  const getAuthHeaders = () => {
    if (user?.token) {
      return {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      };
    }
    return {
      "Content-Type": "application/json",
    };
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
    getAuthHeaders,
  };
};
