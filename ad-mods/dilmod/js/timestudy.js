tree = {
	camera: {x: 0, y: 0, xVel: 0, yVel: 0, zoom: 1},
	studies: [],
	getStudy: function(s) {
		var r = null
		this.studies.forEach(function(study) {
			if(study.id == s) r = study;
		})
		return r
	},
	hasStudy: function(id) {
		return game.timestudy.studies.includes(id);
	},
	getEff: function(id) {
		return this.getStudy(id).eff()
	},
	buyTheorems: function(c) {
		var bought = 0;
		switch(c) {
			case 0: 
				bought = Decimal.affordGeometricSeries(game.dimensions[0].amount, 1, "1e20000", game.timestudy.bought[0])
				break;
			case 1: 
				bought = Decimal.affordGeometricSeries(game.infinityPoints, 1, 1e100, game.timestudy.bought[1])
				game.infinityPoints = game.infinityPoints.subtract(Decimal.sumGeometricSeries(bought, 1, 1e100, game.timestudy.bought[1]));
				break;
			case 2: 
				bought = Decimal.affordGeometricSeries(game.eternityPoints, 1, 2, game.timestudy.bought[2])
				game.eternityPoints = game.eternityPoints.subtract(Decimal.sumGeometricSeries(bought, 1, 2, game.timestudy.bought[2]));
				break;
		}
		game.timestudy.theorems = game.timestudy.theorems.add(bought);
		game.timestudy.bought[c] = game.timestudy.bought[c].add(bought);
	}
}

function getTotalTT() {
	return game.timestudy.bought[0].add(game.timestudy.bought[1]).add(game.timestudy.bought[2]).add(game.dilation.generatedTT);
}

function Study(p={}) {
	this.x = p.x || 0;
	this.y = p.y || 0;
	this.id = p.id; 
	this.pre = p.pre || [];
	this.cost = new Decimal(p.cost);
	this.desc = p.desc;
	this.req = p.req || true
	this.sre = p.sre || true
	this.and = p.and; // if it requires all previous studies as opposed to any
	this.eff = p.eff; // number, if any
	this.effb = p.effb || "";
	this.effa = p.effb ? (p.effa || "") : (p.effa || "x")
	this.effd = p.effd || "shorten"
}

function ns(p) {
	var study = new Study(p);
	tree.studies.push(study);
	study.button = document.getElementById("timeStudies").appendChild(document.createElement("button"));
  //study.button.setAttribute("tooltip", "test")
	study.button.onclick = function() {
		study.buy()
	}
}

