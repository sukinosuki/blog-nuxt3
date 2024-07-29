export default eventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  // const db = hubDatabase()

  // await db.prepare('DELETE FROM tag WHERE id = ?1')
  //   .bind(id)
  //   .run()

  const res = await useDrizzle()
    .delete(tables.tag)
    .where(eq(tables.tag.id, id))
    .returning()
    .get()

  return res
})
