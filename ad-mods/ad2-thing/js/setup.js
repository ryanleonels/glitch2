var incase = 0;
var lastTab;
var tierNames = ["0", "First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth", "Tenth"]
var smallCurrency = {
	infinityPoints: "IP",
  planckParticles: "PP",
	eternityPoints: "EP"
}

function ge(e) {
	return document.getElementById(e) || document.createElement("div");
}

function gc(e, f, o=0) {
	l = document.getElementsByClassName(e);
	for(var i = o; i < l.length + o; i++) {
		f(l[i % l.length], i); // pass the element and the position of the element in the array to function for each element
	}
}

function transformToDecimal(object) { // It's so much better than hevi's version, because it's recursive and I'm a lazy piece of shit
	for(i in object) {
		if(i == "raw") return; // for fuck's sake
		if(typeof(object[i]) == "string" && !isNaN(new Decimal("e" + object[i]).mag)) object[i] = new Decimal(object[i]); 
		if(typeof(object[i]) == "object") transformToDecimal(object[i]) // iterates over all objects inside the object
	}
}

saveData = {games: [], currentGame: 0}

function newGame() {
	game = {}
	
	updateSave();
}

function loadGame(n) {
	game = saveData.games[n];
	
	updateSave();
}

function importGame() {
	let input = prompt("Paste your exported game below:")
	if (input === "") return
	try {
		let temp = JSON.parse(atob(input))
		game = temp

		updateSave();
	} catch(err) {
		alert("Whoops something broke! " + err)
	}
}

function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = 0;
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';
  textArea.value = text;
  document.body.appendChild(textArea);
	iosCopyToClipboard(textArea)
  document.body.removeChild(textArea);
}

function iosCopyToClipboard(el) { // https://stackoverflow.com/questions/34045777/copy-to-clipboard-using-javascript-in-ios
    var oldContentEditable = el.contentEditable,
        oldReadOnly = el.readOnly,
        range = document.createRange();

    el.contentEditable = true;
    el.readOnly = false;
    range.selectNodeContents(el);

    var s = window.getSelection();
    s.removeAllRanges();
    s.addRange(range);

    el.setSelectionRange(0, 999999); // A big number, to cover anything that could be inside the element.

    el.contentEditable = oldContentEditable;
    el.readOnly = oldReadOnly;
  
     
    el.select()
    document.execCommand('copy');
}

function exportGame() {
	let savefile = btoa(JSON.stringify(saveData.games[saveData.currentGame]))
	copyTextToClipboard(savefile)
	alert("Copied to clipboard!")
}

function switchNotation() {
  var checkFor = false;
  if(game.options.notation == "Scientific" && checkFor != true) {
    game.options.notation = "Standard"
    checkFor = true
  }
  if(game.options.notation == "Standard" && checkFor != true) {
    game.options.notation = "Mixed Scientific"
    checkFor = true
  }
  if(game.options.notation == "Mixed Scientific" && checkFor != true) {
    game.options.notation = "Logarithmic"
    checkFor = true
  }
  if(game.options.notation == "Logarithmic" && checkFor != true) {
    game.options.notation = "Infinitic"
    checkFor = true
  }
  if(game.options.notation == "Infinitic" && checkFor != true) {
    game.options.notation = "Letter"
    checkFor = true
  }
  if(game.options.notation == "Letter" && checkFor != true) {
    game.options.notation = "Cancer"
    checkFor = true
  }
  if(game.options.notation == "Cancer" && checkFor != true) {
    game.options.notation = "Scientific"
    checkFor = true
  }
  ge('notation').innerHTML = "Notation: " + game.options.notation
}

function switchTheme() {
  var checkFor = false;
  if(game.options.theme == "Normal" && checkFor != true) {
    game.options.theme = "Dark"
    checkFor = true
  }
  if(game.options.theme == "Dark" && checkFor != true) {
    game.options.theme = "Normal"
    checkFor = true
  }
  updateTheme()
}

