import { CSSProperties } from 'styled-components';
import { shade, tint } from 'polished';
import { StylesConfig, GroupBase } from 'react-select';
import Theme from '../styles/themes/theme';
import type { Category } from '@/schemas';

type OptionType = Category;
type IsMulti = false;
type CustomStylesConfig = StylesConfig<OptionType, IsMulti, GroupBase<OptionType>>;

export default function getCustomSelectOptions(theme: Theme): CustomStylesConfig {
  return {
    input: (provided: CSSProperties) => ({
      ...provided,
      color: theme.colors.primaryText,
    }),
    placeholder: (provided: CSSProperties) => ({
      ...provided,
      color: theme.colors.secondaryText,
    }),
    control: (provided: CSSProperties) => {
      return {
        ...provided,
        height: 60,
        borderRadius: 10,
        backgroundColor: theme.colors.tertiary,
        border: 'none',
        boxShadow: 'none',
      };
    },
    valueContainer: (provided: CSSProperties) => ({
      ...provided,
      padding: '2px 16px',
    }),
    singleValue: (provided: CSSProperties) => ({
      ...provided,
      color: theme.colors.primaryText,
    }),
    menu: (provided: CSSProperties) => ({
      ...provided,
      backgroundColor:
        theme.title === 'light'
          ? tint(0.95, theme.colors.primaryText)
          : shade(0.25, theme.colors.tertiary),
    }),
  };
}

export function getCustomSelectOptionsModal(theme: Theme): CustomStylesConfig {
  const options = {
    ...getCustomSelectOptions(theme),
    menu: (provided: CSSProperties) => ({
      ...provided,
      backgroundColor:
        theme.title === 'light'
          ? tint(0.8, theme.colors.primaryText)
          : shade(0.25, theme.colors.tertiary),
      padding: '5px 0',
    }),
    control: (provided: CSSProperties) => {
      return {
        ...provided,
        height: 60,
        borderRadius: 10,
        backgroundColor:
          theme.title === 'light'
            ? tint(0.8, theme.colors.primaryText)
            : shade(0.25, theme.colors.tertiary),
        border: 'none',
        boxShadow: 'none',
        borderColor: tint(0.8, theme.colors.primaryText),
      };
    },
  };
  console.log(`Custom select options for modal:`, JSON.stringify(options));

  return options;
}
