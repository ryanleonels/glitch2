function calcOPOnMarkdown(ord) {
  let coeff = ord.toCoeff()
  let baes1 = coeff[1][1].times(1e11)+coeff[1][0].times(1e10)
  let baseThing = game.ord.reduced.add(game.ord.base).floor()
  let temporaree = new ExpantaNum(0)
  for(let i in coeff[0]) {
    temporaree = temporaree.add(baseThing.pow(i).times(coeff[0][i][0]))
  }
  if (game.upgrades.includes(4)) temporaree=temporaree.pow(1.01)
  return temporaree
}
function markdown() {
  game.op = game.op.add(calcOPOnMarkdown(game.ord))
  game.ord.reduced = new ExpantaNum(0)
}
function buyMarkdownUpg(id) {
  if(game.op.gt(app.$data.upgradeCosts[id]) && !(game.upgrades.includes(id))) {
    game.op = game.op.sub(app.$data.upgradeCosts[id])
    game.upgrades.push(id)
  }
}