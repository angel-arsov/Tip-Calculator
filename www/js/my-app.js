// Initialize app
let myApp = new Framework7()

// If we need to use custom DOM library, let's save it to $$ variable:
let $$ = Dom7

// Add view
let mainView = myApp.addView('.view-main', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true
})

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
  console.log('Device is ready!')
})

// Handle refresh button
$$('#refresh').on('click', function () {
  console.log('Refresh clicked')
})

// Handle first group of radio buttons
let detectTap = false
$$(document).on('touchstart', function () {
  detectTap = true // detects all touch events
})
$$(document).on('touchmove', function () {
  detectTap = false // Excludes the scroll events from touch events
})
$$(document).on('click touchend', function (event) {
  if (event.type === 'click') detectTap = true // detects click events
  if (detectTap) {
    if ($$('#smile-1').prop('checked')) {
      $$('.fa-meh-rolling-eyes').css('color', '#bfcd3a')
      $$('.fa-smile').css('color', '#8e8e93')
      $$('.fa-grin-stars').css('color', '#8e8e93')
    }
    if ($$('#smile-2').prop('checked')) {
      $$('.fa-smile').css('color', '#bfcd3a')
      $$('.fa-meh-rolling-eyes').css('color', '#8e8e93')
      $$('.fa-grin-stars').css('color', '#8e8e93')
    }
    if ($$('#smile-3').prop('checked')) {
      $$('.fa-grin-stars').css('color', '#bfcd3a')
      $$('.fa-smile').css('color', '#8e8e93')
      $$('.fa-meh-rolling-eyes').css('color', '#8e8e93')
    }
  }
})
