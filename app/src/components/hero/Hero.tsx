import AnimatedBrain from './AnimatedBrain';
import './Animation.css';
import { onMount, onCleanup } from 'solid-js';
import Typed from 'typed.js';

function Hero() {
  let line1Ref: HTMLSpanElement | undefined;
  let line2Ref: HTMLSpanElement | undefined;

  let typed1: Typed | undefined;
  let typed2: Typed | undefined;

  onMount(() => {
    typed1 = new Typed(line1Ref!, {
      strings: ["Understanding ADHD"],
      typeSpeed: 45,
      cursorChar: "|",
      showCursor: false,
      onComplete() {
        typed2 = new Typed(line2Ref!, {
          strings: ["and the Science of Focus"],
          typeSpeed: 45,
          cursorChar: "|",
          showCursor: false,
        });
      }
    });
  });

  onCleanup(() => {
    typed1?.destroy();
    typed2?.destroy();
  });

  return (
    <header class="relative overflow-hidden min-h-[85vh] flex items-center">
      <div class="mesh-bg absolute inset-0 opacity-40" />
      <AnimatedBrain />

      {/* Animated gradient orbs */}
      <div class="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-linear-to-br from-cyan-500/20 to-blue-500/20 blur-3xl animate-pulse" />
      <div
        class="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-linear-to-br from-teal-500/15 to-cyan-500/15 blur-3xl animate-pulse"
      />

      <div class="relative max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20 w-full">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 text-cyan-300 text-sm mb-8 shadow-lg backdrop-blur-sm">
            <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-400/50" />
            Neuroscience • Behavioral Analytics • Urban Study
          </div>

          <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6">
            <span
              ref={line1Ref}
              class="block bg-linear-to-r bg-white bg-clip-text text-transparent drop-shadow-2xl"
            ></span>

            <span
              ref={line2Ref}
              class="block mt-2 text-cyan-100"
            ></span>
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
