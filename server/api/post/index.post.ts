export default eventHandler(async (event) => {
  const { title, category_id, description, tag_ids, is_sticky, enabled, alias } = await readBody<API_Post.Add>(event)

  // const db = hubDatabase()

  // const data = await db
  //   .prepare('INSERT INTO article (title, category_id, description, content, created_at, updated_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6)')
  //   .bind(title, category_id, description, content, Date.now(), Date.now())
  //   .run()
  const drizzle = useDrizzle()

  const { id } = await drizzle
    .insert(tables.post)
    .values({
      title,
      category_id,
      content: '',
      description,
      enabled,
      is_sticky,
      cover: '',
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
