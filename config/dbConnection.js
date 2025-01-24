var mysql = require("mysql")


var connMySQL = function(){

  return (connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    port: "3306",
    database: "portal_noticias",
  }))

}
module.exports = function(){
  return connMySQL()
}