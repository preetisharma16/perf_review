function checkManager( empID, reset = true) {
    console.log("inside priti");
    const fetchURL = 'http://localhost:3000/getManager';

const deptID = {
      emp_no: empID,
    };

fetch(fetchURL, {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      body: JSON.stringify(deptID),
      headers: {
        'content-type': 'application/json',
      },
    })
.then(response => response.json())
    .then(result => {
      console.log(result.statuses);
      console.log(result);
      	if (result.length == 1) {
		console.log(result);
        console.log(result[0].dept_no);
        url = 'http\://localhost:3000/managerHome.html?deptID=' + result[0].dept_no;
        document.location.href = url;
	} else {
            //url = 'http\://localhost:3000/getEmpChart/'+ empID;
            url = 'http\://localhost:3000/employeeHome.html?empID=' + empID;
		document.location.href = url;
     	}
});
}