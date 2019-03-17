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

// Handle exit button
$$('#exit').on('click', function () {
  if (navigator.app) {
    navigator.app.exitApp();
  } else if (navigator.device) {
    navigator.device.exitApp()
  } else {
    window.close()
  }
})

// Handle refresh button
$$('#refresh').on('click', function () {
  console.log('Refresh clicked')
})

// Handle groups of radio buttons
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
    // First group of radio buttons
    if ($$('#service-1').prop('checked')) {
      $$('.fa-mug-hot').css('color', '#bfcd3a')
      $$('.fa-hamburger').css('color', '#8e8e93')
      $$('.fa-glass-cheers').css('color', '#8e8e93')
    }
    if ($$('#service-2').prop('checked')) {
      $$('.fa-hamburger').css('color', '#bfcd3a')
      $$('.fa-mug-hot').css('color', '#8e8e93')
      $$('.fa-glass-cheers').css('color', '#8e8e93')
    }
    if ($$('#service-3').prop('checked')) {
      $$('.fa-glass-cheers').css('color', '#bfcd3a')
      $$('.fa-hamburger').css('color', '#8e8e93')
      $$('.fa-mug-hot').css('color', '#8e8e93')
    }

    // Second group of radio buttons
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
