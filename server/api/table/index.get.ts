export default eventHandler(async () => {
  const db = hubDatabase()

  try {
    await db.exec('DROP TABLE article')
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
    await db.exec('DROP TABLE article_2_tag')
  }
  catch (e) {

  }

  return 'ok'
})
