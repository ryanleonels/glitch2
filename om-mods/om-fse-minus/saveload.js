function reset() {
  game={
  base: 100,
  ord: ENify(0),
  over: 0,
  canInf: false,
  OP: ENify(0),
  infUnlock: 0,
  subTab: 1,
  bsubTab: 1,
  csubTab: 1,
  psubTab: 1,
  succAuto: ENify(0),
  limAuto: ENify(0),
  maxAuto: 0,
  autoLoop: {succ: 0, lim: 0},
  factorShifts: 0,
  factors: [],
  omegaFactors: [],
  omegaFactorCount: 0,
  lastTick: Date.now(),
  version: 1,
  boostUnlock: 0,
  boosters: 0,
  upgrades: [],
  pupgrades: [],
  products: EN(0),
  factorBoosts: 0,
  dynamic: 1,
  dynamicUnlock: 0,
  maxAuto: 0,
  infAuto: 0,
  pAutoLoop: {factor: 0},
  bAutoLoop: {max: 0, inf: 0},
  autoOn: {max: 1, inf: 1},
  challenge: 0,
  challengeCompletion: [0,0,0,0,0,0,0],
  incrementy: EN(0),
  manifolds: 0,
  iups: [0,0,0,0,0,0,0,0,0],
  buchholz: 1,
  theme: 1,
  msint: 50,
  maxOrdLength: {less: 8,more: 10},
  colors: 1,
  music: 0,
  chal8: 0,
  chal8Comp: 0,
  decrementy: 0,
  collapsed: 0,
  manualClicksLeft: 1000,
  collapseUnlock: 0,
  cardinals: EN(0),
  collapseTime: 0,
  reachedBHO: 0,
  assCard: [{points: EN(0), power: EN(0), mult: EN(1)},{points: EN(0), power: EN(0), mult: EN(1)},{points: EN(0), power: EN(0), mult: EN(1)}],
  leastBoost: 1e100,
  alephOmega: EN(0),
  aups: [],
  assBefore: 0,
  diagonalizeUnlock: 0,
  DP: EN(0),
  diagonalTime: 0,
  diagonalUp: [EN(0),EN(0),EN(0),EN(0),EN(0),EN(0),EN(0),EN(0),EN(0)],
  prodChal: 0,
  prodChalComp: [],
  prodChal8: 0,
  prodChal8Comp: 0,
  }
  document.getElementById("infinityTabButton").style.display="none"
  render()
  updateFactors()
  updateOmegaFactors()
}

function loadGame(loadgame) {
  reset();
  for (const i in loadgame) {
    if (typeof loadgame[i]=="object"&&loadgame[i]!=null) {
      if (typeof loadgame[i].array!="undefined"&&typeof loadgame[i].sign!="undefined") {
        game[i] = ENify(loadgame[i])
      } else {
        game[i] = loadgame[i];
      }
    } else {
      game[i] = loadgame[i];
    }
  }
  for (let i in game.diagonalUp) {
    game.diagonalUp[i]=ENify(game.diagonalUp[i])
  }
  game.products=ENify(game.products)
  const diff = Date.now() - game.lastTick;
  // Console.log(diff);
  handleOldVersions(loadgame);
  // Console.log(game.leastBoost);
  if (game.leastBoost === null) game.leastBoost = Infinity;
  // Console.log(game.leastBoost);
  render();
  if (game.offlineProg === 1) {
    if (game.collapseTime <= 1000 && diff / 1000 >= 1000 - game.collapseTime) {
      loop((1000 - game.collapseTime) * 1000, 1);
      loop(diff - ((1000 - game.collapseTime) * 1000), 1);
    } else {
      loop(diff, 1);
    }
  }
  game.lastTick = Date.now();
  // Console.log(diff);
}

function load() {
  let loadgame = JSON.parse(localStorage.getItem("om-fse-save")); //ordinalMarkupSave
  if (loadgame !== null && AF === 0) {
    loadGame(loadgame);
  }
}

function handleVeryOldSaves(loadgame) {
  if (typeof loadgame.version === "undefined") {
    game.version = 0.12;
  } else {
    game.version = loadgame.version;
  }
  if (game.version === 0.12) {
    game.version = 0.2;
    if (game.ord >= 1e100 || game.base === 2) {
      revertToPreBooster();
    }
  }
  if (game.version === 0.2) {
    game.version = 0.201;
    if (game.boostUnlock === 1) {
      game.boosters = 1;
      game.upgrades = [];
      game.factorBoosts = 1;
    }
  }
  if (game.version === 0.201) {
    game.version = 0.202;
    if (game.boostUnlock === 1 && game.boosters + (game.upgrades.includes(1) ? 1 : 0) >= 2) {
      game.boosters -= 1;
    } else if (game.boostUnlock === 1) game.factorBoosts += 1;
    
  }
}

