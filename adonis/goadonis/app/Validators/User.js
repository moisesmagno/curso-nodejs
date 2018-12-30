'use strict'

const Antl = use('Antl')

class User {

  // Valida todas as regras de vez. "IMPORTANTE"
  get validateAll () {
    return true
  }

  get rules () {
    return {
      username: "required|unique:users",
      email: "required|email|unique:users",
      password: "required|confirmed"
    }
  }

  get messages () {
    return Antl.list('validation')
  }

}

module.exports = User
