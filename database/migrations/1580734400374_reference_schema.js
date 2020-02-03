'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReferenceSchema extends Schema {
  up () {
    this.create('references', (table) => {
      table.increments()
      table.string('title', 200).notNullable()
      table.text('description').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('references')
  }
}

module.exports = ReferenceSchema
