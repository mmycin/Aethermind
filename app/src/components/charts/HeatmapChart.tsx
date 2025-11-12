import { For } from 'solid-js';

interface HeatmapData {
  x: string;
  y: string;
  value: number;
}

interface HeatmapChartProps {
  title: string;
  data: HeatmapData[];
  xLabels: string[];
  yLabels: string[];
  subtitle?: string;
  minValue?: number;
  maxValue?: number;
  colorScheme?: 'cyan' | 'blue' | 'green';
  showValues?: boolean;
  compact?: boolean;
}

export const HeatmapChart = (props: HeatmapChartProps) => {
  const getColorIntensity = (value: number): string => {
    const min = props.minValue ?? Math.min(...props.data.map((d) => d.value));
    const max = props.maxValue ?? Math.max(...props.data.map((d) => d.value));
    const normalized = (value - min) / (max - min);

    const colorSchemes = {
      cyan: {
        light: 'rgba(0, 217, 255, 0.1)',
        medium: 'rgba(0, 217, 255, 0.4)',
        high: 'rgba(0, 217, 255, 0.7)',
        intense: 'rgba(0, 217, 255, 0.95)',
      },
      blue: {
        light: 'rgba(59, 130, 246, 0.1)',
        medium: 'rgba(59, 130, 246, 0.4)',
        high: 'rgba(59, 130, 246, 0.7)',
        intense: 'rgba(59, 130, 246, 0.95)',
      },
      green: {
        light: 'rgba(34, 197, 94, 0.1)',
        medium: 'rgba(34, 197, 94, 0.4)',
        high: 'rgba(34, 197, 94, 0.7)',
        intense: 'rgba(34, 197, 94, 0.95)',
      },
    };

    const scheme = colorSchemes[props.colorScheme || 'cyan'];

    if (normalized < 0.25) return scheme.light;
    if (normalized < 0.5) return scheme.medium;
    if (normalized < 0.75) return scheme.high;
    return scheme.intense;
  };

  const getCellValue = (x: string, y: string): number => {
    const cell = props.data.find((d) => d.x === x && d.y === y);
    return cell?.value ?? 0;
  };

  const formatValue = (value: number): string => {
    return value % 1 === 0 ? value.toString() : value.toFixed(1);
  };

  return (
    <div class="bg-linear-to-br from-[#0D2631] to-[#0B1F2A] rounded-xl p-6 border border-cyan-900/30 shadow-lg hover:shadow-cyan-900/20 transition-shadow duration-300 overflow-hidden">
      <h3 class="text-xl font-semibold mb-6 text-cyan-400 flex items-center gap-3">
        <div class="w-1 h-6 bg-cyan-400 rounded-full"></div>
        {props.title}
      </h3>

      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr>
              <th class="p-2"></th>
              <For each={props.xLabels}>
                {(label) => (
                  <th
                    class={`text-cyan-400 font-semibold text-center ${props.compact ? 'text-xs p-2' : 'text-sm p-3'}`}
                  >
                    {label}
                  </th>
                )}
              </For>
            </tr>
          </thead>
          <tbody>
            <For each={props.yLabels}>
              {(yLabel) => (
                <tr>
                  <td class={`text-cyan-400 font-semibold ${props.compact ? 'text-xs p-2' : 'text-sm p-3'}`}>
                    {yLabel}
                  </td>
                  <For each={props.xLabels}>
                    {(xLabel) => {
                      const value = getCellValue(xLabel, yLabel);
                      const bgColor = getColorIntensity(value);

                      return (
                        <td
                          class={`text-center border border-cyan-900/20 transition-all duration-200 hover:scale-105 hover:z-10 relative ${props.compact ? 'p-2' : 'p-4'}`}
                          style={{ 'background-color': bgColor }}
                        >
                          {props.showValues !== false && (
                            <span
                              class={`font-semibold ${value > 50 ? 'text-white' : 'text-cyan-300'} ${props.compact ? 'text-xs' : 'text-sm'}`}
                            >
                              {formatValue(value)}
                            </span>
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

      {/* Legend */}
      <div class="mt-6 flex items-center justify-center gap-4">
        <span class="text-xs text-cyan-400/70">Low</span>
        <div class="flex gap-1">
          <For each={[0.1, 0.3, 0.5, 0.7, 0.9]}>
            {(intensity) => {
              const min = props.minValue ?? 0;
              const max = props.maxValue ?? 100;
              const value = min + (max - min) * intensity;
              return <div class="w-8 h-4 rounded" style={{ 'background-color': getColorIntensity(value) }}></div>;
            }}
          </For>
        </div>
        <span class="text-xs text-cyan-400/70">High</span>
      </div>

      {props.subtitle && (
        <p class="text-sm text-cyan-300/70 mt-6 pt-4 border-t border-cyan-900/30 leading-relaxed">{props.subtitle}</p>
      )}
    </div>
  );
};
