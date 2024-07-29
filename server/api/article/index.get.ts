import { desc } from 'drizzle-orm'

export default eventHandler(async () => {
  // const db = hubDatabase()

  // await db.exec('DROP TABLE article')
  // await db.exec('DROP TABLE category')
  // await db.exec('DROP TABLE tag')
  // await db.exec('DROP TABLE pivot_article_2_tag')

  //   add new column and set the default value
  // await db.exec('ALTER TABLE article ADD COLUMN tag_id INT')

  //   await db.exec('ALTER TABLE article ADD COLUMN other_column5 AS (11)')
  // Generated column definitions cannot be directly modified.
  //   To change how a generated column generates its data, you can use ALTER TABLE table_name REMOVE COLUMN and then ADD COLUMN to re-define the generated column, or ALTER TABLE table_name RENAME COLUMN current_name TO new_name to rename the existing column before calling ADD COLUMN with a new definition.
  // https://developers.cloudflare.com/d1/reference/generated-columns/
  //   await db.exec('ALTER TABLE article RENAME COLUMN other_column4 TO other_column')

  // await db.exec(`CREATE TABLE IF NOT EXISTS article (id INTEGER PRIMARY KEY, title VARCHAR(100), category_id INTEGER, tag_id INTEGER, description VARCHAR(255), content TEXT, created_at DATE, updated_at DATE)`)

  // const data = await db.prepare('SELECT * FROM article ORDER BY id DESC').all()

  const drizzle = useDrizzle()

  // await drizzle.delete(tables.article)
  // https://www.reddit.com/r/node/comments/1an4zz9/can_anyone_tell_me_whats_wrong_with_this_drizzle/
  const data = await drizzle.query.article.findMany({
    columns: {
      id: true,
      title: true,
      created_at: true,
      enabled: true,
      is_sticky: true,
      cover: true,
    },
    orderBy: [desc(tables.article.id)],

    with: {
      category: {
        columns: {
          id: true,
          name: true,
        },
      },
      // tags: true,
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

  data.map((article) => {
    article.tags = article.article2tag.map(item => item.tag)
    delete article.article2tag
  })

  return data
})
