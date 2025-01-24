module.exports = function (app) {
  app.get("/noticia/:id", function (req, res) {
    const id_noticias = parseInt(req.params.id, 10) // Extrai e converte o ID da URL

    if (isNaN(id_noticias)) {
      return res.status(400).send("ID inválido.") // Validação do ID
    }

    const connection = app.config.dbConnection // Conexão com o banco
    const noticiasModel = new app.app.models.NoticiasDAO(connection)

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
  })
}
