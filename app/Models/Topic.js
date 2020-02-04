'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Topic extends Model {
  files () {
    return this.hasMany('App/Models/File')
  }

  static get hidden () {
    return ['created_at', 'updated_at']
  }
}

module.exports = Topic
