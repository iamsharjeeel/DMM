import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const ogSize = {
  width: 1200,
  height: 630,
};

export function createOgImage(title: string, kicker = site.name) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f6f1e8",
          color: "#1c1917",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#9c7a4a",
          }}
        >
          <span>{kicker}</span>
          <span>DMM</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: title.length > 28 ? 64 : 80,
              lineHeight: 1.05,
              fontStyle: "italic",
              maxWidth: 920,
            }}
          >
            {title}
          </div>
          <div
            style={{
              width: 80,
              height: 2,
              backgroundColor: "#9c7a4a",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#57534e",
            maxWidth: 760,
            lineHeight: 1.4,
          }}
        >
          {site.missionShort}
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
