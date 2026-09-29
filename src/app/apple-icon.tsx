import { ImageResponse } from "next/og";

// The set square on the home screen of a phone: iOS wants a PNG, and draws its own corners.

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f8fb",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width="120"
        height="120"
        fill="none"
        stroke="#132033"
        strokeWidth="1.75"
        strokeLinejoin="round"
      >
        <path d="M4 3v17h17z" />
        <path d="M8 11.5V16h4.5z" />
        <path d="M4 17h3v3" />
      </svg>
    </div>,
    size,
  );
}
