addLayer("n", {
  name: "normal", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "TT<sup>2</sup>", // This appears on the layer's node. Default is the id with the first letter capitalized
  startData() { return {
      unlocked: true,
  points: new Decimal(0),
  }},
  tabFormat: [
    ["display-text", () => `You have ${format(player.points)} tubas<br><br>`],
    () => freeTimeAccels().gte(7e6) ? ["display-text", `<span style="color:red">Free Time Accelerators are reduced past 7,000,000</span><br><br>`] : "",
    "buyables",
    "blank",
    "upgrades",
  ],
  tooltip: "Welcome to Tuba's Tree 2!",
  color: "#CCCCCC",
  type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  row: 0, // Row the layer is in on the tree (0 is the first row)
  automate(){
    if (player.n.auto && hasMilestone("p",0)) {
      setBuyableAmount("n",11,tmp.n.buyables[11].canAfford?player.points.div(10).log(2).floor().add(1):getBuyableAmount("n",11))
    }
    if (player.n.auto2 && hasMilestone("p",1)) {
      if(getBuyableAmount("n",12).gte(15)){
        setBuyableAmount("n",12,tmp.n.buyables[12].canAfford?player.points.div(1525878906250).log(5).root(1.5).add(15).floor().add(1):getBuyableAmount("n",12))
      }else{
        setBuyableAmount("n",12,tmp.n.buyables[12].canAfford?player.points.div(50).log(5).floor().add(1).min(15):getBuyableAmount("n",12))
      }
    }
    if (player.n.auto3 && hasMilestone("p",2)) {
      if(getBuyableAmount("n",13).gte(10)){
        setBuyableAmount("n",13,tmp.n.buyables[13].canAfford?player.points.div(5e12).log(10).root(1.5).add(10).floor().add(1):getBuyableAmount("n",13))
      }else{
        setBuyableAmount("n",13,tmp.n.buyables[13].canAfford?player.points.div(500).log(10).floor().add(1).min(10):getBuyableAmount("n",13))
      }
    }
    if (player.n.auto4 && hasMilestone("p",4)) {
      if(getBuyableAmount("n",21).gte(10)){
        setBuyableAmount("n",21,tmp.n.buyables[21].canAfford?player.points.div(1e36).log(100).root(1.75).add(10).floor().add(1):getBuyableAmount("n",21))
      }else{
        setBuyableAmount("n",21,tmp.n.buyables[21].canAfford?player.points.div(1e16).log(100).floor().add(1).min(10):getBuyableAmount("n",21))
      }
    }
  },
  layerShown(){return true},
  doReset(layer) {

  if (!(layers[layer].row > this.row)) return

  let keep = []
  if(layer=="p" && hasMilestone("p",3)) keep.push("upgrades")
  if((layer=="a" || layer=="b") && hasMilestone("a",1)) keep.push("upgrades")
  if((layer=="t" || layer=="sb") && hasMilestone("t",3)) keep.push("upgrades")
  if((layer=="r" || layer=="i" || layer=="sp") && hasMilestone("r",3)) keep.push("upgrades")

  layerDataReset(this.layer, keep)

  },
  upgrades: {
    11: {
      title: "Tuba Multiplier",
      description: "Multiply tuba gain by 5.",
      cost: new Decimal(2000),
      unlocked() {return getBuyableAmount("n",13).gte(1) || hasAchievement("g",15)},
      currencyDisplayName: "tubas",
      currencyInternalName: "points",
    },
    12: {
      title: "Generator Efficiency",
      description: "Generator production is squared by turning the knob to \"Very Fine\".",
      cost: new Decimal(10000),
      unlocked() {return getBuyableAmount("n",13).gte(1) || hasAchievement("g",15)},
      currencyDisplayName: "tubas",
      currencyInternalName: "points",
    },
    13: {
      title: "Time Warping",
      description: "The Time Accelerator multiplier per purchase is better.<br>(1.2x -> 1.25x)",
      cost: new Decimal(1e6),
      unlocked() {return getBuyableAmount("n",13).gte(1) || hasAchievement("g",15)},
      currencyDisplayName: "tubas",
      currencyInternalName: "points",
    },
    14: {
      title: "No Strings Attached (probably)",
      description: "Free Accelerator Boosts now give free Time Accelerators. Tuba forgot to add the effect.",
      cost: new Decimal("1e500"),
      unlocked() {return hasAchievement("g",36)},
      currencyDisplayName: "tubas",
      currencyInternalName: "points",
    },
    15: {
      title: "Bottle O' Enchanting",
      description: "Gain 4x more EXP from all sources!",
      cost: new Decimal("1e550"),
      unlocked() {return hasAchievement("g",36)},
      currencyDisplayName: "tubas",
      currencyInternalName: "points",
    },
  },
  buyables: {
  11: {
      title: "Generator",
      cost(x) { return new Decimal(10).mul(new Decimal(2).pow(x)) },
      display() {return `Generates tubas <i>automagically!</i><br>Times Bought: ${formatWhole(getBuyableAmount(this.layer, this.id))}<br>Cost: ${format(this.cost())}<br>Effect: +${format(this.effect())} base tubas/sec`},
      canAfford() {return player.points.gte(this.cost())},
      buy() {
          player.points = player.points.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        prod = x.pow(Decimal.add(hasUpgrade("n",12)?2:1,skillEffects("inception",1)).mul(challengeCompletions("r",11)+1))
        return prod
      },
  },
  12: {
      title: "<span style='color: #AA0000'><b>Time Accelerator</b></span>",
      cost(x) { let y = x.sub(15)
        return x.gte(15) ? new Decimal(1525878906250).mul(new Decimal(5).pow(y.pow(1.5))) : new Decimal(50).mul(new Decimal(5).pow(x)) },
      display() {return `Speeds up the flow of time!<br>(Does not actually speed up game time)<br>Times Bought: ${formatWhole(getBuyableAmount(this.layer, this.id))} + ${formatWhole(freeTimeAccels())}<br>Cost: ${format(this.cost())}<br>Time Speed: ${format(this.effect())}x`},
      canAfford() {return player.points.gte(this.cost())},
      buy() {
          player.points = player.points.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        mult = Decimal.pow(timeAccelMult(),x.add(freeTimeAccels()))
        if(inChallenge("t",41)) mult = new Decimal(1)
        return mult
      },
  },
  13: {
      title: "<span style='color: #0000FF'><b>Duplicator</b></span>",
      cost(x) { let y = x.sub(10)
        return x.gte(10) ? new Decimal(5e12).mul(new Decimal(10).pow(y.pow(1.5))) : new Decimal(500).mul(new Decimal(10).pow(x)) },
      display() {return `CTRL+C CTRL+V CTRL+C CTRL+V...<br>Times Bought: ${formatWhole(getBuyableAmount(this.layer, this.id))} + ${formatWhole(freeDuplicators())}<br>Cost: ${format(this.cost())}<br>Tuba Multiplier: ${format(this.effect())}x`},
      canAfford() {return player.points.gte(this.cost())},
      buy() {
          player.points = player.points.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        mult = Decimal.pow(duplicatorMult(),x.add(freeDuplicators()))
        if(inChallenge("t",41)) mult = new Decimal(1)
        if(inChallenge("t",41)) mult = new Decimal(1)
        return mult
      },
  },
  21: {
      title: "<span style='color: #AA33EE'><b>Accelerator Boost</b></span>",
      cost(x) { 
        let y = x.sub(10)
        return x.gte(10) ? new Decimal(1e36).mul(new Decimal(100).pow(y.pow(1.75))) : new Decimal(1e16).mul(new Decimal(100).pow(x)) },
      display() {return `Gain 3 free Time Accelerators, and add 0.02 to the multiplier per Time Accelerator.<br>Times Bought: ${formatWhole(getBuyableAmount(this.layer, this.id))} + ${formatWhole(skillEffects("temporal",2).mul(Decimal.add(1,skillEffects("temporal",3).div(100))).mul(inChallenge("t",31)||inChallenge("t",52)?0:1).floor())}<br>Cost: ${format(this.cost())}<br>${hasUpgrade("n",14) ? "" : "(Note: Free Accelerator Boosts do not give free Time Accelerators)"}`},
      canAfford() {return player.points.gte(this.cost())},
      buy() {
          player.points = player.points.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      unlocked() { return hasUpgrade("p",14) },
      effect(x) {
        mult = x.add(skillEffects("temporal",2).mul(Decimal.add(1,skillEffects("temporal",3).div(100))).mul(inChallenge("t",31)||inChallenge("t",52)?0:1).floor()).div(50).mul(boosterEffects(3)).mul(hasUpgrade("sp",14)?1.1:1)
        return mult
      },
  },
  },
})

function timeAccelMult() {
  let mult = new Decimal(1.2)
  if(hasUpgrade("n",13)) mult = mult.add(0.05)
  mult = mult.add(buyableEffect("n",21))
  return mult
}

function freeTimeAccels() {
  let amt = new Decimal(0)
  if(hasAchievement("g",21)) amt = amt.add(5)
  amt = amt.add(getBuyableAmount("n",21).add(hasUpgrade("n",14) && !inChallenge("t",31) && !inChallenge("t",52) ? skillEffects("temporal",2).mul(Decimal.add(1,skillEffects("temporal",3).div(100))).floor() : 0).mul(3).mul(boosterEffects(3)))
  if(!inChallenge("t",31) && !inChallenge("t",52)) amt = amt.add(skillEffects("temporal",1))
  amt = amt.mul(Decimal.add(1,buyableEffect("i",12).div(100)))
  if(amt.gte(7e6)) amt = amt.div(7e6).pow(0.9).mul(7e6)
  return amt
}

function duplicatorMult() {
  let mult = new Decimal(2)
  if(hasAchievement("g",23)) mult = mult.add(1)
  if(hasUpgrade("p",24)) mult = mult.add(upgradeEffect("p",24))
  mult = mult.add(challengeEffect("t",22))
  mult = mult.mul(energyEffects("inflaton"))
  return mult
}

function freeDuplicators() {
  let amt = new Decimal(0)
  amt = amt.add(skillEffects("cloning",1).mul(inChallenge("t",31)||inChallenge("t",52)?0:1).floor())
  amt = amt.mul(Decimal.add(1,buyableEffect("i",13).div(100)))
  return amt
}

addLayer("p", {
  name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
  startData() { return {
      unlocked: false,
  points: new Decimal(0),
  prestiges: new Decimal(0),
  }},
  passiveGeneration(){
    return hasMilestone("a", 2) ? globalSpeed() : 0
  },
  tabFormat: [
  "main-display",
  "prestige-button",
  ["display-text", () => `You have made ${format(player.p.total)} total prestige points`],
  ["display-text", () => `You have Prestiged ${format(player.p.prestiges)} times<br><br>`],
  () => hasUpgrade("p",15) ? ["display-text", `You will gain ${format(player.points.log10().div(10).mul(expMult()).floor())} EXP on prestige.<br><br>`] : "",
  "milestones",
  "buyables",
  "blank",
  "upgrades",
  ],
  color: "#0070CC",
  requires: new Decimal(1e7), // Can be a function that takes requirement increases into account
  resource: "prestige points", // Name of prestige currency
  baseResource: "tubas", // Name of resource prestige is based on
  baseAmount() {return player.points}, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.5, // Prestige currency exponent
  gainMult() { // Calculate the multiplier for main currency from bonuses
      mult = new Decimal(1)
      if(hasUpgrade("p",12)) mult = mult.mul(3)
      if(hasAchievement("g",16)) mult = mult.mul(2)
      mult = mult.mul(buyableEffect("p",11))
      if(!inChallenge("t",31) && !inChallenge("t",52)) mult = mult.mul(skillEffects("cloning",2))
      if(hasUpgrade("a",11)) mult = mult.mul(upgradeEffect("a",11))
      if(hasAchievement("g",34)) mult = mult.mul(70)
      mult = mult.mul(Decimal.pow(50,getBuyableAmount("a",11)))
      mult = mult.mul(shardEffect())
      if(hasUpgrade("t",11)) mult = mult.mul(1e6)
      if(hasUpgrade("a",24)) mult = mult.mul(upgradeEffect("a",24))
      if(hasUpgrade("r",91)) mult = mult.mul(upgradeEffect("r",91))
      mult = mult.mul(Decimal.pow("1e500",challengeCompletions("r",21)**2))
      if(hasUpgrade("sp",11)) mult = mult.mul(upgradeEffect("sp",11))
      if(hasUpgrade("sp",12)) mult = mult.mul("1e200000")
      return mult
  },
  gainExp() { // Calculate the exponent on main currency from bonuses
      let exp = new Decimal(1)
      if(hasUpgrade("p",25)) exp = exp.mul(1.05)
      if(inChallenge("t",31) || inChallenge("t",52)) exp = exp.mul(0.25)
      exp = exp.mul(challengeEffect("t",31))
      if(inChallenge("r",12)) exp = exp.mul(0.25)
      exp = exp.mul(Decimal.pow(2/3,player.en.charges[3]))
      return exp
  },
  row: 1, // Row the layer is in on the tree (0 is the first row)
  automate(){
    if (player.p.auto && hasMilestone("a",1)) {
      setBuyableAmount("p",11,tmp.p.buyables[11].canAfford?player.p.points.div(1e8).log(100).div(inChallenge("t",22)||inChallenge("t",52)?5:1).div(Decimal.pow(2,player.en.charges[4])).floor().add(1):getBuyableAmount("p",11))
    }
    if (player.p.auto2 && hasMilestone("a",3)) {
      setBuyableAmount("p",12,tmp.p.buyables[12].canAfford?player.p.points.div(1e100).log(100000).div(inChallenge("t",22)||inChallenge("t",52)?5:1).div(Decimal.pow(2,player.en.charges[4])).floor().add(1):getBuyableAmount("p",12))
    }
    if (player.p.auto3 && hasMilestone("p",5)) {
      setBuyableAmount("p",13,tmp.p.buyables[13].canAfford?player.p.points.div("1e72000").log(1e100).div(inChallenge("t",22)||inChallenge("t",52)?5:1).div(Decimal.pow(2,player.en.charges[4])).floor().add(1):getBuyableAmount("p",13))
    }
  },
  hotkeys: [
      {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
  ],
  branches: ["n",["sp",2]],
  onPrestige() {
    player.p.prestiges = player.p.prestiges.add(1)
    if(hasUpgrade("p",15)) player.sk.points = player.sk.points.add(player.points.log10().div(10).mul(expMult()).floor())
  },
  layerShown() {return hasUpgrade("n",13) || player.p.total.gte(1) || player.a.total.gte(1) || player.t.total.gte(1) || player.r.total.gte(1)},
  doReset(layer) {

  if (!(layers[layer].row > this.row)) return
    
  let hasSkills = hasUpgrade("p", 15)
  
  let keep = []
  if((layer=="a" || layer=="b") && hasMilestone("a",0)) keep.push("milestones")
  if((layer=="a" || layer=="b") && hasMilestone("a",1)) keep.push("upgrades")
  if((layer=="t" || layer=="sb") && hasMilestone("t",1)) keep.push("milestones")
  if((layer=="t" || layer=="sb") && hasMilestone("t",3)) keep.push("upgrades")
  if((layer=="r" || layer=="i" || layer=="sp") && hasMilestone("r",1)) keep.push("milestones")
  if((layer=="r" || layer=="i" || layer=="sp") && hasMilestone("r",3)) keep.push("upgrades")

  layerDataReset(this.layer, keep)

  if (hasSkills && !hasUpgrade("p", 15)) player.p.upgrades.push(15)

  },
  upgrades: {
    11: {
      title: "Prestige Bonus",
      description: "Gain more tubas based on total prestige points.",
      cost: new Decimal(1),
      tooltip: "Caps at 1e10,000x",
      effect(){
        let x = player.p.total.pow(0.5).mul(3).add(1)
        if(hasUpgrade("a",15)) x = player.p.total.pow(0.55).mul(10).add(1)
        if(x.gt("1e10000") && !hasUpgrade("a",25)){x = new Decimal("1e10000")}
        else if(hasUpgrade("a",25)) {x = x.div("1e10000").pow(0.5).mul("1e10000")}
        return x
      },
      effectDisplay(){return `x${format(this.effect())}`}
    },
    12: {
      title: "Prestige Enhancement",
      description: "Go big or go home! Triple tuba gain and prestige point gain.",
      cost: new Decimal(2),
    },
    13: {
      title: "Synergism be like",
      description: "Gain more tubas based on total normal buyables bought.",
      cost: new Decimal(5000),
      effect(){return getBuyableAmount("n",11).add(getBuyableAmount("n",12)).add(getBuyableAmount("n",13)).add(getBuyableAmount("n",21)).add(1).pow(0.875).pow(hasUpgrade("p",43)?1.5:1)},
      effectDisplay(){return `x${format(this.effect())}`}
    },
    14: {
      title: "Buyable Unlock",
      description: "Unlock Accelerator Boosts.",
      cost: new Decimal(1e7),
    },
    15: {
      title: "Level Up",
      description: "Unlock Skills.",
      cost: new Decimal(3.14e15),
    },
    21: {
      title: "Short & Simple",
      description: "Multiply tuba gain by 1e10.",
      cost: new Decimal(1e50),
      unlocked() {return hasMilestone("to",0)}
    },
    22: {
      title: "Self-Synergy",
      description: "Gain more tubas based on tubas. This is getting meta.",
      tooltip: "Softcaps at 1e112,000,000x",
      cost: new Decimal(1e72),
      unlocked() {return hasMilestone("to",0)},
      effect() {
        let x = player.points.pow(hasUpgrade("p",35)?(hasUpgrade("a",35)?0.11:0.101):0.1).add(1).pow(hasUpgrade("sp",22)?upgradeEffect("sp",22):1)
        if(x.gte("1e1.12e8")) x = x.div("1e1.12e8").pow(0.25).mul("1e1.12e8")
        return x
      },
      effectDisplay(){return `x${format(this.effect())}`}
    },
    23: {
      title: "Virgin Upgrade Bonus",
      description: "Gain more tubas based on prestige upgrades bought. bad upgrade 1/10",
      cost: new Decimal(1e150),
      unlocked() {return hasMilestone("to",0)},
      effect(){return new Decimal(hasUpgrade("a",23)?1000:15).pow(player.p.upgrades.length).pow(hasUpgrade("p",43)?1.5:1)},
      effectDisplay(){return `x${format(this.effect())}`}
    },
    24: {
      title: "Chad Multiplier Buff",
      description: "<span style='font-size:8px'>Add to the Duplicator multiplier per purchase based on prestige points.</span>",
      cost: new Decimal("1e325"),
      unlocked() {return hasMilestone("to",0)},
      effect(){return player.p.points.max(1).log10().pow(0.1).div(2).mul(hasUpgrade("sp",24)?upgradeEffect("sp",24):1)},
      effectDisplay(){return `+${format(this.effect())}`}
    },
    25: {
      title: "Prestige Exponential",
      description: "It's time to pull out the exponents. Prestige points ^1.05!",
      cost: new Decimal("5.55e555"),
      unlocked() {return hasMilestone("to",0)},
    },
    31: {
      title: "Transcension Point Cloning",
      description: "Gain 1e10x more transcension points. Sure, why not.",
      cost: new Decimal("1e147500"),
      unlocked() {return hasMilestone("to",12)},
    },
    32: {
      title: "Transcendental Shards",
      description: "Shards boost transcension point gain at a reduced rate.",
      cost: new Decimal("1e151000"),
      unlocked() {return hasMilestone("to",12)},
      effect(){return shardEffect().pow(0.005).add(1)},
      effectDisplay(){return `x${format(this.effect())}`}
    },
    33: {
      title: "Shards++",
      description: "<span style='font-size:8px'>This isn't a programming language. All shard generators are 1.06x stronger per Shard Generator 4-6 purchased.</span>",
      cost: new Decimal("1e152900"),
      unlocked() {return hasMilestone("to",12)},
      effect(){return Decimal.pow(1.06,getBuyableAmount("sh",21).add(getBuyableAmount("sh",22)).add(getBuyableAmount("sh",23))).pow(hasUpgrade("p",43)?1.5:1)},
      effectDisplay(){return `x${format(this.effect())}`}
    },
    34: {
      title: "Short & Simple II",
      description: "Multiply ascension point gain by 1e100.",
      cost: new Decimal("1e200000"),
      unlocked() {return hasMilestone("to",12)},
    },
    35: {
      title: "Self-Synergy Enhancement",
      description: " <b>Self-Synergy</b> uses a better formula.",
      cost: new Decimal("1e328000"),
      tooltip: "(PP^0.1)+1 -> (PP^0.101)+1",
      unlocked() {return hasMilestone("to",12)},
    },
    41: {
      title: "Quantum Gifts",
      description: "Gain more quarks based on spiritual gifts.",
      tooltip: "Caps at 1.00e25x",
      cost: new Decimal("1e1070000"),
      unlocked() {return hasMilestone("to",20)},
      effect(){return hasUpgrade("a",42) ? player.r.spiritualGifts.pow(1.5).add(1).div(1e25).pow(0.75).mul(1e25) : player.r.spiritualGifts.pow(1.5).add(1).min(1e25)},
      effectDisplay(){return `x${format(this.effect())}`}
    },
    42: {
      title: "Benevolence",
      description: "Gain 25x more spiritual gifts.",
      cost: new Decimal("1e1620000"),
      unlocked() {return hasMilestone("to",20)},
    },
    43: {
      title: "Column Leader",
      description: "The effects of all of the other upgrades in this column are raised ^1.5.",
      cost: new Decimal("1e1860000"),
      unlocked() {return hasMilestone("to",20)},
    },
    44: {
      title: "Spirit Power",
      description: "Harness the power of Ant God and gain 2 free levels for all Spirits!",
      cost: new Decimal("1e5320000"),
      unlocked(){return hasMilestone("to",21)},
    },
    45: {
      title: "Supercharged Score",
      description: "It's the last Prestige Upgrade! Multiply Reincarnation Score by 1,000,000.",
      cost: new Decimal("1e5800000"),
      unlocked(){return hasMilestone("to",21)},
    },
  },
  buyables: {
    11: {
      title: "Prestige Point Doubler",
      cost(x) { return new Decimal(1e8).mul(new Decimal(100).pow(x.mul(inChallenge("t",22)||inChallenge("t",52)?5:1)).pow(Decimal.pow(2,player.en.charges[4]))) },
      display() {return `Double prestige point gain every time you buy this!<br>Times Bought: ${format(getBuyableAmount(this.layer, this.id))}<br>Cost: ${format(this.cost())}<br>Effect: ${format(this.effect())}x prestige points`},
      canAfford() {return player.p.points.gte(this.cost())},
      buy() {
          player.p.points = player.p.points.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        mult = new Decimal(2).pow(x)
        if(hasUpgrade("r",151)) mult = mult.pow(1.05)
        if(inChallenge("r",21)) mult = new Decimal(1)
        return mult
      },
    },
    12: {
      title: "Super Duplicator",
      cost(x) { return new Decimal(1e100).mul(new Decimal(100000).pow(x.mul(inChallenge("t",22)||inChallenge("t",52)?5:1)).pow(Decimal.pow(2,player.en.charges[4]))) },
      display() {return `Only the High Prestiged can afford this. Octuple tuba gain every time you buy this!<br>Times Bought: ${format(getBuyableAmount(this.layer, this.id))}<br>Cost: ${format(this.cost())}<br>Effect: ${format(this.effect())}x tubas`},
      canAfford() {return player.p.points.gte(this.cost())},
      buy() {
          player.p.points = player.p.points.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      unlocked() {return hasMilestone("to",1)},
      effect(x) {
        mult = new Decimal(8).pow(x)
        if(hasUpgrade("r",151)) mult = mult.pow(1.05)
        if(inChallenge("r",21)) mult = new Decimal(1)
        return mult
      },
    },
    13: {
      title: "Ascension Point Tripler",
      cost(x) { return new Decimal("1e72000").mul(new Decimal(1e100).pow(x.mul(inChallenge("t",22)||inChallenge("t",52)?5:1)).pow(Decimal.pow(2,player.en.charges[4]))) },
      display() {return `A lower currency boosting a higher currency? Triple ascension point gain every time you buy this!<br>Times Bought: ${format(getBuyableAmount(this.layer, this.id))}<br>Cost: ${format(this.cost())}<br>Effect: ${format(this.effect())}x ascension points`},
      canAfford() {return player.p.points.gte(this.cost())},
      buy() {
          player.p.points = player.p.points.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      unlocked() {return challengeCompletions("t",22) >= 3},
      effect(x) {
        mult = new Decimal(3).pow(x)
        if(hasUpgrade("r",151)) mult = mult.pow(1.05)
        if(inChallenge("r",21)) mult = new Decimal(1)
        return mult
      },
    },
  },
  milestones: {
  0: {
      requirementDescription: "50 prestige points",
      effectDescription: "Autobuy Generators without subtracting from your tuba amount.",
      done() { return player.p.points.gte(50) },
      toggles: [
        ["n","auto"],
      ]
  },
  1: {
      requirementDescription: "250 prestige points",
      effectDescription: "Autobuy Time Accelerators without subtracting from your tuba amount.",
      done() { return player.p.points.gte(250) },
      toggles: [
        ["n","auto2"],
      ]
  },
  2: {
      requirementDescription: "100,000 prestige points",
      effectDescription: "Autobuy Duplicators without subtracting from your tuba amount.",
      done() { return player.p.points.gte(100000) },
      toggles: [
        ["n","auto3"],
      ]
  },
  3: {
      requirementDescription: "500,000 prestige points",
      effectDescription: "Keep Tuba Upgrades on Prestige.",
      done() { return player.p.points.gte(500000) },
  },
  4: {
      requirementDescription: "1e12 prestige points",
      effectDescription: "Autobuy Accelerator Boosts without subtracting from your tuba amount.",
      done() { return player.p.points.gte(1e12) },
      unlocked() { return hasUpgrade("p",14) || player.a.total.gte(1) },
      toggles: [
        ["n","auto4"],
      ]
  },
  5: {
      requirementDescription: "1e75,000 prestige points",
      effectDescription: "Autobuy the 3rd prestige buyable.",
      done() { return player.p.points.gte("1e75000") },
      unlocked() { return challengeCompletions("t",22) >= 3 },
      toggles: [
        ["p","auto3"],
      ]
  },
  },
})

addLayer("a", {
  name: "ascension", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
  startData() { return {
      unlocked: false,
  points: new Decimal(0),
  prestiges: new Decimal(0),
  }},
  passiveGeneration(){
    return hasMilestone("t", 5) ? globalSpeed() : 0
  },
  tabFormat: [
  "main-display",
  "prestige-button",
  ["display-text", () => `You have made ${format(player.a.total)} total ascension points`],
  ["display-text", () => `You have Ascended ${format(player.a.prestiges)} times<br><br>`],
  () => hasUpgrade("p",15) ? ["display-text", `You will gain ${format(player.p.points.max(1).log10().mul(3).mul(expMult()).floor())} EXP on ascension.<br><br>`] : "",
  "milestones",
  "buyables",
  "blank",
  "upgrades",
  ],
  color: "#D2D900",
  requires: new Decimal(1e36), // Can be a function that takes requirement increases into account
  resource: "ascension points", // Name of prestige currency
  baseResource: "prestige points", // Name of resource prestige is based on
  baseAmount() {return player.p.points}, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.1, // Prestige currency exponent
  gainMult() { // Calculate the multiplier for main currency from bonuses
      mult = new Decimal(1)
      if(hasUpgrade("a",12)) mult = mult.mul(upgradeEffect("a",12))
      if(hasAchievement("g",33)) mult = mult.mul(5)
      mult = mult.mul(shardEffect())
      if(hasUpgrade("t",12)) mult = mult.mul(upgradeEffect("t",12))
      if(hasUpgrade("a",22)) mult = mult.mul(1000)
      mult = mult.mul(challengeEffect("t",11))
      if(hasAchievement("g",54)) mult = mult.mul(player.a.points.min("1e45000").pow(0.05).add(1))
      mult = mult.mul(buyableEffect("p",13))
      if(hasUpgrade("p",34)) mult = mult.mul(1e100)
      if(hasUpgrade("a",31)) mult = mult.mul(upgradeEffect("a",31))
      if(hasUpgrade("r",92)) mult = mult.mul(upgradeEffect("r",92))
      if(hasUpgrade("r",102)) mult = mult.mul(upgradeEffect("r",102))
      mult = mult.mul(energyEffects("boson"))
      mult = mult.mul(Decimal.pow(1e300,challengeCompletions("r",21)**2))
      mult = mult.mul(skillEffects("cloning",3))
      return mult
  },
  gainExp() { // Calculate the exponent on main currency from bonuses
      let exp = new Decimal(1)
      if(inChallenge("t",42)) exp = exp.mul(0.1)
      exp = exp.mul(challengeEffect("t",42))
      if(inChallenge("r",12)) exp = exp.mul(0.25)
      if(hasUpgrade("t",35)) exp = exp.mul(1.001)
      exp = exp.mul(Decimal.pow(2/3,player.en.charges[3]))
      return exp
  },
  row: 2, // Row the layer is in on the tree (0 is the first row)
  position: 0,
  automate(){
    if (player.a.auto && hasMilestone("t",4)) {
      setBuyableAmount("a",11,tmp.a.buyables[11].canAfford?player.a.points.div(1e18).log(1000).div(Decimal.pow(2,player.en.charges[4])).floor().add(1):getBuyableAmount("a",11))
    }
    if (player.a.auto2 && hasMilestone("t",7)) {
      setBuyableAmount("a",12,tmp.a.buyables[12].canAfford?player.a.points.div("1e5800").log(1e50).div(Decimal.pow(2,player.en.charges[4])).floor().add(1):getBuyableAmount("a",12))
    }
    if (player.a.auto3 && hasMilestone("a",4)) {
      setBuyableAmount("a",13,tmp.a.buyables[13].canAfford?player.a.points.div("1e30000").log("1e1000").div(Decimal.pow(2,player.en.charges[4])).floor().add(1):getBuyableAmount("a",13))
    }
  },
  hotkeys: [
      {key: "a", description: "A: Reset for ascension points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
  ],
  branches: ["p"],
  onPrestige() {
    player.a.prestiges = player.a.prestiges.add(hasUpgrade("a",31) ? layers.a.upgrades[31].effect2() : 1)
    if(hasUpgrade("p",15)) player.sk.points = player.sk.points.add(player.p.points.max(1).log10().mul(3).mul(expMult()).floor())
  },
  layerShown() {return hasUpgrade("p",15) || player.a.total.gte(1) || player.t.total.gte(1)},
  doReset(layer) {

  if (!(layers[layer].row > this.row)) return
    
  let hasTokens = hasUpgrade("a", 13)

  let keep = []
  if((layer=="t" || layer=="sb") && hasMilestone("t",2)) keep.push("milestones")
  if((layer=="t" || layer=="sb") && hasMilestone("t",3)) keep.push("upgrades")
  if((layer=="r" || layer=="i" || layer=="sp") && hasMilestone("r",1)) keep.push("milestones")
  if((layer=="r" || layer=="i" || layer=="sp") && hasMilestone("r",3)) keep.push("upgrades")
  if((layer=="t" || layer=="sb" || layer=="r" || layer=="i" || layer=="sp") && hasUpgrade("a",31)) keep.push("prestiges")

  layerDataReset(this.layer, keep)
  
  if (hasTokens && !hasUpgrade("a", 13)) player.a.upgrades.push(13)

  },
  update(diff) {
    if(hasUpgrade("a",43)) player.a.prestiges = player.a.prestiges.add(new Decimal(hasUpgrade("a",31) ? layers.a.upgrades[31].effect2() : 1).mul(diff).mul(globalSpeed()))
  },
  upgrades: {
    11: {
      title: "Ascension Bonus",
      description: "Gain more prestige points based on total ascension points.",
      tooltip: "Softcaps at 1e50x and 1e65,000x",
      cost: new Decimal(5),
      effect(){
        let x = player.a.total.pow(2).add(1) 
        if(x.gte(1e50)) x = x.div(1e50).pow(hasUpgrade("a",45) ? 0.6 : (hasUpgrade("t",15)?0.4:0.25)).mul(1e50)
        if(x.gte("1e65000")) x = x.div("1e65000").pow(hasUpgrade("a",45) ? 0.4 : (hasChallenge("r",21)?0.25:0.1)).mul("1e65000")
        if(inChallenge("t",11) || inChallenge("t",52)) x = new Decimal(1)
        return x
      },
      effectDisplay(){return `x${format(this.effect())}`}
    },
    12: {
      title: "Ascended Tubas",
      description: "Gain more ascension points based on tubas.",
      cost: new Decimal(10),
      effect(){return player.points.add(1).log10().div(10).add(1)},
      effectDisplay(){return `x${format(this.effect())}`}
    },
    13: {
      title: "Tokens!",
      description: "Unlock Tokens.",
      cost: new Decimal(1000),
    },
    14: {
      title: "Large-Scale Mitosis",
      description: "The Cloning Skill gives 2x more free Duplicators.",
      cost: new Decimal(4e9),
    },
    15: {
      title: "Prestige Bonus Enhancement",
      description: "<b>Prestige Bonus</b> uses a better formula.",
      tooltip: "((PP^0.5)*3)+1 -> ((PP^0.55)*10)+1",
      cost: new Decimal(1e25),
    },
    21: {
      title: "Transcended Tubas",
      description: "Gain more transcension points based on tubas.",
      cost: new Decimal(1e130),
      unlocked(){return hasMilestone("to",5)},
      effect(){return player.points.add(1).log10().div(50).add(1)},
      effectDisplay(){return `x${format(this.effect())}`},
    },
    22: {
      title: "Small Ascension Bonus",
      description: "1,000x ascension points. Thank you, very cool",
      cost: new Decimal(1e230),
      unlocked(){return hasMilestone("to",5)},
    },
    23: {
      title: "Scott the Woz",
      description: '<i>"This game blows!"</i><br><b>Virgin Upgrade Bonus</b> is more effective.',
      tooltip: "15^PUs -> 1,000^PUs",
      cost: new Decimal(1e250),
      unlocked(){return hasMilestone("to",5)},
    },
    24: {
      title: "Reverse Bonus",
      description: '<i>"no u" -Xbox player</i><br>Gain more prestige points based on tubas.',
      tooltip: "Softcaps at 1e80,000x",
      cost: new Decimal("1e2150"),
      unlocked(){return hasMilestone("to",5)},
      effect(){return player.points.pow(0.02).add(1).gte("1e80000") ? player.points.pow(0.02).add(1).div("1e80000").pow(hasUpgrade("t",35)?0.275:0.25).mul("1e80000") : player.points.pow(0.02).add(1)},
      effectDisplay(){return `x${format(this.effect())}`},
    },
    25: {
      title: "Hardcap Repellent",
      description: "The <b>Prestige Bonus</b> hardcap is replaced with a softcap.",
      cost: new Decimal("1e2280"),
      unlocked(){return hasMilestone("to",5)},
    },
    31: {
      title: "ASCENDED",
      description() {return `<span style='font-size:8px;'>Ascension points and Ascension count boost each other. Keep Ascension count on Transcension and Reincarnation.</span><br><span style='font-size:8px;'>Currently: x${format(this.effect())} AP, x${format(this.effect2())} Ascensions</span>`},
      tooltip: "Softcaps at 1e18,000x AP, hardcaps at 9e15x Ascensions",
      cost: new Decimal("1e66100"),
      unlocked(){return hasMilestone("to",17)},
      effect(){return player.a.prestiges.pow(10).add(1).pow(hasUpgrade("t",31)?15:1).gte("1e1800") ? player.a.prestiges.pow(10).add(1).pow(hasUpgrade("t",31)?15:1).div("1e1800").pow(0.5).mul("1e1800") : player.a.prestiges.pow(10).add(1).pow(hasUpgrade("t",31)?15:1)},
      effect2(){return hasUpgrade("a",43) ? player.a.points.pow(0.00005).add(1).floor() : player.a.points.pow(0.00005).add(1).floor().min(9e15)},
    },
    32: {
      title: "Shard Multiplier",
      description: "All Shard Generators are more effective based on transcension points.",
      cost: new Decimal("1e81700"),
      unlocked(){return hasMilestone("to",17)},
      effect(){return player.t.points.pow(0.005).add(1)},
      effectDisplay(){return `x${format(this.effect())}`},
    },
    33: {
      title: "Cult of the Generators",
      description: "Shard Generator 6 is 9e15x more effective, and unlock Generator Sacrifice.",
      cost: new Decimal("1e83400"),
      unlocked(){return hasMilestone("to",17)},
    },
    34: {
      title: "Buyable Boost",
      description: "The 2nd ascension buyable effect is raised ^1.03.",
      cost: new Decimal("1e84300"),
      unlocked(){return hasMilestone("to",17)},
    },
    35: {
      title: "Inflation II",
      description: "<b>Self-Synergy</b> uses an even better formula.",
      tooltip: "(PP^0.101)+1 -> (PP^0.11)+1",
      cost: new Decimal("1e97200"),
      unlocked(){return hasMilestone("to",17)},
    },
    41: {
      title: "Unpolluted Sacrifice",
      description: "Remove the softcap to Generator Sacrifice.",
      cost: new Decimal("1e1300000"),
      unlocked(){return hasMilestone("to",23)},
    },
    42: {
      title: "Unpolluted Gifts",
      description: "Replace the <b>Quantum Gifts</b> hardcap with a reduced formula.",
      cost: new Decimal("1e1355000"),
      unlocked(){return hasMilestone("to",23)},
    },
    43: {
      title: "Unpolluted Ascension",
      description: "Passively generate Ascension count, and remove the Ascension count gain hardcap.",
      cost: new Decimal("1e1391000"),
      unlocked(){return hasMilestone("to",23)},
    },
    44: {
      title: "Unpolluted Boosters",
      description: "The 3rd Booster effect softcap starts later based on ascension points.",
      cost: new Decimal("1e1440000"),
      unlocked(){return hasMilestone("to",23)},
      effect(){return player.a.points.max(1).log10().div(1000)},
      effectDisplay(){return `+${format(this.effect())}%`},
    },
    45: {
      title: "Unpolluted Bonus",
      description: "It's the last Ascension Upgrade! Weaken both softcaps for <b>Ascension Bonus</b>.",
      cost: new Decimal("1e1536000"),
      unlocked(){return hasMilestone("to",23)},
    },
  },
  buyables: {
    11: {
      title: "Double Duplicator",
      cost(x) { return new Decimal(1e18).mul(new Decimal(1000).pow(x).pow(Decimal.pow(2,player.en.charges[4]))) },
      display() {return `This buyable's effect is pretty sick. 10,000x tuba gain <i>and</i> 50x prestige point gain every time you buy this!<br>Times Bought: ${format(getBuyableAmount(this.layer, this.id))}<br>Cost: ${format(this.cost())}<br>Effect: ${format(this.effect())}x tubas, ${format(Decimal.pow(50,getBuyableAmount("a",11)))}x PP`},
      canAfford() {return player.a.points.gte(this.cost())},
      buy() {
          player.a.points = player.a.points.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      unlocked() {return hasMilestone("to",2)},
      effect(x) {
        mult = new Decimal(10000).pow(x)
        if(inChallenge("r",21)) mult = new Decimal(1)
        return mult
      },
    },
    12: {
      title: "Tuba Booster",
      cost(x) { return new Decimal("1e5800").mul(new Decimal(1e50).pow(x).pow(Decimal.pow(2,player.en.charges[4]))) },
      display() {return `It's like a Booster, but for tubas. 1e20x tuba gain every time you buy this!<br>Times Bought: ${format(getBuyableAmount(this.layer, this.id))}<br>Cost: ${format(this.cost())}<br>Effect: ${format(this.effect())}x tubas`},
      canAfford() {return player.a.points.gte(this.cost())},
      buy() {
          player.a.points = player.a.points.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      unlocked() {return hasMilestone("to",10)},
      effect(x) {
        mult = new Decimal(1e20).pow(x)
        if(hasUpgrade("a",34)) mult = mult.pow(1.03)
        if(inChallenge("r",21)) mult = new Decimal(1)
        return mult
      },
    },
    13: {
      title: "Government Bribes",
      cost(x) { return new Decimal("1e30000").mul(new Decimal("1e1000").pow(x).pow(Decimal.pow(2,player.en.charges[4]))) },
      display() {return `Don't question it. /1e200 booster cost every time you buy this!<br>Times Bought: ${format(getBuyableAmount(this.layer, this.id))}<br>Cost: ${format(this.cost())}<br>Effect: /${format(this.effect())} booster cost`},
      canAfford() {return player.a.points.gte(this.cost())},
      buy() {
          player.a.points = player.a.points.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      unlocked() {return hasMilestone("to",14)},
      effect(x) {
        mult = new Decimal("1e200").pow(x)
        if(inChallenge("r",21)) mult = new Decimal(1)
        return mult
      },
    },
  },
  milestones: {
  0: {
      requirementDescription: "2 ascension points",
      effectDescription: "Keep prestige milestones on Ascension. You earned those, you should keep 'em!",
      done() { return player.a.points.gte(2) },
  },
  1: {
      requirementDescription: "4 ascension points",
      effectDescription: "Keep Tuba Upgrades and Prestige Upgrades on Ascension, and autobuy the 1st Prestige Buyable.",
      done() { return player.a.points.gte(4) },
      toggles: [
        ["p","auto"],
      ]
  },
  2: {
      requirementDescription: "1,000,000 ascension points",
      effectDescription: "Generate 100% of prestige point gain every second.",
      done() { return player.a.points.gte(1e6) },
  },
  3: {
      requirementDescription: "1e13 ascension points",
      effectDescription: "Autobuy the 2nd prestige buyable.",
      done() { return player.a.points.gte(1e13) },
      toggles: [
        ["p","auto2"],
      ]
  },
  4: {
    requirementDescription: "1e40,000 ascension points",
    effectDescription: "Autobuy the 3rd ascension buyable.",
    done() { return player.a.points.gte("1e40000") },
    unlocked() {return hasMilestone("to",14)},
      toggles: [
        ["a","auto3"],
      ]
},
  },
})

addLayer("b", {
  name: "boosters", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
  startData() { return {
      unlocked: false,
  points: new Decimal(0),
  }},
  autoPrestige() {
    return player.b.auto && hasMilestone("b",0)
  },
  canBuyMax(){
    return hasMilestone("b", 1)
  },
  resetsNothing(){
    return hasMilestone("b", 1)
  },
  tabFormat: [
  ["display-text", () => `You have <h2 style="color: #0000FF; text-shadow: 0px 0px 10px #0000FF">${formatWhole(player.b.points)}</h2> boosters`],
  "blank",
  "prestige-button",
  ["display-text", () => `You have ${format(player.points)} points<br>`],
  ["display-text", () => `You have made ${formatWhole(player.b.total)} boosters in total<br><br>`],
  "milestones",
  "upgrades",
  ["display-text", () => `Your Boosters are boosting:`],
  ["display-text", () => `EXP gain by ${format(boosterEffects(1).mul(100).sub(100))}%`],
  ["display-text", () => `Gain of all tokens by ${format(boosterEffects(2))}x`],
  ["display-text", () => `Accelerator Boost effectiveness by ${format(boosterEffects(3).mul(100).sub(100))}%`],
  () => hasUpgrade("t",22) ? ["display-text", `Shard Generator 1 effectiveness by ${format(boosterEffects(4))}`] : "",
  () => boosterEffects(3).gte(24) ? ["display-text", `<span style="color:red">Accelerator Boost effectiveness multiplier is reduced past ${formatWhole(boosterSoftcapStart())}%</span>`] : "",
  ],
  color: "#0000FF",
  requires: new Decimal("1e1000"), // Can be a function that takes requirement increases into account
  resource: "boosters", // Name of prestige currency
  baseResource: "tubas", // Name of resource prestige is based on
  baseAmount() {return player.points}, // Get the current amount of baseResource
  type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  base() {
    return new Decimal(1e50)
  },
  exponent: new Decimal(1.5),
  gainMult() { // Calculate the multiplier for main currency from bonuses
      mult = new Decimal(1)
      mult = mult.div(buyableEffect("a",13))
      mult = mult.div(buyableEffect("i",22))
      return mult
  },
  gainExp() { // Calculate the exponent on main currency from bonuses
      return new Decimal(1)
  },
  row: 2, // Row the layer is in on the tree (0 is the first row)
  position: 1,
  hotkeys: [
      {key: "b", description: "B: Reset for boosters", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
  ],
  layerShown(){return hasMilestone("to",4)},
  doReset(layer) {

  if (!(layers[layer].row > this.row)) return

  let keep = []
  if((layer=="t" || layer=="sb") && hasMilestone("t",4)) keep.push("milestones")
  if(layer=="t" && hasAchievement("g",51)) keep.push("points")
  if((layer=="r" || layer=="i" || layer=="sp") && hasMilestone("r",1)) keep.push("milestones")

  layerDataReset(this.layer, keep)

  },
  branches: ["p"],
  milestones: {
  0: {
      requirementDescription: "5 boosters",
      effectDescription: "Autobuy boosters.",
      done() { return player.b.points.gte(5) },
      toggles: [
        ["b","auto"],
      ]
  },
  1: {
      requirementDescription: "10 boosters",
      effectDescription: "You can buy max boosters and boosters reset nothing.",
      done() { return player.b.points.gte(10) },
  },
},
})

function boosterEffects(x) {
  switch (x) {
    case 1:
      return Decimal.add(1,player.b.points.div(2).div(Decimal.pow(1.5,player.en.charges[2]))).mul(Decimal.add(1,player.sb.points.div(5)))
    break;
    case 2:
      return Decimal.pow(Decimal.add(3,player.sb.points.div(2)).pow(Decimal.pow(2/3,player.en.charges[2])),player.b.points)
    break;
    case 3:
      let x = Decimal.add(1,player.b.points.div(30).pow(0.75).div(Decimal.pow(1.5,player.en.charges[2]))).mul(Decimal.add(1,player.sb.points.div(50)).min(new Decimal(hasChallenge("r",11)?1.15:1.14).add(hasUpgrade("r",161)?upgradeEffect("r",161):0)))
      if(x.gte(boosterSoftcapStart().div(100).add(1))) x = x.div(boosterSoftcapStart().div(100).add(1)).pow(0.85).mul(boosterSoftcapStart().div(100).add(1))
      return x
    break;
    case 4:
      return hasUpgrade("t",22) ? Decimal.pow(Decimal.pow(1.15,Decimal.pow(2/3,player.en.charges[2])),player.b.points).pow(hasUpgrade("r",152)?Decimal.add(1,player.sb.points.div(5)):new Decimal(1)) : new Decimal(1) 
    break;
  }
}

function boosterSoftcapStart() {
  let x = new Decimal(2300)
  if(hasChallenge("r",22)) x = x.add(700)
  if(hasUpgrade("a",44)) x = x.add(upgradeEffect("a",44))
  return x
}

addLayer("t", {
  name: "transcension", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
  startData() { return {
      unlocked: false,
  points: new Decimal(0),
  prestiges: new Decimal(0),
  divisor: new Decimal(1),
  }},
  passiveGeneration(){
    return hasMilestone("r", 7) ? globalSpeed() : 0
  },
  tabFormat: [
  "main-display",
  "prestige-button",
  ["display-text", () => `You have made ${format(player.t.total)} total transcension points`],
  ["display-text", () => `You have Transcended ${format(player.t.prestiges)} times<br><br>`],
  () => hasMilestone("t",1) ? ["display-text", `You will gain ${format(player.p.points.max(1).log10().mul(20).mul(expMult()).floor())} EXP on transcension.<br><br>`] : "",
  "milestones",
  "buyables",
  "blank",
  "upgrades",
  () => hasMilestone("to",7) ? ["display-text", `Is the game not hard enough? Try some of the Challenges below!<br><br>`] : "",
  () => hasMilestone("to",7) ? "challenges" : "",
  ],
  color: "#C600D8",
  requires: new Decimal(1e100), // Can be a function that takes requirement increases into account
  resource: "transcension points", // Name of prestige currency
  baseResource: "ascension points", // Name of resource prestige is based on
  baseAmount() {return player.a.points}, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.05, // Prestige currency exponent
  gainMult() { // Calculate the multiplier for main currency from bonuses
      mult = new Decimal(1)
      if(hasAchievement("g",45)) mult = mult.mul(2)
      if(hasUpgrade("a",21)) mult = mult.mul(upgradeEffect("a",21))
      if(hasUpgrade("p",31)) mult = mult.mul(1e10)
      if(hasUpgrade("p",32)) mult = mult.mul(upgradeEffect("p",32))
      if(hasUpgrade("r",41)) mult = mult.mul(1e40)
      if(hasUpgrade("r",51)) mult = mult.mul(upgradeEffect("r",51))
      if(hasUpgrade("r",12)) mult = mult.mul(upgradeEffect("r",12))
      mult = mult.mul(energyEffects("lepton"))
      if(hasUpgrade("r",103)) mult = mult.mul(upgradeEffect("r",103))
      if(inChallenge("r",11) || inChallenge("r",12) || inChallenge("r",21) || inChallenge("r",22) || inChallenge("r",31)) mult = mult.mul(1e10)
      if(hasUpgrade("sp",13)) mult = mult.mul(upgradeEffect("sp",13))
      return mult
  },
  gainExp() { // Calculate the exponent on main currency from bonuses
      let exp = new Decimal(1)
      if(hasUpgrade("t",25)) exp = exp.mul(1.02)
      if(hasAchievement("g",74)) exp = exp.mul(1.005)
      exp = exp.mul(challengeCompletions("r",12) >= 5 ? Decimal.add(1.05,(challengeCompletions("r",12) - 5)/500) : Decimal.add(1,challengeCompletions("r",12)/100))
      if(hasUpgrade("t",35)) exp = exp.mul(1.001)
      exp = exp.mul(Decimal.pow(2/3,player.en.charges[3]))
      if(inChallenge("r",22)) exp = exp.mul(0.25)
      return exp
  },
  row: 3, // Row the layer is in on the tree (0 is the first row)
  position: 0,
  hotkeys: [
      {key: "t", description: "T: Reset for transcension points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
  ],
  branches: ["a"],
  onPrestige() {
    player.t.prestiges = player.t.prestiges.add(new Decimal(hasUpgrade("r",52) ? upgradeEffect("r",52) : 1).mul(hasUpgrade("t",33) ? upgradeEffect("t",33) : 1))
    player.t.divisor = new Decimal(1)
    if(hasMilestone("t",1)) player.sk.points = player.sk.points.add(player.p.points.max(1).log10().mul(20).mul(expMult()).floor())
    if(!hasMilestone("t",1)) layerDataReset("sk")
  },
  layerShown() {return hasMilestone("to",4) || player.t.total.gte(1)},
  doReset(layer) {

    if (!(layers[layer].row > this.row)) return
      
    let hasShards = hasMilestone("t",0)

    let keep = []

    if((layer=="r" || layer=="i" || layer=="sp") && hasMilestone("r",2)) keep.push("challenges")
    if((layer=="r" || layer=="i" || layer=="sp") && hasMilestone("r",4)) keep.push("milestones")
    if((layer=="r" || layer=="i" || layer=="sp") && hasMilestone("r",4)) keep.push("upgrades")
    if((layer=="r" || layer=="i" || layer=="sp") && hasMilestone("r",5)) keep.push("prestiges")

    layerDataReset(this.layer, keep)
    
    if (hasShards && !hasMilestone("t", 0)) player.t.milestones.push(0)

  },
  update(diff) {
    player.t.divisor = player.t.divisor.mul(Decimal.pow(inChallenge("t",52)?10:1e100,2**(challengeCompletions("t",12)+1)).pow(diff))
    if(hasAchievement("g",61) && hasMilestone("t",1)) player.sk.points = player.sk.points.add(player.p.points.max(1).log10().mul(20).mul(expMult()).floor().div(5).mul(diff).mul(globalSpeed()))
  },
  upgrades: {
    11: {
      title: "Transcendental Power",
      description: "Multiply prestige point gain by 1,000,000.",
      cost: new Decimal(10),
      unlocked(){return hasMilestone("t",5)},
    },
    12: {
      title: "Transcension Bonus",
      description: "Gain more ascension points based on total transcension points.",
      tooltip: "Softcaps at 1e400,000x",
      cost: new Decimal(10),
      unlocked(){return hasMilestone("t",5)},
      effect() {
        let x = player.t.total.pow(hasUpgrade("t",21)?0.875:0.8).add(1)
        if(x.gt("1e400000")) x = x.div("1e400000").pow(0.25).mul("1e400000")
        return x
      },
      effectDisplay(){return `x${format(this.effect())}`}
    },
    13: {
      title: "Shards+",
      description: "All shard generators are 1.06x stronger per Shard Generator 1-3 purchased.",
      cost: new Decimal(20),
      unlocked(){return hasMilestone("t",5)},
      effect(){return Decimal.pow(1.06,getBuyableAmount("sh",11).add(getBuyableAmount("sh",12)).add(getBuyableAmount("sh",13)))},
      effectDisplay(){return `x${format(this.effect())}`}
    },
    14: {
      title: "Shard Refinery",
      description: "Shards are basically useless! Increase the shard effect exponent from 0.5 to 3.",
      cost: new Decimal(4000),
      unlocked(){return hasMilestone("t",5)},
    },
    15: {
      title: "Inflation I",
      description: "Weaken the softcap for <b>Ascension Bonus</b>.",
      cost: new Decimal(1e27),
      unlocked(){return hasMilestone("t",5)},
    },
    21: {
      title: "Transcension Bonus Enhancement",
      description: "<b>Transcension Bonus</b> uses a better formula.",
      tooltip: "(TP^0.8)+1 -> (TP^0.875)+1",
      cost: new Decimal("1e440"),
      unlocked(){return challengeCompletions("t",32) >= 1},
    },
    22: {
      title: "Boosted Boosters",
      description: "Unlock a new Booster boost that boosts shards. Now that's a mouthful!",
      cost: new Decimal("1e480"),
      unlocked(){return challengeCompletions("t",32) >= 2},
    },
    23: {
      title: "Best For Last",
      description: "Shard Generator 6 is 100,000x more effective.",
      cost: new Decimal("1e630"),
      unlocked(){return challengeCompletions("t",32) >= 2},
    },
    24: {
      title: "Inception^2",
      description: "The Inception Skill multiplies effective levels for itself and the Discount Skill at a reduced rate.",
      tooltip: "Note: Effective levels of the Inception Skill do not boost their own effective levels, as this would tear the fabric of reality",
      cost: new Decimal("1e750"),
      unlocked(){return challengeCompletions("t",32) >= 3},
    },
    25: {
      title: "Hyper Transcension",
      description: "Transcension points are raised ^1.02.",
      cost: new Decimal("1e805"),
      unlocked(){return challengeCompletions("t",32) >= 3},
    },
    31: {
      title: "Actually Ascended",
      description: "The boost to ascension points from <b>ASCENDED</b> is raised ^15.",
      cost: new Decimal("1e8440"),
      unlocked(){return hasMilestone("to",21)},
    },
    32: {
      title: "New Challenges Approach",
      description: "Gain 10x more quarks, and unlock 2 new Challenges.",
      cost: new Decimal("1e13200"),
      unlocked(){return hasMilestone("to",21)},
    },
    33: {
      title: "True Transcension",
      description: "<span style='font-size:8px'>Gain more Transcension count based on Transcension count, and <b>Prestige Count Effect</b> is squared.</span>",
      cost: new Decimal("1e30000"),
      unlocked(){return hasMilestone("to",21)},
      effect(){return player.t.prestiges.pow(0.4).add(1)},
      effectDisplay(){return `x${format(this.effect())}`}
    },
    34: {
      title: "Winter Shards",
      description: "Gain more spiritual gifts based on shards.",
      cost: new Decimal("1e40000"),
      unlocked(){return hasMilestone("to",21)},
      effect(){return player.sh.points.max(1).log10().div(100)},
      effectDisplay(){return `x${format(this.effect())}`}
    },
    35: {
      title: "Double Exponent",
      description: "Ascension points and transcension points are raised ^1.001, and weaken the <b>Reverse Bonus</b> softcap.",
      cost: new Decimal("1e44700"),
      unlocked(){return hasMilestone("to",21)},
    },
  },
  milestones: {
  0: {
      requirementDescription: "1 total transcension point",
      effectDescription: "Permanently unlock Shards.",
      done() { return player.t.total.gte(1) },
  },
  1: {
      requirementDescription: "2 total transcension points",
      effectDescription: "Keep prestige milestones, EXP, and Skills on Transcension, and you now gain EXP from transcensions.",
      done() { return player.t.total.gte(2) },
  },
  2: {
      requirementDescription: "3 total transcension points",
      effectDescription: "Keep ascension milestones on Transcension.",
      done() { return player.t.total.gte(3) },
  },
  3: {
      requirementDescription: "4 total transcension points",
      effectDescription: "Keep all previous upgrades on Transcension.",
      done() { return player.t.total.gte(4) },
  },
  4: {
      requirementDescription: "5 total transcension points",
      effectDescription: "Autobuy the 1st ascension buyable, and keep booster milestones on Transcension.",
      done() { return player.t.total.gte(5) },
      toggles: [
        ["a","auto"],
      ]
  },
  5: {
      requirementDescription: "8 total transcension points",
      effectDescription: "Generate 100% of ascension point gain every second. Unlock the 1st row of Transcension Upgrades.",
      done() { return player.t.total.gte(8) },
  },
  6: {
      requirementDescription: "1e100 transcension points",
      effectDescription: "Autobuy Shard Generators 1-3.",
      done() { return player.t.points.gte(1e100) },
      unlocked() {return hasMilestone("to",7)},
      toggles: [
        ["sh","auto"],
      ]
  },
  7: {
      requirementDescription: "1e300 transcension points",
      effectDescription: "Autobuy the 2nd ascension buyable and Shard Generators 4-6.",
      done() { return player.t.points.gte(1e300) },
      unlocked() {return hasMilestone("to",10)},
      toggles: [
        ["a","auto2"],
        ["sh","auto2"],
      ]
  },
  },
  challenges: {
    11: {
      name: "Impotence",
      challengeDescription: '<i>Who needs upgrades? They do basically nothing now.</i><br>The multiplier from <b>Ascension Bonus</b> is 1x.',
      goalDescription: function() {return `Reach ${format(tmp[this.layer].challenges[this.id].goal)} ascension points.`},
      rewardDescription: function() {return `Gain 1e50x more ascension points per completion.<br>Currently: ${format(tmp[this.layer].challenges[this.id].rewardEffect)}x<br>Completions: ${challengeCompletions(this.layer,this.id)}/3`},
      completionLimit: 3,
      canComplete: function() {return player.a.points.gte(tmp[this.layer].challenges[this.id].goal)},
      goal() {
        return [
          new Decimal("1e600"),
          new Decimal("1e2500"),
          new Decimal("1e2950"),
          new Decimal(Infinity)
        ][challengeCompletions(this.layer, this.id)]
      },
      rewardEffect() {
        return Decimal.pow(1e50,challengeCompletions(this.layer,this.id))
      },
    },
    12: {
      name: "Quick Slowdown",
      challengeDescription: '<i>Presto!...where\'d the production go?</i><br>Tuba production gets worse over time, and decays faster based on completions.',
      goalDescription: function() {return `Reach ${format(tmp[this.layer].challenges[this.id].goal)} ascension points.`},
      rewardDescription: function() {return `Power tuba gain based on completions.<br>Currently: ^${regularFormat(tmp[this.layer].challenges[this.id].rewardEffect,3)}<br>Completions: ${challengeCompletions(this.layer,this.id)}/3`},
      completionLimit: 3,
      canComplete: function() {return player.a.points.gte(tmp[this.layer].challenges[this.id].goal)},
      goal() {
        return [
          new Decimal("1e1150"),
          new Decimal("1e3300"),
          new Decimal("1e5400"),
          new Decimal(Infinity)
        ][challengeCompletions(this.layer, this.id)]
      },
      rewardEffect() {
        let x = new Decimal(0)
        if(challengeCompletions(this.layer, this.id) == 1) x = new Decimal(1)
        if(challengeCompletions(this.layer, this.id) == 2) x = new Decimal(4)
        if(challengeCompletions(this.layer, this.id) >= 3) x = new Decimal(7)
        return Decimal.add(1,(x)/200)
      },
      onEnter() {
        player.t.divisor = new Decimal(1)
      }
    },
    21: {
      name: "No Shards",
      challengeDescription: '<i>Polynomial growth is for math nerds only.</i><br>Shards are useless.',
      goalDescription: function() {return `Reach ${format(tmp[this.layer].challenges[this.id].goal)} ascension points.`},
      rewardDescription: function() {return `Shard generators are 100x stronger per completion.<br>Currently: ${format(tmp[this.layer].challenges[this.id].rewardEffect)}x<br>Completions: ${challengeCompletions(this.layer,this.id)}/3`},
      completionLimit: 3,
      canComplete: function() {return player.a.points.gte(tmp[this.layer].challenges[this.id].goal)},
      goal() {
        return [
          new Decimal("1e1100"),
          new Decimal("1e2650"),
          new Decimal("1e3920"),
          new Decimal(Infinity)
        ][challengeCompletions(this.layer, this.id)]
      },
      rewardEffect() {
        return Decimal.pow(100,challengeCompletions(this.layer,this.id))
      },
    },
    22: {
      name: "Higher Costs",
      challengeDescription: '<i>Hasn\'t been the same since those gas prices increased...</i><br>Prestige buyables scale 5x faster.',
      goalDescription: function() {return `Reach ${format(tmp[this.layer].challenges[this.id].goal)} ascension points.`},
      rewardDescription: function() {return `Add 3 to the Duplicator multiplier per purchase per completion. At 3 completions, unlock the 3rd prestige buyable.<br>Currently: +${format(tmp[this.layer].challenges[this.id].rewardEffect)}<br>Completions: ${challengeCompletions(this.layer,this.id)}/3`},
      completionLimit: 3,
      canComplete: function() {return player.a.points.gte(tmp[this.layer].challenges[this.id].goal)},
      goal() {
        return [
          new Decimal("1e810"),
          new Decimal("1e3500"),
          new Decimal("1e5000"),
          new Decimal(Infinity)
        ][challengeCompletions(this.layer, this.id)]
      },
      rewardEffect() {
        return challengeCompletions(this.layer,this.id)*3
      },
    },
    31: {
      name: "Anti-Prestigious",
      challengeDescription: '<i>No more EXP grinding? Sign me up!</i><br>Prestige points are raised ^0.25. The Temporal Skill and Cloning Skill are disabled.',
      goalDescription: function() {return `Reach ${format(tmp[this.layer].challenges[this.id].goal)} ascension points.`},
      rewardDescription: function() {return `Power prestige point gain based on completions.<br>Currently: ^${regularFormat(tmp[this.layer].challenges[this.id].rewardEffect,3)}<br>Completions: ${challengeCompletions(this.layer,this.id)}/3`},
      completionLimit: 3,
      canComplete: function() {return player.a.points.gte(tmp[this.layer].challenges[this.id].goal)},
      goal() {
        return [
          new Decimal("1e1360"),
          new Decimal("1e1910"),
          new Decimal("1e2590"),
          new Decimal(Infinity)
        ][challengeCompletions(this.layer, this.id)]
      },
      rewardEffect() {
        if(challengeCompletions(this.layer, this.id) == 0) return new Decimal(1)
        if(challengeCompletions(this.layer, this.id) == 1) return new Decimal(1.02)
        if(challengeCompletions(this.layer, this.id) == 2) return new Decimal(1.03)
        if(challengeCompletions(this.layer, this.id) >= 3) return new Decimal(1.035)
      },
    },
    32: {
      name: "Financial Recession",
      challengeDescription: '<i>You\'re not gonna like this one.</i><br>Tubas are raised ^0.01. Good luck lmao',
      goalDescription: function() {return `Reach ${format(tmp[this.layer].challenges[this.id].goal)} ascension points.`},
      rewardDescription: function() {return `Unlock new Transcension Upgrades based on completions.<br>Currently: ${formatWhole(tmp[this.layer].challenges[this.id].rewardEffect)} new Transcension Upgrades<br>Completions: ${challengeCompletions(this.layer,this.id)}/3`},
      completionLimit: 3,
      canComplete: function() {return player.a.points.gte(tmp[this.layer].challenges[this.id].goal)},
      goal() {
        return [
          new Decimal("1e2350"),
          new Decimal("1e2580"),
          new Decimal("1e3800"),
          new Decimal(Infinity)
        ][challengeCompletions(this.layer, this.id)]
      },
      rewardEffect() {
        return new Decimal((challengeCompletions(this.layer,this.id)*2)-1).max(0)
      },
    },
    41: {
      name: "<span style='font-size:14px'><b>No Accelerators/Duplicators</b></span>",
      challengeDescription: '<i>Buyables cause too much inflation. Let\'s take them out!</i><br>Time Accelerators and Duplicators are disabled.',
      goalDescription: function() {return `Reach ${format(tmp[this.layer].challenges[this.id].goal)} ascension points.`},
      rewardDescription: function() {return `Gain 1e500x more tubas per completion.<br>Currently: ${format(tmp[this.layer].challenges[this.id].rewardEffect)}x<br>Completions: ${challengeCompletions(this.layer,this.id)}/3`},
      completionLimit: 3,
      canComplete: function() {return player.a.points.gte(tmp[this.layer].challenges[this.id].goal)},
      goal() {
        return [
          new Decimal("1e10500"),
          new Decimal("1e12900"),
          new Decimal("1e16400"),
          new Decimal(Infinity)
        ][challengeCompletions(this.layer, this.id)]
      },
      unlocked() {return hasMilestone("to",13)},
      rewardEffect() {
        return Decimal.pow("1e500",challengeCompletions(this.layer,this.id))
      },
    },
    42: {
      name: "Anti-Ascension",
      challengeDescription: '<i>The High Gods banned you from their plane of existence...</i><br>Ascension points are raised ^0.1.',
      goalDescription: function() {return `Reach ${format(tmp[this.layer].challenges[this.id].goal)} ascension points.`},
      rewardDescription: function() {return `Power ascension point gain based on completions.<br>Currently: ^${regularFormat(tmp[this.layer].challenges[this.id].rewardEffect,3)}<br>Completions: ${challengeCompletions(this.layer,this.id)}/3`},
      completionLimit: 3,
      canComplete: function() {return player.a.points.gte(tmp[this.layer].challenges[this.id].goal)},
      goal() {
        return [
          new Decimal("1e800"),
          new Decimal("1e1000"),
          new Decimal("1e1350"),
          new Decimal(Infinity)
        ][challengeCompletions(this.layer, this.id)]
      },
      unlocked() {return hasMilestone("to",13)},
      rewardEffect() {
        return Decimal.add(1,challengeCompletions(this.layer,this.id)/200)
      },
    },
    51: {
      name: "Power Outage",
      challengeDescription: '<i>Wow, there\'s more of these?</i><br>All effects from Energies are disabled. (this challenge is super weak)',
      goalDescription: function() {return `Reach ${format(tmp[this.layer].challenges[this.id].goal)} ascension points.`},
      rewardDescription: function() {return `Gain 5x more Reincarnation Score per completion.<br>Currently: ${format(tmp[this.layer].challenges[this.id].rewardEffect)}x<br>Completions: ${challengeCompletions(this.layer,this.id)}/3`},
      completionLimit: 3,
      canComplete: function() {return player.a.points.gte(tmp[this.layer].challenges[this.id].goal)},
      goal() {
        return [
          new Decimal("1e209000"),
          new Decimal("1e323000"),
          new Decimal("1e450000"),
          new Decimal(Infinity)
        ][challengeCompletions(this.layer, this.id)]
      },
      unlocked() {return hasUpgrade("t",32)},
      rewardEffect() {
        return Decimal.pow(5,challengeCompletions(this.layer,this.id))
      },
    },
    52: {
      name: "Sadistic I",
      challengeDescription: '<i>I\'m sorry for what I\'ve unleashed onto the world.</i><br>The first 6 Challenges, all at once. The tuba divisor grows slower.',
      goalDescription: function() {return `Reach ${format(tmp[this.layer].challenges[this.id].goal)} ascension points.`},
      rewardDescription: function() {return `Gain 10,000x more quarks per completion. (100x post-softcap)<br>Currently: ${format(tmp[this.layer].challenges[this.id].rewardEffect)}x<br>Completions: ${challengeCompletions(this.layer,this.id)}/3`},
      completionLimit: 3,
      canComplete: function() {return player.a.points.gte(tmp[this.layer].challenges[this.id].goal)},
      goal() {
        return [
          new Decimal("1e17300"),
          new Decimal("1e23500"),
          new Decimal("1e33900"),
          new Decimal(Infinity)
        ][challengeCompletions(this.layer, this.id)]
      },
      unlocked() {return hasUpgrade("t",32)},
      rewardEffect() {
        return Decimal.pow(10000,challengeCompletions(this.layer,this.id))
      },
      onEnter() {
        player.t.divisor = new Decimal(1)
      }
    },
},
})

addLayer("sb", {
  name: "super-boosters", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "SB", // This appears on the layer's node. Default is the id with the first letter capitalized
  startData() { return {
      unlocked: false,
  points: new Decimal(0),
  boosts: [null,false,false,false,false],
  }},
  tabFormat: [
  ["display-text", () => `You have <h2 style="color: #0000CC; text-shadow: 0px 0px 10px #0000CC">${formatWhole(player.sb.points)}</h2> super-boosters`],
  "blank",
  "prestige-button",
  ["display-text", () => `You have ${format(player.b.points)} boosters<br>`],
  ["display-text", () => `You have made ${formatWhole(player.sb.total)} super-boosters in total<br><br>`],
  "milestones",
  "upgrades",
  ["display-text", () => `Your Super-Boosters are boosting:`],
  ["display-text", () => `EXP gain multiplier from boosters - ${format(Decimal.add(1,player.sb.points.div(5)))}x`],
  ["display-text", () => `Token gain booster base - +${format(player.sb.points.div(2))}`],
  ["display-text", () => `Accelerator Boost effectiveness - ${format(Decimal.add(1,player.sb.points.div(50)).min(new Decimal(hasChallenge("r",11)?1.15:1.14).add(hasUpgrade("r",161)?upgradeEffect("r",161):0)))}x ${player.sb.points.gte(7) ? "(capped)" : ""}`],
  () => hasUpgrade("t",22) && hasUpgrade("r",152) ? ["display-text", `Shard Generator 1 multiplier from Boosters - ^${format(Decimal.add(1,player.sb.points.div(5)))}`] : ""
  ],
  color: "#0000CC",
  requires: new Decimal(95), // Can be a function that takes requirement increases into account
  resource: "super-boosters", // Name of prestige currency
  baseResource: "boosters", // Name of resource prestige is based on
  baseAmount() {return player.b.points}, // Get the current amount of baseResource
  type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  base() {
    return new Decimal(1.2)
  },
  exponent: new Decimal(1.05),
  gainMult() { // Calculate the multiplier for main currency from bonuses
      mult = new Decimal(1)
      return mult
  },
  gainExp() { // Calculate the exponent on main currency from bonuses
      return new Decimal(1)
  },
  row: 3, // Row the layer is in on the tree (0 is the first row)
  position: 1,
  hotkeys: [
      {key: "B", description: "Shift+B: Reset for super-boosters", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
  ],
  layerShown(){return hasMilestone("to",9)},
  doReset(layer) {

  if (!(layers[layer].row > this.row)) return

  let keep = []

  if((layer=="r" || layer=="i" || layer=="sp") && hasMilestone("r",5)) keep.push("points")

  layerDataReset(this.layer, keep)

  },
  branches: ["b"],
})

addLayer("r", {
  name: "reincarnation", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
  startData() { return {
      unlocked: false,
  points: new Decimal(0),
  prestiges: new Decimal(0),
  soulOrbs: new Decimal(0),
  totalOrbs: new Decimal(0),
  fastest: 1e8,
  autoFlavors: false,
  sacrificeMult: new Decimal(1),
  freeOrbsGiven: false,
  freeOrbsGiven2: false,
  spiritualGifts: new Decimal(0),
  }},
  passiveGeneration(){
    return hasUpgrade("r", 131) ? Decimal.mul(0.01,globalSpeed()) : 0
  },
  tabFormat: {
    "Main": {
      content: [
        "main-display",
        "prestige-button",
        ["display-text", () => `You have made ${format(player.r.total)} total quarks`],
        ["display-text", () => `You have Reincarnated ${format(player.r.prestiges)} times`],
        ["display-text", () => `Your fastest Reincarnation was in ${formatTime(player.r.fastest)}<br><br>`],
        () => getResetGain("r").gte(1e100) ? ["display-text", `<span style="color:red">Quark gain is divided by ${format(getResetGain("r").div(1e100))}</span><br><br>`] : "",
        "milestones",
        "blank",
        ["upgrades",[1,2]],
        () => hasMilestone("to",18) ? "challenges" : "",
      ],
    },
    "Upgrade Tree": {
      content: [
        ["display-text", () => `You have <h2 style="color: #00AE23; text-shadow: 0px 0px 10px #00AE23">${formatWhole(player.r.soulOrbs)}</h2> soul orbs<br>(${formatWhole(player.r.totalOrbs)} total)`],
        "blank",
        ["buyables",[1]],
        "blank",
        ["upgrade-tree",[[31],[41,42],[51,52],[61,62],[71],[81,82,83],[91,92,93],[101,102,103],[111],[121,122],[131],[141],[151,152,153,154],[161,162],[171]]],
      ],
    },
    "Spirits": {
      unlocked() {return hasMilestone("to",19)},
      content: [
        ["display-text", () => `You have <h2 style="color: #DDAE00; text-shadow: 0px 0px 10px #DDAE00">${format(player.r.spiritualGifts)}</h2> spiritual gifts<br>
        You are generating ${format(buyableEffect("r",21).mul(buyableEffect("r",22)).mul(spiritGiftMult()))} spiritual gifts per second.<br>
        You can spend spiritual gifts on Spirits, which are buyables that raise the effects of Energies.`],
        "blank",
        ["buyables",[2,3,4]],
      ],
    },
  },
  color: "#00AE23",
  requires: new Decimal("1e2580"), // Can be a function that takes requirement increases into account
  resource: "quarks", // Name of prestige currency
  baseResource: "transcension points", // Name of resource prestige is based on
  baseAmount() {return player.t.points}, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.008, // Prestige currency exponent
  gainMult() { // Calculate the multiplier for main currency from bonuses
      mult = new Decimal(1)
      if(hasUpgrade("r",42)) mult = mult.mul(5)
      if(hasAchievement("g",81)) mult = mult.mul(2)
      if(hasUpgrade("r",14)) mult = mult.mul(upgradeEffect("r",14))
      if(hasUpgrade("p",41)) mult = mult.mul(upgradeEffect("p",41))
      if(hasUpgrade("t",32)) mult = mult.mul(10)
      mult = mult.mul(challengeEffect("t",52))
      mult = mult.mul(Decimal.pow(1e5,challengeCompletions("r",22)**1.1))
      mult = mult.mul(buyableEffect("i",31))
      if(hasUpgrade("sp",23)) mult = mult.mul(upgradeEffect("sp",23))
      if(hasUpgrade("r",171)) mult = mult.mul(upgradeEffect("r",171))
      return mult
  },
  gainExp() { // Calculate the exponent on main currency from bonuses
      let exp = new Decimal(1)
      if(hasUpgrade("r",21)) exp = exp.mul(1.03)
      return exp
  },
  row: 4, // Row the layer is in on the tree (0 is the first row)
  position: 1,
  automate(){
    if (player.r.auto && hasMilestone("r",10)) {
      while (player.t.points.gte(layers.r.buyables[11].cost())) {
        layers.r.buyables[11].buy()
      }
      while (player.r.points.gte(layers.r.buyables[12].cost())) {
        layers.r.buyables[12].buy()
      }
    }
    if (player.r.auto2 && hasMilestone("r",10)) {
      setBuyableAmount("r",21,tmp.r.buyables[21].canAfford?player.r.points.div("1e45").log(10).floor().add(1):getBuyableAmount("r",21))
      setBuyableAmount("r",22,tmp.r.buyables[22].canAfford?player.r.points.div("1e50").log(1e5).floor().add(1):getBuyableAmount("r",22))
    }
  },
  hotkeys: [
      {key: "r", description: "R: Reset for quarks", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
  ],
  branches: ["t"],
  onPrestige() {
    if (player.r.resetTime < player.r.fastest) {
      player.r.fastest = player.r.resetTime
    }
    player.r.prestiges = player.r.prestiges.add(1)
    let arr = [player.sk.rarities.temporal,player.sk.rarities.cloning,player.sk.rarities.inception,player.sk.rarities.discount,player.sk.rarities.wisdom]
    layerDataReset("sk")
    layerDataReset("sh")
    player.sk.rarities.temporal = arr[0]
    player.sk.rarities.cloning = arr[1]
    player.sk.rarities.inception = arr[2]
    player.sk.rarities.discount = arr[3]
    player.sk.rarities.wisdom = arr[4]
  },
  layerShown() {return hasMilestone("to",14) || player.r.total.gte(1)},
  update(diff) {
    if (hasAchievement("g",84) && !player.r.freeOrbsGiven) {
      player.r.soulOrbs = player.r.soulOrbs.add(3)
      player.r.totalOrbs = player.r.totalOrbs.add(3)
      player.r.freeOrbsGiven = true
    }
    if (hasAchievement("g",116) && !player.r.freeOrbsGiven2) {
      player.r.soulOrbs = player.r.soulOrbs.add(30)
      player.r.totalOrbs = player.r.totalOrbs.add(30)
      player.r.freeOrbsGiven2 = true
    }
    player.r.spiritualGifts = player.r.spiritualGifts.add(buyableEffect("r",21).mul(buyableEffect("r",22)).mul(spiritGiftMult()).mul(diff).mul(globalSpeed()))
  },
  upgrades: {
    11: {
      title: "Small Tuba Exponent",
      description: "You're starting to regain memories of your past lives...Tubas are raised ^1.001.",
      cost: new Decimal(5),
    },
    12: {
      title: "Reincarnation Bonus",
      description: "Gain more transcension points based on total quarks.",
      cost: new Decimal(1e6),
      effect(){return player.r.total.pow(1.25).add(1)},
      effectDisplay(){return `x${format(this.effect())}`}
    },
    13: {
      title: "Quarked Up",
      description: "Gain more Reincarnation Score based on total quarks.",
      cost: new Decimal(1e16),
      effect(){return player.r.total.max(10).log(4).pow(hasUpgrade("r",122)?2:1)},
      effectDisplay(){return `x${format(this.effect())}`}
    },
    14: {
      title: "Reincarnated Tubas",
      description: "We're just recycling upgrade ideas at this point. Gain more quarks based on tubas.",
      cost: new Decimal(2e18),
      effect(){return player.points.max(10).log2().sqrt()},
      effectDisplay(){return `x${format(this.effect())}`}
    },
    15: {
      title: "Big Brain Time",
      description: "The Inception Skill multiplies effective levels for the 5th Skill at a reduced rate.",
      cost: new Decimal(1e45),
    },
    21: {
      title: "Exceptional Exponents",
      description: "I'm bored. Quark gain is raised ^1.03.",
      cost: new Decimal(1e225),
      unlocked(){return hasAchievement("g",94)},
    },
    22: {
      title: "Gift Sale",
      description: "Gain 1,000,000x more spiritual gifts!",
      cost: new Decimal("1e385"),
      unlocked(){return hasAchievement("g",94)},
    },
    23: {
      title: "Three's a Crowd",
      description: "You can buy all paths from the 3-way split. It was coming sooner or later.",
      cost: new Decimal("1e440"),
      unlocked(){return hasAchievement("g",94)},
    },
    24: {
      title: "Incrementy Multiplier",
      description: "Gain more incrementy based on transcension points.",
      cost: new Decimal("1e550"),
      unlocked(){return hasMilestone("r",9)},
      effect(){return player.t.points.pow(7.5e-6).max(1)},
      effectDisplay(){return `x${format(this.effect())}`}
    },
    25: {
      title: "Super EXP",
      description: "Gain more super-prestige points based on experience.",
      cost: new Decimal("1e1380"),
      unlocked(){return hasMilestone("r",9)},
      effect(){return player.sk.points.pow(0.01).add(1)},
      effectDisplay(){return `x${format(this.effect())}`}
    },
    31: {
      title: "Welcome to Reincarnation!",
      description: "Boost SG1 effectiveness based on time spent in this Reincarnation.",
      cost: new Decimal(1),
      currencyDisplayName: "soul orbs",
      currencyInternalName: "soulOrbs",
      currencyLayer: "r",
      effect(){return new Decimal(player.r.resetTime).mul(globalSpeed()).pow(1.5).add(1)},
      effectDisplay(){return `x${format(this.effect())}`}
    },
    41: {
      title: "Transcendent Mult",
      description: "Gain 1e40x more transcension points.",
      cost: new Decimal(2),
      currencyDisplayName: "soul orbs",
      currencyInternalName: "soulOrbs",
      currencyLayer: "r",
      branches: [31],
      canAfford() {return hasUpgrade("r",31)},
    },
    42: {
      title: "Reincarnated Mult",
      description: "Gain 5x more quarks.",
      cost: new Decimal(2),
      currencyDisplayName: "soul orbs",
      currencyInternalName: "soulOrbs",
      currencyLayer: "r",
      branches: [31],
      canAfford() {return hasUpgrade("r",31)},
    },
    51: {
      title: "Prestige Count Effect",
      description: "Gain more transcension points based on times Transcended.",
      cost: new Decimal(3),
      currencyDisplayName: "soul orbs",
      currencyInternalName: "soulOrbs",
      currencyLayer: "r",
      branches: [41],
      canAfford() {return hasUpgrade("r",41)},
      effect(){return player.t.prestiges.pow(20).add(1).pow(hasUpgrade("t",33)?2:1)},
      effectDisplay(){return `x${format(this.effect())}`}
    },
    52: {
      title: "Prestige Count Mult",
      description: "Multiply Transcension count gain by your Shard Generator 6 amount.",
      cost: new Decimal(3),
      currencyDisplayName: "soul orbs",
      currencyInternalName: "soulOrbs",
      currencyLayer: "r",
      branches: [42],
      canAfford() {return hasUpgrade("r",42)},
      effect(){return getBuyableAmount("sh",23)},
      effectDisplay(){return `x${format(this.effect())}`}
    },
    61: {
      title: "Prestige Count Effect II",
      description: "Gain more EXP based on times Transcended.",
      cost: new Decimal(6),
      currencyDisplayName: "soul orbs",
      currencyInternalName: "soulOrbs",
      currencyLayer: "r",
      branches: [51],
      canAfford() {return hasUpgrade("r",51)},
      effect(){return player.t.prestiges.cbrt().add(1)},
      effectDisplay(){return `x${format(this.effect())}`}
    },
    62: {
      title: "Skill Slowdown",
      description: "Cost scaling for the first 5 Skills is slower.",
      cost: new Decimal(10),
      currencyDisplayName: "soul orbs",
      currencyInternalName: "soulOrbs",
      currencyLayer: "r",
      branches: [52],
      canAfford() {return hasUpgrade("r",52)},
    },
    71: {
      title: "Cleansing the World",
      description: "All Shard Generators are 1e10x stronger. (unaffected by Charges)",
      cost: new Decimal(16),
      currencyDisplayName: "soul orbs",
      currencyInternalName: "soulOrbs",
      currencyLayer: "r",
      branches: [61,62],
      canAfford() {return hasUpgrade("r",61) || hasUpgrade("r",62)},
    },
    81: {
      title: "Skilled Sacrifice",
      description: "Generator Sacrifice affects EXP gain at a reduced rate.",
      cost: new Decimal(5),
      currencyDisplayName: "soul orbs",
      currencyInternalName: "soulOrbs",
      currencyLayer: "r",
      branches: [71],
      canAfford() {return hasUpgrade("r",71) && ((hasAchievement("g",96) ? (!(hasUpgrade("r",82) && hasUpgrade("r",83))) : (!(hasUpgrade("r",82) || hasUpgrade("r",83)))) || hasUpgrade("r",23))},
      effect(){return player.r.sacrificeMult.max(10).log10().mul(2)},
      effectDisplay(){return `x${format(this.effect())}`},
      style() {
        const style = {};
        if (hasUpgrade(this.layer,this.id)) style["background-color"] = "#0070CC";
        else if (canAffordUpgrade(this.layer,this.id)) style["background-color"] = "#88BBFF";
        return style;
      },
    },
    82: {
      title: "Monetary Sacrifice",
      description: "Generator Sacrifice affects the gain of all Tokens at an reduced rate.",
      cost: new Decimal(5),
      currencyDisplayName: "soul orbs",
      currencyInternalName: "soulOrbs",
      currencyLayer: "r",
      branches: [71],
      canAfford() {return hasUpgrade("r",71) && ((hasAchievement("g",96) ? (!(hasUpgrade("r",81) && hasUpgrade("r",83))) : (!(hasUpgrade("r",81) || hasUpgrade("r",83)))) || hasUpgrade("r",23))},
      effect(){return player.r.sacrificeMult.sqrt().add(1)},
      effectDisplay(){return `x${format(this.effect())}`},
      style() {
        const style = {};
        if (hasUpgrade(this.layer,this.id)) style["background-color"] = "#D2D900";
        else if (canAffordUpgrade(this.layer,this.id)) style["background-color"] = "#FFFF99";
        return style;
      },
    },
    83: {
      title: "Flavorful Sacrifice",
      description: "Generator Sacrifice affects gain of all Shard Flavors at a reduced rate.",
      cost: new Decimal(7),
      currencyDisplayName: "soul orbs",
      currencyInternalName: "soulOrbs",
      currencyLayer: "r",
      branches: [71],
      canAfford() {return hasUpgrade("r",71) && ((hasAchievement("g",96) ? (!(hasUpgrade("r",81) && hasUpgrade("r",82))) : (!(hasUpgrade("r",81) || hasUpgrade("r",82)))) || hasUpgrade("r",23))},
      effect(){return player.r.sacrificeMult.cbrt().add(1)},
      effectDisplay(){return `x${format(this.effect())}`},
      style() {
        const style = {};
        if (hasUpgrade(this.layer,this.id)) style["background-color"] = "#C600D8";
        else if (canAffordUpgrade(this.layer,this.id)) style["background-color"] = "#FF99FF";
        return style;
      },
    },
    91: {
      title: "Quantized Prestige",
      description: "Gain more prestige points based on unspent quarks.",
      cost: new Decimal(12),
      currencyDisplayName: "soul orbs",
      currencyInternalName: "soulOrbs",
      currencyLayer: "r",
      branches: [81],
      canAfford() {return hasUpgrade("r",81)},
      effect(){
        let x = player.r.points.pow(250).add(1)
        if(!hasAchievement("g",101)) x = x.min("1e50000")
        x = x.min("1e1800000")
        return x
      },
      effectDisplay(){return `x${format(this.effect())}`},
      style() {
        const style = {};
        if (hasUpgrade(this.layer,this.id)) style["background-color"] = "#0070CC";
        else if (canAffordUpgrade(this.layer,this.id)) style["background-color"] = "#88BBFF";
        return style;
      },
    },
    92: {
      title: "Quantized Ascension",
      description: "Gain more ascension points based on unspent quarks.",
      cost: new Decimal(12),
      currencyDisplayName: "soul orbs",
      currencyInternalName: "soulOrbs",
      currencyLayer: "r",
      branches: [82],
      canAfford() {return hasUpgrade("r",82)},
      effect(){
        let x = player.r.points.pow(25).add(1)
        if(!hasAchievement("g",101)) x = x.min("1e5000")
        x = x.min("1e180000")
        return x
      },
      effectDisplay(){return `x${format(this.effect())}`},
      style() {
        const style = {};
        if (hasUpgrade(this.layer,this.id)) style["background-color"] = "#D2D900";
        else if (canAffordUpgrade(this.layer,this.id)) style["background-color"] = "#FFFF99";
        return style;
      },
    },
    93: {
      title: "Quantized Shards",
      description: "Shard Generator 1 is more effective based on unspent quarks.",
      cost: new Decimal(12),
      currencyDisplayName: "soul orbs",
      currencyInternalName: "soulOrbs",
      currencyLayer: "r",
      branches: [83],
      canAfford() {return hasUpgrade("r",83)},
      effect(){return player.r.points.pow(1.5).add(1)},
      effectDisplay(){return `x${format(this.effect())}`},
      style() {
        const style = {};
        if (hasUpgrade(this.layer,this.id)) style["background-color"] = "#C600D8";
        else if (canAffordUpgrade(this.layer,this.id)) style["background-color"] = "#FF99FF";
        return style;
      },
    },
    101: {
      title: "Idle Pillar",
      description: "Gain more EXP based on time spent in this Reincarnation.",
      cost: new Decimal(14),
      currencyDisplayName: "soul orbs",
      currencyInternalName: "soulOrbs",
      currencyLayer: "r",
      branches: [91],
      canAfford() {return hasUpgrade("r",91)},
      effect(){return new Decimal(player.r.resetTime).mul(globalSpeed()).div(3).add(1).min(50)},
      effectDisplay(){return `x${format(this.effect())}`},
      style() {
        const style = {};
        if (hasUpgrade(this.layer,this.id)) style["background-color"] = "#0070CC";
        else if (canAffordUpgrade(this.layer,this.id)) style["background-color"] = "#88BBFF";
        return style;
      },
    },
    102: {
      title: "Active Pillar",
      description: "Gain more ascension points based on your fastest Reincarnation.",
      cost: new Decimal(14),
      currencyDisplayName: "soul orbs",
      currencyInternalName: "soulOrbs",
      currencyLayer: "r",
      branches: [92],
      canAfford() {return hasUpgrade("r",92)},
      effect(){return Decimal.pow("1e1000",Decimal.div(1,player.r.fastest)).min("1e2000")},
      effectDisplay(){return `x${format(this.effect())}`},
      style() {
        const style = {};
        if (hasUpgrade(this.layer,this.id)) style["background-color"] = "#D2D900";
        else if (canAffordUpgrade(this.layer,this.id)) style["background-color"] = "#FFFF99";
        return style;
      },
    },
    103: {
      title: "Passive Pillar",
      description: "Gain more transcension points based on Reincarnation count.",
      cost: new Decimal(12),
      currencyDisplayName: "soul orbs",
      currencyInternalName: "soulOrbs",
      currencyLayer: "r",
      branches: [93],
      canAfford() {return hasUpgrade("r",93)},
      effect(){return player.r.prestiges.pow(250).add(1)},
      effectDisplay(){return `x${format(this.effect())}`},
      style() {
        const style = {};
        if (hasUpgrade(this.layer,this.id)) style["background-color"] = "#C600D8";
        else if (canAffordUpgrade(this.layer,this.id)) style["background-color"] = "#FF99FF";
        return style;
      },
    },
    111: {
      title: "Breaking Thermodynamics",
      description: "Gain of all Energies is raised ^1.2.",
      cost: new Decimal(15),
      currencyDisplayName: "soul orbs",
      currencyInternalName: "soulOrbs",
      currencyLayer: "r",
      branches: [101,102,103],
      canAfford() {return hasUpgrade("r",101) || hasUpgrade("r",102) || hasUpgrade("r",103)},
    },
    121: {
      title: "Reincarnated Gifts",
      description: "Gain more spiritual gifts based on total quarks.",
      cost: new Decimal(130),
      currencyDisplayName: "soul orbs",
      currencyInternalName: "soulOrbs",
      currencyLayer: "r",
      branches: [111],
      canAfford() {return hasUpgrade("r",111)},
      effect(){return player.r.total.pow(0.01).add(1)},
      effectDisplay(){return `x${format(this.effect())}`},
    },
    122: {
      title: "More Quarked Up",
      description: "The <b>Quarked Up</b> effect is squared.",
      cost: new Decimal(200),
      currencyDisplayName: "soul orbs",
      currencyInternalName: "soulOrbs",
      currencyLayer: "r",
      branches: [111],
      canAfford() {return hasUpgrade("r",111)},
    },
    131: {
      title: "Study #181",
      description: "Generate 1% of quark gain every second.",
      cost: new Decimal(600),
      currencyDisplayName: "soul orbs",
      currencyInternalName: "soulOrbs",
      currencyLayer: "r",
      branches: [121,122],
      canAfford() {return hasUpgrade("r",121) || hasUpgrade("r",122)},
    },
    141: {
      title: "Gateway",
      description: "(1,041 total soul orbs required)",
      cost: new Decimal(0),
      currencyDisplayName: "soul orbs",
      currencyInternalName: "soulOrbs",
      currencyLayer: "r",
      branches: [131],
      canAfford() {return hasUpgrade("r",131) && player.r.totalOrbs.gte(1041)},
    },
    151: {
      title: "Buyable Boost II",
      description: "Prestige buyable effects are raised ^1.05.",
      cost: new Decimal(120),
      currencyDisplayName: "soul orbs",
      currencyInternalName: "soulOrbs",
      currencyLayer: "r",
      branches: [141],
      canAfford() {return hasUpgrade("r",141)},
    },
    152: {
      title: "Boosted Super-Boosters",
      description: "Super-Boosters boost the 4th Booster effect.",
      cost: new Decimal(120),
      currencyDisplayName: "soul orbs",
      currencyInternalName: "soulOrbs",
      currencyLayer: "r",
      branches: [141],
      canAfford() {return hasUpgrade("r",141)},
    },
    153: {
      title: "Otherworldly Score",
      description: "Gain more Reincarnation Score based on total soul orbs.",
      cost: new Decimal(120),
      currencyDisplayName: "soul orbs",
      currencyInternalName: "soulOrbs",
      currencyLayer: "r",
      branches: [141],
      canAfford() {return hasUpgrade("r",141)},
      effect(){return player.r.totalOrbs.pow(2).max(1)},
      effectDisplay(){return `x${format(this.effect())}`},
    },
    154: {
      title: "SuperSac 3000",
      description: "Generator Sacrifice boosts Shard Generators 1-5 at a reduced rate.",
      cost: new Decimal(125),
      currencyDisplayName: "soul orbs",
      currencyInternalName: "soulOrbs",
      currencyLayer: "r",
      branches: [141],
      canAfford() {return hasUpgrade("r",141)},
      effect(){return player.r.sacrificeMult.pow(0.25).max(1)},
      effectDisplay(){return `x${format(this.effect())}`},
    },
    161: {
      title: "Inflation III",
      description: "<span style='font-size:8px'>Increase the 3rd Super-Booster effect hardcap based on Ascension Point Triplers bought.</span>",
      cost: new Decimal(2300),
      currencyDisplayName: "soul orbs",
      currencyInternalName: "soulOrbs",
      currencyLayer: "r",
      branches: [151,152],
      canAfford() {return hasUpgrade("r",151) || hasUpgrade("r",152)},
      effect(){return getBuyableAmount("p",13).div(1e7).min(0.0555)},
      effectDisplay(){return `+${format(this.effect())}`},
    },
    162: {
      title: "SuperSac 6000",
      description: "Power the Generator Sacrifice multiplier formula based on inflaton energy.",
      cost: new Decimal(2300),
      currencyDisplayName: "soul orbs",
      currencyInternalName: "soulOrbs",
      currencyLayer: "r",
      branches: [153,154],
      canAfford() {return hasUpgrade("r",153) || hasUpgrade("r",154)},
      effect(){return player.en.inflaton.max(1).log10().div(200).add(1)},
      effectDisplay(){return `^${format(this.effect())}`},
    },
    171: {
      title: "4200 Blaze It",
      description: "Gain more quarks based on prestige points. (both upgrades above required)",
      cost: new Decimal(4200),
      currencyDisplayName: "soul orbs",
      currencyInternalName: "soulOrbs",
      currencyLayer: "r",
      branches: [161,162],
      canAfford() {return hasUpgrade("r",161) && hasUpgrade("r",162)},
      effect(){return player.p.points.pow(2e-7).max(1)},
      effectDisplay(){return `x${format(this.effect())}`},
    },
  },
  buyables: {
    11: {
      cost(x) { return Decimal.pow("1e1000",x).mul("1e2000").floor() },
      display() {return `Gain +1 soul orb<br>Cost: ${format(this.cost())} transcension points`},
      canAfford() {return player.t.points.gte(this.cost())},
      buy() {
          player.t.points = player.t.points.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          player.r.soulOrbs = player.r.soulOrbs.add(1)
          player.r.totalOrbs = player.r.totalOrbs.add(1)
      },
      style() {
        return {"width": "100px", "height": "100px"}
      }
    },
    12: {
      cost(x) { return Decimal.pow(3,x.add(1)).floor() },
      display() {return `Gain +1 soul orb<br>Cost: ${format(this.cost())} quarks`},
      canAfford() {return player.r.points.gte(this.cost())},
      buy() {
          player.r.points = player.r.points.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          player.r.soulOrbs = player.r.soulOrbs.add(1)
          player.r.totalOrbs = player.r.totalOrbs.add(1)
      },
      style() {
        return {"width": "100px", "height": "100px"}
      }
    },
    13: {
      cost(x) { return new Decimal(0) },
      display() {return `Respec and Reincarnate`},
      canAfford() {return true},
      buy() {
          if(confirm("Are you sure you want to respec? This will cause a Reincarnation reset with no reward!")){
            doReset("r",true)
            resetReinc()
            player.r.soulOrbs = player.r.totalOrbs
            let result = player.r.upgrades.filter(id => id < 31)
            player.r.upgrades = result
          }
      },
      style() {
        return {"width": "100px", "height": "100px"}
      },
    },
    14: {
      cost(x) { return new Decimal(0) },
      display() {return `Respec at 3-way Split`},
      canAfford() {return true},
      buy() {
          if(confirm("Are you sure you want to respec? This will cause a Reincarnation reset with no reward!")){
            doReset("r",true)
            resetReinc()
            player.r.soulOrbs = player.r.totalOrbs
            for (i in player.r.upgrades) {
              let j = player.r.upgrades[i]
              if (j > 25 && j < 81 && hasUpgrade("r",j)) {
                player.r.soulOrbs = player.r.soulOrbs.sub(layers.r.upgrades[j].cost)
              }
            }
            let result = player.r.upgrades.filter(id => id < 81)
            player.r.upgrades = result
          }
      },
      style() {
        return {"width": "100px", "height": "100px"}
      },
    },
    15: {
      cost(x) { return new Decimal(0) },
      display() {return `Respec at Breaking Thermodynamics`},
      canAfford() {return true},
      buy() {
          if(confirm("Are you sure you want to respec? This will cause a Reincarnation reset with no reward!")){
            doReset("r",true)
            resetReinc()
            player.r.soulOrbs = player.r.totalOrbs
            for (i in player.r.upgrades) {
              let j = player.r.upgrades[i]
              if (j > 25 && j < 111 && hasUpgrade("r",j)) {
                player.r.soulOrbs = player.r.soulOrbs.sub(layers.r.upgrades[j].cost)
              }
            }
            let result = player.r.upgrades.filter(id => id < 111)
            player.r.upgrades = result
          }
      },
      style() {
        return {"width": "100px", "height": "100px"}
      },
      unlocked() {return hasAchievement("g",91)},
    },
    21: {
      title: "Gift Adder",
      cost(x) { return new Decimal(1e45).mul(new Decimal(10).pow(x)) },
      display() {return `+1 base gifts per second every time you buy this!<br>Times Bought: ${format(getBuyableAmount(this.layer, this.id))}<br>Cost: ${format(this.cost())} quarks<br>Effect: +${format(this.effect())} base gifts/sec`},
      canAfford() {return player.r.points.gte(this.cost())},
      buy() {
          player.r.points = player.r.points.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        mult = new Decimal(x).pow(Decimal.add(1,skillEffects("inception",3)))
        return mult
      },
    },
    22: {
      title: "Gift Multiplier",
      cost(x) { return new Decimal(1e50).mul(new Decimal(100000).pow(x)) },
      display() {return `Double gifts per second every time you buy this!<br>Times Bought: ${format(getBuyableAmount(this.layer, this.id))}<br>Cost: ${format(this.cost())} quarks<br>Effect: ${format(this.effect())}x gifts/sec`},
      canAfford() {return player.r.points.gte(this.cost())},
      buy() {
          player.r.points = player.r.points.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        mult = Decimal.pow(2,x)
        return mult
      },
    },
    31: {
      title: "Quark Spirit",
      cost(x) { return new Decimal(10).mul(new Decimal(5).pow(x)) },
      display() {return `Increase the exponent to the quark energy effect by +0.03 every time you buy this!<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}/50<br>Cost: ${format(this.cost())} spiritual gifts<br>Effect: ^${format(this.effect())} quark energy effect`},
      canAfford() {return player.r.spiritualGifts.gte(this.cost())},
      purchaseLimit: 50,
      buy() {
          player.r.spiritualGifts = player.r.spiritualGifts.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        mult = Decimal.add(1,Decimal.mul(x.add(hasUpgrade("p",44)?2:0),0.03))
        return mult
      },
      style() {
        const style = {};
        if (this.canAfford() && getBuyableAmount(this.layer,this.id).lt(50)) style["background-color"] = "#DDAE00";
        return style;
      },
    },
    32: {
      title: "Lepton Spirit",
      cost(x) { return new Decimal(1000).mul(new Decimal(10).pow(x)) },
      display() {return `Increase the exponent to the lepton energy effect by +0.04 every time you buy this!<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}/50<br>Cost: ${format(this.cost())} spiritual gifts<br>Effect: ^${format(this.effect())} lepton energy effect`},
      canAfford() {return player.r.spiritualGifts.gte(this.cost())},
      purchaseLimit: 50,
      buy() {
          player.r.spiritualGifts = player.r.spiritualGifts.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        mult = Decimal.add(1,Decimal.div(x.add(hasUpgrade("p",44)?2:0),25))
        return mult
      },
      style() {
        const style = {};
        if (this.canAfford() && getBuyableAmount(this.layer,this.id).lt(50)) style["background-color"] = "#DDAE00";
        return style;
      },
    },
    33: {
      title: "Boson Spirit",
      cost(x) { return new Decimal(1e6).mul(new Decimal(50).pow(x)) },
      display() {return `Increase the exponent to the boson energy effect by +0.03 every time you buy this!<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}/50<br>Cost: ${format(this.cost())} spiritual gifts<br>Effect: ^${format(this.effect())} boson energy effect`},
      canAfford() {return player.r.spiritualGifts.gte(this.cost())},
      purchaseLimit: 50,
      buy() {
          player.r.spiritualGifts = player.r.spiritualGifts.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        mult = Decimal.add(1,Decimal.mul(x.add(hasUpgrade("p",44)?2:0),0.03))
        return mult
      },
      style() {
        const style = {};
        if (this.canAfford() && getBuyableAmount(this.layer,this.id).lt(50)) style["background-color"] = "#DDAE00";
        return style;
      },
    },
    41: {
      title: "Muon Spirit",
      cost(x) { return new Decimal(1e22).mul(new Decimal(100).pow(x)) },
      display() {return `Increase the exponent to the muon energy effect by +0.05 every time you buy this!<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}/50<br>Cost: ${format(this.cost())} spiritual gifts<br>Effect: ^${format(this.effect())} muon energy effect`},
      canAfford() {return player.r.spiritualGifts.gte(this.cost())},
      purchaseLimit: 50,
      buy() {
          player.r.spiritualGifts = player.r.spiritualGifts.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        mult = Decimal.add(1,Decimal.div(x.add(hasUpgrade("p",44)?2:0),20))
        return mult
      },
      style() {
        const style = {};
        if (this.canAfford() && getBuyableAmount(this.layer,this.id).lt(50)) style["background-color"] = "#DDAE00";
        return style;
      },
    },
    42: {
      title: "Inflaton Spirit",
      cost(x) { return new Decimal(1e48).mul(new Decimal(1000).pow(x)) },
      display() {return `Increase the exponent to the inflaton energy effect by +0.04 every time you buy this!<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}/15<br>Cost: ${format(this.cost())} spiritual gifts<br>Effect: ^${format(this.effect())} inflaton energy effect`},
      canAfford() {return player.r.spiritualGifts.gte(this.cost())},
      purchaseLimit: 15,
      buy() {
          player.r.spiritualGifts = player.r.spiritualGifts.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        mult = Decimal.add(1,Decimal.div(x.add(hasUpgrade("p",44)?2:0),25))
        return mult
      },
      style() {
        const style = {};
        if (this.canAfford() && getBuyableAmount(this.layer,this.id).lt(15)) style["background-color"] = "#DDAE00";
        return style;
      },
    },
  },
  milestones: {
    0: {
        requirementDescription: "1 Reincarnation",
        effectDescription: "Autobuy Skills.",
        done() { return player.r.prestiges.gte(1) },
        toggles: [
          ["sk","auto"],
        ]
    },
    1: {
      requirementDescription: "2 Reincarnations",
      effectDescription: "Keep prestige, ascension, and booster milestones on Reincarnation.",
      done() { return player.r.prestiges.gte(2) },
    },
    2: {
      requirementDescription: "3 Reincarnations",
      effectDescription: "Keep challenge completions on Reincarnation.",
      done() { return player.r.prestiges.gte(3) },
    },
    3: {
      requirementDescription: "4 Reincarnations",
      effectDescription: "Keep tuba, prestige, and ascension upgrades on Reincarnation.",
      done() { return player.r.prestiges.gte(4) },
    },
    4: {
      requirementDescription: "5 Reincarnations",
      effectDescription: "Keep transcension milestones and upgrades on Reincarnation.",
      done() { return player.r.prestiges.gte(5) },
    },
    5: {
      requirementDescription: "6 Reincarnations",
      effectDescription: "Keep Super-Boosters and Transcension count on Reincarnation.",
      done() { return player.r.prestiges.gte(6) },
    },
    6: {
      requirementDescription: "7 Reincarnations",
      effectDescription: "Unlock automation for Shard Flavors.",
      done() { return player.r.prestiges.gte(7) },
    },
    7: {
      requirementDescription: "10 Reincarnations",
      effectDescription: "Generate 100% of transcension point gain every second.",
      done() { return player.r.prestiges.gte(10) },
    },
    8: {
      requirementDescription: "1e300 quarks",
      effectDescription: "Generator Sacrifice resets nothing, and unlock Auto-Sacrifice.",
      done() { return player.r.points.gte(1e300) },
      unlocked() {return hasUpgrade("t",35)},
      toggles: [
        ["sh","auto3"],
      ]
    },
    9: {
      requirementDescription: "1e560 quarks",
      effectDescription: "Unlock 2 new second-row Reincarnation Upgrades.",
      done() { return player.r.points.gte("1e560") },
      unlocked() {return hasMilestone("to",24)},
    },
    10: {
      requirementDescription: "1e1000 quarks",
      effectDescription: "Autobuy soul orb buyables and quark buyables.",
      done() { return player.r.points.gte("1e1000") },
      unlocked() {return hasMilestone("to",24)},
      toggles: [
        ["r","auto"],
        ["r","auto2"],
      ]
    },
  },
  challenges: {
    11: {
      name: "Generator Failure",
      challengeDescription: "<i>They just stopped working one day.</i><br>You start with 10,000,000 tubas, but you cannot generate any more.",
      goalDescription: function() {return `Reach ${format(tmp[this.layer].challenges[this.id].goal)} transcension points.`},
      rewardDescription: function() {return `${format(Decimal.pow(new Decimal("1e500"),challengeCompletions(this.layer,this.id)**(challengeCompletions(this.layer,this.id) >= 22 ? 2 : 1.25)))}x tuba gain, ${challengeCompletions(this.layer,this.id)+1}x Generator production exponent, ${(challengeCompletions(this.layer,this.id)+1)**3}x EXP gain<br>Completions: ${challengeCompletions(this.layer,this.id)}/50<br><span style="font-size:11px">First-Time Bonus: The Accel. Boost power cap from Super-Boosters is 1.15x</span>`},
      completionLimit: 50,
      canComplete: function() {return player.t.points.gte(tmp[this.layer].challenges[this.id].goal)},
      goal() {return new Decimal(hasChallenge("r",11) ? "1e1300" : "1e1260").pow(Decimal.pow(1.15,challengeCompletions(this.layer, this.id)))},
      onEnter() {resetReinc(); player.points = new Decimal(1e7)},
    },
    12: {
      name: "Layer Cleanup",
      challengeDescription: "<i>How else can I make the game harder?</i><br>Prestige points and ascension points are raised ^0.01.",
      goalDescription: function() {return `Reach ${format(tmp[this.layer].challenges[this.id].goal)} transcension points.`},
      rewardDescription: function() {return `^${regularFormat(challengeCompletions(this.layer,this.id) >= 5 ? Decimal.add(1.05,(challengeCompletions(this.layer,this.id) - 5)/500) : Decimal.add(1,challengeCompletions(this.layer,this.id)/100),3)} transcension point gain, ^${regularFormat(Decimal.add(1,challengeCompletions(this.layer,this.id)/300).min(hasUpgrade("sp",25)?1.06:1.025),3)} SG effectiveness, ${format(Decimal.pow(1e10,challengeCompletions(this.layer,this.id)))}x gain of all Shard Flavors<br>Completions: ${challengeCompletions(this.layer,this.id)}/50<br><span style="font-size:11px">First-Time Bonus: Unlock a new Shard Flavor</span>`},
      completionLimit: 50,
      canComplete: function() {return player.t.points.gte(tmp[this.layer].challenges[this.id].goal)},
      goal() {return new Decimal("1e1050").pow(Decimal.pow(1.15,challengeCompletions(this.layer, this.id)))},
      onEnter() {resetReinc()},
    },
    21: {
      name: "No Buyables",
      challengeDescription: "<i>Too much inflation, 0/10.</i><br>Prestige buyables and ascension buyables are disabled.",
      goalDescription: function() {return `Reach ${format(tmp[this.layer].challenges[this.id].goal)} transcension points.`},
      rewardDescription: function() {return `${format(Decimal.pow("1e500",challengeCompletions(this.layer,this.id)**2))}x prestige point gain, ${format(Decimal.pow(1e300,challengeCompletions(this.layer,this.id)**2))}x ascension point gain, ${format(Decimal.pow(10,challengeCompletions(this.layer,this.id)))}x Reincarnation Score<br>Completions: ${challengeCompletions(this.layer,this.id)}/50<br><span style="font-size:11px">First-Time Bonus: Weaken the 2nd softcap for <b>Ascension Bonus</b></span>`},
      completionLimit: 50,
      canComplete: function() {return player.t.points.gte(tmp[this.layer].challenges[this.id].goal)},
      goal() {return new Decimal("1e10600").pow(Decimal.pow(1.15,challengeCompletions(this.layer, this.id)))},
      unlocked() {return hasMilestone("to",22)},
      onEnter() {resetReinc()},
    },
    22: {
      name: "(softcapped)",
      challengeDescription: "<i>Oh no, Jacorb has invaded Tuba's Tree 2!</i><br>Transcension point gain ^0.25, and the shard effect softcap is stronger.",
      goalDescription: function() {return `Reach ${format(tmp[this.layer].challenges[this.id].goal)} transcension points.`},
      rewardDescription: function() {return `${format(Decimal.pow(1e5,challengeCompletions(this.layer,this.id)**1.1))}x quark gain, ^${format(Decimal.add(1,challengeCompletions(this.layer,this.id)/50))} chocolate shard effect, ${format(Decimal.add(1,challengeCompletions(this.layer,this.id)/20))}x effective Wisdom Skill levels<br>Completions: ${challengeCompletions(this.layer,this.id)}/50<br><span style="font-size:11px">First-Time Bonus: The 3rd Booster effect softcap starts at 3,000%</span>`},
      completionLimit: 50,
      canComplete: function() {return player.t.points.gte(tmp[this.layer].challenges[this.id].goal)},
      goal() {return new Decimal("1e7600").pow(Decimal.pow(1.15,challengeCompletions(this.layer, this.id)))},
      unlocked() {return hasMilestone("to",22)},
      onEnter() {resetReinc()},
    },
    31: {
      name: "SADISTIC CHALLENGE II",
      challengeDescription: "<i style='font-size:10px'>The worst atrocity a man can commit is making others suffer.</i><br>All Charges are maxed, and you are trapped in RC1.",
      goalDescription: function() {return `Reach ${format(tmp[this.layer].challenges[this.id].goal)} transcension points.`},
      rewardDescription: function() {return `+${formatWhole(Decimal.mul(100,challengeCompletions(this.layer,this.id)))} bonus Incrementy ELO, ${format(Decimal.pow(5,challengeCompletions(this.layer,this.id)))}x incrementy gain, +${formatWhole(challengeCompletions(this.layer,this.id))} free levels of all Manifolds except Acceleration<br>Completions: ${challengeCompletions(this.layer,this.id)}/50<br><span style="font-size:11px">First-Time Bonus: Unlock a new prestige layer</span>`},
      completionLimit: 50,
      canComplete: function() {return player.t.points.gte(tmp[this.layer].challenges[this.id].goal)},
      goal() {return new Decimal("1e550").pow(Decimal.pow(1.15,challengeCompletions(this.layer, this.id)))},
      unlocked() {return hasMilestone("to",27)},
      onEnter() {resetReinc(); player.en.charges = [null,10,10,10,10,10]; player.points = new Decimal(1e7)},
      onExit() {player.en.charges = [null,0,0,0,0,0]},
    },
  },
})

function spiritGiftMult() {
  let mult = new Decimal(1)
  if(hasUpgrade("p",42)) mult = mult.mul(25)
  if(hasUpgrade("r",121)) mult = mult.mul(upgradeEffect("r",121))
  if(hasAchievement("g",92)) mult = mult.mul(1.5)
  if(hasUpgrade("t",34)) mult = mult.mul(upgradeEffect("t",34))
  if(hasUpgrade("r",22)) mult = mult.mul(1e6)
  if(hasAchievement("g",112)) mult = mult.mul(player.i.incrementy.max(1).log10().add(1))
  return mult
}

addLayer("i", {
  name: "incrementy", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
  startData() { return {
      unlocked: false,
  points: new Decimal(0),
  incrementy: new Decimal(0),
  sacrificeMult: new Decimal(1),
  }},
  autoPrestige() {
    return player.i.auto && hasMilestone("i",0)
  },
  canBuyMax(){
    return hasMilestone("i", 0)
  },
  resetsNothing(){
    return hasMilestone("i", 0)
  },
  tabFormat: [
  "main-display",
  "prestige-button",
  ["display-text", () => `You have ${format(player.t.points)} transcension points<br>`],
  ["display-text", () => `You have made ${formatWhole(player.sb.total)} incrementy catalysts in total<br><br>`],
  "milestones",
  ["display-text", () => `You have <h2 style="color: #880088; text-shadow: 0px 0px 10px #880088">${format(player.i.incrementy)}</h2> incrementy<br>
  You are generating ${format(Decimal.pow(3,player.i.points).sub(1).mul(incrementyGainMult()))} incrementy per second<br>
  Incrementy Sacrifice multiplier: ${format(player.i.sacrificeMult)}x`],
  "blank",
  "buyables",
  "blank",
  () => player.i.incrementy.lt(1e24) ? ["display-text", `You need 1.00e24 incrementy to perform an Incrementy Sacrifice.`] : "",
  () => player.i.incrementy.gte(1e24) ? ["display-text", `Your Incrementy ELO is <h2 style="color: #880088; text-shadow: 0px 0px 10px #880088">${format(incrementyELO())}</h2><br>
  (Before you ask: ELO doesn't stand for anything, it's just a rating.)<br>
  Incrementy Factor: ${format(player.i.incrementy.max(1).log10())}x<br>
  Manifold Factor: ${format(getBuyableAmount("i",11).add(getBuyableAmount("i",12)).add(getBuyableAmount("i",13)).add(getBuyableAmount("i",21)).add(getBuyableAmount("i",22)).add(getBuyableAmount("i",23)).add(getBuyableAmount("i",31)).pow(0.5).add(1))}x<br>`] : "",
  () => hasChallenge("r",31) ? ["display-text",`RC5 Bonus: +${formatWhole(Decimal.mul(100,challengeCompletions("r",31)))}`] : "",
  "clickables",
  ],
  color: "#880088",
  requires: new Decimal("1e100000"), // Can be a function that takes requirement increases into account
  resource: "incrementy catalysts", // Name of prestige currency
  baseResource: "transcension points", // Name of resource prestige is based on
  baseAmount() {return player.t.points}, // Get the current amount of baseResource
  type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  base() {
    return new Decimal("1e5000")
  },
  exponent: new Decimal(1.1),
  gainMult() { // Calculate the multiplier for main currency from bonuses
      mult = new Decimal(1)
      return mult
  },
  gainExp() { // Calculate the exponent on main currency from bonuses
      let exp = new Decimal(1)
      if(player.i.points.gte(30)) exp = exp.div(1.2)
      if(player.i.points.gte(40)) exp = exp.div(1.2)
      if(player.i.points.gte(100)) exp = exp.div(1.1)
      return exp
  },
  row: 4, // Row the layer is in on the tree (0 is the first row)
  position: 0,
  hotkeys: [
      {key: "I", description: "I: Reset for incrementy catalysts", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
  ],
  onPrestige() {
    if(!hasMilestone("i",0)) resetReinc()
  },
  layerShown(){return hasMilestone("to",24)},
  update(diff) {
    player.i.incrementy = player.i.incrementy.add(Decimal.pow(3,player.i.points).sub(1).mul(incrementyGainMult()).mul(diff).mul(globalSpeed()))
  },
  doReset(layer) {

  if (!(layers[layer].row > this.row)) return

  let keep = []

  layerDataReset(this.layer, keep)

  },
  branches: ["t"],
  buyables: {
    11: {
      title: "Incrementy Manifold",
      cost(x) { let y = x.sub(18); return x.gte(18) ? new Decimal(1e19).mul(new Decimal(10).pow(y.pow(1.1))) : new Decimal(10).pow(x.add(1)) },
      display() {return `Gain 2x more incrementy every time you buy this!<br>Times Bought: ${format(getBuyableAmount(this.layer, this.id))}<br>Cost: ${format(this.cost())} incrementy<br>Effect: ${format(this.effect())}x incrementy/sec`},
      canAfford() {return player.i.incrementy.gte(this.cost())},
      buy() {
          player.i.incrementy = player.i.incrementy.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        mult = Decimal.pow(2,x.add(challengeCompletions("r",31)))
        return mult
      },
    },
    12: {
      title: "Acceleration Manifold",
      cost(x) { let y = x.sub(3); return x.gte(3) ? new Decimal(1e8).mul(new Decimal(100).pow(y.pow(1.25))) : new Decimal(100).pow(x.add(1)) },
      purchaseLimit: 7,
      display() {return `Gain +2.5% free Time Accelerators every time you buy this!<br>Times Bought: ${formatWhole(getBuyableAmount(this.layer, this.id))}/7<br>Cost: ${format(this.cost())} incrementy<br>Effect: +${format(this.effect())}% free Time Accelerators`},
      canAfford() {return player.i.incrementy.gte(this.cost())},
      buy() {
          player.i.incrementy = player.i.incrementy.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        mult = Decimal.mul(2.5,x)
        return mult
      },
    },
    13: {
      title: "Duplication Manifold",
      cost(x) { return new Decimal(1000).mul(new Decimal(100).pow(x)) },
      purchaseLimit: 40,
      display() {return `Gain +25% free Duplicators every time you buy this!<br>Times Bought: ${formatWhole(getBuyableAmount(this.layer, this.id))}/40<br>Cost: ${format(this.cost())} incrementy<br>Effect: +${format(this.effect())}% free Duplicators`},
      canAfford() {return player.i.incrementy.gte(this.cost())},
      buy() {
          player.i.incrementy = player.i.incrementy.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        mult = Decimal.mul(25,x.add(challengeCompletions("r",31)))
        return mult
      },
    },
    21: {
      title: "Experience Manifold",
      cost(x) { return new Decimal(1000).mul(new Decimal(10).pow(x)) },
      display() {return `Gain 20x more experience every time you buy this!<br>Times Bought: ${format(getBuyableAmount(this.layer, this.id))}<br>Cost: ${format(this.cost())} incrementy<br>Effect: ${format(this.effect())}x EXP gain`},
      canAfford() {return player.i.incrementy.gte(this.cost())},
      buy() {
          player.i.incrementy = player.i.incrementy.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        mult = Decimal.pow(20,x.add(challengeCompletions("r",31)))
        return mult
      },
    },
    22: {
      title: "Booster Manifold",
      cost(x) { return new Decimal(10000).mul(new Decimal(100).pow(x)) },
      display() {return `Divide the booster cost by /1e100,000 every time you buy this!<br>Times Bought: ${format(getBuyableAmount(this.layer, this.id))}<br>Cost: ${format(this.cost())} incrementy<br>Effect: /${format(this.effect())} Booster cost`},
      canAfford() {return player.i.incrementy.gte(this.cost())},
      buy() {
          player.i.incrementy = player.i.incrementy.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        mult = Decimal.pow("1e100000",x.add(challengeCompletions("r",31)))
        return mult
      },
    },
    23: {
      title: "Shard Manifold",
      cost(x) { let y = x.sub(12); return x.gte(12) ? new Decimal(1e29).mul(new Decimal(100).pow(y.pow(1.25))) : new Decimal(100000).mul(Decimal.pow(100,x)) },
      purchaseLimit: 27,
      display() {return `All Shard Generators are 1e500x more effective every time you buy this!<br>Times Bought: ${formatWhole(getBuyableAmount(this.layer, this.id))}/27<br>Cost: ${format(this.cost())} incrementy<br>Effect: ${format(this.effect())}x SG effectiveness`},
      canAfford() {return player.i.incrementy.gte(this.cost())},
      buy() {
          player.i.incrementy = player.i.incrementy.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        mult = Decimal.pow("1e500",x.add(challengeCompletions("r",31)))
        return mult
      },
    },
    31: {
      title: "Quark Manifold",
      cost(x) { return new Decimal(1e6).mul(new Decimal(1000).pow(x)) },
      display() {return `Gain 1e20x more quarks (1e10x post-softcap) every time you buy this!<br>Times Bought: ${format(getBuyableAmount(this.layer, this.id))}<br>Cost: ${format(this.cost())} incrementy<br>Effect: ${format(this.effect())}x quark gain`},
      canAfford() {return player.i.incrementy.gte(this.cost())},
      buy() {
          player.i.incrementy = player.i.incrementy.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        mult = Decimal.pow(1e20,x.add(challengeCompletions("r",31)))
        return mult
      },
    },
    32: {
      title: "Sacrifice Manifold",
      cost(x) { return new Decimal(1e36).mul(new Decimal(10000).pow(x)) },
      display() {return `Add 0.075 to the Incrementy ELO conversion exponent every time you buy this!<br>Times Bought: ${format(getBuyableAmount(this.layer, this.id))}<br>Cost: ${format(this.cost())} incrementy<br>Effect: +${format(this.effect())} ELO conversion exponent`},
      canAfford() {return player.i.incrementy.gte(this.cost())},
      buy() {
          player.i.incrementy = player.i.incrementy.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        mult = Decimal.mul(0.075,x.add(challengeCompletions("r",31)))
        return mult
      },
    },
    33: {
      title: "Forgotten Manifold",
      cost(x) { return new Decimal(1e54).mul(new Decimal(1000).pow(x)) },
      display() {return `Global speed is +20% faster every time you buy this!<br>Times Bought: ${format(getBuyableAmount(this.layer, this.id))}<br>Cost: ${format(this.cost())} incrementy<br>Effect: ${format(this.effect())}x global speed`},
      canAfford() {return player.i.incrementy.gte(this.cost())},
      buy() {
          player.i.incrementy = player.i.incrementy.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        mult = Decimal.add(1,Decimal.mul(0.2,x.add(challengeCompletions("r",31))))
        return mult
      },
    },
  },
  milestones: {
    0: {
      requirementDescription: "45 incrementy catalysts",
      effectDescription: "Autobuy incrementy catalysts, and you can buy max them and they reset nothing.",
      done() { return player.i.points.gte(45) },
      toggles: [
        ["i","auto"],
      ]
    },
  },
  clickables: {
    11: {
      display: () => `Incrementy Sacrifice (${format(incrementyELO().pow(Decimal.add(0.75,buyableEffect("i",32))).div(player.i.sacrificeMult))}x)`,
      onClick() {
        player.i.sacrificeMult = incrementyELO().pow(Decimal.add(0.75,buyableEffect("i",32)))
        doReset("i",true)
        resetReinc()
        player.i.incrementy = new Decimal(0)
        player.i.buyables[11] = new Decimal(0)
        player.i.buyables[12] = new Decimal(0)
        player.i.buyables[13] = new Decimal(0)
        player.i.buyables[21] = new Decimal(0)
        player.i.buyables[22] = new Decimal(0)
        player.i.buyables[23] = new Decimal(0)
        player.i.buyables[31] = new Decimal(0)
        player.i.buyables[32] = new Decimal(0)
      },
      canClick() {return incrementyELO().pow(Decimal.add(0.75,buyableEffect("i",32))).div(player.i.sacrificeMult).gt(1)},
      unlocked() {return player.i.incrementy.gte(1e24) || player.i.sacrificeMult.gt(1)},
    },
  },
})

function incrementyGainMult() {
  let mult = new Decimal(1)
  mult = mult.mul(buyableEffect("i",11))
  if(hasUpgrade("r",24)) mult = mult.mul(upgradeEffect("r",24))
  if(hasAchievement("g",113)) mult = mult.mul(2)
  mult = mult.mul(player.i.sacrificeMult)
  mult = mult.mul(Decimal.pow(5,challengeCompletions("r",31)))
  return mult
}

function incrementyELO() {
  return player.i.incrementy.max(1).log10().mul(getBuyableAmount("i",11).add(getBuyableAmount("i",12)).add(getBuyableAmount("i",13)).add(getBuyableAmount("i",21)).add(getBuyableAmount("i",22)).add(getBuyableAmount("i",23)).add(getBuyableAmount("i",31)).pow(0.5).add(1)).add(Decimal.mul(100,challengeCompletions("r",31)))
}

addLayer("sp", {
  name: "super-prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "SP", // This appears on the layer's node. Default is the id with the first letter capitalized
  startData() { return {
      unlocked: false,
  points: new Decimal(0),
  prestiges: new Decimal(0),
  upgradePoints: new Decimal(0),
  totalUP: new Decimal(0),
  }},
  tabFormat: [
  "main-display",
  "prestige-button",
  ["display-text", () => `You have made ${format(player.sp.total)} total super-prestige points`],
  ["display-text", () => `You have Super-Prestiged ${format(player.sp.prestiges)} times<br><br>`],
  "milestones",
  "buyables",
  "blank",
  ["display-text", () => `You have ${formatWhole(player.sp.upgradePoints)} upgrade points (${formatWhole(player.sp.totalUP)} total)<br><br>`],
  "upgrades",
  "clickables",
  ],
  color: "#00AEFF",
  requires: new Decimal("1e16000000"), // Can be a function that takes requirement increases into account
  resource: "super-prestige points", // Name of prestige currency
  baseResource: "prestige points", // Name of resource prestige is based on
  baseAmount() {return player.p.points}, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 2e-6, // Prestige currency exponent
  gainMult() { // Calculate the multiplier for main currency from bonuses
      mult = new Decimal(1)
      if(hasUpgrade("sp",21)) mult = mult.mul(10)
      if(hasAchievement("g",114)) mult = mult.mul(player.r.upgrades.filter(id => id > 25).length)
      if(hasUpgrade("r",25)) mult = mult.mul(upgradeEffect("r",25))
      if(hasAchievement("g",122)) mult = mult.mul(player.i.sacrificeMult)
      return mult
  },
  gainExp() { // Calculate the exponent on main currency from bonuses
      let exp = new Decimal(1)
      return exp
  },
  row: 4, // Row the layer is in on the tree (0 is the first row)
  position: 2,
  hotkeys: [
      {key: "s", description: "S: Reset for super-prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
  ],
  onPrestige() {
    player.sp.prestiges = player.sp.prestiges.add(1)
    resetReinc()
  },
  layerShown() {return hasMilestone("to",24)},
  doReset(layer) {

  if (!(layers[layer].row > this.row)) return
  
  let keep = []

  layerDataReset(this.layer, keep)

  },
  upgrades: {
    11: {
      title: "Super-Prestige Bonus",
      description: "Gain more prestige points based on total super-prestige points.",
      tooltip: "Softcaps at 1e1,500,000x",
      cost: new Decimal(1),
      currencyDisplayName: "upgrade point",
      currencyInternalName: "upgradePoints",
      currencyLayer: "sp",
      effect(){return player.sp.total.pow(25000).add(1).gte("1e1500000") ? player.sp.total.pow(25000).add(1).div("1e1500000").pow(0.25).mul("1e1500000") : player.sp.total.pow(25000).add(1)},
      effectDisplay(){return `x${format(this.effect())}`},
    },
    12: {
      title: "Super-Prestige Enhancement",
      description: "Go <i>huge</i> or go home! Multiply tuba gain and prestige point gain by 1e200,000.",
      cost: new Decimal(1),
      currencyDisplayName: "upgrade point",
      currencyInternalName: "upgradePoints",
      currencyLayer: "sp",
    },
    13: {
      title: "Synergism be like II",
      description: "<span style='font-size:8px'>Gain more transcension points based on total prestige buyables bought.</span>",
      cost: new Decimal(1),
      currencyDisplayName: "upgrade point",
      currencyInternalName: "upgradePoints",
      currencyLayer: "sp",
      effect(){return Decimal.pow(1.0005,getBuyableAmount("p",11).add(getBuyableAmount("p",12)).add(getBuyableAmount("p",13)))},
      effectDisplay(){return `x${format(this.effect())}`},
    },
    14: {
      title: "Accelerator Boost Boost",
      description: "The 1st effect of Accelerator Boosts is 10% more effective.",
      cost: new Decimal(1),
      currencyDisplayName: "upgrade point",
      currencyInternalName: "upgradePoints",
      currencyLayer: "sp",
    },
    15: {
      title: "Level Cap Up",
      description: "Increase all Skill caps by 200.",
      cost: new Decimal(1),
      currencyDisplayName: "upgrade point",
      currencyInternalName: "upgradePoints",
      currencyLayer: "sp",
    },
    21: {
      title: "Super Short & Simple",
      description: "Multiply super-prestige point gain by 10.",
      cost: new Decimal(1),
      currencyDisplayName: "upgrade point",
      currencyInternalName: "upgradePoints",
      currencyLayer: "sp",
    },
    22: {
      title: "Self-Self-Synergy",
      description: "<span style='font-size:8px'>The <b>Self-Synergy</b> effect is stronger based on its own effect. This is getting hypermeta.</span>",
      cost: new Decimal(1),
      currencyDisplayName: "upgrade point",
      currencyInternalName: "upgradePoints",
      currencyLayer: "sp",
      effect(){return new Decimal(1).add(upgradeEffect("p",22).max(1).log10().max(1).log10().div(100))},
      effectDisplay(){return `^${regularFormat(this.effect(),3)}`},
    },
    23: {
      title: "Chad Upgrade Bonus",
      description: "<span style='font-size:8px'>Gain more quarks based on super-prestige upgrades bought. good upgrade 10/10</span>",
      cost: new Decimal(1),
      currencyDisplayName: "upgrade point",
      currencyInternalName: "upgradePoints",
      currencyLayer: "sp",
      effect(){return Decimal.pow(1e10,player.sp.upgrades.length)},
      effectDisplay(){return `x${format(this.effect())}`},
    },
    24: {
      title: "<span style='font-size:11px'><b>Better Multiplier Buff</b></span>",
      description: "<span style='font-size:9px'>Multiply the <b>Chad Multiplier Buff</b> effect based on super-prestige points.</span>",
      cost: new Decimal(1),
      currencyDisplayName: "upgrade point",
      currencyInternalName: "upgradePoints",
      currencyLayer: "sp",
      effect(){return player.sp.points.add(1).log2().add(1)},
      effectDisplay(){return `x${format(this.effect())}`},
    },
    25: {
      title: "Shard Exponential",
      description: "The second RC2 reward hardcap is now ^1.06.",
      cost: new Decimal(1),
      currencyDisplayName: "upgrade point",
      currencyInternalName: "upgradePoints",
      currencyLayer: "sp",
    },
  },
  buyables: {
    11: {
      title: "Upgrade Point Store",
      cost(x) { let arr = [new Decimal(3),new Decimal(5e6),new Decimal(2e12),new Decimal(8e27),new Decimal(3e34),new Decimal(4.2e69),new Decimal(2.4e96),new Decimal(1e115),new Decimal(1e203),new Decimal(1e211),new Decimal(Infinity)]; return arr[x] },
      purchaseLimit: 10,
      display() {return `Gain +1 upgrade point every time you buy this!<br>Times Bought: ${formatWhole(getBuyableAmount(this.layer, this.id))}/10<br>Cost: ${format(this.cost())}`},
      canAfford() {return player.sp.points.gte(this.cost())},
      buy() {
          player.sp.points = player.sp.points.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          player.sp.upgradePoints = player.sp.upgradePoints.add(1)
          player.sp.totalUP = player.sp.totalUP.add(1)
      },
    },
  },
  clickables: {
    11: {
      display() {return `Respec and Super-Prestige`},
      onClick() {
          if(confirm("Are you sure you want to respec? This will cause a Super-Prestige reset with no reward!")){
            doReset("sp",true)
            resetReinc()
            player.sp.upgradePoints = player.sp.totalUP
            player.sp.upgrades = []
          }
      },
      canClick() {return true},
    },
  },
})

addLayer("o", {
  name: "omnipotence", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "O", // This appears on the layer's node. Default is the id with the first letter capitalized
  startData() { return {
      unlocked: false,
  points: new Decimal(0),
  prestiges: new Decimal(0),
  }},
  tabFormat: [
  ["display-text","Congratulations for reaching the end of the current content!"],
  ["display-text","The 5th prestige layer isn't available yet. It will be added next update. Sorry :("],
  ],
  color: "#FF0000",
  requires: new Decimal("1e7500"), // Can be a function that takes requirement increases into account
  resource: "omni-essence", // Name of prestige currency
  baseResource: "quarks", // Name of resource prestige is based on
  baseAmount() {return player.r.points}, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 1e-300, // Prestige currency exponent
  gainMult() { // Calculate the multiplier for main currency from bonuses
      mult = new Decimal(1)
      return mult
  },
  gainExp() { // Calculate the exponent on main currency from bonuses
      let exp = new Decimal(1)
      return exp
  },
  row: 5, // Row the layer is in on the tree (0 is the first row)
  position: 0,
  /* hotkeys: [
      {key: "s", description: "S: Reset for super-prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
  ], */
  layerShown() {return hasChallenge("r",31)},
  doReset(layer) {

  if (!(layers[layer].row > this.row)) return
  
  let keep = []

  layerDataReset(this.layer, keep)

  },
  branches: ["r"],
})