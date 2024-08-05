export default eventHandler(async (event) => {
  const { name } = await readBody<API_Category.Add>(event)

  const tag = await useDrizzle()
    .insert(tables.tag)
    .values({
      name,
      updated_at: new Date(),
      created_at: new Date(),
    })
    .returning()
    .get()

  return tag
})
