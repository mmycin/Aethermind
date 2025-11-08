import { onMount, onCleanup } from 'solid-js';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

interface PieChartProps {
  labels: string[];
  data: number[];
  title?: string;
}

const PieChart = (props: PieChartProps) => {
  let canvasRef: HTMLCanvasElement | undefined;
  let chart: Chart | undefined;

  const createChart = () => {
    if (!canvasRef) return;

    chart = new Chart(canvasRef, {
      type: 'pie',
      data: {
        labels: props.labels,
        datasets: [
          {
            data: props.data,
            backgroundColor: ['#4ade80', '#60a5fa'],
            borderColor: ['#166534', '#1e3a8a'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // important for auto-scaling
        animation: { duration: 1000, easing: 'easeOutBounce' },
        plugins: {
          legend: { position: 'top' },
          title: { display: !!props.title, text: props.title },
          datalabels: {
            color: '#fff',
            font: (ctx) => {
              const size = Math.max(Math.round(ctx.chart.width / 20), 12); // dynamic font size
              return { size, weight: 'bold' };
            },
            formatter: (value: number) => value,
          },
        },
      },
      plugins: [ChartDataLabels],
    });
  };

  let resizeObserver: ResizeObserver | undefined;

  onMount(() => {
    createChart();

    if (canvasRef?.parentElement) {
      resizeObserver = new ResizeObserver(() => {
        chart?.resize();
        chart?.update(); // ensure font sizes are recalculated
      });
      resizeObserver.observe(canvasRef.parentElement);
    }
  });

  onCleanup(() => {
    chart?.destroy();
    resizeObserver?.disconnect();
  });

  return (
    <div style={{ width: '100%', height: '400px' /* set container height */ }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default PieChart;
