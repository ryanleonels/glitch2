addLayer("s", {
    name: "Buffs", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
  effectDescription() {
    let q = player.s.points.plus(1).log(10).plus(1).log(10).plus(1)
    if (hasUpgrade("s",14))q=q.pow(2)
    if (hasUpgrade("s",21))q=q.pow(2)
    if (q.gt(4)&&!hasUpgrade("s",24))q=q.pow(0.5).times(2)
    let r = "making point gain slow down slower by /"+(hasUpgrade("o",14)?"infinity":format(q))
  return r
  },
  passiveGeneration(){return hasUpgrade("o",13)?5:hasUpgrade("f",11)?1:0},
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
      mult=mult.times(player.o.points.plus(2))
      if (mult.gte(1)&&!hasUpgrade("t",14))mult=mult.pow(0.5)
      if (player.t.unlocked)mult=mult.times(player.t.points.plus(2).pow(0.1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
  upgrades:{
    rows: 2,
    cols: 4,
    11: {
      title: "Remove",
      description: "Make point gain slow down slower",
      cost: new Decimal(1)
    },
    12: {
      title: "The",
      description: "Gain 10 points per second",
      cost: new Decimal(3)
    },
    13: {
      title: "Softcaps",
      description: "Points buff point gain",
      cost: new Decimal(6)
    },
    14: {
      title: "And",
      description: "Square prestige point effect",
      cost: new Decimal(20)
    },
    21: {
      title: "Unlock",
      description: "Square prestige point effect again",
      cost: new Decimal(30)
    },
    22: {
      title: "A",
      description: "Gain 1 million points per second",
      cost: new Decimal(40)
    },
    23: {
      title: "New",
      description: "Make point gain slow down even slower",
      cost: new Decimal(50)
    },
    24: {
      title: "Layer",
      description: "Remove prestige point effect slowdown and unlock a new layer at 100",
      cost: new Decimal(69)
    },
  },
  doReset(resettingLayer){
    if (resettingLayer.row>this.row){
      if (!hasUpgrade("o",12)){player.s.upgrades=[]}
    
      player[this.layer].points=new Decimal(0)
    }
  }
})
addLayer("o", {
    name: "Buffs 2", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "O", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
    }},
    color: "#284959",
  branches: ["s"],
  onPrestige(gain){
    player.s.points=new Decimal(0)
    if (!hasUpgrade("o",12)){player.s.upgrades=[]}
  },
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "Super prestige points", // Name of prestige currency
  effectDescription() {
    let a = player.o.points.plus(1).log(10).plus(1).log(10).plus(1)
  if (hasUpgrade("o",21))a=a.pow(3)
    let r = "making point gain's second slow down slower by /"+(hasUpgrade("f",23)?"infinity":format(a))
  return r
  },
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.s.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
      if (hasUpgrade("f",14))mult=mult.times(player.f.points.plus(1))
      if (hasUpgrade("f",21))mult=mult.times(2)
      if (player.t.unlocked)mult=mult.times(player.t.points.plus(2).pow(0.1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
  passiveGeneration(){return hasUpgrade("f",11)?1:0},
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "o", description: "O: Reset for super prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.o.unlocked||player.s.points.gte(100)||hasUpgrade("s",24)},
  upgrades:{
    rows: 2,
    cols: 4,
    11: {
      title: "Remove",
      description: "Multiply prestige point gain by super prestige points",
      cost: new Decimal(1)
    },
    12: {
      title: "The",
      description: "Keep prestige upgrades on super prestige",
      cost: new Decimal(3)
    },
    13: {
      title: "Softcaps",
      description: "Gain 500% of prestige points per second",
      cost: new Decimal(6)
    },
    14: {
      title: "And",
      description: "Make prestige points' effect Infinity",
      cost: new Decimal(20)
    },
    21: {
      title: "Unlock",
      description: "Cube super prestige point effect",
      cost: new Decimal(30)
    },
    22: {
      title: "A",
      description: "Gain 1e308 points per second",
      cost: new Decimal(40)
    },
    23: {
      title: "New",
      description: "Raise point gain above 10000 to the ^4/3",
      cost: new Decimal(50)
    },
    24: {
      title: "Layer",
      description: "Make point gain's third slow down start later",
      cost: new Decimal(69)
    },
  },
  doReset(resettingLayer){
    if (resettingLayer.row>this.row){
      if (!hasUpgrade("f",12)){player.o.upgrades=[]}
    
      player[this.layer].points=new Decimal(0)
    }
  }
})
addLayer("f", {
    name: "Buffs 3", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
    }},
    color: "#fe0000",
  branches: ["o"],
  onPrestige(gain){
    player.s.points=new Decimal(0)
    player.o.points=new Decimal(0)
    if (!hasUpgrade("f",12)){player.o.upgrades=[]; player.s.upgrades=[]}
  },
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "Hyper prestige points", // Name of prestige currency
  effectDescription() {
    let y = player.f.points.plus(2).log(10).plus(1).pow(0.5)
    if (hasUpgrade("t",23))y=y.pow(6969)
    let z=y
    if (hasUpgrade("f",13))y=y.pow(4.2)

    let r = "delaying point gain's third slow down by "+format(y)+"x and raising point gain to the ^"+format(z)
  return r
  },
  passiveGeneration(){return hasUpgrade("t",13)?100:hasUpgrade("t",11)?1:0},
    baseResource: "Super prestige points", // Name of resource prestige is based on
    baseAmount() {return player.o.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
      if (player.t.unlocked)mult=mult.times(player.t.points.plus(2).pow(0.1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "f", description: "F: Reset for Hyper prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.f.unlocked||player.o.points.gte(100)||hasUpgrade("o",24)},
  upgrades:{
    rows: 2,
    cols: 4,
    11: {
      title: "Remove",
      description: "Gain 100% of prestige and super prestige points per second",
      cost: new Decimal(1)
    },
    12: {
      title: "The",
      description: "Keep super prestige upgrades on hyper prestige",
      cost: new Decimal(3)
    },
    13: {
      title: "Softcaps",
      description: "Raise hyper prestige points' first effect ^4.20",
      cost: new Decimal(6)
    },
    14: {
      title: "And",
      description: "Hyper prestige points multiply super prestige points",
      cost: new Decimal(20)
    },
    21: {
      title: "Unlock",
      description: "Double super prestige points",
      cost: new Decimal(30)
    },
    22: {
      title: "A",
      description: "Gain ee4 points per second",
      cost: new Decimal(40)
    },
    23: {
      title: "New",
      description: "Make Super Prestige point effect /Infinity",
      cost: new Decimal(50)
    },
    24: {
      title: "Layer",
      description: "Multiply first hyper prestige effect by hyper prestige points and unlock a new layer",
      cost: new Decimal(69)
    },
  },
  doReset(layer){
    if (layer.row>this.row){
      if (false){player[this.layer].upgrades=[]}
    
      player[this.layer].points=new Decimal(0)
    }
  }
})
addLayer("t", {
    name: "Buffs 4", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
    }},
    color: "#aacc77",
  branches: ["f"],
  onPrestige(gain){
    player.s.points=new Decimal(0)
    player.o.points=new Decimal(0)
    player.f.points=new Decimal(0)
    
  },
  passiveGeneration(){return hasUpgrade("c",11)},
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "Mega prestige points", // Name of prestige currency
  effectDescription() {
    let x = player.t.points.plus(2).pow(0.1)
    return "multiplying hyper, super, normal prestige points, and points, by "+format(x)
  },
    baseResource: "Hyper prestige points", // Name of resource prestige is based on
    baseAmount() {return player.f.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.125, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
      if (hasUpgrade("t",21)) mult=mult.times(2)
      if (hasUpgrade("c",12))mult=mult.times(player.c.points.plus(1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1).times(hasUpgrade("t",24)?2:1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "T: Reset for Mega prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.t.unlocked||player.f.points.gte(100)||hasUpgrade("f",24)},
  upgrades:{
    rows: 2,
    cols: 4,
    11: {
      title: "Remove",
      description: "Gain 100% of hyper prestige points per second",
      cost: new Decimal(1)
    },
    12: {
      title: "The",
      description: "Delay the fourth point slow down by 10x",
      cost: new Decimal(3)
    },
    13: {
      title: "Softcaps",
      description: "Square the number in the first upgrade",
      cost: new Decimal(6)
    },
    14: {
      title: "And",
      description: "Buff the first O upgrade",
      cost: new Decimal(20)
    },
    21: {
      title: "Unlock",
      description: "Gain twice as many Mega prestige points",
      cost: new Decimal(30)
    },
    22: {
      title: "A",
      description: "Gain ee1000 points per second",
      cost: new Decimal(40)
    },
    23: {
      title: "New",
      description: "Raise all hyper prestige point effects to the 6969",
      cost: new Decimal(50)
    },
    24: {
      title: "Layer",
      description: "Third point slowdown never starts, square mega prestige point gain, and unlock another layer",
      cost: new Decimal(69)
    },
  },
  doReset(layer){
    if (layer.row>this.row){
      if (false){player[this.layer].upgrades=[]}
    
      player[this.layer].points=new Decimal(0)
    }
  }
})
addLayer("c", {
    name: "Buffs 5", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
    }},
    color: "#db1db1",
  branches: ["t"],
  onPrestige(gain){
    player.s.points=new Decimal(0)
    player.o.points=new Decimal(0)
    player.f.points=new Decimal(0)
    player.t.points=new Decimal(0)
  },
    requires: new Decimal(1e72), // Can be a function that takes requirement increases into account
    resource: "Giga prestige points", // Name of prestige currency
  effectDescription() {
    return ""
  },
    baseResource: "Mega prestige points", // Name of resource prestige is based on
    baseAmount() {return player.t.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.03, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1).times(hasUpgrade("c",22)?3:1)
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "C: Reset for Giga prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.c.unlocked||player.t.points.gte(1e69)||hasUpgrade("t",24)},
  passiveGeneration(){return hasUpgrade("c",21)?1:0},
  upgrades:{
    rows: 2,
    cols: 4,
    11: {
      title: "Remove",
      description: "Gain 100% of mega prestige points per second",
      cost: new Decimal(1)
    },
    12: {
      title: "The",
      description: "Giga prestige points multiply mega prestige points",
      cost: new Decimal(3)
    },
    13: {
      title: "Softcaps",
      description: "Raise point gain to the 10 after everything else",
      cost: new Decimal(6)
    },
    14: {
      title: "And",
      description: "hyper and above prestige points delay 4th point slowdown",
      cost: new Decimal(1e20)
    },
    21: {
      title: "Unlock",
      description: "Gain 100% of giga prestige points per second",
      cost: new Decimal("1e42069")
    },
    22: {
      title: "A",
      description: "Giga prestige point gain is cubed",
      cost: new Decimal("1e49200")
    },
    23: {
      title: "New",
      description: "Gain 10^^4 points per second",
      cost: new Decimal("1e174533")
    },
    24: {
      title: "Layer",
      description: "Fourth slowdown never starts and unlock another layer",
      cost: new Decimal("1e11966250")
    },
  },
  doReset(layer){
    if (layer.row>this.row){
      if (false){player[this.layer].upgrades=[]}
    
      player[this.layer].points=new Decimal(0)
    }
  }
})
addLayer("a", {
    name: "Buffs 6", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
    }},
    color: "#19c5dc",
  branches: ["c"],
  onPrestige(gain){
    player.s.points=new Decimal(0)
    player.o.points=new Decimal(0)
    player.f.points=new Decimal(0)
    player.t.points=new Decimal(0)
    player.c.points=new Decimal(0)
  },
    requires: new Decimal("10^^4"), // Can be a function that takes requirement increases into account
    resource: "Ultra prestige points", // Name of prestige currency
  effectDescription() {
    return (hasUpgrade("a",11)?"raising point gain to the "+format(player.a.points):"")
  },
    baseResource: "Giga prestige points", // Name of resource prestige is based on
    baseAmount() {return player.c.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 5, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset for Ultra prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.a.unlocked||player.c.points.gte("10^^4")||hasUpgrade("c",24)},
  passiveGeneration(){return hasUpgrade("a",11)?1:0},
  upgrades:{
    rows: 2,
    cols: 4,
    11: {
      title: "Remove",
      description: "Gain 100% of ultra prestige points per second and give ultra prestige points an effect",
      cost: new Decimal("10^^4")
    },
    12: {
      title: "The",
      description: "Tetrate point gain by 2",
      cost: new Decimal("10^^20")
    },
    13: {
      title: "Softcaps",
      description: "Tetrate point gain by 200",
      cost: new Decimal("10^^200")
    },
    14: {
      title: "And",
      description: "Begin inflating",
      cost: new Decimal("10^^2e4")
    },
    21: {
      title: "Finish",
      description: "Points boost points",
      cost: new Decimal("10^^1e5")
    },
    22: {
      title: "Tree",
      description: "Buff previous upgrade",
      cost: new Decimal("10^^1e10")
    },
    23: {
      title: "Of",
      description: "Buff previous upgrade",
      cost: new Decimal("10^^1e20")
    },
    24: {
      title: "Nerfs",
      description: "Buff previous upgrade and unlock the last layer",
      cost: new Decimal("10^^4.2e69")
    },
  },
  doReset(layer){
    if (layer.row>this.row){
      if (false){player[this.layer].upgrades=[]}
    
      player[this.layer].points=new Decimal(0)
    }
  }
})
/*addLayer("p", {
    name: "what", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
    }},
    color: "#fafb2c",
  branches: ["a"],
  effectDescription(){return "which means you have restarted "+format(player.p.points)+" times"},
  getResetGain(){return new Decimal(1)},
  getNextAt(){return new Decimal("10^^1.79e308")},
  canReset() {return player.points.gte("10^^1.79e308")},
  prestigeButtonText(){return "Gain 1 prestige^2 point but lose all your progress"},
  onPrestige(gain){
    player.s.points=new Decimal(0)
    player.o.points=new Decimal(0)
    player.f.points=new Decimal(0)
    player.t.points=new Decimal(0)
    player.c.points=new Decimal(0)
    player.a.points=new Decimal(0)
    player.s.upgrades=[]
    player.o.upgrades=[]
    player.f.upgrades=[]
    player.t.upgrades=[]
    player.c.upgrades=[]
    player.a.upgrades=[]
  },
    requires: new Decimal("10^^1.79e308"), // Can be a function that takes requirement increases into account
    resource: "Prestige^2 points", // Name of prestige currency

    baseResource: "Ultra prestige points", // Name of resource prestige is based on
    baseAmount() {return player.a.points}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have

    row: 6, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige^2 points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.p.unlocked||player.a.points.gte("10^^1.79e308")||hasUpgrade("a",24)},
  
})*/