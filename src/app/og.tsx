import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ardesa Software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0014 0%, #0f172a 60%, #06b6d4 100%)",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "white",
            letterSpacing: -1,
            textAlign: "center",
          }}
        >
          Ardesa Software
          <div style={{ fontSize: 28, fontWeight: 500, marginTop: 16, color: "#d1fae5" }}>
            Ultra modern çözümlerle yüksek performanslı yazılım
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
