import React from 'react';
import ReactSelect from 'react-select';
import type { Options, Props as SelectProp, GroupBase, SelectInstance } from 'react-select';
import AsyncReactSelect from 'react-select/async';

import { Container } from './styles';

type Props<T> = SelectProp<T, false, GroupBase<T>> & {
  name: string;
  keyField?: string;
  async?: boolean;
  loadOptions?: (
    inputValue: string,
    callback: (options: Options<T>) => void,
  ) => Promise<Options<T>> | void;
};

function SelectInner<T>(
  { async = false, loadOptions, ...rest }: Props<T>,
  ref: React.Ref<SelectInstance<T, false, GroupBase<T>>>,
) {
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
}

const Select = React.forwardRef(SelectInner) as <T>(
  props: Props<T> & { ref?: React.Ref<SelectInstance<T, false, GroupBase<T>>> },
) => React.JSX.Element;

export default Select;
