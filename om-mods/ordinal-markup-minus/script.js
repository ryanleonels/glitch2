//Yeah, I know it's pretty unorganized at the moment
let factorMult = 1
let bfactorMult = 1
let ordMarks=[]
let numMarks=[]
setMarks()
let clickCoolDown = 0
let infinityButtonText = 0
let game
let factorShiftCosts=[200, 1000, 10000, 350000, 10**12, 10**21, 10**100, 1.095*10**272, Infinity]
let factorCostExp=[2,2,2,3,3,6,30,100]
const bupUpgradeCosts=[1,1,1,12,5,4,8,36,72,73,16,Infinity]
let totalMult = 1
let buptotalMute = 1
const challengeGoals=[[10**32,10**223,10**270*5,10**270*5],[10**270*5,V(10)+10**270,Infinity],[10**200,Infinity,Infinity],[10**33,Infinity,Infinity]]
const challengeCurve=[0,0.5,0.75,1]
let partOP = 0
let factor1to4 = 1
const iupCosts=[10**5,10**3,10**9]
let EN = ExpantaNum
reset()

function reset() {
  game={
  base: 100,
  ord: 0,
  over: 0,
  canInf: false,
  OP: 0,
  infUnlock: 0,
  subTab: 1,
  bsubTab: 1,
  succAuto: 0,
  limAuto: 0,
  maxAuto: 0,
  autoLoop: {succ: 0, lim: 0},
  factorShifts: 0,
  factors: [],
  lastTick: Date.now(),
  version: 0.22,
  boostUnlock: 0,
  boosters: 0,
  upgrades: [],
  factorBoosts: 0,
  dynamic: 1,
  dynamicUnlock: 0,
  maxAuto: 0,
  infAuto: 0,
  bAutoLoop: {max: 0, inf: 0},
  autoOn: {max: 1, inf: 1},
  challenge: 0,
  challengeCompletion: [0,0,0,0,0,0,0],
  incrementy: 0,
  iups: [0,0,0,0,0,0],
  buchholz: 0,
  theme: 0,
  msint: 50,
  maxOrdLength: {less: 8,more: 10},
  diagonalizePoint: EN(0),
  diagonalizer: 0,
  diagonalizeUnlock: 0,
  diagonalizeSucc: 0,
  diagonalizeLim: 0,
  diagonalizeAddProd: 0,
  diagonalizeFactorShiftKeep: 0,
  diagonalizeFactorKeep: 0,
  DPMultCost: EN(10),
  DPGain: EN(1),
  doubleDiagonalizer: 0,
  factor5Boost: 0,
  autoDiagonalizer: 0,
  divsubTab: 1,
  diagonalizeChallengeUnlocked: 0,
  diagonalizeChallenge: 0,
  diagonalizeChallengeCompletion: [0,0,0,0,0,0,0],
  diagonalizeChallengeGoals: [10**28],
  savedLimAuto: 0, //For diagonalize challenge 1.
  savedSuccAuto: 0 //For diagonalize challenge 1.
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
    loadGame(loadgame)
  }
}

function loadGame(loadgame) {
  reset()
  if (typeof loadgame.base != "undefined") game.base = loadgame.base
  if (typeof loadgame.ord != "undefined") game.ord = loadgame.ord
  if (typeof loadgame.over != "undefined") game.over = loadgame.over
  if (typeof loadgame.canInf != "undefined") game.canInf = loadgame.canInf
  if (typeof loadgame.OP != "undefined") game.OP = loadgame.OP
  if (typeof loadgame.infUnlock != "undefined") game.infUnlock = loadgame.infUnlock
  if (game.infUnlock==1) document.getElementById("infinityTabButton").style.display="inline-block"
  if (typeof loadgame.subTab != "undefined") game.subTab = loadgame.subTab
  if (typeof loadgame.bsubTab != "undefined") game.bsubTab = loadgame.bsubTab
  if (typeof loadgame.succAuto != "undefined") game.succAuto = loadgame.succAuto
  if (typeof loadgame.limAuto != "undefined") game.limAuto = loadgame.limAuto
  if (typeof loadgame.maxAuto != "undefined") game.maxAuto = loadgame.maxAuto
  if (typeof loadgame.autoLoop != "undefined") game.autoLoop = loadgame.autoLoop
  if (typeof loadgame.factorShifts != "undefined") game.factorShifts = loadgame.factorShifts
  if (typeof loadgame.factors != "undefined") game.factors = loadgame.factors
  if (typeof loadgame.lastTick != "undefined") game.lastTick = loadgame.lastTick
  let diff = Date.now()-game.lastTick
  console.log(diff)
  if (typeof loadgame.version == "undefined") {
    game.version = 0.12
  } else {
    game.version = loadgame.version
  }
  if (game.version == 0.12) {
    game.version = 0.2
    if (game.ord>=10**300 || game.base==2) {
      revertToPreBooster()
    }
  }
  if (typeof loadgame.boostUnlock != "undefined") game.boostUnlock = loadgame.boostUnlock
  if (typeof loadgame.boosters != "undefined") game.boosters = loadgame.boosters
  if (typeof loadgame.upgrades != "undefined") game.upgrades = loadgame.upgrades
  if (typeof loadgame.factorBoosts != "undefined") game.factorBoosts = loadgame.factorBoosts
  if (game.version == 0.2) {
    game.version = 0.201
    if (game.boostUnlock==1) {
      game.boosters=1
      game.upgrades=[]
      game.factorBoosts=1
    }
  }
  if (game.version == 0.201) {
    game.version = 0.202
    if (game.boostUnlock==1 && game.boosters+(game.upgrades.includes(1)?1:0) >= 2) {
      game.boosters -= 1
    } else {
      if (game.boostUnlock==1) game.factorBoosts += 1
    }
  }
  if (typeof loadgame.dynamic != "undefined") game.dynamic = loadgame.dynamic
  if (typeof loadgame.dynamicUnlock != "undefined") game.dynamicUnlock = loadgame.dynamicUnlock
  if (typeof loadgame.bAutoLoop != "undefined") game.bAutoLoop = loadgame.bAutoLoop
  if (typeof loadgame.autoOn != "undefined") game.autoOn = loadgame.autoOn
  if (game.version == 0.202) {
    game.version = 0.21
    if (game.boostUnlock==1) {
      if (game.factorBoosts==0) {
        game.factorBoosts = 1
        if (game.upgrades.includes(1)) {
          game.boosters=0
        } else {
          game.boosters=1
        }
      } else {
        game.boosters=game.factorBoosts*(game.factorBoosts+1)/2
        if (game.upgrades.includes(1)) game.boosters-=1
        if (game.upgrades.includes(2)) game.boosters-=1
        if (game.upgrades.includes(3)) game.boosters-=1
        if (game.upgrades.includes(5)) game.boosters-=5
        if (game.upgrades.includes(6)) game.boosters-=4
        if (game.upgrades.includes(7)) game.boosters-=8
      }
    }
  }
  if (game.version==0.21) {
     game.version=0.211
     if (game.boostUnlock==1) {
     game.boosters=game.factorBoosts*(game.factorBoosts+1)/2
     if (game.upgrades.includes(1)) game.boosters-=1
     if (game.upgrades.includes(2)) game.boosters-=1
     if (game.upgrades.includes(3)) game.boosters-=1
     if (game.upgrades.includes(5)) game.boosters-=5
     if (game.upgrades.includes(6)) game.boosters-=4
     if (game.upgrades.includes(7)) game.boosters-=8}
  }
  if (game.version==0.211) {
     game.version=0.22
     if (game.boostUnlock==1) {
     game.boosters=game.factorBoosts*(game.factorBoosts+1)/2
     if (game.upgrades.includes(1)) game.boosters-=1
     if (game.upgrades.includes(2)) game.boosters-=1
     if (game.upgrades.includes(3)) game.boosters-=1
     if (game.upgrades.includes(5)) game.boosters-=5
     if (game.upgrades.includes(6)) game.boosters-=4
     if (game.upgrades.includes(7)) game.boosters-=8
     if (game.upgrades.includes(11)) game.boosters-=16
     }
  }
  if (typeof loadgame.challenge != "undefined") game.challenge = loadgame.challenge
  if (typeof loadgame.challengeCompletion != "undefined") game.challengeCompletion = loadgame.challengeCompletion
  if (typeof loadgame.incrementy != "undefined") game.incrementy = loadgame.incrementy
  if (typeof loadgame.iups != "undefined") game.iups = loadgame.iups
  if (typeof loadgame.buchholz != "undefined") game.buchholz = loadgame.buchholz
  if (typeof loadgame.theme != "undefined") game.theme = loadgame.theme
  if (typeof loadgame.msint != "undefined") game.msint = loadgame.msint
  if (typeof loadgame.maxOrdLength != "undefined") game.maxOrdLength = loadgame.maxOrdLength
  if (typeof loadgame.diagonalizePoint != "undefined") game.diagonalizePoint = EN(loadgame.diagonalizePoint)
  if (typeof loadgame.diagonalizer != "undefined") game.diagonalizer = loadgame.diagonalizer
  if (typeof loadgame.diagonalizeUnlock != "undefined") game.diagonalizeUnlock = loadgame.diagonalizeUnlock
  if (typeof loadgame.diagonalizeSucc != "undefined") game.diagonalizeSucc = loadgame.diagonalizeSucc
  if (typeof loadgame.diagonalizeLim != "undefined") game.diagonalizeLim = loadgame.diagonalizeLim
  if (typeof loadgame.diagonalizeAddProd != "undefined") game.diagonalizeAddProd = loadgame.diagonalizeAddProd
  if (typeof loadgame.diagonalizeFactorShiftKeep != "undefined") game.diagonalizeFactorShiftKeep = loadgame.diagonalizeFactorShiftKeep
  if (typeof loadgame.diagonalizeFactorKeep != "undefined") game.diagonalizeFactorKeep = loadgame.diagonalizeFactorKeep
  if (typeof loadgame.DPMultCost != "undefined") game.DPMultCost = EN(loadgame.DPMultCost)
  if (typeof loadgame.DPGain != "undefined") game.DPGain = EN(loadgame.DPGain)
  if (typeof loadgame.doubleDiagonalizer != "undefined") game.doubleDiagonalizer = loadgame.doubleDiagonalizer
  if (typeof loadgame.factor5Boost != "undefined") game.factor5Boost = loadgame.factor5Boost
  if (typeof loadgame.divsubTab != "undefined") game.divsubTab = loadgame.divsubTab
  if (typeof loadgame.divsubTab != "undefined") game.divsubTab = loadgame.divsubTab
  if (typeof loadgame.diagonalizeChallengeUnlocked != "undefined") game.diagonalizeChallengeUnlocked = loadgame.diagonalizeChallengeUnlocked
  if (typeof loadgame.diagonalizeChallengeUnlocked != "undefined") game.diagonalizeChallenge = loadgame.diagonalizeChallenge
  if (typeof loadgame.diagonalizeChallengeUnlocked != "undefined") game.diagonalizeChallengeCompletion = loadgame.diagonalizeChallengeCompletion
  if (typeof loadgame.diagonalizeChallengeUnlocked != "undefined") game.savedLimAuto = loadgame.savedLimAuto
  if (typeof loadgame.diagonalizeChallengeUnlocked != "undefined") game.savedSuccAuto = loadgame.savedSuccAuto
  console.log(diff)
  loop(diff)
  render()
  updateFactors()
}


