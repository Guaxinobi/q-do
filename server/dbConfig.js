const mysql = require("mysql");

var Connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "qdo",
});

module.exports = Connection;
