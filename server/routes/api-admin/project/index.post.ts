export default eventHandler(async (event) => {
  const drizzle = useDrizzle()
  const data = await readBody<API_Project.Add>(event)

  const res = await drizzle
    .insert(tables.project)
    .values({
      name: data.name,
      repository: data.repository,
      description: data.description,
      cover: data.cover || null,
      preview: data.preview || null,
      created_at: new Date(),
      updated_at: new Date(),
    })

  return res
})
