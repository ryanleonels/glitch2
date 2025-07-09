const Decimal = ExpantaNum
addLayer("i", {
    name: "Inflation", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "inflation", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent(){
  if (hasUpgrade("i",21)){
    return player.i.points.plus(2)
  }else return 2
}, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
  passiveGeneration(){return new Decimal(hasUpgrade("i",12)?1:0)},
  upgrades:{
    11: {
      description: "Gain 100% of points per second",
      cost: new Decimal(1),
    },
    12: {
      description: "Gain 100% of inflation per second",
      cost: new Decimal(10),
      unlocked(){return hasUpgrade("i",11)}
    },
    13: {
      description: "Inflation multiplies points",
      cost: new Decimal("1e10"),
      unlocked(){return hasUpgrade("i",12)}
    },
    21: {
      description: "Points add to inflation gain exponent",
      cost: new Decimal("ee10"),
      unlocked(){return hasUpgrade("i",13)}
    },
    22: {
      description: "Tetrate points to the 10",
      cost: new Decimal("10^^100"),
      unlocked(){return hasUpgrade("i",21)}
    },
    23: {
      description: "Tetrate points to the number of seconds played",
      cost: new Decimal("10^^1000"),
      unlocked(){return hasUpgrade("i",22)}
    },
    31: {
      description: "Tetrate points to slog of itself",
      cost: new Decimal("10^^5000"),
      unlocked(){return hasUpgrade("i",23)}
    },
    32: {
      description: "Tetrate points to slog of itself",
      cost: new Decimal("10^^1e15"),
      unlocked(){return hasUpgrade("i",31)}
    },
    33: {
      description: "Inflate",
      cost: new Decimal("10^^1e50"),
      unlocked(){return hasUpgrade("i",32)}
    },
    41: {
      description: "Tetrate point gain to itself",
      cost: new Decimal("10^^1e308"),
      unlocked(){return hasUpgrade("i",33)}
    },
  },
})
