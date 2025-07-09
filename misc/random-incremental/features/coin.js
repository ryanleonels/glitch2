function roll() {
  if (!player.rolltimes.gte(OmegaNum.TEN)) {
    tmp.rng = rng(OmegaNum.ONE, tmp.maxnum);
    if (player.upgP2[1]) {
      tmp.rng2 = rng(OmegaNum.ONE, tmp.maxnum2.times(OmegaNum.TEN)).div(OmegaNum.TEN).max(OmegaNum.ONE);
      tmp.rng3 = rng(OmegaNum.ONE, tmp.maxnum3.times(OmegaNum.TEN)).div(OmegaNum.TEN).max(OmegaNum.ONE);
    }

    let rngGain = tmp.rng.times(tmp.rng2.pow(tmp.rng3));
    player.coin = player.coin.add(
      rngGain.pow(tmp.coinGainExp).times(tmp.coinGain)
    );
    if (player.inChallenge==2) player.rolltimes = player.rolltimes.add(1);
  }
}

function autoroll() {
  tmp.rng = rng(OmegaNum.ONE, tmp.maxnum);

  if (player.upgP2[1]) {
    if(!player.hasmilestone[18]){
      tmp.rng2 = rng(OmegaNum.ONE, tmp.maxnum2.times(10)).div(10).max(1);
      tmp.rng3 = rng(OmegaNum.ONE, tmp.maxnum3.times(10)).div(10).max(1);
      }
    else {
      tmp.rng2 = tmp.maxnum2.max(1);
      tmp.rng3 = tmp.maxnum3.max(1);
    }
  }
  let rngGain = tmp.rng.times(tmp.rng2.pow(tmp.rng3));
  player.coin = player.coin.add( 
    rngGain.pow(tmp.coinGainExp).times(tmp.coinGain.times(tmp.upgeff[5]))
    );     //need to multiple upgeff[5]

}

function coinUpgDesc() {
  return {
    1: "Boost maximum roll number",
    2: "Multiply maximum roll number",
    3: "Add 1 to upgrade 1 base",
    4: "Add 0.2 to upgrade 2 base",
    5: "Multiply coin gain from auto roll",
    6: "Add 0.25 to upgrade 3 base",
    7: "Add 0.1 to upgrade 4 base",
    8: "Multiply dice gain",
    9: "Add 0.25 to 8th upgrade base",
    10: "Add 0.05 to 6th & 7th upgrades bases",
    /*coinupg11-15
    11: "Multiply cube gain based on lines",
    12: "Double cash gain per level",
    13: "Challenge 8 reward scales better",
    14: "All row 1 upgrades are 1e10x cheaper",
    15: "All row 2 upgrades are 1e10x cheaper",
    */
    condition: {
      1: {
        req: true
      },
      2: {
        reqtxt: "Buy 5 of the 1st upgrade",
        req: player.upg[1].gte(5)
      },
      3: {
        reqtxt: "Roll 75 to unlock",
        req: tmp.maxnum.gte(75)
      },
      4: {
        reqtxt: "Buy 5 of the 3rd upgrade",
        req: player.upg[3].gte(5)
      },
      5: {
        reqtxt: "Buy 5 of the 4th upgrade",
        req: (player.upg[4].gte(5))
      },
      6: {
        reqtxt: "Complete challenge 3 once",
        req: player.chaComp[3] >= 1
      },
      7: {
        reqtxt: "Complete challenge 3 twice",
        req: player.chaComp[3] >= 2
      },
      8: {
        reqtxt: "Complete challenge 3 three times",
        req: player.chaComp[3] >= 3
      },
      9: {
        reqtxt: "Complete challenge 3 four times",
        req: player.chaComp[3] >= 4
      },
      10: {
        reqtxt: "Complete challenge 3 five times",
        req: player.chaComp[3] >= 5
      },
      /*coinupg11-15
      11: {
        reqtxt: "Complete challenge 3 eight times",
        req: player.chaComp[3] >= 8
      },
      12: {
        reqtxt: "Complete challenge 3 nine times",
        req: player.chaComp[3] >= 9
      },
      13: {
        reqtxt: "Complete challenge 3 ten times",
        req: player.chaComp[3] >= 10
      },
      14: {
        reqtxt: "Get 2.2k levels of first upgrade",
        req: (player.upg[1].gte(2200))
      },
      15: {
        reqtxt: "Get 30 levels of sixth upgrade",
        req: (player.upg[6].gte(30))
      },
      */
    }
  }
}  

