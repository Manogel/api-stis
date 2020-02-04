'use strict'

const Antl = use('Antl')

class User {
  get messages () {
    return Antl.list('validation')
  }

  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required',
      birt_date: 'required',
      sex: 'boolean'
    }
  }
}

module.exports = User
