import { For } from 'solid-js';
import type { Column } from '../types/table';



export interface DataTableProps {
  title: string;
  columns: Column[];
  data: Array<Record<string, any>>;
  subtitle?: string;
  striped?: boolean;
  hover?: boolean;
  compact?: boolean;
}

export const DataTable = (props: DataTableProps) => {
  const getAlignment = (align?: string) => {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  };

  const formatValue = (value: any, column: Column) => {
    if (column.format) return column.format(value);
    if (typeof value === 'number') return value % 1 === 0 ? value.toString() : value.toFixed(2);
    return value?.toString() || '-';
  };

  const shouldHighlight = (value: any, column: Column) => {
    if (column.highlight) return column.highlight(value);
    if (column.highlightThreshold !== undefined && typeof value === 'number') {
      return value > column.highlightThreshold;
    }
    return false;
  };

  return (
    <div class="bg-linear-to-br from-[#0D2631] to-[#0B1F2A] rounded-xl p-6 border border-cyan-900/30 shadow-lg hover:shadow-cyan-900/20 transition-shadow duration-300 overflow-hidden">
      <h3 class="text-xl font-semibold mb-6 text-cyan-400 flex items-center gap-3">
        <div class="w-1 h-6 bg-cyan-400 rounded-full"></div>
        {props.title}
      </h3>

      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b-2 border-cyan-900/40">
              <For each={props.columns}>
                {(column) => (
                  <th class={`py-4 px-4 text-cyan-400 font-semibold ${getAlignment(column.align)} whitespace-nowrap`}>
                    {column.label}
                  </th>
                )}
              </For>
            </tr>
          </thead>
          <tbody>
            <For each={props.data}>
              {(row, index) => (
                <tr
                  class={`
                    border-b border-cyan-900/20
                    ${props.hover !== false ? 'hover:bg-cyan-900/10 transition-colors duration-150' : ''}
                    ${props.striped && index() % 2 === 1 ? 'bg-cyan-900/5' : ''}
                  `}
                >
                  <For each={props.columns}>
                    {(column, colIndex) => {
                      const value = row[column.key];
                      const isHighlighted = shouldHighlight(value, column);
                      const isFirstCol = colIndex() === 0;

                      return (
                        <td
                          class={`
                            ${props.compact ? 'py-2' : 'py-3'} px-4
                            ${getAlignment(column.align)}
                            ${isFirstCol ? 'text-cyan-300 font-medium' : 'text-cyan-300/90'}
                          `}
                        >
                          {isHighlighted ? (
                            <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                              {formatValue(value, column)}
                            </span>
                          ) : (
                            <span>{formatValue(value, column)}</span>
                          )}
                        </td>
                      );
                    }}
                  </For>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </div>

      {props.subtitle && (
        <p class="text-sm text-cyan-300/70 mt-6 pt-4 border-t border-cyan-900/30 leading-relaxed">{props.subtitle}</p>
      )}

      <div class="mt-4 pt-4 border-t border-cyan-900/20">
        <p class="text-xs text-cyan-400/60 text-right">Total Records: {props.data.length}</p>
      </div>
    </div>
  );
};
