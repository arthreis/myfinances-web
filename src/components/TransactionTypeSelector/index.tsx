import React, { useState, useEffect, useRef, useCallback, forwardRef, type HTMLInputTypeAttribute, type InputHTMLAttributes } from 'react';
// import { useField } from '@unform/core';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';

import { Container, TypeInput } from './styles';
import { Controller, useForm, type UseFormRegister } from 'react-hook-form';
import type { TransactionForm } from '../../pages/FormTransaction';

export type SelectedType = 'income' | 'outcome' | 'vazio';

interface TransactionTypeSelectorProps {
  name: string;
  onSelect(selectedType: SelectedType): void;
}

type TransactionTypeSelectorProps2 = InputHTMLAttributes<HTMLInputElement> & {
  name?: string;
  onSelect2?(selectedType: any): void;
  // inputRef: UseFormRegister<TransactionForm>;
}

const TransactionTypeSelector = forwardRef<HTMLInputElement, TransactionTypeSelectorProps2>(
({ name, onSelect2, onSelect,defaultValue,...rest }, ref) => {
  // const inputRefs = useRef<HTMLInputElement[]>([]);
  // const { fieldName, registerField, defaultValue } = useField(name);

  // const [selectedType, setSelectedType] = useState<SelectedType>();

  const [selectedType, setSelectedType] = useState<any>(() => {
    if (defaultValue) {
      // setTimeout(() => onSelect2(defaultValue), 300);
    }

    return defaultValue;
  });

  // const [selectedType, setSelectedType] = useState<SelectedType>(() => {
  //   if (defaultValue) {
  //     setTimeout(() => onSelect(defaultValue), 300);
  //   }

  //   return defaultValue;
  // });

  // useEffect(() => {
  //   registerField<string | null>({
  //     name: fieldName,
  //     ref: inputRefs.current,
  //     getValue: (refs: HTMLInputElement[]) => {
  //       const refChecked = refs.filter(ref => ref.checked)[0];
  //       return refChecked ? refChecked.value : null;
  //     },
  //     setValue: (refs: HTMLInputElement[], value: string | null) => {
  //       refs.forEach(ref => {
  //         // eslint-disable-next-line no-param-reassign
  //         ref.checked = false;
  //       });
  //       const item = refs.find(ref => ref.value === value);

  //       if (item) {
  //         item.checked = true;
  //       }
  //     },
  //   });
  // }, [fieldName, registerField, setSelectedType]);

  const handleSelect = useCallback(
    (newSelectedType: SelectedType) => {
      console.log('RADIO: ', newSelectedType);

      setSelectedType(newSelectedType);
      // onSelect2(newSelectedType);
    },
    [onSelect2],
  );

  const handleSelect2 = useCallback(
    (newSelectedType: SelectedType) => {
      console.log('RADIO: ', newSelectedType);

      setSelectedType(newSelectedType);
      // onSelect2(newSelectedType);
    },
    [onSelect],
  );
  const { control } = useForm<TransactionForm>();

//   return (
//     <Container>
//       <Controller
//         name="type"
//         control={control}
//         render={({ field }) => (

//       <TypeInput
//         transactionType="income"
//         isActive={selectedType === 'income'}
//         onClick={() => handleSelect('income')}
//       >
//         <input
//         {...field}

//           type="radio"
//           // ref={ref => {
//           //   inputRefs.current[0] = ref as HTMLInputElement;
//           // }}
//           ref={ref}
//           value="income"
//           {...rest}
//         />
//         <span>Entrada</span>
//         <img src={income} alt="income" />
//       </TypeInput>
// )}
// />

// <Controller
//         name="type"
//         control={control}
//         render={({ field }) => (
//       <TypeInput
//         transactionType="outcome"
//         isActive={selectedType === 'outcome'}
//         onClick={() => handleSelect('outcome')}
//       >
//         <input
//         {...field}
//           type="radio"
//           // ref={ref => {
//           //   inputRefs.current[1] = ref as HTMLInputElement;
//           // }}
//           ref={ref}
//           value="outcome"
//           {...rest}

//         />
//         <span>Saída</span>
//         <img src={outcome} alt="outcome" />
//       </TypeInput>
// )}
// />
//     </Container>
//   );

  return (
    <Container>
      <TypeInput
        transactionType="income"
        isActive={selectedType === 'income'}
        onClick={() => {handleSelect('income');handleSelect2('income')}}
      >
        <input
          type="radio"
          name='type'
          // ref={ref => {
          //   inputRefs.current[0] = ref as HTMLInputElement;
          // }}
          ref={ref}
          // ref={inputRef}
          value="income"
          // onSelect={onSelect2}
          {...rest}
        />
        <span>Entrada</span>
        <img src={income} alt="income" />
      </TypeInput>

      <TypeInput
        transactionType="outcome"
        isActive={selectedType === 'outcome'}
        onClick={() => {handleSelect('outcome'); handleSelect2('outcome')}}
      >
        <input
          type="radio"
          name='type'
          // onSelect={onSelect}
          // ref={inputRef}


          // ref={ref => {
          //   inputRefs.current[1] = ref as HTMLInputElement;
          // }}
          ref={ref}
          value="outcome"
          {...rest}

        />
        <span>Saída</span>
        <img src={outcome} alt="outcome" />
      </TypeInput>
    </Container>
  );
}
)

export default TransactionTypeSelector;
