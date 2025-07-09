function linePrestige() {
  if (tmp.linesOnReset.gte(1) && tmp.canreset) {
  tmp.canreset=false  
  setTimeout(() => {
    tmp.canreset=true
  }, 51);

  player.line = OmegaNum.add(player.line, tmp.linesOnReset);
  merge(tmp, baseTmp)
  player.cube = OmegaNum.ZERO;
  player.dice = OmegaNum.ZERO;
  player.coin = OmegaNum.ZERO;
  player.upgP2 = Array.from({length: 11}, () => false);
  player.upgP = Array.from({length: 11}, () => false);
  player.upg = Array.from({length: 11}, () => OmegaNum.ZERO);//coinupg11-15: change it to 16
  player.inChallenge = 0;
  player.chaComp = Array.from({length: 9}, () => 0);
  player.cubeMax = OmegaNum.ZERO;
  player.rolltimes = OmegaNum.ZERO;
  player.hasmilestone = Array.from({length: 30}, () => false);
  player.hasmilestone[19] = true;
  tmp.rng2=OmegaNum.ONE
  tmp.rng3=tmp.rng2
  }
}

function lineOnPrestige() {
  let linesOnReset = player.cube.div(5e4).pow(0.8)
  tmp.linesOnReset = linesOnReset.floor()
}

function lineEffect() {
  tmp.lineEffect = OmegaNum.max(OmegaNum.pow(player.line, 1.2).times(100), 1)
}