addLayer("b", {
    name: "boosters", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
      boosts: new Decimal(0),
      incrementy: new Decimal(0),
      psi: new Decimal(0)
    }},
    color: "#3333FF",
    requires(){
      if (player.b.boosts.gte(160)) return Decimal.pow(BHO, player.b.boosts.div(10).sub(10))
      if (player.b.boosts.gte(80)) return Decimal.pow(BHO, player.b.boosts.div(20).sub(2))
      if (player.b.boosts.gte(40)) return Decimal.pow(3, player.b.boosts).mul(12)
      if (player.g.incrementyUnlock)return Decimal.pow(3, player.b.boosts).round().mul(12).round().min(BHO)
      return new Decimal(1e20).pow(Decimal.pow(2.5, player.b.boosts.min(2)).mul(Decimal.pow(2,player.b.boosts.sub(2).max(0))))}, // Can be a function that takes requirement increases into account
    resource: "boosters", // Name of prestige currency
    baseResource(){return (player.g.incrementyUnlock ? "psi ordinal":"gwarkup points")}, // Name of resource prestige is based on
    baseAmount() {return (player.g.incrementyUnlock ?player.b.psi : player.g.points)}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Perform a factor boost", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.g.base.gte(4)&&!inAnyChallenge("r")},
  getNextAt(){return this.requires()},
  resetsNothing() {return hasMilestone("g",6)},
  autoPrestige() {return hasMilestone("g",6)},
  prestigeButtonText(){return "Perform a "+(player.b.boosts.gte(160)?"(very scaled) ":player.b.boosts.gte(80)?"(scaled) ":"")+"factor boost for <b>+"+formatWhole(this.getResetGain())+"</b> boosters.<br>Requires: "+(/*player.b.boosts.gte(40)?"Infinity":*/player.g.incrementyUnlock?numToPsi(this.requires())+" psi ordinal":format(this.requires())+" gwarkup points")},
  getResetGain(){
      return player.b.boosts.add(1)
  },
  canReset(){return (player.g.incrementyUnlock?player.b.psi:player.g.points).gte(this.requires()) && (player.g.incrementyUnlock||((player.g.points.lt("e9.99e9") || player.g.base.gte(10)) && !player.b.activeChallenge))},
  onPrestige(){
    if (!hasMilestone("c",1))boost()
    player.b.boosts=player.b.boosts.add(1)
    if (player.g.incrementyUnlock && !hasMilestone("g",6)) {player.b.psi=new Decimal(0)}
  },
  getBoosters(){
    let b = T(player.b.boosts)
    if (hasMilestone("c",3))b=b.add(190)
    return b
  },
  clickables: {
    11:{
      canClick(){return true},
      onClick(){player.b.points=layers.b.getBoosters();player.b.upgrades=player.b.upgrades.filter(i=>i>50&&i<100);boost();player.points=new Decimal(0)},
      display(){return "Respec upgrades"}
    },
  },
  upgrades: {
    11:{
      description(){if (hasUpgrade("h",101))return "Multiply factor effects by (factor number+1)!"
        return "Multiply factor effects by factor number+1"},
      cost(){
        return new Decimal(1)
      },
    },
    12:{
      description(){if (hasUpgrade("h",102))return "Automatically max all autobuyers and quadrupler effect ^44"
        return "Automatically max all autobuyers and unlock the quadrupler."},
      cost(){
        return new Decimal(1)
      },
    },
    13:{
      description(){if (hasUpgrade("h",103))return "Automatically buy factors and autobuyer scaling is 1.001x"
        return "Automatically buy factors."},
      cost(){
        return new Decimal(1)
      },
    },
    21:{
      description(){if (hasUpgrade("h",111) || hasMilestone("c",1))return "Square dynamic effect, and dynamic factor increases 10x faster and caps 10x later, but Incrementy upgrade 6 ^0.6."
        return "Dynamic factor increases 10x faster and caps 10x later."},
      cost(){
        return new Decimal(5)
      },
      canAfford(){return hasUpgrade(this.layer,this.id-10)}
    },
    22:{
      description(){if (hasUpgrade("h",112))return "gwarkup point gain base is 25"
        return "Multiply gwarkup point gain by 1e10."},
      cost(){
        return new Decimal(3)
      },
      canAfford(){return hasUpgrade(this.layer,this.id-10)}
    },
    23:{
      description(){if (hasUpgrade("h",113))return "Booster power gain is multiplied by charge"
        return "Total boosters multiply autoclicker speed"},
      cost(){
        return new Decimal(4)
      },
      canAfford(){return hasUpgrade(this.layer,this.id-10)}
    },
    31:{
      description(){if (hasUpgrade("h",121))return "Challenge completions multiply incrementy and dynamic gain"
        return "C5-8 completions multiply incrementy gain"},
      cost(){
        return new Decimal(16)
      },
      canAfford(){return hasUpgrade(this.layer,this.id-10)},
      unlocked(){return player.g.base.gte(6)}
    },
    32:{
      description(){if (hasUpgrade("h",122))return "All factors are multiplied by the ordinal base (before reductions)"
        return "Factors 1-7 are multiplied by the ordinal base-4"},
      cost(){
        return new Decimal(18)
      },
      canAfford(){return hasUpgrade(this.layer,this.id-10)},
      unlocked(){return player.g.base.gte(6)}
    },
    33:{
      description(){if (hasUpgrade("h",123))return "The ordinal base is lowered by 3"
        return "The ordinal base is lowered by 2"},
      cost(){
        return new Decimal(42)
      },
      canAfford(){return hasUpgrade(this.layer,this.id-10)},
      unlocked(){return player.g.base.gte(6)}
    },
    41:{
      description(){if (hasUpgrade("h",131))return "The ordinal base boosts incrementy at a higher rate"
        return "The ordinal base boosts incrementy"},
      cost(){
        return new Decimal(234)
      },
      canAfford(){return hasUpgrade(this.layer,this.id-10)},
      unlocked(){return player.g.base.gte(7)}
    },
    42:{
      description(){if (hasUpgrade("h",132))return "Hierarchies grow faster based on factor boosts and unspent cardinals"
        return "Hierarchies grow faster based on factor boosts"},
      cost(){
        return new Decimal(203)
      },
      canAfford(){return hasUpgrade(this.layer,this.id-10)},
      unlocked(){return hasUpgrade(this.layer,41)||player.g.base.gte(8)}
    },
    43:{
      description(){if (hasUpgrade("h",133))return "Gain 10^(unspent charge+10)x hierarchies"
        return "Gain 1e10x more FGH and SGH"},
      cost(){
        return new Decimal(102)
      },
      canAfford(){return hasUpgrade(this.layer,this.id-10)},
      unlocked(){return hasUpgrade(this.layer,42)||player.g.base.gte(8)}
    },
    101:{
      description(){if (hasUpgrade("h",141))return "Reduce the FGH base to 7"
        return "Reduce the FGH base to 8"},
      cost(){
        return new Decimal(12500)
      },
      canAfford(){return hasUpgrade(this.layer,this.id-60)},
      unlocked(){return hasMilestone("c",5)}
    },
    102:{
      description(){if (hasUpgrade("h",142))return "Boost SGH effect and gain exponent based on light mode buyables bought"
        return "Boost SGH effect exponent based on light mode buyables bought"},
      cost(){
        return new Decimal(14285)
      },
      canAfford(){return hasUpgrade(this.layer,this.id-60)},
      unlocked(){return hasMilestone("c",5)},
      effect() {
        return getBuyableAmount("c",11).add(getBuyableAmount("c",12)).add(getBuyableAmount("c",13)).div(10).add(1)
      }
    },
    103:{
      description(){return "Total alephs boost cardinal gain. Currently: x"+format(this.effect())},
      cost(){
        return new Decimal(16666)
      },
      canAfford(){return hasUpgrade(this.layer,this.id-60)},
      unlocked(){return hasMilestone("c",5)},
      effect() {
        let total = player.c.alephs[0].add(player.c.alephs[1]).add(player.c.alephs[2]).add(player.c.alephs[3]).add(player.c.alephs[4]).add(player.c.alephs[5]).add(player.c.alephs[6]).add(player.c.alephs[7])
        return total.pow(1/6).max(1).pow(hasUpgrade("h",143)?1.2:1)
      }
    },
    51:{
      title: "AutoBooster",
      description(){return "Incrementy multiplies autoclicker speed. Currently: *"+format(this.effect())},
      cost(){
        return new Decimal(1e7)
      },
      currencyDisplayName: "incrementy",
      currencyInternalName: "incrementy",
      currencyLocation(){return player.b},
      unlocked(){return player.g.incrementyUnlock},
      effect(){return Decimal.pow(10,player.b.incrementy.add(1).log10().sqrt()).add(1).pow(layers.h.bpowerEffect3()).pow(hasUpgrade("c",102)?7:1)}
    },
    52:{
      title: "Factor 8?",
      description(){return "Incrementy boosts factor 3 after exponents. Currently: *"+format(this.effect())},
      cost(){
        return new Decimal(2e9)
      },
      currencyDisplayName: "incrementy",
      currencyInternalName: "incrementy",
      currencyLocation(){return player.b},
      unlocked(){return player.g.incrementyUnlock},
      effect(){return player.b.incrementy.pow(hasUpgrade("h",22)?0.5:0.25).add(1).pow(hasUpgrade("c",102)?7:1)}
    },
    53:{
      title: "Dynamic Raising",
      description(){return "Per factor boost multiply dynamic cap by "+(hasUpgrade("c",31)?2.25:1.5)+". Currently: *"+format(this.effect())},
      cost(){
        return new Decimal(3e8)
      },
      currencyDisplayName: "incrementy",
      currencyInternalName: "incrementy",
      currencyLocation(){return player.b},
      unlocked(){return player.g.incrementyUnlock},
      effect(){return Decimal.pow(1.5,player.b.boosts).pow(hasUpgrade("c",31)?2:1)}
    },
    61:{
      title: "Psi upgrade",
      description(){return "Factor 2 boosts psi ordinal gain at a reduced rate. Currently: *"+format(this.effect())},
      cost(){
        return new Decimal(4e10)
      },
      currencyDisplayName: "incrementy",
      currencyInternalName: "incrementy",
      currencyLocation(){return player.b},
      unlocked(){return player.g.incrementyUnlock},
      effect(){return upgradeEffect("g",12).pow(0.1)}
    },
    62:{
      title: "The Least Creative Upgrade Name Ever",
      description(){return "Challenge completions boost psi ordinal gain. Currently: *"+format(this.effect())},
      cost(){
        return new Decimal(6e11)
      },
      currencyDisplayName: "incrementy",
      currencyInternalName: "incrementy",
      currencyLocation(){return player.b},
      unlocked(){return player.g.incrementyUnlock},
      effect(){return Decimal.pow(1.1,getTotalCompletions()).pow(hasUpgrade("c",103)?4:hasUpgrade("c",13)?2:1)}
    },
    63:{
      title: "incrementy gain booster #498797411654654",
      description(){return "Dynamic factor multiplies incrementy gain. Currently: *"+format(this.effect())},
      cost(){
        return new Decimal(5e7)
      },
      currencyDisplayName: "incrementy",
      currencyInternalName: "incrementy",
      currencyLocation(){return player.b},
      unlocked(){return player.g.incrementyUnlock},
      effect(){return upgradeEffect("g",21).pow((hasUpgrade("h",111)||hasMilestone("c",1))?0.2:hasUpgrade("h",21)?1/3:0.25).max(1)}
    },
    71:{
      title: "boosted boosters boosts boost boosts",
      description(){return "Total boosters multiplies Factor 1 before exponents. Currently: *"+format(this.effect())},
      cost(){
        return new Decimal(7e16)
      },
      currencyDisplayName: "incrementy",
      currencyInternalName: "incrementy",
      currencyLocation(){return player.b},
      unlocked(){return player.g.incrementyUnlock},
      effect(){return layers.b.getBoosters()}
    },
    72:{
      title: "ALL 11 ALBANIAS",
      description(){return "Multiply factor 2 by 11. Currently: *"+format(this.effect())},
      cost(){
        return new Decimal(8e17)
      },
      currencyDisplayName: "incrementy",
      currencyInternalName: "incrementy",
      currencyLocation(){return player.b},
      unlocked(){return player.g.incrementyUnlock},
      effect(){return 11}
    },
    73:{
      title: "those 12 bees:",
      description(){return "Multiply autobuyer speed by 12. Currently: *"+format(this.effect())},
      cost(){
        return new Decimal(9e17)
      },
      currencyDisplayName: "incrementy",
      currencyInternalName: "incrementy",
      currencyLocation(){return player.b},
      unlocked(){return player.g.incrementyUnlock},
      effect(){return 12}
    },
  },
  buyables:{
    
    11: {
        cost(x=getBuyableAmount(this.layer,this.id)) { 
          return Decimal.pow(x.add(1),x.add(1)).mul(1000).pow(layers.h.bpowerEffect2())
        },
        display() { return "Double incrementy gain.<br>Currently: "+formatWhole(this.effect())+"x<br>Cost: "+format(this.cost())+" incrementy" },
      title: "Incrementy Doubler",
        canAfford() { return player[this.layer].incrementy.gte(this.cost()) },
        buy() {
            if (!hasMilestone("c",2))player[this.layer].incrementy = player[this.layer].incrementy.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      unlocked(){return player.g.incrementyUnlock},
      effect(){return Decimal.pow(2, getBuyableAmount(this.layer,this.id).add(hasUpgrade("h",31)?player.h.fast.div(1e0).max(1).log10().div(5).floor().add(1):0))},
    },
    12: {
        cost(x=getBuyableAmount(this.layer,this.id).add(1)) {
          if (x.gte(1500)) x=x.sub(1500).pow(1.1).add(1500)
          return Decimal.pow(10,x.add(4))
        },
        display() { return "Double psi ordinal gain.<br>Currently: "+formatWhole(this.effect())+"x<br>Cost: "+format(this.cost())+" incrementy" },
      title: "Psi Doubler",
        canAfford() { return player[this.layer].incrementy.gte(this.cost()) },
        buy() {
            if (!hasMilestone("c",2))player[this.layer].incrementy = player[this.layer].incrementy.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      unlocked(){return player.g.incrementyUnlock},
      effect(){return Decimal.pow(new Decimal(hasUpgrade("h",11)?2.1:2).add(layers.h.bpowerEffect()), getBuyableAmount(this.layer,this.id).add((hasUpgrade("h",12)?2:0)))},
    },
    13: {
        cost(x=getBuyableAmount(this.layer,this.id).add(1)) { 
          return Decimal.pow(4,x.pow(1.5)).mul(1e6)
        },
        display() { return "Double dynamic gain.<br>Currently: "+formatWhole(this.effect())+"x<br>Cost: "+format(this.cost())+" incrementy" },
      title: "Dynamic Doubler",
        canAfford() { return player[this.layer].incrementy.gte(this.cost()) },
        buy() {
            if (!hasMilestone("c",2))player[this.layer].incrementy = player[this.layer].incrementy.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      unlocked(){return player.g.incrementyUnlock},
      effect(){return Decimal.pow(2, getBuyableAmount(this.layer,this.id).add(hasUpgrade("h",32)?player.h.slow.div(1e25).max(1).log10().div(5).floor().add(1):0).add(buyableEffect("h",31)))},
    },
    14: {
        cost(x=getBuyableAmount(this.layer,this.id).add(1)) { 
          return Decimal.pow(100,x).mul(1e64).div(hasMilestone("g",5)?1e14:1)
        },
        display() { return "Gain 1 charge.<br>Currently: "+formatWhole(this.effect())+"<br>Cost: "+format(this.cost())+" incrementy" },
      title: "Charge",
        canAfford() { return player[this.layer].incrementy.gte(this.cost()) },
        buy() {
            player[this.layer].incrementy = player[this.layer].incrementy.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          player.h.charge=player.h.charge.add(1)
        },
      unlocked(){return hasMilestone("g",2)},
      effect(){return getBuyableAmount(this.layer,this.id)},
    },
  },
  challenges: {
    11: {
        name: "C1",
        challengeDescription(){return "The ordinal base is "+(10-player.b.challenges[22])+"."},
	  goalDescription(){return "Reach "+format(this.req())+" gwarkup points"},
	  req(){
    if (player.b.challenges[this.id]==0)return new Decimal(1e16)
      if (player.b.challenges[this.id]==1)return new Decimal(1e17)
      return new Decimal(1e80)
    },
        canComplete(){return player.g.points.gte(this.req())},
      onEnter(){
        if (player.b.challenges[this.id]==3)player.b.activeChallenge=0
        boost()
      },
      onExit(){
        boost()
      },
      completionLimit: 3,
	  rewardDescription(){return "gwarkup point gain base "+(player.b.challenges[this.id]==3?"is 20":player.b.challenges[this.id]==2?"15 -> 20":player.b.challenges[this.id]==1?"11 -> 15":"10 -> 11")}
    },
    12: {
        name: "C2",
        challengeDescription: "Factors 1-6 don't increase based on GP.",
	  goalDescription(){return "Reach "+format(this.req())+" gwarkup points"},
	  req(){
    if (player.b.challenges[this.id]==0)return new Decimal(1e25)
      if (player.b.challenges[this.id]==1)return new Decimal(1e250)
      return new Decimal("1e500")
    },
        canComplete(){return player.g.points.gte(this.req())},
      onEnter(){
        if (player.b.challenges[this.id]==3)player.b.activeChallenge=0
        boost()
      },
      onExit(){
        boost()
      },
      completionLimit: 3,
	  rewardDescription(){return "Factors 1-6 "+(player.b.challenges[this.id]==3?"^4":player.b.challenges[this.id]==2?"^3 -> ^4":player.b.challenges[this.id]==1?"^2 -> ^3":"^2")}
    },
    21: {
        name: "C3",
        challengeDescription: "Dynamic factor divides instead of multiplies. The 5 booster upgrade is always active.",
	  goalDescription(){return "Reach "+format(this.req())+" gwarkup points"},
	  req(){
    if (player.b.challenges[this.id]==0)return new Decimal(1e300)
      if (player.b.challenges[this.id]==1)return new Decimal("e1000")
      return new Decimal("e1e4")
    },
        canComplete(){return player.g.points.gte(this.req())},
      onEnter(){
        if (player.b.challenges[this.id]==3)player.b.activeChallenge=0
        boost()
      },
      onExit(){
        boost()
      },
      completionLimit: 3,
	  rewardDescription(){return "Dynamic gain and cap "+(player.b.challenges[this.id]==3?"x1000":player.b.challenges[this.id]==2?"x100 -> x1000":player.b.challenges[this.id]==1?"x10 -> x100":"x10")}
    },
    22: {
        name: "C4",
        challengeDescription: "The base is 4 and the only factors that work are 1-4.",
	  goalDescription(){return "Reach "+format(this.req())+" gwarkup points"},
	  req(){
    if (player.b.challenges[this.id]==0)return new Decimal(1e100)
      if (player.b.challenges[this.id]==1)return new Decimal("1e1000")
      return new Decimal("ee10")
    },
        canComplete(){return player.g.points.gte(this.req())},
      onEnter(){
        if (player.b.challenges[this.id]==3)player.b.activeChallenge=0
        boost()
      },
      onExit(){
        boost()
      },
      completionLimit: 3,
	  rewardDescription(){return "C1's base is "+(player.b.challenges[this.id]==3?"7 and gain 10x incrementy":player.b.challenges[this.id]==2?"8 -> 7 and gain 10x incrementy":player.b.challenges[this.id]==1?"9 -> 8":"9")}
    },
    31: {
        name: "C5",
        challengeDescription: "Factor costs ^10 and the 3 booster upgrade is disabled. The base in this challenge is the base outside of the challenge.",
	  goalDescription(){return "Reach "+format(this.req())+" gwarkup points"},
	  req(){
    if (player.b.challenges[this.id]==0)return new Decimal("e1111")
      if (player.b.challenges[this.id]==1)return new Decimal("ee4")
      if (player.g.base.gte(7))return new Decimal("1e20940")
      return new Decimal("ee100")
    },
        canComplete(){return player.g.points.gte(this.req())},
      onEnter(){
        if (player.b.challenges[this.id]==3)player.b.activeChallenge=0
        boost()
      },
      onExit(){
        boost()
      },
      completionLimit: 3,
	  rewardDescription(){return "The ordinal value boosts autoclickers"}
    },
    32: {
        name: "C6",
        challengeDescription: "You can only buy 1 autoclicker and its speed is square rooted.",
	  goalDescription(){return "Reach "+format(this.req())+" gwarkup points"},
	  req(){
    if (player.b.challenges[this.id]==0)return new Decimal(1e100)
      if (player.b.challenges[this.id]==1)return new Decimal("1e308")
      return new Decimal("1e616")
    },
        canComplete(){return player.g.points.gte(this.req())},
      onEnter(){
        if (player.b.challenges[this.id]==3)player.b.activeChallenge=0
        boost()
      },
      onExit(){
        boost()
      },
      completionLimit: 3,
	  rewardDescription(){return "Factor 7 "+(player.b.challenges[this.id]==3?"^8":player.b.challenges[this.id]==2?"^4 -> ^8":player.b.challenges[this.id]==1?"^2 -> ^4":"^2")}
    },
    41: {
        name: "C7",
        challengeDescription: "There is exponentially rising decrementy that slows down your autobuyers. You can only manually increment up to an ordinal of gwa^2+1. GP is square rooted and you are stuck in C6",
	  goalDescription(){return "Reach "+format(this.req())+" gwarkup points"},
	  req(){
    if (player.b.challenges[this.id]==0)return new Decimal(1e308)
      if (player.b.challenges[this.id]==1)return new Decimal("1e500")
      return new Decimal("e557")
    },
        canComplete(){return player.g.points.gte(this.req())},
      onEnter(){
        if (player.b.challenges[this.id]==3)player.b.activeChallenge=0
        boost()
      },
      onExit(){
        boost()
      },
      countsAs: [32],
      completionLimit: 3,
	  rewardDescription(){return "Incrementy gain "+(player.b.challenges[this.id]==3?"x8":player.b.challenges[this.id]==2?"x4 -> x8":player.b.challenges[this.id]==1?"x2 -> x4":"x2")}
    },
    42: {
        name: "C8",
        challengeDescription: "The base is 8 and divide EVERY factor by 888, including the gwadrupler.",
	  goalDescription(){return "Reach "+format(this.req())+" gwarkup points"},
	  req(){
    if (player.b.challenges[this.id]==0)return new Decimal(1e88)
      if (player.b.challenges[this.id]==1)return new Decimal(1e250)
      return new Decimal("1e1200")
    },
        canComplete(){return player.g.points.gte(this.req())},
      onEnter(){
        if (player.b.challenges[this.id]==3)player.b.activeChallenge=0
        boost()
      },
      onExit(){
        boost()
      },
      completionLimit: 3,
	  rewardDescription(){return "Multiply GP and autoclicker speed by 2^(total challenge completions) per completion"}
    },
    
},
  update(diff){
    if (hasUpgrade("g",25) || player.g.incrementyUnlock){
      player.b.incrementy=player.b.incrementy.add(getIncrementyGain().mul(diff))
      player.b.psi=player.b.psi.add(getPsiGain().mul(diff))//.min(48630661836227120000)
    }
    if (hasMilestone("c",2)){
      for (let i of [11,12,13]){
        if (layers.b.buyables[i].canAfford())layers.b.buyables[i].buy()
      }
    }
    if (hasUpgrade("c",32) && layers.b.buyables[14].canAfford()){
      layers.b.buyables[14].buy()
    }
  },
  doReset(l){
    if (l=="c"){
      let k=[]
      if (hasMilestone("c",3))k.push("upgrades")
      if (hasMilestone("c",2))k.push("challenges")
      layerDataReset(this.layer,k)
      if (hasMilestone("c",3)&&!hasMilestone("c",4))player.b.upgrades=player.b.upgrades.filter(x=>x>50&&x<100)
      player.b.upgrades=player.b.upgrades.filter(x=>x<100)
      if (hasMilestone("c",3))player.b.points=new Decimal(190)
    }
  },
  tabFormat: {
    "Boosters": {
      unlocked(){return true},
      content: [
        "main-display",
        ["prestige-button", function(){return true}],
        "blank",
        "clickables",
        "blank",
        ["row",[["upgrade",11],["upgrade",12],["upgrade",13]]],
        ["row",[["upgrade",21],["upgrade",22],["upgrade",23]]],
        ["row",[["upgrade",31],["upgrade",32],["upgrade",33]]],
        ["row",[["upgrade",41],["upgrade",42],["upgrade",43]]],
        ["row",[["upgrade",101],["upgrade",102],["upgrade",103]]]
      ]
    },
    "Challenges": {
      unlocked(){return hasUpgrade("g",24) || player.g.challengeUnlock},
      content: [
        "main-display",
        ["prestige-button", function(){return true}],
        "blank",
        ["display-text",function(){
          return "The ordinal base in challenges is 5 unless otherwise specified. Entering a challenge will perform a booster reset. You cannot gain boosters or base shift inside a challenge.<br>Each challenge can be completed up to 3 times, at which point a star will appear. Trying to enter a challenge a 4th time will kick you out of the challenge."
        }],"blank",
        "challenges"
      ]
    },
    "Incrementy": {
      unlocked(){return hasUpgrade("g",25) || player.g.incrementyUnlock},
      content: [
        "main-display",
        ["prestige-button", function(){return true}],
        "blank",
        ["display-text",function(){
          return "You have "+format(player.b.incrementy)+" incrementy. (+"+format(getIncrementyGain())+"/s)"
        }],
        ["display-text",function(){
          return "Your psi ordinal is "+numToPsi(player.b.psi.floor())+" (3). (+"+format(getPsiGain())+"/s)"
        }],
        "blank",
        "buyables",
        ["row",[["upgrade",51],["upgrade",52],["upgrade",53]]],
        ["row",[["upgrade",61],["upgrade",62],["upgrade",63]]],
        ["row",[["upgrade",71],["upgrade",72],["upgrade",73]]],
      ]
    },
  }
})