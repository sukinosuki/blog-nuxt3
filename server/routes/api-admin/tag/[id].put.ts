export default eventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  const { name } = await readBody(event)

  const { success } = await useDrizzle()
    .update(tables.tag)
    .set({
      name,
    })
    .where(eq(tables.tag.id, id))

  if (!success) {
    // TODO
  }
  return { message: 'ok' }
})
