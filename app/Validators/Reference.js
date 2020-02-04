'use strict'

const Antl = use('Antl')

class Reference {
  get messages () {
    return Antl.list('validation')
  }

  get validateAll () {
    return true
  }

  get rules () {
    return {
      title: 'required',
      description: 'required'
    }
  }
}

module.exports = Reference
