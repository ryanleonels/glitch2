function speedPerSecond() {
  let sps = Accelerators.totalMult()
  if (player.ranks.rank.gte(2) && (player.hexachamber.in != 5 || player.ranks.tier.mod(2).eq(1))) sps = sps.mul(Decimal.pow(MetaPoints.hasUpgrade(3)?5:3,player.ranks.rank).pow(player.unlocks.collider?Hexachamber.colliderEffect(3):1))
  if (player.ranks.tier.gte(1)) sps = sps.mul(player.speed.pow(MetaPoints.hasUpgrade(4)?0.15:0.125).add(1))
  if (player.ranks.rank.gte(8) && (player.hexachamber.in != 5 || player.ranks.tier.mod(2).eq(1))) sps = sps.mul(Decimal.pow(2, player.ranks.tier.pow(2)))
  if (player.unlocks.metapoints) sps = sps.mul(MetaPoints.lapEffect())
  if (MetaPoints.hasUpgrade(1)) sps = sps.mul(MetaPoints.upgrades[1].effect())
  if (player.ranks.rank.gte(29) && (player.hexachamber.in != 5 || player.ranks.tier.mod(2).eq(0))) sps=sps.mul(Decimal.pow(1.1, (player.ranks.rank.gte(30) && (player.hexachamber.in != 5 || player.ranks.tier.mod(2).eq(1)))?player.ranks.rank.mul(player.ranks.tier):1))
  if (player.hexachamber.completions[3].gte(1)) sps=sps.mul(Hexachamber.reward(4))
  if (player.ranks.tier.gte(24)) sps=sps.mul(Decimal.pow(24, player.meta.totalAscenders))
  sps = sps.mul(ParticleAccelerators.speedMult())
  if (SpaceStudies.hasUpgrade(31)) sps = sps.mul(SpaceStudies.upgrades[31].effect())
  return sps;
}

// updates every tick
let previousExport = ""

