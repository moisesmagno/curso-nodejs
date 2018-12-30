'use strict'

const Antl = use('Antl')

class ForgotPassword {
  // Valida todas as regras de vez. "IMPORTANTE"
  get validateAll () {
    return true
  }

  get rules () {
    return {
      email: 'required|email',
      redirect_url: 'required|url'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = ForgotPassword
