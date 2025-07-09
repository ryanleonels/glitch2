let modInfo = {
  name: "Finish a despacit mod simulator",
  id: "1e1e1e1e1e1e1e1e1e1e1e1eFFFFFFFFFGGGGGHHHHIJKLMNOP99999999e99999999e9",
  author: "upvoid",
  pointsName: "points",
  discordName: "",
  discordLink: "",
  initialStartPoints: new Decimal (0), // Used for hard resets and new players
  
  offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
  num: "1.1",
  name: "",
}

let changelog = `<h1>Changelog:</h1><br>
  <h3>v1.0</h3><br>
    - Added everything.`

let winText = `Congratulations! You have finished your first despacit mod!`

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

  let gain = new Decimal(0.01)
  if (hasUpgrade("p",14))gain=gain.plus(0.02)
  if (hasChallenge("p",11))gain=gain.plus(1)
  if (hasUpgrade("p",23))gain=gain.pow(10)
  if (hasUpgrade("p",32))gain=gain.plus(1)
  if (hasUpgrade("a",15))gain=gain.plus(1)
  if (hasUpgrade("a",25))gain=gain.plus(player.a.incrementali.plus(1).log(10))
  if (hasUpgrade("a",32))gain=gain.times(2)
  if (hasUpgrade("a",37))gain=gain.tetrate(1.01)
  if (hasUpgrade("s",11))gain=gain.times(player.a.points.plus(1).log10().plus(1))
  if (inChallenge("p",11))gain=gain.div(2)
  return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
  return player.f.points.gte(1)
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
  return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}