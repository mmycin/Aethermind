export interface HeatmapDataPoint {
  x: string;
  y: string;
  value: number;
}

export interface HeatmapChartProps {
  title: string;
  data: HeatmapDataPoint[];
  xLabels: string[];
  yLabels: string[];
  subtitle?: string;
  minValue?: number;
  maxValue?: number;
  colorScheme?: 'cyan' | 'blue' | 'green';
  showValues?: boolean;
  compact?: boolean;
}

// ============================================
// UTILITY TYPES
// ============================================

export type ColorScheme = 'cyan' | 'blue' | 'green' | 'purple' | 'red' | 'orange';

export type ChartType = 'bar' | 'line' | 'doughnut' | 'pie' | 'radar' | 'polarArea';

export type Alignment = 'left' | 'center' | 'right';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ChartOptions {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  animation?: boolean;
  animationDuration?: number;
  showGrid?: boolean;
  showLegend?: boolean;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  border: string;
}
