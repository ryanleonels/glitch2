class Currency {
  constructor(name,made=0,income=0) {
    this.name = name
    this.made = 0;
    this.income = 0;
  }
  get amount() {
    return this.made;
  }
}

let points = new Currency("points");
Object.defineProperty(points,"amount",{
  get: function() {
    return 10+this.made;
  }
})
let omegas = new Currency("ω");
let squares = new Currency("ω^2");

const allCurrencies = [points,omegas,squares]
