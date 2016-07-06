var router = require('express').Router();
var Promise = require('bluebird');
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');
var Day=require('../../models/day');
var db = require('../../models');

// router.get('/:id', function (req, res, next) {
// 	console.log('getting specific day');
// 	next();
// });

router.get('/', function (req, res, next) {
	Day.findAll({
		include: [Hotel,Restaurant,Activity],
		order: [
    		['number', 'ASC']
    	]
	})
	.then(function(result){
		res.json(result);
	})
	.catch(next);
});

router.post('/:id', function (req, res, next) {
	Day.findById(Number(req.params.id))
	.then(function (day) {
		if(day){ //get rid of check?
			day.destroy();
		}
		res.end();
	})
	.catch(next);
});

router.post('/', function (req, res, next) {
	Day.findAll()
	.then(function (dayArr) {
		var newDayNumber = dayArr.length + 1;
		return Day.create({
			number: newDayNumber
		})
	})
	.then(function(result){
		res.json(result);
	})
	.catch(next);
});

router.post('/:id/restaurants', function (req, res, next) {
	var currentDayPromise=Day.findById(req.body.dayId);
	var attractionToAdd=Restaurant.findById(req.params.id);
	Promise.all([currentDayPromise,attractionToAdd])
	.spread(function(day,attraction){
		day.addRestaurant(attraction);
	})
	.then(db.sync())
	.catch(next);

});

router.post('/:id/hotels', function (req, res, next) {
	currentDayPromise=Day.findById(req.body.dayId);
	attractionToAdd=Hotel.findById(req.params.id);
	Promise.all([currentDayPromise,attractionToAdd])
	.spread(function(day,attraction){
		day.setHotel(attraction);
	})
	.then(db.sync())
	.catch(next);
});

router.post('/:id/activities', function (req, res, next) {
	currentDayPromise=Day.findById(req.body.dayId);
	attractionToAdd=Activity.findById(req.params.id);
	Promise.all([currentDayPromise,attractionToAdd])
	.spread(function(day,attraction){
		day.addActivity(attraction);
	})
	.then(db.sync())
	.catch(next);

});


router.post('/:id/restaurants/delete', function (req, res, next) {
	console.log('deleting a restaurant on day id '+req.body.dayId);
	var currentDayPromise=Day.findById(req.body.dayId);
	var attractionToDelete=Restaurant.findById(req.params.id);
	Promise.all([currentDayPromise,attractionToDelete])
	.spread(function(day,attraction){
		day.removeRestaurant(attraction);
	})
	.then(db.sync())
	.catch(next);
});
router.post('/:id/hotels/delete', function (req, res, next) {
	console.log('deleting a hotel on day id '+req.body.dayId);
	var currentDayPromise=Day.findById(req.body.dayId);
	var attractionToDelete=Hotel.findById(req.params.id);
	Promise.all([currentDayPromise,attractionToDelete])
	.spread(function(day,attraction){
		day.setHotel(null);
	})
	.then(db.sync())
	.catch(next);
});
router.post('/:id/activities/delete', function (req, res, next) {
	console.log('deleting activity on day id '+req.body.dayId);
	var currentDayPromise=Day.findById(req.body.dayId);
	var attractionToDelete=Activity.findById(req.params.id);
	Promise.all([currentDayPromise,attractionToDelete])
	.spread(function(day,attraction){
		day.removeActivity(attraction);
	})
	.then(db.sync())
	.catch(next);
});

// router.get('/hotels', function(req, res, next) {
// 	Hotel.findAll()
// 	.then(function(hotels){
// 		res.json(hotels);
// 	})
// 	.catch(next);
// });

module.exports=router;

// get a list of all the days, get one specific day, delete one specific day, and create a new day.

// For each attraction type on a specific day, you'll need to be able to add and remove an attraction from that day (for example, POST /api/days/:id/restaurants).