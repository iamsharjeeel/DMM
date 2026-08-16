import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

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
          background: "#1b2636",
          color: "#f6f1e8",
          fontSize: 12,
          letterSpacing: "0.08em",
        }}
      >
        DM
      </div>
    ),
    { ...size },
  );
}
