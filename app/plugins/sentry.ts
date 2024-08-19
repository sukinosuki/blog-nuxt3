import * as Sentry from '@sentry/vue'

// https://www.lichter.io/articles/nuxt3-sentry-recipe/
export default defineNuxtPlugin((nuxtApp) => {
  // const { public: { sentry, env } } = useRuntimeConfig()

  // const router = useRouter()

  // if (!sentry?.dsn) {
  //   return
  // }

  // const client = Sentry.init({
  //   app: nuxtApp.vueApp,
  //   dsn: sentry.dsn,
  //   environment: env,
  //   integrations: [
  //     Sentry.browserTracingIntegration({ router }),
  //     Sentry.replayIntegration({
  //       maskAllText: true,
  //       blockAllMedia: false,
  //     }),
  //   ],

  //   // Configure this whole part as you need it!
  //   // tracesSampleRate: 0.2, // Change in prod

  //   // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  //   tracePropagationTargets: ['localhost', 'https://your-server.com'],
  //   // replaysSessionSampleRate: 1.0, // Change in prod
  //   // replaysOnErrorSampleRate: 1.0, // Change in prod if necessary
  // })

  // // https://nuxt.com/docs/guide/directory-structure/plugins#providing-helpers
  // return {
  //   provide: {
  //     sentry: client,
  //   },
  // }
})