function save() {
  localStorage.setItem("ordinalMarkupSave", JSON.stringify(game))
}

function exporty() {
  prompt("Copy and past this save into a safe place",btoa(JSON.stringify(game)))
}

function importy() {
  let loadgame=""
  loadgame=JSON.parse(atob(prompt("Paste in your save WARNING: WILL OVERWRITE YOUR CURRENT SAVE")))
  if (loadgame!="") {
    loadGame(loadgame)
  }
}

render()
updateFactors()

function increment() {
  if (0<=0) {
    if (game.ord % game.base == game.base-1) {
      game.over += 1
    } else {
      game.ord += 1
    }
    clickCoolDown=2
  }
  render()
}


function maximize() {
  if (0<=0) {
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
    clickCoolDown=2
  }
  render()
}

let deltaTime
var calculate = window.setInterval(function() {
  deltaTime = Date.now()-game.lastTick
  loop(deltaTime)
  clickCoolDown -= 1
}, game.msint)

function loop(ms) {
  game.lastTick=Date.now()
  if (game.dynamicUnlock==1) game.dynamic += ms/1000000
  totalMult = factorMult*game.dynamic*(game.upgrades.includes(6)?(10+game.boosters**0.9):1)*bfactorMult*(1+game.diagonalizeAddProd*game.diagonalizer)
  buptotalMute = (game.upgrades.includes(6)?(10+game.boosters**0.9):1)*bfactorMult
  if ((game.succAuto < 10**265 || game.limAuto < 10**265) && !(game.ord>=3**27&&game.base<=3)) {
  if (game.succAuto > 0) {
    game.autoLoop.succ += ms
    if (game.autoLoop.succ >= 1000/(game.succAuto*totalMult)) {
      game.autoLoop.succ -= 1000/(game.succAuto*totalMult)
      increment()
    }
  }
  if (game.limAuto > 0) {
    game.autoLoop.lim += ms
    if (game.autoLoop.lim >= 1000/(game.limAuto*totalMult)) {
      game.autoLoop.lim -= 1000/(game.limAuto*totalMult)
      maximize()
    }
  }
    
  if (game.maxAuto > 0) {
    maxall()
  }
  
  if (game.autoLoop.succ >= 1000/(game.succAuto*totalMult)) {
    if (game.autoLoop.lim >= 1000/(game.limAuto*totalMult)) {
      game.over = 0
      game.ord += Math.min(Math.floor(game.autoLoop.succ/(1000/(game.succAuto*totalMult))),game.base*Math.floor(game.autoLoop.lim/(1000/(game.limAuto*totalMult))))
      game.autoLoop.succ = game.autoLoop.succ % (1000/(game.succAuto*totalMult))
      game.autoLoop.lim = game.autoLoop.lim % (1000/(game.limAuto*totalMult))
    } else {
      if (Math.floor(game.autoLoop.succ/(1000/(game.succAuto*totalMult))) >= game.base-(game.ord % game.base)) {
        game.ord += game.base-(game.ord % game.base)-1
        game.over += Math.floor(game.autoLoop.succ/(1000/(game.succAuto*totalMult)))-(game.base-(game.ord % game.base)-1)
        game.autoLoop.succ = game.autoLoop.succ % (1000/(game.succAuto*totalMult))
      } else {
        game.ord += Math.floor(game.autoLoop.succ/(1000/(game.succAuto*totalMult)))
        game.autoLoop.succ = game.autoLoop.succ % (1000/(game.succAuto*totalMult))
      }
    }
  }} else {
    game.over=0
    game.ord=Math.max(Math.min(game.succAuto,game.limAuto),10**270*4)
  }
  if (game.dynamicUnlock==1) game.dynamic += ms/1000000
  if (game.dynamic>=10) game.dynamic = 10
  if (ms>0) {
  if (game.upgrades.includes(2) && game.autoOn.max==1) {
    game.bAutoLoop.max += ms
    if (game.bAutoLoop.max >= (1000/buptotalMute)) {
      game.bAutoLoop.max -= (1000/buptotalMute)
      if ((game.OP < factorShiftCosts[game.factorShifts] && (game.challenge==0 || game.OP < challengeGoals[game.challenge-1][game.challengeCompletion[game.challenge-1]])) || game.OP >= 10**265) {
      if (game.succAuto==0) buysucc()
      if (game.limAuto==0) buylim()
      maxFactors()
      maxall()
      }
    }
  }
  if (game.upgrades.includes(3) && game.autoOn.inf==1) {
    game.bAutoLoop.inf += ms
    if (game.bAutoLoop.inf >= (1000/buptotalMute)) {
      game.bAutoLoop.inf -= (1000/buptotalMute)
      if (game.OP+game.ord >= 10**265 && game.challenge != 1) infinity()
    }
  }
  if (game.bAutoLoop.max >= (1000/buptotalMute) && game.bAutoLoop.inf >= (1000/buptotalMute)) {
    let bupCom = Math.min(game.bAutoLoop.max/(1000/buptotalMute),game.bAutoLoop.inf/(1000/buptotalMute))
    game.bAutoLoop.max = game.bAutoLoop.max % (1000/buptotalMute)
    game.bAutoLoop.inf = game.bAutoLoop.inf % (1000/buptotalMute)
    if (game.ord+game.OP > 10**265 && game.challenge != 1) game.OP += bupCom*10**270
    if (game.ord+game.OP > 10**265 && game.challenge != 1) game.ord += bupCom*10**270
  }
  }
  if (game.upgrades.includes(7)) {
    partOP += ms*(game.upgrades.includes(5)?5**(game.challenge==1?4:1):1)/50
    game.OP += Math.floor(partOP)
    partOP = partOP % 1
  }
  if (game.upgrades.includes(8)) {
    game.incrementy += game.ord/(10**270)*ms/1000*2**game.iups[1]
  }
  if (game.buchholz==0) {
    ordMarks[0]="ψ(x)"
    ordMarks[1]="ψ(Ωx)"
  } else if (game.buchholz==1) {
    ordMarks[0]="ψ(Ωx)"
    ordMarks[1]="ψ(Ω<sup>2</sup>x)"
  }
  let themeSave="<link rel=\"stylesheet\" href=\"/" + (game.theme==0?"light":"dark") + ".css\">"
  if (document.getElementById("theme").innerHTML != themeSave) document.getElementById("theme").innerHTML = themeSave
  render()
  if (game.factorBoosts < 0) game.factorBoosts=0
  if (game.base<=4) game.dynamicUnlock=1
  if (game.ord>=10000 || game.diagonalizeUnlock == 1) { //Diagonalize Prestige Layer.
document.getElementById("diagonalizeTabButton").style.display="inline-block"
  game.diagonalizeUnlock = 1
} else {
  document.getElementById("diagonalizeTabButton").style.display="none"
}
}

