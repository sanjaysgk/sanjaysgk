import type { SVGProps } from "react";

const Snakemake = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none">
    <path d="M4 20c2-2 3-5 5-5s3 3 5 3 3-3 5-5" stroke="#4B8B3B" strokeWidth="2" strokeLinecap="round" />
    <path d="M4 14c2-2 3-5 5-5s3 3 5 3 3-3 5-5" stroke="#4B8B3B" strokeWidth="2" strokeLinecap="round" />
    <circle cx="19" cy="7" r="1.5" fill="#4B8B3B" />
  </svg>
);

export { Snakemake };
