import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Abdullah Mozomdar — Journalist & Senior Reporter";

/** Branded 1200×630 social card — warm paper, newsroom red rule. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F7F6F2",
          padding: 72,
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ fontSize: 44, fontWeight: 700, color: "#111111" }}>AM/</span>
          <span style={{ width: 90, height: 2, background: "#A51C30" }} />
          <span style={{ fontSize: 24, letterSpacing: 4, color: "#6B6862", textTransform: "uppercase" }}>
            Journalist
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 1.02,
              color: "#111111",
              letterSpacing: -2,
            }}
          >
            Reporting stories that matter.
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#2A2A28" }}>
            Abdullah Mozomdar · Senior Reporter, Daily Banijjo Pratidin
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 24, color: "#6B6862" }}>abdullahmozomdar.com</span>
          <span style={{ width: 120, height: 6, background: "#A51C30" }} />
        </div>
      </div>
    ),
    size,
  );
}
