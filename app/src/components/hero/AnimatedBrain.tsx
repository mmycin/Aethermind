function AnimatedBrain() {
  return (
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        class="absolute -top-10 right-0 w-[520px] h-[520px] opacity-[0.18]"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="brainStroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#8B5CF6" />
            <stop offset="100%" stop-color="#22D3EE" />
          </linearGradient>
        </defs>
        {/* Brain outline path */}
        <path
          d="M200,60 C160,60 130,80 120,110 C100,110 80,130 80,160 C70,170 60,190 70,210 C60,230 70,250 90,260 C90,280 110,300 140,300 C150,320 180,330 200,330 C220,330 250,320 260,300 C290,300 310,280 310,260 C330,250 340,230 330,210 C340,190 330,170 320,160 C320,130 300,110 280,110 C270,80 240,60 200,60 Z"
          fill="none"
          stroke="url(#brainStroke)"
          stroke-width="3"
          class="brain-stroke"
        />
        {/* Neuron nodes */}
        {[
          [160, 120],
          [120, 160],
          [140, 220],
          [200, 260],
          [240, 220],
          [280, 160],
          [240, 110],
          [200, 100],
        ].map(([x, y], i) => (
          <circle cx={x} cy={y} r="5" fill="#22D3EE" class="neuron-pulse" />
        ))}
        {/* Connectors */}
        <g stroke="#8B5CF6" stroke-width="1.5" opacity="0.6">
          <line x1="160" y1="120" x2="200" y2="100" />
          <line x1="200" y1="100" x2="240" y2="110" />
          <line x1="120" y1="160" x2="140" y2="220" />
          <line x1="240" y1="220" x2="280" y2="160" />
          <line x1="140" y1="220" x2="200" y2="260" />
          <line x1="200" y1="260" x2="240" y2="220" />
        </g>
      </svg>
    </div>
  );
}

export default AnimatedBrain;