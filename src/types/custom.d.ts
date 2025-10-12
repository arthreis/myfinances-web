// declare module '*.svg' {
//   const content: string;
//   export default content;
// }

declare module '*.svg' {
  import type * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;

  const src: string;
  export default src;
}

// declare module '*.svg?react' {
//   import React = require('react');
//   export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
//   const src: string;
//   export default src;
// }
