let modInfo = {
  name: "The Gwarnament Tree",
  id: "gwagwagwagwagwa2",
  author: "gwarnament#0557",
  pointsName: "points",
  modFiles: ["layers.js", "tree.js"],

  discordName: "",
  discordLink: "",
  initialStartPoints: new Decimal (10), // Used for hard resets and new players
  offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
  num: "1",
  name: "The End",
}

let changelog = `<h1>Changelog:</h1><br>
<h3>v1</h3><br>
    - The Last Update<br>
  <h3>v0.11</h3><br>
    - More Gwarnaments and More Trolling<br>
  <h3>v0.1</h3><br>
    - Gwarnaments and Trolling.
    `

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
  return true
}

// Calculate points/sec!
function getPointGen() {
  if(!canGenPoints())
    return new Decimal(0)

  let gain = new Decimal(1)
  if(hasUpgrade("m",13))gain=gain.add(player.t.points.add(player.m.points).log(1.01))
  gain=gain.mul(player.points.add(1).pow(tmp.g.effect))
  if(hasUpgrade("g",11))gain=gain.mul(player.g.best.pow(hasUpgrade("g",43)?10:1))
  if(hasUpgrade("g",13))gain=gain.mul(player.points.add(1).log10().add(1).pow(hasUpgrade("g",14)?tmp.g.effect.add(1):1))
  if(hasUpgrade("t",12))gain=gain.mul(player.g.upgrades.length**(player.t.challenges[11]>=2?2:1))
  if(hasUpgrade("g",21))gain=gain.mul(player.g.points.add(1))
  if(hasUpgrade("g",32))gain=gain.mul(player.points.add(1).log10().add(1))
  if(hasUpgrade("m",14))gain=gain.mul(player.t.points.add(1).log(2).add(1))
  if(hasUpgrade("g",34))gain=gain.mul(Decimal.pow(2+player.g.clickables[12],player.g.clickables[11]))
  if(hasUpgrade("g",41))gain=gain.div(tmp.g.effect)
  if(hasUpgrade("t",21))gain=gain.mul(222)
  if(hasUpgrade("t",22))gain=gain.mul(61**2)
  if(inChallenge("t",11))gain=gain.max(1).log10().pow(player.g.points)
  return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
  bestPoints: new Decimal(0)
}}

// Display extra things at the top of the page
var displayThings = [
  function(){return "Your best points is "+format(player.bestPoints)}
]

// Determines when the game "ends"
function isEndgame() {
  return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
  return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}