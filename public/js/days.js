'use strict';
/* global $ dayModule */

/**
 * A module for managing multiple days & application state.
 * Days are held in a `days` array, with a reference to the `currentDay`.
 * Clicking the "add" (+) button builds a new day object (see `day.js`)
 * and switches to displaying it. Clicking the "remove" button (x) performs
 * the relatively involved logic of reassigning all day numbers and splicing
 * the day out of the collection.
 *
 * This module has four public methods: `.load()`, which currently just
 * adds a single day (assuming a priori no days); `switchTo`, which manages
 * hiding and showing the proper days; and `addToCurrent`/`removeFromCurrent`,
 * which take `attraction` objects and pass them to `currentDay`.
 */

var daysModule = (function () {

  // application state

  var days = [],
      currentDay;

  // jQuery selections

  var $addButton, $removeButton;
  $(function () {
    $addButton = $('#day-add');
    $removeButton = $('#day-title > button.remove');
  });

  // method used both internally and externally

  function switchTo (newCurrentDay) {
    if (currentDay) currentDay.hide();
    console.log('newCurrentDay',newCurrentDay);
    currentDay = newCurrentDay;
    currentDay.show();
  }

  // jQuery event binding

  $(function () {
    $addButton.on('click', addDayAndUpdateDb);
    $removeButton.on('click', removeFromDb);
  });


  function addDayToDOM(id){
    if (this && this.blur) this.blur(); // removes focus box from buttons
    var newDay = dayModule.create({ number: days.length + 1 }); // dayModule
    newDay.id=id;
    days.push(newDay);
    if (days.length === 1) {
      currentDay = newDay;
      switchTo(currentDay);
    }    
    return newDay;
  }

  function addDay (id) {
    return addDayToDOM(id);
  }

  function addDayAndUpdateDb () {
    $.post('/api/days') 
    .then(function(newDay){ //NEED TO ASSOCIATE DOM DAYS WITH RESULT.ID
      addDayToDOM(newDay.id);     
    })
    .catch(console.error.bind(console));
  }

  function removeFromDb () {
    var url='/api/days/'+currentDay.id.toString();
    $.post(url)
    .then(function () {
      deleteCurrentDay();
    })
    .catch(console.error.bind(console));
    if(currentDay.number===1){
      currentDay.hide(); //I added this - not sure if it's the best way??
      currentDay.hideButton();
    }
  }

  function deleteCurrentDay () {
    // prevent deleting last day
    if (days.length < 2 || !currentDay) return;
    // remove from the collection
    var index = days.indexOf(currentDay),
      previousDay = days.splice(index, 1)[0],
      newCurrent = days[index] || days[index - 1];
    // fix the remaining day numbers
    days.forEach(function (day, i) {
      day.setNumber(i + 1);
    });
    switchTo(newCurrent);
    previousDay.hideButton();
  }

  // globally accessible module methods

  var methods = {

    load: function () {
      //$(addDay);
      var newDay=addDay();
      return newDay;
      //return $(addDay);;
    },

    switchTo: switchTo,

    addToCurrent: function (attraction) {
      currentDay.addAttraction(attraction);
    },

    removeFromCurrent: function (attraction) {
      currentDay.removeAttraction(attraction);
    },
    getCurrentDay: function(){
      return currentDay;
    }

  };

  return methods;

}());
