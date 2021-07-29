const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')

class authController {
  async registration(req, res){
    try {
      const errors = validationResult(req)

      if(!errors.isEmpty()){
        return res.status(400).json({message: 'Помилка при реєстрації', errors})
      }

      const {username, password} = req.body
      const candidate = await User.findOne({username})

      if (candidate) {
        return res.status(400).json({message: 'Такий користувач вже є зарестрований'})
      }

      const hashPassword = bcrypt.hashSync(password, 7)
      const userRole = await Role.findOne({value: "USER"})
      const user = new User({username, password: hashPassword, role: [userRole.value]})
      await user.save()
      return res.json({message: 'Користувач зареєстрований!'})

    } catch (e){
      console.log(req.body)
      console.log(e)
      res.status(400).json({message: 'Регістрація невдала'})
    }
  }

  async login(req, res){
    try {

    } catch (e){

    }
  }

  async getUsers(req, res){
    try {
      // const userRole = new Role()
      // const adminRole = new Role({value: "ADMIN"})
      // await userRole.save()
      // await adminRole.save()
      res.json("Сервер працює")
    } catch (e){

    }
  }
}

module.exports = new authController()