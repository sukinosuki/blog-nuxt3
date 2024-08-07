export default eventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const data = await readBody<API_Says.Update>(event)

  const drizzle = useDrizzle()

  const res = await drizzle.update(tables.says)
    .set({
      text: data.text,
      author: data.author || null,
      source: data.source || null,
      enabled: data.enabled,
      updated_at: new Date(),
    })
    .where(eq(tables.says.id, id))

  return res
})
