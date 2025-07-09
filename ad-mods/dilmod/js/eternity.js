function haveEternitied() {
	return game.eternities.gt(0) || haveEnergized();
}

function atEternity() {
	return game.infinityPoints.gte(getEternity());
}

function gainedEternityPoints() {
	return game.infinityPoints.add(gainedInfinityPoints()).pow(1/308).multiply(getEternityPointMult()).divide(10).floor();
}

function getEternityPointMult() {
	r = repeatEterBoost()
  
  if(tree.hasStudy("n13")) r = r.multiply(1e30)
  if (game.dilation.upgrades.includes(5)) r = r.multiply(getDilationUpgradeEffect(5))
	
	return r;
}

function getEternityMult() {
	r = new Decimal(1);
  
	if(tree.hasStudy("g42")) r = r.multiply(tree.getEff("g42"))
	
	return r;
}

function getEternity() {
	if(getChallengeSet() == 3) return getChallengeGoal()
	return infp()
}

function getStartingIP() {
	r = 0
	if(game.achievements.includes(76)) r = 1e30
	if(game.achievements.includes(85)) r = 1e100
	return new Decimal(r)
}

function getFreeinfinities() {
  r = new Decimal(0)
  if(tree.hasStudy("r51")) r = r.add(game.infinities.divide(50))
  if(game.achievements.includes(102)) r = r.add(game.infinities.divide(20))
  return r;
}

function eternity(force) {
	if(!atEternity() && !force) return;
	
	if(!haveEternitied()) {
		showTab("dimensions")
		showDimensionTab("time")
	}
	
	if(!force) {
    if(game.infinityDimensions[0].amount.eq(1)) giveAchievement(81)
    if(game.dilation.active) game.dilation.tachyonParticles = game.dilation.tachyonParticles.add(gainedTP())
    if(getFreeinfinities().gt(0)) game.banked.infinities = game.banked.infinities.add(getFreeinfinities())
    if(game.energize.upgrades.includes(8) && !game.dilation.active) game.dilation.tachyonParticles = game.dilation.tachyonParticles.add(getEnergizeUpgradeEffect(8))
		giveAchievement(67);
		
		game.eternityPoints = game.eternityPoints.add(gainedEternityPoints())
		var time = getTimeSince("eternity");
		game.eternities = game.eternities.add(getEternityMult());
    if(game.eternities.gt(100)) giveAchievement(78)
		if(time < game.bestEternityTime) game.bestEternityTime = getTimeSince("eternity")
    if(game.bestEternityTime < 3e4) giveAchievement(76)
    if(time < 1e4 && game.dilation.active && gainedEternityPoints().gt("1e600")) giveAchievement(90)
    if(game.bestEternityTime < 1e3) giveAchievement(85)
    if(game.bestEternityTime < 1e2) giveAchievement(94)

		if(inChallenge() && getChallengeSet() == 3) {
			var c = game.challenges[2][(game.challengesRunning[0]-1)%12]
			c.completed = true;
			c.bestTime = Math.min(c.bestTime || Infinity, getTimeSince("eternity"));
      giveAchievement(82)
			exitChallenge();
		}
	}
	
  if(!eternityMilestone("keepIT")) game.bestInfinityTime = Infinity;
	for(var i = (eternityMilestone("keepNC")+eternityMilestone("keepIC"))*12; i < 24; i++) game.challenges[Math.floor(i/12)][i%12].completed = false;
	if(eternityMilestone("iShift")) game.infinityShifts = 9;
	
	if(eternityMilestone("keepBI"));
	else if(eternityMilestone("keepIU")) game.infinityUpgrades = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
	else resetInfinityUpgrades();
	game.repeatInf = [
		{cost: new Decimal(10), costMult: new Decimal(10), bought: new Decimal(0)}, 
		{cost: new Decimal(1e10), costMult: new Decimal(10), bought: new Decimal(0)}, 
		{cost: new Decimal(1e10), costMult: new Decimal(1e10), bought: new Decimal(0)}
	]
	
	game.infinityTime = game.eternityTime = Date.now();
	game.bestIPRate = game.bestEPRate = new Decimal(0);
	game.infinityPoints = game.infinities = new Decimal(0);
	resetInfinityDimensions();
  game.infinityPoints = getStartingIP()
	game.shifts = getStartingShifts();
	game.boosts = new Decimal(0);
	game.galaxies = new Decimal(0);
  game.replicanti.amount = new Decimal(1);
  game.replicanti.ticks = 0;
	game.replicanti.galaxies = new Decimal(0);
	resetDimensions();
  game.dilation.active = false
	
	return true;
}

