import { onMount, onCleanup } from 'solid-js';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface DoughnutChartProps {
  title: string;
  data: Array<{ label: string; value: number }>;
  showPercentage?: boolean;
  cutout?: string;
  legendPosition?: 'top' | 'bottom' | 'left' | 'right';
  height?: string;
  subtitle?: string;
}

export const DoughnutChart = (props: DoughnutChartProps) => {
  let canvasRef: HTMLCanvasElement | undefined;
  let chartInstance: Chart | undefined;

  onMount(() => {
    if (!canvasRef) return;

    const ctx = canvasRef.getContext('2d');
    if (!ctx) return;

    const totalValue = props.data.reduce((sum, item) => sum + item.value, 0);

    const labels = props.showPercentage
      ? props.data.map((item) => {
          const percent = ((item.value / totalValue) * 100).toFixed(1);
          return `${item.label} (${percent}%)`;
        })
      : props.data.map((item) => item.label);

    // Generate color palette
    const colors = props.data.map((_, index) => {
      const hue = 180 + index * 15; // Cyan spectrum
      const saturation = 100 - index * 10;
      const lightness = 50 - index * 5;
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    });

    chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            data: props.data.map((item) => item.value),
            backgroundColor: colors.length <= 2 ? ['#00D9FF', '#0B4A5F'] : colors,
            borderWidth: 0,
            hoverOffset: 10,
            hoverBorderWidth: 2,
            hoverBorderColor: '#fff',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: props.legendPosition || 'bottom',
            labels: {
              color: '#00D9FF',
              font: {
                size: 13,
                family: 'Inter, system-ui, -apple-system, sans-serif',
                weight: 'bold',
              },
              padding: 20,
              usePointStyle: true,
              pointStyle: 'circle',
              boxWidth: 10,
              boxHeight: 10,
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
                const value = context.parsed;
                const percent = ((value / totalValue) * 100).toFixed(1);
                return ` ${context.label}: ${value} (${percent}%)`;
              },
            },
          },
        },
        cutout: props.cutout || '68%',
        animation: {
          animateRotate: true,
          animateScale: true,
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
      <div class={`flex items-center justify-center ${props.height || 'h-64'}`}>
        <canvas ref={canvasRef}></canvas>
      </div>
      {props.subtitle && (
        <div class="mt-4 pt-4 border-t border-cyan-900/30">
          <p class="text-xs text-cyan-300/70 text-center leading-relaxed">{props.subtitle}</p>
        </div>
      )}
    </div>
  );
};
