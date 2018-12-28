'use strict'

const File = use('App/Models/File')
const Helpers = use('Helpers')

class FileController {

  async show ({ response, params }) {
    try {

      const file = await File.findOrFail(params.id)

      return response.download(Helpers.tmpPath(`upload/${file.file}`))

    } catch (err) {
      return response.status(err.status).send({error: {message: 'Arquivo não encontrado.'}})
    }
  }

  /**
   * Create/save a new file.
   * POST files
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {

      if(!request.file('file')) return

      // Movendo o arquivo para pasta upload
      const upload = request.file('file', {size: '10mb'})

      const fileName = `${Date.now()}.${upload.subtype}`

      await upload.move(Helpers.tmpPath('upload'), {name: fileName})

      if(!upload.moved()){
        throw upload.error()
      }

      // Guardando os dados do arquivo.
      const file = await File.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      })

      return file

    } catch (error) {
      return response.status(error.status).send({error: {message: 'Erro no upload do arquivo!'}})
    }
  }

}

module.exports = FileController
