"use strict"
class Ordinal {
  constructor(level,base,reduced,limit) {
    this.level = level //The current game level of the ordinal, which changes with starting value
    this.base = EN(base) //The base of the ordinal is in
    this.reduced = EN(reduced) //The number of times the successor case is applied
    this.limit = limit //Differentiate between successor and limit cases if applicable
  }
  toCoeff() {
    let coeff = levelToCoeff(this.level)
    let hardyBase = this.base.floor()
    let reduceLeft = this.reduced.floor()
    let reachedZero = false
    let cost=EN(0)
    let amountReduceNow = EN(0)    
    while ( (((coeff[0][0][0].eq(0)&&(!this.limit))||reduceLeft.gt(0))&&!reachedZero) ) {
      switch(smallestPrincipleTerm(coeff)) {
        case 0: //Ordinal can be expressed as w*a+n
          if (reduceLeft.gte(coeff[0][0][0])) { //Case of term elimination
          reduceLeft = reduceLeft.minus(coeff[0][0][0])
          hardyBase = hardyBase.add(coeff[0][0][0])
          coeff[0][0][0] = EN(0)
          } else { //Case of non-term elimination
            coeff[0][0][0] = coeff[0][0][0].minus(reduceLeft)
            hardyBase = hardyBase.add(reduceLeft)
            reduceLeft = EN(0)
          }
          break
        case 1: //Ordinal can be expressed as w^2*a+w*n
          cost = EN(2).pow(coeff[0][1][0]).minus(1).times(hardyBase)
          if (reduceLeft.gte(cost)) { //Case of term elimination
            reduceLeft = reduceLeft.minus(cost)
            hardyBase = hardyBase.add(cost)
            coeff[0][1][0] = EN(0)
          } else { //Case of non-term elimination
            amountReduceNow = EN.affordGeometricSeries(reduceLeft,hardyBase,2,0)
            cost = EN.sumGeometricSeries(amountReduceNow,hardyBase,2,0)
            reduceLeft = reduceLeft.minus(cost)
            hardyBase = hardyBase.add(cost)
            coeff[0][1][0] = coeff[0][1][0].minus(amountReduceNow)
            if (reduceLeft.gte(1)||!this.limit) {
              coeff[0][1][0] = coeff[0][1][0].minus(1)
              coeff[0][0][0] = hardyBase
            }
          }
          break
        case 2: //Ordinal can be expressed as w^3*a+w^2*n
          cost = fgh2(coeff[0][2][0],hardyBase).minus(hardyBase)
          if (reduceLeft.gte(cost)) { //Case of term elimination
            reduceLeft = reduceLeft.minus(cost)
            hardyBase = hardyBase.add(cost)
            coeff[0][2][0] = EN(0)
          } else { //Case of non-term elimination
            amountReduceNow = affordFGH2Series(reduceLeft, hardyBase)
            cost = (!amountReduceNow.eq(0))?fgh2(amountReduceNow,hardyBase).minus(hardyBase):EN(0)
            reduceLeft = reduceLeft.minus(cost) //(new Ordinal(18,3,22,true)).toCoeff().toString()
            hardyBase = hardyBase.add(cost)
            coeff[0][2][0] = coeff[0][2][0].minus(amountReduceNow)
            if (reduceLeft.gte(1)||!this.limit) {
              coeff[0][2][0] = coeff[0][2][0].minus(1)
              coeff[0][1][0] = hardyBase
            }
          }
          break
        case 3:
          break
        case -1:
          break
        case -2:
          break
        case -3:
          reachedZero = true
          break
        default: 
          
          break
      }
    }
    return coeff
  }
  clone() {
    let x=this
    return new Ordinal(x.level,x.base,x.reduced,x.limit)
  }
  isLimitOrd() {
    if (!this.limit) return false
    return lastElm(this.toCoeff())[0].eq(0)
  }
  toString() {
    /*
    if(this.level % 3 == 0) {
      let thinkies1 = this.clone()
      thinkies1.level++
      thinkies1.reduced = thinkies1.reduced.add(1)
      return thinkies1.toString()
    }*/
    let coeff = this.toCoeff()
    let poly = cloneArray(coeff[0]).reverse()
    let string = []
    if (coeff[1][1].eq(1)) {
      string = ["ω<sup>ω+1</sup>"]
    }
    if (!coeff[1][0].eq(0)) {
      string.push(`ω<sup>ω</sup>${(coeff[1][0].eq(1)?"":coeff[1][0].beautify())}`)
    }
    for(let i in poly) {
      let term = `ω<sup>${poly[i][1].beautify()}</sup>`
      if (poly[i][1].eq(0)) term=""
      if (poly[i][1].eq(1)) term="ω"
      if (!poly[i][0].eq(0)) {
        term = term + (poly[i][0].eq(1) && term !== "" ? "" : poly[i][0].beautify())
        if (term !== "") string.push(term)
      }
    }
    if (string.length===0) return "0"
    return string.join("+")
  } // there we fucking go still though @patcail what is how do i do w^2 using new Ordinal
  // See #testing channel
  reduce(successor, limit) {
    let modbase = this.base.add(this.level % this.base)
    let highestReduce = this.reduced.minus(this.level % this.base).div(modbase).add(1).max(0)
    let reduceCap = EN(2).pow(highestReduce.logBase(2).floor().add(this.isLimitOrd()?0:1).add(limit)).minus(1).times(modbase).add(this.level % this.base)
    if (highestReduce.eq(0)) {
      reduceCap = (this.level % this.base)
    }
    let thing = this.clone()
    thing.reduced = thing.reduced.add(successor)
    thing.limit = false
    if (thing.reduced.gte(reduceCap)) {
      thing.reduced = reduceCap
      thing.limit = true
    }
    return thing    
  }

}

