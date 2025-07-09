function canShift() {
	return game.dimensions[game.shifts + 4].bought.gt(1) && game.shifts < 5 && !atInfinity() && !inChallenge(10) && !inChallenge(9, 1);
}

function shift() {
	if(!canShift()) return;
	game.shifts++;
	game.shiftTime = game.resetTime = Date.now();
	resetDimensions();
}

function getStartingShifts() {
	if(inChallenge(10)) return 0;
  if(inChallenge(9, 1)) return -2;
	return getChallengeSet() == 1 && !game.achievements.includes(25) ? 0 : game.infinityUpgrades.includes(3)*2 + game.infinityUpgrades.includes(7)*2 + game.infinityUpgrades.includes(11);
}

function canBoost() {
	if(inChallenge(10)) return game.dimensions[4].amount.gte(getDimensionBoostReq())
	if(inChallenge(9, 1)) return game.dimensions[2].amount.gte(getDimensionBoostReq())
	return game.dimensions[9].amount.gte(getDimensionBoostReq()) && game.shifts == 5 && !atInfinity() && (!inChallenge(8));
}

function boost(bulk) {
	if(!canBoost()) return;
	
	var bought = game.dimensions[inChallenge(10) ? game.distort && game.phononUpgrades.includes(4) ? 5 : 4 : inChallenge(9, 1) ? 2 : 9].amount.subtract(getDimensionBoostScaling()).divide(getDimensionBoostScaling()).add(1).floor();
	
	if(game.boosts.gte(bought)) return;
	
	game.totalBoosts = game.totalBoosts.add(bought);	
	game.boosts = bought;
	game.boostTime = game.resetTime = Date.now();
	resetDimensions();
  game.matter = new Decimal(1);
}

function getDimensionBoostScaling() {
	var r = 2;
	if(game.infinityUpgrades.includes(13)) r *= 0.75;
	if(game.phononUpgrades.includes(4)) r *= 0.75;
	if(inChallenge(10)) r /= 3;
  if(inChallenge(8, 1)) r *= 0.5
  if(inChallenge(9, 1)) r *= 1.15
	return r;
}

function getDimensionBoostReq() {
	return game.boosts.multiply(getTrueDimboostScaling()).add(getDimensionBoostScaling());
}

function getDimensionBoostPower() {
	var r = new Decimal(2);
  if(game.phononUpgrades.includes(0)) r = r.multiply(game.phonons.add(1).log(2.25).add(1))
	if(game.infinityUpgrades.includes(9)) r = r.multiply(1.25)
	if(game.infinityUpgrades.includes(24)) r = r.multiply(1.6)
  if(challengeCompleted(7,1)) r = r.multiply(game.galaxies.divide(20).add(1))
  r = r.multiply(getSingularityPowerPower())
  if(game.singularityUpgrades.includes(0)) r = r.multiply(game.infinityPoints.add(1).max(2).log(3).pow(3))
  if(game.phononUpgrades.includes(15)) r = r.multiply(1e5)
  r = r.multiply(getVoidDimensionsEffect())
	return r;
}

function getDimensionSupersonicStart() {
	return 1e3;
}

function getDimensionHypersonicStart() {
	return 1e5;
}

function getDimensionSupersonicPower() {
	return 0.5;
}

function getDimensionHypersonicPower() {
	return 0.5;
}

function getTrueDimboostScaling() {
  var r = new Decimal(getDimensionBoostScaling())
  return r.floor();
}

function getEffectiveDimensionBoosts() {
	var x = getDimensionSupersonicStart()
	var y = getDimensionHypersonicStart()
	
	var superScaling = game.boosts.subtract(x).multiply(getDimensionSupersonicPower()).add(x);
	
	if(game.boosts.lte(x)) return game.boosts.floor();
	if(superScaling.lte(y)) return superScaling.floor();
	return superScaling.subtract(y).pow(getDimensionHypersonicPower()).add(y).floor();
}

function getDimensionBoostEffect() {
	return Decimal.pow(getDimensionBoostPower(), getEffectiveDimensionBoosts().add(game.shifts));
}