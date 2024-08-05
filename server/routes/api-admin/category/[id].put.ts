export default eventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  const { name, alias } = await readBody(event)

  await useDrizzle()
    .update(tables.category)
    .set({
      name,
      alias,
      updated_at: new Date(),
    })
    .where(eq(tables.category.id, id))

  return { message: 'ok' }
})
