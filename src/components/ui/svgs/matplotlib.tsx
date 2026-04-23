import type { SVGProps } from "react";

const Matplotlib = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <polyline points="5,18 8,14 11,16 14,10 17,12 20,6" stroke="#E24A33" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="5,18 8,12 11,15 14,8 17,11 20,5" stroke="#348ABD" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export { Matplotlib };
