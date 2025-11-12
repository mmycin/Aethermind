export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface DoughnutChartProps {
  title: string;
  data: ChartDataPoint[];
  showPercentage?: boolean;
  cutout?: string;
  legendPosition?: 'top' | 'bottom' | 'left' | 'right';
  height?: string;
  subtitle?: string;
}

export interface BarChartProps {
  title: string;
  data: ChartDataPoint[];
  horizontal?: boolean;
  height?: string;
  subtitle?: string;
  yAxisLabel?: string;
  xAxisLabel?: string;
  maxValue?: number;
  showGrid?: boolean;
  barColor?: string;
  tooltipSuffix?: string;
}

export interface LineChartProps {
  title: string;
  data: ChartDataPoint[];
  height?: string;
  subtitle?: string;
  yAxisLabel?: string;
  xAxisLabel?: string;
  maxValue?: number;
  minValue?: number;
  lineColor?: string;
  fillColor?: string;
  tension?: number;
  showPoints?: boolean;
  tooltipSuffix?: string;
  showArea?: boolean;
}

export interface MultiBarDataset {
  label: string;
  data: number[];
  color?: string;
}

export interface MultiBarChartProps {
  title: string;
  labels: string[];
  datasets: MultiBarDataset[];
  horizontal?: boolean;
  stacked?: boolean;
  height?: string;
  subtitle?: string;
  yAxisLabel?: string;
  xAxisLabel?: string;
  maxValue?: number;
  showLegend?: boolean;
  tooltipSuffix?: string;
}
