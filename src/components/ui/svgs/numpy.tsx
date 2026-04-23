import type { SVGProps } from "react";

const NumPy = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none">
    <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="#4DABCF" />
    <path d="M12 2L3 7l9 5 9-5-9-5z" fill="#4DABCF" />
    <path d="M12 12l-9-5v10l9 5V12z" fill="#137BBD" />
    <path d="M12 12l9-5v10l-9 5V12z" fill="#0D5FA5" />
  </svg>
);

export { NumPy };