function updateTheme() {
  let variableForCheck = game.options.theme
      document.getElementById('youdirtystealer').href = 'css/' + variableForCheck.toLowerCase() + '.css';
  ge('theme').innerHTML = "Theme: " + game.options.theme
}
function hardReset() {
	if (confirm("Are you sure about doing a hard reset? THERE IS NO REWARD FOR THIS!")) {
		if (confirm("This is the LAST confirm!")) {
				if (confirm("This is really the LAST confirm! Your save data will be erased! Are you really sure you want to hard reset?")) {
	      		newGame();
    		}
		}
	}
}

function updateSave() {
	transformToDecimal(game);
	
	if(!game.options) game.options = {
		notation: "Scientific",
		mixedCutoff: 1e33,
		fps: 30,
    theme: "Normal"
	}
  
  if(!game.options.theme) game.options.theme = "Normal"
	
	if(!game.achievements) game.achievements = [];
	if(!game.secretAchievements) game.secretAchievements = [];
  ge('notation').innerHTML = "Notation: " + game.options.notation
	if(!game.totalAntimatter) game.totalAntimatter = new Decimal(0);
	if(!game.dimensions) resetDimensions();
	if(!game.shifts) game.shifts = 0;
	if(!game.why) game.why = 0;
	if(!game.boosts) game.boosts = new Decimal(0);
	if(!game.galaxies) game.galaxies = new Decimal(0);
	if(!game.totalBoosts) game.totalBoosts = new Decimal(0);
	if(!game.totalGalaxies) game.totalGalaxies = new Decimal(0);
	if(!game.dimMult) game.dimMult = new Decimal(2);
	if(!game.dimCostMultIncrease) game.dimCostMultIncrease = 10;
	if(!game.tickCostMultDecrease) game.tickCostMultIncrease = 10;
	if(!game.infinities) game.infinities = new Decimal(0);
	if(!game.singularities) game.singularities = new Decimal(0);
	if(!game.infinityPoints) game.infinityPoints = new Decimal(0);
	if(!game.infinityUpgrades) resetInfinityUpgrades();
	if(!game.infinityDimensions) resetInfinityDimensions();
	if(!game.voidDimensions) resetVoidDimensions();
	if(!game.infinityShifts.mag) game.infinityShifts = new Decimal(0);
	if(!game.selectedChallengeType) game.selectedChallengeType = 0;
  if(!game.distort) game.distort = false;
  if(!game.phonons) game.phonons = new Decimal(0);
  if(!game.phononUpgrades) game.phononUpgrades = [];
  if(!game.repeatPho)	game.repeatPho = [
		{cost: new Decimal(10), costMult: new Decimal(10), bought: new Decimal(0)}, 
		{cost: new Decimal(100), costMult: new Decimal(20), bought: new Decimal(0)}, 
		{cost: new Decimal(1e5), costMult: new Decimal(30), bought: new Decimal(0)}, 
		{cost: new Decimal(1e8), costMult: new Decimal(250), bought: new Decimal(0)}
	]
  if(!game.planckParticles) game.planckParticles = new Decimal(0);
	if(!game.repeatSiCo) resetSingCoreUpgrades();
  if(!game.singularityEnergy) game.singularityEnergy = new Decimal(0);
  if(!game.singularityPower) game.singularityPower = new Decimal(0);
  if(!game.singularityUpgrades) game.singularityUpgrades = [];
  if(!game.singularityMilestones) game.singularityMilestones = [];
  if(!game.wormhole) resetWormhole()
	
	if(!game.challenges) {
		game.challenges = []
		game.challengesRunning = []
	}
	for(var i = game.challenges.length; i < 2; i++) {
		game.challenges[i] = []
		for(var j = 0; j < 12; j++) game.challenges[i][j] = {}
	}
	
	if(!game.startTime) game.startTime = Date.now();
	if(!game.buyTime) game.buyTime = Date.now();
	if(!game.resetTime) game.resetTime = Date.now();
	if(!game.shiftTime) game.shiftTime = Date.now();
	if(!game.boostTime) game.boostTime = Date.now();
	if(!game.galaxyTime) game.galaxyTime = Date.now();
	if(!game.infinityTime) game.infinityTime = Date.now();
	if(!game.singularityTime) game.singularityTime = Date.now();
	if(!game.eternityTime) game.eternityTime = Date.now();
	
	if(!game.bestInfinityTime) game.bestInfinityTime = Infinity;
	
	if(!game.automator) game.automator = {
		class: 0,
		extensions: [],
	}
	
	au = game.automator;
	ge("auScript").innerHTML = au.raw;
	
	var c = []
	for(var i = au.extensions.length; i < 14; i++) au.extensions[i] = Extension(0.5**i)
}

