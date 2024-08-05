export default defineEventHandler(async (event) => {
  //
  const id = Number(getRouterParam(event, 'id'))

  const data = await readBody<API_Friend.Update>(event)

  const drizzle = useDrizzle()

  await drizzle
    .update(tables.friend)
    .set({
      blog_name: data.blog_name,
      nickname: data.nickname,
      avatar: data.avatar,
      link: data.link,
      status: data.status,
      introduction: data.introduction,
      email: data.email,
      updated_at: new Date(),
    })
    .where(eq(tables.friend.id, id))

  return { message: 'ok' }
})
