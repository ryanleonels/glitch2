function doTrolling() {
  player.points = player.points.add(
    getClickGain()
  );
  // You need to be careful, dont be rushy or else some save are erased!
}
const discord = "https://discord.gg/FC8Q8NVME9"
function getVoidStart() {
  let x = D("ee10")
  if (inChallenge(102)) x=D(1)
  return x
}
function getPointMult() {
  let g = D(inChallenge(2)?1:player.prestige.add(1).pow(inChallenge(5)?0.1:1).pow(hasChallenge(2)?1.25:1))
  g = g.mul(upgrades[0].effect())
  g = g.mul(upgrades[1].effect())
  g = g.mul(upgrades[2].effect())
  g = g.mul(upgrades[3].effect())
  if(hasUpgrade(100)) g = g.mul(3)
  if(hasUpgrade(101)) g = g.mul(upgrades[101].effect())
  if(hasUpgrade(102)) g = g.mul(5)
  if(hasUpgrade(103)) g = g.mul(50)
  if (!inChallenge(101)) g = g.mul(player.superprestige.add(1).pow(inChallenge(5)?0.1:1).pow(player.ascensionChallenges[1]>=1?2:1))
  if(g.gte(1e24) && !hasUpgrade(313)) g = g.sqrt().mul(1e12)
  if(hasUpgrade(201)) g = g.mul(1e10)
  if(hasUpgrade(202)) g = g.mul(Decimal.pow(inChallenge(3)?1:10,player.buyables[1].add(player.buyables[5].gte(1)?trollingEffect()[1]:D(0))))
  if(inChallenge(1))g=g.pow(0.1)
  if(hasUpgrade(106))g=g.mul(1e100)
  if(hasChallenge(1))g=g.pow(1.05)
  if(g.gte(hasUpgrade(105)?"e16000":"e15000")&&!hasUpgrade(314))g=g.pow(1/3).mul(hasUpgrade(105)?D("1e16000").pow(2/3):"e10000")
  if(inChallenge(4))g=g.div("1e4060")
  if(hasUpgrade(107))g=g.mul(D(2).pow(player.buyables[1].add(player.buyables[2].add(player.buyables[3].add(player.buyables[4].add(player.buyables[5].gte(1)?trollingEffect()[1].mul(4).add(player.buyables[5]):D(0)))))))
  if(hasUpgrade(300))g=g.mul(1000)
  if(hasUpgrade(302))g=g.mul(upgrades[302].effect()).pow(2)
  if(g.gte("e80000")&&!hasUpgrade(314))g=g.root(2).mul("e40000")
  if(inChallenge(5)&&g.gt(10)&&!hasUpgrade(313))g=D(10).pow(g.log10().sqrt())
  if(player.buyables[5].gte(2)&&inChallenge(5))g=g.pow(trollingEffect()[2])
  // moving softcaps to other place, otherwise challenge won't work as intended
  if (player.technobabble.photonType == 'Down') g = g.pow(soups.photons.effect());
  if(player.ascensionChallenges[2]>=1)g=g.pow(1.5)
  return g
}
function getClickGain(){
  let g = getPointMult()
  if(g.gte("ee10")&&!inChallenge(102)){g=g.log10().pow(1e9)}
  if(inChallenge(102)&&g.gt(10))g=g.log10().log10()
  return g
}

