var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE customers (name VARCHAR(255), email VARCHAR(255), date DATE , timestamp TIME, timezone CHAR(2) )";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});