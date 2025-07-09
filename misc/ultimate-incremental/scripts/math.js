function boosterCostNum(num) {
  let base = D(3)
    if (inChallenge("energy",3))base=D(4.2069)
    if (hasChallenge("energy",0)&&!inChallenge("energy",3))base=base.pow(0.9)
    if (hasChallenge("energy",3))base=base.pow(0.9)
    let divider = D(hasUpgrade("air",3)&&!inChallenge("energy",1)&&!inChallenge("energy",2)&&!inChallenge("energy",3)?0.8:1).div(D(1.5).pow(rebuyableAmt("space",1))).div(hasMilestone("space",2)?2:1).mul(hasUpgrade("energy",4)?0.1:1)
    let superscaledB=D(num).mul(num.gte(150)?num.minus(149).div(hasMilestone("planets",0)?(hasMilestone("planets",2)?1000:500):250).add(1):1).mul(num.gte(660)?num.minus(659).div(100).add(1):1)
    return base.pow(superscaledB).mul(divider)
}

function boosterCostInverse(cash, currentBoosters, maxLevels) {
  // imma going to just write binarySearch, screw it
  let l = D(0);
  let r = D(maxLevels);
  
  for (let i = 0; i < 64; i++) {
    let m = r.add(l).div(2);
    if (l.lt(m) && m.lt(r)) {
      if (cash.lt(boosterCostNum(currentBoosters.add(m).sub(1)))) r = m;
      else l = m;
    }
    else break;
  }
  
  return l.floor();
}