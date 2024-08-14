export default eventHandler(async (event) => {
  const data = await readBody<API_Auth.Login | null>(event)

  const runtimeConfig = useRuntimeConfig()

  console.log('runtimeConfig11 ', runtimeConfig)

  const { api_auth_username, api_auth_password } = runtimeConfig

  console.log('data ', data)
  console.log('api_auth_username ', api_auth_username)
  console.log('data.username ', data?.username === api_auth_username)
  console.log('api_auth_password ', api_auth_password)
  console.log('typeof api_auth_password ', typeof api_auth_password)

  if (data?.username !== String(api_auth_username) || data?.password !== String(api_auth_password)) {
    // throw createError({ status: 400, message: '账号或密码错误' })

    return runtimeConfig
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
