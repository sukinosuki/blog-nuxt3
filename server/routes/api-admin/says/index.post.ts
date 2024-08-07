export default eventHandler(async (event) => {
  const data = await readBody<API_Says.Add>(event)

  const drizzle = useDrizzle()

  const res = await drizzle.insert(tables.says)
    .values({
      text: data.text,
      author: data.author || null,
      source: data.source || null,
      enabled: data.enabled,
      created_at: new Date(),
      updated_at: new Date(),
    })

  return res
})
