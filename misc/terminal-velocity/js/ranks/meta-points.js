const MetaPoints = {
  gainFormula() {
    let gain = player.meta.lap
    if (player.ranks.tier.gte(6)) gain = Decimal.pow(1.25,player.meta.lap)
    if (MetaPoints.hasUpgrade(2)) gain = gain.mul(MetaPoints.upgrades[2].effect())
    if (player.ranks.rank.gte(19) && (player.hexachamber.in != 5 || player.ranks.tier.mod(2).eq(0))) gain = gain.mul(20)
    if (player.ranks.rank.gte(50) && (player.hexachamber.in != 5 || player.ranks.tier.mod(2).eq(1))) gain = gain.mul(50)
    if (SpaceStudies.hasUpgrade(32)) gain = gain.mul(SpaceStudies.upgrades[32].effect())
    if (SpaceStudies.hasUpgrade(71)) gain = gain.mul(SpaceStudies.upgrades[71].effect())
    if (player.hexachamber.completions[1].gte(1)) gain=gain.pow(Hexachamber.reward(2))
    if (gain.gt(1e200)) gain = gain.div(1e200).pow(0.5).mul(1e200)
    if (gain.gt("1e500")) gain = gain.pow(0.2).mul("1e400")
    if (SpaceStudies.hasUpgrade(51)) gain = gain.mul(1e10)
    return gain.floor()
  },
  lapSoftcap() {
    if (player.ranks.tier.gte(12)) return player.meta.lap.mul(10000).cbrt()
    return new Decimal(player.meta.lap).pow(new Decimal(0.99).pow(player.meta.lap.sub(100))).mul(new Decimal(100).pow(new Decimal(1).sub(new Decimal(0.99).pow(player.meta.lap.sub(100)))))
  },
  hyperLapEffect() {
    let hlaps = player.meta.hyperLap
    if (hlaps.gte(25)) hlaps = hlaps.sqrt().mul(5)
    return hlaps.gte(100) ? hlaps.pow(new Decimal(0.99).pow(hlaps.sub(100))).mul(new Decimal(100).pow(new Decimal(1).sub(new Decimal(0.99).pow(hlaps.sub(100))))) : hlaps
  },
  lapEffect() {
    let lap = new Decimal(4)
    if(MetaPoints.hasUpgrade(9)) lap = lap.mul(MetaPoints.upgrades[9].effect())
    if(MetaPoints.hasUpgrade(10)) lap = lap.mul(MetaPoints.upgrades[10].effect())
    return player.meta.lap.gte(100) ? lap.pow(MetaPoints.lapSoftcap()) : lap.pow(player.meta.lap)
  },
  reset() {
    if (player.meta.lap.gt(0)) {
      player.meta.points = player.meta.points.add(MetaPoints.gainFormula())
      rankReset()
    }
  },
  upgrades: {
    1: {
      title: "Meta Unit",
      desc: "Gain more planck lengths based on meta points.",
      cost: new Decimal(20),
      effect() {return player.meta.points.pow(3).add(1)},
      effectDisplay() {return format(this.effect()) + "x PLs"},
    },
    2: {
      title: "Planck Meta",
      desc: "Gain more meta points based on planck lengths.",
      cost: new Decimal(20),
      effect() {return player.speed.add(1).log10().div(10).add(1).pow(player.unlocks.collider?Hexachamber.colliderEffect(3):1)},
      effectDisplay() {return format(this.effect()) + "x meta points"},
    },
    3: {
      title: "Extravagant Ranking",
      desc: `The Rank 2 effect is more effective (3x -> 5x).`,
      cost: new Decimal(300),
    },
    4: {
      title: "Exponential Growth",
      desc: "The Tier 1 effect is more effective (x^0.125 -> x^0.15).",
      cost: new Decimal(300),
    },
    5: {
      title: "Rank Divider",
      desc: "The rank requirement is divided by 1.00e10.",
      cost: new Decimal(1500),
    },
    6: {
      title: "Tier Cheapener",
      desc: "The tier requirement is 1 less.",
      cost: new Decimal(1500),
    },
    7: {
      title: "Meta Acceleration: Normal",
      desc: "Accelerators produce more power based on meta points.",
      cost: new Decimal(5000),
      effect() {return player.meta.points.pow(2.5).add(1).pow(player.meta.ascenderUpgrades.includes(4) ? 0.65 : 1)},
      effectDisplay() {return format(this.effect()) + "x production"},
    },
    8: {
      title: "Meta Acceleration: Golden",
      desc: "Golden Accelerators produce more power based on meta points.",
      cost: new Decimal(10000),
      effect() {return player.meta.points.pow(1.5).add(1).pow(player.meta.ascenderUpgrades.includes(4) ? 0.65 : 1).pow(player.unlocks.collider?Hexachamber.colliderEffect(3):1)},
      effectDisplay() {return format(this.effect()) + "x production"},
    },
    9: {
      title: "Lap Rampage: Normal",
      desc: "Laps are stronger based on accelerators's total power.",
      cost: new Decimal(200000),
      effect() {return Accelerators.totalPowerMeta().pow(player.meta.ascenderUpgrades.includes(5) ? 0.75 : 1)},
      effectDisplay() {return format(this.effect()) + "x lap strength"},
    },
    10: {
      title: "Lap Rampage: Golden",
      desc: "Laps are stronger based on golden accelerators's total power.",
      cost: new Decimal(250000),
      effect() {return GoldenAccelerators.totalPowerMeta().pow(player.meta.ascenderUpgrades.includes(5) ? 0.75 : 1)},
      effectDisplay() {return format(this.effect()) + "x lap strength"},
    },
    11: {
      title: "Lap Deficiency",
      desc: "Laps are shorter based on tiers.",
      cost: new Decimal(2e7),
      effect() {return new Decimal(1.05).pow(player.ranks.tier).pow(-1).pow(player.meta.ascenderUpgrades.includes(6) ? 0.6 : 1)},
      effectDisplay() {return format(this.effect()) + "x lap length"},
    },
    12: {
      title: "Lap Simulator",
      desc: "Unlocks an additional bar to fill.",
      cost: new Decimal(2e7),
      effect() {return new Decimal(0.94).pow(player.meta.hyperLap).pow(player.meta.ascenderUpgrades.includes(6) ? 0.75 : 1)},
      effectDisplay() {return format(this.effect()) + "x lap length"},
    },
  },
  canBuy(x) {
    if (player.hexachamber.in == 3 && player.meta.upgrades.length >= 3) return false
    return (!player.meta.upgrades.includes(2) || x != 1 || player.meta.ascenderUpgrades.includes(1)) && (!player.meta.upgrades.includes(1) || x != 2 || player.meta.ascenderUpgrades.includes(1)) && (!player.meta.upgrades.includes(4) || x != 3 || player.meta.ascenderUpgrades.includes(2)) && (!player.meta.upgrades.includes(3) || x != 4 || player.meta.ascenderUpgrades.includes(2)) && (!player.meta.upgrades.includes(6) || x != 5 || player.meta.ascenderUpgrades.includes(3)) && (!player.meta.upgrades.includes(5) || x != 6 || player.meta.ascenderUpgrades.includes(3)) && (!player.meta.upgrades.includes(8) || x != 7 || player.meta.ascenderUpgrades.includes(4)) && (!player.meta.upgrades.includes(7) || x != 8 || player.meta.ascenderUpgrades.includes(4)) && (!player.meta.upgrades.includes(10) || x != 9 || player.meta.ascenderUpgrades.includes(5)) && (!player.meta.upgrades.includes(9) || x != 10 || player.meta.ascenderUpgrades.includes(5)) && (!player.meta.upgrades.includes(12) || x != 11 || player.meta.ascenderUpgrades.includes(6)) && (!player.meta.upgrades.includes(11) || x != 12 || player.meta.ascenderUpgrades.includes(6))
  },
  buy(x) {
    if (player.meta.points.gte(MetaPoints.upgrades[x].cost) && MetaPoints.canBuy(x) && !MetaPoints.hasUpgrade(x)) {
      player.meta.points = player.meta.points.sub(MetaPoints.upgrades[x].cost)
      player.meta.upgrades.push(x)
    }
  },
  hasUpgrade(x) {
    return player.meta.upgrades.includes(x)
  },
  respec(force=false) {
    if (force || confirm("This will unpurchase the meta point upgrades you've purchased. You will not get your Meta Points back! Are you sure you want to do this?")) {
      rankReset()
      player.meta.upgrades = []
    }
  },
  lapLength() {
    let len = new Decimal(100)
    let hyperEffect = MetaPoints.hyperLapEffect()
    if (MetaPoints.hasUpgrade(11)) len = len.mul(MetaPoints.upgrades[11].effect())
    if (MetaPoints.hasUpgrade(12)) len = len.mul(Decimal.pow(0.94,hyperEffect).pow(player.meta.ascenderUpgrades.includes(6) ? 0.75 : 1))
    if (player.hexachamber.in == 4) len = len.mul(5)
    if (player.hexachamber.completions[2].gte(1)) len=len.div(Hexachamber.reward(3))
    if (len.lte(49)) len = len.sqrt().mul(7)
    if (len.lte(16)) len = len.pow(1/4).mul(8)
    return len.max(1).round()
  },
  hyperLapLength() {
    let len = new Decimal(1000)
    if(player.unlocks.collider) len=Decimal.div(999,Hexachamber.colliderEffect(4)).add(1)
    return len.round()
  },
  ascenderCost() {
    return new Decimal(1e10).mul(Decimal.pow(100000,player.meta.totalAscenders)).pow(player.meta.totalAscenders.gte(3) ? 1.5 : 1)
  },
  buyAscender() {
    if (player.meta.points.gte(MetaPoints.ascenderCost())) {
      player.meta.points = player.meta.points.sub(MetaPoints.ascenderCost())
      player.meta.ascenders = player.meta.ascenders.add(1)
      player.meta.totalAscenders = player.meta.totalAscenders.add(1)
    }
  },
  buyAscenderUpgrade(x) {
    if (player.meta.ascenders.gt(0) && !player.meta.ascenderUpgrades.includes(x)) {
      player.meta.ascenders = player.meta.ascenders.sub(1)
      player.meta.ascenderUpgrades.push(x)
    }
  },
  respecAscenders() {
    if (confirm("This will refund the ascenders you've spent and unpurchase the meta point upgrades you've purchased. This will do a rank reset and you will not get your Meta Points back! Are you sure you want to do this?")) {
      rankReset()
      player.meta.upgrades = []
      player.meta.ascenders = player.meta.totalAscenders
      player.meta.ascenderUpgrades = []
    }
  },
}