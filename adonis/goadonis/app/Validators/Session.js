'use strict'

const Antl = use('Antl')

class Session {
  // Valida todas as regras de vez. "IMPORTANTE"
  get validateAll () {
    return true
  }

  get rules () {
    return {
      email: "required|email",
      password: "required"
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Session
