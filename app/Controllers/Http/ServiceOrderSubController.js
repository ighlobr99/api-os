'use strict'

const ServiceOrderSub = use('App/Models/ServiceOrderSub')
const OsSubStatus = use('App/Models/OsSubStatus')
const User = use('App/Models/User')
const Mail = use('Mail')

class ServiceOrderSubController {
  async index () {
    const ordersSub = ServiceOrderSub.query()
      .fetch()

    return ordersSub
  }

  async store ({ request }) {
    const data = request.only([
      'beatch_place_id',
      'service_order_id',
      'hour',
      'air_temp',
      'water_temp',
      'rain',
      'small_visibility',
      'hangover',
      'dirty_water',
      'beatch_debris',
      'beatch_waste',
      'oils_and_greases_water',
      'oils_and_greases_sand',
      'death_fishes',
      'sewer',
      'flag',
      'status_question',
      'sample_sent',
      'sample_received',
      'result'
    ])
    const orderSub = await ServiceOrderSub.create(data)
    return orderSub
  }

  async update ({ params, request }) {
    const orderSub = await ServiceOrderSub.query()
      .where('id', params.id)
      .firstOrFail()
    const data = request.only([
      'beatch_place_id',
      'service_order_id',
      'hour',
      'air_temp',
      'water_temp',
      'rain',
      'small_visibility',
      'hangover',
      'dirty_water',
      'beatch_debris',
      'beatch_waste',
      'oils_and_greases_water',
      'oils_and_greases_sand',
      'death_fishes',
      'sewer',
      'flag',
      'status_question',
      'sample_sent',
      'sample_received',
      'result'
    ])

    if (data.dirty_water || data.beatch_debris || data.beatch_waste
      || data.oils_and_greases_water || data.oils_and_greases_sand
      || data.death_fishes || data.sewer) {
        const objData = {
          service_order_sub_id: orderSub.id,
          status_os_sub: 'improper',
          status: false
        }
        const osSubsStatus = await OsSubStatus.query().where('service_order_sub_id', orderSub.id).first()
        if (osSubsStatus) {
          osSubsStatus.merge(objData)
          await osSubsStatus.save()
        } else {
          await OsSubStatus.create(objData)
        }
    } else {
      const objData = {
        service_order_sub_id: orderSub.id,
        status_os_sub: 'proper',
        status: false
      }
      const osSubsStatus = await OsSubStatus.query().where('service_order_sub_id', orderSub.id).first()
      if (osSubsStatus) {
        osSubsStatus.merge(objData)
        await osSubsStatus.save()
      } else {
        await OsSubStatus.create(objData)
      }
    }

    if (data.result && data.result > 0) {
      if (data.result >= 400) {
        const objData = {
          service_order_sub_id: orderSub.id,
          status_os_sub: 'improper',
          status: false
        }
        const osSubsStatus = await OsSubStatus.query().where('service_order_sub_id', orderSub.id).first()
        if (osSubsStatus) {
          osSubsStatus.merge(objData)
          await osSubsStatus.save()
        } else {
          await OsSubStatus.create(objData)
        }
      } else {
        const orderSubs = await ServiceOrderSub.query()
          .where('beatch_place_id', data.beatch_place_id)
          .orderBy('created_at', 'desc')
          .limit(5)
          .fetch()
        const orderSubsJson = orderSubs.toJSON()
        let i = 1
        for (const orderSubData of orderSubsJson) {
          if (orderSubData.result >= 100) {
            i++;
          }
        }
        if (i >= 2) {
          const objData = {
            service_order_sub_id: orderSub.id,
            status_os_sub: 'improper',
            status: false
          }
          const osSubsStatus = await OsSubStatus.query().where('service_order_sub_id', orderSub.id).first()
          if (osSubsStatus) {
            osSubsStatus.merge(objData)
            await osSubsStatus.save()
          } else {
            await OsSubStatus.create(objData)
          }
        } else {
          const objData = {
            service_order_sub_id: orderSub.id,
            status_os_sub: 'proper',
            status: false
          }
          const osSubsStatus = await OsSubStatus.query().where('service_order_sub_id', orderSub.id).first()
          if (osSubsStatus) {
            osSubsStatus.merge(objData)
            await osSubsStatus.save()
          } else {
            await OsSubStatus.create(objData)
          }
        }
      }
    }

    if (data.sample_sent && !data.result) {
      const users = await User.query().where('level', 'laboratory_analyst').fetch()
      const usersJson = users.toJSON()
      for (const user of usersJson) {
        await Mail.send('emails.osAnalises', {
          name: user.name,
        }, (message) => {
          message.from('rodrigoaraujo990@gmail.com')
          message.to(user.email)
          message.subject('Novo item para analise')
        })
      }
    } else if (data.sample_sent && data.result) {
      const users = await User.query().where('level', 'manager').fetch()
      const usersJson = users.toJSON()
      for (const user of usersJson) {
        await Mail.send('emails.osAnalises', {
          name: user.name,
        }, (message) => {
          message.from('rodrigoaraujo990@gmail.com')
          message.to(user.email)
          message.subject('Novo item para analise')
        })
      }
    }

    orderSub.merge(data)
    await orderSub.save()
    return orderSub
  }

  async show ({ params }) {
    const orderSub = await ServiceOrderSub.query()
      .where('id', params.id)
      .firstOrFail()

    return orderSub
  }

  async destroy ({ params }) {
    const order = await ServiceOrderSub.query()
      .where('id', params.id)
      .firstOrFail()
    await order.delete()
  }
}

module.exports = ServiceOrderSubController
