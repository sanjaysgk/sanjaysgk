import type { SVGProps } from "react";

const SciPy = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#0054A6" />
    <path d="M7 16c1-3 3-5 5-7s4-3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <circle cx="15" cy="8" r="2" fill="white" />
  </svg>
);

export { SciPy };