if(localStorage.ad2) {
	saveData = JSON.parse(atob(localStorage.ad2));
	
	loadGame(saveData.currentGame);
}

else newGame();

function save() {
	saveData.games[saveData.currentGame] = game;
  
  incase += 1;
  
  if(incase > 99) giveSAchievement(1)
	
	localStorage.ad2 = btoa(JSON.stringify(saveData));
}

function autosave() {
	saveData.games[saveData.currentGame] = game;
	
	localStorage.ad2 = btoa(JSON.stringify(saveData));
}

function getTimeSince(event) {
	return Date.now() - game[event + "Time"];
}

function showTab(name) {
	gc("tab", function(e) {
		e.style.display = "none";
	})
	ge(name + "Tab").style.display = "";
	game.currentTab = name;
}

function showDimensionTab(name) {
	gc("dimensionTab", function(e) {
		e.style.display = "none";
	})
	ge(name + "DimensionTab").style.display = "";
	game.currentDimensionTab = name;
}

function showStatisticsTab(name) {
	gc("statisticsTab", function(e) {
		e.style.display = "none";
	})
	ge(name + "StatisticsTab").style.display = "";
	game.currentStatisticsTab = name;
}

function showAchievementsTab(name) {
	gc("achievementsTab", function(e) {
		e.style.display = "none";
	})
	ge(name + "achievementsTab").style.display = "";
	game.currentAchievementsTab = name;
}

function showAutomationTab(name) {
	gc("automationTab", function(e) {
		e.style.display = "none";
	})
	ge(name + "AutomationTab").style.display = "";
	game.currentAutomationTab = name;
}

function showInfinityTab(name) {
	gc("infinityTab", function(e) {
		e.style.display = "none";
	})
	ge(name + "Tab").style.display = "";
	game.currentInfinityTab = name;
}
function showSingularityTab(name) {
	gc("singularityTab", function(e) {
		e.style.display = "none";
	})
	ge(name + "Tab").style.display = "";
	game.currentSingularityTab = name;
}

function displayIf(e, c) {
	ge(e).style.display = c ? "" : "none";
}

t = "<table><tr>"
for(var i = 0; i < achievements; i++) t += `
<td id = "achievement` + i + `">a</td>
` + (i % 9 == 8 ? "</tr><tr>" : "")
t += "</tr></table>"

ge("achievements").innerHTML = t;

t = "<table><tr>"
for(var i = 0; i < secretAchievements; i++) t += `
<td id = "secretAchievement` + i + `" ` + (i == 0 ? `"onclick = "giveSAchievement(0)"` : ``) + `>a</td>
` + (i % 10 == 9 ? "</tr><tr>" : "")
t += "</tr></table>"

ge("secretAchievements").innerHTML = t;

for(var i = 1; i < 10; i++) ge("dimensions").innerHTML += `
<tr id = "dimDisplay` + i + `" style = "text-align: right">
	<td style = "text-align: left; padding-bottom: 8px; width: 250">` + tierNames[i] + ` Dimension</td>
	<td style = "position: absolute; width: 100"><span id = "dimamount`+i+`"></span></td>
	<td style = "position: absolute; width: 200; left: 400; text-align: left"><span id = "dimgrowth`+i+`"></span></td>
	<td style = "position: absolute; width: 200; left: 600">x<span id = "dimmult`+i+`"></span></td>
	<td style = "position: absolute; right: 20"><button class = "buy" id = "dimbuy`+i+`" onclick = "buyDimension(`+i+`)"></button></td>
</tr>`

