const User = require('../models/User')
const Role = require('../models/Role')

class authController {
  async registration(req, res){
    try {

    } catch (e){

    }
  }

  async login(req, res){
    try {

    } catch (e){

    }
  }

  async getUsers(req, res){
    try {
      const userRole = new Role()
      const adminRole = new Role({value: "ADMIN"})
      await userRole.save()
      await adminRole.save()
      res.json("Сервер працює")
    } catch (e){

    }
  }
}

module.exports = new authController()