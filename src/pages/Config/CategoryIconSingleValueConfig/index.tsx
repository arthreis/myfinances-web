import React from 'react';
import * as Icons from 'react-icons/fi';
import { OptionProps, SingleValueProps } from 'react-select';

import { Container } from './styles';

export default function CategoryIconSingleValueConfig({
  innerProps,
  data,
}: OptionProps<any> | SingleValueProps<any>): React.JSX.Element {
  const { id } = data;
  const Icon = (Icons as any)[id];
  return (
    <Container {...innerProps}>
      <Icon size={20} /> {id}
    </Container>
  );
}

// export default CategoryIconOptionConfig;
// import React from 'react';
// import { OptionProps, SingleValueProps } from 'react-select';

// import { Container } from './styles';

// const CategoryIconOptionConfig: React.FC<
//   OptionProps<any> | SingleValueProps<any>
// > = ({ innerProps, data }) => {
//   const { id } = data;
//   const [, iconName] = id.split('/');
//   const Icon = (Icons as any)[iconName];
//   return (
//     <div {...innerProps}>
//       <Icon size={20} />
//     </div>
//   );
// };

// export default CategoryIconOptionConfig;
