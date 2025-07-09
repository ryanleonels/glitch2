var voiDimensionBaseCosts = [0, 1e10, 1e13, 1e16, 1e35, 1e65, 1e90, 1e210, 1e275, 1e300]
var voiDimensionCostMults = [0, 1e3, 1e6, 1e8, 1e10, 1e15, 1e20, 1e25, 1e30, 1e35]
var voiDimensionBuyMults = [0, 2, 2, 2, 2, 2, 2, 2, 2, 2]

function voidDimension(i) {
	this.id = game.voidDimensions.length;
	this.amount = new Decimal(0);
	this.bought = new Decimal(0);
	this.boughtOverInf = new Decimal(0);
	this.multiplier = new Decimal(1);
	this.cost = new Decimal(voiDimensionBaseCosts[i]);
	this.costMult = new Decimal(voiDimensionCostMults[i]);
}
function resetVoidDimensions() {
	game.voidDimensions = [];

	for(var i = 0; i <= 10; i++) {
		game.voidDimensions[i] = new voidDimension(i);
	}
	
	game.voidDimensions[0].amount = new Decimal(1);
}

function getVoidDimensionProduction(i) {
	var dim = game.voidDimensions[i];
	
	dim.multiplier = Decimal.pow(voiDimensionBuyMults[dim.id], dim.bought)
  if(game.singularityUpgrades.includes(15)) dim.multiplier = dim.multiplier.multiply(game.totalGalaxies.log(10).max(1))
	
	return dim.amount.multiply(dim.multiplier);
}

function canBuyVoidDimension(i) {
	return game.voidDimensions[i].cost.lte(game.planckParticles)
}

function buyVoidDimension(i) {
	var dim = game.voidDimensions[i];
	
	dim.cost = dim.costMult.pow(dim.bought).multiply(voiDimensionCostMults[i]);
	if(!canBuyVoidDimension(i)) return;
	game.planckParticles = game.planckParticles.subtract(dim.cost);
	
	dim.amount = dim.amount.add(1);
	dim.bought = dim.bought.add(1);
	
	dim.cost = dim.costMult.pow(dim.bought).multiply(voiDimensionBaseCosts[i]);
	
	return true;
}

function maxVoidDimension(i) {
	var dim = game.voidDimensions[i];
	if(!canBuyVoidDimension(i)) return;
	dim.bought = game.infinityPoints.divide(voiDimensionBaseCosts[i]).log10().divide(Decimal.log10(voiDimensionCostMults[i])).add(1).floor();
  
	dim.amount = dim.amount.max(dim.bought)
	dim.cost = dim.costMult.pow(dim.bought).multiply(voiDimensionBaseCosts[i]);
	if(game.planckParticles.lt("eee1")) game.planckParticles = game.planckParticles.subtract(dim.cost.divide(infDimensionCostMults[i]));
}

function maxAllVoidDimensions() {
	for(var i = 1; i < 10; i++) maxInfinityDimension(i);
}

function getVoidDimensionsEffect() {
  return game.voidDimensions[0].amount.pow(1.25)
}