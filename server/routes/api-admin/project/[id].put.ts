export default eventHandler(async (event) => {
  const data = await readBody<API_Project.Update>(event)
  const id = Number(getRouterParam(event, 'id'))

  const drizzle = useDrizzle()

  const res = await drizzle
    .update(tables.project)
    .set({
      name: data.name,
      repository: data.repository,
      description: data.description,
      cover: data.cover || null,
      preview: data.preview || null,
      updated_at: new Date(),
    })
    .where(eq(tables.project.id, id))

  return res
})
