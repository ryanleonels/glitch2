let factorMult = 1
let game={
  base: 10,
  ord: 0,
  over: 0,
  canInf: false,
  OP: 0,
  infUnlock: 0,
  subTab: 1,
  succAuto: 0,
  limAuto: 0,
  infAutoUnlocked: 0,
  infAuto: 0,
  autoLoop: {succ: 0, lim: 0, inf: 0},
  factorShifts: 0,
  factors: []
}

let factorShiftCosts=[200, 1000, 10000, 350000, 10**12, 10**21, 10**100, Infinity]
let factorCostExp=[2,2,2,3,3,6,30,100]
function reset() {
  game={
  base: 10,
  ord: 0,
  over: 0,
  canInf: false,
  OP: 0,
  infUnlock: 0,
  subTab: 1,
  succAuto: 0,
  limAuto: 0,
  infAutoUnlocked: 0,
  infAuto: 0,
  autoLoop: {succ: 0, lim: 0, inf: 0},
  factorShifts: 0,
  factors: []
  }
  document.getElementById("infinityTabButton").style.display="none"
  render()
  updateFactors()
}

Tab(1)
reset()
updateFactors()

load()
function load() {
  let loadgame = JSON.parse(localStorage.getItem("ordinalMarkupSave"))
  if (loadgame != null) {
    if (typeof loadgame.base != "undefined") game.base = loadgame.base
    if (typeof loadgame.ord != "undefined") game.ord = loadgame.ord
    if (typeof loadgame.over != "undefined") game.over = loadgame.over
    if (typeof loadgame.canInf != "undefined") game.canInf = loadgame.canInf
    if (typeof loadgame.OP != "undefined") game.OP = loadgame.OP
    if (typeof loadgame.infUnlock != "undefined") game.infUnlock = loadgame.infUnlock
    if (game.infUnlock==1) document.getElementById("infinityTabButton").style.display="inline-block"
    if (typeof loadgame.subTab != "undefined") game.subTab = loadgame.subTab
    if (typeof loadgame.succAuto != "undefined") game.succAuto = loadgame.succAuto
    if (typeof loadgame.limAuto != "undefined") game.limAuto = loadgame.limAuto
    if (typeof loadgame.autoLoop != "undefined") game.autoLoop = loadgame.autoLoop
    if (typeof loadgame.factorShifts != "undefined") game.factorShifts = loadgame.factorShifts
    if (typeof loadgame.factors != "undefined") game.factors = loadgame.factors
    if (typeof loadgame.infAutoUnlocked != "undefined") game.infAutoUnlocked = loadgame.infAutoUnlocked
  }
}

function save() {
  localStorage.setItem("ordinalMarkupSave", JSON.stringify(game))
}

render()
updateFactors()

function increment() {
  if (game.ord % game.base == game.base-1) {
    game.over += 1
  } else {
    game.ord += 1
  }
  render()
}


function maximize() {
  if (game.ord % game.base == game.base-1 && game.over >= 1) {
    game.ord -= game.base-1
    game.over += game.base-1
    do {
      game.over -= Math.ceil((game.over+game.base)/2-0.1)
      game.ord += game.base
    } while (game.over+game.base >= game.base*2 && game.ord % (game.base**2) != 0)
    if (game.ord % (game.base**2) != 0) {
    game.ord += game.over
    }
    game.over = 0
  }
  render()
}

var calculate = window.setInterval(function() {
  loop()
}, 50)

