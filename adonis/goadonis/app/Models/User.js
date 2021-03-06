'use strict'

const Model = use('Model')

const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  addresses () {
    return this.hasMany('App/Models/UserAddress')
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }

  projects () {
    // Um Usuário pode ter vários Projetos.
    return this.hasMany('App/Models/Project')
  }

  tasks () {
    // Um Usuário pode ter várias tarefas.
    return this.hasMany('App/Models/Task');
  }
}

module.exports = User
