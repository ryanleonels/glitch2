function buyUpgrade(layer,id){
  let place = upgradeData[layer]
  if(player[layer].gte(place.cost[id])&&!player.upgrades[layer][id]){
    player[layer]=player[layer].minus(place.cost[id])
    player.upgrades[layer][id]=true
  }else return;
}
function rebuyableCost(layer,id,mul){
  if (!mul) return D(rebuyableData[layer].cost[id]).plus(D(rebuyableData[layer].costScaling[id]).mul(rebuyableAmt(layer,id)))
  return D(rebuyableData[layer].cost[id]).mul(D(rebuyableData[layer].costScaling[id]).pow(rebuyableAmt(layer,id)))
}
function buyRebuyable(layer,id){
  let place = rebuyableData[layer]
  let r = false
  if (layer=="space")r=true
  let cost = rebuyableCost(layer,id,r)
  if(player[layer].gte(cost)){
    player[layer]=player[layer].minus(cost)
    player.rebuyables[layer][id]=player.rebuyables[layer][id].add(1)
  }else return;
}
function hasUpgrade(layer,id){
  return player.upgrades[layer][id]
}
function hasAllUpgrades(layer="none"){
  if(layer=="none")throw Error("not a layer >=(")
  else{
    for(let x=0;x<player.upgrades[layer].length;x++){
      if(!hasUpgrade(layer,x))return false
    }
    return true
  }
}
function hasMilestone(layer,id){
  return player.milestones[layer][id]
}
function rebuyableAmt(layer,id){
  return D(player.rebuyables[layer][id])
}
function inChallenge(layer,id){
  return player.challenges[layer].inChallenge[id]
}
function inAnyChallenge(layer="none"){
  if(layer=="none"){
    for(x=0;x<Object.keys(player.challenges).length;x++){
      let thing = Object.keys(player.challenges)[x]
      thing=player.challenges[thing]
      thing=thing.inChallenge
      for(y=0;y<thing.length;y++){
        if(thing[y]==true)return true
      }
    }
  }
  else{
    let thing = player.challenges[layer]
    thing=thing.inChallenge
    for(y=0;y<thing.length;y++){
      if(thing[y]==true)return true
    }
  }
  return false
}
function inChallenges(layer="none"){
  let challenges = []
  if(layer=="none"){
    for(x=0;x<Object.keys(player.challenges).length;x++){
      let thing = Object.keys(player.challenges)[x]
      thing=player.challenges[thing]
      thing=thing.inChallenge
      for(y=0;y<thing.length;y++){
        if(thing[y]==true)challenges.push({layer:Object.keys(player.challenges)[x],id:y})
      }
    }
  }
  else{
    let thing = player.challenges[layer]
    thing=thing.inChallenge
    for(let y=0;y<thing.length;y++){
      if(thing[y]==true)challenges.push(y)
    }
  }
  return challenges
}
function hasChallenge(layer,id){
  return player.challenges[layer].beatChallenge[id]
}
function hasAllChallenges(layer="none"){
  if(layer=="none")throw Error("You didn't insert a layer name.")
  else{
    for(let x=0;x<player.challenges[layer].inChallenge.length;x++){
      if(!hasChallenge(layer,x))return false;
    }
    return true;
  }
}
function startChallenge(layer,id){
  if(layer=="energy"){
    if(!inAnyChallenge(layer)&&!hasChallenge(layer,id)){
      player.points=D(0)
      player.boosters=D(0)
      player.boostersLost=D(0)
      player.air=D(0)
      player.space=D(0)
      player.upgrades.air=[false,false,false,false,false]
      player.challenges.energy.inChallenge[id]=true
    }
  }
}
function finishChallenge(layer,id){
  if(eval(challengeData[layer].goal[id])){player.challenges[layer].beatChallenge[id]=true;exitChallenge()}
  player.stniop=D(1)
}
function completeMilestones(){
  let layerNames = Object.keys(milestoneData)
  for(x=0;x<layerNames.length;x++){
    let layer = milestoneData[layerNames[x]]
    for(y=0;y<layer.effect.length;y++){
      if(eval(layer.goal[y]))player.milestones[layerNames[x]][y]=true
    }
  }
}