addLayer("nerfs", {
    name: "nerfs", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "N", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    points: new Decimal(0),
    }},
    color: "#999999",
    type: "none",
    row: "side", 
    tooltip: "View all the extra nerfs that extreme mode has",
    layerShown(){return true},
    tabFormat: {
      "Nerfs":{
        content:[
          ["display-text",function(){
            return ("1: Your point gain is divided by "+(hasUpgrade(this.layer,11)?"2":"3")+", and then "+(hasUpgrade("ac",11)?"brought to the "+format(new Decimal(3).sub(upgradeEffect("ac",12)),5)+"th root":"cube rooted"))
          }],"blank",
          ["display-text",function(){
            if(hasUpgrade(this.layer,14))return "2: Nothing"
            if(hasUpgrade("p",25)||player.s.unlocked)
            return "2: <b>Downgrade 2</b>'s 2nd effect does nothing"
          }],"blank",
          ["display-text",function(){
            if(player.s.unlocked)
            return "3: The super prestige effect is brought to the "+(format(new Decimal(hasUpgrade("ac",14)?new Decimal(4).sub(upgradeEffect("ac",12)):4),5))+"th root"
          }],"blank",
          ["display-text",function(){
            if(hasUpgrade("s",24))
            return "4: The prestige effect is brought to the "+(format(new Decimal(4).sub(challengeCompletions("bo",12)/10),5))+"th root"
          }],"blank",
          ["display-text",function(){
            if(player.ac.c4c.length>2)return "5: Nothing"
            if(hasUpgrade("s",24))
            return ("5: <b>Super 10</b> is "+(hasChallenge("ac",11)?10:25)+"% weaker")
          }],"blank",
          ["display-text",function(){
            if(hasUpgrade("ac",22))
            return ("6: The point gain nerf is raised to the "+format(new Decimal(1.5).sub(hasUpgrade("bo",11)?upgradeEffect("bo",11):0),4)+"th power")
          }],"blank",
          ["display-text",function(){
            if(player.l.unlocked)
            return "7: The layer effect is square rooted"
          }],"blank",
          ["display-text",function(){
            if(player.ac.best.gte(1e100))
            return "8: Accelerator point gain is softcapped above 1e700 (x -> x^0.5*1e350)"
          }],"blank",
          ["display-text",function(){
            if(hasUpgrade("l",23))
            return "9: Any upgrade that squares the prestige effect instead raises it to the 1.5th power"
          }],"blank",
          ["display-text",function(){
            if(hasUpgrade("l",52))
            return "10: timewalls are raised to the 0.75"
          }],"blank",
          ["display-text",function(){
            if(player.di.unlocked)
            return "11: Distance gain ^0.825, just like in real DI extreme. This is applied again when you reach e1000 distance."
          }],"blank",
          ["display-text",function(){
            if(player.antimatter){
            let s ="12: Each of the first 3 dimensions has a different type of nerf:<br>- You are stuck in regular AD time dilation but only for 1st dimensions<br>"
            s+="- Second dimensions' production gets weaker based on log(antimatter)<br>"
              s+="- Third dimensions act like there are sqrt(x) of them<br>"
              
            return s
              
            }
          }],"blank",
          ["display-text",function(){
            if(player.e.unlocked)
            return "13: Atoms sacrificed ^0.8 when above 10000."
          }],"blank",
        ],
      },
      "upgrades":{
        "content":[
          "upgrades"
        ]
      }
    },
  upgrades:{
    11: {
      title: "1",
      description(){return "The first effect of nerf 1 is reduced to 2"},
      cost: new Decimal(100),
      currencyDisplayName: "points",
      currencyLocation(){return player.points},
      canAfford(){return this.currencyLocation().gte(this.cost)},
      unlocked(){return true},
      pay(){player.points=this.currencyLocation().sub(100)}
    },
    12: {
      title: "2",
      description(){return "Prestige points multiply points (x+1)² after nerfs"},
      cost: new Decimal(500),
      currencyDisplayName: "points",
      currencyLocation(){return player.points},
      canAfford(){return this.currencyLocation().gte(this.cost)},
      unlocked(){return hasUpgrade(this.layer,11)},
      pay(){player.points=this.currencyLocation().sub(500)}
    },
    13: {currencyLayer: "p",
      title: "3",
      description(){return "Multiply super prestige gain by 3"},
      cost: new Decimal(70),
      currencyDisplayName: "prestige points",
      currencyLocation(){return player.p.points},
      canAfford(){return this.currencyLocation().gte(this.cost)},
      unlocked(){return hasUpgrade(this.layer,11)},
      pay(){player.p.points=this.currencyLocation().sub(70)}
    },
    14: {
      title: "4",
      description(){return "Unlock another layer and remove nerf 2"},
      cost: new Decimal(1e25),
      currencyDisplayName: "points",
      currencyLocation(){return player.points},
      canAfford(){return this.currencyLocation().gte(this.cost)},
      unlocked(){return hasUpgrade(this.layer,11)},
      pay(){player.points=this.currencyLocation().sub(this.cost)}
    },
    15: {currencyLayer: "l",
      title: "5",
      description(){return "Unlock another layer"},
      cost: new Decimal(1e129),
      currencyDisplayName: "layer points",
      currencyLocation(){return player.l.points},
      canAfford(){return this.currencyLocation().gte(this.cost)},
      unlocked(){return hasUpgrade("l",45)},
      pay(){player.l.points=this.currencyLocation().sub(this.cost)}
    },
    21: {currencyLayer: "di",
      title: "6",
      description(){return "Distance is multiplied by best meters^0.1"},
      cost: new Decimal(1e243),
      currencyDisplayName: "meters",
      currencyLocation(){return player.di.points},
      canAfford(){return this.currencyLocation().gte(this.cost)},
      unlocked(){return hasUpgrade("di",22)},
      pay(){player.di.points=this.currencyLocation().sub(this.cost)}
    },
    22: {currencyLayer: "ad",
      title: "7",
      description(){return "The first nerf of 12 is reduced to 0.8"},
      cost: new Decimal(1e220),
      currencyDisplayName: "antimatter",
      currencyLocation(){return player.ad.points},
      canAfford(){return this.currencyLocation().gte(this.cost)},
      unlocked(){return hasUpgrade("ad",23)},
      pay(){player.ad.points=this.currencyLocation().sub(this.cost)}
    },
  },
})
addLayer("ac", {
    name: "Accelerators", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
      best: new Decimal(0),
      c4: 1,
      c4c: [],
    }},
    color: "#aaaaaa",
    type: "normal",
    requires(){return new Decimal(1e27)
    }, // Can be a function that takes requirement increases into account
    resource: "Accelerators", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent(){return new Decimal(0.2)}, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
      if(inChallenge("s",12))return new Decimal(0)
      if(hasUpgrade(this.layer,21))mult=mult.mul(upgradeEffect(this.layer,21))
      mult=mult.mul(tmp.bo.effect.root(tmp[this.layer].softcapPower))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
      let mult=new Decimal(1)
        return mult
    },
    hotkeys: [
        {key: "A", description: "Shift+A: Reset for accelerators", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    row: "side", 
    layerShown(){return hasUpgrade("nerfs",14)},
  softcap(){return new Decimal("1e700")},
  softcapPower(){return 0.5},
  upgrades:{
    11: {
      title: "A1",
      description(){return "Accelerators boost points before nerfs. Currently: x"+format(this.effect())},
      effect(){return player.ac.points.add(1)},
      cost: new Decimal(1),
    },
    12: {
      title: "A2",
      description(){return "Accelerators reduce the first nerf's 2nd effect root. Currently: -"+format(this.effect(),5)},
      effect(){return new Decimal(2).sub(Decimal.div(2,player.ac.points.add(1).ln().add(1).ln().div(5).add(1))).add(buyableEffect(this.layer,11)).min(hasChallenge("bo",12)?2.04:hasChallenge("bo",11)?2.02:2)},
      cost: new Decimal(20),
    },
    13: {
      title: "A3",
      description(){return "unlock a buyable"},
      cost: new Decimal(1000),
    },
    14: {
      title: "A4",
      description(){return "A2 also affects the 3rd nerf. Unlock a challenge."},
      cost: new Decimal(5000),
    },
    15: {
      title: "A5",
      description(){return "Number of layers unlocked raises <b>3</b>'s effect"},
      effect(){return new Decimal(player.p.unlocked+player.s.unlocked+player.nerfs.unlocked+player.ac.unlocked+player.l.unlocked+player.a.unlocked+player.ab.unlocked+player.ad.unlocked+player.b.unlocked+player.di.unlocked+player.c.unlocked+player.ch.unlocked+player.d.unlocked+player.ml.unlocked+player.ss.unlocked+player.w.unlocked+player.xyz.unlocked)},
      cost: new Decimal(5e8),
    },
    21: {
      title: "A6",
      description(){return "Accelerators boost their own gain. Currently: "+format(this.effect())},
      effect(){return player.ac.points.pow(0.2).add(1)},
      cost: new Decimal(3.33e33),
    },
    22: {
      title: "A7",
      description(){return "Square the 4th challenge's effect."},
      cost: new Decimal(5.55e55),
    },
    23: {
      title: "A8",
      description(){return "Gain 100% of accelerators on prestige per second"},
      cost: new Decimal(1e120),
    },
  },
  passiveGeneration(){
    if(hasUpgrade(this.layer,23))return true},
  buyables: {
    11: {unlocked(){return hasUpgrade(this.layer,13)},
        cost(x=getBuyableAmount(this.layer, this.id)) {
          let c= new Decimal(100).mul(Decimal.pow(3,x.pow(1.4))) 
          if(c.gt(1e100))c=new Decimal(1).mul(Decimal.pow(1.00006,x.pow(4)))
          return c
          },
        display() { return "A2's effect is increased by 0.01. Cost: "+format(this.cost())+"\nEffect: +"+format(this.effect())+(this.effect().eq(0.75)?" (maxed)":"") },
      effect(){return getBuyableAmount(this.layer, this.id).div(100).min(0.75)},
        canAfford() { return player[this.layer].points.gte(this.cost())&&this.effect().lt(0.75) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
    },
},
  challenges: {
    11: {
        name: "Accelerated Nerf 1",
        challengeDescription: "Nerf 1's 2nd effect is applied again. Entering this challenge resets your super prestige and prestige",
        canComplete: function() {return player.points.gte(1e20)},
        goalDescription: function(){return "Reach "+format(1e20)+ " points"},
      rewardDescription(){return "The 5th nerf is reduced by 15%"},
      unlocked(){return hasUpgrade("ac",14)},
      onEnter(){
        layerDataReset("s",[])
        layerDataReset("p",[])
        player.points=new Decimal(0)
      }
    },
    12: {
        name: "Accelerated Nerf 2",
        challengeDescription: "You can't gain super prestige points. Entering this challenge resets your super prestige points and prestige points",
        canComplete: function() {return player.points.gte(1e10)},
        goalDescription: function(){return "Reach "+format(1e10)+ " points"},
      rewardDescription(){return "Super prestige point gain exponent +0.5"},
      unlocked(){return hasChallenge("ac",11)},
      onEnter(){
        layerDataReset("s",["upgrades","challenges"])
        layerDataReset("p",["upgrades"])
        player.points=new Decimal(0)
      }
    },
    21: {
        name: "Accelerated Nerf 3",
        challengeDescription: "The prestige effect is 1. Entering this challenge resets your super prestige and prestige",
        canComplete: function() {return player.points.gte(1e82)},
        goalDescription: function(){return "Reach "+format(1e82)+ " points"},
      rewardDescription(){return "Accelerators multiply point gain after nerfs"},
      unlocked(){return hasChallenge("ac",12)},
      onEnter(){
        layerDataReset("s",["challenges"])
        layerDataReset("p",[])
        player.points=new Decimal(0)
      }
    },
    22: {
        name: "Accelerated Nerf 4",
        challengeDescription: "Choose 2 challenges to enter, but point gain ^1.5 to compensate",
        canComplete: function() {return player.points.gte(this.goal())},
      goal(){
        if(player.ac.c4==1)return new Decimal(1e61)
        if(player.ac.c4==2)return new Decimal(1e130)
        if(player.ac.c4==3)return new Decimal(1e39)
      },
        goalDescription: function(){return "Reach "+format(this.goal())+ " points"},
      rewardDescription(){
        return "Your "+Math.min(player.ac.c4c.length,3)+" challenge completions are multiplying point gain by "+format(Decimal.pow(1e10,player.ac.c4c.length).min(1e30).max(1).pow(hasUpgrade("ac",22)?2:1))+(player.ac.c4c.length>2?" and the 5th nerf does nothing":"")
        },
      countsAs(){
        let c = []
        if(player.ac.c4!=1)c.push(11)
        if(player.ac.c4!=2)c.push(12)
        if(player.ac.c4!=3)c.push(13)
        return c
      },
      onComplete(){
        if(player.ac.c4==1&&!player.ac.c4c.includes(1))player.ac.c4c.push(1)
        if(player.ac.c4==2&&!player.ac.c4c.includes(2))player.ac.c4c.push(2)
        if(player.ac.c4==3&&!player.ac.c4c.includes(3))player.ac.c4c.push(3)
        player.ac.challenges[22]=player.ac.c4c.length
      },
      unlocked(){return hasChallenge("ac",21)},
      completionLimit(){return 3;},
      onEnter(){
        layerDataReset("s",[])
        layerDataReset("p",[])
        player.points=new Decimal(0)
      }
    },
},
  clickables: {
    11: {unlocked(){return hasChallenge("ac",21)},
        display() {return "Select to remove the first challenge"},
        canClick(){return player.ac.c4!=this.id-10&&!inChallenge("ac",22)},
        onClick(){player.ac.c4=this.id-10}
    },
    12: {
        display() {return "Select to remove the second challenge"},
        canClick(){return player.ac.c4!=this.id-10&&!inChallenge("ac",22)},
        onClick(){player.ac.c4=this.id-10}
    },
    13: {
        display() {return "Select to remove the third challenge"},
        canClick(){return player.ac.c4!=this.id-10&&!inChallenge("ac",22)},
        onClick(){player.ac.c4=this.id-10}
    },
},
  
  doReset(l){
    if(l=="bo"){
      player.ac.points=new Decimal(0)
    }
    else{return}
  },
})
const goals = [12300,13741,14325,14592,16000,26200,27445,"10^^10"]
addLayer("bo", {
    name: "Boosters", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
      best: new Decimal(0),
    }},
    color: "#bbbbbb",
    requires(){return new Decimal("1e800")
    }, 
  effect(){
    let b=new Decimal(4)
    if(player.db.unlocked)b=b.mul(tmp.db.effect)
    b=b.mul(player.e.sacrifice[2].pow(10).add(1))
    return b.pow(player.bo.points)},
  effectDescription(){return "Multiplying accelerator gain and point gain by "+format(this.effect())+" after softcap"},
    resource: "boosters", // Name of prestige currency
    baseResource: "accelerators", // Name of resource prestige is based on
    baseAmount() {return player.ac.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  base: 5,
    exponent(){
      if(player.bo.points.gte(20))return new Decimal(1.75)
      return new Decimal(1.25)}, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
      let mult=new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
      let mult=new Decimal(1)
        return mult
    },
    hotkeys: [
        {key: "B", description: "Shift+B: Reset for boosters", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    row: "side", 
    layerShown(){return hasUpgrade("nerfs",14)},
  canBuyMax(){return player.bo.points.gte(200)},
  upgrades:{
    11: {
      title: "B1",
      description(){return "Boosters reduce the 6th nerf's effect. Currently: -"+format(this.effect(),4)},
      effect(){return Decimal.sub(0.5,Decimal.div(0.5,player.bo.points.sqrt().add(1)))},
      cost: new Decimal(4),
    },
    12: {
      title: "B2",
      description(){return "Unlock a booster challenge, but entering booster challenges resets all previous progress except side layers."},
      cost: new Decimal(83),
    },
  },
  autoPrestige(){return hasMilestone(this.layer,0)},
  resetsNothing(){return hasMilestone(this.layer,0)},
  milestones:{
    0:{
      requirementDescription: "82 boosters",
        effectDescription: "Auto-boosters and they reset nothing",
        done() { return player.bo.points.gte(82) },
    }
  },
  challenges: {
    11: {
        name: "Boosted Nerf 1",
        challengeDescription: "Point gain exponent ^0.75 but layer point gain *1e5",
        canComplete: function() {return player.points.gte("4.20e696")},
        goalDescription: function(){return "Reach "+format("4.20e696")+ " points"},
      rewardDescription(){return "A2's hardcap is now 2.02"},
      unlocked(){return hasUpgrade("bo",12)},
      onEnter(){
        layerDataReset("s",[])
        layerDataReset("p",[])
        layerDataReset("l",[])
        layerDataReset("a",[])
        player.points=new Decimal(0)
      }
    },
    12: {
        name: "Boosted Nerf 2",
        challengeDescription(){return "You can only have "+Math.min(challengeCompletions("bo",12)+1,7)+" layer upgrades at a time. The first 20 layer upgrades are unlocked. Keep super prestige and prestige content on start."},
      completionLimit: 7,
      goal(){
        let c=challengeCompletions("bo",12)
        return new Decimal(10).pow(new Decimal(goals[c]))
      },
        canComplete: function() {return player.points.gte(this.goal())},
        goalDescription: function(){return "Reach "+format(this.goal())+ " points"},
      rewardDescription(){let r= "Your "+challengeCompletions("bo",12)+" challenge completions subtract "+format(challengeCompletions("bo",12)/10)+" from the 4th nerf and always have Mastery's effect active. "+(challengeCompletions(this.layer,this.id)>=2?"Start with 200 of the first layer buyable. ":"")
                         r=r+(challengeCompletions(this.layer,this.id)>=3?"The point nerf is always at least 0.2. ":"")
                          r=r+(challengeCompletions(this.layer,this.id)>=7?"A2's hardcap is now 2.04.":"")
                         return r},
      unlocked(){return hasChallenge("bo",11)},
      onEnter(){
        layerDataReset("s",["milestones","upgrades","challenges"])
        layerDataReset("p",["upgrades"])
        layerDataReset("l",[])
        layerDataReset("a",["challenges","upgrades"])
        player.points=new Decimal(0)
      }
    },
  },
  update(diff){
    if(inChallenge("bo",12))player.l.upgrades=player.l.upgrades.slice(0,challengeCompletions("bo",12)+1)
    if(inChallenge("bo",12)&&getBuyableAmount("l",11).lt(200))setBuyableAmount("l",11,new Decimal(200))
  }
})
addLayer("cc", {
    name: "Challenging Challenges", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    points: new Decimal(0),
      c1time: 0,
      show: false,
    }},
    color: "#cccccc",
    type: "none", 
  tooltip:"",
    row: "side", 
    layerShown(){return hasUpgrade("di",15)||inChallenge(this.layer,11)||hasChallenge(this.layer,11)},
  challenges: {
    11: {
        name: "Challenged Nerf 1",
        challengeDescription: "Time is 1000x slower.",
        canComplete: function() {return player.di.points.gte(this.goal())},
        goalDescription: function(){return "Reach "+format(this.goal())+ " meters within 0.03 second"},
      goal(){
        let cc = player.cc.challenges[11]
        let goals = [new Decimal(9e15), new Decimal("1e482"),new Decimal(1/0)]
        return goals[cc]
      },
      completionLimit: 1e100,
      rewardDescription(){return "Time speed is 1000x faster per completion^1.5.<br>You have "+player.cc.challenges[11]+" completions"},
      unlocked(){return true},
      onEnter(){
        layerDataReset("di",["upgrades","best"])
        player.devSpeed=0.001
        player.cc.show=true
      }
    },
    12: {
        name: "Challenged Nerf 2",
        challengeDescription: "Challenged Nerf 1 and dilation is also applied to second dimensions. Teleport to the AD layer on start.",
        canComplete: function() {return player.ad.points.gte(this.goal())},
        goalDescription: function(){return "Reach "+format(this.goal())+ " antimatter within "+(player.cc.challenges[12]==1?0.034:0.0325)+" second"},
      goal(){
        let cc = player.cc.challenges[12]
        let goals = [new Decimal(5000),new Decimal(5e6),new Decimal(1.5e11),new Decimal("10^^10"),new Decimal(1/0)]
        return goals[cc]
      },
      completionLimit: 1e100,
      rewardDescription(){return "Antimatter gain x100 per completion.<br>You have "+player.cc.challenges[12]+" completions"},
      onEnter(){
        layerDataReset("ad",["upgrades"])
        player.devSpeed=0.001
        player.tab="ad"
      },
      countsAs: [11],
    },
  },
  tabFormat: [
    ["display-text",function(){return "Challenging Challenges"}],"blank",
    "challenges"
  ],
  update(diff){
    if(inChallenge(this.layer,11)){player.devSpeed=0.001
                                  player.cc.show=true
                                   player.cc.c1time+=diff
                                   if(player.cc.c1time>(player.cc.challenges[12]==1?0.034:0.0325))player.cc.activeChallenge=null
                                  }
    else{
      if(player.devSpeed){delete player.devSpeed}
      player.cc.c1time=0
    }
  }
})
addLayer("db", {
    name: "dimboost", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 4, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
    }},
    color: "#dddddd",
  tooltip:"",
    row: "side", 
    layerShown(){return player.cc.challenges[12]>=3},
  requires(){return new Decimal("1e21")
    }, 
  effect(){
    let b=new Decimal(10)
    b=b.add(tmp.db.buyables[11].eff2)
    return b.pow(player.db.points)},
  effectDescription(){return "Multiplying booster base and all dimension production before nerfs by "+format(this.effect())+". This layer is automated after 100 dimboosts"},
    resource: "dimension boosts", // Name of prestige currency
    baseResource: "antimatter", // Name of resource prestige is based on
    baseAmount() {return player.ad.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  base: 100,
    exponent(){
      return new Decimal(1.25)}, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
      let mult=new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
      let mult=new Decimal(1)
        return mult
    },
    hotkeys: [
        {key: "D", description: "Shift+D: Reset for dimension boosts", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
  autoPrestige(){return player.db.points.gte(100)},
  resetsNothing(){return this.autoPrestige()},
  automateThings(){
    if(player.db.points.lt(100))return
    if(layers.db.buyables[11].canAfford())layers.db.buyables[11].buy()
    if(layers.db.buyables[12].canAfford())layers.db.buyables[12].buy()
  },
  buyables: {
    11: {title:"Tickspeed upgrade",
      unlocked(){return player.db.points.gte(8)||getBuyableAmount(this.layer, this.id).gt(0)},
        cost(x=getBuyableAmount(this.layer, this.id)) {
          let c= new Decimal(hasUpgrade("ad",31)?6:8).mul(Decimal.pow(hasUpgrade("ad",31)?1.2:1.25,x)).round() 
          return c
          },
        display() { return "Time speed is faster and dimboost base is increased. Cost: "+format(this.cost())+"\nEffect: *"+format(this.effect())+", +"+format(this.eff2()) },
      effect(){return Decimal.pow(1e10,getBuyableAmount(this.layer, this.id))},
         eff2(){return Decimal.mul(2,getBuyableAmount(this.layer, this.id).pow(1.5))},
        canAfford() { return player[this.layer].points.gte(this.cost())},
        buy() {
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
    },
    12: {title:"Sacrifice",
      unlocked(){return player.db.points.gte(37)||getBuyableAmount(this.layer, this.id).gt(0)},
        cost(x=getBuyableAmount(this.layer, this.id)) {
          let c= new Decimal(1e200).mul(Decimal.pow(2,x.pow(1.5)))
          return c
          },
        display() { return "Sacrifice "+format(this.cost())+" antimatter, and gain a boost to 8th dimensions. Effect: *"+format(this.effect()) },
      effect(){return Decimal.pow(player.ad.points.add(1).log10().add(1),getBuyableAmount(this.layer, this.id))},
        canAfford() { return player["ad"].points.gte(this.cost())},
        buy() {
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
    },
},
})
addLayer("e", {
    name: "elementary", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 5, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
      sacrifice:[new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
      
      fome: {
        amount: new Decimal(0),
        gain: function(){
          let g = new Decimal(1)
          g=g.mul(buyableEffect("e",11))
          let x=getBuyableAmount("e",12).add(getFreeFomeBoosts())
         if(x.gte(1))g=g.mul(getFomeBoost(1).pow(x.add(3).div(4).floor()))
          if(x.gte(2))g=g.mul(getFomeBoost(2).pow(x.add(2).div(4).floor()))
          if(x.gte(3))g=g.mul(getFomeBoost(3).pow(x.add(1).div(4).floor()))
          if(hasUpgrade("e",26))g=g.mul(player.timePlayed/3600)
          
          if(hasUpgrade("e",12))g=g.mul(Decimal.pow(2,player.e.upgrades.length))
          if(hasUpgrade("e",16))g=g.mul(colorFomeEff())
          g=g.mul(buyableEffect("e",21))
          if(player.f.unlocked)g=g.mul(fireEffect().max(1))
          if(g.gte(1e20)&&!hasUpgrade("e",21))g=g.sqrt().mul(1e10)
          return g
        },
        size: new Decimal(0),
        
      },
      cfome: {
        amount: new Decimal(0),
        gain: function(){
          let g = new Decimal(1)
          g=g.mul(buyableEffect("e",21))
          let x=getBuyableAmount("e",22).add(getFreeFomeBoosts(1))
         if(x.gte(1))g=g.mul(getFomeBoost(1,1).pow(x.add(3).div(4).floor()))
          if(x.gte(4))g=g.mul(getFomeBoost(4).pow(x.div(4).floor()))
          if(hasUpgrade("e",23))g=g.mul(player.timePlayed/3600)
          if(player.f.unlocked)g=g.mul(fireEffect().max(1))
          return g
        },
        size: new Decimal(0),
      }
    }},
    color: "#eeeeee",
  tooltip:"",
    row: "side", 
    layerShown(){return hasUpgrade("di",34)||player.e.unlocked},
  requires(){return new Decimal("1e22150")
    }, 
  passiveGeneration(){return player.e.unlocked?1:0},
    resource: "atoms", // Name of prestige currency
    baseResource: "distance", // Name of resource prestige is based on
    baseAmount() {return player.di.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent(){
      return new Decimal(10).pow(-3)}, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
      let mult=new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
      let mult=new Decimal(1)
        return mult
    },
    hotkeys: [
        {key: "E", description: "Shift+E: Reset for atoms", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],  
  clickables:{
    11:{
      title: "Sacrifice all of your atoms to Spaceon",
      canClick(){return player.e.points.gte(1)},
      onClick(){if(player.e.sacrifice[this.id-11].lt(10000))player.e.sacrifice[this.id-11]=player.e.sacrifice[this.id-11].add(player.e.points)
        else{
          player.e.sacrifice[this.id-11]=player.e.sacrifice[this.id-11].pow(1.25).add(player.e.points).root(1.25)
        }
        player.e.points=new Decimal(0)
      }
    },
    12:{
      title: "Sacrifice all of your atoms to Solaris",
      canClick(){return player.e.points.gte(1)},
      onClick(){if(player.e.sacrifice[this.id-11].lt(10000))player.e.sacrifice[this.id-11]=player.e.sacrifice[this.id-11].add(player.e.points)
        else{
          player.e.sacrifice[this.id-11]=player.e.sacrifice[this.id-11].pow(1.25).add(player.e.points).root(1.25)
        }
        player.e.points=new Decimal(0)
      }
    },
    13:{
      title: "Sacrifice all of your atoms to Infinity",
      canClick(){return player.e.points.gte(1)},
      onClick(){if(player.e.sacrifice[this.id-11].lt(10000))player.e.sacrifice[this.id-11]=player.e.sacrifice[this.id-11].add(player.e.points)
        else{
          player.e.sacrifice[this.id-11]=player.e.sacrifice[this.id-11].pow(1.25).add(player.e.points).root(1.25)
        }
        player.e.points=new Decimal(0)
      }
    },
    14:{
      title: "Sacrifice all of your atoms to Eternity",
      canClick(){return player.e.points.gte(1)},
      onClick(){
        if(player.e.sacrifice[this.id-11].lt(10000))player.e.sacrifice[this.id-11]=player.e.sacrifice[this.id-11].add(player.e.points)
        else{
          player.e.sacrifice[this.id-11]=player.e.sacrifice[this.id-11].pow(1.25).add(player.e.points).root(1.25)
        }
        player.e.points=new Decimal(0)
      }
    },
    15:{
      title: "Sacrifice all of your atoms to Reality",
      canClick(){return player.e.points.gte(1)},
      onClick(){if(player.e.sacrifice[this.id-11].lt(10000))player.e.sacrifice[this.id-11]=player.e.sacrifice[this.id-11].add(player.e.points)
        else{
          player.e.sacrifice[this.id-11]=player.e.sacrifice[this.id-11].pow(1.25).add(player.e.points).root(1.25)
        }
        player.e.points=new Decimal(0)
      }
    },
    16:{
      unlocked(){return false},
      title: "Sacrifice all of your atoms to Drigganiz",
      canClick(){return player.e.points.gte(1)},
      onClick(){if(player.e.sacrifice[this.id-11].lt(10000))player.e.sacrifice[this.id-11]=player.e.sacrifice[this.id-11].add(player.e.points)
        else{
          player.e.sacrifice[this.id-11]=player.e.sacrifice[this.id-11].pow(1.25).add(player.e.points).root(1.25)
        }
        player.e.points=new Decimal(0)
      }
    },
  },
  buyables: {
    11: {title(){return ((this.cost().gte(1e69)?"Scaled ":"")+"Fome Expansion")},
      unlocked(){return layers.e.tabFormat.Fome.unlocked()},
        cost(x=getBuyableAmount(this.layer, this.id)) {
          let dims = new Decimal(3)
          if(getBuyableAmount("e",13).gte(1))dims=dims.add(getBuyableAmount("e",13))
          let c= x.add(1).pow(dims).sub(x.pow(dims))
          if(c.gte(1e69))c=c.sqr().div(1e69)
          return c
          },
        display() { return "Expand your fome for "+format(this.cost())+" fome. Your fome has a side length of "+format(getBuyableAmount(this.layer, this.id))+" planck lengths, which multiplies fome production by "+format(this.effect()) },
      effect(){return getBuyableAmount(this.layer, this.id).max(1).pow(hasUpgrade("e",15)?2:1)},
        canAfford() { return player[this.layer].fome.amount.gte(this.cost())&&getBuyableAmount("e",11).lt(50)},
        buy() {
          player.e.fome.amount=player.e.fome.amount.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          player.e.fome.size=getBuyableAmount(this.layer, this.id)
        },
    },
    12: {title(){return ((getBuyableAmount("e",12).gte(36)?"Superscaled ":getBuyableAmount("e",12).gte(15)?"Scaled ":"")+"Fome Boost")},
      unlocked(){return getBuyableAmount("e",11).gte(3)||getBuyableAmount("e",13).gte(1)},
        cost(x=getBuyableAmount(this.layer, this.id)) {
          if(x.gte(36)){
            x=Decimal.pow(x.sub(35),2).add(35)
          }
          if(x.gte(15)){
            x=Decimal.pow(x.sub(14),(hasUpgrade("e",22)?1.35:1.5)).add(14)
          }
          let c= Decimal.pow(10,x.add(1))
          
          if(x.add(getFreeFomeBoosts()).gte(4))c=c.div(getFomeBoost(4).pow(x.add(getFreeFomeBoosts()).div(4).floor().add(getBuyableAmount("e",13))))
          return c
          },
        display() { return "Gain a fome boost for "+format(this.cost())+" fome. You have "+format(this.effect())+" fome boosts."},
      effect(){return getBuyableAmount(this.layer, this.id)},
        canAfford() { return player[this.layer].fome.amount.gte(this.cost())},
        buy() {
          player.e.fome.amount=player.e.fome.amount.sub(this.cost())
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
    },
    13: {title:"Fome Dimensions",
      unlocked(){return getBuyableAmount("e",11).gte(50)||getBuyableAmount("e",13).gte(1)},
        cost(x=getBuyableAmount(this.layer, this.id)) {
          let c= new Decimal((hasUpgrade("e",25)?20:hasUpgrade("e",13)?30:50))
          return c
          },
        display() { return ("Reset fome expansions and their cost increases faster, but add 0.5 to the base of the first fome boost and gain a free 4th fome boost. Requires "+(formatWhole(this.cost()))+" fome expansions.\n\n Your fome currently has "+formatWhole(getBuyableAmount(this.layer,this.id).add(3))+" dimensions.") },
      effect(){return getBuyableAmount(this.layer, this.id).div(2)},
        canAfford() { return getBuyableAmount("e",11).gte(this.cost())},
        buy() {
          player.e.fome.amount=new Decimal(0)
          setBuyableAmount(this.layer,11,new Decimal(0))
          player.e.fome.size=new Decimal(0)
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
    },
    21: {title:"Colorful Fome expansion",
      unlocked(){return hasUpgrade("e",16)},
        cost(x=getBuyableAmount(this.layer, this.id)) {
          let c = Decimal.pow(10,getBuyableAmount(this.layer,this.id))
          return c
          },
        display() { return "Expand your colorful fome for "+format(this.cost())+" colorful fome. Your colorful fome has a side length of "+format(getBuyableAmount(this.layer, this.id))+" yoctometers, which multiplies all types of fome production by "+format(this.effect()) },
      effect(){return getBuyableAmount(this.layer, this.id).max(1)},
        canAfford() { return player[this.layer].cfome.amount.gte(this.cost())&&getBuyableAmount("e",21).lt(50)},
        buy() {
          player.e.cfome.amount=player.e.cfome.amount.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          player.e.cfome.size=getBuyableAmount(this.layer, this.id)
        },
    },
    22: {title:"Colorful Fome Boost",
      unlocked(){return getBuyableAmount("e",21).gte(3)||getBuyableAmount(this.layer,23).gte(1)},
        cost(x=getBuyableAmount(this.layer, this.id)) {
          let c = Decimal.pow(10,getBuyableAmount(this.layer,this.id).pow(1.2).add(1))
          if(hasUpgrade("e",24))c=c.pow(0.8)
          return c
          },
        display() { return "Gain a colorful fome boost for "+format(this.cost())+" colorful fome. You have "+format(this.effect())+" colorful fome boosts." },
      effect(){return getBuyableAmount(this.layer, this.id)},
        canAfford() { return player[this.layer].cfome.amount.gte(this.cost())},
        buy() {
          player.e.cfome.amount=player.e.cfome.amount.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
    },
    23: {title:"Colorful Fome Explosion",
      unlocked(){return getBuyableAmount("e",22).gte(3)||getBuyableAmount(this.layer,23).gte(1)},
        cost(x=getBuyableAmount(this.layer, this.id)) {
          let c = Decimal.pow(50,getBuyableAmount(this.layer,this.id).pow(1.25)).mul(1000)
          return c
          },
        display() { return "Reset all colorful fome boosts and expansions, but add a level to all colorful fome boosts. Cost: "+format(this.cost())+" colorful fome. You are getting "+format(this.effect())+" free levels to colorful fome boosts." },
      effect(){return getBuyableAmount(this.layer, this.id)},
        canAfford() { return player[this.layer].cfome.amount.gte(this.cost())},
        buy() {
          player.e.cfome.amount=new Decimal(0)
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          setBuyableAmount(this.layer,21,new Decimal(0))
          setBuyableAmount(this.layer,22,new Decimal(0))
          player.e.cfome.size=new Decimal(0)
        },
    },
  },
  upgrades:{
    11:{
      description: "Gain a free fome boost.",
      currencyLocation(){return player.e.fome},
      canAfford(){return player.e.fome.amount.gte(this.cost)},
      currencyInternalName: "amount",
      currencyDisplayName: "fome",
      unlocked(){return true},
      cost: new Decimal(1e7)
    },
    12:{
      description: "Double fome gain per upgrade",
      currencyLocation(){return player.e.fome},
      canAfford(){return player.e.fome.amount.gte(this.cost)},
      currencyInternalName: "amount",
      currencyDisplayName: "fome",
      unlocked(){return true},
      cost: new Decimal(3e7)
    },
    13:{
      description: "Fome dimensions require 30 fome expansions",
      currencyLocation(){return player.e.fome},
      canAfford(){return player.e.fome.amount.gte(this.cost)},
      currencyInternalName: "amount",
      currencyDisplayName: "fome",
      unlocked(){return true},
      cost: new Decimal(1e17)
    },
    14:{
      description: "Gain a free fome boost per 10 dimensions",
      currencyLocation(){return player.e.fome},
      canAfford(){return player.e.fome.amount.gte(this.cost)},
      currencyInternalName: "amount",
      currencyDisplayName: "fome",
      unlocked(){return true},
      cost: new Decimal(1e18)
    },
    15:{
      description: "Square the fome size boost to fome gain",
      currencyLocation(){return player.e.fome},
      canAfford(){return player.e.fome.amount.gte(this.cost)},
      currencyInternalName: "amount",
      currencyDisplayName: "fome",
      unlocked(){return true},
      cost: new Decimal(1e19)
    },
    16:{
      description: "Unlock another fome. Requires 17 dimensions",
      currencyLocation(){return player.e.fome},
      canAfford(){return player.e.fome.amount.gte(this.cost)&&getBuyableAmount("e",13).gte(14)},
      currencyInternalName: "amount",
      currencyDisplayName: "fome",
      unlocked(){return hasUpgrade("e",15)},
      cost: new Decimal(1e23)
    },
    21:{
      description: "Remove the fome gain softcap",
      currencyLocation(){return player.e.cfome},
      canAfford(){return player.e.cfome.amount.gte(this.cost)},
      currencyInternalName: "amount",
      currencyDisplayName: "colorful fome",
      unlocked(){return hasUpgrade("e",16)},
      cost: new Decimal(1000)
    },
    22:{
      description: "Fome boost superscaling is 10% weaker",
      currencyLocation(){return player.e.cfome},
      canAfford(){return player.e.cfome.amount.gte(this.cost)},
      currencyInternalName: "amount",
      currencyDisplayName: "colorful fome",
      unlocked(){return hasUpgrade("e",16)},
      cost: new Decimal(10000)
    },
    23:{
      description(){return "Colorful fome is multiplied by hours played. Currently: "+format(player.timePlayed/3600)},
      currencyLocation(){return player.e.cfome},
      canAfford(){return player.e.cfome.amount.gte(this.cost)},
      currencyInternalName: "amount",
      currencyDisplayName: "colorful fome",
      unlocked(){return hasUpgrade("e",16)},
      cost: new Decimal(1e9)
    },
    24:{
      description(){return "Colorful fome boost cost is reduced"},
      currencyLocation(){return player.e.cfome},
      canAfford(){return player.e.cfome.amount.gte(this.cost)},
      currencyInternalName: "amount",
      currencyDisplayName: "colorful fome",
      unlocked(){return hasUpgrade("e",16)},
      cost: new Decimal(1e17)
    },
    25:{
      description(){return "Fome dimensions require 20 fome expansions and the colorful fome effect and 2nd fome boost base are multiplied by 3.3"},
      currencyLocation(){return player.e.cfome},
      canAfford(){return player.e.cfome.amount.gte(this.cost)},
      currencyInternalName: "amount",
      currencyDisplayName: "colorful fome",
      unlocked(){return hasUpgrade("e",16)},
      cost: new Decimal(1e32)
    },
    26:{
      description(){return "Gain 2 free fome boosts and the 9th upgrade also affects fome"},
      currencyLocation(){return player.e.cfome},
      canAfford(){return player.e.cfome.amount.gte(this.cost)},
      currencyInternalName: "amount",
      currencyDisplayName: "colorful fome",
      unlocked(){return hasUpgrade("e",16)},
      cost: new Decimal(2e32)
    },
  },
  update(diff){
    if(!layers.e.tabFormat.Fome.unlocked())return
    player.e.fome.amount=player.e.fome.amount.add(player.e.fome.gain().mul(diff))
    if(!hasUpgrade("e",16))return
    player.e.cfome.amount=player.e.cfome.amount.add(player.e.cfome.gain().mul(diff))
},
  tabFormat:
  {"High Gods":{
    content:[
    "main-display","blank",["prestige-button",function(){return "Melt your points into"}],
    "resource-display","blank","clickables","blank",
    ["display-text",function(){
      let s = ""
      s=s+"You have sacrificed "+format(player.e.sacrifice[0])+" atoms to Spaceon, which multiplies your layer points by "+format(player.e.sacrifice[0].pow(69420).add(1))+"<br>"
      s+="You have sacrificed "+format(player.e.sacrifice[1])+" atoms to Solaris, which divides aarex timewall cost by "+format(player.e.sacrifice[1].pow(200000).add(1))+"<br>"
      s+="You have sacrificed "+format(player.e.sacrifice[2])+" atoms to Infinity, which boosts booster base by "+format(player.e.sacrifice[2].pow(10).add(1))+"<br>"
      s+="You have sacrificed "+format(player.e.sacrifice[3])+" atoms to Eternity, which boosts time speed by "+format(player.e.sacrifice[3].pow(100).add(1))+"<br>"
      s+="You have sacrificed "+format(player.e.sacrifice[4])+" atoms to Reality, which boosts Reality Update production by "+format(player.e.sacrifice[4].pow(30).add(1))+"<br>"
      return s
    }]
    ]},
   "Fome":{
     unlocked(){return (player.e.sacrifice[0].gte(10000)&&player.e.sacrifice[1].gte(10000)&&player.e.sacrifice[2].gte(10000)&&player.e.sacrifice[3].gte(10000)&&player.e.sacrifice[4].gte(10000))},
     content: [
       ["display-text",function(){
         return "You have "+format(player.e.fome.amount)+" fome"
       }],"blank",
       ["row",[["buyable",11],["buyable",12],["buyable",13]]],"blank",
       ["display-text",function(){
         let s=""
         let x=getBuyableAmount("e",12).add(getFreeFomeBoosts())
         if(x.gte(1))s+="Fome gain is multiplied by "+format(getFomeBoost(1).pow(x.add(3).div(4).floor()))+" (*"+format(getFomeBoost(1))+" per boost)<br>"
         if(x.gte(2))s+="Fome gain is also multiplied by "+format(getFomeBoost(2).pow(x.add(2).div(4).floor()))+" (based on fome)<br>"
         if(x.gte(3))s+="Fome makes fome boost itself by *"+format(getFomeBoost(3).pow(x.add(1).div(4).floor()))+"<br>"
         if(x.gte(4))s+="Fome divides fome boost costs by "+format(getFomeBoost(4).pow(x.div(4).floor().add(getBuyableAmount("e",13))))+"<br>"
         return s
       }],"blank",
       ["display-text",function(){
         let s="⬜".repeat(player.e.fome.size.toNumber())+"<br>"
         s=s.repeat(player.e.fome.size.toNumber())
         return s
       }],
     ]
   },
   "Fome Upgrades":{
     unlocked(){return getBuyableAmount("e",13).gte(2)},
     content: [
       "upgrades"
     ]
   },
   "Scaling and Softcaps":{
     unlocked(){return getBuyableAmount("e",12).gte(15)},
     content:[
       ["display-text",function(){
         let s = "Scaling:<br>"
         if(getBuyableAmount("e",12).gte(15))s+="Scaled fome boost: starts at 15, x^"+(hasUpgrade("e",22)?1.35:1.5)+"<br>"
         if(layers.e.buyables[11].cost().gte(1e69))s+="Scaled fome expansion: starts at 1e69 fome, cost^"+(2)+"<br>"
         if(getBuyableAmount("e",12).gte(36))s+="Superscaled fome boost: starts at 36, x^"+(2)+"<br>"
         
         return s
       }],"blank","blank",
       ["display-text",function(){
         let s = "Softcaps:<br>"
         if(player.e.fome.gain().gte("1e20")&&!hasUpgrade("e",21))s+="Fome gain: starts at 1e20, ^0.5<br>"
         return s
       }],
     ]
   },
   "Colorful fome":{
     unlocked(){return (hasUpgrade("e",16))},
     content: [
       ["display-text",function(){
         
         return "You have "+format(player.e.cfome.amount)+" colorful fome, multiplying fome gain by "+format(colorFomeEff())
       }],"blank",
       ["display-text",function(){
         let s=""
         let x=getBuyableAmount("e",22).add(getFreeFomeBoosts(1))
         if(x.gte(1))s+="Colorful fome gain is multiplied by "+format(getFomeBoost(1,1).pow(x.add(3).div(4).floor()))+" (*"+format(getFomeBoost(1,1))+" per boost)<br>"
         if(x.gte(2))s+="Raise the colorful fome effect to the "+format(getFomeBoost(2,1).mul(x.add(2).div(4).floor().add(1)))+"th power<br>"
         if(x.gte(3))s+="Add "+format(getFomeBoost(3,1).mul(x.add(1).div(4).floor()))+" to the base of the first colorful fome boost<br>"
         if(x.gte(4))s+="Fome boosts colorful fome gain by *"+format(getFomeBoost(4,1).pow(x.div(4).floor()))+"<br>"
         return s
       }],"blank",
       ["row",[["buyable",21],["buyable",22],["buyable",23]]],"blank",
       ["display-text",function(){
         let square = "🟥🟧🟨🟩🟦🟪"
         let s = ""
         for(let i=0;i<player.e.cfome.size.toNumber();i++){
           for(let j=0;j<player.e.cfome.size.toNumber();j++){
             s+=square[(i+j)%6*2]+square[(i+j)%6*2+1]
           }
           s+="<br>"
         }
         
         return s
       }],
     ]
   },
  }
})
function colorFomeEff(){
  let x = player.e.cfome.amount.add(1).log(hasUpgrade("e",25)?2:10).add(1)
  if(getBuyableAmount("e",22).add(getFreeFomeBoosts(1)).gte(2))x=x.pow(getBuyableAmount("e",22).add(getFreeFomeBoosts(1)).add(2).div(4).floor().add(1))
  return x
  
}
function getFreeFomeBoosts(type=0){
  let f=new Decimal(0)
  if(type==0){
  if(hasUpgrade("e",11))f=f.add(1)
  if(hasUpgrade("e",14))f=f.add(getBuyableAmount("e",13).add(3).div(10).floor())
    if(hasUpgrade("e",26))f=f.add(2)
  }else if(type==1){
    f=f.add(buyableEffect("e",23).mul(4))
  }
  return f
}
function getFomeBoost(x,type=0){
  if(type==0){
  if(x==1){return new Decimal(2).add(buyableEffect("e",13))}
  if(x==2){return player.e.fome.amount.add(1).log(hasUpgrade("e",25)?2:10).add(1)}
  if(x==3){return player.e.fome.amount.add(1).log10().add(1).log10().add(1).sqr()}
  if(x==4){return player.e.fome.amount.add(1).log10().add(1).root(4)}}
  else if(type==1){
    if(x==1){return new Decimal(4).add(getFomeBoost(3,1).mul(getBuyableAmount("e",22).add(getFreeFomeBoosts(1)).add(1).div(4).floor()))}
    if(x==2){return new Decimal(1)}
    if(x==3){return new Decimal(1)}
    if(x==4){return player.e.fome.amount.add(1).log10().add(1).pow(0.8)}
  }
}
function preNerf(gain){
  if(hasUpgrade("ac",11))gain=gain.mul(upgradeEffect("ac",11))
  gain=gain.mul(tmp.bo.effect)
  return gain
}
function nerfPoints(gain){
  gain=preNerf(gain)
  gain=gain.div(hasUpgrade("nerfs",11)?2:3)
  gain=gain.root(hasUpgrade("ac",12)?new Decimal(3).sub(upgradeEffect("ac",12)):3)
  if(inChallenge("ac",11))gain=gain.root(hasUpgrade("ac",12)?new Decimal(3).sub(upgradeEffect("ac",12)):3)
  gain=buffPoints(gain)
  if(inChallenge("bo",11)&&gain.gt(10))gain=Decimal.pow(10,gain.log10().pow(0.75))
  return gain
}
function buffPoints(gain){
  let n="nerfs"
  if(hasUpgrade(n,12))gain=gain.mul(player.p.points.add(1).sqr())
  if(hasChallenge("ac",21))gain=gain.mul(player.ac.points.add(1))
  if(inChallenge("ac",22)&&player.ac.challenges[22]<3)gain=gain.pow(1.5)
  gain=gain.mul(Decimal.pow(1e10,player.ac.c4c.length).min(1e30).max(1).pow(hasUpgrade("ac",22)?2:1))
  return gain
}