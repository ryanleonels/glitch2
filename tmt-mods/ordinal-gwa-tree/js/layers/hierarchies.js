addLayer("h", {
    name: "Hierarchies", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
      slow: new Decimal(0),
      fast: new Decimal(0),
      boosterPower: new Decimal(0),
      charge: new Decimal(0),
      overcharge: new Decimal(0),
    }},
    color: "#a52a2a",
    requires(){
      return new Decimal(5)}, // Can be a function that takes requirement increases into account
    resource: "Hierarchy", // Name of prestige currency
    baseResource(){return "base shifts"}, // Name of resource prestige is based on
    baseAmount() {return getBuyableAmount("g",11)}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player.g.base.gte(7)&&!inAnyChallenge("r")},
  tooltip: "Hierarchies",
  clickables: {
    11:{
      canClick(){return true},
      onClick(){player.h.charge=getBuyableAmount("b",14);player.h.upgrades=player.h.upgrades.filter(i=>i<100);boost()},
      display(){return "Respec Charged upgrades"}
    },
  },
  upgrades: {
    11:{
      description(){return "Psi Doubler's base is 2.1"},
      cost(){
        return new Decimal(1e10)
      },
      currencyDisplayName: "FGH",
      currencyInternalName: "fast",
      currencyLocation(){return player.h},
    },
    12:{
      description(){return "Gain 2 free Psi Doublers"},
      cost(){
        return new Decimal(1e10)
      },
      currencyDisplayName: "SGH",
      currencyInternalName: "slow",
      currencyLocation(){return player.h},
    },
    21:{
      description(){return "<b>incrementy gain booster #498797411654654</b> is improved"},
      cost(){
        return new Decimal(1e20)
      },
      currencyDisplayName: "FGH",
      currencyInternalName: "fast",
      currencyLocation(){return player.h},
    },
    22:{
      description(){return "<b>Factor 8?</b> is improved"},
      cost(){
        return new Decimal(1e17)
      },
      currencyDisplayName: "SGH",
      currencyInternalName: "slow",
      currencyLocation(){return player.h},
    },
    31:{
      description(){return "Gain free incrementy doublers based on FGH and FGH multiplies factor 6"},
      cost(){
        return new Decimal(1e45)
      },
      currencyDisplayName: "FGH",
      currencyInternalName: "fast",
      currencyLocation(){return player.h},
    },
    32:{
      description(){return "Gain free dynamic doublers based on SGH and SGH multiplies factor 5"},
      cost(){
        return new Decimal(1e30)
      },
      currencyDisplayName: "SGH",
      currencyInternalName: "slow",
      currencyLocation(){return player.h},
    },
    101:{
      description(){return "Supercharge Booster Upgrade 1"},
      cost(){
        return new Decimal(1)
      },
      currencyDisplayName: "Charge",
      currencyInternalName: "charge",
      currencyLocation(){return player.h},
    },
    102:{
      description(){return "Supercharge Booster Upgrade 2"},
      cost(){
        return new Decimal(1)
      },
      currencyDisplayName: "Charge",
      currencyInternalName: "charge",
      currencyLocation(){return player.h},
    },
    103:{
      description(){return "Supercharge Booster Upgrade 3"},
      cost(){
        return new Decimal(1)
      },
      currencyDisplayName: "Charge",
      currencyInternalName: "charge",
      currencyLocation(){return player.h},
    },
    111:{
      description(){return "Supercharge Booster Upgrade 4"},
      cost(){
        return new Decimal(3)
      },
      currencyDisplayName: "Charge",
      currencyInternalName: "charge",
      currencyLocation(){return player.h},
      onPurchase() {
        player.g.dynamic = new Decimal(1);
      }
    },
    112:{
      description(){return "Supercharge Booster Upgrade 5"},
      cost(){
        return new Decimal(3)
      },
      currencyDisplayName: "Charge",
      currencyInternalName: "charge",
      currencyLocation(){return player.h},
    },
    113:{
      description(){return "Supercharge Booster Upgrade 6"},
      cost(){
        return new Decimal(3)
      },
      currencyDisplayName: "Charge",
      currencyInternalName: "charge",
      currencyLocation(){return player.h},
    },
    121:{
      description(){return "Supercharge Booster Upgrade 7"},
      cost(){
        return new Decimal(7)
      },
      currencyDisplayName: "Charge",
      currencyInternalName: "charge",
      currencyLocation(){return player.h},
      unlocked(){return hasMilestone("g",4)}
    },
    122:{
      description(){return "Supercharge Booster Upgrade 8"},
      cost(){
        return new Decimal(7)
      },
      currencyDisplayName: "Charge",
      currencyInternalName: "charge",
      currencyLocation(){return player.h},
      unlocked(){return hasMilestone("g",4)}
    },
    123:{
      description(){return "Supercharge Booster Upgrade 9"},
      cost(){
        return new Decimal(7)
      },
      currencyDisplayName: "Charge",
      currencyInternalName: "charge",
      currencyLocation(){return player.h},
      unlocked(){return hasMilestone("g",4)}
    },
    131:{
      description(){return "Supercharge Booster Upgrade 10"},
      cost(){
        return new Decimal(30)
      },
      currencyDisplayName: "Charge",
      currencyInternalName: "charge",
      currencyLocation(){return player.h},
      unlocked(){return hasMilestone("c",5)}
    },
    132:{
      description(){return "Supercharge Booster Upgrade 11"},
      cost(){
        return new Decimal(30)
      },
      currencyDisplayName: "Charge",
      currencyInternalName: "charge",
      currencyLocation(){return player.h},
      unlocked(){return hasMilestone("c",5)}
    },
    133:{
      description(){return "Supercharge Booster Upgrade 12"},
      cost(){
        return new Decimal(30)
      },
      currencyDisplayName: "Charge",
      currencyInternalName: "charge",
      currencyLocation(){return player.h},
      unlocked(){return hasMilestone("c",5)}
    },
    141:{
      description(){return "Supercharge Booster Upgrade 13"},
      cost(){
        return new Decimal(100)
      },
      currencyDisplayName: "Charge",
      currencyInternalName: "charge",
      currencyLocation(){return player.h},
      unlocked(){return hasMilestone("c",5)}
    },
    142:{
      description(){return "Supercharge Booster Upgrade 14"},
      cost(){
        return new Decimal(100)
      },
      currencyDisplayName: "Charge",
      currencyInternalName: "charge",
      currencyLocation(){return player.h},
      unlocked(){return hasMilestone("c",5)}
    },
    143:{
      description(){return "Supercharge Booster Upgrade 15"},
      cost(){
        return new Decimal(100)
      },
      currencyDisplayName: "Charge",
      currencyInternalName: "charge",
      currencyLocation(){return player.h},
      unlocked(){return hasMilestone("c",5)}
    },
  },
  buyables:{
    11: {
        cost(x=getBuyableAmount(this.layer,this.id)) { 
          return Decimal.pow(tmp.h.fastBase,x).mul(tmp.h.fastBase)
        },
        display() { return "Boost FGH and SGH gain based on challenge completions.<br>Currently: "+format(this.effect())+"x<br>Cost: "+numToOrdinal(this.cost(), new Decimal(tmp.h.fastBase))+" FGH ordinal" },
        canAfford() { return player.h.fast.gte(this.cost()) },
        buy() {
            if (!hasMilestone("g",5))player[this.layer].fast = player[this.layer].fast.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      effect(){return Decimal.mul(new Decimal(getTotalCompletions()+1).sqrt(), getBuyableAmount(this.layer,this.id)).add(1)},
    },
    12: {
        cost(x=getBuyableAmount(this.layer,this.id)) { 
          return Decimal.pow(tmp.h.slowBase,x).mul(tmp.h.slowBase)
        },
        display() { return "Boost FGH and SGH gain based on factor boosts.<br>Currently: "+format(this.effect())+"x<br>Cost: "+numToOrdinal(this.cost(), new Decimal(tmp.h.slowBase))+" SGH ordinal" },
        canAfford() { return player.h.slow.gte(this.cost()) },
        buy() {
            if (!hasMilestone("g",5))player[this.layer].slow = player[this.layer].slow.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      effect(){return Decimal.mul(player.b.boosts.add(1).sqrt(), getBuyableAmount(this.layer,this.id)).add(1)},
    },
    21: {
        cost(x=getBuyableAmount(this.layer,this.id)) { 
          return Decimal.pow(tmp.h.fastBase,x).mul(tmp.h.fastBase**6)
        },
        display() { return "Boost FGH effect based on SGH ordinal.<br>Currently: "+format(this.effect())+"x<br>Cost: "+numToOrdinal(this.cost(), new Decimal(tmp.h.fastBase))+" FGH ordinal" },
        canAfford() { return player.h.fast.gte(this.cost()) },
        buy() {
            if (!hasMilestone("g",5))player[this.layer].fast = player[this.layer].fast.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      effect(){return Decimal.mul(player.h.slow.add(1).log10().sqrt().add(1), getBuyableAmount(this.layer,this.id)).add(1)},
    },
    22: {
        cost(x=getBuyableAmount(this.layer,this.id)) { 
          return Decimal.pow(tmp.h.slowBase,x).mul(tmp.h.slowBase**6)
        },
        display() { return "Boost SGH effect based on FGH ordinal.<br>Currently: "+format(this.effect())+"x<br>Cost: "+numToOrdinal(this.cost(), new Decimal(tmp.h.slowBase))+" SGH ordinal" },
        canAfford() { return player.h.slow.gte(this.cost()) },
        buy() {
            if (!hasMilestone("g",5))player[this.layer].slow = player[this.layer].slow.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      effect(){return Decimal.mul(tmp.h.fastOrd.add(1).log10().sqrt().add(1), getBuyableAmount(this.layer,this.id)).add(1)},
    },
    31: {
        cost(x=getBuyableAmount(this.layer,this.id)) { 
          return Decimal.pow(100,x).mul(1e25)
        },
        display() { return "Gain a free dynamic doubler.<br>Currently: +"+formatWhole(this.effect())+"<br>Cost: "+format(this.cost())+" incrementy" },
        canAfford() { return player.b.incrementy.gte(this.cost()) },
        buy() {
            if (!hasMilestone("g",5))player.b.incrementy = player.b.incrementy.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      effect(){return getBuyableAmount(this.layer,this.id)},
    },
    32: {
        cost(x=getBuyableAmount(this.layer,this.id)) { 
          return Decimal.pow(100,x).mul(1e25)
        },
        display() { return "Double dynamic cap.<br>Currently: "+formatWhole(this.effect())+"x<br>Cost: "+format(this.cost())+" incrementy" },
        canAfford() { return player.b.incrementy.gte(this.cost()) },
        buy() {
            if (!hasMilestone("g",5))player.b.incrementy = player.b.incrementy.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      effect(){return Decimal.pow(2, getBuyableAmount(this.layer,this.id))},
    },
  },
  slowGain(){
    let g = player.b.psi.div(1e8)
    g=g.mul(buyableEffect("h",11))
    g=g.mul(buyableEffect("h",12))
    if (hasUpgrade("b",42))g=g.mul(Decimal.pow(3, player.b.boosts.sub(30).max(0)))
    if (hasUpgrade("b",43))g=g.mul(1e10)
    g=g.mul(alephEffect(6))
    if (hasUpgrade("h",132))g=g.mul(player.c.points.pow(player.c.points.add(1).log10().pow(1/2).add(1)))
    if (hasUpgrade("h",133))g=g.mul(Decimal.pow(10,player.h.charge))
    if (hasUpgrade("h",142))g=g.pow(upgradeEffect("b",102))
    return g.floor()
  },
  fastGain(){
    let g = player.b.incrementy.div(1e17)
    g=g.mul(buyableEffect("h",11))
    g=g.mul(buyableEffect("h",12))
    if (hasUpgrade("b",42))g=g.mul(Decimal.pow(5, player.b.boosts.sub(30).max(0)))
    if (hasUpgrade("b",43))g=g.mul(1e10)
    g=g.mul(alephEffect(7))
    if (hasUpgrade("h",132))g=g.mul(player.c.points.pow(player.c.points.add(1).log10().pow(2/3).add(1)))
    if (hasUpgrade("h",133))g=g.mul(Decimal.pow(10,player.h.charge))
    if (hasUpgrade("c",14))g=g.pow(player.g.points.add(10).log10().log10().pow(hasUpgrade("c",104)?0.2:0.1))
    return g.floor()
  },
  slowEffect(){
    let eff = new Decimal(tmp.h.slowOrd).add(1).log10().add(1)
    eff=eff.mul(buyableEffect("h",22))
    if (hasMilestone("g",3))eff=eff.pow(1.25)
    if (hasUpgrade("b",102))eff=eff.pow(upgradeEffect("b",102))
    return eff.pow(buyableEffect("c",13).add(1))
  },
  fastEffect(){
    let eff = new Decimal(tmp.h.fastOrd).add(1).log10().add(1)
    eff=eff.mul(buyableEffect("h",21))
    return eff.pow(buyableEffect("c",13).add(1))
  },
  fastBase() {
    let base = 10
    if (hasUpgrade("b", 101)) {
      base = 8
      if (hasUpgrade("h",141)) {
        base = 7
      }
    }
    return base
  },
  slowBase() {
    let base = 10
    return base
  },
  fastOrd() {
    return new Decimal(hierarchyOrd(player.h.fast, new Decimal(this.fastBase())))
    
  },
  slowOrd() {
    return new Decimal(hierarchyOrd(player.h.slow, new Decimal(this.slowBase())))
  },
  update(diff){
    if (hasMilestone("g",0)){
      player.h.fast=player.h.fast.add(layers.h.fastGain().mul(diff))
      player.h.slow=player.h.slow.add(layers.h.slowGain().mul(diff))
    }
    if (hasMilestone("g",1)){
      player.h.boosterPower=player.h.boosterPower.add(layers.h.bpowerGain().mul(diff))
    }
    if (hasUpgrade("c",14)){
      player.h.overcharge=player.h.overcharge.add(layers.h.overchargeGain().mul(diff))
    }
    if (hasMilestone("c",1)){
      if (!hasUpgrade("h",111)) player.h.upgrades.push(111)
    }
  },
  bpowerGain(){
    let g = (layers.b.getBoosters().sub(820)).div(100)
    if (hasUpgrade("h",113)) g=g.mul(getBuyableAmount("b",14).sqr().max(1))
    g=g.mul(alephEffect(8))
    if (hasMilestone("d",1)) g=g.mul(player.d.veblen[0].pow(0.25).add(1))
    return g.max(0)
  },
  bpowerEffect(){
    let e = player.h.boosterPower.add(100).div(100).log10().div(10)
    if (hasUpgrade("c",14))e=e.mul(layers.h.overchargeEffect())
    if (hasUpgrade("c",112)){
      if (e.gt(0.46))e=e.mul(0.46).sqrt()
    }
    else if (hasUpgrade("c",22)){
      if (e.gt(0.4))e=e.mul(0.4).sqrt()
    }
    else {if (e.gt(0.36)){e=e.sqrt().mul(0.6)}}
    
    return e
  },
  bpowerEffect2(){
    let e = player.h.boosterPower.div(10).add(1).log10().add(1).pow(-0.1)
    if (hasUpgrade("c",14))e=e.div(layers.h.overchargeEffect())
    return e
  },
  bpowerEffect3(){
    if (!hasMilestone("g",5))return new Decimal(1)
    let e = player.h.boosterPower.add(1).log10().add(1)
    if (hasUpgrade("c",14))e=e.pow(layers.h.overchargeEffect())
    return e
  },
  overchargeGain(){
    if (!hasUpgrade("c",14))return new Decimal(0)
    let gain = getBuyableAmount("b",14).sub(33).max(0)
    return gain
  },
  overchargeEffect(){
    return player.h.overcharge.add(1).log10().add(1).cbrt().add(9).div(10)
  },
  overchargeEffect2(){
    return player.h.overcharge.add(1000).log(1000)
  },
  doReset(l){
    if (l=="c"){
      let k=[]
      if (hasMilestone("c",4))k.push("upgrades")
      layerDataReset(this.layer,k)
      player.h.upgrades=player.h.upgrades.filter(x=>x<100)
    }
  },
  tabFormat: {
    "Hierarchies": {
      unlocked(){return hasMilestone("g",0) || player.g.base.gte(7)},
      content: [
        
        ["display-text",function(){
          return "Your FGH ordinal is "+numToOrdinal(player.h.fast, new Decimal(tmp.h.fastBase))+" ("+tmp.h.fastBase+"), multiplying Factor 2 (pre-exponent) by "+format(layers.h.fastEffect())
        }],
        ["display-text",function(){
          return "Your SGH ordinal is "+numToOrdinal(player.h.slow, new Decimal(tmp.h.slowBase))+" ("+tmp.h.slowBase+"), multiplying incrementy gain by "+format(layers.h.slowEffect())
        }],
        ["display-text", function(){
          return "Both Hierarchies are Maximized instantly. Their Successor gains are based on Incrementy Amount and Psi Ordinal respectively."
        }],
        "blank",
        ["row",[["upgrade",11],["buyable",11],["buyable",12],["upgrade",12]]],
        ["row",[["upgrade",21],["buyable",21],["buyable",22],["upgrade",22]]],
        ["row",[["upgrade",31],["buyable",31],["buyable",32],["upgrade",32]]],
      ]
    },
    "Overflow":{
      unlocked(){return hasMilestone("g",1)},
      content: [
        ["display-text",function(){
          return "You have "+formatWhole(layers.b.getBoosters().sub(820))+" excess boosters, producing "+format(layers.h.bpowerGain())+" booster power/s"
        }],
        "blank",
        ["display-text",function(){
          return "You have "+format(player.h.boosterPower)+" booster power,<br>adding  "+format(layers.h.bpowerEffect(), 4)+" to <b>Psi Doubler</b>'s base,<br>raising <b>Incrementy Doubler</b>'s cost to the ^"+format(layers.h.bpowerEffect2(), 5)+(hasMilestone("g",5)?",<br>raising <b>AutoBooster</b> to the ^"+format(layers.h.bpowerEffect3(), 4):"")
        }],
        "blank",
        ["display-text",function(){
          if (!hasUpgrade("c",14))return
          return "You have "+formatWhole(getBuyableAmount("b",14).sub(33))+" excess charge, producing "+format(layers.h.overchargeGain())+" overcharge/s"
        }],
        "blank",
        ["display-text",function(){
          if (!hasUpgrade("c",14))return
          return "You have "+format(player.h.overcharge)+" overcharge,<br>strengthening all booster power effects by "+format(layers.h.overchargeEffect(), 4)+"x"+(hasSL(5)?",<br>powering ℵ<sub>5</sub> to ℵ<sub>8</sub> by ^"+format(layers.h.overchargeEffect2(), 4):"")
        }],
      ]
    },
    "Charge":{
      unlocked(){return hasMilestone("g",2)},
      content: [
        ["display-text",function(){
          return "You have "+formatWhole(player.h.charge)+" charge remaining.<br>You have a total of "+formatWhole(getBuyableAmount("b",14))+" charges."
        }],
        "blank",
        "clickables",
        "blank",
        ["row",[["upgrade",101],["upgrade",102],["upgrade",103]]],
        ["row",[["upgrade",111],["upgrade",112],["upgrade",113]]],
        ["row",[["upgrade",121],["upgrade",122],["upgrade",123]]],
        ["row",[["upgrade",131],["upgrade",132],["upgrade",133]]],
        ["row",[["upgrade",141],["upgrade",142],["upgrade",143]]],
      ]
    }
  }
})