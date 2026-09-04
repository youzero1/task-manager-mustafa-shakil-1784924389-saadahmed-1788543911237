import { Link } from 'react-router-dom';

export default function LandingCTA() {
  return (
    <div className="max-w-4xl mx-auto px-6 pb-28">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 px-8 py-14 text-center shadow-2xl shadow-indigo-950/60">
        <div className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
        <h2 className="relative text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
          Ready to get organized?
        </h2>
        <p className="relative text-indigo-100/90 mb-8 max-w-md mx-auto text-base">
          Jump in and start adding tasks in seconds. No account, no setup.
        </p>
        <Link
          to="/app"
          className="relative inline-block px-9 py-4 rounded-2xl bg-white text-indigo-700 font-semibold text-base shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all"
        >
          Open my to-do list →
        </Link>
      </div>
    </div>
  );
}
