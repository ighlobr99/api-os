'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BeatchSchema extends Schema {
  up () {
    this.table('beatches', (table) => {
      table.boolean('status').alter()
    })
  }

  down () {
    this.table('beatches', (table) => {
      table.string('status').alter()
    })
  }
}

module.exports = BeatchSchema
