import { asc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const drizzle = useDrizzle()

  const list = await drizzle
    .select()
    .from(tables.friend)
    .orderBy(asc(tables.friend.id))

  return list
})
