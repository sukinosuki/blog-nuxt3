export default eventHandler(async () => {
  // const db = hubDatabase()

  // // await db.exec('CREATE UNIQUE INDEX category_idx_name ON category(name)')
  // await db.exec('CREATE TABLE IF NOT EXISTS category (id INTEGER PRIMARY KEY, name TEXT, created_at DATE)')

  // const data = await db
  //   .prepare('SELECT * FROM category ORDER BY id DESC')
  //   .all()

  const data = await useDrizzle()
    .select()
    .from(tables.category)
    .all()

  return data
})
