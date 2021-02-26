'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BeatchPlaceSchema extends Schema {
  up () {
    this.table('beatch_places', (table) => {
      table.string('water_status').after('name')
    })
  }

  down () {
    this.table('beatch_places', (table) => {
      table.dropColumn('water_status')
    })
  }
}

module.exports = BeatchPlaceSchema
