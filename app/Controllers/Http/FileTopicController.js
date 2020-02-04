'use strict'

const File = use('App/Models/File')
const Helpers = use('Helpers')

class FileTopicController {
  async store ({ request, response, params }) {
    try {
      if (!request.file('file')) return

      const upload = request.file('file', { size: '10mb' })
      const fileNameHash = `${Date.now()}.${upload.subtype}`
      await upload.move(Helpers.tmpPath('uploads'), { name: fileNameHash })

      if (!upload.moved()) {
        throw upload.error()
      }

      const { id: topic_id } = params
      const { description, reference } = request.all()

      const file = await File.create({
        file: fileNameHash,
        name: upload.clientName,
        description,
        reference,
        topic_id
      })

      return file
    } catch (e) {
      return response.status(e.status).send({ error: 'Upload error!' })
    }
  }
}

module.exports = FileTopicController
