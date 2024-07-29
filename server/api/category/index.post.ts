export default eventHandler(async (event) => {
  const { name } = await readBody<API_Category.Add>(event)

  // const db = hubDatabase()

  // await db.prepare('INSERT INTO category (name, created_at) VALUES(?1, ?2)')
  //   .bind(name, Date.now())
  //   .run()

  const res = await useDrizzle()
    .insert(tables.category)
    .values({
      name,
      created_at: new Date(),
      updated_at: new Date(),
    })
    .returning()
    .get()

  return { data: res.id }
})
