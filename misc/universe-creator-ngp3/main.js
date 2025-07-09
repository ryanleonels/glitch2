function get(id) {
  return document.getElementById(id);
}
function getDefaultSave() {
  return {
    ideas: new Decimal(10),
    thinkers: [
      "empty",
      {
        unlocked: true,
        amount:new Decimal(0),
        cost:new Decimal(10),
        mult:new Decimal(1),
        bought:new Decimal(0),
        costMult:new Decimal(1.15),
        costScale:new Decimal(1.5),
        superCostScale:new Decimal(0.5)
      },
      {
        unlocked: false,
        amount:new Decimal(0),
        cost:new Decimal(100),
        mult:new Decimal(1),
        bought:new Decimal(0),
        costMult:new Decimal(1.2),
        costScale:new Decimal(1.5),
        superCostScale:new Decimal(0.5)
      },
      {
        unlocked: false,
        amount:new Decimal(0),
        cost:new Decimal(10000),
        mult:new Decimal(1),
        bought:new Decimal(0),
        costMult:new Decimal(1.3),
        costScale:new Decimal(1.5),
        superCostScale:new Decimal(0.5)
      },
      {
        unlocked: false,
        amount:new Decimal(0),
        cost:new Decimal(1000000),
        mult:new Decimal(1),
        bought:new Decimal(0),
        costMult:new Decimal(1.35),
        costScale:new Decimal(1.5),
        superCostScale:new Decimal(0.5)
      },
      {
        unlocked: false,
        amount:new Decimal(0),
        cost:new Decimal(1e9),
        mult:new Decimal(1),
        bought:new Decimal(0),
        costMult:new Decimal(1.375),
        costScale:new Decimal(1.5),
        superCostScale:new Decimal(0.5)
      },
      {
        unlocked: false,
        amount:new Decimal(0),
        cost:new Decimal(1e11),
        mult:new Decimal(1),
        bought:new Decimal(0),
        costMult:new Decimal(1.4),
        costScale:new Decimal(1.5),
        superCostScale:new Decimal(0.5)
      },
      {
        unlocked: false,
        amount:new Decimal(0),
        cost:new Decimal(100),
        mult:new Decimal(1),
        bought:new Decimal(0),
        costMult:new Decimal(1.41),
        costScale:new Decimal(1.5),
        superCostScale:new Decimal(0.5)
      },
      {
        unlocked: false,
        amount:new Decimal(0),
        cost:new Decimal(1000),
        mult:new Decimal(1),
        bought:new Decimal(0),
        costMult:new Decimal(1.42),
        costScale:new Decimal(1.5),
        superCostScale:new Decimal(0.5)
      }
    ],
    exist: new Decimal(0),
    lastTick: new Date().getTime(),
    creations: new Decimal(0),
    upgrades: [],
    existMult: new Decimal(1),
    existMultCost: new Decimal(2),
    existMultCostMult: new Decimal(2),
    existMultCostScale: new Decimal(1.5),
    tab: "s thinkers",
    subtab: {
      existence: "s existUpgrades",
      upgradeTree: "s treeUpgrades",
      abstract: "s manifoldsTab",
    },
    things: new Decimal(0),
    creators: [
      "empty",
      {
        amount:new Decimal(0),
        cost:new Decimal(100),
        mult:new Decimal(1),
        bought:new Decimal(0),
        costMult:new Decimal(10),
        costScale:new Decimal(5),
        superCostScale:new Decimal(1.5)
      },
      {
        amount:new Decimal(0),
        cost:new Decimal(1000),
        mult:new Decimal(1),
        bought:new Decimal(0),
        costMult:new Decimal(100),
        costScale:new Decimal(5),
        superCostScale:new Decimal(1.5)
      },
      {
        amount:new Decimal(0),
        cost:new Decimal(100000),
        mult:new Decimal(1),
        bought:new Decimal(0),
        costMult:new Decimal(1000),
        costScale:new Decimal(5),
        superCostScale:new Decimal(1.5)
      },
      {
        amount:new Decimal(0),
        cost:new Decimal(10000000),
        mult:new Decimal(1),
        bought:new Decimal(0),
        costMult:new Decimal(10000),
        costScale:new Decimal(5),
        superCostScale:new Decimal(1.5)
      }
    ],
    space: new Decimal(0),
    abstractions: new Decimal(0),
    manifolds: new Decimal(0),
    manifoldCost: new Decimal(1),
    manifoldCostMult: new Decimal(2),
    manifoldCostScale: new Decimal(2),
    manifoldCostScale2: new Decimal(2),
    manifoldMult: new Decimal(1),
    manifoldMult2: new Decimal(1),
    treeUpgrades: [],
    autos: [false,false,false,false,false,false,false,false],
    autoCs: [false,false,false,false],
    autoEm: false,
    gravityWell: false,
    thonks: new Decimal(10),
    thonkers: [
      "empty",
      {
        unlocked: true,
        amount:new Decimal(0),
        cost:new Decimal(10),
        mult:new Decimal(1),
        bought:new Decimal(0),
        costMult:new Decimal(1.15),
        costScale:new Decimal(1.5),
        superCostScale:new Decimal(0.5)
      },
      {
        unlocked: false,
        amount:new Decimal(0),
        cost:new Decimal(100),
        mult:new Decimal(1),
        bought:new Decimal(0),
        costMult:new Decimal(1.2),
        costScale:new Decimal(1.5),
        superCostScale:new Decimal(0.5)
      },
      {
        unlocked: false,
        amount:new Decimal(0),
        cost:new Decimal(10000),
        mult:new Decimal(1),
        bought:new Decimal(0),
        costMult:new Decimal(1.3),
        costScale:new Decimal(1.5),
        superCostScale:new Decimal(0.5)
      },
      {
        unlocked: false,
        amount:new Decimal(0),
        cost:new Decimal(1000000),
        mult:new Decimal(1),
        bought:new Decimal(0),
        costMult:new Decimal(1.35),
        costScale:new Decimal(1.5),
        superCostScale:new Decimal(0.5)
      },
      {
        unlocked: false,
        amount:new Decimal(0),
        cost:new Decimal(1e9),
        mult:new Decimal(1),
        bought:new Decimal(0),
        costMult:new Decimal(1.375),
        costScale:new Decimal(1.5),
        superCostScale:new Decimal(0.5)
      },
      {
        unlocked: false,
        amount:new Decimal(0),
        cost:new Decimal(1e11),
        mult:new Decimal(1),
        bought:new Decimal(0),
        costMult:new Decimal(1.4),
        costScale:new Decimal(1.5),
        superCostScale:new Decimal(0.5)
      },
    ],
    gravitons: new Decimal(0),
    gravityWaves: new Decimal(0),
    gravityUpgrades: [],
    gravityRebuyables: [new Decimal(0),new Decimal(0)],
    gravityRebuyableCosts: [new Decimal(1e5),new Decimal(1e7)],
    runningChallenge: null,
    challengesCompleted: {
      "sa1": new Decimal(0),
      "sa2": new Decimal(0),
    },
    ignorance: new Decimal(1)
  }
}

let player = getDefaultSave();

function gameLoop() {
  let newTime = new Date().getTime()
  let diff = (newTime - player.lastTick) / 1000;
  player.lastTick = newTime;
  produce(diff);
  update();
  mults();
  autoBuyers();
}

