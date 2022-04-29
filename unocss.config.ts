import { defineConfig, presetIcons, presetUno, presetAttributify } from 'unocss';

export default defineConfig({
  presets: [presetUno({ dark: 'class' }), presetIcons()],
});
