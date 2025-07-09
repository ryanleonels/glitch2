const Accelerators = {
  cost(x) {
    let bought = player.accelerators[x].bought
    if (player.ranks.rank.gte(3) && x >= 3 && x <= 6 && (player.hexachamber.in != 5 || player.ranks.tier.mod(2).eq(0))) bought = bought.mul(0.8)
    let cost = (x === 1 ? new Decimal(10) : Decimal.pow(100,x-1)).mul(Decimal.pow(Decimal.pow(2,x), bought))
    if (player.ranks.rank.gte(4) && x >= 4 && x <= 6 && (player.hexachamber.in != 5 || player.ranks.tier.mod(2).eq(1))) cost = cost.mul(Decimal.pow(0.5, player.ranks.rank))
    if(cost.gte(1e12)) cost = Decimal.pow(10,cost.div(1e11).log10().pow(1.1)).mul(1e11)
    return cost
  },
  buy(x) { // hang on couldn't we do something like (demonstration below soon)
    if (player.speed.gte(this.cost(x))) {
      player.speed = player.speed.sub(this.cost(x))
      player.accelerators[x].bought = player.accelerators[x].bought.add(1)
    }
  },
  producePower(x) {
    if (player.hexachamber.in == 1 && x == 1) return new Decimal(0)
    let gain = Decimal.pow(2, player.accelerators[x].bought).div(2)
    if (player.unlocks.crafting) gain=Decimal.pow(Hexachamber.colliderEffect(7).add(2), player.accelerators[x].bought).div(2)
    if (player.ranks.rank.gte(1) && x === 1 && (player.hexachamber.in != 5 || player.ranks.tier.mod(2).eq(0))) gain = gain.mul(3)
    if (player.ranks.rank.gte(6) && x === 3 && (player.hexachamber.in != 5 || player.ranks.tier.mod(2).eq(1))) gain = gain.mul(Decimal.pow(1.5, player.ranks.rank))
    if (player.ranks.rank.gte(5) && x === 5 && (player.hexachamber.in != 5 || player.ranks.tier.mod(2).eq(0))) gain = gain.mul(Decimal.pow(5,player.ranks.tier))
    if (player.milestones.includes(x + 6)) gain = gain.mul(1000)
    if (player.accelerators[x].bought.lte(0)) gain = new Decimal(0)
    if(MetaPoints.hasUpgrade(7)) gain = gain.mul(MetaPoints.upgrades[7].effect())
    if (player.ranks.rank.gte(69) && (player.hexachamber.in != 5 || player.ranks.tier.mod(2).eq(0))) gain=gain.mul(69)
    if (player.unlocks.collider) gain=gain.mul(Hexachamber.colliderEffect(1))
    return gain.mul(GoldenAccelerators.totalMult()).mul(ParticleAccelerators.speedMult())
  },
  multiplier(x) {
    return player.accelerators[x].power.add(1).pow(SpaceStudies.hasUpgrade(21) ? 0.36 : 1/3)
  },
  totalMult() {
    let multiplier = new Decimal(1)
    for (let i = 1; i <= 6; i++) {
      multiplier = multiplier.mul(this.multiplier(i))
    }
    return multiplier
  },
  totalPowerMeta() {
    let total = new Decimal(0)
    for (let i = 1; i < 7; i++) {
      total = total.add(player.accelerators[i].power.root(Decimal.pow(2.15, 7-i)))
    }
    return total.add(1).log(20).add(1).root(8)
  }
}