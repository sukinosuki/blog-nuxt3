import { presetUno, presetIcons, presetTypography, presetWebFonts } from 'unocss'

// import appConfigData from './app.config'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Nuxt 4 directory structure and features
  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  future: { compatibilityVersion: 4 },
  extends: [
    './dashboard',
  ],
  // appConfig: appConfigData,
  runtimeConfig: {
    api_auth_username: '',
    api_auth_password: '',
    authOrigin: process.env.NUXT_AUTH_ORIGIN,
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
  image: {
    provider: 'cloudflare',
    cloudflare: {
      // baseUrl: '',
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
    '@vueuse/motion/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/seo',
    '@pinia/nuxt',
  ],
  site: {
    // url- 通过 .env - NUXT_PUBLIC_SITE_URL 配置
    // url: '',
    // name- 可通过 .env - NUXT_SITE_NAME 配置
    name: 'Miiro',
    // description- 可通过 .env - NUXT_SITE_DESCRIPTION 配置
    description: '能为改变自己而努力, 我觉得是件厉害的事. miiro, hanami, 樱花秋水, 桜花秋水, sukinosuki',
    // defaultLocale: 'zh-CN', // not needed if you have @nuxtjs/i18n installed
  },
  // 需要手动声明robots配置, sitemap才会生效?
  robots: {
    disallow: ['/dashboard'],
  },
  // modules声明@nuxtjs/seo后，需要声明不启用ogImage，会造成打包后的worker超过1m?
  // 也可以不引入@nuxtjs/seo, 单独引入@nuxtjs/sitemap, @nuxtjs/robots
  ogImage: {
    enabled: false,
  },
  schemaOrg: {
    identity: 'Person',
  },
  auth: {
    isEnabled: true,
    // disableServerSideAuth: true,
    baseURL: process.env.AUTH_BASE_URL,
    provider: {
      type: 'authjs',
    },
    // globalAppMiddleware: {
    //   isEnabled: false,
    // },
  },
  routeRules: {
    // '/dashboard/**/*': {
    //   ssr: false,
    // },
    '/dashboard/**': {
      ssr: false,
      // robots: false,
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
    blob: true,
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
    '@unocss/reset/tailwind-compat.css',
    'medium-zoom/dist/style.css',
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
      // presetAttributify(), // 与vususe motion v-motion :delay属性有冲突
      presetTypography(),
      presetWebFonts({
        provider: 'google',
        fonts: {
          'sans': 'Roboto',
          'mono': ['Fira Code', 'Fira Mono:400,700'],
          // custom ones
          'm-plus-rounded-1c': 'M+PLUS+Rounded+1c',
          'lxgw-wenkai-tc': 'LXGW+WenKai+Mono+TC',
        },
      }),
    ],
    theme: {
      colors: {
        primary: 'rgb(var(--primary))',
      },
    },
    // preflight: true,
    // enabled `@unocss/preset-icons`
    icons: {
      extraProperties: {
        display: 'inline-block',
      },
      collections: {
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
    },
  },
  nitro: {
    experimental: {
      // Enable Server API documentation within NuxtHub
      openAPI: true,
      tasks: true,
    },
  },
  // Development
  devtools: { enabled: true },
  // vite: {
  //   build: {
  //     rollupOptions: {
  //       // external: [
  //       //   // 'shiki/onig.wasm',
  //       //   'naive-ui',
  //       //   'vue-codemirror',
  //       //   'codemirror',
  //       // ],
  //       // output: {
  //       //   chunkFileNames: 'assets/chunk/[hash].js',
  //       //   entryFileNames: 'assets/entry/[hash].js',
  //       //   assetFileNames: 'assets/[ext]/[hash].[ext]',
  //       // },
  //     },
  //   },
  // },
})
