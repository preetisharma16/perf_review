var express = require('express');
var router = express.Router();
var mySQL = require('mysql');

var pool = mySQL.createPool({
    connectionLimit: 1000,
    host: "employee-database.c1ty2hg1gwnk.us-west-1.rds.amazonaws.com",
    user: "admin",
    password: "Techietribe"
});

/* get all the employees under a manager with same dept no*/
function getEmployees(req, res) {
    console.log("Inside getEmployees ")
    var departno = req.body.dept_no;
    console.log("Depart no is " +departno)
    pool.getConnection(function (err, connection) {
            if (err) throw err;
            //connection.query("select employees.emp_no, employees.first_name,employees.last_name, employees.hire_date from `employees`.employees join `employees`.dept_emp on `employees`.employees.emp_no = `employees`.dept_emp.emp_no where `employees`.dept_emp.dept_no= '" + departno +"'",
            connection.query("select employees.emp_no, employees.first_name, employees.last_name, employees.hire_date  from `employees`.employees join `employees`.dept_manager on `employees`.employees.emp_no = `employees`.dept_manager.emp_no where `employees`.dept_manager.dept_no= '" + departno +"'",         
                function (err, result, fields) {
                    connection.release();
                    if (err) console.log("error" + err)
                    else {
                        //console.log("employee data" + result);
                        return res.status(200).json(result);
                    }

                }
            )
        }
    )
}

router.post("/", getEmployees)
module.exports = router;
module.exports.getEmployees = getEmployees
