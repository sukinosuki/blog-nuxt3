export default eventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  const { name } = await readBody(event)

  // const db = hubDatabase()

  // await db.prepare('UPDATE category SET name = ?1 WHERE id = ?2')
  //   .bind(name, id)
  //   .run()

  const res = await useDrizzle()
    .update(tables.category)
    .set({
      name,
      updated_at: new Date(),
    })
    .where(eq(tables.category.id, id))

  return { data: res }
})
