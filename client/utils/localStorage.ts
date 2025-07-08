export const setItem = (key: string, value: any): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getItem = <T = any>(key: string): T | null => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  }
  return null;
};

export const removeItem = (key: string): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};
