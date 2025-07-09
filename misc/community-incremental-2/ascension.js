function getAPGain(){
  if(player.points.lt("e6e4")) return D(0);
  // Ascension isnt opening when i got all of those function upgrades.
  let g=player.points.div("1e60000").log("1e10000").add(1);
  if (hasUpgrade(303)) g = g.mul(3);
  if (hasUpgrade(308)) g = g.mul(upgrades[308].effect2());
  if(hasMilestone(303)) g = g.mul(trollingEffect()[0]);
  if (player.technobabble.photonType == 'Up') g = g.mul(soups.photons.effect());
  if(hasUpgrade(312))g=g.mul(1000)
  return g.floor()
}
function ascend(force = false){
  if(player.points.lt("e6e4") && !force)return
  if (!force) player.ascensionpoints = player.ascensionpoints.add(getAPGain())
  player.prestige=D(0)
  player.points=D(0)
  player.superprestige=D(0)
  player.automationLevel=D(hasUpgrade(307)?1:0)
  if(!hasUpgrade(306)){if(hasUpgrade(305)){player.upgrades=player.upgrades.filter(x=>x>=200)}else{player.upgrades=player.upgrades.filter(x=>x>=300)}}
  if(player.activeChallenge<200)exitChallenge()
  for(i=1;i<5;i++){player.buyables[i]=D(0)}
  if(!hasUpgrade(304)){player.challenges=[]}
}

function giveTrolling() {
  player.trollingpoints = player.trollingpoints.add(getTrollingPointGain());
  if (player.trolUnlocks >= trollingUnlocks.length) return;
  for (let i = player.trolUnlocks; i < trollingUnlocks.length; i++) {
    if (player.trollingpoints.gte(trollingUnlocks[i].req)) player.trolUnlocks++;
    else return;
  }
}
function getTrolunlockDisplay() {
  if (player.trolUnlocks >= trollingUnlocks.length) return "";
  else return `${trollingUnlocks[player.trolUnlocks].name}: Unlocked at ${format(trollingUnlocks[player.trolUnlocks].req)} trolling points`
}
let trollingUnlocks = [{req: 2, name: "Technobabble gaming"}]

function getTechnobabblegain() {
  let g = player.ascensionpoints.pow(0.2).div(10).mul(soups.qgp.effect());
  if (player.technobabble.photonType == 'Bottom') g = g.mul(soups.photons.effect());
  return g;
}
function getPissedScientists() {
  let g = player.technobabble.points.add(1).log(2).pow(1.5);
  if (g.gte(144)) g = g.sqrt().mul(12);
  return g.floor()
}
function getNextScientist() {
  let s = getPissedScientists().add(1);
  if (s.gte(144)) s = s.div(12).pow(2);
  return Decimal.pow(2, s.root(1.5)).sub(1);
}
function getScientistEffect() {
  return getPissedScientists().mul(10000).add(1)
}
let photonTypes = ["Up", "Down", "Top", "Bottom", "Charm", "Strange"];

let soups = {
  qgp: {
    gain() {
      let mult = D(1);
      if (player.technobabble.photonType == "Charm") mult = mult.mul(soups.photons.effect());
      return hasMilestone(301) ? player.technobabble.points.pow(0.5).mul(mult).add(player.technobabble.t.gte(4e12) ?
        player.technobabble.qgg.mul(player.technobabble.t.div(4e12).log(2).min(10)) :
        player.technobabble.qgp.mul(Decimal.div(4e12, player.technobabble.t).log(2).min(10)).neg()) : D(0)
    },
    effect() {
      return player.technobabble.qgp.mul(soups.higgsF.effect()).add(1).pow(0.5)
    }
  },
  qgg: {
    gain() {
      return hasMilestone(302) ? (player.technobabble.t.gte(4e12) ?
        player.technobabble.qgg.mul(player.technobabble.t.div(4e12).log(2).min(10)).neg() :
        player.technobabble.qgp.mul(Decimal.div(4e12, player.technobabble.t).log(2).min(10))) : D(0)
    },
    effect() {
      return Decimal.pow(D(1.79e308).pow(4), player.technobabble.qgg.mul(soups.higgsF.effect()).pow(0.666));
    }
  },
  higgsF: {
    gain() {
      let mult = D(1);
      if (player.technobabble.photonType == "Top") mult = mult.mul(soups.photons.effect());
      return hasMilestone(305) ? player.technobabble.points.pow(0.125).mul(mult) : D(0)
    },
    effect() {
      return player.technobabble.higgsF.pow(0.8).add(1)
    }
  },
  photons: {
    gain() {
      let mult = D(1);
      if (player.technobabble.photonType == "Strange") mult = mult.mul(soups.photons.effect());
      return hasMilestone(350) ? player.technobabble.higgsF.pow(0.5).mul(mult) : D(0)
    },
    effect() {
      switch (player.technobabble.photonType) {
        case "Up":
          // ascension point boost
          return player.technobabble.photons.add(Math.pow(20, 0.5)).log(20).add(0.5);
        case "Down":
          // trolling boost, exponent
          return player.technobabble.photons.add(1).log(10).add(1).pow(1/3); // nice
        case "Top":
          // boosts higgs gain
          return player.technobabble.photons.div(3).add(1).pow(0.2);
        case "Bottom":
          // boosts technobabble gain
          return player.technobabble.photons.add(10).log(10).pow(1.5);
        case "Charm":
          // boost QGP gain
          return player.technobabble.photons.add(1).pow(0.25);
        case "Strange":
          // boost own gain
          return player.technobabble.photons.add(1).pow(0.2); // Uhh... there are errors in console. // no more // No, i mean on my savefile. //... // show on discord
      }
    },
    effectText() {
      switch (player.technobabble.photonType) {
        case "Up":
          // ascension point boost
          return "multiplying ascension point gain by";
        case "Down":
          // trolling boost, exponent
          return "raising trolling gain to"; // nice
        case "Top":
          // boosts higgs gain
          return "multiplying Higgs fermion gain by";
        case "Bottom":
          // boosts technobabble gain
          return "multiplying technobabble gaming gain by";
        case "Charm":
          // boost QGP gain
          return "multiplying Quark-gluon plasma gain by";
        case "Strange":
          // boost own gain
          return "multiplying Photon gain by";
        default:
          return "being broken, try clicking the buttons below this?";
      }
    }
  }
} // unban nef2021 from dඞiscord community server pls 