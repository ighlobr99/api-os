'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MatrixSchema extends Schema {
  up () {
    this.create('matrix', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('matrix')
  }
}

module.exports = MatrixSchema