function render() {
  let outSize = fghexp((game.ord % (game.base**3)+0.1)/(game.base**2),Math.pow(2,Math.floor((game.ord % (game.base**2)+0.1)/game.base))*(game.base+game.over+(game.ord % game.base)))
  document.getElementById("hardy").innerHTML="H<sub>" + (game.ord<=10**300?displayOrd(game.ord,game.base,game.over):displayOrd(Math.round(game.ord/(10**270)+1)*10**270-10**270,3)) + "</sub><text class=\"invisible\">l</text>(" + game.base + ")" + (game.ord >= (game.base**3) || outSize >= 10**264 || (game.ord>=5 && game.base==2) ? "" : "=" + beautify(outSize))
  game.canInf = (game.ord >= (game.base**3) || outSize >= 200 || outSize >= Infinity)
  if (game.infUnlock==1) {
    document.getElementById("infinityTabButton").style.display="inline-block"
  } else {
    document.getElementById("infinityTabButton").style.display="none"
  }
  if (game.boostUnlock==1) {
    document.getElementById("boosterTabButton").style.display="inline-block"
    if (game.challenge==0) {
      document.getElementById("factorBoostText").style.display="inline-block"
      document.getElementById("completeChallenge").style.display="none"
    } else {
      document.getElementById("factorBoostText").style.display="none"
      document.getElementById("completeChallenge").style.display="inline-block"
      document.getElementById("finishChallenge").innerHTML="Complete the challenge!<br>" + beautify(challengeGoals[game.challenge-1][game.challengeCompletion[game.challenge-1]]) + " OP"
    }
  } else {
    document.getElementById("boosterTabButton").style.display="none"
    document.getElementById("factorBoostText").style.display="none"
    document.getElementById("completeChallenge").style.display="none"
  }
  if (game.dynamicUnlock==1) {
    document.getElementById("dynamicFactorButton").style.display="inline-block"
  } else {
    document.getElementById("dynamicFactorButton").style.display="none"
  }
  if (game.canInf) {
    infinityButtonText=beautify(calcOrdPoints(game.ord,game.base,game.over)*(game.upgrades.includes(5) && calcOrdPoints(game.ord,game.base,game.over) < 10**265?5:1))
    if (document.getElementById("infinityButton").innerHTML != "Infinity to gain " + infinityButtonText + " Ordinal Points") document.getElementById("infinityButton").innerHTML = "Infinity to gain " + infinityButtonText + " Ordinal Points"
    if (document.getElementById("infinityButton2").innerHTML != "+" + infinityButtonText) document.getElementById("infinityButton2").innerHTML = "+" + infinityButtonText
  } else {
    document.getElementById("infinityButton").innerHTML = "Reach 200 to Infinity"
    document.getElementById("infinityButton2").innerHTML = "Reach 200 to Infinity"
  }
  document.getElementById("challengeSubTab").style.display=(game.upgrades.includes(4) ? "inline-block" : "none")
  document.getElementById("incrementySubTab").style.display=(game.upgrades.includes(8) ? "inline-block" : "none")
  document.getElementById("ordinalPointsDisplay").innerHTML = "You have " + beautify(game.OP) + " Ordinal Points"
  document.getElementById("succAutoAmount").innerHTML = "You have " + logbeautify(game.succAuto) + " successor autobuyer, clicking the successor button " + (game.succAuto>10**265?logbeautify(game.succAuto):beautify(game.succAuto*totalMult)) + " times per second" 
  document.getElementById("limAutoAmount").innerHTML = "You have " + logbeautify(game.limAuto) + "  maximize autobuyer, clicking the maximize button " + (game.succAuto>10**265?logbeautify(game.succAuto):beautify(game.limAuto*totalMult)) + " times per second"
  document.getElementById("buysucc").innerHTML = "Buy Successor Autobuyer for " + (game.challenge==1?(game.succAuto==1?"Infinity":"1.000e6"):beautify(Math.min(10**260+game.succAuto,100*2**game.succAuto))) + " OP"
  document.getElementById("buylim").innerHTML = "Buy Maximize Autobuyer for " + (game.challenge==1?(game.limAuto==1?"Infinity":"1.000e6"):beautify(Math.min(10**260+game.limAuto,100*2**game.limAuto))) + "  OP"
  document.getElementById("factorShift").innerHTML = "Factor Shift (" + game.factorShifts + "): Requires " + (game.factorShifts==7?(game.boostUnlock?"Infinity":"Graham's number (g<sub>ψ(Ω<sup>Ω</sup>ω)</sub> (10))"):beautify(factorShiftCosts[game.factorShifts])) +" OP"
  document.getElementById("noFactors").style.display=(game.factors.length==0 ? "inline-block" : "none")
  document.getElementById("factorList").style.display=(game.factors.length==0 ? "none" : "inline-block")
  document.getElementById("diagonalizeChallenges").style.display=(game.diagonalizeChallengeUnlocked == 1 ? "inline-block" : "none")
  factorMult=1
  if (game.factors.length>0) {
    for(let factorListCounter=0;factorListCounter<game.factors.length;factorListCounter++){ 
      factorMult = factorMult*calcFactor(factorListCounter)
    }
  }
  document.getElementById("factorMult").innerHTML = "Your factors are multiplying your autoclickers by " + factorMult
  document.getElementById("boostersText").innerHTML = "You have " + game.boosters + " boosters"
  document.getElementById("refundBoosters").innerHTML = "Refund back " + calcRefund() + " boosters, but reset all factor shifts"
  document.getElementById("factorBoost").innerHTML = "Factor Boost (" + game.factorBoosts + "): Requires g<sub>" + displayOrd(V(game.factorBoosts+3)) + "</sub> (10) OP"
  document.getElementById("gainBoosters").innerHTML = "Gain " + (game.OP>=V(game.factorBoosts+3)?getFactorBoostGain():(game.factorBoosts+1)) + " Boosters"
  document.getElementById("dynamicMult").innerHTML = "Your Dynamic Multiplier is x" + game.dynamic.toFixed(3)
  document.getElementById("maxAllAuto").innerHTML = "Your Max All Autobuyer is clicking the Max All button " + (game.upgrades.includes(2) && game.autoOn.max==1 ? beautify(buptotalMute) : 0) + " times per second, but only if you can't Factor Shift"
  document.getElementById("infinityAuto").innerHTML = "Your Infinity Autobuyer is clicking the Infinity button " + (game.upgrades.includes(3) && game.autoOn.inf==1 ? beautify(buptotalMute) : 0) + " times per second, but only if you're past " + displayOrd(10**270*4)
  document.getElementById("autoMaxButton").innerHTML = "Max All Autobuyer: " + (game.upgrades.includes(2) ? (game.autoOn.max==1 ? "ON" : "OFF") : "LOCKED")
  document.getElementById("autoInfButton").innerHTML = "Infinity Autobuyer: " + (game.upgrades.includes(3) ? (game.autoOn.inf==1 ? "ON" : "OFF") : "LOCKED")
  document.getElementById("bup6 current").innerHTML = (10+game.boosters**0.9).toFixed(2)
  document.getElementById("runChal").innerHTML = (game.challenge==0?"You're currently not in a challenge":"You're currently running Challenge "+game.challenge)
  document.getElementById("incrementyText").innerHTML = "You have "+beautify(game.incrementy)+" incrementy, multiplying autobuyers by x"+((Math.log10(10+game.incrementy)**(1.05**game.iups[0]))*1.2**game.iups[2]).toFixed(3)
  document.getElementById("incrementyText2").innerHTML = "You are getting " + beautify(game.ord/(10**270)*2**game.iups[1]) + " incrementy per second"
  document.getElementById("iup1").innerHTML = "Raise multipliers to the 1.05<br><br>Cost: " + beautify(10**(5*(game.iups[0]+1)))
  document.getElementById("iup2").innerHTML = "Double production of incrementy<br><br>Cost: " + beautify(10**(3*(game.iups[1]+1)))
  document.getElementById("iup3").innerHTML = "Multiply multiplier by 1.2<br><br>Cost: " + beautify(10**(9*(game.iups[2]+1)))
  document.getElementById("changeOrdNotation").innerHTML = "Current Ordinal Notation: " + (game.buchholz == 1 ? "Buchholz's" : "Madore's")
  document.getElementById("changeTheme").innerHTML = "Current Theme: " + (game.theme == 1 ? "Dark" : "Light")
  document.getElementById("changeInt").innerHTML = "Millisecond Interval: " + game.msint + "ms"
  document.getElementById("changeOrdLengthLess").innerHTML = "Maximum Ordinal Length below " + displayOrd(10**270*4) + ": " + game.maxOrdLength.less
  document.getElementById("changeOrdLengthMore").innerHTML = "Maximum Ordinal Length above " + displayOrd(10**270*4) + ": " + game.maxOrdLength.more
  document.getElementById("buyDiagonalizer").innerHTML = "Gain 1 diagonalizer<br>Cost: " + beautify(2**game.diagonalizer) + " DP"
document.getElementById("buyDiagonalizeSucc").innerHTML = "Permanently gain 1 successor autobuyer<br>Cost: " + beautify(getDiagonalizeSuccessorCost()) + " DP"
document.getElementById("buyDiagonalizeLim").innerHTML = "Permanently gain 1 maximize autobuyer<br>Cost: " + beautify(getDiagonalizeLimCost()) + " DP"
document.getElementById("buyAdditiveProduction").innerHTML = "Each diagonalizer gives a +100% additive production boost<br>" + (game.diagonalizeAddProd == 1 ?"Bought":"Cost: 3 DP")
document.getElementById("keepFactorShifts").innerHTML = "Keep Factor Shifts on Diagonalize<br>" + (game.diagonalizeFactorShiftKeep == 1 ?"Bought":"Cost: 6 DP")
document.getElementById("keepFactors").innerHTML = "Keep Factors on Diagonalize<br>" + (game.diagonalizeFactorKeep == 1 ?"Bought":"Cost: 6 DP")
document.getElementById("DPGainMult").innerHTML = "Multiply DP gain by 1.5<br>" + "Cost: " + game.DPMultCost + " DP"
document.getElementById("doubleDiagonalizer").innerHTML = "Diagonalizers are twice as effective<br>" + (game.doubleDiagonalizer==1?"Bought":"Cost: 200 DP")
document.getElementById("factor5Boost").innerHTML = "Factors 1 to 4 multiply Factor 5 and above<br>" + (game.factor5Boost==1?"Bought":"Cost: 1000 DP")
  document.getElementById("diagonalizerText").innerHTML = "You have " + game.diagonalizePoint + " Diagonalize Points and " + game.diagonalizer + " diagonalizer"
  document.getElementById("currentDiagonalizerBase").innerHTML = (game.diagonalizer*(1+game.doubleDiagonalizer) >= 8?Math.round(500*1.1**(game.diagonalizer*(1+game.doubleDiagonalizer)-8)):100+game.diagonalizer*(1+game.doubleDiagonalizer)*50)
  document.getElementById("diagonalizeButton").innerHTML = "Diagonalize for " + calculateDP() + " Diagonalizer Points"
  document.getElementById("buyDiagonalizer").innerHTML = "Gain 1 diagonalizer<br>Cost: " + beautify(2**game.diagonalizer) + " DP"
document.getElementById("buyDiagonalizeSucc").innerHTML = "Permanently gain 1 successor autobuyer<br>Cost: " + beautify(getDiagonalizeSuccessorCost()) + " DP"
document.getElementById("buyDiagonalizeLim").innerHTML = "Permanently gain 1 maximize autobuyer<br>Cost: " + beautify(getDiagonalizeLimCost()) + " DP"
  document.getElementById("buyAdditiveProduction").innerHTML = "Each diagonalizer gives a +100% additive production boost<br>" + (game.diagonalizeAddProd == 1 ?"Bought":"Cost: 3 DP")

  let bfactor
  bfactorMult = 1
  for (let i=0;i<4;i++) {
    bfactor = (((1+(game.factors.length >= i+1?game.factors[i]+(game.upgrades.includes(11)?3:0):0))*(game.upgrades.includes(1) && game.factors.length >= i+1?2:1))**(challengeCurve[game.challengeCompletion[i]]))
    if (game.challenge==2 && i==0) bfactor = 1
    bfactorMult *= bfactor
    document.getElementById("challenge" + (i+1) + "Effect").innerHTML = "x" + bfactor.toFixed(2) + " ("+game.challengeCompletion[i]+"/3)"
    document.getElementById("challenge" + (i+1) + "Goal").innerHTML = "Goal: " + beautify(challengeGoals[i][game.challengeCompletion[i]]) + " OP"
    chalbut(i)
  }
  for(let i=0;i<bupUpgradeCosts.length;i++) {
    bup(i+1,1)
  }
  iup(1,1)
  iup(2,1)
  iup(3,1)
}

