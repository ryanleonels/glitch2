const SpaceStudies = {
  theoremCost(x) {
    switch (x) {
      case 1:
        return Decimal.pow("1e20000",player.space.purchases[x]+1)
      break
      case 2:
        return Decimal.pow(1e300,player.space.purchases[x])
      break
      case 3:
        return Decimal.pow(4,player.space.purchases[x]+1)
      break
    }
  },
  buyTheorem(x) {
    if ((x == 3 ? player.cosmicFragments : (x == 2 ? player.meta.points : player.speed)).gte(SpaceStudies.theoremCost(x))) {
      if (x == 1) player.speed = player.speed.sub(SpaceStudies.theoremCost(x))
      else if (x == 2) player.meta.points = player.meta.points.sub(SpaceStudies.theoremCost(x))
      else player.cosmicFragments = player.cosmicFragments.sub(SpaceStudies.theoremCost(x))
      player.space.theorems = player.space.theorems.add(1)
      player.space.total = player.space.total.add(1)
      player.space.purchases[x]++
    }
  },
  upgrades: {
    11: {
      desc: "Particle Accelerator 1 is boosted based on total time played.",
      cost: new Decimal(1),
      effect() {return new Decimal(player.timePlayed).cbrt().add(1)},
      effectDisplay() {return format(this.effect()) + "x PA1 production"},
      branches: [],
    },
    21: {
      desc: "Accelerator multiplier conversion is slightly better. (^0.33 -> ^0.36)",
      cost: new Decimal(2),
      branches: [11],
    },
    22: {
      desc: "Subtract the Tier requirement by 10.",
      cost: new Decimal(2),
      branches: [11],
    },
    31: {
      desc: "Gain more planck lengths based on total Golden Accelerators bought.",
      cost: new Decimal(4),
      effect() {return Decimal.pow(1.15,player.goldenAccelerators[1].bought.add(player.goldenAccelerators[2].bought).add(player.goldenAccelerators[3].bought).add(player.goldenAccelerators[4].bought).add(player.goldenAccelerators[5].bought).add(player.goldenAccelerators[6].bought))},
      effectDisplay() {return format(this.effect()) + "x PLs"},
      branches: [21],
    },
    32: {
      desc: "Gain more Meta Points based on Ranks.",
      cost: new Decimal(4),
      effect() {return Decimal.pow(2,player.ranks.rank)},
      effectDisplay() {return format(this.effect()) + "x Meta Points"},
      branches: [22],
    },
    33: {
      desc: "Ranks, Tiers, and Prestiges don't reset your planck length amount.",
      cost: new Decimal(3),
      branches: [22],
    },
    41: {
      desc: "Each prestige level multiplies CF gain by 1.5x.",
      cost: new Decimal(6),
      effect() {return Decimal.pow(1.5,player.ranks.prestige)},
      effectDisplay() {return format(this.effect()) + "x Cosmic Fragments"},
      branches: [31],
    },
    42: {
      desc: "Divide the Tier scaling base by 1.1.",
      cost: new Decimal(6),
      branches: [32],
    },
    51: {
      desc: "You gain 1e10x more Meta Points, ignoring softcaps and exponents.",
      cost: new Decimal(3),
      branches: [41,42],
    },
    61: {
      desc: "You gain 10x more Cosmic Fragments.",
      cost: new Decimal(4),
      branches: [51],
    },
    62: {
      desc: "Gain all Collider currencies 10x faster.",
      cost: new Decimal(4),
      branches: [51],
    },
    71: {
      desc: "Meta Points slightly boost their own gain.",
      cost: new Decimal(8),
      effect() {return player.meta.points.pow(0.01).add(1)},
      effectDisplay() {return format(this.effect()) + "x Meta Points"},
      branches: [61,62],
    },
  },
  canBuy(x) {
    return player.space.theorems.gte(SpaceStudies.upgrades[x].cost) && (SpaceStudies.upgrades[x].branches.length == 0 || player.space.studies.includes(SpaceStudies.upgrades[x].branches[0])) && (SpaceStudies.upgrades[x].branches.length <= 1 || player.space.studies.includes(SpaceStudies.upgrades[x].branches[1])) && (SpaceStudies.upgrades[x].branches.length <= 2 || player.space.studies.includes(SpaceStudies.upgrades[x].branches[2]))
  },
  buy(x) {
    if (SpaceStudies.canBuy(x)) {
      player.space.theorems = player.space.theorems.sub(SpaceStudies.upgrades[x].cost)
      player.space.studies.push(x)
    }
  },
  hasUpgrade(x) {
    return player.space.studies.includes(x)
  },
}