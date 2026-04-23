import type { SVGProps } from "react";

const Jupyter = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none">
    <circle cx="17" cy="4" r="2" fill="#F37626" />
    <circle cx="5" cy="19" r="1.5" fill="#989898" />
    <circle cx="19" cy="20" r="1" fill="#767677" />
    <path d="M5 8c0-1.5.8-3.2 2.5-4.3" stroke="#F37626" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M19 16c0 1.5-.8 3.2-2.5 4.3" stroke="#989898" strokeWidth="1.5" strokeLinecap="round" />
    <ellipse cx="12" cy="12" rx="8" ry="4" stroke="#767677" strokeWidth="1" strokeDasharray="2 2" />
  </svg>
);

export { Jupyter };
