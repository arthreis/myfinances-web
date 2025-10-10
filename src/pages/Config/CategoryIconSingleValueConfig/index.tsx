import type React from 'react';
import * as Icons from 'react-icons/fi';
import type { OptionProps, SingleValueProps } from 'react-select';
import { Container } from './styles';
import type { Category, IconMap } from '@/schemas';

export default function CategoryIconOptionConfig({
  data,
}: OptionProps<Category> | SingleValueProps<Category>): React.JSX.Element {
  const { id } = data;
  const Icon = (Icons as IconMap)[id];

  console.log(`CategoryIconOptionConfig data -> `, data);

  return (
    <Container>
      {Icon && <Icon size={20} />}
      {id.split('Fi')[1]}
    </Container>
  );
}