ge("dimensions").innerHTML += `
<tr id = "tickspeedDisplay" style = "text-align: right">
	<td style = "text-align: left; padding-bottom: 8px; width: 250">Tickspeed</td>
	<td style = "position: absolute; width: 100"><span id = "tickspeed"></span></td>
	<td style = "position: absolute; width: 200; left: 600"><span id = "galaxyEffect"></span></td>
	<td style = "position: absolute; right: 20"><button class = "buy" id = "buyTickspeed" onclick = "buyTickspeed()"></button></td>
</tr>`

for(var i = 1; i < 10; i++) ge("infinityDimensions").innerHTML += `
<tr id = "infdimDisplay` + i + `" style = "text-align: right">
	<td style = "text-align: left; padding-bottom: 8px; width: 250">` + tierNames[i] + ` Infinity Dimension</td>
	<td style = "position: absolute; width: 100"><span id = "infdimamount`+i+`"></span></td>
	<td style = "position: absolute; width: 200; left: 400; text-align: left"><span id = "infdimgrowth`+i+`"></span></td>
	<td style = "position: absolute; width: 200; left: 600">x<span id = "infdimmult`+i+`"></span></td>
	<td style = "position: absolute; right: 20"><button class = "buy" id = "infdimbuy`+i+`" onclick = "buyInfinityDimension(`+i+`)"></button></td>
</tr>`

for(var i = 1; i < 10; i++) ge("voidDimensions").innerHTML += `
<tr id = "voiddimDisplay` + i + `" style = "text-align: right">
	<td style = "text-align: left; padding-bottom: 8px; width: 250">` + tierNames[i] + ` Void Dimension</td>
	<td style = "position: absolute; width: 100"><span id = "voiddimamount`+i+`"></span></td>
	<td style = "position: absolute; width: 200; left: 400; text-align: left"><span id = "voiddimgrowth`+i+`"></span></td>
	<td style = "position: absolute; width: 200; left: 600">x<span id = "voiddimmult`+i+`"></span></td>
	<td style = "position: absolute; right: 20"><button class = "buy" id = "voiddimbuy`+i+`" onclick = "buyVoidDimension(`+i+`)"></button></td>
</tr>`

h = ""

var pattern = " xx  xx x  xx  xx  xx  x xx  xx "

for(var i = 0, j = 0; j < 32; i++, j++) {
	if(j % 8 == 0) h += "<tr>"
	if(pattern[j] == "x") h += `
		<td>
			<button id = "infinityUpgrade` + i + `" onclick = "buyInfinityUpgrade(` + i + `)">
				<span id = "infinityUpgradeDesc` + i + `"></span><br>
				Cost: <span id = "infinityUpgradeCost` + i + `"></span>
			</button>
		</td>
	`;
	else {
		h += "<td></td>"
		--i;
	}
	if(j % 8 == 7) h += "</tr>"
}

ge("infinityUpgrades").innerHTML = h;

h = ""

for(var i = 17; i < 29; i++) {
	if(i % 3 == 2) h += "<tr>"
	h += `
		<td>
			<button id = "infinityUpgrade` + i + `" onclick = "buyInfinityUpgrade(` + i + `)">
				<span id = "infinityUpgradeDesc` + i + `"></span><br>
				Cost: <span id = "infinityUpgradeCost` + i + `"></span>
			</button>
		</td>
	`
	if(i % 3 == 1) h += "</tr>"
}


ge("postInfinityUpgrades").innerHTML = h + `
<tr>
	<td><button id = "repeatInf0" onclick = "buyRepeatInf(0)"></button></td>
	<td><button id = "repeatInf1" onclick = "buyRepeatInf(1)"></button></td>
	<td><button id = "repeatInf2" onclick = "buyRepeatInf(2)"></button></td>
</tr>
`

