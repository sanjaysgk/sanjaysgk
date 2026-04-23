import type { SVGProps } from "react";

const Bioinformatics = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none">
    <path d="M8 2c0 4 4 4 4 8s-4 4-4 8" stroke="#E44D26" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 2c0 4-4 4-4 8s4 4 4 8" stroke="#2196F3" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="8" r="1" fill="#E44D26" />
    <circle cx="16" cy="8" r="1" fill="#2196F3" />
    <circle cx="8" cy="16" r="1" fill="#E44D26" />
    <circle cx="16" cy="16" r="1" fill="#2196F3" />
    <line x1="9" y1="8" x2="15" y2="8" stroke="#888" strokeWidth="1" />
    <line x1="9" y1="16" x2="15" y2="16" stroke="#888" strokeWidth="1" />
  </svg>
);

export { Bioinformatics };
