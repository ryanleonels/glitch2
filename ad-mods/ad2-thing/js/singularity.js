function canPerformSingularity() {
  return game.distort && game.dimensions[0].amount.gte(new Decimal("1e60000"))
}

function gainedPlanckParticles() {
  return game.break ? game.dimensions[0].amount.pow(Decimal.divide(1, 60000)).divide(10).floor().multiply(gainedPPMult()) : new Decimal(1);
}

function gainedPPMult() {
  let r = new Decimal("1")
  
  r = r.multiply(Decimal.pow(40, game.repeatSiCo[3].bought))
  
  return r;
}

var singularityMilestones = [];

var singularityMilestoneRequirements = "1e210,1e200,1e70,1e20".split(",");

function singularity(forced) {
  if(!((game.distort && game.dimensions[0].amount.gte(new Decimal("1e60000"))) || !(!forced))) return;
  if(!forced) {
     game.planckParticles = game.planckParticles.add(gainedPlanckParticles())
  }
    bigCrunch(true);
    game.singularities = game.singularities.add(1)
    game.infinities = new Decimal("1")
    game.distort = false;
    resetInfinityDimensions()
    game.infinityPoints = new Decimal(1);
    for (var i = 0; i < 4; i++) {
      if(game.phonons.lt(singularityMilestoneRequirements[i])) game.singularityMilestones.push(i)
    }
    game.phonons = new Decimal(1)
    if(!game.singularityMilestones.includes(0))resetInfinityUpgrades()
    if(!game.singularityMilestones.includes(3))resetPhononUpgrades()
    if(!game.singularityMilestones.includes(0))showInfinityTab('infinityUpgrades')
    game.singularityPower = new Decimal("0")
    game.repeatInf[1] = 
      {cost: new Decimal(10), costMult: new Decimal(10), bought: new Decimal(0)}, 
    game.repeatPho = [
      {cost: new Decimal(10), costMult: new Decimal(10), bought: new Decimal(0)}, 
      {cost: new Decimal(100), costMult: new Decimal(20), bought: new Decimal(0)}, 
      {cost: new Decimal(1e5), costMult: new Decimal(30), bought: new Decimal(0)}, 
      {cost: new Decimal(1e8), costMult: new Decimal(250), bought: new Decimal(0)}
    ]
    for (var i = 1; i < 13; i++) {
      if(!game.singularityMilestones.includes(1))game.challenges[0][i].completed = false
      if(!game.singularityMilestones.includes(2))game.challenges[1][i].completed = false
    }
}

var singularityUpgrades = [];

var singularityUpgradesCosts = "1,4,4,8,168,1e3,5e3,4e5,5e5,6e5,1e7,1e10,5e10,3e12,5e15,1e30".split(",");

function canBuySingularityUpgrade(i) {
  if(game.singularityUpgrades.includes(i)) return false;
  if(game.planckParticles.lt(singularityUpgradesCosts[i])) return false;
  return true;
}

function BuySingularityUpgrade(i) {
  if(!canBuySingularityUpgrade(i)) return;
  game.planckParticles = game.planckParticles.subtract(singularityUpgradesCosts[i]);
  game.singularityUpgrades.push(i);
}