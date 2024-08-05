export default eventHandler(async (event) => {
  const { name, alias } = await readBody<API_Category.Add>(event)

  const res = await useDrizzle()
    .insert(tables.category)
    .values({
      name,
      alias,
      created_at: new Date(),
      updated_at: new Date(),
    })
    .returning()
    .get()

  return { data: res.id }
})
