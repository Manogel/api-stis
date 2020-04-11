/* eslint-disable camelcase */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const moment = require('moment')
const stringWords = require('../utils/StringWords')

class User extends Model {
  static get computed () {
    return ['genre', 'age']
  }

  static get hidden () {
    return ['created_at', 'updated_at']
  }

  getBirtDate (birt_date) {
    return moment(birt_date).format('DD/MM/YYYY')
  }

  getGenre ({ sex }) {
    return sex ? 'Masculino' : 'Feminino'
  }

  getAge ({ birt_date }) {
    const d = new Date()
    const date_birt = new Date(
      moment(birt_date, 'DD/MM/YYYY').format('YYYY-MM-DD')
    )
    const ano_atual = d.getFullYear()
    const mes_atual = d.getMonth() + 1
    const dia_atual = d.getDate()

    const moth_birth = date_birt.getMonth() + 1
    const day_birth = date_birt.getDate() + 1

    let age = ano_atual - date_birt.getFullYear()

    if (
      mes_atual < moth_birth ||
      (mes_atual == moth_birth && dia_atual < day_birth)
    ) {
      age--
    }

    return age < 0 ? 0 : age
  }

  setName (name) {
    return stringWords(name)
  }

  setBirtDate (birt_date) {
    return moment(birt_date, 'DD/MM/YYYY').format('YYYY-MM-DD')
  }
}

module.exports = User
