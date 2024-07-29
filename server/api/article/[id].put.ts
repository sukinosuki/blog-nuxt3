export default defineEventHandler(async (event) => {
  const { title, content, description, category_id, tag_ids } = await readBody<API_Article.Update>(event)

  const id = Number(getRouterParam(event, 'id'))

  // await db
  //   .prepare('UPDATE article SET title = ?1, category_id = ?2, description = ?3, content = ?4 WHERE id = ?5')
  //   .bind(title, category_id, description, content, id)
  //   .run()

  const drizzle = useDrizzle()

  await drizzle
    .update(tables.article)
    .set({
      title,
      description,
      content,
      category_id,
      updated_at: new Date(),
    })
    .where(eq(tables.article.id, id))

  const pivotArticle2Tag: typeof tables.article_2_tag.$inferInsert[] = tag_ids.map(tagId => ({
    tag_id: tagId,
    article_id: id,
  }))

  await drizzle
    .delete(tables.article_2_tag)
    .where(eq(tables.article_2_tag.article_id, id))

  await drizzle
    .insert(tables.article_2_tag)
    .values(pivotArticle2Tag)

  return { message: 'ok' }
})
