/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TopicSchema extends Schema {
  up () {
    this.create('topics', table => {
      table.increments()
      table.string('title_br', 200).notNullable()
      table.string('title_en', 200)
      table.string('introduction_br', 250).notNullable()
      table.string('introduction_en', 250)
      table.text('description_br').notNullable()
      table.text('description_en')
      table.integer('views').defaultTo(0)
      table.integer('sex').defaultTo(-1)
      table
        .integer('author_id')
        .unsigned()
        .references('id')
        .inTable('administrators')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('topics')
  }
}

module.exports = TopicSchema
