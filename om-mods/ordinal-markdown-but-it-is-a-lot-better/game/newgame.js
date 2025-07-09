"use strict"

function newGame() {
  return {
    level: 0,
    lastTick: Date.now(),
    ord: newOrd(0,3,0),
    op: new ExpantaNum(0),
    upgrades: [],
    milestones: [],
    autos: [0,0]
  }
}

function newVue() {
  return new Vue({
    el: "#app",
    data: {
      ordinal: 0,
      op: 0,
      upgradeCosts: [1000,20000,1e6,1e250,EN("1e1e4")],
      upgradeDescriptions: ["Unlock the Maximize Autoclicker and Predecessor autoclicker is 10x faster", "OP boosts Autoclickers (log(x))","OP multiplies autoclicker speed and unmaximize autoclicker is instant","You can bulk unmaximize the ordinal","Raise OP gain to the 1.01"],
      upgrades: [],
      tab: 1,
      milestones: [],
      milestonereqs: [10,12,13,22],
      milestoneindexes: ["0","1","2","3"],
      milestonedescs: {
        "0": "You get a predecessor autoclicker",
        "1": "Your level boosts predecessor autoclicker",
        "2": "Unlock Ordinal Points and Markdown",
        "3": "Gain 100% of ordinal points on markdown per second"
      },
      autos: [0,0],
      opGain: "0",
      unlockedMarkdown: false
    }
  })
}