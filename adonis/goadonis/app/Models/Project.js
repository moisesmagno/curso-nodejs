'use strict'

const Model = use('Model')

class Project extends Model {

  user () {
    // Um projeto pertence a um usuário.
    return this.belongsTo('App/Models/User')
  }

  tasks () {
    // Um projeto pode ter várias tarefas.
    return this.hasMany('App/Models/Task')
  }


}

module.exports = Project
