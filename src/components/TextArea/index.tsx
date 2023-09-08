import React, {
  useEffect,
  useRef,
  useCallback,
  useState,
  TextareaHTMLAttributes,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, ErrorContainer } from './styles';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  containerClassName?: string;
  mask?: string;
}

function Textarea({
  name,
  icon: Icon,
  containerClassName,
  ...rest
}: TextareaProps): React.JSX.Element {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFilled, setIsFilled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!textareaRef.current?.value);
  }, []);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      className={containerClassName}
      isFilled={isFilled}
      isFocused={isFocused}
      hasError={!!error}
    >
      {Icon && <Icon size={20} />}

      <textarea
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        {...rest}
        ref={textareaRef}
      />

      {error && (
        <ErrorContainer title={error}>
          <FiAlertCircle size={20} />
        </ErrorContainer>
      )}
    </Container>
  );
}

export default Textarea;
