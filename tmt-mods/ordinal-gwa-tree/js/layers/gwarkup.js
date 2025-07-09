addLayer("g", {
    name: "gwarkup", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
      base: new Decimal(2),
      dynamic: new Decimal(1),
      decrementy: new Decimal(1),
      challengeUnlock: false,
      incrementyUnlock: false,
    }},
    color: "#009696",
    requires(){return getBase().sqr()}, // Can be a function that takes requirement increases into account
    resource: "gwarkup points", // Name of prestige currency
    baseResource: "ordinal increases", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "g", description: "G: Reset for gwarkup points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return !inAnyChallenge("r")},
  getNextAt(){return this.requires()},
  prestigeButtonText(){return "Markup for <b>+"+formatWhole(this.getResetGain())+"</b> gwarkup points"},
  getResetGain(){
      let gain = new Decimal(numToOP(player.points, getBase()))
      if (hasUpgrade("b",22) && !inChallenge("b",31))gain=Decimal.mul(gain,1e10)
    gain=gain.mul(Decimal.pow(2,getTotalCompletions()*player.b.challenges[42]))
    if (inChallenge("b",41))gain=gain.sqrt()
    gain=gain.mul(alephEffect(2))
      return gain
  },
  onPrestige(){if (hasSL(16))player.g.decrementy = new Decimal(1)},
  canReset(){return player.points.gte(this.requires())},
  clickables: {
    11:{
      canClick(){return true},
      onClick(){
        if (!inChallenge("b",41) || player.points.lt(26))
        player.points=player.points.add(1)
               },
      display(){return "Increase the ordinal by 1, then maximize it"}
    },
    12:{
      canClick(){return layers.g.buyables[12].canAfford()},
      onClick(){
        if (inChallenge("b",32)){
          if (layers.g.buyables[12].canAfford()){player.g.buyables[12]=new Decimal(1)};return
        }
        if (hasUpgrade("h",103)){
          let x = player.g.points.div(100).max(1).log(1.001).floor().add(1).max(player.g.buyables[12])
          setBuyableAmount("g", 12, x)
        } else {
        let n=player.g.points.div(100).max(1).log2().floor().sub(10).max(player.g.buyables[12])
        player.g.buyables[12]=n; 
        for (let i=0;i<10;i++){
        if (layers.g.buyables[12].canAfford())layers.g.buyables[12].buy()}
        }
      },
      display(){return "Max autobuyers"},
      unlocked(){return player.g.base.gte(3)}
    },
  },
  buyables: {
    11: {
        cost(x=getBuyableAmount(this.layer,this.id)) { 
          let costs = [new Decimal("1ee10"), new Decimal("1ee10"), new Decimal("1e210"), new Decimal("1e1600"), new Decimal("e1.36e26"), new Decimal("e5.59e27"), new Decimal("e1.24e35"), new Decimal("e1.24e35"), new Decimal("10^^100")]
          return costs[Number(x)]
        },
        display() { return "Increase the ordinal base by 1.<br>Cost: "+format(this.cost())+" gwarkup points" },
      title: "Base Shift",
        canAfford() { return player[this.layer].points.gte(this.cost()) && !player.b.activeChallenge },
        buy() {
            player[this.layer].points = new Decimal(0)
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          player.g.base=getBuyableAmount(this.layer, this.id).add(2)
          player.g.dynamic=new Decimal(1)
          if (!hasMilestone("g",1))player.g.upgrades=[]
          player.g.buyables[12]=new Decimal(hasMilestone("g",0)?1:0)
          if (!hasMilestone("g",1))layers.b.clickables[11].onClick()
          player.points=new Decimal(0)
          player.b.incrementy=new Decimal(0)
          player.b.psi=new Decimal(0)
        },
    },
    12: {
        cost(x=getBuyableAmount(this.layer,this.id)) { 
          if (x.gte(1)&&inChallenge("b",32))return new Decimal("10^^1e308")
          if (hasUpgrade("h",103))return Decimal.pow(1.001,x).mul(100)
          return Decimal.pow(2,x).mul(100)
        },
        display() { return "Automatically increase the ordinal once per second.<br>Currently: "+formatWhole(getBuyableAmount(this.layer,this.id))+"/s<br>Cost: "+format(this.cost())+" gwarkup points" },
      title: "Autoclicker",
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      unlocked(){return player.g.base.gte(3)}
    },
},
  upgrades: {
    11:{
      title: "Factor 1",
      description(){return "Boost your autoclickers based on unspent GP. Currently: *"+format(this.effect())},
      cost(){
        if (player.g.base.eq(3))return new Decimal(1e21)
        if (player.g.base.eq(4))return new Decimal(1000)
        return new Decimal(10).pow(inChallenge("b",31)?10:1)
      },
      unlocked(){return player.g.base.gte(3)},
      effect(){
        let e = player.g.points.max(10).log10().log(2).add(2)
        if (inChallenge("b",12))e=new Decimal(1)
        if (hasUpgrade("b",11))e=e.mul(2)
        if (hasUpgrade("b",32))e=e.mul(getBase().sub(hasUpgrade("h",122)?0:4).max(1))
        
        if (hasUpgrade("b",71))e=e.mul(upgradeEffect("b",71))
        e=e.pow(1+player.b.challenges[12])
        if (inChallenge("b",42))e=e.div(888)
        return e
      }
    },
    12:{
      title: "Factor 2",
      description(){return "Boost your autoclickers based on unspent GP. Currently: *"+format(this.effect())},
      cost(){
        if (player.g.base.eq(3))return new Decimal(1e100)
        if (player.g.base.eq(4))return new Decimal(1e10)
        if (player.g.base.eq(5))return new Decimal(1e20)
        return new Decimal(100).pow(inChallenge("b",31)?10:1)
      },
      unlocked(){return hasUpgrade(this.layer,11) || player.g.base.gte(4)},
      effect(){
        let e = player.g.points.max(10).log10().log(2).add(1)
        if (inChallenge("b",12))e=new Decimal(1)
        if (hasUpgrade("b",11))e=e.mul(3)
        if (hasUpgrade("h",101))e=e.mul(2)
        if (hasUpgrade("b",32))e=e.mul(getBase().sub(hasUpgrade("h",122)?0:4).max(1))
        if (hasUpgrade("b",72))e=e.mul(upgradeEffect("b",72))
        if (player.g.base.gte(7))e=e.mul(layers.h.fastEffect())
        e=e.pow(1+player.b.challenges[12])
        if (inChallenge("b",42))e=e.div(888)
        return e
      }
    },
    13:{
      title: "Factor 3",
      description(){return "Boost your autoclickers based on unspent GP. Currently: *"+format(this.effect())},
      cost(){
        if (player.g.base.eq(3))return new Decimal(1e111)
        if (player.g.base.eq(4))return new Decimal(2e21)
        if (player.g.base.eq(5))return new Decimal(1e23)
        return new Decimal(1000).pow(inChallenge("b",31)?10:1)
      },
      unlocked(){return hasUpgrade(this.layer,12) || player.g.base.gte(4)},
      effect(){
        let e = player.g.points.pow(2/3).max(10).log10().log(2).add(1)
        if (inChallenge("b",12))e=new Decimal(1)
        if (hasUpgrade("b",11))e=e.mul(4)
        if (hasUpgrade("h",101))e=e.mul(6)
        if (hasUpgrade("b",32))e=e.mul(getBase().sub(hasUpgrade("h",122)?0:4).max(1))
        e=e.pow(1+player.b.challenges[12])
        if (hasUpgrade("b",52))e=e.mul(upgradeEffect("b",52))
        if (inChallenge("b",42))e=e.div(888)
        return e
      }
    },    
    14:{
      title: "Factor 4",
      description(){return "Boost your autoclickers based on unspent GP. Currently: *"+format(this.effect())},
      cost(){
        if (player.g.base.eq(3))return new Decimal(1e120)
        if (player.g.base.lt(6))return new Decimal(1e30)
        return new Decimal(1e4).pow(inChallenge("b",31)?10:1)
      },
      unlocked(){return hasUpgrade(this.layer,13) || player.g.base.gte(4)},
      effect(){
        let e = player.g.points.pow(3/4).max(10).log10().log(3).add(1)
        if (inChallenge("b",12))e=new Decimal(1)
        if (hasUpgrade("b",11))e=e.mul(5)
        if (hasUpgrade("h",101))e=e.mul(24)
        if (hasUpgrade("b",32))e=e.mul(getBase().sub(hasUpgrade("h",122)?0:4).max(1))
        e=e.pow(1+player.b.challenges[12])
        if (inChallenge("b",42))e=e.div(888)
        return e
      }
    },
    15:{
      title: "Factor 5",
      description(){return "Boost your autoclickers based on unspent GP. Currently: *"+format(this.effect())},
      cost(){
        if (player.g.base.eq(3))return new Decimal(1e122)
        if (player.g.base.eq(4))return new Decimal(1e100)
        if (player.g.base.eq(5))return new Decimal(1e33)
        return new Decimal(1e5).pow(inChallenge("b",31)?10:1)
      },
      unlocked(){return hasUpgrade(this.layer,14) || player.g.base.gte(4)},
      effect(){
        let e = player.g.points.pow(3/5).max(10).log10().log(3).add(1)
        if (inChallenge("b",12))e=new Decimal(1)
        if (hasUpgrade("b",11))e=e.mul(6)
        if (hasUpgrade("h",101))e=e.mul(120)
        if (hasUpgrade("b",32))e=e.mul(getBase().sub(hasUpgrade("h",122)?0:4).max(1))
        if (hasUpgrade("h",32))e=e.mul(player.h.slow.max(1))
        e=e.pow(1+player.b.challenges[12])
        if (inChallenge("b",42))e=e.div(888)
        return e
      }
    },
    16:{
      title: "Factor 6",
      description(){return "Boost your autoclickers based on unspent GP. Currently: *"+format(this.effect())},
      cost(){
        if (player.g.base.eq(3))return new Decimal(1e201)
        if (player.g.base.eq(4))return new Decimal(1e110)
        if (player.g.base.eq(5))return new Decimal(1e40)
        return new Decimal(1e6).pow(inChallenge("b",31)?10:1)
      },
      unlocked(){return hasUpgrade(this.layer,15) || player.g.base.gte(4)},
      effect(){
        let e = player.g.points.max(10).log10().log(6).add(1)
        if (inChallenge("b",12))e=new Decimal(1)
        if (hasUpgrade("b",11))e=e.mul(7)
        if (hasUpgrade("h",101))e=e.mul(720)
        if (hasUpgrade("b",32))e=e.mul(getBase().sub(hasUpgrade("h",122)?0:4).max(1))
        if (hasUpgrade("h",31))e=e.mul(player.h.fast.max(1))
        e=e.pow(1+player.b.challenges[12])
        if (inChallenge("b",42))e=e.div(888)
        return e
      }
    },
    17:{
      title: "Factor 7",
      description(){return "Boost your autoclickers based on autoclickers bought. Currently: *"+format(this.effect())},
      cost(){
        if (player.g.base.eq(3))return new Decimal(1e210)
        if (player.g.base.eq(4))return new Decimal(1e120)
        if (player.g.base.eq(5))return new Decimal(1e42)
        return new Decimal(1e7).pow(inChallenge("b",31)?10:1)
      },
      unlocked(){return hasUpgrade(this.layer,16) || player.g.base.gte(4)},
      effect(){
        let e = player.g.buyables[12].sqrt().add(1)
        if (hasUpgrade("b",11))e=e.mul(8)
        if (hasUpgrade("h",101))e=e.mul(5040)
        if (hasUpgrade("b",32))e=e.mul(getBase().sub(hasUpgrade("h",122)?0:4).max(1))
        e=e.pow(Decimal.pow(2,player.b.challenges[32]))
        if (hasUpgrade("c",12))e=e.pow(7)
        if (inChallenge("b",42))e=e.div(888)
        return e
      }
    },
    21:{
      title: "Dynamic Factor",
      description(){return "The gwa grows in power over time. Currently: "+(inChallenge("b",21)?"/":"*")+format(this.effect())+"<br>Cap: "+format(layers.g.dynamicCap())},
      cost(){
        if (player.g.base.eq(3))return new Decimal(1e220)
        if (player.g.base.eq(4))return new Decimal(1e111)
        return new Decimal(1)
      },
      unlocked(){return hasUpgrade(this.layer,17) || player.g.base.gte(4)},
      effect(){return player.g.dynamic.div(inChallenge("b",42)?888:1)}
    },
    22:{
      title: "gwadrupler",
      description(){return "Quadruple autobuyer speed."},
      cost(){
        return new Decimal(0)
      },
      unlocked(){return hasUpgrade("b",12)}
    },
    23:{
      title: "Factor gwa",
      description(){return "Autobuyer speed is multiplied by 96"},
      cost(){
        if (player.g.base.eq(4))return new Decimal(1e130)
        if (player.g.base.eq(5))return new Decimal(1e50)
        return new Decimal(1e8).pow(inChallenge("b",31)?10:1)
      },
      unlocked(){return player.g.base.gte(5) || (player.g.base.gte(4)&&hasUpgrade("g",17))}
    },
    24:{
      title: "The Difficulty",
      description(){return "Unlock challenges"},
      cost(){
        if (player.g.base.eq(5) && !player.g.challengeUnlock)return new Decimal(1e110)
        return new Decimal(0)
      },
      unlocked(){return (player.g.base.gte(6) || (player.g.base.gte(5)&&hasUpgrade("g",23))) && !player.g.challengeUnlock},
      onPurchase(){
        player.g.challengeUnlock = true;
      }
    },
    25:{
      title: "Large Numbers",
      description(){return "Unlock incrementy, and factor boosts now require psi ordinal instead of GP"},
      cost(){
        if (player.g.incrementyUnlock)return new Decimal(0)
        return new Decimal("6.66e666")
      },
      unlocked(){return player.g.base.gte(6) && !player.g.incrementyUnlock},
      onPurchase(){
        player.g.incrementyUnlock = true;
      }
    },
  },
  passiveGeneration(){
    return hasMilestone(this.layer,1)?1:0
  },
  milestones:{
    0: {
      requirementDescription: "Base 7",
        effectDescription: "Unlock Hierarchies, and start with 1 autoclicker",
        done() { return player.g.base.gte(7) },
      unlocked(){return player.g.base.gte(7) || hasMilestone(this.layer,this.id)}
    },
    1: {
      requirementDescription: "40 factor boosts",
        effectDescription: "Unlock overflow, gain 100% of GP gain on reset per second, and base shifts no longer reset any upgrades",
        done() { return player.b.boosts.gte(40) },
      unlocked(){return player.b.boosts.gte(40) || hasMilestone(this.layer,this.id)}
    },
    2: {
      requirementDescription: "60 factor boosts",
        effectDescription: "Unlock charge (subtab of Hierarchies)",
        done() { return player.b.boosts.gte(60) },
      unlocked(){return player.b.boosts.gte(40) || hasMilestone(this.layer,this.id)}
    },
    3: {
      requirementDescription: "1e100 FGH",
        effectDescription: "SGH effect is better",
        done() { return player.h.fast.gte(1e100) },
      unlocked(){return player.b.boosts.gte(60) || hasMilestone(this.layer,this.id)}
    },
    4: {
      requirementDescription: "75 factor boosts",
        effectDescription: "Unlock 3 more charge upgrades",
        done() { return player.b.boosts.gte(75) },
      unlocked(){return hasMilestone(this.layer, this.id-1)}
    },
    5: {
      requirementDescription: "1 googol incrementy",
        effectDescription: "Autobuy hierarchy buyables, unlock a new booster power effect, divide charge cost by e14, and multiply autobuyer speed by e100",
        done() { return player.b.incrementy.gte(1e100) },
      unlocked(){return hasMilestone(this.layer, this.id-1)}
    },
    6: {
      requirementDescription: "200 boosts and all sluggish milestones",
        effectDescription: "Auto booster reset and boosters reset nothing",
        done() { return player.b.boosts.gte(200)&&hasMilestone("c",5) },
      unlocked(){return hasMilestone(this.layer, this.id-1)}
    },
    7: {
      requirementDescription: "Base 10",
        effectDescription: "Unlock sluggish milestones",
        done() { return player.g.base.gte(10) },
      unlocked(){return hasMilestone(this.layer, this.id-1)}
    },
  },
  dynamicCap(){
    
      let cap = new Decimal(10)
      if (hasUpgrade("b",21) || inChallenge("b",21)){
        cap=cap.mul(10)
      }
    cap=cap.mul(Decimal.pow(10,player.b.challenges[21]))
      if (hasUpgrade("b",53))cap=cap.mul(upgradeEffect("b",53))
      if (player.g.base.gte(7))cap=cap.mul(buyableEffect("h",32))
      cap=cap.mul(alephEffect(3))
      if (hasUpgrade("h",122)){;cap=cap.mul(player.g.base)}
    if (hasUpgrade("h",111)){
        cap=cap.sqr()
      }
    return cap
  },
  update(diff){
    if (hasUpgrade("g",21)){
      let gain = new Decimal(0.01)
      if (hasUpgrade("b",21) || inChallenge("b",21)){
        gain=gain.mul(10)
      }
      gain=gain.mul(Decimal.pow(10,player.b.challenges[21]))
      if (player.g.incrementyUnlock)gain=gain.mul(buyableEffect("b",13))
      if (hasUpgrade("h",121))gain=gain.mul(getTotalCompletions())
      if (hasUpgrade("h",122)){gain=gain.mul(player.g.base)}
      gain=gain.mul(alephEffect(3))
      
  gain=gain.mul(buyableEffect("c",12))
      let cap = layers.g.dynamicCap()
      if (hasUpgrade("h",111)){
        player.g.dynamic = player.g.dynamic.sqrt().add(gain.mul(diff)).sqr().min(cap)
      }
      else player.g.dynamic = player.g.dynamic.add(gain.mul(diff)).min(cap)
    }
    if (inChallenge("b",41)){
      player.g.decrementy=player.g.decrementy.mul(Decimal.pow(player.g.points.max(2).log(2),diff/hasUpgrade("c",34)?3:60))
    } else {player.g.decrementy=new Decimal(1)}
    if (player.g.points.gte(layers.g.buyables[11].cost()) || (player.b.activeChallenge&&player.g.points.gte(layers.b.challenges[player.b.activeChallenge].req())))return
    if (hasUpgrade("b",13)){
      for (let i in layers.g.upgrades){
        buyUpg("g",i)
      }
    }
    if (hasUpgrade("b",12)){
      if (layers.g.clickables[12].canClick())layers.g.clickables[12].onClick()
    }
    if (hasMilestone("g",5)){
      for (let i of [11,12,21,22,31,32]){
          if (layers.h.buyables[i].canAfford()){layers.h.buyables[i].buy()}
        
      }
    }
  },
  doReset(l){
    if (l=="c"){
      
      layerDataReset(this.layer, ["milestones", "buyables", "base", "challengeUnlock", "incrementyUnlock"])
      setBuyableAmount(this.layer, 12, new Decimal(1))
      if (!hasMilestone("c",1))player.g.milestones=player.g.milestones.filter(x=>x<5)
    }
  },
  tabFormat: {
    "gwarkup": {
      unlocked(){return true},
      content: [
        "main-display",
        ["prestige-button", function(){return true}],
        "blank",
        "clickables",
        "blank",
        "buyables",
        "blank",
        "milestones"
      ]
    },
    "factors": {
      unlocked(){return player.g.base.gte(3)},
      content: [
        "main-display",
        ["prestige-button", function(){return true}],
        "blank",
        "blank",
        "upgrades",
      ]
    }
  }
})
