addLayer("c", {
    name: "Collapse", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
      alephs: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
      aleph9: new Decimal(0),
      anticharge: new Decimal(0),
      singularity: false,
      singularityLevel: new Decimal(0),
      singularityEnabled: true,
    }},
    color: "#00cc44",
    requires(){
      return Decimal.pow(BHO, 2.5)}, // Can be a function that takes requirement increases into account
    resource: "cardinals", // Name of prestige currency
    baseResource(){return "psi ordinal"}, // Name of resource prestige is based on
    baseAmount() {return player.b.psi}, // Get the current amount of baseResource
  //tooltip(){return "Reach "+numToPsi(this.requires())+" psi ordinal to collapse!"},
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "C: Collapse", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
  passiveGeneration(){
    let x = new Decimal(hasUpgrade("c",114)?0.1:hasUpgrade("c",24)?0.001:0)
    if (player.d.veblen.length>1){
      x=x.mul(player.d.veblen[0].max(10).log10().pow(0.2))
    }
    return x
  },
    layerShown(){return player.g.base.gte(9) && !inAnyChallenge("r")},
  getNextAt(){return this.requires()},
  prestigeButtonText(){return "Collapse for <b>+"+formatWhole(this.getResetGain())+"</b> cardinals.<br>Requires: "+numToPsi(this.requires())+" psi ordinal"},
  getResetGain(){
    if (!player.c.unlocked)return new Decimal(3)
      let g= Decimal.pow(3,player.b.boosts.sub(90).div(10)).add(1e-14).mul(3).floor()
      if (hasUpgrade("c",23))g=g.mul(upgradeEffect("c",23))
    if (hasUpgrade("b",103))g=g.mul(upgradeEffect("b",103))
      let h = g.max(3).pow(player.c.singularityEnabled?tmp.c.singularityEffects[0]:1).round()
      //if (h.gt(1e20)) h=h.pow(0.05).mul(1e19)
      if (getBuyableAmount("d",12).gte(3)){
        h = h.mul(getBuyableAmount("d",12))
      }
    if (hasMilestone("d",2)){
      h=h.mul(alephEffect(9))
    }
    return h
  },
  canReset(){return player.b.psi.gte(this.requires())},
  branches: ["b"],
  onPrestige(){
    if (!hasMilestone("c",1) && player.b.boosts.lte(70)){player.c.milestones.push(1)}
    if (!hasMilestone("c",2) && player.b.boosts.lte(55)){player.c.milestones.push(2)}
    if (!hasMilestone("c",3) && player.b.boosts.lte(41)){player.c.milestones.push(3)}
    if (!hasMilestone("c",4) && player.b.boosts.lte(25)){player.c.milestones.push(4)}
    if (!hasMilestone("c",5) && player.b.boosts.lte(0)){player.c.milestones.push(5)}
  },
  
  clickables: {
    11:{
      canClick(){return player.c.points.gte(1)},
      onClick(){
        if (player.c.points.lt(1000)){
          for(let i=0;i<1000;i++){
          if (player.c.points.lte(0))return
          player.c.points=player.c.points.sub(1)
          let x=Math.floor(Math.random()*8)
          player.c.alephs[x]=player.c.alephs[x].add(1)}
        } else {
          if (!hasMilestone("d",2)){
          for (let i=0;i<8;i++){player.c.alephs[i]=player.c.alephs[i].add(player.c.points.div(8).floor()); }
          player.c.points=player.c.points.sub(player.c.points.div(8).floor().mul(8))
          } else {
            for (let i=0;i<8;i++){player.c.alephs[i]=player.c.alephs[i].add(player.c.points.div(9).floor()); }
            player.c.aleph9 = player.c.aleph9.add(player.c.points.div(9).floor())
          player.c.points=new Decimal(0)
          }
        }
      },
      display(){return "Distribute Cardinals"}
    },
    12:{
      canClick(){return true},
      onClick(){player.c.anticharge=getBuyableAmount("c",21).add(player.d.veblen.length>1?new Decimal(player.d.veblen[1]).gte(1)?player.d.veblen:0:0);player.c.upgrades=player.c.upgrades.filter(i=>i<100);doReset("c",true)},
      display(){return "Respec Anti-charge and force a collapse reset"},
      unlocked(){return getBuyableAmount("c",21).gte(1)}
    },
    13: {
      canClick(){return true},
      onClick(){player.c.singularityEnabled = !player.c.singularityEnabled},
      display() {return "Toggle singularity\nCurrently: "+(player.c.singularityEnabled?"ON":"OFF")},
      unlocked(){return player.c.singularity}
    }
  },
  milestones:{
    0: {
      requirementDescription: "Collapse once",
        effectDescription: "Keep all features unlocked and the first 5 gwarkup milestones",
        done() { return player.c.unlocked },
      unlocked(){return true}
    },
    1: {
      requirementDescription: "Collapse in 70 or less factor boosts",
        effectDescription: "Keep milestone 6 and always have booster upgrade 4 supercharged, and factor boosts don't reset gwarkup",
        done() { return false},
      unlocked(){return hasMilestone("c",0)}
    },
    2: {
      requirementDescription: "Collapse in 55 or less factor boosts",
        effectDescription: "Keep challenge completions and autobuy the first 3 incrementy buyables",
        done() { return false},
      unlocked(){return hasMilestone("c",1)}
    },
    3: {
      requirementDescription: "Collapse in 41 or less factor boosts",
        effectDescription: "Start with all incrementy upgrades and 190 boosters",
        done() { return false},
      unlocked(){return hasMilestone("c",2)}
    },
    4: {
      requirementDescription: "Collapse in 25 or less factor boosts",
        effectDescription: "Keep booster (first 12) and hierarchy upgrades and gain 10000x psi ordinal if you can't collapse",
        done() { return false},
      unlocked(){return hasMilestone("c",3)}
    },
    5: {
      requirementDescription: "Collapse in 0 factor boosts",
        effectDescription: "Unlock a fifth row of booster upgrades and the ability to supercharge all booster upgrades",
        done() { return false},
      unlocked(){return hasMilestone("c",4)}
    },
  },
  
  upgrades: {
    11:{
      title: "CUP1",
      description(){if (hasUpgrade("c",101) || shiftDown)return "Total Boosters boosts Psi ordinal gain"
        return "Total Charge boosts Psi ordinal gain"},
      cost(){
        return new Decimal(10)
      },
    },
    12:{
      title: "CUP2",
      description(){if (hasUpgrade("c",102) || shiftDown)return "Hepteract factor 7's effect and the first 2 incrementy upgrades"
        return "Hepteract factor 7's effect"},
      cost(){
        return new Decimal(20)
      },
    },
    13:{
      title: "CUP3",
      description(){if (hasUpgrade("c",103) || shiftDown)return "Square <b>The Least Creative Upgrade Name Ever</b>, twice"
        return "Square <b>The Least Creative Upgrade Name Ever</b>"},
      cost(){
        return new Decimal(50)
      },
    },
    14:{
      title: "CUP4",
      description(){if (hasUpgrade("c",104) || shiftDown)return "Unlock Overcharge and GP raises FGH gain to a slightly bigger power. Currently: "+format(player.g.points.add(10).log10().log10().pow(0.125))
        return "Unlock Overcharge and GP raises FGH gain to a power. Currently: "+format(player.g.points.add(10).log10().log10().pow(0.1))},
      cost(){
        return new Decimal(100)
      },
    },
    21:{
      title: "CUP5",
      description(){if (hasUpgrade("c",111) || shiftDown)return "Incrementy gain ^1.03"
        return "Incrementy gain ^1.01"},
      cost(){
        return new Decimal(10)
      },
    },
    22:{
      title: "CUP6",
      description(){if (hasUpgrade("c",112) || shiftDown)return "Booster power's 3rd effect softcap starts +0.1 later"
        return "Booster power's 3rd effect softcap starts +0.04 later"},
      cost(){
        return new Decimal(20)
      },
    },
    23:{
      title: "CUP7",
      description(){if (hasUpgrade("c",113) || shiftDown)return "Unspent cardinals boost cardinal gain even more."
        return "Unspent cardinals boost cardinal gain. Currently: *"+format(this.effect())},
      cost(){
        return new Decimal(50)
      },
      effect(){
        return player.c.points.add(1).log10().add(1).pow(hasUpgrade("c",113)?1.5:1)
      },
    },
    24:{
      title: "CUP8",
      description(){if (hasUpgrade("c",114) || shiftDown)return "Gain 10% of cardinals on reset per second"
        return "Gain 0.1% of cardinals on reset per second"},
      cost(){
        return new Decimal(100)
      },
    },
    31:{
      title: "The Lightening",
      description(){
        return "Unlock Light Mode, and square <b>Dynamic Raising</b>"},
      cost(){
        return new Decimal(2000)
      },
    },
    32:{
      title: "New Ordinals",
      description(){
        return "Unlock Realms and autobuy charge"},
      cost(){
        return new Decimal(1e17)
      },
      unlocked(){return hasUpgrade(this.layer,31)}
    },
    33:{
      title: "New Ordinals",
      description(){
        return "Light mode's base is at most 7 and the Aleph Null effect is stronger"},
      cost(){
        return new Decimal(1e27)
      },
      unlocked(){return hasUpgrade(this.layer,32)}
    },
    34:{
      title: "Time Dilation",
      description(){
        return "Decrementy gain is now 20x faster"},
      cost(){
        return new Decimal(1e29)
      },
      unlocked(){return hasUpgrade(this.layer,33)}
    },
    35:{
      title: "The Great Purification",
      description(){
        return "There are Chips. In your house."},
      cost(){
        return new Decimal(1e48)
      },
      unlocked(){return hasUpgrade(this.layer,34)}
    },
    101:{
      description(){return "Anti-charge cardinal upgrade 1"},
      cost(){
        return new Decimal(1)
      },
      currencyDisplayName: "Anti-Charge",
      currencyInternalName: "anticharge",
      currencyLocation(){return player.c},
    },
    102:{
      description(){return "Anti-charge cardinal upgrade 2"},
      cost(){
        return new Decimal(2)
      },
      currencyDisplayName: "Anti-Charge",
      currencyInternalName: "anticharge",
      currencyLocation(){return player.c},
    },
    103:{
      description(){return "Anti-charge cardinal upgrade 3"},
      cost(){
        return new Decimal(5)
      },
      currencyDisplayName: "Anti-Charge",
      currencyInternalName: "anticharge",
      currencyLocation(){return player.c},
    },
    104:{
      description(){return "Anti-charge cardinal upgrade 4"},
      cost(){
        return new Decimal(10)
      },
      currencyDisplayName: "Anti-Charge",
      currencyInternalName: "anticharge",
      currencyLocation(){return player.c},
    },
    111:{
      description(){return "Anti-charge cardinal upgrade 5"},
      cost(){
        return new Decimal(1)
      },
      currencyDisplayName: "Anti-Charge",
      currencyInternalName: "anticharge",
      currencyLocation(){return player.c},
    },
    112:{
      description(){return "Anti-charge cardinal upgrade 6"},
      cost(){
        return new Decimal(2)
      },
      currencyDisplayName: "Anti-Charge",
      currencyInternalName: "anticharge",
      currencyLocation(){return player.c},
    },
    113:{
      description(){return "Anti-charge cardinal upgrade 7"},
      cost(){
        return new Decimal(5)
      },
      currencyDisplayName: "Anti-Charge",
      currencyInternalName: "anticharge",
      currencyLocation(){return player.c},
    },
    114:{
      description(){return "Anti-charge cardinal upgrade 8"},
      cost(){
        return new Decimal(10)
      },
      currencyDisplayName: "Anti-Charge",
      currencyInternalName: "anticharge",
      currencyLocation(){return player.c},
    },
  },
  buyables:{
    11: {
        cost(x=getBuyableAmount(this.layer,this.id)) { 
          return new Decimal(1000).pow(Decimal.pow(3,x)).root(layers.r.alephNullEffect())
        },
        display() { return "Multiply psi ordinal gain by 1.5<br>Currently: "+format(this.effect())+"x<br>Cost: "+format(this.cost())+" Decrementy" },
      title: "Psi Doublen't",
        canAfford() { return inChallenge("c",11)&&player.g.decrementy.gte(this.cost()) },
        buy() {
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      unlocked(){return true},
      effect(){return Decimal.pow(1.5, getBuyableAmount(this.layer,this.id))},
    },
    12: {
        cost(x=getBuyableAmount(this.layer,this.id)) { 
          return new Decimal(1e10).pow(Decimal.pow(2,x)).root(layers.r.alephNullEffect())
        },
        display() { return "Double Dynamic Gain<br>Currently: "+format(this.effect())+"x<br>Cost: "+format(this.cost())+" Decrementy" },
      title: "Why is there another one of these?",
        canAfford() { return inChallenge("c",11)&&player.g.decrementy.gte(this.cost()) },
        buy() {
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      unlocked(){return true},
      effect(){return Decimal.pow(2, getBuyableAmount(this.layer,this.id))},
    },
    13: {
        cost(x=getBuyableAmount(this.layer,this.id)) { 
          return new Decimal(1e25).pow(Decimal.pow(5,x)).root(layers.r.alephNullEffect())
        },
        display() { return "Hierarchy effect exponents +0.2<br>Currently: +"+formatWhole(this.effect())+"<br>Cost: "+format(this.cost())+" Decrementy" },
      title: "This is probably going to cause inflation",
        canAfford() { return inChallenge("c",11)&&player.g.decrementy.gte(this.cost()) },
        buy() {
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      unlocked(){return true},
      effect(){return Decimal.mul(0.2, getBuyableAmount(this.layer,this.id))},
    },
    
    21: {
        cost(x=getBuyableAmount(this.layer,this.id)) { 
          return new Decimal(1e10).pow(x).root(layers.r.alephNullEffect())
        },
        display() { return "Gain 1 anti-charge. Anticharge can be used to charge cardinal upgrades.<br>Currently: +"+formatWhole(this.effect())+"<br>Cost: "+format(this.cost())+" Incrementy" },
      title: "Anticharge",
        canAfford() { return inChallenge("c",11)&&player.b.incrementy.gte(this.cost()) },
        buy() {
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          player.c.anticharge=player.c.anticharge.add(1)
        },
      unlocked(){return true},
      effect(){return getBuyableAmount(this.layer,this.id)},
    },
    31: {
        cost(x=getBuyableAmount(this.layer,this.id)) { 
          return new Decimal(2).pow(x.add(1).mul(1024))
        },
        display() { return "Increase the singularity level by 1.<br>Currently: +"+formatWhole(this.effect())+"<br>Requires: "+format(this.cost())+" Incrementy" },
        title: "Singular",
        canAfford() { return player.b.incrementy.gte(this.cost()) },
        buy() {
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      unlocked(){return player.c.singularity},
      effect(){return getBuyableAmount(this.layer,this.id)},
    },
    32: {
        cost(x=getBuyableAmount(this.layer,this.id)) { 
          return new Decimal(1e8).mul(Decimal.pow(5,x.pow(2)))
        },
        display() { return "Increase the singularity level multiplier.<br>Currently: x"+formatWhole(this.effect())+"<br>Requires: "+format(this.cost())+" Cardinals" },
        title: "Tea",
        canAfford() { return player.c.points.gte(this.cost()) },
        buy() {
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      unlocked(){return player.c.singularity},
      effect(){return getBuyableAmount(this.layer,this.id).add(1)},
    },
  },
  challenges:{
    
    11: {
        name: "Light Mode",
        challengeDescription(){
          let s = ""
          if (hasSL(16)) s = "You are trapped in C7"
          else s = "All Booster challenges at once"
          s += " and the base is "
          if (hasUpgrade("c",33)) s+="7"
          else if (hasUpgrade("d",24)) s+="9"
          else s+="10"
          s += ". "
          if (hasMilestone("d",0))s+="Incrementy and psi ordinal gain is ^"+format(buyableEffect("gwa",23), 3)
          else s+="Square root incrementy and psi ordinal gain"
          s+=", and the first 2 alephs are weaker."
          return s
        },
      goalDescription(){return "Reach "+format(this.req())+" gwarkup points"},
      req(){
      return new Decimal("10^^1e308")
    },
        canComplete(){return false},
      onEnter(){
        while (options.theme!="light"){
          switchTheme()
        }
      },
      onExit(){
        switchTheme()
      },
      rewardDescription(){return "There are 4 buyables you can buy inside this challenge"},
    },
  },
  update(diff){
    if (player.b.incrementy.gte("1.79e308")) player.c.singularity = true;
    player.c.singularityLevel = getBuyableAmount(this.layer,31).mul(getBuyableAmount(this.layer,32).add(1))
    if (hasSL(1)) {
      for (let x of [11,12,13,21,22,23,31,32,33,41,42,43])
      if (!hasUpgrade("b",x)) player.b.upgrades.push(x)
      for (let x of [101,102,103,111,112,113,121,122,123])
      if (!hasUpgrade("h",x)) player.h.upgrades.push(x)
    }
    if (hasSL(40)){
      for (let x of [51,52,53])
      if (!hasUpgrade("b",x)) player.b.upgrades.push(x)
      for (let x of [131,132,133,141,142,143])
      if (!hasUpgrade("h",x)) player.h.upgrades.push(x)
    }
  },
  singularityEffects(){
    let eff = player.c.singularityLevel.add(1).log(10).add(1).cbrt()
    let f2 = eff.pow(-1)
    if (eff.gte(1.3)) eff=eff.mul(1.69).cbrt()
    return [eff, f2]
  },
  tabFormat: {
    "Alephs": {
      unlocked(){return true},
      content: [
        "main-display",
        ["prestige-button", function(){return true}],
        "blank",
        ["display-text",function(){return "Base Cardinal gain: 3*3^((FB-90)/10)"}],"blank",
        "clickables",
        "blank",
        ["display-text",function(){
          let s=``
          s+="ℵ<sub>1</sub>: "+formatWhole(player.c.alephs[0])+", multiplying autoclicker speed by "+format(alephEffect(1))+"<br>"
          s+="ℵ<sub>2</sub>: "+formatWhole(player.c.alephs[1])+", multiplying GP gain by "+format(alephEffect(2))+"<br>"
          s+="ℵ<sub>3</sub>: "+formatWhole(player.c.alephs[2])+", multiplying dynamic gain and cap by "+format(alephEffect(3))+"<br>"
          s+="ℵ<sub>4</sub>: "+formatWhole(player.c.alephs[3])+", multiplying incrementy gain by "+format(alephEffect(4))+"<br>"
          s+="ℵ<sub>5</sub>: "+formatWhole(player.c.alephs[4])+", multiplying psi ordinal gain by "+format(alephEffect(5))+"<br>"
          s+="ℵ<sub>6</sub>: "+formatWhole(player.c.alephs[5])+", multiplying SGH gain by "+format(alephEffect(6))+"<br>"
          s+="ℵ<sub>7</sub>: "+formatWhole(player.c.alephs[6])+", multiplying FGH gain by "+format(alephEffect(7))+"<br>"
          s+="ℵ<sub>8</sub>: "+formatWhole(player.c.alephs[7])+", multiplying booster power gain by "+format(alephEffect(8))+"<br>"
          if (hasMilestone("d",2)){
            s+="ℵ<sub>9</sub>: "+formatWhole(player.c.aleph9)+", multiplying cardinal gain by "+format(alephEffect(9))+"<br>"
          }
          return s
        }],
      ]
    },
    "Sluggish Milestones": {
      unlocked(){return true},
      content: [
        "milestones"
      ]
    },
    "Upgrades": {
      unlocked(){return true},
      content: [
        ["display-text",function(){return "Hold shift to see charged effects"}],"blank",
        ["row",[["upgrade",11],["upgrade",12],["upgrade",13],["upgrade",14]]],
        ["row",[["upgrade",21],["upgrade",22],["upgrade",23],["upgrade",24]]],
        ["row",[["upgrade",31],["upgrade",32],["upgrade",33],["upgrade",34],["upgrade",35]]],
      ]
    },
    "Light": {
      unlocked(){return hasUpgrade("c",31)},
      content: [
        ["row",[["challenge",11]]],
        "blank",
        ["row",[["buyable",11],["buyable",12],["buyable",13]]],
        ["row",[["buyable",21]]]
      ]
    },
    "Anti-charge": {
      unlocked(){return getBuyableAmount("c",21).gte(1)},
      content: [
        ["display-text",function(){return "You have "+formatWhole(player.c.anticharge)+" anti-charge."}],"blank",
        ["row",[["upgrade",101],["upgrade",102],["upgrade",103],["upgrade",104]]],
        ["row",[["upgrade",111],["upgrade",112],["upgrade",113],["upgrade",114]]],
        ["row",[["upgrade",121]]],
      ]
    },
    "Singularity": {
      unlocked(){return player.c.singularity},
      content: [
        ["display-text", function(){return "Your incrementy has collapsed into a black hole."}, {"color": "#00FF55", "font-size": "32px"}],
        "blank",
        ["display-text", function(){return "Singularity level: "+player.c.singularityLevel}, {"color": "#00FF55", "font-size": "24px"}],
        ["display-text", function(){return "Your singularity is doing the following:<br>Raising cardinals ^"+format(tmp.c.singularityEffects[0], 4)+"<br>Raising psi ordinal and incrementy gain ^"+format(tmp.c.singularityEffects[1], 4)}],
        "blank",
        ["row",[["buyable",31],["buyable",32],["clickable",13]]],
        "blank",
        ["display-text", function(){return "Singularity Level Milestones only work if singularity is enabled"},{"font-size": "24px"}],"blank",
        ["display-text", function(){
          if (!hasMilestone("g",7))return ""
          return "SL1: Always have the first 4 rows of booster upgrades and first 3 rows of charge for free"
        }, function(){
          if (hasSL(1)) return {"color": "#00FF55"}
          return {"color": "#FF2222"}
        }],
        ["display-text", function(){
          if (!player.c.singularityLevel.gte(1))return ""
          return "SL5: Overcharge strengthens ℵ<sub>5</sub> to ℵ<sub>8</sub>"
        }, function(){
          if (hasSL(5)) return {"color": "#00FF55"}
          return {"color": "#FF2222"}
        }],
        ["display-text", function(){
          if (!player.c.singularityLevel.gte(5))return ""
          return "SL16: Light mode no longer puts you in C1-6 or C8, and you can gwarkup to reset decrementy"
        }, function(){
          if (hasSL(16)) return {"color": "#00FF55"}
          return {"color": "#FF2222"}
        }],
        ["display-text", function(){
          if (!player.c.singularityLevel.gte(16))return ""
          return "SL40: Always have all booster upgrades and charge upgrades"
        }, function(){
          if (hasSL(40)) return {"color": "#00FF55"}
          return {"color": "#FF2222"}
        }]
      ]
    }
  }
})
function hasSL(x){
  return (player.c.singularityLevel.gte(x)&&player.c.singularityEnabled)
}