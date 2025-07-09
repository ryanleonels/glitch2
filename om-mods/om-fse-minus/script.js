//Yeah, I know it's pretty unorganized at the moment

let factorMult = 1
let bfactorMult = 1
let succAutoMult = 1
let limAutoMult = 1
let ordMarks=[]
let numMarks=[]
const get = x => document.getElementById(x)
setMarks()
let clickCoolDown = 0
let infinityButtonText = 0
let game
let factorShiftCosts=[200, 1000, 10000, 350000, 1e12, 1e25, 1e+50, 1e100, 1e200]
let factorCostExp=[2,2,2,3,3,6,30]
const bupUpgradeCosts=[1,1,1,NaN,14,2,1,NaN,151,1,2,NaN,32,20,50,NaN]
const pupUpgradeCosts=
  [1,24,5e14,3e15,2e16,
   1,3, 8,1000,2000000,
   1,6, 5e10,5e11,2e14,
   1,3, 9,  100, 0]
const dupUpgradeCosts=[1,1,1,3,6,6,200,100000,10]
const dupCostScale=[2,1.1,1.1,Infinity,Infinity,Infinity,Infinity,Infinity,10]
const slugMile=[10**10,20,15,12,10,8,6,5,4,3,2,1,-1]
let totalMult = 1
let buptotalMute = 1
const challengeGoals=[[10**32,10**223,10**270*5],[10**270*5,V(10)+10**270,V(17)+10**270],[10**200,10**214,1e256],[10**33,5e113,1.5e119],[10**122,3.33e136,6.9e207],[1.02e33,1e44,4.75e108],[1.05e13,4.18e18,1.02e20],[3.000e10,6.00e10,1.2e11,1.2e11]]
const challengeCurve=[0,0.5,0.75,1]
let partOP = 0
let collapseAnimation = 0
const iupCosts=[10**5,10**3,10**9,10**17,2e22,4e23,10**19,2e25,4e27]
let ordColor = "no" //yes
let EN = ExpantaNum
let factor1to4=EN(1)
const prodChalGoals=[EN("ee495"),EN("ee388"),EN("e5e706"),EN("ee1402"),EN("e3.28e11"),EN("e5e383"),EN("e3e859"),EN("e4.390e7"),EN("ee644"),EN("ee16"),EN("e507200"),EN("e5.6e9")]
const musicLink=[
"https://cdn.glitch.com/03a4b67b-6f18-4f6d-8d37-50a18fb615c8%2FGoing%20Down%20by%20Jake%20Chudnow%20%5BHD%5D.mp3?v=1581538237884",
"https://cdn.glitch.com/03a4b67b-6f18-4f6d-8d37-50a18fb615c8%2FHypnothis.mp3?v=1584285594822"
]
const musicName = ['OFF', "Going Down by Jake Chudnow", "Hypnothis by Kevin Macleod"]
const BHO = V(27)
const aupCost=[1,2,Infinity,Infinity]
let AF=0
const d=new Date()
if (d.getMonth()==3&&d.getDate()==1&&!(d.getFullYear()==Number(localStorage.ordinalMarkupAF))) {
  AF=1
  console.log("April Fools!")
  localStorage.setItem("ordinalMarkupAF",d.getFullYear().toString())
} else {
  AF=0
}
reset()
document.getElementById("music").loop=true
document.getElementById("music").volume=0.5
document.getElementById("music").muted=false


Tab(1)
reset()

load()

render()
updateFactors()
updateOmegaFactors()

function increment(manmade=0) {
  if (manmade==0 || game.manualClicksLeft >= 0.5 || game.chal8 == 0) {
    if (manmade==1 && game.chal8 == 1) game.manualClicksLeft -= 1
    if (EN.eq(EN.mod(game.ord, game.base), game.base-1)) {
      game.over += 1
    } else {
      game.ord = EN.add(game.ord, 1)
    }
    clickCoolDown=2
  }
  if (manmade==1) render()
}


function maximize(manmade=0) {
  if (EN.eq(EN.mod(game.ord, game.base), game.base-1) && game.over >= 1) {
    game.ord = EN.sub(game.ord,game.base-1)
    game.over += game.base-1
    do {
      game.over -= Math.ceil((game.over+game.base)/2-0.1)
      game.ord = EN.add(game.ord,game.base)
    } while (game.over+game.base >= game.base*2 && !(EN.eq(EN.mod(game.ord, (game.base**2)), 0)))
    if (!(EN.eq(EN.mod(game.ord, (game.base**2)), 0))) {
      game.ord = EN.add(game.over,game.ord)
    }
    game.over = 0
  }
    clickCoolDown=2
  if (manmade==1) render()
}

let deltaTime
var calculate = window.setInterval(function() {
  deltaTime = Date.now()-game.lastTick
  loop((game.challenge==6||game.challenge==7||game.chal8==1?50:deltaTime))
  clickCoolDown -= 1
}, game.msint)

function loop(ms) {
  if (game.collapseUnlock==0) game.leastBoost=Infinity
  if (isNaN(game.leastBoost)) game.leastBoost=Infinity
  if (game.leastBoost==null) game.leastBoost=Infinity
  if (game.leastBoost=="null") game.leastBoost=Infinity
  if (typeof game.leastBoost=="undefined") game.leastBoost=Infinity
  game.collapseTime += ms/1000
  game.base=100
  if (isNaN(game.autoOn.shift)) game.autoOn.shift=0


  if (game.upgrades.includes(14)&&game.upgrades.includes(15)) game.OP=game.OP.add(calcTotalOPGain().mul(ms/100000))
  if (game.upgrades.includes(15)||game.pupgrades.includes(17)) game.DP=game.DP.add(getDPgain().mul(ms/100000))
  if (game.prodChalComp.includes(4)&&game.prodChal<=6.5) game.upgrades=[1,2,3,4,6,7,10,11,14,15]
  
  if (game.OP.isNaN()) game.OP=EN(0)
  game.diagonalTime += ms/1000
  game.base=100
  if (game.pupgrades.includes(11)) game.base = 80
  if (game.pupgrades.includes(12)) game.base = 72
  if (game.pupgrades.includes(15)) game.base = 64

  
  let extraAuto = 0;
  if (game.upgrades.includes(7)) { extraAuto++; }
  if (game.pupgrades.includes(17)) { extraAuto++; }

  game.lastTick=Date.now()
  if (game.chal8==1 && calcRefund()>0) confirm("You failed Challenge 8 because you had booster upgrades on you!")
  if (game.chal8==1 && calcRefund()>0) refund()
  if (game.pupgrades.includes(16)) {
    game.OP = EN.add(game.OP, calcTotalOPGain().times(1/100000*ms))
  }
  if (game.leastBoost <= 20) {
    for (let i=0;i<7;i++) {
      //if (game.challengeCompletion[i]<1) game.challengeCompletion[i]=1
    }
  }
  let assCount
  for (assCount in game.assCard) {
    game.assCard[assCount].mult = EN(1)
  }
  if (game.upgrades.includes(8)) {
    // game.incrementy = game.incrementy.add(EN(game.ord/(10**270)*ms/2000*2**game.iups[1]*(game.iups[7]==1?getDynamicFactorCap():1)))
    // incrementy no longer exists, so i don't have to worry about this mess of a one-liner
  }
  if (game.dynamicUnlock==1) game.dynamic += ms/1000000+(game.iups[6]==1?99*ms/1000000:0)
  if (game.challenge==6||game.challenge==7) game.dynamic -= (10**27*ms/2)/(game.upgrades.includes(999)?10**29:1)/getManifoldEffect()
  if (game.dynamic>=10) game.dynamic = 10
  if (game.dynamic<0) game.dynamic = 0
  if (game.chal8==1) game.decrementy += 0.000666*ms/50*(calcOrdPoints(game.ord,game.base,game.over)+1)**0.2/(game.iups[8]==1?((Math.log10(10+game.incrementy.toNumber())**(1.05**game.iups[0]))*1.2**game.iups[2]*1.2):1)
  totalMult = (
    factorMult // factors
    .mul(game.upgrades.includes(6)?(10+game.boosters**0.9):1) // unspent-booster based upgrade bonus
    .mul(bfactorMult) // challenge multipliers?
    .mul(calcDynamic()) // dynamic factor
    .mul(game.iups[8]==1?((Math.log10(10+game.incrementy.toNumber())**(1.05**game.iups[0]))*1.2**game.iups[2]):1) // incrementy
    .div(game.chal8==1?(10**game.decrementy):1) // decrementy
    .mul(game.assCard[0].mult.toNumber()) // aleph 0 bonus
    .mul(game.prodChalComp.includes(9)&&game.diagonalUp[3].eq(1)?EN(2).pow(getDiagonalizers()):game.diagonalUp[0].times(game.diagonalUp[3]).add(1))
  );

  buptotalMute = (game.upgrades.includes(6)?(10+game.boosters**0.9):1)*bfactorMult*((Math.log10(10+game.incrementy.toNumber())**(1.05**game.iups[0]))*1.2**game.iups[2])*game.assCard[1].mult.toNumber()*(game.aups.includes(1)?calcDynamic():1)

  // these are failsafes
  game.succAuto = ENify(game.succAuto)
  game.limAuto = ENify(game.limAuto)

  totalSuccAuto = game.succAuto.pow(game.prodChalComp.includes(1)&&game.prodChal<=6.5?2:1).add(getExtraSuccAuto()).min(game.prodChal==1?1:Infinity); // rip type casting
  totalLimAuto = game.limAuto.pow(game.prodChalComp.includes(1)&&game.prodChal<=6.5?2:1).add(getExtraLimAuto()).min(game.prodChal==1?1:Infinity);;

  succAutoMult = 1 // (game.aups.includes(2)?totalLimAuto**0.5:1)
  limAutoMult = 1  // (game.aups.includes(2)?totalSuccAuto**0.5:1)

  if (buptotalMute <= 100000000 && game.iups[3]==1) buptotalMute=Math.min(100000000,buptotalMute*getManifoldEffect()**2)
  // i'm pretty sure bupTotalMute just deals with tier 2 automation
  

  if (EN.mul(totalSuccAuto,totalMult).gte(0)) {
    game.autoLoop.succ += ms
    if (game.autoLoop.succ >= 1000/(totalSuccAuto.mul(succAutoMult).mul(totalMult).toNumber())) {
      game.autoLoop.succ -= 1000/(totalSuccAuto.mul(succAutoMult).mul(totalMult).toNumber())
      increment()
    }
  }

  if (totalLimAuto*limAutoMult*totalMult > 0) {
    game.autoLoop.lim += ms
    if (game.autoLoop.lim >= 1000/(totalLimAuto.mul(limAutoMult).mul(totalMult).toNumber())) {
      game.autoLoop.lim -= 1000/(totalLimAuto.mul(limAutoMult).mul(totalMult).toNumber())
      maximize()
    }
  }
    
  if (game.maxAuto > 0) {
    maxall()
  }
  
  if (totalSuccAuto.mul(succAutoMult).mul(totalMult).gte("ee15")||totalSuccAuto.mul(succAutoMult).mul(totalMult).gte("ee15")) {
    game.ord=game.ord.add(totalSuccAuto.mul(succAutoMult).mul(totalMult))
  } else {
  let succMagicNum = EN.div(1000, totalSuccAuto.mul(succAutoMult).mul(totalMult)) // like, seriously, how does this work
  let smnRecip = EN.div(totalSuccAuto.mul(succAutoMult).mul(totalMult), 1000)

  let limMagicNum = EN.div(1000, totalLimAuto.mul(limAutoMult).mul(totalMult))
  let lmnRecip = EN.div(totalSuccAuto.mul(succAutoMult).mul(totalMult), 1000)

  if (game.autoLoop.succ >= succMagicNum.toNumber()) {
    if (game.autoLoop.lim >= limMagicNum.toNumber()) {
      game.over = 0
      game.ord = EN.add(game.ord,
        EN.min(
          EN.floor(EN.div(smnRecip, 1 / game.autoLoop.succ)),
          EN.floor(EN.div(lmnRecip, 1 / game.autoLoop.lim)).mul(game.base)
        )
      )
      game.autoLoop.succ = game.autoLoop.succ % succMagicNum.toNumber()
      game.autoLoop.lim = game.autoLoop.lim % limMagicNum.toNumber()
    } else {
      if (EN.floor(EN.div(lmnRecip, 1 / game.autoLoop.succ)).gte(game.base - EN.mod(game.ord, game.base).toNumber())) {
        game.ord = game.ord.add(game.base - EN.mod(game.ord, game.base).toNumber() - 1)
        game.over += Math.floor(game.autoLoop.succ/succMagicNum.toNumber())-(game.base-EN.mod(game.ord, game.base).toNumber()-1)
        game.autoLoop.succ = game.autoLoop.succ % (1000/succMagicNum.toNumber())
      } else {
        game.ord = EN.add(game.ord, Math.floor(game.autoLoop.succ/succMagicNum.toNumber()))
        game.autoLoop.succ = game.autoLoop.succ % succMagicNum.toNumber()
      }
    }
  }
  }
  if (isNaN(game.autoLoop.succ)) game.autoLoop.succ = 0;
  if (isNaN(game.autoLoop.lim)) game.autoLoop.lim = 0;

  if (game.dynamicUnlock==1) game.dynamic += ms/1000000+(game.iups[6]==1?99*ms/1000000:0)
  if (game.challenge==6||game.challenge==7) game.dynamic -= (10**27*ms/2)/(game.upgrades.includes(999)?10**29:1)/getManifoldEffect()
  if (game.dynamic>=10) game.dynamic = 10
  if (game.dynamic<0) game.dynamic = 0
  if (ms>0) {
  if (game.upgrades.includes(11) && game.autoOn.max==1) { // replaced
    game.bAutoLoop.max += ms
    if (game.bAutoLoop.max >= (1000/buptotalMute)) {
      game.bAutoLoop.max -= (1000/buptotalMute)
      if (EN.lt(game.OP, ((game.challenge==5||game.challenge==7) && game.factorShifts >= 2?Infinity:getShiftCost(game.factorShifts))) && (game.challenge==0 || game.OP < challengeGoals[game.challenge-1][game.challengeCompletion[game.challenge-1]])) {
      if (game.succAuto.eq(0)) buysucc()
      if (game.limAuto.eq(0)) buylim()
      maxFactors()
      maxall()
      }
    }
  }
  if (false && game.autoOn.inf==1) { // replaced, there is no infinity autobuyer anymore
    game.bAutoLoop.inf += ms
    if (game.bAutoLoop.inf >= (1000/buptotalMute)) {
      game.bAutoLoop.inf -= (1000/buptotalMute)
      if (EN.gte(EN.add(game.OP, game.ord) >= 10**265 && game.challenge != 1 && game.challenge != 7)) infinity()
    }
  }
  if (game.bAutoLoop.max >= (1000/buptotalMute) && (game.bAutoLoop.inf >= (1000/buptotalMute) || game.leastBoost <= 1e10)) {
    let bupCom = Math.min(game.bAutoLoop.max/(1000/buptotalMute),(game.leastBoost <= 1e10?Infinity:game.bAutoLoop.inf/(1000/buptotalMute)))
    game.bAutoLoop.max = game.bAutoLoop.max % (1000/buptotalMute)
    game.bAutoLoop.inf = game.bAutoLoop.inf % (1000/buptotalMute)
    // if (EN.gt(EN.add(game.ord,game.OP), 10**265) && game.challenge != 1 && game.challenge != 7) game.OP += bupCom*10**270
    // if (EN.gt(EN.add(game.ord,game.OP), 10**265) && game.challenge != 1 && game.challenge != 7) game.ord += bupCom*10**270
    // i'm unsure whether I should keep these
  }

  if (game.pupgrades.includes(17) && game.autoOn.shift)
  {
    game.pAutoLoop.factor += ms
    if (game.pAutoLoop.factor >= 100) {
      maxDup()
      game.pAutoLoop.factor -= 100
      factorShift()
    }
  }
cpc()
  }
  if (game.upgrades.includes(11)) { // replaced
    partOP += ms*(game.upgrades.includes(3)?5**(game.challenge==1 || game.challenge==7?4:1):1)/50*game.assCard[2].mult.toNumber()
    // replaced
    game.OP = EN.add(game.OP, Math.floor(partOP))
    partOP = partOP % 1
  }
  if (game.leastBoost<=15) {
    partOP += ms*(game.upgrades.includes(3)?5**(game.challenge==1 || game.challenge==7?4:1):1)/1000*15*game.assCard[2].mult.toNumber()
    // replaced
    game.OP = EN.add(game.OP, Math.floor(partOP))
    partOP = partOP % 1
  }
  if (game.upgrades.includes(8)) {
    // game.incrementy = game.incrementy.add(EN(game.ord/(10**270)*ms/2000*2**game.iups[1]*(game.iups[7]==1?getDynamicFactorCap():1)))
    // no incrementy!
  }
  let themeSave="<link rel=\"stylesheet\" href=\"" + (game.theme==0?"light":"dark") + ".css\">"
  if (document.getElementById("theme").innerHTML != themeSave) document.getElementById("theme").innerHTML = themeSave
  if (ms>0) render()
  if (game.factorBoosts < 0) game.factorBoosts=0
}

