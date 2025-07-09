function rankReq(r=player.ranks.rank){
  let reqBase = new Decimal(1e14)
  if (player.ranks.tier.gte(3)) reqBase = reqBase.div(1e4)
  if (r.gte(26) && (player.hexachamber.in != 5 || player.ranks.tier.mod(2).eq(1))) reqBase=reqBase.div(player.meta.points.add(1).pow(3.5))
  if (player.unlocks.collider) reqBase = reqBase.div(Hexachamber.colliderEffect(2))
  let reqScale = new Decimal(10)
  if (player.ranks.tier.gte(2)) reqScale=reqScale.sub(2.5)
  if (player.ranks.tier.gte(4)) reqScale=reqScale.sub(0.5)
  if (player.ranks.prestige.gte(3)) reqScale=reqScale.sub(1)
  if (player.ranks.prestige.gte(4)) reqScale=reqScale.sub(1)
  let scaleMultiplier = new Decimal(1)
  if (r.gte(10) && (player.hexachamber.in != 5 || player.ranks.tier.mod(2).eq(1))) scaleMultiplier = scaleMultiplier.sub(player.ranks.tier.min(10).mul(0.02))
  if (player.hexachamber.completions[0].gte(1)) scaleMultiplier = scaleMultiplier.div(Hexachamber.reward(1))
  if (player.hexachamber.in == 2) scaleMultiplier = scaleMultiplier.mul(3)
  let scaleExp = new Decimal(2)
  if (player.hexachamber.in == 2) scaleExp = new Decimal(2.5)
  if (player.ranks.tier.gte(18)) scaleExp = scaleExp.sub(0.01)
  return reqBase.mul(Decimal.pow(reqScale, r.mul(scaleMultiplier).pow(scaleExp))).div(MetaPoints.hasUpgrade(5) ? 1e10 : 1)
}
function tierReq(){
  let reqBase = new Decimal(5)
  if (player.hexachamber.completions[4].gte(1)) reqBase=reqBase.sub(Hexachamber.reward(5))
  if (player.unlocks.collider) reqBase = reqBase.sub(Hexachamber.colliderEffect(6))
  if (SpaceStudies.hasUpgrade(42)) reqBase = reqBase.sub(0.1)
  let reqScale = new Decimal(1)
  let scaleMultiplier = new Decimal(1)
  if (player.hexachamber.in == 6) scaleMultiplier = scaleMultiplier.mul(2)
  if (player.ranks.rank.gte(96) && (player.hexachamber.in != 5 || player.ranks.tier.mod(2).eq(1))) scaleMultiplier = scaleMultiplier.mul(0.9)
  if (player.unlocks.crafting) scaleMultiplier = scaleMultiplier.mul(1)
  let scaleExp = new Decimal(2)
  if (player.hexachamber.in == 6) scaleExp = new Decimal(2.5)
  let final = reqBase.add(Decimal.mul(reqScale, player.ranks.tier.mul(scaleMultiplier).pow(scaleExp))).sub(MetaPoints.hasUpgrade(6) ? 1 : 0).sub(player.ranks.tier.gte(24) ? 5 : 0).sub(SpaceStudies.hasUpgrade(22) ? 10 : 0)
  if (player.unlocks.crafting)final = final.div(Hexachamber.colliderEffect(9))
  return final.round()
}
function prestigeReq(){
  let reqBase = new Decimal(12)
  let reqScale = new Decimal(3)
  let scaleMultiplier = new Decimal(1)
  let scaleExp = new Decimal(1.5)
  return reqBase.add(Decimal.mul(reqScale, player.ranks.prestige.mul(scaleMultiplier).pow(scaleExp))).ceil()
}
function rankReset() {
  if (!SpaceStudies.hasUpgrade(33)) player.speed = new Decimal(0);
  player.accelerators = {
    1: {bought: new Decimal(0), power: new Decimal(0)},
    2: {bought: new Decimal(0), power: new Decimal(0)},
    3: {bought: new Decimal(0), power: new Decimal(0)},
    4: {bought: new Decimal(0), power: new Decimal(0)},
    5: {bought: new Decimal(0), power: new Decimal(0)},
    6: {bought: new Decimal(0), power: new Decimal(0)},
  }
  player.goldenAccelerators = {
    1: {bought: new Decimal(0), power: new Decimal(0)},
    2: {bought: new Decimal(0), power: new Decimal(0)},
    3: {bought: new Decimal(0), power: new Decimal(0)},
    4: {bought: new Decimal(0), power: new Decimal(0)},
    5: {bought: new Decimal(0), power: new Decimal(0)},
    6: {bought: new Decimal(0), power: new Decimal(0)},
  }
 }
