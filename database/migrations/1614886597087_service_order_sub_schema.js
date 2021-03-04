'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceOrderSubSchema extends Schema {
  up () {
    
      
      this.table('service_order_subs', (table) => {
        table.dropForeign('beatch_place_id')
        table.dropColumn('beatch_place_id')
        table.integer('beatch_place_id')
          .unsigned()
          .references('id')
          .inTable('beatch_places')
          .onUpdate('CASCADE')
          .onDelete('CASCADE')
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
