var game={
  number: {
    OPTD: 0,
    OP: 0,
    M: 0
  },
  multiplier: {
    OPTD: 0,
    OP: 0,
    M: 1
  },
  multBought: {
    OPTD: 0,
    OP: 0,
    M: 0
  },
  autobuyer: 0,
  ticksInTen: 0,
  prestige: 0,
  multCost: {
    OPTD: 0,
    OP: 0,
    M: 10
  }
}

function debug() {
  game.number.M=10**10
}

document.getElementById("prestige").style.display = "none"

var mainGameLoop = window.setInterval(function() {
  loop();
}, 50)

function loop() {
  game.number.M += game.multiplier.M/20
  document.getElementById("ordinal").innerHTML = "Surreal: " + FindOrdinal(game.number)
  document.getElementById("ordinal per second").innerHTML = "Surreal Per Second: " + FindOrdinal(game.multiplier)
  document.getElementById("tick interval").innerHTML = "Tickspeed: " + ((game.multBought.OPTD+game.multBought.OP==0) ? Math.round(1000/game.multiplier.M) : 0) + " ms"
  game.ticksInTen += game.multiplier.M/20
  document.getElementById("Tick Upgrade").innerHTML = "Reduce Tick Interval by 10%, Cost " + FindOrdinal(game.multCost)
  if (game.ticksInTen >= 10 || game.multiplier.OP>0) {
    game.ticksInTen -= 10
    if (game.autobuyer==1) {
    let yeet=Math.floor(game.number.M/game.multCost.M)
    game.number.M -= yeet*game.multCost.M
    game.multBought.M += yeet
    game.multiplier.M *= Math.pow((10/9),yeet)
  }
  }
 if (game.number.M.toString()=="NaN") {
   if (game.prestige==0) {
     document.getElementById("screen").style.display = "none"
     document.getElementById("prestige").style.display = "block"
     console.log("hi")
   } else if (0==0) {
     game.number.M=1
     game.multiplier.M=1
     game.multBought.M=0
     game.number.OP += 1
     game.multiplier.OP += 1
     game.multBought.OP += 1
     game.multCost.M *= 0.8
     game.multCost.OP += 1
   }
 }
}

function inf() {
  game.prestige += 1
  game.number.M=0
  game.multiplier.M=Math.pow(2,game.prestige)
  game.multBought.M=0 
  game.autobuyer = 0
  game.ticksInTen = 0
  document.getElementById("screen").style.display = "block"
  document.getElementById("prestige").style.display = "none"
  document.getElementById("buy autobuyer").innerHTML = "Buy an autobuyer, buys once per 10 ticks, cost 1000"
}

function doubleProd() {
  if (game.number.M>=game.multCost.M) {
   game.number.M -= game.multCost.M
   game.multiplier.M *= 10/9
   game.multBought.M += 1
  }
}

function buyauto() {
  if (game.number.M>=1000 & game.autobuyer==0) {
   game.number.M -= 1000
   game.autobuyer = 1
   document.getElementById("buy autobuyer").innerHTML = "Autobuyer bought"
  }
}

function FindOrdinal(a) {
  if (a.OPTD==0) {
    if (a.OP==0) {
      return Math.floor(100*a.M)/100
    }
    if (a.OP==1) {
      return "w" + Math.floor(100*a.M)/100
    }
    if (a.OP>1) {
      return "w^" + a.OP + "*" + Math.floor(100*a.M)/100
    }
  }
  if (a.OPTD>0) {
    return "w^("+FindOrdinal(
      {
        OPTD: a.OPTD-1,
        OP: a.OP,
        M: a.M
      }
    ) + ")";
  }
}
