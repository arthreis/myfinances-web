import React, { ButtonHTMLAttributes } from 'react';

import { ButtonStyles } from './styles';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'tertiary';
  outlined?: boolean;
};

function Button(props: ButtonProps): React.JSX.Element {
  const { children } = props;
  return (
    <ButtonStyles type="button" {...props}>
      {children}
    </ButtonStyles>
  );
}

export default Button;
