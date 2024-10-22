import React from 'react';
import { forwardRef, type ComponentProps } from 'react';
import { InputCustom } from './styles';

type InputProps = ComponentProps<'input'>;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <InputCustom {...props} ref={ref} />;
});
export default Input;

Input.displayName = 'Input';
