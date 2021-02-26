'use strict'

const City = use('App/Models/City')

class CityController {
  async index ({ request }) {
    const data = request.only(['name'])
    if(data.name) {
      const city = City.query()
        .where('name', 'like', `%${data.name}%`)
        .fetch()
      return city
    }
    const city = City.query().fetch()
    return city
  }

  async store ({ request }) {
    const data = request.only([
      'name',
      'status'
    ])
    const city = await City.create({...data})
    return city
  }

  async update ({ params, request }) {
    const city = await City.query().where('id', params.id).firstOrFail()
    const data = request.only([
      'name',
      'status'
    ])
    city.merge({...data})
    await city.save()
    return city
  }

  async show ({ params }) {
    const city = await City.query()
      .where('id', params.id)
      .firstOrFail()

    return city
  }

  async destroy ({ params }) {
    const city = await City.query()
      .where('id', params.id)
      .firstOrFail()
    await city.delete()
  }
}

module.exports = CityController
