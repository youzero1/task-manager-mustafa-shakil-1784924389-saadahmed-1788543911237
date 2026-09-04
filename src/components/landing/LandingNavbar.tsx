import { Link } from 'react-router-dom';

export default function LandingNavbar() {
  return (
    <nav className="w-full px-6 py-5 flex items-center justify-between max-w-6xl mx-auto">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-900/40">
          ✓
        </div>
        <span className="text-lg font-bold tracking-tight text-white">DoneRight</span>
      </div>
      <Link
        to="/app"
        className="px-5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-medium text-sm backdrop-blur-md hover:bg-white/20 hover:border-white/25 transition-all"
      >
        Open App
      </Link>
    </nav>
  );
}
