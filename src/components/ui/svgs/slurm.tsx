import type { SVGProps } from "react";

const Slurm = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="14" y="4" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="3" y="15" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="14" y="15" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 6.5h4M10 17.5h4M6.5 9v6M17.5 9v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export { Slurm };
