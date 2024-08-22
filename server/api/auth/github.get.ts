export default oauthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user, tokens }) {
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
