import { onMount, onCleanup } from 'solid-js';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface BarChartProps {
  title: string;
  data: Array<{ label: string; value: number }>;
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

export const BarChart = (props: BarChartProps) => {
  let canvasRef: HTMLCanvasElement | undefined;
  let chartInstance: Chart | undefined;

  onMount(() => {
    if (!canvasRef) return;

    const ctx = canvasRef.getContext('2d');
    if (!ctx) return;

    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: props.data.map((item) => item.label),
        datasets: [
          {
            label: props.yAxisLabel || 'Value',
            data: props.data.map((item) => item.value),
            backgroundColor: props.barColor || '#00D9FF',
            borderRadius: 6,
            borderSkipped: false,
            hoverBackgroundColor: '#00F0FF',
            barThickness: props.horizontal ? undefined : 'flex',
            maxBarThickness: props.horizontal ? 30 : 60,
          },
        ],
      },
      options: {
        indexAxis: props.horizontal ? 'y' : 'x',
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: props.horizontal
            ? {
                grid: { display: false },
                ticks: {
                  color: '#00D9FF',
                  font: { size: 10, weight: 500, family: 'Inter, system-ui, sans-serif' },
                  crossAlign: 'far',
                  padding: 8,
                },
                border: {
                  color: 'rgba(0, 217, 255, 0.2)',
                  width: 1,
                },
              }
            : {
                beginAtZero: true,
                max: props.maxValue,
                grid: {
                  color: props.showGrid !== false ? 'rgba(0, 217, 255, 0.08)' : 'transparent',
                  lineWidth: 1,
                },
                ticks: {
                  color: '#00D9FF',
                  font: { size: 11, weight: 500, family: 'Inter, system-ui, sans-serif' },
                  padding: 8,
                  callback: function (value) {
                    return typeof value === 'number' ? value.toFixed(0) : value;
                  },
                },
                border: {
                  color: 'rgba(0, 217, 255, 0.2)',
                  width: 1,
                },
                title: props.yAxisLabel
                  ? {
                      display: true,
                      text: props.yAxisLabel,
                      color: '#00D9FF',
                      font: { size: 12, weight: 600 },
                    }
                  : undefined,
              },
          x: props.horizontal
            ? {
                beginAtZero: true,
                max: props.maxValue,
                grid: {
                  color: props.showGrid !== false ? 'rgba(0, 217, 255, 0.08)' : 'transparent',
                  lineWidth: 1,
                },
                ticks: {
                  color: '#00D9FF',
                  font: { size: 11, weight: 500, family: 'Inter, system-ui, sans-serif' },
                  padding: 8,
                },
                border: {
                  color: 'rgba(0, 217, 255, 0.2)',
                  width: 1,
                },
              }
            : {
                grid: { display: false },
                ticks: {
                  color: '#00D9FF',
                  font: { size: 11, weight: 500, family: 'Inter, system-ui, sans-serif' },
                  maxRotation: 45,
                  minRotation: 0,
                  autoSkip: false,
                },
                border: {
                  color: 'rgba(0, 217, 255, 0.2)',
                  width: 1,
                },
              },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: 'rgba(11, 31, 42, 0.95)',
            titleColor: '#00D9FF',
            titleFont: { size: 14, weight: 'bold' },
            bodyColor: '#fff',
            bodyFont: { size: 13 },
            borderColor: '#00D9FF',
            borderWidth: 1,
            padding: 14,
            displayColors: false,
            callbacks: {
              label: (context) => {
                const value = context.parsed.y || context.parsed.x;
                const suffix = props.tooltipSuffix || '';
                return ` ${context.dataset.label}: ${value?.toFixed(2)}${suffix}`;
              },
            },
          },
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart',
        },
      },
    });
  });

  onCleanup(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }
  });

  return (
    <div class="bg-linear-to-br from-[#0D2631] to-[#0B1F2A] rounded-xl p-6 border border-cyan-900/30 shadow-lg hover:shadow-cyan-900/20 transition-shadow duration-300">
      <h3 class="text-xl font-semibold mb-6 text-cyan-400 flex items-center gap-3">
        <div class="w-1 h-6 bg-cyan-400 rounded-full"></div>
        {props.title}
      </h3>
      <div class={props.height || 'h-80'}>
        <canvas ref={canvasRef}></canvas>
      </div>
      {props.subtitle && <p class="text-sm text-cyan-300/70 mt-4 leading-relaxed">{props.subtitle}</p>}
    </div>
  );
};
