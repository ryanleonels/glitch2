// use keydown, keypress is deprecated
document.addEventListener("keydown", function onEvent(event) {
  switch (event.key) {
    case "m": // max all
      maxAll()
      break
    case "1": // autoclicker
      buyClicker()
      break
    case "2": // point factory
      buyFactory()
      break
    case "3": // point portal
      buyPortal()
      break
    case "g": // generator multiplier
      buyMult()
      break
    case "x": // buy x
      convertToX()
      break
    case "y": // buy y
      convertToY()
      break
    case "r": // reset
      reset()
      break
  }
});