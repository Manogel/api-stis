'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
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

Route.resource('topics', 'TopicController').apiOnly().apiOnly().validator(new Map(
  [
    [
      ['topics.store'], ['Topic']
    ]
  ])
)

Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('passwords', 'ForgotPasswordController.store').validator(
  'ForgotPassword'
)
Route.put('passwords', 'ForgotPasswordController.update').validator(
  'ResetPassword'
)

Route.get('files/:name', 'FileController.show')

Route.group(() => {
  Route.post('files', 'FileController.store')
}).middleware(['auth'])
