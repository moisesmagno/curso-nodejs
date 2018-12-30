'use strict'

const Antl = use('Antl')

class ResetPassword {
  // Valida todas as regras de vez. "IMPORTANTE"
  get validateAll () {
    return true
  }

  get rules () {
    return {
      token: 'required',
      password: 'required|confirmed'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = ResetPassword
