import type { SVGProps } from "react";

const HuggingFace = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#FFD21E" />
    <circle cx="8.5" cy="10" r="1.5" fill="#1A1A1A" />
    <circle cx="15.5" cy="10" r="1.5" fill="#1A1A1A" />
    <path d="M7 14.5c0 0 2 3 5 3s5-3 5-3" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
);

export { HuggingFace };