function produce(time) {
  
  player.ideas = player.thinkers[1].amount.times(time).times(player.thinkers[1].mult).add(player.ideas);
  for(let i = 1; i < 8; i++) {
    player.thinkers[i].amount = player.thinkers[i+1].amount.times(time).times(player.thinkers[i+1].mult).add(player.thinkers[i].amount);
  }
  player.things = player.creators[1].amount.times(time).times(player.creators[1].mult).add(player.things);
  for(let i = 1; i < 4; i++) {
    player.creators[i].amount = player.creators[i+1].amount.times(time).times(player.creators[i+1].mult).add(player.creators[i].amount);
  }
  player.thonks = player.thonkers[1].amount.times(time).times(player.thonkers[1].mult).add(player.thonks);
  for(let i = 1; i < 6; i++) {
    player.thonkers[i].amount = player.thonkers[i+1].amount.times(time).times(player.thonkers[i+1].mult).add(player.thonkers[i].amount);
  }
  
  if(player.runningChallenge == "sa2") player.ignorance = player.ignorance.pow(time).pow(2).times(player.ignorance.add(1))
  
  function gravitonsAreEpic() {
    let pineappleSoda = player.gravitons.sqr().times(Decimal.pow(2,player.gravityRebuyables[0]))
    
    if(player.treeUpgrades.includes("st91")) pineappleSoda = pineappleSoda.times(1e5)
    if(player.treeUpgrades.includes("st111")) pineappleSoda = pineappleSoda.times(player.manifolds.add(player.thonks.add(1).log(23).root(1.25).floor()).times(1e3).add(1))
    
    player.gravityWaves = player.gravityWaves.add(pineappleSoda);
  }
  
  gravitonsAreEpic()
}

function getThonkEffect() {
  let potatoes = player.thonks.add(1).log(23).root(1.25)
  
  potatoes = potatoes.pow(player.challengesCompleted["sa1"].add(1).pow(0.15))
  
  return potatoes
}

