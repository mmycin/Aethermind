import type { JSX } from 'solid-js';

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: JSX.Element;
  trend?: {
    value: number;
    isPositive?: boolean;
  };
  subtitle?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const StatCard = (props: StatCardProps) => {
  const getSizeStyles = () => {
    switch (props.size) {
      case 'sm':
        return {
          padding: 'p-4',
          valueSize: 'text-2xl',
          labelSize: 'text-xs',
          subtitleSize: 'text-xs',
        };
      case 'lg':
        return {
          padding: 'p-8',
          valueSize: 'text-5xl',
          labelSize: 'text-base',
          subtitleSize: 'text-sm',
        };
      default:
        return {
          padding: 'p-6',
          valueSize: 'text-4xl',
          labelSize: 'text-sm',
          subtitleSize: 'text-xs',
        };
    }
  };

  const styles = getSizeStyles();

  return (
    <div
      class={`
        bg-linear-to-br from-[#0D2631] to-[#0B1F2A] 
        rounded-xl border border-cyan-900/30 
        ${styles.padding}
        shadow-lg hover:shadow-cyan-900/20 
        transition-all duration-300
        hover:border-cyan-700/50
      `}
    >
      <div class="flex items-start justify-between mb-3">
        <div class={`text-cyan-400/70 font-medium uppercase tracking-wider ${styles.labelSize}`}>{props.label}</div>
        {props.icon && <div class="text-cyan-400/50">{props.icon}</div>}
      </div>

      <div class="flex items-baseline gap-2">
        <div class={`font-bold text-cyan-300 ${styles.valueSize}`}>
          {typeof props.value === 'number' ? props.value.toLocaleString() : props.value}
        </div>
        {props.unit && <div class="text-cyan-400/60 text-lg font-medium">{props.unit}</div>}
      </div>

      {props.trend && (
        <div class="mt-2 flex items-center gap-2">
          <div
            class={`
              text-xs font-semibold px-2 py-1 rounded-full
              ${props.trend.isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}
            `}
          >
            {props.trend.isPositive ? '↑' : '↓'} {Math.abs(props.trend.value)}%
          </div>
        </div>
      )}

      {props.subtitle && (
        <div class={`mt-3 text-cyan-300/60 ${styles.subtitleSize} leading-relaxed`}>{props.subtitle}</div>
      )}
    </div>
  );
};

interface StatCardGridProps {
  stats: Array<{
    label: string;
    value: string | number;
    unit?: string;
    icon?: JSX.Element;
    trend?: {
      value: number;
      isPositive?: boolean;
    };
    subtitle?: string;
  }>;
  columns?: 2 | 3 | 4;
  size?: 'sm' | 'md' | 'lg';
}

export const StatCardGrid = (props: StatCardGridProps) => {
  const getGridCols = () => {
    switch (props.columns || 3) {
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 4:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
      default:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    }
  };

  return (
    <div class={`grid ${getGridCols()} gap-6`}>
      {props.stats.map((stat) => (
        <StatCard
          label={stat.label}
          value={stat.value}
          unit={stat.unit}
          icon={stat.icon}
          trend={stat.trend}
          subtitle={stat.subtitle}
          size={props.size}
        />
      ))}
    </div>
  );
};
