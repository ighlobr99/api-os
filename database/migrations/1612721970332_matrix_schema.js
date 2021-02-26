'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MatrixSchema extends Schema {
  up () {
    this.table('matrix', (table) => {
      table.boolean('status').after('name')
    })
  }

  down () {
    this.table('matrix', (table) => {
      table.dropColumn('status')
    })
  }
}

module.exports = MatrixSchema
