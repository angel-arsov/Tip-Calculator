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
        printTip(tipResult)
      }
      setTimeout(() => {
        $$('.popover').remove()
      }, 100)
    })

    // Inititating the variables for the calculating algorithm
    let bill = Number(dynamicPopover.text().replace(/^\D+/g, ''))
    let tipResult = 0

    let mug = $$('.fa-mug-hot')
    let hamburger = $$('.fa-hamburger')
    let glass = $$('.fa-glass-cheers')
    let meh = $$('.fa-meh-rolling-eyes')
    let smile = $$('.fa-smile')
    let grin = $$('.fa-grin-stars')

    // First group of radio buttons
    if ($$('#service-1').prop('checked')) {
      radioCheck(mug, hamburger, glass)
      tipResult = tipService(bill, tipResult, mug, hamburger, glass, meh, smile, grin)
      printTip(tipResult)
    }
    if ($$('#service-2').prop('checked')) {
      radioCheck(hamburger, mug, glass)
      tipResult = tipService(bill, tipResult, mug, hamburger, glass, meh, smile, grin)
      printTip(tipResult)
    }
    if ($$('#service-3').prop('checked')) {
      radioCheck(glass, hamburger, mug)
      tipResult = tipService(bill, tipResult, mug, hamburger, glass, meh, smile, grin)
      printTip(tipResult)
    }

    // Second group of radio buttons
    if ($$('#smile-1').prop('checked')) {
      radioCheck(meh, smile, grin)
      tipResult = tipService(bill, tipResult, mug, hamburger, glass, meh, smile, grin)
      printTip(tipResult)
    }
    if ($$('#smile-2').prop('checked')) {
      radioCheck(smile, meh, grin)
      tipResult = tipService(bill, tipResult, mug, hamburger, glass, meh, smile, grin)
      printTip(tipResult)
    }
    if ($$('#smile-3').prop('checked')) {
      radioCheck(grin, smile, meh)
      tipResult = tipService(bill, tipResult, mug, hamburger, glass, meh, smile, grin)
      printTip(tipResult)
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
  $$('.card-content').append(`<p id="tip">${tipResult.toFixed(2)}</p>`)
  $$('#tip').addClass('focus-in-contract')
}

// Calculating the tip
function tipService (bill, tipResult, mug, hamburger, glass, meh, smile, grin) {
  tipResult = 0
  if (hasRadio(mug)) {
    if (hasRadio(meh)) {
      tipResult = bill * 0.03
    } else if (hasRadio(smile)) {
      tipResult = bill * 0.05
    } else if (hasRadio(grin)) {
      tipResult = bill * 0.08
    }
  } else if (hasRadio(hamburger)) {
    if (hasRadio(meh)) {
      tipResult = bill * 0.07
    } else if (hasRadio(smile)) {
      tipResult = bill * 0.1
    } else if (hasRadio(grin)) {
      tipResult = bill * 0.15
    }
  } else if (hasRadio(glass)) {
    if (hasRadio(meh)) {
      tipResult = bill * 0.1
    } else if (hasRadio(smile)) {
      tipResult = bill * 0.15
    } else if (hasRadio(grin)) {
      tipResult = bill * 0.2
    }
  }
  return tipResult
}
