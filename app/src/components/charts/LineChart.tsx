import { onMount, onCleanup } from 'solid-js';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface LineChartProps {
  title: string;
  data: Array<{ label: string; value: number }>;
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

export const LineChart = (props: LineChartProps) => {
  let canvasRef: HTMLCanvasElement | undefined;
  let chartInstance: Chart | undefined;

  onMount(() => {
    if (!canvasRef) return;
    const ctx = canvasRef.getContext('2d');
    if (!ctx) return;

    const lineColor = props.lineColor || '#00D9FF';
    const fillColor = props.fillColor || 'rgba(0, 217, 255, 0.1)';

    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: props.data.map((item) => item.label),
        datasets: [
          {
            label: props.yAxisLabel || 'Value',
            data: props.data.map((item) => item.value),
            borderColor: lineColor,
            backgroundColor: fillColor,
            borderWidth: 3,
            tension: props.tension ?? 0.4,
            fill: props.showArea !== false,
            pointRadius: props.showPoints !== false ? 6 : 0,
            pointBackgroundColor: lineColor,
            pointBorderColor: '#0B1F2A',
            pointBorderWidth: 3,
            pointHoverRadius: props.showPoints !== false ? 8 : 0,
            pointHoverBackgroundColor: '#00F0FF',
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        interaction: {
          intersect: false,
          mode: 'index',
        },
        scales: {
          y: {
            beginAtZero: props.minValue === undefined,
            min: props.minValue,
            max: props.maxValue,
            grid: {
              color: 'rgba(0, 217, 255, 0.08)',
              lineWidth: 1,
            },
            ticks: {
              color: '#00D9FF',
              font: { size: 11, weight: 500, family: 'Inter, system-ui, sans-serif' },
              padding: 10,
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
                  padding: { top: 0, bottom: 10 },
                }
              : undefined,
          },
          x: {
            grid: {
              color: 'rgba(0, 217, 255, 0.05)',
              lineWidth: 1,
            },
            ticks: {
              color: '#00D9FF',
              font: { size: 11, weight: 'bold', family: 'Inter, system-ui, sans-serif' },
              maxRotation: 45,
              minRotation: 0,
            },
            border: {
              color: 'rgba(0, 217, 255, 0.2)',
              width: 1,
            },
            title: props.xAxisLabel
              ? {
                  display: true,
                  text: props.xAxisLabel,
                  color: '#00D9FF',
                  font: { size: 12, weight: 600 },
                  padding: { top: 10, bottom: 0 },
                }
              : undefined,
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
                const value = context.parsed.y ?? 0; // ✅ Fix “possibly null” error
                const suffix = props.tooltipSuffix || '';
                return ` ${context.dataset.label}: ${value.toFixed(2)}${suffix}`;
              },
            },
          },
        },
        animation: {
          duration: 1200,
          easing: 'easeInOutQuart',
        },
      },
    });
  });

  onCleanup(() => {
    chartInstance?.destroy();
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
