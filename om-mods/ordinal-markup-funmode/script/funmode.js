"use strict"
const bufhiesibvfib = document.body.querySelectorAll("*")

const generateRandomColour = () =>
  `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`
const funRandom = (mul, pow) => 
  (Math.random() * mul) ** pow / mul
  


function haveFun() {
  for (const i in bufhiesibvfib) {
    try {
      const stile = bufhiesibvfib[i].style
        
      document.body.style.backgroundColor = generateRandomColour()
        
      stile.transform = `rotate(${Math.random() * 360}deg)scale(${funRandom(3, 2.5)})skew(${Math.random() * 360}deg)`
        
      stile.backgroundColor = generateRandomColour()
      stile.color = generateRandomColour()
    } catch {}
  }
  
  if (Math.random() < 0.0005) document.location.reload()
}

haveFun()
setInterval(haveFun, 6000)
