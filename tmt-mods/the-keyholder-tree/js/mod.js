//CHECK YOUR COMMAS 
let modInfo = {
  name: "The Keyholder Tree",
  id: "keyholderpog",
  author: "micro",
  pointsName: "keys",
  discordName: "",
  discordLink: "",
  changelogLink: "",
  initialStartPoints: new Decimal(1), // Used for hard resets and new players

  offlineLimit: 1 // In hours
};

// Set your version in num and name
let VERSION = {
  num: "0.0",
  name: ""
}
let changelog = `<h1>Changelog:</h1><br>
  <h3>v0.0</h3><br>
    - the tree exists now<br>
    - added stuff<br>`

let winText = `youre done pog now here is a reward: 69`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"];

function getStartPoints() {
  return new Decimal(modInfo.initialStartPoints);
}

// Determines if it should show points/sec
function canGenPoints() {
  return true;
}
// Calculate points/sec!
function getPointGen() {
  if (!canGenPoints()) return new Decimal(0)
  let gain = new Decimal(1)
  if(hasUpgrade("m", 11)) gain = gain.mul(1.420).mul(1.69)
  if(hasUpgrade("m", 22)) gain = gain.mul(upgradeEffect("m", 14))
  if(getBuyableAmount("m", 11).gte(1)) gain = gain.mul(buyableEffect("m", 11))
  if(hasUpgrade("m", 24)) gain = gain.pow(1.69420)
  
  let base = new Decimal(0.42069)
  if(hasUpgrade("m", 12)) base = base.mul(0.69)
  if(hasUpgrade("m", 23)) base = base.mul(upgradeEffect("m", 14).pow(-0.420))
  
  let scale = player.points
  if(hasUpgrade("m", 13)) scale = scale.pow(0.420)
  if(hasUpgrade("m", 32)) scale = scale.pow(0.69)
  
  let start = new Decimal(1.5)
  if(hasUpgrade("m", 14)) start = start.mul(upgradeEffect("m", 14))
  
  let nerf = scale.lte(start.add(1)) ? new Decimal(1) : scale.sub(start).tetrate(base)
  if(hasUpgrade("m", 34)) nerf = nerf.sqr()
  if(hasUpgrade("m", 44)) nerf = nerf.tetrate(2)
  gain = gain.div(nerf)
  if(hasUpgrade("m", 31)) gain = gain.pow(1.42069)
  return gain;
}
// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() {//just hit 9 mkeys actually
  return {};
}

// Display extra things at the top of the page
var displayThings = [
  "Endgame: Enter the Enter the Enter the Enter the Enter the Enter the Enter the Enter the Enter the Enter the...",
  "Known Bugs: Hotkeys do not work"
];
function isEndgame() {return false}

// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
  return 0.05; // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion) {}//you all work quick
