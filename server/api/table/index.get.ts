export default eventHandler(async () => {
  const db = hubDatabase()

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
  // const db = hubDatabase()

  // await db.exec('ALTER TABLE `tag` ADD `name2` text NOT NULL default(0)')

  // await db.exec('ALTER TABLE `tag` DROP `name2`')

  // await db.exec('CREATE UNIQUE INDEX tag_idx_name ON tag(name)')
  // await db.exec('DROP TABLE tag')
  // await db.exec('DROP TABLE article')
  // await db.exec('DROP TABLE category')
  // await db.exec('CREATE TABLE IF NOT EXISTS tag (id INTEGER PRIMARY KEY, name TEXT, created_at DATE)')

  // const data = await db
  //   .prepare('SELECT * FROM tag ORDER BY id DESC')
  //   .all()

  // return data.results
  try {
    await db.exec('DROP TABLE post')
  }
  catch (e) {

  }

  try {
    await db.exec('DROP TABLE category')
  }
  catch (e) {

  }

  try {
    await db.exec('DROP TABLE tag')
  }
  catch (e) {

  }

  try {
    await db.exec('DROP TABLE post_2_tag')
  }
  catch (e) {

  }

  try {
    await db.exec('DROP TABLE project')
  }
  catch (e) {

  }
  try {
    await db.exec('DROP TABLE says')
  }
  catch (e) {

  }

  try {
    await db.exec('DROP TABLE friend')
  }
  catch (e) {

  }

  return 'ok'
})