function respecTimeStudies(test = true) {
  if(!atEternity()) return;
	game.timestudy.theorems = getTotalTT();
	game.timestudy.studies = [];
	eternity();
}

var eternityUpgradeCosts = "20, 400, 5000, 6e4, 8e5, 4e8, 1e15, 1e21, 1e43, 1e60, 1e140, 1e170, 1e200, 1e260, 1e280, 1e380, 1e500, 1e620, 1e700, 1e880".split(",");

function canBuyEternityUpgrade(i) {
	if(game.eternityUpgrades.includes(i)) return false;
	if(game.eternityPoints.lt(eternityUpgradeCosts[i])) return false;
	return true;
}

function buyEternityUpgrade(i) {
	if(!canBuyEternityUpgrade(i)) return;
	game.eternityPoints = game.eternityPoints.subtract(eternityUpgradeCosts[i]);
	game.eternityUpgrades.push(i);
}

function getEternityUpgradeEffect(n) {
	switch(n) {
		case 0:
			return game.eternityPoints.max(1);
		case 1:
			return game.eternities.pow(game.eternities.log10()).max(1);
		case 2:
			return Math.max(1e25 / getChallengeTimes(1) ** 4, 1)
		case 3:
			return game.infinityDimensions[9].bought.pow(10).max(1)
		case 4:
			return game.timeDimensions[0].amount.pow(0.5).max(1)
    case 8:
      return game.replicanti.galaxies.add(1).pow(0.125).max(1)
    case 9:
      return getSacrificeMult().add(1).log(1.65404).pow(2).max(1)
    case 10:
      return game.dimensions[0].amount.add(1).log("1e1200000").max(1).pow(1/3).max(1)
    case 11:
      return game.infinityPoints.add(gainedInfinityPoints()).add(1).log("1e20000").max(1).pow(1/3).max(1)
    case 12:
      return (game.eternityPoints.eq("NaN") ? 1 : game.eternityPoints.add(gainedEternityPoints()).add(1).log("1e300").max(1).pow(1/3).max(1))
    case 13:
      return game.infinityDimensions[0].amount.add(1).log("1e50000").pow(1/3).max(1).max(1)
    case 14:
      return game.timeDimensions[0].amount.add(1).log("1e2000").max(1).pow(1/3).max(1)
	}
}

function getEUDescriptions() {
	return [
		"Infinity Dimensions are multiplied by unspent EP<br>Currently: " + shortenMoney(getEternityUpgradeEffect(0)) + "x",
		"Infinity Dimensions get a multiplier based on eternitites<br>Currently: " + shortenMoney(getEternityUpgradeEffect(1)) + "x",
		"Infinity Dimensions get a multiplier based on IC times<br>Currently: " + shortenMoney(getEternityUpgradeEffect(2)) + "x",
		"Infinity Dimensions get a multiplier based on ninth IDs<br>Currently: " + shortenMoney(getEternityUpgradeEffect(3)) + "x",
		"Infinity Dimensions get a multiplier based on time shards<br>Currently: " + shortenMoney(getEternityUpgradeEffect(4)) + "x",
		"The first 2 infinity upgrades affect Time Dimensions<br>Currently: " + shorten(getInfinityUpgradeEffect(23)) + "x",
		"Your achievement multiplier affects Time Dimensions<br>Currently: " + shortenMoney(getAchievementMultiplier()) + "x",
		"Time Dimensions gain a boost based on their tier.<br>Currently: " + shortenMoney(20) + "% extra per tier",
		"Time Dimensions gain a boost based on replicanti galaxies.<br>Currently: " + shorten(getEternityUpgradeEffect(8)) + "x",
		"4th Time Dimension gains a boost based on sacrifice.<br>Currently: " + shorten(getEternityUpgradeEffect(9)) + "x",
    "Dilated time gain is boosted based on antimatter.<br>Currently: " + shorten(getEternityUpgradeEffect(10)) + "x",
    "Dilated time gain is boosted based on infinity points.<br>Currently: " + shorten(getEternityUpgradeEffect(11)) + "x",
    "Dilated time gain is boosted based on eternity points.<br>Currently: " + shorten(getEternityUpgradeEffect(12)) + "x",
    "Tachyon particle gain is boosted based on infinity power.<br>Currently: " + shorten(getEternityUpgradeEffect(13)) + "x",
    "Tachyon particle gain is boosted based on time shards.<br>Currently: " + shorten(getEternityUpgradeEffect(14)) + "x"
	]
}

