function updateDimensionSet(name="dimension", abbr="", curr="") {
	var Name = name[0].toUpperCase() + name.slice(1)
	
	var c12 = (inChallenge(12)) && name == "dimension";
  if(inChallenge(11, 1)) c12 = (name == "dimension" || name == "infinityDimension") * 2
	
	for(var i = 10; i >= 0; i--) {
		if(i < 10-c12) {
			var tickspeed = inChallenge(7) ? 1 : getTickspeed(name);
			var base = window["get" + Name + "Production"](i + 1)
			var dimProduction = base.gt(0) ? base.multiply(tickspeed).divide(getChallengeMultiplier(name)) : new Decimal(0)
			if(c12) var dimProductionUp = window["get" + Name + "Production"](i + 2).multiply(tickspeed).multiply(getChallengeMultiplier(name))
			var realProduction = i ? (c12 ? dimProductionUp : dimProduction) : (c12 ? dimProduction.divide(100).add(dimProductionUp) : dimProduction);
			game[name + "s"][i].amount = game[name + "s"][i].amount.add(realProduction.multiply(diff/1000));
			if (i < 9-c12) ge(abbr + "dimgrowth" + i).textContent = game[name + "s"][i].amount.eq(0)?"":"(+" + shorten(realProduction.divide(game[name + "s"][i].amount).multiply(100)) + "%/s)"
		}
		
		if (i) {
			var display =
			game.currentTab == "dimensions" && 
			(game[name + "s"][i - 1].amount.gt(0) || (i < 5 - (name=="dimension") * 3)) && (
			name == "dimension" ?
				game.shifts + 4 >= i : 
			name == "infinityDimension" ? 
				game.infinityShifts.gte(i) : 
			name == "voidDimension" ? 
				i < 9 : 
				true
			)
			
			if(name == "dimension" && game.singularities.gt(0)) {
				ge(abbr + "dimDisplay" + i).style.visibility = display?"visible":"hidden"
				display = true;
			}

			if (display) {
				ge(abbr + "dimamount" + i).textContent = shortenMoney(game[name + "s"][i].amount)
				ge(abbr + "dimmult" + i).textContent = shorten(game[name + "s"][i].multiplier)
				ge(abbr + "dimbuy" + i).textContent = "Cost: " + shortenCosts(game[name + "s"][i].cost) + curr
				ge(abbr + "dimbuy" + i).className = window["canBuy" + Name](i) ? "buy" : "lock"
			}
			ge(abbr + "dimDisplay" + i).style.display = display?"":"none"
		}
	}
}

pain = ["Standard", "Cancer", ]

