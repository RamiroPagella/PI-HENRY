"use strict";

require("core-js/modules/es.object.from-entries.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
require("dotenv").config();
const {
  Sequelize
} = require("sequelize");
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST
} = process.env;
const sequelize = new Sequelize('postgres', DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  logging: false
});
const basename = path.basename(__filename);
const modelDefiners = [];
fs.readdirSync(path.join(__dirname, '/models')).filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js').forEach(file => {
  modelDefiners.push(require(path.join(__dirname, '/models', file)));
});
modelDefiners.forEach(model => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map(entry => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);
const {
  Country,
  Activity,
  User
} = sequelize.models;
Country.belongsToMany(Activity, {
  through: 'CountryXactivity',
  as: 'activities'
});
Activity.belongsToMany(Country, {
  through: 'CountryXactivity',
  as: 'countries'
});

////////////////////////////////////////
module.exports = _objectSpread(_objectSpread({}, sequelize.models), {}, {
  // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize // para importart la conexión { conn } = require('./db.js');
});