addLayer("l21", {
    name: "super prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
    }},
  branches: ["l11"],
  effectDescription(){return "Boosting prestige gain by x"+format(this.effect())},
  effect(){
    return player.l21.points.add(2).pow(0.75)},
    color: "#02f58c",
    requires: new Decimal(1e9), // Can be a function that takes requirement increases into account
    resource: "super prestige points", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.l11.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1/3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
if(hasUpgrade("l26",12))mult=mult.mul(player.l22.points.add(1))
      mult=mult.mul(tmp.l31.effect)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for super prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("l11",21)||player[this.layer].unlocked},
milestones: {
    0: {
        requirementDescription: "5 super prestige",
        effectDescription: "Gain 100% of prestige points on reset every second",
        done() { return player.l21.points.gte(5) }
    },
},
  upgrades: {
    11: {
        description: "Square leaf gain",
        cost: new Decimal(5),
    },
    12: {
        description: "Cube line effect, and gain 5x bugs",
        cost: new Decimal(1e14),
    },
    13: {
        description: "Unlock a formula buyable",
        cost: new Decimal(1e30),
      unlocked(){return hasUpgrade("l28",11)}
    },
  },
  doReset(l){
    if(layers[l].row>this.row&&!hasMilestone("l31",1)){
      layerDataReset(this.layer,[])
    }
  },
})
addLayer("l22", {
    name: "lines", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
    }},
  branches: ["l12"],
  effectDescription(){return "Boosting point and pointer gain by x"+format(this.effect())},
  effect(){
    return player.l22.points.cbrt().add(1).pow(hasUpgrade("l21",12)?3:1).pow(hasUpgrade("l26",14)?3:1)},
    color: "#46b9b4",
    requires(){let r= new Decimal(5e9)
    if(hasUpgrade("l27",12))r=r.div(player.l23.points.sqr().max(1))
              return r}, // Can be a function that takes requirement increases into account
    resource: "lines", // Name of prestige currency
    baseResource: "pointers", // Name of resource prestige is based on
    baseAmount() {return player.l12.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2, // Prestige currency exponent
  base: 2,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "L", description: "Shift+L: Reset for lines", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("l11",22)||player[this.layer].unlocked},
  resetsNothing(){return hasMilestone("l22",2)},