function getupgcost(x) {
  //coin upg cost
  if (x == 1)
    return new OmegaNum(100).times(
      new OmegaNum(1.1).pow(player.upg[1].pow(tmp.upg_b[0][2])).div(tmp.chaeff[5])//.div(tmp.upgeff[14])
    );
  else if (x == 2 && player.upg[1].gte(5))
    return new OmegaNum(250).times(
      new OmegaNum(1.2).pow(player.upg[2].pow(tmp.upg_b[1][2])).div(tmp.chaeff[5])//.div(tmp.upgeff[14])
    );
  else if (x == 3 && tmp.maxnum.gte(75))
    return new OmegaNum(2e3).times(
      new OmegaNum(1.6).pow(player.upg[3].pow(tmp.upg_b[2][2])).div(tmp.chaeff[5])//.div(tmp.upgeff[14])
    );
  else if (x == 4 && player.upg[3].gte(5))
    return new OmegaNum(6.25e4).times(
      new OmegaNum(1.8).pow(player.upg[4].pow(tmp.upg_b[3][2])).div(tmp.chaeff[5])//.div(tmp.upgeff[14])
    );
  else if (x == 5 && (player.upg[4].gte(5) || player.upg[5].gte(1)))
    return new OmegaNum(1e6).times(
      new OmegaNum(1.5).pow(player.upg[5].pow(tmp.upg_b[4][2])).div(tmp.chaeff[5])//.div(tmp.upgeff[14])
    );
  else if (x == 6 && player.chaComp[3]>=1)
    return new OmegaNum(1e24).times(
      new OmegaNum(2).pow(player.upg[6].pow(2)).div(tmp.chaeff[5])//.div(tmp.upgeff[15])
    );
  else if (x == 7 && player.chaComp[3]>=2)
    return new OmegaNum(1e26).times(
      new OmegaNum(3).pow(player.upg[7].pow(1.75)).div(tmp.chaeff[5])//.div(tmp.upgeff[15])
    );
  else if (x == 8 && player.chaComp[3]>=3)
    return new OmegaNum(1e32).times(
      new OmegaNum(4).pow(player.upg[8].pow(1.4)).div(tmp.chaeff[5])//.div(tmp.upgeff[15])
    );
  else if (x == 9 && player.chaComp[3]>=4)
    return new OmegaNum(1e38).times(
      new OmegaNum(10).pow(player.upg[9].pow(1.75)).div(tmp.chaeff[5])//.div(tmp.upgeff[15])
    );
  else if (x == 10 && player.chaComp[3]>=5)
    return new OmegaNum(1e45).times(
      new OmegaNum(10).pow(player.upg[10].pow(1.6)).div(tmp.chaeff[5])//.div(tmp.upgeff[15])
    );
  /*coinupg11-15
  else if (x == 11 && player.chaComp[3]>=8)
    return new OmegaNum(1e110).times(
      new OmegaNum(10).pow(player.upg[11].pow(1.25)).div(tmp.chaeff[5])
    );
  else if (x == 12 && player.chaComp[3]>=9)
    return new OmegaNum(1e120).times(
      new OmegaNum(10).pow(player.upg[12].pow(1.35)).div(tmp.chaeff[5])
    );
  else if (x == 13 && player.chaComp[3]>=10)
    return new OmegaNum(1e130).times(
      new OmegaNum(10).pow(player.upg[13].pow(2)).div(tmp.chaeff[5])
    );
  else if (x == 14 && player.upg[1].gte(2000))
    return new OmegaNum(1e150).times(
      new OmegaNum(10).pow(player.upg[14].pow(1.6).times(10)).div(tmp.chaeff[5])
    );
  else if (x == 15 && player.upg[6].gte(30))
    return new OmegaNum(1e175).times(
      new OmegaNum(10).pow(player.upg[15].pow(1.7).times(10)).div(tmp.chaeff[5])
    );
  */
  else return new OmegaNum(Infinity);
}

function buyUpg(x) {
  if (
    player.coin.gte(getupgcost(x)) &&
    ((player.inChallenge!==3&&player.inChallenge!==8) || new OmegaNum(2).gte(x))&&player.inChallenge!==7&&player.inChallenge!==8
  ) {
    player.coin = player.coin.sub(getupgcost(x));
    player.upg[x] = player.upg[x].add(1);
  }
}

function toggleauto(x) {
  player.auto[x] = !player.auto[x];
}

function canBuyUpg(x) { //can buy coin upgrade? (for style)
  return player.coin.gte(getupgcost(x));
}

function autobuy() {
  for (let i = 1; i <= (player.inChallenge==7||player.inChallenge==8 ? 0 : player.inChallenge==3||player.inChallenge==8 ? 2 : 10); i++) {
    if (player.upgP[i] && player.auto[i]) {
      player.upg[i] = player.coin
        .times(tmp.chaeff[5])
        .div(tmp.upg_b[i - 1][0])
        .logBase(tmp.upg_b[i - 1][1])
        .root(tmp.upg_b[i - 1][2])
        .add(1)
        .floor()
        .max(player.upg[i]);
    }
  }
}