function prestige() {
  if (player.points.lt(100)) return;
  player.prestige = player.prestige.add(
    getPrestigeGain()
  );
  player.points = D(0);
}
function superPrestige(){
  if(player.prestige.lt(100000))return;
  player.superprestige=player.superprestige.add(getSPGain())
  player.prestige=D(0)
  player.points=D(0)
  if(!hasUpgrade(200))player.automationLevel=D(0)
  if(!hasUpgrade(200))player.upgrades=player.upgrades.filter(i=>i>=200)// ids above 200 are super prestige upgrades
  if(player.activeChallenge<5)exitChallenge()
}
function buyAutomation() {
  if(hasUpgrade(200))buyMaxAutomation()
  else
  if (player.points.gte(getAutomationCost())) {
    player.points = player.points.sub(getAutomationCost());
    player.automationLevel=player.automationLevel.add(1)
  }
}
function buyMaxAutomation(){
  if (player.points.gte(getAutomationCost())) {
    player.automationLevel=hasUpgrade(315)?D(1):player.points.sub(50).div(50).sqrt().floor()
    if(!hasUpgrade(206)&&!hasUpgrade(315))player.points = player.points.sub(getAutomationCost());
    
  }
}
function buyUpgrade(upgrade) {
  if(hasUpgrade(upgrade))return
  if(upgrade>=100){buyPrestigeUpgrade(upgrade);return}
  if (canAffordUpgrade(upgrade)) {
    player.points = player.points.sub(getUpgradeCost(upgrade));
    player.upgrades.push(upgrade);
  }
}
function canAffordUpgrade(upgrade) {
  if(upgrade>=300)return upgrades[upgrade].cost.lte(player.ascensionpoints);
  if(upgrade>=200)return upgrades[upgrade].cost.lte(player.superprestige);
  if(upgrade>=100)  return upgrades[upgrade].cost.lte(player.prestige);
  return upgrades[upgrade].cost.lte(player.points);
}
function hasUpgrade(upgrade) {
  return player.upgrades.includes(upgrade)
}
function getUpgradeCost(upgrade) {
  return upgrades[upgrade].cost;
}

