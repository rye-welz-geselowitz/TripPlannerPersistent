'use strict';

var daysPromise = $.get('/api/days');

daysPromise.then(function(daysArr){
	for(var i=0;i<daysArr.length;i++){
		var thisDay=daysModule.load(daysArr[i].id);
		thisDay.id=daysArr[i].id;
		console.log('thisDay',daysArr[i].id);
		for(var j=0;j<daysArr[i].activities.length;j++){
			var newAttraction=attractionsModule.create(daysArr[i].activities[j]); //MAKE THEM SHOW ONLY FOR CORRECT DAY
			newAttraction.type='activity';
			thisDay.activities.push(newAttraction);
		}
		for(var j=0;j<daysArr[i].restaurants.length;j++){
			var newAttraction=attractionsModule.create(daysArr[i].restaurants[j]);
			newAttraction.type='restaurant';
			thisDay.restaurants.push(newAttraction);
		}
		if(daysArr[i].hotel){
			var newAttraction=attractionsModule.create(daysArr[i].hotel);
			newAttraction.type='hotel';
			thisDay.hotel=newAttraction;
		}
		if(thisDay.id===daysModule.getCurrentDay().id){
			thisDay.show();
		}
	}
})
.catch( console.error.bind(console));

//WHY IS THE ORDER OF MY DAYS CHANGING?!?!?!
