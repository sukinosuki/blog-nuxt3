import { count, desc } from 'drizzle-orm'

export default eventHandler(async (event) => {
  let { page, size } = getQuery<Api_Query>(event)
  page = Number(page || 1)
  size = Number(size || 10)

  const drizzle = useDrizzle()

  const [{ total }] = await drizzle.select({ total: count() }).from(tables.says)
  const list = await drizzle.select().from(tables.says)
    .limit(size)
    .offset((page - 1) * size)
    .orderBy(desc(tables.says.id))

  const res: Common.ListData<typeof list[number]> = {
    list,
    total,
  }

  return res
})
