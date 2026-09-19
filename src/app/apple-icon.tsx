import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#14130F",
          fontFamily: "Georgia, serif",
        }}
      >
        <span style={{ fontSize: 96, fontWeight: 700, color: "#F7F6F2", letterSpacing: -4 }}>
          AM
        </span>
        <span style={{ fontSize: 96, fontWeight: 700, color: "#D45062" }}>/</span>
      </div>
    ),
    size,
  );
}
