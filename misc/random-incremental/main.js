/**
 * The player save data object.
 */
const player = {
  options: {
    /**
     * A boolean indicating whether or not the game should be automatically
     * saved every few seconds.
     */
    autoSave: true
  },
  /**
   * The currently selected theme.
   */
  theme: 1,
  unlocks: {
    dice: false,
    cha: false,
    cubes: false,
    lines: false
  },
  /**
   * The amount of coins, the main currency, the player currently has.
   */
  coin: OmegaNum.ZERO,
  /** 
   * The amount of dice, prestige currency, the player has.
   */ 
  dice: OmegaNum.ZERO,
  /** 
   * The amount of cubes, second prestige layer currency, the player has.
   */
  cube: OmegaNum.ZERO,
  line: OmegaNum.ZERO, //3rd prestige layer currency
  /**
   * Array of coin upgrade levels.
   * Note that the first item in the array isn't used so it's 1-indexed.
   */
  upg: Array.from({length: 11}, () => OmegaNum.ZERO),
  upgP: Array.from({length: 11}, () => false),
  upgP2: Array.from({length: 11}, () => false),
  auto: Array.from({length: 11}, () => false),
  /**
   * Number of the currently active challenge.
   */
  inChallenge: 0,
  chaComp: Array.from({length: 9}, () => 0),
  cubeMax: OmegaNum.ZERO,
  rolltimes: OmegaNum.ZERO,
  hasmilestone: Array.from({length: 30}, () => false)
};

/**
 * A copy of the base player object.
 * @type {typeof player}
 */
const basePlayer = JSON.parse(JSON.stringify(player));
objectToDecimal(basePlayer);

/**
 * Loads the game.
 */
function load() {
  const loadedSave = localStorage.getItem("powgame1");
  if (loadedSave !== null) {
    const parsedSave = JSON.parse(loadedSave);
    objectToDecimal(parsedSave);
    merge(player, parsedSave);
  }
  updateTheme();
  loadVue();
}

load();

function gainMult() {
  tmp.cubeff = player.cube
      .add(OmegaNum.ONE)
      .ln()
      .add(OmegaNum.ONE)
      .pow(5)
      .pow(player.hasmilestone[15] ? 1.35 : OmegaNum.ONE);

  let mult = OmegaNum.ONE;
  if (player.inChallenge !== 4 && player.inChallenge !== 8) {
    if (player.upgP[1]) mult = mult.times(OmegaNum.TWO);
    if (player.upgP[2]) mult = mult.times(OmegaNum.TWO);
    if (player.upgP[2]) mult = mult.times(tmp.upgPeff[2]);
  }
  if (player.upgP[9]) mult = mult.times(tmp.upgPeff[9]);
  mult = mult.times(tmp.cubeff);
  return mult;
}

function gainExp() {
  let exp = OmegaNum.ONE;
  if (player.inChallenge === 1 || player.inChallenge === 8) exp = exp.div(OmegaNum.TWO);
  exp = exp.times(tmp.chaeff[1]);
  return exp;
}

/**
 * Returns the current coin gain.
 */
function coinGain() {
  return tmp.coinGainMult.pow(tmp.coinGainExp);
}

function approxGain() {
  return format(
    OmegaNum.ONE
      .add(tmp.maxnum)
      .div(OmegaNum.TWO)
      .pow(tmp.coinGainExp)
      .times(tmp.coinGain)
      .times(20)
      .times(tmp.upgeff[5])
  );
}

