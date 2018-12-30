'use strict'

const Antl = use('Antl')

class Task {
  // Valida todas as regras de vez. "IMPORTANTE"
  get validateAll () {
    return true
  }

  get rules () {
    return {
      title: 'required',
      due_date: 'date'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Task
