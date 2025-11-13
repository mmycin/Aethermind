import AnimatedBrain from './AnimatedBrain';

function Hero() {
  return (
    <header class="relative overflow-hidden min-h-[85vh] flex items-center">
      <div class="mesh-bg absolute inset-0 opacity-40" />
      <AnimatedBrain />

      {/* Animated gradient orbs */}
      <div class="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-3xl animate-pulse" />
      <div
        class="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-teal-500/15 to-cyan-500/15 blur-3xl animate-pulse"
        // style={{ animationDelay: '1s' }}
      />

      <div class="relative max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20 w-full">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 text-cyan-300 text-sm mb-8 shadow-lg backdrop-blur-sm">
            <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-400/50" />
            Neuroscience • Behavioral Analytics • Urban Study
          </div>

          <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6">
            <span class="block bg-gradient-to-r bg-white bg-clip-text text-transparent drop-shadow-2xl">
              Understanding ADHD
            </span>

            <span class="block mt-2 text-cyan-100">and the Science of Focus</span>
          </h1>

          <p class="mt-8 text-lg md:text-xl text-cyan-300/90 max-w-3xl mx-auto leading-relaxed">
            A data storytelling project by <span class="font-semibold text-cyan-200">Aethermind</span> exploring how
            technology, environment, and neurobiology shape attention across demographics.
          </p>

        </div>
      </div>
    </header>
  );
}

export default Hero;