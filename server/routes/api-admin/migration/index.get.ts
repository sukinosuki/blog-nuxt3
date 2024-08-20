import { migrate } from 'drizzle-orm/d1/migrator'

export default defineEventHandler(async (event) => {
  const res = await migrate(useDrizzle(), { migrationsFolder: 'server/database/migrations' })
    .then(() => {
    //   consola.success('Database migrations done')
      return 'Database migrations done'
    })
    .catch((err) => {
    //   consola.error('Database migrations failed', err)

      return err
    })

  return res
})
