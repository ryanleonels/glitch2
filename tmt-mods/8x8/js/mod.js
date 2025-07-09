let modInfo = {
  name: "The 8x8 Tree",
  id: "aaaaaaaaaaaaaaa8x8aaaaaasdfgfgfh",
  author: "upvoid",
  pointsName: "points",
  discordName: "",
  discordLink: "",
  initialStartPoints: new Decimal (0), // Used for hard resets and new players
  
  offlineLimit: 8,  // In hours
}

// Set your version in num and name
let VERSION = {
  num: "0.0.95",
  name: "The 8/8 update part 2",
}

let changelog = `<h1>Changelog:</h1><br>
  - did stuff`

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
  gain=gain.add(tmp.l11.effect)
  if(hasUpgrade("l11",11))gain=gain.add(0.5)
  if(hasUpgrade("l12",11))gain=gain.mul(player.l12.points.plus(1).sqrt())
  if(player.l13.unlocked)gain=gain.add(tmp.l13.effect)
  if(hasUpgrade("l15",11))gain=gain.mul(3)
  if(hasUpgrade("l15",12))gain=gain.mul(upgradeEffect("l15",12))
  if(player.l22.unlocked)gain=gain.mul(tmp.l22.effect)
  if(player.l23.unlocked)gain=gain.mul(tmp.l23.effect)
  if(hasUpgrade("l24",11))gain=gain.mul(player.l24.points.add(1).mul(player.l14.points.add(1)).pow(0.1))
  if(player.l25.unlocked)gain=gain.pow(tmp.l25.effect.pow(hasChallenge("l28",12)?0:-1/3).mul(buyableEffect("l25",11)))
  if(hasUpgrade("l28",12))gain=gain.mul(3.33e33)
  gain=n(gain)
  if(hasUpgrade("l23",14)){
  if(gain.lt("e700"))gain=gain.pow(1.5)
  else gain=gain.pow(1.05)
  }
  return gain
}
function c(gain){
  let a="l28"
  if(inChallenge(a,11))gain=gain.sqrt()
  if(inChallenge(a,12))gain=gain.pow(hasMilestone("l31",1)?1.14:1.08)
  return gain
}
function n(gain){
  gain=c(gain)
  gain=gain.div(player.hyperinflation)
  if(gain.gte("e1000")&&!hasUpgrade("l13",13))gain=gain.root(10).mul("e900")
  
  return gain
}
// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
  hyperinflation: new Decimal(1)
}}

// Display extra things at the top of the page
var displayThings = [function(){if(player.points.gte(hasUpgrade("l18",12)?1e110:1e100))return "Due to hyperinflation, your point gain is divided by "+format(hyperinflation())
                               else{hyperinflation()}
                               }
                     ,
                     function(){if(getPointGen().gte("e1000")&&!hasUpgrade("l13",13))return"Due to extreme inflation, your point gain is being rooted by 10"}
]
function hyperinflation(){
  if(player.points.lt(hasUpgrade("l18",12)?1e110:1e100))player.hyperinflation= new Decimal(1)
  else player.hyperinflation=player.points.div(hasUpgrade("l18",12)?1e110:1e100).root(3).mul(player.points.gte(Number.MAX_VALUE)?player.points.div(Number.MAX_VALUE).sqrt():1).mul(player.points.gte("e500")?player.points.div("e500").root(6.5):1)
  return player.hyperinflation
  
}
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