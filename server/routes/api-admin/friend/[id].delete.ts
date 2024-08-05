export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  const drizzle = useDrizzle()

  await drizzle
    .delete(tables.friend)
    .where(eq(tables.friend.id, id))

  return { message: 'ok' }
})
