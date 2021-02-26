'use strict'

const ServiceOrder = use('App/Models/ServiceOrder')
const ServiceOrderSub = use('App/Models/ServiceOrderSub')
const User = use('App/Models/User')
const Mail = use('Mail')

class ServiceOrderController {
  async index () {
    const orders = ServiceOrder.query()
      .with('serviceOrderSub', builder =>
        builder.with('place')
      )
      .fetch()

    return orders
  }
  async store ({ auth, request }) {
    const userLogged = auth.user
    const data = request.only([
      'name',
      'tech_id',
      'matrix_id',
      'type',
      'hour',
      'date',
      'status',
      'amount',
      'thermometer_id',
      'beatch_id'
    ])
    const order = await ServiceOrder.create({...data, admin_id: userLogged.id})
    const dataSub = request.only([
      'sub_orders'
    ])
    let orderData = order.toJSON()
    if (dataSub.sub_orders && dataSub.sub_orders.length) {
      for (const subOrder of dataSub.sub_orders) {
        await ServiceOrderSub.create({
          service_order_id: orderData.id,
          beatch_place_id: subOrder.value,
          status_question: 'open'
        })
      }
    }
    const user = await User.query().where('id', data.tech_id).first()
    await Mail.send('emails.osNew', {
      name: user.name,
      id_os: order.id
    }, (message) => {
      message.from('rodrigoaraujo990@gmail.com')
      message.to(user.email)
      message.subject('Nova ordem de serviço')
    })

    return order
  }

  async update ({ params, request }) {
    const order = await ServiceOrder.query()
      .where('id', params.id)
      .firstOrFail()
    const data = request.only([
      'name',
      'admin_id',
      'tech_id',
      'matrix_id',
      'type',
      'hour',
      'date',
      'status',
      'amount',
      'thermometer_id',
      'beatch_id'
    ])
    order.merge(data)
    await order.save()

    const orderSub = await ServiceOrderSub.query()
      .where('service_order_id', params.id)
      .fetch()
    const orderSubJson = orderSub.toJSON()
    for (const subOrders of orderSubJson) {
    const oldSubOrder = await ServiceOrderSub.query()
        .where('id', subOrders.id)
        .first()
      if (oldSubOrder) {
        await oldSubOrder.delete()
      }
    }

    const dataSub = request.only([
      'sub_orders'
    ])
    if (dataSub.sub_orders && dataSub.sub_orders.length) {
      for (const subOrder of dataSub.sub_orders) {
        await ServiceOrderSub.create({
          service_order_id: order.id,
          beatch_place_id: subOrder.value
        })
      }
    }

    return order
  }

  async show ({ params }) {
    const order = await ServiceOrder.query()
      .where('id', params.id)
      .with('serviceOrderSub', builder =>
        builder.with('place')
      ).firstOrFail()

    return order
  }

  async destroy ({ params }) {
    const order = await ServiceOrder.query()
      .where('id', params.id)
      .firstOrFail()
    await order.delete()
  }
}

module.exports = ServiceOrderController
