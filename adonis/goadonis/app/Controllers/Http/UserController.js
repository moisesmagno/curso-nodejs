'use strict'

const User = use('App/Models/User');

class UserController {

    async store({ request }) {
      const data = request.only(['username', 'email', 'password'])

      const user = await User.createe(data)

      return user
    }
}

module.exports = UserController
