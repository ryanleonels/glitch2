addLayer("r", {
  symbol: "R",
  color: "#8F48E8",
  Gcolor: "repeating-linear-gradient(-45deg, #8F48E8, #8F48E8 20px, #883FE2 20px, #883FE2 40px)",
  displayRow: 25,
  row: 25,
  position: 0,
  tooltip(){
    if(player.r.points.gte(11)) return `<h3>Rebirth</h3><br>Rebirth r${formatWhole(player.r.points)}m${formatWhole(player.mr.points)}`
    return `<h3>Rebirth</h3><br>Rebirth r${formatWhole(player.r.points)}`
  },
  shouldNotify(){return this.canReset()},
  
  startData() { return {
    unlocked: true,
    points: new Decimal(0),
    offline: new Decimal(0),
    speed: 1,
  }},
  type: "custom",
  getNextAt(){
    let costs = [0,6,60,15000,2000000,2.5e9,1e13,1e16,5e21,1e155,"1e2000","eeeeee9"]
    return new Decimal(costs[player[this.layer].points])
  },
  getResetGain(){
    return new Decimal(1)
  },
  canReset(){
    return getPointGen().gte(this.getNextAt())
  },
  prestigeButtonText(){
    if(player.r.points.gte(11)) return "You are at the final rebirth"
    return "Lose all progress for a rebirth point<br>Requires: " + format(this.getNextAt()) + " points per second"
  },
  requires(){
    return this.getNextAt()
  },
  
  milestones: {
    0: {
      requirementDescription: "Rebirth Milestone 1 [6 rebirths]",
      effectDescription: "Keep two milestone points permamently (including on row 3 and rebirth)",
      done() { return player.r.points.gte(6)},
      unlocked() {return this.done()}
    },
    1: {
      requirementDescription: "Rebirth Milestone 2 [7 rebirths]",
      effectDescription: "Keep four milestone points permamently",
      done() { return player.r.points.gte(7)},
      unlocked() {return this.done()}
    },
    2: {
      requirementDescription: "Rebirth Milestone 3 [8 rebirths]s",
      effectDescription: "Keep prestige upgrade automation",
      done() { return player.r.points.gte(8)},
      unlocked() {return this.done()}
    },
    3: {
      requirementDescription: "Rebirth Milestone 4 [9 rebirths]",
      effectDescription: "Keep five milestone points permamently<br>You can also automate reseting for collapse points.",
      toggles: [["c","autoCollapse"]], //fix up pls
      done() { return player.r.points.gte(9)},
      unlocked() {return this.done()}
    },
    4: {
      requirementDescription: "Rebirth Milestone 5 [10 rebirths]",
      effectDescription: "Get 5x collapse points<br>You can also automate reseting for upgrade points",
      toggles: [["u","autoUpgrade"]],
      done() { return player.r.points.gte(10)},
      unlocked() {return this.done()}
    },
    5: {
      requirementDescription: "Rebirth Milestone 6 [12 rebirths]",
      effectDescription: "Keep the first two minirebirths, add a bit more to rebirth 5, add rebirth 6, and some other minor stuff",
      toggles: [["u","autoUpgrade"]],
      done() { return player.r.points.gte(10)},
      unlocked() {return this.done()}
    },
  },
  
  resource: "rebirth points",
  baseResource: "points per second",
  baseAmount() {return getPointGen()},
  
  tabFormat: {
    "Rebirths": {
      content: [
        "main-display",
        "prestige-button",
        "blank",
        "milestones",
        ["raw-html",`<a href="https://rebirth-tree-rewritten.glitch.me" target="_self">This button will redirect you to glitch (only use if you lost your save)</a>`]
      ],
    },
    "Mini Rebirths": {
      embedLayer: "mr",
      unlocked(){return player.r.points.gte(11)},
    },
  },
  
  layerShown(){return true},
}) //REBIRTH
addLayer("mr", {
  color: "#8F48E8",
  Gcolor: "repeating-linear-gradient(-45deg, #8F48E8, #8F48E8 20px, #883FE2 20px, #883FE2 40px)",
  row: 24,
  
  startData() { return {
    unlocked: false,
    points: new Decimal(0),
    best: new Decimal(0),
    total: new Decimal(0),
    used: new Decimal(0),
  }},
  resource: "mini rebirths",
  baseAmount() {return player.c.points},
  baseResource: "collapse points",
  
  type: "custom",
  requires(){
    let costs = [1,"1e30","1e80","1e100","1e105","eeeeeeee9"];
    return new Decimal(costs[player[this.layer].points]);
  },
  canReset(){return player.c.points.gte(this.requires())},
  prestigeButtonText(){ return `Next mini rebirth: ${format(this.getNextAt())} collapse points` },
  getNextAt(){return this.requires()},
  getResetGain(){return new Decimal(1)},
  essence(){
    var essence = player.mr.points.sub(player.mr.used)
    if(player.mr.challenges[11] >= 5) essence = essence.add(1)
    if(player.mr.challenges[12] >= 5) essence = essence.add(1)
    if(player.mr.challenges[21] >= 5) essence = essence.add(1)
    
    return essence
  },
  
  tabFormat: [
    "main-display",
    "prestige-button",
    "blank",
    "milestones",
    ["display-text",
      function() { return 'You have ' + format(tmp.mr.essence) + ' minirebirth essence (+1 every minirebirth or 5/5 challenge completion)' }],
    ["clickables",1],
    "buyables",
    "blank",
    "challenges",
  ],
  doReset(resettingLayer) {
    if (layers[resettingLayer].row <= this.row) return;
    layerDataReset(this.layer);
    if(hasMilestone("r",0)) player.m.points = new Decimal(2);
    if(hasMilestone("r",1)) player.m.points = new Decimal(4);
    if(hasMilestone("r",3)) player.m.points = new Decimal(5);
  },
  
  clickables: {
    11: {
      display() {return "Respec all upgrades [refund]"},
      tooltip(){
        if(!inChallenge("mr",11) && !inChallenge("mr",12)) return `This will force a MR reset`
        return `You are currently inside a challenge, so this button is unusable.`
      },
      onClick() {
        doReset("mr",true)
        player.mr.buyables[11] = new Decimal(0)
        player.mr.buyables[12] = new Decimal(0)
        player.mr.buyables[13] = new Decimal(0)
        
        player.mr.buyables[21] = new Decimal(0)
        player.mr.buyables[22] = new Decimal(0)
        player.mr.buyables[23] = new Decimal(0)
        player.mr.used = new Decimal(0)
      },
      canClick() {return player.mr.used.gte(1) && !inChallenge("mr",11) && !inChallenge("mr",12)}
    }
  },
  milestones: {
    0: {
      requirementDescription: "Minirebirth 1",
      effectDescription: "Unlock automation for U & C upgrades",
      done() { return player.mr.points.gte(1)},
      toggles: [["u","autoUUpgrade"],["c","autoUpgrade"]],
      unlocked() {return player.mr.points.gte(0)}
    },
    1: {
      requirementDescription: "Minirebirth 2",
      effectDescription: "Get 5% of collapse points per second and automate milestone resets",
      done() { return player.mr.points.gte(2)},
      toggles: [["m","autoReset"]],
      unlocked() {return player.mr.points.gte(1)}
    },
    2: {
      requirementDescription: "Minirebirth 3",
      effectDescription: "Unlock Challenges",
      done() { return player.mr.points.gte(3)},
      unlocked() {return player.mr.points.gte(2)}
    },
    3: {
      requirementDescription: "Minirebirth 4",
      effectDescription: "Unlock some upgrades",
      done() { return player.mr.points.gte(4)},
      unlocked() {return player.mr.points.gte(3)}
    },
    4: {
      requirementDescription: "Minirebirth 5",
      effectDescription: "Unlock an upgrade and challenge. You can also start with one collapse point",
      done() { return player.mr.points.gte(5)},
      unlocked() {return player.mr.points.gte(4)}
    },
  },
  challenges: {
    11: {
      fullDisplay(){return `<h2>Eternally Trapped [${player.mr.challenges[11]}/5]</h2><br> You are stuck in level ${this.difficulty()} of every sacrifice. Also reduces Collapse requirement by /100<br>Goal: 1e9 collapse points<br>Reward: Strengthen sacrifice reward by ^+0.2 per level`},
      difficulty(){
        return player.mr.challenges[11] + 1
      },
      onEnter(){player.c.sacrifices = [this.difficulty(),this.difficulty(),this.difficulty(),this.difficulty(),this.difficulty()]},
      canComplete: function() {return player.c.points.gte(1e9)},
      completionLimit: 5,
      unlocked(){return hasMilestone("mr",2)}
    },
    12: {
      fullDisplay(){return `<h2>Total point breakdown [${player.mr.challenges[12]}/5]</h2><br> Nerf the 2nd and 3rd P upgrades <strong>HEAVILY</strong><br>Goal: ${format(this.goal())} points<br>Reward: Strengthens the first collapse upgrade and passive generation`},
      goal(){return new Decimal([1e10,1e50,1e200,"1e500","1e1000"][player.mr.challenges[12]])},
      onEnter(){player.c.sacrifices = [this.difficulty(),this.difficulty(),this.difficulty(),this.difficulty(),this.difficulty()]},
      canComplete: function() {return player.points.gte(this.goal())},
      completionLimit: 5,
      unlocked(){return hasMilestone("mr",2)}
    },
    21: {
      fullDisplay(){return `<h2>Sacrifice Replacement [${player.mr.challenges[21]}/5]</h2><br> You cant activate any sacrifices. Boosters and upgrades are nearly useless and ^0.75 points<br>Goal: ${format(new Decimal(1e4).pow(player.mr.challenges[21]).mul(1e11))} points<br>Reward: ^1.1 points`},
      tooltip(){return "this actually just sets your sacrifices to be [1x1,2x7,3x9,4x0,5x0] and disables all buffs that they cause"},
      onEnter(){player.c.sacrifices = [1,7,9,0,0]},
      goal(){return ([1e12,1e16,1e20,1e75,"1e400"])[player.mr.challenges[21]]},
      canComplete: function() {return player.points.gte(new Decimal(1e4).pow(player.mr.challenges[21]).mul(1e11))},
      completionLimit: 5,
      unlocked(){return hasMilestone("mr",4)}
    },
  },
  buyables: {
    11: {
      cost(x) {return new Decimal(1)},
      display() { return `<h2>Static Gain ${getBuyableAmount(this.layer, this.id)}/2</h2><br>+100 points/s. (after that it is a x100 to the +10/s)<br>Cost: ${formatWhole(this.cost())} minirebirth essense`},
      canAfford() { return tmp.mr.essence.gte(this.cost()) && !inChallenge("mr",11) && !inChallenge("mr",12)},
      buy() {
        player.mr.used = player.mr.used.add(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      style:{"height":"100px","height":"160px"},
      purchaseLimit: 2,
        unlocked(){return hasMilestone("mr",3)}
    },
    12: {
      cost(x) {return new Decimal(1)},
      display() { return `<h2>Power-up ${getBuyableAmount(this.layer, this.id)}/2</h2><br>^1.1 point gain per level<br>Cost: ${formatWhole(this.cost())} minirebirth essense`},
      canAfford() { return tmp.mr.essence.gte(this.cost()) && !inChallenge("mr",11) && !inChallenge("mr",12)},
      buy() {
        player.mr.used = player.mr.used.add(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      style:{"height":"100px","height":"160px"},
      purchaseLimit: 2,
        unlocked(){return hasMilestone("mr",3)}
    },
    13: {
      cost(x) {return new Decimal(1)},
      display() { return `<h2>Milestone+ ${getBuyableAmount(this.layer, this.id)}/2</h2><br>Unlock a new M milestone<br>Cost: ${formatWhole(this.cost())} minirebirth essense`},
      canAfford() { return tmp.mr.essence.gte(this.cost()) && !inChallenge("mr",11) && !inChallenge("mr",12)},
      buy() {
        player.mr.used = player.mr.used.add(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      style:{"height":"100px","height":"160px"},
      purchaseLimit: 2,
        unlocked(){return hasMilestone("mr",3)}
    },
    21: {
      cost(x) {return new Decimal(1)},
      display() { return `<h2>Static Multiplier ${getBuyableAmount(this.layer, this.id)}/2</h2><br>x50 points/s. Applys right before Static Gain<br>Cost: ${formatWhole(this.cost())} minirebirth essense`},
      canAfford() { return tmp.mr.essence.gte(this.cost()) && !inChallenge("mr",11) && !inChallenge("mr",12)},
      buy() {
        player.mr.used = player.mr.used.add(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      style:{"height":"100px","height":"160px"},
      purchaseLimit: 2,
      unlocked(){return hasMilestone("mr",4)},
    },
    23: {
      cost(x) {return new Decimal(x).add(1)},
      display() { return `<h2>More Challenges ${getBuyableAmount(this.layer, this.id)}/2</h2><br>Increases the cap of Collapse Boost III by 2<br>Cost: ${formatWhole(this.cost())} minirebirth essense`},
      canAfford() { return tmp.mr.essence.gte(this.cost()) && !inChallenge("mr",11) && !inChallenge("mr",12)},
      buy() {
        player.mr.used = player.mr.used.add(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      style:{"height":"100px","height":"160px"},
      purchaseLimit: 2,
      unlocked(){return hasMilestone("mr",4)},
    }, //TODO: make it unlock a new sac
  },
  
  hotkeys: [
    {key: "R", description: "Shift + R: Reset for a minirebirth", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
  ],
  layerShown(){return false},
}) //Mini Rebirth

addLayer("a", {
  symbol: "A",
  color: "#ffee00",
  Gcolor: "repeating-linear-gradient(-45deg, #ffee00, #ffee00 20px, #F3E303 20px, #F3E303 40px)",
  row: "side",
  position: 0,
  tooltip(){
    return "<h3>Achievements</h3><br> Achievements: " + format(player.a.achievements.length)
  },
  
  startData() { return {
    unlocked: true,
    points: new Decimal(0),
  }},
  //achievementPopups: true,
  achievements: {
    11: {
      name: "It all begins!",
      done() {return player.r.points.gte(1)},
      tooltip: "Get one rebirth",
    },
    12: {
      name: "A second time!",
      done() {return player.r.points.gte(2)},
      tooltip: "Get two rebirths",
    },
    13: {
      name: "Upgrade Mastery",
      done() {return player.p.upgrades.length >= 3},
      tooltip: "Have 3 total upgrades",
    },
    14: {
      name: "Three Rebirths",
      done() {return player.r.points.gte(3)},
      tooltip: "Have three rebirths",
    },
    15: {
      name: "Shiny!",
      done() {return player.u.points.gte(1)},
      tooltip: "Have one upgrade point",
    },
    16: {
      name: "Triple Upgrades",
      done() {return player.u.points.gte(3)},
      tooltip: "Have three upgrade point",
    },
    17: {
      name: "All Star",
      done() {return player.u.points.gte(4)},
      tooltip: "Have four upgrade point",
    },
    21: {
      name: "Rebirth Four",
      done() {return player.r.points.gte(4)},
      tooltip: "Have four rebirth points",
    },
    22: {
      name: "Boosted",
      done() {return player.b.points.gte(1)},
      tooltip: "Have one booster point",
    },
    23: {
      name: "Rebirth Five",
      done() {return player.r.points.gte(5)},
      tooltip: "Have five rebirth points",
    },
    24: {
      name: "A new layer!",
      done() {return player.m.points.gte(1)},
      tooltip: "Have a milestone point",
    },
    25: {
      name: "Triple Boosted",
      done() {return player.b.points.gte(3)},
      tooltip: "Have three booster point",
    },
    26: {
      name: "All of them",
      done() {return player.m.points.gte(5)},
      tooltip: "Have five milestone points",
    },
    27: {
      name: "Boosted",
      done() {return player.b.points.gte(4)},
      tooltip: "Have four booster points",
    },
    31: {
      name: "Here we go again",
      done() {return player.r.points.gte(6)},
      tooltip: "Have 6 rebirth points",
    },
    32: {
      name: "Another new layer",
      done() {return player.c.upgrades.length >= 1},
      tooltip: "Buy 1 c-upgrade",
    },
    33: {
      name: "Tripled collapse",
      done() {return player.c.upgrades.length >= 3},
      tooltip: "Buy 3 c-upgrades",
    },
    34: {
      name: "A Buyout",
      done() {return player.c.upgrades.length >= 5},
      tooltip: "Buy all 5 c-upgrades",
    },
    35: {
      name: "A second Buyout",
      done() {return player.c.upgrades.length >= 7},
      tooltip: "Buy all 7 c-upgrades",
    },
    36: {
      name: "The Start of a New Rebirth",
      done() {return player.r.points.gte(7)},
      tooltip: "Have seven rebirth points",
    },
    37: {
      name: "Recollapse",
      done() {return player.r.points.gte(7) && player.c.points.gte(1)},
      tooltip: "Have seven rebirth points and then collapse",
    },
    41: {
      name: "Dual-sacrifice",
      done() {return tmp.c.sacAm >= 2 && player.points.gte(1e9)},
      tooltip: "Have two or more sacrifices at once",
    },
    42: {
      name: "Lucky Collapses",
      done() {return player.c.upgrades.length >= 7},
      tooltip: "Have seven collapse upgrades",
    },
    43: {
      name: "Even more sacrifices",
      done() {return tmp.c.sacAm >= 3 && player.points.gte(1e9)},
      tooltip: "Have three or more sacrifices at once",
    },
    44: {
      name: "A third buyout",
      done() {return player.c.upgrades.length >= 11},
      tooltip: "Have eleven collapse upgrades",
    },
    45: {
      name: "So many boosters",
      done() {return player.b.points.gte(10)},
      tooltip: "Have ten booster points",
    },
    46: {
      name: "Another Another Another Another Another Another Another New Rebirth",
      done() {return player.r.points.gte(8)},
      tooltip: "Get your 8th rebirth",
    },
    47: {
      name: "A fourth buyout",
      done() {return player.r.points.gte(8) && player.c.upgrades.length >= 11},
      tooltip: "Have eleven collapse upgrades during your 8th rebirth",
    },
    51: {
      name: "Too many sacrifices",
      done() {return tmp.c.sacAm >= 4 && player.points.gte(1e9)},
      tooltip: "Have four or more sacrifices at once",
    },
    52: {
      name: "Is that a lot?",
      done() {return tmp.c.sacAm >= 5 && player.points.gte(1e10)},
      tooltip: "Collapse with 5 sacrifices",
    },
    53: {
      name: "Collapse Millionare",
      done() {return player.c.points.gte(1e6)},
      tooltip: "Get 1e6 collapse points",
    },
    54: {
      name: "A fifth buyout",
      done() {return player.c.upgrades.length >= 18},
      tooltip: "Have 18 collapse upgrades",
    },
    55: {
      name: "Billionare",
      done() {return player.c.points.gte(1e9)},
      tooltip: "Get 1e9 collapse points",
    },
    56: {
      name: "Octa sacrifices",
      done() {return tmp.c.sacAm >= 8 && player.points.gte(1e13)},
      tooltip: "Collapse with 8 sacrifices",
    },
    57: {
      name: "So many Points",
      done() {return player.points.gte(1e30)},
      tooltip: "Obtain 1e30 Points",
    },
    61: {
      name: "The start of a new layer!",
      done() {return player.r.points.gte(9)},
      tooltip: "Obtain 9 rebirth points",
    },
    62: {
      name: "Energetic",
      done() {return player.e.points.gte(1)},
      tooltip: "Obtain an energy point",
    },
    63: {
      name: "Power collector",
      done() {return player.e.total.gte(5)},
      tooltip: "Obtain a total of 5 energy points or more",
    },
    64: {
      name: "Hyperboosts",
      done() {return player.b.points.gte(25)},
      tooltip: "Obtain 25 booster points or more",
    },
    65: {
      name: "Upgradeless twos",
      done() {return player.points.gte(1e22) && player.u.points.eq(0)},
      tooltip: "Obtain 1e22 points or more without reseting for U points",
    },
    66: {
      name: "The boosters are weak",
      done() {return player.b.points.gte(35)},
      tooltip: "Obtain 35 booster points or more",
    },
    67: {
      name: "Half of a hundred",
      done() {return player.b.points.gte(50)},
      tooltip: "Obtain 50 booster points or more",
    },
    71: {
      name: "Energy collector",
      done() {return player.e.points.gte(10000)},
      tooltip: "Get 10,000 energy",
    },
    72: {
      name: "Energy Surge",
      done() {return player.e.points.gte(1e9)},
      tooltip: "Get 1,000,000,000 energy",
    },
    73: {
      name: "How many left?",
      done() {return player.r.points.gte(10)},
      tooltip: "Get 10 rebirth",
    },
    74: {
      name: "Layer Expansion.?",
      done() {return player.m.points.gte(6) && player.r.points.gte(10)}, //this requirement is added just in case v1.5 infinite milestone glitch
      tooltip: "Get 6 milestone points",
    },
    75: {
      name: "A second digit!",
      done() {return player.m.points.gte(10)},
      tooltip: "Get 10 milestone points",
    },
    76: {
      name: "All ten",
      done() {return player.m.points.gte(36)},
      tooltip: "Get 36 milestone points",
    },
    77: {
      name: "Two Energy Surges",
      done() {return player.e.points.gte(1e18)},
      tooltip: "Get 1e18 (sextillion) energy points",
    },
    81: {
      name: "Sacrifice Master",
      done() {return tmp.c.sacAm >= 20 && player.points.gte(1e26)},
      tooltip: "Collapse with 20 collapse sacrifices"
    },
    82: {
      name: "totally rich",
      done() {return player.points.gte(new Decimal("1e6000"))},
      tooltip: "get 1e6,000 points..?!?!"
    },
    83: {
      name: "Two of the same numbers",
      done() {return player.r.points.gte(11)},
      tooltip: "Get 11 rebirths"
    },
    84: {
      name: "wait, what??",
      done() {return player.mr.points.gte(1)},
      tooltip: "get a mini rebirth point"
    },
    85: {
      name: "when actual new content",
      done() {return player.mr.points.gte(2)},
      tooltip: "get 2 mini rebirth points"
    },
    86: {
      name: "Uh oh",
      done() {return player.mr.points.gte(3)},
      tooltip: "get 3 mini rebirth points"
    },
    87: {
      name: "not challenging!",
      done() {return player.mr.challenges[11] >= 1},
      tooltip: "beat the first challenge once"
    },
    91: {
      name: "1/10 short timewall",
      done() {return player.mr.challenges[12] >= 1},
      tooltip: "beat the second challenge once"
    },
    92: {
      name: "Upgrade Layer 2.0",
      done() {return player.mr.points.gte(4)},
      tooltip: "Get 4 mini rebirths."
    },
    93: {
      name: "How many handicaps do you need??",
      done() {return tmp.c.sacAm >= 25 && player.points.gte(1e30) && inChallenge("mr",12)},
      tooltip: "Complete a collapse run with all 25 sacrifices inside of Total point breakdown"
    },
    94: {
      name: "New Challenges Await",
      done() {return player.mr.points.gte(5)},
      tooltip: "Get 5 mini rebirths"
    },
    95: {
      name: "I dont need any of that",
      done() {return player.mr.challenges[21] >= 5},
      tooltip: "Beat Sacrifice Replacement 5 times"
    },
  },
  achBoost(){return new Decimal(1.065).pow(player.a.achievements.length)},
  tabFormat: [
    "blank",
    
    ["display-text",
        function() {return `Achievements are boosting point gain by <strong>x${format(layers.a.achBoost())}</strong>`}],
    "blank",
    "blank",
    "achievements",
  ]
}) //ACHIEVEMENTS
