var timeDimensionBaseCosts = [0, 1, 10, 100, 1000, "1e1000", "1e1600", "1e6000", "1e9800", "1e15000"]
var timeDimensionCostMults = [0, 3, 9, 27, 81, 1e80, 1e130, 1e160, 1.25e250, 2.1847447e300]
var timeDimensionBuyMults = [0, 4, 4, 4, 4, 4, 4, 4, 4, 4]

function TimeDimension(i) {
	this.id = game.timeDimensions.length;
	this.amount = new Decimal(0);
	this.bought = new Decimal(0);
	this.multiplier = new Decimal(1);
	this.cost = new Decimal(timeDimensionBaseCosts[i]);
	this.costMult = new Decimal(timeDimensionCostMults[i]);
}

function resetTimeDimensions() {
	game.timeDimensions = [];

	for(var i = 0; i <= 10; i++) {
		game.timeDimensions[i] = new TimeDimension(i);
	}
	
	game.timeDimensions[0].amount = new Decimal(0);
}

function getTimeDimensionProduction(i) {
	var dim = game.timeDimensions[i];
	
	dim.multiplier = Decimal.pow(timeDimensionBuyMults[dim.id], dim.bought)
  if(game.achievements.includes(91)) dim.multiplier = dim.multiplier.multiply(1.03)
	if(tree.hasStudy("t11") && i == 1) dim.multiplier = dim.multiplier.multiply(tree.getEff("t11"))
	if(tree.hasStudy("g21") && i == 2) dim.multiplier = dim.multiplier.multiply(tree.getEff("g21"))
	if(tree.hasStudy("g22") && i == 3) dim.multiplier = dim.multiplier.multiply(tree.getEff("g22"))
	if(tree.hasStudy("t21")) dim.multiplier = dim.multiplier.multiply(tree.getEff("t21"))
	if(tree.hasStudy("t22")) dim.multiplier = dim.multiplier.multiply(tree.getEff("t22"))
	if(tree.hasStudy("t31")) dim.multiplier = dim.multiplier.multiply(tree.getEff("t31"))
	if(tree.hasStudy("t51")) dim.multiplier = dim.multiplier.multiply(tree.getEff("t51"))
	if(tree.hasStudy("t52")) dim.multiplier = dim.multiplier.multiply(tree.getEff("t52"))
	if(tree.hasStudy("t61")) dim.multiplier = dim.multiplier.multiply(tree.getEff("t61"))
  if(tree.hasStudy("r52")) dim.multiplier = dim.multiplier.multiply(1e40)
  if(tree.hasStudy("c32")) dim.multiplier = dim.multiplier.multiply(tree.getEff("c32"))
  if(game.energize.upgrades.includes(2)) dim.multiplier = dim.multiplier.multiply(getEnergizeUpgradeEffect(2))
  if(game.achievements.includes(75)) dim.multiplier = dim.multiplier.multiply(getInfiniteTimeMult())
  if(game.eternityUpgrades.includes(5)) dim.multiplier = dim.multiplier.multiply(getInfinityUpgradeEffect(23))
  if(game.eternityUpgrades.includes(6)) dim.multiplier = dim.multiplier.multiply(getAchievementMultiplier())
  if(game.eternityUpgrades.includes(7)) dim.multiplier = dim.multiplier.multiply(Decimal.add(1, (i-1)*0.2))
  if(game.eternityUpgrades.includes(8)) dim.multiplier = dim.multiplier.multiply(getEternityUpgradeEffect(8))
  if(challengeCompleted(1,1)) dim.multiplier = dim.multiplier.pow(1.03)
  if(inDilation() && !game.achievements.includes(90)) dim.multiplier = dim.multiplier.pow(dilationPenalty())
  if(game.energize.upgrades.includes(0)) dim.multiplier = dim.multiplier.times(getEnergizeUpgradeEffect(0))
	
	return dim.amount.multiply(dim.multiplier);
}

function canBuyTimeDimension(i) {
	return game.timeDimensions[i].cost.lte(game.eternityPoints);
}

function buyTimeDimension(i) {
	var dim = game.timeDimensions[i];
	
	dim.cost = dim.costMult.pow(dim.bought).multiply(timeDimensionBaseCosts[i]);
	if(!canBuyTimeDimension(i)) return;
	game.eternityPoints = game.eternityPoints.subtract(dim.cost);
	
	dim.amount = dim.amount.add(1);
	dim.bought = dim.bought.add(1);
	
	dim.cost = dim.costMult.pow(dim.bought).multiply(timeDimensionBaseCosts[i]);
	
	return true;
}

function maxTimeDimension(i) {
	var dim = game.timeDimensions[i];
	if(!canBuyTimeDimension(i)) return;
	
	dim.bought = game.eternityPoints.divide(timeDimensionBaseCosts[i]).log10().divide(Decimal.log10(timeDimensionCostMults[i])).add(1).floor();
	dim.amount = dim.amount.max(dim.bought)
	dim.cost = dim.costMult.pow(dim.bought).multiply(timeDimensionBaseCosts[i]);
	if(game.eternityPoints.lt("eee1")) game.eternityPoints = game.eternityPoints.subtract(dim.cost.divide(timeDimensionCostMults[i]));
}

function maxAllTimeDimensions() {
	for(var i = 1; i < maxTimeD(); i++) maxTimeDimension(i);
}

function getTickspeedMultScaling() {
  // (game.dilation.upgrades.includes(10) ? new Decimal(4.85/3) : 
  let r = new Decimal(5/3)
	var a = game.timeDimensions[0].amount;
  a = a.gt(0) ? a.log10().divide(r.log10()).ceil().max(0) : new Decimal(0)
  if (a.gt(1e4)) r = r.mul(Decimal.pow(1.02, a.div(1e4)))
  return r
}

function getFreeTickspeedMult() {
	return getTickspeedMultScaling();
}

function getBaseTickspeedUpgrades() {
  if(inChallenge(1,2)) return new Decimal(0)
	var a = game.timeDimensions[0].amount;
  a = a.gt(0) ? a.log10().divide(getFreeTickspeedMult().log10()).ceil().max(0) : new Decimal(0)
  
	return a;
}

function getFreeTickspeedUpgrades() {
  if(inChallenge(1,2) || inChallenge(10,2)) return new Decimal(0)
	var a = getBaseTickspeedUpgrades()
  if(tree.hasStudy("t41")) a = a.multiply(tree.getEff("t41"))
  if(inChallenge(7,2)) a = a.multiply(1/3)
  if(challengeCompleted(7,2)) a = a.multiply(5/4)
  
	return a;
}

function getFreeTickspeedThreshold() {
	return getFreeTickspeedMult().pow(getBaseTickspeedUpgrades())
}

function maxTimeD() {
  var r = 4;
  
  if(tree.hasStudy("d12")) r += 2;
  if(tree.hasStudy("d21")) r += 2;
  if(tree.hasStudy("d22")) r += 1;
  
  return r+1;
}

function getInfiniteTimeMult() {
  var r = getFreeTickspeedUpgrades().add(game.tickspeed.bought)
  
  r = r.add(308).divide(308)
  
  return r;
}