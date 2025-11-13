import type { JSX } from 'solid-js';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: JSX.Element;
  accent?: string; // hex color for accent glow
}

export const StatCard = (props: StatCardProps) => {
  const accent = props.accent || '#00D9FF';

  return (
    <div
      class="group relative rounded-xl border border-cyan-900/40 bg-linear-to-br from-[#0D2631]/80 to-[#0B1F2A]/80 shadow-lg overflow-hidden"
    >
      <div class="absolute inset-0 opacity-20 pointer-events-none">
        <svg class="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stop-color={accent} stop-opacity="0.35" />
              <stop offset="100%" stop-color="transparent" stop-opacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="95" fill="url(#glow)" />
        </svg>
      </div>

      <div class="relative p-6 flex items-center gap-4">
        {props.icon && (
          <div class="text-cyan-400/90 shrink-0">
            {props.icon}
          </div>
        )}
        <div class="flex-1">
          <div class="text-3xl font-bold tracking-tight text-white drop-shadow-sm">
            {props.value}
          </div>
          <div class="mt-1 text-sm text-cyan-300/80">{props.label}</div>
        </div>
      </div>
      <div class="absolute inset-x-0 bottom-0 h-0.5 bg-linear-to-r from-transparent via-cyan-500/40 to-transparent" />
    </div>
  );
};
