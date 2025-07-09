"use strict";

const ocGoals = [
  1e16,
  1e55,
  1e75,
  1e93,
  1e50
]


function exitChallenge() {
  if (game.qolSM.abu === 1 && game.leastBoost <= 1.5) {
    refundAction();
  }
  if (inAnyChal()) {
    resetEverythingBoostDoes();
  }
}

function completeChallenge() {
  if (game.OP >= (
    game.chal8 === 1 
    ? getChal8Goal(game.chal8Comp) 
    : challengeGoals[game.challenge - 1][game.challengeCompletion[game.challenge - 1]]
  )) {
    if (game.chal8 === 1) {
      if (game.leastBoost <= 15) {
        while (game.OP >= getChal8Goal(game.chal8Comp)) {
          game.chal8Comp += 1;
        }
      } else {
      game.chal8Comp += 1;
      }
    } else if (game.leastBoost <= 15) {
      
        while (
      game.challengeCompletion[game.challenge - 1] <= 2 && 
      game.OP >= challengeGoals[game.challenge - 1][game.challengeCompletion[game.challenge - 1]]
    ) {
          if(game.omegaChallenge != 1 || game.challenge2.includes(game.challenge)) game.challengeCompletion[game.challenge - 1] += 1;
        }
      
    } else {
      if(game.omegaChallenge != 1 || game.challenge2.includes(game.challenge)) game.challengeCompletion[game.challenge - 1] += 1;
    }
    if (game.qolSM.abu === 1 && game.leastBoost <= 1.5) {
    refundAction();
    }
    resetEverythingBoostDoes();
  }
}

function enterChallenge(c) {
  if (!inAnyChal() && (game.challengeCompletion[c - 1] < 2.5||game.upgrades.includes(17)) && game.chal8 === 0 && (c%2==1||game.omegaChallenge != 2)) {
  let conf;
  switch (game.bConf.chal) {
    case 1:
      conf = confirm("Are you sure you want to start a challenge?" + 
      " You'll forfeit your current run in favor of the challenge.");
      break;
  
    default:
      conf = true;
      break;
  }
    if (conf) {
      if (game.bConf.chalFB === 1) factorBoost();
      if (game.qolSM.abu === 1 && game.leastBoost <= 1.5) {
        refundAction();
       }
      resetEverythingBoostDoes();
      game.challenge = c;
    }
  }
}
function enterOC(c) {
  if (game.omegaChallenge === 0) {
  game.incrementyDouble=game.iups[1]
  game.iups[1]=0
  game.sfBought = [];
  game.spentFunctions = 0;
  singfunctions.forEach(func => func.update())
  if(c==1) {
    const chal1 = prompt("What is the first challenge you would like to be in?")
    const chal2 = prompt("What is the second challenge you would like to be in?")
    if([1,2,3,4,5,6,7,8].includes(parseInt(chal1)) && [1,2,3,4,5,6,7,8].includes(parseInt(chal2)) && parseInt(chal1) != parseInt(chal2)) {
      game.challenge2 = [parseInt(chal1), parseInt(chal2)] /// hi patcail we alrady did this pretty much (OC1 that is, OC2+ will be much easier to make)
    } else return
  }
  resetEverythingCollapseDoes()
  game.factorBoosts = 0
  game.omegaChallenge = c
  }
}

function exitOC() {
  if (game.omegaChallenge >= 1) {
  resetEverythingCollapseDoes()
  game.factorBoosts = 0
  game.omegaChallenge = 0
  game.challenge2 = [0,0]
  game.iups[1]=game.incrementyDouble
  }
}

function completeOC() {
  /*if(game.incrementy.gte(ExpantaNum.pow(ocGoals[game.omegaChallenge-1],game.ocCompletion[game.omegaChallenge-1]))) {
    game.ocCompletion[game.omegaChallenge-1] = game.incrementy.logBase(ocGoals[game.omegaChallenge-1])
    game.omegaChallenge = 0
  }
  game.challenge2 = [0,0]*/
}
function enterChallenge8() {
  if (!inAnyChal()&&game.omegaChallenge != 2) {
  let conf;
  switch (game.bConf.chal) {
    case 1:
      conf = confirm("Are you sure you want to start a challenge? You'll " +
      "forfeit your current run in favor of the challenge.");
      break;
  
    default:
      conf = true;
      break;
  }
    if (conf) {
      if (game.bConf.chalFB === 1) factorBoost();
      refundAction();
      resetEverythingBoostDoes();
      game.chal8 = 1;
    }
  }
}