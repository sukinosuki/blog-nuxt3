export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  const drizzle = useDrizzle()

  await drizzle.delete(tables.post)
    .where(eq(tables.post.id, id))

  await drizzle.delete(tables.post_2_tag)
    .where(eq(tables.post_2_tag.post_id, id))

  return { message: 'ok' }
})
