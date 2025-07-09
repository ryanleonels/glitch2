function nerf(num, start, pow, pow2,thing=new Decimal(1)){
  if(num.lte(start))return num
  
  let s = new Decimal(pow).pow(num.log(start).pow(pow2).sub(1)).min(1).pow(thing)
  player.pointNerf=s
  return num.div(start).pow(s).mul(start)
}
function resetDistance(){
  if(hasChallenge("c",31)&&!inChallenge("c",41))return
  player.di.points=new Decimal(0)
  player.di.velocity=new Decimal(0)
  player.di.acc=new Decimal(0)
  player.di.jerk=new Decimal(0)
  player.di.snap=new Decimal(0)
  player.di.crackle=new Decimal(0)
  setBuyableAmount("di",11,new Decimal(0))
  setBuyableAmount("di",12,new Decimal(0))
  setBuyableAmount("di",13,new Decimal(0))
  setBuyableAmount("di",21,new Decimal(0))
  player.di.upgrades=[]
}
function resetAntimatter(){
  player.ad.points=new Decimal(0)
player.ad.d1=new Decimal(0)
  player.ad.d2=new Decimal(0)
  player.ad.d3=new Decimal(0)
  player.ad.d4=new Decimal(0)
  player.ad.d5=new Decimal(0)
  player.ad.d6=new Decimal(0)
  player.ad.d7=new Decimal(0)
  player.ad.d8=new Decimal(0)
  player.ad.d9=new Decimal(0)
  setBuyableAmount("ad",11,new Decimal(0))
  setBuyableAmount("ad",12,new Decimal(0))
  setBuyableAmount("ad",13,new Decimal(0))
  setBuyableAmount("ad",21,new Decimal(0))
  setBuyableAmount("ad",22,new Decimal(0))
  setBuyableAmount("ad",23,new Decimal(0))
  setBuyableAmount("ad",31,new Decimal(0))
  setBuyableAmount("ad",32,new Decimal(0))
  setBuyableAmount("ad",33,new Decimal(0))
player.ad.best=new Decimal(0)
  player.ad.upgrades=[]


}
addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
      best: new Decimal(0),
    }},
    effect(){
      if(inChallenge("s",12))return new Decimal(1)
      if(hasMilestone("an",0)){
        let exp = 3000
        if(hasMilestone("an",3))exp=player.b.points.add(1).mul(1000)
        return player.p.points.pow(exp).max(1)
      }
      if(hasUpgrade("s",24)){
        let r = player.p.points.pow(0.5).plus(1)
        if(hasUpgrade("l",13))r=r.pow(100)
        if(hasUpgrade("l",23))r=r.pow(2)
        if(hasUpgrade("l",41))r=r.pow(2)
        if(hasUpgrade("l",53))r=r.pow(2)
        if(hasUpgrade("l",54))r=r.pow(2)
        if(hasUpgrade("l",55))r=r.pow(2)
        if(hasUpgrade("l",61))r=r.pow(2)
        if(hasUpgrade("l",62))r=r.pow(2)
        if(!hasUpgrade("a",21))r=nerf(r,new Decimal("1e500"),0.8,0.5)
        if(hasUpgrade("di",23))r=r.pow(2)
        if(hasUpgrade("a",33))r=r.pow(2)
        if(hasUpgrade("di",23))r=r.pow(upgradeEffect("l",45))
        if(hasUpgrade("di",33))r=r.pow(2)
        if(hasMilestone("ch",4))r=r.pow(1.5)
        if(player.b.clickables[12]==3||hasMilestone("b",7))r=r.pow(2)
        if(!hasMilestone("ch",3)){
        if(r.gt("e1000000")){
          if(!hasUpgrade("ad",34))r=r.log10().pow(1e6/6)
        else{
          if(hasMilestone("ch",1))r=Decimal.pow(10,r.log10().pow(1/3).times("10000"))
          else r=Decimal.pow(10,r.log10().pow(1/6).times("100000"))
        }
          
        }}
        else{
          if(r.gt(player.p.points.times("ee6").times(hasMilestone("ch",4)?Decimal.pow(10,tmp.di.upgrades[21].description.length):1))){
            r=Decimal.pow(10,r.log10().pow(1/3).times(player.p.points.times("ee6").times(hasMilestone("ch",4)?Decimal.pow(10,tmp.di.upgrades[21].description.length):1).log10().pow(2/3)))
          }
        }
        if(hasUpgrade("d",44)&&!hasMilestone("ch",3))r=r.sqrt()
        if(r.lt(0)||isNaN(r))r=new Decimal(1)
        return r.min("ee12")
      }
      
      
      let f= new Decimal(2).pow(player.p.points)
    if(hasUpgrade("p",12))f=f.sqrt()
             if(hasUpgrade("p",15))f=f.div(player.p.points.plus(1).pow(hasUpgrade("p",22)?2:1))
             f=f.pow(hasUpgrade("p",22)?2:1)
             if(f.gte(1e15))f=f.pow(1/3).times(1e10)
             if(hasUpgrade("s",14))f=f.sqrt()
             if(hasUpgrade("s",15))f=f.div(player.p.points.max(1).pow(player.s.upgrades.length))
             return f
    },
    effectDescription(){
      let s = "dividing point gain by "+format(this.effect())+(this.effect().gte(1e15)?" (nerfed)":"")
      if(hasUpgrade("s",24))s="multiplying point gain by "+format(this.effect())+(hasMilestone("an",0)?"":this.effect().gte("1e1e12")?" (hardcapped)":this.effect().gte("1e1e6")?" (softcapped)":this.effect().gte("1e500")&&!hasUpgrade("a",21)?" (nerfed)":"")
      return s
    },
    color: "#964b00",
    requires(){let r= new Decimal(1)
    if(hasUpgrade("p",14))r=r.div(Decimal.pow(2,player.p.points).pow(hasUpgrade("p",23)?2:1))
               if(hasUpgrade("s",21))r=r.div(Decimal.pow(player.s.points.plus(1),10))
               return r.div(hasUpgrade("p",25)?100:1)
    }, // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base(){
      if(inChallenge("s",11))return new Decimal(3.24)
      if(hasUpgrade("s",13))return new Decimal(1.8).sub(hasChallenge("s",11)?hasUpgrade("l",25)?0.15:0.1:0)
      let x=player.p.points
      let a=new Decimal(0)
      if(x.gt(68.5))a=x.sub(68).div(50).plus(1)
      if(hasUpgrade("p",25))return x.plus(10).log10().times(a)
      
      return x.max(1)},
    exponent(){
      if(inChallenge("s",12))return new Decimal(1)
      if(hasChallenge("s",12))return new Decimal(hasUpgrade("l",25)?1.15:1.175)
      return new Decimal(1.2)}, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
      
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
      let mult=new Decimal(1)
      if(player.l.unlocked)mult=mult.mul(layers.l.effect())
      if(hasUpgrade("l",53))mult=mult.mul(player.a.points.max(1))
      if(hasUpgrade("l",55))mult=mult.mul(buyableEffect("l",13))
      if(hasUpgrade("a",35))mult=mult.mul(player.di.points.plus(1))
        return mult
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){if (hasMilestone("an",4))return false
      return true},
    upgrades: {
      11: {
        title: "Nerf",
        description: "Square root point gain",
        cost: new Decimal(2),
        unlocked(){return player.p.best.gte(2)||player.ad.unlocked},
      },
      12: {
        title: "Nerf 2",
        description: "Square root prestige point effect",
        cost: new Decimal(3),
        unlocked(){return hasUpgrade("p",11)||player.ad.unlocked},
      },
      13: {
        title: "Nerf 3",
        description: "Point gain is divided by (points+1)/100",
        cost: new Decimal(3),
        unlocked(){return hasUpgrade("p",12)||player.ad.unlocked},
      },
      14: {
        title: "Upgrade",
        description: "Prestige points divide prestige point requirement",
        cost(){
          if(hasUpgrade("s",11))return new Decimal(3)
          return new Decimal(4)},
        unlocked(){return hasUpgrade("p",13)||player.ad.unlocked},
      },
      15: {
        title: "Downgrade",
        description: "The previous upgrade also affects prestige point effect",
        cost(){
          if(hasUpgrade("s",11))return new Decimal(4)
          return new Decimal(5)},
        unlocked(){return hasUpgrade("p",14)||player.ad.unlocked},
      },
      21: {
        title: "Nerf 4",
        description: "Nerf 3 is 2x stronger, but it's now /500",
        cost: new Decimal(5),
        unlocked(){return hasUpgrade("p",15)||player.ad.unlocked},
      },
      22: {
        title: "Nerf 5",
        description: "Nerf 3 does nothing but downgrade and the prestige point effect are squared",
        cost: new Decimal(5),
        unlocked(){return hasUpgrade("p",21)||player.ad.unlocked},
      },
      23: {
        title: "Nerf 6",
        description: "Nerf and Upgrade are 2x as strong",
        cost: new Decimal(5),
        unlocked(){return hasUpgrade("p",22)||player.ad.unlocked},
      },
      24: {
        title: "Upgrade 2",
        description: "Each upgrade doubles point gain",
        cost(){
          if(hasUpgrade("s",11))return new Decimal(5)
          return new Decimal(6)},
        unlocked(){return hasUpgrade("p",23)||player.ad.unlocked},
      },
      25: {
        title: "Downgrade 2",
        description: "Prestige point base is now log(prestige points+10) and prestige point cost /100",
        cost(){
          if(hasUpgrade("s",11))return new Decimal(7)
          return new Decimal(8)},
        unlocked(){return hasUpgrade("p",24)||player.ad.unlocked},
      },
    },
  autoPrestige(){return hasUpgrade("s",12)},
  resetsNothing(){return hasUpgrade("s",12)},
  canBuyMax(){return hasUpgrade("s",13)},
})
addLayer("s", {
    name: "super prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
      best: new Decimal(0),
    }},
  branches:["p"],
    effect(){
      if(hasMilestone("an",3))return 1
      if(hasMilestone("an",0)){
        let exp = 1/3
        return player.s.points.pow(exp).max(1)
      }
      let f=player.s.best.plus(1).pow(player.s.best.gt(100)?(hasUpgrade("l",33)?150:hasUpgrade("l",25)?140:hasChallenge("s",21)?130:hasUpgrade("l",11)?120:100):player.s.best.plus(1))
      if(hasUpgrade("s",14))f=f.sqrt()
      if(inChallenge("s",11))f=f.pow(0.1)
      if(hasUpgrade("l",41))f=f.pow(1.1)
      if(hasUpgrade("di",23))f=f.pow(upgradeEffect("l",45))
      let ner=new Decimal(1)
      if(hasUpgrade("l",15))ner=ner.div(layers.l.effect())
      if(f.gt("e1000000")){
        if(!hasUpgrade("ad",35))f=f.log10().pow(1e6/6)
      else if(!hasMilestone("ch",2)){
      f=Decimal.pow(10,f.log10().pow(1/6).times(1e5))}
      else{f=Decimal.pow(10,f.log10().pow(1/3).times(1e4))}
      }
      else f=nerf(f,Number.MAX_VALUE,0.9,ner)
      if(hasMilestone("ch",4))f=f.pow(2)
      return f
    },
    effectDescription(){
      let s = "adding to base point gain by "+format(this.effect())
      if(hasMilestone("an",0))return s
      if(this.effect().gt("e1e6")){s=s+" (softcapped)"}
      else if(this.effect().gt(Number.MAX_VALUE))s=s+" (nerfed)"
      return s
    },
    color: "#654bfc",
    requires(){
      
      let r= new Decimal(69)
if(hasUpgrade("s",22))r=new Decimal(10)
               return r
    }, // Can be a function that takes requirement increases into account
    resource: "super prestige points", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent(){return new Decimal(2)}, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
      if(inChallenge("s",12))return new Decimal(0)
        mult = new Decimal(1)
      if(player.ad.unlocked)mult=mult.mul(tmp.ad.effect)
      if(hasUpgrade("l",13))mult=mult.times(2)
      if(hasUpgrade("l",23))mult=mult.times(2)
      if(hasUpgrade("l",25))mult=mult.times(player.points.plus(1).log10().plus(1).log10().plus(2))
      if(hasUpgrade("l",33))mult=mult.times(4)
      if(hasUpgrade("l",42))mult=mult.times(player.l.points.plus(1))
      if(hasUpgrade("l",44))mult=mult.times(buyableEffect("l",12))
      
      if(player.a.unlocked && !hasMilestone("an",1)){
        if(!hasUpgrade("l",54))mult=mult.div(Decimal.pow(100,layers.a.effect())).times(100)
      else mult=mult.times(Decimal.pow(1e10,layers.a.effect()).times(1e10).pow(hasMilestone("ch",2)?player.a.points:1).pow(hasMilestone("ch",4)?420.69:1))
      }
      if(hasUpgrade("l",53))mult=mult.times("1e100")
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1).plus(hasUpgrade("l",35)?1:0).times(hasUpgrade("di",23)?layers.l.clickables[12].effect():1).mul((hasMilestone("b",8)&&player.b.boost1)||hasMilestone("al",2)?1.05:1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for super prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){
      if (hasMilestone("an",4))return false
      return player[this.layer].unlocked||hasUpgrade("p",25)},
    upgrades: {
      11: {
        title: "Super 1",
        description: "Upgrades and Downgrades are 1 prestige point cheaper",
        cost: new Decimal(3),
        unlocked(){return player.s.unlocked},
      },
      12: {
        title: "Super 2",
        description: "Gain 100% of prestige points on reset every second",
        cost: new Decimal(5),
        unlocked(){return hasUpgrade("s",11)||player.ad.unlocked},
      },
      13: {
        title: "Super 3",
        description: "Prestige cost base is always 1.8 and you can buy max prestige points",
        cost: new Decimal(7),
        unlocked(){return hasUpgrade("s",12)||player.ad.unlocked},
      },
      14: {
        title: "Super 4",
        description: "Square root the prestige point effect and super prestige effect",
        cost: new Decimal(15),
        unlocked(){return hasUpgrade("s",13)||player.ad.unlocked},
      },
      15: {
        title: "Super 5",
        description: "Each upgrade applies Downgrade again",
        cost: new Decimal(20),
        unlocked(){return hasUpgrade("s",14)||player.ad.unlocked},
      },
      21: {
        title: "Super 6",
        description: "Super prestige points lower prestige point cost",
        cost: new Decimal(40),
        unlocked(){return hasUpgrade("s",15)||player.ad.unlocked},
      },
      22: {
        title: "Super 7",
        description: "Super prestige point requirement is now 10",
        cost: new Decimal(150),
        unlocked(){return hasUpgrade("s",21)||player.ad.unlocked},
      },
      23: {
        title: "Super 8",
        description: "Double point gain",
        cost: new Decimal(10000),
        unlocked(){return hasUpgrade("s",22)||player.ad.unlocked},
      },
      24: {
        title: "Super 9",
        description: "Remove the prestige point effect and replace it with a better one",
        cost: new Decimal(20000),
        unlocked(){return hasUpgrade("s",23)||player.ad.unlocked},
      },
      25: {
        title: "Super 10",
        description: "Nerf does nothing and unlock a challenge",
        cost: new Decimal(30000),
        unlocked(){return hasUpgrade("s",24)||player.ad.unlocked},
      },
    },
  milestones: {
    0: {
        requirementDescription: "5 super prestige points",
        effectDescription: "Keep 1 upgrade per super prestige upgrade",
        done() { return player.s.best.gte(5) }
    },
    1: {
        requirementDescription: "1e8 super prestige points",
        effectDescription: "Automatically gain super prestige points",
        done() { return player.s.best.gte(1e8) }
    },
},
  passiveGeneration(){return (hasMilestone(this.layer,1)?1:0)},
  challenges: {
    11: {
        name: "Based",
        challengeDescription: "Prestige point cost base ^2 and super prestige points effect ^0.1",
        goal: new Decimal(1e35),
        rewardDescription(){return "Unlock a new layer and prestige point cost base -0.1"+(hasUpgrade("l",25)?"5":"")},
      unlocked(){return hasUpgrade("s",25)||player.ad.unlocked},
    },
12: {
        name: "Linear",
        challengeDescription: "Prestige point effect is 1, but they have linear scaling",
        goal: new Decimal("1e1000"),
        rewardDescription(){return "Prestige point cost exponent -0.0"+(hasUpgrade("l",25)?"":"2")+"5"},
      unlocked(){return hasUpgrade("l",14)},
    },
    21: {
        name: "Powered",
        challengeDescription: "The nerf to points is powered up by ^3",
        goal: new Decimal("1e705"),
        rewardDescription(){return  "Super prestige point effect exponent is now 1"+(hasUpgrade("l",25)?"4":"3")+"0"},
      unlocked(){return hasUpgrade("l",24)},
    },
},
  something(){
    for(let l in layers.s.upgrades){
      if(layers.s.upgrades[l].unlocked){
      if(hasUpgrade("s",l)&&!hasUpgrade("p",l)){player.p.upgrades.push(l)}
      }
    }
  },
  doReset(l){
  if(layers[l].row>this.row){
    let keep = []
    if(hasMilestone("b",1))keep.push("milestones")
    if(hasMilestone("b",2))keep.push("upgrades")
    if(hasMilestone("b",0))keep.push("challenges")
    layerDataReset(this.layer,keep)
  }
}
})
addLayer("l", {
    name: "layer", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
      best: new Decimal(0),
 s1: 0,
      s2: 0,
    }},
  effect(){
    if(hasUpgrade("an",11)){
      return new Decimal(20)
    }
    let f=player.l.points.plus(1).log10().plus(1).log10().plus(1)
    if(hasUpgrade("l",51))f= player.l.points.plus(1).log10().root(5.5).plus(1)
    if(challengeCompletions("b",11)>=2)f=player.l.points.plus(1).log10().root(5.4).add(1)
    if(f.gte(16))f=f.pow(0.25).plus(14)
    if(f.gte(17))f=new Decimal(17)
    return f},
  effectDescription(){let s= "applying the "+format(this.effect())+"th root to your prestige point cost"
  if(hasUpgrade("l",15)&&layers.s.effect().lt("ee6"))s+=" and making the super prestige effect nerf "+format(this.effect())+"x weaker"
  return s
  },
  branches:["s","p"],

    color: "#15dbfc",
    requires(){
      
      let r= new Decimal(Number.MAX_VALUE)
               return r
    }, // Can be a function that takes requirement increases into account
    resource: "layer points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent(){return new Decimal(0.01)}, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
      if(inChallenge("s",12))return new Decimal(0)
        mult = new Decimal(1)
      if(hasUpgrade("l",21))mult=mult.mul(Decimal.pow(2,player.l.upgrades.length))
      if(hasUpgrade("l",22))mult=mult.div(1.25)
      if(hasUpgrade("l",32))mult=mult.times(buyableEffect("l",11))
      if(getClickableState("l",11)==1)mult=mult.times(tmp.l.clickables[11].effect)
      if(hasUpgrade("l",61))mult=mult.times(player.p.points.max(1))
      if(hasUpgrade("di",14))mult=mult.times(tmp.di.upgrades[14].effect)
      if(player.ad.unlocked)mult=mult.mul(tmp.ad.effect)
      if(hasUpgrade("a",32))mult=mult.mul(player.ad.points.max(1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1).mul((hasMilestone("b",8)&&!player.b.boost1)||hasMilestone("al",2)?1.05:1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "l", description: "L: Reset for layer points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){
      if (hasMilestone("an",4))return false
      return player[this.layer].unlocked||hasChallenge("s",11)},
  upgrades: {
      11: {
        title: "Points",
        description: "Super prestige effect exponent is now 120",
        cost: new Decimal(200),
        unlocked(){return player.l.unlocked},
      },
    12: {
        title: "Prestige Points",
        description: "Points are multiplied by layer points, prestige points, and super prestige points",
        cost: new Decimal(1500),
        unlocked(){return hasUpgrade("l",11)||player.ad.unlocked},
      },
    13: {
        title: "Boosters",
        description: "Prestige point effect ^100, gain 2x super prestige points",
        cost: new Decimal(2500),
        unlocked(){return hasUpgrade("l",12)||player.ad.unlocked},
      },
    14: {
        title: "Generators",
        description: "Unlock another super prestige challenge",
        cost: new Decimal(12500),
        unlocked(){return hasUpgrade("l",13)||player.ad.unlocked},
      },
    15: {
        title: "Time capsules",
        description: "Unlock a new layer effect",
        cost: new Decimal(30000),
        unlocked(){return hasChallenge("s",12)||player.ad.unlocked},
      },
    21: {
        title: "Enhancer points",
        description: "Each upgrade doubles layer gain",
        cost: new Decimal(50000),
        unlocked(){return hasUpgrade("l",15)||player.ad.unlocked},
      },
    22: {
        title: "Space energy",
        description: "Divide layer gain by 1.25",
        cost: new Decimal(5e6),
        unlocked(){return hasUpgrade("l",21)||player.ad.unlocked},
      },
    23: {
        title: "Super boosters",
        description: "Boosters are 2x stronger",
        cost: new Decimal(1e7),
        unlocked(){return hasUpgrade("l",22)||player.ad.unlocked},
      },
    24: {
        title: "Super generators",
        description: "Generators are 2x stronger",
        cost: new Decimal(1e9),
        unlocked(){return hasUpgrade("l",23)||player.ad.unlocked},
      },
    25: {
        title: "Hinderance spirits",
        description: "Buff all challenge rewards",
        cost: new Decimal(1e10),
        unlocked(){return hasUpgrade("l",24)||player.ad.unlocked},
      },
    31: {
        title: "Quirks",
        description: "Gain more super prestige points based on points",
        cost: new Decimal(1e11),
        unlocked(){return hasUpgrade("l",25)||player.ad.unlocked},
      },
    32: {
        title: "Subspace",
        description: "Unlock a buyable",
        cost: new Decimal(5e11),
        unlocked(){return hasUpgrade("l",31)||player.ad.unlocked},
      },
    33: {
        title: "Solarity",
        description: "Super boosters are stronger",
        cost: new Decimal(3e13),
        unlocked(){return hasUpgrade("l",32)||player.ad.unlocked},
      },
    34: {
        title: "Magic",
        description: "Unlock a spell",
        cost: new Decimal(4e14),
        unlocked(){return hasUpgrade("l",33)||player.ad.unlocked},
      },
    35: {
        title: "Balance energy",
        description: "Spells last +1 second longer for every upgrade in this row and below, and add 1 to super prestige point gain exponent",
        cost: new Decimal(1e16),
        unlocked(){return hasUpgrade("l",34)||player.ad.unlocked},
      },
    41: {
        title: "Phantom Souls",
        description: "P and S layer effects are stronger",
        cost: new Decimal(1e20),
        unlocked(){return hasUpgrade("l",35)||player.ad.unlocked},
      },
    42: {
        title: "Honour",
        description: "Your layer points multiply super prestige point gain",
        cost: new Decimal(2e21),
        unlocked(){return hasUpgrade("l",41)||player.ad.unlocked},
      },
    43: {
        title: "Nebula",
        description: "Why is my point gain being weird? maybe I'll check the point gain nerf... (it's now 20% weaker)",
        cost: new Decimal(2e21),
        unlocked(){return hasUpgrade("l",42)||player.ad.unlocked},
      },
    44: {
        title: "Hyperspace Energy",
        description: "Unlock another buyable and the point gain nerf starts later based on your super prestige points",
        cost: new Decimal(1e37),
        unlocked(){return hasUpgrade("l",43)||player.ad.unlocked},
      },
    45: {
        title: "Imperium",
        description: "Point gain nerf is affected by the layer effect at a reduced rate, and unlock the Aarex layer",
        cost: new Decimal(1e58),
        unlocked(){return hasUpgrade("l",44)||player.ad.unlocked},
      effect(){return tmp.l.effect.pow(new Decimal(0.1).times(player.a.unlocked?layers.a.effect():1))},
      },
    51: {
        title: "Mastery",
        description: 'You "master" the layer and gain 100% of points on reset per second, and the layer effect is better',
        cost: new Decimal("1e1080"),
        unlocked(){return hasChallenge("a",11)||player.ad.unlocked},
      },
    52: {
        title: "Gears",
        description: "Unlock Timewalls. (subtab in Aarex Timewalls layer)",
        cost: new Decimal("1e1680"),
        unlocked(){return hasUpgrade("l",51)||player.ad.unlocked},
      },
    53: {
        title: "Machines",
        description: "Machines automate Aarex timewall gain, aarex timewalls multiply prestige points, gain e100x super prestige points, and square the prestige effect",
        cost: new Decimal("1e8000"),
        unlocked(){return hasUpgrade("a",24)||player.ad.unlocked},
      },
    54: {
        title: "Energy",
        description: "You put energy into your AAREX TIMEWALLS and make them boost super prestige points, also square the prestige effect",
        cost: new Decimal("1e8070"),
        unlocked(){return hasUpgrade("l",53)||player.ad.unlocked},
      },
    55: {
        title: "Neurons",
        description: "Your ability to think has led to the creation of a new buyable. Also, square the prestige effect.",
        cost: new Decimal("1e8135"),
        unlocked(){return hasUpgrade("l",54)||player.ad.unlocked},
      },
    61: {
        title: "Robots",
        description: "Prestige points multiply layer points, the 2nd spell costs nothing, bulk 10x more, and square the prestige effect",
        cost: new Decimal("1e9388"),
        unlocked(){return hasUpgrade("l",55)||player.ad.unlocked},
      },
    62: {
        title: "Ideas",
        description: "Use your ideas to make a new layer, spells last forever and are stronger, aarex timewalls reset nothing, and square the prestige effect.",
        cost: new Decimal("1e18249"),
        unlocked(){return hasUpgrade("l",61)||player.ad.unlocked},
      },
  },
  passiveGeneration(){return hasUpgrade("l",51)},
  buyables: {
    11: {
        cost() {let c= new Decimal(1e11).mul(Decimal.pow(2,getBuyableAmount(this.layer, this.id).pow(1.25)))
        if(c.gte("e1300000")&&!hasMilestone("b",2)){c=new Decimal(1e11).mul(Decimal.pow(1.01,getBuyableAmount(this.layer, this.id).pow(2)))}
                                                      return c
        },
        display() { return "Multiply layer point gain. Currently: x"+format(this.effect())+(this.effect().gte("1e512")&&!hasUpgrade("di",23)?(" (nerfed)"):"")+"\nCost:"+format(this.cost()) },
      effect(){let e = new Decimal(1.5).pow(getBuyableAmount(this.layer,this.id).pow(1.1))
      if(e.gt("1e512")&&!hasUpgrade("di",23))e=Decimal.pow(10,e.log10().pow(2/3)).times("1e448")
               if(player.b.clickables[11]==3||challengeCompletions("b",11)>=1)e=e.pow(4)
               return e
      },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        unlocked(){return hasUpgrade("l",32)},
    },
    12: {
        cost() { return new Decimal(1e51).mul(Decimal.pow(10,getBuyableAmount(this.layer, this.id).pow(1.5))) },
        display() { return "Multiply super prestige point gain. Currently: x"+format(this.effect())+"\nCost:"+format(this.cost()) },
      effect(){return new Decimal(1e6).plus(hasUpgrade("a",11)?(new Decimal(player.a.upgrades.length).pow(2).times(10000)):0).pow(getBuyableAmount(this.layer,this.id)).pow(player.b.clickables[11]==1||challengeCompletions("b",11)>=1?100:1)},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        unlocked(){return hasUpgrade("l",44)},
    },
13: {
        cost() { return new Decimal("1e8100").mul(Decimal.pow(10,getBuyableAmount(this.layer, this.id).pow(1.6))) },
        display() { return "Gain 2x prestige points Currently: x"+format(this.effect())+"\nCost:"+format(this.cost()) },
      effect(){return new Decimal(2).pow(getBuyableAmount(this.layer,this.id)).pow(player.b.clickables[11]==2||challengeCompletions("b",11)>=1?20:1)},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        unlocked(){return hasUpgrade("l",55)},
    },
},
  update(diff){
    if(hasMilestone("b",2)){
        if(tmp.l.buyables[11].canAfford)setBuyableAmount("l",11,player.l.points.div(1e11).log(2).pow(0.8).floor().add(1))
      if(tmp.l.buyables[12].canAfford)setBuyableAmount("l",12,player.l.points.div(1e51).log10().root(1.5).floor().add(1))
      if(tmp.l.buyables[13].canAfford)setBuyableAmount("l",13,player.l.points.div("1e8100").log10().root(1.6).floor().add(1))
    }
    if(!hasUpgrade("l",62)){
    if(player.l.s1>0)player.l.s1-=diff
    player.l.s1=Math.max(0,player.l.s1)
    if(player.l.s1==0)setClickableState("l",11,0)
    if(player.l.s2>0)player.l.s2-=diff
    player.l.s2=Math.max(0,player.l.s2)
    if(player.l.s2==0)setClickableState("l",12,0)}
else{
  player.l.s1=Infinity
  player.l.s2=Infinity
  setClickableState("l",11,1)
  setClickableState("l",12,1)
}
    
  },
  clickables: {
    11: {
        canClick(){return player.l.s1==0},
      onClick(){setClickableState("l",11,1)
               let a=0
               if(hasUpgrade("l",35))a=Math.max(a,player.l.upgrades.length-10)
                if(hasUpgrade("a",13))a=a*3
                if(hasUpgrade("l",62))a=a*5
               player.l.s1=(1+a)},
        display() {return "You gain "+format(this.effect())+"x layer points while this is active\nTime left:\n"+(player.l.s1>1e308?"Infinite":format(player.l.s1)+"s")},
        effect(){return new Decimal(10).pow(hasUpgrade("a",21)?player.a.points.max(1):1).pow(hasUpgrade("a",24)?3:1).pow(hasUpgrade("l",62)?4:1)},
      unlocked(){return hasUpgrade(this.layer,34)}
    },
    12: {
        canClick(){return player.l.s2==0},
      onClick(){setClickableState("l",12,1)
               let a=0
               if(hasUpgrade("l",35))a=Math.max(a,player.l.upgrades.length-10)
                if(hasUpgrade("a",13))a=a*3
                if(hasUpgrade("l",62))a=a*5
               player.l.s2=(1+a)
               if(!hasUpgrade("l",61))player.l.points=player.l.points.div(100)},
        display() {
          if(hasUpgrade("di",23)){
            return "Layer effect and AAREX TIMEWALLS exponents super prestige point gain\nCurrently: ^"+format(this.effect())+"\nTime left:\n"+(player.l.s2>1e308?"Infinite":format(player.l.s2)+"s")
          }
          return "Layer effect and AAREX TIMEWALLS roots the point gain nerf, but activating this costs 99% of your layer points\nCurrently: "+format(this.effect())+"√\nTime left:\n"+(player.l.s2>1e308?"Infinite":format(player.l.s2)+"s")},
        effect(){return new Decimal(1).plus(layers.l.effect().times(layers.a.effect()).div(hasUpgrade("l",62)?50:100)).min(100)},
      unlocked(){return (hasUpgrade("a",13))}
    },
},
  doReset(l){
if(layers[l].row>this.row){
  let keep =[]
  if(hasMilestone("b",3))keep.push("upgrades")
layerDataReset(this.layer,keep)
}
},
})
addLayer("a", {
    name: "aarex", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AT", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
      best: new Decimal(0),
timewall: new Decimal(0),
    }},
  effect(){if(hasMilestone("an",3))return 1
    return new Decimal(0.5).times(player.a.points.plus(1).pow(0.5)).plus(0.5)},
  effectDescription(){return "Making <b>Imperium</b> "+format(this.effect())+"x stronger"+(hasMilestone("an",1)?"":(
    hasUpgrade("l",54)?" and multiplying super prestige point gain by "+format(Decimal.pow(1e10,this.effect().plus(1)).pow(hasMilestone("ch",2)?player.a.points:1).pow(hasMilestone("ch",4)?420.69:1)):
    " but dividing super prestige point gain by "+format(Decimal.pow(100,this.effect().sub(1)))))
  },
  branches:["l","p"],

    color: "#eeaa22",
    requires(){
      
      let r= new Decimal(1e125)
               return r
    }, // Can be a function that takes requirement increases into account
  resetsNothing(){return hasUpgrade("l",62)},
    resource: "Aarex Timewalls", // Name of prestige currency
    baseResource: "layer points", // Name of resource prestige is based on
    baseAmount() {return player.l.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  base: new Decimal(1e10),
    exponent(){

      return new Decimal(2.3).sub(hasUpgrade("an",14)?Decimal.sub(0.1,Decimal.div(0.1,player.an.points.div(2).add(1))):0)}, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
      if(inChallenge("s",12))return new Decimal(1)
        mult = new Decimal(1)

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset for Aarex timewalls", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){if (hasMilestone("an",4))return false
      return player[this.layer].unlocked||hasChallenge("s",11)},
  autoPrestige(){return hasUpgrade("l",53)},canBuyMax(){return hasMilestone("b",3)},
