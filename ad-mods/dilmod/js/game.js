function updateDimensionSet(name="dimension", abbr="", curr="", l) {
	var Name = name[0].toUpperCase() + name.slice(1)
	
	var c10 = (inChallenge(10) && name == "dimension") || inChallenge(12, 2) && (name == "dimension" || name == "infinityDimension");
	
	for(var i = 10; i >= 0; i--) {
		if(i < 10-c10) {
			var tickspeed = inChallenge(7) ? 1 : getTickspeed(name);
			var base = window["get" + Name + "Production"](i + 1)
			var dimProduction = base.gt(0) ? base.multiply(tickspeed).divide(getChallengeDivider(name)) : new Decimal(0)
			if(c10) var dimProductionUp = window["get" + Name + "Production"](i + 2).multiply(tickspeed).multiply(getChallengeDivider(name))
			var realProduction = i ? (c10 ? dimProductionUp : dimProduction) : (c10 ? dimProduction.divide(100).add(dimProductionUp) : dimProduction);
			game[name + "s"][i].amount = game[name + "s"][i].amount.add(realProduction.multiply(diff/1000));
			if (i < 9-c10) ge(abbr + "dimgrowth" + i).textContent = game[name + "s"][i].amount.eq(0)?"":"(+" + shorten(realProduction.divide(game[name + "s"][i].amount).multiply(100)) + "%/s)"
		}
		
		if (i) {
			var display =
			game.currentTab == "dimensions" && 
			(game[name + "s"][i - 1].amount.gt(0) || (i < 5 - (name=="dimension") * 3)) && (
			name == "dimension" ?
				game.shifts + 4 >= i : 
			name == "infinityDimension" ? 
				game.infinityShifts.gte(i) : 
			name == "timeDimension" ? 
				i < maxTimeD() : 
      name == "blackHoleDimension" ?
        i < maxBHD() :
        true
			)
			
			ge(abbr + "dimDisplay" + i).style.visibility = "visible"
			if(name == "dimension" && haveEternitied()) {
				ge(abbr + "dimDisplay" + i).style.visibility = display?"visible":"hidden"
				display = true;
			}

			if (display) {
				ge(abbr + "dimamount" + i).textContent = shortenMoney(game[name + "s"][i].amount)
				ge(abbr + "dimmult" + i).textContent = shorten(game[name + "s"][i].multiplier)
				ge(abbr + "dimbuy" + i).textContent = "Cost: " + window[["shortenCosts", "shortenMoney"][!!l+0]](game[name + "s"][i].cost) + curr
				ge(abbr + "dimbuy" + i).className = window["canBuy" + Name](i) ? "buy" : "lock"
			}
			ge(abbr + "dimDisplay" + i).style.display = display?"":"none"
		}
	}
}


