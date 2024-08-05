export default defineEventHandler(async (event) => {
  const { title, description, category_id, tag_ids, alias } = await readBody<API_Post.Update>(event)

  const id = Number(getRouterParam(event, 'id'))

  const drizzle = useDrizzle()

  await drizzle
    .update(tables.post)
    .set({
      title,
      alias,
      description,
      category_id,
      updated_at: new Date(),
    })
    .where(eq(tables.post.id, id))

  const post2TagData: typeof tables.post_2_tag.$inferInsert[] = tag_ids.map(tagId => ({
    tag_id: tagId,
    post_id: id,
  }))

  await drizzle
    .delete(tables.post_2_tag)
    .where(eq(tables.post_2_tag.post_id, id))

  if (post2TagData.length) {
    await drizzle
      .insert(tables.post_2_tag)
      .values(post2TagData)
  }

  return { message: 'ok' }
})
