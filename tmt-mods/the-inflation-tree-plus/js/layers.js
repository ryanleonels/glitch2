addLayer("i", {
    name: "Inflation", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "inflation", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent(){
  if (hasUpgrade("i",21)){
    return player.i.points.plus(2)
  }else return 2
}, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
      if (hasUpgrade("ui",21))mult=mult.times(player.ui.points.plus(1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1).plus(hasUpgrade("ui",23)?1:0)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "i", description: "I: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
  passiveGeneration(){return new Decimal(hasUpgrade("i",12)?1:0)},
  upgrades:{
    rows: 3,
    cols: 3,
    11: {
      description: "Gain 100% of points per second",
      cost: new Decimal(1),
    },
    12: {
      description: "Gain 100% of inflation per second",
      cost: new Decimal(10),
      unlocked(){return hasUpgrade("i",11)}
    },
    13: {
      description: "Inflation multiplies points",
      cost: new Decimal("1e10"),
      unlocked(){return hasUpgrade("i",12)}
    },
    21: {
      description: "Points add to inflation gain exponent",
      cost(){
        if (hasUpgrade("id",21))return new Decimal("e5e7")
        return new Decimal((hasMilestone("id",1)?"ee8":"ee10"))},
      unlocked(){return hasUpgrade("i",13)}
    },
    22: {
      description: "Tetrate points to the 10",
      cost(){return  new Decimal((hasMilestone("id",1)?"10^^50":"10^^100"))},
      unlocked(){return hasUpgrade("i",21)}
    },
    23: {
      description: "Tetrate points to the number of seconds played",
      cost(){return  new Decimal((hasMilestone("id",1)?"10^^300":"10^^1000"))},
      unlocked(){return hasUpgrade("i",22)}
    },
    31: {
      description: "Tetrate points to slog of itself",
      cost(){return  new Decimal((hasMilestone("id",1)?"10^^1e3":"10^^1e4"))},
      unlocked(){return hasUpgrade("i",23)}
    },
    32: {
      description: "Tetrate points to slog of itself",
      cost(){return  new Decimal((hasMilestone("id",1)?"10^^1e15":"10^^1e20"))},
      unlocked(){return hasUpgrade("i",31)}
    },
    33: {
      description: "Inflate",
      cost(){return  new Decimal((hasMilestone("id",1)?"10^^1e50":"10^^1e100"))},
      unlocked(){return hasUpgrade("i",32)}
    },
  },
})

addLayer("si", {
    name: "Super-Inflation", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SI", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
    }},
  branches:["i"],
    color: "#4BDC13",
    requires: new Decimal(1e4), // Can be a function that takes requirement increases into account
    resource: "super-inflation", // Name of prestige currency
    baseResource: "inflation", // Name of resource prestige is based on
    baseAmount() {return player.i.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.id.points.gte(1)},
  passiveGeneration(){return new Decimal(hasUpgrade("si",12)?1:0)},
  upgrades:{
    rows: 3,
    cols: 3,
    11: {
      description: "Super-inflation adds to point gain",
      cost: new Decimal(1),
    },
    12: {
      description: "You get 100% of super-inflation gain each second.",
      cost: new Decimal(25),
    },
    13: {
      description: "Points are now 10^points",
      cost: new Decimal(100),
    },
  },
})
addLayer("hi", {
    name: "Hyper-Inflation", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "HI", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
    }},
  branches:["si"],
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "hyper-inflation", // Name of prestige currency
    baseResource: "super-inflation", // Name of resource prestige is based on
    baseAmount() {return player.si.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "h", description: "H: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.id.points.gte(2)},
  passiveGeneration(){return (hasUpgrade("hi",12)?1:0)},
  upgrades:{
    rows: 3,
    cols: 3,
    11: {
      description: "Hyper-inflation^10 multiplies points.",
      cost: new Decimal(1),
    },
    12: {
      description: "You get 100% of hyper-inflation gain each second.",
      cost: new Decimal(15),
    },
    13: {
      description: "Points are now 10^points",
      cost: new Decimal(40),
    },
  },
})
addLayer("ui", {
    name: "Uber-Inflation", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "UI", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
    }},
  branches:["hi"],
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "uber-inflation", // Name of prestige currency
    baseResource: "hyper-inflation", // Name of resource prestige is based on
    baseAmount() {return player.hi.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "u", description: "U: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.id.points.gte(3)},
  passiveGeneration(){return (hasUpgrade("ui",12)?1:0)},
  upgrades:{
    rows: 3,
    cols: 3,
    11: {
      description: "Raise points to the power of uber-inflation^100",
      cost: new Decimal(1),
    },
    12: {
      description: "You get 100% of uber-inflation gain each second.",
      cost: new Decimal(5),
    },
    13: {
      description: "Points are now 10^points",
      cost: new Decimal(10),
    },
    21: {
      description: "Uber inflation multiplies inflation gain",
      cost: new Decimal(10000),
    },
    22: {
      description: "Uber inflation multiplies point gain",
      cost: new Decimal(1e10),
    },
    23: {
      description: "Add 1 to inflation gain exponent",
      cost: new Decimal("1e1e7"),
    },
  },
})
addLayer("id", {
    name: "Inflated", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ID", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    points: new Decimal(0),
    }},
  branches: ["i"],
    color: "#4BDC13",
    requires(){
      if (hasUpgrade("id",21))return new Decimal("10^^1e10")
      if (hasMilestone("id",3)) return new Decimal("10^^1e100")
              else return new Decimal("10^^1e307")}, // Can be a function that takes requirement increases into account
    resource: "Inflated games", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base: 1,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 10, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "d", description: "D: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
  autoPrestige(){return hasMilestone("id",5)&&player.id.points.lt(100)},
  resetsNothing(){return hasMilestone("id",5)},
    layerShown(){return true},
        effect() {
            let eff = player[this.layer].points
            if (player[this.layer].points.gt(2)) eff = eff.pow(player[this.layer].points.div(10).add(1)).floor()
          if (hasUpgrade("id",13))eff=eff.sub(player[this.layer].points)
            return eff
        },
        effectDescription() { // Optional text to describe the effects
            eff = this.effect();
            return "which are applying log10 to point generation "+format(eff)+" times"
        },
  milestones:{
    0: {
        requirementDescription: "2 inflated games",
        effectDescription: "Keep the first 2 inflation upgrades on all resets",
        done() { return player.id.points.gte(2) }
    },
    1: {
        requirementDescription: "3 inflated games",
        effectDescription: "Lower the price of the last 6 inflation upgrades",
        done() { return player.id.points.gte(3) }
    },
    2: {
        requirementDescription: "4 inflated games",
        effectDescription: "Keep the first 2 upgrades of all layers on all resets",
        done() { return player.id.points.gte(4) }
    },
    3: {
        requirementDescription: "5 inflated games",
        effectDescription: "Buying the 4th inflation upgrade also gives you the last 5, and reset only requires Fe100",
        done() { return player.id.points.gte(5) }
    },
    4: {
        requirementDescription: "6 inflated games",
        effectDescription: "Keep all third upgrades on resets",
        done() { return player.id.points.gte(6) },
  unlocked(){return hasMilestone("id",3)}
    },
    5: {
        requirementDescription: "7 inflated games",
        effectDescription: "Automatically buy inflation upgrade 4 and inflated game prestige and inflated games reset nothing",
        done() { return player.id.points.gte(7) },
  unlocked(){return hasMilestone("id",4)}
    },
  },
  upgrades:{
    rows: 3,
    cols: 3,
    11: {
      description: "points are now 10^points",
      cost: new Decimal(4),
    },
12: {
      description: "points are now 10^points",
      cost: new Decimal(4),
    },
    13: {
      description: "Subract from the inflated game effect based on inflated games",
      cost: new Decimal(5),
      unlocked(){return hasUpgrade("id",12)}
    },
    21: {
      description: "Lower 4th inflation upgrade cost and reset now requires 10^^1e10",
      cost: new Decimal(6),
      unlocked(){return hasUpgrade("id",13)}
    },
    22: {
      description: "Unlock a new layer",
      cost: new Decimal(100),
      unlocked(){return hasUpgrade("id",21)}
    },
  },
  update(diff){
    if (hasMilestone("id",5)&&!hasUpgrade("i",21)&&player.i.points.gte("e5e7")){player.i.upgrades.push(21)}
    if (hasMilestone("id",0)){
if (!hasUpgrade("i",11)){
        player.i.upgrades.push(11)
        player.i.upgrades.push(12)
}
      
    }
    if (hasMilestone("id",2)){
      if (!hasUpgrade("si",11)){
        player.si.upgrades.push(11)
        player.si.upgrades.push(12)
}if (!hasUpgrade("hi",11)){
        player.hi.upgrades.push(11)
        player.hi.upgrades.push(12)
}
      if (!hasUpgrade("ui",11)){
        player.ui.upgrades.push(11)
        player.ui.upgrades.push(12)
}
    }
      if (hasMilestone("id",3)){
if (hasUpgrade("i",21)&&!hasUpgrade("i",22)){
        player.i.upgrades.push(22)
        player.i.upgrades.push(23)
  player.i.upgrades.push(31)
  player.i.upgrades.push(32)
  player.i.upgrades.push(33)
}
      
    }
    if (hasMilestone("id",4)){
      if (!hasUpgrade("i",13)){
        player.i.upgrades.push(13)
        player.si.upgrades.push(13)
        player.hi.upgrades.push(13)
        player.ui.upgrades.push(13)
}
    }
      if (player.id.points.gte(100))player.id.points=new Decimal(100)
  },
})
