const ParticleAccelerators = {
  cost(x) {
    const base = Decimal.pow(3,(x-1) ** 2)
    const mul = Decimal.pow(3, x).pow(player.particleAccelerators[x].bought)
    let price = base.mul(mul)
    return price
  },
  buy(x) {
    if (player.cosmicFragments.gte(this.cost(x))) {
      player.cosmicFragments = player.cosmicFragments.sub(this.cost(x))
      player.particleAccelerators[x].bought = player.particleAccelerators[x].bought.add(1)
    }
  },
  producePower(x) {
    if (player.particleAccelerators[x].bought.lte(0)) return new Decimal(0)
    let gain = Decimal.pow(2, player.particleAccelerators[x].bought).div(2)
    if (SpaceStudies.hasUpgrade(11)) gain = gain.mul(SpaceStudies.upgrades[11].effect())
    return gain
  },
  multiplier(x) {
    return player.particleAccelerators[x].power.add(1).pow(1/2)
  },
  totalSpeed() {
    let multiplier = new Decimal(1)
    for (let i = 1; i <= 6; i++) {
      multiplier = multiplier.mul(this.multiplier(i))
    }
    return multiplier
  },
  totalShards() {
    return this.totalSpeed().log(2).floor()
  },
  nextAt() {
    return this.totalShards().add(1).pow_base(2)
  },
  speedMult() {
    return Decimal.pow(1.25, this.totalShards())
  }
}