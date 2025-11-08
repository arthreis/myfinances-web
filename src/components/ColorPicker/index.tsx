import React from 'react';
import type { InputHTMLAttributes } from 'react';

import { rgba } from 'polished';

import { BlockPicker, type ColorResult } from 'react-color';

import { useTheme } from '@/hooks/theme';

import {
  Container,
  ColorSquare,
  BlockPickerContainer,
  BlockPickerCover,
} from './styles';
import { isValidHexColor } from '@/utils/isValidHexColor';

interface ColorPickerProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerClassName?: string;
  onSelectColor(color: string): void;
}

const ColorPicker = ({
  containerClassName,
  color = '#000',
  onSelectColor,
  ...rest
}: Readonly<ColorPickerProps>): React.JSX.Element => {

  const { theme } = useTheme();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [selectedColor, setSelectedColor] = React.useState(color);
  const [isFilled, setIsFilled] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const handleInputFocus = React.useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = React.useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleColorChange = React.useCallback(
    (colorHex: string) => {
      setSelectedColor(colorHex);
      onSelectColor(colorHex);
      if (inputRef.current) {
        inputRef.current.value = colorHex;
      }
    },
    [onSelectColor],
  );

  React.useEffect(() => {
    if (color) {
      setSelectedColor(color);
      onSelectColor(color);
    }
  }, [color, onSelectColor]);

  return (
    <Container
      className={containerClassName}
      isFilled={isFilled}
      isFocused={isFocused}
    >
      <ColorSquare color={selectedColor} />

      <input
        {...rest}
        onFocus={handleInputFocus}
        ref={inputRef}
        onChange={e => {
          if (isValidHexColor(color)) {
            handleColorChange(e.target.value);
          }
        }}
      />

      {isFocused && (
        <BlockPickerContainer>
          <BlockPickerCover onClick={handleInputBlur} />
          <BlockPicker
            color={inputRef.current?.value}
            onChangeComplete={(color: ColorResult) =>
              handleColorChange(color.hex)
            }
            styles={{
              default: {
                card: {
                  position: 'fixed',
                },
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
    </Container>
  );
}

export default ColorPicker;
