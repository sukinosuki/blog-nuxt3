import { migrate } from 'drizzle-orm/d1/migrator'

export default defineTask({
  meta: {
    name: 'db:migrate',
    description: 'Run database migrations',
  },

  async run({ payload, context }) {
    // console.log('run db migration task..., payload: ', payload)
    const res = await migrate(useDrizzle(), { migrationsFolder: 'server/database/migrations' })
      .then(() => {
        return 'Database migrations done'
      })
      .catch((err) => {
        return err
      })

    console.log('execute db:migrate ', res)

    return {
      result: res,
    }
  },
})