function calcFactor(x) {
  return (1+game.factors[x]+(game.upgrades.includes(11)?3*(game.challenge==3?2:1):0))*(game.upgrades.includes(1)?2:1)*(game.factor5Boost == 1 && x >= 4 ?calcFactor(0)*calcFactor(1)*calcFactor(2)*calcFactor(3):1)
}

function buyFactor5Boost() {
  if (game.diagonalizePoint.greaterThanOrEqualTo(1000) && game.factor5Boost == 0) {
    game.diagonalizePoint = game.diagonalizePoint.sub(1000)
    game.factor5Boost = 1
  }
}

function buyDoubleDiagonalizer() {
  if (game.diagonalizePoint.greaterThanOrEqualTo(200) && game.doubleDiagonalizer == 0) {
    game.diagonalizePoint = game.diagonalizePoint.sub(200)
    game.doubleDiagonalizer = 1
  }
}

function buyDPMult() {
  if (game.diagonalizePoint.greaterThanOrEqualTo(game.DPMultCost)) {
    game.diagonalizePoint = game.diagonalizePoint.sub(game.DPMultCost)
    game.DPGain = game.DPGain.times(1.5)
    game.DPMultCost = game.DPMultCost.times(10)
  }
}

function buyKeepFactorShifts() {
    if (game.diagonalizePoint.greaterThanOrEqualTo(6) && game.diagonalizeFactorShiftKeep == 0) {
    game.diagonalizePoint = game.diagonalizePoint.sub(6)
    game.diagonalizeFactorShiftKeep = 1
  }
}

