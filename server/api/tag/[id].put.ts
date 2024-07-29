export default eventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  const { name } = await readBody(event)

  // const db = hubDatabase()

  // await db.prepare('UPDATE tag SET name = ?1 WHERE id = ?2')
  //   .bind(name, id)
  //   .run()

  const res = await useDrizzle()
    .update(tables.tag)
    .set({
      name,
    })
    .where(eq(tables.tag.id, id))
    .returning()
    .get()

  return res
})
