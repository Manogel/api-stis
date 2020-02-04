'use strict'

const File = use('App/Models/File')
const Helpers = use('Helpers')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with files
 */
class FileController {
  async show ({ params, response }) {
    try {
      // const file = await File.findOrFail('file', params.id)
      response.download(Helpers.tmpPath(`uploads/${params.name}`))
      // return file
    } catch (e) {
      response.status(e.status).send({ error: 'File is not exists!' })
    }
  }

  async index () {
    const files = await File.all()
    return files
  }

  async store ({ request, response, auth }) {
    try {
      if (!request.file('file')) return

      const upload = request.file('file', { size: '10mb' })
      const fileNameHash = `${Date.now()}.${upload.subtype}`
      await upload.move(Helpers.tmpPath('uploads'), { name: fileNameHash })

      if (!upload.moved()) {
        throw upload.error()
      }

      const { description, reference, topic_id } = request.all()

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

  async update ({ request, response, params }) {
    const { id } = params
    const data = request.all()

    try {
      const file = await File.find(id)

      var fileSaved = file.file
      var fileNameSaved = file.name

      if (request.file('file')) {
        const upload = request.file('file', { size: '10mb' })
        fileSaved = `${Date.now()}.${upload.subtype}`
        await upload.move(Helpers.tmpPath('uploads'), { name: fileSaved })
        if (!upload.moved()) {
          throw upload.error()
        }
        fileNameSaved = upload.clientName
      }

      file.merge({ ...data, name: fileNameSaved, file: fileSaved })
      await file.save()

      return file
    } catch (e) {
      return response.status(e.status).send({ error: 'Upload error!' })
    }
  }

  async destroy ({ params }) {
    const file = await File.find(params.id)
    await file.delete()
    return true
  }
}

module.exports = FileController
