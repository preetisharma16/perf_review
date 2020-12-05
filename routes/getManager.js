var express = require('express');
var router = express.Router();
var mySQL = require('mysql');

var pool = mySQL.createPool({
    connectionLimit: 1000,
    host: "employee-database.c1ty2hg1gwnk.us-west-1.rds.amazonaws.com",
    user: "admin",
    password: "Techietribe"
});
const AWS = require('aws-sdk');
//console.log("getmanager")

/* function to check if the user is employee or manager*/
function getManager(req, res,next) {
    console.log("Inside getManager ")
    var employeeno = req.body.emp_no;
    //console.log("Employee no is " +employeeno)
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query("select * from `employees`.dept_manager where emp_no = " + employeeno,
            function (err, result, fields) {
                console.log("result length is " + result.length)
                if (result.length > 0) {
                    return res.status(200).json(result);
                } else {
                    var sql =
                        'select PunctualityAndDiscipline, ExecutionOfDuties, LearningAndDevelopment, TeamCooperation, ResponsibilityTaken from employees.emp_ratings where EmpNo = ' +
                        employeeno;
                    //console.log(sql);
                    connection.query(sql, function (err, result, fields) {
                        connection.release();
                        if (err) console.log('error' + err);
                        else {
                           // console.log(typeof JSON.stringify(result));
                           // var index = 0;
                            // console.log('employee rating' + result);
                            // Object.entries(result).forEach(([key, value]) =>
                            //     //console.log(key, value)
                            // );
                            return res.status(200).json(result);
                        }

                    })
                }
            })

    })
}


router.post('/', getManager);
module.exports = router;
module.exports.getManager = getManager;
