var mysql = require('mysql');

var connectMYSQL = function() {
  if (!process.env.NODE_ENV) {
    return mysql.createConnection({
      host : 'localhost',
      user : 'root',
      password : '46531145',
      database : 'casadocodigo_nodejs'
    });
  }

  if (process.env.NODE_ENV == 'test') {
    return mysql.createConnection({
      host : 'localhost',
      user : 'root',
      password : '46531145',
      database : 'casadocodigo_nodejs_test'
    });
  }
}

// Wrapper
module.exports = function() {
  return connectMYSQL;
}