function rankUp() {
  if (player.speed.gte(rankReq())) {
    rankReset()
    player.ranks.rank=player.ranks.rank.add(1)
    if (player.ranks.rank.gt(player.bestRank)) {
      player.bestRank = player.ranks.rank;
      player.perkPoints = player.perkPoints.add(1);
    }
  }
}
function tierUp() {
  if (player.ranks.rank.gte(tierReq())) {
    rankReset()
    player.ranks.rank = new Decimal(0)
    player.ranks.tier=player.ranks.tier.add(1)
    if (player.ranks.tier.gt(player.bestTier)) {
      player.bestTier = player.ranks.tier;
      player.perkPoints = player.perkPoints.add(2);
    }
  }
}
function prestige() {
  if (player.ranks.tier.gte(prestigeReq())) {
    rankReset()
    player.ranks.rank = new Decimal(0)
    player.ranks.tier = new Decimal(0)
    player.ranks.prestige=player.ranks.prestige.add(1)
    if (player.ranks.prestige.gt(player.bestPrestige)) {
      player.bestPrestige = player.ranks.prestige;
      player.perkPoints = player.perkPoints.add(100);
    }
  }
}
function unprestige(){
  if (player.ranks.prestige.gt(0)){
    player.ranks.prestige=player.ranks.prestige.sub(1)
    if (player.hexachamber.in!=0&&!player.achievements.includes(17)) player.achievements.push(17)
  }
  
}
function rankBoostDisplay(){
  let boosts = []
  if (player.ranks.rank.gte(1))boosts.push("Rank 1: Triple accelerator 1 power generation")
  if (player.ranks.rank.gte(2))boosts.push("Rank 2: Per rank gain " + (MetaPoints.hasUpgrade(3)?5:3) + "x extra planck lengths (x" + format(Decimal.pow(MetaPoints.hasUpgrade(3)?5:3,player.ranks.rank)) + ")")
  if (player.ranks.rank.gte(3))boosts.push("Rank 3: The last 4 Accelerators scale 20% slower")
  if (player.ranks.rank.gte(4))boosts.push("Rank 4: Per rank multiply Accelerator 4-6 base cost by 0.5 (x"+formatSmall(Decimal.pow(0.5, player.ranks.rank))+")")
  if (player.ranks.rank.gte(5))boosts.push("Rank 5: Accelerator 5 produces 5x as much power per tier (x"+formatSmall(Decimal.pow(5, player.ranks.tier))+")")
  if (player.ranks.rank.gte(6))boosts.push("Rank 6: Per rank make Accelerator 3 50% stronger (+"+formatSmall(Decimal.pow(1.5, player.ranks.rank).sub(1).mul(100))+"%)")
  if (player.ranks.rank.gte(8))boosts.push("Rank 8: Double planck length gain per (tier^2)")
  if (player.ranks.rank.gte(10))boosts.push("Rank 10: Rank scaling is 2% slower per tier up to 10 (" + formatWhole(player.ranks.tier.min(10).mul(2)) + "%)")
  if (player.ranks.rank.gte(19))boosts.push("Rank 19: Multiply meta point gain by 20")
  if (player.ranks.rank.gte(26))boosts.push("Rank 26: Meta points divide the rank requirement (/"+format(player.meta.points.add(1).pow(3.5))+")")
  if (player.ranks.rank.gte(29))boosts.push("Rank 29: Gain 1.1x more planck lengths" + (player.ranks.rank.gte(30) ? ` (x${format(player.ranks.rank.mul(player.ranks.tier).pow_base(1.1))})` : ""))
  if (player.ranks.rank.gte(30))boosts.push("Rank 30: Rank 29's effect is raised by rank * tier (^" + format(player.ranks.rank.mul(player.ranks.tier)) + ")")
  if (player.ranks.rank.gte(37))boosts.push("Rank 37: Golden Accelerator 2 cost is raised ^0.75")
  if (player.ranks.rank.gte(39))boosts.push("Rank 39: The last 4 Golden Accelerator costs are raised ^0.6")
  if (player.ranks.rank.gte(50))boosts.push("Rank 50: Gain 50x meta points")
  if (player.ranks.rank.gte(69))boosts.push("Rank 69: Multiply all accelerator and golden accelerator production by 69")
  if (player.ranks.rank.gte(96))boosts.push("Rank 96: Tier scaling is slightly weaker")
  return boosts.join("\n")
}
function tierBoostDisplay(){
  let boosts = []
  if (player.ranks.tier.gte(1))boosts.push("Tier 1: Planck lengths boost their own gain (x"+format(player.speed.pow(MetaPoints.hasUpgrade(4)?0.15:0.125).add(1))+")")
  if (player.ranks.tier.gte(2))boosts.push("Tier 2: Reduce rank scaling base by 2.5")
  if (player.ranks.tier.gte(3))boosts.push("Tier 3: Golden Accelerators scale 10% slower and ranks are 10,000x cheaper")
  if (player.ranks.tier.gte(4))boosts.push("Tier 4: Reduce rank scaling base by 0.5")
  if (player.ranks.tier.gte(5))boosts.push("Tier 5: Golden Accelerator 4 produces 4x more power per tier (x"+format(Decimal.pow(4,player.ranks.tier))+")")
  if (player.ranks.tier.gte(6))boosts.push("Tier 6: Change base meta point gain formula (laps -> 1.25^laps)")
  if (player.ranks.tier.gte(7))boosts.push("Tier 7: Unlock Ascenders")
  if (player.ranks.tier.gte(8))boosts.push("Tier 8: Ranks are automated, and unlock the Hexachamber")
  if (player.ranks.tier.gte(10))boosts.push("Tier 10: Buy max ranks")
  if (player.ranks.tier.gte(12))boosts.push("Tier 12: The lap effect softcap formula changes (^(0.99^lap-100) => x10,000, ^0.33)")
  if (player.ranks.tier.gte(16))boosts.push("Tier 16: Gain 2x of all collider resources")
  if (player.ranks.tier.gte(18))boosts.push("Tier 18: Rank scaling exponent is now 1.99")
  if (player.ranks.tier.gte(19))boosts.push("Tier 19: Gain 10x all collider resources")
  if (player.ranks.tier.gte(24))boosts.push("Tier 24: Multiply PL by 24^total ascenders, and decrease the tier requirement by 5 (x"+format(Decimal.pow(24,player.meta.totalAscenders))+")")
  if (player.ranks.tier.gte(25))boosts.push("Tier 25: The Chamber 2 goal is divided by 1.5")
  return boosts.join("\n")
}
function prestigeBoostDisplay(){
  let boosts = []
  if (player.ranks.prestige.gte(1))boosts.push("Prestige 1: Unlock The Collider™️")
  if (player.ranks.prestige.gte(2))boosts.push("Prestige 2: The Chamber 4 goal is halved")
  if (player.ranks.prestige.gte(3))boosts.push("Prestige 3: Rank scaling base is decreased by 1")
  if (player.ranks.prestige.gte(4))boosts.push("Prestige 4: Rank scaling base is decreased by 1")
  return boosts.join("\n")
}