function render() {
  if (game.ord.gte(10000)) game.diagonalizeUnlock=1
  get("diagonalizeTabButton").style.display=(game.diagonalizeUnlock==1?"inline":"none")
  let extraAuto = 0;
  if (game.upgrades.includes(6)) { extraAuto++; }
  if (game.pupgrades.includes(17)) { extraAuto++; }

  let outSize = game.ord.lt(EN.pow(10, 10)) ? (fghexp((EN.mod(game.ord, (game.base**3)).toNumber()+0.1)/(game.base**2),Math.pow(2,Math.floor((EN.mod(game.ord, (game.base**2)).toNumber()+0.1)/game.base))*(game.base+game.over+EN.mod(game.ord, game.base).toNumber()))) : Infinity;
  ordColor = "no"
  let ordSub = (displayOrd(game.ord,game.base,game.over,0,0,0,game.colors))
  document.getElementById("hardy").innerHTML=colorWrap("H",ordColor)+"<sub>" + ordSub + "</sub><text class=\"invisible\">l</text>"+colorWrap("(" + game.base + ")" + (game.ord >= (game.base**3) || outSize >= 10**264 || (game.ord>=5 && game.base==2) ? "" : "=" + beautify(outSize)),ordColor)
  game.canInf = (EN.gte(game.ord, game.base**3) || outSize >= (game.leastBoost<=15?100:200) || outSize >= Infinity)
  if (game.infUnlock==1) {
    document.getElementById("infinityTabButton").style.display="inline-block"
  } else {
    document.getElementById("infinityTabButton").style.display="none"
  }
  if (game.boostUnlock==1) {
    document.getElementById("boosterTabButton").style.display="inline-block"
  } else {
    document.getElementById("boosterTabButton").style.display="none"
  }
  document.getElementById("factorBoostText").style.display="none"
  document.getElementById("completeChallenge").style.display="none"
  if (game.dynamicUnlock==1) {
    document.getElementById("dynamicFactorButton").style.display="inline-block"
  } else {
    document.getElementById("dynamicFactorButton").style.display="none"
  }

  if (game.collapseUnlock==1) {
    document.getElementById("productTabButton").style.display="inline-block"
  } else {
    document.getElementById("productTabButton").style.display="none"
  }

  if (game.canInf) {
    infinityButtonText=beautify(calcTotalOPGain())
    if (document.getElementById("infinityButton").innerHTML != "Infinity to gain " + infinityButtonText + " Ordinal Points") document.getElementById("infinityButton").innerHTML = "Infinity to gain " + infinityButtonText + " Ordinal Points"
    if (document.getElementById("infinityButton2").innerHTML != "+" + infinityButtonText) document.getElementById("infinityButton2").innerHTML = "+" + infinityButtonText
  } else {
    document.getElementById("infinityButton").innerHTML = "Reach " + (game.leastBoost<=15?100:200) +" to Infinity"
    document.getElementById("infinityButton2").innerHTML = "Reach " + (game.leastBoost<=15?100:200) +" to Infinity"
  }
  document.getElementById("challengeSubTab").style.display=("none")
  document.getElementById("incrementySubTab").style.display=(game.upgrades.includes(8) ? "inline-block" : "none")
  document.getElementById("ordinalPointsDisplay").innerHTML = "You have " + beautify(game.OP) + " Ordinal Points"
  document.getElementById("omegaFactorOPDisp").innerHTML = "You have " + beautify(game.OP) + " Ordinal Points"
  document.getElementById("succAutoAmount").innerHTML = "You have " + beautify(game.succAuto.pow(game.prodChalComp.includes(1)&&game.prodChal<=6.5?2:1).add(getExtraSuccAuto()).min(game.prodChal==1?1:Infinity)) + " successor autobuyer, clicking the successor button " + beautify(game.succAuto.pow(game.prodChalComp.includes(1)?2:1).add(getExtraSuccAuto()).min(game.prodChal==1?1:Infinity).mul(totalMult).mul(succAutoMult)) + " times per second" 
  document.getElementById("limAutoAmount").innerHTML = "You have " + beautify(game.limAuto.pow(game.prodChalComp.includes(1)&&game.prodChal<=6.5?2:1).add(getExtraLimAuto()).min(game.prodChal==1?1:Infinity)) + "  maximize autobuyer, clicking the maximize button " + beautify(game.limAuto.pow(game.prodChalComp.includes(1)?2:1).add(getExtraLimAuto()).min(game.prodChal==1?1:Infinity).mul(totalMult).mul(limAutoMult)) + " times per second"
  document.getElementById("buysucc").innerHTML = "Buy Successor Autobuyer for " + (game.challenge==1||game.challenge==7?(game.succAuto.eq(1)?"Infinity":"1.000e6"):beautify(EN.mul(100,EN.pow(2,game.succAuto)))) + " OP"
  document.getElementById("buylim").innerHTML = "Buy Maximize Autobuyer for " + (game.challenge==1||game.challenge==7?(game.limAuto.eq(1)?"Infinity":"1.000e6"):beautify(EN.mul(100,EN.pow(2,game.limAuto)))) + "  OP"
  document.getElementById("factorShift").innerHTML = "Factor Shift (" + game.factorShifts + "): Requires " + ((game.challenge==5||game.challenge==7) && game.factorShifts >= 2 ? "Infinity" : beautify(getShiftCost(game.factorShifts))) +" OP"
  document.getElementById("noFactors").style.display=(game.factors.length==0 ? "inline-block" : "none")
  document.getElementById("factorList").style.display=(game.factors.length==0 ? "none" : "inline-block")
  factorMult=EN(1)
  omegaFactorMult = EN(1)
  if (game.omegaFactorCount > 0)
  {
    for (let factorListCounter = 0; factorListCounter < Math.min(game.omegaFactors.length, game.omegaFactorCount); factorListCounter++)
    {
      omegaFactorMult = omegaFactorMult.mul(1 + 0.03 * game.omegaFactors[factorListCounter]);
    }
  }
  factor1to4=EN(1)
  if (game.factors.length>0) {
    for(let factorListCounter=0;factorListCounter<game.factors.length;factorListCounter++){
      let thisFactor = (1 +
        (game.factors[factorListCounter] * (game.upgrades.includes(14) ? (game.upgrades.includes(15) ? 3 : 2) : 1)) +
        (game.upgrades.includes(2) ? 2 * (game.challenge==3||game.challenge==7?2:1) : 0) +
        (game.upgrades.includes(10) ? 2 * (game.challenge==3||game.challenge==7?2:1) : 0))
        *(game.upgrades.includes(1) ? 3 : 1)
        *omegaFactorMult.toNumber()
        *(game.diagonalUp[7].eq(1)&&factorListCounter>=3.5?factor1to4.toNumber():1)
        *(1+(game.prodChalComp.includes(2)&&game.prodChal<=6.5))
        *(game.prodChalComp.includes(7)?game.products.max(10).log10():1);
      factorMult = factorMult.mul(thisFactor)
      if (factorListCounter<=3.5) factor1to4=factor1to4.mul(EN(thisFactor).pow(1+game.prodChalComp.includes(1)))
      // upgrades replaced here
    }
  }
  document.getElementById("factorMult").innerHTML = "Your factors are multiplying Tier 1 Automation by " + beautify(factorMult, game.omegaFactorCount > 0 ? 2 : 0)
  document.getElementById("omegaFactorMult").innerHTML = "Your Omega Factors are multiplying all regular factors and diagonalizers by " + beautify(omegaFactorMult, 2)
  document.getElementById("boostersText").innerHTML = "You have " + game.boosters + " boosters";
  document.getElementById("productsText").innerHTML = "You have " + beautifyEN(game.products) + " products";
  document.getElementById("refundBoosters").innerHTML = (game.prodChalComp.includes(4)?"Refunding is disabled because you completed Product Challenge 4":"Refund back " + calcRefund() + " boosters, but reset this factor shift")
  document.getElementById("factorShiftButton").innerHTML = "Do a Factor Shift for " + Math.round(game.factorShifts / 8) + " Boosters"
  document.getElementById("dynamicMult").innerHTML = "Your Dynamic Multiplier is x" + ((game.dynamic*getManifoldEffect())**(game.upgrades.includes(13) && game.challenge % 2 == 1?2:1)).toFixed(3)
  document.getElementById("maxAllAuto").innerHTML = "Your Max All Autobuyer is clicking the Max All button " + (game.upgrades.includes(11) && game.autoOn.max==1 ? beautify(buptotalMute) : 0) + " times per second, but only if you can't Factor Shift" // replaced
  document.getElementById("infinityAuto").innerHTML = "Your Infinity Autobuyer is clicking the Infinity button " + (false && game.autoOn.inf==1 ? beautify(buptotalMute) : 0) + " times per second, but actually not because it doesn't exist" // replaced
  document.getElementById("factorShiftAuto").innerHTML = "Your Factor Shift / Diagonalizer Upgrades Autobuyer is activating " + (game.pupgrades.includes(18) && game.autoOn.shift == 1 ? 10 : 0) + " times per second"
  document.getElementById("autoMaxButton").innerHTML = "Max All Autobuyer: " + (game.upgrades.includes(11) ? (game.autoOn.max==1 ? "ON" : "OFF") : "LOCKED") // replaced
  document.getElementById("autoInfButton").innerHTML = "Infinity Autobuyer: " + (false ? (game.autoOn.inf==1 ? "ON" : "OFF") : "LOCKED") // replaced
  document.getElementById("autoShiftButton").innerHTML = "Factor Shift/Diagonalizer Upgrades Autobuyer: " + (game.pupgrades.includes(18) ? (game.autoOn.shift==1 ? "ON" : "OFF") : "LOCKED")
  document.getElementById("bup6 current").innerHTML = (10+game.boosters**0.9).toFixed(2)
  document.getElementById("runChal").innerHTML = (game.chal8==1?"You're currently running Challenge 8":(game.challenge==0?"You're currently not in a challenge":"You're currently running Challenge "+game.challenge))
  document.getElementById("incrementyText").innerHTML = "You have "+beautify(game.incrementy)+" incrementy, multiplying " + (game.iups[8]==1?"Tier 1 and ":"") + "Tier 2 Automation by "+((Math.log10(10+game.incrementy.toNumber())**(1.05**game.iups[0]))*1.2**game.iups[2]).toFixed(3) + "x"
  // document.getElementById("incrementyText2").innerHTML = "You are getting " + beautify(game.ord/(10**270)*2**game.iups[1]*(game.iups[7]==1?getDynamicFactorCap():1)) + " incrementy per second"
  document.getElementById("iup1").innerHTML = "Raise Incrementy multiplier to the<br>1.05<br>Cost: " + beautify(10**(5*(game.iups[0]+1)))
  document.getElementById("iup2").innerHTML = "Double production of incrementy<br><br>Cost: " + beautify(10**(3*(game.iups[1]+1)))
  document.getElementById("iup3").innerHTML = "Multiply Incrementy multiplier by 1.2<br><br>Cost: " + beautify(10**(9*(game.iups[2]+1)))
  document.getElementById("manifoldShift").style.display = (game.upgrades.includes(12) ? "inline-block" : "none")
  document.getElementById("manifoldAmount").innerHTML = beautify(game.manifolds)
  document.getElementById("manifoldBoost").innerHTML = getManifoldEffect().toFixed(3)
  document.getElementById("changeOrdNotation").innerHTML = "Current Ordinal Notation: " + ["Madore's","Buchhols'z","Convenient"][game.buchholz]
  document.getElementById("changeTheme").innerHTML = "Current Theme: " + (game.theme == 1 ? "Dark" : "Light")
  document.getElementById("changeInt").innerHTML = "Millisecond Interval: " + game.msint + "ms"
  document.getElementById("changeOrdLengthLess").innerHTML = "Maximum Ordinal Length: " + game.maxOrdLength.less;
  document.getElementById("getManifolds").innerHTML = "Reset incrementy for a manifold.<br>Need: "+((game.iups[5]==1?2:3)**(game.manifolds+1)).toFixed(2)+"x<br>incrementy multiplier"
  document.getElementById("manifoldIncrease").innerHTML = "It is increasing by " + ((game.upgrades.includes(13) && game.challenge % 2 == 1?" a non-constant amount ":((0.002*(game.iups[6]==1?100:1))*getManifoldEffect()).toFixed(3))) + " per second and caps at " + ((10*getManifoldEffect())**(game.upgrades.includes(13) && game.challenge % 2 == 1?2:1)).toFixed(3)
  document.getElementById("dynamicDecreaseText").style.display=(game.challenge==6||game.challenge==7?"inline":"none")
  document.getElementById("dynamicDecrease").innerHTML=(game.upgrades.includes(999)?"10.000":beautify(10**30))
  document.getElementById("bup13").innerHTML = game.upgrades.includes(15) ? "Reduce the base to 6<br><br>32 Boosters" : "Reduce the base to 7<br><br>32 Boosters"
  document.getElementById("bup14").innerHTML = game.upgrades.includes(15) ? "All bought factors are tripled, gain 1% of OP on Infinity per sec.<br>20 Boosters" : "All bought factors are doubled<br><br>20 Boosters"
  document.getElementById("factorCollapse").innerHTML = game.ord.lt(EN(game.base).pow(game.base*5+33)) ? "Reach ω^(ω5+33) to collapse! (Or restart current collapse, respecs upgrades if unable to collapse)" : "Factor Collapse for " + beautify(getProdGain()) + " products (Products are based on your ordinal)"
  let bfactor
  bfactorMult = 1
  for (let i=0;i<7;i++) {
    bfactor = (((1+(game.factors.length >= i+1?game.factors[i]+(game.upgrades.includes(10)?3:0):0))*(game.upgrades.includes(1) && game.factors.length >= i+1?2:1))**(challengeCurve[game.challengeCompletion[i]]))
    if (((game.challenge==2||game.challenge==7) && i==0)||game.chal8==1) bfactor = 1
    bfactorMult *= bfactor
    document.getElementById("challenge" + (i+1) + "Effect").innerHTML = "x" + bfactor.toFixed(2) + " ("+game.challengeCompletion[i]+"/3)"
    document.getElementById("challenge" + (i+1) + "Goal").innerHTML = "Goal: " + beautify(challengeGoals[i][Math.min(game.challengeCompletion[i],2)]) + " OP"
    chalbut(i)
  }
  bfactor = getDynamicFactorCap()**challengeCurve[game.chal8Comp]
  if (game.chal8==1) bfactor = 1
  bfactorMult *= bfactor
  document.getElementById("challenge" + "8" + "Effect").innerHTML = "x" + bfactor.toFixed(2) + " ("+game.chal8Comp+"/3)"
  document.getElementById("challenge" + "8" + "Goal").innerHTML = "Goal: " + beautify(challengeGoals[7][game.chal8Comp]) + " OP"
  chalbut(7)
  for(let i=0;i<bupUpgradeCosts.length;i++) {
    bup(i+1,1)
  }
  for(let i=0;i<pupUpgradeCosts.length;i++) {
    pup(i+1,1)
  }
  document.getElementById("chalMult").innerHTML = "Your " + getSumOfChallenges() + " challenge completions have multiplied Tier 1 and 2 Automation by " + beautify(bfactorMult)
  iup(1,1)
  iup(2,1)
  iup(3,1)
  iup(4,1)
  iup(5,1)
  iup(6,1)
  iup(7,1)
  iup(8,1)
  iup(9,1)
  document.getElementById("changeColor").innerHTML = "Colors: " + (game.colors==1?"ON":"OFF")
  document.getElementById("changeMusic").innerHTML = "Music: " + musicName[game.music]
  document.getElementById("incrementyText3").innerHTML = "You never start gaining incrementy because there is no post-psi in this game"
  document.getElementById("decrementyText").innerHTML = "There is " + beautifypower(game.decrementy) + " decrementy and " + game.manualClicksLeft + " clicks left"
  document.getElementById("decrementyText").style.display = (game.chal8==1?"inline":"none")
  get("diagonalizeButton").textContent="Diagonalize for " + beautify(getDPgain()) + " Diagonalize Points"
  get("diagonalizerText").textContent="You have " + beautify(game.DP) + " Diagonalize Points and " + beautify(getDiagonalizers()) + " Diagonalizers"
  get("countdown").textContent=Math.min((game.diagonalTime/10)**2,1).toFixed(2)+"x"
  let i
  for (i in dupUpgradeCosts) {
    let j=Number(i)+1
    let k=EN(dupUpgradeCosts[i]).times(EN(dupCostScale[i]).pow(game.diagonalUp[i].div(i==0?1+0.5*(game.pupgrades.includes(13)):1))).floor()
    if (j==1&&game.diagonalUp[0].gte(65536*(1+0.5*game.pupgrades.includes(13)))) {
    k=EN(2).tetr(EN(5).add(game.diagonalUp[0].minus(65536*(1+0.5*game.pupgrades.includes(13))).div(1250000).div(game.pupgrades.includes(4)?game.products.add(1e10).log10().div(10):1)))
    }
    get("dupCost"+j).textContent=(k.isInfinite()?"Bought":"Cost: " + beautify(k) + " DP")
  }
  get("currentDiagonalizerBase").textContent=beautify(getOPBase())
  for (let i=1;i<12.5;i++) {
    get("prodChal" + i + "Comp").textContent=(game.prodChalComp.includes(i)?"Yes":"No")
  }
  get("dup4Effect").textContent=(game.prodChalComp.includes(9)?"multiplicative":"additive")
  get("dup7Effect").textContent=(game.prodChalComp.includes(9)?"thrice":"twice")
  get("dup8Effect").textContent=(game.prodChalComp.includes(9)?"at squared rate":"")
  get("dup9Effect").textContent=(game.prodChalComp.includes(10)?(game.prodChalComp.includes(12)?"4":"3"):(game.prodChalComp.includes(10)?"3":"2"))
  get("prodChalIn").innerHTML=(game.prodChal!=0?"You're currently in Product challenge " + game.prodChal:"You're not in a product challenge") + "<br>They autocomplete when you reach the goal"
}

