export default eventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  // const db = hubDatabase()

  // await db.prepare('DELETE FROM category WHERE id = ?1')
  //   .bind(id)
  //   .run()

  const res = await useDrizzle()
    .delete(tables.category)
    .where(eq(tables.category.id, id))

  return { message: 'ok', data: res }
})