function resetEternityUpgrades() {
	game.eternityUpgrades = []
	game.repeatEter = [
		new Decimal(0),
	]
}

function getRepeatEterCost(i) {
	return new Decimal(["100"][i]).multiply(new Decimal(["100"][i]).pow(game.repeatEter[i]))
}

function canBuyRepeatEter(i) {
	return game.eternityPoints.gte(getRepeatEterCost(i));
}

function buyRepeatEter(i) {
	if(!canBuyRepeatEter(i)) return;
	if(i) {
		if(game.eternityPoints.lt(infp())) game.eternityPoints = game.eternityPoints.subtract(getRepeatEterCost(i));
		game.repeatEter[i] = game.repeatEter[i].add(1);
	}
	else {
		game.repeatEter[0] = game.eternityPoints.log10().divide(2).floor();
		if(game.eternityPoints.lt(infp())) game.eternityPoints = game.eternityPoints.subtract(Decimal.pow(100, game.eternityPoints.log10().divide(2).floor()))
	}
	return true;
}

function repeatEterBoost() {
  let m = Decimal.pow(5, game.repeatEter[0])
  if (m.gt(1e200)) m = m.sqrt().mul(Decimal.sqrt(1e200))
  return m
}

var eternityMilestones = {
	keepNC: {req:   1, desc: "You start with all challenges completed"},
	ipMult: {req:   2, desc: "Unlock IP Multiplier autobuyer"},
	keepIU: {req:   3, desc: "You keep your infinity upgrades"},
	keepIT: {req:   5, desc: "You keep your best infinity time"},
	keepBI: {req:   8, desc: "You keep your break infinity upgrades"},
	keepIC: {req:  10, desc: "You keep IC completions."},
	iAuto1: {req:  11, desc: "Unlock Infinity Dimension autobuyer 1"},
	iAuto2: {req:  12, desc: "Unlock Infinity Dimension autobuyer 2"},
	iAuto3: {req:  13, desc: "Unlock Infinity Dimension autobuyer 3"},
	iAuto4: {req:  14, desc: "Unlock Infinity Dimension autobuyer 4"},
	iAuto5: {req:  15, desc: "Unlock Infinity Dimension autobuyer 5"},
	iAuto6: {req:  16, desc: "Unlock Infinity Dimension autobuyer 6"},
	iAuto7: {req:  17, desc: "Unlock Infinity Dimension autobuyer 7"},
	iAuto8: {req:  18, desc: "Unlock Infinity Dimension autobuyer 8"},
	iAuto9: {req:  19, desc: "Unlock Infinity Dimension autobuyer 9"},
	iShift: {req:  20, desc: "Unlock Infinity Shift autobuyer"},
	etAuto: {req: 100, desc: "Unlock Eternity autobuyer"},
	repGal: {req: 150, desc: "Unlock Replicanti Galaxy autobuyer"},
	repCha: {req: 175, desc: "Unlock Replicanti Chance autobuyer"},
	repInt: {req: 200, desc: "Unlock Replicanti Interval autobuyer"},
	repMax: {req: 250, desc: "Unlock Max Replicanti Galaxy autobuyer"},
}

function eternityMilestone(id) {
	return game.eternities.gte(eternityMilestones[id].req)
}

function resetDilation() {
  game.dilation = {
    unlocked: false,
    active: false,
    tachyonParticles: new Decimal(0),
    dilatedTime: new Decimal(0),
    galaxyThreshold: new Decimal(1000),
    thresholdUpSpeed: new Decimal(5),
    freeGalaxies: new Decimal(0),
    generatedTT: new Decimal(0),
    upgrades: [],
    repeatUpgr: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
  }
}

function unlockedDilation() {
  return game.dilation.unlocked || tree.hasStudy("d11")
}

function inDilation() {
  return game.dilation.active
}

