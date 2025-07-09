addLayer("l31", {
    name: "hyper prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "HP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
    }},
  branches: ["l21"],
  effectDescription(){return "Boosting super prestige gain by x"+format(this.effect())},
  effect(){
    return player.l31.points.add(2).pow(0.75)},
    color: "#927581",
    requires: new Decimal("e3500"), // Can be a function that takes requirement increases into account
    resource: "hyper prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1e-3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "h", description: "H: Reset for hyper prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("l11",31)||player[this.layer].unlocked},
milestones: {
    1: {
        requirementDescription: "1 hyper prestige",
        effectDescription: "Keep all super prestige content",
        done() { return player.l31.points.gte(1) }
    },
},
})