function update() {
  get("ideas").innerHTML = format(player.ideas,true);
  get("thonkEntities").innerHTML = format(player.thonks,true);
  get("thonkEffect").innerHTML = format(getThonkEffect(),true);
  let unlocked7 = false;
  for(let i = 1; i <= 8; i++) {
    get("tier"+i+"Amount").innerHTML = format(player.thinkers[i].amount,true);
    get("tier"+i+"Mult").innerHTML = format(player.thinkers[i].mult);
    get("tier"+i+"Cost").innerHTML = format(player.thinkers[i].cost,true);
    if(canBuyTier(i)) {
      get("buy1Tier"+i).className = "storebtn";
      get("buyMaxTier"+i).className = "storebtn";
    } else {
      get("buy1Tier"+i).className = "storebtnlocked";
      get("buyMaxTier"+i).className = "storebtnlocked";
    }
    if(i <= 6) {
      if(player.creations.gte(i-1)) {
        get("tier"+i).style.display = "";
        player.thinkers[i].unlocked = true;
      } else {
        get("tier"+i).style.display = "none";
        player.thinkers[i].unlocked = false;
      }
    if (i <= 6) {
      get("tier"+i+"AmountT").innerHTML = format(player.thonkers[i].amount,true);
      get("tier"+i+"MultT").innerHTML = format(player.thonkers[i].mult);
      get("tier"+i+"CostT").innerHTML = format(player.thonkers[i].cost,true);
      if(i > 1 && player.thonkers[i-1].amount.gt(0)) {
        player.thonkers[i].unlocked = true
      }
    if(canBuyTierT(i)) {
      get("buy1Tier"+i+"T").className = "abstractbtn";
      get("buyMaxTier"+i+"T").className = "abstractbtn";
    } else {
      get("buy1Tier"+i+"T").className = "storebtnlocked";
      get("buyMaxTier"+i+"T").className = "storebtnlocked";
    }
      if(player.thinkers[i].unlocked == true) {
        get("tier"+i+"T").style.display = "";
      } else {
        get("tier"+i+"T").style.display = "none";
      }
    }

    } else {
      if((player.exist.gte(player.thinkers[i].cost) || player.thinkers[i].amount.gt(0))&& player.creations.gte(5)) {
        get("tier"+i).style.display = "";
        unlocked7 = true;
        player.thinkers[i].unlocked = true;
      } else {
        get("tier"+i).style.display = "none";
        player.thinkers[i].unlocked = false;
      }
    }
  }
  if(unlocked7) {
    get("weakMaxAll").style.display = "";
  } else {
    get("weakMaxAll").style.display = "none";
  }
  if(existOnCreate().gte(1) && player.ideas.gt(10)) {
    get("creation").style.display = "";
    get("existOnCreate").innerHTML = format(existOnCreate(),true);
  } else {
    get("creation").style.display = "none";
  }
  if(player.creations.gt(0)) {
    get("existenceTab").style.display = "";
    get("exist").innerHTML = format(player.exist,true);
  } else {
    get("existenceTab").style.display = "none";
  }
  if(player.upgrades.includes("s11")) {
    get("upgrade11").className = "upgradebtn upgradebought";
  } else if(canBuyUpgrade("11")) {
    get("upgrade11").className = "upgradebtn creationbtn";
  } else {
    get("upgrade11").className = "upgradebtn storebtnlocked";
  }
  
  if(player.upgrades.includes("s21")) {
    get("upgrade21").className = "upgradebtn upgradebought";
  } else if(canBuyUpgrade("21")) {
    get("upgrade21").className = "upgradebtn creationbtn";
  } else {
    get("upgrade21").className = "upgradebtn storebtnlocked";
  }
  if(canBuyUpgrade("12")) {
    get("upgrade12").className = "upgradebtn creationbtn";
  } else {
    get("upgrade12").className = "upgradebtn storebtnlocked";
  }
  if(player.upgrades.includes("s31")) {
    get("upgrade31").className = "upgradebtn upgradebought";
  } else if(canBuyUpgrade("31")) {
    get("upgrade31").className = "upgradebtn creationbtn";
  } else {
    get("upgrade31").className = "upgradebtn storebtnlocked";
  }
  if(player.upgrades.includes("s32")) {
    get("upgrade32").className = "upgradebtn upgradebought";
  } else if(canBuyUpgrade("32")) {
    get("upgrade32").className = "upgradebtn creationbtn";
  } else {
    get("upgrade32").className = "upgradebtn storebtnlocked";
  }
  get("existMult").innerHTML = format(player.existMult);
  get("existMultCost").innerHTML = format(player.existMultCost,true);
  
  if(player.upgrades.includes("s22")) {
    get("upgrade22").className = "upgradebtn upgradebought";
    get("creatorsSubtab").style.display = "";
  } else if(canBuyUpgrade("22")) {
    get("upgrade22").className = "upgradebtn creationbtn";
    get("creatorsSubtab").style.display = "none";
  } else {
    get("upgrade22").className = "upgradebtn storebtnlocked";
    get("creatorsSubtab").style.display = "none";
  }
  get("things").innerHTML = format(player.things,true);
  get("thingsMult").innerHTML = format(player.things.sqr().add(1),true);
  for(let i = 1; i <= 4; i++) {
    get("tier"+i+"CAmount").innerHTML = format(player.creators[i].amount,true);
    get("tier"+i+"CMult").innerHTML = format(player.creators[i].mult);
    get("tier"+i+"CCost").innerHTML = format(player.creators[i].cost,true);
    if(canBuyTierC(i)) {
      get("buy1Tier"+i+"C").className = "creationbtn";
      get("buyMaxTier"+i+"C").className = "creationbtn";
    } else {
      get("buy1Tier"+i+"C").className = "storebtnlocked";
      get("buyMaxTier"+i+"C").className = "storebtnlocked";
    }
  }
  if(player.runningChallenge != null) {
    get("abstraction").style.display = "";
    if(spaceOnAbstract().gte(getChallengeGoal(player.runningChallenge))) {
      get("abstraction").innerHTML = "Abstract things<br/> Complete this challenge"
    } else {
      get("abstraction").innerHTML = "Reach " + format(getChallengeGoal(player.runningChallenge),true) + " existence";
    }
  } else if(spaceOnAbstract().gte(1) && !player.gravityWell) {
    get("abstraction").style.display = "";
    get("abstraction").innerHTML = "Abstract things<br/> Gain " + format(spaceOnAbstract(),true) + " space";
  } else if(spaceOnAbstract().lt(1)) {
    get("abstraction").style.display = "none";
  } else {
    if(getGravGain().gte(player.gravitons)) {
      get("abstraction").style.display = "";
      get("abstraction").innerHTML = "Abstract things<br/> Gain " + format(getGravGain().minus(player.gravitons),true) + " gravitons";
    } else {
      get("abstraction").style.display = "";
      get("abstraction").innerHTML = "Reach " + format(reverseGravGain(player.gravitons),true) + " existence";
    }
  }

  if(player.abstractions.gt(0)) {
    get("abstractTab").style.display = "";
    get("upgradeTreeTab").style.display = "";
    get("space").innerHTML = format(player.space,true);
  } else {
    get("abstractTab").style.display = "none";
    get("upgradeTreeTab").style.display = "none";
  }
  if(!getThonkEffect().gt(1)) {
    get("manifolds").innerHTML = format(player.manifolds,true);
  } else {
    get("manifolds").innerHTML = format(player.manifolds,true) + " + " + format(getThonkEffect(), true);
  }
  get("manifoldCost").innerHTML = format(player.manifoldCost,true);
  if(canBuyManifold()) {
    get("buyManifold").className = "storebtn";
  } else {
    get("buyManifold").className = "storebtnlocked";
  }
  if(player.treeUpgrades.includes("st11")) {
    get("st11").className = "treebtn upgradebought";
  } else if(canBuyTreeUpgrade("t11")) {
    get("st11").className = "treebtn abstractbtn";
  } else {
    get("st11").className = "treebtn storebtnlocked";
  }
  if(player.treeUpgrades.includes("st21")) {
    get("st21").className = "treebtn upgradebought";
  } else if(canBuyTreeUpgrade("t21")) {
    get("st21").className = "treebtn abstractbtn";
  } else {
    get("st21").className = "treebtn storebtnlocked";
  }
  if(player.treeUpgrades.includes("st22")) {
    get("st22").className = "treebtn upgradebought";
  } else if(canBuyTreeUpgrade("t22")) {
    get("st22").className = "treebtn abstractbtn";
  } else {
    get("st22").className = "treebtn storebtnlocked";
  }
  if(player.treeUpgrades.includes("st23")) {
    get("st23").className = "treebtn upgradebought";
  } else if(canBuyTreeUpgrade("t23")) {
    get("st23").className = "treebtn abstractbtn";
  } else {
    get("st23").className = "treebtn storebtnlocked";
  }
  if(player.treeUpgrades.includes("st31")) {
    get("st31").className = "smalltext treebtn upgradebought";
    get("autobuyersSubtab").style.display = "";
  } else if(canBuyTreeUpgrade("t31")) {
    get("st31").className = "smalltext treebtn abstractbtn";
  } else {
    get("st31").className = "smalltext treebtn storebtnlocked";
  }
  if(player.treeUpgrades.includes("st41")) {
    get("st41").className = "smalltext treebtn upgradebought";
  } else if(canBuyTreeUpgrade("t41")) {
    get("st41").className = "smalltext treebtn abstractbtn";
  } else {
    get("st41").className = "smalltext treebtn storebtnlocked";
  }
  if(player.treeUpgrades.includes("st51")) {
    get("st51").className = "smalltext treebtn upgradebought";
  } else if(canBuyTreeUpgrade("t51")) {
    get("st51").className = "smalltext treebtn abstractbtn";
  } else {
    get("st51").className = "smalltext treebtn storebtnlocked";
  }
  if(player.treeUpgrades.includes("st52")) {
    get("st52").className = "smalltext treebtn upgradebought";
  } else if(canBuyTreeUpgrade("t52")) {
    get("st52").className = "smalltext treebtn abstractbtn";
  } else {
    get("st52").className = "smalltext treebtn storebtnlocked";
  }
  if(player.treeUpgrades.includes("st53")) {
    get("st53").className = "smalltext treebtn upgradebought";
  } else if(canBuyTreeUpgrade("t53")) {
    get("st53").className = "smalltext treebtn abstractbtn";
  } else {
    get("st53").className = "smalltext treebtn storebtnlocked";
  }
  if(player.treeUpgrades.includes("st61")) {
    get("st61").className = "smalltext treebtn upgradebought";
  } else if(canBuyTreeUpgrade("t61")) {
    get("st61").className = "smalltext treebtn abstractbtn";
  } else {
    get("st61").className = "smalltext treebtn storebtnlocked";
  }
  if(player.treeUpgrades.includes("st62")) {
    get("st62").className = "smalltext treebtn upgradebought";
  } else if(canBuyTreeUpgrade("t62")) {
    get("st62").className = "smalltext treebtn abstractbtn";
  } else {
    get("st62").className = "smalltext treebtn storebtnlocked";
  }
  if(player.treeUpgrades.includes("sd1")) {
    get("sd1").className = "smalltext treebtn upgradebought";
    get("gravitySubtab").style.display = "";
  } else if(canBuyTreeUpgrade("d1")) {
    get("sd1").className = "smalltext treebtn gravwelbtn";
    get("gravitySubtab").style.display = "none";
  } else {
    get("sd1").className = "smalltext treebtn storebtnlocked";
    get("gravitySubtab").style.display = "none";
  }
  if(player.treeUpgrades.includes("sd2")) {
    get("sd2").className = "smalltext treebtn upgradebought";
    get("thonkSubtab").style.display = "";
  } else if(canBuyTreeUpgrade("d2")) {
    get("sd2").className = "smalltext treebtn gravwelbtn";
    get("thonkSubtab").style.display = "none";
  } else {
    get("sd2").className = "smalltext treebtn storebtnlocked";
    get("thonkSubtab").style.display = "none";
  }
  if(player.treeUpgrades.includes("st71")) {
    get("st71").className = "smalltext treebtn upgradebought";
  } else if(canBuyTreeUpgrade("t71")) {
    get("st71").className = "smalltext treebtn abstractbtn";
  } else {
    get("st71").className = "smalltext treebtn storebtnlocked";
  }
  if(player.treeUpgrades.includes("st81")) {
    get("st81").className = "smalltext treebtn upgradebought";
  } else if(canBuyTreeUpgrade("t81")) {
    get("st81").className = "smalltext treebtn abstractbtn";
  } else {
    get("st81").className = "smalltext treebtn storebtnlocked";
  }
  if(player.treeUpgrades.includes("st82")) {
    get("st82").className = "smalltext treebtn upgradebought";
  } else if(canBuyTreeUpgrade("t82")) {
    get("st82").className = "smalltext treebtn abstractbtn";
  } else {
    get("st82").className = "smalltext treebtn storebtnlocked";
  }
  for(let i = 1; i <= 4; i++) {
    if(player.treeUpgrades.includes("st9" + i)) {
      get("st9" + i).className = "smalltext treebtn upgradebought";
    } else if(canBuyTreeUpgrade("t9" + i)) {
      get("st9" + i).className = "smalltext treebtn abstractbtn";
    } else {
      get("st9" + i).className = "smalltext treebtn storebtnlocked";
  }
  for(let i = 1; i <= 2; i++) {
    if(player.treeUpgrades.includes("st10" + i)) {
      get("st10" + i).className = "smalltext treebtn upgradebought";
    } else if(canBuyTreeUpgrade("t10" + i)) {
      get("st10" + i).className = "smalltext treebtn abstractbtn";
    } else {
      get("st10" + i).className = "smalltext treebtn storebtnlocked";
  }
  }
  if(player.treeUpgrades.includes("st111")) {
    get("st111").className = "smalltext treebtn upgradebought";
  } else if(canBuyTreeUpgrade("t111")) {
    get("st111").className = "smalltext treebtn abstractbtn";
  } else {
    get("st111").className = "smalltext treebtn storebtnlocked";
  }
  for(let i = 1; i <= 3; i++) {
    if(player.treeUpgrades.includes("st12" + i)) {
      get("st12" + i).className = "smalltext treebtn upgradebought";
    } else if(canBuyTreeUpgrade("t12" + i)) {
      get("st12" + i).className = "smalltext treebtn abstractbtn";
    } else {
      get("st12" + i).className = "smalltext treebtn storebtnlocked";
  }
  }
  for(let i = 1; i <= 4; i++) {
    if(player.treeUpgrades.includes("st13" + i)) {
      get("st13" + i).className = "smalltext treebtn upgradebought";
    } else if(canBuyTreeUpgrade("t13" + i)) {
      get("st13" + i).className = "smalltext treebtn abstractbtn";
    } else {
      get("st13" + i).className = "smalltext treebtn storebtnlocked";
  }
  }
  for(let i = 1; i <= 2; i++) {
    if(player.treeUpgrades.includes("sa" + i)) {
      get("sa" + i).className = "smalltext treebtn upgradebought";
    } else if(canBuyTreeUpgrade("a" + i)) {
      get("sa" + i).className = "smalltext treebtn gravwelbtn";
    } else {
      get("sa" + i).className = "smalltext treebtn storebtnlocked";
  }
  }
   }
  resizeCanvas();
  for(let i = 0; i < player.autos.length; i++) {
    if(player.autos[i]) {
      get("toggleAuto"+(i+1)).className = "storebtn";
    } else {
      get("toggleAuto"+(i+1)).className = "storebtnlocked";
    }
  }
  for(let i = 0; i < player.autoCs.length; i++) {
    if(player.autoCs[i]) {
      get("toggleAutoC"+(i+1)).className = "creationbtn";
    } else {
      get("toggleAutoC"+(i+1)).className = "storebtnlocked";
    }
  }
  if(player.treeUpgrades.includes("sd1")) {
    get("st71").style.display = "";
    for(let i = 1; i <= 4; i++) {
      get("st9" + i).style.display = "";
    }
    for(let i = 1; i <= 2; i++) {
      get("st10" + i).style.display = "";
      get("st8" + i).style.display = "";
    }
    get("sd2").style.display = "";
  } else {
    get("st71").style.display = "none";
    for(let i = 1; i <= 4; i++) {
      get("st9" + i).style.display = "none";
    }
    for(let i = 1; i <= 2; i++) {
      get("st10" + i).style.display = "none";
      get("st8" + i).style.display = "none";
    }
    get("sd2").style.display = "none";
  }
  if(player.treeUpgrades.includes("sa1") || player.treeUpgrades.includes("sa2")) {
    get("challengesSubtab").style.display = "";
  } else {
    get("challengesSubtab").style.display = "none";
  }
  if(player.treeUpgrades.includes("sd2")) {
    get("st111").style.display = "";
    for(let i = 1; i <= 3; i++) {
      get("st12" + i).style.display = "";
    }
    for(let i = 1; i <= 4; i++) {
      get("st13" + i).style.display = "";
    }
  } else {
    get("st111").style.display = "none";
    for(let i = 1; i <= 3; i++) {
      get("st12" + i).style.display = "none";
    }
    for(let i = 1; i <= 4; i++) {
      get("st13" + i).style.display = "none";
    }
  }
  if(player.autoEm) {
    get("toggleAutoEm").className = "creationbtn";
  } else {
    get("toggleAutoEm").className = "storebtnlocked";
  }
  get("gravitonAmount").innerHTML = format(player.gravitons,true);
  get("gravityWaves").innerHTML = format(player.gravityWaves,true);
  if(player.treeUpgrades.includes("st121")) {
    get("manifoldMult").innerHTML = format(player.gravityWaves.add(7500).log(7500));
  } else {
    get("manifoldMult").innerHTML = format(player.gravityWaves.add(7000).log(7000));
  }

  if(canBuyGravUpgrade("g11")) {
    get("sg11").className = "upgradebtn gravitybtn";
  } else {
    get("sg11").className = "upgradebtn storebtnlocked";
  }
  get("sg11cost").innerHTML = format(player.gravityRebuyableCosts[0],true);
  get("sg12cost").innerHTML = format(player.gravityRebuyableCosts[1],true);
  if(canBuyGravUpgrade("g12")) {
    get("sg12").className = "upgradebtn gravitybtn";
  } else {
    get("sg12").className = "upgradebtn storebtnlocked";
  }
  if(player.gravityUpgrades.includes("sg21")) {
    get("sg21").className = "upgradebtn upgradebought";
  } else if(canBuyGravUpgrade("g21")) {
    get("sg21").className = "upgradebtn gravitybtn";
  } else {
    get("sg21").className = "upgradebtn storebtnlocked";
  }
  if(player.gravityUpgrades.includes("sg22")) {
    get("sg22").className = "upgradebtn upgradebought";
  } else if(canBuyGravUpgrade("g22")) {
    get("sg22").className = "upgradebtn gravitybtn";
  } else {
    get("sg22").className = "upgradebtn storebtnlocked";
  }
  if(player.gravityUpgrades.includes("sg31")) {
    get("sg31").className = "upgradebtn upgradebought";
  } else if(canBuyGravUpgrade("g31")) {
    get("sg31").className = "upgradebtn gravitybtn";
  } else {
    get("sg31").className = "upgradebtn storebtnlocked";
  }
  if(player.gravityUpgrades.includes("sg32")) {
    get("sg32").className = "upgradebtn upgradebought";
  } else if(canBuyGravUpgrade("g32")) {
    get("sg32").className = "upgradebtn gravitybtn";
  } else {
    get("sg32").className = "upgradebtn storebtnlocked";
  }
  if(player.gravityWell) {
    get("gravityWell").innerHTML = "Exit the Gravity Well";
  } else {
    get("gravityWell").innerHTML = "Enter the Gravity Well";
  }
}
function mults() {
  let gravityMult = new Decimal(1);
  if(player.gravityWell) {
    if(player.gravityUpgrades.includes("sg22")) {
      gravityMult = player.ideas.root(1.4);
    } else {
      gravityMult = player.ideas.root(1.2);
    }
  }
  player.manifoldMult = new Decimal(1.2).pow(player.manifolds.add(getThonkEffect().floor()));
  player.manifoldMult2 = new Decimal(1.05).pow(player.manifolds.add(getThonkEffect().floor()).cbrt());
  if(player.treeUpgrades.includes("st22")) {
    player.manifoldMult = player.manifoldMult.pow(1.5);
    player.manifoldMult2 = player.manifoldMult2.pow(1.5);
  }
  if(player.treeUpgrades.includes("st82")) {
    player.manifoldMult = player.manifoldMult.pow(1.12);
    player.manifoldMult2 = player.manifoldMult2.pow(1.12);
  }
  if(player.treeUpgrades.includes("st121")) {
    player.manifoldMult = player.manifoldMult.times(player.gravityWaves.add(7000).log(7000));
    player.manifoldMult2 = player.manifoldMult2.times(player.gravityWaves.add(7000).log(7000));
  } else {
    player.manifoldMult = player.manifoldMult.times(player.gravityWaves.add(7500).log(7500));
    player.manifoldMult2 = player.manifoldMult2.times(player.gravityWaves.add(7500).log(7500));
  }
  if(player.runningChallenge == "sa1") {
    player.manifoldMult = new Decimal(1)
    player.manifoldMult2 = new Decimal(1)
  }
  for(let i = 1; i <= 8; i++) {
    if(player.upgrades.includes("s11")) {
      if(player.treeUpgrades.includes("st94")) {
        player.thinkers[i].mult = (player.manifoldMult.times(1.75)).pow(player.thinkers[i].bought);
      } else {
        player.thinkers[i].mult = (player.manifoldMult.times(1.02)).pow(player.thinkers[i].bought);
      }
    } else {
      player.thinkers[i].mult = (player.manifoldMult.times(1.01)).pow(player.thinkers[i].bought);
    }
    if((!player.gravityWell && player.treeUpgrades.includes("st93")) || !player.treeUpgrades.includes("st93")) {
      if(player.upgrades.includes("s21")) {
        player.thinkers[i].mult = player.thinkers[i].mult.times(player.creations.cbrt().plus(1));
      }
      if(player.upgrades.includes("s31")) {
        player.thinkers[i].mult = player.thinkers[i].mult.times(player.exist.add(10).log(10));
      }
      if(player.upgrades.includes("s32")) {
        player.thinkers[i].mult = player.thinkers[i].mult.times(player.ideas.add(10).log(10).divide(400).add(1));
      }
      if(player.treeUpgrades.includes("st71")) {
        player.thinkers[i].mult = player.thinkers[i].mult.times(player.things.add(1).pow(5));
      }
    }
    player.thinkers[i].mult = player.thinkers[i].mult.times(player.things.add(1).sqr());
    player.thinkers[i].mult = player.thinkers[i].mult.div(gravityMult).max(1);
    if(player.gravityUpgrades.includes("sg31")) {
      player.thinkers[i].mult = player.thinkers[i].mult.times(player.gravityWaves.add(1.24).log(1.24));
    }
    if(player.runningChallenge == "sa2") player.thinkers[i].mult = player.thinkers[i].mult.root(30)
    if(player.gravityWell && player.treeUpgrades.includes("st93")) {
      if(player.upgrades.includes("s21")) {
        player.thinkers[i].mult = player.thinkers[i].mult.times(player.creations.cbrt().plus(1));
      }
      if(player.upgrades.includes("s31")) {
        player.thinkers[i].mult = player.thinkers[i].mult.times(player.exist.add(10).log(10));
      }
      if(player.upgrades.includes("s32")) {
        player.thinkers[i].mult = player.thinkers[i].mult.times(player.ideas.add(2).log(10).divide(400).add(1));
      }
      if(player.treeUpgrades.includes("st71")) {
        player.thinkers[i].mult = player.thinkers[i].mult.times(player.things.add(1).pow(5));
      }
    }
  }
  for(let i = 1; i <= 6; i++) {
      if(player.treeUpgrades.includes("st131")) {
         player.thonkers[i].mult = new Decimal(1.2).pow(player.thonkers[i].bought);
      } else {
         player.thonkers[i].mult = new Decimal(1.1).pow(player.thonkers[i].bought);
      }
    player.thonkers[i].mult = player.thonkers[i].mult.times(player.gravityWaves.add(1).root(500))
      if(player.treeUpgrades.includes("st121")) {
        player.thonkers[i].mult = player.thonkers[i].mult.times(10);
      }
      if(player.treeUpgrades.includes("st123")) {
        player.thonkers[i].mult = player.thonkers[i].mult.times(player.manifolds.add(1));
      }
      if(player.treeUpgrades.includes("st122")) {
        player.thonkers[i].mult = player.thonkers[i].mult.pow(player.manifoldMult2.pow(0.01).add(1));
      }
      if(player.treeUpgrades.includes("st132")) {
        player.thonkers[i].mult = player.thonkers[i].mult.times(player.space.add(10).log(10));
      }
      if(player.treeUpgrades.includes("st133")) {
        player.thonkers[i].mult = player.thonkers[i].mult.times(player.thonks.add(10).log(10).divide(1200).add(1));
      }
  }
  for(let i = 1; i <= 4; i++) {
    if(player.treeUpgrades.includes("st11")) {
      player.creators[i].mult = player.manifoldMult2.times(1.1).pow(player.creators[i].bought);
    } else {
      player.creators[i].mult = new Decimal(1.1).pow(player.creators[i].bought);
    }
    if(player.treeUpgrades.includes("st23")) player.creators[i].mult = player.creators[i].mult.times(player.space.add(2).log(10).pow(1/5).add(1))
    if(player.treeUpgrades.includes("st41")) player.creators[i].mult = player.creators[i].mult.times(1e20);
    if(player.treeUpgrades.includes("st51")) player.creators[i].mult = player.creators[i].mult.times(player.things.add(2).log(10).pow(1/5).add(1));
    if(player.treeUpgrades.includes("st52")) player.creators[i].mult = player.creators[i].mult.times(player.abstractions.sqrt().add(1));
    if(player.treeUpgrades.includes("st53")) player.creators[i].mult = player.creators[i].mult.times(player.manifolds.divide(8000).add(1));
    if(player.treeUpgrades.includes("st62")) player.creators[i].mult = player.creators[i].mult.times(player.existMult.add(2).log(10));
    if(player.treeUpgrades.includes("st101") && !player.gravityWell) player.creators[i].mult = player.creators[i].mult.times(player.gravityWaves.add(1).pow(2.65));
    player.creators[i].mult = player.creators[i].mult.div(gravityMult).max(1);
  }
}
function existOnCreate() {
  return new Decimal(2).pow((player.ideas.add(1)).log2().div(Math.log2(100)).sub(1)).times(player.existMult);
}
function buyTier(tier) {
  if(canBuyTier(tier) && tier <= 6) {
    player.thinkers[tier].amount = player.thinkers[tier].amount.add(1);
    player.ideas = player.ideas.sub(player.thinkers[tier].cost);
    player.thinkers[tier].cost = player.thinkers[tier].cost.times(player.thinkers[tier].costMult);
    player.thinkers[tier].bought = player.thinkers[tier].bought.add(1);
    if(player.thinkers[tier].cost.gte(1e9)) {
      player.thinkers[tier].costMult = player.thinkers[tier].costMult.times(player.thinkers[tier].costScale);
      if(player.thinkers[tier].cost.gte(1e50)) {
        player.thinkers[tier].costScale = player.thinkers[tier].costScale.add(player.thinkers[tier].superCostScale);
        if(player.gravityUpgrades.includes("sg21")) {
          player.thinkers[tier].costScale = player.thinkers[tier].costScale.minus(0.5);
        }
      }
    }
  } else if(canBuyTier(tier) && tier >= 7) {
    player.thinkers[tier].amount = player.thinkers[tier].amount.add(1);
    player.exist = player.exist.sub(player.thinkers[tier].cost);
    player.thinkers[tier].cost = player.thinkers[tier].cost.times(player.thinkers[tier].costMult);
    player.thinkers[tier].bought = player.thinkers[tier].bought.add(1);
    if(player.thinkers[tier].cost.gte(1e3)) {
      player.thinkers[tier].costMult = player.thinkers[tier].costMult.times(player.thinkers[tier].costScale);
      if(player.thinkers[tier].cost.gte(1e9)) {
        player.thinkers[tier].costScale = player.thinkers[tier].costScale.add(player.thinkers[tier].superCostScale);
        if(player.gravityUpgrades.includes("sg21")) {
          player.thinkers[tier].costScale = player.thinkers[tier].costScale.minus(0.5);
        }
      }
    }
  }
}
function buyTierT(tier) {
  if(canBuyTierT(tier)) {
    player.thonkers[tier].amount = player.thonkers[tier].amount.add(1);
    player.thonks = player.thonks.sub(player.thonkers[tier].cost);
    player.thonkers[tier].cost = player.thonkers[tier].cost.times(player.thonkers[tier].costMult);
    player.thonkers[tier].bought = player.thonkers[tier].bought.add(1);
    if(player.thonkers[tier].cost.gte(1e9)) {
      player.thonkers[tier].costMult = player.thonkers[tier].costMult.times(player.thonkers[tier].costScale);
      if(player.thonkers[tier].cost.gte(1e50)) {
        player.thonkers[tier].costScale = player.thonkers[tier].costScale.add(player.thonkers[tier].superCostScale);
        if(player.gravityUpgrades.includes("sg21")) {
          player.thonkers[tier].costScale = player.thonkers[tier].costScale.minus(0.5);
        }
      }
    }
  }
}
function canBuyTier(tier) {
  if(player.ideas.gte(player.thinkers[tier].cost) && tier <= 6 && player.thinkers[tier].unlocked) {
    return true;
  } else if(player.exist.gte(player.thinkers[tier].cost) && tier > 6 && player.thinkers[tier].unlocked) {
    return true;
  } else {
    return false
  }
}
function canBuyTierT(tier) {
  if(player.thonks.gte(player.thonkers[tier].cost) && player.thonkers[tier].unlocked) {
    return true;
  } else {
    return false
  }
}
function buyMaxTierT(tier) {
    while(canBuyTierT(tier)) {
      buyTierT(tier);
  } 
}

