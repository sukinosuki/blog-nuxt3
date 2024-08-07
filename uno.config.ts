// uno.config.ts
import { defineConfig } from 'unocss'
import { presetScrollbar } from 'unocss-preset-scrollbar'

export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetScrollbar({
      // config
    }),
  ],
})
