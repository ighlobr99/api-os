'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OsSubStatusSchema extends Schema {
  up () {
    this.create('os_sub_statuses', (table) => {
      table.increments()
      table.integer('service_order_sub_id')
        .unsigned()
        .references('id')
        .inTable('service_order_subs')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table.string('status_os_sub')
      table.bool('status')
      table.integer('admin_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('os_sub_statuses')
  }
}

module.exports = OsSubStatusSchema
