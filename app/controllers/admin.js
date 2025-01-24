const { validationResult } = require("express-validator")

module.exports.formulario_inclusao_noticia = function (application, req, res) {
  console.log("Rota para formulario de inclusao de noticia")
  res.render("../views/admin/form_add_noticia.ejs", {
    validacao: {},
    noticia: {},
  })
}

module.exports.noticias_salvar = function (application, req, res) {
  const errors = validationResult(req)
  const noticia = req.body
  if (!errors.isEmpty()) {
    res.render("../views/admin/form_add_noticia.ejs", {
      validacao: errors.array(), // Corrigir para `errors.array()`
      noticia: noticia,
    })
    return
  }
  const connection = application.config.dbConnection
  const noticiasModel = new application.app.models.NoticiasDAO(connection)
  noticiasModel.salvarNoticia(noticia, function (error, result) {
    if (error) {
      console.error(error)
      return res.status(500).send("Erro ao salvar notícia")
    }
    res.redirect("/noticias")
  })
}
