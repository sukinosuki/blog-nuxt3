export default eventHandler(async (event) => {
  const { name } = await readBody<API_Category.Add>(event)

  // const db = hubDatabase()

  // await db.prepare('INSERT INTO tag (name, created_at) VALUES(?1, ?2)')
  //   .bind(name, Date.now())
  //   .run()

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
