addLayer("g", {
    name: "gwarnaments", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "gwa", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    points: new Decimal(0),
      best: new Decimal(0),
    }},
    color: "#EE6666",
  image:"https://cdn.glitch.me/b809bbb6-72c7-48fe-99ef-e3173ecbd630/gwarnament.png?v=1640224555070",
  nodeStyle:{ "background-size": "100% 100%" },
    effect(){return player.g.points.add(hasUpgrade("g",24)?4:0).div(100)},
    effectDescription(){return "boosting points by themselves raised to the "+this.effect()},
    requires(){
      let r = new Decimal(10)
      if(hasUpgrade("g",12))r=r.div(player.bestPoints.max(1))
      if(hasUpgrade("g",22))r=r.div(player.points.add(1))
      if(hasUpgrade("t",11))r=r.div(player.t.best.max(1).pow(player.t.challenges[11]>=1?3:1))
      if(hasUpgrade("t",23))r=r.div(player.t.best.max(1).pow(3))
      return r}, // Can be a function that takes requirement increases into account
    resource(){
      let b = "gwarnaments"
      if(player.g.points.gte(32))b="scaled "+b
      if(player.g.points.gte(69))b="extremely "+b
      else if(player.g.points.gte(50))b="very "+b
      if(player.g.points.gte(94))b="gwaed gwarnaments"
      return b
      }, // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent(){
      let exp = new Decimal(1)
      exp=exp.add(player.g.points.div(10))
      if(exp.gt(1.8))exp=new Decimal(1.8)
      if(hasUpgrade("g",33))exp=exp.sub(0.1)
      if(player.g.points.gte(32))exp=new Decimal(1.8)
      if(player.g.points.gte(94))exp=new Decimal(1.9)
      if(player.g.points.gte(95))exp=new Decimal(2.5)
      if(player.g.points.gte(48))exp=exp.add(player.g.points.sub(48).div(100))
      if(player.g.points.gte(69))exp=exp.add(player.g.points.sub(69).pow(hasMilestone("m",0)?1.5:2).div(100))
      if(hasMilestone("t",1))exp=exp.sub(player.bestPoints.log(1337).div(9000))
      if(player.g.points.eq(90))exp=exp.sub(1/90)
      if(hasUpgrade("g",44))exp=exp.sub(1)
      if(player.g.points.gte(100))exp=new Decimal(1e100)
      return exp
    }, // Prestige currency exponent
    base: 10,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "g", description: "G: Reset for a gwarnament", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
  doReset(l){return},
  upgrades: {
    11: {
      title: "gwa",
        description: "Multiply point gain by your best gwarnaments",
        cost: new Decimal(1),
      unlocked(){return player.g.best.gte(2)},
    },
    12: {
      title: "gwaleft",
        description: "Divide gwaranament requirement by your best points ever",
        cost: new Decimal(2),
      unlocked(){return hasUpgrade(this.layer,this.id-1)},
    },
    13: {
      title: "gwalight",
        description: "points boost themselves by log10(points+1)x",
        cost: new Decimal(4),
      unlocked(){return hasUpgrade(this.layer,this.id-1)},
    },
    14: {
      title: "gwadark",
        description: "<b>gwalight</b> is affected by the gwarnament effect and unlock a row 2 layer",
        cost: new Decimal(4),
      unlocked(){return hasUpgrade(this.layer,this.id-2)},
    },
    21: {
      title: "gwapog",
        description: "Multiply point gain by your current gwarnaments+1",
        cost: new Decimal(5),
      unlocked(){return hasUpgrade(this.layer,this.id)||hasUpgrade("t",13)},
    },
    22: {
      title: "gwapogleft",
        description: "Divide gwaranament requirement by your current points+1",
        cost: new Decimal(5),
      unlocked(){return hasUpgrade(this.layer,this.id)||hasUpgrade("t",13)},
    },
    23: {
      title: "gwatroll",
        description: "The gwarnament effect affects trolling gain",
        cost: new Decimal(6),
      unlocked(){return hasUpgrade(this.layer,this.id)||hasUpgrade("t",13)},
    },
    24: {
      title: "gwagwagwagwagwa",
        description: "Gwain 4 extra gwa(rnaments) in the gwarnament effect.",
        cost: new Decimal(7),
      unlocked(){return hasUpgrade(this.layer,this.id)||hasUpgrade("t",13)},
    },
    31: {
      title: "gwawoke",
        description: "Unlock a trolling challenge",
        cost: new Decimal(7),
      unlocked(){return getBuyableAmount("g",11).gte(1)},
    },
    32: {
      title: "gwawokeleft",
        description: "<b>gwalight</b>",
        cost: new Decimal(8),
      unlocked(){return getBuyableAmount("g",11).gte(2)},
    },
    33: {
      title: "gwasanta",
        description: "Subtract 0.1 from the gwarnament cost exponent",
        cost: new Decimal(11),
      unlocked(){return getBuyableAmount("g",11).gte(3)},
    },
    34: {
      title: "gwarson",
        description: "Unlock the ability to put gwarnaments on trees.",
        cost: new Decimal(16),
      unlocked(){return getBuyableAmount("g",11).gte(4)},
    },
    41: {
      title: "voidgwa",
        description: "Divide point gain by the gwarnament effect",
        cost: new Decimal(21),
      unlocked(){return player.t.challenges[11]>=3},
    },
    42: {
      title: "ourgwa",
        description: "Enable the creation of gwastars",
        cost: new Decimal(22),
      unlocked(){return player.t.challenges[11]>=3},
    },
    43: {
      title: "pridegwa",
        description: "gwa is boosted ^10",
        cost: new Decimal(32),
      unlocked(){return getBuyableAmount("g",11).gte(5)},
    },
    44: {
      title: "gwarnament",
        description: "Enable the inflationing and win the game",
        cost: new Decimal(0),
      unlocked(){return getBuyableAmount("g",11).gte(6)},
    },
},
  buyables: {
    11: {
        cost(x=getBuyableAmount(this.layer,this.id)) { let c=new Decimal(7).add(x.sqr()) 
        if(c.gte(30))c=c.add(63)
                                                      if(c.gte(100))c=new Decimal(Infinity)
                                                      return c
        },
        display() { return "Per buyable unlock a gwarnament upgrade. Currently: "+formatWhole(getBuyableAmount(this.layer,this.id))+"\n"+(getBuyableAmount("g",11).lt(6)?"Cost: "+formatWhole(this.cost())+" gwarnaments":"MAXED") },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      unlocked(){return hasUpgrade("m",12)}
    },
},
  clickables: {
    11: {
        display() {return "Hang a gwarnament on the christmas tree! Your "+player.g.clickables[11]+" gwarnaments are giving you a "+format(Decimal.pow(2+player.g.clickables[12],player.g.clickables[11]))+"x multiplier to points"},
      canClick(){return player.g.points.gt(player.g.clickables[11]+player.g.clickables[12])},
      onClick(){player.g.clickables[11]++},
      unlocked(){return hasUpgrade("g",34)}
    },
    12: {
        display() {return "Make a star out of a gwarnament! Your "+player.g.clickables[12]+" stars are giving you +"+player.g.clickables[12]+" to the first clickable's base"},
      canClick(){return player.g.points.gt(player.g.clickables[11]+player.g.clickables[12])},
      onClick(){player.g.clickables[12]++},
      unlocked(){return hasUpgrade("g",42)}
    },
    21: {
      display() {return "Respec gwarnaments"},
      canClick(){return true},
      onClick(){player.g.clickables[11]=0;player.g.clickables[12]=0},
      unlocked(){return hasUpgrade("g",34)}
    }
},
  updateBestPoints(){
    if(player.points.gt(player.bestPoints)){player.bestPoints=player.points}
  }
})
addLayer("t", {
    name: "trolling", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
      best: new Decimal(0),
    }},
    color: "#F4F4F4",
    requires:new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "trolling", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent(){
      let exp = new Decimal(0.5)
      
      return exp
    }, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
      if(hasUpgrade("g",23))mult=mult.mul(player.t.points.add(1).pow(tmp.g.effect))
      if(hasUpgrade("m",11))mult=mult.mul(player.m.points.add(1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "T: Reset for trolling", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("g",14)||player.t.unlocked},
  upgrades: {
    11: {
      title: "oil floats on water",
        description: "Best trolling divides gwarnament cost",
        cost: new Decimal(1),
      unlocked(){return true},
    },
    12: {
      title: "wait for it to rain",
        description: "Gwarnament upgrades multiply points",
        cost: new Decimal(2),
      unlocked(){return hasUpgrade(this.layer,this.id-1)},
    },
    13: {
      title: "cover yourself in oil",
        description: "Unlock a lot of gwarnament upgrades.",
        cost: new Decimal(4),
      unlocked(){return hasUpgrade(this.layer,this.id-1)},
    },
    14: {
      title: "fly",
        description: "unlock more trolling :troll:",
        cost: new Decimal(124),
      unlocked(){return hasUpgrade("g",24)},
    },
    21: {
      title: "Flamemaster",
        description: "Points are multiplied by the members in Meta Studio",
        cost: new Decimal("1e308"),
      unlocked(){return hasMilestone("t",1)},
    },
    22: {
      title: "TheMKeyHolder",
        description: "Points are multiplied by the number of gwa emojis ^2",
        cost: new Decimal("1e341"),
      unlocked(){return hasMilestone("t",1)},
    },
    23: {
      title: "Downvoid",
        description: "Trolling points ^3 further divides the gwarnament cost",
        cost: new Decimal("1e375"),
      unlocked(){return hasMilestone("t",1)},
    },
    24: {
      title: "???",
        description: "Gwarnaments^4444 multiply more trolling and automatically gain more trolling",
        cost: new Decimal("1e1555"),
      unlocked(){return hasMilestone("t",1)},
    },
},
  challenges: {
    11: {
        name: "gwawoke",
        challengeDescription(){return "Point gain is logged and then raised to your gwarnaments.<br>"+player.t.challenges[11]+"/3 completions"},
      rewardDescription: "The first (completions) trolling upgrades are boosted",
      goal(){
        if(player.t.challenges[11]==0)return new Decimal(1e6)
        if(player.t.challenges[11]==1)return new Decimal(1.111e11)
        if(player.t.challenges[11]==2)return new Decimal(1e30)
        return new Decimal(Infinity)
      },
        canComplete: function() {return player.points.gte(this.goal())},
      completionLimit: 3,
      unlocked(){return hasUpgrade("g",31)},
    },
},
  milestones: {
    0: {
        requirementDescription: "9.99e99 trolling",
        effectDescription: "Automatically gain trolling",
        done() { return player.t.points.gte(9.99e99) }
    },
    1: {
        requirementDescription: "1.79e308 trolling",
        effectDescription: "Unlock more trolling upgrades!",
        done() { return player.t.points.gte(1.79e308) }
    },
},
    passiveGeneration(){return hasMilestone("t",0)}
})
addLayer("m", {
    name: "more trolling", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "MT", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
      best: new Decimal(0),
    }},
    color: "#ffffff",
    requires:new Decimal(1e5), // Can be a function that takes requirement increases into account
    resource: "more trolling", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent(){
      let exp = new Decimal(0.2)
      
      return exp
    }, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
      if(hasUpgrade("t",24))mult=mult.mul(player.g.points.pow(4444))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "m: Reset for more trolling", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("t",14)||player.m.unlocked},
  passiveGeneration(){return hasUpgrade("t",24)},
  upgrades: {
    11: {
      title: "start a chain with a nitro-only emoji",
        description: "More trolling makes you gain more trolling",
        cost: new Decimal(1),
      unlocked(){return true},
    },
    12: {
      title: "teleport away to avoid getting found",
        description: "Unlock a single gwarnament buyable",
        cost: new Decimal(5),
      unlocked(){return hasUpgrade(this.layer,this.id-1)},
    },
    13: {
      title: "disguise yourself as a portal",
        description: "log1.01(trolling+meta trolling) adds to point gain",
        cost: new Decimal(10),
      unlocked(){return hasUpgrade("g",32)},
    },
    
    14: {
      title: "play the oil tree",
        description: "trolling increases point gain by a small amount",
        cost: new Decimal(1510),
      unlocked(){return hasUpgrade(this.layer,this.id-1)},
    },
},
  milestones: {
    0: {
        requirementDescription: "e8550 more trolling",
        effectDescription: "Extremely scaled gwarnaments aren't as extreme",
        done() { return player.t.points.gte("e8550") }
    },
    1: {
        requirementDescription: "IT'S OVER 9000",
        effectDescription: "Reduce gwarnament cost exponent based on points",
        done() { return player.t.points.gte("e9000") }
    },
},
})