challenges: {
    11: {
        name: "Timewalled",
        challengeDescription: "Point gain is divided by e15151",
        goal: new Decimal(1),
        rewardDescription(){return "Point gain is multiplied by e15151 after nerf"},
      unlocked(){return player.a.best.gte(3)},
    },

},
  upgrades: {
      11: {
        title: "T",
        description: "Per upgrade² add 10000 to 2nd layer buyable base and double timewall gain",
        cost: new Decimal(30),
        unlocked(){return hasUpgrade("l",52)},
        canAfford(){return player.a.timewall.gte(this.cost)},
        pay(){player.a.timewall=player.a.timewall.sub(this.cost)},
        currencyDisplayName: "timewalls",
      },
    12: {
        title: "I",
        description: "Timewall gain is boosted by your timewalls",
        cost: new Decimal(100),
        unlocked(){return hasUpgrade("a",11)},
        canAfford(){return player.a.timewall.gte(this.cost)},
        pay(){player.a.timewall=player.a.timewall.sub(this.cost)},
        currencyDisplayName: "timewalls",
      },
    13: {
        title: "M",
        description: "Spells last 3x longer, and unlock a second spell which costs 99% of your layer points",
        cost: new Decimal(10000),
        unlocked(){return hasUpgrade("a",12)},
        canAfford(){return player.a.timewall.gte(this.cost)},
        pay(){player.a.timewall=player.a.timewall.sub(this.cost)},
        currencyDisplayName: "timewalls",
      },
    14: {
        title: "E",
        description: "Automatically buy layer buyables and bulk 10x",
        cost: new Decimal(4e4),
        unlocked(){return hasUpgrade("a",13)},
        canAfford(){return player.a.timewall.gte(this.cost)},
        pay(){player.a.timewall=player.a.timewall.sub(this.cost)},
        currencyDisplayName: "timewalls",
      },
    21: {
        title: "W",
        description: "Raise the first spell's effect to your AAREX TIMEWALLS and remove the prestige effect nerf",
        cost: new Decimal(1e5),
        unlocked(){return hasUpgrade("a",14)},
        canAfford(){return player.a.timewall.gte(this.cost)},
        pay(){player.a.timewall=player.a.timewall.sub(this.cost)},
        currencyDisplayName: "timewalls",
      },
    22: {
        title: "A",
        description: "The point gain nerf start is raised to the 1.5",
        cost: new Decimal(1.5e5),
        unlocked(){return hasUpgrade("a",21)},
        canAfford(){return player.a.timewall.gte(this.cost)},
        pay(){player.a.timewall=player.a.timewall.sub(this.cost)},
        currencyDisplayName: "timewalls",
      },
    23: {
        title: "L",
        description: "Timewalls are even worse. Divide timewall gain by 2, and layer gain by 10.",
        cost: new Decimal(5e5),
        unlocked(){return hasUpgrade("a",22)},
        canAfford(){return player.a.timewall.gte(this.cost)},
        pay(){player.a.timewall=player.a.timewall.sub(this.cost)},
        currencyDisplayName: "timewalls",
      },
    24: {
        title: "L",
        description: "Unlock another layer upgrade, 1st spell is 3x stronger",
        cost: new Decimal(2e6),
        unlocked(){return hasUpgrade("a",23)},
        canAfford(){return player.a.timewall.gte(this.cost)},
        pay(){player.a.timewall=player.a.timewall.sub(this.cost)},
        currencyDisplayName: "timewalls",
      },
    31: {
        title: "G",
        description: "The 3rd timewall gain softcap is weaker",
        cost: new Decimal("1e350"),
        unlocked(){return hasUpgrade("ad",31)},
        canAfford(){return player.a.timewall.gte(this.cost)},
        pay(){player.a.timewall=player.a.timewall.sub(this.cost)},
        currencyDisplayName: "timewalls",
      },
    32: {
        title: "A",
        description: "Antimatter multiplies layer point gain",
        cost: new Decimal("1e428"),
        unlocked(){return hasUpgrade("ad",31)},
        canAfford(){return player.a.timewall.gte(this.cost)},
        pay(){player.a.timewall=player.a.timewall.sub(this.cost)},
        currencyDisplayName: "timewalls",
      },
    33: {
        title: "M",
        description: "Square the prestige point effect",
        cost: new Decimal("1e430"),
        unlocked(){return hasUpgrade("ad",31)},
        canAfford(){return player.a.timewall.gte(this.cost)},
        pay(){player.a.timewall=player.a.timewall.sub(this.cost)},
        currencyDisplayName: "timewalls",
      },
    34: {
        title: "I",
        description: "<b>Pathogens</b>'s 14th effect is cubed",
        cost: new Decimal("1e432"),
        unlocked(){return hasUpgrade("ad",31)},
        canAfford(){return player.a.timewall.gte(this.cost)},
        pay(){player.a.timewall=player.a.timewall.sub(this.cost)},
        currencyDisplayName: "timewalls",
      },
    35: {
        title: "N",
        description: "Distance multiplies prestige and prestige multiplies points",
        cost: new Decimal("1e450"),
        unlocked(){return hasUpgrade("ad",31)},
        canAfford(){return player.a.timewall.gte(this.cost)},
        pay(){player.a.timewall=player.a.timewall.sub(this.cost)},
        currencyDisplayName: "timewalls",
      },
    36: {
        title: "G",
        description: "Each <b>1st dimension</b> multiplies point gain by 1e100",
        cost: new Decimal("1e454"),
        unlocked(){return hasUpgrade("ad",31)},
        canAfford(){return player.a.timewall.gte(this.cost)},
        pay(){player.a.timewall=player.a.timewall.sub(this.cost)},
        currencyDisplayName: "timewalls",
      },
  },
  update(diff){
    if(hasUpgrade("l",52)){
      let gain = new Decimal(1)
      if(hasUpgrade("a",11))gain=gain.times(Decimal.pow(2,player.a.upgrades.length))
      if(hasUpgrade("a",12))gain=gain.times(player.a.timewall.plus(1).log10().plus(1).pow(2))
      if(hasUpgrade("a",23))gain=gain.div(2)
      if(player.ad.unlocked)gain=gain.mul(tmp.ad.effect)
      if(hasChallenge("c",12))gain=gain.mul(layers.di.getTimeSpeed())
      if(!hasChallenge("c",12))if(gain.gt("1e250"))gain=gain.pow(0.2).times(1e200)
      if(gain.gt(1e275))gain=gain.pow(1/11).times(1e250)
      if(gain.gt("1e300")){
        if(hasUpgrade("a",31))gain=gain.pow(0.25).times(1e225)
        else gain=gain.pow(0.1).times(1e270)}
      
      player.a.timewall=player.a.timewall.plus(gain.times(diff))
    }
    if(hasUpgrade("a",14)){
      if(!hasMilestone("b",2)){
      let max=10
      if(hasUpgrade("l",61))max=100
      for(let x=0;x<max;x++){
      if(layers.l.buyables[11].canAfford())layers.l.buyables[11].buy()
      if(layers.l.buyables[12].canAfford())layers.l.buyables[12].buy()
        if(layers.l.buyables[13].canAfford())layers.l.buyables[13].buy()
      }
      }
    }
    
  },
  tabFormat: {
    "Challenges":{
      content:[
    "main-display",
      "blank",
    ["prestige-button",function(){return ""}],
    "blank",
    "resource-display",
    "blank",
    "blank",
    "challenges",
      ]},
  
  "Timewalls":{
    unlocked(){return hasUpgrade("l",52)},
    content:[
      "main-display",
      "blank",
    ["prestige-button",function(){return ""}],
    "blank",
      ["display-text",function(){
        if(!hasUpgrade("l",52))return ""
        let s = "If this isn't unlocked and you are stuck, go to the challenges tab"
        return s
      }],
    "resource-display",
    "blank",
      ["display-text",function(){
        let s = "You have "+format(player.a.timewall)+" timewalls."
        return s
      }],
      "blank",
      "blank",
      "upgrades",
    ]
  },
  },
  doReset(l){
if(layers[l].row>this.row){
  let keep =[]
  if(hasMilestone("b",0))keep.push("challenges")
  if(hasMilestone("b",3))keep.push("upgrades")
layerDataReset(this.layer,keep)
}
},
})
addLayer("di", {
    name: "distance", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "DI", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
best: new Decimal(0),
velocity: new Decimal(1),
      acc: new Decimal(0),
      jerk: new Decimal(0),
      snap: new Decimal(0),
      crackle: new Decimal(0),
    }},

  branches:["l"],

    color: "#8855ff",
    requires(){
      
      let r= new Decimal("e20202")
               return r
    }, // Can be a function that takes requirement increases into account
  getResetGain(){return new Decimal(0)},

  getNextAt(){return this.requires()},
  canReset(){return player.l.points.gte(this.requires())},
  prestigeButtonText(){return  "Unlock Distance Incremental"},
  resetsNothing(){return true},
    resource: "meters", // Name of prestige currency
    baseResource: "layer points", // Name of resource prestige is based on
    baseAmount() {return player.l.points}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
      if(inChallenge("s",12))return new Decimal(0)
        mult = new Decimal(1)

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "d", description: "D: Reset for distance", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){if (hasMilestone("an",4))return false
      if (hasMilestone("an",4))return false
      return player[this.layer].unlocked||player.l.points.gt("e20000")},

buyables: {
    11: {title:"Rank",
        cost() { let c= new Decimal(1).mul(Decimal.pow(2,getBuyableAmount(this.layer, this.id))) 
        if(c.gte("1e4000"))c=c.pow(2).div("1e4000")
                if(getBuyableAmount(this.layer, this.id).gt(1e6)){
                  c=c.pow(10).div(Decimal.pow(2,1e6).pow(2).div("e4000").pow(9))
                }
                return c
        },
        display() { return "Rank up and increase your velocity by 1m/s.\nCurrently: "+format(player.di.velocity.times(tmp.di.upgrades[11].effect))+"m/s\n\nCost: "+format(this.cost())+" meters\n\nYou have "+format(getBuyableAmount(this.layer,this.id))+" ranks"+(this.cost().gt("1e4000")?" (scaled)":"")},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            if(!hasUpgrade(this.layer,13))player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          player.di.velocity=player.di.velocity.plus(new Decimal(1).times(tmp.di.upgrades[11].eff2))
        },
        unlocked(){return player.di.unlocked},
    },
