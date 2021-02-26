'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.boolean('status').after('level')
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('status')
    })
  }
}

module.exports = UsersSchema
