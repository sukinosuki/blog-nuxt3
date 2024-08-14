import { count, desc } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const drizzle = useDrizzle()
  let { page, size } = getQuery<Api_Query>(event)

  page = Number(page ?? 1)
  size = Number(size ?? 10)

  const [{ total }] = await drizzle
    .select({ total: count() })
    .from(tables.project)

  const list = await drizzle
    .select()
    .from(tables.project)
    .limit(size)
    .offset((page - 1) * size)
    .orderBy(desc(tables.project.id))
    .all()

  const listData: Common.ListData<typeof list[number]> = {
    list,
    total,
  }

  return listData
})
