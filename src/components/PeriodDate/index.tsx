/* eslint-disable import/no-duplicates */
import React, { useCallback } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { format } from 'date-fns';
import brLocale from 'date-fns/locale/pt-BR';
import { Container, SelectDate } from './styles';

interface InputProps {
  date: Date;
  onChangePeriod(period: Date): void;
}

export default function PeriodDate({
  date,
  onChangePeriod,
}: InputProps): React.JSX.Element {
  const [periodDate, setPeriodDate] = React.useState(date);

  const handlePeriod = (type: 'increase' | 'decrease'): void => {
    if (type === 'increase') {
      periodDate.setMonth(periodDate.getMonth() + 1);
    } else {
      periodDate.setMonth(periodDate.getMonth() - 1);
    }
    setPeriodDate(new Date(periodDate));
    onChangePeriod(new Date(periodDate));
  };

  return (
    <Container>
      <FiChevronLeft
        size={25}
        style={{ paddingBottom: 0, cursor: 'pointer', marginRight: 24 }}
        onClick={() => handlePeriod('decrease')}
      />

      <SelectDate>
        {format(periodDate, "MMMM ',' yyyy", { locale: brLocale })}
      </SelectDate>

      <FiChevronRight
        size={25}
        style={{ paddingBottom: 0, cursor: 'pointer', marginLeft: 24 }}
        onClick={() => handlePeriod('increase')}
      />
    </Container>
  );
}
