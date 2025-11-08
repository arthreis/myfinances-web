import Theme from '../styles/themes/theme';

interface DonutChartLegendOptions {
  legend: {
    labels: {
      fontColor: string;
      fontStyle: string;
      fontFamily: string;
      color: string;
    };
    position: string;
    align: string;
  };
}

interface LineChartLegendOptions {
  defaultFontColor: string;
  defaultFontFamily: string;
  defaultFontStyle: string;
  legend: {
    labels: {
      fontColor: string;
      fontFamily: string;
      fontStyle: string;
      color: string;
    };
  };
  tooltips: {
    mode: string;
    intersect: boolean;
  };
  scales: {
    x: {
      ticks: {
        color: string;
      };
    };
    y: {
      ticks: {
        color: string;
        maxTicksLimit: number;
      };
    };
  };
}

export default function getChartOptions(
  theme: Theme,
  type: 'donut' | 'line',
): DonutChartLegendOptions | LineChartLegendOptions {
  if (type === 'donut') {
    return {
      legend: {
        labels: {
          fontColor: theme.colors.primaryText,
          fontStyle: '500',
          fontFamily: "'Poppins', sans-serif",
          color: 'red',
        },
        position: 'left',
        align: 'center',
      },
    };
  }
  return {
    defaultFontColor: theme.colors.primaryText,
    defaultFontFamily: "'Poppins', sans-serif",
    defaultFontStyle: '500',
    legend: {
      labels: {
        fontColor: theme.colors.primaryText,
        fontFamily: "'Poppins', sans-serif",
        fontStyle: '500',
        color: 'red',
      },
    },
    tooltips: {
      mode: 'x',
      intersect: false,
    },
    scales: {
      x: {
        ticks: {
          color: theme.colors.primaryText,
        },
      },
      y: {
        ticks: {
          color: theme.colors.primaryText,
          maxTicksLimit: 5,
        },
      },
    },
  };
}
