export default defineEventHandler(async (event) => {
  //
  const data = await readBody<API_Friend.Add>(event)

  const drizzle = useDrizzle()

  await drizzle.insert(tables.friend)
    .values({
      site_name: data.site_name,
      nickname: data.nickname || null,
      avatar: data.avatar || null,
      link: data.link,
      status: data.status,
      introduction: data.introduction,
      email: data.email || null,
      updated_at: new Date(),
      created_at: new Date(),
    })

  return { message: 'ok' }
})
