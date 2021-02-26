'use strict'

const Sector = use('App/Models/Sector')

class SectorController {
  async index ({ request }) {
    const data = request.only(['name'])
    if (data.name) {
      const sector = Sector.query()
        .where('name', 'like', `%${data.name}%`)
        .orderBy('name', 'desc')
        .fetch()
      return sector
    }
    const sector = Sector.query().orderBy('name', 'desc').fetch()
    return sector
  }

  async store ({ request }) {
    const data = request.only([
      'name',
      'status'
    ])
    const sector = await Sector.create({...data})
    return sector
  }

  async update ({ params, request }) {
    const sector = await Sector.query().where('id', params.id).firstOrFail()
    const data = request.only([
      'name',
      'status'
    ])
    sector.merge({...data})
    await sector.save()
    return sector
  }

  async show ({ params }) {
    const sector = await Sector.query()
      .where('id', params.id)
      .firstOrFail()

    return sector
  }

  async destroy ({ params }) {
    const sector = await Sector.query()
      .where('id', params.id)
      .firstOrFail()
    await Sector.delete()
  }
}

module.exports = SectorController
