export default eventHandler(async (event) => {
  const data = await readBody<API_Auth.Login | null>(event)

  const runtimeConfig = useRuntimeConfig(event)

  const { api_auth_username, api_auth_password } = runtimeConfig

  if (data?.username !== String(api_auth_username) || data?.password !== String(api_auth_password)) {
    throw createError({ status: 400, message: '账号或密码错误' })
  }

  await setUserSession(event, {
    user: 1,
    loggedAt: new Date(),
  })

  return {
    data,
    api_auth_username,
    api_auth_password,
  }
})
