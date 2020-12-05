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

//console.log("Update Ratings")
/* Function to update rating */
function updateRating(req, res) {
  //console.log("Inside updateRating");

  var metric1 = req.query.metric1;
  console.log(metric1);

  var metric2 = req.query.metric2;
  console.log(metric2);

  var metric3 = req.query.metric3;
  console.log(metric3);

  var metric4 = req.query.metric4;
  console.log(metric4);

  var metric5 = req.query.metric5;
  console.log(metric5);

  var empno = req.query.emp_no;
  console.log(empno);

  pool.getConnection(function (err, connection) {
    if (err) throw err;
    console.log('Update Row in RDS');
    // var sql = "UPDATE `employees`.emp_ratings SET PunctualityAndDiscipline= ? ,ExecutionOfDuties=? ,LearningAndDevelopment = ? ,TeamCooperation = ?,ResponsibilityTaken = ? WHERE emp_no =? ", [metric1,metric2,metric3,metric4,metric5,empno],
    connection.query(
      'UPDATE `employees`.emp_ratings SET PunctualityAndDiscipline= ? ,ExecutionOfDuties=? ,LearningAndDevelopment = ? ,TeamCooperation = ?,ResponsibilityTaken = ? WHERE EmpNo =? ',
      [metric1, metric2, metric3, metric4, metric5, empno],
      function (err, result) {
        connection.release();
        if (err) {
          console.log('Error updating ratings in table' + err);
          return res.status(500).send('failed to update ratings !!');
        } else {
          console.log('Ratings updated');
          return res.status(200).send('Updated rating saved successfully');
        }
      }
    );
  });
}

router.post('/', updateRating);
module.exports = router;
module.exports.updateRating = updateRating;
