const features = [
  {
    icon: '🎯',
    title: 'Priorities & categories',
    description: 'Tag tasks by priority and category so the important stuff never gets lost.',
    glow: 'from-indigo-500/20 to-transparent',
  },
  {
    icon: '📅',
    title: 'Due dates & subtasks',
    description: 'Break big tasks into checklists and keep track of deadlines at a glance.',
    glow: 'from-fuchsia-500/20 to-transparent',
  },
  {
    icon: '🎨',
    title: '5 beautiful themes',
    description: 'Switch between Light, Dark, Sunset, Ocean and Forest — whatever fits your mood.',
    glow: 'from-cyan-500/20 to-transparent',
  },
];

export default function LandingFeatures() {
  return (
    <div className="max-w-6xl mx-auto px-6 pb-28 grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((f, i) => (
        <div
          key={f.title}
          className="group relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-7 hover:-translate-y-1.5 hover:border-white/20 transition-all duration-300 animate-fade-up shadow-xl shadow-black/20"
          style={{ animationDelay: `${i * 120}ms` }}
        >
          <div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${f.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
          />
          <div className="relative">
            <div className="text-3xl mb-4 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              {f.icon}
            </div>
            <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
            <p className="text-sm text-slate-300/90 leading-relaxed">{f.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
