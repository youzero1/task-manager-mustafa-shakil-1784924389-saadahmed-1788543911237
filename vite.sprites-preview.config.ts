import { defineConfig, mergeConfig } from 'vite';
import base from './vite.config';
const previewBridge = {
  name: 'summon-preview-bridge',
  transformIndexHtml(html: string) {
    const tag = '<script src="http://localhost:3000/preview-bridge.js" data-parent-origin="http://localhost:3000"></script>';
    return /<head[^>]*>/i.test(html) ? html.replace(/<head[^>]*>/i, (m) => m + tag) : tag + html;
  },
};
export default mergeConfig(base, defineConfig({ server: { host: true, allowedHosts: true }, plugins: [previewBridge] }));
