'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Matrix extends Model {
  static get table () {
    return 'matrix'
  }
}

module.exports = Matrix
