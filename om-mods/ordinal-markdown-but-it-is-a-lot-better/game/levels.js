"use strict"

const zeroCoeff = () => {return [[[EN(0),EN(0)],[EN(0),EN(1)],[EN(0),EN(2)]],[EN(0),EN(0)]]}
const zeroCoeffString = zeroCoeff().toString()

function levelToRed(x,base=3) {
  let output = EN(base)
  let currX = x
  while (currX > 0) {
    switch(factorOut(currX,base)) {
      case 0:
        output = output.add(1)
        currX -= 1
        break
      case 1:
        output = output.times(2)
        currX -= 3
        break
      case 2:
        output = output.times(EN(2).pow(output))
        currX -= 9
        break
      case 3:
      let reps = output;
    while (reps.gt(0))
    {
      if (output.lt(1e100))
      {
        output = fgh(2, output);
        reps = reps.sub(1);
      }
      else
      {
        output = output.layeradd(reps, 2);
        reps = ExpantaNum(0);
      }
    }
    currX-=27
    break
      case 4:
        return Infinity //will be changed soon
        break
      default:
        return Infinity //will be changed soon
        break
    }
  }
  return output
}

function levelToCoeff(x) {
  let output = zeroCoeff()
  let currX = x
  while (currX > 0) {
    switch(factorOut(currX,3)) {
      case 0:
        output[0][0][0] = output[0][0][0].add(1)
        currX -= 1
        break
      case 1:
        output[0][1][0] = output[0][1][0].add(1)
        currX -= 3
        break
      case 2:
        output[0][2][0] = output[0][2][0].add(1)
        currX -= 9
        break
      case 3:
        output[1][0] = output[1][0].add(1)
        currX -= 27
        break
      case 4:
        output[1][1] = output[1][1].add(1)
        currX -= 81
        break
      default:
        return Infinity //will be changed soon
        break
    }
  }
  return output
}

function factorOut(n,base=3) {
  if (n % base == 0 && n != 0) {
    return factorOut(n/base)+1
  }
  return 0
}