'use strict'

const Beatch = use('App/Models/Beatch')

class BeatchController {
  async index ({ request }) {
    const data = request.only(['name'])
    if(data.name) {
      const beacthes = Beatch.query()
        .where('name', 'like', `%${data.name}%`)
        .with('places')
        .fetch()
      return beacthes
    }
    const beacthes = Beatch.query()
      .with('places')
      .fetch()
    return beacthes
  }

  async store ({ request, response }) {
    const data = request.only([
      'name',
      'lat',
      'city_id',
      'long',
      'status'
    ])
    const beatchData = await Beatch.query()
      .where('name', data.name)
      .first()
    if (beatchData) {
      return response.status(400).send({error: {
        message: 'Esta praia já foi cadastrada.'
      }})
    }
    const beacth = await Beatch.create(data)
    return beacth
  }

  async update ({ params, request }) {
    const beacth = await Beatch.query().where('id', params.id).firstOrFail()
    const data = request.only([
      'name',
      'city_id',
      'lat',
      'long',
      'status'
    ])
    beacth.merge(data)
    await beacth.save()
    return beacth
  }

  async show ({ params }) {
    const beacth = await Beatch.query()
      .where('id', params.id)
      .with('places')
      .firstOrFail()

    return beacth
  }

  async destroy ({ params }) {
    const beacth = await Beatch.query()
      .where('id', params.id)
      .firstOrFail()
    await beacth.delete()
  }
}

module.exports = BeatchController
