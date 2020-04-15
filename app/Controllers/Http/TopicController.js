
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Topic = use('App/Models/Topic')

/**
 * Resourceful controller for interacting with topics
 */
class TopicController {
  /**
   * Show a list of all topics.
   * GET topics
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const topics = await Topic.query().orderBy('id', 'asc').fetch()
    return topics
  }

  /**
   * Create/save a new topic.
   * POST topics
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const data = request.only([
      'title_br',
      'title_en',
      'introduction_br',
      'introduction_en',
      'description_br',
      'description_en',
      'sex'
    ])
    const { files } = request.only(['files'])
    const topic = await Topic.create({ ...data, author_id: auth.user.id })

    if (files) {
      await topic.files().createMany(files)
    }
    return topic
  }

  /**
   * Update topic details.
   * PUT or PATCH topics/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const { files = null, ...rest } = request.all()
    const topic = await Topic.find(params.id)

    topic.merge(rest)
    await topic.save()
    if (files) {
      await topic.files().createMany(files)
    }
    return topic
  }

  async show ({ params }) {
    const topic = await Topic.findOrFail(params.id)
    await topic.load('files')
    return topic
  }

  /**
   * Delete a topic with id.
   * DELETE topics/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const topic = await Topic.find(params.id)
    await topic.delete()
    return true
  }
}

module.exports = TopicController
