var router = require('express').Router();
var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');


router.get('/hotels', function(req, res, next) {
	Hotel.findAll()
	.then(function(hotels){
		res.json(hotels);
	})
	.catch(next);
});

router.get('/restaurants', function(req, res, next) {
	Restaurant.findAll()
	.then(function(restaurants){
		res.json(restaurants);
	})
	.catch(next);
});

router.get('/activities', function(req, res, next) {
	Activity.findAll()
	.then(function(activities){
		res.json(activities);
	})
	.catch(next);
});

// router.get('/associatedDays',function(req,res,next){
// 	Activity.findAll({
// 		where: {
// 			dayId: {$gte: 0}
// 		}
// 	})
// 	.then(function(activities){
// 		res.json(activities);
// 	})
// 	.catch(next);
// });

//This would be routes/api/days.js if in a separate file


module.exports=router;