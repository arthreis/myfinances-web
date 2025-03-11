import type { SVGProps } from 'react';
export const Total = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <title>Total Icon</title>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 1.333v29.334M22.667 6.667h-10a4.667 4.667 0 1 0 0 9.333h6.666a4.667 4.667 0 0 1 0 9.333H8"
    />
  </svg>
);