12: {title:"Tier",
        cost() { return new Decimal(8).plus(Decimal.pow(getBuyableAmount(this.layer,this.id),2)) },
        display() { return "Tier up and increase your acceleration by 1m/s, but reset previous derivatives and buyables\nCurrently: "+format(player.di.acc.times(tmp.di.upgrades[13].effect))+"m/s^2\n\nCost: "+format(this.cost())+" ranks\n\nYou have "+format(getBuyableAmount(this.layer,this.id))+" tiers"},
        canAfford() { return getBuyableAmount(this.layer,11).gte(this.cost().floor()) },
        buy() {
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          player.di.acc=player.di.acc.plus(1)
          if(!hasUpgrade(this.layer,21))layers.di.resetDerivatives(2)
        },
        unlocked(){return player.di.unlocked},
    },
  13: {title:"Jerk",
        cost() { return new Decimal(1e22).times(new Decimal(1e8).pow(getBuyableAmount(this.layer,this.id))) },
        display() { return "Increase jerk by 1m/s, but reset previous derivatives and buyables\nCurrently: "+format(player.di.jerk)+"m/s^3\n\nCost: "+format(this.cost())+" meters\n\nYou have "+format(getBuyableAmount(this.layer,this.id))+" Jerk"},
        canAfford() { return player.di.points.gte(this.cost().floor()) },
        buy() {
            if(!hasUpgrade(this.layer,23))player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          player.di.jerk=player.di.jerk.plus(1)
          if(!hasUpgrade(this.layer,23))layers.di.resetDerivatives(3)
        },
        unlocked(){return hasUpgrade(this.layer,15)},
    },
  21: {title:"Snap",
        cost() { return new Decimal(40).plus(getBuyableAmount(this.layer,this.id).pow(2)) },
        display() { return "Increase snap by 1m/s, but reset previous derivatives and buyables\nCurrently: "+format(player.di.snap)+"m/s^4\n\nCost: "+format(this.cost())+" Jerk\n\nYou have "+format(getBuyableAmount(this.layer,this.id))+" Snap"},
        canAfford() { return getBuyableAmount(this.layer,13).gte(this.cost().floor()) },
        buy() {
            
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          player.di.snap=player.di.snap.plus(1)
          if(!hasUpgrade("ad",12))layers.di.resetDerivatives(4)
        },
        unlocked(){return hasUpgrade(this.layer,23)},
    },
  22: {title:"Crackle",
        cost() { return new Decimal(40).plus(getBuyableAmount(this.layer,this.id).pow(2)) },
        display() { return "Increase crackle by 1m/s\nCurrently: "+format(player.di.crackle)+"m/s^5\n\nCost: "+format(this.cost())+" Snap\n\nYou have "+format(getBuyableAmount(this.layer,this.id))+" Crackle"},
        canAfford() { return getBuyableAmount(this.layer,21).gte(this.cost().floor()) },
        buy() {
            
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          player.di.crackle=player.di.crackle.plus(1)
          if(!hasUpgrade("ad",12))layers.di.resetDerivatives(5)
        },
        unlocked(){return hasUpgrade(this.layer,24)},
    },
  
},
  resetDerivatives(max=6){
    if(inChallenge("c",41)||hasChallenge("c",31))return
    if(max>5)player.di.crackle=new Decimal(0)
    if(max>4)player.di.snap=new Decimal(0)
    if(max>3)player.di.jerk=new Decimal(0)
    if(max>3)setBuyableAmount(this.layer,13,new Decimal(0))
          if(max>2)player.di.acc=new Decimal(0)
          if(max>2)setBuyableAmount(this.layer,12,new Decimal(0))
          if(max>1)player.di.velocity=new Decimal(1)
          if(max>1)setBuyableAmount(this.layer,11,new Decimal(0))
          player.di.points=new Decimal(0)
  },
  upgrades: {
      11: {
        title: "Rockets",
        description(){return "Distance boosts velocity and ranks are more effective based on tiers. Currently: x"+format(this.effect())+", x"+format(this.eff2())},
        effect(){let eff=(hasUpgrade(this.layer,11)?player.di.points.plus(1).log10().plus(1):new Decimal(1))
        if(hasUpgrade(this.layer,12))eff=eff.pow(tmp.di.upgrades[12].effect)
        return eff},
        eff2(){let eff=(hasUpgrade(this.layer,11)?getBuyableAmount("di",12).plus(1):new Decimal(1))
          if(hasUpgrade(this.layer,12))eff=eff.pow(tmp.di.upgrades[12].effect)
        return eff
        },
        cost: new Decimal(5e3),
        unlocked(){return (getBuyableAmount(this.layer,12).gte(3)||hasUpgrade(this.layer,this.id))},
        canAfford(){return player.di.points.gte(this.cost)},
        pay(){player.di.points=player.di.points.sub(this.cost)
             layers.di.resetDerivatives()
             },
        currencyDisplayName: "meters",
      },
12: {
        title: "Rocket fuel",
        description(){return "Rockets are more powerful based on tiers. Currently: ^"+format(this.effect())},
        effect(){
          let eff=new Decimal(getBuyableAmount("di",12))
          eff=eff.plus(3).log10().plus(1).pow(2)
          if(hasUpgrade(this.layer,21))eff=eff.pow(2)
          return eff},
        cost: new Decimal(5e4),
        unlocked(){return (getBuyableAmount(this.layer,12).gte(4)||hasUpgrade(this.layer,this.id))},
        canAfford(){return player.di.points.gte(this.cost)},
        pay(){player.di.points=player.di.points.sub(this.cost)
             layers.di.resetDerivatives()
             },
        currencyDisplayName: "meters",
      },
    13: {
        title: "Automation",
        description(){return "Automate ranks, ranks don't spend your distance, and velocity boosts acceleration. Currently: x"+format(this.effect())+(this.effect().gt("1e1000")?" (softcapped)":this.effect().gt("1e500")?" (nerfed)":"")},
        effect(){
          let eff=(hasUpgrade(this.layer,13)?player.di.velocity.plus(1).log10().plus(1):new Decimal(1))
          let x = getBuyableAmount("di",13).plus(1)
          if(x.gt(900))x=x.sqrt().times(30)
if(hasUpgrade(this.layer,21))eff=eff.pow(x)
          if(eff.gt("1e500")&&challengeCompletions("b",11)<1)eff=eff.sqrt().times("1e250")
          if(eff.gt("1e1000"))eff=Decimal.pow(10,eff.log10().pow(2/3).times(10))
        return eff},
        cost: new Decimal(1e9),
        unlocked(){return (getBuyableAmount(this.layer,12).gte(5)||hasUpgrade(this.layer,this.id))},
        canAfford(){return player.di.points.gte(this.cost)},
        pay(){player.di.points=player.di.points.sub(this.cost)
             layers.di.resetDerivatives()
             },
        currencyDisplayName: "meters",
      },
    14: {
        title: "Time reversal",
        description(){return "Meters^100 multiplies layer gain, log(points) multiplies time speed. Currently: x"+format(this.effect())+", x"+format(this.eff2())},
        effect(){
          let eff=(hasUpgrade(this.layer,14)?player.di.points.plus(1).pow(100):1)

        return eff},
      eff2(){
        let eff=(hasUpgrade(this.layer,14)?player.points.plus(1).log10().plus(1):1)
if(hasUpgrade("an",15))eff=eff.pow(2020)
        return eff
      },
        cost: new Decimal(2e10),
        unlocked(){return (getBuyableAmount(this.layer,12).gte(5)||hasUpgrade(this.layer,this.id))},
        canAfford(){return player.di.points.gte(this.cost)},
        pay(){player.di.points=player.di.points.sub(this.cost)
             layers.di.resetDerivatives()
             },
        currencyDisplayName: "meters",
      },
    15: {
        title: "Universal collapse",
        description(){return "Unlock Jerk, which increases acceleration."},
        cost: new Decimal(1e24),
        unlocked(){return (getBuyableAmount(this.layer,12).gte(5)||hasUpgrade(this.layer,this.id))},
        canAfford(){return player.di.points.gte(this.cost)},
        pay(){player.di.points=player.di.points.sub(this.cost)
             layers.di.resetDerivatives()
             },
        currencyDisplayName: "meters",
      },
    21: {
        title: "Pathogens",
        description(){
          let s= "<b>Automation</b>'s 3rd effect is raised to your <b>Jerk</b> buyables, log(acceleration)^ log(aarex timewalls) multiplies jerk, square the <b>Rocket Fuel</b> effect, time speed is boosted by your timewalls, the point gain nerf is 50% weaker, and automatically buy tiers and they don't reset anything. "
          s=s+(hasUpgrade(this.layer,23)?"Square the prestige point effect, the second spell raises super prestige point gain to a power instead, <b>Imperium</b> now affects the super prestige point effect and the prestige point effect, AAREX TIMEWALLS multiply time speed, remove the first layer buyable's softcap, <b>Jerk</b> does not reset anything, and automatically gain <b>Jerk</b>.":"")
            s=s+(hasChallenge("c",22)?" Tiers multiply all dimensions and time speed is multiplied by 1.5^(8th dimensions).":"")
              if(hasMilestone("ch",4)){s+=" The prestige effect is raised to the 1.5th power, Aarex timewalls' 2nd effect ^420.69, each bought 5th dimension multiplies distance gain by 3, the super prestige effect  is squared after the softcap, (xyz points)*(AB reactions^10)*(layers)*(log10(superscaling)^0.1)*(whack-a-clickable points) multiplies the antimatter effect, 10^(the length of the description of this upgrade) makes the prestige effect softcap start later, and raise the Aarex timewall challenge's reward to the 694.20."}
          if(challengeCompletions("b",11)>=1)s+=" Remove the automation's first softcap and all effects of the first switch are always active."
          if(challengeCompletions("b",11)>=2)s+=" The layer effect uses a better formula and the buff effect is exponential."
          if(challengeCompletions("b",11)>=4)s+=" Raise the buff effect and 3rd AB buyable base to the 1.001."
          if(hasUpgrade("an",14))s+=" XYZ points multiply AB reactions, autobuy the XYZ buyable and it resets nothing, and aarex timewall cost exponent is reduced."
          s=s+"\nCurrently: ^"+format(getBuyableAmount("di",13).plus(1).gt(900)?getBuyableAmount("di",13).plus(1).pow(0.5).times(30):getBuyableAmount("di",13).plus(1))+(getBuyableAmount("di",13).plus(1).gt(900)?" (softcapped)":"")+", x"+format(player.di.acc.max(1).log10().plus(1).pow(player.a.points.plus(1).log10().plus(1)))+", ^"+format(new Decimal(2))+", x"+format(player.a.timewall)
                s=s+(hasUpgrade(this.layer,23)?(", ^"+format(new Decimal(2))+", ^"+format(upgradeEffect("l",45))+", x"+format(player.a.points.plus(1))):"")
                  s=s+(hasChallenge("c",22)?", x"+format(getBuyableAmount("di",12).plus(1).pow(hasUpgrade("a",34)?3:1))+", x"+format(Decimal.pow(1.5, getBuyableAmount("ad",32))):"")
          if(hasMilestone("ch",4)){s+=", ^1.50, ^420.69, *"+format(Decimal.pow(3,getBuyableAmount("ad",22)))+", ^2.00, *"+format(player.xyz.points.max(1).times(player.ab.points.max(1).pow(10)).times(player.ml.layers).times(player.ss.points.log10().pow(0.1)).times(player.w.points))+", *"+format(Decimal.pow(10,tmp.di.upgrades[21].description.length))+", ^694.20"}
        if(challengeCompletions("b",11)>=4)s+=", ^1.001, ^1.001"
          if(hasUpgrade("an",14))s+=", *"+format(player.xyz.points)+", -"+format(Decimal.sub(0.1,Decimal.div(0.1,player.an.points.div(2).add(1))))
        return s},
        cost: new Decimal(1e33),
        unlocked(){return (getBuyableAmount(this.layer,12).gte(11)||hasUpgrade(this.layer,this.id))},
        canAfford(){return player.di.points.gte(this.cost)},
        pay(){player.di.points=player.di.points.sub(this.cost)
             layers.di.resetDerivatives()
             },
        currencyDisplayName: "meters",
      style: {width: "300px"},
      },
    22: {
        title: "Dark cores",
        description(){return "Remove the point gain nerf and each <b>Rank</b>, <b>Tier</b> or <b>Jerk</b> increases time speed by 5% Currently: x"+format(this.effect())+(this.effect().gt(Number.MAX_VALUE)?" (nerfed)":"")},
        effect(){
          let eff=(hasUpgrade(this.layer,22)?Decimal.pow(1.05,getBuyableAmount("di",11).plus(getBuyableAmount("di",12)).plus(getBuyableAmount("di",13))):new Decimal(1))
if(eff.gt(Number.MAX_VALUE)){eff=eff.pow(0.5).times(new Decimal(Number.MAX_VALUE).sqrt())}
        return eff},
        cost: new Decimal(1e162),
        unlocked(){return (getBuyableAmount(this.layer,13).gte(16)||hasUpgrade(this.layer,this.id))},
        canAfford(){return player.di.points.gte(this.cost)},
        pay(){player.di.points=player.di.points.sub(this.cost)
             layers.di.resetDerivatives()
             },
        currencyDisplayName: "meters",
      },
    23: {
        title: "Infinity",
        description(){return "Unlock <b>Snap</b> and a new layer, and <b>Pathogens</b> are much more powerful"},
        cost: new Decimal(Number.MAX_VALUE),
        unlocked(){return (getBuyableAmount(this.layer,13).gte(36)||hasUpgrade(this.layer,this.id))},
        canAfford(){return player.di.points.gte(this.cost)},
        pay(){player.di.points=player.di.points.sub(this.cost)
             layers.di.resetDerivatives()
             },
        currencyDisplayName: "meters",
      },
    24: {
        title: "Ascension",
        description(){return "Ascend to the crackle dimension and auto crackle"},
        cost: new Decimal("1e12345"),
        unlocked(){return (hasChallenge("c",31)&&hasUpgrade("di",23))},
        canAfford(){return player.di.points.gte(this.cost)},
        pay(){player.di.points=player.di.points.sub(this.cost)
             layers.di.resetDerivatives()
             },
        currencyDisplayName: "meters",
      },
    31: {
        title: "Stadium",
        description(){return "Unlock a new challenge"},
        cost: new Decimal("1e14900"),
        unlocked(){return (hasUpgrade("di",24))},
        canAfford(){return player.di.points.gte(this.cost)},
        pay(){player.di.points=player.di.points.sub(this.cost)
             
             },
        currencyDisplayName: "meters",
      },
    32: {
        title: "Pantheon",
        description(){return "Layer points multiply points"},
        cost: new Decimal("1e20000"),
        unlocked(){return (hasUpgrade("ad",35))},
        canAfford(){return player.di.points.gte(this.cost)},
        pay(){player.di.points=player.di.points.sub(this.cost)
             
             },
        currencyDisplayName: "meters",
      },
    33: {
        title: "Derivatives",
        description(){return "Square the prestige effect and unlock the despacit layer"},
        cost: new Decimal("1e20700"),
        unlocked(){return (hasUpgrade("ad",35))},
        canAfford(){return player.di.points.gte(this.cost)},
        pay(){player.di.points=player.di.points.sub(this.cost)
             
             },
        currencyDisplayName: "meters",
      },
  },
  getTimeSpeed(){
    let s = new Decimal(1)
    if(inChallenge("c",21))return s
    if(hasUpgrade("di",14))s=s.times(tmp.di.upgrades[14].eff2)
    if(hasUpgrade("di",21))s=s.times(player.a.timewall.max(1))
    if(hasUpgrade("di",22))s=s.times(tmp.di.upgrades[22].effect)
    if(hasUpgrade("di",23))s=s.times(player.a.points.plus(1))
    if(hasUpgrade("ad",15))s=s.times(getBuyableAmount("ad",11).times(getBuyableAmount("ad",12)).pow(player.ad.upgrades.length))
    let f= tmp.ad.effect
    if(f.gte(Number.MAX_VALUE))f=f.pow(1/16).times(Decimal.pow(2,960))
    if(player.ad.unlocked)s=s.mul(f)
    if(hasChallenge("c",22))s=s.times(Decimal.pow(1.5,getBuyableAmount("ad",32)))
    if(hasUpgrade("d",42))s=s.times(player.d.points.max(1))
    if(getBuyableAmount("ml",21).round().gte(1))s=s.times(player.ml.layers.plus(1))
    if(player.b.clickables[12]==1||hasMilestone("b",7))s=s.pow(1.05)
    return s.max(1)
  },
  update(diff){
    if(!player.di.unlocked)return
    if(player.di.points.lt(1)&&player.di.velocity.eq(0))player.di.points=new Decimal(1)

    diff=new Decimal(diff)
    if(hasUpgrade("di",13)&&layers.di.buyables[11].canAfford()){
      let ffff=player.di.points.max(0.9).log(2).floor().plus(1)
      if(player.di.points.gte("1e4000")){
        ffff=player.di.points.times("1e4000").log(4).floor().plus(1)
      }
      if(ffff.gte(1e6))ffff=ffff.div(10).plus(9e5).floor().plus(1)
      let pogger = ffff.sub(getBuyableAmount("di",11))
      setBuyableAmount("di",11,ffff)
      player.di.velocity=player.di.velocity.plus(pogger.times(tmp.di.upgrades[11].eff2))
  
    }
    if(hasUpgrade("di",21)&&layers.di.buyables[12].canAfford()){
      let pogger = getBuyableAmount("di",11).sub(8).max(0).pow(0.5).floor().plus(1)
      player.di.acc=player.di.acc.plus(pogger)
      setBuyableAmount("di",12,pogger)
      if(layers.di.buyables[12].canAfford())layers.di.buyables[12].buy();
    }
    if(hasUpgrade("di",23)&&layers.di.buyables[13].canAfford()){
      let pogger = player.di.points.div(1e22).max(0.5).log(1e8).floor().plus(1).sub(getBuyableAmount("di",13))
      player.di.jerk=player.di.jerk.plus(pogger)
      setBuyableAmount("di",13,player.di.points.div(1e22).max(0.5).log(1e8).floor().plus(1))
   
    }
    if(hasUpgrade("ad",12)&&layers.di.buyables[21].canAfford()){
      let pogger = getBuyableAmount("di",13).sub(40).max(0).pow(0.5).floor().plus(1)
      player.di.snap=player.di.snap.plus(pogger)
      setBuyableAmount("di",21,pogger)
      if(layers.di.buyables[21].canAfford())layers.di.buyables[21].buy();
    }
    if(hasUpgrade("di",24)&&layers.di.buyables[22].canAfford()){
      let pogger = getBuyableAmount("di",21).sub(40).max(0).pow(0.5).floor().plus(1)
      player.di.crackle=player.di.crackle.plus(pogger)
      setBuyableAmount("di",22,pogger)
      if(layers.di.buyables[22].canAfford())layers.di.buyables[22].buy();
    }
    if(player.di.crackle.lt(getBuyableAmount("di",22)))player.di.crackle=getBuyableAmount("di",22)
     diff=diff.times(layers.di.getTimeSpeed())
    player.di.snap=player.di.snap.plus(player.di.crackle.times(diff).times(hasUpgrade("ab",25)?player.ab.points.pow(39):1))
    player.di.jerk=player.di.jerk.plus(player.di.snap.times(diff))
    if(!inChallenge("c",31))player.di.acc=player.di.acc.plus(player.di.jerk.times(diff).times(hasUpgrade("di",21)?player.di.acc.max(1).log10().plus(1).pow(player.a.points.plus(1).log10().plus(1)):1))
    if(!inChallenge("c",41))player.di.velocity=player.di.velocity.plus(player.di.acc.times(diff).times(tmp.di.upgrades[13].effect))
    player.di.points=player.di.points.plus(player.di.velocity.times(diff).times(tmp.di.upgrades[11].effect).times(hasUpgrade("ad",13)?player.ad.points.max(1):1).times(hasUpgrade("ad",32)?layers.di.getTimeSpeed():1).pow(inChallenge("c",11)?0.5:1).pow(hasChallenge("c",11)?1.1:1).pow(hasChallenge("c",41)?1.1:1).times(hasUpgrade("d",41)?layers.ad.effect():1).times(hasMilestone("c",4)?Decimal.pow(3,getBuyableAmount("ad",22)):1))
  },
  tabFormat: [

    "main-display",

    ["prestige-button","",function(){if(player.di.unlocked){return {"display":"none"}}}],
    "blank",
    ["resource-display","",function(){if(player.ad.unlocked){return {"display":"none"}}}],
    "blank",
    ["display-text",function(){
      if(tmp.di.getTimeSpeed.gt(1)){
        return ("Time speed: x"+format(tmp.di.getTimeSpeed))
      }else{return ""}
    }],
    "blank",
"buyables",
    "blank",
    ["display-text",function(){
      if(layers.di.upgrades[11].unlocked()){
        return "Buying an upgrade will reset all ranks and tiers, and will reset all derivatives"
      }else{return ""}
    }],
    "blank",
"upgrades",
      ],
  doReset(l){
    if(layers[l].row>this.row){
    let keep = []
    if(hasMilestone("b",2))keep.push("upgrades")
    layerDataReset(this.layer,keep)
  }
  }

})
addLayer("ad", {
    name: "antimatter", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AD", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(10),
      best: new Decimal(10),
d1: new Decimal(0),
      d2: new Decimal(0),
      d3: new Decimal(0),
      d4: new Decimal(0),
      d5: new Decimal(0),
      d6: new Decimal(0),
      d7: new Decimal(0),
      d8: new Decimal(0),
      d9: new Decimal(0),
    }},
effect(){let f= player.ad.best.max(10).pow(hasUpgrade("an",12)?20:10)
if(f.gt(1e20)&&!hasUpgrade(this.layer,21))f=f.pow(0.25).times(1e15)
if(hasMilestone("ch",4))f=f.times(player.xyz.points.times(player.ab.points.pow(10)).times(player.ml.layers).times(player.ss.points.log10().pow(0.1)).times(player.w.points))
return f},
  effectDescription(){return "multiplying all previous non-static layer resource gain and point gain by "+format(this.effect())+(this.effect().gt(1e20)&&!hasUpgrade(this.layer,21)?" (nerfed)":"")},
  branches:["l","di"],

    color: "#228B22",
    requires(){
      
      let r= new Decimal("1e569")
               return r
    }, 
  getResetGain(){return new Decimal(0)},

  getNextAt(){return this.requires()},
  canReset(){return player.di.points.gte(this.requires())},
  prestigeButtonText(){return  "Unlock Antimatter Dimensions"},
    resource: "antimatter", // Name of prestige currency
    baseResource: "meters", // Name of resource prestige is based on
    baseAmount() {return player.di.points}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
      if(inChallenge("s",12))return new Decimal(0)
        mult = new Decimal(1)

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for antimatter", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){if (hasMilestone("an",4))return false
      return player[this.layer].unlocked||hasUpgrade("di",23)},
