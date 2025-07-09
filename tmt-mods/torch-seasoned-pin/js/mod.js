let modInfo = {
  name: "The Inflation Tree",
  id: "superinflation",
  author: "upvoid",
  pointsName: "points",
  discordName: "",
  discordLink: "",
  initialStartPoints: new ExpantaNum (10), // Used for hard resets and new players
  
  offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
  num: "1.0",
  name: "",
}

let changelog = `<h1>Changelog:</h1><br>
  <h3>v0.0</h3><br>
    - Added things.<br>
    - Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new ExpantaNum(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
  return true
}

// Calculate points/sec!
function getPointGen() {
  if(!canGenPoints())return new Decimal(0)

  let gain = new Decimal(1)
  if (hasUpgrade("i",11)){gain=gain.times(player.points)}
  if (hasUpgrade("i",13)){gain=gain.times(player.i.points)}
  if (hasUpgrade("i",22)){gain=gain.tetrate(10)}
  if (hasUpgrade("i",23)){gain=gain.tetrate(player.timePlayed)}
  if (hasUpgrade("i",31)){gain=gain.tetrate(player.points.slog())}
  if (gain.gte("10^^9e15")){gain=new Decimal(10).tetrate(Decimal.times(player.points.slog(), hasUpgrade("i",32)?4:2))}
  if (hasUpgrade("i",33)){gain=new Decimal(10).tetrate(new Decimal(player.points.slog()).times(100))}
  if (hasUpgrade("i",41)){gain=new Decimal(10).tetrate(player.points)}
  
  return gain.max(1)
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
  return false
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