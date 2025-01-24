module.exports = (app) => {
  app.get("/formulario_inclusao_noticias", (req, res) => {
    res.render("admin/form_add_noticia")
  })
}
