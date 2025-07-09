addLayer("g", {
  name: "achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "★", // This appears on the layer's node. Default is the id with the first letter capitalized
  color: "#F5754E",
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() { return {
      unlocked: true,
  points: new Decimal(0),
  }},
  tooltip:"Achievements",
  resource: "achievements", // Name of prestige currency
  type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  row: "side", // Row the layer is in on the tree (0 is the first row)
tabFormat: [
  ["display-text", () => `You have ${player.g.achievements.length}/70 achievements (${format(new Decimal(player.g.achievements.length).div(70).mul(100))}%)<br><br>`],
  "achievements"
],
  layerShown(){return true},
achievements: {
  11: {
    name: "Number go brr",
    done(){return getBuyableAmount("n",11).gte(1)},
    tooltip:"Buy the Generator.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#009000"; return style}
  },
  12: {
    name: "I Am Speed",
    done(){return getBuyableAmount("n",12).gte(1)},
    tooltip:"Buy the Time Accelerator.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#009000"; return style}
  },
  13: {
    name: "We've been duped!",
    done(){return getBuyableAmount("n",13).gte(1)},
    tooltip:"Buy the Duplicator.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#009000"; return style}
  },
  14: {
    name: "Nice",
    done(){return player.points.gte(6969)},
    tooltip:"Reach 6,969 tubas.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#009000"; return style}
  },
  15: {
    name: "Prestigious",
    done(){return player.p.points.gte(1)},
    tooltip:"Prestige.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#009000"; return style}
  },
  16: {
    name: "Super Sonic Racing",
    done(){return getBuyableAmount("n",12).gte(15)},
    tooltip:"<span style='font-size:11px'><b>Reach a time speed of at least 25x. Reward: Gain 2x more prestige points.</b></span>",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#009000"; return style}
  },
  21: {
    name: "Vacillation",
    done(){return player.points.gte(1e12) && getBuyableAmount("n",12).eq(0)},
    tooltip:"Reach 1e12 tubas without Time Accelerators. Reward: Gain 5 free Time Accelerators.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#009000"; return style}
  },
  22: {
    name: "Ooh, buyable!",
    done(){return getBuyableAmount("p",11).gte(1)},
    tooltip:"Buy the Prestige Point Doubler.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#009000"; return style}
  },
  23: {
    name: "No Cloning Theorem",
    done(){return player.points.gte(1e15) && getBuyableAmount("n",13).eq(0)},
    tooltip:"Reach 1e15 tubas without Duplicators. Reward: Duplicator per purchase multiplier is 3x.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#009000"; return style}
  },
  24: {
    name: "It's Boostin' Time",
    done(){return getBuyableAmount("n",21).gte(5)},
    tooltip:"Buy 5 Accelerator Boosts.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#009000"; return style}
  },
  25: {
    name: "Nice^10",
    done(){return player.points.gte(2.702e38)},
    tooltip:"Reach 2.70e38 tubas.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#009000"; return style}
  },
  26: {
    name: "When this baby hits 80 mph",
    done(){return player.sk.temporalSkill.gte(15)},
    tooltip:"Reach Level 15 Temporal Skill. Reward: Gain 3x more EXP from all sources, and double Temporal Skill effectiveness.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#009000"; return style}
  },
  31: {
    name: "Beyond",
    done(){return player.a.points.gte(1)},
    tooltip:"Ascend.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#009000"; return style}
  },
  32: {
    name: "Passive Generation",
    done(){return hasMilestone("a",2)},
    tooltip:"Begin to passively generate prestige points.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#009000"; return style}
  },
  33: {
    name: "Prestigeless",
    done(){return player.p.points.gte(1e100) && getBuyableAmount("p",11).eq(0)},
    tooltip:"Reach 1e100 prestige points without Prestige Point Doublers. Reward: Gain 5x more ascension points.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#009000"; return style}
  },
  34: {
    name: "Super-Prestigious",
    done(){return player.p.upgrades.length >= 8},
    tooltip:"Buy 8 Prestige Upgrades. Reward: Gain 70x more prestige points.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#009000"; return style}
  },
  35: {
    name: "Infinity?",
    done(){return player.points.gte(1.79e308)},
    tooltip:"Reach 1.79e308 tubas.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#009000"; return style}
  },
  36: {
    name: "Hardcore",
    done(){return player.p.points.gte(1e160) && getBuyableAmount("n",12).eq(0) && getBuyableAmount("n",13).eq(0) && getBuyableAmount("n",21).eq(0) && getBuyableAmount("p",11).eq(0) && getBuyableAmount("p",12).eq(0) && player.p.prestiges.eq(0)},
    tooltip:"Reach 1e160 prestige points without ever having Time Accelerators, Duplicators, Accelerator Boosts, and Prestige Buyables. Reward: Unlock 2 new Tuba Upgrades.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#009000"; return style}
  },
  41: {
    name: "Advanced Training",
    done(){return hasMilestone("to",3)},
    tooltip:"Unlock the 3rd Skill.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#009000"; return style}
  },
  42: {
    name: "Tuba Galaxy",
    done(){return player.points.gte("1e900")},
    tooltip:"Reach 1e900 tubas.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#009000"; return style}
  },
  43: {
    name: "Far Beyond",
    done(){return player.t.points.gte(1)},
    tooltip:"Transcend.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#DDCC00"; return style}
  },
  44: {
    name: "TRANSCENDED",
    done(){return hasMilestone("t",5)},
    tooltip:"Obtain 6 Transcension Milestones.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#DDCC00"; return style}
  },
  45: {
    name: "Shard Bonanza",
    done(){return player.sh.points.gte(1e6)},
    tooltip:"Reach 1,000,000 shards. Reward: Gain 2x more transcension points and shards.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#DDCC00"; return style}
  },
  46: {
    name: "True Divinity",
    done(){return player.a.points.gte(1e300)},
    tooltip:"Reach 1e300 ascension points.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#DDCC00"; return style}
  },
  51: {
    name: "Boosterless",
    done(){return player.a.points.gte("1e330") && player.b.points.eq(0)},
    tooltip:"Reach 1e330 ascension points with 0 boosters. Reward: Boosters no longer reset on Transcension.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#DDCC00"; return style}
  },
  52: {
    name: "Tuba Singularity",
    done(){return player.points.gte("1e10000")},
    tooltip:"Reach 1e10,000 tubas.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#DDCC00"; return style}
  },
  53: {
    name: "The Next Era",
    done(){return hasMilestone("to",7)},
    tooltip:"Unlock Challenges.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#DDCC00"; return style}
  },
  54: {
    name: "Not-so-challenging",
    done(){return player.points.gte("1e24500") && (inChallenge("t",11) || inChallenge("t",12) || inChallenge("t",21) || inChallenge("t",22))},
    tooltip:"Reach 1e24,500 tubas in one of the first 4 Challenges. Reward: Ascension points boost their own gain.<br><span style='font-size:10px'>(Formula: (AP^0.05)+1, hardcaps at 1e2,250x)</span>",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#DDCC00"; return style}
  },
  55: {
    name: "One of each generator",
    done(){return getBuyableAmount("sh",23).gte(1)},
    tooltip:"Buy Shard Generator 6. Reward: The first 3 Shard Generators are 1,000x stronger.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#DDCC00"; return style}
  },
  56: {
    name: "No, there's no HB",
    done(){return player.sb.points.gte(1)},
    tooltip:"Get a Super-Booster.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#DDCC00"; return style}
  },
  61: {
    name: "Welcome to the Infinite",
    done(){return player.t.points.gte(1.79e308)},
    tooltip:"Reach 1.79e308 transcension points. Reward: Generate 20% of EXP gained on Transcension every second.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#DDCC00"; return style}
  },
  62: {
    name: "Inflation 101",
    done(){return challengeCompletions("t",22) >= 3},
    tooltip:"Unlock the 3rd prestige buyable.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#DDCC00"; return style}
  },
  63: {
    name: "Extreme Gains",
    done(){return player.points.gte("1e100000")},
    tooltip:"Reach 1e100,000 tubas.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#DDCC00"; return style}
  },
  64: {
    name: "Average AD hater",
    done(){return player.a.points.gte("1e7350") && inChallenge("t",21)},
    tooltip:"Reach 1e7350 ascension points in Challenge 3. Reward: The shard effect softcap is slightly weaker.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#DDCC00"; return style}
  },
  65: {
    name: "No Golden Quarks required",
    done(){return player.sh.flavors.blueberry.gte(1000)},
    tooltip:"Reach 1,000 blueberry shards. Reward: Gain all shard flavors 2x faster.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#DDCC00"; return style}
  },
  66: {
    name: "The Almighty",
    done(){return player.t.points.gte("1e1000")},
    tooltip:"Reach 1e1000 transcension points.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#DDCC00"; return style}
  },
  71: {
    name: "Tuba Universe",
    done(){return player.points.gte("1e200000")},
    tooltip:"Reach 1e200,000 tubas.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#DDCC00"; return style}
  },
  72: {
    name: "Yet another new buyable",
    done(){return hasMilestone("to",14)},
    tooltip:"Unlock the 3rd ascension buyable.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#DDCC00"; return style}
  },
  73: {
    name: "Engineer Gaming",
    done(){return hasUpgrade("p",35)},
    tooltip:"Have 40 upgrades bought in total. Reward: Multiply EXP gain based on number of Tuba, Prestige, Ascension, and Transcension upgrades bought.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#DDCC00"; return style}
  },
  74: {
    name: "Anti-challenged",
    done(){return challengeCompletions("t",41) >= 3 && challengeCompletions("t",42) >= 3},
    tooltip:"Fully complete 8 Transcension Challenges. Reward: Transcension points are raised ^1.005.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#DDCC00"; return style}
  },
  75: {
    name: "Born Again",
    done(){return player.r.points.gte(1)},
    tooltip:"Reincarnate. Reward: Gain 10x more EXP from all sources!",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#CC0000"; return style}
  },
  76: {
    name: "Gotta Catch 'Em All",
    done(){return player.r.prestiges.gte(10)},
    tooltip:"Obtain 8 Reincarnation Milestones.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#CC0000"; return style}
  },
  81: {
    name: "It's 2008 Again",
    done(){return player.points.gte("1e440") && inChallenge("t",32)},
    tooltip:"Reach 1e440 tubas in Challenge 6. Reward: Gain 2x more quarks.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#CC0000"; return style}
  },
  82: {
    name: "Energized!",
    done(){return player.en.quark.gt(0)},
    tooltip:"Begin generating quark energy.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#CC0000"; return style}
  },
  83: {
    name: "A noble sacrifice",
    done(){return player.r.sacrificeMult.gt(1)},
    tooltip:"Have a sacrifice multiplier greater than 1.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#CC0000"; return style}
  },
  84: {
    name: "Biggest Numbers Yet",
    done(){return player.points.gte("1e1000000")},
    tooltip:"Reach 1e1,000,000 tubas. Reward: +3 free soul orbs.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#CC0000"; return style}
  },
  85: {
    name: "Reincarnated Suffering",
    done(){return hasChallenge("r",12)},
    tooltip:"Complete Reincarnation Challenge 2 once.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#CC0000"; return style}
  },
  86: {
    name: "Impress your friends",
    done(){return player.sh.flavors.strawberry.gte(1.75e100)},
    tooltip:"Reach 1.75e100 strawberry shards. Reward: Gain 1e10x more transcension points in a Reincarnation Challenge.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#CC0000"; return style}
  },
  91: {
    name: "Into The Heavens",
    done(){return hasMilestone("to",19)},
    tooltip:"Unlock Spirits.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#CC0000"; return style}
  },
  92: {
    name: "It's a Tuba's Tree 2 Christmas",
    done(){return player.r.spiritualGifts.gte(1e6)},
    tooltip:"Reach 1,000,000 spiritual gifts. Reward: Gain 1.5x more spiritual gifts.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#CC0000"; return style}
  },
  93: {
    name: "That's fast!",
    done(){return player.r.fastest < 1},
    tooltip:"Reincarnate in under 1 second.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#CC0000"; return style}
  },
  94: {
    name: "<span style='font-size: 12px; color: black;'><b>End of the World</b></span>",
    done(){return challengeCompletions("t",52) >= 3},
    tooltip:"Complete Challenge 10 three times. Reward: Unlock 3 second-row Reincarnation Upgrades.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#CC0000"; return style}
  },
  95: {
    name: "Heavy Electrons",
    done(){return player.en.muon.gt(0)},
    tooltip:"Begin generating muon energy.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#CC0000"; return style}
  },
  96: {
    name: "Inflation III when?",
    done(){return hasUpgrade("t",35)},
    tooltip:"Buy the last 3rd row Transcension Upgrade. Reward: You can buy another path from the 3-way split.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#CC0000"; return style}
  },
  101: {
    name: "Quantum superposition",
    done(){return hasUpgrade("r",131)},
    tooltip:"Begin to passively generate quarks. Reward: Uncap the effects of Quantized Prestige and Quantized Ascension.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#CC0000"; return style}
  },
  102: {
    name: "Utterly corrupt",
    done(){return reincScoreCalc("final").gte(1e100) && player.points.gte("1e100000") && player.sh.points.gte("1e500")},
    tooltip:"Reach 1e100 non-effective Reincarnation Score while generating Energies. Reward: Weaken the Reincarnation Score softcap.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#CC0000"; return style}
  },
  103: {
    name: "You reached the skill ceiling",
    done(){return player.sk.temporalSkill.gte(1000)},
    tooltip:"Reach Level 1,000 Temporal Skill.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#CC0000"; return style}
  },
  104: {
    name: "Engineer <i>Hypergaming</i>",
    done(){return player.a.upgrades.length >= 20},
    tooltip:"Have 20 ascension upgrades bought in total.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#CC0000"; return style}
  },
  105: {
    name: "To The Dark Side",
    done(){return player.points.gte("1e220000") && player.en.charges[2] >= 10 && player.en.charges[3] >= 10 && player.en.charges[4] >= 10},
    tooltip:"Reach 1e220,000 tubas with Charges 2, 3, and 4 maxed. Reward: Unlock the 5th Charge.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#CC0000"; return style}
  },
  106: {
    name: "Challenges are like onions",
    done(){return player.a.points.gte("1e19200") && inChallenge("t",52) && inChallenge("r",12)},
    tooltip:"Reach 1e19,200 ascension points in Challenge 10 in Reincarnation Challenge 2. Reward: Gain 1e50x more reincarnation tokens.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#CC0000"; return style}
  },
  111: {
    name: "[insert arbitrary number here]",
    done(){return player.points.gte("1e22895400")},
    tooltip:"Reach 1e22,895,400 tubas.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#CC0000"; return style}
  },
  112: {
    name: "Overgifted",
    done(){return player.r.spiritualGifts.gte(1e60)},
    tooltip:"Reach 1e60 spiritual gifts. Reward: Gain more spiritual gifts based on incrementy.<br><span style='font-size:10px'>(Formula: log10(incrementy)+1)</span>",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#CC0000"; return style}
  },
  113: {
    name: "Prestigious?",
    done(){return player.sp.points.gte(1)},
    tooltip:"Super-Prestige. Reward: Gain 2x more incrementy.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#CC0000"; return style}
  },
  114: {
    name: "What do I do to get rid of you",
    done(){return player.t.points.gte("1e200000") && !hasUpgrade("r",31)},
    tooltip:"Reach 1e200,000 transcension points without any Tree Upgrades. Reward: Multiply super-prestige point gain by the number of tree upgrades you have.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#CC0000"; return style}
  },
  115: {
    name: "Wait there's another one?",
    done(){return player.i.sacrificeMult.gt(1)},
    tooltip:"Perform an Incrementy Sacrifice.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#CC0000"; return style}
  },
  116: {
    name: "You Can Stop Now",
    done(){return player.points.gte("1e1e8")},
    tooltip:"Reach 1e100,000,000 tubas. Reward: +30 free soul orbs.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#CC0000"; return style}
  },
  121: {
    name: "When this baby hits 8000 mph",
    done(){return player.sk.rarities.temporal >= 1},
    tooltip:"Upgrade the quality of the Temporal Skill.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#CC0000"; return style}
  },
  122: {
    name: "Everyone is here!",
    done(){return player.sp.upgrades.length >= 10},
    tooltip:"Have 10 Super-Prestige Upgrades at once. Reward: The Incrementy Sacrifice multiplier applies to super-prestige point gain.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#CC0000"; return style}
  },
  123: {
    name: "Reality Breaker",
    done(){return hasChallenge("r",31)},
    tooltip:"Complete Reincarnation Challenge 5 once.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#CC0000"; return style}
  },
  124: {
    name: "To The Darker Side",
    done(){return player.points.gte("1e2330000") && player.en.charges[1] >= 10 && player.en.charges[2] >= 10 && player.en.charges[3] >= 10 && player.en.charges[4] >= 10 && player.en.charges[5] >= 10},
    tooltip:"Reach 1e2,330,000 tubas with all 5 Charges maxed. Reward: Gain 1e10x more Reincarnation Score.",
    style() {const style = {}; if (hasAchievement(this.layer,this.id)) style["background-color"] = "#CC0000"; return style}
  },
},
})