milestones: {
    0: {
        requirementDescription: "1 line",
        effectDescription: "Keep pointer upgrades on resets",
        done() { return player.l22.points.gte(1) }
    },
  1: {
        requirementDescription: "2 lines",
        effectDescription: "Keep pointer buyables on resets and gain 200% of pointers on reset per second",
        done() { return player.l22.points.gte(2) }
    },
  2: {
        requirementDescription: "3 lines",
        effectDescription: "Lines reset nothing and autobuy pointer buyables",
        done() { return player.l22.points.gte(3) }
    },
},
upgrades: {
    11: {
        description: "Dollars boost leaves, leaf effect ^1.25, and upgrades don't spend your lines.",
        cost: new Decimal(2),
      pay(){}
    },
  12: {
        description: "Super prestige point effect also affects dollars at 200% power",
        cost: new Decimal(3),
      pay(){}
    },
  },
})
addLayer("l23", {
    name: "Formulas", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
    }},
  branches: ["l13","l14"],
    color: "#9e7ad0",
  effect(){return player.l23.points.add(1).ln().add(1).pow(new Decimal(hasUpgrade("l23",12)?3.2:3).add(buyableEffect("l23",11)))},
  effectDescription(){return "Multiplying point, game, and number gain by "+format(this.effect())},
    requires: new Decimal(5e7), // Can be a function that takes requirement increases into account
    resource: "formulas", // Name of prestige currency
    baseResource: "numbers", // Name of resource prestige is based on
    baseAmount() {return player.l13.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
      if(hasUpgrade("l23",13))mult=mult.mul(player.l24.points.pow(0.2).add(1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "f", description: "F: Reset for formulas", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("l11",23)||player[this.layer].unlocked},
milestones: {
    0: {
        requirementDescription: "3 formulas",
        effectDescription: "Keep number and game upgrades on reset",
        done() { return player.l23.points.gte(3) }
    },
  1: {
        requirementDescription: "10 formulas",
        effectDescription: "Gain 300% of numbers on reset per second",
        done() { return player.l23.points.gte(10) }
    },
  2: {
        requirementDescription: "100 formulas",
        effectDescription: "Gain 400% of games on reset per second",
        done() { return player.l23.points.gte(100) }
    },
},
upgrades: {
    11: {
        description: "Improve the first pointer buyable's formula (x->x^1.1).",
        cost: new Decimal(5000),
    },
12: {
        description: "The formula effect formula is better (ln(x)³->ln(x)^3.2)",
        cost: new Decimal(50000),
    },
  13: {
        description: "Bugs increase incrementali, which increase formula gain",
        cost: new Decimal(1e12),
    },
  14: {
        description: "Raise point gain to the 1.5 if it is less than 1e700, otherwise raise it to the 1.05",
        cost: new Decimal("1e334"),
    },
  },
  buyables: {
    11: {
        cost(x=getBuyableAmount(this.layer, this.id)) { return Decimal.pow(10,x.pow(3)).mul(1e30).floor() },
        display() { return "Add "+format(this.effect())+" to the formula effect exponent by spending "+format(this.cost())+" formulas" },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
      base(){let b=new Decimal(0.1)
            return b},
      effect(){let e= Decimal.mul(this.base(),getBuyableAmount(this.layer, this.id))
      return e},
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      unlocked(){return hasUpgrade("l21",13)},
    },
  },
})
addLayer("l24", {
    name: "Incrementali", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 4, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
    }},
  branches: ["l15"],
    color: "#4924f3",
    requires: new Decimal(1e20), // Can be a function that takes requirement increases into account
    resource: "Incrementali", // Name of prestige currency
    baseResource: "incrementy", // Name of resource prestige is based on
    baseAmount() {return player.l15.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
      if(hasUpgrade("l23",13))mult=mult.mul(player.l25.points.pow(0.2).add(1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "I", description: "Shift+I: Reset for incrementali", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("l11",24)||player[this.layer].unlocked},
milestones: {
    0: {
        requirementDescription: "1 incrementali",
        effectDescription: "Keep incrementy upgrades on resets and gain 500% of incrementy on reset every second",
        done() { return player.l24.points.gte(1) }
    },
},
  upgrades: {
    11: {
        description: "Incrementali and incrementy boost point gain",
        cost: new Decimal(2),
    },
12: {
        description: "Keep money and leaf upgrades",
        cost: new Decimal(1e6),
    },
  },
})
addLayer("l25", {
    name: "Bugs", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 5, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
    }},
  branches: ["l14"],
    color: "#fb2365",
    requires: new Decimal(1e25), // Can be a function that takes requirement increases into account
    resource: "Bugs", // Name of prestige currency
    baseResource: "Games", // Name of resource prestige is based on
    baseAmount() {return player.l14.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
      if(hasUpgrade("l21",12))mult=mult.mul(5)
        return mult
    },
  softcap: new Decimal(Number.MAX_VALUE),
  softcapPower: 0.0625,
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for bugs", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("l11",25)||player[this.layer].unlocked},
effect(){return new Decimal(1).div(player.l25.points.add(1).log10().add(1).log10().add(1)).root(4).mul(buyableEffect(this.layer,11))},
  effectDescription(){let e= "Raising game gain to the "+format(this.effect().pow(hasUpgrade("l26",13)?0.5:1))
  if(!hasChallenge("l28",12))e+=" but rooting point gain by "+format(this.effect().cbrt())
                     return e},
  buyables: {
    11: {
        cost(x=getBuyableAmount(this.layer, this.id)) { return Decimal.pow(2,x.pow(1.5)).floor() },
        display() { return "Fix "+format(this.cost())+" bugs, multiplying the bug effect's first effect by "+format(this.effect()) },
        canAfford() { return player[this.layer].points.gte(this.cost())&&this.effect().lt(2.25) },
      base(){let b=new Decimal(0.01)
            return b},
      effect(){let e= Decimal.add(1,Decimal.mul(this.base(),getBuyableAmount(this.layer, this.id)))
      return e},
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      unlocked(){return true},
    },
    12: {
        cost(x=getBuyableAmount(this.layer, this.id)) { return Decimal.pow(3,x.pow(1.6)).mul(5).floor() },
        display() { return "Squash "+format(this.cost())+" bugs, multiplying game gain by "+format(this.effect()) },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
      base(){let b=new Decimal(100)
            return b},
      effect(){return Decimal.pow(this.base(),getBuyableAmount(this.layer, this.id))},
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      unlocked(){return true},
    },
},
})
addLayer("l26", {
    name: "Matter", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "MA", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 6, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
    }},
  branches: ["l16"],
    color: "#bc2d84",
    requires: new Decimal(1e20), // Can be a function that takes requirement increases into account
    resource: "Matter", // Name of prestige currency
    baseResource: "null matter", // Name of resource prestige is based on
    baseAmount() {return player.l16.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "M", description: "Shift+M: Reset for matter", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("l11",26)||player[this.layer].unlocked},
