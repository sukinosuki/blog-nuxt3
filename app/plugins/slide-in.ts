export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('slide-in', {
    created(el) {
      el.style.opacity = '0'
      el.style.transform = 'translateY(20px)'
      el.style.transition = '200ms'
    },
    mounted(el: HTMLElement, value) {
      const delay = Number(el.getAttribute('data-delay') || 0)
      setTimeout(() => {
        el.style.opacity = '1'
        el.style.transform = `translateY(${0}px)`
      }, delay)
    //   console.log('el ', el)
    //   console.log('el.dataset.delay ', el.dataset.delay)
    //   console.log('value ', value)
    },
    getSSRProps(binding, vnode) {
      // you can provide SSR-specific props here
      return {}
    },
  })
})
