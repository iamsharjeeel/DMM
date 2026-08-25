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
          backgroundColor: "#F7F4EE",
          color: "#202126",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#052C91",
          }}
        >
          <span>{kicker}</span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 52,
              height: 52,
              backgroundColor: "#052C91",
              color: "#FFFDF8",
              fontSize: 16,
              letterSpacing: "0.12em",
            }}
          >
            DMM
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: title.length > 28 ? 62 : 78,
              lineHeight: 1.02,
              fontStyle: "italic",
              maxWidth: 920,
            }}
          >
            {title}
          </div>
          <div
            style={{
              width: 72,
              height: 1,
              backgroundColor: "#C7060F",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#686A70",
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