function update() {
  //game.phonons = new Decimal(0);
  thing()
	diff = Date.now() - game.lastUpdate || 0;
	game.lastUpdate = Date.now()
	
	diff *= parseInt(localStorage.hacker) || 1;
	
	setTimeout(update, 1000 / game.options.fps)

	
	game.dimMult = new Decimal(2);
	if(game.infinityUpgrades.includes(5)) game.dimMult = game.dimMult.multiply(1.1)
	if(game.phononUpgrades.includes(5) && game.distort) game.dimMult = game.dimMult.multiply(30)
	if(inChallenge(2)) game.dimMult = game.dimMult.multiply(0.8)
	if(challengeCompleted(4, 1)) game.dimMult = game.dimMult.multiply(1.5)
  if(!inChallenge(10, 1)) {game.matter = new Decimal(1)} else if (game.dimensions[1].amount > 1) { game.matter = game.matter.multiply(1.95)}	
	updateDimensionSet("dimension")
	updateDimensionSet("infinityDimension", "inf", " IP")
	updateDimensionSet("voidDimension", "void", " PP")
  game.singularityPower = game.singularityPower.add(getSingularityPowerGain().multiply(diff/1000))
	// updateDimensionSet("timeDimension", "time", " EP")
	game.totalAntimatter = game.totalAntimatter.add(getDimensionProduction(1).multiply(getTickspeed("dimension")).multiply(diff/1000));
	
	if(inChallenge(2, 1)) sacrifice()
	
	ge("antimatter").textContent = getFullExpansion(game.dimensions[0].amount)
	ge("matter").textContent = getFullExpansion(game.matter)
  displayIf("matterholder", inChallenge(10, 1))
	ge("antimatterGrowth").textContent = getFullExpansion(getDimensionProduction(1).multiply(inChallenge(7) ? 1 : getTickspeed("dimension")))
	
	ge("infinityPower").textContent = getFullExpansion(game.infinityDimensions[0].amount)
	if(!inChallenge(8, 1)) {ge("infinityPowerEffect").textContent = shorten(getInfinityPowerEffect()) + 'x'} else {ge("infinityPowerEffect").textContent = shorten(getInfinityPowerEffect().pow(new Decimal("1").divide(500))) + 'x'}
	ge("infinityPowerGrowth").textContent = getFullExpansion(getInfinityDimensionProduction(1).multiply(getTickspeed("infinityDimension")))

	ge("voidPower").textContent = getFullExpansion(game.voidDimensions[0].amount)
  ge("voidPowerEffect").textContent = shorten(getVoidDimensionsEffect()) + 'x'
	ge("voidPowerGrowth").textContent = getFullExpansion(getVoidDimensionProduction(1).multiply(getTickspeed("voidDimension")))
	
	ge("tickspeed").textContent = inChallenge(7) ? "" : shorten(getTickspeed("dimension"));
	ge("buyTickspeed").textContent = "Cost: " + shortenCosts(game.tickspeed.cost);
	ge("buyTickspeed").className = ge("maxTickspeed").className = canBuyTickspeed() ? "buy" : "lock"
	
	ge("dimMult").textContent = shorten(game.dimMult, 2, 1)
	
	displayIf("sacrificeContainer", game.shifts == 5)
	ge("sacrifice").className = "buy"
	ge("sacrifice").textContent = "Dimensional Sacrifice (" + shorten(getSacrificeGain()) + "x)"
	ge("sacrificePower").textContent = shorten(game.sacrificeMult)
	
	ge("shifts").textContent = game.shifts;
	ge("shiftReq").textContent = tierNames[game.shifts+4]
	ge("shift").className = canShift() ? "buy" : "lock"
	
	ge("boosts").textContent = getFullExpansion(getEffectiveDimensionBoosts());
	dr = getDimensionBoostReq()
	ge("boostReq").textContent = (inChallenge(10) ? (game.distort && game.phononUpgrades.includes(4) ? getFullExpansion(dr.ceil()) + " fifth " : getFullExpansion(dr.ceil()) + " fourth ") : inChallenge(9, 1) ? getFullExpansion(dr.ceil()) + " second " : getFullExpansion(dr.ceil()) + " ninth ");
	ge("boost").className = canBoost() ? "buy" : "lock" 
	
	ge("galaxies").textContent = getFullExpansion(getEffectiveNormalGalaxies());
	ge("galaxyReq").textContent = getFullExpansion(getGalaxyReq()) + (inChallenge(10) ? " fourth " : inChallenge(9, 1) ? " second " : " ninth ");
	ge("galaxy").className = canGalaxy() ? "buy" : "lock" 
	
	displayIf("shiftDisplay", game.shifts < 5 && !inChallenge(10) && !inChallenge(9, 1));
	displayIf("boostDisplay", game.shifts == 5 || inChallenge(10) || inChallenge(9, 1));
	displayIf("galaxyDisplay", game.shifts == 5 || inChallenge(10) || inChallenge(9, 1));
	displayIf("sacrificeDisplay", game.shifts == 5)
	
	ge("boostName").textContent = getEffectiveDimensionBoosts().gte(getDimensionHypersonicStart()) ? "Lightspeed Boost" : game.boosts.gte(getDimensionSupersonicStart()) ? "Dimension Supersonic" : "Dimension Boost"
	ge("galaxyName").textContent = getEffectiveNormalGalaxies().gte(getDarkGalaxyStart()) ? "Dark Antimatter Galaxies" : getEffectiveNormalGalaxies().gte(getRemoteGalaxyStart()) ? "Remote Antimatter Galaxies" : game.galaxies.gte(getDistantGalaxyStart()) ? "Distant Antimatter Galaxies" : "Antimatter Galaxies"
	ge("boostPower").textContent = shorten(getDimensionBoostPower(), 2, 1)
	ge("boostEffect").textContent = "(" + shorten(getDimensionBoostEffect()) + "x on all dimensions)"
	ge("galaxyPower").textContent = shortenMoney(getGalaxyPower(), 2, 1)
	ge("galaxyEffect").innerHTML = inChallenge(7) ? "x" + shorten(getTickPower().pow(7)) + " on 9th dimensions" : getTickPower().gte(2) ? "x" + shorten(getTickPower()) : "+" + shorten(getTickPower().subtract(1).multiply(100)) + "%"

	game.tickCostMultIncrease = 10 - game.repeatInf[0].bought;
	game.dimCostMultIncrease = 10 - game.repeatInf[2].bought;
  if(game.singularityUpgrades.includes(10)) game.dimCostMultIncrease = 4;

	displayIf("infinityTabButton", game.infinities.gt(0))
	displayIf("singularityTabButton", game.singularities.gt(0))
	displayIf("maxPhononUpgrades", game.singularities.gt(0))
	displayIf("distortInfinity", getChallengeCompletions(1) == 12)
	displayIf("voidDimensionButton", game.singularityUpgrades.includes(11))
	displayIf("challengesTabButton", game.infinityUpgrades.length > 15)
	displayIf("automationTabButton", getChallengeCompletions()) // Note to self: Finish this you lazy motherfucker

	gc("infinityPoints", function(e) {
		e.textContent = shortenMoney(game.infinityPoints.floor())
	})
	gc("planckParticles", function(e) {
		e.textContent = shortenMoney(game.planckParticles.floor())
	})
	gc("phonons", function(e) {
		e.textContent = shortenMoney(game.phonons.floor())
	})
	gc("phononMult", function(e) {
		e.textContent = game.phonons.gt(0) ? getFullExpansion(game.phonons.pow(1/30).divide(game.phonons.pow(1/1000).pow(0.5)).min(300)) : getFullExpansion(0)
	})
	gc("singularityEnergy", function(e) {
		e.textContent = shortenMoney(game.singularityEnergy.floor())
	})
	gc("singularityPowerPS", function(e) {
		e.textContent = shortenMoney(getSingularityPowerGain().floor())
	})
	gc("singularityPowerM", function(e) {
		e.textContent = shorten(getSingularityPowerPower())
	})
	gc("singularityPower", function(e) {
		e.textContent = shortenMoney(game.singularityPower.floor())
	})
	ge("energyEnergyEnergyEnergy").textContent = shortenMoney(getSPFormula())

	if (game.currentTab == "infinity") {
		var infinityUpgradeDescriptions = [
			"Multiplier on all dimensions based on total existence time<br>Currently: " + shorten(getInfinityUpgradeEffect(0)) + "x",
			"Multiplier on all dimensions based on time in this infinity<br>Currently: " + shorten(getInfinityUpgradeEffect(1)) + "x",
			"Multiplier for unspent infinity points on first dimensions<br>Currently: " + shorten(getInfinityUpgradeEffect(2)) + "x",
			"You start with the fifth and sixth dimensions unlocked",
			"Dimensions 1-3 gain a multiplier based on infinities<br>Currently: " + shorten(getInfinityUpgradeEffect(4)) + "x",
			"Dimension upgrade multiplier is 10% stronger",
			"Multiplier for unspent infinity points on all dimensions<br>Currently: " + shorten(getInfinityUpgradeEffect(6)) + "x",
			"You start with the seventh and eighth dimensions unlocked",
			"Dimensions 4-6 gain a multiplier based on infinities<br>Currently: " + shorten(getInfinityUpgradeEffect(4)) + "x",
			"Dimension boost multiplier is 25% stronger",
			"Infinity point generation based on fastest infinity",
			"You start with the ninth dimensions unlocked and one galaxy",
			"Dimensions 7-9 gain a multiplier based on infinities<br>Currently: " + shorten(getInfinityUpgradeEffect(4)) + "x",
			"Dimension boost cost increases by 25% less",
			"Infinity stat generation based on fastest infinity",
			"Antimatter galaxies are twice as effective",
			"Break Infinity",
			"Power up all dimensions based on current antimatter<br>Currently: " + shorten(getInfinityUpgradeEffect(17)) + "x",
			"Power up all dimensions based on total antimatter produced<br>Currently: " + shorten(getInfinityUpgradeEffect(18)) + "x",
			"Power up all dimensions based on ninth dimensions<br>Currently: " + shorten(getInfinityUpgradeEffect(19)) + "x",
			"Power up all dimensions based on infinities<br>Currently: " + shorten(getInfinityUpgradeEffect(20)) + "x",
			"Power up all dimensions based on challenge times<br>Currently: " + shorten(getInfinityUpgradeEffect(21)) + "x",
			"Power up all dimensions based on achievements<br>Currently: " + shorten(getInfinityUpgradeEffect(22)) + "x",
			"Infinity Dimensions get a multiplier based on their tier, giving the best boost to the lowest",
			"Dimension boost multiplier is 60% stronger",
			"Antimatter galaxies are 10% stronger",
			"Boost sacrifice multiplier by ↑1.2",
			"Sacrifice multiplier is increased based on total sacrifice mult",
			"9th dimensions get a greater multiplier based on current antimatter",
			"test 1",
			"test 2",
			"test 3",
		]
    var phononUpgradeDescriptions = [
			"Dimension boosts are more powerful based on your phonons.<br>Currently: " + shorten(game.phonons.add(1).log(2.25).add(1)) + "x",
      "Tickspeed is more powerful based on your phonons.<br>Currently: " + shorten(game.phonons.log(10).add(1)) + "x",
      "Infinity point gain scales better.",
      "IC8's effect to multiplier is reduced in Time Distortion.",
      "Dimension boost scaling is slower.",
      "Dimension upgrade multiplier is 30x stronger in distortion.",
      "Cost scaling is reduced.",
      "Galaxy scaling is slower.",
      "Antimatter galaxies are twice as powerful.",
      "You gain more phonons based on the exponent of your phonons.<br>Currently: " + shorten(game.phonons.add(1).log(10).add(1).pow(1.5)) + "x",
      "You gain 0.01% of your current IP on crunch per second.",
      "Phonons boost your Infinity Dimensions.<br>Currently: " + shorten(game.phonons.pow(100)) + "x",
      "Dimension Boosts multiply phonon gain.<br>Currently: " + shorten(Decimal.log(getEffectiveDimensionBoosts().max(2), 2)) + "x",
      "You gain more infinitied stat based on time in infinity.<br>Currently: " + shorten(Math.pow(getTimeSince("infinity") + 1, 0.125)) + "x",
      "Sacrifice is stronger based on your tickspeed upgrades.",
      "Dimension boosts are " + shorten(1e5) + "x stronger in distortion."
		]
		for(var i = 0; i < 32; i++) {
			ge("infinityUpgrade" + i).className = game.infinityUpgrades.includes(i) ? "infinityUpgradeBought" : canBuyInfinityUpgrade(i) ? "infinityUpgrade" : "infinityUpgradeLocked";
			ge("infinityUpgradeDesc" + i).innerHTML = infinityUpgradeDescriptions[i];
			ge("infinityUpgradeCost" + i).innerHTML = shortenCosts(infinityUpgradeCosts[i]) + " IP";
		}
		for(var i = 0; i < 16; i++) {
			ge("phononUpgrade" + i).className = game.phononUpgrades.includes(i) ? "phononUpgradeBought" : canBuyPhononUpgrade(i) ? "phononUpgrade" : "phononUpgradeLocked";
			ge("phononUpgradeDesc" + i).innerHTML = phononUpgradeDescriptions[i];
			ge("phononUpgradeCost" + i).innerHTML = shortenCosts(phononUpgradeCosts[i]) + " Phonons";
		}
	ge("repeatPho0").innerHTML = "Multiply phonon gain by 3<br>Currently: " + shorten(Decimal.pow(3, game.repeatPho[0].bought)) + "x<br>Cost: " + shortenMoney(getRepeatPhoCost(0)) + " Phonons"
	ge("repeatPho0").className = canBuyRepeatPho(0) ? "phononUpgradeRebuy" : "phononUpgradeLocked"
	ge("repeatPho1").innerHTML = "Sacrifice is more powerful.<br>Currently: ^" + shorten(
    Decimal.divide(game.repeatPho[1].bought.add(100), 100).lt(2) ? 
    Decimal.divide(game.repeatPho[1].bought.add(100), 100) :
    Decimal.divide(game.repeatPho[1].bought.add(100), 100).pow(0.8).max(2)) + "<br>Cost: " + shortenMoney(getRepeatPhoCost(1)) + " Phonons"
	ge("repeatPho1").className = canBuyRepeatPho(1) ? "phononUpgradeRebuy" : "phononUpgradeLocked"
	ge("repeatPho2").innerHTML = "Gain more phonons from infinited stat.<br>Currently: " + shorten(game.infinities.add(1).multiply(game.repeatPho[2].bought.divide(15))) + "x<br>Cost: " + shortenMoney(getRepeatPhoCost(2)) + " Phonons"
	ge("repeatPho2").className = canBuyRepeatPho(2) ? "phononUpgradeRebuy" : "phononUpgradeLocked"
	ge("repeatPho3").innerHTML = "Phonon formula is better.<br>Currently: " + shorten(getPhononFormula()) + "<br>Cost: " + shortenMoney(getRepeatPhoCost(3)) + " Phonons"
	ge("repeatPho3").className = canBuyRepeatPho(3) ? "phononUpgradeRebuy" : "phononUpgradeLocked"
	}
  
  if(game.currentTab == "singularity") {
    var singularityUpgradeDescriptions = [
      "Dimension boosts are stronger based on infinity points.<br>Currently: " + shorten(game.infinityPoints.add(1).max(2).log(3).pow(3)) + "x",
      "You gain 100x as many total phonons.",
      "You gain 1% of your IP on crunch each second.",
      "You gain a multiplier to infinity points based on your singularities.<br>Currently: " + shorten(Decimal.pow(2, game.singularities)) + "x",
      "You gain a multiplier to infinity points based on your infinities.<br>Currently: " + shorten(game.infinities) + "x",
      "IP mult upgrade 2x > 3x",
      "Multiplier to Phonons based on total existance time<br>Currently: " + shorten(Math.pow(getTimeSince("start") * 3, 0.1)+1) + "x",
      "You always have 9 infinity shifts.",
      "Infinity Dimensions are affected by tickspeed effect.<br>Currently: " + shorten(getTickspeed("infinityDimension")) + "x",
      "Singularity Energy is more powerful based on tickspeed.<br>Currently: " + shorten(getTickspeed("singularityEnergy")) + "x",
      "Dimension cost multiplier increase is reduced to 4x.",
      "Unlock Void Dimensions",
      "Power up all infinity dimensions based on ninth infinity dimensions.<br>Currently: " + shorten(game.infinityDimensions[9].amount.pow(6).add(1)) + "x",
      "Power up all infinity dimensions based on total antimatter.<br>Currently: " + shorten(getInfinityUpgradeEffect(18).pow(90)) + "x",
      "Ninth normal and infinity dimensions boost eachother based on their 9th dimension amount.<br>Currently: " + shorten(game.infinityDimensions[9].amount.add(game.dimensions[9].amount).add(1).pow(120)) + "x",
      "Boost Void Dimensions based on your total galaxies.<br>Currently: " + shorten(game.totalGalaxies.log(10).max(1)) + "x"
   ]
	ge("repeatSing0").innerHTML = "Multiply IP gain by " + getIPMultPower() + "<br>Currently: " + shortenMoney(Decimal.pow(getIPMultPower(), game.repeatInf[1].bought)) + "x<br>Cost: " + shortenMoney(getRepeatInfCost(1)) + " IP"
	ge("repeatSing0").className = canBuyRepeatInf(1) ? "infinityUpgrade" : "infinityUpgradeLocked"
	ge("repeatSing1").innerHTML = "Multiply phonon gain by 4<br>Currently: " + shortenMoney(Decimal.pow(4, game.repeatPho[0].bought)) + "x<br>Cost: " + shortenMoney(getRepeatPhoCost(0)) + " Phonons"
	ge("repeatSing1").className = canBuyRepeatPho(0) ? "infinityUpgrade" : "infinityUpgradeLocked"
		for(var i = 0; i < 16; i++) {
			ge("singularityUpgrade" + i).className = game.singularityUpgrades.includes(i) ? "infinityUpgradeBought" : canBuySingularityUpgrade(i) ? "infinityUpgrade" : "infinityUpgradeLocked";
			ge("singularityUpgradeDesc" + i).innerHTML = singularityUpgradeDescriptions[i];
			ge("singularityUpgradeCost" + i).innerHTML = shortenCosts(singularityUpgradesCosts[i]) + " Planck Particles.";
		}
    var singularityMilestoneDescriptions = [
      "You keep infinity upgrades upon making a singularity.",
      "You keep Normal Challenge completions upon making a singularity.",
      "You keep Infinity Challenge completions upon making a singularity.",
      "Your phonon upgrades persist between singularities.",
   ]
		/*for(var i = 0; i < 4; i++) {
			ge("singularityMilestone" + i).className = game.singularityMilestones.includes(i) ? "singularityMilestonesObtained" : "singularityMilestonesLocked";
			ge("singularityMilestoneRequirements" + i).innerHTML = singularityMilestoneRequirements[i];
			ge("singularityMilestoneInfo" + i).innerHTML = singularityMilestoneDescriptions[i];
		}*/
		for(var i = 0; i < 4; i++) {
			ge("singularityMilestone" + i).className = game.singularityMilestones.includes(i) ? "singularityMilestonesObtained" : "singularityMilestonesLocked";
			ge("singularityMilestoneInfo" + i).innerHTML = singularityMilestoneDescriptions[i];
			ge("singularityMilestoneRequirements" + i).innerHTML = shortenCosts(singularityMilestoneRequirements[i]) + " Phonons";
		}
    var singularityCoreDescriptions = [
      "You gain twice as much Singularity Energy.<br>Currently: " + shorten(getSingularityEnergyMult()) + "x",
      "Singularity power gain is boosted.<br>Currently: " + shorten(getSingularityPowerMult()) + "x",
      "Boost to Infinity Dimensions based on Singularity Power.<br> Boost: " + shorten(getInfDimMultFromSingularityPower()) + "x",
      "You gain 40x as much Planck Particles.<br>Currently: " + shorten(Decimal.pow(40, game.repeatSiCo[3].bought)) + "x"
   ]
		for(var i = 0; i < 4; i++) {
			ge("singularityCoreUpgrade" + i).className = canBuyRepeatSiCo(i) ? "singularityMilestonesObtained" : "singularityMilestonesLocked";
			ge("singularityCoreUpgradeDesc" + i).innerHTML = singularityCoreDescriptions[i];
			ge("singularityCoreUpgradeCost" + i).innerHTML = shortenCosts(getRepeatSiCoCost(i)) + " singularity power";
		}
  }
	
	var text = ""
	if(game.infinityUpgrades.includes(10)) {
		game.infinityPoints = game.infinityPoints.add(getInfinityPointMult().multiply(getInfinityUpgradeEffect(10)).multiply(diff));
		text += "You generate " + shortenMoney(getInfinityPointMult()) + " IP ";
	}
	if(game.infinityUpgrades.includes(14)) {
		game.infinities = game.infinities.add(getInfinityUpgradeEffect(10) * diff);
		text += "and 1 infinity ";
	}
	if(text.length) text += "every " + timeDisplay(1 / getInfinityUpgradeEffect(10)) + "."
		ge("infinityPointGeneration").textContent = text;
		ge("breakButton").textContent = game.break?"FIX INFINITY" : "BREAK INFINITY"
		ge("distortButton").textContent = game.distort?"UNDISTORT SPACE" : "DISTORT SPACE"
		ge("breakButton").setAttribute("tooltip", 
			getChallengeCompletions() >= 10 ? 
				`Allows numbers to exceed ${shorten(Number.MAX_VALUE)}, increasing infinity point gain, but in return increases cost scaling.` : 
				`10 challenge completions are required to break infinity.
				Progress: ${getChallengeCompletions()} / 10`
		)

	c = game.dimensions[0].amount.gte(Number.MAX_VALUE) && !(game.bestInfinityTime < 60000 || game.break);
	displayIf("tabButtons", !c)
	
	if(c) {
		if(!lastTab) {
			lastTab = game.currentTab;
		}
		showTab("bigCrunch")
	}
	
	displayIf("infinityTabs", game.infinityUpgrades.length > 15)
	
	var rate = gainedInfinityPoints().divide(getTimeSince("infinity")/60000)
	if(!game.bestIPRate || game.bestIPRate.lt(rate)) {
		game.bestIPRate = rate;
		game.bestIPRateAt = gainedInfinityPoints()
	}
function egg() {
      game.distort ? "<b>Big Crunch for " + shortenMoney(gainedInfinityPoints()) + "<br>Infinity Points.</b><br>" + 
			shorten(rate) + " IP/min<br>Peak: " + 
			/*(game.options.showBestRateAt ? shorten(game.bestIPRateAt))*/ + " IP" : "<b>Big Crunch for " + shortenMoney(gainedPhonons()) + "<br>Phonons.</b>"
}
	displayIf("infinityPrestige", game.infinities.gt(0))
	displayIf("gainedIP", (game.bestInfinityTime < 60000 && atInfinity()) || game.break);
	ge("gainedIP").style.fontSize = game.break || inChallenge() ? "11px" : "30px"
	ge("gainedIP").innerHTML = getChallengeSet() == 1 || getChallengeSet() == 2 ? 
		(canCompleteChallenge() ? "Big Crunch to complete challenge." : "Reach " + shortenMoney(getChallengeGoal()) + " antimatter to complete challenge.") : 
		game.break ? 
           !game.distort ? "<b>Big Crunch for " + shortenMoney(gainedInfinityPoints()) + "<br>Infinity Points.</b><br>" + 
			shorten(rate) + " IP/min<br>Peak: " + shorten(game.bestIPRateAt)
			/*(game.options.showBestRateAt ? shorten(game.bestIPRateAt))*/ + " IP" : "<b>Big Crunch for " + shortenMoney(gainedPhonons()) + "<br>Phonons.</b>" :  "<b>Big Crunch</b>"
  ge("gainedPP").innerHTML ="<b>Create a singularity for " + shortenMoney(gainedPlanckParticles()) + "<br>Planck Particles.</b><br>"
	
	// ge("antimetal").textContent = getFullExpansion(game.automator.antimetal)
	displayIf("dimensionTabs", game.break)
	
	displayIf("postInfinityUpgrades", game.break)

	displayIf("singularityPrestige", canPerformSingularity() || game.singularities.gt(0))
	displayIf("gainedPP", canPerformSingularity())

	//displayIf("phononUpgrades", getChallengeCompletions(1) == 12)

	ge("repeatInf0").innerHTML = "Tickspeed cost multiplier increase<br>" + game.tickCostMultIncrease + "x" + (game.repeatInf[0].bought.lt(7) ? " > " + (game.tickCostMultIncrease-1) + "x<br>Cost: " + shortenMoney(getRepeatInfCost(0)) + " IP" : "")
	ge("repeatInf1").innerHTML = "Multiply IP gain by " + getIPMultPower() + "<br>Currently: " + shortenMoney(Decimal.pow(getIPMultPower(), game.repeatInf[1].bought)) + "x<br>Cost: " + shortenMoney(getRepeatInfCost(1)) + " IP"
	ge("repeatInf2").innerHTML = "Dimension cost multiplier increase<br>" + game.dimCostMultIncrease + "x" + (game.repeatInf[2].bought.lt(5) ? " > " + (game.dimCostMultIncrease-1) + "x<br>Cost: " + shortenMoney(getRepeatInfCost(2)) + " IP" : "")
	
	ge("repeatInf0").className = game.repeatInf[0].bought.gt(6) ? "infinityUpgradeBought" : canBuyRepeatInf(0) ? "infinityUpgrade" : "infinityUpgradeLocked"
	ge("repeatInf1").className = canBuyRepeatInf(1) ? "infinityUpgrade" : "infinityUpgradeLocked"
	ge("repeatInf2").className = game.repeatInf[2].bought.gt(4) ? "infinityUpgradeBought" : canBuyRepeatInf(2) ? "infinityUpgrade" : "infinityUpgradeLocked"

	ge("infinityshiftcost").textContent = (getChallengeCompletions(1) > 3 || game.infinityShifts.lt(4)) ? "Reach " + shortenCosts(getInfinityShiftCost()) + " antimatter to unlock a new dimension." : "Complete 4 infinity challenges to unlock."
	displayIf("infinityPowerArea", game.infinityShifts.gt(0))
	ge("infinityshift").className = canInfinityShift() ? "buy" : "lock"

	ge("challengeInfo").style.left = innerWidth / 2 - 175;
	ge("challengeInfo").style.top = 290;
	
	displayIf("challengeMultiplier", inChallenge(4) || inChallenge(5) || inChallenge(6))
		
	ge("challengeMultiplier").innerHTML = "<br>Challenge production factor: " + getChallengeMultiplier().multiply(100).toFixed(2) + "%"
	
	if(game.currentTab == "challenges") {
		updateChallengeDescriptions();
		ge("challengeDescription").innerHTML = challengeDescriptions[selectedChallenge+game.selectedChallengeType*12]
		ge("cLeft").style.opacity = (game.selectedChallengeType > 0) + 0
		ge("cRight").style.opacity = (game.selectedChallengeType < getChallengeTypeCap()) + 0
		ge("challengeBenefits").innerHTML = getChallengeBenefits()
	}
	
	if(game.currentTab == "statistics") {
		ge(game.currentStatisticsTab + "StatisticsTab").innerHTML = getStatisticsDisplay(game.currentStatisticsTab)
	}

	// Achievement checks
	
	ge("achievementCompletions").innerText = getFullExpansion(game.achievements.length) + " / " + getFullExpansion(achievements);
	ge("achievementMultiplier").innerText = getFullExpansion(getAchievementMultiplier());
	ge("achievementRowCompletions").innerText = getFullExpansion(game.achievementRowsCompleted);

	if(game.shifts == 5) giveAchievement(10);
	if(game.boosts.gte(5)) giveAchievement(11);
	
	if(game.galaxies.gt(0)) giveAchievement(13)
	if(game.galaxies.gt(1)) giveAchievement(14)
	if(game.galaxies.gt(2)) giveAchievement(15)

	if(game.dimensions[0].amount.gt(1e303)) giveAchievement(12)
	if(game.dimensions[0].amount.gte(6.66e201) && game.dimensions[9].amount.eq(9)) giveAchievement(17)
	if(game.sacrificeMult.gte(66666) && !inChallenge(8)) giveAchievement(18)
	if(game.infinities.gt(1e3)) giveAchievement(20)
	if(game.infinityPoints.gt(1e3)) giveAchievement(21)
	if(game.dimensions[0].amount.gte(Number.MAX_VALUE) && game.sacrificeMult.eq(1)) giveAchievement(26)
	if(game.break) giveAchievement(27)
	if(game.infinityShifts.gt(0)) giveAchievement(28)
	if(getChallengeTimes() < 180000) giveAchievement(30)
	if(game.infinityDimensions[0].amount.gt(1e6)) giveAchievement(32)
	if(game.dimensions[1].bought.gte(150)) giveAchievement(33)
	if(game.infinityShifts.gt(0)) giveAchievement(34)
	if(game.infinityDimensions[0].amount.gt(1e6)) giveAchievement(41)
	if(getChallengeTimes() < 180000) giveAchievement(35)
	if(game.dimensions[9].amount.eq(69)) giveAchievement(36)
	if(challengeCompleted(1, 1)) giveAchievement(37)
	if(challengeCompleted(5, 1)) giveAchievement(38)
  if(game.singularityUpgrades.includes(7)) game.infinityShifts = new Decimal(9);
	if(game.dimensions[7].multiplier.gte(Number.MAX_VALUE)) giveAchievement(39)
  if(game.dimensions[0].amount.gte(Decimal.pow10(100000))) giveAchievement(57)
  if(game.phononUpgrades.includes(10)) game.infinityPoints = game.infinityPoints.add(gainedInfinityPoints().multiply(0.0001))
  if(game.singularityUpgrades.includes(2)) game.infinityPoints = game.infinityPoints.add(gainedInfinityPoints().multiply(0.01))
  if(game.dimensions[10] || game.infinityDimensions[10] || game.voidDimensions[10]) giveSAchievement(2)
  //if(game.singularityUpgrades.includes(2) && game.distort) game.phonons = game.phonons.add(gainedPhonons().pow(0.25))
  
	ge("autosaveOption").innerText = "Autosave: " + ["Off", "On"][!!game.options.autosave+0]
	ge("saveTabsOption").innerText = "Save Tabs: " + ["Off", "On"][!!game.options.saveTabs+0]
	ge("automateOption").innerText = "Auto Max All: " + ["Off", "On"][!!game.options.automate+0]

	ge("auClass").innerText = au.class
	ge("upgradeCore").innerText = `Unlock Class ${au.class+1} - ${layerNames[au.class+1]}`;
	ge("upgradeCore").className = canUpgradeAutomator() ? "buy" : "lock"

	for(var i = 0; i < 2; i++) displayIf("class" + i + "Automation", au.class >= i)
	
	au.extensions.forEach(function(e) {
		e.charge += e.speed * diff / 1000;
		if(e.charge > 2**au.class) e.charge = 2**au.class;
		
		if(game.currentTab !== "automation") return;
		
		var div = ge(e.id < 9 ? "dimensionAutobuyer" + e.id : ["tickspeedAutobuyer", "boostAutobuyer", "galaxyAutobuyer", "sacrificeAutobuyer", "infinityAutobuyer"][e.id-9])
		
		ge("buyauto" + (e.id)).innerHTML = "50% smaller interval<br>Cost: " + shortenCosts(e.cost) + " " + smallCurrency[e.currency]
		
		div.children[1].innerHTML = "Level " + getFullExpansion(e.level) + "<br>Interval: " + timeDisplayShort(1 / e.speed) + "<br>" + (e.speed <= 1 ? timeDisplayShort(Math.max(1 / e.speed * (1 - e.charge), 0)) + " until charged" : getFullExpansion(e.speed) + " activations per second")
		div.children[2].style.width = Math.min(e.charge, 1) * 230
		div.children[2].innerText = (e.charge*100).toFixed(0) + "%"
	})
	
	au.raw = ge("auScript").value;
	au.script = au.raw.split(`
`);
	if(!au.tickDelay) au.tickDelay = 0;
	if(au.tickDelay > 0) au.tickDelay--;
	else {
		au.delay -= diff;
		if(au.delay < 0) {
			au.delay = 0;
			au.line++;
			if(au.line >= au.script.length || !au.line) au.line = 0;
			runAu(au.script[au.line])
		}
	}

	if(game.options.automate) {
		galaxy();
		boost();
		shift();
		maxAll();
		if(getSacrificeGain().gt(10) && challengeCompleted(2, 1)) sacrifice();
	}
	// if(gainedInfinityPoints().gt(5e15)) bigCrunch();
}
function wormhole(time) {
  game.lastUpdate = game.lastUpdate - time
  game.wormhole.scan = true
  update()
  game.wormhole.scan = false
}

