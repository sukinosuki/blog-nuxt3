import { desc } from 'drizzle-orm'

export default eventHandler(async () => {
  const drizzle = useDrizzle()

  const data = await drizzle
    .select()
    .from(tables.tag)
    .orderBy(desc(tables.tag.id))
    .all()

  return data
})
