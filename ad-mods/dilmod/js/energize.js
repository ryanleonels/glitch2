function resetEnergize() {
  game.energize = {
    times: new Decimal(0),
    energyShards: new Decimal(0),
    upgrades: [],
    stored_boosts: new Decimal(0),
    battery: {
      unlock: false,
      power: new Decimal(0),
      electric: new Decimal(0)
    }
  }
}

function haveEnergized() {
	return game.energize.times.gt(0);
}

function atEnergize() {
	return game.eternityPoints.gte(getEnergize());
}

function gainedEnergyShards() {
	return game.eternityPoints.add(gainedEternityPoints()).pow(1/3800000).multiply(1).divide(10).floor();
}

var chargedMilestones = {
	lotOfE: {req:  1, desc: "You start Energizes with 300 eternities."},
	keepTT: {req:  2, desc: "You keep time studies and time theorems."},
  keepEC: {req:  3, desc: "You keep eternity challenges."},
	keepBU: {req:  5, desc: "You keep break infinity upgrades."},
	keepTP: {req:  7, desc: "You keep some of your TP, ex-dilation, and dilation upgrades on energize."},
	keepEU: {req:  9, desc: "You keep eternity upgrades."},
	keepEx: {req:  10, desc: "You keep ex-dilation upgrades."},
	tAuto1: {req:  15, desc: "Unlock Time Dimension autobuyer 1"},
	tAuto2: {req:  16, desc: "Unlock Time Dimension autobuyer 2"},
	tAuto3: {req:  17, desc: "Unlock Time Dimension autobuyer 3"},
	tAuto4: {req:  18, desc: "Unlock Time Dimension autobuyer 4"},
	tAuto5: {req:  19, desc: "Unlock Time Dimension autobuyer 5"},
	tAuto6: {req:  20, desc: "Unlock Time Dimension autobuyer 6"},
	tAuto7: {req:  21, desc: "Unlock Time Dimension autobuyer 7"},
	tAuto8: {req:  22, desc: "Unlock Time Dimension autobuyer 8"},
	tAuto9: {req:  23, desc: "Unlock Time Dimension autobuyer 9"},
	dAutob: {req:  24, desc: "Unlock automatic dilation upgrades"},
	epMult: {req:  30, desc: "Unlock automatic EP mult"},
}

function chargedMilestone(id) {
  return game.energize.times.gt(chargedMilestones[id].req)
}

function getEnergize() {
	if(getChallengeSet() == 4) return getChallengeGoal()
	return new Decimal("1e3800000");
}

function energize(force) {
  if(!atEnergize() && !force) return;
  
/*  confirm("Energizing is currently disabled because it breaks the game.")
  return; */
  
  if(!confirm("Are you sure you want to Energize? This will reset all of your progress in Eternity in exchange for Energy Shards.")) return;
  
  game.energizeTime = Date.now();
  
  if(!force) {
    game.energize.times = game.energize.times.add(1)
    game.energize.energyShards = game.energize.energyShards.add(gainedEnergyShards())
		var time = getTimeSince("energize");
    if(time < game.bestEnergizeTime) game.bestEnergizeTime = time
  }
  
  if(!chargedMilestone("keepTT")) 
  for (var i = 0; i <= 3; i++) {
    game.timestudy.bought[i] = new Decimal(0)
  }
  for(var i = (chargedMilestone("keepEC")+2)*12; i < 36; i++) game.challenges[Math.floor(i/12)][i%12].completed = false;
  if(!chargedMilestone("keepEU"))resetEternityUpgrades()
	game.repeatEter = [
		new Decimal(0),
	]
  resetTimeDimensions()
  let exDilateUpgrades = game.exDilation.upgrades
  let exDilateShit = game.exDilation.amount
  let exDilateRepeats = game.exDilation.repeatUpgr
  console.log(exDilateRepeats)
console.log(exDilateShit)
console.log(exDilateUpgrades)
  game.exDilation = {
    amount: (!chargedMilestone("keepTP") ? new Decimal(0) : exDilateShit),
    upgrades: (!chargedMilestone("keepEx") ? [] : exDilateUpgrades),
    repeatUpgr: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)] //(!chargedMilestone("keepEx") ? [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)] : exDilateRepeats)
  }
  console.log(game.exDilation.repeatUpgr)
  console.log(game.exDilation.amount)
  console.log(game.exDilation.upgrades)
  let tachyonP = game.dilation.tachyonParticles
  let tachyonUpgrades = game.dilation.upgrades
  resetReplicanti()
  game.dilation = {
    unlocked: false,
    active: false,
    tachyonParticles: (!chargedMilestone("keepTP") ? new Decimal(0) : tachyonP),
    dilatedTime: new Decimal(0),
    galaxyThreshold: new Decimal(1000),
    thresholdUpSpeed: new Decimal(5),
    freeGalaxies: new Decimal(0),
    generatedTT: new Decimal(0),
    upgrades: (!chargedMilestone("keepTP") ? [] : tachyonUpgrades),
    repeatUpgr: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
  }
  if(!chargedMilestone("keepTT"))respecTimeStudies()
  game.eternityPoints = new Decimal(0);
  game.eternities = new Decimal(0);
  if(chargedMilestone("lotOfE")) game.eternities = new Decimal(300);
	eternity(true)
}

