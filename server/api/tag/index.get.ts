export default eventHandler(async () => {
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

  const data = await useDrizzle().select().from(tables.tag).all()

  return data
})
