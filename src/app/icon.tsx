import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/** Editorial favicon tile — ink "AM/" on warm paper. */
export default function Icon() {
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
        <span style={{ fontSize: 280, fontWeight: 700, color: "#F7F6F2", letterSpacing: -10 }}>
          AM
        </span>
        <span style={{ fontSize: 280, fontWeight: 700, color: "#D45062" }}>/</span>
      </div>
    ),
    size,
  );
}
