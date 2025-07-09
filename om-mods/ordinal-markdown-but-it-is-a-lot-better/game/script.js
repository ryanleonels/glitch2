"use strict"

const get = x => document.getElementById(x)
let game 
let app
const milestoneReqs = [() => game.ord.level >= 10, () => game.ord.level >= 12, () => game.ord.level >= 13, () => game.ord.level >= 22]
let e = new Ordinal(27,3,0,true)
let maxAutoLoop = 0
game = newGame()
app = newVue() // no data yet
app.$data.tab = 1
load(JSON.parse(localStorage.getItem("ordinalMarkdownSave")))

window.setInterval(function() {
  let now=Date.now()
  loop(now-game.lastTick)
  game.lastTick=now
}, 50)

window.setInterval(function() {
  save()
}, 10000)
document.fgColor="ffffff"
document.bgColor="000000"
document.body.style.fontFamily="helvetica"
document.body.style.marginTop="32px"
document.body.style.marginLeft="32px"
function loop(ms) {
  let levelMax = levelToRed(game.ord.level,game.ord.base)
  app.$data.ordinal = `H<sub style='margin-right: 10px'>${game.ord.toString()}</sub>(${game.ord.reduced.add(game.ord.base).min(levelMax).floor().beautify()}) = ${levelMax.beautify()}`
  app.$data.op = game.op.toString()
  app.$data.milestones = game.milestones
  app.$data.autos = game.autos
  app.$data.opGain = calcOPOnMarkdown(game.ord).toString()
  app.$data.upgrades = game.upgrades
  if(game.op.gte(1)) app.$data.unlockedMarkdown = true
  if (game.ord.reduced.add(game.ord.base).gte(levelMax)) {
    let nextLevel = game.ord.level+1
    game.upgrades = [
    ]
    game.op = new ExpantaNum(0)
    if (nextLevel!=27){game.ord = newOrd(nextLevel,3,0,nextLevel % game.ord.base == 0)} else{game.ord=e}
  }
  if (game.milestones.includes("3")){game.op=game.op.plus(calcOPOnMarkdown(game.ord).times(ms/1000))}
  if (game.milestones.includes("0") && !game.autos[0]) {
    game.ord = game.ord.reduce(ms/1000 * (
      (game.milestones.includes("1")) ? 2**(game.ord.level-10) : 1
    ) * (
      (game.upgrades.includes(0)) ? 10 : 1
    ) * (
      (game.upgrades.includes(1)) ? game.op.log10() : 1
    ) * (
      (game.upgrades.includes(2)) ? game.op : 1
    ),0)
  }
  if (game.upgrades.includes(3)){
    game.ord.reduced=game.ord.reduced.plus(EN(ms/1000).times (
      (game.milestones.includes("1")) ? 2**(game.ord.level-10) : 1
    ).times (
      (game.upgrades.includes(0)) ? 10 : 1
    ).times (
      (game.upgrades.includes(1)) ? game.op.log10() : 1
    ).times (
      (game.upgrades.includes(2)) ? game.op : 1
    ))
  }
  if (game.upgrades.includes(0) && !game.autos[1]) {
    maxAutoLoop+=ms
    if((game.upgrades.includes(2)?true:maxAutoLoop>=1000)) {
      if(!(game.upgrades.includes(2)))maxAutoLoop-=1000
      game.ord = game.ord.reduce(0,1)
    }
  }
  for(const i in milestoneReqs) {
    if(milestoneReqs[i]() && !game.milestones.includes(i)) {
      game.milestones.push(i)
      const hms = [10,12,13,22]
      notify("M"+hms[i]+" achieved!")
    }
  }
}