function epc(x) {
  if (game.prodChal===0&&(game.products.gte(1e25)||x!=9)) {
    factorCollapse()
    if (x==3||x==6||x==7||x==8) factorCollapse()
    game.prodChal=x
  }
}

function expc() {
  if (game.prodChal != 0) {
    factorCollapse()
    game.prodChal=0
  }
}

function getExtraSuccAuto() {
  return game.diagonalUp[1].add(game.upgrades.includes(7)?1:0).add(game.pupgrades.includes(17)?1:0)
}

function getExtraLimAuto() {
  return game.diagonalUp[2].add(game.upgrades.includes(7)?1:0).add(game.pupgrades.includes(17)?1:0)
}

function maxDup() {
  dup(4)
  dup(5)
  dup(6)
  dup(7)
  dup(8)
  let x=EN.affordGeometricSeries(game.DP,1,EN(2).pow(EN(1).div(1+0.5*(game.pupgrades.includes(13)))),game.diagonalUp[0])
  if (game.diagonalUp[0].add(x).gte(65536*(1+0.5*game.pupgrades.includes(13)))) {
    let x=game.DP.slog(2).minus(5).times(1250000).times(game.pupgrades.includes(4)?game.products.add(1e10).log10().div(10):1).add(65536*(1+0.5*game.pupgrades.includes(13))).floor()
    if (x.gte(game.diagonalUp[0])) {
      game.DP=game.DP.minus(EN(2).tetr(EN(5).add(x.minus(65536*(1+0.5*game.pupgrades.includes(13))).div(1250000).div(game.pupgrades.includes(4)?game.products.add(1e10).log10().div(10):1))))
      game.diagonalUp[0]=x.add(1)
    }
  } else {
    game.DP=game.DP.minus(EN.sumGeometricSeries(x,1,EN(2).pow(EN(1).div(1+0.5*(game.pupgrades.includes(13)))),game.diagonalUp[0]))
    game.diagonalUp[0]=game.diagonalUp[0].add(x)
  }
  let y=EN.affordGeometricSeries(game.DP,10,10,game.diagonalUp[8])
  game.DP=game.DP.minus(EN.sumGeometricSeries(y,10,10,game.diagonalUp[8]))
  game.diagonalUp[8]=game.diagonalUp[8].add(y)
}