function buyKeepFactors() {
    if (game.diagonalizePoint.greaterThanOrEqualTo(6) && game.diagonalizeFactorKeep == 0) {
    game.diagonalizePoint = game.diagonalizePoint.sub(6)
    game.diagonalizeFactorKeep = 1
  }
}

function buyAdditiveProduction() {
  if (game.diagonalizePoint.greaterThanOrEqualTo(3) && game.diagonalizeAddProd == 0) {
    game.diagonalizePoint = game.diagonalizePoint.sub(3)
    game.diagonalizeAddProd = 1
  }
}

function buyDiagonalizer() {
  if (game.diagonalizePoint.greaterThanOrEqualTo(2**game.diagonalizer)) {
    game.diagonalizePoint = game.diagonalizePoint.sub(2**game.diagonalizer)
    game.diagonalizer += 1
  }
}

function getDiagonalizeSuccessorCost() {
  return Math.floor((game.diagonalizeSucc > 10 ? 2.5 : 2) ** (game.diagonalizeSucc / 10))
}

function getDiagonalizeLimCost() {
  return Math.floor((game.diagonalizeLim > 10 ? 2.5 : 2) ** (game.diagonalizeLim / 10))
}

function buyDiagonalizeSuccessor() {
  if (game.diagonalizeChallenge != 1 && game.diagonalizePoint.greaterThanOrEqualTo(getDiagonalizeSuccessorCost())) {
    game.diagonalizePoint = game.diagonalizePoint.sub(getDiagonalizeSuccessorCost())
    game.succAuto += 1
    game.diagonalizeSucc += 1
  }
}

function buyDiagonalizeLim() {
  if (game.diagonalizeChallenge != 1 && game.diagonalizePoint.greaterThanOrEqualTo(getDiagonalizeLimCost())) {
    game.diagonalizePoint = game.diagonalizePoint.sub(getDiagonalizeLimCost())
    game.limAuto += 1
    game.diagonalizeLim += 1
  }
}

function buyDiagonalizeChallenges() {
  if (game.diagonalizePoint.greaterThanOrEqualTo(10000)) {
    if (game.diagonalizeChallengeUnlocked == 0) {
    game.diagonalizePoint = game.diagonalizePoint.sub(10000)
    game.diagonalizeChallengeUnlocked = 1
        }
  }
}

function diagonalize() {
  if (calculateDP()>=1) {
    if (diagonalizeSeconds<=0.2) {
    game.diagonalizePoint = game.diagonalizePoint.add(calculateDP())
    game.ord=0
    game.over=0
    game.canInf=false
    game.OP=0
    game.succAuto= 0 + game.diagonalizeSucc
    game.limAuto= 0 + game.diagonalizeLim
    game.autoLoop={succ: 0, lim: 0}
    diagonalizeSeconds = 5
    if (game.diagonalizeFactorKeep == 1) {
      //This does nothing, so you keep your factors on diagonalize.
    } else {
    game.factors=[]
    }
    if (game.diagonalizeFactorShiftKeep == 1) {
        //This does nothing, so you keep your factor shifts on diagonalize.
      if (game.diagonalizeFactorKeep == 0) {
      game.factors=[]
      for (let i=0;i<game.factorShifts;i++) {
        game.factors.push(0)
      }}
        } else {
    game.factorShifts = 0
    }
    game.dynamic=1
    game.challenge=0
  }
  }
  render()
  updateFactors()
}

function autoDiagonalize() { //Working on it...
  game.autoDiagonalizer++
  if (game.autoDiagonalizer>=2) {
    game.autoDiagonalizer = 0;
  }
}

function changeInt() {
  let newms = prompt("Please type in the new millisecond interval (20≤x≤1000)")
  if (20<=Number(newms) && Number(newms)<=1000 && (!isNaN(Number(newms)))) {
    game.msint = Math.round(Number(newms))
    save()
    location.reload()
  }
}

function changeOrdLengthLess() {
  let newms = prompt("Please type in the new max length. Type in 0 for no maximum")
  if (!isNaN(Number(newms))) {
    game.maxOrdLength.less = Math.round(Number(newms))
  }
}

function changeOrdLengthMore() {
  let newms = prompt("Please type in the new max length. Type in 0 for no maximum")
  if (!isNaN(Number(newms))) {
    game.maxOrdLength.more = Math.round(Number(newms))
  }
}

function changeTheme() {game.theme = (game.theme + 1)%2}
function changeOrdNotation() {game.buchholz = (game.buchholz + 1)%2}

function iup(n,spectate=0) {
  document.getElementById("iup" + n).classList.remove("boosterButton")
  document.getElementById("iup" + n).classList.remove("locked")
  if (n<=3) {
    if (game.incrementy >= iupCosts[n-1]**(game.iups[n-1]+1)) {
      if (spectate==0) {
      game.iups[n-1] += 1
      game.incrementy -= iupCosts[n-1]**game.iups[n-1]
      } else {
        document.getElementById("iup" + n).classList.add("boosterButton")
      }
    } else {
      document.getElementById("iup" + n).classList.add("locked")
    }
  }
}

function getFactorBoostGain() {
  let fbgg = game.factorBoosts
  let fbg = 0
  for (let j=0;j<getFactorBulk();j++) {
    fbgg += 1
    fbg += fbgg
  }
  return fbg
}

function getFactorBulk() {
  if (game.OP>=V(game.factorBoosts+3)) {
    let i=1
    while (game.OP>=V(game.factorBoosts+3+i) || game.factorBoosts+3+i>=28) {
      i++
    }
    return i
  } else {
    return 0
  }
}

