// Initialize app
const app = new Framework7()

// If we need to use custom DOM library, let's save it to $$ variable:
const $$ = Dom7

// Add view
app.addView('.view-main', {
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

// Handle tap events
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
    // Bill button
    $$('#bill-btn').on('click', function () {
      let billInput = $$('#bill-input').prop('value')
      if (billInput !== '') {
        app.closeModal('#bill-btn')
        $$('.popover').removeClass('modal-in').removeClass('remove-on-close')
        dynamicPopover.text(`Your Bill is: ${billInput}`)
        dynamicPopover.prepend('<i class="far fa-edit" style="margin-left:5px;"></i>')
        // $$('#tip').remove()
        // $$('.card-content').append('<p id="tip">10.00</p>')
      }
      setTimeout(() => {
        $$('.popover').remove()
      }, 100)
    })

    // Inititating the variables for the calculating algorithm
    let bill = Number(dynamicPopover.text().replace(/^\D+/g, ''))
    let service = 0
    let smile = 0

    // First group of radio buttons
    if ($$('#service-1').prop('checked')) {
      $$('.fa-mug-hot').css('color', '#bfcd3a')
      $$('.fa-hamburger').css('color', '#8e8e93')
      $$('.fa-glass-cheers').css('color', '#8e8e93')
      service = 1
    }
    if ($$('#service-2').prop('checked')) {
      $$('.fa-hamburger').css('color', '#bfcd3a')
      $$('.fa-mug-hot').css('color', '#8e8e93')
      $$('.fa-glass-cheers').css('color', '#8e8e93')
      service = 2
    }
    if ($$('#service-3').prop('checked')) {
      $$('.fa-glass-cheers').css('color', '#bfcd3a')
      $$('.fa-hamburger').css('color', '#8e8e93')
      $$('.fa-mug-hot').css('color', '#8e8e93')
      service = 3
    }

    // Second group of radio buttons
    if ($$('#smile-1').prop('checked')) {
      $$('.fa-meh-rolling-eyes').css('color', '#bfcd3a')
      $$('.fa-smile').css('color', '#8e8e93')
      $$('.fa-grin-stars').css('color', '#8e8e93')
      smile = 1
    }
    if ($$('#smile-2').prop('checked')) {
      $$('.fa-smile').css('color', '#bfcd3a')
      $$('.fa-meh-rolling-eyes').css('color', '#8e8e93')
      $$('.fa-grin-stars').css('color', '#8e8e93')
      smile = 2
    }
    if ($$('#smile-3').prop('checked')) {
      $$('.fa-grin-stars').css('color', '#bfcd3a')
      $$('.fa-smile').css('color', '#8e8e93')
      $$('.fa-meh-rolling-eyes').css('color', '#8e8e93')
      smile = 3
    }
  }
})

// Calculating algorithm
$$(document).on('change', function () {
  console.log('change')

})
