export default eventHandler(async (event) => {
  let { page, size } = await getQuery<Api_Query>(event)
  page = Number(page || 1)
  size = Number(size || 20)

  const drizzle = useDrizzle()

  const list = await drizzle
    .select({
      text: tables.says.text,
      created_at: tables.says.created_at,
      author: tables.says.author,
      source: tables.says.source,
      id: tables.says.id,
    })
    .from(tables.says)
    .where(eq(tables.says.enabled, true))
    .limit(size)
    .offset((page - 1) * size)

  return list
})
