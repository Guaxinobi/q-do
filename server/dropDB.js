const Connection = require("./dbConfig");

var con = Connection;
con.connect(function (err) {
  if (err) return console.log(err);
  console.log("Connected!");
  var sql = "DROP DATABASE qdo";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("DB deleted");
    con.end();
  });
});
