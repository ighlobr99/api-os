'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Complaint extends Model {
  beatch () {
    return this.belongsTo('App/Models/BeatchPlace')
  }
}

module.exports = Complaint
