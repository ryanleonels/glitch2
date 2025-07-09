const tmp = {
  canreset:true, //a workaraund to prevent resetting multiple times at once
  coinGainMult: OmegaNum.ONE,
  coinGainExp: OmegaNum.ONE,
  coinGain: OmegaNum.ZERO,
  approxGain: OmegaNum.ZERO,
  cubemult: OmegaNum.ONE, //cube gain multiplier
  cubeff: OmegaNum.ONE,  //cube multiplier to coins
  lineEffect: OmegaNum.ONE,
  rng: OmegaNum.ONE, //exactly the same thing as maxnum 1 2 and 3 below
  rng2: OmegaNum.ONE,
  rng3: OmegaNum.ONE,
  maxnum: OmegaNum.ZERO, //range
  maxnum2: OmegaNum.ZERO, //range of multipliers 1 and 2
  maxnum3: OmegaNum.ZERO, 
  p2rB: OmegaNum.ZERO,
  p1r: OmegaNum.ZERO, //reset for this dice
  p2r: OmegaNum.ZERO, //reset for this cubes
  linesOnReset: OmegaNum.ZERO, //reset for this lines
  dopewope: OmegaNum.ONE, //power from cubes to dice after lines unlock
  chabasereq: [
    null,
    [new OmegaNum(1e7), new OmegaNum(10)],
    [new OmegaNum(1e19), new OmegaNum(10)],
    [new OmegaNum(1e14), new OmegaNum(1e3)],
    [new OmegaNum(1e14), new OmegaNum(10)],
    [new OmegaNum("1e35"), new OmegaNum(1e5)],
    [new OmegaNum("1e18"), new OmegaNum(1e6)],
    [new OmegaNum("1e39"), new OmegaNum(1e4)],
    [new OmegaNum(2e17), new OmegaNum(50)]
  ],
  chaAmax: [
    null,
    OmegaNum.TEN,
    OmegaNum.TEN,
    new OmegaNum(7),
    new OmegaNum(7),
    OmegaNum.TEN,
    OmegaNum.TEN,
    OmegaNum.TEN,
    OmegaNum.TEN
  ],
  upg_b: [
    [100, 1.1, 1.1],
    [250, 1.2, 1.125],
    [2e3, 1.6, 1.35],
    [6.25e4, 1.8, 1.3],
    [1e6, 1.5, 1.7],
    [1e24, 2, 2],
    [1e26, 3, 1.75],
    [1e32, 4, 1.4],
    [1e38, 10, 1.75],
    [1e45, 10, 1.6]
  ],
  chaeff: [
    null,
    OmegaNum.ONE,
    OmegaNum.ZERO,
    OmegaNum.ZERO,
    OmegaNum.ZERO,
    OmegaNum.ONE,
    OmegaNum.ZERO,
    OmegaNum.ZERO,
    OmegaNum.ONE
  ],
  upgPeff: [
    null,
    null,
    OmegaNum.ZERO,
    OmegaNum.ZERO,
    null,
    null,
    OmegaNum.ZERO,
    OmegaNum.ZERO
  ],
  upgP2eff: [null, null, OmegaNum.ZERO],
  upgeff: [  
    null,
    OmegaNum.ONE,
    OmegaNum.ONE,
    OmegaNum.ZERO,
    OmegaNum.ZERO,
    OmegaNum.ZERO,
    OmegaNum.ZERO,
    OmegaNum.ZERO,
    OmegaNum.ZERO,
    OmegaNum.ZERO,
    OmegaNum.ZERO,
  ]
};
const baseTmp = JSON.parse(JSON.stringify(tmp));
tmp.tab = "main"
tmp.cubeSubTab = "milestone"
tmp.lineSubTab = "linemilestone"
tmp.chaR = 1