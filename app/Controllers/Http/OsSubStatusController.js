'use strict'

const OsSubStatus = use('App/Models/OsSubStatus')
const BeatchPlace = use('App/Models/BeatchPlace')
const ServiceOrder = use('App/Models/ServiceOrder')

class OsSubStatusController {
  async index () {
    // const data = request.only(['name'])
    // if (data.name) {
    //   const osSubs = OsSubStatus.query()
    //     .fetch()
    //   return osSubs
    // }
    const osSubs = OsSubStatus.query()
      .with('osSub', builder => {
        builder.with('serviceOrder').with('place')
      })
      .where('status', false)
      .fetch()
    return osSubs
  }

  async update ({ params, request }) {
    const osSubs = await OsSubStatus.query().where('id', params.id).firstOrFail()
    const data = request.only([
      'status',
      'beatch_place_id',
      'status_os_sub',
      'service_order'
    ])
    if (data.status === true) {
      const beatch = await BeatchPlace.query().where('id', data.beatch_place_id).first()
      beatch.merge({situation: data.status_os_sub})
      await beatch.save()

      const serviceOrder = await ServiceOrder.query().where('id', data.service_order).first()
      serviceOrder.merge({status: 'close'})
      await serviceOrder.save()
    }
    delete data.beatch_place_id
    delete data.service_order
    osSubs.merge({...data})
    await osSubs.save()
    return osSubs
  }

  async destroy ({ params }) {
    const osSubs = await OsSubStatus.query()
      .where('id', params.id)
      .firstOrFail()
    await osSubs.delete()
  }
}

module.exports = OsSubStatusController
