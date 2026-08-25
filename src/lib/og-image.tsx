import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const ogSize = {
  width: 1200,
  height: 630,
};

export function createOgImage(title: string, kicker: string = site.name) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#F7F3EA",
          color: "#202421",
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
            color: "#183A32",
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
              backgroundColor: "#183A32",
              color: "#FFFDF8",
              fontSize: 16,
              letterSpacing: "0.12em",
            }}
          >
            DM
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
              backgroundColor: "#C59A52",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#6E746F",
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
