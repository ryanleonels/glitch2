function cubePrestige() {
  
  if (tmp.p2r.gte(1) && tmp.canreset)
  {
  tmp.canreset=false  
  setTimeout(() => {
    tmp.canreset=true
  }, 51);
  player.cube = player.cube.add(tmp.p2r);
  player.cubeMax= player.cube.max(player.cubeMax);
  for (let i = 1; i < 25; i++) {
    if (getMilestoneRequirment(i)) player.hasmilestone[i] = true;
  };
  merge(tmp, baseTmp)
  player.coin = new OmegaNum(0);
  player.upg = Array.from({length: 11}, () => OmegaNum.ZERO);
  player.dice = new OmegaNum(0);
  player.upgP = Array.from({length: 11}, () => false);
  tmp.upg_b = [
    [100, 1.1, 1.1],
    [250, 1.2, 1.125],
    [2e3, 1.6, 1.35],
    [6.25e4, 1.8, 1.3],
    [1e6, 1.5, 1.7],
    [1e24, 2, 2],
    [1e26, 3, 1.75],
    [1e32, 4, 1.4],
    [1e42, 10, 1.75],
    [1e45, 10, 1.6]
  ];
  player.inChallenge=0
  for (let i=0; i<5; i++){
    player.chaComp[i]=0
  }

  if (player.hasmilestone[3]) {
    player.upgP[1] = true;
    player.upgP[2] = true;
  }
  if (player.hasmilestone[4]) player.dice = new OmegaNum(100)
  if (player.hasmilestone[5]) {
    player.upgP[3] = true;
    player.upgP[4] = true;
  }
  if (player.hasmilestone[6]) {
    player.upgP[5] = true;
    player.upgP[6] = true;
  }
  if (player.hasmilestone[8]) player.upgP[7] = true;
  if (player.hasmilestone[2]) player.upgP[8] = true;
  if (player.hasmilestone[9]) player.upgP[9] = true;
  if (player.hasmilestone[10]) {
    player.chaComp[1] = 10;
    player.upgP[10] = true;
  }
  if (player.hasmilestone[11]) player.chaComp[2] = 10;
  if (player.hasmilestone[9]) player.chaComp[3] = 7
  if (player.hasmilestone[12]) player.chaComp[4] = 7;
}
}

function nextCubeAt() {
   let nextat = new OmegaNum(10).pow(tmp.p2r.add(1).div(tmp.cubemult).sub(1).max(0).pow(1.25)).times(1e9);
   if (player.hasmilestone[19]) nextat = new OmegaNum(10).pow(tmp.p2r.add(1).times(2.25).pow(2).div(tmp.cubemult).sub(1).max(0).pow(1.25)).times(1e9);
   return nextat
}

function cubemult() { //mult to cube gain
  let mult=new OmegaNum(1)
  if(player.hasmilestone[14]) mult = mult.times(2)
  if(player.hasmilestone[15]) mult = mult.times(2)
  if(player.hasmilestone[16]) mult = mult.times(2)
  mult = mult.times(tmp.chaeff[7])
  tmp.cubemult = mult
}

function cubeOnPrestige() { //amount of cubes you'll get on reset
  let fube = player.dice.add(1).div(1e9).logBase(10).pow(0.8).add(1).max(0);
  cubemult()
  fube = fube.times(tmp.cubemult)
  if(player.hasmilestone[19]) fube = fube.sqrt().div(2.25)
  tmp.p2r = fube.floor();
}

function getMilestoneRequirment(x) {
  if (x === 1) return player.cubeMax.gte(1);
  if (x === 2) return player.cubeMax.gte(2);
  if (x === 3) return player.cubeMax.gte(3);
  if (x === 4) return player.cubeMax.gte(4);
  if (x === 5) return player.cubeMax.gte(5);
  if (x === 6) return player.cubeMax.gte(6);
  if (x === 7) return player.cubeMax.gte(7);
  if (x === 8) return player.cubeMax.gte(9);
  if (x === 9) return player.cubeMax.gte(12);
  if (x === 10) return player.cubeMax.gte(15);
  if (x === 11) return player.cubeMax.gte(20);
  if (x === 12) return player.cubeMax.gte(24);
  if (x === 13) return tmp.p2r.gte(4);
  if (x === 14) return player.cubeMax.gte(100);
  if (x === 15) return player.cubeMax.gte(500);
  if (x === 16) return player.cubeMax.gte(1000);
  if (x === 17) return tmp.p2r.gte(200);
  if (x === 18) return player.cubeMax.gte(10000);
  if (x === 19) return player.cubeMax.gte(50000);
  if (x === 20) return player.cubeMax.gte(70000);
  if (x === 21) return player.cubeMax.gte('1e5');
  if (x === 22) return player.cubeMax.gte('1e9');
  if (x === 23) return player.cubeMax.gte('1e15');
  if (x === 24) return player.cubeMax.gte('1e40');
  if (x === 25) return player.cubeMax.gte('2.5e60');
  return false;
}

