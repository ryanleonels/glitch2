addLayer("f", {
    name: "finished despacit mods", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
  branches:["p"],
    color: "#4BDC13",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "finished despacit mods", // Name of prestige currency
    baseResource: "progress", // Name of resource prestige is based on
    baseAmount() {return layers.p.bars.progress.progress()}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  base: 2,
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "f", description: "F: Finish a despacit mod", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
  doReset(){}
})
addLayer("p", {
    name: "progress", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
  passiveGeneration(){return (hasMilestone("s",2)?100:0)},
    color: "#AB5363",
    requires: new Decimal(0.1), // Can be a function that takes requirement increases into account
    resource: "Progress points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade("a",11))mult=mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1).times(hasUpgrade("s",14)?4.2069:1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
  bars: {
    progress: {
        direction: RIGHT,
        width: 500,
        height: 50,
      fillStyle: {'background-color' : "#008000"},
        progress() { 
          let p = new Decimal(0)
          if (inChallenge(this.layer,12))return p
          if (hasUpgrade(this.layer,11))p=p.plus(0.01)
          if (hasUpgrade(this.layer,12))p=p.plus(0.01)
          if (hasUpgrade(this.layer,13))p=p.plus(0.01)
          if (hasUpgrade(this.layer,14))p=p.plus(0.01)
          if (hasUpgrade(this.layer,15))p=p.plus(0.01)
          if (hasChallenge(this.layer,11))p=p.plus(0.03)
          if (hasUpgrade(this.layer,21))p=p.plus(0.02)
          if (hasUpgrade(this.layer,22))p=p.plus(0.02)
          if (hasUpgrade(this.layer,23))p=p.plus(0.01)
          if (layers[this.layer].buyables[11].unlocked())p=p.plus(new Decimal(0.1).times(player.p.buyables[11]))
          if (hasUpgrade(this.layer,31))p=p.plus(0.1)
          if (hasUpgrade(this.layer,32))p=p.plus(0.05)
          if (hasUpgrade(this.layer,33))p=p.plus(0.2)
          if (hasUpgrade(this.layer,34))p=p.plus(0.01)
          if (hasUpgrade(this.layer,35))p=p.times(hasUpgrade("a",35)?1.01010101:hasUpgrade("a",34)?1.010101:hasUpgrade("a",22)?1.0101:1.01)
          if (hasMilestone("s",4))p=p.plus(1/(10**10))
          return p
        },
      display(){return "Progress to finishing your first despacit mod! ("+format(this.progress().times(100))+"%)"}
    },
}, 
  tooltip: "Progress",
tabFormat: {
    "Progress": {
        content: [
          "main-display","prestige-button","blank",
          ["bar","progress"],"blank","upgrades","blank","challenges"]
    },
"Buyables":{content:["buyables"]}
},
  upgrades: {
    rows: 5,
    cols: 5,
    11: {
      title:"Start your mod",
        description: "Creates progress",
        cost: new Decimal(2),
      
    },
12: {
      title:"Add your first layer",
        description: "Creates more progress",
        cost: new Decimal(3),
  unlocked(){return hasUpgrade(this.layer,this.id-1)}
    },
    13: {
      title:"Update mod",
        description: "Change the id, name, and author in mod.js to make more progress",
        cost: new Decimal(1),
      unlocked(){return hasUpgrade(this.layer,this.id-1)}
    },
    14: {
      title:"Make an upgrade",
        description: "Your upgrade is giving +0.02 to point gain and +0.01 to progress!",
        cost: new Decimal(1),
      unlocked(){return hasUpgrade(this.layer,this.id-1)}
    },
    15: {
      title:"Bug fixing",
        description: "You fix an upgrade and unlock a challenge",
        cost: new Decimal(4),
      unlocked(){return hasUpgrade(this.layer,this.id-1)}
    },
    21: {
      title:"Upgrades!",
        description: "Add 4 upgrades to the first layer of your mod. +0.02 progress",
        cost: new Decimal(15),
      unlocked(){return hasChallenge(this.layer,11)}
    },
    22: {
      title:"Buyables!",
        description: "Add 4 buyables to the first layer of your mod. +0.02 progress",
        cost: new Decimal(15),
      unlocked(){return hasUpgrade(this.layer,this.id-1)}
    },
    23: {
      title:"Complexity",
        description: "Your mod becomes extremely complex and raises point gain to the power of 10",
        cost: new Decimal(20),
      unlocked(){return hasUpgrade(this.layer,this.id-1)}
    },
    24: {
      title:"Challenges!",
        description: "Add 4 challenges to the first layer of your-- actually, that's too much. +0.01 progress",
        cost: new Decimal(30),
      unlocked(){return hasUpgrade(this.layer,this.id-1)}
    },
    25: {
      title:"Buyables again!",
        description: "Add a buyable to this mod. You don't gain progress because this mod is not a despacit mod.",
        cost: new Decimal(1),
      unlocked(){return hasUpgrade(this.layer,this.id-1)}
    },
    31: {
      title:"New stuff",
        description: "Creates a new idea that has never been seen before! adds 0.1 to progress!",
        cost: new Decimal(100),
      unlocked(){return getBuyableAmount("p",11).gte(5)}
    },
    32: {
      title:"Use glitch",
        description: "Mods now auto update and you gain 0.05 more progress. Also add 1 to point gain.",
        cost: new Decimal(50),
      unlocked(){return hasUpgrade(this.layer,this.id-1)}
    },
    33: {
      title:"Add code",
        description: "Spend an entire day working on your despacit mod and gain 0.2 progress!",
        cost: new Decimal(70),
      unlocked(){return hasUpgrade(this.layer,this.id-1)}
    },
    34: {
      title:"Testing",
        description: "Start testing your mod and rebalancing it. Gain 0.01 progress",
        cost: new Decimal(12),
      unlocked(){return hasUpgrade(this.layer,this.id-1)}
    },
    35: {
      title:"Finish your mod",
        description: "Multiply all previous progress effects by 1.01, and unlock the next layer",
        cost: new Decimal(69),
      unlocked(){return hasUpgrade(this.layer,this.id-1)}
    },
},
  challenges: {
    rows: 2,
    cols: 2,
    11: {
        name: "Broken mod",
        challengeDescription: "Your mod breaks and you have to fix it. Point gain is halved.",
        goal: new Decimal(0.2),
        rewardDescription(){return "Gain 0.03 progress and +1 to point gain"},
      unlocked(){return hasUpgrade(this.layer,15)}
    },
    12: {
        name: "No progress",
        challengeDescription: "Progress is 0.",
        goal: new Decimal(30),
        rewardDescription(){
          let rew = new Decimal(0.1)
          if (hasUpgrade("s",12))rew=rew.times(player.p.points.plus(1).log10().plus(1).pow(0.25))
          return "add "+rew.toFixed(6)+" to A gain exponent"},
      unlocked(){return hasUpgrade("a",24)}
    },
},
  buyables: {
    rows: 2,
    cols: 2,
    11: {
        cost() { return new Decimal(3).pow(getBuyableAmount(this.layer,this.id)) },
        display() { return (getBuyableAmount(this.layer,this.id).lt(5)?"Make a new layer and gain +0.1 progress.<br>Cost: "+this.cost():"You have bought the maximum number of layers.") },
        canAfford() { return player[this.layer].points.gte(this.cost())&&getBuyableAmount(this.layer,this.id).lt(5) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      unlocked(){return hasUpgrade(this.layer,25)}
    },
},
  doReset(resettingLayer){
  if (resettingLayer.row>this.row){
    let keep = []
    if (hasMilestone("s",1)){
      keep.push("upgrades")
      keep.push("challenges"
               )
      keep.push("buyables")
    }
    layerDataReset(this.layer,keep)
  }
}
})
addLayer("a", {
    name: "abandoned mods", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    total: new Decimal(0),
      incrementali: new Decimal(0),
    }},
    color: "#9ffb1b",
    requires(){
      if (hasUpgrade(this.layer,31))return new Decimal(0.001)
      if (hasUpgrade(this.layer,21))return new Decimal(0.1)
      return new Decimal(10)}, // Can be a function that takes requirement increases into account
    resource: "Abandoned mods", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
      if (hasUpgrade(this.layer,13))mult=mult.times(10)
      if (hasUpgrade(this.layer,27))mult=mult.times(10)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let e = new Decimal(1)
        let rew = new Decimal(0.1)
        if (hasUpgrade("s",12))rew=rew.times(player.p.points.plus(1).log10().plus(1).pow(0.25))
        if (hasUpgrade(this.layer,24))e=e.plus(rew)
      return e
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset for abandoned mods", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player[this.layer].unlocked||hasUpgrade("p",35)},
  bars: {
    progress: {
        direction: RIGHT,
        width: 500,
        height: 50,
      fillStyle: {'background-color' : "#008000"},
        progress() { 
          let p = new Decimal(0)
          p=player.a.total.div(1e6).min(1)
          return p
        },
      display(){return "Progress to abandoning 1 million mods! ("+format(this.progress().times(100))+"%)"}
    },
}, 
  clickables: {
    rows: 1,
    cols: 1,
    11: {
        display() {return "Gain 1 incrementali"},
        canClick(){return true},
      onClick(){player.a.incrementali=player.a.incrementali.plus(1)},
      unlocked(){return hasUpgrade(this.layer,16)}
    }
},
  tooltip: "Abandon mods",
tabFormat: {
    "Progress": {
        content: [
          "main-display","prestige-button","blank",
          ["bar","progress"],"blank","upgrades"/*,"blank","challenges"*/]
    },
//"Buyables":{content:["buyables"]}
  Incrementali:{
    unlocked(){return hasUpgrade("a",12)&&!hasUpgrade("a",26)},
    content:[["display-text",function(){return "You have "+format(player.a.incrementali)+" incrementali"}],"blank","clickables"]}
},
  update(diff){
    if (hasUpgrade(this.layer,32))diff=diff*2
    if (hasUpgrade(this.layer,33))player[this.layer].incrementali=player[this.layer].incrementali.plus(player[this.layer].incrementali.times(diff).max(1))
    if (hasUpgrade(this.layer,12)){
      player[this.layer].incrementali=player[this.layer].incrementali.plus(hasUpgrade(this.layer,14)?player[this.layer].incrementali.plus(3).log(10).times(diff):diff)
    }
  },
  softcap: new Decimal(10),
  softcapPower(){
    
    let e = new Decimal(1)
    if (player.s.unlocked)e=e.plus(pinglol(player.s.points.div(10)))
    return e
    },
  upgrades: {
    rows: 3,
    cols: 7,
    11: {
      title:"Restart your mod",
        description: "You gain experience and get progress points 2x faster",
        cost: new Decimal(1),
      
    },
12: {
      title:"Enter the F",
        description: "Unlock Incrementali",
        cost: new Decimal(3),
  unlocked(){return hasUpgrade(this.layer,this.id-1)}
    },
    13: {
      title:"Abandon mods faster",
        description: "Gain 10x the abandoned mods",
        cost: new Decimal(1),
      unlocked(){return hasUpgrade(this.layer,this.id-1)}
    },
    14: {
      title:"log10 of incrementali+3",
        description: "The title of this upgrade multiplies incrementali gain",
        cost: new Decimal(25),
      unlocked(){return hasUpgrade(this.layer,this.id-1)}
    },
    15: {
      title:"Knowledge",
        description: "you gain more knowledge. this does something",
        cost: new Decimal(40),
      unlocked(){return hasUpgrade(this.layer,this.id-1)}
    },
    
    16: {
      title:"Enhanced Spacetime",
        description: "Adds a clickable to the incrementali tab",
        cost: new Decimal(50),
      unlocked(){return hasUpgrade(this.layer,this.id-1)}
    },
    17: {
      title:"You have 0 progress.",
        description: "Removes all of your progress, and you have to start over.",
        cost: new Decimal(1),
      unlocked(){return hasUpgrade(this.layer,this.id-1)},
      onPurchase(){player.p.upgrades=[];player.p.points=new Decimal(0);player.p.challenges[11]=0;player.p.buyables[11]=new Decimal(0)}
    },
    21: {
      title:"-9.9",
        description: "Subtract 9.9 from the requirement of this layer",
        cost: new Decimal(44),
      unlocked(){return hasUpgrade(this.layer,17)}
    },
    22: {
      title:"Singularity",
        description: "Add 1/10000 to the last progress upgrade's effect",
        cost: new Decimal(500),
      unlocked(){return hasUpgrade(this.layer,this.id-1)}
    },
    23: {
      title:"Everyone ping",
        description: "Allows you to ping @everyone, once you finish your mod.",
        cost: new Decimal(20),
      unlocked(){return hasUpgrade(this.layer,this.id-1)}
    },
    24: {
      title:"Challenges!",
        description: "Add 1 more challenge to the first layer of your mod.",
        cost: new Decimal(300),
      unlocked(){return hasUpgrade(this.layer,this.id-1)}
    },
    25: {
      title:"Reset your incrementali",
        description: "but log10 of incrementali adds to point gain.",
        cost: new Decimal(500),
      unlocked(){return hasUpgrade(this.layer,this.id-1)},
      onPurchase(){player[this.layer].incrementali=new Decimal(0)}
    },
    26: {
      title:"Exit the F",
        description: "Wait, that's illegal.",
        cost: new Decimal(500),
      unlocked(){return hasUpgrade(this.layer,this.id-1)},
    },
    27: {
      title:"Timewall Gaming",
        description: "Spend 10x less time on each mod and abandon 10x as many!",
        cost: new Decimal(500),
      unlocked(){return hasUpgrade(this.layer,this.id-1)},
    },
    
    31: {
      title:"-0.099",
        description: "Subract 0.099 from the requirement of this layer, giving a √10x boost",
        cost: new Decimal(2345),
      unlocked(){return hasUpgrade(this.layer,27)}
    },
    32: {
      title:"Speed up time",
        description: "Time is 2x faster",
        cost: new Decimal(1e4),
      unlocked(){return hasUpgrade(this.layer,this.id-1)}
    },
    33: {
      title:"Exponential growth",
        description: "Incrementali now grows exponentially",
        cost: new Decimal(2e4),
      unlocked(){return hasUpgrade(this.layer,this.id-1)}
    },
    34: {
      title:"Research points",
        description: "<b>Singularity</b> is 1% stronger",
        cost: new Decimal(3e4),
      unlocked(){return hasUpgrade(this.layer,this.id-1)}
    },
    35: {
      title:"v2.0 update",
        description: "content expansion in 2.0 upgrades! add 1/10000 to <b>Research Points</b>",
        cost: new Decimal(4e4),
      unlocked(){return hasUpgrade(this.layer,this.id-1)}
    },
    36: {
      title:"error: i dont want to work lol",
        description: 'throw("i dont want to work lol")',
        cost: new Decimal(5e4),
      unlocked(){return hasUpgrade(this.layer,this.id-1)},
      onPurchase(){throw("i dont want to work lol")}
    },
    37:{
      title:"Removing all softcaps",
        description: "Adds a bit of tetration into point gain and unlock a layer",
        cost: new Decimal(345670),
      unlocked(){return hasUpgrade(this.layer,this.id-1)},
    }
},
  passiveGeneration(){return (hasMilestone("s",2)?1:0)},
doReset(resettingLayer){
  if (resettingLayer.row>this.row){
    let keep = []
    if (hasMilestone("s",0)){
      keep.push("upgrades")
    }
    layerDataReset(this.layer,keep)
  }
}
})
function pinglol(x){
  if (x.gte(0.5)){return x.times(0.5).pow(0.5)}
  else return x
}
addLayer("s", {
    name: "Softcaps", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
  branches:["a"],
  onPrestige(){
    player.a.points=new Decimal(0)
    player.p.points=new Decimal(0)
    if (!hasMilestone(this.layer,3))player.a.total=new Decimal(0)
  },
  effectDescription(){return "adding "+pinglol(player.s.points.div(10)).toFixed(6)+" to the abandoned mods softcap power."},
    color: "#294b66",
    requires() {return new Decimal(1e6).div(hasUpgrade(this.layer,13)?player.p.points.plus(1).log(10).plus(1).log(2).plus(1).pow(hasUpgrade(this.layer,14)?4.2069:1):1)}, // Can be a function that takes requirement increases into account
    resource: "(softcapped)", // Name of prestige currency
    baseResource: "total abandoned mods", // Name of resource prestige is based on
    baseAmount() {return player.a.total}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base: 1.2,
    exponent: 2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("a",37)||player[this.layer].unlocked},
  milestones:{
  0: {
        requirementDescription: "1 softcap",
        effectDescription: "Always keep all abandoned mod upgrades",
        done() { return player.s.points.gte(1) }
    },
    1: {
        requirementDescription: "3 softcaps",
        effectDescription: "Keep all progress upgrades, challenges, and buyables",
        done() { return player.s.points.gte(3) }
    },
    2: {
        requirementDescription: "4 softcaps",
        effectDescription: "Gain 10000% of progress points and 100% of abandoned mods per second",
        done() { return player.s.points.gte(4) },
      unlocked(){return hasUpgrade(this.layer,11)}
    },
    3: {
        requirementDescription: "8 softcaps",
        effectDescription: "This layer no longer resets total abandoned mods.",
        done() { return player.s.points.gte(8) },
      unlocked(){return hasUpgrade(this.layer,13)}
    },
    4: {
        requirementDescription: "11 softcaps",
        effectDescription: "Add 1/(10^10) to the progress of your despacit mod",
        done() { return player.s.points.gte(11) },
      unlocked(){return hasUpgrade(this.layer,14)}
    },
  },
  upgrades:{
    rows:5,
    cols:5,
    11:{
      title:"Abandoned",
        description: "Abandoned mods boost point gain",
        cost: new Decimal(3),
      unlocked(){return hasMilestone(this.layer,1)},
    },
    12:{
      title:"Progression",
        description: "Progress points boost <b>No Progress</b> reward",
        cost: new Decimal(6),
      unlocked(){return hasMilestone(this.layer,2)},
    },
    13:{
      title:"H",
        description(){return "Progress points reduce this layer's requirement. Currently: /"+this.effect().toFixed(4)},
      effect(){return player.p.points.plus(1).log(10).plus(1).log(2).plus(1).pow(hasUpgrade(this.layer,14)?4.2069:1)},
        cost: new Decimal(7),
      unlocked(){return hasUpgrade(this.layer,12)},
    },
    14:{
      title:"Some random upgrade name",
        description(){return "P gain and H effect ^4.2069"},
        cost: new Decimal(8),
      unlocked(){return hasUpgrade(this.layer,13)},
    }
  }
})