function completeChallenge() {
  if (game.OP>=challengeGoals[game.challenge-1][game.challengeCompletion[game.challenge-1]]) {
    game.ord=0
    game.over=0
    game.canInf=false
    game.OP=0
    game.succAuto=0
    game.limAuto=0
    game.autoLoop={succ: 0, lim: 0}
    game.factorShifts = 0
    game.base = 100
    game.factors=[]
    game.boostUnlock=1
    game.dynamic=1
    game.challengeCompletion[game.challenge-1] += 1
    game.challenge=0
    game.incrementy=0
  }
}

function chalbut(i) {
  document.getElementById("challenge"+(i+1)).classList.remove("boosterButton")
  document.getElementById("challenge"+(i+1)).classList.remove("bought")
  document.getElementById("challenge"+(i+1)).classList.remove("running")
  if (game.challenge==(i+1)) {
    document.getElementById("challenge"+(i+1)).classList.add("running")
  } else if (game.challengeCompletion[i]>=3) {
    document.getElementById("challenge"+(i+1)).classList.add("bought")
  } else {
    document.getElementById("challenge"+(i+1)).classList.add("boosterButton")
  }
}

function factorBoost() {
  if (game.OP>=V(game.factorBoosts+3)) {
    game.ord=0
    game.over=0
    game.canInf=false
    game.OP=0
    game.succAuto= 0 + game.diagonalizeSucc
    game.limAuto= 0 + game.diagonalizeSucc
    game.autoLoop={succ: 0, lim: 0}
    game.factorShifts = 0
    game.base = 10
    game.factors=[]
    game.boostUnlock=1
    game.factorBoosts += 1
    game.boosters += game.factorBoosts
    game.dynamic=1
    game.challenge=0
    game.incrementy=0
  }
}

function refund() {
  game.boosters += calcRefund()
  let rightrow = []
  if (game.upgrades.includes(4)) rightrow.push(4)
  if (game.upgrades.includes(8)) rightrow.push(8)
  if (game.upgrades.includes(12)) rightrow.push(12)
  if (game.upgrades.includes(16)) rightrow.push(16)
  game.upgrades = rightrow
  for (let i=0;i<bupUpgradeCosts.length;i++) {
    document.getElementById("bup" + (i+1)).classList.remove("canbuy")
    document.getElementById("bup" + (i+1)).classList.remove("bought")
    document.getElementById("bup" + (i+1)).classList.add("locked")
  }
  game.ord=0
  game.over=0
  game.canInf=false
  game.OP=0
  game.succAuto=0
  game.limAuto=0
  game.autoLoop={succ: 0, lim: 0}
  game.factorShifts = 0
  game.base = 10
  game.factors=[]
  game.boostUnlock=1
  game.dynamic=1
  game.challenge=0
  game.incrementy=0
}

function calcRefund() {
  let refundBoost = 0
  for(let i=0;i<bupUpgradeCosts.length;i++) {
    refundBoost += (game.upgrades.includes(i+1) && i%4 != 3 ? bupUpgradeCosts[i] : 0)
  }
  return refundBoost
}

function bup(x,spectate=0) {
  document.getElementById("bup" + (x)).classList.remove("canbuy")
  document.getElementById("bup" + (x)).classList.remove("bought")
  document.getElementById("bup" + (x)).classList.add("locked")
  if (!game.upgrades.includes(x)) {
    if (game.boosters>=bupUpgradeCosts[x-1]) {
      if (x<4.5||game.upgrades.includes(x-4)) {
        if (spectate==0) {
          if (x%4 != 0) game.boosters -= bupUpgradeCosts[x-1]
          game.upgrades.push(x)
          document.getElementById("bup" + (x)).classList.remove("canbuy")
          document.getElementById("bup" + (x)).classList.add("bought")
          document.getElementById("bup" + (x)).classList.remove("locked")
        }  else {
          document.getElementById("bup" + (x)).classList.add("canbuy")
          document.getElementById("bup" + (x)).classList.remove("bought")
          document.getElementById("bup" + (x)).classList.remove("locked")
        }
      }
    }
  } else {
    document.getElementById("bup" + (x)).classList.remove("canbuy")
    document.getElementById("bup" + (x)).classList.add("bought")
    document.getElementById("bup" + (x)).classList.remove("locked")
  }
}

function logbeautify(number) {
  if (beautify(number)=="10^^10") {
    return "10^^9"
  } else if (beautify(number)=="10^^100") {
    return "10^^99"
  } else {
    return beautify(number)
  }
}

function updateFactors() {
  if (game.factors.length>=0) {
    let factorListHTML=""
    for(let factorListCounter=0;factorListCounter<game.factors.length;factorListCounter++){
      factorListHTML = factorListHTML + "<li>Factor " + (factorListCounter+1) + " x" + calcFactor(factorListCounter) + " <button onclick=\"buyFactor(" + factorListCounter + ")\" class=\"infinityButton\">Increase Factor " + (factorListCounter+1) + " for " + beautify(Math.pow(10**(factorListCounter+1),Math.pow(factorCostExp[factorListCounter],game.factors[factorListCounter]))) + " OP</button></li>"
    }
    document.getElementById("factorListMain").innerHTML=factorListHTML
  }
}

function buysucc() {
  if (game.challenge==1) {
    if (game.OP>=1000000 && game.succAuto==0) {
      game.OP-=1000000
      game.succAuto += 1
    }
  } else {
    if (game.OP>=100*2**game.succAuto && game.OP<10**265) {
      game.OP-=100*2**game.succAuto
      game.succAuto += 1
    } else if (game.OP>10**265) {
      game.succAuto=game.OP
    }
  }
  render()
}

function buylim() {
  if (game.challenge==1) {
    if (game.OP>=1000000 && game.limAuto==0) {
      game.OP-=1000000
      game.limAuto += 1
    }
  } else {
    if (game.OP>=100*2**game.limAuto && game.OP<10**265) {
      game.OP-=100*2**game.limAuto
      game.limAuto += 1
    } else if (game.OP>10**265) {
      game.limAuto=game.OP
    }
  }
  render()
}

function maxall() {
  let bulk=0
  if (game.challenge==1) {
    buysucc()
    buylim()
  } else {
    if (game.OP<10**265) {
      buysucc()
      buylim()
      bulk=Math.floor(Math.log(1+game.OP/(100*2**game.succAuto))/Math.log(2))
      game.OP -= ((2**bulk)-1)*(100*2**game.succAuto)
      game.succAuto += bulk
      bulk=Math.floor(Math.log(1+game.OP/(100*2**game.limAuto))/Math.log(2))
      game.OP -= ((2**bulk)-1)*(100*2**game.limAuto)
      game.limAuto += bulk
    } else {
      game.succAuto=game.OP
      game.limAuto=game.OP
    }
  }
}

function infinity() {
  if (game.canInf) {
    if (calcOrdPoints(game.ord,game.base,game.over)>=10**265) {
      game.OP = Math.max(game.OP,calcOrdPoints(game.ord,game.base,game.over))
    } else {
      game.OP += calcOrdPoints(game.ord,game.base,game.over)*(game.upgrades.includes(5)?5:1)
    }
    game.ord = 0
    game.over = 0
    document.getElementById("infinityTabButton").style.display="inline-block"
    game.infUnlock = 1
    game.dynamic=1
  }
  loop(0)
  render()
}

