import type { SVGProps } from "react";

const PowerBI = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="#F2C811">
    <path d="M10 2a2 2 0 0 1 2 2v16a2 2 0 0 1-4 0V4a2 2 0 0 1 2-2z" fill="#F2C811" />
    <path d="M15 6a2 2 0 0 1 2 2v12a2 2 0 0 1-4 0V8a2 2 0 0 1 2-2z" fill="#E8A800" />
    <path d="M5 10a2 2 0 0 1 2 2v8a2 2 0 0 1-4 0v-8a2 2 0 0 1 2-2z" fill="#FFD94A" />
    <path d="M20 10a2 2 0 0 1 2 2v8a2 2 0 0 1-4 0v-8a2 2 0 0 1 2-2z" fill="#D49A00" />
  </svg>
);

export { PowerBI };