function gainedTP() {
  let thing = game.dilation.repeatUpgr[2].add(1)
	if(tree.hasStudy("i52")) thing = thing.multiply(tree.getEff("i52"))
  if(game.exDilation.upgrades.includes(0)) thing = thing.add(getExDilationUpgradeEffect(0))
  let tpFormula = Decimal.add(1.5, thing.log(3.5).divide(3))
  return game.dimensions[0].amount.log(10).div(4000).pow(tpFormula.add(1.5)).multiply(extraTPMult()).subtract(game.dilation.tachyonParticles.add(1).div(2)).max(0)
}

function extraTPMult() {
  let r = new Decimal("1").div(1e5)
  
  for (var i = 13; i < 15; i++) if(game.eternityUpgrades.includes(i)) r = r.multiply(getEternityUpgradeEffect(i))
  if(game.exDilation.upgrades.includes(2)) r = r.multiply(getExDilationUpgradeEffect(2))
  r=r.multiply(Decimal.pow(4,game.dilation.repeatUpgr[3]))
  if(tree.hasStudy("p52")) r = r.multiply(tree.getEff("p52"))
  if (game.dilation.upgrades.includes(6)) r = r.multiply(getDilationUpgradeEffect(6))
  return r;
}

function dilate() {
  eternity(true)
  giveAchievement(88)
  game.dilation.active = true
}
var dilationRepUpgradeCosts = "100, 1000, 10000, 100000".split(",");

var dilationRepUpgradeCostMults = "100, 100, 100, 100".split(",");

function getRepeatDilDesc() {
  return [
    "You gain twice as much dilated time.<br>Currently: " + shorten(Decimal.pow(2, game.dilation.repeatUpgr[0])) + "x",
    "Free galaxy threshold is reduced, but reset dilated time and free galaxies.<br>Currently: " + shorten(getFreeGalaxiesMult()) + "x",
    "Tachyon particle formula is better.<br>Currently: ^" + shorten(Decimal.add(1.5, game.dilation.repeatUpgr[2].add(1).log(3.5).divide(3))),
    "Quadruple tachyon particle gain.<br>Currently: " + shorten(Decimal.pow(4, game.dilation.repeatUpgr[3])) + "x"
  ]
}

function getRepeatDilCost(i) {
	return new Decimal(dilationRepUpgradeCosts[i]).multiply(new Decimal(dilationRepUpgradeCostMults[i]).pow(game.dilation.repeatUpgr[i]))
}

function canBuyRepeatDil(i) {
	return game.dilation.dilatedTime.gte(getRepeatDilCost(i));
}

function buyRepeatDil(i) {
	if(!canBuyRepeatDil(i)) return;
		game.dilation.repeatUpgr[i] = game.dilation.dilatedTime.divide(dilationRepUpgradeCosts[i]).multiply(100).log10().divide(2).floor();
		if(game.dilation.dilatedTime.lt(infp())) game.dilation.dilatedTime = game.dilation.dilatedTime.subtract(Decimal.pow(dilationRepUpgradeCostMults[i], game.dilation.dilatedTime.log10().divide(2).floor()))
    if(i == 1) {
        game.dilation.dilatedTime = new Decimal(0),
        game.dilation.galaxyThreshold = new Decimal(1000),
        game.dilation.freeGalaxies = new Decimal(0),
        game.dilation.thresholdUpSpeed = new Decimal(5).divide(Decimal.add(1, game.dilation.repeatUpgr[1].add(1).log(10)))
    }
	return true;
}

var dilationUpgradeCosts = "100, 1e6, 1e9, 1e18, 1e24, 1e26, 1e29, 1e34, 1e45, 1e55, 1e70, 1e100".split(",");


function getTTScaling() {
  if(game.timestudy.theorems.lt(2e7)) {
    return new Decimal(1)
  }
  else return game.timestudy.theorems.divide(2e7).max(1)
}

