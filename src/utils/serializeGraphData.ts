import {
  format,
} from 'date-fns';
import { tint } from 'polished';
import { Category, type DonutGraphData, type LineGraphData } from '../schemas';
import Theme from '../styles/themes/theme';

interface LineData {
  income: [number, number][];
  outcome: [number, number][];
}

type DonutData = Category & {
  user_id: string;
}

export function serializeLineGraphData(theme: Theme, data: LineData,): LineGraphData {

  const line: LineGraphData = {
    labels: data.income.map((entry: number[]) =>
      format(new Date(entry[0]), 'dd/MM'),
    ),
    datasets: [
      {
        label: 'Entradas',
        fill: false,
        backgroundColor: theme.colors.success,
        borderColor: tint(0.1, theme.colors.success),
        borderJoinStyle: 'miter',
        data: data.income.map((entry: number[]) => entry[1]),
      },
      {
        label: 'Saídas',
        fill: false,
        borderColor: tint(0.1, theme.colors.danger),
        backgroundColor: theme.colors.danger,
        borderJoinStyle: 'miter',
        data: data.outcome.map((entry: number[]) => entry[1]),
      },
    ],
  };

  return line;
}

export function serializeDonutGraphData(theme: Theme, data: DonutData[], tooltipLabel: string): DonutGraphData {

  const donut: DonutGraphData = new Object() as DonutGraphData;
  donut.labels = data.map((item: Category) => item.title);

  donut.datasets = [
    {
      label: tooltipLabel ?? 'Transações por Categoria',
      data: [],
      backgroundColor: [],
      borderColor: [],
    },
  ];

  data.forEach((current: Category) => {
    donut.datasets[0].data.push(
      current.transactionsCount ?? current.transactionsTotalValue ?? 0,
    );
    donut.datasets[0].backgroundColor.push(
      theme.title === 'dark'
        ? current.background_color_light
        : current.background_color_dark,
    );

    donut.datasets[0].borderColor.push(
      theme.title === 'dark'
        ? current.background_color_dark
        : current.background_color_light,
    );
  });
    return donut;
}
