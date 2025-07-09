const EN = ExpantaNum
const get = x => document.getElementById(x)
const prestigeNames = ['Infinity', 'Eternity', 'Reality', 'Equality', 'Affinity', 'Celerity','Identity', 'Vitality', 'Immunity', 'Atrocity', 'Immensity', 'Severity', 'Fatality', 'Insanity', 'Unfunity','Calamity', 'Futility', 'Finality', 'Unity'];
const normalLayer = () => game.prestige[0]
const allLayer = () => game.prestige
let debug
let test
let game={}
reset()

function reset() {
  game = {
    prestige: [newLayer(EN(0))],
    lastTick: Date.now(),
    layerDisplay: EN(0)
  }
}

load(JSON.parse(localStorage.getItem("trueEternitySave")))

window.setInterval(function() {
  mainLoop()
}, 50)


window.setInterval(function() {
  save()
}, 2000)

function save() {
  localStorage.setItem('trueEternitySave', JSON.stringify(game))
}

function load(saveData) {
  if (typeof saveData != "undefined") {
    let saveCounter
    for (saveCounter in saveData) {
      game[saveCounter] = saveData[saveCounter]
    }
    for (saveCounter in game.prestige) {
      game.prestige[saveCounter].layer=ENify(game.prestige[saveCounter].layer)
      game.prestige[saveCounter].points=ENify(game.prestige[saveCounter].points)
      game.prestige[saveCounter].mult=ENify(game.prestige[saveCounter].mult)
      game.prestige[saveCounter].auto=ENify(game.prestige[saveCounter].auto)
      game.prestige[saveCounter].autoProg=ENify(game.prestige[saveCounter].autoProg)
    }
    game.layerDisplay=ENify(game.layerDisplay)
  }
  get("mainSubTabs").innerHTML=getCorrectButtons()
}

function ENify(x) {
  let newEN = new EN(0)
  newEN.array = x.array
  newEN.sign = x.sign
  newEN.layer = x.layer
  return newEN
}

function mainLoop() {
  let deltaTime = EN((Date.now()-game.lastTick)/1000)
  game.lastTick = Date.now()
  checkAutomation(deltaTime)
  normalLayer().points = EN(normalLayer().points).add(EN(normalLayer().mult).times(calcTotalMult(0)).times(deltaTime))
  for (let layerElement = 0;layerElement < game.prestige.length;layerElement++) {
    let thisLayer = game.prestige[layerElement]
  }
  render()
}

function loop(x) {
  game.lastTick -= x
  mainLoop()
}

