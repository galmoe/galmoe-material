function getElementLeft (element) {
  let actualLeft = element.offsetLeft
  let current = element.offsetParent
  while (current !== null) {
    actualLeft += current.offsetLeft
    current = current.offsetParent
  }
  return actualLeft
}

function getElementTop (element) {
  let actualTop = element.offsetTop
  let current = element.offsetParent
  while (current !== null) {
    actualTop += current.offsetTop
    current = current.offsetParent
  }
  return actualTop
}

function getElementViewLeft (element) {
  let actualLeft = element.offsetLeft
  let current = element.offsetParent
  while (current !== null) {
    actualLeft += current.offsetLeft
    current = current.offsetParent
  }
  return actualLeft - scrollLeftFn()
}

function getElementViewTop (element) {
  let actualTop = element.offsetTop
  let current = element.offsetParent
  while (current !== null) {
    actualTop += current.offsetTop
    current = current.offsetParent
  }
  return actualTop - scrollTopFn()
}

function scrollTopFn () {
  return document.compatMode === 'BackCompat' ? document.body.scrollTop : document.documentElement.scrollTop
}

function scrollLeftFn () {
  return document.compatMode === 'BackCompat' ? document.body.scrollLeft : document.documentElement.scrollLeft
}

export {
  getElementLeft,
  getElementTop,
  getElementViewLeft,
  getElementViewTop,
  scrollTopFn,
  scrollLeftFn
}
