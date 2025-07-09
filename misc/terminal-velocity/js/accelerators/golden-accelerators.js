const GoldenAccelerators = {
  cost(x, y=player.goldenAccelerators[x].bought) {
    let bought = y
    if (player.ranks.tier.gte(3)) bought = bought.mul(0.9)
    let cost = new Decimal("1.874e43").mul(Decimal.pow(Decimal.pow(2,x), bought)).pow(new Decimal(1).add(0.5*(x-1)))
    cost = Decimal.pow(10,cost.div("1.874e42").log10().pow(1.3)).mul("1.874e42")
    if (player.ranks.rank.gte(37) && x == 2 && (player.hexachamber.in != 5 || player.ranks.tier.mod(2).eq(0))) cost = cost.pow(0.75)
    if (player.ranks.rank.gte(39) && x > 2 && (player.hexachamber.in != 5 || player.ranks.tier.mod(2).eq(0))) cost = cost.pow(0.6)
    return cost
  },
  buy(x) {
    if (player.speed.gte(this.cost(x))) {
      player.speed = player.speed.sub(this.cost(x))
      player.goldenAccelerators[x].bought = player.goldenAccelerators[x].bought.add(1)
    }
  },
  producePower(x) {
    if (player.hexachamber.in == 1 && x == 1) return new Decimal(0)
    let gain = Decimal.pow(2, player.goldenAccelerators[x].bought).div(2)
    if (player.goldenAccelerators[x].bought.lte(0)) gain = new Decimal(0)
    if (player.ranks.tier.gte(5) && x === 4) gain = gain.mul(Decimal.pow(4,player.ranks.tier))
    if (player.milestones.includes(x + 18)) gain = gain.mul(1000)
    if(MetaPoints.hasUpgrade(8)) gain = gain.mul(MetaPoints.upgrades[8].effect())
    if (player.ranks.rank.gte(69) && (player.hexachamber.in != 5 || player.ranks.tier.mod(2).eq(0))) gain=gain.mul(69)
    if (player.hexachamber.completions[5].gte(1) && x == 2) gain=gain.mul(Hexachamber.reward(6))
    if (player.unlocks.collider) gain=gain.mul(Hexachamber.colliderEffect(1))
    return gain.mul(ParticleAccelerators.speedMult())
  },
  multiplier(x) {
    return player.goldenAccelerators[x].power.add(1).pow(1/5)
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
      total = total.add(player.goldenAccelerators[i].power.root(Decimal.pow(1.15, 7-i)))
    }
    return total.add(1).log(10).add(1).root(8)
  }
}

// modify the code here