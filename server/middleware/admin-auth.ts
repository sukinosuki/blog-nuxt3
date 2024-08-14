// NOTE:访问的任何地址都会经过该中间件, ge: /、/post、/admin/auth/login、/admin/post、/api/**、/api-admin/**...
export default eventHandler(async (event) => {
  // console.log('admin auth middleware!!!')

  // const runtimeConfig = useRuntimeConfig()

  // console.log('admin auth, runtimeConfig11 ', runtimeConfig)

  // if (event.path.startsWith('/api-admin')) {
  //   // would cause the Empty password error
  //   const userSession = await getUserSession(event).catch((err) => {
  //     console.log('get user session err ', err)
  //   })

  //   console.log('userSession ', userSession)

  //   if (!userSession?.user) {
  //     if (!['/api-admin/auth/login', '/api-admin/auth/login/'].includes(event.path)) {
  //       throw createError({
  //         status: 403,
  //         message: 'Unauthorized',
  //       })
  //     }
  //   }
  // }
})