function buyMaxTier(tier) {
  if(tier <= 6) {
    while(canBuyTier(tier)) {
      buyTier(tier);
    }
  } else {
    while(canBuyTier(tier)) {
      buyTier(tier);
    }
  }
}

function maxAll(weak) {
  let j;
  if(weak) {
    j = 6;
  } else {
    j = 8;
  }
  for(let i = j; i > 0; i--) {
    buyMaxTier(i);
  }
}
function buyTierC(tier) {
  if(canBuyTierC(tier)) {
    player.creators[tier].amount = player.creators[tier].amount.add(1);
    player.exist = player.exist.sub(player.creators[tier].cost);
    player.creators[tier].cost = player.creators[tier].cost.times(player.creators[tier].costMult);
    player.creators[tier].bought = player.creators[tier].bought.add(1);
    if(player.creators[tier].cost.gte(1e9)) {
      player.creators[tier].costMult = player.creators[tier].costMult.times(player.creators[tier].costScale);
    }
    if(player.creators[tier].cost.gte(1e300)) {
      player.creators[tier].costScale = player.creators[tier].costScale.times(player.creators[tier].superCostScale);
    }
  }
}
function canBuyTierC(tier) {
  if(player.exist.gte(player.creators[tier].cost)) {
    return true;
  } else {
    return false
  }
}
function buyMaxTierC(tier) {
  while(canBuyTierC(tier)) {
    buyTierC(tier);
  }
}
function maxAllC() {
  for(let i = 4; i > 0; i--) {
    buyMaxTierC(i);
  }
}
function maxAllT() {
  for(let i = 6; i > 0; i--) {
    buyMaxTierT(i);
  }
}
function upgradeCost(upgrade) {
  let cost = new Decimal(0);
  switch(upgrade) {
    case "11":
      cost = new Decimal(1);
      break;
    case "12":
      cost = player.existMultCost;
      break;
    case "21":
      cost = new Decimal(2);
      break;
    case "22":
      cost = new Decimal(1000);
      break;
    case "31":
      cost = new Decimal(4);
      break;
    case "32":
      cost = new Decimal(4);
      break;
    case "t11":
      cost = new Decimal(100);
      break;
    case "t21":
      cost = new Decimal(1e5);
      break;
    case "t22":
      cost = new Decimal(1e7);
      break;
    case "t23":
      cost = new Decimal(1e9);
      break;
    case "t31":
      cost = new Decimal(1e20);
      break;
    case "t41":
      cost = new Decimal(1e30);
      break;
    case "t51":
      cost = new Decimal(1e40);
      break;
    case "t52":
      cost = new Decimal(1e45);
      break;
    case "t53":
      cost = new Decimal(1e50);
      break;
    case "t61":
      cost = new Decimal(1e55);
      break;
    case "t62":
      cost = new Decimal(1e55);
      break;
    case "t71":
      cost = new Decimal(1e200);
      break;
    case "t81":
      cost = new Decimal("1e450");
      break;
    case "t82":
      cost = new Decimal("1e450");
      break;
    case "t91":
      cost = new Decimal("1e600");
      break;
    case "t92":
      cost = new Decimal("1e800");
      break;
    case "t93":
      cost = new Decimal("1e1000");
      break;
    case "t94":
      cost = new Decimal("1e1200");
      break;
    case "t101":
      cost = new Decimal("1e1650");
      break;
    case "t102":
      cost = new Decimal("1e1650");
      break;
    case "t111":
      cost = new Decimal("1e5000");
      break;
    case "t121":
      cost = new Decimal("1e5200");
      break;
    case "t122":
      cost = new Decimal("1e5300");
      break;
    case "t123":
      cost = new Decimal("1e5100");
      break;
    case "t132":
      cost = new Decimal("1e6200");
      break;
    case "t133":
      cost = new Decimal("1e6200");
      break;
    case "t131":
      cost = new Decimal("1e6500");
      break;
    case "t134":
      cost = new Decimal("1e6500");
      break;
    case "d1":
      cost = new Decimal(1e60);
      break;
    case "d2":
      cost = new Decimal("1e4200");
      break;
    case "a1":
      cost = new Decimal("1e6969");
      break;
    case "a2":
      cost = new Decimal("1e6969");
      break;
    case "g11":
      cost = player.gravityRebuyableCosts[0];
      break;
    case "g12":
      cost = player.gravityRebuyableCosts[1];
      break;
    case "g21":
      cost = new Decimal(1e7);
      break;
    case "g22":
      cost = new Decimal(1e8);
      break;
    case "g31":
      cost = new Decimal(1e30);
      break;
    case "g32":
      cost = new Decimal(1e170);
      break;
  }
  return cost;
}
function upgradeUnlock(upgrade) {
  let unlock = ["none"];
  switch(upgrade) {
    case "t21":
      unlock = ["st11"];
      break;
    case "t22":
      unlock = ["st11"];
      break;
    case "t23":
      unlock = ["st11"];
      break;
    case "t31":
      unlock = ["st21","st22","st23"];
      break;
    case "t41":
      unlock = ["st31"];
      break;
    case "t51":
      unlock = ["st41"];
      break;
    case "t52":
      unlock = ["st41"];
      break;
    case "t53":
      unlock = ["st41"];
      break;
    case "t61":
      unlock = ["st51"];
      break;
    case "t62":
      unlock = ["st53"];
      break;
    case "t71":
      unlock = ["sd1"];
      break;
    case "d1":
      unlock = ["st51"];
      break;
    case "t81":
      unlock = ["st71"];
      break;
    case "t82":
      unlock = ["st71"];
      break;
    case "t91":
      unlock = ["st81"];
      break;
    case "t92":
      unlock = ["st81"];
      break;
    case "t93":
      unlock = ["st82"];
      break;
    case "t94":
      unlock = ["st82"];
      break;
    case "t101":
      unlock = ["st91", "st92"];
      break;
    case "t102":
      unlock = ["st93", "st94"];
      break;
    case "d2":
      unlock = ["st101", "st102"];
      break;
    case "t111":
      unlock = ["sd2"];
      break;
    case "t121":
      unlock = ["st111"];
      break;
    case "t122":
      unlock = ["st111"];
      break;
    case "t123":
      unlock = ["st111"];
      break;
    case "t132":
      unlock = ["st121"];
      break;
    case "t133":
      unlock = ["st123"];
      break;
    case "t131":
      unlock = ["st132"];
      break;
    case "t134":
      unlock = ["st133"];
      break;
    case "a1":
      unlock = ["st131"];
      break;
    case "a2":
      unlock = ["st134"];
      break;
  }
  return unlock;
}
function canBuyUpgrade(upgrade) {
  let cost = upgradeCost(upgrade);
  
  if(player.exist.gte(cost)) {
    return true;
  }
  return false;
}

