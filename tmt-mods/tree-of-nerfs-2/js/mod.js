let modInfo = {
  name: "The Tree Of Nerfs 2",
  id: "softcapped^-1",
  author: "downvoid#0557",
  pointsName: "points",
  discordName: "Meta Studio",
  discordLink: "https://discord.gg/2FXxbUZEEN",
  initialStartPoints: new Decimal(0), // Used for hard resets and new players
  
  offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
  num: "1.5.8",
  name: "bars part 3",
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
  if(hasChallenge("a",11))gain=gain.mul(Decimal.pow("1e15151",hasMilestone("ch",4)?694.20:1))
  if(inChallenge("a",11))gain=gain.div("1e15151")
  if(inChallenge("s",12))gain=gain.min("1e1000")
  if(player.ad.unlocked)gain=gain.mul(tmp.ad.effect)
  if(hasUpgrade("a",35))gain=gain.mul(player.p.points.max(1))
  if(hasUpgrade("a",36))gain=gain.mul(Decimal.pow(1e100,getBuyableAmount("ad",11)))
  if(hasUpgrade("di",32))gain=gain.mul(player.l.points.max(1))
  if(hasUpgrade("d",45))gain=gain.mul(player.p.points.max(1).times(player.di.points.add(1)))
  if(hasUpgrade("d",46))gain=gain.mul(player.p.points.max(1).times(player.di.points.add(1)))
  if(gain.gt("e696969000")&&!hasMilestone("ch",0))gain=gain.pow(1/69).times("e686868000")
  if(player.b.unlocked&&gain.gte(1))gain=gain.pow(tmp.b.effect)
  if(inChallenge("b",11))gain=gain.root(Decimal.pow(2,challengeCompletions("b",11)))
  let sp = new Decimal(11)
  if (hasUpgrade("al",15)){
    sp = sp.sub(tmp.an.buyables[11].effect.mul(0.02))
  }
  
  if(gain.gt("ee11"))gain=Decimal.pow(10,gain.log10().pow(Decimal.div(9,sp)).mul(100))
  if (hasUpgrade("bars",14))gain=gain.pow(1.25)
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