import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

function Button(props: ButtonProps): React.JSX.Element {
  const { children } = props;
  return (
    <Container type="button" {...props}>
      {children}
    </Container>
  );
}

export default Button;
