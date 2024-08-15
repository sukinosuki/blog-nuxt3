export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const drizzle = useDrizzle()

  const post = await drizzle.query.post.findFirst({
    where: or(
      eq(tables.post.id, Number(id)),
      eq(tables.post.alias, id as string),
    ),
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

  // undefined
  if (!post) {
    // setResponseStatus(event, 404)
    throw createError({
      statusCode: 404,
      message: 'Record not found',
    })
  }

  post.tags = post?.post2tag.map(item => item.tag)
  delete post?.post2tag

  return post
})