function displayOrd(ord,base=3,over=0,trim=10+1000,large=0,multoff=0) {
  if (ord<base && large==0 || isNaN(ord)) {
    return ord+over
  } else if ((ord<3**27 || base>3) && large==0) {
    let tempvar = Math.floor(Math.log(ord+0.1)/Math.log(base))
    let tempvar2 = Math.pow(base,tempvar)
    let tempvar3 = Math.floor((ord+0.1)/tempvar2)
    return "ω" + (tempvar==1 ? "" : "<sup>" + displayOrd(tempvar,base,0) + "</sup>") + (tempvar3==1 ? "" : tempvar3) + (ord-tempvar2*tempvar3+over==0 || trim==0 ? (ord-tempvar2*tempvar3+over==0 ? "": "+...") : "+" + displayOrd(ord-tempvar2*tempvar3,base,over,trim-1))
  } else if (ord<4*10**270) {
    return (multoff==0 ? ["ω","ω<sup>2</sup>","ω<sup>ω</sup>","ω<sup>ω<sup>2</sup></sup>",ordMarks[0].replace("x","")][Math.max(0,Math.floor((ord+10**268)/(10**270)))] : ["1","ω","ω<sup>ω</sup>","ω<sup>ω<sup>2</sup></sup>",ordMarks[0].replace("x","")][Math.max(0,Math.floor((ord+10**268)/(10**270)))])
  } else {
    let tempvar = Math.floor(Math.log((ord+10**268)/(4*10**270))/Math.log(3))
    if (tempvar<0) tempvar = 0
    tempvar = Math.round(tempvar)
    let tempvar2 = displayOrd(ord-((3**tempvar)*4*10**270),base,over,trim-0.8,1,ordMarks[tempvar][ordMarks[tempvar].length-2]=="x")
    return ordMarks[tempvar].replace("x",(trim<=0?"...":(tempvar2=="1"?"":tempvar2)))
  }
}

function fghexp(times, on) {
  if (times<1) {
    return on
  } else {
    return fghexp(times-1,Math.pow(2,on)*on)
  }
}

function beautify(number) {
  if (number==Infinity) {
    return "Infinity"
  } else if (10**265 > number) {
  let exponent = Math.floor(Math.log10(number+0.1))
  let mantissa = number / Math.pow(10, exponent)
  if (exponent < 6) return Math.round(number)
  if (mantissa.toFixed(3)=="10.000") return "9.999e" + exponent
  return mantissa.toFixed(3) + "e" + exponent
  } else {
    return "g<sub>" + displayOrd(number-10**270,3) + "</sub> (10)"
  }
}

function calcOrdPoints(ord,base,over) {
  if (!(ord>3**27 && base<=3)) {
    if (ord<base) {
      return ord+over
    } else {
      let tempvar = Math.floor(Math.log(ord+0.1)/Math.log(base))
      let tempvar2 = Math.pow(base,tempvar)
      let tempvar3 = Math.floor((ord+0.1)/tempvar2)
      let tempvar4 = (game.diagonalizer*(game.doubleDiagonalizer+1) >= 8?Math.round(500*1.1**(game.diagonalizer*(game.doubleDiagonalizer+1)-8)):100+game.diagonalizer*(game.doubleDiagonalizer+1)*50)
      return Math.min(10**270,tempvar4**calcOrdPoints(tempvar,base,0)*tempvar3+calcOrdPoints(ord-tempvar2*tempvar3,base,over))
    }
  } else {
    return Math.round(ord/(10**270)+1)*10**270
  }
}

function Tab(t) {
  document.getElementById("Tab1").style.display="none"
  document.getElementById("Tab2").style.display="none"
  document.getElementById("Tab3").style.display="none"
  document.getElementById("Tab4").style.display="none"
  document.getElementById("Tab5").style.display="none"
  document.getElementById("Tab6").style.display="none"
  document.getElementById("Tab7").style.display="none"
  document.getElementById("Tab" + t).style.display="inline-block"
  subTab(game.subTab)
  bsubTab(game.bsubTab)
  divsubTab(game.divsubTab)
}

function subTab(t) {
  document.getElementById("subTab1").style.display="none"
  document.getElementById("subTab2").style.display="none"
  document.getElementById("subTab3").style.display="none"
  document.getElementById("subTab" + t).style.display="inline-block"
  game.subTab=t
}
function bsubTab(t) {
  document.getElementById("bsubTab1").style.display="none"
  document.getElementById("bsubTab2").style.display="none"
  document.getElementById("bsubTab3").style.display="none"
  document.getElementById("bsubTab" + t).style.display="inline-block"
  game.bsubTab=t
}

function divsubTab(t) {
  document.getElementById("divsubTab1").style.display="none"
  document.getElementById("divsubTab2").style.display="none"
  document.getElementById("divsubTab" + t).style.display="inline-block"
  game.divsubTab=t
}

var autoSave = window.setInterval(function() {
  save()
}, 2000)

function resetConf() {
  let code = prompt("Are you sure you want to delete all of your progress? Type in \"yes\" to reset all of your progress.")
  if (code.toLowerCase()=="yes") reset()
}

function maxFactors() {
  if (game.challenge != 2) {
    for(let i=0;i<game.factors.length;i++)
      while (game.OP >= (Math.pow(10**(i+1),Math.pow(factorCostExp[i],game.factors[i])))) buyFactor(i)
  }
}

function factorShift() {
  if (game.OP>=factorShiftCosts[game.factorShifts]) {
    if (game.base>3) {
      game.ord=0
      game.over=0
      game.canInf=false
      game.OP=0
      if (game.diagonalizeChallenge != 1) {
      game.succAuto= 0 + game.diagonalizeSucc
      game.limAuto= 0 + game.diagonalizeLim
      }
      game.autoLoop={succ: 0, lim: 0}
      game.factorShifts += 1
      game.factors=[]
      game.dynamic=1
      for(let i=0;i<game.factorShifts;i++) {
        game.factors.push(0)
      }
    } else {
      if (game.boostUnlock==0) {
      game.dynamic=1
      game.ord=0
      game.over=0
      game.canInf=false
      game.OP=0
      if (game.diagonalizeChallenge != 1) {
      game.succAuto= 0 + game.diagonalizeSucc
      game.limAuto= 0 + game.diagonalizeLim
      }
      game.autoLoop={succ: 0, lim: 0}
      game.factorShifts = 0
      game.base = 100
      game.factors=[]
      game.boostUnlock=1
      game.boosters += 1
      game.factorBoosts += 1
      game.challenge=0
      game.incrementy=0
      }
    }
  }
  render()
  updateFactors()
}

function buyFactor(n) {
  if (game.OP >= (Math.pow(10**(n+1),Math.pow(factorCostExp[n],game.factors[n]))) && game.challenge != 2) {
    if (game.OP<10**265) game.OP -= (Math.pow(10**(n+1),Math.pow(factorCostExp[n],game.factors[n])))
    game.factors[n] += 1
  }
  render()
  updateFactors()
}

function debug() {
  game.ord=0
  game.over=0
  game.canInf=false
  game.OP=0
  game.succAuto=0
  game.limAuto=0
  game.autoLoop={succ: 0, lim: 0}
  game.factorShifts = 7
  game.base = 100
  game.factors=[9,8,7,4,4,3,2]
  game.infUnlock = 1
  game.dynamic=1
  game.challenge=0
  render()
  updateFactors()
  document.getElementById("infinityTabButton").style.display="inline-block"
}

function revertToPreBooster() {
  game.ord=0
  game.over=0
  game.canInf=false
  game.OP=10**270*5
  game.succAuto=0
  game.limAuto=0
  game.autoLoop={succ: 0, lim: 0}
  game.factorShifts = 7
  game.base = 100
  game.factors=[9,8,7,4,4,3,2]
  game.infUnlock = 1
  game.dynamic=1
  game.challenge=0
  render()
  updateFactors()
  document.getElementById("infinityTabButton").style.display="inline-block"
}

