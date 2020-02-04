'use strict'
const Reference = use('App/Models/Reference')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with references
 */
class ReferenceController {
  /**
   * Show a list of all references.
   * GET references
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const references = await Reference.query().orderBy('id', 'asc').fetch()
    return references
  }

  /**
   * Create/save a new reference.
   * POST references
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(['title', 'description'])
    const reference = await Reference.create(data)
    return reference
  }

  /**
   * Update reference details.
   * PUT or PATCH references/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const reference = await Reference.find(params.id)
    const data = request.all()

    reference.merge(data)
    await reference.save()

    return reference
  }

  /**
   * Delete a reference with id.
   * DELETE references/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const reference = await Reference.find(params.id)
    await reference.delete()
    return true
  }
}

module.exports = ReferenceController
