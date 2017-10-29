var express = require('express');
var app = express();
var ejs = require('ejs');
var mysql = require('mysql');
var bodyParser   =  require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var HOST = 'localhost';
var PORT = 3306
var MYSQL_USER = 'root';
var MYSQL_PASS = '123456';
var DATABASE = 'mydb';
var TABLE = DATABASE+".customers";
var table = "customers."

var mysql = mysql.createConnection({
host: HOST,
port: PORT,
user: MYSQL_USER,
password: MYSQL_PASS,
});
app.get('/object',function(req,res,next){
res.sendFile('C:/Users/nodejs/views/forms.html');
});
app.post('/mykey', function(req, res) {
console.log('req.body');
var myJSON = '{ "name":"' + req.body.name+'", "email":"' + req.body.email+'", "date":"' + req.body.date+'", "time":"' + req.body.time+'", "am_pm":"' + req.body.am_pm+'" }';
console.log(myJSON)
var myObj = JSON.parse(myJSON);
console.log(myObj);
res.write('You sent the name "' + myObj.name+'".\n');
res.write('You sent the Email "' + myObj.email+'".\n');
res.write('You sent the Date "' + myObj.date+'".\n');
res.write('You sent the Time "' + myObj.time+'".\n'  + myObj.am_pm+'".\n');
res.end()

mysql.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sel = "SELECT COUNT(*) as count FROM "+TABLE+" WHERE "+table+"name = '"+myObj.name+"'";
  console.log(sel);
  mysql.query(sel,function(err,rows,field)
  { 
  if (err) throw error;
  var mycount = rows[0].count
  console.log(mycount);
  if (mycount < "1" ) {
  var sql ="Insert into "+TABLE+" (name,email,date,timestamp,timezone) VALUES ('"+myObj.name+"','"+myObj.email+"','"+myObj.date+"','"+myObj.time+"', '"+myObj.am_pm+"')";
  console.log(sql);
  mysql.query(sql,function(err, result)      
  {                                                      
  if (err) throw err;
  });
  }
  else {                                           
  var upd2 = "UPDATE "+TABLE+" SET "+table+"date='"+myObj.date+"', "+table+"timestamp='"+myObj.time+"', "+table+"timezone='"+myObj.am_pm+"' where "+table+"name='"+myObj.name+"'";
  console.log(upd2);     
  mysql.query(upd2,function(err, result)
  {
  if (err) throw err;
  });
  }
  });   
    });
});
app.listen(3000);
console.log('Example app listening at port:3000');