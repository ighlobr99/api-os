'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CitySchema extends Schema {
  up () {
    this.table('cities', (table) => {
      table.boolean('status').after('name')
    })
  }

  down () {
    this.table('cities', (table) => {
      table.dropColumn('status')
    })
  }
}

module.exports = CitySchema
