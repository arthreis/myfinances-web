import React, { useRef, useEffect, forwardRef } from 'react';
import ReactSelect from 'react-select';
import type { Options, Props as SelectProps } from 'react-select';
import AsyncReactSelect from 'react-select/async';

import { Container } from './styles';

type Props = SelectProps & {
  name: string;
  keyField?: string;
  async?: boolean;
  loadOptions?: (
    inputValue: string,
    callback: (options: Options<any>) => void,
  ) => Promise<any> | void;
};

const Select = forwardRef<any, Props>(
  ({ name, async = false, loadOptions, ...rest }, ref) => {
    return (
      <Container>
        {async ? (
          <AsyncReactSelect
            loadOptions={loadOptions!}
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
