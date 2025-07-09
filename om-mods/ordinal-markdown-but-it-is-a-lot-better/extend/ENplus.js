ExpantaNum.prototype.toHyperE = function() {
  if(this.layer == -1) {
    if (this.sign==-1) return "-"+this.abs().toHyperE();
    if (isNaN(this.array[0][1])) return "NaN";
    if (!isFinite(this.array[0][1])) return "Infinity";
    if (this.lt(ExpantaNum.MAX_SAFE_INTEGER)) return String(this.array[0][1]);
    if (this.lt(ExpantaNum.E_MAX_SAFE_INTEGER)) return "E"+this.array[0][1];
    var r="E"+this.array[0][1]+"#"+this.array[1][1];
    for (var i=2;i<this.array.length;i++){
      r+="#"+(this.array[i][1]+1);
    }
    return r; 
  }
  let a = this.clone()
  a.layer = -1
  console.log(a)
  return "E"+a.toHyperE()+"##"+(this.layer+1)
}

ExpantaNum.prototype.beautify = function() {
  return this.toString()
}
