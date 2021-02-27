'use strict'

const Route = use('Route')

Route.post('sessions', 'SessionController.store')
Route.get('beatch', 'BeatchController.index')

Route.get('complaint', 'ComplaintController.index')
Route.get('complaint/:id', 'ComplaintController.show')
Route.put('complaint/:id', 'ComplaintController.update')
Route.post('complaint', 'ComplaintController.store')
Route.delete('complaint/:id', 'ComplaintController.delete')
Route.get('beatch_place', 'BeatchPlaceController.index')
Route.post('users', 'UserController.store')
Route.post('sector', 'SectorController.store')
Route.group(() => {
  Route.get('sector', 'SectorController.index')
  Route.get('sector/:id', 'SectorController.show')
  Route.put('sector/:id', 'SectorController.update')
  
  Route.delete('sector/:id', 'SectorController.delete')

  Route.get('users', 'UserController.index')
  Route.get('users/:id', 'UserController.show')
  
  Route.put('users/:id', 'UserController.update')
  Route.delete('users/:id', 'UserController.delete')

  Route.get('city', 'CityController.index')
  Route.get('city/:id', 'CityController.show')
  Route.post('city', 'CityController.store')
  Route.put('city/:id', 'CityController.update')
  Route.delete('city/:id', 'CityController.delete')

  Route.get('beatch/:id', 'BeatchController.show')
  Route.post('beatch', 'BeatchController.store')
  Route.put('beatch/:id', 'BeatchController.update')
  Route.delete('beatch/:id', 'BeatchController.delete')

  Route.get('beatch_place/:id', 'BeatchPlaceController.show')
  Route.post('beatch_place', 'BeatchPlaceController.store')
  Route.put('beatch_place/:id', 'BeatchPlaceController.update')
  Route.delete('beatch_place/:id', 'BeatchPlaceController.delete')

  Route.get('matrix', 'MatrixController.index')
  Route.get('matrix/:id', 'MatrixController.show')
  Route.post('matrix', 'MatrixController.store')
  Route.put('matrix/:id', 'MatrixController.update')
  Route.delete('matrix/:id', 'MatrixController.delete')

  Route.get('service_order', 'ServiceOrderController.index')
  Route.get('service_order/:id', 'ServiceOrderController.show')
  Route.post('service_order', 'ServiceOrderController.store')
  Route.put('service_order/:id', 'ServiceOrderController.update')
  Route.delete('service_order/:id', 'ServiceOrderController.delete')

  Route.get('service_order_sub', 'ServiceOrderSubController.index')
  Route.get('service_order_sub/:id', 'ServiceOrderSubController.show')
  Route.post('service_order_sub', 'ServiceOrderSubController.store')
  Route.put('service_order_sub/:id', 'ServiceOrderSubController.update')
  Route.delete('service_order_sub/:id', 'ServiceOrderSubController.delete')

  Route.get('os_sub', 'OsSubStatusController.index')
  Route.get('os_sub/:id', 'OsSubStatusController.show')
  Route.post('os_sub', 'OsSubStatusController.store')
  Route.put('os_sub/:id', 'OsSubStatusController.update')
  Route.delete('os_sub/:id', 'OsSubStatusController.destroy')
}).middleware('auth');