function update() {
	diff = Date.now() - game.lastUpdate || 0;
	game.lastUpdate = Date.now()
  //console.log(shorten(Decimal.pow(1e16, 12500)))
	
	hacker = parseFloat(localStorage.hacker) || 1;
	diff *= hacker;
	
	setTimeout(update, 1)
	
	// Production
	
	game.dimMult = new Decimal(2);
	if(game.infinityUpgrades.includes(5)) game.dimMult = game.dimMult.multiply(1.1)
	if(inChallenge(2)) game.dimMult = game.dimMult.multiply(0.8)
	if(challengeCompleted(4, 1)) game.dimMult = game.dimMult.multiply(1.5)
  if(challengeCompleted(5,2)) game.dimMult = game.dimMult.multiply(getChallengeReward(5,2).add(1))

	if(inChallenge(2, 1)) sacrifice()

	// game.tickCostMultIncrease = 10 - game.repeatInf[1].bought;
	// game.dimCostMultIncrease = 10 - game.repeatInf[2].bought;
	
	updateDimensionSet("dimension")
	updateDimensionSet("infinityDimension", "inf", " IP")
	updateDimensionSet("timeDimension", "time", " EP", true)
  //updateDimensionSet("blackHoleDimension", "blackHole", " ED")
	game.totalAntimatter = game.totalAntimatter.add(getDimensionProduction(1).multiply(getTickspeed("dimension")).multiply(diff/1000));
	
  // IP and infinity generation
	if(game.infinityUpgrades.includes(10)) 
		game.infinityPoints = game.infinityPoints.add(getInfinityPointMult().multiply(getInfinityUpgradeEffect(10)).multiply(diff));
	if(game.infinityUpgrades.includes(14)) 
		game.infinities = game.infinities.add(getInfinityMult().multiply(getInfinityUpgradeEffect(10)).multiply(diff));
  
  
  // Dilation generation
  game.dilation.dilatedTime = game.dilation.dilatedTime.add(getDilationTimeGain().multiply(diff/1000));
  if(game.dilation.dilatedTime.gt(game.dilation.galaxyThreshold)) {
    game.dilation.freeGalaxies = game.dilation.freeGalaxies.add(1)
    game.dilation.galaxyThreshold = game.dilation.galaxyThreshold.multiply(game.dilation.thresholdUpSpeed)
  }


    if (game.dilation.upgrades.includes(7)) {
      game.timestudy.theorems = game.timestudy.theorems.add(getDilationUpgradeEffect(7).multiply(diff/1000))
      game.dilation.generatedTT = game.dilation.generatedTT.add(getDilationUpgradeEffect(7).multiply(diff/1000))
    }

  // More IP generation
	if(tree.hasStudy("s13")) 
		game.infinityPoints = game.infinityPoints.add(gainedInfinityPoints().add(1).divide(100).multiply(getInfinityUpgradeEffect(10)).multiply(diff));
	
  
  // Replicanti
  
	handleReplGrowth()
	
	// Prestige Rates
	
	var iprate = gainedInfinityPoints().divide(getTimeSince("infinity")/60000)
	if(!game.bestIPRate || game.bestIPRate.lt(iprate)) {
		game.bestIPRate = iprate;
		game.bestIPRateAt = gainedInfinityPoints()
	}
	
	var eprate = gainedEternityPoints().divide(getTimeSince("eternity")/60000)
	if(!game.bestEPRate || game.bestEPRate.lt(eprate)) {
		game.bestEPRate = eprate;
		game.bestEPRateAt = gainedEternityPoints()
	}
	
	var esrate = gainedEnergyShards().divide(getTimeSince("energize")/3600000)
	if(!game.bestESRate || game.bestESRate.lt(eprate)) {
		game.bestESRate = esrate;
		game.bestESRateAt = gainedEnergyShards()
	}
	
	// Global UI
	
	ge("antimatter").textContent = getFullExpansion(game.dimensions[0].amount)
	ge("antimatterGrowth").textContent = getFullExpansion(getDimensionProduction(1).multiply(inChallenge(7) ? 1 : getTickspeed("dimension")))

	gc("infinityPoints", function(e) {e.textContent = shortenMoney(game.infinityPoints.floor())})
	gc("eternityPoints", function(e) {e.textContent = shortenMoney(game.eternityPoints.floor())})
	gc("energyShards", function(e) {e.textContent = shortenMoney(game.energize.energyShards.floor())})
	gc("tachyonParticles", function(e) {e.textContent = shortenMoney(game.dilation.tachyonParticles)})
	
	displayIf("infinityPrestige", haveInfinitied())
	displayIf("gainedIP", (game.bestInfinityTime < 60000 || game.break) && (atInfinity() || getChallengeSet() < 3));
  ge("energyShards").innerHTML = shortenMoney(game.energize.energyShards.floor())
	ge("gainedIP").style.fontSize = game.break || inChallenge() ? "11px" : "30px"
	ge("gainedIP").innerHTML = getChallengeSet() == 1 || getChallengeSet() == 2 ? 
		(canCompleteChallenge() ? "Big Crunch to complete challenge." : "Reach " + shortenMoney(getChallengeGoal()) + " antimatter to complete challenge.") : 
		game.break ? 
			"<b>Big Crunch for " + shortenMoney(gainedInfinityPoints()) + "<br>Infinity Points.</b><br>" + 
			shorten(iprate) + " IP/min<br>Peak: " + 
			(game.options.showBestRateAt ? shorten(game.bestIPRateAt) + " IP" : shorten(game.bestIPRate) + " IP/min") : "<b>Big Crunch</b>"

	displayIf("eternityPrestige", atEternity() || haveEternitied())
	displayIf("energizePrestige", atEnergize() || haveEnergized())
	displayIf("EP", haveEternitied());
	displayIf("TP", (tree.hasStudy("d11") || unlockedDilation()));
	displayIf("dilation", (tree.hasStudy("d11") || unlockedDilation()));
	displayIf("gainedEP", atEternity());
  displayIf("tickspeedShit", game.options.shiftKey)
  ge("tickTime").innerHTML = timeDisplayShort(getTickspeed("dimension").pow(-1), true, 3) //.pow(-1)
	ge("gainedEP").innerHTML = getChallengeSet() == 3 ? 
		 (canCompleteChallenge() ? "Other challenges await...<br>I need to become Eternal." : "Reach " + shortenMoney(getChallengeGoal()) + " IP to complete challenge.") : 
		(!inDilation() ? (haveEternitied() ? 
			"<b>I need to become eternal.</b><br>Gain " + shortenMoney(gainedEternityPoints()) + " Eternity Points.<br>" + 
			shorten(eprate) + " EP/min<br>Peak: " + 
			(game.options.showBestRateAt ? shorten(game.bestEPRateAt) + " EP" : shorten(game.bestEPRate) + " EP/min") : "<b>Other times await...<br>I need to become eternal.</b>")  : 
"<b>I need to become eternal.</b><br>Gain " + shortenMoney(gainedTP()) + " Tachyon Particles, and " + shortenMoney(gainedEternityPoints()) + " Eternity Points.<br>")
	displayIf("gainedES", atEnergize());
	displayIf("ES", haveEternitied());
  ge("gainedES").innerHTML = !haveEnergized() ? "<b>Being eternal is boring...<br><br>...now I shall harness energy.</b>" : "<b>I shall harness energy.</b><br>Gain " + shortenMoney(gainedEnergyShards()) + " Energy Shards." + "<br>" + shorten(esrate) + " ES/hour<br>Peak: " + 
			(game.options.showBestRateAt ? shorten(game.bestESRateAt) + " ES" : shorten(game.bestESRate) + " ES/hour")
	
	// Tab Buttons

	displayIf("infinityTabButton", haveInfinitied())
	displayIf("eternityTabButton", haveEternitied())
	displayIf("energizeTabButton", haveEnergized())
	displayIf("challengesTabButton", haveInfinitied())
	displayIf("automationTabButton", getChallengeCompletions(0) || haveEternitied())
	displayIf("infinityTabs", game.infinityUpgrades.length > 15 || game.break || haveEternitied())
	displayIf("dimensionTabs", game.break || haveEternitied())
	displayIf("timeDimensionButton", haveEternitied());
	displayIf("postInfinityUpgrades", game.break)
	d = game.options.smallOptions
	displayIf("optionsButton", d)
	displayIf("optionsButtons", !d)
	c = game.dimensions[0].amount.gte(infp()) && !(game.bestInfinityTime < 6e4 || game.break || haveEternitied());
	displayIf("tabButtons", !c)
	if(c) { if(!lastTab) lastTab = game.currentTab;	showTab("bigCrunch") }
	
	// Dimensions
	
	if(game.currentTab == "dimensions") {
    
    displayIf("blackHoleDimensionButton", tree.hasStudy("d31"));
		
		// Normal Dimensions
		
		if(game.currentDimensionTab == "normal") {
			ge("tickspeed").textContent = inChallenge(7) ? "" : shorten(getTickspeed("dimension"));
			ge("dimMult").textContent = shorten(game.dimMult, 2, 1)
			ge("buyTickspeed").textContent = "Cost: " + shortenCosts(game.tickspeed.cost);
			ge("buyTickspeed").className = ge("maxTickspeed").className = canBuyTickspeed() ? "buy" : "lock"
			
			displayIf("sacrificeContainer", game.shifts == 5)
			ge("sacrifice").className = "buy"
			ge("sacrifice").textContent = "Dimensional Sacrifice (" + shorten(getSacrificeGain()) + "x)"
			ge("sacrificePower").textContent = shorten(game.sacrificeMult)
			
			ge("shifts").textContent = game.shifts;
			ge("shiftReq").textContent = tierNames[game.shifts+4]
			ge("shift").className = canShift() ? "buy" : "lock"
			
			ge("boosts").textContent = getFullExpansion(getEffectiveDimensionBoosts());
			dr = getDimensionBoostReq()
			ge("boostReq").textContent = (inChallenge(11) ? getFullExpansion(dr, 2) + " fourth " : (tree.hasStudy("c35") ? getFullExpansion(dr, 2) + " ninth " : getFullExpansion(dr.ceil()) + " ninth "));
			ge("boost").className = canBoost() ? "buy" : "lock" 
			
			ge("galaxies").textContent = getFullExpansion(getEffectiveNormalGalaxies());
			ge("extraGalaxies").textContent = " + " + getFullExpansion(game.replicanti.galaxies) + (getFreeDilatedGalaxies().gt(0) ? " + " + shortenMoney(getFreeDilatedGalaxies()) : "");
			ge("galaxyReq").textContent = getFullExpansion(getGalaxyReq()) + (inChallenge(11) ? " fourth " : " ninth ");
			ge("galaxy").className = canGalaxy() ? "buy" : "lock" 
			
			displayIf("shiftDisplay", game.shifts < 5 && !inChallenge(11));
			displayIf("boostDisplay", game.shifts == 5 || inChallenge(11));
			displayIf("galaxyDisplay", game.shifts == 5 || game.galaxies.gt(0) || haveInfinitied());
      displayIf("extraGalaxies", getEffectiveReplicantiGalaxies().gt(0) || getFreeDilatedGalaxies().gt(0))
			displayIf("sacrificeDisplay", game.shifts == 5 || haveInfinitied())
			
			ge("boostName").textContent = getEffectiveDimensionBoosts().gte(getDimensionHypersonicStart()) ? "Dimension Hypersonic" : game.boosts.gte(getDimensionSupersonicStart()) ? "Dimension Supersonic" : "Dimension Boost"
			ge("galaxyName").textContent = getEffectiveNormalGalaxies().gte(getDarkGalaxyStart()) ? "Dark Antimatter Galaxies" : getEffectiveNormalGalaxies().gte(getRemoteGalaxyStart()) ? "Remote Antimatter Galaxies" : game.galaxies.gte(getDistantGalaxyStart()) ? "Distant Antimatter Galaxies" : "Antimatter Galaxies"
			ge("boostPower").textContent = shorten(getDimensionBoostPower(), 2, 1)
			ge("boostEffect").textContent = "(" + shorten(getDimensionBoostEffect()) + "x on all dimensions)"
			ge("galaxyPower").textContent = shortenMoney(getGalaxyPower(), 2, 1)
			ge("galaxyEffect").innerHTML = inChallenge(7) ? "x" + shorten(getTickPower().pow(7)) + " on 9th dimensions" : getTickPower().gte(2) ? "x" + shorten(getTickPower()) : "+" + shorten(getTickPower().subtract(1).multiply(100)) + "%"
      
      
    /*  displayIf("galaxyScalings", haveEternitied())
      ge("distantStart").innerHTML= shortenMoney(getDistantGalaxyStart(), 2, 1)
      displayIf("remoteGalaxies", getEffectiveNormalGalaxies().gte(getRemoteGalaxyStart()))
      ge("remoteStart").innerHTML= shortenMoney(getRemoteGalaxyStart(), 2, 1) */
			
			displayIf("resetDimsButton", inChallenge())
			
			c = getChallengeDivider()
			ge("challengeMultiplier").innerHTML = "<br>Challenge production factor: " + (c.gt(1e3) ? "1 / " + shorten(c) : c.pow(-1).multiply(100).toFixed(2) + "%")
			displayIf("challengeMultiplier", inChallenge(4) || inChallenge(5) || inChallenge(6) || inChallenge(6, 1))
		}
		
		// Infinity Dimensions
		
		if(game.currentDimensionTab == "infinity") {
			ge("infinityPower").textContent = getFullExpansion(game.infinityDimensions[0].amount)
			ge("infinityPowerEffect").textContent = shorten(getInfinityPowerEffect())
			ge("infinityPowerGrowth").textContent = getFullExpansion(getInfinityDimensionProduction(1).multiply(getTickspeed("infinityDimension")))
			ge("infinityshiftcost").textContent = game.infinityShifts.gte(9) ? 
				"Reach " + shortenCosts(getInfinityShiftCost()) + " antimatter for a " + shortenCosts(getInfinityShiftPower()) + "x boost." : 
				((getChallengeCompletions(1) > 5 || game.infinityShifts.lt(4)) ? 
					"Reach " + shortenCosts(getInfinityShiftCost()) + " antimatter to unlock a new dimension." : 
					"Complete 6 infinity challenges to unlock.")
			displayIf("infinityPowerArea", game.infinityShifts.gt(0))
			ge("infinityshift").className = canInfinityShift() ? "buy" : "lock"
		}
		
		// Time Dimensions
		
		if(game.currentDimensionTab == "time") {
      displayIf("infiniteTime", game.achievements.includes(75));
			ge("infiniteTimeMulti").textContent = shorten(getInfiniteTimeMult())
			ge("timeShards").textContent = shortenMoney(game.timeDimensions[0].amount)
			ge("freeTickspeed").textContent = getFullExpansion(getFreeTickspeedUpgrades())
			ge("freeTickspeedEffect").textContent = shorten(getTickPower().pow(getFreeTickspeedUpgrades()))
			ge("timeShardThreshold").textContent = shorten(getFreeTickspeedThreshold())
			ge("timeShardGrowth").textContent = shorten(getTimeDimensionProduction(1).multiply(getTickspeed("timeDimension")))
		}
	
  	if(game.currentDimensionTab == "blackHole") {
			ge("freeRGs").textContent = shortenMoney(getFreeRGUpgrades())
			ge("blackHolePower").textContent = shortenMoney(game.blackHoleDimensions[0].amount)
			ge("blackHolePowerThreshold").textContent = shorten(getFreeRGThreshold())
			ge("blackHolePowerGrowth").textContent = shorten(getBlackHoleDimensionProduction(1).multiply(getTickspeed("blackHoleDimension")))
		}
	}
	// Challenges
	
	if(game.currentTab == "challenges") {
		updateChallengeDescriptions();
		ge("challengeInfo").style.left = innerWidth / 2 - 175;
		ge("challengeInfo").style.top = 310;
		ge("challengeDescription").innerHTML = challengeDescriptions[selectedChallenge+game.selectedChallengeType*12]
		ge("cLeft").style.opacity = (game.selectedChallengeType > 0) + 0
		ge("cRight").style.opacity = (game.selectedChallengeType < getChallengeTypeCap()) + 0
		ge("challengeBenefits").innerHTML = getChallengeBenefits()
	}
	
	// Infinity
	
	if (game.currentTab == "infinity") {
		var iud = getIUDescriptions();
		for(var i = 0; i < 32; i++) {
			ge("infinityUpgrade" + i).className = game.infinityUpgrades.includes(i) ? "infinityUpgradeBought" : canBuyInfinityUpgrade(i) ? "infinityUpgrade" : "infinityUpgradeLocked";
			ge("infinityUpgradeDesc" + i).innerHTML = iud[i];
			ge("infinityUpgradeCost" + i).innerHTML = shortenCosts(infinityUpgradeCosts[i]) + " IP";
		}
		
		ge("repeatInf0").innerHTML = "Multiply IP gain by 2<br>Currently: " + shortenMoney(getInfMult()) + "x" + (getInfMult().gt("1e55000") ? "(softcapped)":"") + "<br>Cost: " + shortenMoney(getRepeatInfCost(0)) + " IP"
		ge("repeatInf0").className = canBuyRepeatInf(0) ? "infinityUpgrade" : "infinityUpgradeLocked"
		
		var text = ""
		if(game.infinityUpgrades.includes(10)) 
			text += "You generate " + shortenMoney(getInfinityPointMult()) + " IP";
		if(game.infinityUpgrades.includes(14)) 
			text += " and " + getFullExpansion(getInfinityMult()) + " infinit" + (getInfinityMult().eq(1)?"y":"ies");
		if(text.length) text += " every " + timeDisplay(1 / getInfinityUpgradeEffect(10)) + "."
		ge("infinityPointGeneration").textContent = text;
		
		ge("breakButton").textContent = game.break ? "FIX INFINITY" : "BREAK INFINITY"
		ge("breakButton").setAttribute("tooltip", 
			canBreakInfinity() ? 
				`Allows numbers to exceed ${shorten(infp())}, increasing infinity point gain.` : 
				`10 challenge completions are required to break infinity.
				Progress: ${getChallengeCompletions()} / 10`
		)
	}
	
	// Eternity
	
	if(game.currentTab == "eternity") {
    
		
		// Time Studies
		
		if(game.currentEternityTab == "timeStudies") {
			ge("ttamount").innerText = getFullExpansion(game.timestudy.theorems)
			ge("ttbutton0").className = !game.dilation.upgrades.includes(7) ? (game.dimensions[0].amount.gte(Decimal.pow("1e20000", game.timestudy.bought[0])) ? "ttbtn" : "ttbtnlocked") : "ttbtnhidden"
			ge("ttbutton0").innerHTML = "Buy Time Theorems<br>Cost: " + shortenCosts(Decimal.pow("1e20000", game.timestudy.bought[0])) + " AM"
			ge("ttbutton1").className = !game.dilation.upgrades.includes(7) ? (game.infinityPoints.gte(Decimal.pow(1e100, game.timestudy.bought[1])) ? "ttbtn" : "ttbtnlocked") : "ttbtnhidden"
			ge("ttbutton1").innerHTML = "Buy Time Theorems<br>Cost: " + shortenCosts(Decimal.pow(1e100, game.timestudy.bought[1])) + " IP"
			ge("ttbutton2").className = !game.dilation.upgrades.includes(7) ? (game.eternityPoints.gte(Decimal.pow(2, game.timestudy.bought[2])) ? "ttbtn" : "ttbtnlocked") : "ttbtnhidden"
			ge("ttbutton2").innerHTML = "Buy Time Theorems<br>Cost: " + shortenMoney(Decimal.pow(2, game.timestudy.bought[2])) + " EP"
			ge("respecTS").className = atEternity() ? "ttbtn" : "ttbtnlocked"
			ge("respecTS").setAttribute("tooltip", 
				atEternity() ? 
					`Start a new eternity, resetting the study tree and refunding all of your spent time theorems.` : 
					`You have to be able to eternity to respec time studies.`
			)
      // game.dilation.upgrades.includes(7) ? (game.dimensions[0].amount.gte(Decimal.pow("1e20000", game.timestudy.bought[0])) ? "ttbtn" : "ttbtnlocked") : ttbtnhidden
			
			ge("timeStudies").style.transform = "scale(" + tree.camera.zoom + ", " + tree.camera.zoom + ")"
			tree.camera.x += tree.camera.xVel;
			tree.camera.y += tree.camera.yVel;
			tree.camera.xVel *= 0.9;
			tree.camera.yVel *= 0.9;
				
			resizeCanvas();
			ctx.save();
			ctx.scale(tree.camera.zoom, tree.camera.zoom)
			
			for(var i = 0; i < tree.studies.length; i++) {
				var study = tree.studies[i];
				study.button.className = (game.timestudy.studies.includes(study.id) ? "timestudybought " : study.canSee() ? (study.canBuy() ? "timestudy " : "timestudylocked ") : "timestudyhidden ") + {"s":"special","p":"power","i":"infinity","t":"time","g":"galactic","r":"replication","d":"dilation","c":"cavern","n":"passive"}[study.id[0]]
				study.button.innerHTML = (game.options.shiftKey ? study.id + ", " + study.canSee() + "<br>" : "") + study.desc + (study.eff ? "<br>Currently: " + study.effb + window[study.effd](study.eff()) + study.effa : "") + "<br>Cost: " + getFullExpansion(study.cost) + " Time Theorem" + (study.cost==1?"":"s")
        
				var x = study.x*200 - tree.camera.x, y = study.y* 100 - tree.camera.y;
				study.button.style.left = x;
				study.button.style.top = y;
				
				// Drawing on canvas
				
				x += 95 - innerWidth / 2 + innerWidth / 2 / tree.camera.zoom;
				y += 53 - (innerHeight - 200) / 2 + (innerHeight - 200) / 2 / tree.camera.zoom;
				
				study.pre.forEach(function(p) {
					var pre = tree.getStudy(p);
					ctx.beginPath()
					ctx.moveTo(x, y)
					ctx.lineTo(x + (pre.x-study.x) * 200, y + (pre.y-study.y) * 100)
					
					ctx.strokeStyle = "#000"
					ctx.lineWidth = 20;
					ctx.stroke();
					ctx.strokeStyle = {"s":"#666","p":"#063","i":"#630","t":"#606","r":"#036","d":"#660","g":"#800","c":"#995","n":"#600"}[study.id[0]] + (tree.hasStudy(study.id) ? "" : "6")
					ctx.lineWidth = 20;
					ctx.stroke();
				})
			}
			
			ctx.restore();
		}
		
		// Eternity Upgrades
		
		if(game.currentEternityTab == "eternityUpgrades") {
			var eud = getEUDescriptions();
			for(var i = 0; i < 20; i++) {
				ge("eternityUpgrade" + i).className = game.eternityUpgrades.includes(i) ? "eternityUpgradeBought" : canBuyEternityUpgrade(i) ? "eternityUpgrade" : "eternityUpgradeLocked";
				ge("eternityUpgradeDesc" + i).innerHTML = eud[i];
				ge("eternityUpgradeCost" + i).innerHTML = getFullExpansion(eternityUpgradeCosts[i]) + " EP";
        if(i > 9 && i < 15) {
          displayIf("eternityUpgrade"+i,(tree.hasStudy("d11") || unlockedDilation()))
        }
        if(i > 14 && i < 20) {
          displayIf("eternityUpgrade"+i,tree.hasStudy("d31"))
        }
			}
			ge("repeatEter0").innerHTML = "Multiply EP gain by 5<br>Currently: " + shortenMoney(repeatEterBoost()) + "x" + (repeatEterBoost().gt(1e200) ? "(softcapped)":"") + "<br>Cost: " + shortenMoney(getRepeatEterCost(0)) + " EP"
			ge("repeatEter0").className = canBuyRepeatEter(0) ? "eternityUpgrade" : "eternityUpgradeLocked"
		}
		
		// Milestones
		
		if(game.currentEternityTab == "eternityMilestones") {
			var c = 0
			for(var i in eternityMilestones) {
				c++
				ge("eternityMilestone" + i).className = game.eternities.gte(eternityMilestones[i].req) ? "eternitymilestone" : "eternitymilestonelocked"
			}
		}
		
		// Replicanti
		
		if(game.currentEternityTab == "replicanti") {
			ge("replicanti").innerHTML = shortenMoney(game.replicanti.amount.floor());
			ge("replicantiEff").innerHTML = shorten(getReplEffect());
			ge("replChance").innerHTML = "Replicate chance: " + shortenMoney(getReplChance().subtract(1).multiply(100)) + "%<br>+1% Costs: " + shortenCosts(getReplUpgradeCost(0)) + " EP";
			ge("replSpeed").innerHTML = "Replicate interval: " + timeDisplayShort(getReplSpeed().pow(-1), true, 3) + "<br>+1% Costs: " + shortenCosts(getReplUpgradeCost(1)) + " EP";
			ge("replGalaxy").innerHTML = "Max galaxies: " + getFullExpansion(getMaxReplGalaxies()) + "<br>+1 Costs: " + shortenCosts(getReplUpgradeCost(2)) + " EP";
			ge("replMax").innerHTML = shortenMoney(getReplLimit())
			ge("replGain").innerHTML = "Reach " + shorten(infp(game.replicanti.galaxies.add(1))) + " replicanti to create a replicanti galaxy.<br>Replicated Galaxies: " + shorten(game.replicanti.galaxies) + " / " +shorten(getMaxReplGalaxies());
			
			ge("replChance").className = canBuyReplUpgrade(0) ? "buy" : "lock"
			ge("replSpeed").className = canBuyReplUpgrade(1) ? "buy" : "lock"
			ge("replGalaxy").className = canBuyReplUpgrade(2) ? "buy" : "lock"
			ge("replGain").className = canReplGalaxy() ? "buy" : "lock"
		}
    
    // Dilation
    
    if(game.currentEternityTab == "dilation") {
			ge("dilatedTime").innerHTML = shortenMoney(game.dilation.dilatedTime);
      ge("dilatedTimeGain").innerHTML = shortenMoney(getDilationTimeGain());
			ge("freeGalaxies").innerHTML = shortenMoney(getFreeDilatedGalaxies());
			ge("galaxyThreshold").innerHTML = shortenMoney(getFreeGalaxiesThreshold());
			for(var i = 0; i < 12; i++) {
				ge("dilashunUpgrade" + i).className = game.dilation.upgrades.includes(i) ? "eternityUpgradeBought" : canBuyDilationUpgrade(i) ? "eternityUpgrade" : "eternityUpgradeLocked";
				ge("dilashunUpgradeDesc" + i).innerHTML = getDUDescriptions()[i];
				ge("dilashunUpgradeCost" + i).innerHTML = getFullExpansion(dilationUpgradeCosts[i]) + " DT";
			}
			for(var i = 0; i < 4; i++) {
				ge("repeatDil" + i).className = canBuyRepeatDil(i) ? "eternityUpgrade" : "eternityUpgradeLocked";
				ge("repeatDil" + i).innerHTML = getRepeatDilDesc()[i] + `<br>` + getFullExpansion(getRepeatDilCost(i)) + " DT"
			}
      displayIf("dilationButtons", tree.hasStudy("d31"))
      ge("exdilationButton")
			for(var i = 0; i < 9; i++) {
				ge("exDilashunUpgrade" + i).className = game.exDilation.upgrades.includes(i) ? "exDilationBought" : canBuyExDilationUpgrade(i) ? "exDilation" : "exDilationLocked";
				ge("exDilashunUpgradeDesc" + i).innerHTML = getEDUDescriptions()[i];
				ge("exDilashunUpgradeCost" + i).innerHTML = getFullExpansion(exDilationUpgradeCosts[i]) + " ex-dilation";
			}
      ge("exDilation").innerHTML = shortenMoney(game.exDilation.amount);
			for(var i = 0; i < 4; i++) {
				ge("repeatEDil" + i).className = canBuyRepeatExDil(i) ? "exDilation" : "exDilationLocked";
				ge("repeatEDil" + i).innerHTML = getRepeatExDilDesc()[i] + `<br>` + getFullExpansion(getRepeatExDilCost(i)) + " ex-dilation"
			}
    }
	}
  
  // Energize
  
  if(game.currentTab == "energize") {
		if(game.currentEnergizeTab == "energyShards") {
			var eud = getEnUDescriptions();
			for(var i = 0; i < 12; i++) {
				ge("chargedUpgrade" + i).className = game.energize.upgrades.includes(i) ? "energyUpgradesBought" : canBuyEnergizeUpgrade(i) ? "energyUpgrades" : "energyUpgradesLocked";
				ge("chargedUpgradeDesc" + i).innerHTML = eud[i];
				ge("chargedUpgradeCost" + i).innerHTML = getFullExpansion(energizeUpgradeCosts[i]) + " ES";
			}
		}
    	for(var i in chargedMilestones) {
				c++
				ge("chargedMilestone" + i).className = chargedMilestone(i) ? "eternitymilestone" : "eternitymilestonelocked"
			}
  }
	
	// Options
	
	if(game.currentTab == "options") {
		ge("autosaveOption").innerText = "Autosave: " + ["Off", "On"][!!game.options.autosave+0]
		ge("saveTabsOption").innerText = "Save Tabs: " + ["Off", "On"][!!game.options.saveTabs+0]
		ge("smallOptionsOption").innerText = "Small Options: " + ["Off", "On"][!!game.options.smallOptions+0]
		ge("bestRateOption").innerText = "Peak Gain: " + ["Rate", "Amount"][!!game.options.showBestRateAt+0]
    ge("shiftKeyOption").innerText = "Shift Key: " + ["Off", "On"][!!game.options.shiftKey+0]
	}
	
	// Statistics
	
	if(game.currentTab == "statistics") {
		ge(game.currentStatisticsTab + "StatisticsTab").innerHTML = getStatisticsDisplay(game.currentStatisticsTab)
	}

	// Achievements
	
	if(game.currentTab == "achievements") {
		ge("achievementCompletions").innerText = getFullExpansion(game.achievements.length) + "/" + getFullExpansion(achievements) + " (" + (game.achievements.length / achievements * 100).toFixed(0) + "%)";
		ge("achievementMultiplier").innerText = getFullExpansion(getAchievementMultiplier());
		ge("achievementRowCompletions").innerText = getFullExpansion(game.achievementRowsCompleted);
	}
	
	// Achievement Checks

	if(game.shifts == 5) giveAchievement(10);
	if(game.boosts.gte(5)) giveAchievement(11);
	if(game.dimensions[0].amount.gt(1e303)) giveAchievement(12)
	if(game.galaxies.gt(0)) giveAchievement(13)
	if(game.galaxies.gt(1)) giveAchievement(14)
	if(game.galaxies.gt(2)) giveAchievement(15)
	if(game.dimensions[0].amount.gte(6.66e201) && game.dimensions[9].amount.eq(9)) giveAchievement(17)
	if(game.sacrificeMult.gte(66666) && !inChallenge(8)) giveAchievement(18)
	if(game.dimensions[8].amount.gt(1e27)) giveAchievement(19)
	if(getTickspeed("dimension").gt(1e16)) giveAchievement(20)
	if(getTickspeed("dimension").gt(Decimal.pow(1e16,3000))) giveAchievement(80)
	if(getTickspeed("dimension").gt(Decimal.pow(1e16,125000))) giveAchievement(91)
	if(game.infinities.gt(10)) giveAchievement(21)
	if(game.dimensions[0].amount.gte(infp()) && game.sacrificeMult.eq(1)) giveAchievement(26)
	if(game.totalGalaxies.gte(100)) giveAchievement(27)
	if(game.infinityPoints.gte(1000)) giveAchievement(28);
	if(game.infinities.gte(1000)) giveAchievement(30);
	if(game.infinities.gte(1e5)) giveAchievement(77);
	if(game.banked.infinities.gte(5e7)) giveAchievement(102);
	if(getChallengeCompletions() > 0) giveAchievement(32);
	if(game.challenges[0][8].completed) giveAchievement(33);
	if(getChallengeCompletions() > 11) giveAchievement(35);
	if(getChallengeCompletions(2) > 11) giveAchievement(97);
  if(game.infinityPoints.gt("1.79e300008") && game.dilation.active == true && game.repeatInf[1].bought.eq(0)) giveAchievement(104);
	if(game.break) giveAchievement(36);
	if(game.totalAntimatter.gt(infp(2))) giveAchievement(37);
	if(game.infinityUpgrades.includes(22)) giveAchievement(38);
	if(game.infinityShifts.gt(0)) giveAchievement(39);
	if(game.boosts.gt(26)) giveAchievement(41);
	if(game.infinityDimensions[0].amount.gt(1e6)) giveAchievement(45);
	if(game.dimensions[1].bought.gte(150)) giveAchievement(46);
	if(game.dimensions[9].bought.eq(69)) giveAchievement(47);
	if(game.infinityShifts.gt(1)) giveAchievement(48);
	if(game.dimensions[8].multiplier.gt(infp())) giveAchievement(50)
	if(game.infinityDimensions[0].amount.gt(infp())) giveAchievement(55)
	if(game.totalAntimatter.gt("1e10000")) giveAchievement(56)
	if(game.galaxies.gt(50)) giveAchievement(57)
	if(getSacrificeMult().gt(infp())) giveAchievement(59)
	if(game.totalGalaxies.gte(10000)) giveAchievement(63)
	if(game.totalGalaxies.gte(50000)) giveAchievement(72)
	if(game.totalAntimatter.gt("1e35000")) giveAchievement(65)
	if(game.infinityPoints.gte("1e333")) giveAchievement(69);
	if(game.infinityShifts.gt(7)) giveAchievement(70);
	if(game.infinityShifts.gt(8)) giveAchievement(71);
	if(game.dimensions[9].amount.gt(9999)) giveAchievement(87);
	if(game.replicanti.amount.gt(1.79e308) && game.replicanti.ticks < 36e5) giveAchievement(73);
	if(game.replicanti.amount.gt(1.79e308) && game.replicanti.ticks < 6e5) giveAchievement(74);
	if(game.replicanti.amount.gt("1e20000")) giveAchievement(93);
	if(getReplEffect().gt(1e20)) giveAchievement(84);
	if(game.eternityPoints.gt(1.79e308)) giveAchievement(86)
	if(game.infinityPoints.gt("1e7000") && inChallenge(10,2)) giveAchievement(107)
	if(getFreeTickspeedUpgrades().gte(308)) giveAchievement(75);
	if(getFreeTickspeedUpgrades().gte(1e4)) giveAchievement(96);
	if(getEffectiveNormalGalaxies().gte(250) && getEffectiveReplicantiGalaxies().eq(0)) giveAchievement(95);
  if(getTotalTT().gte(10)) giveAchievement(79);
  if(game.dilation.upgrades.length > 5) giveAchievement(92);
	if(game.infinityPoints.gte("9.99e99999")) giveAchievement(89);
	
	// Automation

	ge("auClass").innerText = au.class
	ge("upgradeCore").innerText = `Unlock Class ${au.class+1} - ${layerNames[au.class+1]}`;
	ge("upgradeCore").className = canUpgradeAutomator() ? "buy" : "lock"

	for(var i = 0; i < 4; i++) displayIf("class" + i + "Automation", au.class >= i)
	
	au.extensions.forEach(function(e) {
		e.charge += e.speed * diff / 1000 / hacker;
		if(e.charge > 2**au.class) e.charge = 2**au.class;
		e.id = au.extensions.indexOf(e)
		
		if(game.currentTab !== "automation") return;
		
		names = []
		for(var i = 0; i < 9; i++) names.push("dimensionAutobuyer" + e.id);
		names = names.concat(["tickspeedAutobuyer", "boostAutobuyer", "galaxyAutobuyer", "sacrificeAutobuyer", "infinityAutobuyer", "ipmultAutobuyer"])
		for(var i = 0; i < 9; i++) names.push("infdimensionAutobuyer" + (e.id - 15));
		names = names.concat(["infinityShiftAutobuyer", "eternityAutobuyer", "replicantiGalAutobuyer", "replicantiChaAutobuyer", "replicantiIntAutobuyer", "replicantiMaxAutobuyer"])
		for(var i = 0; i < 9; i++) names.push("timdimensionAutobuyer" + (e.id - 30));
    names = names.concat(["dilUpgAutobuyer", "epmultAutobuyer"])
		
		var div = ge(names[e.id])
		div.style.visibility = extUnlocked(e.id) ? "visible" : "hidden";
		
		ge("buyauto").style = "font-size: 10px"
 //   displayIf("buyauto" + (e.id),e.level.gte((2**au.class*10)))
    ge("buyauto" + (e.id)).innerHTML = "Make extension " + e.id + " interval 50% smaller<br>Cost: " + shortenCosts(e.cost) + " " + smallCurrency[e.currency]
		
		if(!div.children.length) return; // extension exists but no element does
		
		div.children[1].innerHTML = "Level " + getFullExpansion(e.level) + "/" + (2**au.class*10) + "<br>Interval: " + timeDisplayShort(1 / e.speed) + "<br>" + (e.speed <= 1 ? timeDisplayShort(Math.max(1 / e.speed * (1 - e.charge), 0)) + " until charged" : shortenMoney(e.speed) + " activations per second")
		div.children[2].style.width = Math.min(e.charge, 1) * 230
		div.children[2].innerText = (e.charge*100).toFixed(0) + "%"
	})
	
	au.raw = ge("auScript").value;
	au.script = au.raw.split(`
`);
	if(!au.tickDelay) au.tickDelay = 0;
	if(au.tickDelay > 0) au.tickDelay--;
	else {
		au.delay -= diff / hacker;
		if(au.delay < 0) {
			au.delay = 0;
			au.line++;
			if(au.line >= au.script.length || !au.line) au.line = 0;
			runAu(au.script[au.line])
		}
	}
  for(var i = 0; i < 41; i++) {
   if(ge(i + "autoSelect").checked) {
     if (extUnlocked(i)) fireExtension(i, true)
     game.automator.enabled[i] = true
   } else {
     game.automator.enabled[i] = false
   }
  }
	
	// Give the Automator memory access to important stuff
	
	runAu("set am " + game.dimensions[0].amount);
	runAu("set shifts " + game.shifts);
	runAu("set boosttime " + getTimeSince("boost"));
	runAu("set boosts " + game.boosts);
	runAu("set galaxytime " + getTimeSince("galaxy"));
	runAu("set galaxies " + game.galaxies);
	runAu("set sacgain " + getSacrificeGain());
	runAu("set ip " + game.infinityPoints);
	runAu("set ipg " + gainedInfinityPoints());
	runAu("set inf " + game.infinities);
	runAu("set inftime " + getTimeSince("infinity"));
	runAu("set ep " + game.eternityPoints);
	runAu("set epg " + gainedEternityPoints());
	runAu("set eter " + game.eternities);
	runAu("set etertime " + getTimeSince("eternity"));
	runAu("set dilated " + game.dilation.active);
	runAu("set tp " + game.dilation.tachyonParticles);
	runAu("set dt " + game.dilation.dilatedTime);
}

