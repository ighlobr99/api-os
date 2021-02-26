'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BeatchPlacesSchema extends Schema {
  up () {
    this.create('beatch_places', (table) => {
      table.increments()
      table.integer('beatch_id')
        .unsigned()
        .references('id')
        .inTable('beatches')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table.string('name').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('beatch_places')
  }
}

module.exports = BeatchPlacesSchema