function getDUDescriptions() {
	return [
    "Dilated galaxies are two times as powerful.",
		"Normal dimensions get a multiplier based on Dilated Time.<br>Currently: " + shorten(getDilationUpgradeEffect(1)) + "x",
		"Eternities make Replicanti run faster.<br>Currently: " + shorten(getDilationUpgradeEffect(2)) + "x",
		"Dilated time boosts replicanti replication chance.<br>Currently: +" + shorten(getDilationUpgradeEffect(3)) + "%",
		"The infinity point formula is better.",
		"Tachyon particles multiply eternity point gain.<br>Currently: " + shorten(getDilationUpgradeEffect(5)) + "x",
		"Dilated time multiplies tachyon particle gain.<br>Currently: " + shorten(getDilationUpgradeEffect(6)) + "x",
    "Tachyon particles automatically produce time theorems.<br>Currently: " + shorten(getDilationUpgradeEffect(7)) + "/s",
	]
}
function getDilationUpgradeEffect(n) {
	switch(n) {
		case 1:
			return game.dilation.dilatedTime.pow(25).max(1);
		case 2:
			return game.eternities.mul(2).sqrt().max(1);
		case 3:
			return game.dilation.dilatedTime.add(1).log10();
		case 5:
			return game.dilation.tachyonParticles.pow(1.25).max(1);
		case 6:
			return game.dilation.dilatedTime.pow(1/10).max(1);
		case 7:
			return game.dilation.tachyonParticles.pow(1/5).div(1e5).max(1);
	}
}

function canBuyDilationUpgrade(i) {
	if(game.dilation.upgrades.includes(i)) return false;
	if(game.dilation.dilatedTime.lt(dilationUpgradeCosts[i])) return false;
	return true;
}

function buyDilationUpgrade(i) {
	if(!canBuyDilationUpgrade(i)) return;
	game.dilation.dilatedTime = game.dilation.dilatedTime.subtract(dilationUpgradeCosts[i]);
	game.dilation.upgrades.push(i);
}

function getDilationToimeMult() {
  let r = Decimal.pow(2, game.dilation.repeatUpgr[0])
  
  for (var i = 10; i <= 12; i++) if(game.eternityUpgrades.includes(i)) r = r.multiply(getEternityUpgradeEffect(i))
  if(game.exDilation.upgrades.includes(2))r=r.multiply(getExDilationUpgradeEffect(2))
  if(tree.hasStudy("p51")) r = r.multiply(tree.getEff("p51"))
  return r
}

function getDilationTimeGain() {
  let r = game.dilation.tachyonParticles
  r = r.multiply(getDilationToimeMult())
  r = r.div(100)
  return r
}

function getFreeGalaxiesMult() {
  let r = new Decimal(2)
  
  r = r.add(Decimal.add(3.65,Decimal.pow(0.8, game.dilation.repeatUpgr[1])))
  
	return r;
}

function getFreeGalaxiesThreshold() {
  return getFreeGalaxiesMult().pow(getFreeDilatedGalaxies())
	if(game.exDilation.upgrades.includes(3)) return getFreeGalaxiesMult().pow(getFreeDilatedGalaxies().subtract(getExDilationUpgradeEffect(3)))
}

function getFreeDilatedGalaxies() {
	var a = game.dilation.dilatedTime;
  a = a.gt(0) ? a.log10().divide(getFreeGalaxiesMult().log10()).ceil().max(0) : new Decimal(0)
  
  if(game.exDilation.upgrades.includes(3)) a = a.add(getExDilationUpgradeEffect(3))
  
	return a;
}

function resetExDilation() {
  game.exDilation = {
    amount: new Decimal(0),
    upgrades: [],
    repeatUpgr: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
  }
}

function getExDilationMult() {
  let m = Decimal.pow(2, game.exDilation.repeatUpgr[0])
  
  return m
}

