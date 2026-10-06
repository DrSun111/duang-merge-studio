import {sqliteTable,text,integer} from 'drizzle-orm/sqlite-core';
export const config=sqliteTable('config',{id:text('id').primaryKey(),value:text('value').notNull(),version:integer('version').notNull().default(1)});
export const sessions=sqliteTable('sessions',{token:text('token').primaryKey(),expires:integer('expires').notNull()});
export const attempts=sqliteTable('attempts',{ip:text('ip').primaryKey(),count:integer('count').notNull(),until:integer('until').notNull()});