function dup(x) {
  let k=EN(dupUpgradeCosts[x-1]).times(EN(dupCostScale[x-1]).pow((game.diagonalUp[x-1]).div(1+0.5*(x==1&&game.pupgrades.includes(13))))).floor()
  if (x==1&&game.diagonalUp[0].gte(65536*(1+0.5*game.pupgrades.includes(13)))) {
    k=EN(2).tetr(EN(5).add(game.diagonalUp[0].minus(65536*(1+0.5*game.pupgrades.includes(13))).div(1250000).div(game.pupgrades.includes(4)?game.products.add(1e10).log10().div(10):1)))
  }
  if (game.DP.gte(k)&&(x<=3||x==9||game.prodChal != 9)) {
    game.DP=game.DP.minus(k)
    game.diagonalUp[x-1]=game.diagonalUp[x-1].add(1)
  }
}

function getOPBase() {
  let diag=getDiagonalizers().times(game.diagonalUp[6].add(1).add(0+game.prodChalComp.includes(9))).times(omegaFactorMult).times(game.pupgrades.includes(12)?1.1:1).times(game.prodChalComp.includes(5)&&game.prodChal<=6.5?1.1:1).pow(game.pupgrades.includes(14)&&game.pupgrades.includes(10)?game.omegaFactors[4]*0.03+1:1)
  let base=EN(100)
  if (diag.lte(8)||game.prodChal==8) {
    base=diag.times(50).add(100)
  } else {
    base=EN(500).times(EN(1.1).pow(diag.minus(8)))
  }
  if (game.prodChal==12) base=EN(100) //aaaaaaaaaaaaaa
  if (game.prodChalComp.includes(11)) base=base.pow(2)
  if (game.prodChalComp.includes(12)&&game.prodChal!=12) base=base.pow(EN(1.000001).pow(getDiagonalizers()))
  return base.floor()
}

function getDiagonalizers() {
  return game.diagonalUp[0].pow(game.prodChal==5?0.5:1)
}

function getDPgain() {
  let gain=game.ord.div(game.base**2).sqrt().times(Math.min(1,(game.diagonalTime/10)**2))
  if (game.prodChal==10) gain=gain.add(1).log10()
  gain=gain.times(EN(2+game.prodChalComp.includes(10)+game.prodChalComp.includes(12)).pow(game.diagonalUp[8].isNaN()?0:game.diagonalUp[8]))
  return gain.floor()
}

function calcDynamic() {
  return (game.dynamic*getManifoldEffect())**(game.upgrades.includes(13) && game.challenge % 2 == 1?2:1)
}

function getAlephOmega() {
  if (game.assCard[0].points.gte(1)&&game.assCard[1].points.gte(1)&&game.assCard[2].points.gte(1)) {
    game.assCard[0].points = game.assCard[0].points.minus(1)
    game.assCard[1].points = game.assCard[1].points.minus(1)
    game.assCard[2].points = game.assCard[2].points.minus(1)
    game.alephOmega = game.alephOmega.add(1)
  }
}

function getShiftCost(n) {
  if (n < 7.5)
  {
    return factorShiftCosts[n]
  }
  else if (n<=49.5) {
    return EN.pow(10, 100*(n-6))
  } else {
    return Infinity
  }
}

function OPNeededForNext()
{
  currProducts = Math.max(game.OP.log10().div(250).logBase(1.025).add(2).floor().toNumber(), 1)
  return EN.pow(10, EN.pow(1.025, EN(currProducts + 1).sub(2)).mul(250))
}

function ordTest() {
  a = game.ord.add(game.over)
  setTimeout(function() {
      console.log(game.ord.add(game.over).sub(a).toString())
  }, 1000)
}

function assign(a,b,c) {
  let assigning = (game.assBefore==0?confirm("Choose wisely (Hint: go for ℵ1 for your first cardinal)"):true)
  if (assigning&&game.cardinals.gte(b)) {
    let bulk = EN(c==1?game.cardinals.divide(b).floor():1).times(b)
    game.cardinals = game.cardinals.minus(bulk)
    game.assCard[a-1].points = game.assCard[a-1].points.add(bulk)
    game.assBefore=1
  }
}

function resetEverythingCollapseDoes() {
  game.base=10
  game.ord=ENify(0)
  game.over=0
  game.canInf=false
  game.OP=ENify(0)
  game.succAuto=ENify(0)
  game.limAuto=ENify(0)
  game.maxAuto=0
  game.autoLoop={succ: 0, lim: 0}
  game.factorShifts=0
  game.factors=[]
  game.boosters=0
  game.upgrades=[4]
  game.factorBoosts=0
  game.dynamic=1
  game.maxAuto=0
  game.infAuto=0
  game.bAutoLoop={max: 0, inf: 0}
  game.challenge=0
  game.challengeCompletion=[0,0,0,0,0,0,0]
  game.incrementy=EN(0)
  game.manifolds=0
  game.iups=[0,0,0,0,0,0,0,0,0]
  game.chal8=0
  game.chal8Comp=0
  game.decrementy=0
  game.manualClicksLeft=1000
  game.collapseUnlock=1
  game.collapseTime=0
  game.reachedBHO=0
  game.diagonalUp=[EN(0),EN(0),EN(0),EN(0),EN(0),EN(0),EN(0),EN(0),EN(0)]
  game.DP=EN(0)
}

function collapse() {
  if (game.reachedBHO==1 || game.collapseUnlock==0) {
  if (game.collapseUnlock==0) {
  let i=1
  let anim = 0
  let id = setInterval(frame, 50);
  function frame() {
    collapseAnimation += i
    anim++
    if (collapseAnimation == 100 && i==1) {
      i=0
    }
    if (anim==300) {
      game.collapseUnlock=1
      game.upgrades=[4,8,12,16]
      game.cardinals = game.cardinals.add(EN(Math.max(game.factorBoosts-24,2)**0.5).floor())
      resetEverythingCollapseDoes()
      i=-1
    }
    if (i==-1 && collapseAnimation==0) {
      clearInterval(id)
    }
  }
  } else {
    game.cardinals = game.cardinals.add(calcCard())
    resetEverythingCollapseDoes()
  }
  }
}

function cpc() {
  if (game.prodChal != 0) {
    if (game.OP.gte(prodChalGoals[game.prodChal-1])) {
      if (!game.prodChalComp.includes(game.prodChal)) game.prodChalComp.push(game.prodChal)
      expc()
    }
  }
}

function getProdGain() {
  return game.ord.logBase(game.base).div(game.base).minus(5).div(2).pow(2).add(1).pow(1+(game.prodChalComp.includes(6)&&game.prodChal<=6.5)).pow(1+0.5*game.pupgrades.includes(5)).floor()
}

