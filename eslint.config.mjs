// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here

  {
    rules: {
      '@typescript-eslint/unified-signatures': 1,
      'vue/multi-word-component-names': 0,
    },
  },
)
