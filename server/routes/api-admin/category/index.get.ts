import { desc } from 'drizzle-orm'

export default eventHandler(async () => {
  const data = await useDrizzle()
    .select()
    .from(tables.category)
    .orderBy(desc(tables.category.id))
    .all()

  return data
})
