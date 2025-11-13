import AnimatedBrain from './AnimatedBrain';

function Hero() {
  return (
    <header class="relative overflow-hidden">
      <div class="mesh-bg absolute inset-0 opacity-40" />
      <AnimatedBrain />

      <div class="relative max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/20 border border-cyan-900/40 text-cyan-300/80 text-xs mb-4">
              <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Neuroscience • Behavioral Analytics • Urban Study
            </div>

            <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight drop-shadow">
              Understanding ADHD and
              <br />
              the Science of Focus
            </h1>
            <p class="mt-4 text-cyan-300/85 max-w-2xl">
              A data storytelling project by Aethermind exploring how technology, environment, and neurobiology shape
              attention across demographics. Built with dynamic visualizations and rich, responsive design.
            </p>
          </div>

          <div class="relative">
            <div class="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-cyan-500/10 blur-2xl animate-float-slow" />
            <div class="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-cyan-400/10 blur-2xl animate-float-slower" />
            <div class="relative rounded-xl border border-cyan-900/40 bg-linear-to-br from-[#0D2631] to-[#0B1F2A] p-3 shadow-xl">
              <img src="/aethermind.jpeg" alt="Aethermind" class="rounded-lg w-full h-[260px] object-cover" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Hero;