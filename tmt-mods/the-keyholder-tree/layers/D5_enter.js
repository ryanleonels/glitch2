addLayer("x", { 
  name: "x",
  startData() {return {
      unlocked: false,
      points: new Decimal(0)
  }},
  color: "#fff", 
  row: x,
  layerShown() {return hasUpgrade('m',34) || player[this.layer].points.gte(1)},
  resource: "x keys",
  hotkeys: [{key: "x",description: "x: reset your keys for x keys",
          onPress() {if (player.x.unlocked() && canReset("x")) doReset("x")}}],
  symbol: "x",
  position: x,
  type: "static",
  baseResource: "x", 
  baseAmount() {return x},
  requires() {return new Decimal("6.9e420")}, // past 1.79e308 you have to put it in quotes because you know why
  exponent() {return new Decimal(1.42069)},
  base() {return new Decimal(1.69)},
  unlocked() {return true} // lets focus on the keyboard first, if not then ok
  })