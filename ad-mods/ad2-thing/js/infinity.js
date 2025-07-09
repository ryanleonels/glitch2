function atInfinity() {
  if(game.distort) return !game.break && game.dimensions[0].amount.gte(Number.MAX_VALUE);
	return !game.break && game.dimensions[0].amount.gte(Number.MAX_VALUE);
}

function gainedInfinityPoints() {
  if(game.phononUpgrades.includes(2)) game.break ? game.dimensions[0].amount.pow(1/298).multiply(getInfinityPointMult()).divide(10).floor() : new Decimal(2);
	return game.break ? game.dimensions[0].amount.pow(1/308).multiply(getInfinityPointMult()).divide(10).floor() : new Decimal(1);
}

function gainedPlanckParticles() {
	return game.break ? game.dimensions[0].amount.pow(1/200000).divide(10).floor() : new Decimal(1);
}

function canPerformSingularity() {
  return game.distort && game.dimensions[0].amount.gte(new Decimal("1e200000"))
}

function getInfinityPointMult() {
  var r = Decimal.pow(getIPMultPower(), game.repeatInf[1].bought)
  if(game.singularityUpgrades.includes(3)) r = r.multiply(Decimal.pow(2, game.singularities))
  if(game.singularityUpgrades.includes(4)) r = r.multiply(game.infinities)
  r = r.multiply(Decimal.pow(5e6, game.repeatPho[2].bought))
	return r
}

function gainedPhonons() {
	return game.dimensions[0].amount.pow(Decimal.divide(1, getPhononFormula())).divide(10).floor().pow(0.25).multiply(getPhononMult()).floor();
}

function getPhononMult() {
  var r = Decimal.pow(3, game.repeatPho[0].bought)
  if(game.singularityUpgrades.includes(1)) r = r.multiply(100)
  if(game.phononUpgrades.includes(9)) r = r.multiply(game.phonons.add(1).log(10).add(1).pow(1.5))
  if(game.singularityUpgrades.includes(7)) r = r.multiply(Math.pow(getTimeSince("start") * 3, 0.1)+1)
  if(game.phononUpgrades.includes(11)) r = r.multiply(Decimal.log(getEffectiveDimensionBoosts().max(2), 2))
  return r
}

function getPhononFormula() {
  var f = new Decimal("285")
  
  if(game.repeatPho[3].bought.gt(0)) f = f.subtract(game.repeatPho[3].bought.pow(0.75)).max(1)
    
  return f;
}

function getIPMultPower() { //bruh
  var r = new Decimal(2);
  if(game.singularityUpgrades.includes(5)) r = r.add(1)
  return r;
}

function getInfinity() {
	if(getChallengeSet() == 2) return getChallengeGoal()
	return Number.MAX_VALUE
}

function bigCrunch(force) {
	if(game.dimensions[0].amount.lt(getInfinity()) && !force) return;
	
	if(!(game.bestInfinityTime < 60000 || game.break)) {
		showTab(lastTab);
		lastTab = null;
	}
	
	if(!force) {
		if(!game.distort) game.infinityPoints = game.infinityPoints.add(gainedInfinityPoints())
		game.infinities = game.infinities.add(infinitiedMultipler());
    if(game.distort)game.phonons = game.phonons.add(gainedPhonons())
		if(getTimeSince("infinity") < game.bestInfinityTime) game.bestInfinityTime = getTimeSince("infinity")
		
		giveAchievement(9)
    if(game.distort) giveAchievement(58)
		if(!game.heretic && !inChallenge(10)) giveAchievement(19)
		if(game.bestInfinityTime < 3600000) giveAchievement(22)
		if(game.bestInfinityTime < 60000) giveAchievement(31)
		if(game.bestInfinityTime < 1000) giveAchievement(40)
		game.heretic = false;

		if(inChallenge() && getChallengeSet() < 3) {
			var c = game.challenges[getChallengeSet()-1][(game.challengesRunning[0]-1)%12]
			c.completed = true;
			c.bestTime = Math.min(c.bestTime || Infinity, getTimeSince("infinity"));
			if(c.bestTime < 180000) giveAchievement(29)
			exitChallenge();
		}
		
		if(getChallengeCompletions() > 0) giveAchievement(23);
		if(game.challenges[0][9].completed) giveAchievement(24);
		if(getChallengeCompletions() > 11) giveAchievement(25);
    game.distort = false
	}
  
	
	game.infinityTime = Date.now();
	game.bestIPRate = new Decimal(0);
	
  //clearOutIDs()
	game.shifts = getStartingShifts();
  game.matter = new Decimal(1);
	game.boosts = new Decimal(0);
	game.galaxies = new Decimal(game.infinityUpgrades.includes(11)+0);
	resetDimensions();
}

var infinityUpgrades = [];

var infinityUpgradeCosts = "1,1,3,20,1,2,5,40,1,3,10,100,1,4,15,200,0,1e3,5e3,1e4,2e5,5e7,1e11,1e20,1e100,1e100,1e30,1e125,1e125,0,0,0".split(",");

var phononUpgrades = [];

var phononUpgradeCosts = "10,50,100,250,1e4,1e5,5e6,1e8,1e12,1e20,1e35,1e42,1e45,1e55,1e75,1e80".split(",");

function canBuyInfinityUpgrade(i) {
	if(game.infinityUpgrades.includes(i)) return false;
	if(game.infinityPoints.lt(infinityUpgradeCosts[i])) return false;
	if(i % 16 > 3 && !game.infinityUpgrades.includes(i - 4) && i < 16) return false;
	return true;
}

