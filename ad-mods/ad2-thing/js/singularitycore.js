function getSingularityPowerGain() {
  let r = game.singularityEnergy
  
  r = r.multiply(getSingularityPowerMult())
  return r
}

function getSingularityPowerMult() {
  let r = new Decimal(5)
  
  r = r.add(game.repeatSiCo[1].bought.multiply(5))
  r = r.multiply(getTickspeed("singularityEnergy"))
  
  return r;
}
function getSingularityPowerPower() {
  let r = game.singularityPower.add(1)
  
  r = r.log(2).pow(2)
  return r.max(2);
}

function resetSingCoreUpgrades() {
  game.repeatSiCo = [
    {cost: new Decimal(100), costMult: new Decimal(100), bought: new Decimal(0)}, 
    {cost: new Decimal(1e5), costMult: new Decimal(1e3), bought: new Decimal(0)}, 
    {cost: new Decimal(1e7), costMult: new Decimal(1e5), bought: new Decimal(0)}, 
    {cost: new Decimal(1e9), costMult: new Decimal(1e7), bought: new Decimal(0)}
  ]
}

function getRepeatSiCoCost(i) {
  return game.repeatSiCo[i].cost.multiply(game.repeatSiCo[i].costMult.pow(game.repeatSiCo[i].bought))
}

function canBuyRepeatSiCo(i) {
  return game.singularityPower.gte(getRepeatSiCoCost(i));
}

function buyRepeatSiCo(i) {
  if(!canBuyRepeatSiCo(i)) return;
    game.singularityPower = game.singularityPower.subtract(getRepeatSiCoCost(i));
    game.repeatSiCo[i].bought = game.repeatSiCo[i].bought.add(1);
}

function singularityPowerReset() {
  if(game.planckParticles.lt(1)) return;
  singularity(true)
  game.singularityEnergy = game.singularityEnergy.add(getSPFormula())
  game.planckParticles = new Decimal("0")
}

function getSingularityEnergyMult() {
  return Decimal.pow(2, game.repeatSiCo[0].bought)
}

function getInfDimMultFromSingularityPower() {
  return Decimal.pow(game.singularityPower.add(1).pow(215), game.repeatSiCo[2].bought.pow(2)).max(1)
}

function getSPFormula() {
  let r = game.planckParticles.add(1)
  
  r = r.pow(1/2.5).multiply(getSingularityEnergyMult())
  
  return r.floor();
}

function resetWormhole() {
  game.wormhole = {
    scan: false,
    active: false,
    wormholeEnergy: new Decimal("0"),
    exoticMatter: new Decimal("0")
  }
}