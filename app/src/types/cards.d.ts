export interface InfoCardProps {
  title: string;
  content: string | JSX.Element;
  icon?: JSX.Element;
  variant?: 'primary' | 'secondary' | 'tertiary';
  compact?: boolean;
}

export interface InfoCardData {
  title: string;
  content: string;
  icon?: JSX.Element;
}

export interface InfoCardGridProps {
  cards: InfoCardData[];
  columns?: 1 | 2 | 3 | 4;
  compact?: boolean;
}

export interface TrendData {
  value: number;
  isPositive?: boolean;
}

export interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: JSX.Element;
  trend?: TrendData;
  subtitle?: string;
  size?: 'sm' | 'md' | 'lg';
}

export interface StatCardData {
  label: string;
  value: string | number;
  unit?: string;
  icon?: JSX.Element;
  trend?: TrendData;
  subtitle?: string;
}

export interface StatCardGridProps {
  stats: StatCardData[];
  columns?: 2 | 3 | 4;
  size?: 'sm' | 'md' | 'lg';
}
