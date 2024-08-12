export default eventHandler(async (event) => {
  const session = await getUserSession(event)

  console.log('session.user ', session.user)

  return session
})
