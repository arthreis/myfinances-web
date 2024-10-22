import React, { type HTMLAttributes } from 'react';
import styled from 'styled-components';

export const Container = ({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return <ContainerStyles {...props}>{children}</ContainerStyles>;
};

const ContainerStyles = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