function render() {
  get("number").innerHTML = beautify(normalLayer().points)
  get("numberps").innerHTML = "+" + beautify(EN(normalLayer().mult).times(calcTotalMult(0))) + "/s"
  get("doubleProd").style.display = ((EN(0).eq(game.layerDisplay))?"block":"none")
  get("lowerProd").style.display = (!(EN(0).eq(game.layerDisplay))?"block":"none")
  get("autoBuy").style.display = (!(EN(0).eq(game.layerDisplay))?"block":"none")
  get("prestigeAuto").style.display = (!(EN(0).eq(game.layerDisplay))?"block":"none")
  get("upgrades").style.display = (!(EN(0).eq(game.layerDisplay))?"block":"none")
  for (let i=0;i<game.prestige.length;i++) {
    let thisLayer = game.prestige[i]
    let pend = thisLayer.points.hyperlog(EN(thisLayer.layer.add(2)).toNumber())
    pend = EN.max(pend.floor(),(typeof game.prestige[thisLayer.layer.add(1).toNumber()] == "undefined" || !game.prestige[thisLayer.layer.add(1).toNumber()].upgrades.includes(1)?1:EN.arrow(10,thisLayer.layer.add(2),pend.minus(2).pow(0.25)).floor()))
    if (thisLayer.upgrades.includes(2)) {
      prestige(thisLayer.layer.minus(2),1)
    }
    if (EN(game.prestige[i].layer).eq(game.layerDisplay)) {
      get("prestigePoints").innerHTML = beautify(thisLayer.points) + " " + prestigeName(thisLayer.layer) + "points"
      get("prestigeMult").innerHTML = beautify(thisLayer.mult)
      get("doubleProd").innerHTML = "Double all production for " + beautify(EN(10).add(EN(90).times(normalLayer().mult.log10().divide(EN(2).log10())))) + " points"
      get("lowerProd").innerHTML = "Increase all lower production by 100% for 1 " + prestigeName(thisLayer.layer) +  "point"
      get("autoBuy").innerHTML = "Buy an autobuyer for 3 " + prestigeName(thisLayer.layer) +  "points"
      get("prestige").innerHTML = (pend.gte(2)?prestigeName(thisLayer.layer.add(1)) + "for " + beautify(pend) + " " + prestigeName(thisLayer.layer.add(1)) + "points":"Reach "+ beautify(EN.arrow(10,thisLayer.layer.add(1),10)) + " to "+prestigeName(thisLayer.layer.add(1)))
      get("prestigeAuto").innerHTML = "You have " + beautify(thisLayer.auto) + " Tier 1 autobuyers"
      get("ubupgrade1").style.display = (thisLayer.upgrades.includes(1)?"none":"block")
      get("bupgrade1").style.display = (!thisLayer.upgrades.includes(1)?"none":"block")
      get("ubupgrade2").style.display = (thisLayer.upgrades.includes(2)||thisLayer.layer.eq(1)?"none":"block")
      get("bupgrade2").style.display = (!thisLayer.upgrades.includes(2)?"none":"block")
      get("upgrade1").innerHTML = "Make the "+prestigeName(thisLayer.layer)+"formula better for 1000 "+prestigeName(thisLayer.layer)+"points"
      get("upgrade2").innerHTML = "Gain 1% of "+prestigeName(thisLayer.layer.minus(1))+"points gained on "+prestigeName(thisLayer.layer.minus(1))+"each second for 10 "+prestigeName(thisLayer.layer)+"points"
      get("uupgrade1").innerHTML = "Make the "+prestigeName(thisLayer.layer)+"formula better for 1000 "+prestigeName(thisLayer.layer)+"points"
      get("uupgrade2").innerHTML = "Gain 1% of "+prestigeName(thisLayer.layer.minus(1))+"points gained on "+prestigeName(thisLayer.layer.minus(1))+"each second for 10 "+prestigeName(thisLayer.layer)+"points"
    }
  }
}

function checkAutomation(dt) {
  if (game.prestige.length >= 1.5) {
    for (let i=1;i<game.prestige.length;i++) {
      let thisLayer = game.prestige[i]
      thisLayer.autoProg = thisLayer.autoProg.add(thisLayer.auto.times(dt).times(calcTotalMult(i)))
      thisLayer.inflation = 0
      if (thisLayer.layer.eq(1)) {
        if (normalLayer().points.gte(10**10)) {
          thisLayer.inflation = 1
        }
      } else {
        if (game.prestige[i-1].points.gte(10**10)) {
          if (game.prestige[i-1].inflation == 1) {
            if (game.prestige[i-1].upgrades.includes(1)||thisLayer.upgrades.includes(3)) {
              if (thisLayer.upgrades.includes(2)||((!typeof game.prestige[i+1] == "undefined")&&game.prestige[i+1].upgrades.includes(3))) {
                thisLayer.inflation = 1
              }
            }
          }
        }
      }
      if (thisLayer.autoProg.gte(1)) {
        if (thisLayer.layer.eq(1)) {
          let afford = EN.affordArithmeticSeries(game.prestige[0].points,EN(10),EN(90),game.prestige[0].mult.log10().divide(EN(2).log10()))
          let affordCost = EN.sumArithmeticSeries(afford,EN(10),EN(90),game.prestige[0].mult.log10().divide(EN(2).log10()))
          normalLayer().mult = normalLayer().mult.times(EN(2).pow(afford))
          normalLayer().points = normalLayer().points.minus(affordCost)
          thisLayer.autoProg = thisLayer.autoProg.minus(1)
          let cycles = thisLayer.autoProg.floor()
          if (thisLayer.autoProg.gte(1) && thisLayer.inflation == 1) {
            normalLayer().mult = EN.arrow(EN(10),EN(2),normalLayer().mult.slog().add(cycles))
            normalLayer().points = normalLayer().points.add(normalLayer().mult.times(calcTotalMult(0)).times(dt))
          }
          thisLayer.autoProg = thisLayer.autoProg.minus(cycles)
        } else {
          buyUp(2,i-1)
          buyUp(1,i-1)
          let afford = game.prestige[i-1].points.div(4).floor()
          let affordCost = afford.times(4)
          game.prestige[i-1].auto = game.prestige[i-1].auto.add(afford)
          game.prestige[i-1].mult = game.prestige[i-1].mult.add(afford)
          game.prestige[i-1].points = (game.prestige[i-1].points.gte("ee10")?game.prestige[i-1].points:game.prestige[i-1].points.minus(affordCost))
          thisLayer.autoProg = thisLayer.autoProg.minus(1)
          let cycles = thisLayer.autoProg.floor()
          if (thisLayer.autoProg.gte(1) && thisLayer.inflation == 1) {
            //BIG BUG ALERT
            //BIG BUG ALERT
            //BIG BUG ALERT
            //BIG BUG ALERT
            //BIG BUG ALERT
            //BIG BUG ALERT
            //BIG BUG ALERT
            //BIG BUG ALERT
            //BIG BUG ALERT
            //BIG BUG ALERT
            //BIG BUG ALERT
            //BIG BUG ALERT
            //BIG BUG ALERT
            //BIG BUG ALERT
            //BIG BUG ALERT
            //BIG BUG ALERT
            if (debug==1) {
              debug=0
              console.log(EN.arrow(10,thisLayer.layer.add(1),normalLayer().mult.hyperlog(thisLayer.layer.add(1).toNumber()).add(cycles)).toString())
              test=EN.arrow(10,thisLayer.layer.add(1),normalLayer().mult.hyperlog(thisLayer.layer.add(1).toNumber()).add(cycles))
            }
          }
          thisLayer.autoProg = thisLayer.autoProg.minus(cycles)
        }
      }
    }
  }
}