function buyPrestigeUpgrade(upgrade) {
  if(upgrade>=200){buySuperPrestigeUpgrade(upgrade);return}
  if (canAffordUpgrade(upgrade)) {
    player.prestige = player.prestige.sub(getUpgradeCost(upgrade));
    player.upgrades.push(upgrade);
  }
}
function buySuperPrestigeUpgrade(upgrade) {
  if(upgrade>=300){buyAscensionUpgrade(upgrade);return}
  if (canAffordUpgrade(upgrade)) {
    player.superprestige = player.superprestige.sub(getUpgradeCost(upgrade));
    player.upgrades.push(upgrade);
  }
}
function buyAscensionUpgrade(upgrade) {
  if (canAffordUpgrade(upgrade)) {
    player.ascensionpoints = player.ascensionpoints.sub(getUpgradeCost(upgrade));
    player.upgrades.push(upgrade);
  }
}
const upgrades = {
  0: {
    name: "Hire more trolls to help with trolling.",
    cost: D(1e10),
    effect() {
      if(hasUpgrade(0))
      return D(2).pow(getScientistEffect());
      return D(1)
    },
    effectDesc() {
      return `x${format(this.effect())} to trolling`
    }
  },
  1: {
    name: "Get some professional trollers to help you",
    cost: D(1e50),
    effect() {
      if(hasUpgrade(1)) return D(5).pow(getScientistEffect());
      return D(1)
    },
    effectDesc() {
      return `x${format(this.effect())} to trolling`
    }
  },
  2: {
    name: "Get the king of trolls to help you",
    cost: D(1e300),
    effect() {
      if(hasUpgrade(2)) return D(200).pow(getScientistEffect());
      return D(1)
    },
    effectDesc() {
      return `x${format(this.effect())} to trolling`
    }
  },
  3: {
    name: "Get the world leader of the trolling community to help you",
    cost: D("1e1000"),
    effect() {
      if(hasUpgrade(3)) return D(1e10).pow(getScientistEffect());
      return D(1)
    },
    effectDesc() {
      return `x${format(this.effect())} to trolling`
    }
  },
  100: {
    name: "Get the god troll to help your trolling adventure.",
    cost: D(20),
    effect() {
      if(hasUpgrade(100)) return D(1e3);
      return D(1)
    },
    effectDesc() {
      return `x${format(this.effect())} to trolling`
    }
  },
  101: {
    name: "Trolling boosts itself",
    cost: D(150),
    effect() {
      if(inChallenge(5))return D(1)
      if(hasUpgrade(101)) return player.points.max(1).add(1).ln().add(1).pow(inChallenge(3)?1:player.buyables[2].mul(5).add(1).mul(hasUpgrade(108)?1.5:1));
      return D(1)
    },
    effectDesc() {
      return `x${format(this.effect())} to trolling`
    }
  },
  102: {
    name: "Make Ahaha, the high god of trolling, help you troll",
    cost: D(1300),
    effect() {
      if(hasUpgrade(102)) return D(1e3);
      return D(1)
    },
    effectDesc() {
      return `x${format(this.effect())} to trolling`
    }
  },
  103: {
    name: "Become the high god of trolling",
    cost: D(1e6),
    effect() {
      if(hasUpgrade(103)) return D(1e5);
      return D(1)
    },
    effectDesc() {
      return `x${format(this.effect())} to trolling`
    }
  },
  104: {
    name: "Buyables are too expensive! Divide buyable costs by 1e12.",
    cost: D("1e10200"),
    effect() {
      if(hasUpgrade(104)) return D(1e12);
      return D(1)
    },
    effectDesc() {
      return `/${format(this.effect())}`
    }
  },
  105: {
    name: "Ban NEF2021 from your discord server for spam pinging so the 2nd trolling softcap starts at e16000 instead.",
    cost: D("1.2345e12345"),
  },
  106: {
    name: "1e200x prestige points and 1e100x super-prestige points. Plain and simple, yet effective.",
    cost: D("1.7171e17171"),
  },
  107: {
    name: "Join the troll discord and troll 2x more people for every buyable bought, after all wars",
    cost: D("1e23565"),
  },
  108: {
    name: "The 2nd prestige upgrade is ^1.5 as powerful",
    cost: D("1e33611"),
  },
  200: {
    name: "Stop resetting my upgrades and buy max automation",
    cost: D(5e3),
  },
  201: {
    name: "Tired of slow gain? Multiply trolling gain by 1e10",
    cost: D(1e10),
  },
  202: {
    name: "Unlock a buyable",
    cost: D(2.5e13),
  },
  203: {
    name: "Crash the super-prestigious economy and gain 1e6x more super-prestige points!",
    cost: D(3.14e15),
  },
  204: {
    name: "Gain more prestige points based on points",
    cost: D(1e27),
  },
  205: {
    name: "Unlock another buyable.", 
    cost: D(1e100),
  },
  206: {
    name: "Automatically automate trolling.",
    cost: D(1e155),
  },
  207: {
    name: "I dont have ideas for upgrades, just multiply SP by e12 cuz why not",
    cost: D(2e200),
  },
  208: {
    name: "Get 100% of prestige on reset per second",
    cost: D(1e230),
  },
  209: {
    name: "Unlock a third buyable",
    cost: D(1e234),
  },
  210: {
    name: "Get 100% of super prestige on reset per second",
    cost: D("1e500"),
  },
  211: {
    name: "Unlock Challenges",
    cost: D("e603"),
  },
  212: {
    name: "Autobuy buyables",
    cost: D("1e950"),
  },
  300: {
    name: "Welcome to ascension! Multiply trolling gain by 1000.",
    cost: D("1"),
  },
  301: {
    name: "Gain more super prestige points based on trolling.",
    cost: D("1"),
  },
  302: {
    name: "Gain more trolling based on unspent ascension points and square passive trolling gain, <br>but remove the last prestige upgrade.",
    cost: D("2"),
    effect() {
      return player.ascensionpoints.pow(2).add(10)
    },
    effectDesc() {
      return `x${format(this.effect())} to trolling`
    }
  },
  303: {
    name: "Make Letorin star every message in general and multiply ascension point gain by 3",
    cost: D("5"),
  },
  304: {
    name: "Let's make things easier. Keep challenge completions on ascension.",
    cost: D("25"),
  },
  305: {
    name: "There are too many super-prestige upgrades to buy! Let's keep them all on ascension.",
    cost: D("100"),
  },
  306: {
    name: "Keep trolling upgrades & prestige upgrades on ascension.",
    cost: D("250"),
  },
  307: {
    name: "Start with 1 automation level.",
    cost: D("500"),
  },
  308: {
    name: "Gain more super-prestige points based on unspent ascension points and vice versa.<br><i style='opacity: 0.7'>Ooh, synergy!</i>",
    cost: D("1000"),
    effect() {
      return player.ascensionpoints.pow(10).add(10)
    },
    effect2() {
      return player.superprestige.add(20).log(20).pow(0.05)
    },
    effectDesc() {
      return `x${format(this.effect())} to SP, x${format(this.effect2())} to AP`
    }
  },
  309: {
    name: "That last upgrade sucked! Super-prestige point gain ^1.05",
    cost: D("2500"),
  },
  310: {
    name: "Unlock the ability to enter The Troll", 
    cost: D("5000"),
  },
  311: {
    name: "<b>UNLOCK ASCENSION CHALLENGES.</b>", 
    cost: D("2e16"), // this cost might get increased if technobabble gaming gets more content
  }, // i got earlier
  312: {
    name: "<b>Ascension challenges look impossible, lets multiply super prestige point gain by ee13 and ascension point gain by 1000</b>", 
    cost: D("5e17"), 
  }, 
  313: {
    name: "<b>Remove the second The Troll nerf and defeat Unfunny#0367</b>", 
    cost: D("1e22"), 
  }, 
  314: {
    name: "<b>Remove the prestige softcap, super prestige softcap, 2nd trolling softcap, and 3rd trolling softcap</b>", 
    cost: D("2e22"), 
  }, 
  315: {
    name: "<b>There are too many softcaps. Remove the 2nd prestige softcap but automation can only be bought once</b>", 
    cost: D("5e23"), 
  }, 
};
const milestones = {
  301: {
    title: "How it works",
    name: "Unlock Quark-gluon plasma. Requirement: 15 pissed off scientists",
    done() {
      return getPissedScientists().gte(15);
    },
    background: "linear-gradient(45deg, #707, #058)"
  },
  302: {
    title: "Not how it works",
    name: "Unlock Quark-gluon gas. Requirement: 30 pissed off scientists<br><i style='opacity: 0.7'>Hey, isn't that just hadrons?</i>",
    done() {
      return getPissedScientists().gte(30);
    },
    background: "linear-gradient(45deg, #707, #058)"
  },
  303: {
    title: "QUANTUM",
    name: "Unlock a trolling point effect and a 5th buyable. Requirement: 45 pissed off scientists",
    done() {
      return getPissedScientists().gte(45);
    },
    background: "linear-gradient(45deg, #707, #058)"
  },
  304: {
    title: "Inflation 101",
    name: "Square prestige gain. Requirement: 69 pissed off scientists",
    done() {
      return getPissedScientists().gte(69);
    },
    background: "linear-gradient(45deg, #707, #058)"
  },
  305: {
    title: "That's definitely not how it works",
    name: "Unlock Secondary particles. Requirement: 90 pissed off scientists<br><i style='opacity: 0.7'>STOP, STOP, STOP! IT'S GETTING OUT OF HAND!</i>",
    done() {
      return getPissedScientists().gte(90)
    },
    background: "linear-gradient(45deg, #707, #058)"
  },
  350: {
    title: "Maybe how it works?",
    name: "Unlock photons. Requirement: 1000 Higgs fermions",
    done() {
      return player.technobabble.higgsF.gte(1000);
    },
    background: "linear-gradient(45deg, #707, #058)"
  }
}
function hasMilestone(id) {
  return player.milestones.includes(id.toString())||player.milestones.includes(Number(id));
}
function scooch(){location.href="https://glitch.com/edit/#!/community-incremental-2"} 
var player = {
  points: D(0),
  prestige: D(0),
  automationLevel: D(0),
  superprestige: D(0),
  upgrades: [],
  buyables:{
    1: D(0),
    2: D(0),
    3: D(0),
    4: D(0),
    5: D(0),
  },
  challenges: [],
  milestones: [],
  activeChallenge: 0,
  ascensionpoints: D(0),
  trolUnlocks: 0,
  trollingpoints: D(0),
  technobabble: {
    points: D(0),
    qgp: D(0),
    qgg: D(0),
    higgsF: D(0),
    photons: D(0),
    photonType: "Up",
    t: D(5e12),
    tSetting: 0
  },
  ascensionChallenges: {
    1:0,2:0,3:0,4:0,5:0
  }
};

