export default eventHandler(async (event) => {
  const { title, category_id, description, tag_ids, is_sticky, enabled } = await readBody<API_Article.Add>(event)

  // const db = hubDatabase()

  // const data = await db
  //   .prepare('INSERT INTO article (title, category_id, description, content, created_at, updated_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6)')
  //   .bind(title, category_id, description, content, Date.now(), Date.now())
  //   .run()
  const drizzle = useDrizzle()

  const { id } = await drizzle
    .insert(tables.article)
    .values({
      title,
      category_id,
      content: '',
      description,
      enabled,
      is_sticky,
      cover: '',
      created_at: new Date(),
      updated_at: new Date(),
    })
    .returning()
    .get()

  const pivotArticle2Tag: typeof tables.article_2_tag.$inferInsert[] = tag_ids.map(tagId => ({
    tag_id: tagId,
    article_id: id,
  }))

  const data = await drizzle.insert(tables.article_2_tag).values(pivotArticle2Tag).returning()
  return data
})