buyables: {
    11: {title:"1st dimension",
        cost() { return new Decimal(10).mul(Decimal.pow(2,getBuyableAmount(this.layer, this.id))) },
        display() { return "Gain 1 antimatter per second. \nCurrently: "+format(player.ad.d1)+"/s\n\nCost: "+format(this.cost())+" antimatter\n\nYou have "+format(getBuyableAmount(this.layer,this.id))+" bought 1st dimensions"},
        canAfford() { return player[this.layer].points.gte(this.cost())&&(!inChallenge("c",12)||getBuyableAmount(this.layer, this.id).lt(100)) },
        buy() {
            if(!hasMilestone(this.layer,1))player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          player.ad.d1=player.ad.d1.plus(new Decimal(1))
        },
        unlocked(){return player.antimatter},
    },
12: {title:"2nd dimension",
        cost() { return new Decimal(100).mul(Decimal.pow(10,getBuyableAmount(this.layer, this.id))) },
        display() { return "Gain 1 1st dimension per second. \nCurrently: "+format(player.ad.d2)+"/s\n\nCost: "+format(this.cost())+" antimatter\n\nYou have "+format(getBuyableAmount(this.layer,this.id))+" bought 2nd dimensions"},
        canAfford() { return player[this.layer].points.gte(this.cost())&&(!inChallenge("c",12)||getBuyableAmount(this.layer, this.id).lt(100)) },
        buy() {
            if(!hasMilestone(this.layer,2))player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          player.ad.d2=player.ad.d2.plus(new Decimal(1))
        },
        unlocked(){return player.antimatter},
    },
  13: {title:"3rd dimension",
        cost() { return new Decimal(5e9).mul(Decimal.pow(100,getBuyableAmount(this.layer, this.id))) },
        display() { return "Gain 1 2nd dimension per second. \nCurrently: "+format(player.ad.d3)+"/s\n\nCost: "+format(this.cost())+" antimatter\n\nYou have "+format(getBuyableAmount(this.layer,this.id))+" bought 3rd dimensions"},
        canAfford() { return player[this.layer].points.gte(this.cost())&&(!inChallenge("c",12)||getBuyableAmount(this.layer, this.id).lt(100)) },
        buy() {
            if(!hasMilestone(this.layer,3))player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          player.ad.d3=player.ad.d3.plus(new Decimal(1))
        },
        unlocked(){return getBuyableAmount(this.layer,12).gte(7)},
    },
    21: {title:"4th dimension",
        cost() { return new Decimal(1e20).mul(Decimal.pow(1000,getBuyableAmount(this.layer, this.id))) },
        display() { return "Gain 1 3rd dimension per second. \nCurrently: "+format(player.ad.d4)+"/s\n\nCost: "+format(this.cost())+" antimatter\n\nYou have "+format(getBuyableAmount(this.layer,this.id))+" bought 4th dimensions"},
        canAfford() { return player[this.layer].points.gte(this.cost())&&(!inChallenge("c",12)||getBuyableAmount(this.layer, this.id).lt(100)) },
        buy() {
            if(!hasMilestone(this.layer,4))player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          player.ad.d4=player.ad.d4.plus(new Decimal(1))
        },
        unlocked(){return hasUpgrade(this.layer,14)},
    },
  22: {title:"5th dimension",
        cost() { return new Decimal(1e35).mul(Decimal.pow(1e4,getBuyableAmount(this.layer, this.id))) },
        display() { return "Gain 1 4th dimension per second. \nCurrently: "+format(player.ad.d5)+"/s\n\nCost: "+format(this.cost())+" antimatter\n\nYou have "+format(getBuyableAmount(this.layer,this.id))+" bought 5th dimensions"},
        canAfford() { return player[this.layer].points.gte(this.cost())&&(!inChallenge("c",12)||getBuyableAmount(this.layer, this.id).lt(100)) },
        buy() {
            if(!hasMilestone(this.layer,5))player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          player.ad.d5=player.ad.d5.plus(new Decimal(1))
        },
        unlocked(){return getBuyableAmount(this.layer,21).gte(6)},
    },
  23: {title:"6th dimension",
        cost() { return new Decimal(1e66).mul(Decimal.pow(1e5,getBuyableAmount(this.layer, this.id))) },
        display() { return "Gain 1 5th dimension per second. \nCurrently: "+format(player.ad.d6)+"/s\n\nCost: "+format(this.cost())+" antimatter\n\nYou have "+format(getBuyableAmount(this.layer,this.id))+" bought 6th dimensions"},
        canAfford() { return player[this.layer].points.gte(this.cost())&&(!inChallenge("c",12)||getBuyableAmount(this.layer, this.id).lt(100)) },
        buy() {
            if(!hasMilestone(this.layer,6))player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          player.ad.d6=player.ad.d6.plus(new Decimal(1))
        },
        unlocked(){return getBuyableAmount(this.layer,22).gte(8)},
    },
  31: {title:"7th dimension",
        cost() { return new Decimal(1e90).mul(Decimal.pow(1e10,getBuyableAmount(this.layer, this.id))) },
        display() { return "Gain 1 6th dimension per second. \nCurrently: "+format(player.ad.d7)+"/s\n\nCost: "+format(this.cost())+" antimatter\n\nYou have "+format(getBuyableAmount(this.layer,this.id))+" bought 7th dimensions"},
        canAfford() { return player[this.layer].points.gte(this.cost())&&(!inChallenge("c",12)||getBuyableAmount(this.layer, this.id).lt(100)) },
        buy() {
            if(!hasMilestone(this.layer,7))player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          player.ad.d7=player.ad.d7.plus(new Decimal(1))
        },
        unlocked(){return getBuyableAmount(this.layer,22).gte(14)},
    },
  32: {title:"8th dimension",
        cost() { return new Decimal(1e128).mul(Decimal.pow(hasChallenge("c",12)?1e12:1e15,getBuyableAmount(this.layer, this.id))) },
        display() { return "Gain 1 7th dimension per second. \nCurrently: "+format(player.ad.d8)+"/s\n\nCost: "+format(this.cost())+" antimatter\n\nYou have "+format(getBuyableAmount(this.layer,this.id))+" bought 8th dimensions"},
        canAfford() { return player[this.layer].points.gte(this.cost())&&(!inChallenge("c",12)||getBuyableAmount(this.layer, this.id).lt(100)) },
        buy() {
            if(!hasMilestone(this.layer,8))player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          player.ad.d8=player.ad.d8.plus(new Decimal(1))
        },
        unlocked(){return getBuyableAmount(this.layer,23).gte(12)},
    },
    33: {title:"The Reality Update",
        cost() { return new Decimal("1e400").mul(Decimal.pow(1e20,getBuyableAmount(this.layer, this.id))) },
        display() { return "Gain 1 8th dimension per second. \nCurrently: "+format(player.ad.d9)+"/s\n\nCost: "+format(this.cost())+" antimatter\n\nYou are "+format(getBuyableAmount(this.layer,this.id))+"% to the reality update"},
        canAfford() { return player[this.layer].points.gte(this.cost())&&(!inChallenge("c",12)||getBuyableAmount(this.layer, this.id).lt(100)) },
        buy() {
          if(getBuyableAmount(this.layer,this.id).gte(100)&&!hasUpgrade("d",43))return
            if(!hasMilestone(this.layer,10))player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          player.ad.d9=player.ad.d9.plus(new Decimal(1))
        },
        unlocked(){return hasUpgrade(this.layer,25)},
    },
},
  upgrades: {
      11: {
        title: "Antimatter synergy",
        description(){return "Each dimension boosts its production by x1.1"},

        cost: new Decimal(2e3),
        unlocked(){return (getBuyableAmount(this.layer,12).gte(2)||hasUpgrade(this.layer,this.id))},
        canAfford(){return player.ad.points.gte(this.cost)},
        pay(){player.ad.points=player.ad.points.sub(this.cost)

             },
        currencyDisplayName: "antimatter",
      },
    12: {
        title: "Time boost",
        description(){return "Time speed affects all dimensions, automate <b>Snap</b>"},
        effect(){return layers.di.getTimeSpeed().pow(0.01)},
        cost: new Decimal(1e4),
        unlocked(){return (getBuyableAmount(this.layer,12).gte(3)||hasUpgrade(this.layer,this.id))},
        canAfford(){return player.ad.points.gte(this.cost)},
        pay(){player.ad.points=player.ad.points.sub(this.cost)

             },
        currencyDisplayName: "antimatter",
      },
    13: {
        title: "Distant Galaxies",
        description(){return "Distance^0.001 multiplies antimatter and antimatter multiplies distance"},
        effect(){return player.di.points.pow(0.001).plus(1)},
        cost: new Decimal(5e15),
        unlocked(){return (getBuyableAmount(this.layer,12).gte(13)||hasUpgrade(this.layer,this.id))},
        canAfford(){return player.ad.points.gte(this.cost)},
        pay(){player.ad.points=player.ad.points.sub(this.cost)

             },
        currencyDisplayName: "antimatter",
      },
    14: {
        title: "Crackle",
        description(){return "Unlock <strike>crackle</strike> 4th dimensions and each bought fourth dimension doubles antimatter gain"},

        cost: new Decimal(1e21),
        unlocked(){return (getBuyableAmount(this.layer,13).gte(6)||hasUpgrade(this.layer,this.id))},
        canAfford(){return player.ad.points.gte(this.cost)},
        pay(){player.ad.points=player.ad.points.sub(this.cost)

             },
        currencyDisplayName: "antimatter",
      },
    15: {
        title: "DI STAN ce incremental",
        description(){return "The DI STANs that came out of nowhere make you travel (1st dimensions*2nd dimensions)^(upgrades)x faster"},

        cost: new Decimal(1e62),
        unlocked(){return (getBuyableAmount(this.layer,22).gte(6)||hasUpgrade(this.layer,this.id))},
        canAfford(){return player.ad.points.gte(this.cost)},
        pay(){player.ad.points=player.ad.points.sub(this.cost)

             },
        currencyDisplayName: "antimatter",
      },
    21: {
        title: "Pathogen Upgrade",
        description(){return "Pathogens gain "+(hasChallenge("c",22)?"2":"0")+" more effects, but remove the antimatter effect nerf"},

        cost: new Decimal(1e105),
        unlocked(){return (getBuyableAmount(this.layer,23).gte(7)||hasUpgrade(this.layer,this.id))},
        canAfford(){return player.ad.points.gte(this.cost)},
        pay(){player.ad.points=player.ad.points.sub(this.cost)

             },
        currencyDisplayName: "antimatter",
      },
    22: {
        title: "Antimatter boost",
        description(){return "Antimatter and time played boosts all dimensions"},

        cost: new Decimal(1e142),
      effect(){return player.ad.points.plus(1).ln().plus(1).times(player.timePlayed)},
        unlocked(){return (getBuyableAmount(this.layer,23).gte(14)||hasUpgrade(this.layer,this.id))},
        canAfford(){return player.ad.points.gte(this.cost)},
        pay(){player.ad.points=player.ad.points.sub(this.cost)

             },
        currencyDisplayName: "antimatter",
      },
    23: {
        title: "Dimension boost",
        description(){return "(1.025^dimension #)^(dimension bought) multiplies that dimension's production"},

        cost: new Decimal(1e239),
        unlocked(){return (getBuyableAmount(this.layer,32).gte(8)||hasUpgrade(this.layer,this.id))},
        canAfford(){return player.ad.points.gte(this.cost)},
        pay(){player.ad.points=player.ad.points.sub(this.cost)

             },
        currencyDisplayName: "antimatter",
      },
    24: {
        title: "Galaxy",
        description(){return "Antimatter dimensions are (upgrades)x stronger and unlock a new layer"},

        cost: new Decimal(Number.MAX_VALUE),
        unlocked(){return (getBuyableAmount(this.layer,32).gte(11)||hasUpgrade(this.layer,this.id))},
        canAfford(){return player.ad.points.gte(this.cost)},
        pay(){player.ad.points=player.ad.points.sub(this.cost)

             },
        currencyDisplayName: "antimatter",
      },
    25: {
        title: "Infinity",
        description(){return "Unlock an Antimatter buyable"},

        cost: new Decimal("1e392"),
        unlocked(){return (hasChallenge("c",32)&&(getBuyableAmount(this.layer,32).gte(21)||hasUpgrade(this.layer,this.id)))},
        canAfford(){return player.ad.points.gte(this.cost)},
        pay(){player.ad.points=player.ad.points.sub(this.cost)

             },
        currencyDisplayName: "antimatter",
      },
    31: {
        title: "Replicanti",
        description(){return "Unlock 6 timewall upgrades"},

        cost: new Decimal("1e440"),
        unlocked(){return (hasUpgrade(this.layer,25))},
        canAfford(){return player.ad.points.gte(this.cost)},
        pay(){player.ad.points=player.ad.points.sub(this.cost)

             },
        currencyDisplayName: "antimatter",
      },
    32: {
        title: "Eternity",
        description(){return "Distance gain is multiplied by time speed"},

        cost: new Decimal("1e531"),
        unlocked(){return (hasUpgrade("a",36))},
        canAfford(){return player.ad.points.gte(this.cost)},
        pay(){player.ad.points=player.ad.points.sub(this.cost)

             },
        currencyDisplayName: "antimatter",
      },
    33: {
        title: "Eternity Challenges",
        description(){return "Each <b>Reality update</b> applies <b>Galaxy</b> 0.2 more times and unlock a challenge"},

        cost: new Decimal("1e600"),
        unlocked(){return (hasChallenge("c",41))},
        canAfford(){return player.ad.points.gte(this.cost)},
        pay(){player.ad.points=player.ad.points.sub(this.cost)

             },
        currencyDisplayName: "antimatter",
      },34: {
        title: "Time dilation",
        description(){return "The Prestige effect nerf uses a different type of nerf"},

        cost: new Decimal("1e960"),
        unlocked(){return (hasChallenge("c",42)&&hasUpgrade("ad",33))},
        canAfford(){return player.ad.points.gte(this.cost)},
        pay(){player.ad.points=player.ad.points.sub(this.cost)

             },
        currencyDisplayName: "antimatter",
      },
    35: {
        title: "Reality",
        description(){return "The Super Prestige effect nerf uses a different type of nerf and unlock 2 Distance upgrades"},

        cost: new Decimal("1e1000"),
        unlocked(){return (hasChallenge("c",42)&&hasUpgrade("ad",34))},
        canAfford(){return player.ad.points.gte(this.cost)},
        pay(){player.ad.points=player.ad.points.sub(this.cost)

             },
        currencyDisplayName: "antimatter",
      },
  },
  milestones: {
    1: {
        requirementDescription: "1 5th dimension",
        effectDescription: "Auto 1st dimensions and they don't cost anything",
        done() { return getBuyableAmount("ad",22).gte(1) },
      unlocked(){return hasUpgrade("ad",14)}
    },
    2: {
        requirementDescription: "6 5th dimensions",
        effectDescription: "Auto 2nd dimensions and they don't cost anything",
        done() { return getBuyableAmount("ad",22).gte(6) },
      unlocked(){return hasMilestone(this.layer,this.id-1)}
    },
    3: {
        requirementDescription: "1 6th dimension",
        effectDescription: "Auto 3rd dimensions and they don't cost anything",
        done() { return getBuyableAmount("ad",23).gte(1) },
      unlocked(){return hasMilestone(this.layer,this.id-1)}
    },
    4: {
        requirementDescription: "1 7th dimension",
        effectDescription: "Auto 4th dimensions and they don't cost anything",
        done() { return getBuyableAmount("ad",31).gte(1) },
      unlocked(){return hasMilestone(this.layer,this.id-1)}
    },
    5: {
        requirementDescription: "4 7th dimensions",
        effectDescription: "Auto 5th dimensions and they don't cost anything",
        done() { return getBuyableAmount("ad",31).gte(4) },
      unlocked(){return hasMilestone(this.layer,this.id-1)}
    },
    6: {
        requirementDescription: "1 8th dimension",
        effectDescription: "Auto 6th dimensions and they don't cost anything",
        done() { return getBuyableAmount("ad",32).gte(1) },
      unlocked(){return hasMilestone(this.layer,this.id-1)}
    },
    7: {
        requirementDescription: "8 8th dimensions",
        effectDescription: "Auto 7th dimensions and they don't cost anything",
        done() { return getBuyableAmount("ad",32).gte(8) },
      unlocked(){return hasMilestone(this.layer,this.id-1)}
    },
    8: {
        requirementDescription: "Complete EC11",
        effectDescription: "Auto 8th dimensions and they don't cost anything",
        done() { return hasChallenge("c",32) },
      unlocked(){return hasUpgrade(this.layer,24)}
    },
    9: {
        requirementDescription: "Start any row 3 challenge",
        effectDescription: "Gain 10x antimatter",
        done() { return player.challengeVar>0 },
      unlocked(){return hasUpgrade(this.layer,24)}
    },
    10: {
        requirementDescription: "1% to reality update",
        effectDescription: "Automatically buy reality updates.",
        done() { return getBuyableAmount("ad",33).gte(1) },
      unlocked(){return hasUpgrade(this.layer,25)}
    },
},
  automateStuff(){
    if(hasMilestone("b",4)){
      if(layers.ad.buyables[11].canAfford())setBuyableAmount("ad",11,player.ad.points.div(10).log(2).floor().add(1))
      if(layers.ad.buyables[12].canAfford())setBuyableAmount("ad",12,player.ad.points.div(100).log(10).floor().add(1))
      if(layers.ad.buyables[13].canAfford())setBuyableAmount("ad",13,player.ad.points.div(5e9).log(100).floor().add(1))
      if(layers.ad.buyables[21].canAfford())setBuyableAmount("ad",21,player.ad.points.div(1e20).log(1000).floor().add(1))
      if(layers.ad.buyables[22].canAfford())setBuyableAmount("ad",22,player.ad.points.div(1e35).log(1e4).floor().add(1))
      if(layers.ad.buyables[23].canAfford())setBuyableAmount("ad",23,player.ad.points.div(1e66).log(1e5).floor().add(1))
      if(layers.ad.buyables[31].canAfford())setBuyableAmount("ad",31,player.ad.points.div(1e90).log(1e10).floor().add(1))
      if(layers.ad.buyables[32].canAfford())setBuyableAmount("ad",32,player.ad.points.div(1e128).log(1e12).floor().add(1))
      if(layers.ad.buyables[33].canAfford())setBuyableAmount("ad",33,player.ad.points.div("1e400").log(1e20).floor().add(1))
    }else{
    let max=20
    if(hasUpgrade("d",41))max=100
    for(let x=0;x<max;x++){
    if(hasMilestone(this.layer,1)){
      if(layers.ad.buyables[11].canAfford())layers.ad.buyables[11].buy()
    }
    if(hasMilestone(this.layer,2)){
      if(layers.ad.buyables[12].canAfford())layers.ad.buyables[12].buy()
    }
    if(hasMilestone(this.layer,3)){
      if(layers.ad.buyables[13].canAfford())layers.ad.buyables[13].buy()
    }
    if(hasMilestone(this.layer,4)){
      if(layers.ad.buyables[21].canAfford())layers.ad.buyables[21].buy()
    }
    if(hasMilestone(this.layer,5)){
      if(layers.ad.buyables[22].canAfford())layers.ad.buyables[22].buy()
    }
    if(hasMilestone(this.layer,6)){
      if(layers.ad.buyables[23].canAfford())layers.ad.buyables[23].buy()
    }
    if(hasMilestone(this.layer,7)){
      if(layers.ad.buyables[31].canAfford())layers.ad.buyables[31].buy()
    }
      if(hasMilestone(this.layer,8)){
      if(layers.ad.buyables[32].canAfford())layers.ad.buyables[32].buy()
    }
      if(hasMilestone(this.layer,10)){
      if(layers.ad.buyables[33].canAfford())layers.ad.buyables[33].buy()
    }
    }}
  },
  getAllDimMult(){
    
    let s=new Decimal(1)
    if(hasUpgrade(this.layer,12))s=s.times(tmp.ad.upgrades[12].effect)
    if(hasUpgrade(this.layer,22))s=s.times(tmp.ad.upgrades[22].effect)
    if(hasUpgrade(this.layer,24))s=s.times(new Decimal(player.ad.upgrades.length).pow(hasUpgrade(this.layer,33)?getBuyableAmount("ad",33).times(0.2).plus(1):1))
    if(hasChallenge("c",22))s=s.times(getBuyableAmount("di",12).plus(1).pow(hasUpgrade("a",34)?3:1))
    if(hasUpgrade("d",42))s=s.times(player.d.points.max(1))
    if(hasMilestone("xyz",1))s=s.times(player.xyz.points.max(1))
    return s.max(1)
  },
  getD1mult(){let m=new Decimal(1)
  if(hasUpgrade("ad",13))m=m.times(tmp.ad.upgrades[13].effect)
              if(hasUpgrade("ad",14))m=m.times(Decimal.pow(2,getBuyableAmount("ad",21)))
              if(hasChallenge("c",12))m=m.mul(1e5)
              if(hasChallenge("c",22))m=m.mul(1e5)
              if(hasMilestone(this.layer,9))m=m.mul(10)
              if(player.b.clickables[12]==2||hasMilestone("b",7))m=m.pow(1.2)
             return m.max(1)},
  update(diff){

    if(!player.ad.unlocked)return
    if(player.ad.best.lt(player.ad.points))player.ad.best=player.ad.points
    if(!player.antimatter&&player.di.points.gte("1e900")){player.antimatter=true}
    if(player.ad.d1.eq(0)&&player.ad.points.lt(10))player.ad.points=new Decimal(10)
    if(player.ad.d9.lt(getBuyableAmount("ad",33)))player.ad.d9=getBuyableAmount("ad",33)
    if(player.ad.d1.lt(getBuyableAmount("ad",11)))player.ad.d1=getBuyableAmount("ad",11)
    diff=new Decimal(diff)
    diff=diff.times(layers.ad.getAllDimMult().max(1))
    
    player.ad.d8=player.ad.d8.plus(diff.times(player.ad.d9).times(hasUpgrade("ad",11)&&!inChallenge("c",32)?Decimal.pow(1.1,getBuyableAmount("ad",33)):1).times(hasUpgrade("ad",23)&&!inChallenge("c",32)?Decimal.pow(1.025,getBuyableAmount("ad",33).times(9)):1))
    player.ad.d7=player.ad.d7.plus(diff.times(player.ad.d8).times(hasUpgrade("ad",11)&&!inChallenge("c",32)?Decimal.pow(1.1,getBuyableAmount("ad",32)):1).times(hasUpgrade("ad",23)&&!inChallenge("c",32)?Decimal.pow(1.025,getBuyableAmount("ad",32).times(8)):1))
    player.ad.d6=player.ad.d6.plus(diff.times(player.ad.d7).times(hasUpgrade("ad",11)&&!inChallenge("c",32)?Decimal.pow(1.1,getBuyableAmount("ad",31)):1).times(hasUpgrade("ad",23)&&!inChallenge("c",32)?Decimal.pow(1.025,getBuyableAmount("ad",31).times(7)):1))
    player.ad.d5=player.ad.d5.plus(diff.times(player.ad.d6).times(hasUpgrade("ad",11)&&!inChallenge("c",32)?Decimal.pow(1.1,getBuyableAmount("ad",23)):1).times(hasUpgrade("ad",23)&&!inChallenge("c",32)?Decimal.pow(1.025,getBuyableAmount("ad",23).times(6)):1).times(hasUpgrade("ab",25)?player.ab.points.pow(39):1))
    player.ad.d4=player.ad.d4.plus(diff.times(player.ad.d5).times(hasUpgrade("ad",11)&&!inChallenge("c",32)?Decimal.pow(1.1,getBuyableAmount("ad",22)):1).times(hasUpgrade("ad",23)&&!inChallenge("c",32)?Decimal.pow(1.025,getBuyableAmount("ad",22).times(5)):1))
    player.ad.d3=player.ad.d3.plus(diff.times(player.ad.d4).times(hasUpgrade("ad",11)&&!inChallenge("c",32)?Decimal.pow(1.1,getBuyableAmount("ad",21)):1).times(hasUpgrade("ad",23)&&!inChallenge("c",32)?Decimal.pow(1.025,getBuyableAmount("ad",21).times(4)):1))
    player.ad.d2=player.ad.d2.plus(diff.times(player.ad.d3).times(hasUpgrade("ad",11)&&!inChallenge("c",32)?Decimal.pow(1.1,getBuyableAmount("ad",13)):1).times(hasUpgrade("ad",23)&&!inChallenge("c",32)?Decimal.pow(1.025,getBuyableAmount("ad",13).times(3)):1))
    if(!inChallenge("c",42))player.ad.d1=player.ad.d1.plus(diff.times(player.ad.d2).times(hasUpgrade("ad",11)&&!inChallenge("c",32)?Decimal.pow(1.1,getBuyableAmount("ad",12)):1).times(hasUpgrade("ad",23)&&!inChallenge("c",32)?Decimal.pow(1.025,getBuyableAmount("ad",12).times(2)):1).times(hasChallenge("c",42)?Decimal.pow(1.5,getBuyableAmount("ad",13)):1))
    player.ad.points=player.ad.points.plus(diff.times(player.ad.d1).times(hasUpgrade("ad",11)&&!inChallenge("c",32)?Decimal.pow(1.1,getBuyableAmount("ad",11)):1).times(hasUpgrade("ad",23)&&!inChallenge("c",32)?Decimal.pow(1.025,getBuyableAmount("ad",11)):1).times(layers.ad.getD1mult()).pow(inChallenge("c",22)?0.25:1))
    
  },
  tabFormat: [

    "main-display",

    ["prestige-button","",function(){if(player.ad.unlocked){return {"display":"none"}}}],
    "blank",
    ["resource-display","",function(){if(player.ad.unlocked){return {"display":"none"}}}],
    "blank",
    "blank",
["display-text",function(){
  if(!player.antimatter&&player.ad.unlocked)return "Reach 1e900 meters to unlock 1st dimensions"
}],
    "buyables",
    "blank",
    "blank",
    "upgrades",
    "blank",
    "blank",
    "milestones",
      ],
doReset(l){
  if(layers[l].row>this.row){
    let keep = ["buyables","d9","d8","d7","d6","d5","d4","d3","d2","d1"]
    if(hasMilestone("b",1))keep.push("milestones")
    if(hasMilestone("b",4))keep.push("upgrades")
    layerDataReset(this.layer,keep)
  }
}
})
addLayer("c", {
    name: "challenges", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),

    }},
  branches:["l","ad"],

    color: "#799026",
    requires(){
      
      let r= new Decimal("1e308")
               return r
    }, 
  getResetGain(){return new Decimal(0)},

  getNextAt(){return this.requires()},
  canReset(){return player.ad.points.gte(this.requires())},
  prestigeButtonText(){return  "Unlock Challenges"},
  resetsNothing(){return true},
    resource: "challenge points", // Name of prestige currency
    baseResource: "antimatter", // Name of resource prestige is based on
    baseAmount() {return player.ad.points}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
      if(inChallenge("s",12))return new Decimal(0)
        mult = new Decimal(1)

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "c: unlock challenges", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){if (hasMilestone("an",4))return false
      return player[this.layer].unlocked||hasUpgrade("ad",24)},
  update(diff){
    if(player.challengeVar==0&&(inChallenge(this.layer,11)||inChallenge(this.layer,21)||inChallenge(this.layer,31))){
      resetDistance()
      player.challengeVar=1
    }
    if(player.challengeVar==0&&(inChallenge(this.layer,12)||inChallenge(this.layer,22)||inChallenge(this.layer,32))){
      resetAntimatter()
      player.challengeVar=2
    }
    if(player.challengeVar>0&&!(inChallenge(this.layer,12)||inChallenge(this.layer,22)||inChallenge(this.layer,32)||inChallenge(this.layer,11)||inChallenge(this.layer,21)||inChallenge(this.layer,31))){
      player.challengeVar=0
    }
  },
challenges: {
    11: {
        name: "Hiker's Dream",
        challengeDescription: "you do not have enough energy, so you run out and square root distance gain",
canComplete(){return player.di.points.gte("1e2500")},
        unlocked(){return player.c.unlocked},
      goalDescription: "reach 1e2500 meters",
      rewardDescription: "Distance gain ^1.1",
    },
    21: {
        name: "Extreme",
        challengeDescription: "Time speed does nothing",
canComplete(){return player.di.points.gte("1e1030")},
        unlocked(){return player.c.unlocked},
      goalDescription: "reach 1e1030 meters",
      rewardDescription: "Time speed affects timewall gain, remove 1st timewall gain softcap",
    },
  31: {
        name: "NA",
        challengeDescription: "Your jerk does nothing",
canComplete(){return player.di.points.gte("1e5800")},
        unlocked(){return player.c.unlocked},
      goalDescription: "reach 1e5800 meters",
      rewardDescription: "Unlock more Distance features and distance buyables and upgrades reset nothing",
    },
  41: {
        name: "Hard",
        challengeDescription: "Your acceleration does nothing",
canComplete(){return player.di.points.gte("1e4693")},
        unlocked(){return (hasUpgrade("di",31)||inChallenge(this.layer,this.id)||hasChallenge(this.layer,this.id))},
      goalDescription: "reach 1e4693 meters",
      rewardDescription: "Distance gain ^1.1",
    onEnter(){resetDistance()},
    },
  12: {
        name: "C9",
        challengeDescription: "You can only buy up to 100 of each dimension",
canComplete(){return player.ad.points.gte("1e103")},
        unlocked(){return player.c.unlocked},
      goalDescription: "reach 1e103 antimatter",
      rewardDescription: "8th dimensions scale slower, gain 1e5x antimatter",
    },
  22: {
        name: "IC4",
        challengeDescription: "Antimatter gain ^0.25",
canComplete(){return player.ad.points.gte("5e7")},
        unlocked(){return player.c.unlocked},
      goalDescription: "reach 5e7 antimatter",
      rewardDescription: "The 6th antimatter upgrade's 1st effect is stronger, gain 1e5x antimatter",
    },
  32: {
        name: "EC11",
        challengeDescription: "Antimatter Synergy and Dimension Boost upgrades do nothing",
canComplete(){return player.ad.points.gte("1e216")},
        unlocked(){return player.c.unlocked},
      goalDescription: "reach 1e216 antimatter",
      rewardDescription: "Unlock more Antimatter upgrades and auto 8th dimensions",
    },
  42: {
        name: "RC6",
        challengeDescription: "2nd dimensions do nothing",
canComplete(){return player.ad.points.gte("1e66")},
        unlocked(){return (hasUpgrade("ad",33)||inChallenge(this.layer,this.id)||hasChallenge(this.layer,this.id))},
      goalDescription: "reach 1e66 antimatter",
      rewardDescription: "Each 3rd dimension makes 2nd dimensions 1.5x more powerful",
    onEnter(){resetAntimatter()},
    },
},
  
  tabFormat: [


    ["prestige-button","",function(){if(player.c.unlocked){return {"display":"none"}}}],
    "blank",
    ["resource-display","",function(){if(player.c.unlocked){return {"display":"none"}}}],
    ["display-text",function(){
      if(player.c.unlocked){return "Challenges on the left reset all distance upgrades and resources, challenges on the right reset all antimatter upgrades or resources"}
    }],
    "blank",

    "challenges",
      ],
doReset(l){

},
})
addLayer("d", {
    name: "despacit", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
      progress: new Decimal(0),
      req: new Decimal(10),
layers: new Decimal(0),
      max: new Decimal(2),
    }},
  branches:["l","c"],

    color: "#62d050",
    requires(){
      
      let r= new Decimal("1e200")
               return r
    }, 
  getResetGain(){return new Decimal(0)},

  getNextAt(){return this.requires()},
  canReset(){return player.ad.points.gte(this.requires())},
  prestigeButtonText(){return  "Unlock Despacit"},
  resetsNothing(){return true},
    resource: "despacit mods played", // Name of prestige currency
    baseResource: "distance", // Name of resource prestige is based on
    baseAmount() {return player.di.points}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
      if(inChallenge("s",12))return new Decimal(0)
        mult = new Decimal(1)

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "x", description: "x: unlock despacit", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){if (hasMilestone("an",4))return false
      return player[this.layer].unlocked||hasUpgrade("di",33)},
  update(diff){
if(!player.d.unlocked){return}
    if(player.d.points.gte(hasUpgrade("d",44)?new Decimal(Number.MAX_VALUE).times(hasUpgrade("w",15)?player.w.points.max(1):1):hasUpgrade("d",41)?new Decimal(1e100):hasUpgrade("d",22)?new Decimal(1e6):32)){return}
    diff=new Decimal(diff)
    if(hasUpgrade("d",36))player.d.points=player.d.points.plus(diff.mul(buyableEffect("d",11).times(100))).min(hasUpgrade("d",44)?new Decimal(Number.MAX_VALUE).times(hasUpgrade("w",15)?player.w.points.max(1):1):hasUpgrade("d",41)?new Decimal(1e100):hasUpgrade("d",22)?new Decimal(1e6):32)
    if(hasUpgrade("d",12))diff=diff.mul(2)
    if(hasUpgrade("d",14))diff=diff.mul(2)
    if(hasUpgrade("d",21))diff=diff.mul(1.5)
    if(hasUpgrade("d",23))diff=diff.mul(2)
    if(hasUpgrade("d",24))diff=diff.mul(2)
    if(hasUpgrade("d",31))diff=diff.mul(2)
    player.d.progress=player.d.progress.plus(diff)
    if(player.d.progress.gte(player.d.req)){
      player.d.progress=new Decimal(0)
      player.d.req=layers.d.getReq()
      player.d.layers=player.d.layers.plus(1)
    }
    if(player.d.layers.round().gte(player.d.max.round())){
      player.d.layers=new Decimal(0)
      player.d.points=player.d.points.add(1)
      player.d.max=layers.d.getLayers()
      
    }
  },
