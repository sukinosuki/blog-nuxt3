export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn, fetch } = useUserSession()

  console.log('admin auth middleware')

  // throw createError({
  //   message: 'Unauthorized',
  //   status: 401,
  // })

  // 页面刷新时需要调用fetch才可以正确获取是否登录
  // https://github.com/atinux/nuxt-auth-utils/issues/126
  if (!loggedIn.value) {
    await fetch()
  }

  if (to.name === 'dashboard-auth-login') {
    if (loggedIn.value) {
      return navigateTo('/dashboard/post')
    }
  }
  else {
    if (!loggedIn.value) {
      return navigateTo('/dashboard/auth/login', {
        replace: true,
      })
    }
  }
})
