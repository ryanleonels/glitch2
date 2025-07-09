let modInfo = {
  name: "The Tree Of Nerfs 2: Extreme Mode",
  id: "softcapped^-1extreme",
  author: "upvoid",
  pointsName: "points",
  discordName: "upvoid's TMT mods",
  discordLink: "https://discord.gg/W33bNPpnXJ",
  initialStartPoints: new Decimal(0), // Used for hard resets and new players
  
  offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
  num: "0.H",
  name: "Furnace part 1",
}

let changelog = `<h1>Changelog:</h1><br>
  <h3>changes</h3><br>
    - added some things`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything","resetDerivatives","convertNumberToID"]

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
  if(player.s.unlocked)gain=gain.plus(layers.s.effect())
  if(hasUpgrade("s",24)){gain=gain.mul(layers.p.effect())}else{gain=gain.div(layers.p.effect())}
  let ttttemp = gain
  if(!hasUpgrade("s",25)){
  if(hasUpgrade("p",11))gain=gain.sqrt()
  if(hasUpgrade("p",23))gain=gain.sqrt()
  }else if(player.ac.c4c.length<3){
    if(hasUpgrade("p",11))gain=gain.root(new Decimal(2).pow(hasChallenge("ac",11)?0.1:0.25))
    if(hasUpgrade("p",23))gain=gain.root(new Decimal(2).pow(hasChallenge("ac",11)?0.1:0.25))
  }
  if(isNaN(gain))gain=ttttemp
  if(hasUpgrade("p",13)&&!hasUpgrade("p",22))gain=gain.div(player.points.plus(1).max(1).div(hasUpgrade("p",21)?500:100).pow(hasUpgrade("p",21)?2:1))
  if(hasUpgrade("p",24))gain=gain.mul(Decimal.pow(2,player.p.upgrades.length))
  if(hasUpgrade("s",23))gain=gain.times(2)
  if(hasUpgrade("l",12))gain=gain.times(player.p.points.plus(1)).times(player.l.points.plus(1)).times(player.s.points.plus(1))

  if(!hasUpgrade("di",22))gain=nerf(gain,new Decimal(Number.MAX_VALUE).times(hasUpgrade("l",44)?player.s.points.plus(1):1).pow(hasUpgrade("a",22)?1.5:1),(hasUpgrade("di",21)?0.95:0.9),(hasUpgrade("l",43)?(hasUpgrade("l",45)?new Decimal(0.8).div(tmp.l.effect.pow(new Decimal(0.1).times(player.a.unlocked?layers.a.effect():1))):0.8):1),(getClickableState("l",12)==1?(new Decimal(1).div(tmp.l.clickables[12].effect)):1))
  
  if(inChallenge("s",21)){
    gain=nerf(gain,Number.MAX_VALUE,0.9,1)
    gain=nerf(gain,Number.MAX_VALUE,0.9,1)
  }
  if(hasChallenge("a",11))gain=gain.mul(Decimal.pow("1e5800",hasMilestone("ch",4)?694.20:1))
  if(inChallenge("a",11))gain=gain.div("1e5800")
  
  if(player.ad.unlocked)gain=gain.mul(tmp.ad.effect)
  if(hasUpgrade("a",35))gain=gain.mul(player.p.points.max(1))
  if(hasUpgrade("a",36))gain=gain.mul(Decimal.pow(1e100,getBuyableAmount("ad",11)))
  if(hasUpgrade("di",32))gain=gain.mul(player.l.points.max(1))
  if(hasUpgrade("d",45))gain=gain.mul(player.p.points.max(1).times(player.di.points.add(1)))
  if(hasUpgrade("d",46))gain=gain.mul(player.p.points.max(1).times(player.di.points.add(1)))
  if(gain.gt("e696969000")&&!hasMilestone("ch",0))gain=gain.pow(1/69).times("e686868000")
  if(player.b.unlocked&&gain.gte(1))gain=gain.pow(tmp.b.effect)
  if(inChallenge("b",11))gain=gain.root(Decimal.pow(2,challengeCompletions("b",11)))
  if(gain.gt("ee11"))gain=Decimal.pow(10,gain.log10().pow(9/11).mul(100))
  gain=nerfPoints(gain)
  if(inChallenge("s",12))gain=gain.min(inChallenge("bo",11)?"1e690":"1e1000")
  return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
  pointNerf: new Decimal(1),
  antimatter: false,
  challengeVar: 0,
}}

// Display extra things at the top of the page
var displayThings = [
  function(){
    if(getPointGen().lt(Number.MAX_VALUE)||hasUpgrade("di",22))return ""
    return "Points are being nerfed ^"+format(player.pointNerf,5)+(inChallenge("s",21)?"^3":"")
  },
  "Endgame: Make the clickable say \"Do nothing\"",
  function(){
    if(inChallenge("cc",11))return "Your Challenged Nerf time is "+format(player.cc.c1time)+" seconds"
  }
]

// Determines when the game "ends"
function isEndgame() {
  return false
}



// Less important things beyond this point!
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