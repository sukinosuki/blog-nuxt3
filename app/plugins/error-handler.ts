export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    console.log('nuxtApp error: ', error)
    console.log('nuxtApp info: ', info)

    // nuxtApp.$sentry?.captureException(error)
  }
})
