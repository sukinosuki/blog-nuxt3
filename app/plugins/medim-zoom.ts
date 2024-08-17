import type { Zoom } from 'medium-zoom'
import mediumZoom from 'medium-zoom'
import { isClient } from '@vueuse/core'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  if (!isClient) return

  const selector = '[zoomable]'
  const zoom: Zoom = mediumZoom(selector, {
    background: 'rgb(0 0 0 / 23%)',
  })

  // (re-)init for newly rendered page, also to work in SPA mode (client-side routing)
  nuxtApp.hook('page:finish', () => {
    console.log('hook page:finish')

    zoom
      .detach(selector)
      .attach(selector)
  })

  // make available as helper to NuxtApp
  nuxtApp.provide('mediumZoom', zoom)
})
