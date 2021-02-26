'use strict'

const Matrix = use('App/Models/Matrix')
class MatrixController {
  async index ({ request }) {
    const data = request.only(['name'])
    if (data.name) {
      const matrix = Matrix.query()
        .where('name', 'like', `%${data.name}%`)
        .orderBy('name', 'desc')
        .fetch()
      return matrix
    }
    const matrix = Matrix.query().orderBy('name', 'desc').fetch()
    return matrix
  }

  async store ({ request }) {
    const data = request.only([
      'name',
      'status'
    ])
    const matrix = await Matrix.create({...data})
    return matrix
  }

  async update ({ params, request }) {
    const matrix = await Matrix.query().where('id', params.id).firstOrFail()
    const data = request.only([
      'name',
      'status'
    ])
    matrix.merge({...data})
    await matrix.save()
    return matrix
  }

  async show ({ params }) {
    const matrix = await Matrix.query()
      .where('id', params.id)
      .firstOrFail()

    return matrix
  }

  async destroy ({ params }) {
    const matrix = await Matrix.query()
      .where('id', params.id)
      .firstOrFail()
    await matrix.delete()
  }
}

module.exports = MatrixController
