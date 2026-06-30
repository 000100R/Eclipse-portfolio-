import { ArrowUp, Terminal } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer-panel" className="py-12 w-full bg-black border-t border-white/5 px-6 md:px-12 select-none z-10 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left: Credits */}
        <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-600">
          <span>RISHAV GHOSH © {currentYear}</span>
          <span className="text-zinc-800">|</span>
          <span className="hidden md:inline">DESIGNED VIA SWISS MINIMALISM</span>
          <span className="hidden md:inline text-zinc-800">|</span>
          <span className="flex items-center gap-1.5 text-emerald-500/80">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>CORE NODE ONLINE</span>
          </span>
        </div>

        {/* Center: System coordinates */}
        <div className="flex items-center gap-2 text-[9px] font-mono text-zinc-500 bg-zinc-950 px-3 py-1.5 rounded-lg border border-white/5">
          <Terminal className="w-3.5 h-3.5 text-zinc-500" />
          <span>LOC: [37.7749° N, 122.4194° W]</span>
          <span className="text-zinc-800">•</span>
          <span>LATENCY: 4.2ms</span>
        </div>

        {/* Right: Scroll to Top */}
        <button
          onClick={handleScrollToTop}
          className="group flex items-center gap-2 text-[10px] font-mono tracking-widest text-zinc-500 hover:text-white transition-colors cursor-none"
          data-cursor="GO TOP"
        >
          <span>RETURN TO APEX</span>
          <div className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center group-hover:border-white transition-colors">
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </button>

      </div>
    </footer>
  );
}
