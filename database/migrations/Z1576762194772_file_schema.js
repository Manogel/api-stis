'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FileSchema extends Schema {
  up () {
    this.create('files', (table) => {
      table.increments()
      table.string('url').notNullable()
      table.string('description_br', 250)
      table.string('description_en', 250)
      table
        .integer('topic_id')
        .unsigned()
        .references('id')
        .inTable('topics')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('files')
  }
}

module.exports = FileSchema