function factorCollapse()
{
  game.prodChal=0
  if (game.ord.gte(EN(game.base).pow(game.base*5+33))) // actually do the collapse
  {
    productsEarned = getProdGain()
    game.products = isNaN(productsEarned) ? game.products.add(1) : game.products.add(productsEarned)
    resetEverythingCollapseDoes();

    if (game.pupgrades.includes(1))
    {
      multiShift(7);
    }
    if (game.pupgrades.includes(3)) multiShift(50)
  }
  else // refund upgrades
  {
    let metaUpgrades = []
    for (n = 1; n < 15; n++)
    {
      if (game.pupgrades.includes(n))
      {
        game.products = game.products.add((isNaN(pupUpgradeCosts[n-1])?0:pupUpgradeCosts[n-1]))
      }
    }
    
    for (n = 16; n < 20; n++)
    {
      if (game.pupgrades.includes(n)) { metaUpgrades.push(n) }
    }
    game.pupgrades = metaUpgrades;
    game.omegaFactorCount = 0;
    resetEverythingCollapseDoes();
  }
}

function calcCard() {
  return EN(Math.max(game.factorBoosts-24,2)**Math.min(6.9,0.5+0.8*((5-Math.min(Math.log10(game.collapseTime),5))**1.5))).floor()
}

function beautifypower(number) {
  if (number==Infinity) {
    return "Infinity"
  } else {
  let exponent = Math.floor(number)
  let mantissa = 10**(number % 1)
  if (exponent < 6) return Math.round(10**number)
  if (mantissa.toFixed(3)=="10.000") return "9.999e" + exponent
  return mantissa.toFixed(3) + "e" + exponent
  }
}

function changeMusic() {
  game.music = (game.music+1)%(musicLink.length+1)
  if (game.music==0) {
    document.getElementById("music").pause()
  } else {
    document.getElementById("music").src=musicLink[game.music-1]
    document.getElementById("music").play()
  }
}


function changeColor() {
  game.colors = 1-game.colors
}

function getManifoldEffect() {
  return (((game.manifolds+1)**0.5)*(game.iups[4-1]==1?3:1)*(game.iups[4]==1?1.26:1))
}