w = ""
for(var i = 0; i < 16; i++) {
  if(i % 4 == 4) w += "<tr>"
	w += `
		<td>
			<button id = "phononUpgrade` + i + `" onclick = "BuyPhononUpgrade(` + i + `)">
				<span id = "phononUpgradeDesc` + i + `"></span><br>
				Cost: <span id = "phononUpgradeCost` + i + `"></span>
			</button>
		</td>
	`
  if(i % 4 == 3) w += "</tr>"
}
ge("phononUpgrades").innerHTML = w + `
<tr>
	<td><button id = "repeatPho0" onclick = "buyRepeatPho(0)"></button></td>
	<td><button id = "repeatPho1" onclick = "buyRepeatPho(1)"></button></td>
	<td><button id = "repeatPho2" onclick = "buyRepeatPho(2)"></button></td>
	<td><button id = "repeatPho3" onclick = "buyRepeatPho(3)"></button></td>
</tr>
`;
w = ""
w += "<tr>"
for(var i = 0; i < 4; i++) {
	w += `
		<td>
			<button id = "singularityCoreUpgrade` + i + `" onclick = "buyRepeatSiCo(` + i + `)">
				<span id = "singularityCoreUpgradeDesc` + i + `"></span><br>
				Cost: <span id = "singularityCoreUpgradeCost` + i + `"></span>
			</button>
		</td>
	`
}
w += "</tr>"
ge("singularityCoreUpgrades").innerHTML = w
q = ""
for(var i = 0; i < 16; i++) {
  if(i % 4 == 4) q += "<tr>"
	q += `
		<td>
			<button id = "singularityUpgrade` + i + `" onclick = "BuySingularityUpgrade(` + i + `)">
				<span id = "singularityUpgradeDesc` + i + `"></span><br>
				Cost: <span id = "singularityUpgradeCost` + i + `"></span>
			</button>
		</td>
	`
  if(i % 4 == 3) q += "</tr>"
}
ge("singularityUpgrades").innerHTML = q+ `
<tr>
	<td><button id = "repeatSing0" onclick = "buyRepeatInf(1)"></button></td>
	<td><button id = "repeatSing1" onclick = "buyRepeatPho(0)"></button></td>
</tr>
`;
r = ""
for(var i = 0; i < 4; i++) {
  r += "<tr>"
	r += `
		<td>
			<button id = "singularityMilestone` + i + `" >
        <span id = "singularityMilestoneInfo` + i + `">e</span><br>
				Requirement: <span id = "singularityMilestoneRequirements` + i + `"></span>
			</button>
		</td>
	`
  r += "</tr>"
}
//<span id = "singularityMilestoneInfo` + i + `">e</span><br>
ge("singularityMilestones").innerHTML = r;

/*ge("phononUpgrades").innerHTML = `
<tr>
	<td>
        <button id = "phononUpgrade1" onclick = "BuyPhononUpgrade(1)">
				<span id = "phononUpgradeDesc1"></span>
				Cost: <span id = "phononUpgradeCost1"></span>
        </button>
  </td>
	<td>
        <button id = "phononUpgrade2" onclick = "BuyPhononUpgrade(2)">
				<span id = "phononUpgradeDesc2"></span>
				Cost: <span id = "phononUpgradeCost2"></span>
        </button>
  </td>
	<td>
        <button id = "phononUpgrade3" onclick = "BuyPhononUpgrade(3)">
				<span id = "phononUpgradeDesc3"></span>
				Cost: <span id = "phononUpgradeCost3"></span>
        </button>
  </td>
	<td>
        <button id = "phononUpgrade4" onclick = "BuyPhononUpgrade(4)">
				<span id = "phononUpgradeDesc4"></span>
				Cost: <span id = "phononUpgradeCost4"></span>
        </button>
  </td>
</tr>
<tr>
	<td>
        <button id = "phononUpgrade5" onclick = "BuyPhononUpgrade(5)">
				<span id = "phononUpgradeDesc5"></span>
				Cost: <span id = "phononUpgradeCost5"></span>
        </button>
  </td>
	<td>
        <button id = "phononUpgrade6" onclick = "BuyPhononUpgrade(6)">
				<span id = "phononUpgradeDesc6"></span>
				Cost: <span id = "phononUpgradeCost6"></span>
        </button>
  </td>
	<td>
        <button id = "phononUpgrade7" onclick = "BuyPhononUpgrade(7)">
				<span id = "phononUpgradeDesc7"></span>
				Cost: <span id = "phononUpgradeCost7"></span>
        </button>
  </td>
	<td>
        <button id = "phononUpgrade8" onclick = "BuyPhononUpgrade(8)">
				<span id = "phononUpgradeDesc8"></span>
				Cost: <span id = "phononUpgradeCost8"></span>
        </button>
  </td>
</tr>
<tr>
	<td>
        <button id = "phononUpgrade9" onclick = "BuyPhononUpgrade(9)">
				<span id = "phononUpgradeDesc9"></span>
				Cost: <span id = "phononUpgradeCost9"></span>
        </button>
  </td>
</tr>`
var t = `<tr>`*/

