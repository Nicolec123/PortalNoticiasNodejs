const { body, validationResult } = require("express-validator")

module.exports = function (application) {
  application.get("/formulario_inclusao_noticia", function (req, res) {
    application.app.controllers.admin.formulario_inclusao_noticia(
      application,
      req,
      res
    ) // incorporando os controllers dentro da aplicacao
  })

  application.post(
    "/noticias/salvar",
    [
      body("titulo").notEmpty().withMessage("Põe o título jão"),
      body("resumo")
        .isLength({ min: 10, max: 100 })
        .withMessage("Põe o resumo com entre 10 e 100 caracteres"),
      body("autor").notEmpty().withMessage("Põe o autor jão"),
      body("data_noticia")
        .notEmpty()
        .isDate({ format: "YYYY-MM-DD" })
        .withMessage("Põe a data jão"),
      body("noticia").notEmpty().withMessage("Põe a notícia jão"),
    ],
    function (req, res) {
      application.app.controllers.admin.noticias_salvar(application, req, res)
    }
  )
}

// O ARQUIVO ADMIN.JS É RESPONSÁVEL POR CONFIGURAR AS ROTAS DA PÁGINA ADMINISTRATIVA
//logica na pasta controlles admin.js
