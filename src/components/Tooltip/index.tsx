import React from 'react';

import { Container } from './styles';

export type TooltipType = {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
};

type TooltipProps = {
  title: string;
  className?: string;
  children: React.ReactNode;
} & TooltipType;

function Tooltip({
  title,
  className,
  children,
  ...props
}: TooltipProps): React.JSX.Element {
  return (
    <Container className={className} {...props}>
      {children}
      <span>{title}</span>
    </Container>
  );
}

export default Tooltip;
