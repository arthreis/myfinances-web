import type React from 'react';
import { useState, useEffect, useCallback } from 'react';
import * as Icons from 'react-icons/fi';
import * as IconsBi from 'react-icons/bi';
import Chart, { CategoryScale, LinearScale } from 'chart.js/auto';
import { Line, Doughnut } from 'react-chartjs-2';

import api from '@/services/api';

import { useTheme } from '@/hooks/theme';
import formatValue from '@/utils/formatValue';
import getChartOptions from '@/utils/getChartOptions';
import {serializeDonutGraphData, serializeLineGraphData} from '@/utils/serializeGraphData';

import {
  Container,
  Widget,
  OverviewGridContainer,
  GraphGridContainer,
} from './styles';

import type { Category, DonutGraphData, IconMap, LineGraphData } from '@/schemas';
import { format } from 'date-fns';
import type { IconType } from 'react-icons/lib';

Chart.register(CategoryScale, LinearScale);

interface OverviewData {
  income: number;
  outcome: number;
  category?: Category;
}
interface DonutGraphFilter {
  type: 'count' | 'value';
}
interface LineGraphFilter {
  period: 'week' | 'day';
}
interface DashboardGraphViewProps {
  readonly period: Date;
}

export default function DashboardGraphView({
  period,
}: DashboardGraphViewProps): React.JSX.Element {

  const [donutData, setDonutData] = useState<DonutGraphData>(() => {
    return {
      labels: [],
      datasets: [],
    };
  });
  const [lineData, setLineData] = useState<LineGraphData>(() => {
    return {
      labels: [],
      datasets: [],
    };
  });
  const [overviewData, setOverviewData] = useState<OverviewData>(() => {
    return {
      income: 0,
      outcome: 0,
      category: undefined,
    };
  });
  const [lineFilters, setLineFilters] = useState<LineGraphFilter>({
    period: 'week',
  });
  const [donutGraphFilters, setDonutGraphFilters] = useState<DonutGraphFilter>({
    type: 'value',
  });

  const { theme } = useTheme();

  useEffect(() => {
    async function loadData(): Promise<void> {
      const periodFormated = format(period, 'yyyy-MM');

      const urlOverviewData = `/transactions/overview-data?period=${periodFormated}`;
      const urlCountByCategory = `/transactions/count-by-category?period=${periodFormated}`;
      const urlValueByCategory = `/transactions/value-by-category?period=${periodFormated}&type=outcome`;
      const urlBalanceGraph = `/transactions/balance-graph?period=${lineFilters.period}&date=${periodFormated}`;

      const tooltipLabel =
        donutGraphFilters.type === 'count'
          ? 'Transações por Categoria'
          : 'Valor por categoria';

      const promises = Promise.all([
        api.get(urlOverviewData),
        api.get(
          donutGraphFilters.type === 'count'
            ? urlCountByCategory
            : urlValueByCategory,
        ),
        api.get(urlBalanceGraph),
      ]);

      const [overview, donut, line] = await promises;

      const donutSerializedData = serializeDonutGraphData(theme, donut.data, tooltipLabel);
      const lineSerializedData = serializeLineGraphData(theme, line.data);

      setDonutData(donutSerializedData);
      setLineData(lineSerializedData);
      setOverviewData(overview.data);
    }

    loadData();
  }, [theme, lineFilters.period, period, donutGraphFilters.type]);

  let CategoryIcon: IconMap[keyof IconMap] | IconType;

  if (overviewData.category) {
    CategoryIcon = (Icons as IconMap)[overviewData.category.icon] || Icons.FiTag;
  }

  const handleLineFilters = useCallback(
    (period: 'week' | 'day') => {
      const newLineFilters = {
        ...lineFilters,
        period,
      };
      setLineFilters(newLineFilters);
    },
    [lineFilters],
  );

  const handleDonutGraphFilters = useCallback(
    (type: 'count' | 'value') => {
      const newFilters = {
        ...donutGraphFilters,
        type,
      };
      setDonutGraphFilters(newFilters);
    },
    [donutGraphFilters],
  );

  return (
    <Container>
      <OverviewGridContainer>
        <Widget borderLeftColor={theme.colors.success}>
          <header>
            <p>Maior entrada</p>
          </header>
          <h2>{formatValue(overviewData.income)}</h2>
        </Widget>
        <Widget borderLeftColor={theme.colors.danger}>
          <header>
            <p>Maior saida</p>
          </header>
          <h2>{formatValue(overviewData.outcome)}</h2>
        </Widget>
        <Widget borderLeftColor={theme.colors.secondary}>
          <header>
            <p>Categ. mais frequente</p>
          </header>
          {overviewData.category && (
            <h2>
              <CategoryIcon
                color={
                  theme.title === 'dark'
                    ? overviewData.category.background_color_dark
                    : overviewData.category.background_color_light
                }
              />
              <span>{overviewData.category.title}</span>
            </h2>
          )}
        </Widget>
      </OverviewGridContainer>
      <GraphGridContainer>
        <Widget>
          <header>
            <p>
              {lineFilters.period === 'day'
                ? 'Acúmulo diário'
                : 'Acúmulo semanal'}
            </p>

            <div className="flex">
              <span
                className={lineFilters.period === 'day' ? 'active' : undefined}
                onClick={() => handleLineFilters('day')}
                onKeyUp={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleLineFilters('day');
                  }
                }}
              >
                <IconsBi.BiCalendar size={20} />
              </span>
              <span
                className={lineFilters.period === 'week' ? 'active' : undefined}
                onClick={() => handleLineFilters('week')}
                onKeyUp={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                  handleLineFilters('week')
                  }
                }}
              >
                <IconsBi.BiCalendarWeek size={20} />
              </span>
            </div>
          </header>

          <div>
            <Line data={lineData} options={getChartOptions(theme, 'line')} />
          </div>
          <span>
            Obs: Transações de dias fora do mês selecionado, não são
            contabilizados.
          </span>
        </Widget>
        <Widget>
          <header>
            <p>
              {donutGraphFilters.type === 'count'
                ? 'Quantidade de transações por categoria'
                : 'Gastos por categoria'}
            </p>
            <div className="flex">
              <span
                className={donutGraphFilters.type === 'value' ? 'active' : undefined}
                onClick={() => handleDonutGraphFilters('value')}
                onKeyUp={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleDonutGraphFilters('value');
                  }
                }}
              >
                <Icons.FiDollarSign size={20} />
              </span>
              <span
                className={donutGraphFilters.type === 'count' ? 'active' : undefined}
                onClick={() => handleDonutGraphFilters('count')}
                onKeyUp={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleDonutGraphFilters('count');
                  }
                } }
              >
                <Icons.FiHash size={20} />
              </span>
            </div>
          </header>
          <div>
            <Doughnut data={donutData} options={getChartOptions(theme, 'donut')} />
          </div>
        </Widget>
      </GraphGridContainer>
    </Container>
  );
}
