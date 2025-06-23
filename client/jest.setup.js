// jest.setup.js
// Mock Next.js
jest.mock("next/headers", () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(() => ({ value: "az" })),
  })),
}));

// Mock fetch
global.fetch = jest.fn();

// Jest-dom matcher-ləri manual əlavə et (paket tapılmadığı üçün)
expect.extend({
  toBeInTheDocument(received) {
    const pass = received !== null && received !== undefined;
    return {
      message: () => `expected element ${pass ? "not " : ""}to be in document`,
      pass,
    };
  },
  toHaveAttribute(received, attr, value) {
    const hasAttr =
      received && received.getAttribute && received.getAttribute(attr);
    const pass = value ? hasAttr === value : hasAttr !== null;
    return {
      message: () =>
        `expected element ${pass ? "not " : ""}to have attribute "${attr}"${
          value ? ` with value "${value}"` : ""
        }`,
      pass,
    };
  },
});
