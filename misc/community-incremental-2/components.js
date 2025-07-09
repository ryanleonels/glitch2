Vue.component('upgrade', {
  props: ['upgid', 'type'],
  data: function () { return {
    upgrades, player, console
  }},
  methods: {
    hasUpgrade, buyUpgrade,format
  },
  computed: {
    upg: function () { return upgrades[this.upgid] }
  },
  template: `<span>
    <button :class="{'upgrade': true, [type + 'Text']: true, 'bought': hasUpgrade(upgid)}"
  @click="buyUpgrade(upgid)"
  :foobar="{...player}">
    <span v-html="upg.name"></span>
    <div v-if="hasUpgrade(upgid)">(bought)</div>\n
    <div>
      &nbsp;{{upg.effectDesc ? ("Currently: " + upg.effectDesc()) : (upg.effect ? "Currently: " + format(upg.effect()) : "")}}
    </div>\n
      Cost: {{format(upgrades[upgid].cost)}}
    </button>
  </span>`
}) 
Vue.component('buyable', {
  props: ['buyableid', 'type'],
  data: function () { return {
    buyables, player, console
  }},
  methods: {
    buyBuyable, getBuyableCost
  },
  template: `<span v-if="buyables[buyableid].unlocked()">
    <button :class="{'buyable': true, [type]: true, 'inadequate': player[buyables[buyableid].currency].lt(getBuyableCost(buyableid))}"
  @click="buyBuyable(buyableid)"
  :foobar="{...player}" v-html="buyables[buyableid].display()">
    </button>
  </span>`
}) 
Vue.component('milestone', {
  props: ['mid'],
  data: function () { return {
    milestones, player, console
  }},
  methods: {
    format, hasMilestone
  },
  computed: {
    milestone: function () {
      return milestones[this.mid]
    }
  },
  template: `<div v-if="milestone.unlocked == undefined || milestone.unlocked()" :class="{'milestone': true, 'inadequate': !hasMilestone(mid)}"
  :foobar="{...player}"
  :style="{background: hasMilestone(mid) ? milestone.background || '#fff7' : '#b887'}">
    <h3 v-html="milestone.title"></h3>
    <span v-html="milestone.name"></span>
  </div>`
}) 
var app = new Vue({
  el: "#app",
  data: {
    player,
    upgrades,
    TEMP_VOIDSTART,
    D,
    $,
    buyAutomation,
    getAutomationCost,
    getPointGain,
    format,
    formatWhole,
    getPrestigeGain,
    getClickGain,
    buyMaxAutomation,
    tab: "upgrades",
    subtabs: {
      ascension: "ascension",
      technobabble: "main"
    },
    buyBuyable,
    getBuyableCost,
    buyables,
    getSPGain,
    hasUpgrade,
    getChallengeDisplay,
    inChallenge,
    enterChallenge,
    exitChallenge,
    hasChallenge,
    hasMilestone,
    getAPGain,
    getTrolunlockDisplay,
    getPissedScientists,
    getTechnobabblegain,
    getScientistEffect,
    getNextScientist,
    soups,
    trollingEffect,
    ascend,
    photonTypes
  }
});