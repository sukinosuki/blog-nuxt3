export default defineEventHandler(async (event) => {
  // const query = getQuery(event)

  // const db = hubDatabase()
  // console.log('query ', query)

  const id = getRouterParam(event, 'id')

  // const article = await db
  //   .prepare('SELECT * FROM article WHERE id = ?1')
  //   .bind(id)
  //   .first()

  // if (!article) {
  //   setResponseStatus(event, 404)
  //   return
  // }
  const drizzle = useDrizzle()

  const post = await drizzle.query.post.findFirst({
    where: or(eq(tables.post.id, Number(id)), eq(tables.post.alias, id)),
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
    setResponseStatus(event, 404)
    return
  }

  post.tags = post?.post2tag.map(item => item.tag)
  delete post?.post2tag

  return post
})
