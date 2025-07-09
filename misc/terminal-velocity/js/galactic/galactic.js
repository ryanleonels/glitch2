const Galactic = {
  gainFormula() {
    if (player.meta.points.lt("1e600"))return new Decimal(0)
    let gain = Decimal.pow(1000,player.meta.points.add(1).log10().div(600).sub(1)).floor()
    if (SpaceStudies.hasUpgrade(41)) gain = gain.mul(SpaceStudies.upgrades[41].effect())
    if (SpaceStudies.hasUpgrade(61)) gain = gain.mul(10)
    return gain
  },
  nextAt() {
    return Decimal.pow(10,Galactic.gainFormula().add(1).log(1000).add(1).mul(600)).sub(1)
  },
  prestige(force=false) {
    if (player.meta.points.gte("1e600") || force) {
      player.cosmicFragments = player.cosmicFragments.add(Galactic.gainFormula())
      player.galactics = player.galactics.add(1)
      player.ranks = {
        rank: new Decimal(0),
        tier: new Decimal(0),
        prestige: new Decimal(0)
      }
      player.perkPoints = new Decimal(0)
      player.milestones = []
      player.autobuyers = [false,false,false,false,false,false]
      player.goldenAutobuyers = [false,false,false,false,false,false]
      player.bestRank = new Decimal(0)
      player.bestTier = new Decimal(0)
      player.bestPrestige = new Decimal(0)
      player.meta = {
        purchases: new Decimal(0),
        points: new Decimal(0),
        lap: new Decimal(0),
        upgrades: [],
        hyperPurchases: new Decimal(0),
        hyperLap: new Decimal(0),
        ascenders: new Decimal(0),
        totalAscenders: new Decimal(0),
        ascenderUpgrades: [],
      }
      player.hexachamber = {
        completions: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
        in: 0,
        resources: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
        crafted: [new Decimal(0),new Decimal(0),new Decimal(0)],
      }
      rankReset()
    }
  },
}