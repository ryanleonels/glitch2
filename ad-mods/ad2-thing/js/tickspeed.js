function canBuyTickspeed() {
	return game.tickspeed.cost.lte(game.dimensions[0].amount) && !atInfinity()
}

function buyTickspeed(autobuyer = false) {
	var dim = game.tickspeed;
	
	// if(dim.cost.gt(Number.MAX_VALUE)) return maxTickspeed();
	
	if(!canBuyTickspeed()) return;
	game.dimensions[0].amount = game.dimensions[0].amount.subtract(dim.cost);
	if(inChallenge(9)) suffer(0);
	
	dim.bought = dim.bought.add(1);
  
  if(autobuyer == false) game.why += 1;
  if(game.why > 1e6) giveSAchievement(3)
	
	dim.cost = dim.cost.multiply(dim.costMult);
	if(dim.cost.divide(dim.costMult).gt(Number.MAX_VALUE)) dim.costMult = dim.costMult.multiply(tickCostMultIncrease);
	
	game.buyTime = Date.now();
	
	return true;
}

function maxTickspeed() {
	var dim = game.tickspeed;
	
	while(dim.cost.lte(Number.MAX_VALUE) && buyTickspeed());
	
	if(!canBuyTickspeed()) return;
	game.buyTime = Date.now();
	
	// Superbuying
	
	if(game.dimensions[0].amount.layer >= 3) {
		dim.cost = game.dimensions[0].amount;
		dim.bought = dim.cost.log10().sqrt().divide(Math.log(Math.log(game.tickCostMultIncrease)));
		return;
	}

	var a = Decimal.log10(game.tickCostMultIncrease).divide(2), 
		b = dim.costMult.log10().subtract(a), 
		c = dim.cost.log10().subtract(game.dimensions[0].amount.log10()),
		d = b.pow(2).subtract(a.multiply(c).multiply(4))
	
	if(d.lt(0)) return;
	
	var x = d.sqrt().subtract(b).divide(a.multiply(2)).add(1).floor();
	
	if(x.lt(1)) return;
	
	var newCost = dim.cost.multiply(dim.costMult.pow(x.subtract(1))).multiply(Decimal.pow(game.tickCostMultIncrease, x.subtract(1).multiply(x.subtract(2)).divide(2)))
	var newMult = dim.costMult.multiply(Decimal.pow(game.tickCostMultIncrease, x.subtract(1)));
	
	dim.bought = dim.bought.add(x);
	
	dim.cost = newCost.multiply(newMult);
	dim.costMult = newMult.multiply(game.tickCostMultIncrease);
}

function getTickspeed(name) {
	if(name == "dimension") return Decimal.pow(getTickPower(), game.tickspeed.bought);
	if(name == "infinityDimension" && game.singularityUpgrades.includes(8)) return Decimal.pow(getTickPower(), game.tickspeed.bought).pow(0.015);
  if(name == "singularityEnergy" && game.singularityUpgrades.includes(9)) return Decimal.pow(getTickPower(), game.tickspeed.bought).log(1e15).pow(0.105).max(1);
	return 1;
}

// Galaxies

function canGalaxy() {
	if(inChallenge(10)) return game.dimensions[4].amount.gte(getGalaxyReq())
	if(inChallenge(9, 1)) return game.dimensions[2].amount.gte(getGalaxyReq())
	return game.dimensions[9].amount.gte(getGalaxyReq()) && !atInfinity() && (!inChallenge(8) && !inChallenge(6, 1));
}

function galaxy() {
	if(!canGalaxy()) return;
	
	var bought = game.dimensions[inChallenge(10) ? game.distort && game.phononUpgrades.includes(4) ? 5 : 4 : inChallenge(9, 1) ? 2 : 9].amount.subtract(getTrueGalaxyScaling()).divide(getTrueGalaxyScaling()).add(1).floor();
	
	game.totalGalaxies = game.totalGalaxies.add(bought);
	game.galaxies = bought;
	
	game.shifts = getStartingShifts();
	game.boosts = new Decimal(0);
	game.galaxyTime = game.resetTime = Date.now();
  game.matter = new Decimal(1);
	resetDimensions();
}

function getGalaxyReq() {
	return game.galaxies.add(1).multiply(getTrueGalaxyScaling()).floor();
}

function getGalaxyScaling() {
  if(inChallenge(8, 1)) return 3;
  if(inChallenge(9, 1)) return 7;
	return 5;
}

function getTrueGalaxyScaling() {
  var r = new Decimal(getGalaxyScaling())
  return r.floor();
}

function getTickPower() {
	var r = Decimal.pow(1.1, getEffectiveGalaxies()).divide(10-inChallenge(12)*6).add(1);
	var ic3 = getChallengeReward(3, 1).multiply(getEffectiveGalaxies());
  if(game.distort && game.phononUpgrades.includes(1)) r = r.add(game.phonons.add(1).log(10).add(1))
	if(inChallenge(3, 1)) r = ic3.add(1);
	if(challengeCompleted(3, 1)) r = r.add(ic3)
  r.add(game.galaxies);
	return r;
}

function getEffectiveNormalGalaxies() {
	var r = game.galaxies;
	
	var x = getDistantGalaxyStart();
	var y = getRemoteGalaxyStart();
	var z = getDarkGalaxyStart();
	
	if(r.gt(x) && !(challengeCompleted(9, 1))) r = r.subtract(x).multiply(getDistantGalaxyPower()).add(x).floor();
	if(r.gt(x) && (challengeCompleted(9, 1))) r = r.subtract(x/10).multiply(getDistantGalaxyPower()).add(x).floor();
	if(r.gt(y)) r = r.subtract(y).pow(getRemoteGalaxyPower()).add(y).floor();
	if(r.gt(z)) r = Decimal.pow(10, r.subtract(z).log10().pow(getDarkGalaxyPower())).add(z).floor();
  if(inChallenge(7, 1)) r = r.divide(Decimal.log10(game.galaxies).divide(5).add(1));
  if(inChallenge(8, 1)) r = r.pow(1.01)
	
	return r.add(!inChallenge(11)+0);
}

function getEffectiveGalaxies() {
	return getEffectiveNormalGalaxies().multiply(getGalaxyPower());
}

function getGalaxyPower() {
	var r = new Decimal(1);
  if(game.phononUpgrades.includes(8)) r = r.multiply(2);
	if(game.infinityUpgrades.includes(15) && getChallengeSet() !== 1 && getChallengeSet() !== 2) r = r.multiply(2);
	if(game.infinityUpgrades.includes(25)) r = r.multiply(1.1);
  if(challengeCompleted(5, 1)) r = r.multiply(1.5)
  if(game.distort) r = r.multiply(0.08)

	
	return r;
}

function getDistantGalaxyStart() {
  if(game.phononUpgrades.includes(7)) return 150;
	return 100;
}

function getRemoteGalaxyStart() {
  if(game.phononUpgrades.includes(7)) return 900;
	return 700;
}

function getDarkGalaxyStart() {
  if(game.phononUpgrades.includes(7)) return 12000;
	return 9600;
}

function getDistantGalaxyPower() {
	return 0.5;
}

function getRemoteGalaxyPower() {
	return 0.5;
}

function getDarkGalaxyPower() {
	return 0.5;
}