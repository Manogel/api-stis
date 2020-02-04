'use strict'

const Route = use('Route')

Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('users', 'UserController.store').validator('User')

Route.get('files/:name', 'FileController.show')

Route.group(() => {
  Route.get('users', 'UserController.index')
  Route.delete('users/:id', 'UserController.destroy')

  Route.post('administrators', 'AdministratorController.store').validator('Administrator')
  Route.put('administrators/:id', 'AdministratorController.update')
  Route.delete('administrators/:id', 'AdministratorController.destroy')
  Route.get('administrators', 'AdministratorController.index')

  Route.resource('references', 'ReferenceController').apiOnly().validator(new Map(
    [
      [
        ['references.store'], ['Reference']
      ]
    ])
  )

  Route.resource('topics', 'TopicController').apiOnly().validator(new Map(
    [
      [
        ['topics.store'], ['Topic']
      ]
    ])
  )

  Route.post('files', 'FileController.store')
  Route.get('files', 'FileController.index')
  Route.put('files/:id', 'FileController.update')
  Route.delete('files/:id', 'FileController.destroy')

  Route.post('topics/:id/files', 'FileTopicController.store')
  Route.get('topics/:id/view', 'ViewTopicController.store')
}).middleware(['auth'])
