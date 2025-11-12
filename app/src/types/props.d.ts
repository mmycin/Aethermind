export interface BaseComponentProps {
  className?: string;
  style?: Record<string, string>;
  id?: string;
}

export interface TitledComponentProps extends BaseComponentProps {
  title: string;
  subtitle?: string;
}

export interface LoadingProps {
  isLoading?: boolean;
  loadingText?: string;
  loadingComponent?: JSX.Element;
}

export interface ErrorProps {
  error?: Error | string;
  onRetry?: () => void;
}

export interface ResponsiveProps {
  breakpoints?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}
