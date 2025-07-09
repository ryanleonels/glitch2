Vue.component("credits",{
  props: [],
  template: `<div>Contributors:<br>__________________________________________________<br><br>gapples2 - ideas and most of the code<br>unpingabot - saving and loading<br>TheMKeyHolder - making code better, achs system, and offline progress<br>unp©gged™ - Some HTML and CSS <br>MEME - Making some of the upgrades and buyables<br>Semenar - various fixes<br>Jayman - Some grammatical and visual changes/alot of achievement work<br>Emi - Some Achievement Work<br>Cubedey- Style creation and some achievement work</div>`
})
Vue.component("upgrade",{
  props: ["layer","upgid"],
  template: `
  <td>
  <button style="width:200px;height:150px" :class="{upgradeBought:player.upgrades[layer][upgid]==true, upgradeCanBuy:player[layer].gte(upgradeData[layer].cost[upgid]), upgradeCantBuy:player[layer].lt(upgradeData[layer].cost[upgid])}" @click="buyUpgrade(layer,upgid)">
    UP{{+upgid+1}}<br>
    {{upgradeData[layer].effect[upgid]}}<br>
    Cost: {{upgradeData[layer].cost[upgid].toFixed(2)}} {{layer}}
  </button>
  </td>
  `
})
Vue.component("milestone",{
  props: ["layer","upgid"],
  template: `
  <td>
  <p style="width:350px;height:125px;background-color:var(--color);color:var(--background);border-radius:50px;" :class="{upgradeCanBuy:player.milestones[layer][upgid]==true,upgradeCantBuy:player.milestones[layer][upgid]==false}">
  <br>
    <b>{{layer.charAt(0).toUpperCase()+layer.slice(1)}} Milestone {{+upgid+1}}</b><br><br>
    {{milestoneData[layer].effect[upgid]}}<br><br>
    Requirement: {{milestoneData[layer].displayGoal[upgid]}}
  </p>
  </td>
  `
})
Vue.component("achievement", {
  props: ["achid"],
  template: `
    <div :style="{gridRow:achid[0], gridColumn:achid[1], backgroundImage:achievementData[achid].bgPictureURL}" style="background-position: center; background-repeat:no-repeat; background-size:100% 100%;">
          <h3 style="margin: 0px">{{getData(achievementData[achid].name)}}</h3>
          <p style="margin: 0px" class="achTooltip">
          {{getData(achievementData[achid].description)}}
          <span v-if="achievementData[achid].reward !== undefined" style="font-style: italic"><br>Reward: {{achievementData[achid].reward}}</span>
          <span v-if="achievementData[achid].rewardDisplay !== undefined" style="font-style: italic"><br>Currently: {{achievementData[achid].rewardDisplay()}}</span>
          </p> 
    </div>
  ` // nice it pogging works
});
Vue.component("challenge",{
  props: ["layer","upgid"],
  template: `
  <td>
  <button style="width:300px;height:300px" :class="{upgradeBought:hasChallenge(layer,upgid)==true,upgradeCanBuy:eval(challengeData[layer].goal[upgid])&&!hasChallenge(layer,upgid)&&inChallenge(layer,upgid),upgradeCantBuy:!hasChallenge(layer,upgid)&&!inChallenge(layer,upgid),incChallenge:!eval(challengeData[layer].goal[upgid])&&player.challenges[layer].inChallenge[upgid]}" @click="if(inChallenge(layer,upgid)){finishChallenge(layer,upgid)};startChallenge(layer,upgid)">
    {{layer.charAt(0).toUpperCase()+layer.slice(1)}} Challenge {{+upgid+1}}<br><br>
    While you're in this challenge {{challengeData[layer].nerfs[upgid]}}<br><br>
    Reward: {{challengeData[layer].effect[upgid]}}<br><br>
    Goal: {{challengeData[layer].displayGoal[upgid]}}
  </button>
  </td>
  `
})
Vue.component("exitchallengebtn",{
  props: ["layer"],
  template: `
<button style="height:200px;width:200px;" @click="exitchallbtn()" v-if="inAnyChallenge('layer')></button>
  `
})
Vue.component("changelog-alpha",{
  props: ["ver"],
  template: `
  <div class="normalDiv" :class="{white:ver!=player.version.toString(), gray:ver==player.version.toString()}">
  <b>v{{ ver }}<br>{{ changelogData.alpha[ver].content }}<br>Expected End-game: {{ changelogData.alpha[ver].currentEndGame }}</b>
  </div>
  `
})
Vue.component("progress-bar",{
  props: ["color", "percentage"],
  template: `
  <div class="progress-bar" :style="{width: (100 + 10*getData(pbGetters[percentage])) + 'px'}">
    <div class="progress-bar-value progress-bar-fill" :class="{red:getData(pbGetters[color])=='red', orange:getData(pbGetters[color])=='orange', green:getData(pbGetters[color])=='green'}">{{ getData(pbGetters[percentage]) }}%</div>
  </div>
  `
})
