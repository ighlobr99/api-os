'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.integer('sectors_id')
        .unsigned()
        .references('id')
        .inTable('sectors')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('name', 80).notNullable()
      table.string('document', 80).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('phone', 80)
      table.string('birth_date', 80)
      table.string('address', 254)
      table.string('area', 254)
      table.string('level', 80).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
