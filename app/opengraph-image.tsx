import { ImageResponse } from "next/og";

export const alt =
  "Meow Creative Haus - AI product, web, and experience studio in India";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "flex-start",
          background:
            "radial-gradient(circle at 80% 20%, #143b39 0%, #0b0d10 42%, #050607 100%)",
          color: "#f7f7f5",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px 80px",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "#75e6d4",
            display: "flex",
            fontSize: 26,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Product + Web + AI
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            maxWidth: 980,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: "-0.045em",
              lineHeight: 1,
            }}
          >
            Software worth feeling.
          </div>
          <div
            style={{
              color: "#b9c0c7",
              display: "flex",
              fontSize: 30,
              lineHeight: 1.35,
            }}
          >
            Interactive websites, AI systems, and digital products built in
            India for founders and businesses.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, fontWeight: 600 }}>
          Meow Creative Haus
          <span style={{ color: "#75e6d4" }}>.</span>
        </div>
      </div>
    ),
    size,
  );
}