function getmaxnum() {
  let maxnum = new OmegaNum(6);
  maxnum = maxnum.add(tmp.upgeff[1]);
  maxnum = maxnum.times(tmp.upgeff[2]);
  if (player.upgP[3] && player.inChallenge!==4&& player.inChallenge!==8)
    maxnum = maxnum.times(tmp.upgPeff[3]);
  if (player.upgP[4] && player.inChallenge!==4&& player.inChallenge!==8) maxnum = maxnum.pow(1.2);
  if (player.inChallenge==6||player.inChallenge==8) maxnum = OmegaNum.ONE;
  return maxnum.floor();
}
function getmaxnum2() {
  let maxnum2 = new OmegaNum(6);
  if (player.upgP2[3]) maxnum2 = maxnum2.add(tmp.upgP2eff[3]);
  maxnum2=maxnum2.add(tmp.chaeff[8])
  return maxnum2.times(OmegaNum.TEN).floor().div(OmegaNum.TEN);
}
function getmaxnum3() {
let maxnum3 = new OmegaNum(6);
  if (player.upgP2[2]) maxnum3 = maxnum3.add(tmp.upgP2eff[2]);
  if (player.hasmilestone[17]) maxnum3 = maxnum3.times(1.35);
  return maxnum3.times(OmegaNum.TEN).floor().div(OmegaNum.TEN);

}

function rng(x, y) {
  return new OmegaNum(new OmegaNum(Math.random()).times(y.sub(x).plus(1)).plus(x-1)).ceil().max(1);
}


function objectToDecimal(object) {
  for (const i in object) {
    if (
      typeof object[i] === "string" && 
      new OmegaNum(object[i]) instanceof OmegaNum &&
      !(new OmegaNum(object[i]).sign === 0 && object[i] !== "0")
    ) {
      object[i] = new OmegaNum(object[i]);
    }
    if (typeof object[i] === "object") {
      objectToDecimal(object[i]);
    }
  }
}

function merge(base, source) {
  for (const i in base) {
    if (source[i] != undefined) {
      if (
        typeof base[i] === "object" &&
        typeof source[i] === "object" &&
        !isDecimal(base[i]) &&
        !isDecimal(source[i])
      ) {
        merge(base[i], source[i]);
      } else {
        if (isDecimal(base[i]) && !isDecimal(source[i])) {
          base[i] = new OmegaNum(source[i]);
        } else if (!isDecimal(base[i]) && isDecimal(source[i])) {
          base[i] = source[i].toNumber();
        } else {
          base[i] = source[i];
        }
      }
    }
  }
}

function isDecimal(x) {
  return x instanceof OmegaNum
}
  
function save() {
  localStorage.setItem("powgame1", JSON.stringify(player));
}

