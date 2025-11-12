export interface DashboardSection {
  id: string;
  title: string;
  component: JSX.Element;
  order: number;
  visible: boolean;
}

export interface DashboardConfig {
  title: string;
  subtitle?: string;
  sections: DashboardSection[];
  theme: ThemeColors;
}

export interface FilterOptions {
  ageGroup?: string[];
  zone?: string[];
  reason?: string[];
  gender?: ('M' | 'F')[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface DashboardFilters {
  active: FilterOptions;
  available: FilterOptions;
  onChange: (filters: FilterOptions) => void;
}
