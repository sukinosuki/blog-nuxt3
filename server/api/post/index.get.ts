import { count, desc } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const drizzle = useDrizzle()

  let { page, size, category_id } = getQuery<API_Post.Get>(event)

  page = Number(page || 1)
  size = Number(size || 10)
  category_id = category_id ? Number(category_id) : null

  const countQuery = drizzle.select({ total: count() }).from(tables.post)
  if (category_id !== null) {
    countQuery.where(eq(tables.post.category_id, category_id))
  }

  // await drizzle.delete(tables.article)
  // https://www.reddit.com/r/node/comments/1an4zz9/can_anyone_tell_me_whats_wrong_with_this_drizzle/
  const list = await drizzle.query.post.findMany({
    columns: {
      id: true,
      title: true,
      created_at: true,
      enabled: true,
      is_sticky: true,
      cover: true,
      alias: true,
      description: true,
    },
    where: and(
      category_id ? eq(tables.post.id, category_id) : undefined,
      eq(tables.post.enabled, true),
    ),
    limit: size,
    offset: (page - 1) * size, // TODO: 传递string时不生效
    orderBy: [desc(tables.post.id)],
    with: {
      category: {
        columns: {
          id: true,
          name: true,
        },
      },
      // tags: true,
      post2tag: {
        columns: {
        },
        with: {
          tag: {
            columns: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  })

  list.map((post) => {
    post.tags = post.post2tag.map(item => item.tag)
    delete post.post2tag
  })

  return list
})
