'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Beatch extends Model {
  places () {
    return this.hasMany('App/Models/BeatchPlace')
  }
  city () {
    return this.hasMany('App/Models/City')
  }
}

module.exports = Beatch