function canBuyGravUpgrade(upgrade) {
  if(!player.gravityUpgrades.includes("s"+upgrade)) {
    let cost = upgradeCost(upgrade);
  
    if(player.gravityWaves.gte(cost)) {
      return true;
    }
    return false;
  }
}
function canBuyTreeUpgrade(upgrade) {
  if(!player.treeUpgrades.includes("s"+upgrade)) {
    let cost = upgradeCost(upgrade);
    
    if(player.space.gte(cost) && (upgradeUnlock(upgrade).every(val => player.treeUpgrades.includes(val)) || upgradeUnlock(upgrade)[0] === "none")) {
      return true;
    }
    return false;
  }
}
function buyTreeUpgrade(upgrade) {
  if(canBuyTreeUpgrade(upgrade) && !player.treeUpgrades.includes("s"+upgrade)) {
    player.space = player.space.sub(upgradeCost(upgrade));
    
    player.treeUpgrades.push("s"+upgrade);
    if(upgrade === "t21" || upgrade === "t82") {
      rebuyManifolds();
    } else if(upgrade === "d1") {
      showTab("abstract");
      showSubtab("gravity","abstract");
    }
  }
}
function buyUpgrade(upgrade) {
  if(canBuyUpgrade(upgrade) && !player.upgrades.includes("s"+upgrade)) {
    player.exist = player.exist.sub(upgradeCost(upgrade));
    if(upgrade === "12") {
      player.existMultCost = player.existMultCost.times(player.existMultCostMult);
      player.existMult = player.existMult.times(1.25);
      if(player.existMultCost.gte(1e9)) {
        player.existMultCostMult = player.existMultCostMult.times(player.existMultCostScale);
      }
    } else {
      player.upgrades.push("s"+upgrade);
    }
  }
}
function buyGravUpgrade(upgrade) {
  if(canBuyGravUpgrade(upgrade) && !player.upgrades.includes("s"+upgrade)) {
    player.gravityWaves = player.gravityWaves.sub(upgradeCost(upgrade));
    if(upgrade === "g11") {
      player.gravityRebuyableCosts[0] = player.gravityRebuyableCosts[0].times(1e3);
      player.gravityRebuyables[0] = player.gravityRebuyables[0].add(1);
    } else if(upgrade === "g12") {
      player.gravityRebuyableCosts[1] = player.gravityRebuyableCosts[1].times(1e5);
      player.gravityRebuyables[1] = player.gravityRebuyables[1].add(1);
    } else {
      player.gravityUpgrades.push("s"+upgrade);
      if(upgrade === "g32") {
        rebuyManifolds()
      }
    }
  }
}
function creation() {
  player.exist = player.exist.add(existOnCreate());
  player.ideas = getDefaultSave().ideas;
  player.ignorance = getDefaultSave().ignorance;
  for(let i = 1; i <= 6; i++) {
    player.thinkers[i] = getDefaultSave().thinkers[i];
  }
  player.creations = player.creations.add(1);
}

