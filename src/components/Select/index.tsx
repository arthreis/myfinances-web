import React from 'react';
import ReactSelect from 'react-select';
import type { Options, Props as SelectProp, GroupBase, SelectInstance } from 'react-select';
import AsyncReactSelect from 'react-select/async';

import { Container } from './styles';

type OptionType = unknown;
type IsMulti = false;

type RefType = SelectInstance<OptionType, IsMulti, GroupBase<OptionType>>;

type Props = SelectProp<OptionType, IsMulti, GroupBase<OptionType>> & {
  name: string;
  keyField?: string;
  async?: boolean;

  loadOptions?: (
    inputValue: string,
    callback: (options: Options<OptionType>) => void,
  ) => Promise<Options<OptionType>> | void;
};

const Select = React.forwardRef<RefType, Props>(
  ({ async = false, loadOptions, ...rest }, ref) => {
    return (
      <Container>
        {async ? (
          <AsyncReactSelect
            loadOptions={loadOptions}
            classNamePrefix="react-select"
            placeholder="Selecione uma opção"
            ref={ref}
            {...rest}
          />
        ) : (
          <ReactSelect
            classNamePrefix="react-select"
            placeholder="Selecione uma opção"
            ref={ref}
            {...rest}
          />
        )}
      </Container>
    );
  },
);
Select.displayName = 'Select';
export default Select;