window.onload = function () {
  document.getElementById("loadingscreen").remove()
setInterval(function () {
  
    tmp.p1r = tmp.p1r.max(tmp.p1r);
    player.cubeMax= player.cube.max(player.cubeMax);
    tmp.maxnum=getmaxnum()
    tmp.maxnum2=getmaxnum2()
    tmp.maxnum3=getmaxnum3()

    if (player.upg[5].gte(1) && player.inChallenge!==2) autoroll()
    tmp.upg_b[8][0] = new OmegaNum(1e38);

    //unlocks
    if (player.coin.gte(1e8) &&! (player.unlocks.dice))  player.unlocks.dice  = true
    if (player.upgP[5]       &&! (player.unlocks.cha))   player.unlocks.cha   = true
    if (player.dice.gte(1e9) &&! (player.unlocks.cubes)) player.unlocks.cubes = true
    if (player.hasmilestone[19] &&! (player.unlocks.lines)) player.unlocks.lines = true
  
    if (player.chaComp[3]>=1 || player.hasmilestone[6]) tmp.upgR = 2;
    else tmp.upgR = 1;
    if (player.upgP[8]) {
      tmp.upg_b[0][2] = new OmegaNum(1.08);
      tmp.upg_b[1][2] = new OmegaNum(1.1);
      tmp.upg_b[2][2] = new OmegaNum(1.3);
      tmp.upg_b[3][2] = new OmegaNum(1.275);
      tmp.upg_b[4][2] = new OmegaNum(1.65);
    }
    if (player.upgP[1] || player.cube.gte(1))
      player.upg[5] = player.upg[5].max(1);
  
    if (player.upgP[8])
      player.dice = player.dice.add(
        tmp.p1r
          .div(20)
          .times(player.hasmilestone[11] ? 10 : player.hasmilestone[7] ? 5 : 1)
      );
    for (let i = 1; i <= 8; ++i) {
      if (player.inChallenge==i) {
        player.chaComp[i] = player.coin
          .div(tmp.chabasereq[i][0])
          .max(1)
          .logBase(tmp.chabasereq[i][1])
          .floor()
          .max(player.chaComp[i])
          .min(tmp.chaAmax[i])
          .toNumber();
      }
    }
    tmp.chaeff[1] = player.chaComp[1]>=10
      ? new OmegaNum(1.4)
      : OmegaNum.add(player.chaComp[1], 1).log(10).add(1).pow(0.25);
    tmp.chaeff[2] = OmegaNum.add(player.chaComp[2], 1).log(10).add(1).pow(3);
    tmp.chaeff[5] = OmegaNum.pow(1e5, player.chaComp[5]);
    tmp.chaeff[6] = OmegaNum.add(player.chaComp[6], 1).logBase(10).add(1);
    tmp.chaeff[7] = OmegaNum.add(player.chaComp[7], 1).logBase(10).add(1).pow(3);
    if (player.chaComp[8]>=1) tmp.chaeff[8] = OmegaNum.add(player.chaComp[8], 1).div(1.1).pow(1.2).sub(1);
    else tmp.chaeff[8] = OmegaNum.ZERO
    tmp.upgPeff[2] = player.dice.add(2).pow(0.75);



    tmp.upgPeff[3] = player.dice.add(2).pow(0.65);
    tmp.upgPeff[6] = new OmegaNum(2).add(
      player.upgP[7] ? tmp.upgPeff[7] : 0
    );
    tmp.upgPeff[7] = player.dice.add(1).logBase(10).add(1).root(4);
    tmp.upgPeff[8] = tmp.p1r;
    tmp.upgPeff[9] = player.coin.add(1).log().add(1);
        tmp.coinGainMult = gainMult();
        tmp.coinGainExp = gainExp();
        tmp.coinGain = coinGain();
    tmp.upgPeff[10] = player.coin.add(1).log().add(1).pow(2);
    autobuy();
    tmp.upgeff[1] = player.upg[1].times(tmp.upgeff[3].add(1));
    tmp.upgeff[3] = player.upg[3].times(tmp.upgeff[6].add(1));
    tmp.upgeff[6] = player.upg[6].times(
      new OmegaNum(0.25).add(player.upg[10].times(0.05))
    );
    tmp.upgeff[4] = player.upg[4].times(
      new OmegaNum(0.2).add(tmp.upgeff[7])
    );
    tmp.upgeff[2] = player.upg[2]
      .times(new OmegaNum(0.2).add(tmp.upgeff[4]))
      .add(1);

    tmp.upgeff[7] = player.upg[7].times(
      new OmegaNum(0.1).add(player.upg[10].times(0.05))
    );
  
    tmp.upgeff[5] = player.upg[5]
      .add(OmegaNum.times(player.chaComp[4], 2))
      .pow(player.upgP[6] ? tmp.upgPeff[6] : 1);
  
    tmp.upgeff[8] = new OmegaNum(2)
      .add(tmp.upgeff[9])
      .times(tmp.chaeff[6])
      .pow(player.upg[8].add(player.chaComp[4]));
  
    tmp.upgeff[9] = new OmegaNum(0.25).times(player.upg[9]);
      
    tmp.upgeff[10] = new OmegaNum(0.05).times(player.upg[10]);
    
    tmp.upgP2eff[2] = player.cube.add(1).logBase(10);
    tmp.upgP2eff[3] = player.cube.add(1).pow(0.2);
    
    
    diceOnPrestige()
    cubeOnPrestige()
    lineOnPrestige()
    lineEffect()
    cubemult();
        

    if (player.hasmilestone[12]) tmp.chaR = 2;
      else tmp.chaR = 1;

      

  }, 50);
  setInterval(function () {
   if(player.options.autoSave) save();
  }, 5000);

};
