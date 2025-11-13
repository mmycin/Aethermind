function NavBar() {
  return (
    <nav class="sticky top-0 z-40 backdrop-blur supports-backdrop-filter:bg-[#0B1F2A]/60 bg-[#0B1F2A]/80 border-b border-cyan-900/30">
      <div class="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="/icon.svg" alt="Aethermind" class="w-7 h-7" />
          <span class="text-cyan-400 font-semibold tracking-wider text-sm">Aethermind • ReCognition</span>
        </div>
        <div class="flex items-center gap-4 text-xs text-cyan-300/80">
          <a href="#visualizations" class="hover:text-cyan-200 transition-colors">Visualizations</a>
          <a href="#insights" class="hover:text-cyan-200 transition-colors">Insights</a>
          <a href="#about" class="hover:text-cyan-200 transition-colors">About</a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;