function cubeUpg() {
  return {
    1: {
      desc: "Unlock 2 new dices for coin multiplier (a^b).",
      cost: new OmegaNum(30),
      effect: false,
      req: "",
    },
    2: {
      desc: "Cube amount boost coin multiplier exponent.",
      cost: new OmegaNum(200),
      effect: true,
      req: "",
    },
    3: {
      desc: "Cube amount boost coin multiplier base.",
      cost: new OmegaNum(2500),
      effect: true,
      req: "",
    },
    4: { //you can't really complete c4  even 10 times before getting a milestone 12 and c3 should add cube upgrades <- that's good
      desc: "You can complete c3 and c4 3 more times each. (WIP)",
      cost: new OmegaNum(Infinity),
      effect: false,
      req: "",
    },
    5: {
      desc: "Milestone 19 effect is weaker",
      cost: new OmegaNum(5000),
      effect: false,
      req: player.chaComp[3] >= 8,
      reqtext: "complete Challenge 3 eight times to unlock"
    }
  }
}

function cubeUpgCost(x) {
  if (x == 1) return new OmegaNum(30);
  if (x == 2&&player.upgP2[1]) return new OmegaNum(200);
  if (x == 3&&player.upgP2[2]) return new OmegaNum(2500);
  return new OmegaNum("10^^10");
}

function buyCubeUpg(x) {
  if (!player.cube.lt(cubeUpgCost(x)) && !player.upgP2[x]) {
    player.cube = player.cube.sub(cubeUpgCost(x));
    player.upgP2[x] = true;
  }
}

const milestones = {
  1: {
    condition: "1 cubes",
    desc: "keep 1 upgrade 5 in dice & cube reset"
  },
  2: {
    condition: "2 cubes",
    desc: "keep dice upgrade 8 in cube reset"
  },
  3: {
    condition: "3 cubes",
    desc: "keep dice upgrade 1 & 2 in cube reset"
  },
  4: {
    condition: "4 cubes",
    desc: "start with 100 dices in cube reset"
  },
  5: {
    condition:"5 cubes",
    desc:"Cube effect also affect dice gain but with a reduced power. Keep dice upgrade 3 & 4 in cube reset"
  },
  6: {
    condition: "6 cubes",
    desc: "keep dice upgrade 5 & 6 in cube reset"
  },
  7: {
    condition: "7 cubes",
    desc: "dice upgrade 8 is now 5x stronger"
  },
  8: {
    condition: "9 cubes",
    desc: "keep dice upgrade 7 in cube reset"
  },
  9: {
    condition: "12 cubes",
    desc: "keep dice upgrade 9 and keep 7 C3 completions in cube reset"
  },
  10: {
    condition: "15 cubes",
    desc: "keep 10 C1 completions in cube reset and keep dice upgrade 10 in cube reset"
  },
  11: {
    condition: "20 cubes",
    desc: "keep 10 C2 completions in cube reset and dice upgrade 8 is now 2x stronger "
  },
  12: {
    condition: "24 cubes",
    desc: "unlock new challenges and keep 7 C4 completions in cube reset"
  },
  13: {
    condition: "reset for 4 cubes at once",
    desc: "Unlock cube upgrades"
  },
  14: {
    condition: "100 cubes",
    desc: "your cube gain is doubled"
  },
  15: {
    condition: "500 cubes",
    desc: "your cube gain is doubled again"
  },
  16: {
    condition: "2,500 cubes",
    desc: "Cube effect ^1.35 and your cube gain is doubled yet again"
  },
  17: {
    condition: "reset for 200 cubes at once",
    desc: "Roll multiplier exponent is multiplied by 1.35"
  },
  18: {
    condition: "10,000 cubes",
    desc: "multiplier dice always gives the max possible result"
  },
  19: {
    condition: "50,000 cubes",
    desc: "Unlock a new reset layer but cube gain is square rooted and divided by 2.25 xD"
  },
  20: {
    condition: "70,000 cubes",
    desc: "start with 1,000,000 dices in cube reset. (WIP)"
  },
  21: {
    condition: "100,000 cubes",
    desc: "Cube effect also affect dice gain. (WIP)"
  },
  22: {
    condition: "1e9 cubes",
    desc: "Unlock Challenge 5.(WIP)"
  },
  23: {
    condition: "1e15 cubes",
    desc: "Dice gain's first softcap gets weakened.(WIP)"
  },
  24: {
    condition: "1e40 cubes",
    desc: "Dice gain's second softcap gets weakened.(WIP)"
  },
  25: {
    condition: "2.5e60 cubes",
    desc: "Dice gain's third softcap gets weakened.(WIP)"
  }
}