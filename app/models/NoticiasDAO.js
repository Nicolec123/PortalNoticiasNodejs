function NoticiasDAO(connection) {
  this._connection = connection
}

// Método para obter todas as notícias ordenadas por data de criação
NoticiasDAO.prototype.getNoticias = function (callback) {
  this._connection.query(
    "SELECT * FROM noticias ORDER BY data_criacao DESC",
    callback
  )
}

// Método para obter uma notícia específica, validando o ID
NoticiasDAO.prototype.getNoticia = function (id_noticias, callback) {
  // Verifica se o ID fornecido é válido
  if (!id_noticias || typeof id_noticias !== "number") {
    console.error("ID inválido fornecido para getNoticia:", id_noticias)
    return callback(new Error("ID inválido fornecido para buscar a notícia."))
  }

  console.log("Buscando notícia com ID:", id_noticias)
  this._connection.query(
    "SELECT * FROM noticias WHERE id_noticias = ?",
    [id_noticias],
    callback
  )
}

// Método para salvar uma notícia no banco de dados
NoticiasDAO.prototype.salvarNoticia = function (noticia, callback) {
  // Verifica se os dados fornecidos são válidos
  if (!noticia || typeof noticia !== "object") {
    console.error("Dados inválidos fornecidos para salvarNoticia:", noticia)
    return callback(
      new Error("Dados inválidos fornecidos para salvar a notícia.")
    )
  }

  this._connection.query("INSERT INTO noticias SET ?", noticia, callback)
}

// Método para obter as últimas 5 notícias
NoticiasDAO.prototype.getUltimasNoticias = function (callback) {
  this._connection.query(
    "SELECT * FROM noticias ORDER BY data_criacao DESC LIMIT 5",
    callback
  )
}

// Exporta a classe como um módulo para ser usado em outras partes da aplicação
module.exports = function () {
  return NoticiasDAO
}
