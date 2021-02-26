'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ServiceOrderSub extends Model {
  serviceOrder () {
    return this.belongsTo('App/Models/ServiceOrder')
  }

  place () {
    return this.belongsTo('App/Models/BeatchPlace')
  }

  osSub () {
    return this.hasOne('App/Models/OsSubStatus')
  }
}

module.exports = ServiceOrderSub
