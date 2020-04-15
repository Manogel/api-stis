const Antl = use('Antl')

class Topic {
  get messages () {
    return Antl.list('validation')
  }

  get validateAll () {
    return true
  }

  get rules () {
    return {
      title_br: 'required',
      description_br: 'required',
      introduction_br: 'required'
    }
  }
}

module.exports = Topic
