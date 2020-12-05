
window.onload = function () {
    /*var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
         tmp = params[i].split('=');
         data[tmp[0]] = tmp[1];
    }
    listAllEmployees(data.deptID);
    */
   //var dept_id = $("#accesstoken").val();
   var dept_id = 'd003';
   listAllEmployees(dept_id)
}


function listAllEmployees( deptNo, reset = true) {
    console.log("inside priti");
    const fetchURL = 'http://localhost:3000/getEmployees';

const deptID = {
      dept_no: deptNo,
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
      result.forEach(status => {
		console.log(status);
		var newRow = $("<tr>");
                var cols = "";
                cols += '<td> '+ status.first_name +'</td>';
                cols += '<td> '+ status.last_name +'</td>';
                cols += '<td> '+ status.hire_date +'</td>';
                cols += '<td> '+ '<input type=\"button\" value=\"Rate Employee\" id=\'rate-button\' onClick=\'rateMe()\'/>' +'</td>';
                cols += '<td> '+ '<input type=\"button\" value=\"Update Rating\" id=\'update-button\' onClick=\'updateRating()\'/>' +'</td>';
                newRow.append(cols);
                $('#empData  .tbody').append(newRow);

});
});
}

function rateMe() {
	url = 'http://localhost:3000/rate.html';
	document.location.href = url;
}
function updateRating() {
	url = 'http://localhost:3000/updaterate.html';
	document.location.href = url;
}










