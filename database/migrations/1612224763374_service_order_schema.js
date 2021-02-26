'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceOrderSchema extends Schema {
  up () {
    this.create('service_orders', (table) => {
      table.increments()
      table.integer('admin_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table.integer('tech_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table.integer('matrix_id')
        .unsigned()
        .references('id')
        .inTable('matrix')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table.string('type').default('simple').notNullable()
      table.string('name').notNullable()
      table.string('status').notNullable()
      table.string('amount')
      table.string('thermometer_id')
      table.string('hour')
      table.string('date')
      table.timestamps()
    })
  }

  down () {
    this.drop('service_orders')
  }
}

module.exports = ServiceOrderSchema