// Ordinary studies
ns({x:     0, y:     0, id:  "s00", cost:    1, desc: "Begin.", and: true})
ns({x:    -2, y:    -1, id:  "p11", cost:    1, desc: "Multiplier to normal dimensions, increasing during this eternity", eff: function() {return Decimal.pow(10, getTimeSince("eternity")/1e4).min(infp())}, pre: ["s00"]})
ns({x:    -2, y:    -2, id:  "p21", cost:    2, desc: "Gain more infinities based on dimension boosts", eff: function() {return game.boosts}, pre: ["p11"]})
ns({x:    -3, y:    -1, id:  "p22", cost:    2, desc: "Boosts based on infinities are 10x stronger", pre: ["p11"]})
ns({x:    -3, y:    -2, id:  "p23", cost:    4, desc: "Dimension Boosts are 4x as powerful", pre: ["p11"]})
ns({x:    -3, y:    -3, id:  "p31", cost:    8, desc: "Sacrifice affects dimensions 1-8 with reduced effect", eff: function() {return getSacrificeMult().pow(0.2).max(1)}, pre: ["p23"]})
ns({x:    -4, y:    -3, id:  "p32", cost:    8, desc: "Replicanti give a boost to normal dimensions.", eff: function() {return getReplEffect().pow(16)}, pre: ["p23"]})
ns({x:    -4, y:    -2, id:  "s01", cost:    0, desc: "Eternity Challenge 1", pre: ["p32"]})
ns({x:    -5, y:    -2, id:  "p41", cost:   60, desc: "Normal dimensions gain a boost based on eternities.", eff: function() {return game.eternities.multiply(400).pow(4).max(1)}, pre: ["s01"], sre: function() { return challengeCompleted(1, 2) }})
ns({x:    -5, y:    -1, id:  "p42", cost:  100, desc: "Normal dimensions gain a boost based on fastest infinity.", eff: function() {return Decimal.max(1e300 / game.bestInfinityTime, 1).pow(2)}, pre: ["s01"], sre: function() { return challengeCompleted(1, 2) }})
ns({x:    -6, y:    -2, id:  "s06", cost:    0, desc: "Eternity Challenge 6", pre: ["p41", "p42"]})
ns({x:     2, y:    -1, id:  "i11", cost:    1, desc: "Infinity Dimensions are more powerful based on Infinity Power", eff: function() {return game.infinityDimensions[0].amount.log10().pow(2).max(1)}, pre: ["s00"]})
ns({x:     2, y:    -2, id:  "i21", cost:    4, desc: "Infinity Dimensions get a multiplier based on fastest eternity time", eff: function() {return Decimal.max(1e10 / game.bestEternityTime, 1).pow(2)}, pre: ["i11"]})
ns({x:     3, y:    -2, id:  "i22", cost:    5, desc: "Infinity Shifts are more powerful the more you have", eff: function() {return game.infinityShifts.pow(2).add(10).log10().pow(3)}, pre: ["i11"]})
ns({x:     3, y:    -1, id:  "i23", cost:    2, desc: "Gain 20% more IP per antimatter galaxy", eff: function() {return Decimal.pow(1.2, game.galaxies)}, pre: ["i11"]})
ns({x:     3, y:    -3, id:  "i31", cost:    7, desc: "Sacrifice affects 9th Infinity Dimension with reduced effect", eff: function() {return getSacrificeMult().pow(0.05).max(1)}, pre: ["i22"]})
ns({x:     4, y:    -3, id:  "i32", cost:   12, desc: "Replicanti boost is powered up.", pre: ["i22"]})
ns({x:     4, y:    -2, id:  "s02", cost:    0, desc: "Eternity Challenge 2", pre: ["i32"]})
ns({x:     5, y:    -2, id:  "i41", cost:   70, desc: "Infinity Dimensions gain a boost based on eternity challenge completions.", eff: function() {return Decimal.pow(getChallengeCompletions(2), 100).max(1)}, pre: ["s02"], sre: function() { return challengeCompleted(2, 2) }})
ns({x:     5, y:    -1, id:  "i42", cost:   90, desc: "Infinity power boost formula is better.", pre: ["s02"], sre: function() { return challengeCompleted(2, 2) }})
ns({x:     6, y:    -2, id:  "s08", cost:    0, desc: "Eternity Challenge 8", pre: ["i41", "i42"]})
ns({x:    -2, y:     2, id:  "t11", cost:    1, desc: "Tickspeed affects first Time Dimension with reduced effect", eff: function() {
  let r = getTickspeed("dimension").pow(0.0005).max(1)
  if(r.gt(infp(2))) r = r.pow(0.290).max(infp(2))
  return r
}, pre: ["s00"]})
ns({x:    -3, y:     2, id:  "t21", cost:    4, desc: "Time Dimensions get a multiplier based on free tickspeed upgrades", eff: function() {return getFreeTickspeedUpgrades().pow(0.5).max(1)}, pre: ["t11"]})
ns({x:    -3, y:     1, id:  "t22", cost:    4, desc: "Time Dimensions are affected by replicanti to a severely reduced effect.", eff: function() {return game.replicanti.amount.floor().add(1).log2().pow(4).max(1).pow(0.5)}, pre: ["t11"]})
ns({x:    -4, y:     3, id:  "t31", cost:    6, desc: "Time Dimensions gain a boost equal to time theorems plus one.", eff: function() {return game.timestudy.theorems.add(1).max(1)}, pre: ["t21"]})
ns({x:    -4, y:     2, id:  "t32", cost:    9, desc: "Time shards boost Normal Dimensions.", eff: function() {return game.timeDimensions[0].amount.add(1).log(1.0025).pow(25).max(1)}, pre: ["t22"]})
ns({x:    -3, y:     3, id:  "t41", cost:   16, desc: "The free tickspeed given from Time Dimensions is multiplied by 1.1.", eff: function() {return 1.1}, pre: ["t31"]})
ns({x:    -3, y:     4, id:  "s03", cost:    0, desc: "Eternity Challenge 3", pre: ["t41"]})
ns({x:    -3, y:     5, id:  "t51", cost:   50, desc: "Time Dimensions gain a boost based on eternity points.", eff: function() {return game.eternityPoints.add(1).pow(1/10).max(1)}, pre: ["s03"], sre: function() { return challengeCompleted(3, 2) }})
ns({x:    -4, y:     5, id:  "t52", cost:   80, desc: "Time Dimensions gain a boost based on time shards.", eff: function() {return game.timeDimensions[0].amount.add(1).log10().pow(0.75).add(1)}, pre: ["t51"], sre: function() { return challengeCompleted(3, 2) }})
ns({x:    -4, y:     6, id:  "s09", cost:    0, desc: "Eternity Challenge 9", pre: ["t52"]})
ns({x:     0, y:    -3, id:  "g11", cost:    1, desc: "Galaxies are 25% stronger.", eff: function() {return 1.25}, pre: ["s00"]})
ns({x:     0, y:    -4, id:  "g12", cost:    2, desc: "Replicanti grow faster based on tickspeed.", eff: function() {return getTickspeed("infinityDimension").pow(0.5).divide(1e90).add(1).log(10000).divide(16).max(1)}, pre: ["g11"]})
ns({x:     1, y:    -3, id:  "g21", cost:    6, desc: "Second Time Dimension gains a boost based on galaxies.", eff: function() {return getEffectiveGalaxies().add(1).pow(0.0125)}, pre: ["g12"]})
ns({x:    -1, y:    -3, id:  "g22", cost:    6, desc: "Third Time Dimension gains a boost based on eternity points.", eff: function() {return game.eternityPoints.add(1).pow(0.125)}, pre: ["g12"]})
ns({x:     1, y:    -4, id:  "g31", cost:   10, desc: "Replicanti grow faster based on free tickspeed upgrades.", eff: function() {return getFreeTickspeedUpgrades().add(1).pow(0.065)}, pre: ["g21"]})
ns({x:    -1, y:    -4, id:  "g32", cost:   10, desc: "You gain a multiplier to IP based on replicated galaxies.", eff: function() {return game.replicanti.galaxies.add(1).pow(2).pow(2)}, pre: ["g22"]})
ns({x:     0, y:    -5, id:  "g41", cost:   35, desc: "Remote antimatter galaxy scaling starts later based on replicated galaxies.", eff: function() {return game.replicanti.galaxies.add(200).divide(200).pow(0.75).max(1)}, pre: ["g32", "g31"]})
ns({x:     0, y:    -6, id:  "s04", cost:    0, desc: "Eternity Challenge 4", pre: ["g41"]})
ns({x:     0, y:    -7, id:  "g42", cost:   50, desc: "You gain a boost to eternitied stat based on antimatter galaxies.", eff: function() {return getEffectiveGalaxies().add(1000).divide(1000)}, pre: ["s04"], sre: function() { return challengeCompleted(4, 2) }})
ns({x:     0, y:    -8, id:  "g51", cost:  100, desc: "Replicated galaxies are 20% stronger.", pre: ["g42"], sre: function() { return challengeCompleted(4, 2) }})
ns({x:     0, y:    -9, id:  "s07", cost:    0, desc: "Eternity Challenge 7", pre: ["g51"]})
ns({x:     2, y:     2, id:  "r11", cost:   10, desc: "Decrease galaxy cost scaling by 10%", pre: ["s00"]})
ns({x:     3, y:     1, id:  "r21", cost:   25, desc: "Distant antimatter galaxy scaling starts 25 later", pre: ["r11"]})
ns({x:     3, y:     2, id:  "r22", cost:    5, desc: "You gain replicanti three times faster", pre: ["r11"]})
ns({x:     4, y:     2, id:  "r31", cost:    5, desc: "Sacrifice is 10% stronger", pre: ["r21"]})
ns({x:     4, y:     3, id:  "r32", cost:   15, desc: "Replicanti galaxies are 50% more effective", pre: ["r22"]})
ns({x:     3, y:     3, id:  "r41", cost:   20, desc: "Replicanti galaxies boost replicanti multiplier.", eff: function() {return game.replicanti.galaxies.add(1/250).multiply(250).max(1)}, pre: ["r32"]})
ns({x:     3, y:     4, id:  "s05", cost:    0, desc: "Eternity Challenge 5", pre: ["r41"]})
ns({x:     3, y:     5, id:  "r51", cost:   90, desc: "You permanently keep 2% of your infinities on eternity", pre: ["s05"], sre: function() { return challengeCompleted(5, 2) }})
ns({x:     4, y:     5, id:  "r52", cost:  110, desc: "Time dimensions are 1e40x as strong.", pre: ["r51"], sre: function() { return challengeCompleted(5, 2) }})
ns({x:     4, y:     6, id:  "s10", cost:    0, desc: "Eternity Challenge 10", pre: ["r52"]})
ns({x:     0, y:     5, id:  "c11", cost:    1, desc: "Dimension boosts are 0.01% more effective for each tick upgrade gained from Time Dimensions", eff: function() {return getFreeTickspeedUpgrades().divide(1000000).add(1).min(2)}, pre: ["s00"],})
ns({x:     2, y:     6, id:  "c13", cost:    5, desc: "Infinity Shifts are 25% cheaper.", pre: ["c11"],})
ns({x:     0, y:     6, id:  "c12", cost:    5, desc: "The formula for replicanti multiplier is better.", pre: ["c11"],})
ns({x:    -2, y:     6, id:  "c21", cost:    5, desc: "Sacrifice provides a greater boost to the ninth dimension.", eff: function() {return getSacrificeMult().add(1).pow(0.25)}, pre: ["c11"],})
ns({x:  -2.5, y:     7, id:  "c31", cost:   10, desc: "You gain additional replicated galaxies based on your maximum.", eff: function() {return getMaxReplGalaxies().add(1).pow(0.125).subtract(1)}, effb: "+", pre: ["c21"],})
ns({x:  -1.5, y:     7, id:  "c32", cost:   10, desc: "Dimension boosts affect Time Dimensions with heavily reduced effect.", eff: function() {return getDimensionBoostEffect().add(1).log(5e7).add(1).pow(0.125)}, pre: ["c21"],})
ns({x:   0.5, y:     7, id:  "c33", cost:   10, desc: "Replicanti grow 5x faster.", pre: ["c12"],})
ns({x:  -0.5, y:     7, id:  "c34", cost:   10, desc: "Dimension boosts affect Time Dimensions with heavily reduced effect.", eff: function() {return getDimensionBoostEffect().add(1).log(5e7).add(1).pow(0.125)}, pre: ["c12"],})
ns({x:   1.5, y:     7, id:  "c35", cost:   10, desc: "Dimension boosts are 15% cheaper.", pre: ["c13"],})
ns({x:   2.5, y:     7, id:  "c36", cost:   10, desc: "You gain 25% more replicated galaxies.", pre: ["c13"],})
ns({x:     0, y:     9, id:  "s13", cost:   15, desc: "You gain 1% of IP on crunch every second.", pre: ["c31", "c32", "c33", "c34", "c35", "c36"]})
ns({x:     0, y:    10, id:  "n11", cost:   20, desc: "You gain 1e308x more IP.", pre: ["s13"], req: function() {return !tree.hasStudy("a11") && !tree.hasStudy("o11")}})
ns({x:     0, y:    11, id:  "n12", cost:   40, desc: "Replicated galaxies are 40% stronger.", pre: ["n11"]})
ns({x:     0, y:    12, id:  "n13", cost:   60, desc: "You gain 1e30x more EP.", pre: ["n12"]})
ns({x:     1, y:    10, id:  "a11", cost:   20, desc: "You gain a decaying IP multiplier based on time in this infinity.", req: function() {return !tree.hasStudy("n11") && !tree.hasStudy("o11")}, eff: function() {return Decimal.pow(10, Decimal.divide("600", getTimeSince("infinity")/10)).max(50)}, pre: ["s13"]})
ns({x:     1, y:    11, id:  "a12", cost:   40, desc: "You can have 50% more replicated galaxies, but you cannot automate getting replicated galaxies.", pre: ["a11"]})
ns({x:     1, y:    12, id:  "a13", cost:   60, desc: "You gain 1e30x more EP.", pre: ["a12"]})
ns({x:    -1, y:    10, id:  "o11", cost:   20, desc: "You gain a increasing IP multiplier based on time in this infinity.", req: function() {return !tree.hasStudy("n11") && !tree.hasStudy("a11")}, eff: function() {return Decimal.pow(10, getTimeSince("infinity")/1e4)}, pre: ["s13"]})
ns({x:    -1, y:    11, id:  "o12", cost:   40, desc: "Replicated galaxies are 40% stronger.", pre: ["o11"]})
ns({x:    -1, y:    12, id:  "o13", cost:   60, desc: "You gain 1e30x more EP.", pre: ["o12"]})
ns({x:     0, y:    13, id:  "d11", cost:  200, desc: "Unlock Time Dilation.", pre: ["n13", "o13", "a13"], sre: function() { return getChallengeCompletions(2) > 4 }})
ns({x:    -1, y:    14, id:  "d12", cost: 5000, desc: "Unlock time dimensions 5 and 6", pre: ["d11"], sre: function() { return getChallengeCompletions(2) > 4},})
ns({x:     0, y:    14, id:  "d21", cost:  1e5, desc: "Unlock time dimensions 7 and 8", pre: ["d12"], sre: function() { return getChallengeCompletions(2) > 4},})
ns({x:     1, y:    14, id:  "d22", cost:  1e7, desc: "Unlock time dimension 9", pre: ["d21"], sre: function() { return getChallengeCompletions(2) > 4},})

