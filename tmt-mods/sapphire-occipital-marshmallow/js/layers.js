addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
      mult = mult.mul(buyableEffect("p",23))
      mult = mult.mul(layers.b.effect())
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points, and you've found 2/4 easter eggs", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
  buyables: {
    11: {
        cost(x) { 
          let y = new Decimal(1).add(Decimal.mul(9,buyableEffect(this.layer,13)))
          let z = new Decimal(1).add(buyableEffect(this.layer,12))
          return y.pow(x.pow(z)).div(buyableEffect(this.layer,33)).pow(hasMilestone("b",1)?0.5:1) },
      title: "A Tiny Boost (1)",
        display() { return "Multiply point gain by 1.01.\nCurrently: x"+format(this.effect(),4)+"\nCost: "+format(this.cost())+" prestige points\nYou have bought this buyable "+formatWhole(getBuyableAmount(this.layer, this.id))+" times."},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      effect(){
        return Decimal.pow(1.01,getBuyableAmount(this.layer, this.id).add(buyableEffect(this.layer,21)).mul(buyableEffect(this.layer,32)))
      },
      unlocked() {
        return true;
      }
    },
    12: {
        cost(x) { 
          let y = new Decimal(1.5)
          let z = new Decimal(1.25)
          return y.pow(x.pow(z)).div(buyableEffect(this.layer,33)) },
      title: "A Tiny Discount (3)",
        display() { return "Reduce the cost exponent of the first buyable above 1 by 1%.\nCurrently: x"+format(this.effect(),4)+"\nCost: "+format(this.cost())+" prestige points\nYou have bought this buyable "+formatWhole(getBuyableAmount(this.layer, this.id))+" times." },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      effect(){
        return Decimal.pow(0.99,getBuyableAmount(this.layer, this.id).mul(buyableEffect(this.layer,32)))
      },
      unlocked() {
        return true;
      }
    },
    13: {
        cost(x) { 
          let y = new Decimal(1.1)
          let z = new Decimal(1.1)
          return y.pow(z.pow(x)).div(buyableEffect(this.layer,33)) },
      title: "A Small Reduction (10)",
        display() { return "Reduce the cost base of the first buyable above 1 by 1%.\nCurrently: x"+format(this.effect(),4)+"\nCost: "+format(this.cost())+" prestige points\nYou have bought this buyable "+formatWhole(getBuyableAmount(this.layer, this.id))+" times." },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      effect(){
        return Decimal.pow(0.99,getBuyableAmount(this.layer, this.id).mul(buyableEffect(this.layer,32)))
      },
      unlocked() {
        return true;
      }
    },
    21: {
        cost(x) { 
          let y = new Decimal(2).add(getBuyableAmount(this.layer, this.id).div(10))
          let z = new Decimal(1).add(getBuyableAmount(this.layer, this.id).div(100))
          return y.pow(x.pow(z)).div(buyableEffect(this.layer,33)) },
      title: "A Free Level (3)",
        display() { return "Gain a free level of the top left buyable.\nCurrently: +"+formatWhole(this.effect())+"\nCost: "+format(this.cost())+" prestige points\nYou have bought this buyable "+formatWhole(getBuyableAmount(this.layer, this.id))+" times."},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      effect(){
        return getBuyableAmount(this.layer, this.id)
      },
      unlocked() {
        return getBuyableAmount(this.layer, this.id-10).gte(1);
      }
    },
    22: {
        cost(x) { 
          let y = new Decimal(2)
          let z = new Decimal(2)
          return y.pow(x.pow(z)).div(buyableEffect(this.layer,33)) },
      title: "A Bit More (3)",
        display() { return "Multiply point gain by 1.02.\nCurrently: x"+format(this.effect(),4)+"\nCost: "+format(this.cost())+" prestige points\nYou have bought this buyable "+formatWhole(getBuyableAmount(this.layer, this.id))+" times."},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      effect(){
        return Decimal.pow(1.02,getBuyableAmount(this.layer, this.id))
      },
      unlocked() {
        return getBuyableAmount(this.layer, this.id-10).gte(3);
      }
    },
    23: {
        cost(x) { 
          let y = new Decimal(1.01)
          let z = new Decimal(3)
          return y.pow(x.pow(z)).div(buyableEffect(this.layer,33)) },
      title: "A New Boost (8)",
        display() { return "Multiply prestige point gain by 1.1.\nCurrently: x"+format(this.effect(),4)+"\nCost: "+format(this.cost())+" prestige points\nYou have bought this buyable "+formatWhole(getBuyableAmount(this.layer, this.id))+" times."},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      effect(){
        return Decimal.pow(1.1,getBuyableAmount(this.layer, this.id))
      },
      unlocked() {
        return getBuyableAmount(this.layer, this.id-10).gte(10);
      }
    },
    31: {
        cost(x) { 
          let y = new Decimal(1.01)
          let z = new Decimal(2.71828)
          return y.pow(x.pow(z)).div(buyableEffect(this.layer,33)) },
      title: "A Prestige Point (?)",// 10
        display() { return "Prestige points boost points.\nCurrently: x"+format(this.effect(),4)+"\nCost: "+format(this.cost())+" prestige points\nYou have bought this buyable "+formatWhole(getBuyableAmount(this.layer, this.id))+" times."},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      effect(){
        return player.p.points.add(1).pow(new Decimal(1).sub(Decimal.pow(0.99,getBuyableAmount(this.layer, this.id))))
      },
      unlocked() {
        return getBuyableAmount(this.layer, this.id-10).gte(3);
      }
    },
    32: {
        cost(x) { 
          let y = new Decimal(3)
          let z = new Decimal(1.5)
          return y.pow(x.pow(z)).div(buyableEffect(this.layer,33)) },
      title: "A Row Boost (?)",// easter egg 3
        display() { return "Boost the top row slightly.\nCurrently: x"+format(this.effect(),4)+" power\nCost: "+format(this.cost())+" prestige points\nYou have bought this buyable "+formatWhole(getBuyableAmount(this.layer, this.id))+" times."},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      effect(){
        return Decimal.pow(1.01,getBuyableAmount(this.layer, this.id))
      },
      unlocked() {
        return getBuyableAmount(this.layer, this.id-10).gte(3);
      }
    },
    33: {
        cost(x) { 
          let y = new Decimal(1.1)
          let z = new Decimal(1.1)
          return y.pow(x.pow(z)) },
      title: "A Wooden Sword (?)",// 20
        display() { return "Divide all previous buyable costs by 1.01.\nCurrently: /"+format(this.effect(),4)+"\nCost: "+format(this.cost())+" prestige points\nYou have bought this buyable "+formatWhole(getBuyableAmount(this.layer, this.id))+" times."},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      effect(){
        return Decimal.pow(1.01,getBuyableAmount(this.layer, this.id))
      },
      unlocked() {
        return getBuyableAmount(this.layer, this.id-10).gte(8);
      }
    },
    41: {
        cost(x) { 
          let y = new Decimal(4)
          let z = new Decimal(10).tetrate(1e308)
          return y.pow(x.add(1).pow(z))},
      title: "Hidden Doubler",
        display() { return "Double point gain\nCurrently: x"+format(this.effect(),4)+"\nCost: "+format(this.cost())+" prestige points\nYou have bought this buyable "+formatWhole(getBuyableAmount(this.layer, this.id))+" times."},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      effect(){
        return Decimal.pow(2,getBuyableAmount(this.layer, this.id))
      },
      unlocked() {
        return getBuyableAmount(this.layer, this.id-10).gte(10);
      }
    },
    42: {
        cost(x) { 
          let y = new Decimal(4)
          let z = new Decimal(10).tetrate(1e308)
          return y.pow(x.add(1).pow(z))},
      title: "Hidden Doubler",
        display() { return "Double point gain\nCurrently: x"+format(this.effect(),4)+"\nCost: "+format(this.cost())+" prestige points\nYou have bought this buyable "+formatWhole(getBuyableAmount(this.layer, this.id))+" times."},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      effect(){
        return Decimal.pow(2,getBuyableAmount(this.layer, this.id))
      },
      unlocked() {
        return getBuyableAmount(this.layer, this.id-10).gte(3);
      }
    },
    43: {
        cost(x) { 
          let y = new Decimal(4)
          let z = new Decimal(10).tetrate(1e308)
          return y.pow(x.add(1).pow(z))},
      title: "Hidden Doubler",
        display() { return "Double point gain\nCurrently: x"+format(this.effect(),4)+"\nCost: "+format(this.cost())+" prestige points\nYou have bought this buyable "+formatWhole(getBuyableAmount(this.layer, this.id))+" times."},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      effect(){
        return Decimal.pow(2,getBuyableAmount(this.layer, this.id))
      },
      unlocked() {
        return getBuyableAmount(this.layer, this.id-10).gte(20);
      }
    },
}
})
function getTotalBuyables(){
  let amount = new Decimal(0)
  for (let i of Object.keys(layers.p.buyables)){
  if (i > 0 && layers.p.buyables[i].unlocked()){
    amount=amount.add(getBuyableAmount("p",i))
  }
} 
  return amount
}
addLayer("b", {
    name: "Bits", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
    }},
    color: "#00B175",
    branches: ["p"],
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "bits", // Name of prestige currency
    baseResource: "buyables", // Name of resource prestige is based on
    baseAmount() {
      return getTotalBuyables()}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent,
    base: 1.1,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for bits", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    effect(){
      return Decimal.pow(1.1,player.b.points)
    },
    effectDescription(){
      return "multiplying points and prestige points by "+format(this.effect())
    },
    layerShown(){return (getTotalBuyables().gte(50) || player.b.unlocked)},
    milestones: {
      1: {
        requirementDescription: "1 bit",
        effectDescription: "The first buyable's cost is ^0.5",
        done() { return player.b.points.gte(1) }
      }
    }
})