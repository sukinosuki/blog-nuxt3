import type { Client } from '@sentry/types'
import type { Zoom } from 'medium-zoom'

declare module 'nuxt/dist/app/nuxt' {
  interface NuxtApp {
    $sentry?: Client
  }
}

declare module '#app' {

  interface NuxtApp {
    $sentry?: Client

    $mediumZoom?: Zoom
  }

  // https://nuxt.com/docs/guide/directory-structure/pages/#typing-custom-metadata
  // interface PageMeta {
  //   pageType?: string
  // }

}