function spaceOnAbstract() {
  let r = new Decimal(2).pow((player.exist.add(existOnCreate()).add(1)).log2().div(Math.log2(1e4)).sub(8));
  
  if(player.treeUpgrades.includes("st131")) r = r.times(1e15)
  
  return r;
}

function canBuyManifold() {
  if(player.space.gte(player.manifoldCost)) {
    return true;
  } else {
    return false
  }
}
function buyManifold(free = false) {
  if(free) {
    player.manifolds = player.manifolds.add(1);
    player.manifoldCost = player.manifoldCost.times(player.manifoldCostMult);
    if(player.manifoldCost.gte(16)) {
      if(player.treeUpgrades.includes("st21")) {
              if(player.treeUpgrades.includes("st82")) {
                if(player.gravityUpgrades.includes("sg32")) {
                  player.manifoldCostMult = player.manifoldCostMult.times(player.manifoldCostScale.div(2));
                } else {
                  player.manifoldCostMult = player.manifoldCostMult.times(player.manifoldCostScale.div(1.68));
                }
              } else {
                if(player.gravityUpgrades.includes("sg32")) {
                  player.manifoldCostMult = player.manifoldCostMult.times(player.manifoldCostScale.div(1.6875));
                } else {
                  player.manifoldCostMult = player.manifoldCostMult.times(player.manifoldCostScale.div(1.5));
                }
              }
      } else {
        player.manifoldCostMult = player.manifoldCostMult.times(player.manifoldCostScale);
      }
    }
    if(player.manifoldCost.gte(1e20)) {
      player.manifoldCostScale = player.manifoldCostScale.times(player.manifoldCostScale2);
    }
  } else if(canBuyManifold()) {
    player.space = player.space.sub(player.manifoldCost);
    player.manifolds = player.manifolds.add(1);
    player.manifoldCost = player.manifoldCost.times(player.manifoldCostMult);
      if(player.treeUpgrades.includes("st21")) {
              if(player.treeUpgrades.includes("st82")) {
                if(player.gravityUpgrades.includes("sg32")) {
                  player.manifoldCostMult = player.manifoldCostMult.times(player.manifoldCostScale.div(2));
                } else {
                  player.manifoldCostMult = player.manifoldCostMult.times(player.manifoldCostScale.div(1.68));
                }
              } else {
                if(player.gravityUpgrades.includes("sg32")) {
                  player.manifoldCostMult = player.manifoldCostMult.times(player.manifoldCostScale.div(1.6875));
                } else {
                  player.manifoldCostMult = player.manifoldCostMult.times(player.manifoldCostScale.div(1.5));
                }
              }
      } else {
        player.manifoldCostMult = player.manifoldCostMult.times(player.manifoldCostScale);
      }
    if(player.manifoldCost.gte(1e20)) {
      player.manifoldCostScale = player.manifoldCostScale.times(player.manifoldCostScale2);
    }
  }
}
function rebuyManifolds() {
  let manifolds = player.manifolds;
  player.manifolds = getDefaultSave().manifolds;
  player.manifoldCost = getDefaultSave().manifoldCost;
  player.manifoldCostMult = getDefaultSave().manifoldCostMult;
  player.manifoldCostScale = getDefaultSave().manifoldCostScale;
  player.manifoldCostScale2 = getDefaultSave().manifoldCostScale2;
  player.manifoldMult = getDefaultSave().manifoldMult;
  while(manifolds.gt(0)) {
    buyManifold(true);
    manifolds = manifolds.minus(1);
  }
}