function V(n) {
  if (n<27) {
    let tempvar=0
    let tempvar2=0
    while (tempvar<n) {
      if (ordMarks[tempvar2][ordMarks[tempvar2].length-2]=="x") {
        tempvar++
      }
      tempvar2++
    }
    tempvar2--
    return 3**tempvar2*4*10**270
  } else {
    return V(26)*243
  }
}

function toggleAutoMax() {
  if (game.upgrades.includes(2)) {
    game.autoOn.max=1-game.autoOn.max
  }
  render()
}

function toggleAutoInf() {
  if (game.upgrades.includes(3)) {
    game.autoOn.inf=1-game.autoOn.inf
  }
  render()
}

function calculateDP() {
  return Math.floor(Math.sqrt(game.ord/10000)*game.DPGain)
}

function exitChallenge() {
  if (game.challenge > 0) {
    game.ord=0
    game.over=0
    game.canInf=false
    game.OP=0
    game.succAuto=0
    game.limAuto=0
    game.autoLoop={succ: 0, lim: 0}
    game.factorShifts = 0
    game.base = 100
    game.factors=[]
    game.boostUnlock=1
    game.dynamic=1
    game.challenge=0
    game.incrementy=0
  }
}

function exitDiagonalizeChallenge() {
  if (game.diagonalizeChallenge > 0) {
    game.ord=0
    game.over=0
    game.canInf=false
    game.OP=0
    game.autoLoop={succ: 0, lim: 0}
    game.factorShifts = 0
    game.base = 100
    game.factors=[]
    game.dynamic=1
    game.diagonalizeChallenge=0
    game.incrementy=0
    game.limAuto=game.savedLimAuto
    game.savedLimAuto=0
    game.succAuto=game.savedSuccAuto
    game.savedSuccAuto=0
  }
}

function enterChallenge(c) {
  if (game.challenge == 0 && game.challengeCompletion[c-1] != 3) {
    game.ord=0
    game.over=0
    game.canInf=false
    game.OP=0
    game.succAuto=0
    game.limAuto=0
    game.autoLoop={succ: 0, lim: 0}
    game.factorShifts = 0
    game.base = 100
    game.factors=[]
    game.boostUnlock=1
    game.dynamic=1
    game.challenge=c
    game.incrementy=0
  }
}

function enterDiagonalizeChallenge(c) {
  if (game.diagonalizeChallenge == 0) {
    game.ord=0
    game.over=0
    game.canInf=false
    game.OP=0
    game.autoLoop={succ: 0, lim: 0}
    game.factorShifts = 0
    game.base = 100
    game.factors=[]
    game.dynamic=1
    game.diagonalizeChallenge=c
    game.incrementy=0
    if (game.diagonalizeChallenge=1) {
    game.savedLimAuto=game.limAuto
    game.limAuto=0
    game.savedSuccAuto=game.succAuto
    game.succAuto=0
    }
  }
}

function completeDiagonalizeChallenge() {
  if (game.diagonalizeChallenge == 1 && game.OP >= game.diagonalizeChallengeGoals[0] && (game.diagonalizeChallengeCompletion[0] == 0||typeof game.diagonalizeChallengeCompletion[0] == "undefined")) {
  exitDiagonalizeChallenge()
  document.getElementById("diagonalizeChallenge1Complete").innerHTML = "Yes."
  game.diagonalizeChallengeCompletion[0] = 1
  }
}
//Code "borrowed" from https://tonnygaric.com/blog/create-a-seconds-countdown-in-6-lines-of-javascript
var diagonalizeSeconds = document.getElementById("countdown").textContent;
var countdown = setInterval(function() {
    diagonalizeSeconds-=0.1;
    diagonalizeSeconds*=10
    diagonalizeSeconds = Math.round(diagonalizeSeconds)
    diagonalizeSeconds/=10
    document.getElementById("countdown").textContent = diagonalizeSeconds;
    //if (diagonalizeSeconds <= 0.1) diagonalizeSeconds=0.1;
    //if (game.autoDiagonalizer = 1) {
    //if (diagonalizeSeconds = 0.1) {
    //diagonalize()
    //}
      //}
}, 100);
//End "borrowed" code.

function setMarks() {
ordMarks = [
  "ψ(Ωx)",
  "ψ(Ω<sup>2</sup>x)",
  "ψ(Ω<sup>x</sup>)",
  "ψ(Ω<sup>Ω</sup>x)",
  "ψ(Ω<sup>Ω+1</sup>x)",
  "ψ(Ω<sup>Ω+2</sup>x)",
  "ψ(Ω<sup>Ω+x</sup>)",
  "ψ(Ω<sup>Ω2</sup>x)",
  "ψ(Ω<sup>Ω2+1</sup>x)",
  "ψ(Ω<sup>Ω2+2</sup>x)",
  "ψ(Ω<sup>Ω2+x</sup>)",
  "ψ(Ω<sup>Ωx</sup>)",
  "ψ(Ω<sup>Ω<sup>2</sup></sup>x)",
  "ψ(Ω<sup>Ω<sup>2</sup>+1</sup>x)",
  "ψ(Ω<sup>Ω<sup>2</sup>+2</sup>x)",
  "ψ(Ω<sup>Ω<sup>2</sup>+x</sup>)",
  "ψ(Ω<sup>Ω<sup>2</sup>+Ω</sup>x)",
  "ψ(Ω<sup>Ω<sup>2</sup>+Ω+1</sup>x)",
  "ψ(Ω<sup>Ω<sup>2</sup>+Ω+2</sup>x)",
  "ψ(Ω<sup>Ω<sup>2</sup>+Ω+x</sup>)",
  "ψ(Ω<sup>Ω<sup>2</sup>+Ω2</sup>x)",
  "ψ(Ω<sup>Ω<sup>2</sup>+Ω2+1</sup>x)",
  "ψ(Ω<sup>Ω<sup>2</sup>+Ω2+2</sup>x)",
  "ψ(Ω<sup>Ω<sup>2</sup>+Ω2+x</sup>)",
  "ψ(Ω<sup>Ω<sup>2</sup>+Ωx</sup>)",
  "ψ(Ω<sup>Ω<sup>2</sup>2</sup>x)",
  "ψ(Ω<sup>Ω<sup>2</sup>2+1</sup>x)",
  "ψ(Ω<sup>Ω<sup>2</sup>2+2</sup>x)",
  "ψ(Ω<sup>Ω<sup>2</sup>2+x</sup>)",
  "ψ(Ω<sup>Ω<sup>2</sup>2+Ω</sup>x)",
  "ψ(Ω<sup>Ω<sup>2</sup>2+Ω+1</sup>x)",
  "ψ(Ω<sup>Ω<sup>2</sup>2+Ω+2</sup>x)",
  "ψ(Ω<sup>Ω<sup>2</sup>2+Ω+x</sup>)",
  "ψ(Ω<sup>Ω<sup>2</sup>2+Ω2</sup>x)",
  "ψ(Ω<sup>Ω<sup>2</sup>2+Ω2+1</sup>x)",
  "ψ(Ω<sup>Ω<sup>2</sup>2+Ω2+2</sup>x)",
  "ψ(Ω<sup>Ω<sup>2</sup>2+Ω2+x</sup>)",
  "ψ(Ω<sup>Ω<sup>2</sup>2+Ωx</sup>)",
  "ψ(Ω<sup>Ω<sup>2</sup>x</sup>)",
  "ψ(Ω<sup>Ω<sup>x</sup></sup>)",
  "BHO"
]
}


