const spaces = [" ","\n","\r",";"]
const symbols = {
  "+": "math",
  "-": "math",
  "*": "math",
  "/": "math",
  "^": "math",
  "(": "math",
  ")": "math",
  
  ",": "argSplit"
}
const builtinFunctions = {
  print(x){
    console.log(x)
  }
}
const builtinFunctionNames = Object.keys(builtinFunctions)
const toSpace = Object.keys(symbols)
function parseText(txt){
  let s = ""
  let a = []
  let inString = false
  for(let x=0;x<txt.length;x++){
    s+=txt[x]
    if(txt[x]=="\""||txt[x]=="'")inString=!inString
    if(!inString){
      if(spaces.includes(txt[x])){
        if(s.length>1)a.push(s.slice(0,-1))
        s=""
      }
      if(spaces.includes(txt[x-1]+txt[x])){
        if(s.length>2)a.push(s.slice(0,-2))
        s=""
      }
      if(toSpace.includes(txt[x])){
        if(s.length>0){
          a.push(s.slice(0,-1))
          a.push(txt[x])
        }
        s=""
      }
      if(toSpace.includes(txt[x-1]+txt[x])){
        if(s.length>1){
          a.push(s.slice(0,-2))
          a.push(txt[x])
        }
        s=""
      }
    }
  }
  a.push(s)
  for(let x=0;x<a.length;x++){
    if(a[x].length==0){
      a.splice(x,1)
      x--
      continue
    }
    if(!Number.isNaN(Number(a[x]))||a[x]=="NaN"){
      a[x]=[new num(Number(a[x])),"num"]
      continue
    }
    if((a[x].startsWith("'")||a[x].startsWith('"'))&&(a[x].endsWith("'")||a[x].endsWith('"'))){
      a[x]=[new str(a[x].slice(1,-1)),"str"]
      continue
    }
    if(toSpace.includes(a[x])){
      a[x]=[new symbol(a[x],symbols[a[x]]),"symbol"]
      continue
    }
    if(builtinFunctionNames.includes(a[x])){
      a[x]=[new builtinFunc(a[x]),"builtinFunction"]
      continue
    }
    a[x]=[a[x],"var"]
  }
  return a
}

function validMath(vars,x){
  return x
  let z = []
  let last = "math"
  for(let y=0;y<x.length;y++){
    if(last==x[y][1]){
      if(last=="math")return false
      return z
    }
    if(last != "math" && x[y][1] != "math")return z
    z.push(x[y])
    last = x[y][1]
  }
  return z
}

function getArray(arr,path){
  let b = arr
  for(let x=0;x<path.length;x++){
    b = b[x]
  }
  return b
}

function editArray(arr,path,val){
  if(path.length==1){
    arr[path[0]] = val
    return true
  }
  for(let x=0;x<path.length-1;x++){
    arr=arr[path[x]]
  }
  arr[path[path.length-1]] = val
  return true
}

function checkForStuff(x,y,z){
  let b = []
  let path = []
  for(let a=0;a<x.length;a++){
    if(x[a][0]==y){
      path.push(getArray(b,path).length,1)
      editArray(b,path.slice(0,-1),[a,[]])
      continue
    }
    if(x[a][0]==z){
      editArray(b,[...path.slice(0,-1),2],a)
      path=path.slice(0,-2)
    }
  }
  return b
}

