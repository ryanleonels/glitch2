const bufhiesibvfib = document.body.querySelectorAll("*")
function haveFun() {
    for (const i in bufhiesibvfib) {
      try {
        bufhiesibvfib[i].style.transform = `rotate(${Math.random() * 360}deg)scale(${(Math.random() * 3) ** 2 / 3})skew(${Math.random() * 360}deg)`
        bufhiesibvfib[i].style.color=HSL(Math.random()*360)
        bufhiesibvfib[i].style.background=HSL(Math.random()*360)
      } catch {}
    }
  get("body").style.background=HSL(Math.random()*360)
   //if (Math.random() < 0.1) document.location.reload()
  //if (Math.random() < 0.05) window.location.href="https://www.youtube.com/watch?v=BT9h5ifR1tY"
}

haveFun()
setInterval(haveFun,1000)
