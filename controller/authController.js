const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const {secret} = require("../config");

const generateAccessToken = (id, roles) => {
  const playload = {
    id,
    roles
  }
  return jwt.sign(playload, secret, {expiresIn: "1h"}) //генерація токіна
}

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

      return res.status(200).redirect('/login')

    } catch (e){
      console.log('catch = ' + req.body)
      console.log(e)
      res.status(400).json({message: 'Реєстрація невдала'})
    }
  }

  async login(req, res){
    try {
      const {username, password} = req.body
      const user = await User.findOne({username})
      if (!user) {
        res.render('login', {message: `Користувач "${username}" не знайдений!`});
      }

      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(400).json({message: `Ви ввели неправильний пароль`})
      }

      const token = generateAccessToken(user._id, user.roles)

      return res.cookie("access_token", token, {
            user: user.username,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          }).cookie("user", user.username, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          }).status(200).redirect('/')

    } catch (e){
      console.log(e);
    }
  }

  async logout(req, res){
    try {
      return res.clearCookie("access_token").clearCookie("user").status(200).redirect('/login');
    } catch (e){
      console.log(e)
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