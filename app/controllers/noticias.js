module.exports.noticias = function (application,req,res) {
  var connection = application.config.dbConnection
  var noticiasModel = new application.app.models.NoticiasDAO(connection)

  noticiasModel.getNoticias(function (error, result) {
    res.render("noticias/noticias", { noticias: result })
  })
}

module.exports.noticia = function (application, req, res) {
  const connection = application.config.dbConnection // Conexão com o banco
  const noticiasModel = new application.app.models.NoticiasDAO(connection)

  const id_noticias = parseInt(req.query.id, 10) // Extrai o ID de `req.query`

  if (isNaN(id_noticias)) {
    return res.status(400).send("ID inválido.") // Validação do ID
  }

  console.log("ID recebido:", id_noticias)

  noticiasModel.getNoticia(id_noticias, function (error, result) {
    if (error) {
      console.error("Erro ao buscar notícia:", error)
      return res.status(500).send("Erro ao buscar notícia.")
    }

    if (result.length === 0) {
      return res.status(404).send("Notícia não encontrada.")
    }

    res.render("noticias/noticia", { noticia: result[0] })
  })
}
