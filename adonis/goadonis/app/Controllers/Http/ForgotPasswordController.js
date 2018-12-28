'use strict'

const User = use('App/Models/User')
const Mail = use('Mail')

const crypto = require('crypto')
const moment = require('moment')

class ForgotPasswordController {

  async store({ request, response}) {
    try {
      const email = request.input('email')
      const user = await User.findByOrFail('email', email)

      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      await user.save()

      // Enviando a E-mail
      await Mail.send(
        ['emails.forgot_password'],
        {
          email,
          token: user.token,
          link: `${request.input('redirect_url')}?token=${user.token}`
        },
        (message) => {
          message
          .to(user.email)
          .from('contato@adonis.com')
          .subject('Recuperação de Senha')
        }
      )

      return response.status(200).json({status: "Solicitação enviada!"})

    } catch (error) {
      return response.status(err.status).send({error: {message: "Algo não deu certo, esse E-mail existe?"}})
    }
  }

  async update({request, response}) {
    try {
      const { token, password } = request.all()

      const user = await User.findByOrFail('token', token)

      const tokenExpired = moment().subtract('2', 'days').isAfter(user.token_created_at)

      if(tokenExpired) {
        return response.status(401).send({error: {message: 'O token já expirou, pois passou dos dois dias de validade. Por favor solicite a alteração da senha novamente.'}})
      }

      user.token = null
      user.token_created_at = null
      user.password = password

      await user.save()

      return response.status(200).send({status: 'Senha alterada com sucesso!'})

    } catch (error) {
      return response.status(error.status).send({error: {message: 'Algo deu errado ao alterar a senha.'}})
    }
  }

}

module.exports = ForgotPasswordController