var energizeUpgradeCosts = "0.9, 0.9, 0.9, 1, 1, 1, 2, 2, 2, 5, 25, 100".split(",");

function canBuyEnergizeUpgrade(i) {
	if(game.energize.upgrades.includes(i)) return false;
	if(game.energize.energyShards.lt(energizeUpgradeCosts[i])) return false;
  if(i > 2 && !game.energize.upgrades.includes(i-3)) return false;
	return true;
}

function buyEnergizeUpgrade(i) {
	if(!canBuyEnergizeUpgrade(i)) return;
	game.energize.energyShards = game.energize.energyShards.subtract(energizeUpgradeCosts[i]);
	game.energize.upgrades.push(i);
}

function getEnergizeUpgradeEffect(n) {
	switch(n) {
    case 0:
      return game.energize.times.add(1).pow(game.energize.times.pow(0.25).add(1))
		case 1:
			return Math.max(1e25 / getChallengeTimes(2) ** 5, 1) //Decimal.divide(1e25, Decimal.pow(getChallengeTimes(2), 6))
		case 2:
			return game.timeDimensions[0].amount.add(1).log10().add(1)
		case 3:
			return getTickspeed("dimension").add(1).log(500).pow(1/15).max(1)
		case 4:
			return getReplChance().add(1).pow(1/5).max(1)
    case 5:
      return getFreeTickspeedUpgrades().divide(20000).pow(0.01).add(1)
    case 6:
      return getSumOfDimensions().divide(200).max(1)
    case 7:
      return game.energize.energyShards.pow(1.5).divide(3).max(1)
    case 8:
      return gainedTP().max(1).pow(0.05).max(1)
	}
}

function getEnUDescriptions() {
	return [
		"Time Dimensions are stronger based on your energizes.<br>Currently: " + shorten(getEnergizeUpgradeEffect(0)) + "x",
    "Time Dimensions are stronger based on EC times.<br>Currently: " + shorten(getEnergizeUpgradeEffect(1)) + "x",
    "Time Dimensions are stronger based on your time shards.<br>Currently: " + shorten(getEnergizeUpgradeEffect(2)) + "x",
    "Replicanti are stronger based on tickspeed.<br>Currently: " + shorten(getEnergizeUpgradeEffect(3)) + "x",
    "You gain extra replicated galaxies based on replicanti chance.<br>Currently: " + "+" + shorten(getEnergizeUpgradeEffect(4)),
    "Replicated galaxies are stronger based on free tickspeed upgrades.<br>Currently: " + shorten(getEnergizeUpgradeEffect(5)) + "x",
    "Normal dimensions gain a multiplier based on the sum of bought.<br>Currently: " + shorten(getEnergizeUpgradeEffect(6)) + "x",
    "Normal dimensions gain a multiplier based on energy shards.<br>Currently: " + shorten(getEnergizeUpgradeEffect(7)) + "x",
    "You gain tachyon particles outside of dilation at a reduced rate.<br>Currently: " + shorten(getEnergizeUpgradeEffect(8)) + "x",
    "This upgrade is useless so don't buy it.",
    "Make aarex even more gay than before",
    "Slap Aarex"
	]
}