export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  // const res = await db
  //   .prepare('DELETE FROM article WHERE id = ?1')
  //   .bind(id)
  //   .run()

  // console.log('article1 ', res)

  const drizzle = useDrizzle()

  await drizzle.delete(tables.post)
    .where(eq(tables.post.id, id))

  await drizzle.delete(tables.post_2_tag)
    .where(eq(tables.post_2_tag.post_id, id))

  return { message: 'ok' }
})
