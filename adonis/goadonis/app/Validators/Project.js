'use strict'

const Antl = use('Antl')

class Project {
  // Valida todas as regras de vez. "IMPORTANTE"
  get validateAll () {
    return true
  }

  get rules () {
    return {
      title: 'required',
      description: 'required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Project
