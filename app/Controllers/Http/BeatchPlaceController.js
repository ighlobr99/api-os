'use strict'

const BeatchPlace = use('App/Models/BeatchPlace')
const Beatch = use('App/Models/Beatch')

class BeatchPlaceController {
  async index ({ request }) {
    const data = request.only(['name'])
    if(data.name) {
      const beacthes = BeatchPlace.query()
        .where('name', 'like', `%${data.name}%`)
        .fetch()
      return beacthes
    }
    const beacthes = BeatchPlace.query().fetch()
    return beacthes
  }

  async store ({ request }) {
    const data = request.only([
      'name',
      'beatch_id',
      'status',
      'situation'
    ])

    const beacth = await BeatchPlace.create({...data})
    return beacth
  }

  async update ({ params, request }) {
    const beacth = await BeatchPlace.query().where('id', params.id).firstOrFail()
    const data = request.only([
      'name',
      'beatch_id',
      'status',
      'situation'
    ])

    beacth.merge({...data})
    await beacth.save()
    return beacth
  }

  async show ({ params }) {
    const beacth = await BeatchPlace.query()
      .where('id', params.id)
      .firstOrFail()

    return beacth
  }

  async destroy ({ params }) {
    const beacth = await BeatchPlace.query()
      .where('id', params.id)
      .firstOrFail()
    await beacth.delete()
  }
}

module.exports = BeatchPlaceController
