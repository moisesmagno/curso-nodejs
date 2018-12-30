'use strict'

const Model = use('Model')

class Task extends Model {

  static boot () {
    super.boot()

    this.addHook('afterCreate', 'TaskHook.sendNewTaskMail')
    this.addHook('afterUpdate', 'TaskHook.sendNewTaskMail')
  }

  user () {
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
