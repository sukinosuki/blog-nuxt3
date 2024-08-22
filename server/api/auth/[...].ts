import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
  // TODO: SET A STRONG SECRET, SEE https://sidebase.io/nuxt-auth/configuration/nuxt-auth-handler#secret
  secret: process.env.AUTH_SECRET || 'my-auth-secret',
  pages: {
    // signIn: '/dashboard/auth/login',
    // error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
  },
  // TODO: ADD YOUR OWN AUTHENTICATION PROVIDER HERE, READ THE DOCS FOR MORE: https://sidebase.io/nuxt-auth
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: '(hint: hanami)' },
        password: { label: 'Password', type: 'password', placeholder: '(hint: 233233)' },
      },
      authorize(credentials: any) {
        console.warn('ATTENTION: You should replace this with your real providers or credential provider logic! The current setup is not safe')
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // NOTE: THE BELOW LOGIC IS NOT SAFE OR PROPER FOR AUTHENTICATION!

        // TODO
        const user = { id: '1', name: 'Hanami', username: 'hanami', password: '233233' }

        if (credentials?.username === user.username && credentials?.password === user.password) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        }
        else {
          console.error('Warning: Malicious login attempt registered, bad credentials provided')

          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  // events: {
  //   signIn(message) {
  //     console.log('[events signIn] msg: ', message)
  //   },
  // },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('[callback signIn] user: ', user)
      console.log('[callback signIn] account: ', account)
      console.log('[callback signIn] profile: ', profile)
      console.log('[callback signIn] email: ', email)
      console.log('[callback signIn] credentials: ', credentials)
      if (account?.provider === 'credentials') {
        if (account.providerAccountId !== '1') {
          throw new Error('未经授权的访问 by signIn callback')
        }
      }
      return true
    },
    session: async (params) => {
      console.log('[oauth callback session]: params.session ', params.session)
      console.log('[oauth callback session]: params.session.user ', params.session.user)
      console.log('[oauth callback session]: params.token ', params.token)
      console.log('[oauth callback session]: params.trigger ', params.trigger)
      console.log('[oauth callback session]: params.user ', params.user)

      return params.session
    },
    jwt: async (params) => {
      let trigger = ''
      // 登录操作会触发一次signIn trigger
      // 页面刷新会触发一次undefined trigger
      if (params.trigger === 'signIn') {
        trigger = '登录'
        // if (params.account?.provider === 'credentials') {
        //   if (params.account.providerAccountId !== '2') {
        //     throw new Error('未经授权的访问')
        //   }
        // }
      }
      console.log(`[oauth callback jwt]${trigger}, params.account: `, params.account)
      console.log(`[oauth callback jwt]${trigger}, params.profile: `, params.profile)
      console.log(`[oauth callback jwt]${trigger}, params.session: `, params.session)
      console.log(`[oauth callback jwt]${trigger}, params.token: `, params.token)
      console.log(`[oauth callback jwt]${trigger}, params.trigger: `, params.trigger)
      console.log(`[oauth callback jwt]${trigger}, params.user: `, params.user)

      return params.token
    },
  },
})
