import type { Theme } from '@/types/theme';
import { THEMES } from '@/types/theme';

interface ThemeSwitcherProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

function ThemeSwitcher({ theme, onThemeChange }: ThemeSwitcherProps) {
  return (
    <div className="flex items-center gap-2">
      {THEMES.map((t) => (
        <button
          key={t.id}
          onClick={() => onThemeChange(t.id)}
          aria-label={`Switch to ${t.label} theme`}
          title={t.label}
          className={`h-6 w-6 rounded-full border-2 transition-smooth active-press hover:scale-125 ${
            theme === t.id ? 'border-[var(--text)] scale-110 shadow-md' : 'border-transparent'
          }`}
          style={{ backgroundColor: t.swatch }}
        />
      ))}
    </div>
  );
}

export default ThemeSwitcher;
