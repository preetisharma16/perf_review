var express = require('express');
var router = express.Router();
var mySQL = require('mysql');

var pool = mySQL.createPool({
    connectionLimit: 1000,
    host: "employee-database.c1ty2hg1gwnk.us-west-1.rds.amazonaws.com",
    user: "admin",
    password: "Techietribe"
});

var verifyUser = function (req, res, next) {
    console.log("entered verify user function")
    console.log(req.userContext)
    if(!req.userContext){
        return res.render('login', { title: 'Express' })
    }
    console.log(req.userContext);
    
    var email = req.userContext.userinfo.preferred_username;
    console.log(email);
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query("select * from `employees`.emp_email where email = '" + email + "'",
            function (err, result, fields) {
                console.log("req.body.logged_emp_no");
                console.log(req.body.logged_emp_no);
                req.body.logged_emp_no = result[0]['emp_no'];
                req.body.logged_dept_no = result[0]['dept_no'];
                console.log(req.body.logged_emp_no);
                //console.log("result is " + JSON.stringify(result)) 
                next();
            })
    })
   
  }

  module.exports = verifyUser;
  