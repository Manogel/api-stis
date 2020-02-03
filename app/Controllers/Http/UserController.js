'use strict'
const User = use('App/Models/User')
const stringWords = require('../../utils/StringWords')

class UserController {
  async index ({ request, response, view }) {
    const users = await User.query().orderBy('id', 'asc').fetch()
    return users
  }

  async store ({ request }) {
    const data = request.only(['name', 'birt_date', 'sex'])
    const user = await User.create(
      { ...data, name: stringWords(data.name) }
    )
    return user
  }

  async destroy ({ params, request, response }) {
    const user = await User.find(params.id)
    await user.delete()
    return true
  }
}

module.exports = UserController
