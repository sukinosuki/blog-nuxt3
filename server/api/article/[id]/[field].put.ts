export default defineEventHandler(async (event) => {
  const { id, field } = getRouterParams(event)

  const { value } = await readBody(event)

  const validField = ['content', 'enabled', 'is_sticky']
  if (!validField.includes(field)) {
    setResponseStatus(event, 404)
    return
  }

  // const db = hubDatabase()

  // console.log('id ', id)
  // console.log('value ', value)
  // console.log('field ', field)

  // await db
  //   .prepare('UPDATE article SET enabled = ?2 WHERE id = ?3')
  //   .bind(field, value, id)
  //   .run()

  const drizzle = useDrizzle()

  await drizzle
    .update(tables.article)
    .set({
      [field]: value,
    })
    .where(eq(tables.article.id, Number(id)))

  return id
})
