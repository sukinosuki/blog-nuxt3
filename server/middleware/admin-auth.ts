// import { getServerSession } from '#auth'

// nuxt auth接口校验, https://auth.sidebase.io/guide/authjs/server-side/session-access
// NOTE:访问的任何地址都会经过该中间件, ge: /、/post、/admin/auth/login、/admin/post、/api/**、/api-admin/**...

export default eventHandler(async (event) => {
  if (event.path.startsWith('/api-admin')) {
    // const token = await getToken({ event })
    // const userSession = await getServerSession(event).catch(() => {

    // })
    // console.log('userSession ', userSession)

    // if (!userSession?.user) {
    //   throw createError({
    //     status: 403,
    //     message: 'Unauthorized',
    //   })
    // }
  }
})
