let modInfo = {
  name: "Tuba's Tree 2",
  id: "tt2official",
  author: "randomtuba",
  pointsName: "tubas",
  modFiles: ["layers.js", "tree.js", "side-layers.js"],

  discordName: "tuba's new place",
  discordLink: "https://discord.gg/HhcavwM5rm",
  initialStartPoints: new Decimal (10), // Used for hard resets and new players
  offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
  num: "1.0",
  name: `The "This Update Sucks" Update`,
}

let changelog = `<h1>Tuba's Tree 2 Changelog</h1><br><span style="color:red;"><b>WARNING: SPOILERS!</b></span><br><br>
  <h3>v1.0: The "This Update Sucks" Update (8/4/2023)</h3><br>
    <b>Endgame: 1e958,800,000 tubas</b><br>
    - Added Incrementy.<br>
    - Added Super-Prestige.<br>
    - Added quality upgrades for Skills.<br>
    - Added 1 Reincarnation Challenge.<br>
    - Added 2 new Shard Flavors.<br>
    - Added new upgrades and milestones.<br>
    - Added automation for soul orb buyables and quark buyables for Spirits.<br>
    - Added 10 Achievements.<br>
    - Revamped some display stuff.<br><br>
  <h3>v0.5.2 (7/30/2023)</h3><br>
    - Added 2 specialized respec buttons.<br><br>
  <h3>v0.5.1 (7/30/2023)</h3><br>
    - Fixed some display stuff.<br>
    - Fixed a bug where the Shard Flavor select button is shown before Shard Flavors are unlocked.<br>
    - Modified the "Hardcore" requirement to prevent cheesing.<br>
    - Fixed the requirement for "Utterly corrupt".<br><br>
  <h3>v0.5: The "I'm Spiritual Not Religious" Update (7/28/2023)</h3><br>
    <b>Endgame: 1e19,300,000 tubas</b><br>
    - Added Spirits.<br>
    - Added 3 Charges.<br>
    - Added 3 Energies.<br>
    - Added another 2 Reincarnation Challenges.<br>
    - Added new upgrades and milestones.<br>
    - The skill cap is now functional.<br>
    - Added passive quark generation.<br>
    - Added 12 Achievements.<br>
    - Fixed some display stuff.<br>
    - Rebalanced Reincarnation Challenges section in v0.4.<br>
    - Recolored the achievements based on stage of progression.<br><br>
  <h3>v0.4: The Born Again Update (7/11/2023)</h3><br>
    <b>Endgame: 1e1,400,000 tubas</b><br>
    - Added Reincarnation.<br>
    - Added an upgrade tree.<br>
    - Added Energies.<br>
    - Added 2 Reincarnation Challenges.<br>
    - Added new upgrades and milestones.<br>
    - Added a new Shard Flavor.<br>
    - Added a 5th Skill.<br>
    - Added 7 Achievements.<br>
    - Fixed a bug where Skills don't reset on your first Transcension.<br><br>
  <h3>v0.3: The Flavorful Update (7/2/2023)</h3><br>
    <b>Endgame: 1e434,000 tubas</b><br>
    - Added Shard Flavors.<br>
    - Added 2 Challenges.<br>
    - Added new upgrades and milestones.<br>
    - Added the 3rd ascension buyable.<br>
    - Added 6 Achievements.<br>
    - Added passive EXP generation.<br>
    - Fixed some display stuff.<br>
    - Added a link to my Discord server in-game.<br><br>
  <h3>v0.2.1 (6/29/2023)</h3><br>
    - Changed the costs of some Transcension Upgrades.<br>
    - Made the C4x1 and C6x3 goals lower.<br>
    - Fixed some display stuff.<br><br>
  <h3>v0.2: The Challenges Update (6/28/2023)</h3><br>
    <b>Endgame: 1e135,000 tubas</b><br>
    - Added 6 Challenges.<br>
    - Added Shard Generators 4-6.<br>
    - Added Super-Boosters.<br>
    - Added new upgrades, buyables, and milestones.<br>
    - Added 8 Achievements.<br>
    - Fixed some display stuff.<br>
    - Fixed a bug where 2nd row ascension upgrades were unlocked early.<br><br>
  <h3>v0.1: The First Update! (6/25/2023)</h3><br>
    <b>Endgame: 1e12,000 tubas</b><br>
    - Added Prestige.<br>
    - Added Ascension.<br>
    - Added Transcension.<br>
    - Added 26 Achievements.<br>
    - Added 4 Skills.<br>
    - Added Tokens.<br>
    - Added Shards and 3 Shard Generators.<br>
    - Added Boosters.<br>
    - Added some pre-Prestige stuff.`

let winText = `@randomtuba You litte f**ker<br>You made a shit of piece with your trash sequel it's f**King Bad this trash game I will become back my money I hope you will in your next time a cow on a trash farm you sucker`

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

  // tuba gain multipliers
  let gain = buyableEffect("n",11)
  gain = gain.mul(buyableEffect("n",12))
  gain = gain.mul(buyableEffect("n",13))
  if(hasUpgrade("n",11)) gain = gain.mul(5)
  if(hasUpgrade("p",11)) gain = gain.mul(upgradeEffect("p",11))
  if(hasUpgrade("p",12)) gain = gain.mul(3)
  if(hasUpgrade("p",13)) gain = gain.mul(upgradeEffect("p",13))
  if(hasUpgrade("p",21)) gain = gain.mul(1e10)
  if(hasUpgrade("p",22)) gain = gain.mul(upgradeEffect("p",22))
  gain = gain.mul(buyableEffect("p",12))
  if(hasUpgrade("p",23)) gain = gain.mul(upgradeEffect("p",23))
  gain = gain.mul(buyableEffect("a",11))
  gain = gain.mul(shardEffect().pow(shardFlavorEffects(1)))
  gain = gain.mul(buyableEffect("a",12))
  gain = gain.mul(challengeEffect("t",41))
  gain = gain.mul(energyEffects("quark"))
  gain = gain.mul(Decimal.pow(new Decimal("1e500"),challengeCompletions("r",11)**(challengeCompletions("r",11) >= 22 ? 2 : 1.25)))
  if(hasUpgrade("sp",12)) gain = gain.mul("1e200000")

  // tuba gain exponents
  gain = gain.pow(challengeEffect("t",12))
  if(hasUpgrade("r",11)) gain = gain.pow(1.001)
  gain = gain.pow(Decimal.pow(4/5,player.en.charges[1]))

  // challenge nerfs
  if(inChallenge("t",12) || inChallenge("t",52)) gain = gain.div(player.t.divisor)
  if(inChallenge("t",32) || inChallenge("t",52)) gain = gain.pow(0.01)
  if(inChallenge("r",11) || inChallenge("r",31)) gain = new Decimal(0)

  // global speed
  gain = gain.mul(globalSpeed())

  return gain
}

// Multiplier to how fast the game runs that speeds up most things in the game
function globalSpeed() {
  let mult = new Decimal(1)
  mult = mult.mul(buyableEffect("i",33))
  return mult
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
  () => globalSpeed().gt(1) ? `Global speed is ${format(globalSpeed())}x faster!` : "",
  "Current Endgame: 1e958,800,000 tubas",
  () => `${inChallenge("t",12) || inChallenge("t",52) ? `Tuba gain is divided by ${format(player.t.divisor)}` : ``}`,
]

// Determines when the game "ends"
function isEndgame() {
  return player.points.gte(new Decimal("1e958800000"))
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