getLayers(){
if(hasUpgrade("d",33))return new Decimal(1)
  if(player.d.points.eq(0)){
    return new Decimal(2)
  }
  let r=new Decimal(Math.random()**2).times(8).floor().plus(1)
  if(hasUpgrade("d",15)&&r.gte(7))r=new Decimal(1)
  if(hasUpgrade("d",26)&&r.gte(5))r=new Decimal(2)
  return r
},
getReq(){
  if(hasUpgrade("d",35))return new Decimal(1e-10)
  if(hasUpgrade("d",34)&&Math.random()<0.8)return new Decimal(1e-5)
if(hasUpgrade("d",25)&&Math.random()<0.5)return new Decimal(1e-5)
  if(hasUpgrade("d",16)&&Math.random()<0.2)return new Decimal(1e-5)
  return new Decimal(Math.random()**1.2).times(player.d.points.eq(0)?20:hasUpgrade("d",13)?40:hasUpgrade("d",11)?60:90).plus(10).div(hasUpgrade("d",15)?Math.random()+1:1).pow(hasUpgrade("d",32)?0.5:1)
},
  upgrades: {
      11: {
        title: "Play faster",
        description(){return "Time required for future layers is reduced by 1.5x"},

        cost: new Decimal(1),
        unlocked(){return (player.d.points.gte(1))},
        canAfford(){return player.d.points.gte(this.cost)},
        pay(){

             },
        currencyDisplayName: "despacit mods",
      },
    12: {
        title: "Time skips",
        description(){return "Gain time at twice the speed"},

        cost: new Decimal(2),
        unlocked(){return (hasUpgrade("d",11))},
        canAfford(){return player.d.points.gte(this.cost)},
        pay(){

             },
        currencyDisplayName: "despacit mods",
      },
    13: {
        title: "Play faster",
        description(){return "Time required for future layers is reduced by 1.5x"},

        cost: new Decimal(3),
        unlocked(){return (hasUpgrade("d",12))},
        canAfford(){return player.d.points.gte(this.cost)},
        pay(){

             },
        currencyDisplayName: "despacit mods",
      },
    14: {
        title: "Time skips",
        description(){return "Gain time at twice the speed"},

        cost: new Decimal(4),
        unlocked(){return (hasUpgrade("d",13))},
        canAfford(){return player.d.points.gte(this.cost)},
        pay(){

             },
        currencyDisplayName: "despacit mods",
      },
    15: {
        title: "Increase unfinished mod count",
        description(){return "A mod with 7 or more layers will now have 1, and you are more likely to get short layers"},

        cost: new Decimal(7),
        unlocked(){return (hasUpgrade("d",14))},
        canAfford(){return player.d.points.gte(this.cost)},
        pay(){

             },
        currencyDisplayName: "despacit mods",
      },
    16: {
        title: "Console hacks",
        description(){return "You have a 20% chance of skipping a layer"},

        cost: new Decimal(10),
        unlocked(){return (hasUpgrade("d",15))},
        canAfford(){return player.d.points.gte(this.cost)},
        pay(){

             },
        currencyDisplayName: "despacit mods",
      },
    21: {
        title: "More time skips",
        description(){return "You gain progress 1.5x as fast"},

        cost: new Decimal(20),
        unlocked(){return (hasUpgrade("d",16))},
        canAfford(){return player.d.points.gte(this.cost)},
        pay(){

             },
        currencyDisplayName: "despacit mods",
      },
    22: {
        title: "the upgrade",
        description(){return "You completed all of the despacit mods, but 999,968 more appear"},

        cost: new Decimal(32),
        unlocked(){return (hasUpgrade("d",21)&&player.d.points.gte(32))},
        canAfford(){return player.d.points.gte(this.cost)},
        pay(){

             },
        currencyDisplayName: "despacit mods",
      },
    23: {
        title: "Experienced",
        description(){return "Your experience allows you to complete mods 2x faster"},

        cost: new Decimal(50),
        unlocked(){return (hasUpgrade("d",22))},
        canAfford(){return player.d.points.gte(this.cost)},
        pay(){

             },
        currencyDisplayName: "despacit mods",
      },
    24: {
        title: "Experienced II",
        description(){return "Your experience² allows you to complete mods 2x faster"},

        cost: new Decimal(69),
        unlocked(){return (hasUpgrade("d",23))},
        canAfford(){return player.d.points.gte(this.cost)},
        pay(){

             },
        currencyDisplayName: "despacit mods",
      },
    25: {
        title: "Better hacks",
        description(){return "You have a 50% chance of skipping a layer"},

        cost: new Decimal(100),
        unlocked(){return (hasUpgrade("d",24))},
        canAfford(){return player.d.points.gte(this.cost)},
        pay(){

             },
        currencyDisplayName: "despacit mods",
      },
    26: {
        title: "Not very finished",
        description(){return "If a mod has 5 or 6 layers, reduce it to 2"},

        cost: new Decimal(150),
        unlocked(){return (hasUpgrade("d",25))},
        canAfford(){return player.d.points.gte(this.cost)},
        pay(){

             },
        currencyDisplayName: "despacit mods",
      },
    31: {
        title: "^",
        description(){return "Square the <strike>prestige</strike> <b>Time Skips</b> effect"},

        cost: new Decimal(200),
        unlocked(){return (hasUpgrade("d",25))},
        canAfford(){return player.d.points.gte(this.cost)},
        pay(){

             },
        currencyDisplayName: "despacit mods",
      },
    32: {
        title: "√",
        description(){return "Square root the time required to complete layers"},

        cost: new Decimal(300),
        unlocked(){return (hasUpgrade("d",31))},
        canAfford(){return player.d.points.gte(this.cost)},
        pay(){

             },
        currencyDisplayName: "despacit mods",
      },
    33: {
        title: "Contentless",
        description(){return "Each mod has 1 layer"},

        cost: new Decimal(500),
        unlocked(){return (hasUpgrade("d",32))},
        canAfford(){return player.d.points.gte(this.cost)},
        pay(){

             },
        currencyDisplayName: "despacit mods",
      },
    34: {
        title: "Save editing",
        description(){return "You have a 80% chance of skipping a layer"},

        cost: new Decimal(750),
        unlocked(){return (hasUpgrade("d",33))},
        canAfford(){return player.d.points.gte(this.cost)},
        pay(){

             },
        currencyDisplayName: "despacit mods",
      },
    35: {
        title: "Absolute Zero",
        description(){return "Everything is completely abandoned, and every tree is the default tree."},

        cost: new Decimal(1000),
        unlocked(){return (hasUpgrade("d",34))},
        canAfford(){return player.d.points.gte(this.cost)},
        pay(){

             },
        currencyDisplayName: "despacit mods",
      },
    36: {
        title: "Autoclicker",
        description(){return "Unlock a buyable and beat 100 mods per second"},

        cost: new Decimal(1500),
        unlocked(){return (hasUpgrade("d",35))},
        canAfford(){return player.d.points.gte(this.cost)},
        pay(){

             },
        currencyDisplayName: "despacit mods",
      },
    41: {
        title: "What?",
        description(){return "The antimatter effect multiplies distance and make despacit create 1e100 more mods"},

        cost: new Decimal(1e6),
        unlocked(){return (hasUpgrade("d",36)&&player.d.points.gte(1e6))},
        canAfford(){return player.d.points.gte(this.cost)},
        pay(){

             },
        currencyDisplayName: "despacit mods",
      },
    42: {
        title: "Super autoclicker",
        description(){return "Add 0.1 to the autoclicker improvement base, despacit mods multiply time speed and all dimensions"},

        cost: new Decimal(1e7),
        unlocked(){return (hasUpgrade("d",41))},
        canAfford(){return player.d.points.gte(this.cost)},
        pay(){

             },
        currencyDisplayName: "despacit mods",
      },
    43: {
        title: "Real",
        description(){return "Release the reality update and remove the 9th dimension hardcap"},

        cost: new Decimal(1e100),
        unlocked(){return (hasUpgrade("d",42))},
        canAfford(){return player.d.points.gte(this.cost)},
        pay(){

             },
        currencyDisplayName: "despacit mods",
      },
    44: {
        title: "???",
        description(){return "There can be 1.8e308 despacit mods, but square root the prestige effect"},

        cost: new Decimal(1e100),
        unlocked(){return (hasUpgrade("d",43))},
        canAfford(){return player.d.points.gte(this.cost)},
        pay(){

             },
        currencyDisplayName: "despacit mods",
      },
    45: {
        title: "??????",
        description(){return "Prestige points and distance multiply points"},

        cost: new Decimal(Number.MAX_VALUE),
        unlocked(){return (hasUpgrade("d",44))},
        canAfford(){return player.d.points.gte(this.cost)},
        pay(){

             },
        currencyDisplayName: "despacit mods",
      },
    46: {
        title: "??????",
        description(){return "Prestige points and distance multiply points"},

        cost: new Decimal(Number.MAX_VALUE),
        unlocked(){return (hasUpgrade("d",44))},
        canAfford(){return player.d.points.gte(this.cost)},
        pay(){

             },
        currencyDisplayName: "despacit mods",
      },
  },
  buyables: {
    11: {title:"Autoclicker Improvement",
        cost() { return new Decimal(1000).mul(Decimal.pow(2,getBuyableAmount(this.layer, this.id))) },
        display() { return "Double autoclicker speed\nRequires: "+format(this.cost())+" mods\n\Effect: x"+format(this.effect())+" to autoclicker speed"},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          
        },
         effect(){return Decimal.pow(hasUpgrade(this.layer,42)?2.1:2,getBuyableAmount(this.layer, this.id))},
        unlocked(){return hasUpgrade("d",36)},
    },
  },
  bars: {
    progress: {
        direction: RIGHT,
        width: 400,
        height: 50,
        progress() { return player.d.points.plus(layers.d.bars.progress2.progress()).div(hasUpgrade("d",44)?new Decimal(Number.MAX_VALUE).times(hasUpgrade("w",15)?player.w.points.max(1):1):hasUpgrade("d",41)?new Decimal(1e100):hasUpgrade(this.layer,22)?new Decimal(1e6):32) },
        unlocked(){return player.d.unlocked},
      display(){return "Progress to completing all despacit mods: "+format(this.progress().times(100))+"%"},
      fillStyle(){return {'background-color':"#0080ff"}},
    },
    progress2: {
        direction: RIGHT,
        width: 400,
        height: 50,
        progress() { return player.d.layers.plus(layers.d.bars.progress3.progress()).div(player.d.max) },
        unlocked(){return player.d.unlocked},
      display(){return "Progress to completing the current mod: "+format(this.progress().times(100))+"%"},
      fillStyle(){return {'background-color':"#0080ff"}},
    },
    progress3: {
        direction: RIGHT,
        width: 400,
        height: 50,
        progress() { return player.d.progress.div(player.d.req) },
        unlocked(){return player.d.unlocked},
      display(){return "Progress to completing the current layer: "+format(this.progress().times(100))+"%"},
      fillStyle(){return {'background-color':"#0080ff"}},
    },

},
  tabFormat: [


    ["prestige-button","",function(){if(player.d.unlocked){return {"display":"none"}}}],
    "blank",

    ["display-text",function(){
      if(player.d.unlocked){return "You have finished "+format(player.d.points)+"/"+format(hasUpgrade("d",44)?new Decimal(Number.MAX_VALUE).times(hasUpgrade("w",15)?player.w.points.max(1):1):hasUpgrade("d",41)?new Decimal(1e100):hasUpgrade("d",22)?new Decimal(1e6):32)+" despacit mods."}
    }],
    "blank",

    ["display-text",function(){
      if(player.d.unlocked){return "You have completed "+format(player.d.layers)+"/"+format(player.d.max)+" layers of the current mod."}
    }],
    "blank",
["display-text",function(){
      if(player.d.unlocked){return "You have spent "+format(player.d.progress)+" seconds trying to finish the current layer, which should take around "+format(player.d.req)+" seconds."}
    }],
    "blank",
    ["bar","progress"],
    ["bar","progress2"],
    ["bar","progress3"],
    "blank",
    ["display-text",function(){
      if(player.d.unlocked){return "Upgrades don't spend anything."}
    }],
    "blank",
    "upgrades",
    "blank",
    "buyables"
      ],
doReset(l){

},
})
addLayer("ch", {
    name: "Choices", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CH", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
      done:0,
    }},
  branches:["l"],

    color: "#ffffff",
    requires(){
      
      let r= new Decimal("1e696969696")
               return r
    }, 
  getResetGain(){return new Decimal(0)},

  getNextAt(){return this.requires()},
  canReset(){
    
    return player.points.gte(this.requires())},
  prestigeButtonText(){return  "Unlock The Choice"},
  resetsNothing(){return true},
    resource: "Choices", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
      if(inChallenge("s",12))return new Decimal(0)
        mult = new Decimal(1)

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "h", description: "h: unlock choices", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player[this.layer].unlocked||hasUpgrade("d",46)},
  upgrades: {
      
    11: {
        title: "XYZ",
        description(){return "Unlock XYZ minigame"},

        cost(){return player.ch.upgrades.length},
        unlocked(){return (player.ch.unlocked)},
        canAfford(){return player.ch.upgrades.length<=player.ch.done},
        pay(){
          
             },
        currencyDisplayName: "minigames completed",
      },
    12: {
        title: "AB",
        description(){return "Unlock AB minigame"},

        cost(){return player.ch.upgrades.length},
        unlocked(){return (player.ch.unlocked)},
        canAfford(){return player.ch.upgrades.length<=player.ch.done},
        pay(){

             },
        currencyDisplayName: "minigames completed",
      },
    13: {
        title: "Meta",
        description(){return "Unlock meta layers minigame"},

        cost(){return player.ch.upgrades.length},
        unlocked(){return (player.ch.unlocked)},
        canAfford(){return player.ch.upgrades.length<=player.ch.done},
        pay(){

             },
        currencyDisplayName: "minigames completed",
      },
    14: {
        title: "atomic",
        description(){return "Unlock superscaled minigame"},

        cost(){return player.ch.upgrades.length},
        unlocked(){return (player.ch.unlocked)},
        canAfford(){return player.ch.upgrades.length<=player.ch.done},
        pay(){

             },
        currencyDisplayName: "minigames completed",
      },
    15: {
        title: "Nerfed",
        description(){return "Unlock whack a clickable minigame"},

        cost(){return player.ch.upgrades.length},
        unlocked(){return (player.ch.unlocked)},
        canAfford(){return player.ch.upgrades.length<=player.ch.done},
        pay(){

             },
        currencyDisplayName: "minigames completed",
      },
  },
milestones: {
    0: {
        requirementDescription: "1 minigame",
        effectDescription: "remove the last point gain softcap",
        done() { return player.ch.done>=1},
      unlocked(){return true},
    },
  1: {
        requirementDescription: "2 minigames",
        effectDescription: "The prestige effect root is now a cube root instead of a 6th root",
        done() { return player.ch.done>=2},
      unlocked(){return hasMilestone(this.layer,0)},
    },
  2: {
        requirementDescription: "3 minigames",
        effectDescription: "<b>2 minigames</b> also affects super prestige, and aarex timewalls' 2nd effect ^(aarex timewalls)",
        done() { return player.ch.done>=3},
      unlocked(){return hasMilestone(this.layer,1)},
    },
  3: {
        requirementDescription: "4 minigames",
        effectDescription: "The prestige point softcap start is multiplied by prestige points and remove <b>???</b>'s negative effect",
        done() { return player.ch.done>=4},
      unlocked(){return hasMilestone(this.layer,2)},
    },
  4: {
        requirementDescription: "5 minigames",
        effectDescription: "<b>Pathogens</b> gains more effects and AB buyables don't spend your AB",
        done() { return player.ch.done>=5},
      unlocked(){return hasMilestone(this.layer,3)},
    },
},
  update(diff){
if(!player.ch.unlocked){return}
if(hasUpgrade("ch",11))player.xyz.unlocked=true
    if(hasUpgrade("ch",12))player.ab.unlocked=true
    if(hasUpgrade("ch",13))player.ml.unlocked=true
    if(hasUpgrade("ch",14))player.ss.unlocked=true
    if(hasUpgrade("ch",15))player.w.unlocked=true
    let finished = 0
    if(hasMilestone("xyz",1))finished+=1
    if(getBuyableAmount("ml",21).round().eq(1))finished+=1
    if(player.ss.points.gte("ee4550"))finished+=1
    if(hasUpgrade("ab",25))finished+=1
    if(hasUpgrade("w",15))finished+=1
    player.ch.done=finished
  },

  tabFormat: [


    ["prestige-button","",function(){if(player.ch.unlocked){return {"display":"none"}}}],
"blank",
    "upgrades",
"blank","milestones",
      ],
doReset(l){

},

})
addLayer("xyz", {
    name: "XYZ", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "XYZ", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
      done:false,
      x: new Decimal(1),
      y: new Decimal(1),
      z: new Decimal(1),
      gps: new Decimal(0),
    }},
  branches:["ch"],

    color: "#ff0000",
    requires(){
      
      let r= new Decimal("1")
               return r
    }, 
  getResetGain(){return new Decimal(0)},

  getNextAt(){return this.requires()},
  canReset(){
    
    return false},
  prestigeButtonText(){return  ""},
  resetsNothing(){return true},
    resource: "XYZ points", // Name of prestige currency
    baseResource: "choices", // Name of resource prestige is based on
    baseAmount() {return player.ch.points}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
      if(inChallenge("s",12))return new Decimal(0)
        mult = new Decimal(1)

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player[this.layer].unlocked},
  upgrades: {
      
    11: {
        title: "xyz",
        description(){return "Start generating XYZ points based on your xyz"},

        cost(){return new Decimal(1)},
        unlocked(){return (player.xyz.unlocked)},
        canAfford(){return player.xyz.x.gte(this.cost())},
        pay(){

             },
        currencyDisplayName: "x",
      },
    12: {
        title: "x",
        description(){return "x is higher based on your xyz points"},

        cost(){return new Decimal(10)},
        unlocked(){return (player.xyz.unlocked)},
        canAfford(){return player.xyz.points.gte(this.cost())},
        pay(){

             },
        currencyDisplayName: "xyz points",
      },
    13: {
        title: "y",
        description(){return "y is higher based on your xyz points"},

        cost(){return new Decimal(40)},
        unlocked(){return (player.xyz.unlocked)},
        canAfford(){return player.xyz.points.gte(this.cost())},
        pay(){

             },
        currencyDisplayName: "xyz points",
      },
    14: {
        title: "z",
        description(){return "z is higher based on your xyz"},

        cost(){return new Decimal(200)},
        unlocked(){return (player.xyz.unlocked)},
        canAfford(){return player.xyz.points.gte(this.cost())},
        pay(){

             },
        currencyDisplayName: "xyz points",
      },
    15: {
        title: "z",
        description(){return "z boosts x ^0.1"},

        cost(){return new Decimal(6)},
        unlocked(){return (player.xyz.unlocked)},
        canAfford(){return player.xyz.z.gte(this.cost())},
        pay(){

             },
        currencyDisplayName: "z",
      },
    21: {
        title: "xy",
        description(){return "log(x) multiplies y"},

        cost(){return new Decimal(10000)},
        unlocked(){return (player.xyz.unlocked)},
        canAfford(){return player.xyz.points.gte(this.cost())},
        pay(){

             },
        currencyDisplayName: "xyz points",
      },
    22: {
        title: "zyx",
        description(){return "Per upgrade add 0.02 to the exponent of the xyz multiplier to xyz point gain"},

        cost(){return new Decimal(800)},
        unlocked(){return (player.xyz.unlocked)},
        canAfford(){return player.xyz.x.times(player.xyz.y.times(player.xyz.z)).gte(this.cost())},
        pay(){

             },
        currencyDisplayName: "xyz",
      },
    23: {
        title: "2.x",
        description(){return "x is multiplied by the TMT version that this mod is using"},

        cost(){return new Decimal(1e5)},
        unlocked(){return (player.xyz.unlocked)},
        canAfford(){return player.xyz.points.gte(this.cost())},
        pay(){

             },
        currencyDisplayName: "xyz points",
      },
    24: {
        title: "zzz",
        description(){return "z boosts itself"},

        cost(){return new Decimal(40)},
        unlocked(){return (player.xyz.unlocked)},
        canAfford(){return player.xyz.y.gte(this.cost())},
        pay(){

             },
        currencyDisplayName: "y",
      },
    25: {
        title: "xxyyzz",
        description(){return "unlock a buyable"},

        cost(){return new Decimal(1e7)},
        unlocked(){return (player.xyz.unlocked)},
        canAfford(){return player.xyz.points.gte(this.cost())},
        pay(){

             },
        currencyDisplayName: "xyz points",
      },
    31: {
        title: "zzyzx",
        description(){return "multiply x by number of upgrades"},

        cost(){return new Decimal(1e22)},
        unlocked(){return (hasMilestone("xyz",0))},
        canAfford(){return player.xyz.points.gte(this.cost())},
        pay(){

             },
        currencyDisplayName: "xyz points",
      },
    32: {
        title: "yxxz",
        description(){return "ln(yxxz) adds to base z"},

        cost(){return new Decimal(2e27)},
        unlocked(){return (hasMilestone("xyz",0))},
        canAfford(){return player.xyz.points.gte(this.cost())},
        pay(){

             },
        currencyDisplayName: "xyz points",
      },
    33: {
        title: "PATHOGENS",
        description(){return "the length of <b>Pathogens</b>'s description multiplies x"},

        cost(){return new Decimal(1e40)},
        unlocked(){return (hasMilestone("xyz",0))},
        canAfford(){return player.xyz.points.gte(this.cost())},
        pay(){

             },
        currencyDisplayName: "xyz points",
      },
    34: {
        title: "zxzxz",
        description(){return "xyz points boosts z at a reduced rate"},

        cost(){return new Decimal(3e51)},
        unlocked(){return (hasMilestone("xyz",0))},
        canAfford(){return player.xyz.points.gte(this.cost())},
        pay(){

             },
        currencyDisplayName: "xyz points",
      },
    35: {
        title: "yxz",
        description(){return "the product of the number of x, y, and z in this upgrade's display multiplies xyz point gain, x, y, and z."},

        cost(){return new Decimal(5e98)},
        unlocked(){return (hasMilestone("xyz",0))},
        canAfford(){return player.xyz.points.gte(this.cost())},
        pay(){

             },
        currencyDisplayName: "xyz points",
      },

  },
  convertNumberToID(x){
    x=Number(x.toString())
    let tens = Math.floor(x/5)
    let ones = x%5
    if(ones==0)ones=-5
    return tens*10+ones+10
  },
  buyables: {
    11: {
        cost() {
          let n = getBuyableAmount(this.layer,this.id)
          if (n.gte(2500))n=new Decimal("10^^10")
          if (n.gt(2000))n=n.pow(4).div(2000**3)
          return new Decimal(1e8).times(Decimal.pow(100,n.pow(1.3))) },
        display() { return "Reset upgrades and points but x,y,z *3\nCurrently: "+format(this.effect())+"\nRequires: "+format(this.cost())+" xyz points\n\nYou have reset "+format(getBuyableAmount(this.layer,this.id))+" times." },
      effect(){return new Decimal(3).pow(getBuyableAmount(this.layer,this.id))},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
      unlocked(){return hasUpgrade(this.layer,25)||getBuyableAmount(this.layer,this.id).gte(1)},
        buy() {
          if(!hasUpgrade("al",22)){
            player[this.layer].points = new Decimal(0)
          player.xyz.x=new Decimal(1)
          player.xyz.y=new Decimal(1)
          player.xyz.z=new Decimal(1)
          }
          if(hasMilestone(this.layer,0)) {
            let keep=[]
            let b=new Decimal(1)
            while(b.lte(getBuyableAmount(this.layer,this.id))&&b.lte(15)){
              let id = layers.xyz.convertNumberToID(b)

              if(hasUpgrade("xyz",id))
              keep.push(id)
              b=b.plus(1)
            }
 
            player.xyz.upgrades=keep
          }else{
            player.xyz.upgrades=[]
          }
          
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },

    },

},
  milestones: {
    0: {
        requirementDescription: "5 resets",
        effectDescription: "keep an upgrade every reset up to 15, unlock another row of upgrades",
        done() { return getBuyableAmount("xyz",11).gte(5)},
      unlocked(){return getBuyableAmount("xyz",11).gte(1)},
    },
1: {
        requirementDescription: "27 resets",
        effectDescription: "xyz points multiply all dimensions and finish the xyz minigame",
        done() { return getBuyableAmount("xyz",11).gte(27)},
      unlocked(){return getBuyableAmount("xyz",11).gte(25)},
    },
},
  update(diff){
if(!player.xyz.unlocked){return}
    let xyz = player.xyz.x.times(player.xyz.y.times(player.xyz.z))
    if(hasUpgrade(this.layer,22))xyz=xyz.pow(new Decimal(1).plus(player.xyz.upgrades.length/50))
    if(hasUpgrade(this.layer,35))xyz=xyz.times(125)
    if(player.b.clickables[13]==3||hasMilestone("b",10))xyz=xyz.pow(tmp.b.effect.min(1.65))
    if(hasUpgrade("al",15))xyz = xyz.mul(Decimal.pow(player.points.max(10).log10(), getBuyableAmount("an",12)))
    if (hasMilestone("an",4))xyz = xyz.pow(player.bars.progressBars.bar4.add(1).pow(0.4))
    player.xyz.gps=xyz
if(hasUpgrade(this.layer,11))player.xyz.points=player.xyz.points.plus(player.xyz.gps.times(diff))
    let newX = new Decimal(1)
    let newY = new Decimal(1)
    let newZ = new Decimal(1)
    if(hasUpgrade(this.layer,12))newX=newX.times(player.xyz.points.plus(1).log10().plus(1))
    if(hasUpgrade(this.layer,13))newY=newY.times(player.xyz.points.plus(1).pow(0.2))
    if(hasUpgrade(this.layer,14))newZ=newZ.times(xyz.plus(1).ln().plus(1))
    if(hasUpgrade(this.layer,15))newX=newX.times(player.xyz.z.pow(0.1).max(1))
    if(hasUpgrade(this.layer,21))newY=newY.times(player.xyz.x.plus(1).log10().plus(1))
    if(hasUpgrade(this.layer,23))newX=newX.times(2.6)
    if(hasUpgrade(this.layer,24))newZ=newZ.times(player.xyz.z.plus(1).ln().plus(1))
    if(hasUpgrade(this.layer,31))newX=newX.times(player.xyz.upgrades.length)
    if(hasUpgrade(this.layer,32))newZ=newZ.times(xyz.times(player.xyz.x).add(1).ln().add(1))
    if(hasUpgrade(this.layer,33))newX=newX.times(layers.di.upgrades[21].description().length)
    if(hasUpgrade(this.layer,34))newZ=newZ.times(xyz.pow(0.1234).max(1))
    if(hasUpgrade(this.layer,35))newX=newX.times(125)
    if(hasUpgrade(this.layer,35))newY=newY.times(125)
    if(hasUpgrade(this.layer,35))newZ=newZ.times(125)
    player.xyz.x=newX.times(buyableEffect("xyz",11))
    player.xyz.y=newY.times(buyableEffect("xyz",11))
    player.xyz.z=newZ.times(buyableEffect("xyz",11))
    if(hasUpgrade("an",14)){
      if(layers.xyz.buyables[11].canAfford())layers.xyz.buyables[11].buy()
    }
  },

  tabFormat: [

"main-display",
    ["display-text",function(){
      let s=""
      s+="Your x is "+format(player.xyz.x)
      s+=", your y is "+format(player.xyz.y)
      s+=", and your z is "+format(player.xyz.z)+"<br>"
      s+="xyz = "+format(player.xyz.x.times(player.xyz.y.times(player.xyz.z)))
      return s
    }],
"blank",
    ["display-text",function(){
      let s="You are gaining "+format(player.xyz.gps)+" xyz points per second"
      return s}],
    "blank",
    "upgrades",
    "blank",
    "buyables",
    "blank",
    "milestones"
      ],