function loop() {
  if (game.infAuto > 0 && game.infAutoUnlocked > 0) {
    game.autoLoop.inf += 50
    if (game.autoLoop.inf >= game.infAuto) {
      game.autoLoop.inf -= game.infAuto
      infinity()
    }
  }
  if (game.succAuto > 0) {
    game.autoLoop.succ += 50
    if (game.autoLoop.succ >= 1000/(game.succAuto*factorMult)) {
      game.autoLoop.succ -= 1000/(game.succAuto*factorMult)
      increment()
    }
  }
  if (game.limAuto > 0) {
    game.autoLoop.lim += 50
    if (game.autoLoop.lim >= 1000/(game.limAuto*factorMult)) {
      game.autoLoop.lim -= 1000/(game.limAuto*factorMult)
      maximize()
    }
  }
  if (game.base < 8){
    game.infAutoUnlocked = 1
  }
  if (game.autoLoop.succ >= 1000/(game.succAuto*factorMult)) {
    if (game.autoLoop.lim >= 1000/(game.limAuto*factorMult)) {
      game.over = 0
      game.ord += Math.min(Math.floor(game.autoLoop.succ/(1000/(game.succAuto*factorMult))),game.base*Math.floor(game.autoLoop.lim/(1000/(game.limAuto*factorMult))))
      game.autoLoop.succ = game.autoLoop.succ % (1000/(game.succAuto*factorMult))
      game.autoLoop.lim = game.autoLoop.lim % (1000/(game.limAuto*factorMult))
    } else {
      if (Math.floor(game.autoLoop.succ/(1000/(game.succAuto*factorMult))) >= game.base-(game.ord % game.base)) {
        game.ord += game.base-(game.ord % game.base)-1
        game.over += Math.floor(game.autoLoop.succ/(1000/(game.succAuto*factorMult)))-(game.base-(game.ord % game.base)-1)
        game.autoLoop.succ = game.autoLoop.succ % (1000/(game.succAuto*factorMult))
      } else {
        game.ord += Math.floor(game.autoLoop.succ/(1000/(game.succAuto*factorMult)))
        game.autoLoop.succ = game.autoLoop.succ % (1000/(game.succAuto*factorMult))
      }
    }
  }
  render()
}

function render() {
  let outSize = fghexp((game.ord % (game.base**3)+0.1)/(game.base**2),Math.pow(2,Math.floor((game.ord % (game.base**2)+0.1)/game.base))*(game.base+game.over+(game.ord % game.base)))
  document.getElementById("hardy").innerHTML="H<sub>" + displayOrd(game.ord,game.base,game.over) + "</sub> (" + game.base + ")" + (game.ord >= (game.base**3) || outSize == Infinity ? "" : "=" + beautify(outSize))
  game.canInf = (game.ord >= (game.base**3) || outSize >= 10240 || outSize >= Infinity)
  if (game.canInf) {
    document.getElementById("infinityButton").innerHTML = "Infinity to gain " + beautify(calcOrdPoints(game.ord,game.base,game.over)) + " Ordinal Points"
  } else {
    document.getElementById("infinityButton").innerHTML = "Reach 10240 to Infinity"
  }
  document.getElementById("ordinalPointsDisplay").innerHTML = "You have " + beautify(game.OP) + " Ordinal Points"
  document.getElementById("succAutoAmount").innerHTML = "You have " + game.succAuto + " successor autobuyer, clicking the successor button " + game.succAuto*factorMult + " times per second" 
  document.getElementById("limAutoAmount").innerHTML = "You have " + game.limAuto + "  maximize autobuyer, clicking the maximize button " + game.limAuto*factorMult + " times per second"
  
  document.getElementById("buysucc").innerHTML = "Buy Successor Autobuyer for " + beautify(100*2**game.succAuto) + " OP"
  document.getElementById("buylim").innerHTML = "Buy Maximize Autobuyer for " + beautify(100*2**game.limAuto) + "  OP"
  document.getElementById("factorShift").innerHTML = "Factor Shift (" + game.factorShifts + "): Requires " + beautify(factorShiftCosts[game.factorShifts]) +" OP"
  document.getElementById("noFactors").style.display=(game.factors.length==0 ? "inline-block" : "none")
  document.getElementById("factorList").style.display=(game.factors.length==0 ? "none" : "inline-block")
  factorMult=1
  if (game.factors.length>0) {
    for(let factorListCounter=0;factorListCounter<game.factors.length;factorListCounter++){
      factorMult *= 1+game.factors[factorListCounter]
    }
  }
  document.getElementById("factorMult").innerHTML = "Your factors are multiplying your autoclickers by " + factorMult
}

function updateFactors() {
  if (game.factors.length>=0) {
    let factorListHTML=""
    for(let factorListCounter=0;factorListCounter<game.factors.length;factorListCounter++){
      factorListHTML = factorListHTML + "<li>Factor " + (factorListCounter+1) + " x" + (1+game.factors[factorListCounter]) + " <button onclick=\"buyFactor(" + factorListCounter + ")\">Increase Factor " + (factorListCounter+1) + " for " + beautify(Math.pow(10**(factorListCounter+1),Math.pow(factorCostExp[factorListCounter],game.factors[factorListCounter]))) + " OP</button></li>"
    }
    document.getElementById("factorListMain").innerHTML=factorListHTML
  }
}

