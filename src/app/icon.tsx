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
          background: "#183A32",
          color: "#FFFDF8",
          fontSize: 11,
          letterSpacing: "0.08em",
          fontWeight: 600,
        }}
      >
        DM
      </div>
    ),
    { ...size },
  );
}