var t = `<tr>`

for(var i = 0; i < 9; i++) t += `
<td class = "autobuyer" id = "dimensionAutobuyer${i}">${tierNames[i+1]} Dimension Autobuyer<br><div class = "autobuyerInfo"></div><div class = "autobuyerInner"></div><button class = "autobuyerButton" id = "buyauto${i}" onclick = "upgradeExtension(${i})"></button></td>${(i+1)%3?"":"</tr><tr>"}
`

ge("automationTable1").innerHTML += t + `
<td class = "autobuyer" id = "tickspeedAutobuyer">Tickspeed Autobuyer<br><div class = "autobuyerInfo"></div><div class = "autobuyerInner"></div><button class = "autobuyerButton" id = "buyauto${9}" onclick = "upgradeExtension(9)"></button></td>
<td class = "autobuyer" id = "boostAutobuyer">Dimension Boost Autobuyer<br><div class = "autobuyerInfo"></div><div class = "autobuyerInner"></div><button class = "autobuyerButton" id = "buyauto${10}" onclick = "upgradeExtension(10)"></button></td>
<td class = "autobuyer" id = "galaxyAutobuyer">Antimatter Galaxy Autobuyer<br><div class = "autobuyerInfo"></div><div class = "autobuyerInner"></div><button class = "autobuyerButton" id = "buyauto${11}" onclick = "upgradeExtension(11)"></button></td></tr>
<td class = "autobuyer" id = "sacrificeAutobuyer">Dimensional Sacrifice Autobuyer<br><div class = "autobuyerInfo"></div><div class = "autobuyerInner"></div><button class = "autobuyerButton" id = "buyauto${12}" onclick = "upgradeExtension(12)"></button></td>
<td class = "autobuyer" id = "infinityAutobuyer">Big Crunch Autobuyer<br><div class = "autobuyerInfo"></div><div class = "autobuyerInner"></div><button class = "autobuyerButton" id = "buyauto${13}" onclick = "upgradeExtension(13)"></button></td>
`

function f() {
	gc("challenge", function(e, i) {
		var angle = Math.PI / 6 * i;
		
		var x = innerWidth / 2 - 40;
		var y = 425;
		var r = 250;
		
		x += r * Math.sin(angle);
		y -= r * Math.cos(angle);
		
		e.style.left = x;
		e.style.top = y;
	})
}

f()

window.onresize = f;

updateTheme()

addEventListener("keydown", function(e) {
	var c = e.keyCode;
	
	if(c == 77) {
    if (!e.shiftKey) maxAll(); 
    else maxAllInfinityDimensions();
  }
	if(c == 71 && canGalaxy()) galaxy()
	if(c == 68 && (canBoost() || canShift())) if (canShift()) {shift()} else {boost()}
	if(c == 66) bigCrunch();
	if(c == 83 && getSacrificeGain() > 1.5) sacrifice();
	if(c == 27) exitChallenge();
	
	if(c > 48 && c < 58) {
		if(!e.shiftKey) maxDimension(c - 48)
		else buyDimension(c - 48)
	}
	if(c == 48) maxTickspeed();
})