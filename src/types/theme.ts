export type Theme = 'light' | 'dark' | 'sunset' | 'ocean' | 'forest';

export const THEMES: { id: Theme; label: string; swatch: string }[] = [
  { id: 'light', label: 'Light', swatch: '#4f46e5' },
  { id: 'dark', label: 'Dark', swatch: '#6366f1' },
  { id: 'sunset', label: 'Sunset', swatch: '#ea580c' },
  { id: 'ocean', label: 'Ocean', swatch: '#0891b2' },
  { id: 'forest', label: 'Forest', swatch: '#16a34a' },
];
