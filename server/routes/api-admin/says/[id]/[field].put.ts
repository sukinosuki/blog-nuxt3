export default eventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const field = getRouterParam(event, 'field')
  const data = await readBody<API_Says.UpdateField>(event)

  console.log('field ', field)
  console.log('data ', data)

  const drizzle = useDrizzle()

  const res = await drizzle.update(tables.says)
    .set({
      [field]: data.value,
    })
    .where(eq(tables.says.id, id))

  return res
})
