'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceOrderSchema extends Schema {
  up () {
    this.table('service_orders', (table) => {
      table.integer('beatch_id')
        .unsigned()
        .references('id')
        .inTable('beatches')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .after('matrix_id')
    })
  }

  down () {
    this.table('service_orders', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ServiceOrderSchema
