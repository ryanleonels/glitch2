const Hexachamber = {
  centerDisplay(){
    if (player.hexachamber.in==0){
      return "You are not in a chamber.\n\nEntering a chamber forces a tier reset.\n\nCompletions decrease the next chamber's requirement."
    } else {
      return "You are in chamber "+player.hexachamber.in+".\n\nExit a chamber by clicking on it again.\n\nCompletions decrease the next chamber's requirement."
    }
  },
  description(x) {
    switch(x) {
      case 1:
        return "Accelerator 1 and Golden Accelerator 1 are useless.\nGoal: "+format(Hexachamber.goal(x))+" PL\nCompletions: "+formatWhole(player.hexachamber.completions[0])+"\nReward: /"+format(Hexachamber.reward(1))+" Rank Scaling"
      break
      case 2:
        return "Ranks scale much faster.\nGoal: Rank "+format(Hexachamber.goal(x))+"\nCompletions: "+formatWhole(player.hexachamber.completions[1])+"\nReward: ^"+format(Hexachamber.reward(2))+" Meta Points"
      break
      case 3:
        return "Respec meta point upgrades and you can only buy 3 meta upgrades.\nGoal: "+format(Hexachamber.goal(x))+" PL\nCompletions: "+formatWhole(player.hexachamber.completions[2])+"\nReward: /"+format(Hexachamber.reward(3))+" Lap Length"
      break
      case 4:
        return "Laps are much longer.\nGoal: Lap "+format(Hexachamber.goal(x))+"\nCompletions: "+formatWhole(player.hexachamber.completions[3])+"\nReward: *"+format(Hexachamber.reward(4))+" PL"
      break
      case 5:
        return "Force a prestige and rank boosts with the same parity as your tier are disabled.\nGoal: "+format(Hexachamber.goal(x))+" PL\nCompletions: "+formatWhole(player.hexachamber.completions[4])+"\nReward: -"+format(Hexachamber.reward(5))+" Tier Req"
      break
      case 6:
        return "Force a prestige and tiers scale much faster.\nGoal: Tier "+format(Hexachamber.goal(x))+"\nCompletions: "+formatWhole(player.hexachamber.completions[5])+"\nReward: "+format(Hexachamber.reward(6))+"x Golden Accelerator 2 production"
      break
    }
  },
  reward(x){
    switch(x) {
      case 1:
        return player.hexachamber.completions[0].pow(2/3).add(10).log10()
      break
      case 2:
        return player.hexachamber.completions[1].add(1).log10().add(1).log10().add(1)
      break
      case 3:
        return player.hexachamber.completions[2].div(100).add(1)
      break
      case 4:
        return Decimal.pow(player.speed.add(2).log2().mul(Decimal.pow(2,player.hexachamber.completions[3].sqrt())),player.hexachamber.completions[3]).pow(10)
      break
      case 5:
        return player.hexachamber.completions[4]
      break
      case 6:
        return Decimal.pow(1e10, player.hexachamber.completions[5].mul(player.ranks.rank.sqrt()))
      break
    }
  },
  goal(x) {
    let goal;
    let comps = player.hexachamber.completions[x-1]
    if (comps.gte(25)) comps=comps.pow(1.5).div(5)
    switch(x) {
      case 1:
        goal = new Decimal("1e640").mul(Decimal.pow(1e70, comps.pow(new Decimal(1).add(Decimal.div(1, player.hexachamber.completions[5].div(20).add(1))))))
        if (player.unlocks.collider && player.ranks.prestige.mod(2).eq(1)) goal = goal.pow(Hexachamber.colliderEffect(5))
        return goal
      break
      case 2:
        goal = new Decimal(3).add(comps).pow(2).sub(player.hexachamber.completions[0]).round()
        if (player.unlocks.collider && player.ranks.prestige.mod(2).eq(0)) goal = goal.mul(Hexachamber.colliderEffect(5))
        if (player.ranks.tier.gte(25)) goal = goal.div(1.5)
        return goal
      break
      case 3:
        goal = new Decimal("1e1400").mul(Decimal.pow(1e175, comps.pow(2))).div(Decimal.pow(1e175,player.hexachamber.completions[1].pow(1.5)))
        if (player.unlocks.collider && player.ranks.prestige.mod(2).eq(1)) goal = goal.pow(Hexachamber.colliderEffect(5))
        return goal
      break
      case 4:
        goal = new Decimal(40).mul(Decimal.pow(1.2, comps.sqr().sub(player.hexachamber.completions[2].div(Math.PI)))).round()
        if (player.unlocks.collider && player.ranks.prestige.mod(2).eq(0)) goal = goal.mul(Hexachamber.colliderEffect(5))
        if (player.ranks.prestige.gte(2)) goal = goal.div(2)
        return goal
      break
      case 5:
        goal = new Decimal("1e1440").mul(Decimal.pow(Decimal.div(1e100,Decimal.pow(1e10,player.hexachamber.completions[3].sqrt())).add(1), comps.pow(2)))
        if (player.unlocks.collider && player.ranks.prestige.mod(2).eq(1)) goal = goal.pow(Hexachamber.colliderEffect(5))
        return goal
      break
      case 6:
        goal = new Decimal(4).add(comps.pow(1.5)).sub(player.hexachamber.completions[4]).round()
        if (player.unlocks.collider && player.ranks.prestige.mod(2).eq(0)) goal = goal.mul(Hexachamber.colliderEffect(5))
        return goal
      break
    }
  },
  enter(x){
    rankReset()
    player.ranks.rank = new Decimal(0)
    if (player.hexachamber.in == x){
      player.hexachamber.in=0
      return
    }
    player.hexachamber.in=x
    switch(x) {
      case 3:
        MetaPoints.respec(true)
      break
      case 5:
        player.ranks.tier = new Decimal(0)
      break
      case 6:
        player.ranks.tier = new Decimal(0)
      break
    }
  },
  checkCompletion(){
    switch(player.hexachamber.in) {
      case 1:
        if (player.speed.gte(Hexachamber.goal(1))) {
          player.hexachamber.completions[0] = player.hexachamber.completions[0].add(1)
        }
      break
      case 2:
        if (player.ranks.rank.gte(Hexachamber.goal(2))) {
          player.hexachamber.completions[1] = player.hexachamber.completions[1].add(1)
        }
      break
      case 3:
        if (player.speed.gte(Hexachamber.goal(3))) {
          player.hexachamber.completions[2] = player.hexachamber.completions[2].add(1)
        }
      break
      case 4:
        if (player.meta.lap.add(1).gte(Hexachamber.goal(4))) {
          player.hexachamber.completions[3] = player.hexachamber.completions[3].add(1)
        }
      break
      case 5:
        if (player.speed.gte(Hexachamber.goal(5))) {
          player.hexachamber.completions[4] = player.hexachamber.completions[4].add(1)
        }
      break
      case 6:
        if (player.ranks.tier.gte(Hexachamber.goal(6))) {
          player.hexachamber.completions[5] = player.hexachamber.completions[5].add(1)
        }
      break
    }
  },
  resourcePerSec(x) {
    let resource = player.hexachamber.completions[x].gte(6)?Decimal.pow(2.5,player.hexachamber.completions[x].sub(6)):new Decimal(0)
    resource = resource.mul(player.hexachamber.resources[(x+5)%6].pow(0.1).add(1))
    if (player.ranks.tier.lt(19)) resource=resource.div(10)
    if (player.ranks.tier.gte(16)) resource=resource.mul(2)
    resource = resource.mul(ParticleAccelerators.speedMult())
    if (SpaceStudies.hasUpgrade(62)) resource = resource.mul(10)
    return resource
    
  },
  colliderEffect(x){
    let eff;
    switch(x) {
      case 1:
        return player.hexachamber.resources[0].add(1).pow(10) // multiply
      break
      case 2:
        return player.hexachamber.resources[1].add(1).pow(20) // divide
      break
      case 3:
        return player.hexachamber.resources[2].add(1).log10().add(1).sqrt() // exponent
      break
      case 4:
        return player.hexachamber.resources[3].add(6**6).log(6).log(6) // 999/x + 1
      break
      case 5:
        eff = Decimal.pow(0.99,player.hexachamber.resources[4].div(10).add(1).log10().cbrt()) // ^ for odd, * for even
        if (player.unlocks.crafting) eff=eff.pow(Hexachamber.colliderEffect(8))
        return eff
      break
      case 6:
        return player.hexachamber.resources[5].add(1).log10().pow(2) // subtraction
      break
      case 7:
        let crafted = player.hexachamber.crafted[0] // + to regular accelerators per buy
        if (crafted.gte(100)) crafted=crafted.log10().mul(50)
        let laps = player.meta.lap
        if (laps.gte(1.3e4)) laps = laps.div(1.3e3).log10().mul(1.3e4)
        // idk why it inflates but ???
        return crafted.cbrt().mul(laps.div(1e5))
      break
      case 8:
        return player.ranks.rank.div(10).sqrt().mul(player.hexachamber.crafted[1].add(1).log10()).add(2).log2() // ^ to parity point effect
      break
      case 9:
        return player.hexachamber.crafted[2].add(1).log(5).mul(player.meta.totalAscenders.add(10).log10()).add(1).log10().add(1).cbrt() // idk if this scaling is good or not
      break
    }
  },
  craft(x){
    let amt;
    switch(x) {
      case 0:
        amt = Decimal.min(player.hexachamber.resources[0].div(1e6),player.hexachamber.resources[3].div(10)).floor()
        player.hexachamber.resources[0] = player.hexachamber.resources[0].sub(amt.mul(1e6))
        player.hexachamber.resources[3] = player.hexachamber.resources[3].sub(amt.mul(10))
        player.hexachamber.crafted[0] = player.hexachamber.crafted[0].add(amt)
      break
      case 1:
        amt = Decimal.min(player.hexachamber.resources[1],player.hexachamber.resources[4].div(1e5)).floor()
        player.hexachamber.resources[1] = player.hexachamber.resources[1].sub(amt)
        player.hexachamber.resources[4] = player.hexachamber.resources[4].sub(amt.mul(1e5))
        player.hexachamber.crafted[1] = player.hexachamber.crafted[1].add(amt)
      break
      case 2:
        amt = Decimal.min(player.hexachamber.resources[2].div(1000),player.hexachamber.resources[5].div(1000)).floor()
        player.hexachamber.resources[2] = player.hexachamber.resources[2].sub(amt.mul(1000))
        player.hexachamber.resources[5] = player.hexachamber.resources[5].sub(amt.mul(1000))
        player.hexachamber.crafted[2] = player.hexachamber.crafted[2].add(amt)
      break
    }
  }
}