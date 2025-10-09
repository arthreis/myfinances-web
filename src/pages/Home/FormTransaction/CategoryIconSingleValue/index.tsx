import type React from 'react';
import type { SingleValueProps } from 'react-select';
import * as Icons from 'react-icons/fi';
import { useTheme } from '@/hooks/theme';
import { Container } from './styles';
import type { Category, IconMap } from '@/schemas';

export default function CategoryIconSingleValue({
  data,
}: Readonly<SingleValueProps<Category>>): React.JSX.Element {
  const { theme } = useTheme();
  const { icon, title, background_color_light, background_color_dark } = data;
  const Icon = (Icons as IconMap)[icon];

  return (
    <Container>
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