function handlePost0202Saves() {
  if (game.version === 0.202) {
    game.version = 0.21;
    if (game.boostUnlock === 1) {
      if (game.factorBoosts === 0) {
        game.factorBoosts = 1;
        if (game.upgrades.includes(1)) {
          game.boosters = 0;
        } else {
          game.boosters = 1;
        }
      } else {
        game.boosters = game.factorBoosts * (game.factorBoosts + 1) / 2;
        if (game.upgrades.includes(1)) game.boosters--;
        if (game.upgrades.includes(2)) game.boosters--;
        if (game.upgrades.includes(3)) game.boosters--;
        if (game.upgrades.includes(5)) game.boosters -= 5;
        if (game.upgrades.includes(6)) game.boosters -= 4;
        if (game.upgrades.includes(7)) game.boosters -= 8;
      }
    }
  }
  if (game.version === 0.21) {
     game.version = 0.211;
     if (game.boostUnlock === 1) {
     game.boosters = game.factorBoosts * (game.factorBoosts + 1) / 2;
     if (game.upgrades.includes(1)) game.boosters--;
     if (game.upgrades.includes(2)) game.boosters--;
     if (game.upgrades.includes(3)) game.boosters--;
     if (game.upgrades.includes(5)) game.boosters -= 5;
     if (game.upgrades.includes(6)) game.boosters -= 4;
     if (game.upgrades.includes(7)) game.boosters -= 8;
  }
  }
}

function handlePost0211Saves() {
  if (game.version === 0.211) {
     game.version = 0.22;
     if (game.boostUnlock === 1) {
     game.boosters = game.factorBoosts * (game.factorBoosts + 1) / 2;
     if (game.upgrades.includes(1)) game.boosters--;
     if (game.upgrades.includes(2)) game.boosters--;
     if (game.upgrades.includes(3)) game.boosters--;
     if (game.upgrades.includes(5)) game.boosters -= 5;
     if (game.upgrades.includes(6)) game.boosters -= 4;
     if (game.upgrades.includes(7)) game.boosters -= 8;
     if (game.upgrades.includes(11)) game.boosters -= 16;
     }
  }
  if (game.version === 0.22) {
    game.version = 0.24;
    game.iups.push(0);
    game.iups.push(0);
    game.iups.push(0);
  }
  if (game.version === 0.24) {
    if (game.leastBoost <= 15) game.leastBoost = 15;
    if (!game.upgrades.includes(4)) {
      game.challengeCompletion[0] = 0;
      game.challengeCompletion[1] = 0;
    }
    if (!game.upgrades.includes(8)) {
      game.challengeCompletion[2] = 0;
      game.challengeCompletion[3] = 0;
    }
    if (!game.upgrades.includes(12)) {
      game.challengeCompletion[4] = 0;
      game.challengeCompletion[5] = 0;
      game.challengeCompletion[6] = 0;
      game.chal8Comp = 0;
    }
    game.version = 0.31;
  }
}

function handleOldVersions(loadgame) {
  handleVeryOldSaves(loadgame);
  handlePost0202Saves();
  handlePost0211Saves();
  handlePreV1();
}

function handlePreV1() {
  if (game.version <= 0.31) {
    if (game.OP.gte("eee8")) {
      reset()
      alert("The game updated and your save had to be wiped. Here's 10 products in compensation")
      game.infUnlock=1
      game.diagonalizeUnlock=1
      game.boostUnlock=1
      factorCollapse()
      game.products=EN(10)
    }
    game.version = 1
  }
}


function save() {
  if (AF === 0) localStorage.setItem("om-fse-save", JSON.stringify(game));
}

function exporty() {
  copyStringToClipboard(btoa(JSON.stringify(game)));
}

function importy() {
  let loadgame = "";
  loadgame = JSON.parse(atob(prompt("Paste in your save WARNING: WILL OVERWRITE YOUR CURRENT SAVE")));
  if (loadgame !== "") {
    loadGame(loadgame);
  }
}
