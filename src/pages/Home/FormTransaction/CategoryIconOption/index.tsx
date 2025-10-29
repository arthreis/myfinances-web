import type React from 'react';
import * as Icons from 'react-icons/fi';

import { Container } from './styles';
import type { IconMap } from '@/schemas';

interface Props {
  innerProps: unknown;
  data: {
    icon: string;
    title: string;
    color: string;
  };
}

export default function CategoryIconOption({
  innerProps,
  data,
}: Props): React.JSX.Element {
  const { icon, title, color } = data;
  const Icon = (Icons as IconMap)[icon];
  return (
    <Container {...innerProps}>
      <Icon
        size={20}
        color={ color }
      />
      <span>{title}</span>
    </Container>
  );
}
