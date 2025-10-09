import type React from 'react';
import * as Icons from 'react-icons/fi';

import { useTheme } from '@/hooks/theme';
import { Container } from './styles';
import type { IconMap } from '@/schemas';

interface Props {
  innerProps: unknown;
  data: {
    icon: string;
    title: string;
    background_color_light: string;
    background_color_dark: string;
  };
}

export default function CategoryIconOption({
  innerProps,
  data,
}: Props): React.JSX.Element {
  const { theme } = useTheme();
  const { icon, title, background_color_light, background_color_dark } = data;
  const Icon = (Icons as IconMap)[icon];
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
