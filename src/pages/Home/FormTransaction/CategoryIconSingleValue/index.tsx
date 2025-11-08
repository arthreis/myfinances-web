import type React from 'react';
import type { SingleValueProps } from 'react-select';
import * as Icons from 'react-icons/fi';
import { Container } from './styles';
import type { Category, IconMap } from '@/schemas';

export default function CategoryIconSingleValue({
  data,
}: Readonly<SingleValueProps<Category>>): React.JSX.Element {
  const { icon, title, color } = data;
  const Icon = (Icons as IconMap)[icon];

  return (
    <Container>
      <Icon
        size={20}
        color={ color }
      />

      <span>{title}</span>
    </Container>
  );
}
