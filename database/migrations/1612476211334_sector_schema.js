'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SectorSchema extends Schema {
  up () {
    this.table('sectors', (table) => {
      table.bool('status').after('name')
    })
  }

  down () {
    this.table('sectors', (table) => {
      table.dropColumn('status')
    })
  }
}

module.exports = SectorSchema
