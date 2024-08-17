import { presetUno, presetAttributify, presetIcons, presetTypography } from 'unocss'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Nuxt 4 directory structure and features
  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  future: { compatibilityVersion: 4 },

  runtimeConfig: {
    api_auth_username: '',
    api_auth_password: '',

    public: {
      test: '1',
      env: 'preview',
      sentry: {
        dsn: '',
      },
      sentry_dsn: '',
    },
  },
  // Nuxt Modules
  // https://nuxt.com/modules
  modules: [
    '@nuxthub/core',
    '@nuxt/eslint',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/mdc',
    '@nuxt/image',
    'nuxt-auth-utils',
    'nuxtjs-naive-ui',
    '@nuxt/fonts',
    '@vueuse/motion/nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt',
  ],
  routeRules: {
    '/admin/**/*': {
      ssr: false,
    },
    '/admin/**': {
      ssr: false,
    },
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
    // pageTransition: {
    //   name: 'page',
    //   mode: 'out-in',
    // },
    // layoutTransition: { name: 'layout', mode: 'out-in' },
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
    // families: [
    //   { name: 'eafont', src: '/static/font/eafont.ttf' },
    // ],
  },
  // mdc: {
  //   highlight: {
  //     theme: {
  //       light: 'github-light',
  //       dark: 'github-dark',
  //     },
  //   },
  // },
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
  // https://nuxt.com/docs/getting-started/styling#the-css-property
  css: [
    'medium-zoom/dist/style.css',
    '@unocss/reset/tailwind-compat.css',
  ],
  unocss: {
    presets: [
      presetUno(),
      presetIcons(),
      // presetAttributify(),
      presetTypography(),
    ],
    theme: {
      colors: {
        'primary': 'rgb(var(--primary))',
        'admin-primary': '#8b5cf6',
      },
    },
    // preflight: true,
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
          props.display = 'inline-block'
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
  // vite: {
  //   build: {
  //     rollupOptions: {
  //       external: [
  //         'shiki/onig.wasm',
  //       ],
  //     },
  //   },
  // },
})
