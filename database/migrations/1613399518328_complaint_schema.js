'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ComplaintSchema extends Schema {
  up () {
    this.create('complaints', (table) => {
      table.increments()
      table.integer('beatch_place_id')
        .unsigned()
        .references('id')
        .inTable('beatch_places')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('complaints')
  }
}

module.exports = ComplaintSchema