addLayer("sk", {
  name: "skills", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "↑", // This appears on the layer's node. Default is the id with the first letter capitalized
  color: "#34EB74",
  startData() { return {
      unlocked: true,
  points: new Decimal(0),
  temporalSkill: new Decimal(0),
  cloningSkill: new Decimal(0),
  inceptionSkill: new Decimal(0),
  discountSkill: new Decimal(0),
  wisdomSkill: new Decimal(0),
  ascendentSkill: new Decimal(0),
  tubasTreasure: false,
  rarities: {
    temporal: 0,
    cloning: 0,
    inception: 0,
    discount: 0,
    wisdom: 0,
  },
  }},
  tooltip:"Skills",
  tabFormat: [
  ["infobox","lore"],
  "main-display",
  ["display-text", () => `Experience is gained every time you reset, based on what layer and the amount of resources gained.<br><br>
  ${rarityText("temporal")}<span style="color: yellow">Temporal Skill:</span> ${player.sk.temporalSkill}/${skillCap("temporal")}${hasMilestone("to",3) ? ` <span style="color:#34EB74">(Effective: ${format(effectiveLvls("temporal"))})</span>` : ``}<br>
  ${rarityText("cloning")}<span style="color: #AA00AA">Cloning Skill:</span> ${player.sk.cloningSkill}/${skillCap("cloning")}${hasMilestone("to",3) ? ` <span style="color:#34EB74">(Effective: ${format(effectiveLvls("cloning"))})</span>` : ``}<br>`],
  () => hasMilestone("to",3) ? ["display-text", `${rarityText("inception")}<span style="color: cyan">Inception Skill:</span> ${player.sk.inceptionSkill}/${skillCap("inception")}${hasUpgrade("t",24) ? ` <span style="color:#34EB74">(Effective: ${format(effectiveLvls("inception"))})</span>` : ``}<br>`] : "",
  () => hasMilestone("to",6) ? ["display-text", `${rarityText("discount")}<span style="color: green">Discount Skill:</span> ${player.sk.discountSkill}/${skillCap("discount")}${hasUpgrade("t",24) ? ` <span style="color:#34EB74">(Effective: ${format(effectiveLvls("discount"))})</span>` : ``}<br>`] : "",
  () => hasMilestone("to",15) ? ["display-text", `${rarityText("wisdom")}<span style="color: #FF5555">Wisdom Skill:</span> ${player.sk.wisdomSkill}/${skillCap("wisdom")}${hasUpgrade("r",15) ? ` <span style="color:#34EB74">(Effective: ${format(effectiveLvls("wisdom"))})</span>` : ``}<br>`] : "",
  ["clickables",[1]],
  () => hasMilestone("to",26) ? ["clickables",[2]] : "",
  ["display-text", () => `<span style="color: yellow">Temporal Skill: ${formatWhole(skillEffects("temporal",1))} free Time Accelerators, ${formatWhole(skillEffects("temporal",2))} free Accelerator Boosts${player.sk.rarities.temporal >= 2 ? `, ${format(skillEffects("temporal",3))}% free Accelerator Boosts` : ""}</span><br><span style="color: #AA00AA">Cloning Skill: ${formatWhole(skillEffects("cloning",1))} free Duplicators, ${format(skillEffects("cloning",2))}x more prestige points${player.sk.rarities.cloning >= 2 ? `, ${format(skillEffects("cloning",3))}x more ascension points` : ""}</span><br>`],
  () => hasMilestone("to",3) ? ["display-text", `<span style="color: cyan">Inception Skill: +${format(skillEffects("inception",1))} Generator production exponent, ${format(skillEffects("inception",2))}x effective Temporal and Cloning skill levels${player.sk.rarities.inception >= 2 ? `, +${format(skillEffects("inception",3))} Gift Adder production exponent` : ""}</span><br>`] : "",
  () => hasMilestone("to",6) ? ["display-text", `<span style="color: green">Discount Skill: /${formatWhole(skillEffects("discount",1))} all skill costs, ${format(skillEffects("discount",2))}x experience gain</span><br>`] : "",
  () => hasMilestone("to",15) ? ["display-text", `<span style="color: #FF5555">Wisdom Skill: ${format(skillEffects("wisdom",1))}x effectiveness of all Shard Generators, ${format(skillEffects("wisdom",2))}x gain of all shard flavors</span><br>`] : "",
  ],
  resource: "experience", // Name of prestige currency
  type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  row: "side", // Row the layer is in on the tree (0 is the first row)
  position: 1,
  automate(){
    if (player.sk.auto && hasMilestone("r",0)) {
      while (player.sk.points.gte(skillCosts("temporal"))) {
        player.sk.points = player.sk.points.sub(skillCosts("temporal"))
        player.sk.temporalSkill = player.sk.temporalSkill.add(1)
      }
      while (player.sk.points.gte(skillCosts("cloning"))) {
        player.sk.points = player.sk.points.sub(skillCosts("cloning"))
        player.sk.cloningSkill = player.sk.cloningSkill.add(1)
      }
      while (player.sk.points.gte(skillCosts("inception")) && hasMilestone("to",3)) {
        player.sk.points = player.sk.points.sub(skillCosts("inception"))
        player.sk.inceptionSkill = player.sk.inceptionSkill.add(1)
      }
      while (player.sk.points.gte(skillCosts("discount")) && hasMilestone("to",6)) {
        player.sk.points = player.sk.points.sub(skillCosts("discount"))
        player.sk.discountSkill = player.sk.discountSkill.add(1)
      }
      while (player.sk.points.gte(skillCosts("wisdom")) && hasMilestone("to",15)) {
        player.sk.points = player.sk.points.sub(skillCosts("wisdom"))
        player.sk.wisdomSkill = player.sk.wisdomSkill.add(1)
      }
    }
  },
  layerShown(){return hasUpgrade("p",15) || player.a.total.gte(1) || player.t.total.gte(1)},
  clickables: {
    11: {
      display() {return `Level up Temporal Skill<br>Cost: ${format(skillCosts("temporal"))} EXP`},
      onClick() {
        player.sk.points = player.sk.points.sub(skillCosts("temporal"))
        player.sk.temporalSkill = player.sk.temporalSkill.add(1)},
      canClick() {return player.sk.points.gte(skillCosts("temporal"))
      },
    },
    12: {
      display() {return `Level up Cloning Skill<br>Cost: ${format(skillCosts("cloning"))} EXP`},
      onClick() {
        player.sk.points = player.sk.points.sub(skillCosts("cloning"))
        player.sk.cloningSkill = player.sk.cloningSkill.add(1)},
      canClick() {return player.sk.points.gte(skillCosts("cloning"))
      },
    },
    13: {
      display() {return `Level up Inception Skill<br>Cost: ${format(skillCosts("inception"))} EXP`},
      onClick() {
        player.sk.points = player.sk.points.sub(skillCosts("inception"))
        player.sk.inceptionSkill = player.sk.inceptionSkill.add(1)},
      canClick() {return player.sk.points.gte(skillCosts("inception"))
      },
      unlocked() {return hasMilestone("to",3)}
    },
    14: {
      display() {return `Level up Discount Skill<br>Cost: ${format(skillCosts("discount"))} EXP`},
      onClick() {
        player.sk.points = player.sk.points.sub(skillCosts("discount"))
        player.sk.discountSkill = player.sk.discountSkill.add(1)},
      canClick() {return player.sk.points.gte(skillCosts("discount"))
      },
      unlocked() {return hasMilestone("to",6)}
    },
    15: {
      display() {return `Level up Wisdom Skill<br>Cost: ${format(skillCosts("wisdom"))} EXP`},
      onClick() {
        player.sk.points = player.sk.points.sub(skillCosts("wisdom"))
        player.sk.wisdomSkill = player.sk.wisdomSkill.add(1)
      },
      canClick() {return player.sk.points.gte(skillCosts("wisdom"))},
      unlocked() {return hasMilestone("to",15)}
    },
    21: {
      display() {return `Upgrade Temporal Skill<br>Cost: ${format(skillCosts("temporalUpg"))} EXP`},
      onClick() {
        player.sk.points = player.sk.points.sub(skillCosts("temporalUpg"))
        player.sk.rarities.temporal += 1
      },
      canClick() {return player.sk.points.gte(skillCosts("temporalUpg"))},
    },
    22: {
      display() {return `Upgrade Cloning Skill<br>Cost: ${format(skillCosts("cloningUpg"))} EXP`},
      onClick() {
        player.sk.points = player.sk.points.sub(skillCosts("cloningUpg"))
        player.sk.rarities.cloning += 1
      },
      canClick() {return player.sk.points.gte(skillCosts("cloningUpg"))},
    },
    23: {
      display() {return `Upgrade Inception Skill<br>Cost: ${format(skillCosts("inceptionUpg"))} EXP`},
      onClick() {
        player.sk.points = player.sk.points.sub(skillCosts("inceptionUpg"))
        player.sk.rarities.inception += 1
      },
      canClick() {return player.sk.points.gte(skillCosts("inceptionUpg"))},
    },
    24: {
      display() {return `Upgrade Discount Skill<br>Cost: ${format(skillCosts("discountUpg"))} EXP`},
      onClick() {
        player.sk.points = player.sk.points.sub(skillCosts("discountUpg"))
        player.sk.rarities.discount += 1
      },
      canClick() {return player.sk.points.gte(skillCosts("discountUpg"))},
    },
    25: {
      display() {return `Upgrade Wisdom Skill<br>Cost: ${format(skillCosts("wisdomUpg"))} EXP`},
      onClick() {
        player.sk.points = player.sk.points.sub(skillCosts("wisdomUpg"))
        player.sk.rarities.wisdom += 1
      },
      canClick() {return player.sk.points.gte(skillCosts("wisdomUpg"))},
    },
  }
})

