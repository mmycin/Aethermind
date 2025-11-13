import { onMount, onCleanup } from 'solid-js';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface Dataset {
  label: string;
  data: number[];
  color?: string;
}

interface MultiBarChartProps {
  title: string;
  labels: string[];
  datasets: Dataset[];
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

export const MultiBarChart = (props: MultiBarChartProps) => {
  let canvasRef: HTMLCanvasElement | undefined;
  let chartInstance: Chart | undefined;

  onMount(() => {
    if (!canvasRef) return;

    const ctx = canvasRef.getContext('2d');
    if (!ctx) return;

    // Generate default colors (violet/cyan/indigo palette)
    const defaultColors = ['#8B5CF6', '#22D3EE', '#60A5FA', '#A78BFA', '#06B6D4', '#3B82F6'];

    // ✅ FIXED: Correct typing for barThickness ("flex" | number | undefined)
    const chartDatasets = props.datasets.map((dataset, index) => ({
      label: dataset.label,
      data: dataset.data,
      backgroundColor: dataset.color || defaultColors[index % defaultColors.length],
      borderRadius: 6,
      borderSkipped: false,
      hoverBackgroundColor: dataset.color ? `${dataset.color}dd` : `${defaultColors[index % defaultColors.length]}dd`,
      barThickness: props.horizontal ? undefined : ('flex' as const),
      maxBarThickness: 40,
    }));

    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: props.labels,
        datasets: chartDatasets,
      },
      options: {
        indexAxis: props.horizontal ? 'y' : 'x',
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: props.horizontal
            ? {
                stacked: props.stacked,
                grid: { display: false },
                ticks: {
                  color: '#00D9FF',
                  font: { size: 10, weight: 500, family: 'Inter, system-ui, sans-serif' }, // ✅ FIXED (weight as number)
                  crossAlign: 'far',
                  padding: 8,
                },
                border: {
                  color: 'rgba(0, 217, 255, 0.2)',
                  width: 1,
                },
              }
            : {
                stacked: props.stacked,
                beginAtZero: true,
                max: props.maxValue,
                grid: {
                  color: 'rgba(0, 217, 255, 0.08)',
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
                stacked: props.stacked,
                beginAtZero: true,
                max: props.maxValue,
                grid: {
                  color: 'rgba(0, 217, 255, 0.08)',
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
                stacked: props.stacked,
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
            display: props.showLegend !== false,
            position: 'top',
            align: 'end',
            labels: {
              color: '#00D9FF',
              font: {
                size: 12,
                family: 'Inter, system-ui, sans-serif',
                weight: 500,
              },
              padding: 15,
              usePointStyle: true,
              pointStyle: 'circle',
              boxWidth: 8,
              boxHeight: 8,
            },
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
            displayColors: true,
            boxWidth: 12,
            boxHeight: 12,
            callbacks: {
              label: (context) => {
                // ✅ FIXED: Prevent “value is possibly null”
                const value = typeof context.parsed.y === 'number' ? context.parsed.y : (context.parsed.x ?? 0);
                const suffix = props.tooltipSuffix || '';
                return ` ${context.dataset.label}: ${value.toFixed(2)}${suffix}`;
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
    chartInstance?.destroy();
  });

  return (
    <div
      class="bg-gradient-to-br from-[#0B1F2A] to-[#0D2631] 
              rounded-xl p-6 border border-cyan-800/40 
              shadow-[0_10px_25px_rgba(0,217,255,0.05)] 
              hover:shadow-[0_15px_35px_rgba(0,217,255,0.12)] 
              transition-shadow duration-300"
    >
      {/* Title */}
      <h3 class="text-xl font-bold mb-4 text-cyan-400 flex items-center gap-3">
        <div class="w-1.5 h-6 bg-cyan-400 rounded-full"></div>
        {props.title}
      </h3>

      {/* Chart */}
      <div class={`${props.height || 'h-80'} relative`}>
        <canvas ref={canvasRef}></canvas>
      </div>

      {/* Subtitle */}
      {props.subtitle && <p class="text-sm text-cyan-300/80 mt-4 leading-relaxed">{props.subtitle}</p>}
    </div>
  );

};
