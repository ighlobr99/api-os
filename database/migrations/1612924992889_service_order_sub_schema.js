'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceOrderSubSchema extends Schema {
  up () {
    this.table('service_order_subs', (table) => {
      // alter tableresult
      table.bool('sample_sent').after('status_question')
      table.bool('sample_received').after('status_question')
    })
  }

  down () {
    this.table('service_order_subs', (table) => {
      table.dropColumn('sample_received')
      table.dropColumn('sample_sent')
    })
  }
}

module.exports = ServiceOrderSubSchema
