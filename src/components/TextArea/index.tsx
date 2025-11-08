import React from 'react';
import { forwardRef, type ComponentProps } from 'react';
import { TextAreaCustom } from './styles';

type TextareaProps = ComponentProps<'textarea'>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    return <TextAreaCustom {...props} ref={ref} />;
  },
);
export default Textarea;

Textarea.displayName = 'Textarea';
