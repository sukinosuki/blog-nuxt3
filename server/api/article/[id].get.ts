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

  const article = await drizzle.query.article.findFirst({
    where: eq(tables.article.id, Number(id)),

    with: {
      category: {
        columns: {
          id: true,
          name: true,
        },
      },
      article2tag: {
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
  if (!article) {
    setResponseStatus(event, 404)
    return
  }

  article.tags = article?.article2tag.map(item => item.tag)
  delete article?.article2tag

  return article
})
