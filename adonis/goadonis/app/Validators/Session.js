'use strict'

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
}

module.exports = Session