milestones: {
    0: {
        requirementDescription: "1 matter",
        effectDescription: "Keep null matter upgrades",
        done() { return player.l26.points.gte(1) }
    },
},
  upgrades: {
    11: {
        description: "Gain 600% of null matter and 700% of leaves on reset every second",
        cost: new Decimal(1),
    },
12: {
        description: "Lines multiply super prestige gain",
        cost: new Decimal(20),
    },
    13: {
        description: "The bad effect of bugs are square rooted",
        cost: new Decimal(300),
    },
    14: {
        description: "Cube the line effect",
        cost: new Decimal(2.5e8),
      unlocked(){return hasUpgrade("l28",11)}
    },
  },
})
addLayer("l27", {
    name: "Branches", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BR", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 7, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
    }},
  branches: ["l17"],
    color: "#FB9EA1",
    requires: new Decimal(1e46), // Can be a function that takes requirement increases into account
    resource: "Branches", // Name of prestige currency
    baseResource: "leaves", // Name of resource prestige is based on
    baseAmount() {return player.l17.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
      if(hasUpgrade("l28",11))mult=mult.mul(player.l28.points.add(1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "B", description: "Shift+B: Reset for branches", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("l11",27)||player[this.layer].unlocked},
  upgrades: {
    11: {
        description: "Unlock a leaf upgrade",
        cost: new Decimal(1),
    },
    12: {
        description: "Formulas² divides line requirement",
        cost: new Decimal(2),
    },
    13: {
        description: "Matter multiplies game gain and branches multiply null matter",
        cost: new Decimal(100),
    },
  },
})
addLayer("l28", {
    name: "Apples", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 8, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
    }},
    color: "#bee129",
    requires: new Decimal(1e100), // Can be a function that takes requirement increases into account
    resource: "apples", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset for apples", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("l11",28)||player[this.layer].unlocked},
  milestones: {
    0: {
        requirementDescription: "1 apple",
        effectDescription: "Gain 800% of money on reset per second",
        done() { return player.l28.points.gte(1) }
    },
},
  upgrades: {
    11: {
        description: "Apples multiply branches and unlock a lot of upgrades",
        cost: new Decimal(3),
    },
    12: {
        description: "Unlock some challenges and point gain x3.33e33",
        cost: new Decimal(1e100),
    },
    13: {
        description: "Unlock more upgrades",
        cost: new Decimal(1e101),
    },
  },
  challenges: {
    11: {
        name: "1",
        challengeDescription: "Point gain is square rooted before other nerfs",      
      rewardDescription(){return "Dollar gain is increased"},
        canComplete: function() {return player.points.gte("e1000")},
      goalDescription(){return "Reach e1000 points"},
      unlocked(){return hasUpgrade("l28",12)},
    },
    12: {
        name: "2",
        challengeDescription: "same as <b>1</b> but point gain ^1.08",  
      countsAs: [11],
      rewardDescription(){return "Remove the bad bug effect but squish all bugs"},
        canComplete: function() {return player.points.gte("e1000")},
      goalDescription(){return "Reach e1000 points"},
      unlocked(){return hasUpgrade("l28",12)},
      onComplete(){player.l25.points=new Decimal(0)}
    },
},
})