var router = require('express').Router();
var Promise = require('bluebird');
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');
var Day=require('../../models/day');

// router.get('/:id', function (req, res, next) {
// 	console.log('getting specific day');
// 	next();
// });

router.get('/', function (req, res, next) {
	Day.findAll()
	.then(function(result){
		res.json(result);
	})
	.catch(next);
});

router.put('/:id', function (req, res, next) {
	Day.findById(req.params.id)
	.then(function (day) {
		day.destroy();
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
	console.log('adding a new restaurant');
	next();
});

router.post('/:id/hotels', function (req, res, next) {
	console.log('adding a new hotel');
	next();
});

router.post('/:id/activities', function (req, res, next) {
	console.log('adding a new activity');
	next();
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