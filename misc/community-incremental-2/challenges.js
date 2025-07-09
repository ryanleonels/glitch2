function enterChallenge(x,ascension=false){
  if(player.activeChallenge==x){exitChallenge();return}
  player.activeChallenge=x
  player.points=D(0)
  player.prestige=D(0)
  if(x>=5||ascension){player.superprestige=D(0);for(i=1;i<5;i++){player.buyables[i]=D(0)}}
  
  if(!hasUpgrade(306))player.upgrades=player.upgrades.filter(x=>x>=200)
  player.automationLevel=D(hasUpgrade(307)?1:0)
}
function exitChallenge(){
  if(player.activeChallenge==0)return
  if(challenges[player.activeChallenge].canComplete()){
    if(player.activeChallenge<100&&(!hasChallenge(player.activeChallenge)))player.challenges.push(player.activeChallenge)
  else if(player.activeChallenge>100&&player.ascensionChallenges[player.activeChallenge-100]<5)player.ascensionChallenges[player.activeChallenge-100]++}// check if complete
  if (player.activeChallenge == 5) giveTrolling(); 
  player.activeChallenge=0
  player.points=D(0)
  player.prestige=D(0)
  
}
function trollingEffect(){
  let x = player.trollingpoints
  return [x.add(1), x, x.max(1).log10(), D(1).sub(D(0.9).div(player.trollingpoints.ln()))]
}
function getTrollingPointGain(){
  if(!inChallenge(5))return D(0)
  return player.points.add(1).log10().sub(49).floor().sub(player.trollingpoints).max(0)
}
function inChallenge(x){
  return player.activeChallenge==x
}
function hasChallenge(x){
  return player.challenges.includes(x)
}
function getChallengeDisplay(x){
  let s = challenges[x]
  let t = [s.challengeDescription(),"Goal: "+s.goalDescription(),"Reward: "+s.rewardDescription()]
  return t
}
let challenges = {
  1:{
    unlocked(){return hasUpgrade(211)},
    challengeDescription(){return "Due to an excessive amount of trolling, trolling has become harder and trolling gain is ^0.1"},
    canComplete(){return player.points.gte(1e215)},
    rewardDescription(){return "Trolling gain ^1.05, and unlock a new prestige upgrade."},
    goalDescription(){return "Reach 1e215 points"}
  },
  2:{
    unlocked(){return player.points.gte("e15100")},
    challengeDescription(){return "Prestige points are overrated. The mult from prestige points now does nothing!"},
    canComplete(){return player.points.gte("1e6300")},
    rewardDescription(){return "Mult from prestige points ^1.25, and unlock a new prestige upgrade."},
    goalDescription(){return "Reach 1e6300 points"}
  },
  3:{
    unlocked(){return player.points.gte("e16800")},
    challengeDescription(){return "Unfunny#0367, while attacking your trolls, found a way to hijack your buyables! Your buyables are now useless."},
    canComplete(){return player.points.gte("1e3870")},
    rewardDescription(){return "Unlock a new buyable, and unlock a new prestige upgrade again."},
    goalDescription(){return "Reach 1e3870 points"}
  },
  4:{
    unlocked(){return player.points.gte("e20700")},
    challengeDescription(){return "Challenge 1's effect has returned but in a different way, instead of rooting your points, they are now divided."},
    canComplete(){return player.points.gte("3.14e15149")},
    rewardDescription(){return "Prestige point gain is ^1.05, and unlock a yet new prestige upgrade."},
    goalDescription(){return "Reach 3.14e15149 points"}
  },
  5:{
    unlocked(){return hasUpgrade(310)},
    challengeDescription(){return "Enter the Troll. The prestige and super prestige effects are ^0.1, trolling gain exponent is square rooted, and the second prestige upgrade is disabled"},
    canComplete(){return false},
    rewardDescription(){return "Gain trolling points based on how far you get. If you exit now, you will get +"+format(getTrollingPointGain())+" trolling points"},
    goalDescription(){return "Get as far as you can"}
  },// 6-10 are ascension challenges
  101:{
    unlocked(){return hasUpgrade(311)},
    challengeDescription(){return "Remember when super-prestige points were useful? Let's disable the super-prestige point multiplier."},
    canComplete(){return player.superprestige.gt(["ee11","ee12","ee13","ee14","ee15","1/0"][player.ascensionChallenges[1]])},
    rewardDescription(){
      let r = ["The super prestige point multiplier is ^2","Unlock the ability to give gifts to randomtuba","The first super prestige buyable is 2x as effective","","Unlock a new super-prestige upgrade"]
      let reward = ""
      let rtrue = []
      for(let i=0;i<Math.min(player.ascensionChallenges[1],5);i++){
        rtrue.push(r[i])
      }
      reward=rtrue.join(', ')
      return reward
      },
    goalDescription(){return ["ee11","ee12","ee13","ee14","ee15","Infinity"][player.ascensionChallenges[1]]+" superprestige"}
  }, //also the rewards should display over time, not all at once because multi-completions (this is probably easy to implement)
  102:{
    unlocked(){return hasUpgrade(311)},
    challengeDescription(){return "You've angered some kind of elder deity, and now Voidia scaling starts instantly, and is applied twice."},
    canComplete(){return player.superprestige.gt(["e5e11","e1.5e12","ee13","ee14","ee15","1/0"][player.ascensionChallenges[2]])}, // spot the problem with this code, you have 2 minutes
    rewardDescription(){
      let r= ["Trolling and prestige point gain ^1.5","Unlock the ability to give gifts to Unpingabot","super prestige point gain ^1.5"]
      return r.slice(0, player.ascensionChallenges[2]-1).join(", ") // wait a minute something sounds a bit sussy
    },
    // when the dev doesn't know how to use slice!
    goalDescription(){return ["e2e11","e1.5e12","ee13","ee14","ee15","Infinity"][player.ascensionChallenges[2]]+" superprestige"}
  },
  103:{
    unlocked(){return hasUpgrade(311)},
    challengeDescription(){return "The scientists are super pissed off! Technobabble gaming and technobabble milestones do nothing."},
    canComplete(){return false},
    rewardDescription(){
      return ["Quark gluon gas effect ^10","unlock the ability to give gifts to Yhvr","square technobabble gaming gain"]},
    goalDescription(){return ["???","???","???","???","???","Infinity"][player.ascensionChallenges[3]]+" superprestige"}
  },
  104:{
    unlocked(){return hasUpgrade(311)},
    challengeDescription(){return "Your Trollage has gone too far. You are stuck in The Troll, trolling points do nothing, and you can't gain prestige points. Trolling gain is 5th rooted."},
    canComplete(){return false},
    rewardDescription(){
      return ["Ascension, Trolling and Prestige point gain is squared","Unlock the ability to give gifts to Upvoid"]},
    goalDescription(){return ["???","???","???","???","???","Infinity"][player.ascensionChallenges[4]]+" superprestige"}
  },
  105:{
    unlocked(){return hasUpgrade(311)},
    challengeDescription(){return "You have no idea what you have just done. ALL PREVIOUS CHALLENGES AT ONCE. This includes Super Prestige challenges and the Troll (which is applied twice!)."},
    canComplete(){return false},
    rewardDescription(){return "Bragging rights?"},
    goalDescription(){return ["???","???","???","???","???","Infinity"][player.ascensionChallenges[5]]+" superprestige"} // AC5 will unlock giving gifts to Jacorb
  }, // sad im not getting any gifts :( - mkey
}