function getStatisticsDisplay(type) {
	let lines = []
	switch(type) {
		case "normal":
			lines.push(`You have made a total of ${getFullExpansion(game.totalAntimatter)} antimatter.`)
			lines.push(`You have bought single tickspeed ${getFullExpansion(game.why)} times.`)
			lines.push("")
			if (game.totalBoosts.gt(0)) {
				lines.push(`You have ${getFullExpansion(getEffectiveDimensionBoosts())} dimension boosts.`)
				lines.push(`You have made ${getFullExpansion(game.totalBoosts)} dimension boosts.`)
	  		if(!game.totalGalaxies.gt(0)) lines.push("")
			}
			if (game.totalGalaxies.gt(0)) {
				lines.push(`You have ${getFullExpansion(getEffectiveNormalGalaxies())} antimatter galaxies.`)
				lines.push(`You have made ${getFullExpansion(game.totalGalaxies)} antimatter galaxies.`)
	  		lines.push("")
			}
			if (game.infinities.gt(0)) {
				lines.push(`You have gone infinite ${getFullExpansion(game.infinities)} times.`)
				lines.push(`Your fastest infinity is in ${timeDisplay(game.bestInfinityTime)}.`)
				lines.push(`You have spent ${timeDisplay(getTimeSince("infinity"))} in this infinity.`)
				lines.push("")
			}
			if (game.singularities.gt(0)) {
				lines.push(`You have created ${getFullExpansion(game.singularities)} singularities.`)
				lines.push(`You have spent ${timeDisplay(getTimeSince("singularity"))} with this singularity.`)
				lines.push("")
			}
			lines.push(`You have existed for ${timeDisplay(getTimeSince("start"))}.`)
			break;
		case "challenge":
			lines.push("")
			if(getChallengeCompletions(game.selectedChallengeType)) lines.push("")
			for(var i = 0; i < 12; i++) if(game.challenges[game.selectedChallengeType][i].completed) lines.push(`Challenge ${i+1} Record: ${game.challenges[game.selectedChallengeType][i].completed ? timeDisplay(game.challenges[game.selectedChallengeType][i].bestTime) : "N/A"}`)
			lines.push(`<br>Sum of all ${layerNames[game.selectedChallengeType].toLowerCase()}challenge times is ${timeDisplay(getChallengeTimes(game.selectedChallengeType))}`)
			break;
	}
	return lines.join("<br>")
}

showTab(game.options.saveTabs ? game.currentTab : "dimensions")
showDimensionTab(game.options.saveTabs ? game.currentDimensionTab : "normal")
showStatisticsTab(game.options.saveTabs ? game.currentStatisticsTab : "normal")
showInfinityTab(game.options.saveTabs ? game.currentInfinityTab : "infinityUpgrades")
showSingularityTab("singularityUpgrades")
showAutomationTab(game.options.saveTabs ? game.currentAutomationTab : "core")
scrollChallengesTo(game.options.saveTabs ? game.selectedChallengeType : 0)

update();
updateAchievements()

setInterval(function() {autosave(), 10000})
