// Calculates f_{func}(base)
function fgh(func, base)
{
  base = ExpantaNum(base);

  if (func == 0)
  {
    return base.add(1);
  }
  else if (func == 1)
  {
    return base.mul(2);
  }
  else if (func == 2)
  {
    return base.mul(ExpantaNum.pow(2, base));
  }
  else if (func == 3)
  {
    let reps = base;
    while (reps.gt(0))
    {
      if (base.lt(1e100))
      {
        base = fgh(2, base);
        reps = reps.sub(1);
      }
      else
      {
        base = base.layeradd(reps, 2);
        reps = ExpantaNum(0);
      }
    }
    return base;
  }
  else
  {
    let reps = base;
    while (reps.gt(0))
    {
      if (base.lt(1e100))
      {
        base = fgh(func - 1, base)
        reps = reps.sub(1)
      }
      else
      {
        if (reps.lt(9e15))
        {
          base.array.push([func - 2, reps.toNumber()])
        }
        else
        {
          base = base.arrow(func - 1)(reps)
        }
        base.standardize();
        reps = ExpantaNum(0)
      }
    }
    return base;
  }
}

// Calculates f_ω(base)
function fghOmega(base)
{
  base = ExpantaNum(base)
  if (base.lte(1000))
  {
    return fgh(base, base);
  }
  else
  {
    base.layer += 1
    return base;
  }
}

// Calculates f_{ω+1}(base)
function fghOmegaPlusOne(base)
{
  base = ExpantaNum(base)
  reps = base;

  if (reps.gt(9e15))
  {
    return ExpantaNum(Infinity)
  }

  while (reps.gt(0))
  {
    if (base.lte(1000))
    {
      base = fghOmega(base);
      reps = reps.sub(1)
    }
    else
    {
      base = ExpantaNum("J^" + reps.toString() + " " + base.toString());
      reps = ExpantaNum(0);
    }
  }
  return base;
}

function hardy(ord, base, over=0)
{
  ord = ExpantaNum(ord);

  if (ord.gte(base ** (base + 2)))
  {
    return Infinity;
  }

  if (ord.gte(base ** (base + 1)))
  {
    return fghOmegaPlusOne(hardy(ord.sub(base ** (base + 1)), base, over));
  }

  if (ord.gte(base ** base))
  {
    return fghOmega(hardy(ord.sub(base ** base), base, over));
  }

  if (ord.lt(base))
  {
    return ord.add(base + over);
  }

  highestPower = ord.logBase(base).floor();
  restOrd = ord.sub(ExpantaNum.pow(base, highestPower));

  return fgh(highestPower, hardy(restOrd, base, over));
}

function removeTrailingZeros(list)
{
  listClone = [...list]
  while (listClone[listClone.length - 1] == 0)
  {
    listClone.pop();
  }
  return listClone;
}

function subOneFromLast(list)
{
  listClone = [...list]
  listClone[list.length - 1] -= 1;
  return listClone;
}

// this function expects a list of numbers instead of an ordinal with the "omega" list containing a maximum of two elements
// so hardyList([1, 2, 3], [4, 5], 10) would calculate H[ω^(ω+1)*5 + ω^(ω)*4 + ω^3*3 + ω^2*2 + ω]
function hardyList(ordList, omega, base)
{
  ordList = removeTrailingZeros(ordList)
  omega = removeTrailingZeros(omega)
  base = ExpantaNum(base)

  if (omega.length > 2)
  {
    return ExpantaNum(Infinity)
  }
  else if (omega.length == 2)
  {
    return fghOmegaPlusOne(hardyList(ordList, subOneFromLast(omega), base));
  }
  else if (omega.length == 1)
  {
    return fghOmega(hardyList(ordList, subOneFromLast(omega), base))
  }
  else if (ordList.length == 0)
  {
    return base;
  }
  else if (ordList.length == 1)
  {
    return base.add(ordList[0]);
  }

  return fgh(ordList.length - 1, hardyList(subOneFromLast(ordList), [], base))
}