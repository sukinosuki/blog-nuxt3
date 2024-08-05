export default eventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  const drizzle = useDrizzle()

  const post = await drizzle.query.post.findFirst({
    where: eq(tables.post.category_id, id),
  })

  if (post) {
    throw createError({ status: 400, message: 'This category has already been used by some post, and cannot be deleted.' })
  }

  await drizzle
    .delete(tables.category)
    .where(eq(tables.category.id, id))

  return { message: 'ok' }
})
