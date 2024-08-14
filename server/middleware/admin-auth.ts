// NOTE:访问的任何地址都会经过该中间件, ge: /、/post、/admin/auth/login、/admin/post、/api/**、/api-admin/**...
export default eventHandler(async (event) => {
  // console.log('admin auth middleware!!!')

  if (event.path.startsWith('/api-admin')) {
    const userSession = await getUserSession(event)

    if (!userSession.user) {
      if (!['/api-admin/auth/login', '/api-admin/auth/login/'].includes(event.path)) {
        throw createError({
          status: 403,
          message: 'Unauthorized',
        })
      }
    }
  }
})