function beautify(x) {
  let k=EN(x).floor()
  if (k.lte(1e5)) {
    return k.toString()
  } else if (k.lte("ee5")) {
    let exponent = k.log10().floor()
    let mantissa = k.divide(EN(10).pow(exponent)).toNumber().toFixed(2)
    if (mantissa=="10.00") exponent = exponent.add(1)
    if (mantissa=="10.00") mantissa = "1.00"
    return mantissa + "e" + beautify(exponent)
  } else {
    return hyperE(k)
  }
}

function prestigeName(x) {
  if (EN(x).eq(0)) {
    return ""
  } else if (EN(x).lte(EN(prestigeNames.length))) {
    return prestigeNames[EN(x).minus(1).toNumber()] + " "
  } else {
    return "p" + beautify(x) + " "
  }
}


function buyDoubleProd() {
  if (normalLayer().points.gte(EN(10).add(EN(90).times(normalLayer().mult.log10().divide(EN(2).log10()))))) {
    normalLayer().points = normalLayer().points.minus(EN(10).add(EN(90).times(normalLayer().mult.log10().divide(EN(2).log10()))))
    normalLayer().mult = normalLayer().mult.times(2)
  }
}

function subTab(t) {
  game.layerDisplay = t
}

function addLayer(x) {
  game.prestige.push({layer: x, points: EN(0), mult: EN(1), auto: EN(0), autoProg: EN(0), upgrades: []})
}

function prestige(y=-1,noReset=0) {
  if (y==-1) {
    for (let i=0;i<game.prestige.length;i++) {
      if (game.prestige[i].layer.eq(game.layerDisplay)) {
        prestige(i)
      }
    }
  } else {
    let x=EN(y).toNumber()
    let thisLayer = game.prestige[x]
    let pend = thisLayer.points.hyperlog(EN(thisLayer.layer.add(2)).toNumber())
    pend = EN.max(pend.floor(),(typeof game.prestige[thisLayer.layer.add(1).toNumber()] == "undefined" || !game.prestige[thisLayer.layer.add(1).toNumber()].upgrades.includes(1)?1:EN.arrow(10,thisLayer.layer.add(2),pend.minus(2).pow(0.25)).floor()))
    if (pend.gte(2)) {
      if (noReset==0) {
        for (let i=0;i<=x;i++) {
          game.prestige[i]=newLayer(EN(i))
        }
      }
      if (typeof game.prestige[x+1] == "undefined") {
        game.prestige.push(newLayer(EN(x+1)))
        get("mainSubTabs").innerHTML=getCorrectButtons()
      }
      if (noReset==0) {
        game.prestige[x+1].points = game.prestige[x+1].points.add(pend)
      } else {
        game.prestige[x+1].points = game.prestige[x+1].points.add(pend.times(0.0002))
      }
    }
  }
}

