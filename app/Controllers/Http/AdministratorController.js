'use strict'
const Administrator = use('App/Models/Administrator')

class AdministratorController {
  /**
   * Show a list of all administrators.
   * GET administrators
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const administrators = await Administrator.query().orderBy('id', 'asc').fetch()
    return administrators
  }

  /**
   * Create/save a new administrator.
   * POST administrators
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const { username, email, password } = request.all()
    const administrator = await Administrator.create({
      username,
      email,
      password
    })
    return administrator
  }

  /**
   * Display a single administrator.
   * GET administrators/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing administrator.
   * GET administrators/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update administrator details.
   * PUT or PATCH administrators/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const administrator = await Administrator.find(params.id)
    const data = request.all()

    administrator.merge(data)
    await administrator.save()

    return administrator
  }

  /**
   * Delete a administrator with id.
   * DELETE administrators/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const administrator = await Administrator.find(params.id)
    await administrator.delete()
    return true
  }
}

module.exports = AdministratorController