function skillCosts(x) {
  switch (x) {
    case "temporal":
      return player.sk.temporalSkill.gte(skillCap(x)) ? new Decimal(Infinity) : new Decimal(10).mul(Decimal.pow(hasUpgrade("r",62)?1.15:1.2,player.sk.temporalSkill)).div(skillEffects("discount",1)).floor()
    case "cloning":
      return player.sk.cloningSkill.gte(skillCap(x)) ? new Decimal(Infinity) : new Decimal(25).mul(Decimal.pow(hasUpgrade("r",62)?1.25:1.4,player.sk.cloningSkill)).div(skillEffects("discount",1)).floor()
    case "inception":
      return player.sk.inceptionSkill.gte(skillCap(x)) ? new Decimal(Infinity) : new Decimal(10000).mul(Decimal.pow(hasUpgrade("r",62)?1.35:1.6,player.sk.inceptionSkill)).div(skillEffects("discount",1)).floor()
    case "discount":
      return player.sk.discountSkill.gte(skillCap(x)) ? new Decimal(Infinity) : new Decimal(1e7).mul(Decimal.pow(hasUpgrade("r",62)?1.35:1.6,player.sk.discountSkill)).div(skillEffects("discount",1)).floor()
    case "wisdom":
      return player.sk.wisdomSkill.gte(skillCap(x)) ? new Decimal(Infinity) : new Decimal(1e16).mul(Decimal.pow(hasUpgrade("r",62)?1.5:1.7,player.sk.wisdomSkill)).div(skillEffects("discount",1)).floor()
    case "temporalUpg":
      if(player.sk.rarities.temporal == 0) return new Decimal(1e270)
      else if(player.sk.rarities.temporal == 1) return new Decimal("1e392")
      else if(player.sk.rarities.temporal == 2) return new Decimal(Infinity)
    case "cloningUpg":
      if(player.sk.rarities.cloning == 0) return new Decimal("1e315")
      else if(player.sk.rarities.cloning == 1) return new Decimal("1e408")
      else if(player.sk.rarities.cloning == 2) return new Decimal(Infinity)
    case "inceptionUpg":
      if(player.sk.rarities.inception == 0) return new Decimal("1e333")
      else if(player.sk.rarities.inception == 1) return new Decimal("1e427")
      else if(player.sk.rarities.inception == 2) return new Decimal(Infinity)
    case "discountUpg":
      if(player.sk.rarities.discount == 0) return new Decimal("1e350")
      else if(player.sk.rarities.discount == 1) return new Decimal(Infinity)
      else if(player.sk.rarities.discount == 2) return new Decimal(Infinity)
    case "wisdomUpg":
      if(player.sk.rarities.wisdom == 0) return new Decimal("1e375")
      else if(player.sk.rarities.wisdom == 1) return new Decimal(Infinity)
      else if(player.sk.rarities.wisdom == 2) return new Decimal(Infinity)
  }
}

function skillEffects(x,y) {
  switch (x) {
    case "temporal":
      if (y == 1) return effectiveLvls(x).pow(player.sk.rarities[x] >= 1 ? 0.8 : 0.75).mul(hasAchievement("g",26)?2:1).floor()
      if (y == 2) return effectiveLvls(x).pow(player.sk.rarities[x] >= 1 ? 0.45 : 0.4).mul(hasAchievement("g",26)?2:1).floor()
      if (y == 3) return player.sk.rarities[x] >= 2 ? effectiveLvls(x).div(1000) : new Decimal(0)
    case "cloning":
      if (y == 1) return effectiveLvls(x).pow(player.sk.rarities[x] >= 1 ? 0.95 : 0.8).mul(hasUpgrade("a",14)?2:1).floor()
      if (y == 2) return new Decimal(player.sk.rarities[x] >= 1 ? 1.6 : 1.4).pow(effectiveLvls(x))
      if (y == 3) return player.sk.rarities[x] >= 2 ? Decimal.pow(1.4,effectiveLvls(x)) : new Decimal(1)
    case "inception":
      if (y == 1) return effectiveLvls(x).pow(player.sk.rarities[x] >= 1 ? 1 : 0.85)
      if (y == 2) return effectiveLvls(x).pow(player.sk.rarities[x] >= 1 ? 0.95 : 0.9).div(25).add(1)
      if (y == 3) return player.sk.rarities[x] >= 2 ? Decimal.pow(effectiveLvls(x),0.1) : new Decimal(0)
    case "discount":
      if (y == 1) return effectiveLvls(x).add(1).pow(player.sk.rarities[x] >= 1 ? 3 : 2)
      if (y == 2) return effectiveLvls(x).pow(player.sk.rarities[x] >= 1 ? 5 : 0.75).add(1)
    case "wisdom":
      if (y == 1) return Decimal.pow(player.sk.rarities[x] >= 1 ? 4 : 1.5,effectiveLvls(x))
      if (y == 2) return Decimal.pow(player.sk.rarities[x] >= 1 ? 2.25 : 2,effectiveLvls(x))
  }
}

