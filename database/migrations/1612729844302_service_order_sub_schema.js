'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceOrderSubSchema extends Schema {
  up () {
    this.table('service_order_subs', (table) => {
      table.integer('beatch_id')
        .unsigned()
        .references('id')
        .inTable('beatches')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
        .after('service_order_id')
    })
  }

  down () {
    this.table('service_order_subs', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ServiceOrderSubSchema
