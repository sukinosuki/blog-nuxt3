export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  const drizzle = useDrizzle()

  const post = await drizzle.query.post.findFirst({
    where: eq(tables.post.id, id),

    with: {
      category: {
        columns: {
          id: true,
          name: true,
        },
      },
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

  if (!post) {
    // setResponseStatus(event, 404)
    throw createError({
      status: 404,
      message: 'post not found',
    })
  }

  post.tags = post?.post2tag.map(item => item.tag)
  delete post?.post2tag

  return post
})
