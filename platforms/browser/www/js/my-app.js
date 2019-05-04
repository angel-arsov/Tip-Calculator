/* global Framework7, Dom7 */

// Initialize app
const app = new Framework7()

// If we need to use custom DOM library, let's save it to $$ variable:
const $$ = Dom7

// Add view
app.views.create('.view-main', {
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
  $$('.page-content').prepend('<p><span class="progressbar-infinite"></span></p>')
  setTimeout(() => {
    window.location.reload()
  }, 1000)
})

// Create dynamic popover
let dynamicPopover = app.popover.create({
  targetEl: 'a.dynamic-popover',
  content: '<div class="popover">' +
            '<div class="popover-inner">' +
              '<div class="content-block">' +
                '<div class="list">' +
                  '<ul>' +
                    '<li class="row" style="margin: 10px 0 10px 0;">' +
                      '<a class="button color-teal" id="bill-btn">' +
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
})
let inputPopover = $$('.dynamic-popover')
inputPopover.on('click', function () {
  dynamicPopover.open()
  app.toolbar.hide('.toolbar')
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
  if (event.type === 'click') { detectTap = true } // detects click events
  if ($$(event.target).closest('.item-radio').length || !$$(event.target).closest('.page-content').length) {
    if (detectTap) {
      // Bill button
      $$('#bill-btn').on('click', function () {
        let billInput = $$('#bill-input').prop('value')
        if (billInput === '') {
          dynamicPopover.close()
          app.dialog.close()
          app.toolbar.show('.toolbar')
          app.dialog.alert('You entered invalid input', '')
        } else if (billInput !== '') {
          dynamicPopover.close()
          app.toolbar.show('.toolbar')
          inputPopover.text(`Your Bill is: ${billInput}`)
          inputPopover.prepend('<i class="far fa-edit" style="margin-left:5px;"></i>')
          printTip(tipService(bill, mug, hamburger, glass, meh, smile, grin))
        }
      })

      // Inititating the variables for the calculating algorithm
      let bill = Number(inputPopover.text().replace(/^\D+/g, ''))

      let mug = $$('.fa-mug-hot')
      let hamburger = $$('.fa-hamburger')
      let glass = $$('.fa-glass-cheers')
      let meh = $$('.fa-meh-rolling-eyes')
      let smile = $$('.fa-smile')
      let grin = $$('.fa-grin-stars')

      // First group of radio buttons
      if ($$('#service-1').prop('checked')) {
        radioCheck(mug, hamburger, glass)
        printTip(tipService(bill, mug, hamburger, glass, meh, smile, grin))
      }
      if ($$('#service-2').prop('checked')) {
        radioCheck(hamburger, mug, glass)
        printTip(tipService(bill, mug, hamburger, glass, meh, smile, grin))
      }
      if ($$('#service-3').prop('checked')) {
        radioCheck(glass, hamburger, mug)
        printTip(tipService(bill, mug, hamburger, glass, meh, smile, grin))
      }

      // Second group of radio buttons
      if ($$('#smile-1').prop('checked')) {
        radioCheck(meh, smile, grin)
        printTip(tipService(bill, mug, hamburger, glass, meh, smile, grin))
      }
      if ($$('#smile-2').prop('checked')) {
        radioCheck(smile, meh, grin)
        printTip(tipService(bill, mug, hamburger, glass, meh, smile, grin))
      }
      if ($$('#smile-3').prop('checked')) {
        radioCheck(grin, smile, meh)
        printTip(tipService(bill, mug, hamburger, glass, meh, smile, grin))
      }
    }
  }
})

// Helper functions
function radioCheck (e1, e2, e3) {
  e1.addClass('radio-check')
  e2.removeClass('radio-check')
  e3.removeClass('radio-check')
}

function hasRadio (element) {
  if (element.hasClass('radio-check')) {
    return true
  } else {
    return false
  }
}

function printTip (tipResult) {
  $$('#tip').remove()
  $$('.card-content').append(`<p id="tip">${(Math.round(tipResult * 10) / 10).toFixed(2)}</p>`)
  $$('#tip').addClass('focus-in-contract')
}

// Calculating the tip 
function tipService (bill, mug, hamburger, glass, meh, smile, grin) {
  let tipResult = 0
  if (hasRadio(mug)) {
    if (hasRadio(meh)) {
      tipResult = bill * 0.03456
    } else if (hasRadio(smile)) {
      tipResult = bill * 0.04565
    } else if (hasRadio(grin)) {
      tipResult = bill * 0.06738
    }
  } else if (hasRadio(hamburger)) {
    if (hasRadio(meh)) {
      tipResult = bill * 0.06947
    } else if (hasRadio(smile)) {
      tipResult = bill * 0.1023
    } else if (hasRadio(grin)) {
      tipResult = bill * 0.1265
    }
  } else if (hasRadio(glass)) {
    if (hasRadio(meh)) {
      tipResult = bill * 0.1054
    } else if (hasRadio(smile)) {
      tipResult = bill * 0.1234
    } else if (hasRadio(grin)) {
      tipResult = bill * 0.1532
    }
  }
  return tipResult
}
