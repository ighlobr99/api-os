'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BeatchSchema extends Schema {
  up () {
    this.create('beatches', (table) => {
      table.increments()
      table.integer('city_id')
        .unsigned()
        .references('id')
        .inTable('cities')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table.string('name')
      table.string('lat')
      table.string('long')
      table.string('status')
      table.timestamps()
    })
  }

  down () {
    this.drop('beatches')
  }
}

module.exports = BeatchSchema