function expMult() {
  let mult = new Decimal(1)
  if(hasAchievement("g",26)) mult = mult.mul(3)
  if(hasUpgrade("n",15)) mult = mult.mul(4)
  mult = mult.mul(boosterEffects(1))
  mult = mult.mul(skillEffects("discount",2))
  if(hasAchievement("g",73)) mult = mult.mul(((player.n.upgrades.length + player.p.upgrades.length + player.a.upgrades.length + player.t.upgrades.length) ** 0.5) + 1)
  if(hasAchievement("g",75)) mult = mult.mul(10)
  if(hasUpgrade("r",61)) mult = mult.mul(upgradeEffect("r",61))
  if(hasUpgrade("r",81)) mult = mult.mul(upgradeEffect("r",81))
  if(hasUpgrade("r",101)) mult = mult.mul(upgradeEffect("r",101))
  mult = mult.mul((challengeCompletions("r",11)+1)**3)
  mult = mult.mul(energyEffects("muon"))
  mult = mult.div(Decimal.pow(1e10,player.en.charges[5]))
  mult = mult.mul(buyableEffect("i",21))
  return mult
}

function effectiveLvls(x) {
  switch (x) {
    case "temporal":
      return player.sk.temporalSkill.mul(skillEffects("inception",2))
    case "cloning":
      return player.sk.cloningSkill.mul(skillEffects("inception",2))
    case "inception":
      let x = player.sk.inceptionSkill
      if(hasUpgrade("t",24)) x = x.mul(player.sk.inceptionSkill.pow(0.9).div(25).add(1).cbrt())
      return x
    case "discount":
      let y = player.sk.discountSkill
      if(hasUpgrade("t",24)) y = y.mul(skillEffects("inception",2).cbrt())
      return y
    case "wisdom":
      let z = player.sk.wisdomSkill
      if(hasUpgrade("r",15)) z = z.mul(skillEffects("inception",2).cbrt())
      z = z.mul(Decimal.add(1,challengeCompletions("r",22)/20))
      return z
  }
}

function skillCap(x) {
  let y = new Decimal(1000)
  if(hasUpgrade("sp",15)) y = y.add(200)
  if(player.sk.rarities[x] >= 2) y = y.add(300)
  return y
}

function rarityText(x) {
  let y = player.sk.rarities[x]
  switch (y) {
    default:
      return ``
    case 1:
      return `<span style="color:#0070CC">Prestiged</span> `
    case 2:
      return `<span style="color:#D2D900">Ascended</span> `
    case 3:
      return `<span style="color:#C600D8">Transcended</span> `
    case 4:
      return `<span style="color:#00AE23">Reincarnated</span> `
  }
}

addLayer("to", {
  name: "tokens", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "◯", // This appears on the layer's node. Default is the id with the first letter capitalized
  color: "#948F31",
  startData() { return {
      unlocked: true,
    prestige: new Decimal(0),
    ascend: new Decimal(0),
    transcend: new Decimal(0),
    reinc: new Decimal(0),
  }},
  tooltip:"Tokens",
  tabFormat: {
    "Prestige": {
        buttonStyle: {
          "border-color": "#0070CC",
        },
        content: [
        ["display-text", () => `You have ${format(player.to.prestige)} prestige tokens`],
        ["display-text", () => `You are generating ${format(player.p.points.pow(0.25).mul(boosterEffects(2)).mul(hasUpgrade("r",82)?upgradeEffect("r",82):1))} prestige tokens per second (base gen: PP^0.25)`],
        "blank",
        ["milestones",[0,1,3,6,12,15,20,26]],
        ],
    },
    "Ascension": {
        buttonStyle: {
          "border-color": "#D2D900",
        },
        content: [
        ["display-text", () => `You have ${format(player.to.ascend)} ascension tokens`],
        ["display-text", () => `You are generating ${format(player.a.points.pow(0.5).mul(boosterEffects(2)).mul(hasUpgrade("r",82)?upgradeEffect("r",82):1))} ascension tokens per second (base gen: AP^0.5)`],
        "blank",
        ["milestones",[2,4,5,10,14,17,23]],
        ],
    },
    "Transcension": {
        buttonStyle: {
          "border-color": "#C600D8",
        },
        unlocked() {return hasAchievement("g",43)},
        content: [
        ["display-text", () => `You have ${format(player.to.transcend)} transcension tokens`],
        ["display-text", () => `You are generating ${format(player.t.points.pow(0.4).mul(boosterEffects(2)).mul(hasUpgrade("r",82)?upgradeEffect("r",82):1))} transcension tokens per second (base gen: TP^0.4)`],
        "blank",
        ["milestones",[7,8,9,11,13,21,25]],
        ],
    },
    "Reincarnation": {
      buttonStyle: {
        "border-color": "#00AE23",
      },
      unlocked() {return hasAchievement("g",73)},
      content: [
      ["display-text", () => `You have ${format(player.to.reinc)} reincarnation tokens`],
      ["display-text", () => `You are generating ${format(player.r.points.pow(0.9).mul(hasUpgrade("r",82)?upgradeEffect("r",82):1).mul(hasAchievement("g",106)?1e50:1))} reincarnation tokens per second (base gen: QK^0.9)`],
      ["display-text", () => `Note: Reincarnation token generation is unaffected by Boosters.`],
      "blank",
      ["milestones",[16,18,19,22,24,27]],
      ],
  },
  },
  type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  row: "side", // Row the layer is in on the tree (0 is the first row)
  position: 2,
  layerShown(){return hasUpgrade("a",13) || player.t.total.gte(1)},
  update(diff) {
    if(hasUpgrade("a",13)) {
      player.to.prestige = player.to.prestige.add(player.p.points.pow(0.25).mul(boosterEffects(2)).mul(hasUpgrade("r",82)?upgradeEffect("r",82):1).mul(diff))
      player.to.ascend = player.to.ascend.add(player.a.points.pow(0.5).mul(boosterEffects(2)).mul(hasUpgrade("r",82)?upgradeEffect("r",82):1).mul(diff))
      player.to.transcend = player.to.transcend.add(player.t.points.pow(0.4).mul(boosterEffects(2)).mul(hasUpgrade("r",82)?upgradeEffect("r",82):1).mul(diff))
      player.to.reinc = player.to.reinc.add(player.r.points.pow(0.9).mul(hasUpgrade("r",82)?upgradeEffect("r",82):1).mul(hasAchievement("g",106)?1e50:1).mul(diff))
    }
  },
  milestones: {
    0: {
      requirementDescription: "1e14 prestige tokens",
      effectDescription: "Unlock a 2nd row of Prestige Upgrades.",
      done() { return player.to.prestige.gte(1e14) },
    },
    1: {
      requirementDescription: "1e32 prestige tokens",
      effectDescription: "Unlock the 2nd Prestige Buyable.",
      done() { return player.to.prestige.gte(1e32) },
    },
    2: {
      requirementDescription: "1.5e12 ascension tokens",
      effectDescription: "Unlock the 1st Ascension Buyable.",
      done() { return player.to.ascend.gte(1.5e12) },
    },
    3: {
      requirementDescription: "1e106 prestige tokens",
      effectDescription: "Unlock a 3rd Skill.",
      done() { return player.to.prestige.gte(1e106) },
    },
    4: {
      requirementDescription: "1e40 ascension tokens",
      effectDescription: "Unlock Boosters.",
      done() { return player.to.ascend.gte(1e40) },
    },
    5: {
      requirementDescription: "1e70 ascension tokens",
      effectDescription: "Unlock a 2nd row of Ascension Upgrades.",
      done() { return player.to.ascend.gte(1e70) },
      unlocked() {return hasAchievement("g",43)},
    },
    6: {
      requirementDescription: "4.2e690 prestige tokens",
      effectDescription: "Unlock a 4th Skill.",
      done() { return player.to.prestige.gte("4.2e690") },
      unlocked() {return hasAchievement("g",43)},
    },
    7: {
      requirementDescription: "1e40 transcension tokens",
      effectDescription: "Unlock 6 Challenges.",
      done() { return player.to.transcend.gte(1e40) },
    },
    8: {
      requirementDescription: "1e80 transcension tokens",
      effectDescription: "Unlock Shard Generators 4-6.",
      done() { return player.to.transcend.gte(1e80) },
    },
    9: {
      requirementDescription: "1e155 transcension tokens",
      effectDescription: "Unlock Super-Boosters.",
      done() { return player.to.transcend.gte(1e155) },
    },
    10: {
      requirementDescription: "1e2960 ascension tokens",
      effectDescription: "Unlock the 2nd Ascension Buyable.",
      done() { return player.to.ascend.gte("1e2960") },
      unlocked() {return hasAchievement("g",43)},
    },
    11: {
      requirementDescription: "1e470 transcension tokens",
      effectDescription: "Unlock Shard Flavors.",
      done() { return player.to.transcend.gte("1e470") },
    },
    12: {
      requirementDescription: "1e36,900 prestige tokens",
      effectDescription: "Unlock a 3rd row of Prestige Upgrades.",
      done() { return player.to.prestige.gte("1e36900") },
      unlocked() {return hasAchievement("g",43)},
    },
    13: {
      requirementDescription: "1e630 transcension tokens",
      effectDescription: "Unlock 2 new Challenges.",
      done() { return player.to.transcend.gte("1e630") },
    },
    14: {
      requirementDescription: "5e15,555 ascension tokens",
      effectDescription: "Unlock the 3rd Ascension Buyable.",
      done() { return player.to.ascend.gte("5e15555") },
      unlocked() {return hasAchievement("g",43)},
    },
    15: {
      requirementDescription: "1e118,000 prestige tokens",
      effectDescription: "Unlock a 5th Skill.",
      done() { return player.to.prestige.gte("1e118000") },
      unlocked() {return hasAchievement("g",75)},
    },
    16: {
      requirementDescription: "200,000,000 reincarnation tokens",
      effectDescription: "Permanently unlock Energies.",
      done() { return player.to.reinc.gte(2e8) },
    },
    17: {
      requirementDescription: "1e33,000 ascension tokens",
      effectDescription: "Unlock a 3rd row of Ascension Upgrades.",
      done() { return player.to.ascend.gte("1e33000") },
      unlocked() {return hasAchievement("g",75)},
    },
    18: {
      requirementDescription: "1e67 reincarnation tokens",
      effectDescription: "Unlock 2 Reincarnation Challenges.",
      done() { return player.to.reinc.gte(1e67) },
    },
    19: {
      requirementDescription: "1e144 reincarnation tokens",
      effectDescription: "Unlock Spirits.",
      done() { return player.to.reinc.gte(1e144) },
    },
    20: {
      requirementDescription: "1e265,600 prestige tokens",
      effectDescription: "Unlock a 4th row of Prestige Upgrades.",
      done() { return player.to.prestige.gte("1e265600") },
      unlocked() {return hasAchievement("g",75)},
    },
    21: {
      requirementDescription: "1e4050 transcension tokens",
      effectDescription: "Unlock a 3rd row of Transcension Upgrades.",
      done() { return player.to.transcend.gte("1e4050") },
      unlocked() {return hasAchievement("g",75)},
    },
    22: {
      requirementDescription: "1e960 reincarnation tokens",
      effectDescription: "Unlock 2 new Reincarnation Challenges and 2 new Charges.",
      done() { return player.to.reinc.gte("1e960") },
    },
    23: {
      requirementDescription: "1e655,360 ascension tokens",
      effectDescription: "Unlock a 4th row of Ascension Upgrades.",
      done() { return player.to.ascend.gte("1e655360") },
      unlocked() {return hasAchievement("g",75)},
    },
    24: {
      requirementDescription: "1e2850 reincarnation tokens",
      effectDescription: "Unlock 2 new layers on the same row as Reincarnation.",
      done() { return player.to.reinc.gte("1e2850") },
    },
    25: {
      requirementDescription: "1e126,300 transcension tokens",
      effectDescription: "Unlock 2 new Shard Flavors.",
      done() { return player.to.transcend.gte("1e126300") },
      unlocked() {return hasAchievement("g",75)},
    },
    26: {
      requirementDescription: "1e16,408,000 prestige tokens",
      effectDescription: "Unlock quality upgrades for Skills.",
      done() { return player.to.prestige.gte("1e16408000") },
      unlocked() {return hasAchievement("g",75)},
    },
    27: {
      requirementDescription: "1e75,000 reincarnation tokens",
      effectDescription: "Unlock 1 new Reincarnation Challenge.",
      done() { return player.to.reinc.gte("1e75000") },
    },
  },
})

