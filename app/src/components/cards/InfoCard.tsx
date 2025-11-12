import type { JSX } from 'solid-js';

interface InfoCardProps {
  title: string;
  content: string | JSX.Element;
  icon?: JSX.Element;
  variant?: 'primary' | 'secondary' | 'tertiary';
  compact?: boolean;
}

export const InfoCard = (props: InfoCardProps) => {
  const getVariantStyles = () => {
    switch (props.variant) {
      case 'secondary':
        return 'bg-gradient-to-br from-[#0B4A5F] to-[#0D2631] border-cyan-700/40';
      case 'tertiary':
        return 'bg-gradient-to-br from-[#0D2631]/80 to-[#0B1F2A]/80 border-cyan-900/20';
      default:
        return 'bg-gradient-to-br from-[#0D2631] to-[#0B1F2A] border-cyan-900/30';
    }
  };

  return (
    <div
      class={`
        ${getVariantStyles()}
        rounded-lg border shadow-lg 
        hover:shadow-cyan-900/20 transition-all duration-300
        ${props.compact ? 'p-4' : 'p-6'}
      `}
    >
      {props.icon && <div class="mb-3 text-cyan-400 opacity-80">{props.icon}</div>}

      <h4 class={`text-cyan-400 font-semibold ${props.compact ? 'text-sm mb-2' : 'text-base mb-3'}`}>{props.title}</h4>

      <div class={`text-cyan-300/80 leading-relaxed ${props.compact ? 'text-xs' : 'text-sm'}`}>{props.content}</div>
    </div>
  );
};

interface InfoCardGridProps {
  cards: Array<{
    title: string;
    content: string;
    icon?: JSX.Element;
  }>;
  columns?: 1 | 2 | 3 | 4;
  compact?: boolean;
}

export const InfoCardGrid = (props: InfoCardGridProps) => {
  const getGridCols = () => {
    switch (props.columns || 3) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  return (
    <div class={`grid ${getGridCols()} gap-4`}>
      {props.cards.map((card) => (
        <InfoCard title={card.title} content={card.content} icon={card.icon} compact={props.compact} />
      ))}
    </div>
  );
};
