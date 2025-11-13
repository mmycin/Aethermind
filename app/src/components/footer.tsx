function Footer() {
  return (
    <footer class="mt-12 pt-8 border-t border-cyan-900/30 text-center space-y-2">
      <p class="text-cyan-400/70 text-sm">
        Research conducted by <span class="text-cyan-400 font-semibold">Aethermind</span> • Dhaka metropolitan zones • N=897 participants
      </p>
      <p class="text-cyan-400/50 text-xs">
        Methodology: Cross-sectional observational study with validated psychometrics • Charts powered by Chart.js
      </p>
      <div class="flex items-center justify-center gap-1 text-[11px] text-cyan-400/50">
        <span>Built with SolidJS</span>
        <span>•</span>
        <span>TailwindCSS</span>
        <span>•</span>
        <span>Vite</span>
      </div>
    </footer>
  );
}

export default Footer;