addLayer("sh", {
  name: "shards", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "Δ", // This appears on the layer's node. Default is the id with the first letter capitalized
  color: "#AA66FF",
  startData() { return {
      unlocked: true,
  points: new Decimal(0),
  produced: {11:new Decimal(0),12:new Decimal(0),13:new Decimal(0),21:new Decimal(0),22:new Decimal(0)},
  flavors: {
    blueberry: new Decimal(0),
    chocolate: new Decimal(0),
    antimatter: new Decimal(0),
    strawberry: new Decimal(0),
    mango: new Decimal(0),
    uranium: new Decimal(0),
  },
  selection: 1,
  interval: 0,
  }},
  tooltip:"Shards",
  tabFormat: [
  ["infobox","lore"],
  ["display-text", () => `You have <h2 style="color: #C600D8; text-shadow: 0px 0px 10px #C600D8">${formatWhole(player.t.points)}</h2> transcension points<br><br>`],
  ["display-text", () => `You have <h2 style="color: #AA66FF; text-shadow: 0px 0px 10px #AA66FF">${formatWhole(player.sh.points)}</h2> shards, multiplying tuba, prestige point, and ascension point gain by <h2 style="color: #AA66FF; text-shadow: 0px 0px 10px #AA66FF">${format(shardEffect())}</h2>x.<br><br>`],
  () => shardEffect().gte("1e2000") ? ["display-text", `<span style="color:red">The shard effect is reduced past ${format(shardSoftcapStart())}x</span><br><br>`] : "",
  () => hasUpgrade("t",13) ? ["display-text", `<span style="color:orange">Thanks to Transcension Upgrade 3, all Shard Generators are ${format(upgradeEffect("t",13))}x more effective.</span>`] : "",
  () => hasUpgrade("p",33) ? ["display-text", `<span style="color:orange">Thanks to Prestige Upgrade 13, all Shard Generators are ${format(upgradeEffect("p",33))}x more effective.</span>`] : "",
  "blank",
  () => hasMilestone("to",11) ? ["display-text", `<h2>Shard Flavors:</h2><br>
  <span style="color:#4444FF">You have ${format(player.sh.flavors.blueberry)} blueberry shards, powering the shard effect to tubas ^${format(shardFlavorEffects(1))}</span><br>
  <span style="color:#996644">You have ${format(player.sh.flavors.chocolate)} chocolate shards, multiplying the shard effect softcap start by ${format(shardFlavorEffects(2))}x</span><br>
  <span style="color:#9900FF">You have ${format(player.sh.flavors.antimatter)} antimatter shards, multiplying effectiveness of all Shard Generators by ${format(shardFlavorEffects(3))}x</span><br>
  ${hasChallenge("r",12) ? `<span style="color:#FF8888">You have ${format(player.sh.flavors.strawberry)} strawberry shards, powering the sacrifice multiplier formula ^${format(shardFlavorEffects(4))}</span><br>` : ""}
  ${hasMilestone("to",25) ? `<span style="color:#FFBB55">You have ${format(player.sh.flavors.mango)} mango shards, multiplying the gains of the first 4 Shard Flavors by ${format(shardFlavorEffects(5))}x</span><br>` : ""}
  ${hasMilestone("to",25) ? `<span style="color:#00FF00">You have ${format(player.sh.flavors.uranium)} uranium shards, multiplying Reincarnation Score by ${format(shardFlavorEffects(6))}x</span><br>` : ""}<br>`] : "",
  () => hasUpgrade("a",33) ? ["display-text", `Sacrifice multiplier: ${format(player.r.sacrificeMult)}x`] : "",
  "clickables",
  () => hasMilestone("to",11) ? "blank" : "",
  "buyables",
  ],
  resource: "shards", // Name of prestige currency
  type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  row: "side", // Row the layer is in on the tree (0 is the first row)
  automate(){
    if (player.sh.auto && hasMilestone("t",6)) {
      setBuyableAmount("sh",11,tmp.sh.buyables[11].canAfford?player.t.points.log2().floor().add(1):getBuyableAmount("sh",11))
      setBuyableAmount("sh",12,tmp.sh.buyables[12].canAfford?player.t.points.div(20).log(8).floor().add(1):getBuyableAmount("sh",12))
      setBuyableAmount("sh",13,tmp.sh.buyables[13].canAfford?player.t.points.div(1000).log(50).floor().add(1):getBuyableAmount("sh",13))
    }
    if (player.sh.auto2 && hasMilestone("t",7)) {
      setBuyableAmount("sh",21,tmp.sh.buyables[21].canAfford?player.t.points.div(1e120).log(100000).floor().add(1):getBuyableAmount("sh",21))
      setBuyableAmount("sh",22,tmp.sh.buyables[22].canAfford?player.t.points.div(1e150).log(1e10).floor().add(1):getBuyableAmount("sh",22))
      setBuyableAmount("sh",23,tmp.sh.buyables[23].canAfford?player.t.points.div(1e200).log(1e20).floor().add(1):getBuyableAmount("sh",23))
    }
    if (player.sh.auto3 && hasMilestone("r",8) && sacrificeValue().gt(player.r.sacrificeMult)) {
      player.r.sacrificeMult = sacrificeValue()
    }
  },
  position: 3,
  layerShown(){return hasMilestone("t",0)},
  update(diff) {
    player.sh.points = player.sh.points.add(buyableEffect(this.layer,11).mul(diff))
    player.sh.produced[11] = player.sh.produced[11].add(buyableEffect(this.layer,12).mul(diff))
    player.sh.produced[12] = player.sh.produced[12].add(buyableEffect(this.layer,13).mul(diff))
    player.sh.produced[13] = player.sh.produced[13].add(buyableEffect(this.layer,21).mul(diff))
    player.sh.produced[21] = player.sh.produced[21].add(buyableEffect(this.layer,22).mul(diff))
    player.sh.produced[22] = player.sh.produced[22].add(buyableEffect(this.layer,23).mul(diff))

    if (player.sh.selection == 1) {
      player.sh.flavors.blueberry = player.sh.flavors.blueberry.add(player.sh.points.div("1e715").pow(0.2).mul(shardFlavorMult()).mul(shardFlavorEffects(5)).round().div(100).mul(diff))
    } else if (player.sh.selection == 2) {
      player.sh.flavors.chocolate = player.sh.flavors.chocolate.add(player.sh.points.div("1e740").pow(0.1).mul(shardFlavorMult()).mul(shardFlavorEffects(5)).round().div(100).mul(diff))
    } else if (player.sh.selection == 3) {
      player.sh.flavors.antimatter = player.sh.flavors.antimatter.add(player.sh.points.div("1e780").pow(0.05).mul(shardFlavorMult()).mul(shardFlavorEffects(5)).round().div(100).mul(diff))
    } else if (player.sh.selection == 4) {
      player.sh.flavors.strawberry = player.sh.flavors.strawberry.add(player.sh.points.div("1e7600").pow(0.025).mul(shardFlavorMult()).mul(shardFlavorEffects(5)).round().div(100).mul(diff))
    } else if (player.sh.selection == 5) {
      player.sh.flavors.mango = player.sh.flavors.mango.add(player.sh.points.div("1e320000").pow(0.0125).mul(shardFlavorMult()).round().div(100).mul(diff))
    } else if (player.sh.selection == 6) {
      player.sh.flavors.uranium = player.sh.flavors.uranium.add(player.sh.points.div("1e330000").pow(0.00625).mul(shardFlavorMult()).round().div(100).mul(diff))
    }
    if (player.r.autoFlavors) {
      player.sh.interval += diff * 1000
      if (player.sh.interval >= 250) {
        player.sh.interval = 0
        player.sh.selection += 1
        if (player.sh.selection > (hasChallenge("r",12)?(hasMilestone("to",25)?6:4):3)) player.sh.selection = 1
      }
    }
  },
  buyables: {
    11: {
      title: "Shard Generator 1",
      cost(x) { return Decimal.pow(2,x) },
      display() {return `Generates shards based on its amount.<br>Amount: ${format(getBuyableAmount(this.layer, this.id).add(player.sh.produced[this.id]))} (${formatWhole(getBuyableAmount(this.layer, this.id))})<br>Cost: ${format(this.cost())}<br>Multiplier: ${format(this.effect().div(getBuyableAmount(this.layer, this.id).add(player.sh.produced[this.id]).max(1)).max(1))}x<br>Effect: +${format(this.effect())} shards/second`},
      canAfford() {return player.t.points.gte(this.cost())},
      buy() {
          player.t.points = player.t.points.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        mult = new Decimal(1)
        if(hasUpgrade("t",13)) mult = mult.mul(upgradeEffect("t",13))
        if(hasAchievement("g",45)) mult = mult.mul(2)
        mult = mult.mul(challengeEffect("t",21))
        if(hasAchievement("g",55)) mult = mult.mul(1000)
        mult = mult.mul(boosterEffects(4))
        mult = mult.mul(shardFlavorEffects(3))
        if(hasUpgrade("p",33)) mult = mult.mul(upgradeEffect("p",33))
        if(hasUpgrade("r",31)) mult = mult.mul(upgradeEffect("r",31))
        mult = mult.mul(skillEffects("wisdom",1))
        if(hasUpgrade("a",32)) mult = mult.mul(upgradeEffect("a",32))
        if(hasUpgrade("r",93)) mult = mult.mul(upgradeEffect("r",93))
        if(hasUpgrade("r",154)) mult = mult.mul(upgradeEffect("r",154))
        mult = mult.mul(buyableEffect("i",23))
        mult = mult.pow(Decimal.pow(0.9,player.en.charges[1]+player.en.charges[2]+player.en.charges[3]+player.en.charges[4]+player.en.charges[5]))
        if(hasUpgrade("r",71)) mult = mult.mul(1e10)
        mult = mult.pow(Decimal.add(1,challengeCompletions("r",12)/300).min(hasUpgrade("sp",25)?1.06:1.025))
        return mult.mul(x.add(player.sh.produced[this.id]))
      },
    },
    12: {
      title: "Shard Generator 2",
      cost(x) { return new Decimal(20).mul(Decimal.pow(8,x)) },
      display() {return `Generates Shard Generator 1 based on its amount.<br>Amount: ${format(getBuyableAmount(this.layer, this.id).add(player.sh.produced[this.id]))} (${formatWhole(getBuyableAmount(this.layer, this.id))})<br>Cost: ${format(this.cost())}<br>Multiplier: ${format(this.effect().div(getBuyableAmount(this.layer, this.id).add(player.sh.produced[this.id]).max(1)).max(1))}x<br>Effect: +${format(this.effect())} SG1/second`},
      canAfford() {return player.t.points.gte(this.cost())},
      buy() {
          player.t.points = player.t.points.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        mult = new Decimal(1)
        if(hasUpgrade("t",13)) mult = mult.mul(upgradeEffect("t",13))
        mult = mult.mul(challengeEffect("t",21))
        if(hasAchievement("g",55)) mult = mult.mul(1000)
        mult = mult.mul(shardFlavorEffects(3))
        if(hasUpgrade("p",33)) mult = mult.mul(upgradeEffect("p",33))
        mult = mult.mul(skillEffects("wisdom",1))
        if(hasUpgrade("a",32)) mult = mult.mul(upgradeEffect("a",32))
        if(hasUpgrade("r",154)) mult = mult.mul(upgradeEffect("r",154))
        mult = mult.mul(buyableEffect("i",23))
        mult = mult.pow(Decimal.pow(0.9,player.en.charges[1]+player.en.charges[2]+player.en.charges[3]+player.en.charges[4]+player.en.charges[5]))
        if(hasUpgrade("r",71)) mult = mult.mul(1e10)
        mult = mult.pow(Decimal.add(1,challengeCompletions("r",12)/300).min(hasUpgrade("sp",25)?1.06:1.025))
        return mult.mul(x.add(player.sh.produced[this.id]))
      },
    },
    13: {
      title: "Shard Generator 3",
      cost(x) { return new Decimal(1000).mul(Decimal.pow(50,x)) },
      display() {return `Generates Shard Generator 2 based on its amount.<br>Amount: ${format(getBuyableAmount(this.layer, this.id).add(player.sh.produced[this.id]))} (${formatWhole(getBuyableAmount(this.layer, this.id))})<br>Cost: ${format(this.cost())}<br>Multiplier: ${format(this.effect().div(getBuyableAmount(this.layer, this.id).add(player.sh.produced[this.id]).max(1)).max(1))}x<br>Effect: +${format(this.effect())} SG2/second`},
      canAfford() {return player.t.points.gte(this.cost())},
      buy() {
          player.t.points = player.t.points.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        mult = new Decimal(1)
        if(hasUpgrade("t",13)) mult = mult.mul(upgradeEffect("t",13))
        mult = mult.mul(challengeEffect("t",21))
        if(hasAchievement("g",55)) mult = mult.mul(1000)
        mult = mult.mul(shardFlavorEffects(3))
        if(hasUpgrade("p",33)) mult = mult.mul(upgradeEffect("p",33))
        mult = mult.mul(skillEffects("wisdom",1))
        if(hasUpgrade("a",32)) mult = mult.mul(upgradeEffect("a",32))
        if(hasUpgrade("r",154)) mult = mult.mul(upgradeEffect("r",154))
        mult = mult.mul(buyableEffect("i",23))
        mult = mult.pow(Decimal.pow(0.9,player.en.charges[1]+player.en.charges[2]+player.en.charges[3]+player.en.charges[4]+player.en.charges[5]))
        if(hasUpgrade("r",71)) mult = mult.mul(1e10)
        mult = mult.pow(Decimal.add(1,challengeCompletions("r",12)/300).min(hasUpgrade("sp",25)?1.06:1.025))
        return mult.mul(x.add(player.sh.produced[this.id]))
      },
    },
    21: {
      title: "Shard Generator 4",
      cost(x) { return new Decimal(1e120).mul(Decimal.pow(100000,x)) },
      display() {return `Generates Shard Generator 3 based on its amount.<br>Amount: ${format(getBuyableAmount(this.layer, this.id).add(player.sh.produced[this.id]))} (${formatWhole(getBuyableAmount(this.layer, this.id))})<br>Cost: ${format(this.cost())}<br>Multiplier: ${format(this.effect().div(getBuyableAmount(this.layer, this.id).add(player.sh.produced[this.id]).max(1)).max(1))}x<br>Effect: +${format(this.effect())} SG3/second`},
      canAfford() {return player.t.points.gte(this.cost())},
      buy() {
          player.t.points = player.t.points.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      unlocked() {return hasMilestone("to",8)},
      effect(x) {
        mult = new Decimal(1)
        if(hasUpgrade("t",13)) mult = mult.mul(upgradeEffect("t",13))
        mult = mult.mul(challengeEffect("t",21))
        mult = mult.mul(shardFlavorEffects(3))
        if(hasUpgrade("p",33)) mult = mult.mul(upgradeEffect("p",33))
        mult = mult.mul(skillEffects("wisdom",1))
        if(hasUpgrade("a",32)) mult = mult.mul(upgradeEffect("a",32))
        if(hasUpgrade("r",154)) mult = mult.mul(upgradeEffect("r",154))
        mult = mult.mul(buyableEffect("i",23))
        mult = mult.pow(Decimal.pow(0.9,player.en.charges[1]+player.en.charges[2]+player.en.charges[3]+player.en.charges[4]+player.en.charges[5]))
        if(hasUpgrade("r",71)) mult = mult.mul(1e10)
        mult = mult.pow(Decimal.add(1,challengeCompletions("r",12)/300).min(hasUpgrade("sp",25)?1.06:1.025))
        return mult.mul(x.add(player.sh.produced[this.id]))
      },
    },
    22: {
      title: "Shard Generator 5",
      cost(x) { return new Decimal(1e150).mul(Decimal.pow(1e10,x)) },
      display() {return `Generates Shard Generator 4 based on its amount.<br>Amount: ${format(getBuyableAmount(this.layer, this.id).add(player.sh.produced[this.id]))} (${formatWhole(getBuyableAmount(this.layer, this.id))})<br>Cost: ${format(this.cost())}<br>Multiplier: ${format(this.effect().div(getBuyableAmount(this.layer, this.id).add(player.sh.produced[this.id]).max(1)).max(1))}x<br>Effect: +${format(this.effect())} SG4/second`},
      canAfford() {return player.t.points.gte(this.cost())},
      buy() {
          player.t.points = player.t.points.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      unlocked() {return hasMilestone("to",8)},
      effect(x) {
        mult = new Decimal(1)
        if(hasUpgrade("t",13)) mult = mult.mul(upgradeEffect("t",13))
        mult = mult.mul(challengeEffect("t",21))
        mult = mult.mul(shardFlavorEffects(3))
        if(hasUpgrade("p",33)) mult = mult.mul(upgradeEffect("p",33))
        mult = mult.mul(skillEffects("wisdom",1))
        if(hasUpgrade("a",32)) mult = mult.mul(upgradeEffect("a",32))
        if(hasUpgrade("r",154)) mult = mult.mul(upgradeEffect("r",154))
        mult = mult.mul(buyableEffect("i",23))
        mult = mult.pow(Decimal.pow(0.9,player.en.charges[1]+player.en.charges[2]+player.en.charges[3]+player.en.charges[4]+player.en.charges[5]))
        if(hasUpgrade("r",71)) mult = mult.mul(1e10)
        mult = mult.pow(Decimal.add(1,challengeCompletions("r",12)/300).min(hasUpgrade("sp",25)?1.06:1.025))
        return mult.mul(x.add(player.sh.produced[this.id]))
      },
    },
    23: {
      title: "Shard Generator 6",
      cost(x) { return new Decimal(1e200).mul(Decimal.pow(1e20,x)) },
      display() {return `Generates Shard Generator 5 based on its amount.<br>Amount: ${formatWhole(getBuyableAmount(this.layer, this.id))}<br>Cost: ${format(this.cost())}<br>Multiplier: ${format(this.effect().div(getBuyableAmount(this.layer, this.id).add(player.sh.produced[this.id]).max(1)).max(1))}x<br>Effect: +${format(this.effect())} SG5/second`},
      canAfford() {return player.t.points.gte(this.cost())},
      buy() {
          player.t.points = player.t.points.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      unlocked() {return hasMilestone("to",8)},
      effect(x) {
        mult = new Decimal(1)
        if(hasUpgrade("t",13)) mult = mult.mul(upgradeEffect("t",13))
        mult = mult.mul(challengeEffect("t",21))
        if(hasUpgrade("t",23)) mult = mult.mul(100000)
        mult = mult.mul(shardFlavorEffects(3))
        if(hasUpgrade("p",33)) mult = mult.mul(upgradeEffect("p",33))
        mult = mult.mul(skillEffects("wisdom",1))
        if(hasUpgrade("a",32)) mult = mult.mul(upgradeEffect("a",32))
        if(hasUpgrade("a",33)) mult = mult.mul(9e15)
        mult = mult.mul(player.r.sacrificeMult)
        mult = mult.mul(buyableEffect("i",23))
        mult = mult.pow(Decimal.pow(0.9,player.en.charges[1]+player.en.charges[2]+player.en.charges[3]+player.en.charges[4]+player.en.charges[5]))
        if(hasUpgrade("r",71)) mult = mult.mul(1e10)
        mult = mult.pow(Decimal.add(1,challengeCompletions("r",12)/300).min(hasUpgrade("sp",25)?1.06:1.025))
        return mult.mul(x)
      },
    },
  },
  clickables: {
    11: {
      display: `Switch selected Shard Flavor to produce`,
      onClick() {
        player.sh.selection += 1
        if (player.sh.selection > (hasChallenge("r",12)?(hasMilestone("to",25)?6:4):3)) player.sh.selection = 1
      },
      canClick() {return true},
      unlocked() {return hasMilestone("to",11)}
    },
    12: {
      display: () => `Auto-Flavors: ${player.r.autoFlavors ? "ON" : "OFF"}`,
      onClick() {
        player.r.autoFlavors = !player.r.autoFlavors
      },
      canClick() {return true},
      unlocked() {return hasMilestone("r",6)}
    },
    13: {
      display: () => `Generator Sacrifice (${format(sacrificeValue().div(player.r.sacrificeMult))}x)`,
      onClick() {
        player.r.sacrificeMult = sacrificeValue()
        if (!hasMilestone("r",8)) {
          player.sh.produced[11] = new Decimal(0)
          player.sh.produced[12] = new Decimal(0)
          player.sh.produced[13] = new Decimal(0)
          player.sh.produced[21] = new Decimal(0)
          player.sh.produced[22] = new Decimal(0)
        }
      },
      canClick() {return sacrificeValue().div(player.r.sacrificeMult).gte(1)},
      unlocked() {return hasUpgrade("a",33)}
    },
  },
})

function shardEffect() {
  let mult = player.sh.points.pow(hasUpgrade("t",14)?3:0.5).add(1)
  if(mult.gte(shardSoftcapStart())) mult = mult.div(shardSoftcapStart()).pow(inChallenge("r",22)?0.05:(hasAchievement("g",64)?0.3:0.25)).mul(shardSoftcapStart())
  if(inChallenge("t",21) || inChallenge("t",52)) mult = new Decimal(1)
  return mult
}

function shardFlavorEffects(x) {
  switch (x) {
    case 1:
      return player.sh.flavors.blueberry.add(1).log10().add(1).log2().div(10).add(1)
    case 2:
      let x = player.sh.flavors.chocolate.pow(5).add(1)
      if(x.gte("1e350")) x = x.div("1e350").pow(0.75).mul("1e350")
      x = x.pow(Decimal.add(1,challengeCompletions("r",22)/50))
      return x
    case 3:
      let y = player.sh.flavors.antimatter.cbrt().add(1)
      if(y.gte("1e30")) y = y.div("1e30").pow(0.5).mul("1e30")
      return y
    case 4:
      return player.sh.flavors.strawberry.add(1).log10().add(1).log2().div(4).add(1)
    case 5:
      return player.sh.flavors.mango.pow(0.15).add(1)
    case 6:
      return player.sh.flavors.uranium.pow(0.002).add(1)
  }
}

function shardSoftcapStart() {
  let start = new Decimal("1e2000")
  start = start.mul(shardFlavorEffects(2))
  return start
}

function shardFlavorMult() {
  let mult = new Decimal(100)
  if(hasAchievement("g",65)) mult = mult.mul(2)
  mult = mult.mul(skillEffects("wisdom",2))
  if(hasUpgrade("r",83)) mult = mult.mul(upgradeEffect("r",83))
  mult = mult.mul(Decimal.pow(1e10,challengeCompletions(this.layer,this.id)))
  return mult
}

function sacrificeValue() {
  let mult = player.sh.points.pow(0.01).pow(shardFlavorEffects(4))
  if(mult.gte("1e1000") && !hasUpgrade("a",41)) mult = mult.div("1e1000").pow(0.25).mul("1e1000")
  if(hasUpgrade("r",162)) mult = mult.pow(upgradeEffect("r",162))
  return mult
}

addLayer("en", {
name: "energies", // This is optional, only used in a few places, If absent it just uses the layer id.
symbol: "🗲", // This appears on the layer's node. Default is the id with the first letter capitalized
color: "#7777FF",
startData() { return {
    unlocked: true,
  charges: [null,0,0,0,0,0],
  quark: new Decimal(0),
  lepton: new Decimal(0),
  boson: new Decimal(0),
  muon: new Decimal(0),
  inflaton: new Decimal(0),
}},
tooltip:"Energies",
tabFormat: [
["infobox","lore"],
["display-text", () => `<span style="color:#8000FF; font-size:25px;">The most rewarding ventures are those that few would dare to embark.</span><br>
<span style="color:yellow">You will start generating Energies at 1e100,000 tubas and 1e500 shards, based on your Charges and your tubas.</span><br>
<span style="color:yellow">Choose wisely!</span> <span style="color:red">Don't bite off more than you can chew...</span><br>
<b>Note: Increasing/decreasing Charges will cause a reincarnation reset without any bonus.</b>`],
"blank",
["bar","charge1"],
() => !inChallenge("r",31) ? ["clickables",[1]] : "",
"blank",
["bar","charge2"],
() => !inChallenge("r",31) ? ["clickables",[2]] : "",
() => hasMilestone("to",22) ? "blank" : "",
() => hasMilestone("to",22) ? ["bar","charge3"] : "",
() => hasMilestone("to",22) && !inChallenge("r",31) ? ["clickables",[3]] : "",
() => hasMilestone("to",22) ? "blank" : "",
() => hasMilestone("to",22) ? ["bar","charge4"] : "",
() => hasMilestone("to",22) && !inChallenge("r",31) ? ["clickables",[4]] : "",
() => hasAchievement("g",105) ? "blank" : "",
() => hasAchievement("g",105) ? ["bar","charge5"] : "",
() => hasAchievement("g",105) && !inChallenge("r",31) ? ["clickables",[5]] : "",
"blank",
["display-text", () => `<span style="color:red">This Reincarnation's climate is raising the effectiveness of all Shard Generators ^${format(Decimal.pow(0.9,player.en.charges[1]+player.en.charges[2]+player.en.charges[3]+player.en.charges[4]+player.en.charges[5]))}.</span>`],
["display-text", () => `Your <span style="color:green">Reincarnation Score</span> is <span style="color:yellow">${format(reincScoreCalc("base"))}</span> (base) * <span style="color:red">${format(reincScoreCalc("charges"))}</span> (Charges mult) * <span style="color:magenta">${format(reincScoreCalc("bonus"))}</span> (Bonus mult) = <span style="color:#8000FF">${format(reincScoreCalc("final"))}</span>`],
() => reincScoreCalc("final").gte(1e50) ? ["display-text",`Effective Reincarnation Score: ${format(reincScoreCalc("effective"))}`] : "",
"blank",
["display-text", () => `You have <h2 style="color: #7777FF; text-shadow: 0px 0px 10px #7777FF">${format(player.en.quark)}</h2> quark energy, multiplying tuba gain by <h2 style="color: #7777FF; text-shadow: 0px 0px 10px #7777FF">${format(energyEffects("quark"))}</h2>x.`],
() => player.en.quark.gt(0) ? ["display-text", `You have <h2 style="color: #EE88FF; text-shadow: 0px 0px 10px #EE88FF">${format(player.en.lepton)}</h2> lepton energy, multiplying transcension point gain by <h2 style="color: #EE88FF; text-shadow: 0px 0px 10px #EE88FF">${format(energyEffects("lepton"))}</h2>x. (requires 2,000,000 score)`] : "",
() => player.en.lepton.gt(0) ? ["display-text", `You have <h2 style="color: #FF3388; text-shadow: 0px 0px 10px #FF3388">${format(player.en.boson)}</h2> boson energy, multiplying ascension point gain by <h2 style="color: #FF3388; text-shadow: 0px 0px 10px #FF3388">${format(energyEffects("boson"))}</h2>x. (requires 1e18 score)`] : "",
() => player.en.boson.gt(0) ? ["display-text", `You have <h2 style="color: #FF4400; text-shadow: 0px 0px 10px #FF4400">${format(player.en.muon)}</h2> muon energy, multiplying EXP gain by <h2 style="color: #FF4400; text-shadow: 0px 0px 10px #FF4400">${format(energyEffects("muon"))}</h2>x. (requires 1e57 effective score)`] : "",
() => player.en.muon.gt(0) ? ["display-text", `You have <h2 style="color: #FF9900; text-shadow: 0px 0px 10px #FF9900">${format(player.en.inflaton)}</h2> inflaton energy, multiplying the Duplicator multiplier per purchase by <h2 style="color: #FF9900; text-shadow: 0px 0px 10px #FF9900">${format(energyEffects("inflaton"))}</h2>x. (requires 1e113 effective score)`] : "",
],
type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
row: "side", // Row the layer is in on the tree (0 is the first row)
position: 4,
layerShown(){return hasMilestone("to",16)},
update(diff) {
  if(player.points.gte("1e100000") && player.sh.points.gte("1e500")) player.en.quark = player.en.quark.add(reincScoreCalc("effective").div(100).pow(hasUpgrade("r",111)?1.2:1).mul(diff))
  if(player.points.gte("1e100000") && player.sh.points.gte("1e500") && reincScoreCalc("effective").gte(2e6)) player.en.lepton = player.en.lepton.add(reincScoreCalc("effective").div(1000000).pow(hasUpgrade("r",111)?1.2:1).mul(diff))
  if(player.points.gte("1e100000") && player.sh.points.gte("1e500") && reincScoreCalc("effective").gte(1e18)) player.en.boson = player.en.boson.add(reincScoreCalc("effective").div(5e17).pow(hasUpgrade("r",111)?1.2:1).mul(diff))
  if(player.points.gte("1e100000") && player.sh.points.gte("1e500") && reincScoreCalc("effective").gte(1e57)) player.en.muon = player.en.muon.add(reincScoreCalc("effective").div(5e56).pow(hasUpgrade("r",111)?1.2:1).mul(diff))
  if(player.points.gte("1e100000") && player.sh.points.gte("1e500") && reincScoreCalc("effective").gte(1e113)) player.en.inflaton = player.en.inflaton.add(reincScoreCalc("effective").div(5e112).pow(hasUpgrade("r",111)?1.2:1).mul(diff))
},
clickables: {
  11: {display: `<h2>+</h2>`,onClick() {if(player.en.charges[1] < 10) player.en.charges[1]++; resetReinc()},canClick() {return true},style() {return {"width": "75px", "min-height": "75px"}},},
  12: {display: `<h2>-</h2>`,onClick() {if(player.en.charges[1] > 0) player.en.charges[1]--; resetReinc()},canClick() {return true},style() {return {"width": "75px", "min-height": "75px"}},},
  13: {display: `<h2>0</h2>`,onClick() {player.en.charges[1] = 0; resetReinc()},canClick() {return true},style() {return {"width": "75px", "min-height": "75px"}},},
  14: {display: `<h2>10</h2>`,onClick() {player.en.charges[1] = 10; resetReinc()},canClick() {return true},style() {return {"width": "75px", "min-height": "75px"}},},
  21: {display: `<h2>+</h2>`,onClick() {if(player.en.charges[2] < 10) player.en.charges[2]++; resetReinc()},canClick() {return true},style() {return {"width": "75px", "min-height": "75px"}},},
  22: {display: `<h2>-</h2>`,onClick() {if(player.en.charges[2] > 0) player.en.charges[2]--; resetReinc()},canClick() {return true},style() {return {"width": "75px", "min-height": "75px"}},},
  23: {display: `<h2>0</h2>`,onClick() {player.en.charges[2] = 0; resetReinc()},canClick() {return true},style() {return {"width": "75px", "min-height": "75px"}},},
  24: {display: `<h2>10</h2>`,onClick() {player.en.charges[2] = 10; resetReinc()},canClick() {return true},style() {return {"width": "75px", "min-height": "75px"}},},
  31: {display: `<h2>+</h2>`,onClick() {if(player.en.charges[3] < 10) player.en.charges[3]++; resetReinc()},canClick() {return true},style() {return {"width": "75px", "min-height": "75px"}},},
  32: {display: `<h2>-</h2>`,onClick() {if(player.en.charges[3] > 0) player.en.charges[3]--; resetReinc()},canClick() {return true},style() {return {"width": "75px", "min-height": "75px"}},},
  33: {display: `<h2>0</h2>`,onClick() {player.en.charges[3] = 0; resetReinc()},canClick() {return true},style() {return {"width": "75px", "min-height": "75px"}},},
  34: {display: `<h2>10</h2>`,onClick() {player.en.charges[3] = 10; resetReinc()},canClick() {return true},style() {return {"width": "75px", "min-height": "75px"}},},
  41: {display: `<h2>+</h2>`,onClick() {if(player.en.charges[4] < 10) player.en.charges[4]++; resetReinc()},canClick() {return true},style() {return {"width": "75px", "min-height": "75px"}},},
  42: {display: `<h2>-</h2>`,onClick() {if(player.en.charges[4] > 0) player.en.charges[4]--; resetReinc()},canClick() {return true},style() {return {"width": "75px", "min-height": "75px"}},},
  43: {display: `<h2>0</h2>`,onClick() {player.en.charges[4] = 0; resetReinc()},canClick() {return true},style() {return {"width": "75px", "min-height": "75px"}},},
  44: {display: `<h2>10</h2>`,onClick() {player.en.charges[4] = 10; resetReinc()},canClick() {return true},style() {return {"width": "75px", "min-height": "75px"}},},
  51: {display: `<h2>+</h2>`,onClick() {if(player.en.charges[5] < 10) player.en.charges[5]++; resetReinc()},canClick() {return true},style() {return {"width": "75px", "min-height": "75px"}},},
  52: {display: `<h2>-</h2>`,onClick() {if(player.en.charges[5] > 0) player.en.charges[5]--; resetReinc()},canClick() {return true},style() {return {"width": "75px", "min-height": "75px"}},},
  53: {display: `<h2>0</h2>`,onClick() {player.en.charges[5] = 0; resetReinc()},canClick() {return true},style() {return {"width": "75px", "min-height": "75px"}},},
  54: {display: `<h2>10</h2>`,onClick() {player.en.charges[5] = 10; resetReinc()},canClick() {return true},style() {return {"width": "75px", "min-height": "75px"}},},
},
bars: {
  charge1: {
    direction: 3,
    width: 500,
    height: 75,
    progress() {return player.en.charges[1] / 10},
    display: () => `Tone Deafness: Tubas are raised ^${format(Decimal.pow(4/5,player.en.charges[1]))}`,
    fillStyle() { return {"background-color": "#999999"} },
  },
  charge2: {
    direction: 3,
    width: 500,
    height: 75,
    progress() {return player.en.charges[2] / 10},
    display: () => `Nerfed: Booster effectiveness /${format(Decimal.pow(1.5,player.en.charges[2]))}`,
    fillStyle() { return {"background-color": "#0000FF"} },
  },
  charge3: {
    direction: 3,
    width: 500,
    height: 75,
    progress() {return player.en.charges[3] / 10},
    display: () => `Disrespect: PP, AP, and TP gains ^${format(Decimal.pow(2/3,player.en.charges[3]))}`,
    fillStyle() { return {"background-color": "#C600D8"} },
  },
  charge4: {
    direction: 3,
    width: 500,
    height: 75,
    progress() {return player.en.charges[4] / 10},
    display: () => `Brutal Buyables: Prestige and Ascension Buyable scaling ^${formatWhole(Decimal.pow(2,player.en.charges[4]))}`,
    fillStyle() { return {"background-color": "#FF9900"} },
  },
  charge5: {
    direction: 3,
    width: 500,
    height: 75,
    progress() {return player.en.charges[5] / 10},
    display: () => `Talentless: EXP gain /${format(Decimal.pow(1e10,player.en.charges[5]))}`,
    fillStyle() { return {"background-color": "#1C803F"} },
  },
},
})

function reincScoreCalc(x) {
  switch (x) {
    case "base":
      let mult = player.points.max(1).log10().div(1000)
      return mult
    case "charges":
      let mult2 = new Decimal(0)
      if(player.en.charges[1]+player.en.charges[2]+player.en.charges[3]+player.en.charges[4]+player.en.charges[5] > 0) mult2 = new Decimal(1)
      mult2 = mult2.mul(Decimal.pow(1e10,player.en.charges[1]))
      mult2 = mult2.mul(Decimal.pow(10,player.en.charges[2]))
      mult2 = mult2.mul(Decimal.pow(1e5,player.en.charges[3]))
      mult2 = mult2.mul(Decimal.pow(1e4,player.en.charges[4]))
      mult2 = mult2.mul(Decimal.pow(1000,player.en.charges[5]))
      return mult2
    case "bonus":
      let mult3 = new Decimal(1)
      if(hasUpgrade("r",13)) mult3 = mult3.mul(upgradeEffect("r",13))
      mult3 = mult3.mul(challengeEffect("t",51))
      if(hasUpgrade("p",45)) mult3 = mult3.mul(1e6)
      mult3 = mult3.mul(Decimal.pow(10,challengeCompletions("r",21)))
      if(hasUpgrade("r",153)) mult3 = mult3.mul(upgradeEffect("r",153))
      mult3 = mult3.mul(shardFlavorEffects(6))
      if(hasAchievement("g",124)) mult3 = mult3.mul(1e10)
      return mult3
    case "final":
      let mult4 = new Decimal(1)
      mult4 = mult4.mul(reincScoreCalc("base"))
      mult4 = mult4.mul(reincScoreCalc("charges"))
      mult4 = mult4.mul(reincScoreCalc("bonus"))
      return mult4
    case "effective":
      let mult5 = reincScoreCalc("final")
      if(mult5.gte(1e50)) mult5 = mult5.div(1e50).pow(hasAchievement("g",102)?0.75:0.5).mul(1e50)
      if(mult5.gte("1e420")) mult5 = mult5.div("1e420").pow(0.25).mul("1e420")
      return mult5
  }
}

function resetReinc() {
  let arr = [player.sk.rarities.temporal,player.sk.rarities.cloning,player.sk.rarities.inception,player.sk.rarities.discount,player.sk.rarities.wisdom]
  doReset("r",true)
  layerDataReset("sk")
  layerDataReset("sh")
  player.sk.rarities.temporal = arr[0]
  player.sk.rarities.cloning = arr[1]
  player.sk.rarities.inception = arr[2]
  player.sk.rarities.discount = arr[3]
  player.sk.rarities.wisdom = arr[4]
}

function energyEffects(x) {
  switch (x) {
    case "quark":
      return inChallenge("t",51) ? new Decimal(1) : player.en.quark.pow(200).add(1).pow(buyableEffect("r",31))
    break;
    case "lepton":
      return inChallenge("t",51) ? new Decimal(1) : player.en.lepton.pow(20).add(1).pow(buyableEffect("r",32))
    break;
    case "boson":
      return inChallenge("t",51) ? new Decimal(1) : player.en.boson.pow(100).add(1).pow(buyableEffect("r",33))
    break;
    case "muon":
      return inChallenge("t",51) ? new Decimal(1) : player.en.muon.pow(0.25).add(1).pow(buyableEffect("r",41))
    break;
    case "inflaton":
      return inChallenge("t",51) ? new Decimal(1) : (player.en.inflaton.pow(0.1).add(1).gte(10) ? player.en.inflaton.max(1).log10().add(1).pow(buyableEffect("r",42)) : player.en.inflaton.pow(0.1).add(1).pow(buyableEffect("r",42)))
    break;
  }
}