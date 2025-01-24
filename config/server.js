var express = require("express")
var consign = require("consign")
var bodyParser = require("body-parser")
var { body, validationResult } = require("express-validator")
var path = require("path") //  dirname

var app = express()
app.set("view engine", "ejs")
app.set("views", "./app/views")

// Usando body-parser para tratar dados enviados via formulários em json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "../app/public"))); // Usando o módulo path para configurar pasta pública
// Incluindo as rotas com o consign
consign()
  .include("./app/routes")
  .then("./config/dbConnection.js")
  .then("./app/models")
  .then("./app/controllers")
  .into(app)

module.exports = app
