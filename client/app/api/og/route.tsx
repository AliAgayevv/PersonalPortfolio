// @eslint-disable @next/next/no-img-element
// @eslint-disable jsx-a11y/alt-text
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "Default Title";

    const baseUrl = new URL(request.url).origin;
    let imageSrc = "";

    try {
      const imageResponse = await fetch(`${baseUrl}/og-image.png`);

      if (imageResponse.ok) {
        const imageBuffer = await imageResponse.arrayBuffer();
        const imageBase64 = Buffer.from(imageBuffer).toString("base64");
        imageSrc = `data:image/png;base64,${imageBase64}`;
      } else {
        console.log("Şəkil tapılmadı:", imageResponse.status);
      }
    } catch (error) {
      console.log("Şəkil yüklənmədi:", error);
    }

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "48px",
            }}
          >
            {imageSrc ? (
              <img
                src={imageSrc}
                width={128}
                height={128}
                alt="Logo"
                style={{
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  backgroundColor: "#4f46e5",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                OG
              </div>
            )}

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center",
                marginLeft: "32px",
              }}
            >
              <h2
                style={{
                  fontSize: "36px",
                  fontWeight: "bold",
                  color: "#111827",
                  margin: 0,
                  maxWidth: "60%",
                }}
              >
                {title}
              </h2>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "black",
                  color: "white",
                  padding: "16px 32px",
                  borderRadius: "24px",
                  fontSize: "18px",
                  fontWeight: "500",
                  whiteSpace: "nowrap",
                  boxShadow: `
                    0px 24px 52.8px rgba(0, 0, 0, 0.35),
                    0px 9.44px 20.77px rgba(0, 0, 0, 0.137),
                    0px 4.25px 9.36px rgba(0, 0, 0, 0.063),
                    0px 1.94px 4.26px rgba(0, 0, 0, 0.027),
                    0px 0.71px 1.56px rgba(0, 0, 0, 0.01)
                  `,
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
                Kəşf etməyə başla
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    console.error("OG Image generation error:", e);
    return new Response(`Failed to generate OG image: ${e}`, {
      status: 500,
    });
  }
}
