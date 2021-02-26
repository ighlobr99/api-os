'use strict'

const Complaint = use('App/Models/Complaint')

class ComplaintController {
  async index ({ request }) {
    const data = request.only(['description'])
    if(data.description) {
      const description = Complaint.query()
        .where('description', 'like', `%${data.description}%`)
        .with('beatch')
        .fetch()
      return description
    }
    const description = Complaint.query()
      .with('beatch')
      .fetch()
    return description
  }

  async store ({ request }) {
    const data = request.only([
      'beatch_place_id',
      'description',
    ])
    const complaint = await Complaint.create(data)
    return complaint
  }

  async update ({ params, request }) {
    const complaint = await Complaint.query().where('id', params.id).firstOrFail()
    const data = request.only([
      'beatch_place_id',
      'description',
    ])

    complaint.merge({...data})
    await complaint.save()
    return complaint
  }

  async show ({ params }) {
    const complaint = await Complaint.query()
      .where('id', params.id)
      .firstOrFail()

    return complaint
  }

  async destroy ({ params }) {
    const complaint = await Complaint.query()
      .where('id', params.id)
      .firstOrFail()
    await complaint.delete()
  }
}

module.exports = ComplaintController
