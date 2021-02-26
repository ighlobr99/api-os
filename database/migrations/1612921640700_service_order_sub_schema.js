'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceOrderSubSchema extends Schema {
  up () {
    this.table('service_order_subs', (table) => {
      table.string('status_question').after('beatch_place_id')
    })
  }

  down () {
    this.table('service_order_subs', (table) => {
      table.dropColumn('status_question')
    })
  }
}

module.exports = ServiceOrderSubSchema
