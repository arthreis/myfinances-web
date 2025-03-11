import React, { type ComponentProps } from 'react';
import income from '@/assets/income.svg';
import outcome from '@/assets/outcome.svg';

import { Container, TypeInput } from './styles';

export type SelectedType = 'income' | 'outcome';

type TransactionTypeSelectorProps = ComponentProps<'input'> & {
  onSelectRadio(selectedType: SelectedType): void;
  radioValue?: SelectedType;
};

const TransactionTypeSelector = React.forwardRef<
  HTMLInputElement,
  TransactionTypeSelectorProps
>(({ onSelectRadio, radioValue, ...rest }, ref) => {
  const [selectedType, setSelectedType] = React.useState<SelectedType>();

  const handleSelect = React.useCallback((selectedType: SelectedType) => {
    setSelectedType(selectedType);
    onSelectRadio(selectedType);
  }, []);

  React.useEffect(() => {
    if (radioValue) {
      setSelectedType(radioValue);
      onSelectRadio(radioValue);
    }
  }, []);

  return (
    <Container>
      <TypeInput
        transactionType="income"
        isActive={selectedType === 'income'}
        onClick={() => {
          handleSelect('income');
        }}
      >
        <input type="radio" ref={ref} value="income" {...rest} />
        <span>Entrada</span>
        <img src={income} alt="income" />
      </TypeInput>

      <TypeInput
        transactionType="outcome"
        isActive={selectedType === 'outcome'}
        onClick={() => {
          handleSelect('outcome');
        }}
      >
        <input type="radio" ref={ref} value="outcome" {...rest} />
        <span>Saída</span>
        <img src={outcome} alt="outcome" />
      </TypeInput>
    </Container>
  );
});

export default TransactionTypeSelector;
