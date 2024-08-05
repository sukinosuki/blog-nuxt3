export default eventHandler(async () => {
  const drizzle = useDrizzle()

  const list = await drizzle.query.project.findMany()

  return list
})
