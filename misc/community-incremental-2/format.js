function format(decimal, precision = 2) {
  if (!decimal) return "";
  if(typeof decimal == "number"||typeof decimal == "string")decimal=D(decimal)
  if (!(decimal instanceof Decimal)) return "Not a Decimal";
  if(isNaN(decimal.mag)||isNaN(decimal.layer))return "NaN"
  if (decimal.mag == Infinity || decimal.layer == Infinity || decimal.e == Infinity) return "Infinity"
  if(decimal.lt(0.01)&&decimal.gt(0))return "1/"+format(decimal.pow(-1))
  if(decimal.lt(100))return decimal.toStringWithDecimalPlaces(precision)
  if (decimal.lt(1e5)) return decimal.floor().toString();
  if(decimal.lt("1e1e5")){
    let l = decimal.log10()
    let f = l.floor()
    let d = Decimal.pow(10,l.sub(f)).toStringWithDecimalPlaces(4)
    if(d=="10.0000"){d="1.000";f=f.add(1)}
    return d+"e"+f
  }
  if(decimal.lt("eeee5")){
    return "e"+format(decimal.log10(), precision)
  }
  
  return "too big to format"
  return decimal.toString();
}

function formatWhole(decimal) {
  if (decimal.lt(1e5)) return decimal.floor().toString();
  else return format(decimal, 2);
}

// would you like to join? YES OR NO