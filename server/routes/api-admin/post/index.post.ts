export default eventHandler(async (event) => {
  const { title, category_id, description, tag_ids, is_pin_to_top, enabled, alias, cover } = await readBody<API_Post.Add>(event)

  const drizzle = useDrizzle()

  const { id } = await drizzle
    .insert(tables.post)
    .values({
      title,
      category_id,
      content: '',
      description,
      enabled,
      is_pin_to_top,
      cover: cover || '',
      alias,
      created_at: new Date(),
      updated_at: new Date(),
    })
    .returning()
    .get()

  if (tag_ids.length) {
    const post2TagData: typeof tables.post_2_tag.$inferInsert[] = tag_ids.map(tagId => ({
      tag_id: tagId,
      post_id: id,
    }))

    await drizzle.insert(tables.post_2_tag).values(post2TagData)
  }

  return { message: 'ok' }
})