let buyables = {
  1:{
    display(){return "<h3>Trolling modifier" + (player.buyables[1].gt(1) ? " x" + formatWhole(player.buyables[1]) : "") +
      "</h3> It only costs "+format(getBuyableCost(1))+
      " super prestige points and will give you 10x BOOST to trolling and prestige every time you buy it!"},
    cost: D(1e13),
    scaling: D(10),
    unlocked(){return hasUpgrade(202)},
    currency: "superprestige"
  },
  2:{
    display(){return "<h3>Efficiency augmentor" + (player.buyables[2].gt(1) ? " x" + formatWhole(player.buyables[2]) : "") +
      "</h3> It only costs "+format(getBuyableCost(2))+
      " super prestige points and will make 2nd prestige upgrade more EFFECTIVE every time you buy it!"},
    cost: D(1e213),
    scaling: D(100),
    unlocked(){return hasUpgrade(205)},
    currency: "superprestige"
  },
  3:{
    display(){return "<h3>Output coupler" + (player.buyables[3].gt(1) ? " x" + formatWhole(player.buyables[3]) : "") +
      "</h3> It only costs "+format(getBuyableCost(3))+
      " super prestige points and will DOUBLE super prestige gain every time you buy it!"},
    cost: D(10),
    scaling: D(10),
    unlocked(){return hasUpgrade(209)},
    currency: "superprestige"
  },
  4:{
    display(){return "<h3>Premium pass" + (player.buyables[4].gt(1) ? " x" + formatWhole(player.buyables[4]) : "") +
      "</h3> It only costs "+format(getBuyableCost(4))+
      " super prestige points and will give a FREE level to the above buyable every time you buy it!"},
    cost: D(1000),
    scaling: D(10),
    unlocked(){return hasChallenge(3)},
    currency: "superprestige"
  },
  5:{
    display(){return "<h3>Trolling Point Effect" + (player.buyables[5].gt(1) ? " x" + formatWhole(player.buyables[5]) : "") +
      "</h3> It only costs "+format(getBuyableCost(5))+
      " ascension points and will unlock a NEW trolling point effect every time you buy it!"},
    cost: D(1e5),
    scaling: D(100),
    unlocked(){return hasMilestone(303)},
    currency: "ascensionpoints"
  },
}
function getBuyableCost(x){
  let y = buyables[x]
  if(!y.unlocked())return D(1/0)
  if(x==5&&player.buyables[5].gte(3))return D(1/0)
  return y.cost.mul(y.scaling.pow(player.buyables[x])).div(hasUpgrade(104)&&x<5?1e10:1)
}
function buyBuyable(x) {
  if (player[buyables[x].currency].gte(getBuyableCost(x))) {
    player[buyables[x].currency] = player[buyables[x].currency].sub(getBuyableCost(x));
    player.buyables[x]=player.buyables[x].add(1)
  }
}
var TEMP_VOIDSTART=getVoidStart()
var gameLoop = setInterval(() => {
  TEMP_VOIDSTART=getVoidStart()
  app.TEMP_VOIDSTART=TEMP_VOIDSTART
  player.points = player.points.add(getPointGain().mul(0.05));
  if(hasUpgrade(206))buyMaxAutomation()
  
  let fix = ["upgrades","milestones"]
  for(let k=0;k<fix.length;k++){
  for(let i=0;i<player[fix[k]].length;i++){
    if(player[fix[k]][i] instanceof Decimal){
      player[fix[k]][i]=player[fix[k]][i].toNumber()
    }
    if(typeof player[fix[k]][i]=="string"){
      player[fix[k]][i]=Number(player[fix[k]][i])
    }
  }
  }
  if(player.milestones.length>1000) player.milestones=[]// to fix a bug with saves
  if (player.trolUnlocks >= 1) player.technobabble.points = player.technobabble.points.add(getTechnobabblegain().mul(0.05));
  player.technobabble.t = player.technobabble.t.mul(Math.pow(1.05, player.technobabble.tSetting)).min(1e32).max(1);
  let tempSoup = {};
  for (let i in soups) {
    tempSoup[i] = soups[i].gain()
    player.technobabble[i] = player.technobabble[i].add(tempSoup[i].mul(0.05));
    if (player.technobabble[i].lte(0.01)) player.technobabble[i] = D(0);
  }
  if(hasUpgrade(208) && player.points.gte(100)) player.prestige = player.prestige.add(getPrestigeGain().mul(0.05))
  if(hasUpgrade(210) && player.prestige.gte(1e5)) player.superprestige=player.superprestige.add(getSPGain().mul(0.05))
  if(hasUpgrade(212)){
    for(let i in buyables){
      if(i==5) continue
      if(!buyables[i].unlocked()) continue
      if(player[buyables[i].currency].gte(getBuyableCost(i)))
      player.buyables[i]=player[buyables[i].currency].div(buyables[i].cost.div(hasUpgrade(104)?1e10:1)).log(buyables[i].scaling).add(1).floor()
    }
  }
  
  for (let i in milestones) {
    if (!hasMilestone(i) && milestones[i].done()){ player.milestones.push(i)} 
  }
}, 50);

