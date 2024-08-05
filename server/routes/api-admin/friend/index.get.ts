import { count, desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const query = getQuery<Api_Query>(event)
  query.page = Number(query.page ?? 1)
  query.size = Number(query.size ?? 10)

  const drizzle = useDrizzle()

  const [{ total }] = await drizzle.select({ total: count() }).from(tables.friend)

  const list = await drizzle.select()
    .from(tables.friend)
    .limit(query.size)
    .orderBy(desc(tables.friend.id))
    .offset((query.page - 1) * query.size)

  const res: Common.ListData<typeof list[number]> = {
    list,
    total,
  }
  return res
})
