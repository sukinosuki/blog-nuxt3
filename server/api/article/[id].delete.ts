export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  // const res = await db
  //   .prepare('DELETE FROM article WHERE id = ?1')
  //   .bind(id)
  //   .run()

  // console.log('article1 ', res)

  const drizzle = useDrizzle()

  await drizzle.delete(tables.article)
    .where(eq(tables.article.id, id))

  await drizzle.delete(tables.article_2_tag)
    .where(eq(tables.article_2_tag.article_id, id))

  return { message: 'ok' }
})
