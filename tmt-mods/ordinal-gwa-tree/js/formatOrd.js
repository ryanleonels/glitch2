const BHO = 48630661836227120000
function numToPsi(num){
  let gwa = options.gwaOrdinal
  if (num.gte(BHO) && options.bhoExponent){return (gwa?"<img src='https://cdn.discordapp.com/emojis/854483367600193566.webp?size=24'>^":"BHO^")+format(num.log(BHO),3)}
  if (num.gt(BHO)){return (gwa?"<img src='https://cdn.discordapp.com/emojis/854483367600193566.webp?size=24'>x":"BHOx")+format(num.div(BHO))}
  return displayPsiOrd(num.toNumber(), player.maxLength)
}
function numToOP(num, base, iter=0){
  if (base.lte(iter))return 0
  num = num.floor().max(0)
  if (num.eq(0)&&iter==0)return 0
  let n = new Decimal(0)
  if (num.lt(base.sqr())&&iter==0){
    return new Decimal(0)
  } else if (num.lt(base)){
    return num
  } else {
    let exponent = num.log(base).floor()
    let s = numToOP(exponent, base, 1)
    let coef = num.div(base.pow(exponent).round()).floor()
    let rem = num.sub(base.pow(exponent).round().mul(coef)).round()
    n=n.add(Decimal.pow(inAnyChallenge("r")?10:hasUpgrade("h",112)?25:[10,11,15,20][player.b.challenges[11]], s).mul(coef))
    if (rem.lt(base)){n=n.add(rem)} else {
    n=n.add(numToOP(rem, base, iter+1))}
    return n
  }
}
function hierarchyOrd(num, base, iter=0) {
  if (base.lte(iter))return 0
  num = num.floor().max(0)
  if (num.eq(0)&&iter==0)return 0
  let n = new Decimal(0)
  if (num.lt(base.sqr())&&iter==0){
    return new Decimal(0)
  } else if (num.lt(base)){
    return num
  } else {
    let exponent = num.log(base).floor()
    let s = hierarchyOrd(exponent, base, 1)
    let coef = num.div(base.pow(exponent).round()).floor()
    let rem = num.sub(base.pow(exponent).round().mul(coef)).round()
    n=n.add(Decimal.pow(10, s).mul(coef))
    if (rem.lt(base)){n=n.add(rem)} else {
    n=n.add(hierarchyOrd(rem, base, iter+1))}
    return n
  }
}
function displayPsiOrd(ord, trim) {
  if (ord>=BHO)return "BHO"
    ord = Math.floor(ord)
    if(ord === 0) return ""
    if(trim <= 0) return "..."
    if(ord < 4) return extraOrdMarks[ord]
    const magnitude = Math.floor(Math.log(Math.floor(ord/4))/Math.log(3))
    const magnitudeAmount = 4*3**magnitude
    let finalOutput = ordMarks[Math.min(magnitude,ordMarks.length-1)]
    if(finalOutput.includes("x"))finalOutput = finalOutput.replace(/x/, displayPsiOrd(Math.floor(ord-magnitudeAmount), trim-1))
    if(finalOutput.includes("y"))finalOutput = finalOutput.replace(/y/, displayPsiOrd(Math.floor(ord-magnitudeAmount)+1, trim-1))
    if (options.gwaOrdinal)finalOutput=finalOutput.replaceAll("Ω","<img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'>")
  .replaceAll("ω","<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>").replaceAll("&psi;","<img src='https://cdn.discordapp.com/emojis/929933686353297479.webp?size=24'>")
    return `${finalOutput}`.replaceAll("undefined",options.gwaOrdinal?"<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>":"ω")
}
const ordMarks = [
    "&psi;(Ωx)",
    "&psi;(Ω<sup>2</sup>x)",
    "&psi;(Ω<sup>y</sup>)",
    "&psi;(Ω<sup>Ω</sup>x)",
    "&psi;(Ω<sup>Ω+1</sup>x)",
    "&psi;(Ω<sup>Ω+2</sup>x)",
    "&psi;(Ω<sup>Ω+y</sup>)",
    "&psi;(Ω<sup>Ω2</sup>x)",
    "&psi;(Ω<sup>Ω2+1</sup>x)",
    "&psi;(Ω<sup>Ω2+2</sup>x)",
    "&psi;(Ω<sup>Ω2+y</sup>)",
    "&psi;(Ω<sup>Ωy</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup></sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+1</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+y</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω+1</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω+2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω+y</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω2+1</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω2+2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω2+y</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ωy</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+1</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+y</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω+1</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω+2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω+y</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω2+1</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω2+2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω2+y</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ωy</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>y</sup>)",
    "&psi;(Ω<sup>Ω<sup>y</sup></sup>)",
    "BHO",
    //"&psi;(ε<sub>Ω+x</sub>)",
]
const extraOrdMarks = ["","ω","ω<sup>ω</sup>","ω<sup>ω<sup>2</sup></sup>"]