doReset(l){

},

})
addLayer("ml", {
    name: "meta", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ML", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
      done:false,
layers: new Decimal(0),
trees: new Decimal(0),
      metatrees: new Decimal(0)
    }},
  branches:["ch"],

    color: "#ffff00",
    requires(){
      
      let r= new Decimal("1")
               return r
    }, 
  getResetGain(){return new Decimal(0)},

  getNextAt(){return this.requires()},
  canReset(){
    
    return false},
  prestigeButtonText(){return  ""},
  resetsNothing(){return true},
    resource: "meta layers", // Name of prestige currency
    baseResource: "choices", // Name of resource prestige is based on
    baseAmount() {return player.ch.points}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
      if(inChallenge("s",12))return new Decimal(0)
        mult = new Decimal(1)

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player[this.layer].unlocked},

buyables: {
    11: {
        cost() {
          if(player[this.layer].points.eq(0))return new Decimal(0)
          return Decimal.pow(2,getBuyableAmount(this.layer,this.id).sub(1)) },
        display() { return "Gain 1 meta layer.\nCurrently: +"+format(this.effect())+"\nRequires: "+format(this.cost())+" layers" },
      effect(){return getBuyableAmount(this.layer,this.id)},
        canAfford() { return player[this.layer].layers.gte(this.cost()) },
      unlocked(){return player[this.layer].unlocked},
        buy() {
          if(hasUpgrade(this.layer,31)){
            player[this.layer].points = player.ml.layers.times(4).max(1).log(2).floor()
          }
          else
            player[this.layer].points = player[this.layer].points.plus(1)
          
            setBuyableAmount(this.layer, this.id, player[this.layer].points)
        },

    },
12: {
  costBase(){
    let b=new Decimal(10)
    if(hasUpgrade("ml",22))b=b.div(buyableEffect("ml",13))
    if(player.b.clickables[13]==2||hasMilestone("b",10))b=b.root(tmp.b.effect)
    return b
  },
        cost() {
          
          return Decimal.pow(this.costBase(),player.ml.trees).sub(1) },
        display() { return "Collapse your layers into trees.\nCurrently: "+format(player.ml.trees)+" trees, multiplying layers by "+format(this.effect())+(player.ml.trees.gt(100)&&!hasUpgrade("ml",42)?" (nerfed)":"")+"\nRequires: at least "+format(this.cost())+" layers\n\nYou can collapse your layers into +"+(this.canAfford()?format(player[this.layer].layers.plus(1).log(this.costBase()).sub(player.ml.trees)):0)+" trees." },
      effect(){
        let power = new Decimal(1)
        if(hasUpgrade("ml",14))power=power.plus(player.ml.upgrades.length)
        let x=player.ml.trees
        if(x.gte(100)&&!hasUpgrade("ml",42))x=x.times(100).sqrt()
        return x.pow(power).plus(1)},
        canAfford() { return player[this.layer].layers.plus(1).log(this.costBase()).gte(player[this.layer].trees) },
      unlocked(){return hasUpgrade("ml",12)},
        buy() {
            player[this.layer].trees = player[this.layer].layers.plus(1).log(this.costBase())
          if(!hasUpgrade("ml",24))player.ml.layers=new Decimal(1)
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },

    },
  13: {
        cost() {
          return Decimal.pow(2,player.ml.metatrees).times(hasUpgrade("an",13)?20:32)},
        display() { return "Collapse your trees into metatrees.\nCurrently: "+format(player.ml.metatrees)+" metatrees, reducing tree scaling by /"+format(this.effect())+(this.effect().gt(9)?" (nerfed^2)":this.effect().gt(4)?" (nerfed)":"")+"\nRequires: at least "+format(this.cost())+" trees\n\nYou can collapse your trees into +"+(this.canAfford()?format(player[this.layer].trees.div(hasUpgrade("an",13)?20:32).log(2).sub(player.ml.metatrees)):0)+" metatrees." },
      effect(){

        let x= player.ml.metatrees.plus(1).sqrt().pow(hasUpgrade("ml",23)?2:1)
        if(x.gt(4))x=x.sqrt().times(2)
        if(x.gt(9))x=x.add(1).log10().add(8)
        return x
        },
        canAfford() { return player[this.layer].trees.div(hasUpgrade("an",13)?20:32).log(2).gte(player[this.layer].metatrees) },
      unlocked(){return hasUpgrade("ml",22)},
        buy() {
            player[this.layer].metatrees = player[this.layer].trees.div(hasUpgrade("an",13)?20:32).log(2)
          if(!hasUpgrade("ml",33))player.ml.trees=new Decimal(1)
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },

    },
  21: {
        cost() {
          return new Decimal(Number.MAX_VALUE)},
        display() { return "Finish this minigame, and layers boost time speed. Requires 1.79e308 layers." },

        canAfford() { return player[this.layer].layers.gte(this.cost())&&getBuyableAmount(this.layer,this.id).lt(1) },
      unlocked(){return hasUpgrade("ml",51)},
        buy() {
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },

    },
},
  upgrades: {
      
    11: {
        title: "layers",
        description(){return "Meta layers produce layers"},

        cost(){return new Decimal(0)},
        unlocked(){return (player.ml.unlocked)},
        canAfford(){return player.ml.layers.gte(this.cost())},
        pay(){
player.ml.layers=player.ml.layers.sub(this.cost())
             },
        currencyDisplayName: "layers",
      },
    12: {
        title: "Tree",
        description(){return "Layers can collapse into a prestige tree"},

        cost(){return new Decimal(250)},
        unlocked(){return (hasUpgrade(this.layer,11))},
        canAfford(){return player.ml.layers.gte(this.cost())},
        pay(){
player.ml.layers=player.ml.layers.sub(this.cost())
             },
        currencyDisplayName: "layers",
      },
    13: {
        title: "Prestige",
        description(){return "Each completed prestige tree doubles base layer gain\nCurrently: x"+format(this.effect())},
effect(){
  let t=player.ml.trees.floor()
  if(t.gt(400))t=t.sqrt().times(20)
  let f= Decimal.pow(2,t)

return f},
        cost(){return new Decimal(5000)},
        unlocked(){return (hasUpgrade(this.layer,12))},
        canAfford(){return player.ml.layers.gte(this.cost())},
        pay(){
player.ml.layers=player.ml.layers.sub(this.cost())
             },
        currencyDisplayName: "layers",
      },
    14: {
        title: "Power",
        description(){return "Each upgrade adds 1 to the exponent of the 2nd buyable's effect"},

        cost(){return new Decimal(10000)},
        unlocked(){return (hasUpgrade(this.layer,13))},
        canAfford(){return player.ml.layers.gte(this.cost())},
        pay(){
player.ml.layers=player.ml.layers.sub(this.cost())
             },
        currencyDisplayName: "layers",
      },
    15: {
        title: "Meta",
        description(){return "<strike>Galaxies</strike> Meta layers are 50% stronger"},

        cost(){return new Decimal(5e11)},
        unlocked(){return (hasUpgrade(this.layer,14))},
        canAfford(){return player.ml.layers.gte(this.cost())},
        pay(){
player.ml.layers=player.ml.layers.sub(this.cost())
             },
        currencyDisplayName: "layers",
      },
    21: {
        title: "Layer boost",
        description(){return "log(layer points) boosts layer gain"},

        cost(){return new Decimal(1e15)},
        unlocked(){return (hasUpgrade(this.layer,15))},
        canAfford(){return player.ml.layers.gte(this.cost())},
        pay(){
player.ml.layers=player.ml.layers.sub(this.cost())
             },
        currencyDisplayName: "layers",
      },
    22: {
        title: "Collapsed",
        description(){return "Allow your trees to collapse into meta trees"},

        cost(){return new Decimal(1e32)},
        unlocked(){return (hasUpgrade(this.layer,21))},
        canAfford(){return player.ml.layers.gte(this.cost())},
        pay(){
player.ml.layers=player.ml.layers.sub(this.cost())
             },
        currencyDisplayName: "layers",
      },
    23: {
        title: "²",
        description(){return "Remove the square root in the 3rd buyable's formula"},

        cost(){return new Decimal(4e35)},
        unlocked(){return (hasUpgrade(this.layer,22))},
        canAfford(){return player.ml.layers.gte(this.cost())},
        pay(){
player.ml.layers=player.ml.layers.sub(this.cost())
             },
        currencyDisplayName: "layers",
      },
    24: {
        title: "a stack of meta-meta-layers",
        description(){return "Creating new prestige trees doesn't consume your layers"},

        cost(){return new Decimal(1e64)},
        unlocked(){return (hasUpgrade(this.layer,23))},
        canAfford(){return player.ml.layers.gte(this.cost())},
        pay(){
player.ml.layers=player.ml.layers.sub(this.cost())
             },
        currencyDisplayName: "layers",
      },
    31: {
        title: "ideas",
        description(){return "You can buy max meta layers"},

        cost(){return new Decimal(1e128)},
        unlocked(){return (hasUpgrade(this.layer,24))},
        canAfford(){return player.ml.layers.gte(this.cost())},
        pay(){
player.ml.layers=player.ml.layers.sub(this.cost())
             },
        currencyDisplayName: "layers",
      },
    32: {
        title: "nerfs",
        description(){return "Meta layers are 100% more powerful"},

        cost(){return new Decimal(1e160)},
        unlocked(){return (hasUpgrade(this.layer,31))},
        canAfford(){return player.ml.layers.gte(this.cost())},
        pay(){
player.ml.layers=player.ml.layers.sub(this.cost())
             },
        currencyDisplayName: "layers",
      },
    33: {
        title: "Rows",
        description(){return "Meta trees no longer reset trees, and nerfs is 2x stronger"},

        cost(){return new Decimal(1e184)},
        unlocked(){return (hasUpgrade(this.layer,32))},
        canAfford(){return player.ml.layers.gte(this.cost())},
        pay(){
player.ml.layers=player.ml.layers.sub(this.cost())
             },
        currencyDisplayName: "layers",
      },
    41: {
        title: "20",
        description(){return "Layer boost is raised to your meta trees"},

        cost(){return new Decimal(1e204)},
        unlocked(){return (hasUpgrade(this.layer,33))},
        canAfford(){return player.ml.layers.gte(this.cost())},
        pay(){
player.ml.layers=player.ml.layers.sub(this.cost())
             },
        currencyDisplayName: "layers",
      },
    42: {
        title: "21",
        description(){return "Remove the 2nd buyable's nerf"},

        cost(){return new Decimal(1e260)},
        unlocked(){return (hasUpgrade(this.layer,41))},
        canAfford(){return player.ml.layers.gte(this.cost())},
        pay(){
player.ml.layers=player.ml.layers.sub(this.cost())
             },
        currencyDisplayName: "layers",
      },
    51: {
        title: "Meta-infinity",
        description(){return "Meta is 69.420% stronger and unlock another buyable"},

        cost(){return new Decimal(1e276)},
        unlocked(){return (hasUpgrade(this.layer,41))},
        canAfford(){return player.ml.layers.gte(this.cost())},
        pay(){
player.ml.layers=player.ml.layers.sub(this.cost())
             },
        currencyDisplayName: "layers",
      },
  },

  update(diff){
if(!player.ml.unlocked){return}
if(hasUpgrade("ml",11)){
  if (hasUpgrade("al",23))player.ml.layers=player.ml.layers.add(player.xyz.points) 
  else player.ml.layers=player.ml.layers.plus(player.ml.points.pow(hasUpgrade("ml",15)?1.5:1).pow(hasUpgrade("ml",51)?1.69420:1).pow(hasUpgrade("ml",32)?2:1).pow(hasUpgrade("ml",33)?2:1).times(diff).times(hasUpgrade("ml",13)?upgradeEffect("ml",13):1).times(buyableEffect(this.layer,12)).times(hasUpgrade(this.layer,21)?player.l.points.plus(1).log10().plus(1).pow(hasUpgrade("ml",41)?player.ml.metatrees:1):1).mul(hasMilestone("an",2)?Decimal.pow(10,player.al.points.add(player.b.points.add(player.an.points))):1))
                       }
    if(hasUpgrade("al",22)){
    buyBuyable(this.layer,11)
    buyBuyable(this.layer,12)
    buyBuyable(this.layer,13)
  }
  },

  tabFormat: [

"main-display",
    ["display-text",function(){
      return "There are "+formatWhole(player.ml.layers)+" layers."
    }],
"blank",
    "blank",
    "buyables",
    "blank",
    "upgrades",
    
    "blank",
    "milestones"
      ],
doReset(l){

},

})
addLayer("ss", {
    name: "superscaled", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SS", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
      done:false,

    }},
  branches:["ch"],

    color: "#00ff00",
    requires(){
      
      let r= new Decimal("1")
               return r
    }, 
  getResetGain(){
    if(!player.ss.unlocked){return new Decimal(0)}
    
    let g= new Decimal(1)
  g=g.times(buyableEffect(this.layer,11)).pow(buyableEffect(this.layer,11).pow(buyableEffect(this.layer,13)))
  
return g},

  getNextAt(){return this.requires()},
  canReset(){
    
    return false},
  prestigeButtonText(){return  ""},
  resetsNothing(){return true},
    resource: "superscaling", // Name of prestige currency
    baseResource: "choices", // Name of resource prestige is based on
    baseAmount() {return player.ch.points}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
      if(inChallenge("s",12))return new Decimal(0)
        mult = new Decimal(1)

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player[this.layer].unlocked},
  buyables: {
    11: {
        cost() {
          let c= Decimal.pow(10,Decimal.pow(2,getBuyableAmount(this.layer,this.id))) 
          if(getBuyableAmount(this.layer,this.id).gt(3))c=c.pow(getBuyableAmount(this.layer,this.id).plus(1).div(4))
          if(getBuyableAmount(this.layer,this.id).gt(10))c=Decimal.pow(10,c.log10().pow(new Decimal(1.1).pow(getBuyableAmount(this.layer,this.id).sub(10).pow(0.98))))
          return c
          },
        display() { return "Double superscaling gain, then square it.\nCurrently: *"+format(this.effect())+", ^"+format(this.effect())+"\nCost: "+format(this.cost())+" superscaling"+(getBuyableAmount(this.layer,this.id).gt(10)?" (superscaled)":getBuyableAmount(this.layer,this.id).gt(3)?" (scaled)":"") },
      effect(){
        let base = new Decimal(2)
        base=base.plus(buyableEffect(this.layer,12))
        return Decimal.pow(base,getBuyableAmount(this.layer,this.id))},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
      unlocked(){return player[this.layer].unlocked},
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer,this.id).plus(1))
        }

    },
    12: {
        cost() {
          let start = new Decimal("1e6781")
          let c= start.times(Decimal.pow(new Decimal("1e5634"),getBuyableAmount(this.layer,this.id).pow(3)))
          if(getBuyableAmount(this.layer,this.id).gt(10))c=c.pow(getBuyableAmount(this.layer,this.id).pow(1.807))
          if(getBuyableAmount(this.layer,this.id).gt(20))c=c.pow(getBuyableAmount(this.layer,this.id).pow(getBuyableAmount(this.layer,this.id).sqrt()))
          if(getBuyableAmount(this.layer,this.id).gt(860))c=Decimal.pow(10,Decimal.pow(10,c.log10().log10().pow(new Decimal(1.1).pow(getBuyableAmount(this.layer,this.id).sub(860).pow(0.2)))))
          return c
          },
        display() { return "Previous buyable base +0.1.\nCurrently: +"+format(this.effect())+"\nCost: "+format(this.cost())+" superscaling"+(getBuyableAmount(this.layer,this.id).gt(20)?" (superscaled)":getBuyableAmount(this.layer,this.id).gt(10)?" (scaled)":"") },
      effect(){return getBuyableAmount(this.layer,this.id).div(10)},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
      unlocked(){return getBuyableAmount("ss",11).gte(11)},
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer,this.id).plus(1))
        }

    },
    13: {
        cost() {
          let start = new Decimal("e1.1821e12")
          let c= start.times(Decimal.pow(new Decimal("e8.7945e103"),Decimal.pow(1e100,getBuyableAmount(this.layer,this.id).pow(0.7910976).sub(1))))
if(getBuyableAmount(this.layer,this.id).gt(2))c=Decimal.pow(10,c.log10().pow(Decimal.pow(1.238614,getBuyableAmount(this.layer,this.id).sub(2).pow(1.3))))
          return c
          },
        display() { return "1st buyable's 2nd effect ^1.5, autobuy 2nd buyable. \nCurrently: ^"+format(this.effect())+"\nCost: "+format(this.cost())+" superscaling"+(getBuyableAmount(this.layer,this.id).gt(2)?" (superscaled)":"") },
      effect(){return Decimal.pow(1.5,getBuyableAmount(this.layer,this.id))},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
      unlocked(){return getBuyableAmount("ss",12).gte(21)},
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer,this.id).plus(1))
        }

    },
  },
  update(diff){
if(!player.ss.unlocked){return}
    for(i=0;i<20;i++){
    if(getBuyableAmount("ss",13).gte(1)&&tmp.ss.buyables[12].canAfford)layers.ss.buyables[12].buy()}
  },