function exDilate(confirmation = false) {
  if(game.dilation.dilatedTime.log(10).gt(5)) {
    if(confirmation || confirm("Are you sure you want to ex-dilate? This will Eternity, as well as reset your tachyon particles, dilated time, and repeatable dilation upgrades. However, in exchange, you get " + shorten(game.dilation.dilatedTime.log(10).divide(5).multiply(Decimal.pow(2, game.exDilation.repeatUpgr[0]))) + " ex-dilation based on your tachyon particles. Are you ready?")) {
        game.exDilation.amount = game.exDilation.amount.add(game.dilation.dilatedTime.log(10).divide(5).multiply(getExDilationMult()))
        game.dilation.dilatedTime = new Decimal(0)
        game.dilation.galaxyThreshold = new Decimal(1000)
        game.dilation.freeGalaxies = new Decimal(0)
        game.dilation.thresholdUpSpeed = new Decimal(5)
        game.dilation.tachyonParticles = new Decimal(0)
        game.dilation.repeatUpgr = [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
        giveAchievement(98)
        eternity(true)
    }
  }
}

function dilationPenalty() {
  let r = 0.75
  
  if(game.exDilation.upgrades.includes(1)) r += 0.05
  
  return r;
}

function getEDUDescriptions() {
	return [
		"Tachyon particle formula is better based on ex-dilation.<br> ^" + shorten(Decimal.add(1.5, game.dilation.repeatUpgr[2].add(1).log(3.5).divide(3))) + " > ^" + shorten(Decimal.add(1.5, game.dilation.repeatUpgr[2].add(1).add(getExDilationUpgradeEffect(0)).log(3.5).divide(3))),
		"The penalty for dilation is reduced.<br>^0.25 > ^0.3",
		"Dilated time gain is boosted based on ex-dilation.<br>Currently: " + shorten(getExDilationUpgradeEffect(2)) + "x",
		"You gain extra free galaxies based on your achievements.<br>Currently: +" + shorten(getExDilationUpgradeEffect(3)),
		"Free galaxies are stronger based on ex-dilation.<br>Currently: " + shorten(getExDilationUpgradeEffect(4)) + "x",
		"The sixth dilation upgrade gets a boost based on free galaxies.<br>Currently: +" + shorten(getExDilationUpgradeEffect(5)) + " extra galaxies",
    "Infinity Points boost infinity dimensions to a reduced effect.<br>Currently: " + shorten(getExDilationUpgradeEffect(6)) + "x",
    "Dimension boosts are twice as powerful.",
    "The replicanti max galaxies softcap is weaker."
	]
}

function getExDilationUpgradeEffect(n, g) {
	switch(n) {
		case 0:
			return game.exDilation.amount.add(1).pow(1/5).max(1);
		case 2:
			return game.exDilation.amount.add(1).pow(3).max(1)
		case 3:
			return new Decimal(game.achievementRowsCompleted * 0.7 + (game.achievements.length * 0.2)).max(1)
		case 4:
			return game.exDilation.amount.add(1).pow(0.0125).max(1)
		case 5:
			return getFreeDilatedGalaxies().add(1).log(4).max(1)
    case 6:
      return game.infinityPoints.add(gainedInfinityPoints()).add(1).pow(0.01).max(1)
    case 7:
      return 2
	}
}

var exDilationUpgradeCosts = "1, 1, 1, 2, 3, 5, 15, 20, 20".split(",");

function canBuyExDilationUpgrade(i) {
	if(game.exDilation.upgrades.includes(i)) return false;
	if(game.exDilation.amount.lt(exDilationUpgradeCosts[i])) return false;
	return true;
}

function buyExDilationUpgrade(i) {
	if(!canBuyExDilationUpgrade(i)) return;
	game.exDilation.amount = game.exDilation.amount.subtract(exDilationUpgradeCosts[i]);
	game.exDilation.upgrades.push(i);
}

var exDilationRepUpgradeCosts = "100, 1000, 10000".split(",");

var exDilationRepUpgradeCostMults = "100, 100, 100".split(",");

function getRepeatExDilCost(i) {
	return new Decimal(exDilationRepUpgradeCosts[i]).multiply(new Decimal(exDilationRepUpgradeCostMults[i]).pow(game.exDilation.repeatUpgr[i]))
}

function canBuyRepeatExDil(i) {
	return game.exDilation.amount.gte(getRepeatExDilCost(i));
}

function buyRepeatExDil(i) {
	if(!canBuyRepeatExDil(i)) return;
		game.exDilation.repeatUpgr[i] = game.exDilation.amount.log10().divide(2).floor();
		if(game.exDilation.amount.lt(infp())) game.exDilation.amount = game.exDilation.amount.subtract(Decimal.pow(exDilationRepUpgradeCostMults[i], game.exDilation.amount.log10().divide(2).floor()))
	return true;
}

function getRepeatExDilDesc() {
  return [
    "You gain twice as much ex-dilation.<br>Currently: " + shorten(Decimal.pow(2, game.exDilation.repeatUpgr[0])) + "x",
    "Free galaxies are more powerful.<br>Currently: " + shorten(Decimal.add(1, game.exDilation.repeatUpgr[1].add(1).pow(0.5).subtract(1))) + "x",
    "You produce 10x as much dilated time.<br>Currently: " + shorten(Decimal.pow(10, game.exDilation.repeatUpgr[2])) + "x"
  ]
}