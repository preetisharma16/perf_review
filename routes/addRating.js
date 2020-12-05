var express = require('express');
var router = express.Router();
var mySQL = require('mysql');

var pool = mySQL.createPool({
  connectionLimit: 1000,
  host: 'employee-database.c1ty2hg1gwnk.us-west-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Techietribe',
});
const AWS = require('aws-sdk');
//console.log("Add Ratings")

function addRating(req, res) {
  console.log('Inside addRatings ');

  var emp_no = req.query.employeeno;
  var metric1 = req.query.metric1;
  var metric2 = req.query.metric2;
  var metric3 = req.query.metric3;
  var metric4 = req.query.metric4;
  var metric5 = req.query.metric5;
  console.log('employeeno: ' + emp_no);
  console.log('metric1: ' + metric1);
  console.log('metric2: ' + metric2);
  console.log('metric3: ' + metric3);
  console.log('metric4: ' + metric4);
  console.log('metric5: ' + metric5);

  /*console.log(req.body.data)
    let formdata = JSON.parse(req.body.data);

    var employeeno = req.body.emp_no;
    console.log("Employee no is " +employeeno)

    var metricValues = {
        empno: formdata[emp_no],
        PunctualityAndDiscipline: formdata[metrci1],
        ExecutionOfDuties: formdata[metrci1],
        LearningAndDevelopment: formdata[metrci1],
        TeamCooperation: formdata[metrci1],
        ResponsibilityTaken: formdata[metrci1],

    }
    console.log("metrics are " + metricValues)*/

  pool.getConnection(function (err, connection) {
    if (err) throw err;
    console.log('Insert into RDS');
    //var sql = "Insert into `employees`.emp_ratings values ? " [metricValues];
    // connection.query("Insert into `employees`.emp_ratings values ?" [metricValues],
    connection.query(
      'INSERT INTO `employees`.emp_ratings(EmpNo,PunctualityAndDiscipline,ExecutionOfDuties,LearningAndDevelopment,TeamCooperation,ResponsibilityTaken) values (?,?,?,?,?,?)',
      [emp_no, metric1, metric2, metric3, metric4, metric5],

      function (err, result) {
        connection.release();
        if (err) {
          console.log('Error inserting records in table' + err);
          return res.status(500).send('failed to save ratings !!');
        } else {
          console.log('Row inserted');
          return res.status(200).send('rating saved successfully');
        }
      }
    );
  });
}

router.post('/', addRating);
module.exports = router;
module.exports.addRating = addRating;
