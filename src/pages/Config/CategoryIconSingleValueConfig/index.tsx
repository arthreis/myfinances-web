import type React from 'react';
import * as Icons from 'react-icons/fi';
import type { OptionProps, SingleValueProps } from 'react-select';
import { Container } from './styles';

export default function CategoryIconOptionConfig({
  innerProps,
  data,
}: OptionProps<any> | SingleValueProps<any>): React.JSX.Element {
  const { id } = data;
  const Icon = (Icons as any)[id];
  return (
    <Container {...innerProps}>
      {Icon && <Icon size={20} />}
      {id}
    </Container>
  );
}
