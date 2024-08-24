export default defineEventHandler(async (event) => {
  //
  const id = Number(getRouterParam(event, 'id'))

  const data = await readBody<API_Friend.Update>(event)

  const drizzle = useDrizzle()

  await drizzle
    .update(tables.friend)
    .set({
      site_name: data.site_name,
      nickname: data.nickname || null,
      avatar: data.avatar || null,
      link: data.link,
      status: data.status,
      introduction: data.introduction,
      email: data.email || null,
      updated_at: new Date(),
    })
    .where(eq(tables.friend.id, id))

  return { message: 'ok' }
})
