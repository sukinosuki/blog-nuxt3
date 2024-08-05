export default eventHandler(async () => {
  const data = await useDrizzle()
    .select()
    .from(tables.category)
    .all()

  return data
})
