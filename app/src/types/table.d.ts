export interface TableColumn {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  format?: (value: any) => string;
  highlight?: (value: any) => boolean;
  highlightThreshold?: number;
}


export interface Column {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  format?: (value: any) => string;
  highlight?: (value: any) => boolean;
  highlightThreshold?: number;
}

export interface DataTableProps {
  title: string;
  columns: Column[]; // ✅ Array of Column objects, not strings
  data: Array<Record<string, any>>;
  subtitle?: string;
  striped?: boolean;
  hover?: boolean;
  compact?: boolean;
}
