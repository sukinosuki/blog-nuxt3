export default eventHandler(async (event) => {
  const drizzle = useDrizzle()

  const id = Number(getRouterParam(event, 'id'))

  const res = await drizzle.delete(tables.project)
    .where(eq(tables.project.id, id))

  return res
})