passiveGeneration(){return true},
  tabFormat: [

"main-display",
    ["display-text",function(){
      return ""
    }],
"blank",
    "blank",
    "buyables",
    "blank",
    "upgrades",
    
    "blank",
    "milestones"
      ],
  doReset(l){

},
})
addLayer("ab", {
    name: "AB", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AB", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
      done:false,
cooldown: 0,
      auto: true,
    }},
  branches:["ch"],

    color: "#ff8000",
    requires(){
      
      let r= new Decimal("1")
               return r
    }, 
  getResetGain(){
return new Decimal(0)
},

  getNextAt(){return this.requires()},
  canReset(){
    
    return false},
  prestigeButtonText(){return  ""},
  resetsNothing(){return true},
    resource: "AB reactions", // Name of prestige currency
    baseResource: "choices", // Name of resource prestige is based on
    baseAmount() {return player.ch.points}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
      if(inChallenge("s",12))return new Decimal(0)
        mult = new Decimal(1)

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player[this.layer].unlocked},
  gainFunction(){
    let gain=new Decimal(1).plus(buyableEffect("ab",11))
        if(hasUpgrade("ab",14))gain=gain.plus(buyableEffect("ab",12).pow(hasUpgrade("ab",21)?1.25:1))
        if(hasUpgrade("ab",12))gain=gain.times(2)
        if(hasUpgrade("ab",13))gain=gain.times(upgradeEffect("ab",13))
        if(hasUpgrade("ab",15))gain=gain.times(5)
        if(hasUpgrade("ab",22))gain=gain.times(100)
        if(hasUpgrade("ab",24))gain=gain.times(4000)
        if(player.al.unlocked)gain=gain.mul(layers.al.effect())
        if(hasUpgrade("al",11))gain=gain.mul(Decimal.pow(2,player.ab.buyables[13]).pow(player.b.challenges[11]>=4?1.001:1))
        if(hasUpgrade("an",14))gain=gain.mul(player.xyz.points.max(1))
        if(player.b.clickables[13]==1||hasMilestone("b",10))gain=gain.pow(tmp.b.effect.min(1.48))
    
    return gain
  },
  clickables: {
    11: {
      display() {return "Get someone to react 🆎 to this message"},
        canClick(){return player.ab.cooldown==0&&!hasMilestone("al",1)},
      onClick(){
        let gain = layers.ab.gainFunction()
        player.ab.points=player.ab.points.add(gain);
               player.ab.cooldown=1}
    },
    12: {
      display() {return "Toggle SpamBot\nCurrently: "+(player.ab.auto?"on":"off")},
        canClick(){return true},
      onClick(){
        player.ab.auto=!player.ab.auto}
    }

},
    upgrades: {
      
    11: {
        title: "No, I won't make you keep having to click it.",
        description(){return "Automatically react 🆎"},

        cost(){return new Decimal(10)},
        unlocked(){return (player.ab.unlocked&&player.ab.points.gte(9))||hasUpgrade(this.layer,this.id)},
        canAfford(){return player.ab.points.gte(this.cost())},
        pay(){
player.ab.points=player.ab.points.sub(this.cost())
             },
        currencyDisplayName: "🆎",
      },
      12: {
        title: "🆎 layer",
        description(){return "Creating an 🆎 layer will make the 🆎 more famous, doubling your 🆎 reactions"},

        cost(){return new Decimal(50)},
        unlocked(){return hasUpgrade(this.layer,this.id-1)},
        canAfford(){return player.ab.points.gte(this.cost())},
        pay(){
player.ab.points=player.ab.points.sub(this.cost())
             },
        currencyDisplayName: "🆎",
      },
      13: {
        title: "🆎 role",
        description(){return "The 🆎 role makes more people react 🆎, based on your 🆎. Currently: x"+format(this.effect())},
effect(){return player.ab.points.pow(0.25).plus(1)},
        cost(){return new Decimal(150)},
        unlocked(){return hasUpgrade(this.layer,this.id-1)},
        canAfford(){return player.ab.points.gte(this.cost())},
        pay(){
player.ab.points=player.ab.points.sub(this.cost())
             },
        currencyDisplayName: "🆎",
      },
      14: {
        title: "Not very buyable",
        description(){return "Unlock 🆎uyable"},
        cost(){return new Decimal(1500)},
        unlocked(){return hasUpgrade(this.layer,this.id-1)},
        canAfford(){return player.ab.points.gte(this.cost())},
        pay(){
player.ab.points=player.ab.points.sub(this.cost())
             },
        currencyDisplayName: "🆎",
      },
      15: {
        title: "[🆎]",
        description(){return "The 🆎s are growing and you gain 5x 🆎"},
        cost(){return new Decimal(5000)},
        unlocked(){return hasUpgrade(this.layer,this.id-1)},
        canAfford(){return player.ab.points.gte(this.cost())},
        pay(){
player.ab.points=player.ab.points.sub(this.cost())
             },
        currencyDisplayName: "🆎",
      },
      21: {
        title: "test upgrade",
        description(){return "the second 🆎 channel's messages are ^1.25 as effective"},
        cost(){return new Decimal(30000)},
        unlocked(){return hasUpgrade(this.layer,15)},
        canAfford(){return player.ab.points.gte(this.cost())},
        pay(){
player.ab.points=player.ab.points.sub(this.cost())
             },
        currencyDisplayName: "🆎",
      },
22: {
        title: "Server boosts",
        description(){return "Your server somehow gets 30 boosts which makes more people join and gain 100x 🆎"},
        cost(){return new Decimal(123456)},
        unlocked(){return hasUpgrade(this.layer,21)},
        canAfford(){return player.ab.points.gte(this.cost())},
        pay(){
player.ab.points=player.ab.points.sub(this.cost())
             },
        currencyDisplayName: "🆎",
      },
      23: {
        title: "SpamBot",
        description(){return "You invite 100 bots, which send 100 messages per second"},
        cost(){return new Decimal(1e10)},
        unlocked(){return hasUpgrade(this.layer,22)},
        canAfford(){return player.ab.points.gte(this.cost())},
        pay(){
player.ab.points=player.ab.points.sub(this.cost())
             },
        currencyDisplayName: "🆎",
      },
      24: {
        title: "Nickname",
        description(){return "Gain 3,959x 🆎 but message costs are higher"},
        cost(){return new Decimal(5e11)},
        unlocked(){return hasUpgrade(this.layer,23)},
        canAfford(){return player.ab.points.gte(this.cost())},
        pay(){
player.ab.points=player.ab.points.sub(this.cost())
             },
        currencyDisplayName: "🆎",
      },
      25: {
        title: "🆎🆎🆎🆎🆎🆎",
        description(){return "🆎^(The number of 🆎 emojis in this layer) multiplies 6th dimension production and snap gain"},
        cost(){return new Decimal(1e17)},
        unlocked(){return hasUpgrade(this.layer,24)},
        canAfford(){return player.ab.points.gte(this.cost())},
        pay(){
player.ab.points=player.ab.points.sub(this.cost())
             },
        currencyDisplayName: "🆎",
      },
  },
   buyables: {
    11: {
        cost() {
          return Decimal.mul(10,getBuyableAmount(this.layer,this.id).plus(1).pow(2).pow(hasUpgrade(this.layer,24)?1.5:1))
          },
        display() {return "Create more messages, which makes you get 🆎 reactions faster\nCost: "+format(this.cost())+" 🆎"},
      effect(){
        return getBuyableAmount(this.layer,this.id)},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
      unlocked(){return player[this.layer].unlocked},
        buy() {
            if(!hasMilestone("ch",4))player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer,this.id).plus(1))
        }

    },
     12: {
        cost() {
          return Decimal.mul(100,getBuyableAmount(this.layer,this.id).plus(1).pow(2).pow(hasUpgrade(this.layer,24)?1.5:1))
          },
        display() {return "Create more messages in another channel, which makes you get 🆎 reactions faster\nCost: "+format(this.cost())+" 🆎"},
      effect(){
        return getBuyableAmount(this.layer,this.id)},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
      unlocked(){return hasUpgrade(this.layer,14)},
        buy() {
            if(!hasMilestone("ch",4))player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer,this.id).plus(1))
        }

    },
     13: {
        cost() {
          return Decimal.mul(1e40,Decimal.pow(hasUpgrade("al",12)?2.5:10,getBuyableAmount(this.layer,this.id).pow(player.b.clickables[21]==3?1.22:1.25)))
          },
        display() {return "Get more servers! Each server doubles the 🆎 popularity\nCost: "+format(this.cost())+" 🆎"},
      effect(){
        return getBuyableAmount(this.layer,this.id)},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
      unlocked(){return hasUpgrade("al",11)},
        buy() {
            if(!hasMilestone("ch",4))player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer,this.id).plus(1))
        }

    },
  },
  update(diff){
if(!player.ab.unlocked){return}
    if(hasMilestone("al",1)){
      player.ab.points=player.ab.points.add(layers.ab.gainFunction().mul(diff).mul(9696.96))
    }else{
    player.ab.cooldown=Math.max(player.ab.cooldown-diff,0)
    if(hasUpgrade(this.layer,11)&&tmp.ab.clickables[11].canClick)layers.ab.clickables[11].onClick()}
    if(hasUpgrade(this.layer,23)&&player.ab.auto){
      if(!hasMilestone("b",6)){
      for(i=0;i<5;i++){
        if(layers.ab.buyables[11].canAfford())
      layers.ab.buyables[11].buy()
      if(layers.ab.buyables[12].canAfford())
        layers.ab.buyables[12].buy()
      }}
      else{
        if(layers.ab.buyables[11].canAfford())setBuyableAmount("ab",11,player.ab.points.div(10).cbrt().floor())
        if(layers.ab.buyables[12].canAfford())setBuyableAmount("ab",12,player.ab.points.div(100).cbrt().floor())
        if(layers.ab.buyables[13].unlocked&&layers.ab.buyables[13].canAfford())setBuyableAmount("ab",13,player.ab.points.max(1).log(hasUpgrade("al",12)?2.5:10).sub(40).root(player.b.clickables[21]==3?1.22:1.25).add(1).floor())
      }
    }
  },
  tabFormat: [

"main-display",
    ["display-text",function(){
      return "There are "+formatWhole(getBuyableAmount("ab",11).plus(1).plus(getBuyableAmount("ab",12)))+" messages."
    }],
"blank",
    "clickables",
    "blank",
    "buyables",
    "blank",
    "upgrades",
    
    "blank",
    "milestones"
      ],
  doReset(l){
    
},
})
addLayer("w", {
    name: "whack a clickable", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 4, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
      done:false,
c: 0,
      lastClickTime: 0,
      max: new Decimal(3),
    }},
  branches:["ch"],

    color: "#40a0ff",
    requires(){
      
      let r= new Decimal("1")
               return r
    }, 
  getResetGain(){
return new Decimal(0)
},

  getNextAt(){return this.requires()},
  canReset(){
    
    return false},
  prestigeButtonText(){return  ""},
  resetsNothing(){return true},
    resource: "Whack-A-Clickable points", // Name of prestige currency
    baseResource: "choices", // Name of resource prestige is based on
    baseAmount() {return player.ch.points}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
      if(inChallenge("s",12))return new Decimal(0)
        mult = new Decimal(1)

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player[this.layer].unlocked},
  clickables: {

    11: {
      display() {
        if(this.canClick())
        return "Click me!"
      else return "Don't click me!"},
        canClick(){return player.w.c==0},
      onClick(){
        player.w.points=player.w.points.add(hasUpgrade(this.layer,12)?(player.w.max.div(new Decimal(player.w.lastClickTime).max(0.05)).times(hasUpgrade(this.layer,13)?player.w.points.pow(0.25).plus(1):1)):1)
        player.w.c=Math.floor(Math.random()*9)
        player.w.lastClickTime=0
        }
    },
    12: {
      display() {
        if(this.canClick())
        return "Click me!"
      else return "Don't click me!"},
        canClick(){return player.w.c==1},
      onClick(){
        player.w.points=player.w.points.add(hasUpgrade(this.layer,12)?(player.w.max.div(new Decimal(player.w.lastClickTime).max(0.05)).times(hasUpgrade(this.layer,13)?player.w.points.pow(0.25).plus(1):1)):1)
        player.w.c=Math.floor(Math.random()*9)
        player.w.lastClickTime=0
        }
    },
13: {
      display() {
        if(this.canClick())
        return "Click me!"
      else return "Don't click me!"},
        canClick(){return player.w.c==2},
      onClick(){
        player.w.points=player.w.points.add(hasUpgrade(this.layer,12)?(player.w.max.div(new Decimal(player.w.lastClickTime).max(0.05)).times(hasUpgrade(this.layer,13)?player.w.points.pow(0.25).plus(1):1)):1)
        player.w.c=Math.floor(Math.random()*9)
        player.w.lastClickTime=0
        }
    },
21: {
      display() {
        if(this.canClick())
        return "Click me!"
      else return "Don't click me!"},
        canClick(){return player.w.c==3},
      onClick(){
        player.w.points=player.w.points.add(hasUpgrade(this.layer,12)?(player.w.max.div(new Decimal(player.w.lastClickTime).max(0.05)).times(hasUpgrade(this.layer,13)?player.w.points.pow(0.25).plus(1):1)):1)
        player.w.c=Math.floor(Math.random()*9)
        player.w.lastClickTime=0
        }
    },
22: {
      display() {
        if(this.canClick())
        return "Click me!"
      else return "Don't click me!"},
        canClick(){return player.w.c==4},
      onClick(){
        player.w.points=player.w.points.add(hasUpgrade(this.layer,12)?(player.w.max.div(new Decimal(player.w.lastClickTime).max(0.05)).times(hasUpgrade(this.layer,13)?player.w.points.pow(0.25).plus(1):1)):1)
        player.w.c=Math.floor(Math.random()*9)
        player.w.lastClickTime=0
        }
    },
23: {
      display() {
        if(this.canClick())
        return "Click me!"
      else return "Don't click me!"},
        canClick(){return player.w.c==5},
      onClick(){
        player.w.points=player.w.points.add(hasUpgrade(this.layer,12)?(player.w.max.div(new Decimal(player.w.lastClickTime).max(0.05)).times(hasUpgrade(this.layer,13)?player.w.points.pow(0.25).plus(1):1)):1)
        player.w.c=Math.floor(Math.random()*9)
        player.w.lastClickTime=0
        }
    },
31: {
      display() {
        if(this.canClick())
        return "Click me!"
      else return "Don't click me!"},
        canClick(){return player.w.c==6},
      onClick(){
        player.w.points=player.w.points.add(hasUpgrade(this.layer,12)?(player.w.max.div(new Decimal(player.w.lastClickTime).max(0.05)).times(hasUpgrade(this.layer,13)?player.w.points.pow(0.25).plus(1):1)):1)
        player.w.c=Math.floor(Math.random()*9)
        player.w.lastClickTime=0
        }
    },
32: {
      display() {
        if(this.canClick())
        return "Click me!"
      else return "Don't click me!"},
        canClick(){return player.w.c==7},
      onClick(){
        player.w.points=player.w.points.add(hasUpgrade(this.layer,12)?(player.w.max.div(new Decimal(player.w.lastClickTime).max(0.05)).times(hasUpgrade(this.layer,13)?player.w.points.pow(0.25).plus(1):1)):1)
        player.w.c=Math.floor(Math.random()*9)
        player.w.lastClickTime=0
        }
    },
33: {
      display() {
        if(this.canClick())
        return "Click me!"
      else return "Don't click me!"},
        canClick(){return player.w.c==8},
      onClick(){
        player.w.points=player.w.points.add(hasUpgrade(this.layer,12)?(player.w.max.div(new Decimal(player.w.lastClickTime).max(0.05)).times(hasUpgrade(this.layer,13)?player.w.points.pow(0.25).plus(1):1)):1)
        player.w.c=Math.floor(Math.random()*9)
        player.w.lastClickTime=0
        }
    },


},
upgrades: {
      
    11: {
        title: "Difficulty.",
        description(){return "Reset your whack-a-clickable points, but every 10 clicks the difficulty increases"},

        cost(){return new Decimal(25)},
        unlocked(){return player.w.unlocked},
        canAfford(){return player.w.points.gte(this.cost())},
        pay(){
player.w.points=new Decimal(0)
             },

      },
  12: {
        title: "Z",
        description(){return "The faster you click them, the more points you gain."},

        cost(){return new Decimal(40)},
        unlocked(){return player.w.unlocked},
        canAfford(){return player.w.points.gte(this.cost())},
        pay(){
player.w.points=new Decimal(0)
             },

      },
  13: {
        title: "Y",
        description(){return "Whack-a-clickable points are boosted by your whack-a-clickable points"},

        cost(){return new Decimal(100)},
        unlocked(){return player.w.unlocked},
        canAfford(){return player.w.points.gte(this.cost())},
        pay(){
player.w.points=new Decimal(0)
             },

      },
  14: {
        title: "X",
        description(){return "The time limit hardcap is now a softcap"},

        cost(){return new Decimal(200)},
        unlocked(){return player.w.unlocked},
        canAfford(){return player.w.points.gte(this.cost())},
        

      },
  15: {
        title: "that was fast",
        description(){return "win and whack a clickable points multiply the despacit mod limit"},

        cost(){return new Decimal(500)},
        unlocked(){return player.w.unlocked},
        canAfford(){return player.w.points.gte(this.cost())},
        

      },
      
},
  update(diff){
if(!player.w.unlocked){return}
    player.w.lastClickTime+=diff
    let max=new Decimal(3)
    if(hasUpgrade("w",11))max=max.times(Decimal.pow(0.9,player.w.points.div(10).floor()))
    if(!hasUpgrade(this.layer,14)){
      max=max.max(1)
    }else if(max.lt(1)){
      max=max.sqrt().sqrt()
      if(max.lt(0.6))max=new Decimal(0.6).pow(0.9).times(max.pow(0.1))
    }
    player.w.max=max
    if(max.lte(player.w.lastClickTime)){
      player.w.lastClickTime=0
      let g=player.w.c
      while(player.w.c==g)player.w.c=Math.floor(Math.random()*9)
    }
    if(player.w.points.gt(1000))player.w.points=new Decimal(1000)
  },
  tabFormat: [

"main-display",
    ["display-text",function(){
      return "If you don't click it within "+format(player.w.max)+" seconds, a new clickable will appear."
    }],
    ["display-text",function(){
      return "Points are hardcapped at 1000."
    }],
"blank",
    "clickables",
    "blank",
    "buyables",
    "blank",
    "upgrades",
    
    "blank",
    "milestones"
      ],
  doReset(l){

},
})
const reqs = [new Decimal("e3e9"),new Decimal("e3.04e9"),new Decimal("e3.0825e9"),new Decimal("e3.2e9"),new Decimal("e3.238e9"),new Decimal("e5.6609e9"),new Decimal("e5.7298e9"),
              new Decimal("e7.4e9"),new Decimal("e7.592e9"),new Decimal("e7.6984e9"),new Decimal("e8.38e9"),new Decimal("e8.73e9"),new Decimal("ee11"),
              new Decimal("e1.37e11"),new Decimal("e1.4142e11"),
              new Decimal("e3.1416e15")]
addLayer("b", {
    name: "buffs", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
      best: new Decimal(0),
      energy: new Decimal(0),
      boost1: false,
    }},
effect(){
  if (hasUpgrade("bars",23))return player.b.points.mul(0.015).add(1).min(1.65)
  if(hasMilestone("al",5))return player.al.points.add(player.b.points.add(player.an.points.add(100))).div(100).min(1.45).add(hasUpgrade("al",21)?player.al.points.add(player.b.points.add(player.an.points)).sub(45).div(1000):0)
  
  let f= player.b.best.div(100).add(1)
if(challengeCompletions("b",11)>=2)f=Decimal.pow(1.01,player.b.points.add(hasMilestone("al",0)?player.al.points:0))
         if(challengeCompletions("b",11)>=4){f=f.pow(1.001)}
return f.min(1.4)},
  effectDescription(){return "Raising point gain to the "+format(this.effect(),3)},
  branches:["ch"],
    color: "#cccccc",
    requires(){
      
      let r= new Decimal("e3e9")
      if(hasUpgrade("al",14)){r = new Decimal(1)}
               return r
    }, 
  getResetGain(){return new Decimal(1)},
  getNextAt(){
    if(hasUpgrade("al",14)){
      let cost = new Decimal(10).pow(new Decimal(player.b.points.eq(15)?34900:35700).add(player.b.points.sub(15).pow(Decimal.pow(1.05, player.b.points.sub(16).pow(1.5).max(0))).mul(8000)))
      let base = new Decimal(2)
      if (hasUpgrade("al",22))base=new Decimal(1.9)
      if (hasUpgrade("bars",31))base=new Decimal(1).add(Decimal.pow(0.99,player.bars.progressBars.bar4.mul(100)).mul(0.9))
      if(player.b.points.gte(20)) cost = new Decimal(2).pow(Decimal.pow(base,player.b.points))
      return cost
    }
    return reqs[Number(player.b.points)]},
  canReset(){
    if(hasUpgrade("al",14)){
      return player.ab.points.gte(this.getNextAt())
    }
    return player.points.gte(reqs[Number(player.b.points)])},
  prestigeButtonText(){return  "Reset all previous progress except minigames for 1 buff\nRequires "+format(this.getNextAt())+" "+this.baseResource()},
    resource: "buffs", // Name of prestige currency
    baseResource: ()=>{return hasUpgrade("al",14)?"🆎 reactions": "points"}, // Name of resource prestige is based on
    baseAmount() {
      if(hasUpgrade("al",14)){
      return player.ab.points
    }
      return player.points}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
      if(inChallenge("s",12))return new Decimal(0)
        mult = new Decimal(1)

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 5, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for buffs", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player[this.layer].unlocked||hasMilestone("ch",4)},
  milestones: {
    0: {
        requirementDescription: "1 buff",
        effectDescription: "Keep all challenges, minigame stuff, all buff milestones, antimatter buyables, and the despacit layer never resets.",
        done() { return player.b.best.gte(1) },
    },
    1: {
        requirementDescription: "2 buffs",
        effectDescription: "Keep Super prestige and Antimatter milestones on buff resets",
        done() { return player.b.best.gte(2) },
    },
    2: {
        requirementDescription: "3 buffs",
        effectDescription: "Keep Super prestige and Distance upgrades on buff resets and bulk infinite layer buyables",
        done() { return player.b.best.gte(3) },
    },
    3: {
        requirementDescription: "4 buffs",
        effectDescription: "Keep Aarex and Layer upgrades and buy max aarex timewalls",
        done() { return player.b.best.gte(4) },
    },
    4: {
        requirementDescription: "5 buffs",
        effectDescription: "Keep antimatter upgrades, buy max antimatter buyables, and unlock the first switch",
        done() { return player.b.best.gte(5) },
    },
    5: {
        requirementDescription: "7 buffs",
        effectDescription: "Unlock a 2nd switch and double the energy cap",
        done() { return player.b.best.gte(7) },
      unlocked(){return player.b.best.gte(6)},
    },
    6: {
        requirementDescription: "8 buffs",
        effectDescription: "Every 10 buffs (up to 20) unlock another switch, each milestone multiplies energy by 1.2, and buy max AB buyables and they don't cost anything",
        done() { return player.b.best.gte(8) },
      unlocked(){return player.b.best.gte(7)},
    },
    7: {
        requirementDescription: "10 buffs",
        effectDescription: "double energy storage and apply all effects of the second switch",
        done() { return player.b.best.gte(10) },
      unlocked(){return hasMilestone("b",6)},
    },
    8: {
        requirementDescription: "12 buffs",
        effectDescription(){return "Raise "+(player.b.boost1?"super prestige":"layer point")+" gain to the 1.05th power and remove the super prestige gain nerf"},
        done() { return player.b.best.gte(12) },
      toggles: [["b","boost1"]],
      unlocked(){return hasMilestone("b",7)},
    },
    9: {
        requirementDescription: "13 buffs",
        effectDescription(){return "Unlock challenges"},
        done() { return player.b.best.gte(13) },
      unlocked(){return hasMilestone("b",8)},
    },
    10: {
        requirementDescription: "15 buffs",
        effectDescription(){return "Apply all effects of the 3rd switch and unlock a layer"},
        done() { return player.b.best.gte(15) },
      unlocked(){return hasMilestone("b",9)},
    },
    11: {
        requirementDescription: "19 buffs",
        effectDescription(){return "Per meta layer divide albania cost by 9"},
        done() { return player.b.best.gte(19) },
      unlocked(){return hasMilestone("al",3)},
    },
},
clickables: {
    11: {title: "Click me to change my effect! I am...",
        display() {
          if(player.b.challenges[11]>=1){return "Raising the 2nd layer buyable to the 100th power, 3rd buyable to the 20th power, and 1st buyable to the 4th power"}
          if(player.b.clickables[11]==1){return "Raising the 2nd layer buyable's effect to the 100th power"}
          if(player.b.clickables[11]==2)return "Raising the 3rd layer buyable's effect to the 20th power"
        if(player.b.clickables[11]==3)return "Raising the 1st layer buyable's effect to the 4th power"
        return "doing nothing"},
      canClick(){return player.b.energy.gte(5)},
      onClick(){player.b.energy=player.b.energy.sub(5);
                if(player.b.clickables[11]<2)player.b.clickables[11]+=1
               else player.b.clickables[11]=1},
      onHold(){if(player.b.clickables[11]==3)return
        player.b.clickables[11]=3;player.b.energy=player.b.energy.sub(5)},
      unlocked(){return hasMilestone("b",4)}
    },
  12: {title: "Click me to change my effect! I am...",
        display() {
          if(hasMilestone("b",7)){return "Raising time speed ^1.05, 1st dimension multiplier ^1.2, and prestige effect ^2"}
          if(player.b.clickables[12]==1){return "Raising time speed ^1.05"}
          if(player.b.clickables[12]==2)return "Raising 1st dimension multiplier ^1.2"
        if(player.b.clickables[12]==3)return "Squaring the prestige effect"
          return "doing nothing"
        },
      canClick(){return player.b.energy.gte(5)},
      onClick(){player.b.energy=player.b.energy.sub(5);
                if(player.b.clickables[12]<2)player.b.clickables[12]+=1
               else player.b.clickables[12]=1},
      onHold(){if(player.b.clickables[12]==3)return
        player.b.clickables[12]=3;player.b.energy=player.b.energy.sub(5)},
      unlocked(){return hasMilestone("b",5)}
    },
  13: {title: "Click me to change my effect! I am...",
        display() {
          if(hasMilestone("b",10)){return "Making the buff effect affect AB gain and XYZ points and multiply AB gain"}
          if(player.b.clickables[13]==1){return "Making the buff effect affect AB gain"}
          if(player.b.clickables[13]==2)return "Making the buff effect multiply tree gain"
        if(player.b.clickables[13]==3)return "Making the buff effect affect XYZ points"
        return "doing nothing"},
      canClick(){return player.b.energy.gte(5)},
      onClick(){player.b.energy=player.b.energy.sub(5);
                if(player.b.clickables[13]<2)player.b.clickables[13]+=1
               else player.b.clickables[13]=1},
      onHold(){if(player.b.clickables[13]==3)return
        player.b.clickables[13]=3;player.b.energy=player.b.energy.sub(5)},
      unlocked(){return player.b.best.gte(10)}
    },
  21: {title: "Click me to change my effect! I am...",
        display() {
          
          if(player.b.clickables[21]==1){return "disabling <b>cherry pickers united</b>"}
          if(player.b.clickables[21]==2)return "raising the Albania effect to the 11th power"
        if(player.b.clickables[21]==3)return "reducing 🆎 buyable 3 cost exponent by 0.03"
        return "doing nothing"},
      canClick(){return player.b.energy.gte(5)},
      onClick(){player.b.energy=player.b.energy.sub(5);
                if(player.b.clickables[21]<2)player.b.clickables[21]+=1
               else player.b.clickables[21]=1
               player.al.points=new Decimal(0)
               },
      onHold(){if(player.b.clickables[21]==3)return
        player.b.clickables[21]=3;player.b.energy=player.b.energy.sub(5)
              player.al.points=new Decimal(0)
              },
      unlocked(){return player.b.best.gte(20)}
    },
  
  /*22: {title: "Click me to change my effect! I am...",
        display() {
          
          if(player.b.clickables[22]==1){return "Making buffs root meta layer cost (not yet)"}
          if(player.b.clickables[22]==2)return "Making albanias boost XYZ points (not yet)"
        if(player.b.clickables[22]==3)return "Reducing prestige point cost base by 0.01 (not yet)"
        return "doing nothing"},
      canClick(){return player.b.energy.gte(5)},
      onClick(){player.b.energy=player.b.energy.sub(5);
                if(player.b.clickables[22]<2)player.b.clickables[22]+=1
               else player.b.clickables[22]=1
               player.al.points=new Decimal(0)
               },
      onHold(){if(player.b.clickables[22]==3)return
        player.b.clickables[22]=3;player.b.energy=player.b.energy.sub(5)
              player.al.points=new Decimal(0)
              },
      unlocked(){return player.b.best.gte(30)}
    },*/
},
doReset(l){
if(layers[l].row>this.row){
  let keep =[]
  keep.push("milestones")
layerDataReset(this.layer,keep)
}
},
  update(diff){
    if(!player.b.unlocked)return
    
    if(hasMilestone("b",4)){
      let energyCap = new Decimal(10)
      if(hasMilestone("b",5))energyCap=energyCap.mul(2)
      if(hasMilestone("b",7))energyCap=energyCap.mul(2)
      player.b.energy=player.b.energy.add(new Decimal(diff).mul(hasMilestone("b",6)?Decimal.pow(1.2,player.b.milestones.length):1)).min(energyCap)
    }
    if(inChallenge("b",11)){
      for(i=11;i<=13;i++)
      setClickableState("b",i,0)
      player.b.energy=new Decimal(0)
    }
  },
  challenges: {
    11: {
        name: "Nerf challenge 1",
      goal(){
        if(player.b.challenges[11]>=3)return new Decimal("ee11")
        return new Decimal("1e3e9")},
        challengeDescription(){return "Disable switches and point gain is square rooted (challenge completions+1) times"},
        rewardDescription(){return "You have "+challengeCompletions(this.layer,this.id)+" challenge completions, adding "+challengeCompletions(this.layer,this.id)*2+" effects to <b>Pathogens</b>."},
      unlocked(){return hasMilestone("b",9)},
      completionLimit: 4,
    },
},
  tabFormat: {
"Milestones":{
  content: [
    "main-display",
"blank",
    ["prestige-button",function(){return "Melt your points into"}],
    "blank",
    "resource-display",
    "blank",
    "milestones",
    "blank",
    
    ],
},
    
    "Switches":{
      unlocked(){return hasMilestone("b",4)},
      content:[
        "main-display",
"blank",
    ["prestige-button",function(){return "Melt your points into"}],
    "blank",
    "resource-display",
        "blank",
    ["display-text",function(){return "You have "+format(player.b.energy)+" energy. Switches require 5 energy to use. Holding the clickable gives a different effect than from clicking it."}],
    "blank",
    "clickables",
        ["display-text",function()
         {
           if(!player.b.best.gte(20))return
           return "Using the bottom switch will reset your Albanias"}],
      ]
    },
    "Challenges":{
      unlocked(){return hasMilestone("b",9)},
      content:[
        "main-display",
"blank",
    ["prestige-button",function(){return "Melt your points into"}],
    "blank",
    "resource-display",
        "blank",
    "challenges",
      ]
    },
  }

})
addLayer("al", {
    name: "ALBANIA", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AL", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
      scaling: new Decimal(0),
    }},
  branches:["ab"],

    color: "#08ff20",
  effect(){

      let f=Decimal.pow(player.al.points.add(1),player.al.points.add(1))
      if(hasUpgrade("an",16))f=f.pow(player.ml.metatrees)
    if(hasUpgrade("al",13) && player.b.clickables[21]!=1) f=f.pow(player.al.scaling.add(1).pow(2))
    if(player.b.clickables[21]==2)f=f.pow(11)
    if (hasUpgrade("bars",12))f=f.pow(Decimal.add(1,player.bars.progressBars.bar2.mul(100)))
      return f
    },
    effectDescription(){
      let s = "multiplying AB gain by "+format(this.effect())
      return s
    },
    requires(){
      let extraScaling = player.al.scaling
      let r= new Decimal("1e36")
      r=r.mul(new Decimal(1e4).pow(player.al.points.pow(player.al.points.add(new Decimal(3).mul(player.b.clickables[21]==1 ? 1 : extraScaling.add(1))).div(hasMilestone("an",1)?4.4:4))))
      if (hasUpgrade("bars",13))r=r.pow(0.25)
      if(hasMilestone(this.layer,2))r=r.div(Decimal.pow(Decimal.pow(9.6e96,tmp.an.buyables[13].effect),player.al.points))
      if(hasMilestone("b",11))r=r.div(Decimal.pow(9,player.ml.points))
      if (hasUpgrade("bars",21)){
        r=r.root(player.bars.progressBars.bar3.mul(100).add(1).sqrt())
      }
               return r
    }, 
  getResetGain(){
return new Decimal(1)
},
onPrestige(gain){
  let keep = []
  if(hasMilestone("al",4))keep.push("upgrades")
  layerDataReset("ab",keep)
},
  getNextAt(){return this.requires()},
  canReset(){
    
    return player.ab.points.gte(this.requires())},
  prestigeButtonText(){return "Reset your AB for 1 ALBANIA. Requires: "+format(this.getNextAt())+" AB"},
  resetsNothing(){return true},
    resource: "ALBANIAS", // Name of prestige currency
    baseResource: "AB", // Name of resource prestige is based on
    baseAmount() {return player.ab.points}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 5, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player[this.layer].unlocked||hasMilestone("b",10)},
  clickables: {
    11: {
        display() {
        return "Reduce scaling strengtheners by 1"},
      canClick(){return player.al.scaling.gt(0)},
      onClick(){player.al.scaling=player.al.scaling.sub(1);player.al.points=new Decimal(0)},
      unlocked(){return hasUpgrade("al",14)}
    },
    12: {
        display() {
        return "Remove all upgrades after the second except the 4th"},
      canClick(){return hasUpgrade("al",13)},
      onClick(){player.al.upgrades=player.al.upgrades.filter(x=>x<13||x==14);player.al.scaling=new Decimal(0)},
      unlocked(){return hasUpgrade("al",13)}
    },
  },
  milestones: {
    0: {
        requirementDescription: "ALL 1 ALBANIA",
        effectDescription: "Get a free buff for each ALBANIA",
        done() { return player.al.points.gte(1) },
    },
    1: {
        requirementDescription: "ALL 6 ALBANIAS",
        effectDescription: "Disable the 🆎 clickable but gain 969696% of AB reactions per second",
        done() { return player.al.points.gte(6) },
    },
    2: {
        requirementDescription: "ALL 10 ALBANIAS",
        effectDescription: "Both effects of the 12 buff milestone are always active and divide ALBANIA cost by 9.6e96 per ALBANIA",
        done() { return player.al.points.gte(10) },
    },
    3: {
        requirementDescription: "ALL 11 ALBANIAS",
        effectDescription: "gwa gwa",
        done() { return player.al.points.gte(11) },
    },
    4: {
        requirementDescription: "4 scaling strengtheners",
        effectDescription: "Keep 🆎 upgrades on reset",
        done() { return player.al.scaling.gte(4) },
    },
    5: {
        requirementDescription: "ALL 17 ALBANIAS",
        effectDescription: "The buff effect is 1+(buffs+albanias+anti nerfs)/100 (max 1.45)",
        done() { return player.al.points.gte(17) },
    },
    /*6: {
        requirementDescription: "ALL 22 ALBANIAS",
        effectDescription: "Subtract scaling strengtheners from the anti nerf cost",
        done() { return player.al.points.gte(22) },
    },*/
},
  upgrades: {
      
    11: {
        title: "chocolate covered raisin",
        description(){return "unlock a 3rd buyable"},

        cost(){return new Decimal(3)},
        unlocked(){return hasMilestone("al",0)},
      },
    12: {
        title: ":pricate:",
        description(){return "the 3rd buyable scales less"},

        cost(){return new Decimal(7)},
        unlocked(){return hasMilestone("al",1)},
      },
    
    13: {
        title: "cherry pickers united",
        description(){return "Reset your albanias, but every time you reach 12 their scaling and effect get stronger"},

        cost(){return new Decimal(14)},
        unlocked(){return hasMilestone("al",3)},
      },
    14: {
        title: "asparagues",
        description(){return "Buffs now cost 🆎 reactions"},

        cost(){return new Decimal(8)},
        unlocked(){return hasUpgrade("al",13)},
      },
    
    15: {
        title: "raspberry",
        description(){return "Squashing the Softcaps (unlock an anti-nerf buyable)"},

        cost(){return new Decimal(16)},
        unlocked(){return player.b.best.gte(22)},
      },
    21: {
        title: "corn dogs",
        description(){return "Remove the buff effect limits"},

        cost(){return new Decimal(20)},
        unlocked(){return player.b.best.gte(26)},
      },
    22: {
        title: "uranium",
        description(){return "XYZ reset doesn't reset anything, autobuy ML buyables, and buff scaling base is 1.9"},

        cost(){return new Decimal(21)},
        unlocked(){return player.b.best.gte(27)},
      },
    23: {
        title: "Mildly Spicy Ranch",
        description(){return "Layer gain is now equal to xyz points"},

        cost(){return new Decimal(30)},
        unlocked(){return player.b.best.gte(40)},
      },
    
  },
  update(diff){
if(!player.al.unlocked){return}
if(player.al.points.gt(11) && hasUpgrade("al",13) && player.b.clickables[21]!=1){
  player.al.points=new Decimal(0)
  player.al.scaling=player.al.scaling.add(1)
}
  },
  tabFormat: [

"main-display",
    ["display-text",function(){
      return "You have "+format(player.ab.points)+" AB reactions."
    }],
"blank",
    ["prestige-button",function(){return "gwa"}],
    "clickables",
    "blank",
    "buyables",
    "blank",
    "upgrades",
    "blank",
    ["display-text", function(){
      if(hasUpgrade("al",14)){
        return "You have "+formatWhole(player.al.scaling)+" scaling strengtheners"
      }
    }],
    "blank",
    "milestones"
      ],
})
addLayer("an", {
    name: "Anti Nerfs", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AN", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
      progressBars:{
        bar1: new Decimal(1)
      },
      buffPower: new Decimal(0),
    }},
  branches:["b"],

    color: "#009696",
    requires(){
      
      let r= new Decimal(11).add(Decimal.pow(player.an.points,2))
      if(hasMilestone("al",5))r=r.sub(player.al.scaling)
               return r.round()
    }, 
  getResetGain(){
return new Decimal(1)
},
  getNextAt(){return this.requires()},
  canReset(){
    
    return player.al.points.gte(this.requires())},
  prestigeButtonText(){return "Reset all lower layers for 1 Anti-Nerf. Requires: "+formatWhole(this.requires())+" ALBANIAS"},
    resource: "Anti-Nerfs", // Name of prestige currency
    baseResource: "ALBANIAS", // Name of resource prestige is based on
    baseAmount() {return player.al.points}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 5, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player[this.layer].unlocked||hasMilestone("al",3)},
