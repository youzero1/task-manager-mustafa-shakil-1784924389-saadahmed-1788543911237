import { Link } from 'react-router-dom';

export default function LandingHero() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-20 pb-28 text-center animate-fade-up">
      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-indigo-200 text-xs font-semibold mb-6 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        Free forever · No sign-up needed
      </span>
      <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 leading-[1.05]">
        Get your day{' '}
        <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
          done right
        </span>
      </h1>
      <p className="text-lg sm:text-xl text-slate-300/90 max-w-xl mx-auto mb-10 leading-relaxed">
        Track tasks with priorities, due dates, subtasks and notes — organized
        your way, saved right in your browser.
      </p>
      <Link
        to="/app"
        className="inline-block px-9 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold text-base shadow-2xl shadow-indigo-900/50 hover:-translate-y-1 hover:shadow-indigo-800/60 transition-all"
      >
        Start organizing →
      </Link>

      <div className="mt-20 max-w-3xl mx-auto rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-2xl shadow-black/40 p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4 px-1">
          <span className="w-3 h-3 rounded-full bg-red-400/70" />
          <span className="w-3 h-3 rounded-full bg-amber-400/70" />
          <span className="w-3 h-3 rounded-full bg-emerald-400/70" />
        </div>
        <div className="space-y-3 text-left">
          {[
            { label: 'Design new landing page', done: true, tag: 'Work' },
            { label: 'Buy groceries for the week', done: true, tag: 'Personal' },
            { label: 'Finish quarterly report', done: false, tag: 'Work' },
          ].map((t) => (
            <div
              key={t.label}
              className="flex items-center gap-3 rounded-xl bg-white/[0.05] border border-white/10 px-4 py-3"
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border ${
                  t.done
                    ? 'bg-emerald-400/90 border-emerald-300 text-slate-900'
                    : 'border-white/25 text-transparent'
                }`}
              >
                ✓
              </span>
              <span className={`flex-1 text-sm ${t.done ? 'text-slate-400 line-through' : 'text-slate-100'}`}>
                {t.label}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300">{t.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
