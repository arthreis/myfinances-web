import React, { useState, useEffect, useCallback } from 'react';
import * as Icons from 'react-icons/fi';
import * as IconsBi from 'react-icons/bi';
import Chart, { CategoryScale, LinearScale } from 'chart.js/auto';
import { Line, Doughnut } from 'react-chartjs-2';

import api from '../../../services/api';

import { useTheme } from '../../../hooks/theme';
import formatValue from '../../../utils/formatValue';
import getChartOptions from '../../../utils/getChartOptions';
import serializeGraphData from '../../../utils/serializeGraphData';

import {
  Container,
  Widget,
  OverviewGridContainer,
  GraphGridContainer,
} from './styles';

import { Category, GraphData } from '../../../services/interfaces';
import { format } from 'date-fns';

Chart.register(CategoryScale, LinearScale);

interface OverviewData {
  income: string;
  outcome: string;
  category?: Category;
}

interface DonutGraphFilter {
  type: 'count' | 'value';
}
interface LineGraphFilter {
  period: 'week' | 'month';
}

interface DashboardGraphViewProps {
  period: Date;
}

function DashboardGraphView({
  period,
}: DashboardGraphViewProps): React.JSX.Element {
  const [donutData, setDonutData] = useState<GraphData>(() => {
    return {
      labels: [],
      datasets: [],
    };
  });
  const [lineData, setLineData] = useState<GraphData>(() => {
    return {
      labels: [],
      datasets: [],
    };
  });
  const [overviewData, setOverviewData] = useState<OverviewData>(() => {
    return {
      income: '0',
      outcome: '0',
      category: undefined,
    };
  });
  const [lineFilters, setLineFilters] = useState<LineGraphFilter>({
    period: 'week',
  });
  const [donutGraphFilters, setDonutGraphFilters] = useState<DonutGraphFilter>({
    type: 'count',
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
      const donutSerializedData = serializeGraphData(
        theme,
        donut.data,
        'donut',
        tooltipLabel,
      );

      const lineSerializedData = serializeGraphData(theme, line.data, 'line');

      setDonutData(donutSerializedData);
      setLineData(lineSerializedData);
      setOverviewData(overview.data);
    }

    loadData();
  }, [theme, lineFilters.period, period, donutGraphFilters.type]);

  let CategoryIcon: any;

  if (overviewData.category) {
    CategoryIcon = (Icons as any)[overviewData.category.icon];
  }

  const handleLineFilters = useCallback(
    (period: 'week' | 'month') => {
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
          <h2>{formatValue(parseFloat(overviewData.income))}</h2>
        </Widget>
        <Widget borderLeftColor={theme.colors.danger}>
          <header>
            <p>Maior saida</p>
          </header>
          <h2>{formatValue(parseFloat(overviewData.outcome))}</h2>
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
              {lineFilters.period === 'week'
                ? 'Acúmulo diário'
                : 'Acúmulo semanal'}
            </p>

            <div className="flex">
              <span
                className={lineFilters.period === 'week' ? 'active' : undefined}
                onClick={() => handleLineFilters('week')}
              >
                <IconsBi.BiCalendar size={20} />
              </span>
              <span
                className={
                  lineFilters.period === 'month' ? 'active' : undefined
                }
                onClick={() => handleLineFilters('month')}
              >
                <IconsBi.BiCalendarWeek size={20} />
              </span>
            </div>
          </header>

          <div>
            <Line data={lineData} options={getChartOptions(theme, 'line')} />
          </div>
          <span>
            Obs: Transações de dias fora do mês selecionado, não são contabilizados.
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
                className={
                  donutGraphFilters.type === 'count' ? 'active' : undefined
                }
                onClick={() => handleDonutGraphFilters('count')}
              >
                <Icons.FiHash size={20} />
              </span>
              <span
                className={
                  donutGraphFilters.type === 'value' ? 'active' : undefined
                }
                onClick={() => handleDonutGraphFilters('value')}
              >
                <Icons.FiDollarSign size={20} />
              </span>
            </div>
          </header>
          <div>
            <Doughnut
              data={donutData}
              options={getChartOptions(theme, 'donut')}
            />
          </div>
        </Widget>
      </GraphGridContainer>
    </Container>
  );
}

export default DashboardGraphView;
