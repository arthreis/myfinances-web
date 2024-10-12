// biome-ignore lint/style/useImportType: <explanation>
import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useCallback,
  useState,
} from 'react';
import type { IconBaseProps } from 'react-icons';
// import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, ErrorContainer } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  containerClassName?: string;
  mask?: string;
}

function Input({
  name,
  icon: Icon,
  containerClassName,
  ...rest
}: InputProps): React.JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFilled, setIsFilled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  // const { fieldName, defaultValue, error, registerField } = useField(name);

  // useEffect(() => {
  //   registerField({
  //     name: fieldName,
  //     ref: inputRef.current,
  //     path: 'value',
  //   });
  // }, [fieldName, registerField]);

  return (
    <Container
      className={containerClassName}
      isFilled={isFilled}
      isFocused={isFocused}
      // hasError={!!error}
      hasError={false}
    >
      {Icon && <Icon size={20} />}

      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        // defaultValue={defaultValue}
        {...rest}
        ref={inputRef}
      />

      {/* {error && (
        <ErrorContainer title={error}>
          <FiAlertCircle size={20} />
        </ErrorContainer>
      )} */}
    </Container>
  );
}

export default Input;