// Extreme Studiesr
ns({x:     6, y:    -3, id:  "i51", cost:   1e3, desc: "Infinity power multiplies the power of dimension boosts.", eff: function() {return getEffectiveDimensionBoosts().cbrt()}, pre: ["s08"], sre: function() { return game.dilation.upgrades.includes(5)}})
ns({x:     7, y:    -3, id:  "i52", cost:   5e3, desc: "Infinity shifts raise the gain of tachyon particles.", eff: function() {return game.infinityShifts.add(1).log10().add(1).log10().div(1.8).add(1)}, effb: "^", pre: ["i51"], sre: function() { return game.dilation.upgrades.includes(5)}})
ns({x:    -6, y:    -3, id:  "p51", cost:   1e3, desc: "Dimension boosts multiply dilated time gain.", eff: function() {return game.infinityDimensions[0].amount.log10().root(3).max(1)}, pre: ["s06"], sre: function() { return game.dilation.upgrades.includes(5)}})
ns({x:    -7, y:    -3, id:  "p52", cost:   5e3, desc: "Ninth dimensions multiply tachyon particle gain.", eff: function() {return game.dimensions[8].amount.add(1).log10().add(1).log10().max(1)}, pre: ["p51"], sre: function() { return game.dilation.upgrades.includes(5)}})
ns({x:    -5, y:     6, id:  "t61", cost:   1e3, desc: "Time Dimensions gain a boost based on galaxies.", eff: function() {return game.galaxies.pow(9)}, pre: ["s09"], sre: function() { return game.dilation.upgrades.includes(5)}})
ns({x:     5, y:     6, id:  "r61", cost:   1e3, desc: "Dilated time multiplies itself.", eff: function() {return game.dilation.dilatedTime.add(1).log10().add(1)}, pre: ["s10"], sre: function() { return game.dilation.upgrades.includes(5)}})
ns({x:     0, y:    15, id:  "d31", cost:  1e16, desc: "Unlock ex-dilation.<br>Requirement: Complete ten eternity challenges.", pre: ["d22"], sre: function() { return getChallengeCompletions(2) >= 10}, req: function() {return getChallengeCompletions(2) >= 10}})
ns({x:    -0.5, y:    16, id:  "s11", cost: 1e22, desc: "Eternity Challenge 11", pre: ["d31"], sre: function() { return getChallengeCompletions(2) >= 10}})
ns({x:     0.5, y:    16, id:  "s12", cost: 1e22, desc: "Eternity Challenge 12", pre: ["d31"], sre: function() { return getChallengeCompletions(2) >= 10}})

