import type React from 'react';
import type { SingleValueProps } from 'react-select';
import * as Icons from 'react-icons/fi';
import { useTheme } from '@/hooks/theme';
import { Container } from './styles';

export default function CategoryIconSingleValue({
  innerProps,
  data,
}: SingleValueProps<any>): React.JSX.Element {
  const { theme } = useTheme();
  const { icon, title, background_color_light, background_color_dark } = data;
  const Icon = (Icons as any)[icon];

  return (
    <Container {...innerProps}>
      <Icon
        size={20}
        color={
          theme.title === 'dark'
            ? background_color_dark
            : background_color_light
        }
      />

      <span>{title}</span>
    </Container>
  );
}
