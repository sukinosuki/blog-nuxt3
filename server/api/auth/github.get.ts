export default oauthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user, tokens }) {
    if (user.id !== process.env.NUXT_OAUTH_GITHUB_USER_ID) {
      throw createError({
        status: 400,
        message: 'Only administrators can log in',
      })
    }
    await setUserSession(event, {
      user,
      tokens,
    })

    return sendRedirect(event, '/')
  },

  onError(event, error) {
    console.log('github oauth error: ', error)

    return sendRedirect(event, '/')
  },
})
