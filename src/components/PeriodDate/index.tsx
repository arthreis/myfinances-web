/* eslint-disable import/no-duplicates */
import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { format } from 'date-fns';
import brLocale from 'date-fns/locale/pt-BR';
import { Container, SelectDate } from './styles';

interface InputProps {
  date: Date;
}

export default function PeriodDate({ date }: InputProps): React.JSX.Element {
  const [periodDate, setPeriodDate] = React.useState(date);

  const increasePeriod = (): void => {
    periodDate.setMonth(periodDate.getMonth() + 1);
    return setPeriodDate(new Date(periodDate));
  };

  const decreasePeriod = (): void => {
    periodDate.setMonth(periodDate.getMonth() - 1);
    return setPeriodDate(new Date(periodDate));
  };

  return (
    <Container>
      <FiChevronLeft
        size={25}
        style={{ paddingBottom: 0, cursor: 'pointer', marginRight: 24 }}
        onClick={decreasePeriod}
      />

      <SelectDate>
        {format(periodDate, "MMMM ',' yyyy", { locale: brLocale })}
      </SelectDate>

      <FiChevronRight
        size={25}
        style={{ paddingBottom: 0, cursor: 'pointer', marginLeft: 24 }}
        onClick={increasePeriod}
      />
    </Container>
  );
}
