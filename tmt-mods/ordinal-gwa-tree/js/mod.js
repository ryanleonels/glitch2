let modInfo = {
  name: "The Ordinal gwa Tree",
  id: "ordinalpingles2",
  author: "downvoid",
  pointsName: "",
  modFiles: ["layers/gwarkup.js", "tree.js", "helper.js", "formatOrd.js", "layers/booster.js", "layers/collapse.js", "layers/hierarchies.js", "layers/realms.js"],

  discordName: "gwacord",
  discordLink: "https://discord.gg/gwa",
  initialStartPoints: new Decimal(0), // Used for hard resets and new players
  offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
  num: "0.7.4",
  name: "gwa mode",
}

let changelog = `Welcome to ordinal gwarkup, a mod of Ordinal Pringles! :gwa:`

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
function getBase(){
  if (inAnyChallenge("r")){
    return new Decimal(layers.r.challenges[player.r.activeChallenge].base())
  }
  let base = player.g.base
  if (inChallenge("c",11))return new Decimal(hasUpgrade("c",33)?7:hasUpgrade("d",24)?9:10)
  if (hasUpgrade("b",33))base=base.sub(2)
  if (hasUpgrade("h",123))base=base.sub(1)
  if (inChallenge("b",31)) return base
  if (player.b.activeChallenge) base=new Decimal(5)
  if (inChallenge("b",11))base=new Decimal(10-player.b.challenges[22])
  if (inChallenge("b",22))base=new Decimal(4)
  if (inChallenge("b",42))base=new Decimal(8)
  return base
}
function getPointGen() {
  if(!canGenPoints())
    return new Decimal(0)
  let base = getBase()
ordinal=numToOrdinal(player.points, base)+" ("+base+")"
  let gain = new Decimal(0)
  if (inChallenge("r", 11)){
    gain = getBuyableAmount("d",11)
  if (hasUpgrade("d",11))gain=gain.mul(upgradeEffect("d",11))
  if (hasUpgrade("d",12))gain=gain.mul(upgradeEffect("d",12))
    if (hasUpgrade("d",13))gain=gain.mul(upgradeEffect("d",13))
    if (hasUpgrade("d",14))gain=gain.mul(upgradeEffect("d",14))
    if (hasUpgrade("d",15))gain=gain.mul(upgradeEffect("d",15))
    if (hasUpgrade("d",21))gain=gain.mul(upgradeEffect("d",21))
    if (hasUpgrade("d",23))gain=gain.mul(upgradeEffect("d",23))
    gain = gain.mul(buyableEffect("gwa",21))
    gain = gain.pow(layers.r.challenges[12].effect())
    return gain
  }
  if (inChallenge("r", 12)){
    gain = getBuyableAmount("gwa", 11)
    gain = gain.mul(buyableEffect("gwa",21))
    return gain
  }
  if (base.gte(3)){
    gain=getBuyableAmount("g",12)
  if (hasUpgrade("g",11))gain=gain.mul(upgradeEffect("g",11))
  if (hasUpgrade("g",12))gain=gain.mul(upgradeEffect("g",12))
    if (hasUpgrade("g",13))gain=gain.mul(upgradeEffect("g",13))
    if (hasUpgrade("g",14))gain=gain.mul(upgradeEffect("g",14))
    if (!inChallenge("b",22)){
    if (hasUpgrade("g",15))gain=gain.mul(upgradeEffect("g",15))
    if(hasUpgrade("g",16))gain=gain.mul(upgradeEffect("g",16))
    if(hasUpgrade("g",17))gain=gain.mul(upgradeEffect("g",17))
    gain=gain.mul(player.g.dynamic.pow(inChallenge("b",21)?-1:1))
    if (hasUpgrade("g",22))gain=gain.mul(Decimal.pow(hasUpgrade("h",122)?Decimal.mul(player.g.base,4):4,hasUpgrade("h",102)?44:1))
      
    if (hasUpgrade("g",23))gain=gain.mul(hasUpgrade("h",122)?Decimal.mul(player.g.base,96):96)
        if (inChallenge("b",42))gain=gain.div(888**3)
    }
    if (hasUpgrade("b",23))gain=gain.mul(layers.b.getBoosters())
    gain=gain.mul(player.points.max(1).pow(player.b.challenges[31]/10))
    gain=gain.mul(Decimal.pow(2,getTotalCompletions()*player.b.challenges[42]))
    if (hasUpgrade("b",51))gain=gain.mul(upgradeEffect("b",51))
        if (hasUpgrade("b",73))gain=gain.mul(upgradeEffect("b",73))
    if (hasMilestone("g",5))gain=gain.mul(1e100)
    gain=gain.mul(alephEffect(1))
    //nerfs
    if (inChallenge("b",32))gain=gain.sqrt()
    if (inChallenge("b",41))gain=gain.div(player.g.decrementy.max(1))
  }
  return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
  
  maxLength: 5
}}
let ordinal= ``
function numToOrdinal(num, base, iter=0){
  if (iter>=player.maxLength)return "..."
  num = num.floor().max(0)
  if (num.eq(0)&&iter==0)return 0
  let str = ""
  if (num.lt(base)){
    return num.toString()
  } else {
    let exponent = num.log(base).add(1e-14).floor()
    let s = numToOrdinal(exponent, base, 0)
    str+=(iter>0?"+":"")+(options.gwaOrdinal||inChallenge("r",12)?"<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>":"ω")+(exponent.gt(1)?"<sup>"+s+"</sup>":"")
    if (str.includes("..."))return str
    let coef = num.div(base.pow(exponent).round()).add(1e-14).floor()
    if (coef.gt(1))str+=coef
    let rem = num.sub(base.pow(exponent).round().mul(coef)).round()
    if (rem.lt(base)){if (rem.gt(0))str+="+"+(iter>=player.maxLength-1?"...":rem)} else if (exponent.log(base).add(1e-14).floor().lt(player.maxLength)) {
    str+=numToOrdinal(rem, base, iter+1)} else str+="+..."
    return str
  }
}
function changeMaxOrdinalLength(){
  let l = prompt("Input max ordinal length:")
  if (l.length==0)return
  l=Number(l)
  if (isNaN(l)){
    return
  }
  if (l>10)l=10
  if (l<1)l=1
  player.maxLength=l
}
// Display extra things at the top of the page
var displayThings = [function(){
  if (inChallenge("b",41))return "You have "+format(player.g.decrementy)+" decrementy, which divides autoclicker speed by its amount"
}
]

// Determines when the game "ends"
function isEndgame() {
  return false
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
  //if (oldVersion == "0.7" && player.c.singularityLevel.gt(15)) {setBuyableAmount("c",31, new Decimal(0)); setBuyableAmount("c",32, new Decimal(0))}
  player.c.points=player.c.points.round()
  if (player.ordinal !== undefined) delete player.ordinal
  if (oldVersion == "0.3.4" && player.b.boosts.gte(90)){
    player.b.boosts=new Decimal(90)
    player.b.incrementy=new Decimal(1e100)
    player.b.psi=new Decimal(1e48)
    
  }
}