Study.prototype.getPostStudies = function() {
	var l = []
	tree.studies.forEach(function(study) {
		if(study.pre.includes(this.id)) l.push(study);
	})
	this.post = l;
	return l;
}

Study.prototype.canBuy = function(nocost) {
	if(tree.hasStudy(this.id)) return false;
	if(!nocost && game.timestudy.theorems.lt(this.cost)) return false;
	
	var or = false;
	var and = true;
	
	this.pre.forEach(function(p) {
		if(game.timestudy.studies.includes(p)) or = true; else and = false;
	});
  
  if(tree.getStudy(this.id).req != true) if(tree.getStudy(this.id).req() == false) return false;
  if(tree.getStudy(this.id).sre != true) if(tree.getStudy(this.id).sre() == false) return false;
	
	if(this.and) {
		if(and) return true;
		return false;
	}
	else {
		if(or) return true;
		return false;
	}
}

Study.prototype.canSee = function() {
	//if(tree.hasStudy(this.id)) return true;
  if(tree.getStudy(this.id).sre != true) return tree.getStudy(this.id).sre();
  return true
}

Study.prototype.buy = function() {
	if(!this.canBuy()) return;
	game.timestudy.theorems = game.timestudy.theorems.subtract(this.cost)
	game.timestudy.studies.push(this.id);
  if(this.id == "d11") game.dilation.unlocked = true;
	return true;
}

var canvas = document.getElementById("studyTreeCanvas");
var ctx = canvas.getContext("2d");
addEventListener("resize", resizeCanvas);

function resizeCanvas() {
	canvas.width = innerWidth;
	ge("timeStudies").style.height = canvas.height = innerHeight - 200;
	canvas.style.position = "relative"
	canvas.style.left = 0;
	canvas.style.top = 0;
	drawStudyTree();
}

document.onload = resizeCanvas;

function drawStudyTree() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	
}