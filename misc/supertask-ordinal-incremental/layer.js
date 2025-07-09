class Layer {
  constructor(name,level,currency,buildings,upgrades) {
    this.name = name
    this.level = level
    this.currency = currency
    this.buildings = buildings
    this.upgrades = upgrades
    this.upgradeCount = 0;
  }
  get updesc() {
   return document.getElementById(this.name.toLowerCase()+"upgradedesc") 
  }
  get upcost() {
   return document.getElementById(this.name.toLowerCase()+"upgradecost") 
  }
  get pointsDisplay() {
   return document.getElementById(this.name.toLowerCase()+"currencycount") 
  }
  get incomeDisplay() {
   return document.getElementById(this.name.toLowerCase()+"currencyincome") 
  }
  get upbutt() {
    return document.getElementById(this.name.toLowerCase()+"upgradebutt")
  }
}
var baseupgrades = [
  [1e6, "5<sup>n</sup> -> 4<sup>n</sup>", "exp", 5],
  [1e8, "4<sup>n</sup> -> 3<sup>n</sup>", "exp", 4],
  [1e10, "3<sup>n</sup> -> 2<sup>n</sup>", "exp", 3],
  [1e13, "2<sup>n</sup> -> n<sup>4</sup>", "exp", 2],
  [1e16, "n<sup>4</sup> -> n<sup>3</sup>", "poly", 4],
  [1e20, "n<sup>3</sup> -> n<sup>2</sup>", "poly", 3],
  [1e27, "n<sup>2</sup> -> n", "poly", 2],
  [1e50, "n -> log(n)", "poly", 1],
  [Infinity, "", "const", 1],
];
var omegaupgrades = [
  [1,"Point resets leave ordinal scaling at polynomial.","",0],
  [1,"Reduce omega penalty by 10% (50% -> 40%).","",1],
  [2,"Point resets leave ordinal scaling at quadratic.","",1],
  [3,"Reduce omega penalty by 10% (40% -> 30%).","",2],
  [7,"Reduce omega penalty by 10% (30% -> 20%).","",3],
  [10,"Automatically buy points upgrades and omegas at no cost.","",3],
  [15,"Reduce omega penalty by 10% (20% -> 10%).","",4],
  [40,"Remove omega penalty (10% -> 0%).","",5],
  [300,"Point resets leave ordinal scaling at linear.","",5],
  [5000,"Increase omega bonus by 10% (0% -> 10%).","",6],
  [15000, "Increase omega bonus by 40% (10% -> 50%).","",10],
  [500000,"Omega bonus also applies to omega structures.","",10],
  [1e9,"Omega bonus is multiplicative, not additive.","const",0],
  [Infinity, "", "", 1]
];
var squareupgrades = [
  [Infinity, "", "", 1]
]
let Base = new Layer("Base",1,points,[base1,base2,base3,base4,base5],baseupgrades);
let Omega = new Layer("Omega",2,omegas,[omega1,omega2,omega3],omegaupgrades);
let Square = new Layer("Square",3,squares,[square1],squareupgrades);