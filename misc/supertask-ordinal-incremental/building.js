class Building {
  constructor(name,basePrice,basePriceCurr,baseProd,baseProdAmt,baseScaling,HTMLPrefix,bought=0, made=0){
    this.name = name
    this.basePrice = basePrice;
    this.basePriceCurr = basePriceCurr;
    this.baseProd = baseProd;
    this.baseProdAmt = baseProdAmt;
    this.baseScaling = baseScaling;
    this.HTMLPrefix = HTMLPrefix;
    this.bought = bought;
    this.made = made;
    this.prodMult = 1;
  }
  update(name,basePrice,basePriceCurr,baseProd,baseProdAmt,baseScaling,HTMLPrefix,bought=0, made=0) {
    this.name = name
    this.basePrice = basePrice;
    this.basePriceCurr = basePriceCurr;
    this.baseProd = baseProd;
    this.baseProdAmt = baseProdAmt;
    this.baseScaling = baseScaling;
    this.HTMLPrefix = HTMLPrefix;
    this.bought = bought;
    this.made = made;
  }
  get button() {
    return document.getElementById(this.HTMLPrefix);
  }
  get costDisplay() {
    return document.getElementById(this.HTMLPrefix+"cost");
  }
  get amountDisplay() {
    return document.getElementById(this.HTMLPrefix+"num");
  }
  get cost() {
    return Math.floor(this.basePrice*Math.pow(this.baseScaling, this.bought));
  }
  get production() {
    return this.baseProdAmt * Math.floor(this.amount) * this.prodMult;
  }
  get amount() {
    return this.bought + this.made;
  }
  toJSON(key){
    let produces = "";
    if(Array.isArray(this.baseProd)){
      produces = [];
      this.baseProd.forEach((item) => {produces.push(item.name)});
    } else {
      produces = this.baseProd.name;
    }
    return {
      name:this.name,
      basePrice:this.basePrice,
      basePriceCurr:this.basePriceCurr.name,
      baseProd:produces,
      baseProdAmt:this.baseProdAmt,
      baseScaling:this.baseScaling,
      HTMLPrefix:this.HTMLPrefix,
      bought:this.bought,
      made:this.made
    }
  }
}

let base1 = new Building("f<sub>0</sub>(n)",10,points,points,1,1.09,"basebuild1");
let base2 = new Building("f<sub>1</sub>(n)",1000,points,base1,1,1.09,"basebuild2");
let base3 = new Building("f<sub>2</sub>(n)",1e6,points,base2,1,1.09,"basebuild3");
let base4 = new Building("f<sub>3</sub>(n)",1e9,points,base3,1,1.09,"basebuild4");
let base5 = new Building("f<sub>4</sub>(n)",1e15,points,base4,1,1.09,"basebuild5");
let omega1 = new Building("f<sub>ω</sub>(n)",1,omegas,[base1,base2,base3,base4,base5],0.1,2,"omegabuild1");
let omega2 = new Building("f<sub>ω+1</sub>(n)",100,omegas,omega1,0.1,2,"omegabuild2");
let omega3 = new Building("f<sub>ω+2</sub>(n)",1e6,omegas,omega2,0.1,2,"omegabuild3");
let square1 = new Building("f<sub>ω<sup>2</sup></sub>",1,squares,[omega1,omega2,omega3],0.1,3,"squarebuild1")


let allBuildings = [base1,base2,base3,base4,base5,omega1,omega2,omega3,square1]
let allProducibles = allBuildings.concat(allCurrencies)