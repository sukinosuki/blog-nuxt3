export default defineEventHandler(async (event) => {
  //
  const data = await readBody<API_Friend.Add>(event)

  const drizzle = useDrizzle()

  await drizzle.insert(tables.friend)
    .values({
      blog_name: data.blog_name,
      nickname: data.nickname,
      avatar: data.avatar,
      link: data.link,
      status: data.status,
      introduction: data.introduction,
      email: data.email,
      updated_at: new Date(),
      created_at: new Date(),
    })

  return { message: 'ok' }
})
