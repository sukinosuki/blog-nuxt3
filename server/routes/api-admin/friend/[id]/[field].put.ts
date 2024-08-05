export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  const data = await readBody<API_Friend.UpdateField>(event)
  const drizzle = useDrizzle()

  await drizzle.update(tables.friend)
    .set({
      [data.field]: data.value,
    })
    .where(eq(tables.friend.id, id))

  return { message: 'ok' }
})
