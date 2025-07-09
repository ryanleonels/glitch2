addLayer("l11", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    points: new Decimal(0),
    }},
  effectDescription(){return "Adding "+format(this.effect())+" to point gain."},
  effect(){
    if(hasUpgrade("l16",11))return player.l11.points.add(1).pow(0.5)
    return player.l11.points.add(1).ln()},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
      if(hasUpgrade("l14",11))mult=mult.mul(player.l14.points.mul(11).add(10).log10().pow(3))
      if(hasUpgrade("l14",15))mult=mult.mul(player.l12.points.add(1).ln().add(2))
      if(player.l21.unlocked)mult=mult.mul(tmp.l21.effect)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
  passiveGeneration(){return hasMilestone("l21",0)},
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
  upgrades: {
    11: {
        description: "Add 0.5 to point gain.",
        cost: new Decimal(2),
    },
    12: {
        description: "Unlock another layer",
        cost: new Decimal(3),
    },
    13: {
        description: "Unlock another layer",
        cost: new Decimal(12),
    },
    14: {
        description: "Unlock another layer",
        cost: new Decimal(30),
    },
    15: {
        description: "Unlock another layer",
        cost: new Decimal(500),
    },
    16: {
        description: "Unlock another layer",
        cost: new Decimal(20000),
    },
    17: {
        description: "Unlock another layer",
        cost: new Decimal(500000),
    },
    18: {
        description: "Unlock another layer",
        cost: new Decimal(2e7),
    },
    21: {
        description: "Unlock another layer",
        cost: new Decimal(2e9),
    },
    22: {
        description: "Unlock another layer",
        cost: new Decimal(2e12),
    },
    23: {
        description: "Unlock another layer",
        cost: new Decimal(5e13),
    },
    24: {
        description: "Unlock another layer",
        cost: new Decimal(1e25),
    },
    25: {
        description: "Unlock another layer",
        cost: new Decimal(1e30),
    },
    26: {
        description: "Unlock another layer",
        cost: new Decimal(1e37),
    },
    27: {
        description: "Unlock another layer",
        cost: new Decimal(1e47),
    },
    28: {
        description: "Unlock another layer",
        cost: new Decimal(1e75),
    },31: {
        description: "Unlock another layer",
        cost: new Decimal("1e2365"),
    },
},
  doReset(l){
    if(layers[l].row>this.row){
      layerDataReset(this.layer,["upgrades"])
    }
  },
})
addLayer("l12", {
    name: "pointers", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
    }},
    color: "#aa8d41",
    requires: new Decimal(20), // Can be a function that takes requirement increases into account
    resource: "pointers", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.4, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
      if(hasUpgrade("l14",11))mult=mult.mul(player.l14.points.mul(11).add(10).log10().pow(3))
      if(hasUpgrade("l12",12))mult=mult.mul(player.l13.points.sqrt().sqrt().add(1))
      if(player.l22.unlocked)mult=mult.mul(tmp.l22.effect)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "P", description: "Shift+P: Reset for pointers", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("l11",12)||player[this.layer].unlocked},
  upgrades: {
    11: {
        description: "Pointers multiply point gain by sqrt(pointers+1)",
        cost: new Decimal(1),
    },
12: {
        description: "Numbers boost pointer gain",
        cost: new Decimal(50),
    },
    13: {
        description: "Unlock another buyable",
        cost: new Decimal(3e5),
    },
},
  passiveGeneration(){return hasMilestone("l22",1)?2:0},
  buyables: {
    11: {
        cost(x=getBuyableAmount(this.layer, this.id)) { return new Decimal(10000).mul(Decimal.pow(2,x.pow(Decimal.sub(2,hasUpgrade("l17",12)?Decimal.sub(0.95,Decimal.pow(0.95,player.l22.points).mul(0.95)):0)))) },
        display() { let s =  "Sacrifice "+format(this.cost())+" pointers for a total of x"+format(this.effect())+(this.effect().gte("e2500")?" (hardcapped)":"")+" to Game and Incrementy gain." 
        return s},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
      base(){let b=new Decimal(1.1)
      if(hasUpgrade(this.layer,13))b=b.add(buyableEffect("l12",12))
            return b},
      effect(){return Decimal.pow(this.base(),getBuyableAmount(this.layer, this.id).pow(hasUpgrade("l23",11)?1.1:1)).min("e2500")},
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      unlocked(){return hasUpgrade("l13",11)},
    },
    12: {
        cost(x=getBuyableAmount(this.layer, this.id)) { return new Decimal(1e5).mul(Decimal.pow(10,x.pow(Decimal.sub(1.5,hasUpgrade("l17",12)?Decimal.sub(0.4,Decimal.pow(0.9,player.l22.points).mul(0.4)):0)))) },
        display() { return "Sacrifice "+format(this.cost())+" pointers for an additional "+format(this.effect())+" to the previous buyable's base." },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
      effect(){return getBuyableAmount(this.layer, this.id).div(20)},
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      unlocked(){return hasUpgrade("l12",13)},
    },
},
  update(diff){
    if(hasMilestone("l22",2)){
      if(layers.l12.buyables[11].canAfford())layers.l12.buyables[11].buy()
      if(layers.l12.buyables[12].canAfford())layers.l12.buyables[12].buy()
      
    }
  },
  doReset(l){
    if(layers[l].row>this.row){
      let k=[]
      if(hasMilestone("l22",0))k.push("upgrades")
      if(hasMilestone("l22",1))k.push("buyables")
      layerDataReset(this.layer,k)
    }
  },
})
addLayer("l13", {
    name: "numbers", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "N", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
    }},
    color: "#4d0a55",
  effectDescription(){return "Adding "+format(this.effect())+" to point gain."},
  effect(){let e= player.l13.points.pow(0.6).mul(5)
  if(hasUpgrade("l14",12))e=e.pow(1.25)
           if(hasUpgrade("l14",13))e=e.pow(1.25)
           if(hasUpgrade("l14",14))e=e.pow(1.25)
          return e},
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "numbers", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.35, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
      if(hasUpgrade("l15",14))mult=mult.mul(player.l14.points.add(4).ln().pow(2))
      if(player.l23.unlocked)mult=mult.mul(tmp.l23.effect)
        return mult
    },passiveGeneration(){return hasMilestone("l23",1)?3:0},
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "n", description: "N: Reset for numbers", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("l11",13)||player[this.layer].unlocked},
  upgrades: {
    11: {
        description: "Unlock a pointer buyable",
        cost: new Decimal(100),
    },
12: {
        description: "Null matter boosts incrementy gain",
        cost: new Decimal(1000),
    },
    13: {
        description: "remove the extreme inflation nerf",
        cost: new Decimal("e407"),
      unlocked(){return hasUpgrade("l28",13)},
    },
},
  doReset(l){
    if(layers[l].row>this.row){
      let k=[]
      if(hasMilestone("l23",0))k.push("upgrades")
      layerDataReset(this.layer,k)
    }
  },
})
addLayer("l14", {
    name: "games", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 4, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
    }},
    color: "#6aeb67",
    requires: new Decimal(250), // Can be a function that takes requirement increases into account
    resource: "games", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
      if(tmp.l12.buyables[11].unlocked)mult=mult.mul(buyableEffect("l12",11))
      if(hasUpgrade("l18",11))mult=mult.mul(upgradeEffect("l18",11))
      if(player.l23.unlocked)mult=mult.mul(tmp.l23.effect)
      if(player.l25.unlocked)mult=mult.mul(buyableEffect("l25",12))
      if(hasUpgrade("l27",13))mult=mult.mul(player.l26.points.add(1))
        return mult
    },passiveGeneration(){return hasMilestone("l23",2)?4:0},
    gainExp() { // Calculate the exponent on main currency from bonuses
        let x= new Decimal(1)
        if(hasUpgrade("l15",13))x=x.add(Decimal.div(player.l11.upgrades.length,100))
      if(player.l25.unlocked)x=x.mul(tmp.l25.effect.pow(hasUpgrade("l26",13)?0.5:1))
        return x
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "g", description: "G: Reset for games", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("l11",14)||player[this.layer].unlocked},
  upgrades: {
    11: {
        description: "Games boost prestige and pointer gain",
        cost: new Decimal(1),
    },
    12: {
        description: "Number effect ^1.25",
        cost: new Decimal(25),
    },
    13: {
        description: "Number effect ^1.25",
        cost: new Decimal(125),
    },
    14: {
        description: "Number effect ^1.25",
        cost: new Decimal(625),
    },
    15: {
        description: "Pointers boost prestige point gain",
        cost: new Decimal(1e4),
    },
},doReset(l){
    if(layers[l].row>this.row){
      let k=[]
      if(hasMilestone("l23",0))k.push("upgrades")
      layerDataReset(this.layer,k)
    }
  },
})
addLayer("l15", {
    name: "incrementy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 5, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
    }},
    color: "#f5da78",
    requires: new Decimal(5000), // Can be a function that takes requirement increases into account
    resource: "incrementy", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
      if(tmp.l12.buyables[11].unlocked)mult=mult.mul(buyableEffect("l12",11))
      if(hasUpgrade("l13",12))mult=mult.mul(player.l16.points.add(1))
      
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "i", description: "I: Reset for incrementy", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("l11",15)||player[this.layer].unlocked},
  doReset(l){
    if(layers[l].row>this.row){
      let k=[]
      if(hasMilestone("l24",0))k.push("upgrades")
      layerDataReset(this.layer,k)
    }
  },passiveGeneration(){return hasMilestone("l24",0)?5:0},
  upgrades: {
    11: {
        description: "Triple point gain",
        cost: new Decimal(1),
    },
    12: {
        description: "log(log(The product of all row 1 resources)) multiplies points",
      effect(){let p = player.l11.points.add(1).mul(player.l12.points.add(1)).mul(player.l13.points.add(1)).mul(player.l14.points.add(1)).mul(player.l15.points.add(1)).mul(player.l16.points.add(1)).mul(player.l17.points.add(1)).mul(player.l18.points.add(1)).add(1)
      p=p.log(hasUpgrade("l17",11)?1.1:hasUpgrade("l16",13)?7:hasUpgrade("l16",13)?8:hasUpgrade("l16",12)?9:10).add(1).log(hasUpgrade(this.layer,15)?1.1:10).add(1)
              return p},
        cost: new Decimal(10),
    },
    13: {
        description: "Each prestige upgrade adds 0.01 to the game gain exponent",
        cost: new Decimal(1000),
    },
    14: {
        description: "Games boost number gain",
        cost: new Decimal(10000),
    },
    15: {
        description: "The log10 in the 2nd upgrade is a log1.1",
        cost: new Decimal(1e100),
      unlocked(){return hasUpgrade("l28",11)}
    },
},
})
addLayer("l16", {
    name: "null matter", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "NM", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 6, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
    }},passiveGeneration(){return hasUpgrade("l26",11)?6:0},
    color: "#cc677b",
    requires: new Decimal(1e5), // Can be a function that takes requirement increases into account
    resource: "null matter", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
      if(player.l17.unlocked)mult=mult.mul(tmp.l17.effect)
      if(hasUpgrade("l27",13))mult=mult.mul(player.l27.points.add(1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "N", description: "Shift+N: Reset for null matter", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("l11",16)||player[this.layer].unlocked},
  upgrades: {
    11: {
        description: "The prestige effect is better",
        cost: new Decimal(2),
    },
    12: {
        description: "The outer log10 of the second incrementy upgrade is now a log9",
        cost: new Decimal(8),
    },
    13: {
        description: "The outer log9 of the second incrementy upgrade is now a log8",
        cost: new Decimal(64),
    },
    14: {
        description: "The outer log8 of the second incrementy upgrade is now a log7",
        cost: new Decimal(400),
    },
},
  doReset(l){
    if(layers[l].row>this.row){
      let k=[]
      if(hasMilestone("l26",0))k.push("upgrades")
      layerDataReset(this.layer,k)
    }
  },
})
addLayer("l17", {
    name: "leaves", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 7, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
    }},passiveGeneration(){return hasUpgrade("l26",11)?7:0},
  effect(){let f= player.l17.points.sqrt().add(1).sqrt()
  if(hasUpgrade("l22",11))f=f.pow(1.5)
          return f},
  effectDescription(){return "multiplying null matter gain by "+format(this.effect())},
    color: "#c7d518",
    requires: new Decimal(1e8), // Can be a function that takes requirement increases into account
    resource: "leaves", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.18, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
      if(hasUpgrade("l22",11))mult=mult.mul(player.l18.points.sqrt().add(1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let x= new Decimal(1)
        if(hasUpgrade("l21",11))x=x.mul(2)
      return x
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "l", description: "L: Reset for leaves", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("l11",17)||player[this.layer].unlocked},
upgrades: {
    11: {
        description: "The outer log7 of the second incrementy upgrade is now a log1.1",
        cost: new Decimal(1e45),
      unlocked(){return hasUpgrade("l27",11)}
    },
  12: {
        description: "Pointer buyable scaling is reduced based on lines",
        cost: new Decimal(1e128),
      unlocked(){return hasUpgrade("l28",11)}
    },

},doReset(l){
    if(layers[l].row>this.row){
      let k=[]
      if(hasUpgrade("l24",12))k.push("upgrades")
      layerDataReset(this.layer,k)
    }
  },
})
addLayer("l18", {passiveGeneration(){return hasMilestone("l28",0)?8:0},
    name: "money", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 8, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
    }},
    color: "#dc7f7d",
    requires: new Decimal(1e10), // Can be a function that takes requirement increases into account
    resource: "dollars", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.15, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
      if(hasUpgrade("l22",12))mult=mult.mul(tmp.l21.effect.sqr())
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for money", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("l11",18)||player[this.layer].unlocked},
upgrades: {
    11: {
        description: "Incrementy and money boost game gain",
        cost: new Decimal(1),
      effect(){return player.l18.points.add(1).sqrt().mul(player.l15.points.add(1).log10()).sqrt()},
    },
  12: {
        description: "The hyperinflation effect starts at 1e110",
        cost: new Decimal(1e71),
      unlocked(){return hasUpgrade("l28",11)}
    },

},doReset(l){
    if(layers[l].row>this.row){
      let k=[]
      if(hasUpgrade("l24",12))k.push("upgrades")
      layerDataReset(this.layer,k)
    }
  },
                 softcap(){
                   let s=new Decimal("1e500")
                   if(hasChallenge("l28",11))s=new Decimal("10^^10")
                 return s},
                 softcapPower(){
                   let s=0.02
                   //if(hasChallenge("l28",11))s=1
                   return s
                 },
})