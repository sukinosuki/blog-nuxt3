import { presetUno, presetIcons, presetTypography, presetWebFonts } from 'unocss'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Nuxt 4 directory structure and features
  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  future: { compatibilityVersion: 4 },

  extends: [
    './dashboard',
  ],
  runtimeConfig: {
    api_auth_username: '',
    api_auth_password: '',
    public: {
      hubEnv222: process.env.NUXT_HUB_ENV,
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
    // 需要声明,可以按需加载: https://www.naiveui.com/en-US/os-theme/docs/nuxtjs
    'nuxtjs-naive-ui',
    // '@nuxt/fonts',
    '@vueuse/motion/nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/seo',
  ],
  site: {
    // url: process.env.NUXT_HUB_ENV === 'development' ? 'http://localhost:3000' : 'https://miiro.ro',
    // url: 'https://miiro-blog2.pages.dev',
    // name: 'Miiro',
    // description: '能为改变自己而努力, 我觉得是件厉害的事',
    defaultLocale: 'zh-CN', // not needed if you have @nuxtjs/i18n installed
  },
  routeRules: {
    '/dashboard/**/*': {
      ssr: false,
    },
    '/dashboard/**': {
      ssr: false,
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
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
  // https://nuxt.com/docs/getting-started/styling#the-css-property
  css: [
    'medium-zoom/dist/style.css',
    '@unocss/reset/tailwind-compat.css',
  ],
  // 减小build后worker体积
  sourcemap: {
    server: false,
    client: false,
  },
  unocss: {
    presets: [
      presetUno(),
      presetIcons(),
      // presetAttributify(), // 与vususe motion v-motion :delay有冲突
      presetTypography(),
      presetWebFonts({
        provider: 'google',
        // customFetch: url => fetch(url).then(it => it.data),
        fonts: {
          // 'sans': 'Roboto',
          // mono: ['Fira Code', 'Fira Mono:400,700'],
          // josefin: ['Josefin+Sans'],
          // mplusrounded1c: 'M PLUS Rounded 1c',
          // lxgw: 'LXGW+WenKai+Mono+TC',
          // these will extend the default theme
          sans: 'Roboto',
          mono: ['Fira Code', 'Fira Mono:400,700'],
          // custom ones
          lobster: 'Lobster',
          lato: [
            {
              name: 'Lato',
              weights: ['400', '700'],
              italic: true,
            },
            {
              name: 'sans-serif',
              provider: 'none',
            },
          ],
        },
      }),
    ],
    theme: {
      colors: {
        primary: 'rgb(var(--primary))',
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
      // openAPI: false,
    },
  },
  // Development
  devtools: { enabled: true },
  vite: {
    build: {
      rollupOptions: {
        // external: [
        //   // 'shiki/onig.wasm',
        //   'naive-ui',
        //   'vue-codemirror',
        //   'codemirror',
        // ],
        // output: {
        //   chunkFileNames: 'assets/chunk/[hash].js',
        //   entryFileNames: 'assets/entry/[hash].js',
        //   assetFileNames: 'assets/[ext]/[hash].[ext]',
        // },
      },
    },
  },
})
