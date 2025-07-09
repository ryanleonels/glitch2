function inAnyChallenge(layer){
  for (let i of Object.keys(player[layer].challenges)){
    if (inChallenge(layer, i))return true
  }
  return false
}
function T(x){
  return Decimal.mul(x,x.add(1).div(2))
}
function alephEffect(x){
    if (x==1)return inChallenge("c",11)?player.c.alephs[0].add(1).mul(5).pow(player.c.alephs[0].min(1e3)).max(10).log10():player.c.alephs[0].add(1).mul(5).pow(player.c.alephs[0].min(1e3))
    if (x==2)return inChallenge("c",11)?player.c.alephs[1].add(1).pow(player.c.alephs[1].add(1).pow(1.5)).max(10).log10():player.c.alephs[1].add(1).pow(player.c.alephs[1].add(1).pow(1.5))
    if (x==3)return player.c.alephs[2].add(1).pow(1.5)
    if (x==4)return player.c.alephs[3].add(1).log10().add(1).pow(4).max(2)
    if (x==5)return player.c.alephs[4].add(1).log10().add(1).sqr().pow(hasSL(5)?layers.h.overchargeEffect2():1).add(0.5)
    if (x==6)return player.c.alephs[5].mul(2).add(1).sqr().pow(hasSL(5)?layers.h.overchargeEffect2():1)
    if (x==7)return player.c.alephs[6].mul(2).add(1).sqr().pow(hasSL(5)?layers.h.overchargeEffect2():1)
    if (x==8)return player.c.alephs[7].add(1).log2().add(1).pow(hasSL(5)?layers.h.overchargeEffect2():1)
  if (x==9) return player.c.aleph9.add(1).pow(0.05)
  }

function getIncrementyGain(){
  let gain=new Decimal(1)
  gain=gain.mul(player.b.psi.max(1))
  gain=gain.mul(buyableEffect("b",11))
  if(hasUpgrade("h",121)){gain=gain.mul(getTotalCompletions())}
  else if (hasUpgrade("b",31)){
    let c=0
  for(let i in layers.b.challenges){
    if (i>14)
    c+=player.b.challenges[i]
  }
    gain=gain.mul(Math.max(c,1))
  }
  
  if (hasUpgrade("b",63))gain=gain.mul(upgradeEffect("b",63))
  gain=gain.mul(Decimal.pow(2,player.b.challenges[41]))
  if (player.g.base.gte(7))gain=gain.mul(layers.h.slowEffect())
  if (hasUpgrade("b",41))gain=gain.mul(player.g.base.sub(5).pow(hasUpgrade("h",131)?7:4))
  if (player.b.challenges[22]>=3)gain=gain.mul(10)
  if(player.c.unlocked)gain=gain.mul(alephEffect(4))
  if (hasUpgrade("c",21))gain=gain.pow(hasUpgrade("c",111)?1.03:1.01)
  if (inChallenge("c",11))gain=gain.pow(buyableEffect("gwa",23))
  return gain.pow(player.c.singularityEnabled?tmp.c.singularityEffects[1]:1)
}
function getPsiGain(){
  let gain = new Decimal(1)
  if (hasUpgrade("b",61))gain=gain.mul(upgradeEffect("b",61))
  if (hasUpgrade("b",62))gain=gain.mul(upgradeEffect("b",62))
  gain=gain.mul(buyableEffect("b",12))
  if(player.c.unlocked)gain=gain.mul(alephEffect(5))
  if (hasUpgrade("c",11)) gain=gain.mul(hasUpgrade("c",101)?layers.b.getBoosters():getBuyableAmount("b",14).max(1))
  gain=gain.mul(buyableEffect("c",11))
  if (inChallenge("c",11))gain=gain.pow(buyableEffect("gwa",23))
  if (hasMilestone("c",4) && player.b.psi.lt(BHO*3.40e29) && gain.lt(BHO*3.40e33)) gain=gain.mul(1e4)
  return gain.pow(player.c.singularityEnabled?tmp.c.singularityEffects[1]:1)
}

function getTotalCompletions(){
  let c=0
  for(let i in layers.b.challenges){
    if (i>0)
    c+=player.b.challenges[i]
  }
  return c
}
function boost(){
  if (hasMilestone("g",6))return
  player.g.upgrades=[]
    player.g.points=new Decimal(0)
    setBuyableAmount("g", 12, new Decimal(hasMilestone("g",0)?1:0))
    player.g.dynamic=new Decimal(1)
  player.points=new Decimal(0)
}
