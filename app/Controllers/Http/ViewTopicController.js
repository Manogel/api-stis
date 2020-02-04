'use strict'

const Topic = use('App/Models/Topic')

class ViewTopicController {
  async store ({ params }) {
    const topic = await Topic.findOrFail(params.id)

    topic.merge({ views: topic.views + 1 })

    await topic.save()
    await topic.reload()
    return topic
  }
}

module.exports = ViewTopicController
