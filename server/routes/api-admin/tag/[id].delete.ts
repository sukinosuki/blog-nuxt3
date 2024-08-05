export default eventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  const drizzle = useDrizzle()

  const post2tag = await drizzle.query.post_2_tag
    .findFirst({
      where: eq(tables.post_2_tag.tag_id, id),
    })

  if (post2tag) {
    throw createError({ statusCode: 400, statusMessage: 'This tag has already been used by some posts, and cannot be deleted.' })
  }

  const { success } = await drizzle
    .delete(tables.tag)
    .where(eq(tables.tag.id, id))

  if (!success) {
    // TODO
  }

  return { message: 'ok' }
})
