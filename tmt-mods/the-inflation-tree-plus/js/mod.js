let modInfo = {
  name: "The Inflation Tree Plus",
  id: "inflationtreeplus",
  author: "unsoftcapped & despacit",
  pointsName: "inflaters",
  discordName: "",
  discordLink: "",
  changelogLink: "https://github.com/Acamaeda/The-Modding-Tree/blob/master/changelog.md",
  initialStartPoints: new Decimal(1), // Used for hard resets and new players
  
  offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
  num: "1.1",
  name: "Not Endgame",
}

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
  if(!canGenPoints())return new Decimal(0)

  let gain = new Decimal(1)
  if (hasUpgrade("i",11)){gain=gain.times(player.points.plus(2))}
  if (hasUpgrade("i",13)){gain=gain.times(player.i.points.plus(2))}
  
  if (hasUpgrade("hi",11)){gain=gain.times(player.hi.points.plus(2).pow(10))}
  if (hasUpgrade("ui",11)){gain=gain.pow(player.ui.points.plus(2).pow(10))}
  if (hasUpgrade("si",13)){gain=Decimal.pow(10,gain)}
  if (hasUpgrade("hi",13)){gain=Decimal.pow(10,gain)}
  if (hasUpgrade("ui",13)){gain=Decimal.pow(10,gain)}
  if (hasUpgrade("id",11)){gain=Decimal.pow(10,gain)}
  if (hasUpgrade("id",12)){gain=Decimal.pow(10,gain)}
  if (hasUpgrade("i",22)){gain=gain.tetrate(10)}
  if (hasUpgrade("i",23)){gain=gain.tetrate(player.timePlayed)}
  if (hasUpgrade("i",31)){gain=gain.tetrate(player.points.layer)}
  if (player.id.points.gte(1)){gain=gain.iteratedlog(10, layers.id.effect())}
  if (gain.gte("10^^9e15")){gain=new Decimal(10).tetrate(Decimal.times(player.points.layer, hasUpgrade("i",32)?4:2)).min("10^^1e100")}
  if (hasUpgrade("i",33)){gain=new Decimal(10).tetrate(new Decimal(player.points.layer).times(100).min(1e307)).min("10^^1e307")}
  if (hasUpgrade("si",11)){gain=gain.plus(player.si.points.plus(2).log(10).plus(1).log(10))}
  if (hasUpgrade("ui",22))gain=gain.times(player.ui.points.plus(1))
  if (gain.gte("10^^1e100")&&hasMilestone("id",3))gain=new Decimal("10^^1e100")
  if (gain.gte("10^^1e10")&&hasUpgrade("id",21))gain=new Decimal("10^^1e10")
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