import { ImageResponse } from "next/og";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#080D18",
          color: "#F7F9FC",
          padding: "64px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 4,
            color: "#A6B0C2",
          }}
        >
          <span>EPHORISE</span>
          <span>2026</span>
        </div>
        <div style={{ display: "flex", fontSize: 76, lineHeight: 0.95, letterSpacing: -2, maxWidth: 900 }}>
          Build Smarter. Grow Faster.
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ width: 180, height: 8, background: "#536DFF" }} />
          <span style={{ color: "#A6B0C2", fontSize: 24 }}>Websites · Apps · Marketing</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
