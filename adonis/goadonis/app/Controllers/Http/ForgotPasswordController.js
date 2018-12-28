'use strict'

const User = use('App/Models/User')
const Mail = use('Mail')

const crypto = require('crypto');

class ForgotPasswordController {

  async store ({ request, response}) {
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

}

module.exports = ForgotPasswordController