function lowerProd(x=-1) {
  if (x==-1) {
    for (let i=0;i<game.prestige.length;i++) {
      if (game.prestige[i].layer.eq(game.layerDisplay)) {
        lowerProd(i)
      }
    }
  } else {
    let thisLayer = game.prestige[x]
    if (thisLayer.points.gte(1)) {
      thisLayer.points = thisLayer.points.minus(1)
      thisLayer.mult = thisLayer.mult.add(1)
    }
  }
}

function buyAutoBuy(x=-1) {
  if (x==-1) {
    for (let i=0;i<game.prestige.length;i++) {
      if (game.prestige[i].layer.eq(game.layerDisplay)) {
        buyAutoBuy(i)
      }
    }
  } else {
    let thisLayer = game.prestige[x]
    if (thisLayer.points.gte(3)) {
      thisLayer.points = thisLayer.points.minus(3)
      thisLayer.auto = thisLayer.auto.add(1)
    }
  }
}

function calcTotalMult(x) {
  let totalMult=EN(1)
  let raisePower = EN(1)
  if (game.prestige.length >= x+1.5) {
    for (let i=x+1;i<game.prestige.length;i++) {
      raisePower = game.prestige[i].layer.minus(game.prestige[i-1].layer)
      totalMult = totalMult.times(game.prestige[i].mult.pow(raisePower))
    }
  }
  return totalMult
}

function buyUp(n,x=-1) {
  if (x==-1) {
    for (let i=0;i<game.prestige.length;i++) {
      if (game.prestige[i].layer.eq(game.layerDisplay)) {
        buyUp(n,i)
      }
    }
  } else {
    let thisLayer = game.prestige[x]
    const upgradeCosts = [1000,10]
    if (!(thisLayer.layer.eq(1)&&n==2)&&(!thisLayer.upgrades.includes(n))&&thisLayer.points.gte(upgradeCosts[n-1])) {
      thisLayer.points = thisLayer.points.minus(upgradeCosts[n-1])
      thisLayer.upgrades.push(n)
    }
  }
}

function newLayer(x) {
  return {layer: x, points: EN(0), mult: EN(1), auto: EN(0), autoProg: EN(0), upgrades: [], inflation: 0}
}

function getCorrectButtons() {
  let corrBut = ""
  for (let i=0;i<game.prestige.length;i++) {
    corrBut += "<button class='tabButton subTabButton' onclick='subTab(EN(" + (game.prestige[i].layer) + "))'>" + (i==0?"Normal":prestigeName(game.prestige[i].layer)) + "</button><text class='invisible'>l</text>"
  }
  return corrBut
}

function hyperE(x) {
  let obj = EN(x).clone()
  if (obj.sign == -1) {
    obj.sign = 1
    return "-" + hyperE(x)
  }
  if (obj.normalize().array[obj.normalize().array.length-1][0] >= 10) {
    let zero = new EN(1)
    zero.layer = obj.layer + 1
    zero.array[0][1] = obj.normalize().array[obj.normalize().array.length-1][0]
    return hyperE(zero)
  }
  if (obj.layer >= 1) {
    let lay = obj.layer
    obj.layer = 0
    return "E10##" + beautify(obj.layer) + (lay==1?"":"#" + lay)
  }
  if (obj.lt("ee5")) {
    return obj.toString()
  }
  let arr=[0,0,0,0,0,0,0,0,0,0]
  for (x in obj.array) {
    arr[obj.array[x][0]] = obj.array[x][1]
  }
  while (arr[arr.length-1]==0) {
    arr.pop()
  }
  for (x in arr) {
    if (x==0) {
      arr[x] = Math.round(arr[x])
      if (arr[x] >= 100000) {
        arr[x] = Math.floor(Math.log10(arr[x]))
        arr[1] = arr[1] + 1
      }
    } else {
      if (x!=1) arr[x] += 1
      arr[x] = Math.round(arr[x])
      if (arr[x] >= 100000) {
        arr[x] = "E" + Math.floor(Math.log10(arr[x])).toString()
      }
    }
  }
  return "E" + arr.join("#")
}