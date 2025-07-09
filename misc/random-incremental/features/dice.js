function dicePrestige() {
  if (tmp.p1r.gte(1) && tmp.canreset)  {
   tmp.canreset=false  
/*     setTimeout(() => {
      tmp.canreset=true
    }, 51);*/
  player.dice = player.dice.add(tmp.p1r);
  player.coin = new OmegaNum(0);
  player.upg = [
    null,
    new OmegaNum(0),
    new OmegaNum(0),
    new OmegaNum(0),
    new OmegaNum(0),
    new OmegaNum(0),
    new OmegaNum(0),
    new OmegaNum(0),
    new OmegaNum(0),
    new OmegaNum(0),
    new OmegaNum(0),
    /*coinupg11-15
    new OmegaNum(0),
    new OmegaNum(0),
    new OmegaNum(0),
    new OmegaNum(0),
    new OmegaNum(0),
    */
  ];
  merge(tmp, baseTmp)
}
}

function nextDiceAt() {
  return tmp.p1r
    .add(1)
    .pow(4)
    .times(1e8);
}

function diceUpgDesc() {
  return{
    1:{
      name: "x2 coin gain, free level to a fifth coin upgrade and autobuy first coin upgrade.",
      effect: false,
      cost: 1,
      req: true,
    },
    2:{
      name: "Your coin gain gets doubled and unspent dice boosts coin gain, and auto buy second coin upgrade.",
      effect: "Effect: x"+format(tmp.upgPeff[2]),
      cost: 2,
      req: true,
    },
    3:{
      name:"Dice boost roll range and auto buy third coin upgrade.",
      effect:"Effect: x"+format(tmp.upgPeff[3]),
      cost: 10,
      req: true,
    },
    4:{
      name:"Dice roll range gets boosted (^1.2) and auto buy fourth coin upgrade.",
      effect: false,
      cost: 100,
      req: true,
    },
    5:{
      name: "Unlock challenges and auto buy fifth coin upgrade.",
      effect: false,
      cost: 500,
      req: true,
    },
    6:{
      name:"Upgrade 5 is boosted and auto buy the sixth buyable.",
      effect:"Effect: ^"+format(new OmegaNum(2).add(player.upgP[7]?tmp.upgPeff[7]:0)),
      cost:2e5,
      req: player.chaComp[3]>=1,
      reqtxt: "Complete challenge 3 once to unlock"
    },
    7:{
      name:"Previous Upgrade Gets Boosted by dices and auto buy the seventh coin upgrade.",
      effect:"Effect: ^"+format(tmp.upgPeff[7]),
      cost:7.5e5,
      req: player.chaComp[3]>=2,
      reqtxt: "Complete challenge 3 two times to unlock"
    },
    8:{
      name:"Gain 100% of dices on reset per second and coin Upgrades 1-5 prices scale slower, and auto buy the eighth coin upgrade. (wow, that's a lot!)",
      effect:false,
      cost:3e6,
      req: player.chaComp[3]>=3,
      reqtxt: "Complete challenge 3 three times to unlock"
    },
    9:{
      name:"Coin boost themselves and auto buy the ninth coin upgrade",
      effect:"Effect: x"+format(tmp.upgPeff[9]),
      cost:1e8,
      req: player.chaComp[3]>=6,
      reqtxt: "Complete challenge 3 six times to unlock"
    },
    10:{
      name:"Dice boost themselves and auto buy the tenth coin upgrade",
      effect:"Effect: x"+format(tmp.upgPeff[10]),
      cost:2.5e8,
      req: player.chaComp[3]>=7,
      reqtxt: "Complete challenge 3 seven times to unlock"
    }
  }
}

function diceUpgCost(x) {
  //dice upg cost
  if (x == 1) return new OmegaNum(1);
  if (x == 2) return new OmegaNum(2);
  if (x == 3) return new OmegaNum(10);
  if (x == 4) return new OmegaNum(100);
  if (x == 5) return new OmegaNum(500);
  if (x == 6&&player.chaComp[3]>=1) return new OmegaNum(2e5);
  if (x == 7&&player.chaComp[3]>=2) return new OmegaNum(7.5e5);
  if (x == 8&&player.chaComp[3]>=3) return new OmegaNum(3e6);
  if (x == 9&&player.chaComp[3]>=6) return new OmegaNum(1e8);
  if (x == 10&&player.chaComp[3]>=7) return new OmegaNum(2.5e8);
  return new OmegaNum("Infinity");
}

function buyDiceUpg(x) {
  //buy dice upg
  if (!player.dice.lt(diceUpgCost(x)) && !player.upgP[x]) {
    player.dice = player.dice.sub(diceUpgCost(x));
    player.upgP[x] = true;
  }
}

function diceOnPrestige() { //amount of dice you'll get on reset
  let dop = player.coin.div(1e8).pow(0.25).floor();
  dop = dop.times(tmp.chaeff[2]);
  dop = dop.times(tmp.upgeff[8]);
  tmp.p1rt= dop
  if (player.upgP[10]) dop = dop.times(tmp.upgPeff[10]);
  if (player.hasmilestone[5]) dop = dop.times(tmp.cubeff.pow(0.5));
  //softcaps
  if (dop.gte(new OmegaNum(1e4)) && player.inChallenge!==5 && player.inChallenge!==8)
  dop = new OmegaNum(9999).add(dop.sub(9999).root(1.6));

  if (dop.gte(new OmegaNum(1e6)) && player.inChallenge!==5 && player.inChallenge!==8) 
  dop = new OmegaNum(999999).add(dop.sub(999999).root(2));

  if (dop.gte(new OmegaNum(1e11)) && player.inChallenge!==5 && player.inChallenge!==8) 
  dop = dop.times(new OmegaNum(1e33)).root(4);
  //c5,c8 eff
  if (player.inChallenge==5||player.inChallenge==8) dop = dop.add(1).logBase(10);
  dop = dop.mul(tmp.lineEffect)
  //milestone 5 after line
  if (player.line>=1 && player.hasmilestone[5]){
    tmp.dopewope = player.cube.pow(0.5).ln().max(1)
    dop = dop.pow(tmp.dopewope)
  }
  
  tmp.p1r = dop;
}