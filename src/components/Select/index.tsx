/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useRef, useEffect } from 'react';
import ReactSelect, { Options, Props as SelectProps } from 'react-select';
import AsyncReactSelect from 'react-select/async';

import { useField } from '@unform/core';

import { Container } from './styles';

interface Props extends SelectProps {
  name: string;
  keyField?: string;
  async?: boolean;
  loadOptions?: (
    inputValue: string,
    callback: (options: Options<any>) => void,
  ) => Promise<any> | void;
}

function Select({
  name,
  keyField = 'value',
  async = false,
  loadOptions,
  ...rest
}: Props): React.JSX.Element {
  const selectRef = useRef(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.selectValue) {
            return [];
          }
          return ref.state.selectValue.map((option: any) => option.value);
        }
        if (async) {
          if (!ref.state.selectValue) {
            return '';
          }
          return ref.state.selectValue[0]?.id;
        }

        if (!ref.state.selectValue) {
          return '';
        }
        return ref.state.selectValue[0]?.id || '';
      },
      clearValue: (ref: any) => {
        ref.clearValue();
      },
    });
  }, [fieldName, registerField, rest.isMulti, keyField, async]);

  return (
    <Container hasError={!!error}>
      {async ? (
        <AsyncReactSelect
          loadOptions={loadOptions!}
          classNamePrefix="react-select"
          placeholder="Selecione uma opção"
          ref={selectRef}
          {...rest}
        />
      ) : (
        <ReactSelect
          defaultValue={defaultValue}
          classNamePrefix="react-select"
          placeholder="Selecione uma opção"
          ref={selectRef}
          {...rest}
        />
      )}
    </Container>
  );
}

export default Select;