function buysucc() {
  if (game.OP>=100*2**game.succAuto) {
    game.OP-=100*2**game.succAuto
    game.succAuto += 1
  }
  render()
}

function buylim() {
  if (game.OP>=100*2**game.limAuto) {
    game.OP-=100*2**game.limAuto
    game.limAuto += 1
  }
  render()
}

function maxall() {
  while (game.OP>=100*2**game.succAuto) {
    buysucc()
  }
  while (game.OP>=100*2**game.limAuto) {
    buylim()
  }
}

function infinity() {
  if (game.canInf) {
    game.OP += calcOrdPoints(game.ord,game.base,game.over)
    game.ord = 0
    game.over = 0
    document.getElementById("infinityTabButton").style.display="inline-block"
    game.infUnlock = 1
  }
  render()
}

function displayOrd(ord,base,over=0,trim=8) {
  if (ord<base) {
    return ord+over
  } else {
    let tempvar = Math.floor(Math.log(ord+0.1)/Math.log(base))
    let tempvar2 = Math.pow(base,tempvar)
    let tempvar3 = Math.floor((ord+0.1)/tempvar2)
    return "ω" + (tempvar==1 ? "" : "<sup>" + displayOrd(tempvar,base,0) + "</sup>") + (tempvar3==1 ? "" : tempvar3) + (ord-tempvar2*tempvar3+over==0 || trim==0 ? (ord-tempvar2*tempvar3+over==0 ? "": "+...") : "+" + displayOrd(ord-tempvar2*tempvar3,base,over,trim-1))
  }
}

function fghexp(times, on) {
  if (times<1) {
    return on
  } else {
    return fghexp(times-1,Math.pow(2,on)*on)
  }
}

function beautify(number, notation="scientific") {
  if (notation=="scientific") {
  let exponent = Math.floor(Math.log10(number+0.1))
  let mantissa = number / Math.pow(10, exponent)
  if (exponent < 6) return Math.round(number)
  return mantissa.toFixed(3) + "e" + exponent
  }
}

function calcOrdPoints(ord,base,over) {
  if (ord<base) {
    return ord+over
  } else {
    let tempvar = Math.floor(Math.log(ord+0.1)/Math.log(base))
    let tempvar2 = Math.pow(base,tempvar)
    let tempvar3 = Math.floor((ord+0.1)/tempvar2)
    return 10**calcOrdPoints(tempvar,base,0)*tempvar3+calcOrdPoints(ord-tempvar2*tempvar3,base,over)
  }
}

function Tab(t) {
  for (let tt=1; tt<=5; tt++ ) {
    document.getElementById("Tab" + tt).style.display="none"
  }
  document.getElementById("Tab" + t).style.display="inline-block"
  subTab(game.subTab)
}

function subTab(t) {
  document.getElementById("subTab1").style.display="none"
  document.getElementById("subTab2").style.display="none"
  document.getElementById("subTab" + t).style.display="inline-block"
  game.subTab=t
}

var autoSave = window.setInterval(function() {
  save()
}, 2000)

function resetConf() {
  let code = prompt("Are you sure you want to delete all of your progress? Type in \"yes\" to reset all of your progress.")
  if (code.toLowerCase()=="yes") reset()
}

function factorShift() {
  if (game.OP>=factorShiftCosts[game.factorShifts]) {
    game.ord=0
    game.over=0
    game.canInf=false
    game.OP=0
    game.succAuto=0
    game.limAuto=0
    game.autoLoop={succ: 0, lim: 0}
    game.factorShifts += 1
    game.base -= 1
    game.factors=[]
    for(let i=0;i<game.factorShifts;i++) {
      game.factors.push(0)
    }
  }
  render()
  updateFactors()
}

function buyFactor(n) {
  if (game.OP >= (Math.pow(10**(n+1),Math.pow(factorCostExp[n],game.factors[n])))) {
    game.OP -= (Math.pow(10**(n+1),Math.pow(factorCostExp[n],game.factors[n])))
    game.factors[n] += 1
  }
  render()
  updateFactors()
}