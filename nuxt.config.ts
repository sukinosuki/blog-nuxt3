// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Nuxt 4 directory structure and features
  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  future: { compatibilityVersion: 4 },
  // Nuxt Modules
  // https://nuxt.com/modules
  modules: [
    '@nuxthub/core',
    '@nuxt/eslint',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/mdc',
    '@nuxt/image',
    'nuxtjs-naive-ui',
    '@nuxt/fonts',
    '@vueuse/motion/nuxt',
  ],
  routeRules: {
    '/admin/**/*': {
      ssr: false,
    },
    '/admin/**': {
      ssr: false,
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  fonts: {
    assets: {
      // The baseURL where font files are served.
      prefix: '/_fonts/',
    },
    // defaults: {
    //   weights: [400],
    //   styles: ['normal', 'italic'],
    //   subsets: [
    //     'cyrillic-ext',
    //     'cyrillic',
    //     'greek-ext',
    //     'greek',
    //     'vietnamese',
    //     'latin-ext',
    //     'latin',
    //   ],
    // },
  },
  mdc: {
    // highlight: {
    //   // Theme used in all color schemes.
    //   theme: 'github-light',
    // },
    // highlight: {
    //   theme: {
    //     default: 'vitesse-light',
    //     dark: 'material-theme-palenight',
    //   },
    //   preload: [
    //     'sql',
    //   ],
    // },
    // remarkPlugins: {
    //   'remark-mdc': {
    //     options: {
    //       experimental: {
    //         autoUnwrap: true,
    //       },
    //     },
    //   },
    // },
  },
  hub: {
    database: true,
    kv: true,
    // blob: true,
    cache: true,
  },
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
  },
  unocss: {
    icons: {
      extraProperties: {
        display: 'inline-block',
      },
      collections: {
        // solar: () => import('@iconify-json/solar/icons.json').then(i => i.default),
        ri: () => import('@iconify-json/ri/icons.json').then(i => i.default),
        simpleicons: () => import('@iconify-json/simple-icons/icons.json').then(i => i.default),
        // 'my-icons': FileSystemIconLoader('./assets/icons', svg => svg.replace('/#fff/', 'currentColor')),
        // 'my-icons': FileSystemIconLoader('./assets/icons'),
      },
      customizations: {
        iconCustomizer(collection, icon, props) {
          // default size
          props.width = '1.5em'
          props.height = '1.5em'
          // customize this @iconify icon in this collection
          // if (collection === "mdi") {
          //   props.width = "1.5em";
          //   props.height = "1.5em";
          // }
        },
      },
    }, // enabled `@unocss/preset-icons`
  },
  nitro: {
    experimental: {
      // Enable Server API documentation within NuxtHub
      openAPI: true,
    },
  },
  // Development
  devtools: { enabled: true },
})
