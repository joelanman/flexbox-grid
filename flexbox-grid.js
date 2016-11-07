
// getPosition from https://www.kirupa.com/html5/get_element_position_using_javascript.htm

function getPosition (el) {
  var xPos = 0
  var yPos = 0

  while (el) {
    if (el.tagName === 'BODY') {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft
      var yScroll = el.scrollTop || document.documentElement.scrollTop

      xPos += (el.offsetLeft - xScroll + el.clientLeft)
      yPos += (el.offsetTop - yScroll + el.clientTop)
    } else {
      // for all other non-BODY elements
      xPos += el.offsetLeft - el.scrollLeft + el.clientLeft
      yPos += el.offsetTop - el.scrollTop + el.clientTop
    }

    el = el.offsetParent
  }
  return {
    x: xPos,
    y: yPos
  }
}

// initialise flexboxGrid

function flexboxGrid (parentId, childClass) {
  parentId = (parentId === undefined) ? 'flexbox-grid' : parentId
  childClass = (childClass === undefined) ? 'flexbox-grid-item' : childClass

  window.addEventListener('resize', function () {
    addSpacers(parentId, childClass)
  })

  addSpacers(parentId, childClass)
}

// calculate number of elements in last two rows and add spacer elements

function addSpacers (parentId, childClass) {
  var spacers = document.getElementsByClassName('flexbox-grid-spacer')

  if (spacers.length > 0) {
    var parent = spacers[0].parentNode

    while (spacers.length > 0) {
      parent.removeChild(spacers[0])
    }
  }

  var files = document.querySelectorAll('.' + childClass)
  files = Array.from(files)

  var rowTotals = []
  var currentRow = 0
  var currentTop = null

  while (currentRow < 2 && files.length > 0) {
    var el = files.pop()
    var elTop = getPosition(el).y

    if (currentTop !== null && currentTop !== elTop) {
      currentRow += 1
    }

    if (rowTotals[currentRow] === undefined) {
      rowTotals[currentRow] = 1
    } else {
      rowTotals[currentRow] += 1
    }

    currentTop = elTop
  }

  // - console.log(rowTotals)

  var difference = rowTotals[1] - rowTotals[0]

  var docFrag = document.createDocumentFragment()

  for (var i = 0; i < difference; i++) {
    var spacer = document.createElement('div')
    spacer.classList.add(childClass, 'flexbox-grid-spacer')
    docFrag.appendChild(spacer)
  }

  document.getElementById(parentId).appendChild(docFrag)
}
