import { relations } from 'drizzle-orm'
import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const tag = sqliteTable('tag', {

  id: integer('id').primaryKey({ autoIncrement: true }),

  name: text('name').notNull().unique(),

  created_at: integer('created_at', { mode: 'timestamp' }).notNull(),

  updated_at: integer('updated_at', { mode: 'timestamp' }).notNull(),
})

export const article = sqliteTable('article', {
  id: integer('id').primaryKey({ autoIncrement: true }),

  title: text('title').notNull(),

  content: text('content').notNull(),

  category_id: integer('category_id').notNull(), // .references(() => category.id),

  description: text('description').notNull(),

  created_at: integer('created_at', { mode: 'timestamp' }).notNull(),

  updated_at: integer('updated_at', { mode: 'timestamp' }).notNull(),

  enabled: integer('enabled', { mode: 'boolean' }).notNull(),

  is_sticky: integer('is_sticky', { mode: 'boolean' }).notNull(),

  cover: text('cover').notNull(),
})

export const category = sqliteTable('category', {
  id: integer('id').primaryKey({ autoIncrement: true }),

  name: text('name').notNull().unique(),

  created_at: integer('created_at', { mode: 'timestamp' }).notNull(),

  updated_at: integer('updated_at', { mode: 'timestamp' }).notNull(),
})

export const article_2_tag = sqliteTable('article_2_tag', {
  article_id: integer('article_id').notNull(), // .references(() => article.id),
  tag_id: integer('tag_id').notNull(), // .references(() => tag.id),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.article_id, table.tag_id] }),
  }
})

export const articleRelations = relations(article, ({ many, one }) => ({
  article2tag: many(article_2_tag),
  // article 2 category: one 2 one
  category: one(category, {
    fields: [article.category_id],
    references: [category.id],
  }),
}))

export const article2tagRelations = relations(article_2_tag, ({ one }) => ({
  article: one(article, {
    fields: [article_2_tag.article_id],
    references: [article.id],
  }),
  tag: one(tag, {
    fields: [article_2_tag.tag_id],
    references: [tag.id],
  }),
}))