function getAutomationCost(){return player.automationLevel.sqr().mul(50).add(50)}
function uninflate(auto,x=false){
  if(auto.gt("ee7")&&(!hasUpgrade(315)||x))auto=D(10).pow(auto.log10().pow(6/7).mul(10))
  return auto
}
function getPointGain() {
  let g = uninflate(hasUpgrade(315) ? D(1) : player.automationLevel)
  g = g.mul(inChallenge(2) ? 1:player.prestige.add(1).pow(inChallenge(5) ? 0.1:1).pow(hasChallenge(2)?1.25:1))
  g = g.mul(getPointMult())
  if(g.gte("ee10")&&!inChallenge(102)){g=g.log10().pow(1e9)}
  if(inChallenge(102)&&g.gt(10))g=g.log10().log10()
  return g
}
function getPrestigeGain(){
  if(player.points.lt(100))return D(0)
  let g=player.points.div(100).pow(2/3).mul(player.superprestige.add(1).pow(inChallenge(5)?0.1:1).pow(player.ascensionChallenges[1]>=1?2:1)).mul(hasUpgrade(204)?D(player.points).sqrt():1).floor()
  if(hasUpgrade(202))g=g.mul(Decimal.pow(inChallenge(3)?1:10,player.buyables[1].add(player.buyables[5].gte(1)?trollingEffect()[1]:D(0))))
  if(hasUpgrade(204))g=g.mul(player.points.pow(0.25))
  if(hasUpgrade(106))g=g.mul(1e200)
  if(g.gte(1e50)&&!hasUpgrade(314))g=g.sqrt().mul(1e25)
  if(hasChallenge(4))g=g.pow(1.05)
if(hasMilestone(304))g=g.pow(2)
  if(hasUpgrade(312))g=g.mul("ee13")
  if(player.ascensionChallenges[2]>=1)g=g.pow(1.5)
  return uninflate(g)
}
function getSPGain(){
  if(player.prestige.lt(1e5))return D(0)
  let g=player.prestige.div(100000).pow(1/4).mul(hasUpgrade(203)?1e6:1).floor()
  if(g.gte(1e200)&&!hasUpgrade(314))g=g.pow(1/5).mul(1e160)
  if(hasUpgrade(207)) g=g.mul(1e10) // nice
  g=g.mul(Decimal.pow(inChallenge(3)?1:2,player.buyables[3].add(player.buyables[4].add(player.buyables[5].gte(1)?trollingEffect()[1].mul(2):D(0)))));
  if(hasUpgrade(301)) g=g.mul(D(player.points).pow(0.01));
  if(hasUpgrade(308)) g=g.mul(upgrades[308].effect());
  if(hasUpgrade(309)) g=g.pow(1.05);
  if(hasUpgrade(312)) g=g.mul(1e1)  //shit, i mightve broke the game                     
  g = g.mul(soups.qgg.effect());
  
  

  return uninflate(g,true)
}
window.addEventListener("keydown",function(k){
    let key = k.key.toString()
    if(key=="p"){
      prestige()
    }    
  if(key=="s"){
    superPrestige()
  }
  if(key=="t"){
    doTrolling()
  }
  if(key=="m"){
    for(let i in buyables){
      if(!buyables[i].unlocked())return
      if(player[buyables[i].currency].gte(getBuyableCost(i)))
      player.buyables[i]=player[buyables[i].currency].div(buyables[i].cost.div(hasUpgrade(104)?1e10:1)).log(buyables[i].scaling).add(1).floor()
    }
  }
  if(key=="a"){
    ascend()
  }
},false)