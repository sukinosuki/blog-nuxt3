export default defineEventHandler(async (event) => {
  const { id, field } = getRouterParams(event)

  const { value } = await readBody(event)

  const validField = ['content', 'enabled', 'is_sticky']
  if (!validField.includes(field)) {
    setResponseStatus(event, 404)
    return
  }

  const drizzle = useDrizzle()

  await drizzle
    .update(tables.post)
    .set({
      [field]: value,
    })
    .where(eq(tables.post.id, Number(id)))

  return id
})
