import type { SVGProps } from "react";

const ScikitLearn = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none">
    <circle cx="8" cy="8" r="2.5" fill="#F89939" />
    <circle cx="16" cy="8" r="2.5" fill="#3499CD" />
    <circle cx="8" cy="16" r="2.5" fill="#3499CD" />
    <circle cx="16" cy="16" r="2.5" fill="#F89939" />
    <circle cx="12" cy="12" r="1.5" fill="#333" />
  </svg>
);

export { ScikitLearn };