function mainLoop(){
  // SIMPLE OFFLINE PROGRESS
  const diff = (Date.now()-player.lastTick)/1000
  player.lastTick = Date.now()
  
  // PRODUCE STUFF
  player.speed = player.speed.add(speedPerSecond().mul(diff))
  player.totalSpeed = player.totalSpeed.add(speedPerSecond().mul(diff))
  for (let i = 1; i < 7; i++) {
    player.accelerators[i].power = player.accelerators[i].power.add(Accelerators.producePower(i).mul(diff))
    player.goldenAccelerators[i].power = player.goldenAccelerators[i].power.add(GoldenAccelerators.producePower(i).mul(diff))
    player.particleAccelerators[i].power = player.particleAccelerators[i].power.add(ParticleAccelerators.producePower(i).mul(diff))
  }
  player.meta.purchases = player.accelerators[1].bought.add(player.accelerators[2].bought).add(player.accelerators[3].bought).add(player.accelerators[4].bought).add(player.accelerators[5].bought).add(player.accelerators[6].bought).add(player.goldenAccelerators[1].bought).add(player.goldenAccelerators[2].bought).add(player.goldenAccelerators[3].bought).add(player.goldenAccelerators[4].bought).add(player.goldenAccelerators[5].bought).add(player.goldenAccelerators[6].bought).sub(player.accelerators[1].bought.add(player.accelerators[2].bought).add(player.accelerators[3].bought).add(player.accelerators[4].bought).add(player.accelerators[5].bought).add(player.accelerators[6].bought).add(player.goldenAccelerators[1].bought).add(player.goldenAccelerators[2].bought).add(player.goldenAccelerators[3].bought).add(player.goldenAccelerators[4].bought).add(player.goldenAccelerators[5].bought).add(player.goldenAccelerators[6].bought).div(MetaPoints.lapLength()).floor().mul(MetaPoints.lapLength()))
  player.meta.lap = player.accelerators[1].bought.add(player.accelerators[2].bought).add(player.accelerators[3].bought).add(player.accelerators[4].bought).add(player.accelerators[5].bought).add(player.accelerators[6].bought).add(player.goldenAccelerators[1].bought).add(player.goldenAccelerators[2].bought).add(player.goldenAccelerators[3].bought).add(player.goldenAccelerators[4].bought).add(player.goldenAccelerators[5].bought).add(player.goldenAccelerators[6].bought).div(MetaPoints.lapLength()).floor()
  player.meta.hyperPurchases = player.accelerators[1].bought.add(player.accelerators[2].bought).add(player.accelerators[3].bought).add(player.accelerators[4].bought).add(player.accelerators[5].bought).add(player.accelerators[6].bought).add(player.goldenAccelerators[1].bought).add(player.goldenAccelerators[2].bought).add(player.goldenAccelerators[3].bought).add(player.goldenAccelerators[4].bought).add(player.goldenAccelerators[5].bought).add(player.goldenAccelerators[6].bought).sub(player.accelerators[1].bought.add(player.accelerators[2].bought).add(player.accelerators[3].bought).add(player.accelerators[4].bought).add(player.accelerators[5].bought).add(player.accelerators[6].bought).add(player.goldenAccelerators[1].bought).add(player.goldenAccelerators[2].bought).add(player.goldenAccelerators[3].bought).add(player.goldenAccelerators[4].bought).add(player.goldenAccelerators[5].bought).add(player.goldenAccelerators[6].bought).div(MetaPoints.hyperLapLength()).floor().mul(MetaPoints.hyperLapLength()))
  player.meta.hyperLap = player.accelerators[1].bought.add(player.accelerators[2].bought).add(player.accelerators[3].bought).add(player.accelerators[4].bought).add(player.accelerators[5].bought).add(player.accelerators[6].bought).add(player.goldenAccelerators[1].bought).add(player.goldenAccelerators[2].bought).add(player.goldenAccelerators[3].bought).add(player.goldenAccelerators[4].bought).add(player.goldenAccelerators[5].bought).add(player.goldenAccelerators[6].bought).div(1000).floor()
  if (player.unlocks.collider) {
    for (let i = 0; i < 6; i++) {
      player.hexachamber.resources[i] = player.hexachamber.resources[i].add(Hexachamber.resourcePerSec(i).mul(diff))
    }
  }
  
  // UPDATE TIMES
  player.timePlayed += diff;
  
  // UPDATE FUNCTIONS
  automate()
  for (let i = 1; i <= Achievements.length; i++) {
    if(Achievements.listOfRequirements()[i].goal()&&!player.achievements.includes(i)) player.achievements.push(i)
  }
  updateUnlocks();
  Hexachamber.checkCompletion();
  
  // NaN DETECTION
  if(Decimal.isNaN(player.speed)) {
    if (previousExport !== "") {
      exportAsFile(previousExport)
      alert("WARNING: NaN Detected! Your save file has been exported (unless your browser has blocked file downloads). Try clearing the local storage of the game and importing the exported save. Sorry for the inconvenience :(")
    } else {
      alert("WARNING: NaN Detected! Your save file could not be recovered. Please obtain another save or hard reset. Sorry for the inconvenience :(")
    }
  } else {
    previousExport = exportedSave()
  }
}

setInterval(mainLoop, 50);
function updateUnlocks() {
  if (player.speed.gte(1.874e43)) {player.unlocks.goldenAccelerators = true;}
  if (player.speed.gte(1e12)) {player.unlocks.ranks = true;}
  if (player.ranks.rank.gte(1)) {player.unlocks.tiers = true; player.unlocks.perks = true;}
  if (player.ranks.tier.gte(1)) {player.unlocks.prestige = true;}
  if (player.ranks.tier.gte(3)) {player.unlocks.metapoints = true}
  if (player.ranks.tier.gte(7)) {player.unlocks.ascenders = true}
  if (player.ranks.tier.gte(8)) {player.unlocks.hexachamber = true}
  if (player.ranks.prestige.gte(1)) {player.unlocks.collider = true}
  if ((player.hexachamber.completions[0].gte(6) && player.hexachamber.completions[3].gte(6))
     || (player.hexachamber.completions[1].gte(6) && player.hexachamber.completions[4].gte(6))
     || (player.hexachamber.completions[2].gte(6) && player.hexachamber.completions[5].gte(6))){
    player.unlocks.crafting = true;
  }
  if (player.meta.points.gte("1e540")) {player.unlocks.galactic = true}
}

