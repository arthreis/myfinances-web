import React, { useRef, useEffect, forwardRef } from 'react';
import ReactSelect from 'react-select';
import type { Options, Props as SelectProps } from 'react-select';
import AsyncReactSelect from 'react-select/async';

// import { useField } from '@unform/core';

import { Container } from './styles';

type Props = SelectProps & {
  name: string;
  keyField?: string;
  async?: boolean;
  loadOptions?: (
    inputValue: string,

    callback: (options: Options<any>) => void,

    ) => Promise<any> | void;
}
// interface Props extends SelectProps {
//   name: string;
//   keyField?: string;
//   async?: boolean;
//   loadOptions?: (
//     inputValue: string,

//     callback: (options: Options<any>) => void,
//   // biome-ignore lint/suspicious/noConfusingVoidType: <explanation>

//     ) => Promise<any> | void;
// }

const Select = forwardRef<any, Props>(
({ name, async = false, loadOptions, ...rest }, ref) => {
  // const selectRef = useRef(null);

  // const { fieldName, defaultValue, registerField, error } = useField(name);
  // useEffect(() => {
  //   registerField({
  //     name: fieldName,
  //     ref: selectRef.current,
  //     getValue: (ref: any) => {
  //       if (rest.isMulti) {
  //         if (!ref.state.selectValue) {
  //           return [];
  //         }
  //         return ref.state.selectValue.map((option: any) => option.value);
  //       }
  //       if (async) {
  //         if (!ref.state.selectValue) {
  //           return '';
  //         }
  //         return ref.state.selectValue[0]?.id;
  //       }

  //       if (!ref.state.selectValue) {
  //         return '';
  //       }
  //       return ref.state.selectValue[0]?.id || '';
  //     },
  //     clearValue: (ref: any) => {
  //       ref.clearValue();
  //     },
  //   });
  // }, [fieldName, registerField, rest.isMulti, keyField, async]);

    return (
      <>
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
      </>
    )
  }
);
Select.displayName = 'Select'
export default Select;
