'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceOrderSubSchema extends Schema {
  up () {
    this.create('service_order_subs', (table) => {
      table.increments()
      table.integer('service_order_id')
        .unsigned()
        .references('id')
        .inTable('service_orders')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table.string('hour')
      table.string('air_temp')
      table.string('water_temp')
      table.boolean('rain')
      table.boolean('small_visibility')
      table.boolean('hangover')
      table.boolean('dirty_water')
      table.boolean('beatch_debris')
      table.boolean('beatch_waste')
      table.boolean('oils_and_greases_water')
      table.boolean('oils_and_greases_sand')
      table.boolean('death_fishes')
      table.boolean('sewer')
      table.string('mast')
      table.string('flag')
      table.timestamps()
    })
  }

  down () {
    this.drop('service_order_subs')
  }
}

module.exports = ServiceOrderSubSchema