function binarySearch(_cost, currency, ...others) {
    const cost = (c) => _cost(...others, c)
    if (currency.lt(cost(Decimal.dOne))) return Decimal.dZero
    
    let cantBuy = Decimal.dTwo
    while (currency.gte(cost(cantBuy.sub(1)))) {
      cantBuy = cantBuy.mul(2)
    }
    
    if (cantBuy.eq(2)) return Decimal.dOne
    
    let canBuy = cantBuy.div(2);
    
    const maxPrecise = cantBuy.lte(Number.MAX_SAFE_INTEGER);
    let maxTol = Decimal.dZero;
    
    while (cantBuy.sub(canBuy).gt(maxTol)) {
      const middle = canBuy.add(cantBuy).div(2).floor()
      if (currency.gte(cost(middle.sub(1)))) {
        canBuy = middle;
      } else {
        cantBuy = middle;
      }
      
      maxTol = maxPrecise ? Decimal.dOne : canBuy.mul(1e-9);
    }
    
    return canBuy;
  }

function automate() {
    const x = Decimal.pow(10,player.speed.div(1e11).log10().pow(1/1.1)).mul(1e11)

    for(i=1;i<7;i++) {
      if(player.autobuyers[i-1] && player.speed.lt(1e12) && player.speed.gte(Accelerators.cost(i))) {
        player.accelerators[i].bought = player.speed.div(i==1?10:Decimal.pow(100, i-1)).log(Decimal.pow(2, i)).add(1).floor()
      } else if (player.autobuyers[i-1] && player.speed.gte(1e12) && player.speed.gte(Accelerators.cost(i))) {
        player.accelerators[i].bought = x.div(i==1?10:Decimal.pow(100, i-1)).div(player.ranks.rank.gte(4) && i >= 4 && i <= 6 && (player.hexachamber.in != 5 || player.ranks.tier.mod(2).eq(1))?Decimal.pow(0.5, player.ranks.rank):1).max(1).log(Decimal.pow(2, i)).add(1).mul(player.ranks.rank.gte(3) && i >= 3 && i <= 6 && (player.hexachamber.in != 5 || player.ranks.tier.mod(2).eq(0)) ? 1.25 : 1).floor()
      }
    }
  
  for(i=1;i<7;i++) {
    if (player.goldenAutobuyers[i-1]){
      player.goldenAccelerators[i].bought=player.goldenAccelerators[i].bought.max(binarySearch(GoldenAccelerators.cost, player.speed, i))
    }
  }
  
  if(player.bestTier.gte(8)) {
    const amt = binarySearch(rankReq, player.speed).min(player.bestTier.lt(10) ? player.ranks.rank.add(1) : Decimal.dInf)
    player.ranks.rank = player.ranks.rank.max(amt)
    if (player.ranks.rank.gt(player.bestRank)) {
      player.perkPoints = player.perkPoints.add(player.ranks.rank.sub(player.bestRank));
      player.bestRank = player.ranks.rank;
    }
  }
}

// hotkeys
document.addEventListener("keydown", function onEvent(event) {

  switch (event.key) {
    case "1":
      Accelerators.buy(1)
    break;
    case "2":
      Accelerators.buy(2)
    break;
    case "3":
      Accelerators.buy(3)
    break;
    case "4":
      Accelerators.buy(4)
    break;
    case "5":
      Accelerators.buy(5)
    break;
    case "6":
      Accelerators.buy(6)
    break;
    case "m":
      if (player.unlocks.metapoints) MetaPoints.reset()
    break;
    case "S":
      save()
    break;
    case "E":
      exportSave()
    break;
    case "D":
      exportAsFile()
    break;
    case "R":
      hardReset()
    break;
  }
});