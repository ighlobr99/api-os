'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ServiceOrder extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }
  serviceOrderSub () {
    return this.hasMany('App/Models/ServiceOrderSub')
  }
}

module.exports = ServiceOrder
