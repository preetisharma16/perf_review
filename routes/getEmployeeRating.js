var express = require('express');
var router = express.Router();
var mySQL = require('mysql');
var request = require('request');

var pool = mySQL.createPool({
  connectionLimit: 1000,
  host: 'employee-database.c1ty2hg1gwnk.us-west-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Techietribe',
});

//console.log("getEmployeeRating")
/* Function to view the ratings as employee */
function getEmployeeRating(req, res) {
  //   console.log('Inside getEmployeeRating');
  var employeeno = req.query.emp_no;
  console.log('employeeno:' + employeeno);
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    var sql =
      'select PunctualityAndDiscipline, ExecutionOfDuties, LearningAndDevelopment, TeamCooperation, ResponsibilityTaken from employees.emp_ratings where EmpNo = ' +
      employeeno;
    console.log(sql);
    connection.query(sql, function (err, result, fields) {
      connection.release();
      if (err) console.log('error' + err);
      else {
        console.log(typeof JSON.stringify(result));
        var index = 0;
        // console.log('employee rating' + result);
        Object.entries(result).forEach(([key, value]) =>
          console.log(key, value)
        );
        return res.status(200).json(result);
      }
    });
  });
}

router.get('/', getEmployeeRating);

module.exports = router;
