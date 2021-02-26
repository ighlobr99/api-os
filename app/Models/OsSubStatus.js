'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class OsSubStatus extends Model {
  osSub () {
    return this.belongsTo('App/Models/ServiceOrderSub')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = OsSubStatus