function parseMath(vars,x,p){
  let y = []
  let r = 0
  
  x = validMath(vars,x)
  if(!x)return console.error("bad")
  
  // first step: variables
  if(p==undefined){
    for(let z=0;z<x.length;z++){
      if(x[z][1]=="var"){
        if(!vars[x[z][0]])y.push(zero)
        else y.push(vars[x[z][0]])
      }else y.push(x[z][0])
    }
    x = y
    y = []
  }
  
  // second step: parentheses
  if(p==undefined)p = checkForStuff(x,"(",")")
  if(p.length>0){
    let offset = 0
    p.forEach(z=>{
      let re = parseMath(vars,x.slice(z[0]+1-offset,z[2]-offset),z[1])
      x = [...x.slice(0,z[0]-offset),re,...x.slice(z[2]+1-offset)]
      offset+=z[2]-z[0]
    })
  }
  
  // third step: exponents
  
  // TO-DO: make exponents work correctly
  let offset = 0
  for(let z=0;z<x.length-offset;z++){
    y.push(x[z+offset])
    while(y[z-1] == "^"){
      let re = y[z-2].pow(y[z])
      y=[...y.slice(0,Math.max(z-2)),re,...y.slice(z+1)]
      offset+=2
      z-=2
    }
  }
  
  x = y
  y = []
  
  // fourth step: multiplying/dividing
  offset = 0
  for(let z=0;z<x.length-offset;z++){
    y.push(x[z+offset])
    while(y[z-1] == "*"){
      let re = y[z-2].mul(y[z])
      y=[...y.slice(0,Math.max(z-2)),re,...y.slice(z+1)]
      offset+=2
      z-=2
    }
    while(y[z-1] == "/"){
      let re = y[z-2].div(y[z])
      y=[...y.slice(0,Math.max(z-2)),re,...y.slice(z+1)]
      offset+=2
      z-=2
    }
  }
  
  x = y
  
  y = []
  
  // fifth step: adding/subtracting
  for(let z=0;z<x.length;z++){
    if(x[z+1] == "+"){
      y[0] = x[z].add(x[z+2])
      x = [...y,...x.slice(z+3)]
      z--
      continue
    }
    if(x[z+1] == "-"){
      y[0] = x[z].sub(x[z+2])
      x = [...y,...x.slice(z+3)]
      z--
      continue
    }
    y.push(x[z])
  }
  
  return y[y.length-1]
}

const builtIn = {
  isNumber(x){
    return this.isinstance(x,num)
  },
  isInstance(x,y){
    return x instanceof y
  }
}

class variable{
  constructor(a){
    this.val = a[0]
    this.type = a[1]
  }
  arr(){
    return [this.val,this.type]
  }
}

class num{
  constructor(x){
    this.value = x
  }
  add(x){
    if(x instanceof num)return new num(this.value + x.value)
  }
  sub(x){
    return new num(this.value - x.value)
  }
  mul(x){
    return new num(this.value * x.value)
  }
  div(x){
    return new num(this.value / x.value)
  }
  pow(x){
    return new num(this.value ** x.value)
  }
}

class str{
  constructor(x){
    this.value = x
  }
}

class symbol{
  constructor(name,type){
    this.name = name
    this.type = type
  }
  typeIs(type){
    return type==this.type
  }
  nameIs(type){
    return name==this.name
  }
}

class expression{
  constructor(){
    this.expression = []
  }
  add(m){
    this.expression.push(m)
  }
  parse(vars){
    let array = []
  }
}

class builtinFunc{
  constructor(name){
    this.func = builtinFunctions[name]
  }
  run(...args){
    return this.func(...args)
  }
}

function newParseMath(vars,exp){
  let arr = []
  let inner = 0
  let pri = 0
  for(let x=0;x<exp.length;x++){
    let val = exp[0]
    if(val instanceof symbol && val.nameIs("(")){
      arr.push([val,val,pri])
      pri = 0
      inner++
      continue
    }
    if(val[1]=="var")val=val.arr()
    x++
    let op = exp[x]
    if(val instanceof symbol && op instanceof symbol && op.name == val.name && op.name == ")"){
      x--
      let ppos = 0
      for(let y=arr.length-1;y>=0;y--){
        if(arr[y][0] instanceof symbol && arr[y][0].nameIs("(")){
          ppos=y
          break
        }
      }
      for(let y=0;y<arr.length;y++){
        if(y!=ppos)arr[y]
      }
      continue
    }
    let p = 0
    if(op.nameIs("*")||op.nameIs("/"))p=1
    if(op.nameIs("^"))p=2
    if(p<pri){
      
    }
  }
}

const zero = new num(0)

function runCode(code){
  let keys = []
  for(let x=0;x<code.length;x++){
    let k = code[x]
    let didThing = false
    switch(keys[keys.length-1]){
      case undefined:
        break;
      case "print":
        didThing=true
        console.log(k)
        break;
      case "var":
        break;
    }
    if(!didThing&&keys.includes(k)){
      keys[0]=k
      continue;
    }
  }
}