function getDynamicFactorCap() {
  return (10*getManifoldEffect())**(game.upgrades.includes(13) && game.challenge % 2 == 1?2:1)
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
function changeOrdNotation() {game.buchholz = (game.buchholz + 1)%3}

function iup(n,spectate=0) {
  document.getElementById("iup" + n).classList.remove("boosterButton")
  document.getElementById("iup" + n).classList.remove("locked")
  document.getElementById("iup" + n).classList.remove("bought")
  if (n<=3){
    document.getElementById("iup"+ + n).style.display = "";
    if (game.incrementy.gte(iupCosts[n-1]**(game.iups[n-1]+1))) {
      if (spectate==0) {
      game.iups[n-1] += 1
      game.incrementy = game.incrementy.minus(iupCosts[n-1]**game.iups[n-1])
      } else {
        document.getElementById("iup" + n).classList.add("boosterButton")
      }
    } else {
      document.getElementById("iup" + n).classList.add("locked")
    }
  } else {
    if (!game.upgrades.includes(12)) {
      document.getElementById("iup"+ + n).style.display = "none";
    } else {
      document.getElementById("iup"+ + n).style.display = "inline-block";
      if (game.iups[n-1]==1) {
        document.getElementById("iup" + n).classList.add("bought")
      } else if (game.incrementy.gte(iupCosts[n-1])) {
        if (spectate == 0) {
          game.incrementy = game.incrementy.minus(iupCosts[n-1])
          game.iups[n-1] = 1
        } else {
          document.getElementById("iup" + n).classList.add("boosterButton")
        }
      } else {
        document.getElementById("iup" + n).classList.add("locked")
      }
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
  return 0; // considering factor boosts don't even exist...
}

function completeChallenge() {
  if (EN.gte(game.OP, (game.chal8==1?challengeGoals[7][game.chal8Comp]:challengeGoals[game.challenge-1][game.challengeCompletion[game.challenge-1]]))) {
    if (game.chal8==1) {
      if (game.leastBoost<=15) {
        while (game.chal8Comp<=2 && EN.gte(game.OP, challengeGoals[7][game.chal8Comp])) {
          game.chal8Comp += 1
        }
      } else {
      game.chal8Comp += 1
      }
    } else {
      if (game.leastBoost<=15) {
        while (game.challengeCompletion[game.challenge-1]<=2 && EN.gte(game.OP, challengeGoals[game.challenge-1])[game.challengeCompletion[game.challenge-1]]) {
          game.challengeCompletion[game.challenge-1] += 1
        }
      } else {
      game.challengeCompletion[game.challenge-1] += 1
      }
    }
    game.ord=ENify(0)
    game.over=0
    game.canInf=false
    game.OP=ENify(0)
    game.succAuto=ENify(0)
    game.limAuto=0
    game.autoLoop={succ: 0, lim: 0}
    game.factorShifts = 0
    game.base = 10
    game.factors=[]
    game.boostUnlock=1
    game.dynamic=1
    game.challenge=0
    game.incrementy=EN(0)
    game.chal8=0
    game.decrementy=0
    game.manualClicksLeft=1000
  }
}

function chalbut(i) {
  document.getElementById("challenge"+(i+1)).classList.remove("boosterButton")
  document.getElementById("challenge"+(i+1)).classList.remove("bought")
  document.getElementById("challenge"+(i+1)).classList.remove("running")
  if (game.challenge==(i+1) || (game.chal8==1&&i==7)) {
    document.getElementById("challenge"+(i+1)).classList.add("running")
  } else if ((game.challengeCompletion[i]>=3 && i<=6.1)||(i==7&&game.chal8Comp>=3)) {
    document.getElementById("challenge"+(i+1)).classList.add("bought")
  } else {
    document.getElementById("challenge"+(i+1)).classList.add("boosterButton")
  }
}

function factorBoost() {
  console.log("This function should never be called, considering Factor Boosts don't exist!")
}

function refund() {
  if (!game.prodChalComp.includes(4)) {
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
  game.factors=[]
  for (i = 0; i < game.factorShifts; i++)
  {
    game.factors[i] = 0;
  }
  
  game.succAuto=EN(0)
  game.limAuto=EN(0)
  updateFactors();

  game.ord=EN(0)
  game.over=0
  game.canInf=false
  game.OP=EN(0)
  game.boostUnlock=1
  game.dynamic=1
  game.challenge=0
  game.incrementy=EN(0)
  game.manualClicksLeft=1000
  game.chal8=0
  game.decrementy=0
  game.autoLoop={succ: 0, lim: 0}

  updateFactors();
  factorMult = EN(1);
}
}

function getManifolds() {
  if(!(((Math.log10(10+game.incrementy)**(1.05**game.iups[0]))*1.2**game.iups[2]) >= (game.iups[5]==1?2:3)**(game.manifolds+1))) return;
  game.incrementy=EN(0)
  game.manifolds += 1
}

function calcRefund() {
  let refundBoost = 0
  for(let i=0;i<bupUpgradeCosts.length;i++) {
    refundBoost += (game.upgrades.includes(i+1) && i%4 != 3 ? bupUpgradeCosts[i] : 0)
  }
  return refundBoost
}

function getSumOfChallenges() {
  let r = 0;
  for (let i=0; i<game.challengeCompletion.length; i++) r += game.challengeCompletion[i]
  return r+game.chal8Comp;
}

function aup(x,spectate=0) {
  document.getElementById("aup" + (x)).classList.remove("collapse")
  document.getElementById("aup" + (x)).classList.remove("bought")
  document.getElementById("aup" + (x)).classList.add("locked")
  if (spectate==0 && (!game.aups.includes(x)) && game.alephOmega.gte(EN(aupCost[x-1]))) {
    game.alephOmega = game.alephOmega.minus(aupCost[x-1])
    game.aups.push(x)
  }
  if (game.alephOmega.gte(EN(aupCost[x-1]))) {
    document.getElementById("aup" + (x)).classList.add("collapse")
    document.getElementById("aup" + (x)).classList.remove("locked")
  }
  if (game.aups.includes(x)) {
    document.getElementById("aup" + (x)).classList.add("bought")
    document.getElementById("aup" + (x)).classList.remove("collapse")
    document.getElementById("aup" + (x)).classList.remove("locked")
  }
}

function bup(x,spectate=0) {
  document.getElementById("bup" + (x)).classList.remove("canbuy")
  document.getElementById("bup" + (x)).classList.remove("bought")
  document.getElementById("bup" + (x)).classList.add("locked")
  if (!game.upgrades.includes(x)) {
    if ((game.boosters>=bupUpgradeCosts[x-1] || x == 4 && game.ord.gte(EN(game.base).pow(game.base*5+33))) && game.challenge != 6 &&game.prodChal != 4) {
      if (!(x==12 && !(getSumOfChallenges() >= 7)) && !(x==16 && !(getSumOfChallenges() >= 23)) && (x<4.5||game.upgrades.includes(x-4))) {
        if (spectate==0) {
          if (x==4) {
            factorCollapse();
            game.products=EN(1)
          } else {
            if (x%4 != 0) game.boosters -= bupUpgradeCosts[x-1]
            game.upgrades.push(x)
            document.getElementById("bup" + (x)).classList.remove("canbuy")
            document.getElementById("bup" + (x)).classList.add("bought")
            document.getElementById("bup" + (x)).classList.remove("locked")
            updateFactors()
          }
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

function pathAllows(pupgrade)
{
  if (game.prodChal==6) return false
  if (game.prodChalComp.includes(8)&&game.prodChal!=3) return true
  if (pupgrade > 15)
  {
    return true;
  }
  else if (pupgrade % 5 == 1)
  {
    return (game.pupgrades.includes(1) + game.pupgrades.includes(6) + game.pupgrades.includes(11)) < 3-2*(game.prodChal==3)
  }
  else if (pupgrade % 5 == 2)
  {
    return (game.pupgrades.includes(2) + game.pupgrades.includes(7) + game.pupgrades.includes(12)) < 2+(game.prodChalComp.includes(3)&&game.prodChal<=6.5)
  }
  else if (pupgrade % 5 == 3)
  {
    return (game.pupgrades.includes(3) + game.pupgrades.includes(8) + game.pupgrades.includes(13)) < 1+2*(game.prodChalComp.includes(8))
  }
  else if (pupgrade % 5 == 4)
  {
    return (game.pupgrades.includes(4) + game.pupgrades.includes(9) + game.pupgrades.includes(14)) < 1+2*(game.prodChalComp.includes(8))
  }
  else if (pupgrade % 5 == 0)
  {
    return (game.pupgrades.includes(5) + game.pupgrades.includes(10) + game.pupgrades.includes(15)) < 1+2*(game.prodChalComp.includes(8))
  }
}

function pup(x,spectate=0) {
  document.getElementById("pup" + (x)).classList.remove("canbuy")
  document.getElementById("pup" + (x)).classList.remove("bought")
  document.getElementById("pup" + (x)).classList.add("locked")
  if (!game.pupgrades.includes(x)) {
    if (game.products.toNumber() >= pupUpgradeCosts[x-1] && pathAllows(x) && !(x==20&&game.diagonalUp[0].lt(1000000))) {
      if (x % 5 == 1 || game.pupgrades.includes(x-1)) {
        if (spectate==0) {
          if (x==20)
          {
            alert("Sorry, you've again reached the end of what I've programmed... More updates are coming soon!")
          }
          else
          {
            if (x <= 15) {game.products = game.products.minus(pupUpgradeCosts[x-1])}

            game.pupgrades.push(x)
            document.getElementById("pup" + (x)).classList.remove("canbuy")
            document.getElementById("pup" + (x)).classList.add("bought")
            document.getElementById("pup" + (x)).classList.remove("locked")

            if (x==1) multiShift(7);
            if (x==2) multiShift(7)
            if (x==3) multiShift(50)
            updateFactors()
            updateOmegaFactors()
          }
        } else {
          document.getElementById("pup" + (x)).classList.add("canbuy")
          document.getElementById("pup" + (x)).classList.remove("bought")
          document.getElementById("pup" + (x)).classList.remove("locked")
        }
      }
    }
  } else {
    document.getElementById("pup" + (x)).classList.remove("canbuy")
    document.getElementById("pup" + (x)).classList.add("bought")
    document.getElementById("pup" + (x)).classList.remove("locked")
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
    for(let factorListCounter=0;factorListCounter<Math.min(game.factors.length, 8);factorListCounter++){
      factorListHTML = factorListHTML + "<li>Factor " + (factorListCounter+1) + " x" + beautifyEN(omegaFactorMult.mul(factorListCounter>=3.5&&game.diagonalUp[7].eq(1)?factor1to4:1).mul(game.prodChalComp.includes(7)?game.products.max(10).log10():1).mul(1+(game.prodChalComp.includes(2)&&game.prodChal<=6.5)).mul((1 + (game.upgrades.includes(2) ? 2 * (game.challenge==3||game.challenge==7?2:1) : 0) + (game.upgrades.includes(10) ? 2 * (game.challenge==3||game.challenge==7?2:1) : 0) + game.factors[factorListCounter]*(game.upgrades.includes(14) ? (game.upgrades.includes(15) ? 3 : 2) : 1))) * (game.upgrades.includes(1)?3:1), game.omegaFactorCount > 0 ? 2 : 0) + " <button onclick=\"buyFactor(" + factorListCounter + ")\" class=\"infinityButton\">" + (game.factors[factorListCounter] < 1e20 ? ("Increase Factor " + (factorListCounter+1) + " for " + beautify(EN.pow(EN.pow(10,(factorListCounter+1)),EN.pow(typeof(factorCostExp[factorListCounter]) != "undefined" ? factorCostExp[factorListCounter] : 100, game.factors[factorListCounter]))) + " OP") : ("You have reached the cap for this factor!")) + "</button></li>"
    }
    if (game.factors.length > 8)
    {
      if (game.factors.length > 9)
      {
        factorListHTML = factorListHTML + "<li>...</li>"
      }

      let factorListCounter = game.factors.length - 1;
      factorListHTML = factorListHTML + "<li>Factor " + (factorListCounter+1) + " x" + beautifyEN(omegaFactorMult.mul(factorListCounter>=3.5&&game.diagonalUp[7].eq(1)?factor1to4:1).mul(game.prodChalComp.includes(7)?game.products.max(10).log10():1).mul(1+(game.prodChalComp.includes(2)&&game.prodChal<=6.5)).mul((1 + (game.upgrades.includes(2) ? 2 * (game.challenge==3||game.challenge==7?2:1) : 0) + (game.upgrades.includes(10) ? 2 * (game.challenge==3||game.challenge==7?2:1) : 0) + game.factors[factorListCounter]*(game.upgrades.includes(14) ? (game.upgrades.includes(15) ? 3 : 2) : 1))) * (game.upgrades.includes(1)?3:1), game.omegaFactorCount > 0 ? 2 : 0) + " <button onclick=\"buyFactor(" + factorListCounter + ")\" class=\"infinityButton\">" + (game.factors[factorListCounter] < 1e20 ? ("Increase Factor " + (factorListCounter+1) + " for " + beautify(EN.pow(EN.pow(10,(factorListCounter+1)),EN.pow(typeof(factorCostExp[factorListCounter]) != "undefined" ? factorCostExp[factorListCounter] : 100, game.factors[factorListCounter]))) + " OP") : ("You have reached the cap for this factor!")) + "</button></li>"
      
    }
    if (document.getElementById("factorListMain").innerHTML!=factorListHTML) document.getElementById("factorListMain").innerHTML=factorListHTML
  }
}

function updateOmegaFactors() {
  if (game.pupgrades.includes(10))
  {
    game.omegaFactorCount = 5;
  }
  else if (game.pupgrades.includes(9))
  {
    game.omegaFactorCount = 4;
  }
  else if (game.pupgrades.includes(8))
  {
    game.omegaFactorCount = 3;
  }
  else if (game.pupgrades.includes(7))
  {
    game.omegaFactorCount = 2;
  }
  else if (game.pupgrades.includes(6))
  {
    game.omegaFactorCount = 1;
  }
  else
  {
    game.omegaFactorCount = 0;
  }

  while (game.omegaFactors.length < game.omegaFactorCount)
  {
    game.omegaFactors.push(0);
  }

  if (game.omegaFactorCount > 0) {
    let factorListHTML=""
    for(let factorListCounter=0;factorListCounter<game.omegaFactorCount;factorListCounter++){
      factorListHTML += "<li>Omega Factor " + (factorListCounter+1) + " x" + beautifyEN((1 + 0.03 * game.omegaFactors[factorListCounter]), 2) + " <button onclick=\"buyOmegaFactor(" + factorListCounter + ")\" class=\"productButton\">Increase Omega Factor " + (factorListCounter+1) + " for " + beautifyEN(EN.fromHyperE("E" + (factorListCounter + (false&&factorListCounter>=1?0.92:1)) + "#" + (game.omegaFactors[factorListCounter] + 1))) + " OP</button></li>"
    }
    document.getElementById("omegaFactorListMain").style.display = "block"
    document.getElementById("noOmegaFactors").style.display = "none"
    document.getElementById("omegaFactorMult").style.display = "block"
    if (document.getElementById("omegaFactorListMain").innerHTML!=factorListHTML) document.getElementById("omegaFactorListMain").innerHTML=factorListHTML
  } else {
    document.getElementById("omegaFactorListMain").style.display = "none"
    document.getElementById("noOmegaFactors").style.display = "block"
    document.getElementById("omegaFactorMult").style.display = "none"
  }
}

function autoCost(number)
{
  return EN.mul(100, EN.pow(2, number))
}

function buysucc(rend=0) {
  if (game.challenge==1||game.challenge==7) {
    if (EN.gte(game.OP, 1000000) && game.succAuto.eq(0)) {
      game.OP = EN.sub(game.OP, 1000000)
      game.succAuto = ENify(1)
    }
  } else {
    if (EN.gte(game.OP, EN.mul(100, EN.pow(2, game.succAuto)))) {
      if (game.OP.lte("ee15")) game.OP = EN.sub(game.OP, autoCost(game.succAuto))
      game.succAuto = game.succAuto.add(1)
    }
  }
  if (rend==1) render()
}

function buylim(rend=0) {
  if (game.challenge==1||game.challenge==7) {
    if (EN.gte(game.OP, 1000000) && game.limAuto.eq(0)) {
      game.OP = EN.sub(game.OP, 1000000)
      game.limAuto = ENify(1)
    }
  } else {
    if (EN.gte(game.OP, EN.mul(100, EN.pow(2, game.limAuto)))) {
      if (game.OP.lte("ee15")) game.OP = EN.sub(game.OP, autoCost(game.limAuto))
      game.limAuto = game.limAuto.add(1)
    }
  }
  if (rend==1) render()
}

function maxall() {
  let bulk=0
  if (game.challenge==1||game.challenge==7) {
    buysucc()
    buylim()
  } else {
    buysucc()
    buylim()

    bigOP = game.OP.gt("ee15")

    bulk = EN.floor(EN.div(EN.log(EN.add(1, EN.div(game.OP, EN.mul(100, EN.pow(2, game.succAuto))))), EN.log(2)))
    if (!bigOP) {game.OP = EN.sub(game.OP, EN.mul(EN.sub(EN.pow(2, bulk), 1), EN.mul(100, EN.pow(2, game.succAuto))))}
    game.succAuto = game.succAuto.add(bulk)

    bulk = EN.floor(EN.div(EN.log(EN.add(1, EN.div(game.OP, EN.mul(100, EN.pow(2, game.limAuto))))), EN.log(2)))
    if (!bigOP) {game.OP = EN.sub(game.OP, EN.mul(EN.sub(EN.pow(2, bulk), 1), EN.mul(100, EN.pow(2, game.limAuto))))}
    game.limAuto = game.limAuto.add(bulk)

    //if (bigOP) {game.OP = EN(0)}
  }
}

function calcTotalOPGain() {
  let gain= EN(EN.mul(
    calcOrdPoints(game.ord,game.base,game.over),
    (game.upgrades.includes(3)?5:1)*(game.upgrades.includes(15) && game.base<6?666666:1)*(game.challenge==7?game.challengeCompletion[5]:1)*(game.chal8==1?game.challengeCompletion[6]:1)*game.assCard[2].mult))
  if (game.prodChal==11) gain=gain.add(1).log10()
  return gain
  // u5 replaced
}

function infinity(manmade=0) {
  if (game.canInf) {
    if (game.chal8==1||game.challenge==6||game.challenge==7)
    {
      game.OP=ENify(0)
    }
    game.OP = EN.add(game.OP, calcTotalOPGain())
    game.ord = ENify(0)
    game.over = 0
    document.getElementById("infinityTabButton").style.display="inline-block"
    game.infUnlock = 1
    game.dynamic=1
    game.decrementy=0
    game.autoLoop.succ=0
    game.autoLoop.lim=0
    game.manualClicksLeft=1000
  }
  loop(0)
  if (manmade==1) render()
}

function displayOrd(ord,base=3,over=0,trim=0,large=0,multoff=0,colour=0) {
  ord = ENify(ord);
  originalOrd = ENify(ord);
  let dispString = "";

  let largeOrd = false;
  if (ord.gte(EN(base).tetrate(10))) {return (colour==1?"<span style='color:red'>ω^^</span>":"ω^^") + displayOrd(ord.slog().floor(),base,over,trim,large,multoff,colour)}
  while (ord.gte(base) && (trim < game.maxOrdLength.less || game.maxOrdLength.less == 0) && !largeOrd)
  {
    let tempvar = ord.add(0.1).logBase(base).floor() // if leading term of ordinal is (ω^c)a, this is c
    if (ordColor == "no") ordColor=HSL(tempvar*8)
    let tempvar2 = EN.pow(base,tempvar) // and this is ω^c
    let tempvar3 = EN.floor((EN.add(ord, 0.1)).div(tempvar2)) // and this is a
    let ott = ord.sub(EN.mul(tempvar2, tempvar3)) // the ordinal value of the rest of the ordinal
    let otto = ott.add(over).eq(0) || ord.gt(EN.tetrate(base, 3)) // has the ordinal ended?
    tempvar4 = "ω" +
      (tempvar.eq(1) ? "" : (game.buchholz==2?"^(":"<sup>") + displayOrd(tempvar,base,0) + (game.buchholz==2?")":"</sup>")) +
      (tempvar3.eq(1) ? "" : (game.buchholz==2&&tempvar.gt(1.5)?"×":"") + tempvar3.toString()) +
      (otto || trim == (game.maxOrdLength.less-1) ? (otto ? "": "+...") : "+" );
    dispString += (colour==1?"<span style='color:" + HSL(tempvar*8) + "'>" + tempvar4 + "</span>":tempvar4);
    ord = ott;
    trim++;

    if (ord.gt(EN.tetrate(base, 3))) {largeOrd = true}
  }

  if ((ord.lt(base) && !ord.eq(0) && trim != game.maxOrdLength.less) || originalOrd.eq(0)) {
    if (ordColor == "no") ordColor="red"
    dispString += (colour==1?"<span style='color:red'>" + EN.add(ord,over).toNumber() + "</span>":EN.add(ord,over).toNumber())
  }
  
  return dispString;
}

function fghexp(times, on) {
  if (times<1) {
    return on
  } else {
    return fghexp(times-1,Math.pow(2,on)*on)
  }
}

function beautify(number,f=0) {
  if (typeof number == "number") {
    if (number==Infinity) {
      return "Infinity"
    } else if (10**265 > number) {
      if (10**257>number) {
        let exponent = Math.floor(Math.log10(number+0.1))
        let mantissa = number / Math.pow(10, exponent)
        if (exponent < 6) return Math.round(number)
        if (mantissa.toFixed(3)=="10.000") return "9.999e" + exponent
        return mantissa.toFixed(3) + "e" + exponent
      } else {
        return "1.000e300"
      }
    }
    else {
      return "Something's not right here..."
    }
  }
  else {
    return beautifyEN(number,f)
  }
}

function beautifyEN(n,f=0) {
 let x = EN(n)
  if (x.lt(1e6)) {
    return (f==0?x.floor().toString():x.toNumber().toFixed(f))
  } else if (x.lte(EN.tetrate(10, 6))){
    let exponent = x.log10().floor()
    let mantissa = ""
    if (x.lte(EN(10).pow(1000000)))
    {
      mantissa = x.divide(EN(10).pow(exponent)).toNumber().toFixed(5)
    }
    else
    {
      mantissa = ""
    }
    return mantissa + "e" + beautifyEN(exponent)
  } else if (isNaN(x)) {
    return n.toString()
  } else if (x.eq(Infinity)) {
    return "Infinity";
  } else { // toHyperE doesn't work, so this is as far as I'm going
    return "way too many";
  }
}

function calcOrdPoints(ord=game.ord,base=game.base,over=game.over,trim=0) {
  opBase = getOPBase()

  if (trim >= 10) return 0

  if (EN.lt(ord, base)) {
    return EN.add(ord, over)
  } else if (ord.slog(game.base).lt(game.base)) {
    let powerOfOmega = ord.add(0.1).logBase(base).floor()
    let highestPower = EN.pow(base,powerOfOmega)
    let powerMultiplier = EN.floor(EN.div(ord.add(0.1),highestPower))
    return EN.add(EN.mul(EN.pow(opBase, calcOrdPoints(powerOfOmega,base,0)), powerMultiplier), ord.lt(EN.tetrate(game.base, 3)) ? calcOrdPoints(ord.sub(EN.mul(highestPower,powerMultiplier)),base,over,trim+1) : 0)
  } else {
    return opBase.tetr(calcOrdPoints(ord.slog(game.base),base,0,trim))
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
  document.getElementById("Tab8").style.display="none"
  document.getElementById("Tab" + t).style.display="block"
  subTab(game.subTab)
  bsubTab(game.bsubTab)
  psubTab(game.psubTab)
  if (game.music>=1) document.getElementById("music").play();
  updateFactors()
  updateOmegaFactors()
}

function subTab(t) {
  document.getElementById("subTab1").style.display="none"
  document.getElementById("subTab2").style.display="none"
  document.getElementById("subTab3").style.display="none"
  document.getElementById("subTab" + t).style.display="block"
  game.subTab=t
}
function bsubTab(t) {
  document.getElementById("bsubTab1").style.display="none"
  document.getElementById("bsubTab2").style.display="none"
  document.getElementById("bsubTab3").style.display="none"
  document.getElementById("bsubTab4").style.display="none"
  document.getElementById("bsubTab" + t).style.display="block"
  game.bsubTab=t
}

function psubTab(t) {
  document.getElementById("psubTab1").style.display="none"
  document.getElementById("psubTab2").style.display="none"
  document.getElementById("psubTab3").style.display="none"
  document.getElementById("psubTab4").style.display="none"
  document.getElementById("psubTab5").style.display="none"
  document.getElementById("psubTab" + t).style.display="block"
  game.psubTab=t
}

var autoSave = window.setInterval(function() {
  save()
}, 2000)

function resetConf() {
  let code = prompt("Are you sure you want to delete all of your progress? Type in \"yes\" to reset all of your progress.")
  if (code.toLowerCase()=="yes") reset()
}

function maxFactors() {
  let boughtFactor = false;

  if (game.prodChal != 2) {
    let bigOP = game.OP.gte("ee15")

    for(i=0;i<game.factors.length;i++)
    {
      let factExp = typeof factorCostExp[i] == "undefined" ? 100 : factorCostExp[i]
      factorsBuyable = Math.min(game.OP.log10().div(i+1).logBase(factExp).floor().toNumber() + 1, 1e20);
      oomDifference = ((i+1) * (factExp ** factorsBuyable)) - ((i+1) * (factExp ** game.factors[i]));
      if (oomDifference < 16)
      {
        while (EN.gte(game.OP, (EN.pow(EN.pow(10,(i+1)),EN.pow(factExp,game.factors[i])))))
        {
          buyFactor(i)
          boughtFactor = true;
        }
      }
      else
      {
        if (factorsBuyable >= game.factors[i])
        {
          if (!bigOP) {game.OP = game.OP.sub(EN.pow(10, EN.mul(i+1, EN.pow(factExp, factorsBuyable-1))))};
          game.factors[i] = factorsBuyable;
          boughtFactor = true;
        }
      }
    }
  }
  if (boughtFactor) {updateFactors()}
}

function factorShift(debug=false) {
  if ((EN.gte(game.OP, getShiftCost(game.factorShifts)) && !((game.challenge==5||game.challenge==7) && game.factorShifts >= 2)) || debug) {
    game.ord=ENify(0)
    game.over=0
    game.canInf=false
    game.OP=ENify(0)
    game.succAuto=ENify(0)
    game.limAuto=ENify(0)
    game.autoLoop={succ: 0, lim: 0}
    if (game.factorShifts >= 2) {
      game.boosters += (1-(game.prodChal==5))*Math.round(game.factorShifts / 8);
      if (game.factorShifts>=4) game.boostUnlock = 1;
    }
    game.factorShifts += 1
    game.manualClicksLeft=1000
    game.factors=[]
    game.dynamic=1
    game.decrementy=0
    game.autoLoop.succ=0
    game.autoLoop.lim=0

    

    for(let i=0;i<game.factorShifts*(game.pupgrades.includes(2)?2:1);i++) {
      game.factors.push(0)
    }
  }

  render()
  updateFactors()
  updateOmegaFactors()
}

function diagonalize(debug=false) {
  if (game.ord.gte(game.base**2)) {
    game.DP=game.DP.add(getDPgain())
    game.ord=ENify(0)
    game.over=0
    game.canInf=false
    game.OP=ENify(0)
    game.succAuto=ENify(0)
    game.limAuto=ENify(0)
    game.autoLoop={succ: 0, lim: 0}

    if (game.diagonalUp[4].eq(0)) {
      game.factorShifts = 0
      refund()
      game.boosters=0
      if (game.pupgrades.includes(1)) multiShift(7)
      if (game.pupgrades.includes(3)) multiShift(50)
    }
    game.manualClicksLeft=1000
    if (game.diagonalUp[5].eq(0)) game.factors=[]
    game.dynamic=1
    game.decrementy=0
    game.autoLoop.succ=0
    game.autoLoop.lim=0
    game.diagonalTime=0

    if (game.factors.length != game.factorShifts*(game.pupgrades.includes(2)?2:1)) {
      game.factors=[]
    for(let i=0;i<game.factorShifts*(game.pupgrades.includes(2)?2:1);i++) {
      game.factors.push(0)
    }}
  }

  render()
  updateFactors()
  updateOmegaFactors()
}

function multiShift(shiftNum)
{
  game.ord=ENify(0)
  game.over=0
  game.canInf=false
  game.OP=ENify(0)
  game.succAuto=ENify(0)
  game.limAuto=ENify(0)
  game.autoLoop={succ: 0, lim: 0}
  game.manualClicksLeft=1000
  game.factors=[]
  game.dynamic=1
  game.decrementy=0
  game.autoLoop.succ=0
  game.autoLoop.lim=0

  for(let i=game.factorShifts;i<shiftNum;i++) {
    game.factorShifts++;
    if (game.factorShifts >= 2) {game.boosters += (1-(game.prodChal==5))*Math.round(game.factorShifts / 8);}
  }

  for(let i=0;i<game.factorShifts*(game.pupgrades.includes(2)?2:1);i++) {
    game.factors.push(0)
  }

  render()
  updateFactors()
  updateOmegaFactors()
}

function buyFactor(n) {
  let factMult = typeof factorCostExp[n] == "undefined" ? 100 : factorCostExp[n]
  if (game.OP.gte(EN.pow(10**(n+1),EN.pow(factMult,game.factors[n]))) && (game.prodChal != 2)) {
    game.OP = EN.sub(game.OP, EN.pow(10**(n+1),EN.pow(factMult,game.factors[n])))
    game.factors[n] += 1
  }
  render()
  updateFactors()
}

function buyOmegaFactor(n)
{
  if (game.OP.gte(EN.fromHyperE("E" + (n + (false&&n>=1?0.92:1)) + "#" + (game.omegaFactors[n] + 1)))) // yes, hacky solution, i know.
  {
    if (game.OP < EN("e9e15"))
    {
      game.OP = game.OP.sub(EN.fromHyperE("E" + (n + (false&&n>=1?0.92:1)) + "#" + (game.omegaFactors[n] + 1)))
    }
    game.omegaFactors[n] += 1
  }
  render()
  updateOmegaFactors()
}

function debug() {
  game.ord=ENify(0)
  game.over=0
  game.canInf=false
  game.OP=ENify(0)
  game.succAuto=ENify(0)
  game.limAuto=ENify(0)
  game.autoLoop={succ: 0, lim: 0}
  game.factorShifts = 7
  game.base = 3
  game.manualClicksLeft=1000
  game.factors=[9,8,7,4,4,3,2]
  game.infUnlock = 1
  game.dynamic=1
  game.challenge=0
  game.chal8=0
  game.decrementy=0
  render()
  updateFactors()
  updateOmegaFactors()
  document.getElementById("infinityTabButton").style.display="inline-block"
}

function revertToPreBooster() {
  game.ord=ENify(0);
  game.over=0
  game.canInf=false
  game.OP=ENify(0);
  game.succAuto=ENify(0)
  game.limAuto=ENify(0)
  game.autoLoop={succ: 0, lim: 0}
  game.factorShifts = 7
  game.manualClicksLeft=1000
  game.base = 3
  game.factors=[9,8,7,4,4,3,2]
  game.infUnlock = 1
  game.dynamic=1
  game.challenge=0
  game.chal8=0
  game.decrementy=0
  render()
  updateFactors()
  document.getElementById("infinityTabButton").style.display="inline-block"
}

function V(n) {
  if (n<27) {
    let tempvar=0
    let tempvar2=0
    while (tempvar<n) {
      if (ordMarks[1][tempvar2][ordMarks[1][tempvar2].length-2]=="x") {
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
  if (game.upgrades.includes(7)) { // replaced
    game.autoOn.max=1-game.autoOn.max
  }
  render()
}

function toggleAutoInf() {
  if (game.upgrades.includes(11)) { // replaced
    game.autoOn.inf=1-game.autoOn.inf
  }
  render()
}

function toggleAutoShift() {
  if (game.pupgrades.includes(18)) {
    game.autoOn.shift=1-game.autoOn.shift
  }
  render()
}

function exitChallenge() {
  if (game.challenge > 0 || game.chal8==1) {
    game.ord=ENify(0);
    game.over=0
    game.canInf=false
    game.OP=ENify(0)
    game.succAuto=ENify(0)
    game.limAuto=ENify(0)
    game.autoLoop={succ: 0, lim: 0}
    game.factorShifts = 0
    game.manualClicksLeft=1000
    game.base = 10
    game.factors=[]
    game.boostUnlock=1
    game.dynamic=1
    game.challenge=0
    game.incrementy=EN(0)
    game.chal8=0
    game.decrementy=0
  }
}

function enterChallenge(c) {
  if (game.challenge == 0 && game.challengeCompletion[c-1] != 3 && game.chal8 == 0) {
    game.ord=ENify(0);
    game.over=0
    game.canInf=false
    game.OP=ENify(0)
    game.succAuto=ENify(0)
    game.limAuto=ENify(0)
    game.autoLoop={succ: 0, lim: 0}
    game.factorShifts = 0
    game.base = 10
    game.factors=[]
    game.boostUnlock=1
    game.dynamic=1
    game.challenge=c
    game.incrementy=EN(0)
  }
}

function enterChallenge8() {
  if (game.challenge == 0 && game.chal8Comp != 3) {
    game.ord=ENify(0);
    game.over=0
    game.canInf=false
    game.OP=ENify(0)
    game.succAuto=ENify(0)
    game.limAuto=ENify(0)
    game.autoLoop={succ: 0, lim: 0}
    game.factorShifts = 0
    game.base = 10
    game.factors=[]
    game.boostUnlock=1
    game.dynamic=1
    game.chal8=1
    game.incrementy=EN(0)
  }
}

function color(string,searches,color) {
  let target=string
  target=target.split("0").join("$")
  target=target.split("1").join("!")
  target=target.split("2").join("@")
  for (let i=0;i<searches.length;i++) {
    target = target.split(searches[i]).join("J" + color + "'>" +searches[i]+ "K")
  }
  target=target.split("J").join("<span style='color:")
  target=target.split("K").join("</span>")
  target=target.split("$").join("0")
  target=target.split("!").join("1")
  target=target.split("@").join("2")
  return target
}

function setMarks() {
ordMarks = [
  [
  "ψ(x)",
  "ψ(Ωx)",
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
  "BHO",
  "ψ(ψ<sub>2</sub>(Ω<sub>2</sub>+1)x)",
  "ψ(ψ<sub>2</sub>(Ω<sub>2</sub>+2)x)",
  "ψ(ψ<sub>2</sub>(Ω<sub>2</sub>2)x)",
  "ψ(ψ<sub>2</sub>(Ω<sub>2</sub>2+1)x)",
  "ψ(ψ<sub>2</sub>(Ω<sub>2</sub>2+2)x)",
  "ψ(ψ<sub>2</sub>(Ω<sub>2</sub><sup>2</sup>)x)",
  "ψ(ψ<sub>2</sub>(Ω<sub>2</sub><sup>2</sup>)x)"
  ],
  [
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
  "BHO",
  "ψ(ψ<sub>2</sub>(Ω<sub>2</sub>+1)x)",
  "ψ(ψ<sub>2</sub>(Ω<sub>2</sub>+2)x)",
  "ψ(ψ<sub>2</sub>(Ω<sub>2</sub>2)x)",
  "ψ(ψ<sub>2</sub>(Ω<sub>2</sub>2+1)x)",
  "ψ(ψ<sub>2</sub>(Ω<sub>2</sub>2+2)x)",
  "ψ(ψ<sub>2</sub>(Ω<sub>2</sub><sup>2</sup>)x)",
  "ψ(ψ<sub>2</sub>(Ω<sub>2</sub><sup>2</sup>)x)"
  ],
  [
  "ψ(Ωx)",
  "ψ(Ω^2×x)",
  "ψ(Ω^x)",
  "ψ(Ω^(Ω)×x)",
  "ψ(Ω^(Ω+1)×x)",
  "ψ(Ω^(Ω+2)×x)",
  "ψ(Ω^(Ω+x))",
  "ψ(Ω^(Ω2)×x)",
  "ψ(Ω^(Ω2+1)×x)",
  "ψ(Ω^(Ω2+2)×x)",
  "ψ(Ω^(Ω2+x))",
  "ψ(Ω^(Ωx))",
  "ψ(Ω^(Ω^2)×x)",
  "ψ(Ω^(Ω^2+1)×x)",
  "ψ(Ω^(Ω^2+2)×x)",
  "ψ(Ω^(Ω^2+x))",
  "ψ(Ω^(Ω^2+Ω)×x)",
  "ψ(Ω^(Ω^2+Ω+1)×x)",
  "ψ(Ω^(Ω^2+Ω+2)×x)",
  "ψ(Ω^(Ω^2+Ω+x))",
  "ψ(Ω^(Ω^2+Ω2)×x)",
  "ψ(Ω^(Ω^2+Ω2+1)×x)",
  "ψ(Ω^(Ω^2+Ω2+2)×x)",
  "ψ(Ω^(Ω^2+Ω2+x))",
  "ψ(Ω^(Ω^2+Ωx))",
  "ψ(Ω^(Ω^2×2)×x)",
  "ψ(Ω^(Ω^2×2+1)×x)",
  "ψ(Ω^(Ω^2×2+2)×x)",
  "ψ(Ω^(Ω^2×2+x))",
  "ψ(Ω^(Ω^2×2+Ω)×x)",
  "ψ(Ω^(Ω^2×2+Ω+1)×x)",
  "ψ(Ω^(Ω^2×2+Ω+2)×x)",
  "ψ(Ω^(Ω^2×2+Ω+x))",
  "ψ(Ω^(Ω^2×2+Ω2)×x)",
  "ψ(Ω^(Ω^2×2+Ω2+1)×x)",
  "ψ(Ω^(Ω^2×2+Ω2+2)×x)",
  "ψ(Ω^(Ω^2×2+Ω2+x))",
  "ψ(Ω^(Ω^2×2+Ωx))",
  "ψ(Ω^(Ω^2×x))",
  "ψ(Ω^(Ω^x))",
  "BHO",
  "ψ(ψ<sub>2</sub>(Ω<sub>2</sub>+1)x)",
  "ψ(ψ<sub>2</sub>(Ω<sub>2</sub>+2)x)",
  "ψ(ψ<sub>2</sub>(Ω<sub>2</sub>2)x)",
  "ψ(ψ<sub>2</sub>(Ω<sub>2</sub>2+1)x)",
  "ψ(ψ<sub>2</sub>(Ω<sub>2</sub>2+2)x)",
  "ψ(ψ<sub>2</sub>(Ω<sub>2</sub><sup>2</sup>)x)",
  "ψ(ψ<sub>2</sub>(Ω<sub>2</sub><sup>2</sup>)x)"
  ]
]
}

function preConvertHex(n) {
  if (n==0) {
    return ""
  } else {
    return preConvertHex(Math.floor(n/16+0.001)) + ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"][n%16]
  }
}

function convertHex(r,g,b) {
  let x=preConvertHex(r*65536+g*256+b)
  while (x.length < 6) {
    x = "0" + x
  }
  return "#" + x
}

function HSL(hue) {
  hue = hue <= 10 ** 20 ? ENify(hue).mod(360).toNumber() : 0;

  let X=(1-Math.abs((hue/60)%2-1))
  X=Math.round(X*255)
  let R=0
  let G=0
  let B=0
  if (hue<60) {
    R=255
    G=X
  } else if (hue<120) {
    R=X
    G=255
  } else if (hue<180) {
    G=255
    B=X
  } else if (hue<240) {
    G=X
    B=255
  } else if (hue<300) {
    B=255
    R=X
  } else {
    B=X
    R=255
  }
  return convertHex(R,G,B)
}

function colorWrap(string,coloring) {
  return (coloring=="no" || game.colors==0?string:"<span style='color:"+coloring+"'>"+string+"</span>") 
}

if (game.music>=1) document.getElementById("music").play();
document.getElementById("music").src=musicLink[game.music-1]
document.getElementById("music").muted=false

function ENify(x) {
  if (typeof x == "number") {
    return EN(x)
  } else {
    let newEN = new EN(0)
    newEN.array = x.array
    newEN.sign = x.sign
    newEN.layer = x.layer
    return newEN
  }
}

function timeSince(x) {
  return (Date.now()-x)/1000
}

function calcSlugMile() {
  let k=0
  while (game.leastBoost <= slugMile[k]) {
    k++
  }
  return k
}

function project(x) {
  console.log("This function should never be called!")
}

function time(x) {
  let timeList = [Math.floor(x/86400),Math.floor((x%86400)/3600),Math.floor((x%3600)/60),Math.floor(x%60)]
  let timeUnits = ["d ", "h ", "m ", "s"]
  while (timeList[0]==0) {
    timeList.shift()
    timeUnits.shift()
  }
  let timeOut = ""
  for (let i=0;i<timeList.length;i++) {
    timeOut += timeList[i]
    timeOut += timeUnits[i]
  }
  if (timeOut=="") timeOut = "<1s"
  return timeOut
}


function copyStringToClipboard(str) {
  var el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style = {
    position: "absolute",
    left: "-9999px"
  };
  document.body.appendChild(el);
  copyToClipboard(el)
  document.body.removeChild(el);
  alert("Copied to clipboard")
}

function copyToClipboard(el) {
    el = (typeof el === "string") ? document.querySelector(el) : el;
    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
        var editable = el.contentEditable;
        var readOnly = el.readOnly;
        el.contentEditable = true;
        el.readOnly = true;
        var range = document.createRange();
        range.selectNodeContents(el);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        el.setSelectionRange(0, 999999);
        el.contentEditable = editable;
        el.readOnly = readOnly;
    }
    else {
        el.select();
    }
    document.execCommand("copy");
}