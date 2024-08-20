import { desc } from 'drizzle-orm'

export default eventHandler(async (event) => {
  let id: number | string = getRouterParam(event, 'id') || 0

  const drizzle = useDrizzle()

  if (Number.isNaN(Number(id))) {
    const [category] = await drizzle
      .select({ id: tables.category.id })
      .from(tables.category)
      .where(eq(tables.category.alias, id as string))

    if (!category) {
      throw createError({
        message: 'Record not found',
        status: 404,
      })
    }

    id = category.id
  }

  const list = await drizzle
    .select({
      id: tables.post.id,
      alias: tables.post.alias,
      title: tables.post.title,
      created_at: tables.post.created_at,
    })
    .from(tables.post)
    .where(
      and(
        eq(tables.post.category_id, id as number),
        eq(tables.post.enabled, true),
      ),
    )
    .orderBy(desc(tables.post.id))

  return list
})
