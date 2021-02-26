'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BeatchPlaceSchema extends Schema {
  up () {
    this.table('beatch_places', (table) => {
      table.boolean('status').after('name')
      table.string('situation').after('name')
    })
  }

  down () {
    this.table('beatch_places', (table) => {
      table.dropColumn('situation')
      table.dropColumn('status')
    })
  }
}

module.exports = BeatchPlaceSchema
