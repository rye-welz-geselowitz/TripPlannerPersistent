'use strict';

var hotelsPromise = $.get('/api/attractions/restaurants');
var restaurantsPromise = $.get('/api/attractions/hotels');
var activitiesPromise = $.get('/api/attractions/activities');

Promise.all([hotelsPromise,restaurantsPromise,activitiesPromise])
.then(function(result){
	//console.log(result);
	var hotelsArr=result[1];
	var restaurantsArr=result[0];
	var activitiesArr=result[2];
	optionsModule.fillSelectBar(hotelsArr, restaurantsArr, activitiesArr);
})
.catch( console.error.bind(console) )

// Fetch the attraction data
// Append it to the DOM as option elements for the correct select elements