export default eventHandler(async (event) => {
  const query = getQuery(event)
  const data = await readBody(event)

  return {
    query,
    data,
  }
})