function getStatisticsDisplay(type) {
	let lines = []
	switch(type) {
		case "normal":
			lines.push(`You have made a total of ${getFullExpansion(game.totalAntimatter)} antimatter.`)
			lines.push("")
			if(game.totalBoosts.gt(0)) lines.push(`You have ${getFullExpansion(game.boosts)} dimensional boosts.`)
			if(game.totalGalaxies.gt(0)) lines.push(`You have ${getFullExpansion(game.galaxies)} antimatter galaxies.`)
			if(game.totalBoosts.gt(0)) lines.push(`You have dimension boosted a total of ${getFullExpansion(game.totalBoosts)} times.`)
			if(game.totalGalaxies.gt(0)) lines.push(`You have created a total of ${getFullExpansion(game.totalGalaxies)} antimatter galaxies.`)
      lines.push("")
      
      if(game.galaxies.gt(0)) {
        lines.push(`You have ${getFullExpansion(game.galaxies)} antimatter galaxies, doing ${shorten(getEffectiveNormalGalaxies().divide(getEffectiveGalaxies()).multiply(getGalaxyPower()).multiply(100), 2)}% of the work.`)
      }
      if(game.replicanti.galaxies.gt(0)) {
        lines.push(`You have ${getFullExpansion(game.replicanti.galaxies)} replicated galaxies, doing ${shorten(getEffectiveReplicantiGalaxies().divide(getEffectiveGalaxies()).multiply(getGalaxyPower()).multiply(100), 2)}% of the work.`)
      }
      if(getFreeDilatedGalaxies().gt(0)) {
        lines.push(`You have ${getFullExpansion(getFreeDilatedGalaxies())} dilated galaxies, doing ${shorten(getEffectiveDilashunGalaxies().divide(getEffectiveGalaxies()).multiply(getGalaxyPower()).multiply(100), 2)}% of the work.`)
      }
		
			lines.push("")
			if (haveInfinitied()) {
				lines.push(`You have infinitied ${getFullExpansion(game.infinities)} times.`)
				lines.push(`Your fastest infinity lasted ${timeDisplay(game.bestInfinityTime)}.`)
				lines.push(`You have spent ${timeDisplay(getTimeSince("infinity"))} in this infinity.`)
        if (game.banked.infinities.gt(0)) 				lines.push(`You have banked ${getFullExpansion(game.banked.infinities)} infinities, and will get ${getFullExpansion(game.infinities.divide(50))} on your next eternity.`)
				lines.push("")
			}
			if (haveEternitied()) {
				lines.push(`You have eternitied ${getFullExpansion(game.eternities)} times.`)
				lines.push(`Your fastest eternity lasted ${timeDisplay(game.bestEternityTime)}.`)
				lines.push(`You have spent ${timeDisplay(getTimeSince("eternity"))} in this eternity.`)
				lines.push("")
			}
			if (haveEnergized()) {
				lines.push(`You have energized ${getFullExpansion(game.energize.times)} times.`)
				lines.push(`Your fastest energize lasted ${timeDisplay(game.bestEnergizeTime)}.`)
				lines.push(`You have spent ${timeDisplay(getTimeSince("energize"))} in this energize.`)
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

updateCheckBoxes()
showTab(game.options.saveTabs ? game.currentTab : "dimensions")
showDimensionTab(game.options.saveTabs ? game.currentDimensionTab : "normal")
showStatisticsTab(game.options.saveTabs ? game.currentStatisticsTab : "normal")
showInfinityTab(game.options.saveTabs ? game.currentInfinityTab : "infinityUpgrades")
showEternityTab(game.options.saveTabs ? game.currentEternityTab : "timeStudies")
showEnergizeTab(game.options.saveTabs ? game.currentEnergizeTab : "energyShards")
showAutomationTab(game.options.saveTabs ? game.currentAutomationTab : "core")
showDilationTab(game.options.saveTabs ? game.currentDilationTab : "dilatedTime")
scrollChallengesTo(game.options.saveTabs ? game.selectedChallengeType : 0)

update();
updateAchievements()

setInterval(function() {if(game.options.autosave) save()}, 10000)
notations(false)
presets(false)