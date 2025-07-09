let modInfo = {
  name: "The Tree of Nerfs",
  id: "treeofnerfs35526",
  author: "unsoftcapped",
  pointsName: "points",
  discordName: "",
  discordLink: "",
  changelogLink: "https://github.com/Acamaeda/The-Modding-Tree/blob/master/changelog.md",
  initialStartPoints: new Decimal (0), // Used for hard resets and new players
  
  offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
  num: "1.0",
  name: "Finished",
}

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything","doReset"]

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

  let gain = new Decimal(2)
  let y = player.f.points.plus(2).log(10).plus(1).pow(0.5)
  if (hasUpgrade("t",23))y=y.pow(6969)
  let z=y

  if (hasUpgrade("f",13))y=y.pow(4.2)
  if (hasUpgrade("s",12)) gain=gain.plus(10)
  if (hasUpgrade("s",22)) gain=gain.plus(1e6)
if (hasUpgrade("o",22)) gain=gain.plus(1e308)
  if (hasUpgrade("f",22)) gain=gain.plus("ee4")
  if (hasUpgrade("t",22)) gain=gain.plus("ee1000")
  if (hasUpgrade("c",23)) gain=gain.plus("10^^4")
  if (hasUpgrade("s",13)) gain=gain.times(player.points.plus(1))
  if (layers.f.unlocked) gain=gain.plus(1).pow(z).sub(1)
  let q=player.s.points.plus(1).log(10).plus(1).log(10).plus(1).pow(hasUpgrade("s",14)?2:1).pow(hasUpgrade("s",21)?2:1)
  if (q.gt(4)&&!hasUpgrade("s",24))q=q.pow(0.5).times(2)
  if (gain.gte(1) && !hasUpgrade("o",14)) gain=gain.pow(new Decimal(1).div(player.points.plus(1).log(10).plus(1).div(q.times(hasUpgrade("s",11)?1.5:1))).min(1)).sub(1)
  let something = new Decimal(hasUpgrade("s",23)?0.15:0.1)
  let a=player.o.points.plus(1).log(10).plus(1).log(10).plus(1)
  if (hasUpgrade("o",21))a=a.pow(3)
  something=something.pow(decimalOne.div(a))
  if (gain.gte(10)&&!hasUpgrade("f",23)) gain=gain.pow(something).times(Decimal.pow(10,decimalOne.minus(something)))
  let start = new Decimal(1000)
  if (hasUpgrade("o",14)) start=start.times(10)
  if (hasUpgrade("f",24)) start=start.times(player.f.points.plus(1))
  start=start.times(y)
  if (gain.gte(start)&&!hasUpgrade("t",24)) gain=gain.log(10).times(Decimal.div(start,start.log(10)))
  if (gain.gte(10000)&&!hasUpgrade("o",23)) gain=gain.pow(0.75).times(10)
  if (player.t.unlocked)gain=gain.times(player.t.points.plus(2).pow(0.1))
  let start2=new Decimal(1e9)
  if (hasUpgrade("c",14))start2=start2.times(player.f.points.plus(1)).times(player.t.points.plus(1)).times(player.c.points.plus(1))
  if (hasUpgrade("t",12))start2=start2.times(10)
  if (gain.gte(start2)&&!hasUpgrade("c",24))gain=gain.log(10).times(Decimal.div(start2,start2.log(10)))
  if (hasUpgrade("c",13))gain=gain.pow(10)
  if (hasUpgrade("a",11))gain=gain.pow(player.a.points)
  if (hasUpgrade("a",12))gain=gain.tetrate(2)
  if (hasUpgrade("a",13))gain=gain.tetrate(200)
  if (hasUpgrade("a",14))gain=gain.tetrate(Decimal.pow(player.points.layer,0.5))
  if (hasUpgrade("a",21))gain=new Decimal(10).tetrate(Decimal.times(player.points.layer,1.05))
  if (hasUpgrade("a",22))gain=new Decimal(10).tetrate(Decimal.times(player.points.layer,1.1))
  if (hasUpgrade("a",23))gain=new Decimal(10).tetrate(Decimal.times(player.points.layer,1.5))
  if (hasUpgrade("a",24))gain=new Decimal(10).tetrate(Decimal.times(Decimal.min(player.points.layer,1.797e307),10))
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
  return player.points.layer>1.79e308
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