milestones: {
    0: {
        requirementDescription: "1 Anti-Nerf",
        effectDescription: "The prestige point effect is prestige points^3000 and the super prestige effect is cbrt(super prestige)",
        done() { return player.an.points.gte(1) },
    },
  1: {
        requirementDescription: "2 Anti-Nerfs",
        effectDescription: "Buff point gain is buffs*log(log(points)), remove the 2nd Aarex Timewall effect, and ALBANIA cost scaling /1.1",
        done() { return player.an.points.gte(2) },
    },
  2: {
        requirementDescription: "3 Anti-Nerfs",
        effectDescription: "Per row 6 resource gain 10x the layers",
        done() { return player.an.points.gte(3) },
    },
  
  3: {
        requirementDescription: "4 Anti-Nerfs",
        effectDescription: "Remove the AT and S effects, but prestige effect exponent is 1000*buffs",
        done() { return player.an.points.gte(4) },
    },
  4: {
        requirementDescription: "6 Anti-Nerfs",
        effectDescription: "Hide the first 3 rows but green bar boosts XYZ points",
        done() { return player.an.points.gte(6) },
    unlocked(){return player.bars.unlocked}
    },
},
  
  upgrades: {
      
    11: {
        title: "What's the difference between a buff and an anti-nerf?",
        description(){return "Layer effect is set to 20"},
        cost(){return new Decimal(20)},
        unlocked(){return hasMilestone("an",0)},
      canAfford(){return player.an.buffPower.gte(this.cost())},
      pay(){player.an.buffPower=player.an.buffPower.sub(this.cost())},
      currencyDisplayName: "buff power"
      },
    12: {
        title: "Returning to",
        description(){return "AD effect exponent is set to 20"},
        cost(){return new Decimal(20)},
        unlocked(){return hasUpgrade("an",11)},
      canAfford(){return player.an.buffPower.gte(this.cost())},
      pay(){player.an.buffPower=player.an.buffPower.sub(this.cost())},
      currencyDisplayName: "buff power"
      },
    
    13: {
        title: "the year",
        description(){return "The 3rd meta layer buyable's cost multiplier is set to 20"},
        cost(){return new Decimal(20)},
        unlocked(){return hasUpgrade("an",12)},
      canAfford(){return player.an.buffPower.gte(this.cost())},
      pay(){player.an.buffPower=player.an.buffPower.sub(this.cost())},
      currencyDisplayName: "buff power"
      },
    
    14: {
        title: "2020",
        description(){return "The amount of effects in <b>Pathogens</b> is set to 20"},
        cost(){return new Decimal(20)},
        unlocked(){return hasUpgrade("an",13)},
      canAfford(){return player.an.buffPower.gte(this.cost())},
      pay(){player.an.buffPower=player.an.buffPower.sub(this.cost())},
      currencyDisplayName: "buff power"
      },
    
    15: {
        title: ":trol:",
        description(){return "Time Reversal's 2nd effect ^2020"},
        cost(){return new Decimal(2020)},
        unlocked(){return hasUpgrade("an",14)},
      canAfford(){return player.an.buffPower.gte(this.cost())},
      pay(){player.an.buffPower=player.an.buffPower.sub(this.cost())},
      currencyDisplayName: "buff power"
      },
    
    16: {
        title: "gwards",
        description(){return "<b>20</b> now raises ALBANIA effect"},
        cost(){return new Decimal(20202)},
        unlocked(){return hasUpgrade("an",15)},
      canAfford(){return player.an.buffPower.gte(this.cost())},
      pay(){player.an.buffPower=player.an.buffPower.sub(this.cost())},
      currencyDisplayName: "buff power"
      },
  },
  bars: {
    progress: {
        direction: RIGHT,
        width: 400,
        height: 50,
        progress() { return player.an.progressBars.bar1},
        unlocked(){return player.an.unlocked},
      display(){return "Nerf Strength: "+format(this.progress().times(100))+"%"},
      fillStyle(){return {'background-color':"#009696"}},
    },
},
  update(diff){
if(!player[this.layer].unlocked){return}
player.an.progressBars.bar1 = new Decimal(1).sub(player.an.points.div(100).min(1))
    let gain = player.b.points.sub(hasMilestone("an",1)?0:14)
    if(hasMilestone("an",1))gain=gain.mul(player.points.max(1e10).log10().log10())
    player.an.buffPower = player.an.buffPower.add(gain.mul(diff))
  },
  buyables: {
    11: {
        cost() {
          return Decimal.pow(10, Decimal.pow(hasUpgrade("bars",32)?1.01:1.1, getBuyableAmount(this.layer,this.id).sqr()).mul(1e6))
          },
        display() {return "Reduce point gain softcap strength by 1%\nCost: "+format(this.cost())+" 🆎\nCurrently: -"+format(this.effect())+"%"},
      effect(){
        return getBuyableAmount(this.layer,this.id).min(100)},
        canAfford() { return player.ab.points.gte(this.cost()) },
      unlocked(){return hasUpgrade("al",15)},
        buy() {
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer,this.id).plus(1))
        }

    },
    12: {
        cost() {
          return Decimal.pow(10, Decimal.pow(hasUpgrade("bars",32)?1.01:1.1, getBuyableAmount(this.layer,this.id).sqr()).mul(7e14))
          },
        display() {return "log(points)^"+format(this.effect())+" multiplies XYZ point gain\nCost: "+format(this.cost())+" points"},
      effect(){
        return getBuyableAmount(this.layer,this.id)},
        canAfford() { return player.points.gte(this.cost()) },
      unlocked(){return player.an.buyables[11].gte(2)},
        buy() {
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer,this.id).plus(1))
        }

    },
    13: {
        cost() {
          return Decimal.pow(10, Decimal.pow(hasUpgrade("bars",32)?1.01:1.25, getBuyableAmount(this.layer,this.id).sqr()).mul(1000))
          },
        display() {return "<b>ALL 10 ALBANIAS</b> is raised to the ^"+format(this.effect())+".\nCost: "+format(this.cost())+" XYZ points"},
      effect(){
        return getBuyableAmount(this.layer,this.id)/*.pow(2)*/.mul(100).add(1)},
        canAfford() { return player.xyz.points.gte(this.cost()) },
      unlocked(){return player.an.buyables[12].gte(2)},
        buy() {
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer,this.id).plus(1))
        }

    },
  },
  tabFormat: [

"main-display",
    ["display-text",function(){
      return "You have "+format(player.al.points)+" ALBANIAS."
    }],
"blank",
    ["prestige-button",function(){return "gwa"}],
    ["display-text",function(){
      return "There is "+format(player.an.buffPower)+" buff power."
    }],
    ["bar","progress"],
    "clickables",
    "blank",
    "buyables",
    "blank",
    "upgrades",
    
    "blank",
    "milestones"
      ],
})
addLayer("bars", {
    name: "bars", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "IA", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 4, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
      progressBars:{
        bar1: new Decimal(0),
        bar2: new Decimal(0),
        bar3: new Decimal(0),
        bar4: new Decimal(0)
      },
    }},
  branches:["an"],
generate: true,
    color: "#ff9696",
    requires(){
      return new Decimal(30)
    }, 
  getResetGain(){
return new Decimal(0)
},
  getNextAt(){return this.requires()},
  canReset(){
    
    return player.b.points.gte(this.requires())},
  prestigeButtonText(){return "Unlock incremental bars"},
    resource: "Incremental bars", // Name of prestige currency
    baseResource: "buffs", // Name of resource prestige is based on
    baseAmount() {return player.b.points}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 5, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player[this.layer].unlocked||(player.al.points.gte(21)&&player.b.points.gte(30))},
  bars: {
    bar1: {
        direction: RIGHT,
        width: 400,
        height: 50,
        progress() { return player[this.layer].progressBars.bar1},
        unlocked(){return player[this.layer].unlocked},
      display(){return "Red Bar: "+format(this.progress().times(100))+"%"},
      fillStyle(){return {'background-color':"#ff0000"}},
    },
    bar2: {
        direction: DOWN,
        width: 50,
        height: 400,
        progress() { return player[this.layer].progressBars.bar2},
        unlocked(){return player[this.layer].unlocked},
      display(){return "Orange Bar: "+format(this.progress().times(100))+"%"},
      fillStyle(){return {'background-color':"#ff8000"}},
    },
    bar3: {
        direction: LEFT,
        width: 400,
        height: 50,
        progress() { return player[this.layer].progressBars.bar3},
        unlocked(){return player[this.layer].unlocked},
      display(){return "Yellow Bar: "+format(this.progress().times(100))+"%"},
      fillStyle(){return {'background-color':"#ffff00"}},
    },
    bar4: {
        direction: UP,
        width: 50,
        height: 400,
        progress() { return player[this.layer].progressBars.bar4},
        unlocked(){return player[this.layer].unlocked},
      display(){return "Green Bar: "+format(this.progress().times(100))+"%"},
      fillStyle(){return {'background-color':"#00ff00"}},
    },
},clickables:{
  11:{
    canClick(){
    return hasUpgrade(this.layer,24)
  },
    onClick(){
  player.bars.generate=!player.bars.generate
},
    unlocked(){
      return hasUpgrade(this.layer,24)
    },
    display(){
      let s=(player.bars.generate?"ON":"OFF")
      return ("Toggle bar generation.\nCurrently: "+s)
    }
  }
},
  upgrades: {
      
    11: {
        title: "Bar power",
        description(){return "Start filling up bars."},
        cost(){return new Decimal(0)},
        unlocked(){return true},
      canAfford(){return true},
      pay(){},
      currencyDisplayName: "points"
      },
    12: {
        title: "Orange Booster",
        description(){return "Orange bar power boosts albania effect."},
        cost(){return new Decimal(0.1)},
        unlocked(){return hasUpgrade(this.layer,11)},
      canAfford(){return player[this.layer].progressBars.bar2.gte(this.cost())},
      pay(){player[this.layer].progressBars.bar2=player[this.layer].progressBars.bar2.sub(this.cost())},
      currencyDisplayName: "Orange bar progress"
      },
    13: {
        title: "Jam on toast",
        description(){return "ALBANIA cost ^0.25. Buying this removes the next upgrade"},
        cost(){return new Decimal(0.02)},
        unlocked(){return hasUpgrade(this.layer,12)},
      canAfford(){return player[this.layer].progressBars.bar3.gte(this.cost())},
      pay(){player[this.layer].progressBars.bar3=player[this.layer].progressBars.bar3.sub(this.cost())},
      currencyDisplayName: "Yellow bar progress",
      onPurchase(){player[this.layer].upgrades=player[this.layer].upgrades.filter(x=>x!=14)}
      },
    14: {
        title: "a horde of cooked geese",
        description(){return "point gain ^1.25. Buying this removes the previous upgrade"},
        cost(){return new Decimal(0.02)},
        unlocked(){return hasUpgrade(this.layer,12)},
      canAfford(){return player[this.layer].progressBars.bar3.gte(this.cost())},
      pay(){player[this.layer].progressBars.bar3=player[this.layer].progressBars.bar3.sub(this.cost())},
      currencyDisplayName: "Yellow bar progress",
      onPurchase(){player[this.layer].upgrades=player[this.layer].upgrades.filter(x=>x!=13)}
      },
    21: {
        title: "Make radiation sell like hotcakes",
        description(){return "Yellow bar progress decreases albania cost"},
        cost(){return new Decimal(0.05)},
        unlocked(){return hasUpgrade(this.layer,13)||hasUpgrade(this.layer,14)},
      canAfford(){return player[this.layer].progressBars.bar3.gte(this.cost())},
      pay(){player[this.layer].progressBars.bar3=player[this.layer].progressBars.bar3.sub(this.cost())},
      currencyDisplayName: "Yellow bar progress",
      },
    22: {
        title: "Mildly Spicy Ranch",
        description(){return "Red Bar progress is boosted by albanias"},
        cost(){return new Decimal(0.1)},
        unlocked(){return hasUpgrade(this.layer,21)},
      canAfford(){return player[this.layer].progressBars.bar3.gte(this.cost())},
      pay(){player[this.layer].progressBars.bar3=player[this.layer].progressBars.bar3.sub(this.cost())},
      currencyDisplayName: "Yellow bar progress",
      },
    23: {
        title: "Inedible Taco Bell Burger",
        description(){return "Remove the buff effect softcap"},
        cost(){return new Decimal(0.5)},
        unlocked(){return hasUpgrade(this.layer,21)},
      canAfford(){return player[this.layer].progressBars.bar3.gte(this.cost())},
      pay(){player[this.layer].progressBars.bar3=player[this.layer].progressBars.bar3.sub(this.cost())},
      currencyDisplayName: "Yellow bar progress",
      },
    24: {
        title: "A new color",
        description(){return "Unlock the ability to pause bars, and gain 2x red bar"},
        cost(){return new Decimal(0.01)},
        unlocked(){return hasUpgrade(this.layer,23)},
      canAfford(){return player[this.layer].progressBars.bar4.gte(this.cost())},
      pay(){player[this.layer].progressBars.bar4=player[this.layer].progressBars.bar4.sub(this.cost())},
      currencyDisplayName: "Green bar progress",
      },
    31: {
        title: "It is negligible",
        description(){return "Green bar reduces buff scaling and all bars are 2x faster"},
        cost(){return new Decimal(0.01)},
        unlocked(){return hasUpgrade(this.layer,24)},
      canAfford(){return player[this.layer].progressBars.bar4.gte(this.cost())},
      pay(){player[this.layer].progressBars.bar4=player[this.layer].progressBars.bar4.sub(this.cost())},
      currencyDisplayName: "Green bar progress",
      },
    32: {
        title: "Buy a fishing pole",
        description(){return "Anti-nerf buyables cost scaling is slower"},
        cost(){return new Decimal(0.1)},
        unlocked(){return hasUpgrade(this.layer,31)},
      canAfford(){return player[this.layer].progressBars.bar4.gte(this.cost())},
      pay(){player[this.layer].progressBars.bar4=player[this.layer].progressBars.bar4.sub(this.cost())},
      currencyDisplayName: "Green bar progress",
      },
  },
  update(diff){
if(!player[this.layer].unlocked||(!player[this.layer].generate && hasUpgrade(this.layer,24))){return}
    player[this.layer].progressBars.bar1=player[this.layer].progressBars.bar1.add(layers.bars.getBarGain().mul(diff).mul(player[this.layer].progressBars.bar2.mul(100).add(1).sqrt()))
    
    if (player[this.layer].progressBars.bar1.gte(1)){
      if (player[this.layer].progressBars.bar2.gte(1)){
          player[this.layer].progressBars.bar1=new Decimal(1)
          }else{
player[this.layer].progressBars.bar2=player[this.layer].progressBars.bar2.add(new Decimal(0.01).mul(player[this.layer].progressBars.bar3.mul(100).add(1).sqrt().mul(hasUpgrade("bars",31)?2:1)))
            ;player[this.layer].progressBars.bar1=new Decimal(0)}
    }
    if (player[this.layer].progressBars.bar2.gte(1)){
      if (player[this.layer].progressBars.bar3.gte(1)){
          player[this.layer].progressBars.bar2=new Decimal(1)
          }else{
player[this.layer].progressBars.bar3=player[this.layer].progressBars.bar3.add(new Decimal(0.01).mul(player[this.layer].progressBars.bar4.mul(100).add(1).sqrt().mul(hasUpgrade("bars",31)?2:1)));player[this.layer].progressBars.bar2=new Decimal(0)}
    }
    
    if (player[this.layer].progressBars.bar3.gte(1)){
      if (player[this.layer].progressBars.bar4.gte(1)){
          player[this.layer].progressBars.bar3=new Decimal(1)
          }else{
player[this.layer].progressBars.bar4=player[this.layer].progressBars.bar4.add(new Decimal(0.01).mul(hasUpgrade("bars",31)?2:1));player[this.layer].progressBars.bar3=new Decimal(0)}
    }
  },
  getBarGain(){
    let g = new Decimal(0)
    if (hasUpgrade(this.layer,11))g=g.add(new Decimal(0.1)
    .mul(hasUpgrade(this.layer,22)?player.al.points.sqrt().add(1):1)
    .mul(hasUpgrade(this.layer,24)?2:1))
    .mul(hasUpgrade("bars",31)?2:1)
    return g
  },
  resetsNothing(){return true},
  
  tabFormat: [

    ["prestige-button","",function(){
      if (player[this.layer].unlocked)return {"display":"none"}}],
    ["bar","bar1"],
    ["row",[["bar","bar4"],"blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank","blank",["bar","bar2"]]],
    ["bar","bar3"],"blank",
    "clickables","blank",
    "upgrades"
      ],
})