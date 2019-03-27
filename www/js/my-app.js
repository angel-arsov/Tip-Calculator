// Initialize app
let app = new Framework7()

// If we need to use custom DOM library, let's save it to $$ variable:
let $$ = Dom7

// Add view
let mainView = app.addView('.view-main', {
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
    navigator.app.exitApp()
  } else if (navigator.device) {
    navigator.device.exitApp()
  } else {
    window.close()
  }
})

// Handle refresh button
$$('#refresh').on('click', function () {
  window.location.reload()
})

// Create dynamic popover
let dynamicPopover = $$('a.dynamic-popover')
dynamicPopover.on('click', function () {
  let clickedLink = this
  let content = '<div class="popover">' +
                  '<div class="popover-inner">' +
                    '<div class="content-block">' +
                      '<div class="list">' +
                        '<ul>' +
                          '<li class="row">' +
                            '<a href="#" class="button color-teal" id="bill-btn">' +
                              '<i class="fas fa-check-circle"></i>' +
                            '</a>' +
                            '<label class="item-content" id="number-label">' +
                              '<input type="number" placeholder="Your Bill" id="bill-input">' +
                            '</label>' +
                          '</li>' +
                        '</ul>' +
                      '</div>' +
                    '</div>' +
                  '</div>' +
                '</div>'
  app.popover(content, clickedLink)
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

    $$('#bill-btn').on('click', function () {
      if ($$('#bill-input').prop('value') !== '') {
        app.closeModal(dynamicPopover)
        $$('.popover').css('display', 'none')
        $$('#tip').remove()
        $$('.card-content').append('<p id="tip">10.00</p>')
      }
    })
  }
})