function buyInfinityUpgrade(i) {
	if(!canBuyInfinityUpgrade(i)) return;
	game.infinityPoints = game.infinityPoints.subtract(infinityUpgradeCosts[i]);
	game.infinityUpgrades.push(i);
}

function canBuyPhononUpgrade(i) {
  if(game.phononUpgrades.includes(i)) return false;
  if(game.phonons.lt(phononUpgradeCosts[i])) return false;
  return true;
}

function BuyPhononUpgrade(i) {
	if(!canBuyPhononUpgrade(i)) return;
	game.phonons = game.phonons.subtract(phononUpgradeCosts[i]);
	game.phononUpgrades.push(i);
}

function getRepeatInfCost(i) {
	return game.repeatInf[i].cost.multiply(game.repeatInf[i].costMult.pow(game.repeatInf[i].bought))
}

function canBuyRepeatInf(i) {
	if(i !== 1 && game.repeatInf[i].bought > 6 - i) return false;
	return game.infinityPoints.gte(getRepeatInfCost(i));
}

function buyRepeatInf(i) {
	if(!canBuyRepeatInf(i)) return;
	if(i == 1) {
		game.repeatInf[1].bought = game.infinityPoints.log10().floor();
		game.infinityPoints = game.infinityPoints.subtract(Decimal.pow(10, game.infinityPoints.log10().floor()))
	}
	else {
		game.infinityPoints = game.infinityPoints.subtract(getRepeatInfCost(i));
		game.repeatInf[i].bought = game.repeatInf[i].bought.add(1);
	}
}

function getRepeatPhoCost(i) {
	return game.repeatPho[i].cost.multiply(game.repeatPho[i].costMult.pow(game.repeatPho[i].bought))
}

function canBuyRepeatPho(i) {
	return game.phonons.gte(getRepeatPhoCost(i));
}

function buyRepeatPho(i) {
  	if(!canBuyRepeatPho(i)) return;
		game.phonons = game.phonons.subtract(getRepeatPhoCost(i));
		game.repeatPho[i].bought = game.repeatPho[i].bought.add(1);
    if(getRepeatPhoCost(i).gt("1e100")) game.repeatPho[i].costMult = game.repeatPho[i].costMult.add(game.repeatPho[i].costMult.log(8))
    if(getRepeatPhoCost(i).gt("1e2000")) game.repeatPho[i].costMult = game.repeatPho[i].costMult.multiply(game.repeatPho[i].costMult.log(10))
}

function buyMaxPhononUpgrade(i) {
		game.repeatPho[i].bought = game.phonons.log(game.repeatPho[i].costMult).floor();
		game.phonons = game.phonons.subtract(Decimal.pow(game.repeatPho[i].costMult, game.phonons.log(game.repeatPho[i].costMult).floor()))
}
function maxPhononUpgrades() {
	for (var i = 0; i < 4; i++) {buyMaxPhononUpgrade(i)
  }
}

function infinitiedMultipler() {
  let m = new Decimal("1")
  
  if(game.phononUpgrades.includes(13)) m = m.add(Math.pow(getTimeSince("infinity") + 1, 0.125))
  
  return m;
}

function getInfinityUpgradeEffect(n) {
	switch(n) {
		case 0:
			return Math.pow(getTimeSince("start") / 60000, 0.1)+1;
		case 1:
			return Math.pow(getTimeSince("infinity") / 60000, 0.25)+1
		case 2:
			return game.infinityPoints.divide(2).pow(1.25).add(1);
		case 4:
			return game.infinities.multiply(0.2).add(1)
		case 6:
			return game.infinityPoints.divide(9).pow(0.25).add(1);
		case 10: 
			return 0.1 / game.bestInfinityTime;
		case 17:
			return game.dimensions[0].amount.add(1).log10().pow(0.75).add(1);
		case 18:
			return game.totalAntimatter.add(1).log10().pow(0.75).add(1);
		case 19:
			return game.dimensions[9].amount.pow(1.5).add(1);
		case 20:
			return game.infinities.multiply(308).sqrt().add(1);
		case 21: 
			return Math.max(1e9 / getChallengeTimes(0), 1);
		case 22:
			return game.achievements.length ** (Math.log10(game.achievements.length+1)+1);
	}
}

function resetInfinityUpgrades() {
	game.infinityUpgrades = []
	game.repeatInf = [
		{cost: new Decimal(1e10), costMult: new Decimal(10), bought: new Decimal(0)}, 
		{cost: new Decimal(10), costMult: new Decimal(10), bought: new Decimal(0)}, 
		{cost: new Decimal(1e10), costMult: new Decimal(1e10), bought: new Decimal(0)}
	]
}
function resetPhononUpgrades() {
  game.phononUpgrades = []
	game.repeatPho = [
		{cost: new Decimal(10), costMult: new Decimal(10), bought: new Decimal(0)}, 
		{cost: new Decimal(100), costMult: new Decimal(20), bought: new Decimal(0)}, 
		{cost: new Decimal(1e5), costMult: new Decimal(30), bought: new Decimal(0)}, 
		{cost: new Decimal(1e8), costMult: new Decimal(250), bought: new Decimal(0)}
	]
}

function breakInfinity() {
	if(getChallengeCompletions() < 10) return;
	game.break = !game.break;
}

var egg;

function distortTime() {
  if(getChallengeCompletions(1) != 12) return;
  bigCrunch(true)
  game.distort = !game.distort
  resetDimensions();
  giveAchievement(58)
	game.shifts = getStartingShifts();
  game.matter = new Decimal(1);
	game.boosts = new Decimal(0);
	game.galaxies = new Decimal(game.infinityUpgrades.includes(11)+0);
	resetDimensions();
}