function enterChallenge(num1, num2 = 0) {
  abstract()
  if(num2 == 0) player.runningChallenge = "sa" + num1
}

function getChallengeGoal(type) {
  switch (type) {
    case "sa1":
      return Decimal.pow(25, player.challengesCompleted["sa1"].add(1).mul(1000).pow(1.3))
    case "sa2":
      return Decimal.pow(Decimal.pow(150, player.challengesCompleted["sa2"].add(1).mul(5).pow(1.3)), 20)
  }
}


function abstract(grav = false) {
  if(!player.exist.gte(getChallengeGoal(player.runningChallenge))) var exit = true;
  creation();
  if(player.runningChallenge != null) {
    if(!exit) {
     player.challengesCompleted[player.runningChallenge] = player.challengesCompleted[player.runningChallenge].add(1)
    }
    player.runningChallenge = null
  }
  if(player.gravityWell) {
    if(player.gravitons.lt(getGravGain())) {
      player.gravitons = getGravGain();
    }
  }
  player.gravityWell = grav;
  if(!exit) {
    player.space = player.space.add(spaceOnAbstract());
  }
  player.exist = getDefaultSave().exist;

  player.thinkers[7] = getDefaultSave().thinkers[7];
  player.thinkers[8] = getDefaultSave().thinkers[8];
  player.creators = getDefaultSave().creators;
  player.abstractions = player.abstractions.add(1);
  if(!player.treeUpgrades.includes("st61")) player.creations = getDefaultSave().creations;
  player.things = getDefaultSave().things;
  if(!player.treeUpgrades.includes("st31")) {
    player.upgrades = getDefaultSave().upgrades;
  }
  player.existMult = getDefaultSave().existMult;
  player.existMultCost = getDefaultSave().existMultCost;
  player.existMultCostMult = getDefaultSave().existMultCostMult;
  player.existMultCostScale = getDefaultSave().existMultCostScale;
  player.subtab.existence = "s existUpgrades";
  
}
function toggleAuto(tier) {
  if(player.autos[tier-1]) {
    player.autos[tier-1] = false;
  } else {
    player.autos[tier-1] = true;
  }
}
function toggleAutoC(tier) {
  if(player.autoCs[tier-1]) {
    player.autoCs[tier-1] = false;
  } else {
    player.autoCs[tier-1] = true;
  }
}
function toggleAutoEm(tier) {
  if(player.autoEm) {
    player.autoEm = false;
  } else {
    player.autoEm = true;
  }
}

