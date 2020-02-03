'use strict'
const Antl = use('Antl')

class Administrator {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      username: 'required',
      email: 'required|email|unique:administrators',
      password: 'required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Administrator
