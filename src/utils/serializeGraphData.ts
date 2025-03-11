import {
  format,
  addHours,
  formatISO,
  addDays,
  addMinutes,
  parseISO,
} from 'date-fns';
import {
  format as formatTZ,
  utcToZonedTime,
  zonedTimeToUtc,
} from 'date-fns-tz';
import { tint } from 'polished';
import { GraphData, Category } from '../schemas';
import Theme from '../styles/themes/theme';

export default function serializeGraphData(
  theme: Theme,
  data: any,
  type: 'donut' | 'line',
  tooltipLabel?: string,
): GraphData {
  if (type === 'donut') {
    return {
      labels: data.map((item: Category) => item.title),
      datasets: [
        {
          label: tooltipLabel ?? 'Transações por Categoria',
          ...data.reduce(
            (accumulator: any, current: Category) => {
              accumulator.data.push(
                current.transactionsCount
                  ? current.transactionsCount
                  : current.transactionsTotalValue,
              );
              accumulator.backgroundColor.push(
                theme.title === 'dark'
                  ? current.background_color_light
                  : current.background_color_dark,
              );

              accumulator.borderColor.push(
                theme.title === 'dark'
                  ? current.background_color_dark
                  : current.background_color_light,
              );

              return accumulator;
            },
            {
              data: [],
              backgroundColor: [],
              borderColor: [],
            },
          ),
        },
      ],
    };
  } else if (type === 'line') {
    return {
      labels: data.income.map((entry: any[]) =>
        format(new Date(entry[0]), 'dd/MM'),
      ),
      datasets: [
        {
          label: 'Entradas',
          fill: false,
          backgroundColor: theme.colors.success,
          borderColor: tint(0.1, theme.colors.success),
          borderJoinStyle: 'miter',
          data: data.income.map((entry: any[]) => entry[1]),
        },
        {
          label: 'Saídas',
          fill: false,
          borderColor: tint(0.1, theme.colors.danger),
          backgroundColor: theme.colors.danger,
          borderJoinStyle: 'miter',
          data: data.outcome.map((entry: any[]) => entry[1]),
        },
      ],
    };
  } else {
    return {
      labels: [],
      datasets: [],
    };
  }
}
