import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const ogSize = {
  width: 1200,
  height: 630,
};

export async function createOgImage(title: string, kicker: string = site.name) {
  const logo = await readFile(join(process.cwd(), "public/brand/dmm-logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={logoSrc}
            width={88}
            height={61}
            style={{ objectFit: "contain" }}
          />
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
