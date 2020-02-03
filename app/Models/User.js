
/* eslint-disable camelcase */
'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static get computed () {
    return ['genre', 'age']
  }

  getGenre ({ sex }) {
    return sex ? 'Masculino' : 'Feminino'
  }

  getAge ({ birt_date }) {
    var d = new Date()
    var date_birt = new Date(birt_date)
    var ano_atual = d.getFullYear()
    var mes_atual = d.getMonth() + 1
    var dia_atual = d.getDate()

    var moth_birth = date_birt.getMonth() + 1
    var day_birth = date_birt.getDate() + 1

    var age = ano_atual - date_birt.getFullYear()

    if (mes_atual < moth_birth || mes_atual == moth_birth && dia_atual < day_birth) {
      age--
    }

    return age < 0 ? 0 : age
  }
}

module.exports = User