function autoBuyers() {
  for(let i = 0; i < player.autos.length; i++) {
    if(player.autos[i]) {
      buyMaxTier(i+1);
    }
  }
  for(let i = 0; i < player.autoCs.length; i++) {
    if(player.autoCs[i]) {
      buyMaxTierC(i+1);
    }
  }
  if(player.autoEm) {
    while(canBuyUpgrade("12")) {
      buyUpgrade("12");
    }
  }
}
function gravityWell() {
  if(!player.gravityWell) {
    abstract(true);
  } else {
    abstract();
  }
}
function getGravGain() {
  if(player.treeUpgrades.includes("st102")) return player.exist.root(75).times(Decimal.pow(3,player.gravityRebuyables[1]))
  return player.exist.root(80).times(Decimal.pow(3,player.gravityRebuyables[1]));
}
function reverseGravGain(grav) {
  return Decimal.pow(grav.div(Decimal.pow(3,player.gravityRebuyables[1])),80);
}
function start() {
  setInterval(gameLoop, 33);
  load();
  showTab(player.tab.substr(2));
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
}
function showTab(tab) {
  let tabs = document.getElementsByClassName("tab");
  for(let i = 0; i < tabs.length; i++) {
    tabs[i].style.display = "none";
  }
  get(tab).style.display = "";
  if(player.subtab[tab]) {
    showSubtab(player.subtab[tab].substr(2),tab);
  }
  player.tab = "s "+tab;
}
function showSubtab(subtab,tab) {
  let subtabs = document.getElementsByClassName("subtab");
  for(let i = 0; i < subtabs.length; i++) {
    subtabs[i].style.display = "none";
  }
  get(subtab).style.display = "";
  player.subtab[tab] = "s "+subtab;
}
function format(number,int=false) {
  
  if(int && number instanceof Decimal) {
    number = number.floor();
  } else if(int) {
    number = Math.floor(number);
  }
  
  let power;
  let matissa;
  let mag;
  if (number instanceof Decimal) {
    power = number.e;
    matissa = number.mantissa;
    mag = number.mag
    } else {
    matissa = number / Math.pow(10, Math.floor(Math.log10(number)));
    power = Math.floor(Math.log10(number));
    }
  
  if(power < 3) {
    if(int) {
      return (matissa*Math.pow(10,power)).toFixed(0);
    } else {
      return (matissa*Math.pow(10,power)).toFixed(2);
    }
  } if (number.layer === 0 || number.layer === 1) {
    matissa = matissa.toFixed(2);
    return matissa + "e" + power;
  } else {
    if(mag) {
      mag = mag.toFixed(2);
    }
    if (number.layer <= 5) {
      return (number.sign === -1 ? "-" : "") + "e".repeat(number.layer) + mag;
    }
    else {
      return (number.sign === -1 ? "-" : "") + "(e^" + number.layer + ")" + mag;
    }
  }
}