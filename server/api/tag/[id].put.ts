export default eventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  const { name } = await readBody<API_Tag.Update>(event)

  await useDrizzle()
    .update(tables.tag)
    .set({
      name,
    })
    .where(eq(tables.tag.id, id))
    // .returning()
    // .get()

  return { message: 'ok' }
})
