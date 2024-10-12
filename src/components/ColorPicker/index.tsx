// biome-ignore lint/style/useImportType: <explanation>
import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useCallback,
  useState,
} from 'react';
import { FiAlertCircle } from 'react-icons/fi';

import { rgba } from 'polished';

import { BlockPicker } from 'react-color';
// import { useField } from '@unform/core';

import { useTheme } from '../../hooks/theme';

import {
  Container,
  ColorSquare,
  BlockPickerContainer,
  BlockPickerCover,
  ErrorTooltip,
} from './styles';
import Input from '../Input';

interface ColorPickerProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerClassName?: string;
}

function ColorPicker({
  name,
  containerClassName,
  color = '#000',
  ...rest
}: ColorPickerProps): React.JSX.Element {
  const { theme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedColor, setSelectedColor] = useState(color);
  const [isFilled, setIsFilled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const handleColorChange = useCallback(

    (colorHex: any) => {
      setSelectedColor(colorHex.hex);
      if (inputRef.current) inputRef.current.value = colorHex.hex;
    },
    [inputRef],
  );

  // const { fieldName, defaultValue, registerField, error } = useField(name);

  // useEffect(() => {
  //   registerField({
  //     name: fieldName,
  //     ref: inputRef.current,
  //     path: 'value',
  //   });
Input  // }, [fieldName, registerField]);

  return (
    <Container
      className={containerClassName}
      isFilled={isFilled}
      isFocused={isFocused}
    >
      <ColorSquare color={selectedColor} />

      <input
        onFocus={handleInputFocus}
        // defaultValue={defaultValue}
        {...rest}
        ref={inputRef}
      />

      {isFocused && (
        <BlockPickerContainer>
          <BlockPickerCover onClick={handleInputBlur} />
          <BlockPicker
            color={inputRef.current?.value}
            onChange={handleColorChange}
            styles={{
              default: {
                body: {
                  backgroundColor: theme.colors.background,
                },
                input: {
                  boxShadow: `${rgba(
                    theme.colors.tertiary,
                    1,
                  )} 0px 0px 0px 1px inset`,
                  color: theme.colors.primaryText,
                },
              },
            }}
          />
        </BlockPickerContainer>
      )}

      {/* {error && (
        <ErrorTooltip title={error}>
          <FiAlertCircle size={20} />
        </ErrorTooltip>
      )} */}
    </Container>
  );
}

export default ColorPicker;
