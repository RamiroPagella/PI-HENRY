"use strict";

require("core-js/modules/es.promise.js");
const {
  User
} = require('../db');
const {
  Op
} = require('sequelize');
async function login(req, res) {
  try {
    const {
      email,
      password
    } = req.body;
    if (!email || !password) throw new Error("Faltan datos");
    const user = await User.findOne({
      where: {
        email: {
          [Op.eq]: email
        }
      }
    });
    if (!user) throw new Error("Usuario inexistente");
    const userPassword = user.getDataValue('password');
    if (userPassword === password) res.status(200).json({
      access: true
    });else res.status(400).json({
      acces: false
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
}
module.exports = login;