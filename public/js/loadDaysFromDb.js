'use strict';

var daysPromise = $.get('/api/days');

daysPromise.then(function(daysArr){
	console.log('in .then')
	console.log(daysArr);
	for(var i=0;i<daysArr.length;i++){
		console.log(daysArr[i]);
		daysModule.load(daysArr[i]);
	}
})
.catch( console.error.bind(console));

