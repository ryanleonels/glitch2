var blackHoleDimensionBaseCosts = [0, 1e3, 1e9, 1e12, 1e15, 1e90, 1e140, 1e200, 1e280, "1e400"]
var blackHoleDimensionCostMults = [0, 1e2, 1e6, 1e8, 1e10, 1e15, 1e20, 1e25, 1e30, 1e35]
var blackHoleDimensionBuyMults = [0, 50, 30, 10, 5, 5, 5, 5, 5, 5]

function blackHoleDimension(i) {
    this.id = game.blackHoleDimensions.length;
    this.amount = new Decimal(0);
    this.bought = new Decimal(0);
    this.multiplier = new Decimal(1);
    this.cost = new Decimal(blackHoleDimensionBaseCosts[i]);
    this.costMult = new Decimal(blackHoleDimensionCostMults[i]);
}

function resetBlackHoleDimensions() {
    game.blackHoleDimensions = [];
  game.blackHole = {
    unlocked: false,
    upgrades: [new Decimal(0),new Decimal(0),new Decimal(0)]
  }

    for(var i = 0; i <= 10; i++) {
        game.blackHoleDimensions[i] = new blackHoleDimension(i);
    }
    
    game.blackHoleDimensions[0].amount = new Decimal(1);
}

function getBlackHoleDimensionProduction(i) {
    var dim = game.blackHoleDimensions[i];
    
    dim.multiplier = Decimal.pow(blackHoleDimensionBuyMults[dim.id], dim.bought)
  if(inDilation()) dim.multiplier = dim.multiplier.pow(dilationPenalty())
    
    return dim.amount.multiply(dim.multiplier);
}

function canBuyBHDimension(i) {
    return game.blackHoleDimensions[i].cost.lte(game.exDilation)
}

function buyBlackHoleDimension(i) {
    var dim = game.blackHoleDimensions[i];
    
    dim.cost = dim.costMult.pow(dim.bought).multiply(blackHoleDimensionBaseCosts[i]);
    if(!canBuyBlackHoleDimension(i)) return;
    if(game.exDilation.lt(infp())) game.exDilation = game.exDilation.subtract(dim.cost);
    
    dim.amount = dim.amount.add(1);
    dim.bought = dim.bought.add(1);
    
    dim.cost = dim.costMult.pow(dim.bought).multiply(blackHoleDimensionBaseCosts[i]);
    
    return true;
}

function maxBlackHoleDimension(i) {
    var dim = game.blackHoleDimensions[i];
    if(!canBuyBHDimension(i)) return;
    
    dim.bought = game.exDilation.divide(blackHoleDimensionBaseCosts[i]).log10().divide(Decimal.log10(blackHoleDimensionCostMults[i])).add(1).floor();
    dim.amount = dim.amount.max(dim.bought)
    dim.cost = dim.costMult.pow(dim.bought).multiply(blackHoleDimensionBaseCosts[i]);
    if(game.exDilation.lt(infp())) game.exDilation = game.exDilation.subtract(dim.cost.divide(blackHoleDimensionCostMults[i]));
}

function getBHPowerEffect() {
    return game.blackHoleDimensions[0].amount.pow(0.03).max(1)
}

function getFreeRGUpgrades() {
  return 1
}

function getFreeRGThreshold() {
  return 1
}

function maxBHD() {
  return 4
}