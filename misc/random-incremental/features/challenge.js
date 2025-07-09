function challengeDescription() {
  return {
    1: {
      desc: "Coin gain ^0.5",
      reward:  "coin gain ^" + format(tmp.chaeff[1])
    },
    2: {
      desc: "You can only roll 10 times and auto roll is disabled",
      reward: "dice gain x" + format(tmp.chaeff[2])
    },
    3: {
      desc: "You can only buy coin upgrades 1 and 2",
      reward: "Unlock new upgrades each completion."
    },
    4: {
      desc: "Dice Upgrades 1-4 have no effect (keep autobuyers and free fifth buyable)",
      reward: "get 2 free fifth buyables and an eighth buyable per completion."
    },
    5: {
      desc: "Remove dice softcap but dice gain is log10(gain).",
      reward: "All buyable cost /1e5 per completion."
    },
    6: {
      desc: "Maximum number is always 1.",
      reward: "Reward: Upgrade 8 base  x" + format(tmp.chaeff[6])
    },
    7: {
      desc: "You can't buy any upgrade.",
      reward: "Reward: Cube gain x" + format(tmp.chaeff[7])
    },
    8: {
      desc: "Challenges 1-7 except 2 are applied at once. Additionally, there is only one dice.",
      reward: "Reward: Coin multiplier base +" + format(tmp.chaeff[8])
    }
  }
}

function getChallengeGoal(x) {
    return new OmegaNum(tmp.chabasereq[x][1])
      .pow(player.chaComp[x] + 1)
      .times(tmp.chabasereq[x][0]);
}

function startChallenge(x) {
  if (player.inChallenge === x) return;
  x >= 5 ? cubePrestige() : dicePrestige();
  player.inChallenge = x;
  player.rolltimes = OmegaNum.ZERO;
}

function exitChallenge(x) {
    x >= 5 ? cubePrestige() : dicePrestige();
    player.inChallenge = 0;
}