function lastElm(array) {
  return array[array.length-1]
}

function cloneArray(array) {
  return array.concat([])
}

Number.prototype.clone = function() {
    return this+0
}

function smallestPrincipleTerm(coeffArray) {
  let coeffIndex = coeffArray[0].findIndex(elm => {
    return elm[0].gte(1)
  })
  if (coeffIndex == -1) {
    if (!coeffArray[1][0].eq(0)) {return -1}
    if (!coeffArray[1][1].eq(0)) {return -2}
    return -3
  }
  return coeffIndex
}

function beautify(n,f=0) {
 let x = EN(n)
  if (x.lt(1e6)) {
    return (f==0?x.floor().toString():x.toNumber().toFixed(f))
  } else if (x.lte(EN.tetrate(10, 6))){
    let exponent = x.log10().floor()
    let mantissa = ""
    if (x.lte(EN(10).pow(1000000)))
    {
      mantissa = x.divide(EN(10).pow(exponent)).toNumber().toFixed(3)
    }
    else
    {
      mantissa = ""
    }
    return mantissa + "e" + beautify(exponent)
  } else if (isNaN(x)) {
    return n.toString()
  } else if (x.eq(Infinity)) {
    return "Infinity";
  } else { // toHyperE doesn't work, so this is as far as I'm going
    return "way too many";
  }
}

function fgh2(recursion,x) {
  if (recursion.eq(0)) {
    return x
  }
  let rec = Math.min(recursion.toNumber(),5)
  let b=x
  for (let i=0;i<rec;i++) {
    b=fgh(2,b)
  }
  if (recursion.gte(5)) {
    b=EN(10).tetr(b.slog().add(recursion).minus(5))
  }
  return b
}

function affordFGH2Series(amount, hardbase) {
  if (amount.lt(hardbase.times(EN(2).pow(hardbase).minus(1)))) {
    return EN(0)
  }
  let addFGHRec = -1
  let baseFGHRec = hardbase
  while (addFGHRec < 4.5 && amount.gte(baseFGHRec.minus(hardbase)) ) {
    addFGHRec += 1
    baseFGHRec = baseFGHRec.times(EN(2).pow(baseFGHRec))
  }
  if (addFGHRec == 5) {
    //now baseFGHRec is 6 applications of n*2^n to hardbase
    return amount.slog().minus(baseFGHRec.slog()).add(6).floor()
  }
  return EN(addFGHRec)
}

function newOrd(level,base,reduce,limit=false) {
  return new Ordinal(level,base,reduce,limit)
}
