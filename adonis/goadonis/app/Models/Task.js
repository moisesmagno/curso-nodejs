'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {

  use () {
    // Uma tarefa pertence a um usuário.
    return this.belongsTo('App/Models/User')
  }

  project () {
    // Uma tarefa pertence a um Projeto.
    return this.belongsTo('App/Models/Project')
  }

  file () {
    // Uma tarefa pertence a um Arquivo
    return this.belongsTo('App/Models/File')
  }
}

module.exports = Task
