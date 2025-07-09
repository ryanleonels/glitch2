(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Decimal = factory());
}(this, function () { 'use strict';

  var padEnd = function (string, maxLength, fillString) {

    if (string === null || maxLength === null) {//Code snippets and templates from Decimal.js

;(function (globalScope) {
  "use strict";


  // --  EDITABLE DEFAULTS  -- //
    var ExpantaNum = {

      // The maximum number of operators stored in array.
      // If the number of operations exceed the limit, then the least significant operations will be discarded.
      // This is to prevent long loops and eating away of memory and processing time.
      // 1000 means there are at maximum of 1000 elements in array.
      // It is not recommended to make this number too big.
      // `ExpantaNum.maxOps = 1000;`
      maxOps: 1e3,

      // Specify what format is used when serializing for JSON.stringify
      // 
      // JSON   0 JSON object
      // STRING 1 String
      serializeMode: 0,
      
      // Level of debug information printed in console
      // 
      // NONE   0 Show no information.
      // NORMAL 1 Show operations.
      // ALL    2 Show everything.
      debug: 0
    },


  // -- END OF EDITABLE DEFAULTS -- //


    external = true,

    expantaNumError = "[ExpantaNumError] ",
    invalidArgument = expantaNumError + "Invalid argument: ",

    isExpantaNum = /^[-\+]*(Infinity|NaN|(J+|J\^\d+ )?(10(\^+|\{[1-9]\d*\})|\(10(\^+|\{[1-9]\d*\})\)\^[1-9]\d* )*((\d+(\.\d*)?|\d*\.\d+)?([Ee][-\+]*))*(0|\d+(\.\d*)?|\d*\.\d+))$/,

    MAX_SAFE_INTEGER = 9007199254740991,
    MAX_E = Math.log10(MAX_SAFE_INTEGER), //15.954589770191003

    // ExpantaNum.prototype object
    P={},
    // ExpantaNum static object
    Q={},
    // ExpantaNum constants
    R={};

  // ExpantaNum prototype methods

  /*
   *  absoluteValue             abs
   *  affordArithmeticSeries
   *  affordGeometricSeries
   *  arrow
   *  ceiling                   ceil
   *  chain
   *  choose
   *  comparedTo                cmp
   *  cubeRoot                  cbrt
   *  divide                    div
   *  equals                    eq
   *  expansion
   *  exponential               exp
   *  factorial                 fact
   *  floor
   *  gamma
   *  generalLogarithm          log10
   *  greaterThan               gt
   *  greaterThanOrEqualTo      gte
   *  hyper
   *  isFinite
   *  isInfinite
   *  isInteger                 isint
   *  isNaN
   *  isNegative                isneg
   *  isPositive                ispos
   *  iteratedexp
   *  iteratedlog
   *  lambertw
   *  layeradd
   *  layeradd10
   *  lessThan                  lt
   *  lessThanOrEqualTo         lte
   *  logarithm                 logBase
   *  minus                     sub
   *  modulo                    mod
   *  naturalLogarithm          ln        log
   *  negated                   neg
   *  notequals                 neq
   *  pentate                   pent
   *  plus                      add
   *  reciprocate               rec
   *  root
   *  round
   *  slog
   *  squareRoot                sqrt
   *  ssqrt                     ssrt
   *  sumArithmeticSeries
   *  sumGeometricSeries
   *  times                     mul
   *  tetrate                   tetr
   *  toExponential
   *  toFixed
   *  toHyperE
   *  toJSON
   *  toNumber
   *  toPower                   pow
   *  toPrecision
   *  toString
   *  toStringWithDecimalPlaces
   *  valueOf
   */
  R.ZERO=0;
  R.ONE=1;
  R.E=Math.E;
  R.LN2=Math.LN2;
  R.LN10=Math.LN10;
  R.LOG2E=Math.LOG2E;
  R.LOG10E=Math.LOG10E;
  R.PI=Math.PI;
  R.SQRT1_2=Math.SQRT1_2;
  R.SQRT2=Math.SQRT2;
  R.MAX_SAFE_INTEGER=MAX_SAFE_INTEGER;
  R.MIN_SAFE_INTEGER=Number.MIN_SAFE_INTEGER;
  R.NaN=Number.NaN;
  R.NEGATIVE_INFINITY=Number.NEGATIVE_INFINITY;
  R.POSITIVE_INFINITY=Number.POSITIVE_INFINITY;
  R.E_MAX_SAFE_INTEGER="e"+MAX_SAFE_INTEGER;
  R.EE_MAX_SAFE_INTEGER="ee"+MAX_SAFE_INTEGER;
  R.TETRATED_MAX_SAFE_INTEGER="10^^"+MAX_SAFE_INTEGER;
  R.GRAHAMS_NUMBER="J^63 10^^^(10^)^7625597484984 3638334640023.7783";
  P.absoluteValue=P.abs=function(){
    var x=this.clone();
    x.sign=1;
    return x;
  };
  Q.absoluteValue=Q.abs=function(x){
    return new ExpantaNum(x).abs();
  };
  P.negate=P.neg=function (){
    var x=this.clone();
    x.sign=x.sign*-1;
    return x;
  };
  Q.negate=Q.neg=function (x){
    return new ExpantaNum(x).neg();
  };
  P.compareTo=P.cmp=function (other){
    if (!(other instanceof ExpantaNum)) other=new ExpantaNum(other);
    if (isNaN(this.array[0][1])||isNaN(other.array[0][1])) return NaN;
    if (this.array[0][1]==Infinity&&other.array[0][1]!=Infinity) return this.sign;
    if (this.array[0][1]!=Infinity&&other.array[0][1]==Infinity) return -other.sign;
    if (this.array.length==1&&this.array[0][1]===0&&other.array.length==1&&other.array[0][1]===0) return 0;
    if (this.sign!=other.sign) return this.sign;
    var m=this.sign;
    var r;
    if (this.layer>other.layer) r=1;
    else if (this.layer<other.layer) r=-1;
    else{
      var e,f;
      for (var i=0,l=Math.min(this.array.length,other.array.length);i<l;++i){
        e=this.array[this.array.length-1-i];
        f=other.array[other.array.length-1-i];
        if (e[0]>f[0]||e[0]==f[0]&&e[1]>f[1]){
          r=1;
          break;
        }else if (e[0]<f[0]||e[0]==f[0]&&e[1]<f[1]){
          r=-1;
          break;
        }
      }
      if (r===undefined){
        if (this.array.length==other.array.length){
          r=0;
        }else if (this.array.length>other.array.length){
          e=this.array[this.array.length-l];
          if (e[0]>=1||e[1]>10){
            r=1;
          }else{
            r=-1;
          }
        }else{
          e=other.array[other.array.length-l];
          if (e[0]>=1||e[1]>10){
            r=-1;
          }else{
            r=1;
          }
        }
      }
    }
    return r*m;
  };
  Q.compare=Q.cmp=function (x,y){
    return new ExpantaNum(x).cmp(y);
  };
  P.greaterThan=P.gt=function (other){
    return this.cmp(other)>0;
  };
  Q.greaterThan=Q.gt=function (x,y){
    return new ExpantaNum(x).gt(y);
  };
  P.greaterThanOrEqualTo=P.gte=function (other){
    return this.cmp(other)>=0;
  };
  Q.greaterThanOrEqualTo=Q.gte=function (x,y){
    return new ExpantaNum(x).gte(y);
  };
  P.lessThan=P.lt=function (other){
    return this.cmp(other)<0;
  };
  Q.lessThan=Q.lt=function (x,y){
    return new ExpantaNum(x).lt(y);
  };
  P.lessThanOrEqualTo=P.lte=function (other){
    return this.cmp(other)<=0;
  };
  Q.lessThanOrEqualTo=Q.lte=function (x,y){
    return new ExpantaNum(x).lte(y);
  };
  P.equalsTo=P.equal=P.eq=function (other){
    return this.cmp(other)===0;
  };
  Q.equalsTo=Q.equal=Q.eq=function (x,y){
    return new ExpantaNum(x).eq(y);
  };
  P.notEqualsTo=P.notEqual=P.neq=function (other){
    return this.cmp(other)!==0;
  };
  Q.notEqualsTo=Q.notEqual=Q.neq=function (x,y){
    return new ExpantaNum(x).neq(y);
  };
  P.minimum=P.min=function (other){
    return this.lt(other)?this.clone():new ExpantaNum(other);
  };
  Q.minimum=Q.min=function (x,y){
    return new ExpantaNum(x).min(y);
  };
  P.maximum=P.max=function (other){
    return this.gt(other)?this.clone():new ExpantaNum(other);
  };
  Q.maximum=Q.max=function (x,y){
    return new ExpantaNum(x).max(y);
  };
  P.isPositive=P.ispos=function (){
    return this.gt(ExpantaNum.ZERO);
  };
  Q.isPositive=Q.ispos=function (x){
    return new ExpantaNum(x).ispos();
  };
  P.isNegative=P.isneg=function (){
    return this.lt(ExpantaNum.ZERO);
  };
  Q.isNegative=Q.isneg=function (x){
    return new ExpantaNum(x).isneg();
  };
  P.isNaN=function (){
    return isNaN(this.array[0][1]);
  };
  Q.isNaN=function (x){
    return new ExpantaNum(x).isNaN();
  };
  P.isFinite=function (){
    return isFinite(this.array[0][1]);
  };
  Q.isFinite=function (x){
    return new ExpantaNum(x).isFinite();
  };
  P.isInfinite=function (){
    return this.array[0][1]==Infinity;
  };
  Q.isInfinite=function (x){
    return new ExpantaNum(x).isInfinite();
  };
  P.isInteger=P.isint=function (){
    if (this.sign==-1) return this.abs().isint();
    if (this.gt(ExpantaNum.MAX_SAFE_INTEGER)) return true;
    return Number.isInteger(this.toNumber());
  };
  Q.isInteger=Q.isint=function (x){
    return new ExpantaNum(x).isint();
  };
  P.floor=function (){
    if (this.isInteger()) return this.clone();
    return new ExpantaNum(Math.floor(this.toNumber()));
  };
  Q.floor=function (x){
    return new ExpantaNum(x).floor();
  };
  P.ceiling=P.ceil=function (){
    if (this.isInteger()) return this.clone();
    return new ExpantaNum(Math.ceil(this.toNumber()));
  };
  Q.ceiling=Q.ceil=function (x){
    return new ExpantaNum(x).ceil();
  };
  P.round=function (){
    if (this.isInteger()) return this.clone();
    return new ExpantaNum(Math.round(this.toNumber()));
  };
  Q.round=function (x){
    return new ExpantaNum(x).round();
  };
  P.plus=P.add=function (other){
    var x=this.clone();
    other=new ExpantaNum(other);
    if (ExpantaNum.debug>=ExpantaNum.NORMAL) console.log(this+"+"+other);
    if (x.sign==-1) return x.neg().add(other.neg()).neg();
    if (other.sign==-1) return x.sub(other.neg());
    if (x.eq(ExpantaNum.ZERO)) return other;
    if (other.eq(ExpantaNum.ZERO)) return x;
    if (x.isNaN()||other.isNaN()||x.isInfinite()&&other.isInfinite()&&x.eq(other.neg())) return ExpantaNum.NaN.clone();
    if (x.isInfinite()) return x;
    if (other.isInfinite()) return other;
    var p=x.min(other);
    var q=x.max(other);
    var op0=q.operator(0);
    var op1=q.operator(1);
    var t;
    if (q.gt(ExpantaNum.E_MAX_SAFE_INTEGER)||q.div(p).gt(ExpantaNum.MAX_SAFE_INTEGER)){
      t=q;
    }else if (!op1){
      t=new ExpantaNum(x.toNumber()+other.toNumber());
    }else if (op1==1){
      var a=p.operator(1)?p.operator(0):Math.log10(p.operator(0));
      t=new ExpantaNum([a+Math.log10(Math.pow(10,op0-a)+1),1]);
    }
    p=q=null;
    return t;
  };
  Q.plus=Q.add=function (x,y){
    return new ExpantaNum(x).add(y);
  };
  P.minus=P.sub=function (other){
    var x=this.clone();
    other=new ExpantaNum(other);
    if (ExpantaNum.debug>=ExpantaNum.NORMAL) console.log(x+"-"+other);
    if (x.sign==-1) return x.neg().sub(other.neg()).neg();
    if (other.sign==-1) return x.add(other.neg());
    if (x.eq(other)) return ExpantaNum.ZERO.clone();
    if (other.eq(ExpantaNum.ZERO)) return x;
    if (x.isNaN()||other.isNaN()||x.isInfinite()&&other.isInfinite()) return ExpantaNum.NaN.clone();
    if (x.isInfinite()) return x;
    if (other.isInfinite()) return other.neg();
    var p=x.min(other);
    var q=x.max(other);
    var n=other.gt(x);
    var op0=q.operator(0);
    var op1=q.operator(1);
    var t;
    if (q.gt(ExpantaNum.E_MAX_SAFE_INTEGER)||q.div(p).gt(ExpantaNum.MAX_SAFE_INTEGER)){
      t=q;
      t=n?t.neg():t;
    }else if (!op1){
      t=new ExpantaNum(x.toNumber()-other.toNumber());
    }else if (op1==1){
      var a=p.operator(1)?p.operator(0):Math.log10(p.operator(0));
      t=new ExpantaNum([a+Math.log10(Math.pow(10,op0-a)-1),1]);
      t=n?t.neg():t;
    }
    p=q=null;
    return t;
  };
  Q.minus=Q.sub=function (x,y){
    return new ExpantaNum(x).sub(y);
  };
  P.times=P.mul=function (other){
    var x=this.clone();
    other=new ExpantaNum(other);
    if (ExpantaNum.debug>=ExpantaNum.NORMAL) console.log(x+"*"+other);
    if (x.sign*other.sign==-1) return x.abs().mul(other.abs()).neg();
    if (x.sign==-1) return x.abs().mul(other.abs());
    if (x.isNaN()||other.isNaN()||x.eq(ExpantaNum.ZERO)&&other.isInfinite()||x.isInfinite()&&other.abs().eq(ExpantaNum.ZERO)) return ExpantaNum.NaN.clone();
    if (other.eq(ExpantaNum.ZERO)) return ExpantaNum.ZERO.clone();
    if (other.eq(ExpantaNum.ONE)) return x.clone();
    if (x.isInfinite()) return x;
    if (other.isInfinite()) return other;
    if (x.max(other).gt(ExpantaNum.EE_MAX_SAFE_INTEGER)) return x.max(other);
    var n=x.toNumber()*other.toNumber();
    if (n<=MAX_SAFE_INTEGER) return new ExpantaNum(n);
    return ExpantaNum.pow(10,x.log10().add(other.log10()));
  };
  Q.times=Q.mul=function (x,y){
    return new ExpantaNum(x).mul(y);
  };
  P.divide=P.div=function (other){
    var x=this.clone();
    other=new ExpantaNum(other);
    if (ExpantaNum.debug>=ExpantaNum.NORMAL) console.log(x+"/"+other);
    if (x.sign*other.sign==-1) return x.abs().div(other.abs()).neg();
    if (x.sign==-1) return x.abs().div(other.abs());
    if (x.isNaN()||other.isNaN()||x.isInfinite()&&other.isInfinite()||x.eq(ExpantaNum.ZERO)&&other.eq(ExpantaNum.ZERO)) return ExpantaNum.NaN.clone();
    if (other.eq(ExpantaNum.ZERO)) return ExpantaNum.POSITIVE_INFINITY.clone();
    if (other.eq(ExpantaNum.ONE)) return x.clone();
    if (x.eq(other)) return ExpantaNum.ONE.clone();
    if (x.isInfinite()) return x;
    if (other.isInfinite()) return ExpantaNum.ZERO.clone();
    if (x.max(other).gt(ExpantaNum.EE_MAX_SAFE_INTEGER)) return x.gt(other)?x.clone():ExpantaNum.ZERO.clone();
    var n=x.toNumber()/other.toNumber();
    if (n<=MAX_SAFE_INTEGER) return new ExpantaNum(n);
    var pw=ExpantaNum.pow(10,x.log10().sub(other.log10()));
    var fp=pw.floor();
    if (pw.sub(fp).lt(new ExpantaNum(1e-9))) return fp;
    return pw;
  };
  Q.divide=Q.div=function (x,y){
    return new ExpantaNum(x).div(y);
  };
  P.reciprocate=P.rec=function (){
    if (ExpantaNum.debug>=ExpantaNum.NORMAL) console.log(this+"^-1");
    if (this.isNaN()||this.eq(ExpantaNum.ZERO)) return ExpantaNum.NaN.clone();
    if (this.abs().gt("2e323")) return ExpantaNum.ZERO.clone();
    return new ExpantaNum(1/this);
  };
  Q.reciprocate=Q.rec=function (x){
    return new ExpantaNum(x).rec();
  };
  P.modular=P.mod=function (other){
    other=new ExpantaNum(other);
    if (other.eq(ExpantaNum.ZERO)) return ExpantaNum.ZERO.clone();
    if (this.sign*other.sign==-1) return this.abs().mod(other.abs()).neg();
    if (this.sign==-1) return this.abs().mod(other.abs());
    return this.sub(this.div(other).floor().mul(other));
  };
  Q.modular=Q.mod=function (x,y){
    return new ExpantaNum(x).mod(y);
  };
  //All of these are from Patashu's break_eternity.js
  //from HyperCalc source code
  var f_gamma=function (n){
    if (!isFinite(n)) return n;
    if (n<-50){
      if (n==Math.trunc(n)) return Number.NEGATIVE_INFINITY;
      return 0;
    }
    var scal1=1;
    while (n<10){
      scal1=scal1*n;
      ++n;
    }
    n-=1;
    var l=0.9189385332046727; //0.5*Math.log(2*Math.PI)
    l+=(n+0.5)*Math.log(n);
    l-=n;
    var n2=n*n;
    var np=n;
    l+=1/(12*np);
    np*=n2;
    l+=1/(360*np);
    np*=np*n2;
    l+=1/(1260*np);
    np*=n2;
    l+=1/(1680*np);
    np*=n2;
    l+=1/(1188*np);
    np*=n2;
    l+=691/(360360*np);
    np*=n2;
    l+=7/(1092*np);
    np*=n2;
    l+=3617/(122400*np);
    return Math.exp(l)/scal1;
  };
  //from HyperCalc source code
  P.gamma=function (){
    var x=this.clone();
    if (x.gt(ExpantaNum.TETRATED_MAX_SAFE_INTEGER)) return x;
    if (x.gt(ExpantaNum.E_MAX_SAFE_INTEGER)) return ExpantaNum.exp(x);
    if (x.gt(ExpantaNum.MAX_SAFE_INTEGER)) return ExpantaNum.exp(ExpantaNum.mul(x,ExpantaNum.ln(x).sub(1)));
    var n=x.operator(0);
    if (n>1){
      if (n<24) return new ExpantaNum(f_gamma(x.sign*n));
      var t=n-1;
      var l=0.9189385332046727; //0.5*Math.log(2*Math.PI)
      l+=((t+0.5)*Math.log(t));
      l-=t;
      var n2=t*t;
      var np=t;
      var lm=12*np;
      var adj=1/lm;
      var l2=l+adj;
      if (l2==l) return ExpantaNum.exp(l);
      l=l2;
      np*=n2;
      lm=360*np;
      adj=1/lm;
      l2=l-adj;
      if (l2==l) return ExpantaNum.exp(l);
      l=l2;
      np*=n2;
      lm=1260*np;
      var lt=1/lm;
      l+=lt;
      np*=n2;
      lm=1680*np;
      lt=1/lm;
      l-=lt;
      return ExpantaNum.exp(l);
    }else return this.rec();
  };
  Q.gamma=function (x){
    return new ExpantaNum(x).gamma();
  };
  //end break_eternity.js excerpt
  Q.factorials=[1,1,2,6,24,120,720,5040,40320,362880,3628800,39916800,479001600,6227020800,87178291200,1307674368000,20922789888000,355687428096000,6402373705728000,121645100408832000,2432902008176640000,51090942171709440000,1.1240007277776076800e+21,2.5852016738884978213e+22,6.2044840173323941000e+23,1.5511210043330986055e+25,4.0329146112660565032e+26,1.0888869450418351940e+28,3.0488834461171387192e+29,8.8417619937397018986e+30,2.6525285981219106822e+32,8.2228386541779224302e+33,2.6313083693369351777e+35,8.6833176188118859387e+36,2.9523279903960415733e+38,1.0333147966386145431e+40,3.7199332678990125486e+41,1.3763753091226345579e+43,5.2302261746660111714e+44,2.0397882081197444123e+46,8.1591528324789768380e+47,3.3452526613163807956e+49,1.4050061177528799549e+51,6.0415263063373834074e+52,2.6582715747884488694e+54,1.1962222086548018857e+56,5.5026221598120891536e+57,2.5862324151116817767e+59,1.2413915592536072528e+61,6.0828186403426752249e+62,3.0414093201713375576e+64,1.5511187532873821895e+66,8.0658175170943876846e+67,4.2748832840600254848e+69,2.3084369733924137924e+71,1.2696403353658276447e+73,7.1099858780486348103e+74,4.0526919504877214100e+76,2.3505613312828784949e+78,1.3868311854568983861e+80,8.3209871127413898951e+81,5.0758021387722483583e+83,3.1469973260387939390e+85,1.9826083154044400850e+87,1.2688693218588416544e+89,8.2476505920824715167e+90,5.4434493907744306945e+92,3.6471110918188683221e+94,2.4800355424368305480e+96,1.7112245242814129738e+98,1.1978571669969892213e+100,8.5047858856786230047e+101,6.1234458376886084639e+103,4.4701154615126843855e+105,3.3078854415193862416e+107,2.4809140811395399745e+109,1.8854947016660503806e+111,1.4518309202828587210e+113,1.1324281178206296794e+115,8.9461821307829757136e+116,7.1569457046263805709e+118,5.7971260207473678414e+120,4.7536433370128420198e+122,3.9455239697206587884e+124,3.3142401345653531943e+126,2.8171041143805501310e+128,2.4227095383672734128e+130,2.1077572983795278544e+132,1.8548264225739843605e+134,1.6507955160908460244e+136,1.4857159644817615149e+138,1.3520015276784029158e+140,1.2438414054641308179e+142,1.1567725070816415659e+144,1.0873661566567430754e+146,1.0329978488239059305e+148,9.9167793487094964784e+149,9.6192759682482120384e+151,9.4268904488832479837e+153,9.3326215443944153252e+155,9.3326215443944150966e+157,9.4259477598383598816e+159,9.6144667150351270793e+161,9.9029007164861804721e+163,1.0299016745145628100e+166,1.0813967582402909767e+168,1.1462805637347083683e+170,1.2265202031961380050e+172,1.3246418194518290179e+174,1.4438595832024936625e+176,1.5882455415227430287e+178,1.7629525510902445874e+180,1.9745068572210740115e+182,2.2311927486598137657e+184,2.5435597334721876552e+186,2.9250936934930159967e+188,3.3931086844518980862e+190,3.9699371608087210616e+192,4.6845258497542909237e+194,5.5745857612076058231e+196,6.6895029134491271205e+198,8.0942985252734440920e+200,9.8750442008336010580e+202,1.2146304367025329301e+205,1.5061417415111409314e+207,1.8826771768889261129e+209,2.3721732428800468512e+211,3.0126600184576594309e+213,3.8562048236258040716e+215,4.9745042224772874590e+217,6.4668554892204741474e+219,8.4715806908788206314e+221,1.1182486511960043298e+224,1.4872707060906857134e+226,1.9929427461615187928e+228,2.6904727073180504073e+230,3.6590428819525488642e+232,5.0128887482749919605e+234,6.9177864726194885808e+236,9.6157231969410893532e+238,1.3462012475717525742e+241,1.8981437590761708898e+243,2.6953641378881628530e+245,3.8543707171800730787e+247,5.5502938327393044385e+249,8.0479260574719917061e+251,1.1749972043909107097e+254,1.7272458904546389230e+256,2.5563239178728653927e+258,3.8089226376305697893e+260,5.7133839564458546840e+262,8.6272097742332399855e+264,1.3113358856834524492e+267,2.0063439050956822953e+269,3.0897696138473507759e+271,4.7891429014633940780e+273,7.4710629262828942235e+275,1.1729568794264144743e+278,1.8532718694937349890e+280,2.9467022724950384028e+282,4.7147236359920616095e+284,7.5907050539472189932e+286,1.2296942187394494177e+289,2.0044015765453026266e+291,3.2872185855342959088e+293,5.4239106661315886750e+295,9.0036917057784375454e+297,1.5036165148649991456e+300,2.5260757449731984219e+302,4.2690680090047051083e+304,7.2574156153079990350e+306];
  P.factorial=P.fact=function (){
    var x=this.clone();
    var f=ExpantaNum.factorials;
    if (x.lt(ExpantaNum.ZERO)||!x.isint()) return x.add(1).gamma();
    if (x.lte(170)) return new ExpantaNum(f[+x]);
    var errorFixer=1;
    var e=+x;
    if (e<500) e+=163879/209018880*Math.pow(e,5);
    if (e<1000) e+=-571/2488320*Math.pow(e,4);
    if (e<50000) e+=-139/51840*Math.pow(e,3);
    if (e<1e7) e+=1/288*Math.pow(e,2);
    if (e<1e20) e+=1/12*e;
    return x.div(ExpantaNum.E).pow(x).mul(x.mul(ExpantaNum.PI).mul(2).sqrt()).times(errorFixer);
  };
  Q.factorial=Q.fact=function (x){
    return new ExpantaNum(x).fact();
  };
  P.toPower=P.pow=function (other){
    other=new ExpantaNum(other);
    if (ExpantaNum.debug>=ExpantaNum.NORMAL) console.log(this+"^"+other);
    if (other.eq(ExpantaNum.ZERO)) return ExpantaNum.ONE.clone();
    if (other.eq(ExpantaNum.ONE)) return this.clone();
    if (other.lt(ExpantaNum.ZERO)) return this.pow(other.neg()).rec();
    if (this.lt(ExpantaNum.ZERO)&&other.isint()){
      if (other.mod(2).lt(ExpantaNum.ONE)) return this.abs().pow(other);
      return this.abs().pow(other).neg();
    }
    if (this.lt(ExpantaNum.ZERO)) return ExpantaNum.NaN.clone();
    if (this.eq(ExpantaNum.ONE)) return ExpantaNum.ONE.clone();
    if (this.eq(ExpantaNum.ZERO)) return ExpantaNum.ZERO.clone();
    if (this.max(other).gt(ExpantaNum.TETRATED_MAX_SAFE_INTEGER)) return this.max(other);
    if (this.eq(10)){
      if (other.gt(ExpantaNum.ZERO)){
        other.operator(1,(other.operator(1)+1)||1);
        other.standardize();
        return other;
      }else{
        return new ExpantaNum(Math.pow(10,other.toNumber()));
      }
    }
    if (other.lt(ExpantaNum.ONE)) return this.root(other.rec());
    var n=Math.pow(this.toNumber(),other.toNumber());
    if (n<=MAX_SAFE_INTEGER) return new ExpantaNum(n);
    return ExpantaNum.pow(10,this.log10().mul(other));
  };
  Q.toPower=Q.pow=function (x,y){
    return new ExpantaNum(x).pow(y);
  };
  P.exponential=P.exp=function (){
    return ExpantaNum.pow(Math.E,this);
  };
  Q.exponential=Q.exp=function (x){
    return ExpantaNum.pow(Math.E,x);
  };
  P.squareRoot=P.sqrt=function (){
    return this.root(2);
  };
  Q.squareRoot=Q.sqrt=function (x){
    return new ExpantaNum(x).root(2);
  };
  P.cubeRoot=P.cbrt=function (){
    return this.root(3);
  };
  Q.cubeRoot=Q.cbrt=function (x){
    return new ExpantaNum(x).root(3);
  };
  P.root=function (other){
    other=new ExpantaNum(other);
    if (ExpantaNum.debug>=ExpantaNum.NORMAL) console.log(this+"root"+other);
    if (other.eq(ExpantaNum.ONE)) return this.clone();
    if (other.lt(ExpantaNum.ZERO)) return this.root(other.neg()).rec();
    if (other.lt(ExpantaNum.ONE)) return this.pow(other.rec());
    if (this.lt(ExpantaNum.ZERO)&&other.isint()&&other.mod(2).eq(ExpantaNum.ONE)) return this.neg().root(other).neg();
    if (this.lt(ExpantaNum.ZERO)) return ExpantaNum.NaN.clone();
    if (this.eq(ExpantaNum.ONE)) return ExpantaNum.ONE.clone();
    if (this.eq(ExpantaNum.ZERO)) return ExpantaNum.ZERO.clone();
    if (this.max(other).gt(ExpantaNum.TETRATED_MAX_SAFE_INTEGER)) return this.gt(other)?this.clone():ExpantaNum.ZERO.clone();
    return ExpantaNum.pow(10,this.log10().div(other));
  };
  Q.root=function (x,y){
    return new ExpantaNum(x).root(y);
  };
  P.generalLogarithm=P.log10=function (){
    var x=this.clone();
    if (ExpantaNum.debug>=ExpantaNum.NORMAL) console.log("log"+this);
    if (x.lt(ExpantaNum.ZERO)) return ExpantaNum.NaN.clone();
    if (x.eq(ExpantaNum.ZERO)) return ExpantaNum.NEGATIVE_INFINITY.clone();
    if (x.lte(ExpantaNum.MAX_SAFE_INTEGER)) return new ExpantaNum(Math.log10(x.toNumber()));
    if (!x.isFinite()) return x;
    if (x.gt(ExpantaNum.TETRATED_MAX_SAFE_INTEGER)) return x;
    x.operator(1,x.operator(1)-1);
    return x.standardize();
  };
  Q.generalLogarithm=Q.log10=function (x){
    return new ExpantaNum(x).log10();
  };
  P.logarithm=P.logBase=function (base){
    if (base===undefined) base=Math.E;
    return this.log10().div(ExpantaNum.log10(base));
  };
  Q.logarithm=Q.logBase=function (x,base){
    return new ExpantaNum(x).logBase(base);
  };
  P.naturalLogarithm=P.log=P.ln=function (){
    return this.logBase(Math.E);
  };
  Q.naturalLogarithm=Q.log=Q.ln=function (x){
    return new ExpantaNum(x).ln();
  };
  //All of these are from Patashu's break_eternity.js
  var OMEGA=0.56714329040978387299997;  //W(1,0)
  //from https://math.stackexchange.com/a/465183
  //The evaluation can become inaccurate very close to the branch point
  var f_lambertw=function (z,tol){
    if (tol===undefined) tol=1e-10;
    var w;
    var wn;
    if (!Number.isFinite(z)) return z;
    if (z===0) return z;
    if (z===1) return OMEGA;
    if (z<10) w=0;
    else w=Math.log(z)-Math.log(Math.log(z));
    for (var i=0;i<100;++i){
      wn=(z*Math.exp(-w)+w*w)/(w+1);
      if (Math.abs(wn-w)<tol*Math.abs(wn)) return wn;
      w=wn;
    }
    throw Error("Iteration failed to converge: "+z);
    //return Number.NaN;
  };
  //from https://github.com/scipy/scipy/blob/8dba340293fe20e62e173bdf2c10ae208286692f/scipy/special/lambertw.pxd
  //The evaluation can become inaccurate very close to the branch point
  //at ``-1/e``. In some corner cases, `lambertw` might currently
  //fail to converge, or can end up on the wrong branch.
  var d_lambertw=function (z,tol){
    if (tol===undefined) tol=1e-10;
    z=new ExpantaNum(z);
    var w;
    var ew, wewz, wn;
    if (!z.isFinite()) return z;
    if (z===0) return z;
    if (z===1){
      //Split out this case because the asymptotic series blows up
      return OMEGA;
    }
    //Get an initial guess for Halley's method
    w=ExpantaNum.ln(z);
    //Halley's method; see 5.9 in [1]
    for (var i=0;i<100;++i){
      ew=ExpantaNum.exp(-w);
      wewz=w.sub(z.mul(ew));
      wn=w.sub(wewz.div(w.add(ExpantaNum.ONE).sub((w.add(2)).mul(wewz).div((ExpantaNum.mul(2,w).add(2))))));
      if (ExpantaNum.abs(wn.sub(w)).lt(ExpantaNum.abs(wn).mul(tol))) return wn;
      w = wn;
    }
    throw Error("Iteration failed to converge: "+z);
    //return Decimal.dNaN;
  };
  //The Lambert W function, also called the omega function or product logarithm, is the solution W(x) === x*e^x.
  //https://en.wikipedia.org/wiki/Lambert_W_function
  //Some special values, for testing: https://en.wikipedia.org/wiki/Lambert_W_function#Special_values
  P.lambertw=function (){
    var x=this.clone();
    if (x.isNaN()) return x;
    if (x.lt(-0.3678794411710499)) throw Error("lambertw is unimplemented for results less than -1, sorry!");
    if (x.gt(ExpantaNum.TETRATED_MAX_SAFE_INTEGER)) return x;
    if (x.gt(ExpantaNum.EE_MAX_SAFE_INTEGER)){
      x.operator(1,x.operator(1)-1);
      return x;
    }
    if (x.gt(ExpantaNum.MAX_SAFE_INTEGER)) return d_lambertw(x);
    else return new ExpantaNum(f_lambertw(x.sign*x.operator(0)));
  };
  Q.lambertw=function (x){
    return new ExpantaNum(x).lambertw();
  };
  //end break_eternity.js excerpt
  //Uses linear approximations for real height
  P.tetrate=P.tetr=function (other,payload){
    if (payload===undefined) payload=ExpantaNum.ONE;
    var t=this.clone();
    other=new ExpantaNum(other);
    payload=new ExpantaNum(payload);
    if (payload.neq(ExpantaNum.ONE)) other=other.add(payload.slog(t));
    if (ExpantaNum.debug>=ExpantaNum.NORMAL) console.log(t+"^^"+other);
    var negln;
    if (t.isNaN()||other.isNaN()||payload.isNaN()) return ExpantaNum.NaN.clone();
    if (other.isInfinite()&&other.sign>0){
      if (t.gte(Math.exp(1/Math.E))) return ExpantaNum.POSITIVE_INFINITY.clone();
      //Formula for infinite height power tower.
      negln = t.ln().neg();
      return negln.lambertw().div(negln);
    }
    if (other.lte(-2)) return ExpantaNum.NaN.clone();
    if (t.eq(ExpantaNum.ZERO)){
      if (other.eq(ExpantaNum.ZERO)) return ExpantaNum.NaN.clone();
      if (other.mod(2).eq(ExpantaNum.ZERO)) return ExpantaNum.ZERO.clone();
      return ExpantaNum.ONE.clone();
    }
    if (t.eq(ExpantaNum.ONE)){
      if (other.eq(ExpantaNum.ONE.neg())) return ExpantaNum.NaN.clone();
      return ExpantaNum.ONE.clone();
    }
    if (other.eq(ExpantaNum.ONE.neg())) return ExpantaNum.ZERO.clone();
    if (other.eq(ExpantaNum.ZERO)) return ExpantaNum.ONE.clone();
    if (other.eq(ExpantaNum.ONE)) return t;
    if (other.eq(2)) return t.pow(t);
    if (t.eq(2)){
      if (other.eq(3)) return new ExpantaNum(16);
      if (other.eq(4)) return new ExpantaNum(65536);
    }
    var m=t.max(other);
    if (m.gt("10^^^"+MAX_SAFE_INTEGER)) return m;
    if (m.gt(ExpantaNum.TETRATED_MAX_SAFE_INTEGER)||other.gt(ExpantaNum.MAX_SAFE_INTEGER)){
      if (this.lt(Math.exp(1/Math.E))){
        negln = t.ln().neg();
        return negln.lambertw().div(negln);
      }
      var j=t.slog(10).add(other);
      j.operator(2,(other.operator(2)||0)+1);
      j.standardize();
      return j;
    }
    var y=other.toNumber();
    var f=Math.floor(y);
    var r=t.pow(y-f);
    var l=ExpantaNum.NaN;
    for (var i=0,w=new ExpantaNum(ExpantaNum.E_MAX_SAFE_INTEGER);f!==0&&r.lt(w)&&i<100;++i){
      if (f>0){
        r=t.pow(r);
        if (l.eq(r)){
          f=0;
          break;
        }
        l=r;
        --f;
      }else{
        r=r.logBase(t);
        if (l.eq(r)){
          f=0;
          break;
        }
        l=r;
        ++f;
      }
    }
    if (i==100||this.lt(Math.exp(1/Math.E))) f=0;
    r.operator(1,(r.operator(1)+f)||f);
    r.standardize();
    return r;
  };
  Q.tetrate=Q.tetr=function (x,y,payload){
    return new ExpantaNum(x).tetr(y,payload);
  };
  //Implementation of functions from break_eternity.js
  P.iteratedexp=function (other,payload){
    return this.tetr(other,payload);
  };
  Q.iteratedexp=function (x,y,payload){
    return new ExpantaNum(x).iteratedexp(other,payload);
  };
  //This implementation is highly inaccurate and slow, and probably be given custom code
  P.iteratedlog=function (base,other){
    if (base===undefined) base=10;
    if (other===undefined) other=ExpantaNum.ONE.clone();
    var t=this.clone();
    if (other.eq(ExpantaNum.ZERO)) return t;
    if (other.eq(ExpantaNum.ONE)) return t.logBase(base);
    base=new ExpantaNum(base);
    other=new ExpantaNum(other);
    return base.tetr(t.slog(base).sub(other));
  };
  Q.iteratedlog=function (x,y,z){
    return new ExpantaNum(x).iteratedlog(y,z);
  };
  P.layeradd=function (other,base){
    if (base===undefined) base=10;
    if (other===undefined) other=ExpantaNum.ONE.clone();
    var t=this.clone();
    base=new ExpantaNum(base);
    other=new ExpantaNum(other);
    return base.tetr(t.slog(base).add(other));
  };
  Q.layeradd=function (x,y,z){
    return new ExpantaNum(x).layeradd(y,z);
  };
  P.layeradd10=function (other){
    return this.layeradd(other);
  };
  Q.layeradd10=function (x,y){
    return new ExpantaNum(x).layeradd10(y);
  };
  //End implementation from break_eternity.js
  //All of these are from Patashu's break_eternity.js
  //The super square-root function - what number, tetrated to height 2, equals this?
  //Other sroots are possible to calculate probably through guess and check methods, this one is easy though.
  //https://en.wikipedia.org/wiki/Tetration#Super-root
  P.ssqrt=P.ssrt=function (){
    var x=this.clone();
    if (x.lt(Math.exp(-1/Math.E))) return ExpantaNum.NaN.clone();
    if (!x.isFinite()) return x;
    if (x.gt(ExpantaNum.TETRATED_MAX_SAFE_INTEGER)) return x;
    if (x.gt(ExpantaNum.EE_MAX_SAFE_INTEGER)){
      x.operator(1,x.operator(1)-1);
      return x;
    }
    var l=x.ln();
    return l.div(l.lambertw());
  };
  Q.ssqrt=Q.ssrt=function (x){
    return new ExpantaNum(x).ssqrt();
  };
  //Super-logarithm, one of tetration's inverses, tells you what size power tower you'd have to tetrate base to to get number. By definition, will never be higher than 1.8e308 in break_eternity.js, since a power tower 1.8e308 numbers tall is the largest representable number.
  //Uses linear approximation
  //https://en.wikipedia.org/wiki/Super-logarithm
  P.slog=function (base){
    if (base===undefined) base=10;
    var x=new ExpantaNum(this);
    base=new ExpantaNum(base);
    if (x.isNaN()||base.isNaN()||x.isInfinite()&&base.isInfinite()) return ExpantaNum.NaN.clone();
    if (x.isInfinite()) return x;
    if (base.isInfinite()) return ExpantaNum.ZERO.clone();
    if (x.lt(ExpantaNum.ZERO)) return ExpantaNum.ONE.neg();
    if (x.eq(ExpantaNum.ONE)) return ExpantaNum.ZERO.clone();
    if (x.eq(base)) return ExpantaNum.ONE.clone();
    if (base.lt(Math.exp(1/Math.E))){
      var a=ExpantaNum.tetr(base,Infinity);
      if (x.eq(a)) return ExpantaNum.POSITIVE_INFINITY.clone();
      if (x.gt(a)) return ExpantaNum.NaN.clone();
    }
    if (x.max(base).gt("10^^^"+MAX_SAFE_INTEGER)){
      if (x.gt(base)) return x;
      return ExpantaNum.ZERO.clone();
    }
    if (x.max(base).gt(ExpantaNum.TETRATED_MAX_SAFE_INTEGER)){
      if (x.gt(base)){
        x.operator(2,x.operator(2)-1);
        x.standardize();
        return x.sub(x.operator(1));
      }
      return ExpantaNum.ZERO.clone();
    }
    var r=0;
    var t=(x.operator(1)||0)-(base.operator(1)||0);
    if (t>3){
      var l=t-3;
      r+=l;
      x.operator(1,x.operator(1)-l);
    }
    for (var i=0;i<100;++i){
      if (x.lt(ExpantaNum.ZERO)){
        x=ExpantaNum.pow(base,x);
        --r;
      }else if (x.lte(1)){
        return new ExpantaNum(r+x.toNumber()-1);
      }else{
        ++r;
        x=ExpantaNum.logBase(x,base);
      }
    }
    if (x.gt(10))
    return new ExpantaNum(r);
  };
  Q.slog=function (x,y){
    return new ExpantaNum(x).slog(y);
  };
  //end break_eternity.js excerpt
  P.pentate=P.pent=function (other){
    return this.arrow(3)(other);
  };
  Q.pentate=Q.pent=function (x,y){
    return ExpantaNum.arrow(x,3,y);
  };
  //Uses linear approximations for real height
  P.arrow=function (arrows){
    var t=this.clone();
    arrows=new ExpantaNum(arrows);
    if (!arrows.isint()||arrows.lt(ExpantaNum.ZERO)) return function(other){return ExpantaNum.NaN.clone();};
    if (arrows.eq(ExpantaNum.ZERO)) return function(other){return t.mul(other);};
    if (arrows.eq(ExpantaNum.ONE)) return function(other){return t.pow(other);};
    if (arrows.eq(2)) return function(other){return t.tetr(other);};
    return function (other){
      var depth;
      if (arguments.length==2) depth=arguments[1]; //must hide
      else depth=0;
      other=new ExpantaNum(other);
      var r;
      if (ExpantaNum.debug>=ExpantaNum.NORMAL) console.log(t+"{"+arrows+"}"+other);
    if (t.isNaN()||other.isNaN()) return ExpantaNum.NaN.clone();
      if (other.lt(ExpantaNum.ZERO)) return ExpantaNum.NaN.clone();
      if (t.eq(ExpantaNum.ZERO)){
        if (other.eq(ExpantaNum.ONE)) return ExpantaNum.ZERO.clone();
        return ExpantaNum.NaN.clone();
      }
      if (t.eq(ExpantaNum.ONE)) return ExpantaNum.ONE.clone();
      if (other.eq(ExpantaNum.ZERO)) return ExpantaNum.ONE.clone();
      if (other.eq(ExpantaNum.ONE)) return t.clone();
      if (arrows.gt(ExpantaNum.MAX_SAFE_INTEGER)){
        r=arrows.clone();
        r.layer++;
        return r;
      }
      if (other.eq(2)) return t.arrow(arrows-1)(t,depth+1);
      if (t.max(other).gt("10{"+arrows.add(ExpantaNum.ONE)+"}"+MAX_SAFE_INTEGER)) return t.max(other);
      if (t.gt("10{"+arrows+"}"+MAX_SAFE_INTEGER)||other.gt(ExpantaNum.MAX_SAFE_INTEGER)){
        if (t.gt("10{"+arrows+"}"+MAX_SAFE_INTEGER)){
          r=t.clone();
          r.operator(arrows,r.operator(arrows)-1);
          r.standardize();
        }else if (t.gt("10{"+arrows.sub(ExpantaNum.ONE)+"}"+MAX_SAFE_INTEGER)){
          r=new ExpantaNum(t.operator(arrows-1));
        }else{
          r=ExpantaNum.ZERO;
        }
        var j=r.add(other);
        j.operator(arrows,(other.operator(arrows)||0)+1);
        j.standardize();
        return j;
      }
      if (depth>=ExpantaNum.maxOps+10){
        return new ExpantaNum([[0,10],[Number(arrows),1]]);
      }
      var y=other.toNumber();
      var f=Math.floor(y);
      r=t.arrow(arrows.sub(1))(y-f,depth+1);
      for (var i=0,m=new ExpantaNum("10{"+arrows.sub(ExpantaNum.ONE)+"}"+MAX_SAFE_INTEGER);f!==0&&r.lt(m)&&i<100;++i){
        if (f>0){
          r=t.arrow(arrows.sub(ExpantaNum.ONE))(r,depth+1);
          --f;
        }
      }
      if (i==100) f=0;
      r.operator(Number(arrows.sub(ExpantaNum.ONE)),(r.operator(Number(arrows.sub(ExpantaNum.ONE)))+f)||f);
      r.standardize();
      return r;
    };
  };
  P.chain=function (other,arrows){
    return this.arrow(arrows)(other);
  };
  Q.arrow=function (x,z,y){
    return new ExpantaNum(x).arrow(z)(y);
  };
  Q.chain=function (x,y,z){
    return new ExpantaNum(x).arrow(z)(y);
  };
  Q.hyper=function (z){
    z=new ExpantaNum(z);
    if (z.eq(ExpantaNum.ZERO)) return function(x,y){return new ExpantaNum(y).eq(ExpantaNum.ZERO)?new ExpantaNum(x):new ExpantaNum(x).add(ExpantaNum.ONE);};
    if (z.eq(ExpantaNum.ONE)) return function(x,y){return ExpantaNum.add(x,y);};
    return function(x,y){return new ExpantaNum(x).arrow(z.sub(2))(y);};
  };
  P.expansion=function (other){
    var t=this.clone();
    other=new ExpantaNum(other);
    var r;
    if (ExpantaNum.debug>=ExpantaNum.NORMAL) console.log("{"+t+","+other+",1,2}");
    if (other.lte(ExpantaNum.ZERO)||!other.isint()) return ExpantaNum.NaN.clone();
    if (other.eq(ExpantaNum.ONE)) return t.clone();
    if (!t.isint()) return ExpantaNum.NaN.clone();
    if (t.eq(2)) return new ExpantaNum(4);
    if (other.gt(ExpantaNum.MAX_SAFE_INTEGER)) return ExpantaNum.POSITIVE_INFINITY.clone();
    var f=other.toNumber()-1;
    r=t;
    for (var i=0;f!==0&&r.lt(ExpantaNum.MAX_SAFE_INTEGER)&&i<100;++i){
      if (f>0){
        r=t.arrow(r)(t);
        --f;
      }
    }
    if (i==100) f=0;
    r.layer+=f;
    r.standardize();
    return r;
  };
  Q.expansion=function (x,y){
    return new ExpantaNum(x).expansion(y);
  };
  // All of these are from Patashu's break_eternity.js
  Q.affordGeometricSeries = function (resourcesAvailable, priceStart, priceRatio, currentOwned) {
    /*
      If you have resourcesAvailable, the price of something starts at
      priceStart, and on each purchase it gets multiplied by priceRatio,
      and you have already bought currentOwned, how many of the object
      can you buy.
    */
    resourcesAvailable=new ExpantaNum(resourcesAvailable);
    priceStart=new ExpantaNum(priceStart);
    priceRatio=new ExpantaNum(priceRatio);
    var actualStart = priceStart.mul(priceRatio.pow(currentOwned));
    return ExpantaNum.floor(resourcesAvailable.div(actualStart).mul(priceRatio.sub(ExpantaNum.ONE)).add(ExpantaNum.ONE).log10().div(priceRatio.log10()));
  };
  Q.affordArithmeticSeries = function (resourcesAvailable, priceStart, priceAdd, currentOwned) {
    /*
      If you have resourcesAvailable, the price of something starts at
      priceStart, and on each purchase it gets increased by priceAdd,
      and you have already bought currentOwned, how many of the object
      can you buy.
    */
    resourcesAvailable=new ExpantaNum(resourcesAvailable);
    priceStart=new ExpantaNum(priceStart);
    priceAdd=new ExpantaNum(priceAdd);
    currentOwned=new ExpantaNum(currentOwned);
    var actualStart = priceStart.add(currentOwned.mul(priceAdd));
    var b = actualStart.sub(priceAdd.div(2));
    var b2 = b.pow(2);
    return b.neg().add(b2.add(priceAdd.mul(resourcesAvailable).mul(2)).sqrt()).div(priceAdd).floor();
  };
  Q.sumGeometricSeries = function (numItems, priceStart, priceRatio, currentOwned) {
    /*
      If you want to buy numItems of something, the price of something starts at
      priceStart, and on each purchase it gets multiplied by priceRatio,
      and you have already bought currentOwned, what will be the price of numItems
      of something.
    */
    priceStart=new ExpantaNum(priceStart);
    priceRatio=new ExpantaNum(priceRatio);
    return priceStart.mul(priceRatio.pow(currentOwned)).mul(ExpantaNum.sub(ExpantaNum.ONE, priceRatio.pow(numItems))).div(ExpantaNum.sub(ExpantaNum.ONE, priceRatio));
  };
  Q.sumArithmeticSeries = function (numItems, priceStart, priceAdd, currentOwned) {
    /*
      If you want to buy numItems of something, the price of something starts at
      priceStart, and on each purchase it gets increased by priceAdd,
      and you have already bought currentOwned, what will be the price of numItems
      of something.
    */
    numItems=new ExpantaNum(numItems);
    priceStart=new ExpantaNum(priceStart);
    currentOwned=new ExpantaNum(currentOwned);
    var actualStart = priceStart.add(currentOwned.mul(priceAdd));

    return numItems.div(2).mul(actualStart.mul(2).plus(numItems.sub(ExpantaNum.ONE).mul(priceAdd)));
  };
  // Binomial Coefficients n choose k
  Q.choose = function (n, k) {
    /*
      If you have n items and you take k out,
      how many ways could you do this?
    */
    return new ExpantaNum(n).factorial().div(new ExpantaNum(k).factorial().mul(new ExpantaNum(n).sub(new ExpantaNum(k)).factorial()));
  };
  P.choose = function (other) {
    return ExpantaNum.choose(this, other);
  };
  //end break_eternity.js excerpt
  P.standardize=function (){
    var b;
    var x=this;
    if (ExpantaNum.debug>=ExpantaNum.ALL) console.log(x.toString());
    if (!x.array||!x.array.length) x.array=[[0,0]];
    if (x.sign!=1&&x.sign!=-1){
      if (typeof x.sign!="number") x.sign=Number(x.sign);
      x.sign=x.sign<0?-1:1;
    }
    if (x.layer>MAX_SAFE_INTEGER){
      x.array=[[0,Infinity]];
      x.layer=0;
      return x;
    }
    if (Number.isInteger(x.layer)) x.layer=Math.floor(x.layer);
    for (var i=0;i<x.array.length;++i){
      var e=x.array[i];
      if (e[0]===null||e[0]===undefined){
        e[0]=0;
      }
      if (e[0]!==0&&(e[1]===0||e[1]===null||e[1]===undefined)){
        x.array.splice(i,1);
        --i;
        continue;
      }
      if (isNaN(e[0])||isNaN(e[1])){
        x.array=[[0,NaN]];
        return x;
      }
      if (!isFinite(e[0])||!isFinite(e[1])){
        x.array=[[0,Infinity]];
        return x;
      }
      if (!Number.isInteger(e[0])) e[0]=Math.floor(e[0]);
      if (e[0]!==0&&!Number.isInteger(e[1])) e[1]=Math.floor(e[1]);
    }
    do{
      if (ExpantaNum.debug>=ExpantaNum.ALL) console.log(x.toString());
      b=false;
      x.array.sort(function (a,b){return a[0]>b[0]?1:a[0]<b[0]?-1:0;});
      if (x.array.length>ExpantaNum.maxOps) x.array.splice(0,x.array.length-ExpantaNum.maxOps);
      if (!x.array.length) x.array=[[0,0]];
      if (x.array[x.array.length-1][0]>MAX_SAFE_INTEGER){
        x.layer++;
        x.array=[[0,x.array[x.array.length-1][0]]];
        b=true;
      }else if (x.layer&&x.array.length==1&&x.array[0][0]===0){
        x.layer--;
        if (x.array[0][1]===0) x.array=[[0,10]];
        else x.array=[[0,10],[Math.round(x.array[0][1]),1]];
        b=true;
      }
      if (x.array.length<ExpantaNum.maxOps&&x.array[0][0]!==0) x.array.unshift([0,10]);
      for (i=0;i<x.array.length-1;++i){
        if (x.array[i][0]==x.array[i+1][0]){
          x.array[i][1]+=x.array[i+1][1];
          x.array.splice(i+1,1);
          --i;
          b=true;
        }
      }
      if (x.array[0][0]===0&&x.array[0][1]>MAX_SAFE_INTEGER){
        if (x.array.length>=2&&x.array[1][0]==1){
          x.array[1][1]++;
        }else{
          x.array.splice(1,0,[1,1]);
        }
        x.array[0][1]=Math.log10(x.array[0][1]);
        b=true;
      }
      while (x.array.length>=2&&x.array[0][0]===0&&x.array[0][1]<MAX_E&&x.array[1][0]==1&&x.array[1][1]){
        x.array[0][1]=Math.pow(10,x.array[0][1]);
        if (x.array[1][1]>1){
          x.array[1][1]--;
        }else{
          x.array.splice(1,1);
        }
        b=true;
      }
      while (x.array.length>=2&&x.array[0][0]===0&&x.array[0][1]==1&&x.array[1][1]){
        if (x.array[1][1]>1){
          x.array[1][1]--;
        }else{
          x.array.splice(1,1);
        }
        x.array[0][1]=10;
      }
      if (x.array.length>=2&&x.array[0][0]===0&&x.array[1][0]!=1){
        if (x.array[0][1]) x.array.splice(1,0,[x.array[1][0]-1,x.array[0][1]]);
        x.array[0][1]=1;
        if (x.array[2][1]>1){
          x.array[2][1]--;
        }else{
          x.array.splice(2,1);
        }
        b=true;
      }
      for (i=1;i<x.array.length;++i){
        if (x.array[i][1]>MAX_SAFE_INTEGER){
          if (i!=x.array.length-1&&x.array[i+1][0]==x.array[i][0]+1){
            x.array[i+1][1]++;
          }else{
            x.array.splice(i+1,0,[x.array[i][0]+1,1]);
          }
          if (x.array[0][0]===0){
            x.array[0][1]=x.array[i][1]+1;
          }else{
            x.splice(0,0,[0,x.array[i][1]+1]);
          }
          x.splice(1,i);
          b=true;
        }
      }
    }while(b);
    if (!x.array.length) x.array=[[0,0]];
    return x;
  };
  P.toNumber=function (){
    //console.log(this.array);
    if (this.sign==-1) return -1*this.abs();
    if (this.array.length>=2&&(this.array[1][0]>=2||this.array[1][1]>=2||this.array[1][1]==1&&this.array[0][1]>Math.log10(Number.MAX_VALUE))) return Infinity;
    if (this.array.length>=2&&this.array[1][1]==1) return Math.pow(10,this.array[0][1]);
    return this.array[0][1];
  };
  P.toString=function (){
    if (this.sign==-1) return "-"+this.abs();
    if (isNaN(this.array[0][1])) return "NaN";
    if (!isFinite(this.array[0][1])) return "Infinity";
    var s="";
    if (!this.layer) s+="";
    else if (this.layer<3) s+="J".repeat(this.layer);
    else s+="J^"+this.layer+" ";
    if (this.array.length>=3||this.array.length==2&&this.array[1][0]>=2){
      for (var i=this.array.length-1;i>=2;--i){
        var e=this.array[i];
        var q=e[0]>=5?"{"+e[0]+"}":"^".repeat(e[0]);
        if (e[1]>1) s+="(10"+q+")^"+e[1]+" ";
        else if (e[1]==1) s+="10"+q;
      }
    }
    var op0=this.operator(0);
    var op1=this.operator(1);
    if (!op1) s+=String(op0);
    else if (op1<3) s+="e".repeat(op1-1)+Math.pow(10,op0-Math.floor(op0))+"e"+Math.floor(op0);
    else if (op1<8) s+="e".repeat(op1)+op0;
    else s+="(10^)^"+op1+" "+op0;
    return s;
  };
  //from break_eternity.js
  var decimalPlaces=function decimalPlaces(value,places){
    var len=places+1;
    var numDigits=Math.ceil(Math.log10(Math.abs(value)));
    var rounded=Math.round(value*Math.pow(10,len-numDigits))*Math.pow(10,numDigits-len);
    return parseFloat(rounded.toFixed(Math.max(len-numDigits,0)));
  };
  P.toStringWithDecimalPlaces=function (places,applyToOpNums){
    if (this.sign==-1) return "-"+this.abs();
    if (isNaN(this.array[0][1])) return "NaN";
    if (!isFinite(this.array[0][1])) return "Infinity";
    var b=0;
    var s="";
    var m=Math.pow(10,places);
    if (!this.layer) s+="";
    else if (this.layer<3) s+="J".repeat(this.layer);
    else s+="J^"+this.layer+" ";
    if (this.array.length>=3||this.array.length==2&&this.array[1][0]>=2){
      for (var i=this.array.length-1;!b&&i>=2;--i){
        var e=this.array[i];
        var w=e[0];
        var x=e[1];
        if (applyToOpNums&&x>=m){
          ++w;
          b=x;
          x=1;
        }else if (applyToOpNums&&this.array[i-1][0]==w-1&&this.array[i-1][1]>=m){
          ++x;
          b=this.array[i-1][1];
        }
        var q=w>=5?"{"+w+"}":"^".repeat(w);
        if (x>1) s+="(10"+q+")^"+x+" ";
        else if (x==1) s+="10"+q;
      }
    }
    var k=this.operator(0);
    var l=this.operator(1);
    if (k>m){
      k=Math.log10(k);
      ++l;
    }
    if (b) s+=decimalPlaces(b,places);
    else if (!l) s+=String(decimalPlaces(k,places));
    else if (l<3) s+="e".repeat(l-1)+decimalPlaces(Math.pow(10,k-Math.floor(k)),places)+"e"+decimalPlaces(Math.floor(k),places);
    else if (l<8) s+="e".repeat(l)+decimalPlaces(k,places);
    else if (applyToOpNums) s+="(10^)^"+decimalPlaces(l,places)+" "+decimalPlaces(k,places);
    else s+="(10^)^"+l+" "+decimalPlaces(k,places);
    return s;
  };
  //these are from break_eternity.js as well
  P.toExponential=function (places,applyToOpNums){
    if (this.array.length==1) return (this.sign*this.array[0][1]).toExponential(places);
    return this.toStringWithDecimalPlaces(places,applyToOpNums);
  };
  P.toFixed=function (places,applyToOpNums){
    if (this.array.length==1) return (this.sign*this.array[0][1]).toFixed(places);
    return this.toStringWithDecimalPlaces(places,applyToOpNums);
  };
  P.toPrecision=function (places,applyToOpNums){
    if (this.array[0][1]===0) return (this.sign*this.array[0][1]).toFixed(places-1,applyToOpNums);
    if (this.array.length==1&&this.array[0][1]<1e-6) return this.toExponential(places-1,applyToOpNums);
    if (this.array.length==1&&places>Math.log10(this.array[0][1])) return this.toFixed(places-Math.floor(Math.log10(this.array[0][1]))-1,applyToOpNums);
    return this.toExponential(places-1,applyToOpNums);
  };
  P.valueOf=function (){
    return this.toString();
  };
  //Note: toArray() would be impossible without changing the layout of the array or lose the information about the sign
  P.toJSON=function (){
    if (ExpantaNum.serializeMode==ExpantaNum.JSON){
      var a=[];
      for (var i=0;i<this.array.length;++i) a.push([this.array[i][0],this.array[i][1]]);
      return {
        array:a,
        layer:this.layer,
        sign:this.sign
      };
    }else if (ExpantaNum.serializeMode==ExpantaNum.STRING){
      return this.toString();
    }
  };
  P.toHyperE=function (){
    if (this.layer) throw Error(expantaNumError+"Sorry, but this prototype doesn't support correct Hyper-E notation for numbers larger than 10{MSI}10");
    if (this.sign==-1) return "-"+this.abs().toHyperE();
    if (isNaN(this.array[0][1])) return "NaN";
    if (!isFinite(this.array[0][1])) return "Infinity";
    if (this.lt(ExpantaNum.MAX_SAFE_INTEGER)) return String(this.array[0][1]);
    if (this.lt(ExpantaNum.E_MAX_SAFE_INTEGER)) return "E"+this.array[0][1];
    var r="E"+this.operator(0)+"#"+this.operator(1);
    var l=1;
    for (var i=Math.ceil(this.getOperatorIndex(2));i<this.array.length;++i){
      if (l+1<this.array[i][0]) r+="#1".repeat(this.array[i][0]-l-1);
      l=this.array[i][0];
      r+="#"+(this.array[i][1]+1);
    }
    if (!this.layer) r=""+r;
    else if (this.layer<3) r="J".repeat(this.layer)+r;
    else r="J^"+this.layer+" "+r;
    return r;
  };
  Q.fromNumber=function (input){
    if (typeof input!="number") throw Error(invalidArgument+"Expected Number");
    var x=new ExpantaNum();
    x.array[0][1]=Math.abs(input);
    x.sign=input<0?-1:1;
    x.standardize();
    return x;
  };
  Q.fromString=function (input){
    if (typeof input!="string") throw Error(invalidArgument+"Expected String");
    var isJSON=false;
    if (typeof input=="string"&&(input[0]=="["||input[0]=="{")){
      try {
        JSON.parse(input);
      }finally{
        isJSON=true;
      }
    }
    if (isJSON){
      return ExpantaNum.fromJSON(input);
    }
    var x=new ExpantaNum();
    x.array=[[0,0]];
    if (!isExpantaNum.test(input)){
      console.warn(expantaNumError+"Malformed input: "+input);
      x.array=[[0,NaN]];
      return x;
    }
    var negateIt=false;
    if (input[0]=="-"||input[0]=="+"){
      var numSigns=input.search(/[^-\+]/);
      var signs=input.substring(0,numSigns);
      negateIt=signs.match(/-/g).length%2==1;
      input=input.substring(numSigns);
    }
    if (input=="NaN") x.array=[[0,NaN]];
    else if (input=="Infinity") x.array=[[0,Infinity]];
    else{
      var a,b,c,d,i;
      if (input[0]=="J"){
        if (input[1]=="^"){
          a=input.substring(2).search(/[^0-9]/)+2;
          x.layer=Number(input.substring(2,a));
          input=input.substring(a+1);
        }else{
          a=input.search(/[^J]/);
          x.layer=a;
          input=input.substring(a);
        }
      }
      while (input){
        if (/^\(?10[\^\{]/.test(input)){
          if (input[0]=="("){
            input=input.substring(1);
          }
          var arrows;
          if (input[2]=="^"){
            a=input.substring(2).search(/[^\^]/);
            arrows=a;
            b=a+2;
          }else{
            a=input.indexOf("}");
            arrows=Number(input.substring(3,a));
            b=a+1;
          }
          input=input.substring(b);
          if (input[0]==")"){
            a=input.indexOf(" ");
            c=Number(input.substring(2,a));
            input=input.substring(a+1);
          }else{
            c=1;
          }
          if (arrows==1){
            if (x.array.length>=2&&x.array[1][0]==1){
              x.array[1][1]+=c;
            }else{
              x.array.splice(1,0,[1,c]);
            }
          }else if (arrows==2){
            a=x.array.length>=2&&x.array[1][0]==1?x.array[1][1]:0;
            b=x.array[0][1];
            if (b>=1e10) ++a;
            if (b>=10) ++a;
            x.array[0][1]=a;
            if (x.array.length>=2&&x.array[1][0]==1) x.array.splice(1,1);
            d=x.getOperatorIndex(2);
            if (Number.isInteger(d)) x.array[d][1]+=c;
            else x.array.splice(Math.ceil(d),0,[2,c]);
          }else{
            a=x.operator(arrows-1);
            b=x.operator(arrows-2);
            if (b>=10) ++a;
            d=x.getOperatorIndex(arrows);
            x.array.splice(1,Math.ceil(d)-1);
            x.array[0][1]=a;
            if (Number.isInteger(d)) x.array[1][1]+=c;
            else x.array.splice(1,0,[arrows,c]);
          }
        }else{
          break;
        }
      }
      a=input.split(/[Ee]/);
      b=[x.array[0][1],0];
      c=1;
      for (i=a.length-1;i>=0;--i){
        if (a[i]) d=Number(a[i]);
        else d=1;
        //The things that are already there
        if (b[0]<MAX_E&&b[1]===0){
          b[0]=Math.pow(10,c*b[0]);
        }else if (c==-1){
          if (b[1]===0){
            b[0]=Math.pow(10,c*b[0]);
          }else if (b[1]==1&&b[0]<=Math.log10(Number.MAX_VALUE)){
            b[0]=Math.pow(10,c*Math.pow(10,b[0]));
          }else{
            b[0]=0;
          }
          b[1]=0;
        }else{
          b[1]++;
        }
        //Multiplying coefficient
        if (b[1]===0){
          b[0]*=Number(d);
        }else if (b[1]==1){
          b[0]+=Math.log10(Number(d));
        }else if (b[1]==2&&b[0]<MAX_E+Math.log10(Math.log10(Number(d)))){
          b[0]+=Math.log10(1+Math.pow(10,Math.log10(Math.log10(Number(d)))-b[0]));
        }
        //Carrying
        if (b[0]<MAX_E&&b[1]){
          b[0]=Math.pow(10,b[0]);
          b[1]--;
        }else if (b[0]>MAX_SAFE_INTEGER){
          b[0]=Math.log10(b[0]);
          b[1]++;
        }
      }
      x.array[0][1]=b[0];
      if (b[1]){
        if (x.array.length>=2&&x.array[1][0]==1) x.array[1][1]+=b[1];
        else x.array.splice(1,0,[1,b[1]]);
      }
    }
    if (negateIt) x.sign*=-1;
    x.standardize();
    return x;
  };
  Q.fromArray=function (input1,input2,input3){
    var array,layer,sign;
    if (input1 instanceof Array&&(input2===undefined||typeof input2=="number")&&(input3===undefined||typeof input3=="number")){
      array=input1;
      sign=input2;
      layer=input3||0;
    }else if (typeof input1=="number"&&input2 instanceof Array&&(input3===undefined||typeof input3=="number")){
      array=input2;
      sign=input1;
      layer=input3||0;
    }else if (typeof input1=="number"&&typeof input2=="number"&&input3 instanceof Array){
      array=input3;
      sign=input1;
      layer=input2;
    }else{
      throw Error(invalidArgument+"Expected an Array [and 1 or 2 Number]");
    }
    var x=new ExpantaNum();
    var i;
    if (!array.length) x.array=[[0,0]];
    else if (typeof array[0]=="number"){
      x.array=[];
      for (i=0;i<array.length;i++){
        if (typeof array[i]!="number") throw Error(invalidArgument+"Expected Array of Number");
        x.array.push([i,array[i]]);
      }
    }else if (array[0] instanceof Array){
      x.array=[];
      for (i=0;i<array.length;i++){
        if (!(array[i] instanceof Array)||typeof array[i][0]!="number"||typeof array[i][1]!="number") throw Error(invalidArgument+"Expected Array of pair of Number");
        x.array.push([array[i][0],array[i][1]]);
      }
    }else throw Error(invalidArgument+"Expected Array of Number or Array of pair of Number");
    if (sign) x.sign=Number(sign);
    else x.sign=1;
    x.standardize();
    return x;
  };
  Q.fromObject=function (input){
    if (typeof input!="object") throw Error(invalidArgument+"Expected Object");
    if (input===null) return ExpantaNum.ZERO.clone();
    if (input instanceof Array) return ExpantaNum.fromArray(input);
    if (input instanceof ExpantaNum) return new ExpantaNum(input);
    if (!(input.array instanceof Array)) throw Error(invalidArgument+"Expected that property 'array' exists");
    if (input.sign!==undefined&&typeof input.sign!="number") throw Error(invalidArgument+"Expected that property 'sign' is Number");
    if (input.layer!==undefined&&typeof input.layer!="number") throw Error(invalidArgument+"Expected that property 'layer' is Number");
    return ExpantaNum.fromArray(input.array,input.sign,input.layer);
    /*var x=new ExpantaNum();
    x.array=[];
    for (var i=0;i<input.array.length;i++) x.array.push([input.array[i][0],input.array[i][1]]);
    x.sign=Number(input.sign)||1;
    x.layer=Number(input.layer)||0;
    x.standardize();
    return x;*/
  };
  Q.fromJSON=function (input){
    if (typeof input=="object") return ExpantaNum.fromObject(parsedObject);
    if (typeof input!="string") throw Error(invalidArgument+"Expected String");
    var parsedObject,x;
    try{
      parsedObject=JSON.parse(input);
    }catch(e){
      parsedObject=null;
      throw e;
    }finally{
      x=ExpantaNum.fromObject(parsedObject);
    }
    parsedObject=null;
    return x;
  };
  Q.fromHyperE=function (input){
    if (typeof input!="string") throw Error(invalidArgument+"Expected String");
    var x=new ExpantaNum();
    x.array=[[0,0]];
    if (!/^[-\+]*(0|[1-9]\d*(\.\d*)?|Infinity|NaN|E[1-9]\d*(\.\d*)?(#[1-9]\d*)*)$/.test(input)){
      console.warn(expantaNumError+"Malformed input: "+input);
      x.array=[[0,NaN]];
      return x;
    }
    var negateIt=false;
    if (input[0]=="-"||input[0]=="+"){
      var numSigns=input.search(/[^-\+]/);
      var signs=input.substring(0,numSigns);
      negateIt=signs.match(/-/g).length%2===0;
      input=input.substring(numSigns);
    }
    if (input=="NaN") x.array=[[0,NaN]];
    else if (input=="Infinity") x.array=[[0,Infinity]];
    else if (input[0]!="E"){
      x.array[0][1]=Number(input);
    }else if (input.indexOf("#")==-1){
      x.array[0][1]=Number(input.substring(1));
      x.array[1]=[1,1];
    }else{
      var array=input.substring(1).split("#");
      for (var i=0;i<array.length;++i){
        var t=Number(array[i]);
        if (i>=2){
          --t;
        }
        x.array[i]=[i,t];
      }
    }
    if (negateIt) x.sign*=-1;
    x.standardize();
    return x;
  };
  P.getOperatorIndex=function (i){
    if (typeof i!="number") i=Number(i);
    if (!isFinite(i)) throw Error(invalidArgument+"Index out of range.");
    var a=this.array;
    var min=0,max=a.length-1;
    if (a[max][0]<i) return max+0.5;
    if (a[min][0]>i) return -0.5;
    while (min!=max){
      if (a[min][0]==i) return min;
      if (a[max][0]==i) return max;
      var mid=Math.floor((min+max)/2);
      if (min==mid||a[mid][0]==i){
        min=mid;
        break;
      }
      if (a[mid][0]<i) min=mid;
      if (a[mid][0]>i) max=mid;
    }
    return a[min][0]==i?min:min+0.5;
  };
  P.getOperator=function (i){
    if (typeof i!="number") i=Number(i);
    if (!isFinite(i)) throw Error(invalidArgument+"Index out of range.");
    var ai=this.getOperatorIndex(i);
    if (Number.isInteger(ai)) return this.array[ai][1];
    else return i===0?10:0;
  };
  P.setOperator=function (i,value){
    if (typeof i!="number") i=Number(i);
    if (!isFinite(i)) throw Error(invalidArgument+"Index out of range.");
    var ai=this.getOperatorIndex(i);
    if (Number.isInteger(ai)) this.array[ai][1]=value;
    else{
      ai=Math.ceil(ai);
      this.array.splice(ai,0,[i,value]);
    }
    this.standardize();
  };
  P.operator=function (i,value){
    if (value===undefined) return this.getOperator(i);
    else this.setOperator(i,value);
  };
  P.clone=function (){
    var temp=new ExpantaNum();
    var array=[];
    for (var i=0;i<this.array.length;++i) array.push([this.array[i][0],this.array[i][1]]);
    temp.array=array;
    temp.sign=this.sign;
    temp.layer=this.layer;
    return temp;
  };
  // ExpantaNum methods

  /*
   *  clone
   *  config/set
   */

  /*
   * Create and return a ExpantaNum constructor with the same configuration properties as this ExpantaNum constructor.
   *
   */
  function clone(obj) {
    var i, p, ps;
    function ExpantaNum(input,input2) {
      var x=this;
      if (!(x instanceof ExpantaNum)) return new ExpantaNum(input,input2);
      x.constructor=ExpantaNum;
      var parsedObject=null;
      if (typeof input=="string"&&(input[0]=="["||input[0]=="{")){
        try {
          parsedObject=JSON.parse(input);
        }catch(e){
          //lol just keep going
        }
      }
      var temp,temp2,temp3;
      if (typeof input=="number"&&!(input2 instanceof Array)){
        temp=ExpantaNum.fromNumber(input);
      }else if (parsedObject){
        temp=ExpantaNum.fromObject(parsedObject);
      }else if (typeof input=="string"&&input[0]=="E"){
        temp=ExpantaNum.fromHyperE(input);
      }else if (typeof input=="string"){
        temp=ExpantaNum.fromString(input);
      }else if (input instanceof Array||input2 instanceof Array){
        temp=ExpantaNum.fromArray(input,input2);
      }else if (input instanceof ExpantaNum){
        temp=[];
        for (var i=0;i<input.array.length;++i) temp.push([input.array[i][0],input.array[i][1]]);
        temp2=input.sign;
        temp3=input.layer;
      }else if (typeof input=="object"){
        temp=ExpantaNum.fromObject(input);
      }else{
        temp=[[0,NaN]];
        temp2=1;
        temp3=0;
      }
      if (typeof temp2=="undefined"){
        x.array=temp.array;
        x.sign=temp.sign;
        x.layer=temp.layer;
      }else{
        x.array=temp;
        x.sign=temp2;
        x.layer=temp3;
      }
      return x;
    }
    ExpantaNum.prototype = P;

    ExpantaNum.JSON = 0;
    ExpantaNum.STRING = 1;
    
    ExpantaNum.NONE = 0;
    ExpantaNum.NORMAL = 1;
    ExpantaNum.ALL = 2;

    ExpantaNum.clone=clone;
    ExpantaNum.config=ExpantaNum.set=config;
    
    //ExpantaNum=Object.assign(ExpantaNum,Q);
    for (var prop in Q){
      if (Q.hasOwnProperty(prop)){
        ExpantaNum[prop]=Q[prop];
      }
    }
    
    if (obj === void 0) obj = {};
    if (obj) {
      ps = ['maxOps', 'serializeMode', 'debug'];
      for (i = 0; i < ps.length;) if (!obj.hasOwnProperty(p = ps[i++])) obj[p] = this[p];
    }

    ExpantaNum.config(obj);
    
    return ExpantaNum;
  }

  function defineConstants(obj){
    for (var prop in R){
      if (R.hasOwnProperty(prop)){
        if (Object.defineProperty){
          Object.defineProperty(obj,prop,{
            configurable: false,
            enumerable: true,
            writable: false,
            value: new ExpantaNum(R[prop])
          });
        }else{
          obj[prop]=new ExpantaNum(R[prop]);
        }
      }
    }
    return obj;
  }

  /*
   * Configure global settings for a ExpantaNum constructor.
   *
   * `obj` is an object with one or more of the following properties,
   *
   *   precision  {number}
   *   rounding   {number}
   *   toExpNeg   {number}
   *   toExpPos   {number}
   *
   * E.g. ExpantaNum.config({ precision: 20, rounding: 4 })
   *
   */
  function config(obj){
    if (!obj||typeof obj!=='object') {
      throw Error(expantaNumError+'Object expected');
    }
    var i,p,v,
      ps = [
        'maxOps',1,Number.MAX_SAFE_INTEGER,
        'serializeMode',0,1,
        'debug',0,2
      ];
    for (i = 0; i < ps.length; i += 3) {
      if ((v = obj[p = ps[i]]) !== void 0) {
        if (Math.floor(v) === v && v >= ps[i + 1] && v <= ps[i + 2]) this[p] = v;
        else throw Error(invalidArgument + p + ': ' + v);
      }
    }

    return this;
  }


  // Create and configure initial ExpantaNum constructor.
  ExpantaNum=clone(ExpantaNum);

  ExpantaNum=defineConstants(ExpantaNum);

  ExpantaNum['default']=ExpantaNum.ExpantaNum=ExpantaNum;

  // Export.

  // AMD.
  if (typeof define == 'function' && define.amd) {
    define(function () {
      return ExpantaNum;
    });
  // Node and other environments that support module.exports.
  } else if (typeof module != 'undefined' && module.exports) {
    module.exports = ExpantaNum;
    // Browser.
  } else {
    if (!globalScope) {
      globalScope = typeof self != 'undefined' && self && self.self == self
        ? self : Function('return this')();
    }
    globalScope.ExpantaNum = ExpantaNum;
  }
})(this);
      return string;
    }

    var result    = String(string);
    var targetLen = typeof maxLength === 'number'
      ? maxLength
      : parseInt(maxLength, 10);

    if (isNaN(targetLen) || !isFinite(targetLen)) {
      return result;
    }


    var length = result.length;
    if (length >= targetLen) {
      return result;
    }


    var filled = fillString === null ? '' : String(fillString);
    if (filled === '') {
      filled = ' ';
    }


    var fillLen = targetLen - length;

    while (filled.length < fillLen) {
      filled += filled;
    }

    var truncated = filled.length > fillLen ? filled.substr(0, fillLen) : filled;

    return result + truncated;
  };

  var MAX_SIGNIFICANT_DIGITS = 17; //Maximum number of digits of precision to assume in Number

  var EXP_LIMIT = 9e15; //If we're ABOVE this value, increase a layer. (9e15 is close to the largest integer that can fit in a Number.)
  
  var LAYER_DOWN = Math.log10(9e15); //If we're BELOW this value, drop down a layer. About 15.954.
  
  var FIRST_NEG_LAYER = 1/9e15; //At layer 0, smaller non-zero numbers than this become layer 1 numbers with negative mag. After that the pattern continues as normal.

  var NUMBER_EXP_MAX = 308; //The largest exponent that can appear in a Number, though not all mantissas are valid here.

  var NUMBER_EXP_MIN = -324; //The smallest exponent that can appear in a Number, though not all mantissas are valid here.
  
  var MAX_ES_IN_A_ROW = 5; //For default toString behaviour, when to swap from eee... to (e^n) syntax.

  var powerOf10 = function () {
    // We need this lookup table because Math.pow(10, exponent)
    // when exponent's absolute value is large is slightly inaccurate.
    // You can fix it with the power of math... or just make a lookup table.
    // Faster AND simpler
    var powersOf10 = [];

    for (var i = NUMBER_EXP_MIN + 1; i <= NUMBER_EXP_MAX; i++) {
      powersOf10.push(Number("1e" + i));
    }

    var indexOf0InPowersOf10 = 323;
    return function (power) {
      return powersOf10[power + indexOf0InPowersOf10];
    };
  }();

  var D = function D(value) {
    return Decimal.fromValue_noAlloc(value);
  };

  var FC = function FC(sign, layer, mag) {
    return Decimal.fromComponents(sign, layer, mag);
  };

  var FC_NN = function FC_NN(sign, layer, mag) {
    return Decimal.fromComponents_noNormalize(sign, layer, mag);
  };
  
  var ME = function ME(mantissa, exponent) {
    return Decimal.fromMantissaExponent(mantissa, exponent);
  };

  var ME_NN = function ME_NN(mantissa, exponent) {
    return Decimal.fromMantissaExponent_noNormalize(mantissa, exponent);
  };
  
  var decimalPlaces = function decimalPlaces(value, places) {
    var len = places + 1;
    var numDigits = Math.ceil(Math.log10(Math.abs(value)));
    var rounded = Math.round(value * Math.pow(10, len - numDigits)) * Math.pow(10, numDigits - len);
    return parseFloat(rounded.toFixed(Math.max(len - numDigits, 0)));
  };
  
  var f_maglog10 = function(n) {
    return Math.sign(n)*Math.log10(Math.abs(n));
  }
  
  //from HyperCalc source code
  var f_gamma = function(n) {
    if (!isFinite(n)) { return n; }
    if (n < -50)
    {
      if (n === Math.trunc(n)) { return Number.NEGATIVE_INFINITY; }
      return 0;
    }
    
    var scal1 = 1;
    while (n < 10)
    {
      scal1 = scal1*n;
      ++n;
    }
    
    n -= 1;
    var l = 0.9189385332046727; //0.5*Math.log(2*Math.PI)
    l = l + (n+0.5)*Math.log(n);
    l = l - n;
    var n2 = n*n;
    var np = n;
    l = l+1/(12*np);
    np = np*n2;
    l = l+1/(360*np);
    np = np*n2;
    l = l+1/(1260*np);
    np = np*n2;
    l = l+1/(1680*np);
    np = np*n2;
    l = l+1/(1188*np);
    np = np*n2;
    l = l+691/(360360*np);
    np = np*n2;
    l = l+7/(1092*np);
    np = np*n2;
    l = l+3617/(122400*np);

    return Math.exp(l)/scal1;
  };
  
  var twopi = 6.2831853071795864769252842;  // 2*pi
  var EXPN1 = 0.36787944117144232159553;  // exp(-1)
  var OMEGA = 0.56714329040978387299997;  // W(1, 0)
  //from https://math.stackexchange.com/a/465183
  // The evaluation can become inaccurate very close to the branch point
  var f_lambertw = function(z, tol = 1e-10) {
    var w;
    var wn;

    if (!Number.isFinite(z)) { return z; }
    if (z === 0)
    {
      return z;
    }
    if (z === 1)
    {
      return OMEGA;
    }

    if (z < 10)
    {
      w = 0;
    }
    else
    {
      w = Math.log(z)-Math.log(Math.log(z));
    }

    for (var i = 0; i < 100; ++i)
    {
      wn = (z * Math.exp(-w) + w * w)/(w + 1);
      if (Math.abs(wn - w) < tol*Math.abs(wn))
      {
        return wn;
      }
      else
      {
        w = wn;
      }
    }

    throw Error("Iteration failed to converge: " + z);
    //return Number.NaN;
  }
  
  var Decimal =
  /** @class */
  function () {
  
    function Decimal(value) {
      
      this.sign = Number.NaN;
      this.layer = Number.NaN;
      this.mag = Number.NaN;

      if (value instanceof Decimal) {
        this.fromDecimal(value);
      } else if (typeof value === "number") {
        this.fromNumber(value);
      } else if (typeof value === "string") {
        this.fromString(value);
      } else {
        this.sign = 0;
        this.layer = 0;
        this.mag = 0;
      }
    }

    Object.defineProperty(Decimal.prototype, "m", {
      get: function get() {
        if (this.sign === 0)
        {
          return 0;
        }
        else if (this.layer === 0)
        {
          var exp = Math.floor(Math.log10(this.mag));
          //handle special case 5e-324
          var man;
          if (this.mag === 5e-324)
          {
            man = 5;
          }
          else
          {
            man = this.mag / powerOf10(exp);
          }
          return this.sign*man;
        }
        else if (this.layer === 1)
        {
          var residue = this.mag-Math.floor(this.mag);
          return this.sign*Math.pow(10, residue);
        }
        else
        {
          //mantissa stops being relevant past 1e9e15 / ee15.954
          return this.sign;
        }
      },
      set: function set(value) {
        if (this.layer <= 2)
        {
          this.fromMantissaExponent(value, this.e);
        }
        else
        {
          //don't even pretend mantissa is meaningful
          this.sign = Math.sign(value);
          if (this.sign === 0) { this.layer === 0; this.exponent === 0; }
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Decimal.prototype, "e", {
      get: function get() {
        if (this.sign === 0)
        {
          return 0;
        }
        else if (this.layer === 0)
        {
          return Math.floor(Math.log10(this.mag));
        }
        else if (this.layer === 1)
        {
          return Math.floor(this.mag);
        }
        else if (this.layer === 2)
        {
          return Math.floor(Math.sign(this.mag)*Math.pow(10, Math.abs(this.mag)));
        }
        else
        {
          return this.mag*Number.POSITIVE_INFINITY;
        }
      },
      set: function set(value) {
        this.fromMantissaExponent(this.m, value);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Decimal.prototype, "s", {
      get: function get() {
        return this.sign;
      },
      set: function set(value) {
        if (value === 0) {
          this.sign = 0;
          this.layer = 0;
          this.mag = 0;
        }
        else
        {
          this.sign = value;
        }
      },
      enumerable: true,
      configurable: true
    });
    
    Object.defineProperty(Decimal.prototype, "mantissa", {
      get: function get() {
        return this.m;
      },
      set: function set(value) {
        this.m = value;
      },
      enumerable: true,
      configurable: true
    });

    Object.defineProperty(Decimal.prototype, "exponent", {
      get: function get() {
        return this.e;
      },
      set: function set(value) {
        this.e = value;
      },
      enumerable: true,
      configurable: true
    });

    Decimal.fromComponents = function (sign, layer, mag) {
      return new Decimal().fromComponents(sign, layer, mag);
    };

    Decimal.fromComponents_noNormalize = function (sign, layer, mag) {
      return new Decimal().fromComponents_noNormalize(sign, layer, mag);
    };
    
    Decimal.fromMantissaExponent = function (mantissa, exponent) {
      return new Decimal().fromMantissaExponent(mantissa, exponent);
    };

    Decimal.fromMantissaExponent_noNormalize = function (mantissa, exponent) {
      return new Decimal().fromMantissaExponent_noNormalize(mantissa, exponent);
    };
    
    Decimal.fromDecimal = function (value) {
      return new Decimal().fromDecimal(value);
    };

    Decimal.fromNumber = function (value) {
      return new Decimal().fromNumber(value);
    };

    Decimal.fromString = function (value) {
      return new Decimal().fromString(value);
    };

    Decimal.fromValue = function (value) {
      return new Decimal().fromValue(value);
    };

    Decimal.fromValue_noAlloc = function (value) {
      return value instanceof Decimal ? value : new Decimal(value);
    };
    
    Decimal.abs = function (value) {
      return D(value).abs();
    };

    Decimal.neg = function (value) {
      return D(value).neg();
    };

    Decimal.negate = function (value) {
      return D(value).neg();
    };

    Decimal.negated = function (value) {
      return D(value).neg();
    };

    Decimal.sign = function (value) {
      return D(value).sign();
    };

    Decimal.sgn = function (value) {
      return D(value).sign();
    };

    Decimal.round = function (value) {
      return D(value).round();
    };

    Decimal.floor = function (value) {
      return D(value).floor();
    };

    Decimal.ceil = function (value) {
      return D(value).ceil();
    };

    Decimal.trunc = function (value) {
      return D(value).trunc();
    };

    Decimal.add = function (value, other) {
      return D(value).add(other);
    };

    Decimal.plus = function (value, other) {
      return D(value).add(other);
    };

    Decimal.sub = function (value, other) {
      return D(value).sub(other);
    };

    Decimal.subtract = function (value, other) {
      return D(value).sub(other);
    };

    Decimal.minus = function (value, other) {
      return D(value).sub(other);
    };

    Decimal.mul = function (value, other) {
      return D(value).mul(other);
    };

    Decimal.multiply = function (value, other) {
      return D(value).mul(other);
    };

    Decimal.times = function (value, other) {
      return D(value).mul(other);
    };

    Decimal.div = function (value, other) {
      return D(value).div(other);
    };

    Decimal.divide = function (value, other) {
      return D(value).div(other);
    };

    Decimal.recip = function (value) {
      return D(value).recip();
    };

    Decimal.reciprocal = function (value) {
      return D(value).recip();
    };

    Decimal.reciprocate = function (value) {
      return D(value).reciprocate();
    };

    Decimal.cmp = function (value, other) {
      return D(value).cmp(other);
    };

	Decimal.cmpabs = function (value, other) {
      return D(value).cmpabs(other);
    };
	
    Decimal.compare = function (value, other) {
      return D(value).cmp(other);
    };

    Decimal.eq = function (value, other) {
      return D(value).eq(other);
    };

    Decimal.equals = function (value, other) {
      return D(value).eq(other);
    };

    Decimal.neq = function (value, other) {
      return D(value).neq(other);
    };

    Decimal.notEquals = function (value, other) {
      return D(value).notEquals(other);
    };

    Decimal.lt = function (value, other) {
      return D(value).lt(other);
    };

    Decimal.lte = function (value, other) {
      return D(value).lte(other);
    };

    Decimal.gt = function (value, other) {
      return D(value).gt(other);
    };

    Decimal.gte = function (value, other) {
      return D(value).gte(other);
    };

    Decimal.max = function (value, other) {
      return D(value).max(other);
    };
    
    Decimal.min = function (value, other) {
      return D(value).min(other);
    };

    Decimal.minabs = function (value, other) {
      return D(value).minabs(other);
    };
	
    Decimal.maxabs = function (value, other) {
      return D(value).maxabs(other);
    };
    
    Decimal.clamp = function(value, min, max) {
      return D(value).clamp(min, max);
    }
    
    Decimal.clampMin = function(value, min) {
      return D(value).clampMin(min);
    }
    
    Decimal.clampMax = function(value, max) {
      return D(value).clampMax(max);
    }

    Decimal.cmp_tolerance = function (value, other, tolerance) {
      return D(value).cmp_tolerance(other, tolerance);
    };

    Decimal.compare_tolerance = function (value, other, tolerance) {
      return D(value).cmp_tolerance(other, tolerance);
    };

    Decimal.eq_tolerance = function (value, other, tolerance) {
      return D(value).eq_tolerance(other, tolerance);
    };

    Decimal.equals_tolerance = function (value, other, tolerance) {
      return D(value).eq_tolerance(other, tolerance);
    };

    Decimal.neq_tolerance = function (value, other, tolerance) {
      return D(value).neq_tolerance(other, tolerance);
    };

    Decimal.notEquals_tolerance = function (value, other, tolerance) {
      return D(value).notEquals_tolerance(other, tolerance);
    };

    Decimal.lt_tolerance = function (value, other, tolerance) {
      return D(value).lt_tolerance(other, tolerance);
    };

    Decimal.lte_tolerance = function (value, other, tolerance) {
      return D(value).lte_tolerance(other, tolerance);
    };

    Decimal.gt_tolerance = function (value, other, tolerance) {
      return D(value).gt_tolerance(other, tolerance);
    };

    Decimal.gte_tolerance = function (value, other, tolerance) {
      return D(value).gte_tolerance(other, tolerance);
    };

    Decimal.pLog10 = function (value) {
      return D(value).pLog10();
    };
    
    Decimal.absLog10 = function (value) {
      return D(value).absLog10();
    };
    
    Decimal.log10 = function (value) {
      return D(value).log10();
    };

    Decimal.log = function (value, base) {
      return D(value).log(base);
    };

    Decimal.log2 = function (value) {
      return D(value).log2();
    };

    Decimal.ln = function (value) {
      return D(value).ln();
    };

    Decimal.logarithm = function (value, base) {
      return D(value).logarithm(base);
    };

    Decimal.pow = function (value, other) {
      return D(value).pow(other);
    };
    
    Decimal.pow10 = function (value) {
      return D(value).pow10();
    };
    
    Decimal.root = function (value, other) {
      return D(value).root(other);
    };
    
    Decimal.factorial = function (value, other) {
      return D(value).factorial();
    };
    
    Decimal.gamma = function (value, other) {
      return D(value).gamma();
    };
    
    Decimal.lngamma = function (value, other) {
      return D(value).lngamma();
    };

    Decimal.exp = function (value) {
      return D(value).exp();
    };

    Decimal.sqr = function (value) {
      return D(value).sqr();
    };

    Decimal.sqrt = function (value) {
      return D(value).sqrt();
    };

    Decimal.cube = function (value) {
      return D(value).cube();
    };

    Decimal.cbrt = function (value) {
      return D(value).cbrt();
    };
    
    Decimal.tetrate = function (value, height = 2, payload = FC_NN(1, 0, 1)) {
      return D(value).tetrate(height, payload);
    }
    
    Decimal.iteratedexp = function (value, height = 2, payload = FC_NN(1, 0, 1)) {
      return D(value).iteratedexp(height, payload);
    }
    
    Decimal.iteratedlog = function (value, base = 10, times = 1) {
      return D(value).iteratedlog(base, times);
    }
    
    Decimal.layeradd10 = function (value, diff) {
      return D(value).layeradd10(diff);
    }
    
     Decimal.layeradd = function (value, diff, base = 10) {
      return D(value).layeradd(diff, base);
    }
    
    Decimal.slog = function (value, base = 10) {
      return D(value).slog(base);
    }
    
    Decimal.lambertw = function(value) {
      return D(value).lambertw();
    }
    
    Decimal.ssqrt = function(value) {
      return D(value).ssqrt();
    }
    
    Decimal.pentate = function (value, height = 2, payload = FC_NN(1, 0, 1)) {
      return D(value).pentate(height, payload);
    }
    
    /**
     * If you're willing to spend 'resourcesAvailable' and want to buy something
     * with exponentially increasing cost each purchase (start at priceStart,
     * multiply by priceRatio, already own currentOwned), how much of it can you buy?
     * Adapted from Trimps source code.
     */


    Decimal.affordGeometricSeries = function (resourcesAvailable, priceStart, priceRatio, currentOwned) {
      return this.affordGeometricSeries_core(D(resourcesAvailable), D(priceStart), D(priceRatio), currentOwned);
    };
    /**
     * How much resource would it cost to buy (numItems) items if you already have currentOwned,
     * the initial price is priceStart and it multiplies by priceRatio each purchase?
     */


    Decimal.sumGeometricSeries = function (numItems, priceStart, priceRatio, currentOwned) {
      return this.sumGeometricSeries_core(numItems, D(priceStart), D(priceRatio), currentOwned);
    };
    /**
     * If you're willing to spend 'resourcesAvailable' and want to buy something with additively
     * increasing cost each purchase (start at priceStart, add by priceAdd, already own currentOwned),
     * how much of it can you buy?
     */


    Decimal.affordArithmeticSeries = function (resourcesAvailable, priceStart, priceAdd, currentOwned) {
      return this.affordArithmeticSeries_core(D(resourcesAvailable), D(priceStart), D(priceAdd), D(currentOwned));
    };
    /**
     * How much resource would it cost to buy (numItems) items if you already have currentOwned,
     * the initial price is priceStart and it adds priceAdd each purchase?
     * Adapted from http://www.mathwords.com/a/arithmetic_series.htm
     */


    Decimal.sumArithmeticSeries = function (numItems, priceStart, priceAdd, currentOwned) {
      return this.sumArithmeticSeries_core(D(numItems), D(priceStart), D(priceAdd), D(currentOwned));
    };
    /**
     * When comparing two purchases that cost (resource) and increase your resource/sec by (deltaRpS),
     * the lowest efficiency score is the better one to purchase.
     * From Frozen Cookies:
     * http://cookieclicker.wikia.com/wiki/Frozen_Cookies_(JavaScript_Add-on)#Efficiency.3F_What.27s_that.3F
     */


    Decimal.efficiencyOfPurchase = function (cost, currentRpS, deltaRpS) {
      return this.efficiencyOfPurchase_core(D(cost), D(currentRpS), D(deltaRpS));
    };

    Decimal.randomDecimalForTesting = function (maxLayers) {
      // NOTE: This doesn't follow any kind of sane random distribution, so use this for testing purposes only.
      //5% of the time, return 0
      if (Math.random() * 20 < 1) {
        return FC_NN(0, 0, 0);
      }
      
      var randomsign = Math.random() > 0.5 ? 1 : -1;
      
      //5% of the time, return 1 or -1
      if (Math.random() * 20 < 1) {
        return FC_NN(randomsign, 0, 1);
      }
      
      //pick a random layer
      var layer = Math.floor(Math.random()*(maxLayers+1));

      var randomexp = layer === 0 ? Math.random()*616-308 : Math.random()*16;
      //10% of the time, make it a simple power of 10
      if (Math.random() > 0.9) { randomexp = Math.trunc(randomexp); }
      var randommag = Math.pow(10, randomexp);
      //10% of the time, trunc mag
      if (Math.random() > 0.9) { randommag = Math.trunc(randommag); }
      return FC(randomsign, layer, randommag);
    };

    Decimal.affordGeometricSeries_core = function (resourcesAvailable, priceStart, priceRatio, currentOwned) {
      var actualStart = priceStart.mul(priceRatio.pow(currentOwned));
      return Decimal.floor(resourcesAvailable.div(actualStart).mul(priceRatio.sub(1)).add(1).log10().div(priceRatio.log10()));
    };

    Decimal.sumGeometricSeries_core = function (numItems, priceStart, priceRatio, currentOwned) {
      return priceStart.mul(priceRatio.pow(currentOwned)).mul(Decimal.sub(1, priceRatio.pow(numItems))).div(Decimal.sub(1, priceRatio));
    };

    Decimal.affordArithmeticSeries_core = function (resourcesAvailable, priceStart, priceAdd, currentOwned) {
      // n = (-(a-d/2) + sqrt((a-d/2)^2+2dS))/d
      // where a is actualStart, d is priceAdd and S is resourcesAvailable
      // then floor it and you're done!
      var actualStart = priceStart.add(currentOwned.mul(priceAdd));
      var b = actualStart.sub(priceAdd.div(2));
      var b2 = b.pow(2);
      return b.neg().add(b2.add(priceAdd.mul(resourcesAvailable).mul(2)).sqrt()).div(priceAdd).floor();
    };

    Decimal.sumArithmeticSeries_core = function (numItems, priceStart, priceAdd, currentOwned) {
      var actualStart = priceStart.add(currentOwned.mul(priceAdd)); // (n/2)*(2*a+(n-1)*d)

      return numItems.div(2).mul(actualStart.mul(2).plus(numItems.sub(1).mul(priceAdd)));
    };

    Decimal.efficiencyOfPurchase_core = function (cost, currentRpS, deltaRpS) {
      return cost.div(currentRpS).add(cost.div(deltaRpS));
    };
    
    Decimal.prototype.normalize = function () {
      /*
      PSEUDOCODE:
      Whenever we are partially 0 (sign is 0 or mag and layer is 0), make it fully 0.
      Whenever we are at or hit layer 0, extract sign from negative mag.
      If layer === 0 and mag < FIRST_NEG_LAYER (1/9e15), shift to 'first negative layer' (add layer, log10 mag).
      While abs(mag) > EXP_LIMIT (9e15), layer += 1, mag = maglog10(mag).
      While abs(mag) < LAYER_DOWN (15.954) and layer > 0, layer -= 1, mag = pow(10, mag).
      
      When we're done, all of the following should be true OR one of the numbers is not IsFinite OR layer is not IsInteger (error state):
      Any 0 is totally zero (0, 0, 0).
      Anything layer 0 has mag 0 OR mag > 1/9e15 and < 9e15.
      Anything layer 1 or higher has abs(mag) >= 15.954 and < 9e15.
      We will assume in calculations that all Decimals are either erroneous or satisfy these criteria. (Otherwise: Garbage in, garbage out.)
      */
      if (this.sign === 0 || (this.mag === 0 && this.layer === 0))
      {
        this.sign = 0;
        this.mag = 0;
        this.layer = 0;
        return this;
      }
      
      if (this.layer === 0 && this.mag < 0)
      {
        //extract sign from negative mag at layer 0
        this.mag = -this.mag;
        this.sign = -this.sign;
      }
      
      //Handle shifting from layer 0 to negative layers.
      if (this.layer === 0 && this.mag < FIRST_NEG_LAYER)
      {
        this.layer += 1;
        this.mag = Math.log10(this.mag);
        return this;
      }
      
      var absmag = Math.abs(this.mag);
      var signmag = Math.sign(this.mag);
      
      if (absmag >= EXP_LIMIT)
      {
        this.layer += 1;
        this.mag = signmag*Math.log10(absmag);
        return this;
      }
      else
      {
        while (absmag < LAYER_DOWN && this.layer > 0)
        {
          this.layer -= 1;
          if (this.layer === 0)
          {
            this.mag = Math.pow(10, this.mag);
          }
          else
          {
            this.mag = signmag*Math.pow(10, absmag);
            absmag = Math.abs(this.mag);
            signmag = Math.sign(this.mag);
          }
        }
        if (this.layer === 0)
        {
          if (this.mag < 0)
          {
            //extract sign from negative mag at layer 0
            this.mag = -this.mag;
            this.sign = -this.sign;
          }
          else if (this.mag === 0)
          {
            //excessive rounding can give us all zeroes
            this.sign = 0;
          }
        }
      }

      return this;
    };

    Decimal.prototype.fromComponents = function (sign, layer, mag) {
      this.sign = sign;
      this.layer = layer;
      this.mag = mag;

      this.normalize();
      return this;
    };

    Decimal.prototype.fromComponents_noNormalize = function (sign, layer, mag) {
      this.sign = sign;
      this.layer = layer;
      this.mag = mag;
      return this;
    };
    
    Decimal.prototype.fromMantissaExponent = function (mantissa, exponent) {
      this.layer = 1;
      this.sign = Math.sign(mantissa);
      mantissa = Math.abs(mantissa);
      this.mag = exponent + Math.log10(mantissa);

      this.normalize();
      return this;
    };


    Decimal.prototype.fromMantissaExponent_noNormalize = function (mantissa, exponent) {
      //The idea of 'normalizing' a break_infinity.js style Decimal doesn't really apply. So just do the same thing.
      this.fromMantissaExponent(mantissa, exponent);
      return this;
    };

    Decimal.prototype.fromDecimal = function (value) {
      this.sign = value.sign;
      this.layer = value.layer;
      this.mag = value.mag;
      return this;
    };

    Decimal.prototype.fromNumber = function (value) {
      this.mag = Math.abs(value);
      this.sign = Math.sign(value);
      this.layer = 0;
      this.normalize();
      return this;
    };

    var IGNORE_COMMAS = true;
    var COMMAS_ARE_DECIMAL_POINTS = false;
    
    Decimal.prototype.fromString = function (value) {
      if (IGNORE_COMMAS) { value = value.replace(",", ""); }
      else if (COMMAS_ARE_DECIMAL_POINTS) { value = value.replace(",", "."); }
    
      //Handle x^^^y format.
      var pentationparts = value.split("^^^");
      if (pentationparts.length === 2)
      {
        var base = parseFloat(pentationparts[0]);
        var height = parseFloat(pentationparts[1]);
        var payload = 1;
        var heightparts = pentationparts[1].split(";");
        if (heightparts.length === 2)
        {
          var payload = parseFloat(heightparts[1]);
          if (!isFinite(payload)) { payload = 1; }
        }
        if (isFinite(base) && isFinite(height))
        {
          var result = Decimal.pentate(base, height, payload);
          this.sign = result.sign;
          this.layer = result.layer;
          this.mag = result.mag;
          return this;
        }
      }
    
      //Handle x^^y format.
      var tetrationparts = value.split("^^");
      if (tetrationparts.length === 2)
      {
        var base = parseFloat(tetrationparts[0]);
        var height = parseFloat(tetrationparts[1]);
        var heightparts = tetrationparts[1].split(";");
        if (heightparts.length === 2)
        {
          var payload = parseFloat(heightparts[1]);
          if (!isFinite(payload)) { payload = 1; }
        }
        if (isFinite(base) && isFinite(height))
        {
          var result = Decimal.tetrate(base, height, payload);
          this.sign = result.sign;
          this.layer = result.layer;
          this.mag = result.mag;
          return this;
        }
      }
      
      //Handle x^y format.
      var powparts = value.split("^");
      if (powparts.length === 2)
      {
        var base = parseFloat(powparts[0]);
        var exponent = parseFloat(powparts[1]);
        if (isFinite(base) && isFinite(exponent))
        {
          var result = Decimal.pow(base, exponent);
          this.sign = result.sign;
          this.layer = result.layer;
          this.mag = result.mag;
          return this;
        }
      }
      
      //Handle various cases involving it being a Big Number.
      value = value.trim().toLowerCase();
      
      //handle X PT Y format.
      var ptparts = value.split("pt");
      if (ptparts.length === 2)
      {
        base = 10;
        height = parseFloat(ptparts[0]);
        ptparts[1] = ptparts[1].replace("(", "");
        ptparts[1] = ptparts[1].replace(")", "");
        var payload = parseFloat(ptparts[1]);
        if (!isFinite(payload)) { payload = 1; }
        if (isFinite(base) && isFinite(height))
        {
          var result = Decimal.tetrate(base, height, payload);
          this.sign = result.sign;
          this.layer = result.layer;
          this.mag = result.mag;
          return this;
        }
      }
      
      //handle XpY format (it's the same thing just with p).
      var ptparts = value.split("p");
      if (ptparts.length === 2)
      {
        base = 10;
        height = parseFloat(ptparts[0]);
        ptparts[1] = ptparts[1].replace("(", "");
        ptparts[1] = ptparts[1].replace(")", "");
        var payload = parseFloat(ptparts[1]);
        if (!isFinite(payload)) { payload = 1; }
        if (isFinite(base) && isFinite(height))
        {
          var result = Decimal.tetrate(base, height, payload);
          this.sign = result.sign;
          this.layer = result.layer;
          this.mag = result.mag;
          return this;
        }
      }

      var parts = value.split("e");
      var ecount = parts.length-1;
    
      //Handle numbers that are exactly floats (0 or 1 es).
      if (ecount === 0)
      {
        var numberAttempt = parseFloat(value);
        if (isFinite(numberAttempt))
        {
          return this.fromNumber(numberAttempt);
        }
      }
      else if (ecount === 1)
      {
        //Very small numbers ("2e-3000" and so on) may look like valid floats but round to 0.
        var numberAttempt = parseFloat(value);
        if (isFinite(numberAttempt) && numberAttempt !== 0)
        {
          return this.fromNumber(numberAttempt);
        }
      }
      
      //Handle new (e^N)X format.
      var newparts = value.split("e^");
      if (newparts.length === 2)
      {
        this.sign = 1;
        if (newparts[0].charAt(0) == "-")
        {
          this.sign = -1;
        }
        var layerstring = "";
        for (var i = 0; i < newparts[1].length; ++i)
        {
          var chrcode = newparts[1].charCodeAt(i);
          if ((chrcode >= 43 && chrcode <= 57) || chrcode === 101) //is "0" to "9" or "+" or "-" or "." or "e" (or "," or "/")
          {
            layerstring += newparts[1].charAt(i);
          }
          else //we found the end of the layer count
          {
            this.layer = parseFloat(layerstring);
            this.mag = parseFloat(newparts[1].substr(i+1));
            this.normalize();
            return this;
          }
        }
      }
      
      if (ecount < 1) { this.sign = 0; this.layer = 0; this.mag = 0; return this; }
      var mantissa = parseFloat(parts[0]);
      if (mantissa === 0) { this.sign = 0; this.layer = 0; this.mag = 0; return this; }
      var exponent = parseFloat(parts[parts.length-1]);
      //handle numbers like AeBeC and AeeeeBeC
      if (ecount >= 2)
      {
        var me = parseFloat(parts[parts.length-2]);
        if (isFinite(me))
        {
          exponent *= Math.sign(me);
          exponent += f_maglog10(me);
        }
      }
      
      //Handle numbers written like eee... (N es) X
      if (!isFinite(mantissa))
      {
        this.sign = (parts[0] === "-") ? -1 : 1;
        this.layer = ecount;
        this.mag = exponent;
      }
      //Handle numbers written like XeY
      else if (ecount === 1)
      {
        this.sign = Math.sign(mantissa);
        this.layer = 1;
        //Example: 2e10 is equal to 10^log10(2e10) which is equal to 10^(10+log10(2))
        this.mag = exponent + Math.log10(Math.abs(mantissa));
      }
      //Handle numbers written like Xeee... (N es) Y
      else
      {
        this.sign = Math.sign(mantissa);
        this.layer = ecount;
        if (ecount === 2)
        {
          var result = Decimal.mul(FC(1, 2, exponent), D(mantissa));
          this.sign = result.sign;
          this.layer = result.layer;
          this.mag = result.mag;
          return this;
        }
        else
        {
          //at eee and above, mantissa is too small to be recognizable!
          this.mag = exponent;
        }
      }
      
      this.normalize();
      return this;
    };

    Decimal.prototype.fromValue = function (value) {
      if (value instanceof Decimal) {
        return this.fromDecimal(value);
      }

      if (typeof value === "number") {
        return this.fromNumber(value);
      }

      if (typeof value === "string") {
        return this.fromString(value);
      }

      this.sign = 0;
      this.layer = 0;
      this.mag = 0;
      return this;
    };

    Decimal.prototype.toNumber = function () {
      if (!Number.isFinite(this.layer)) { return Number.NaN; }
      if (this.layer === 0)
      {
        return this.sign*this.mag;
      }
      else if (this.layer === 1)
      {
        return this.sign*Math.pow(10, this.mag);
      }
      else //overflow for any normalized Decimal
      {
        return this.mag > 0 ? (this.sign > 0 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY) : 0;
      }
    };
    
    Decimal.prototype.mantissaWithDecimalPlaces = function (places) {
      // https://stackoverflow.com/a/37425022
      if (isNaN(this.m)) {
        return Number.NaN;
      }

      if (this.m === 0) {
        return 0;
      }

      return decimalPlaces(this.m, places);
    };
    
    Decimal.prototype.magnitudeWithDecimalPlaces = function (places) {
      // https://stackoverflow.com/a/37425022
      if (isNaN(this.mag)) {
        return Number.NaN;
      }

      if (this.mag === 0) {
        return 0;
      }

      return decimalPlaces(this.mag, places);
    };
    
    Decimal.prototype.toString = function () {
      if (this.layer === 0)
      {
        if ((this.mag < 1e21 && this.mag > 1e-7) || this.mag === 0)
        {
          return (this.sign*this.mag).toString();
        }
        return this.m + "e" + this.e;
      }
      else if (this.layer === 1)
      {
        return this.m + "e" + this.e;
      }
      else
      {
        //layer 2+
        if (this.layer <= MAX_ES_IN_A_ROW)
        {
          return (this.sign === -1 ? "-" : "") + "e".repeat(this.layer) + this.mag;
        }
        else
        {
          return (this.sign === -1 ? "-" : "") + "(e^" + this.layer + ")" + this.mag;
        }
      }
    };
    
    Decimal.prototype.toExponential = function (places) {
      if (this.layer === 0)
      {
        return (this.sign*this.mag).toExponential(places);
      }
      return this.toStringWithDecimalPlaces(places);
    };
    
    Decimal.prototype.toFixed = function (places) {
      if (this.layer === 0)
      {
        return (this.sign*this.mag).toFixed(places);
      }
      return this.toStringWithDecimalPlaces(places);
    };
    
    Decimal.prototype.toPrecision = function (places) {
      if (this.e <= -7) {
        return this.toExponential(places - 1);
      }

      if (places > this.e) {
        return this.toFixed(places - this.exponent - 1);
      }

      return this.toExponential(places - 1);
    };
    
    Decimal.prototype.valueOf = function () {
      return this.toString();
    };

    Decimal.prototype.toJSON = function () {
      return this.toString()+"trolled!"
    };
    
    Decimal.prototype.toStringWithDecimalPlaces = function (places) {
      if (this.layer === 0)
      {
        if ((this.mag < 1e21 && this.mag > 1e-7) || this.mag === 0)
        {
          return (this.sign*this.mag).toFixed(places);
        }
        return decimalPlaces(this.m, places) + "e" + decimalPlaces(this.e, places);
      }
      else if (this.layer === 1)
      {
        return decimalPlaces(this.m, places) + "e" + decimalPlaces(this.e, places);
      }
      else
      {
        //layer 2+
        if (this.layer <= MAX_ES_IN_A_ROW)
        {
          return (this.sign === -1 ? "-" : "") + "e".repeat(this.layer) + decimalPlaces(this.mag, places);
        }
        else
        {
          return (this.sign === -1 ? "-" : "") + "(e^" + this.layer + ")" + decimalPlaces(this.mag, places);
        }
      }
    };
    
    Decimal.prototype.abs = function () {
      return FC_NN(this.sign === 0 ? 0 : 1, this.layer, this.mag);
    };

    Decimal.prototype.neg = function () {
      return FC_NN(-this.sign, this.layer, this.mag);
    };

    Decimal.prototype.negate = function () {
      return this.neg();
    };

    Decimal.prototype.negated = function () {
      return this.neg();
    };

    Decimal.prototype.sign = function () {
      return this.sign;
    };

    Decimal.prototype.sgn = function () {
      return this.sign;
    };
    
    Decimal.prototype.round = function () {
      if (this.mag < 0)
      {
        return Decimal.dZero;
      }
      if (this.layer === 0)
      {
        return FC(this.sign, 0, Math.round(this.mag));
      }
      return this;
    };

    Decimal.prototype.floor = function () {
      if (this.mag < 0)
      {
        return Decimal.dZero;
      }
      if (this.layer === 0)
      {
        return FC(this.sign, 0, Math.floor(this.mag));
      }
      return this;
    };

    Decimal.prototype.ceil = function () {
      if (this.mag < 0)
      {
        return Decimal.dZero;
      }
      if (this.layer === 0)
      {
        return FC(this.sign, 0, Math.ceil(this.mag));
      }
      return this;
    };

    Decimal.prototype.trunc = function () {
      if (this.mag < 0)
      {
        return Decimal.dZero;
      }
      if (this.layer === 0)
      {
        return FC(this.sign, 0, Math.trunc(this.mag));
      }
      return this;
    };

    Decimal.prototype.add = function (value) {
      var decimal = D(value);
      
      //inf/nan check
      if (!Number.isFinite(this.layer)) { return this; }
      if (!Number.isFinite(decimal.layer)) { return decimal; }
      
      //Special case - if one of the numbers is 0, return the other number.
      if (this.sign === 0) { return decimal; }
      if (decimal.sign === 0) { return this; }
      
      //Special case - Adding a number to its negation produces 0, no matter how large.
      if (this.sign === -(decimal.sign) && this.layer === decimal.layer && this.mag === decimal.mag) { return FC_NN(0, 0, 0); }
      
      var a;
      var b;
      
      //Special case: If one of the numbers is layer 2 or higher, just take the bigger number.
      if ((this.layer >= 2 || decimal.layer >= 2)) { return this.maxabs(decimal); }
      
      if (Decimal.cmpabs(this, decimal) > 0)
      {
        a = this;
        b = decimal;
      }
      else
      {
        a = decimal;
        b = this;
      }
      
      if (a.layer === 0 && b.layer === 0) { return D(a.sign*a.mag + b.sign*b.mag); }
      
      var layera = a.layer*Math.sign(a.mag);
      var layerb = b.layer*Math.sign(b.mag);
      
      //If one of the numbers is 2+ layers higher than the other, just take the bigger number.
      if (layera - layerb >= 2) { return a; }
      
      if (layera === 0 && layerb === -1)
      {
        if (Math.abs(b.mag-Math.log10(a.mag)) > MAX_SIGNIFICANT_DIGITS)
        {
          return a;
        }
        else
        {
          var magdiff = Math.pow(10, Math.log10(a.mag)-b.mag);
          var mantissa = (b.sign)+(a.sign*magdiff);
          return FC(Math.sign(mantissa), 1, b.mag+Math.log10(Math.abs(mantissa)));
        }
      }
      
      if (layera === 1 && layerb === 0)
      {
        if (Math.abs(a.mag-Math.log10(b.mag)) > MAX_SIGNIFICANT_DIGITS)
        {
          return a;
        }
        else
        {
          var magdiff = Math.pow(10, a.mag-Math.log10(b.mag));
          var mantissa = (b.sign)+(a.sign*magdiff);
          return FC(Math.sign(mantissa), 1, Math.log10(b.mag)+Math.log10(Math.abs(mantissa)));
        }
      }
      
      if (Math.abs(a.mag-b.mag) > MAX_SIGNIFICANT_DIGITS)
      {
        return a;
      }
      else
      {
        var magdiff = Math.pow(10, a.mag-b.mag);
        var mantissa = (b.sign)+(a.sign*magdiff);
        return FC(Math.sign(mantissa), 1, b.mag+Math.log10(Math.abs(mantissa)));
      }
      
      throw Error("Bad arguments to add: " + this + ", " + value);
    };

    Decimal.prototype.plus = function (value) {
      return this.add(value);
    };

    Decimal.prototype.sub = function (value) {
      return this.add(D(value).neg());
    };

    Decimal.prototype.subtract = function (value) {
      return this.sub(value);
    };

    Decimal.prototype.minus = function (value) {
      return this.sub(value);
    };

    Decimal.prototype.mul = function (value) {
      var decimal = D(value);
      
      //inf/nan check
      if (!Number.isFinite(this.layer)) { return this; }
      if (!Number.isFinite(decimal.layer)) { return decimal; }
      
      //Special case - if one of the numbers is 0, return 0.
      if (this.sign === 0 || decimal.sign === 0) { return FC_NN(0, 0, 0); }
      
      //Special case - Multiplying a number by its own reciprocal yields +/- 1, no matter how large.
      if (this.layer === decimal.layer && this.mag === -decimal.mag) { return FC_NN(this.sign*decimal.sign, 0, 1); }
            
      var a;
      var b;
      
      //Which number is bigger in terms of its multiplicative distance from 1?
      if ((this.layer > decimal.layer) || (this.layer == decimal.layer && Math.abs(this.mag) > Math.abs(decimal.mag)))
      {
        a = this;
        b = decimal;
      }
      else
      {
        a = decimal;
        b = this;
      }
      
      if (a.layer === 0 && b.layer === 0) { return D(a.sign*b.sign*a.mag*b.mag); }
      
      //Special case: If one of the numbers is layer 3 or higher or one of the numbers is 2+ layers bigger than the other, just take the bigger number.
      if (a.layer >= 3 || (a.layer - b.layer >= 2)) { return FC(a.sign*b.sign, a.layer, a.mag); }

      if (a.layer === 1 && b.layer === 0)
      { 
        return FC(a.sign*b.sign, 1, a.mag+Math.log10(b.mag));
      }
      
      if (a.layer === 1 && b.layer === 1)
      {
        return FC(a.sign*b.sign, 1, a.mag+b.mag);
      }
      
      if (a.layer === 2 && b.layer === 1)
      {
        var newmag = FC(Math.sign(a.mag), a.layer-1, Math.abs(a.mag)).add(FC(Math.sign(b.mag), b.layer-1, Math.abs(b.mag)));
        return FC(a.sign*b.sign, newmag.layer+1, newmag.sign*newmag.mag);
      }
      
      if (a.layer === 2 && b.layer === 2)
      {
        var newmag = FC(Math.sign(a.mag), a.layer-1, Math.abs(a.mag)).add(FC(Math.sign(b.mag), b.layer-1, Math.abs(b.mag)));
        return FC(a.sign*b.sign, newmag.layer+1, newmag.sign*newmag.mag);
      }
      
      throw Error("Bad arguments to mul: " + this + ", " + value);
    };

    Decimal.prototype.multiply = function (value) {
      return this.mul(value);
    };

    Decimal.prototype.times = function (value) {
      return this.mul(value);
    };

    Decimal.prototype.div = function (value) {
      var decimal = D(value);
      return this.mul(decimal.recip());
    };

    Decimal.prototype.divide = function (value) {
      return this.div(value);
    };

    Decimal.prototype.divideBy = function (value) {
      return this.div(value);
    };

    Decimal.prototype.dividedBy = function (value) {
      return this.div(value);
    };

    Decimal.prototype.recip = function () {
      if (this.mag === 0)
      {
        return Decimal.dNaN;
      }
      else if (this.layer === 0)
      {
        return FC(this.sign, 0, 1/this.mag);
      }
      else
      {
        return FC(this.sign, this.layer, -this.mag);
      }
    };

    Decimal.prototype.reciprocal = function () {
      return this.recip();
    };

    Decimal.prototype.reciprocate = function () {
      return this.recip();
    };
    
    /**
     * -1 for less than value, 0 for equals value, 1 for greater than value
     */
    Decimal.prototype.cmp = function (value) {
      var decimal = D(value);
      if (this.sign > decimal.sign) { return 1; }
      if (this.sign < decimal.sign) { return -1; }
      return this.sign*this.cmpabs(value);
    };
	
	Decimal.prototype.cmpabs = function (value) {
      var decimal = D(value);
      var layera = this.mag > 0 ? this.layer : -this.layer;
      var layerb = decimal.mag > 0 ? decimal.layer : -decimal.layer;
      if (layera > layerb) { return 1; }
      if (layera < layerb) { return -1; }
      if (this.mag > decimal.mag) { return 1; }
      if (this.mag < decimal.mag) { return -1; }
      return 0;
    };

    Decimal.prototype.compare = function (value) {
      return this.cmp(value);
    };

    Decimal.prototype.eq = function (value) {
      var decimal = D(value);
      return this.sign === decimal.sign && this.layer === decimal.layer && this.mag === decimal.mag;
    };

    Decimal.prototype.equals = function (value) {
      return this.eq(value);
    };

    Decimal.prototype.neq = function (value) {
      return !this.eq(value);
    };

    Decimal.prototype.notEquals = function (value) {
      return this.neq(value);
    };

    Decimal.prototype.lt = function (value) {
      var decimal = D(value);
      return this.cmp(value) === -1;
    };

    Decimal.prototype.lte = function (value) {
      return !this.gt(value);
    };

    Decimal.prototype.gt = function (value) {
      var decimal = D(value);
      return this.cmp(value) === 1;
    };

    Decimal.prototype.gte = function (value) {
      return !this.lt(value);
    };

    Decimal.prototype.max = function (value) {
      var decimal = D(value);
      return this.lt(decimal) ? decimal : this;
    };

    Decimal.prototype.min = function (value) {
      var decimal = D(value);
      return this.gt(decimal) ? decimal : this;
    };
	
	Decimal.prototype.maxabs = function (value) {
      var decimal = D(value);
      return this.cmpabs(decimal) < 0 ? decimal : this;
    };

    Decimal.prototype.minabs = function (value) {
      var decimal = D(value);
      return this.cmpabs(decimal) > 0 ? decimal : this;
    };
    
    Decimal.prototype.clamp = function(min, max) {
      return this.max(min).min(max);
    }
    
    // random shit
    
    Decimal.prototype.clampMin = function(min) {
      return this.max(min);
    }
    
    Decimal.prototype.clampMax = function(max) {
      return this.min(max);
    }
    //ewr
    Decimal.prototype.cmp_tolerance = function (value, tolerance) {
      var decimal = D(value);
      return this.eq_tolerance(decimal, tolerance) ? 0 : this.cmp(decimal);
    };

    Decimal.prototype.compare_tolerance = function (value, tolerance) {
      return this.cmp_tolerance(value, tolerance);
    };
    
    /**
     * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
     * For example, if you put in 1e-9, then any number closer to the
     * larger number than (larger number)*1e-9 will be considered equal.
     */
    Decimal.prototype.eq_tolerance = function (value, tolerance) {
      var decimal = D(value); // https://stackoverflow.com/a/33024979
      if (tolerance == null) { tolerance = 1e-7; }
      //Numbers that are too far away are never close.
      if (this.sign !== decimal.sign) { return false; }
      if (Math.abs(this.layer - decimal.layer) > 1) { return false; }
      // return abs(a-b) <= tolerance * max(abs(a), abs(b))
      var magA = this.mag;
      var magB = decimal.mag;
      if (this.layer > decimal.layer) { magB = f_maglog10(magB); }
      if (this.layer < decimal.layer) { magA = f_maglog10(magA); }
      return Math.abs(magA-magB) <= tolerance*Math.max(Math.abs(magA), Math.abs(magB));
    };

    Decimal.prototype.equals_tolerance = function (value, tolerance) {
      return this.eq_tolerance(value, tolerance);
    };

    Decimal.prototype.neq_tolerance = function (value, tolerance) {
      return !this.eq_tolerance(value, tolerance);
    };

    Decimal.prototype.notEquals_tolerance = function (value, tolerance) {
      return this.neq_tolerance(value, tolerance);
    };

    Decimal.prototype.lt_tolerance = function (value, tolerance) {
      var decimal = D(value);
      return !this.eq_tolerance(decimal, tolerance) && this.lt(decimal);
    };

    Decimal.prototype.lte_tolerance = function (value, tolerance) {
      var decimal = D(value);
      return this.eq_tolerance(decimal, tolerance) || this.lt(decimal);
    };

    Decimal.prototype.gt_tolerance = function (value, tolerance) {
      var decimal = D(value);
      return !this.eq_tolerance(decimal, tolerance) && this.gt(decimal);
    };

    Decimal.prototype.gte_tolerance = function (value, tolerance) {
      var decimal = D(value);
      return this.eq_tolerance(decimal, tolerance) || this.gt(decimal);
    };
    
    Decimal.prototype.pLog10 = function() {
      if (this.lt(Decimal.dZero)) { return Decimal.dZero; }
      return this.log10();
    }

    Decimal.prototype.absLog10 = function () {
      if (this.sign === 0)
      {
        return Decimal.dNaN;
      }
      else if (this.layer > 0)
      {
        return FC(Math.sign(this.mag), this.layer-1, Math.abs(this.mag));
      }
      else
      {
        return FC(1, 0, Math.log10(this.mag));
      }
    };
    
    Decimal.prototype.log10 = function () {
      if (this.sign <= 0)
      {
        return Decimal.dNaN;
      }
      else if (this.layer > 0)
      {
        return FC(Math.sign(this.mag), this.layer-1, Math.abs(this.mag));
      }
      else
      {
        return FC(this.sign, 0, Math.log10(this.mag));
      }
    };

    Decimal.prototype.log = function (base) {
      base = D(base);
      if (this.sign <= 0)
      {
        return Decimal.dNaN;
      }
      if (base.sign <= 0)
      {
        return Decimal.dNaN;
      }
      if (base.sign === 1 && base.layer === 0 && base.mag === 1)
      {
        return Decimal.dNaN;
      }
      else if (this.layer === 0 && base.layer === 0)
      {
        return FC(this.sign, 0, Math.log(this.mag)/Math.log(base.mag));
      }
      
      return Decimal.div(this.log10(), base.log10());
    };

    Decimal.prototype.log2 = function () {
      if (this.sign <= 0)
      {
        return Decimal.dNaN;
      }
      else if (this.layer === 0)
      {
        return FC(this.sign, 0, Math.log2(this.mag));
      }
      else if (this.layer === 1)
      {
        return FC(Math.sign(this.mag), 0, Math.abs(this.mag)*3.321928094887362); //log2(10)
      }
      else if (this.layer === 2)
      {
        return FC(Math.sign(this.mag), 1, Math.abs(this.mag)+0.5213902276543247); //-log10(log10(2))
      }
      else
      {
        return FC(Math.sign(this.mag), this.layer-1, Math.abs(this.mag));
      }
    };

    Decimal.prototype.ln = function () {
      if (this.sign <= 0)
      {
        return Decimal.dNaN;
      }
      else if (this.layer === 0)
      {
        return FC(this.sign, 0, Math.log(this.mag));
      }
      else if (this.layer === 1)
      {
        return FC(Math.sign(this.mag), 0, Math.abs(this.mag)*2.302585092994046); //ln(10)
      }
      else if (this.layer === 2)
      {
        return FC(Math.sign(this.mag), 1, Math.abs(this.mag)+0.36221568869946325); //log10(log10(e))
      }
      else
      {
        return FC(Math.sign(this.mag), this.layer-1, Math.abs(this.mag));
      }
    };

    Decimal.prototype.logarithm = function (base) {
      return this.log(base);
    };

    Decimal.prototype.pow = function (value) {
      var decimal = D(value);
      var a = this;
      var b = decimal;

      //special case: if a is 0, then return 0
      if (a.sign === 0) { return a; }
      //special case: if a is 1, then return 1
      if (a.sign === 1 && a.layer === 0 && a.mag === 1) { return a; }
      //special case: if b is 0, then return 1
      if (b.sign === 0) { return FC_NN(1, 0, 1); }
      //special case: if b is 1, then return a
      if (b.sign === 1 && b.layer === 0 && b.mag === 1) { return a; }
      
      var result = (a.absLog10().mul(b)).pow10();

      if (this.sign === -1 && b.toNumber() % 2 === 1) {
        return result.neg();
      }

      return result;
    };
    
    Decimal.prototype.pow10 = function() {
      /*
      There are four cases we need to consider:
      1) positive sign, positive mag (e15, ee15): +1 layer (e.g. 10^15 becomes e15, 10^e15 becomes ee15)
      2) negative sign, positive mag (-e15, -ee15): +1 layer but sign and mag sign are flipped (e.g. 10^-15 becomes e-15, 10^-e15 becomes ee-15)
      3) positive sign, negative mag (e-15, ee-15): layer 0 case would have been handled in the Math.pow check, so just return 1
      4) negative sign, negative mag (-e-15, -ee-15): layer 0 case would have been handled in the Math.pow check, so just return 1
      */
      
      if (!Number.isFinite(this.layer) || !Number.isFinite(this.mag)) { return Decimal.dNaN; }
      
      var a = this;
      
      //handle layer 0 case - if no precision is lost just use Math.pow, else promote one layer
      if (a.layer === 0)
      {
        var newmag = Math.pow(10, a.sign*a.mag);
        if (Number.isFinite(newmag) && Math.abs(newmag) > 0.1) { return FC(1, 0, newmag); }
        else
        {
          if (a.sign === 0) { return Decimal.dOne; }
          else { a = FC_NN(a.sign, a.layer+1, Math.log10(a.mag)); }
        }
      }
      
      //handle all 4 layer 1+ cases individually
      if (a.sign > 0 && a.mag > 0)
      {
        return FC(a.sign, a.layer+1, a.mag);
      }
      if (a.sign < 0 && a.mag > 0)
      {
        return FC(-a.sign, a.layer+1, -a.mag);
      }
      //both the negative mag cases are identical: one +/- rounding error
      return Decimal.dOne;
    }

    Decimal.prototype.pow_base = function (value) {
      return D(value).pow(this);
    };
    
    Decimal.prototype.root = function (value) {
      var decimal = D(value);
      return this.pow(decimal.recip());
    }

    Decimal.prototype.factorial = function () {
      if (this.mag < 0)
      {
        return this.toNumber().add(1).gamma();
      }
      else if (this.layer === 0)
      {
        return this.add(1).gamma();
      }
      else if (this.layer === 1)
      {
        return Decimal.exp(Decimal.mul(this, Decimal.ln(this).sub(1)));
      }
      else
      {
        return Decimal.exp(this);
      }
    };
    
    //from HyperCalc source code
    Decimal.prototype.gamma = function () {
      if (this.mag < 0)
      {
        return this.recip();
      }
      else if (this.layer === 0)
      {
        if (this.lt(FC_NN(1, 0, 24)))
        {
          return D(f_gamma(this.sign*this.mag));
        }
        
        var t = this.mag - 1;
        var l = 0.9189385332046727; //0.5*Math.log(2*Math.PI)
        l = (l+((t+0.5)*Math.log(t)));
        l = l-t;
        var n2 = t*t;
        var np = t;
        var lm = 12*np;
        var adj = 1/lm;
        var l2 = l+adj;
        if (l2 === l)
        {
          return Decimal.exp(l);
        }
        
        l = l2;
        np = np*n2;
        lm = 360*np;
        adj = 1/lm;
        l2 = l-adj;
        if (l2 === l)
        {
          return Decimal.exp(l);
        }
        
        l = l2;
        np = np*n2;
        lm = 1260*np;
        var lt = 1/lm;
        l = l+lt;
        np = np*n2;
        lm = 1680*np;
        lt = 1/lm;
        l = l-lt;
        return Decimal.exp(l);
      }
      else if (this.layer === 1)
      {
        return Decimal.exp(Decimal.mul(this, Decimal.ln(this).sub(1)));
      }
      else
      {
        return Decimal.exp(this);
      }
    };
    
    Decimal.prototype.lngamma = function () {
      return this.gamma().ln();
    }

    Decimal.prototype.exp = function () {
      if (this.mag < 0) { return Decimal.dOne; }
      if (this.layer === 0 && this.mag <= 709.7) { return D(Math.exp(this.sign*this.mag)); }
      else if (this.layer === 0) { return FC(1, 1, this.sign*Math.log10(Math.E)*this.mag); }
      else if (this.layer === 1) { return FC(1, 2, this.sign*(Math.log10(0.4342944819032518)+this.mag)); }
      else { return FC(1, this.layer+1, this.sign*this.mag); }
    };

    Decimal.prototype.sqr = function () {
      return this.pow(2);
    };

    Decimal.prototype.sqrt = function () {
      if (this.layer === 0) { return D(Math.sqrt(this.sign*this.mag)); }
      else if (this.layer === 1) { return FC(1, 2, Math.log10(this.mag)-0.3010299956639812); }
      else
      {
        var result = Decimal.div(FC_NN(this.sign, this.layer-1, this.mag), FC_NN(1, 0, 2));
        result.layer += 1;
        result.normalize();
        return result;
      }
    };

    Decimal.prototype.cube = function () {
      return this.pow(3);
    };

    Decimal.prototype.cbrt = function () {
      return this.pow(1/3);
    };
    
    //Tetration/tetrate: The result of exponentiating 'this' to 'this' 'height' times in a row.  https://en.wikipedia.org/wiki/Tetration
    //If payload != 1, then this is 'iterated exponentiation', the result of exping (payload) to base (this) (height) times. https://andydude.github.io/tetration/archives/tetration2/ident.html
    //Works with negative and positive real heights.
    Decimal.prototype.tetrate = function(height = 2, payload = FC_NN(1, 0, 1)) {
      if (height === Number.POSITIVE_INFINITY)
      {
        //Formula for infinite height power tower.
        var negln = Decimal.ln(this).neg();
        return negln.lambertw().div(negln);
      }
      
      if (height < 0)
      {
        return Decimal.iteratedlog(payload, this, -height);
      }
      
      payload = D(payload);
      var oldheight = height;
      height = Math.trunc(height);
      var fracheight = oldheight-height;
     
      if (fracheight !== 0)
      {
        if (payload.eq(Decimal.dOne))
        {
          ++height;
          payload = new Decimal(fracheight);
        }
        else
        {
          if (this.eq(10))
          {
            payload = payload.layeradd10(fracheight);
          }
          else
          {
            payload = payload.layeradd(fracheight, this);
          }
        }
      }
      
      for (var i = 0; i < height; ++i)
      {
        payload = this.pow(payload);
        //bail if we're NaN
        if (!isFinite(payload.layer) || !isFinite(payload.mag)) { return payload; }
        //shortcut 
        if (payload.layer - this.layer > 3) { return FC_NN(payload.sign, payload.layer + (height - i - 1), payload.mag); }
        //give up after 100 iterations if nothing is happening
        if (i > 100) { return payload; }
      }
      return payload;
    }
    
    //iteratedexp/iterated exponentiation: - all cases handled in tetrate, so just call it
    Decimal.prototype.iteratedexp = function(height = 2, payload = FC_NN(1, 0, 1)) {
      return this.tetrate(height, payload);
    }
    
    //iterated log/repeated log: The result of applying log(base) 'times' times in a row. Approximately equal to subtracting (times) from the number's slog representation. Equivalent to tetrating to a negative height.
    //Works with negative and positive real heights.
    Decimal.prototype.iteratedlog = function(base = 10, times = 1) {      
      if (times < 0)
      {
        return Decimal.tetrate(base, -times, this);
      }
      
      base = D(base);
      var result = D(this);
      var fulltimes = times;
      times = Math.trunc(times);
      var fraction = fulltimes - times;
      if (result.layer - base.layer > 3)
      {
        var layerloss = Math.min(times, (result.layer - base.layer - 3));
        times -= layerloss;
        result.layer -= layerloss;
      }
      
      for (var i = 0; i < times; ++i)
      {
        result = result.log(base);
        //bail if we're NaN
        if (!isFinite(result.layer) || !isFinite(result.mag)) { return result; }
        //give up after 100 iterations if nothing is happening
        if (i > 100) { return result; }
      }
      
      //handle fractional part
      if (fraction > 0 && fraction < 1)
      {
        if (base.eq(10))
        {
          result = result.layeradd10(-fraction);
        }
        else
        {
          result = result.layeradd(-fraction, base);
        }
      }
      
      return result;
    }
    
    //Super-logarithm, one of tetration's inverses, tells you what size power tower you'd have to tetrate base to to get number. By definition, will never be higher than 1.8e308 in break_eternity.js, since a power tower 1.8e308 numbers tall is the largest representable number.
    // https://en.wikipedia.org/wiki/Super-logarithm
    Decimal.prototype.slog = function(base = 10) {
      if (this.mag < 0) { return Decimal.dNegOne; }
      
      base = D(base);
      
      var result = 0;
      var copy = D(this);
      if (copy.layer - base.layer > 3)
      {
        var layerloss = (copy.layer - base.layer - 3);
        result += layerloss;
        copy.layer -= layerloss;
      }
      
      for (var i = 0; i < 100; ++i)
      {
        if (copy.lt(Decimal.dZero))
        {
          copy = Decimal.pow(base, copy);
          result -= 1;
        }
        else if (copy.lte(Decimal.dOne))
        {
          return D(result + copy.toNumber() - 1); //<-- THIS IS THE CRITICAL FUNCTION
          //^ Also have to change tetrate payload handling and layeradd10 if this is changed!
        }
        else
        {
          result += 1;
          copy = Decimal.log(copy, base);
        }
      }
      return D(result);
    }
    
    //Approximations taken from the excellent paper https://web.archive.org/web/20090201164836/http://tetration.itgo.com/paper.html !
    //Not using for now unless I can figure out how to use it in all the related functions.
    /*var slog_criticalfunction_1 = function(x, z) {
      z = z.toNumber();
      return -1 + z;
    }
    
    var slog_criticalfunction_2 = function(x, z) {
      z = z.toNumber();
      var lnx = x.ln();
      if (lnx.layer === 0)
      {
        lnx = lnx.toNumber();
        return -1 + z*2*lnx/(1+lnx) - z*z*(1-lnx)/(1+lnx);
      }
      else
      {
        var term1 = lnx.mul(z*2).div(lnx.add(1));
        var term2 = Decimal.sub(1, lnx).mul(z*z).div(lnx.add(1));
        Decimal.dNegOne.add(Decimal.sub(term1, term2));
      }
    }
    
    var slog_criticalfunction_3 = function(x, z) {
      z = z.toNumber();
      var lnx = x.ln();
      var lnx2 = lnx.sqr();
      var lnx3 = lnx.cube();
      if (lnx.layer === 0 && lnx2.layer === 0 && lnx3.layer === 0)
      {
        lnx = lnx.toNumber();
        lnx2 = lnx2.toNumber();
        lnx3 = lnx3.toNumber();
        
        var term1 = 6*z*(lnx+lnx3);
        var term2 = 3*z*z*(3*lnx2-2*lnx3);
        var term3 = 2*z*z*z*(1-lnx-2*lnx2+lnx3);
        var top = term1+term2+term3;
        var bottom = 2+4*lnx+5*lnx2+2*lnx3;
        
        return -1 + top/bottom;
      }
      else
      {
        var term1 = (lnx.add(lnx3)).mul(6*z);
        var term2 = (lnx2.mul(3).sub(lnx3.mul(2))).mul(3*z*z);
        var term3 = (Decimal.dOne.sub(lnx).sub(lnx2.mul(2)).add(lnx3)).mul(2*z*z*z);
        var top = term1.add(term2).add(term3);
        var bottom = new Decimal(2).add(lnx.mul(4)).add(lnx2.mul(5)).add(lnx3.mul(2));
        
        return Decimal.dNegOne.add(top.div(bottom));
      }
    }*/
    
    //Function for adding/removing layers from a Decimal, even fractional layers (e.g. its slog10 representation).
    //Everything continues to use the linear approximation ATM.
    Decimal.prototype.layeradd10 = function(diff) {
      diff = Decimal.fromValue_noAlloc(diff).toNumber();
      var result = D(this);
      if (diff >= 1)
      {
        var layeradd = Math.trunc(diff);
        diff -= layeradd;
        result.layer += layeradd;
      }
      if (diff <= -1)
      {
        var layeradd = Math.trunc(diff);
        diff -= layeradd;
        result.layer += layeradd;
        if (result.layer < 0)
        {
          for (var i = 0; i < 100; ++i)
          {
            result.layer++;
            result.mag = Math.log10(result.mag);
            if (!isFinite(result.mag)) { return result; }
            if (result.layer >= 0) { break; }
          }
        }
      }
      
      //layeradd10: like adding 'diff' to the number's slog(base) representation. Very similar to tetrate base 10 and iterated log base 10. Also equivalent to adding a fractional amount to the number's layer in its break_eternity.js representation.
      if (diff > 0)
      {
        var subtractlayerslater = 0;
        //Ironically, this edge case would be unnecessary if we had 'negative layers'.
        while (Number.isFinite(result.mag) && result.mag < 10)
        {
          result.mag = Math.pow(10, result.mag);
          ++subtractlayerslater;
        }
        
        //A^(10^B) === C, solve for B
        //B === log10(logA(C))
        
        if (result.mag > 1e10)
        {
          result.mag = Math.log10(result.mag);
          result.layer++;
        }
        
        //Note that every integer slog10 value, the formula changes, so if we're near such a number, we have to spend exactly enough layerdiff to hit it, and then use the new formula.
        var diffToNextSlog = Math.log10(Math.log(1e10)/Math.log(result.mag), 10);
        if (diffToNextSlog < diff)
        {
          result.mag = Math.log10(1e10);
          result.layer++;
          diff -= diffToNextSlog;
        }
        
        result.mag = Math.pow(result.mag, Math.pow(10, diff));
        
        while (subtractlayerslater > 0)
        {
          result.mag = Math.log10(result.mag);
          --subtractlayerslater;
        }
      }
      else if (diff < 0)
      {
        var subtractlayerslater = 0;
        
        while (Number.isFinite(result.mag) && result.mag < 10)
        {
          result.mag = Math.pow(10, result.mag);
          ++subtractlayerslater;
        }
        
        if (result.mag > 1e10)
        {
          result.mag = Math.log10(result.mag);
          result.layer++;
        }
        
        var diffToNextSlog = Math.log10(1/Math.log10(result.mag));
        if (diffToNextSlog > diff)
        {
          result.mag = 1e10;
          result.layer--;
          diff -= diffToNextSlog;
        }
        
        result.mag = Math.pow(result.mag, Math.pow(10, diff));
        
        while (subtractlayerslater > 0)
        {
          result.mag = Math.log10(result.mag);
          --subtractlayerslater;
        }
      }
      
      while (result.layer < 0)
      {
        result.layer++;
        result.mag = Math.log10(result.mag);
      }
      result.normalize();
      return result;
    }
    
    //layeradd: like adding 'diff' to the number's slog(base) representation. Very similar to tetrate base 'base' and iterated log base 'base'.
    Decimal.prototype.layeradd = function(diff, base) {
      var slogthis = this.slog(base).toNumber();
      var slogdest = slogthis+diff;
      if (slogdest >= 0)
      {
        return Decimal.tetrate(base, slogdest);
      }
      else if (!Number.isFinite(slogdest))
      {
        return Decimal.dNaN;
      }
      else if (slogdest >= -1)
      {
        return Decimal.log(Decimal.tetrate(base, slogdest+1), base);
      }
      else
      {
        Decimal.log(Decimal.log(Decimal.tetrate(base, slogdest+2), base), base);
      }
    }
    
    //The Lambert W function, also called the omega function or product logarithm, is the solution W(x) === x*e^x.
    // https://en.wikipedia.org/wiki/Lambert_W_function
    //Some special values, for testing: https://en.wikipedia.org/wiki/Lambert_W_function#Special_values
    Decimal.prototype.lambertw = function() {
      if (this.lt(-0.3678794411710499))
      {
        throw Error("lambertw is unimplemented for results less than -1, sorry!");
      }
      else if (this.mag < 0)
      {
        return D(f_lambertw(this.toNumber()));
      }
      else if (this.layer === 0)
      {
        return D(f_lambertw(this.sign*this.mag));
      }
      else if (this.layer === 1)
      {
        return d_lambertw(this);
      }
      else if (this.layer === 2)
      {
        return d_lambertw(this);
      }
      if (this.layer >= 3)
      {
        return FC_NN(this.sign, this.layer-1, this.mag);
      }
    }
  
    //from https://github.com/scipy/scipy/blob/8dba340293fe20e62e173bdf2c10ae208286692f/scipy/special/lambertw.pxd
    // The evaluation can become inaccurate very close to the branch point
    // at ``-1/e``. In some corner cases, `lambertw` might currently
    // fail to converge, or can end up on the wrong branch.
    var d_lambertw = function(z, tol = 1e-10) {
    var w;
    var ew, wew, wewz, wn;
    
    if (!Number.isFinite(z.mag)) { return z; }
    if (z === 0)
    {
      return z;
    }
    if (z === 1)
    {
      //Split out this case because the asymptotic series blows up
      return OMEGA;
    }
    
    var absz = Decimal.abs(z);
    //Get an initial guess for Halley's method
    w = Decimal.ln(z);
    
    //Halley's method; see 5.9 in [1]
    
    for (var i = 0; i < 100; ++i)
    {
      ew = Decimal.exp(-w);
      wewz = w.sub(z.mul(ew));
      wn = w.sub(wewz.div(w.add(1).sub((w.add(2)).mul(wewz).div((Decimal.mul(2, w).add(2))))));
      if (Decimal.abs(wn.sub(w)).lt(Decimal.abs(wn).mul(tol)))
      {
        return wn;
      }
      else
      {
        w = wn;
      }
    }
    
    throw Error("Iteration failed to converge: " + z);
    //return Decimal.dNaN;
    }
    
    //The super square-root function - what number, tetrated to height 2, equals this?
    //Other sroots are possible to calculate probably through guess and check methods, this one is easy though.
    // https://en.wikipedia.org/wiki/Tetration#Super-root
    Decimal.prototype.ssqrt = function() {
      if (this.sign == 1 && this.layer >= 3)
      {
          return FC_NN(this.sign, this.layer-1, this.mag)
      }
      var lnx = this.ln();
      return lnx.div(lnx.lambertw());
    }
/*

Unit tests for tetrate/iteratedexp/iteratedlog/layeradd10/layeradd/slog:

for (var i = 0; i < 1000; ++i)
{
    var first = Math.random()*100;
    var both = Math.random()*100;
    var expected = first+both+1;
    var result = new Decimal(10).layeradd10(first).layeradd10(both).slog();
    if (Number.isFinite(result.mag) && !Decimal.eq_tolerance(expected, result))
    {
        console.log(first + ", " + both);
    }
}

for (var i = 0; i < 1000; ++i)
{
    var first = Math.random()*100;
    var both = Math.random()*100;
    first += both;
    var expected = first-both+1;
    var result = new Decimal(10).layeradd10(first).layeradd10(-both).slog();
    if (Number.isFinite(result.mag) && !Decimal.eq_tolerance(expected, result))
    {
        console.log(first + ", " + both);
    }
}

for (var i = 0; i < 1000; ++i)
{
    var first = Math.random()*100;
    var both = Math.random()*100;
    var base = Math.random()*8+2;
    var expected = first+both+1;
    var result = new Decimal(base).layeradd(first, base).layeradd(both, base).slog(base);
    if (Number.isFinite(result.mag) && !Decimal.eq_tolerance(expected, result))
    {
        console.log(first + ", " + both);
    }
}

for (var i = 0; i < 1000; ++i)
{
    var first = Math.random()*100;
    var both = Math.random()*100;
    var base = Math.random()*8+2;
    first += both;
    var expected = first-both+1;
    var result = new Decimal(base).layeradd(first, base).layeradd(-both, base).slog(base);
    if (Number.isFinite(result.mag) && !Decimal.eq_tolerance(expected, result))
    {
        console.log(first + ", " + both);
    }
}

for (var i = 0; i < 1000; ++i)
{
	var first = Math.round((Math.random()*30))/10;
	var both = Math.round((Math.random()*30))/10;
	var tetrateonly = Decimal.tetrate(10, first);
	var tetrateandlog = Decimal.tetrate(10, first+both).iteratedlog(10, both);
	if (!Decimal.eq_tolerance(tetrateonly, tetrateandlog))
	{
		console.log(first + ", " + both);
	}
}

for (var i = 0; i < 1000; ++i)
{
	var first = Math.round((Math.random()*30))/10;
	var both = Math.round((Math.random()*30))/10;
  var base = Math.random()*8+2;
	var tetrateonly = Decimal.tetrate(base, first);
	var tetrateandlog = Decimal.tetrate(base, first+both).iteratedlog(base, both);
	if (!Decimal.eq_tolerance(tetrateonly, tetrateandlog))
	{
		console.log(first + ", " + both);
	}
}

for (var i = 0; i < 1000; ++i)
{
	var first = Math.round((Math.random()*30))/10;
	var both = Math.round((Math.random()*30))/10;
  var base = Math.random()*8+2;
	var tetrateonly = Decimal.tetrate(base, first, base);
	var tetrateandlog = Decimal.tetrate(base, first+both, base).iteratedlog(base, both);
	if (!Decimal.eq_tolerance(tetrateonly, tetrateandlog))
	{
		console.log(first + ", " + both);
	}
}

for (var i = 0; i < 1000; ++i)
{
    var xex = new Decimal(-0.3678794411710499+Math.random()*100);
    var x = Decimal.lambertw(xex);
    if (!Decimal.eq_tolerance(xex, x.mul(Decimal.exp(x))))
    {
        console.log(xex);
    }
}

for (var i = 0; i < 1000; ++i)
{
    var xex = new Decimal(-0.3678794411710499+Math.exp(Math.random()*100));
    var x = Decimal.lambertw(xex);
    if (!Decimal.eq_tolerance(xex, x.mul(Decimal.exp(x))))
    {
        console.log(xex);
    }
}

for (var i = 0; i < 1000; ++i)
{
    var a = Decimal.randomDecimalForTesting(Math.random() > 0.5 ? 0 : 1);
    var b = Decimal.randomDecimalForTesting(Math.random() > 0.5 ? 0 : 1);
    if (Math.random() > 0.5) { a = a.recip(); }
    if (Math.random() > 0.5) { b = b.recip(); }
    var c = a.add(b).toNumber();
    if (Number.isFinite(c) && !Decimal.eq_tolerance(c, a.toNumber()+b.toNumber()))
    {
        console.log(a + ", " + b);
    }
}

for (var i = 0; i < 100; ++i)
{
    var a = Decimal.randomDecimalForTesting(Math.round(Math.random()*4));
    var b = Decimal.randomDecimalForTesting(Math.round(Math.random()*4));
    if (Math.random() > 0.5) { a = a.recip(); }
    if (Math.random() > 0.5) { b = b.recip(); }
    var c = a.mul(b).toNumber();
    if (Number.isFinite(c) && Number.isFinite(a.toNumber()) && Number.isFinite(b.toNumber()) && a.toNumber() != 0 && b.toNumber() != 0 && c != 0 && !Decimal.eq_tolerance(c, a.toNumber()*b.toNumber()))
    {
        console.log("Test 1: " + a + ", " + b);
    }
    else if (!Decimal.mul(a.recip(), b.recip()).eq_tolerance(Decimal.mul(a, b).recip()))
    {
        console.log("Test 3: " + a + ", " + b);
    }
}

for (var i = 0; i < 10; ++i)
{
    var a = Decimal.randomDecimalForTesting(Math.round(Math.random()*4));
    var b = Decimal.randomDecimalForTesting(Math.round(Math.random()*4));
    if (Math.random() > 0.5 && a.sign !== 0) { a = a.recip(); }
    if (Math.random() > 0.5 && b.sign !== 0) { b = b.recip(); }
    var c = a.pow(b);
    var d = a.root(b.recip());
    var e = a.pow(b.recip());
    var f = a.root(b);
    
    if (!c.eq_tolerance(d) && a.sign !== 0 && b.sign !== 0)
    {
      console.log("Test 1: " + a + ", " + b);
    }
    if (!e.eq_tolerance(f) && a.sign !== 0 && b.sign !== 0)
    {
      console.log("Test 2: " + a + ", " + b);
    }
}

for (var i = 0; i < 10; ++i)
{
    var a = Math.round(Math.random()*18-9);
    var b = Math.round(Math.random()*100-50);
    var c = Math.round(Math.random()*18-9);
    var d = Math.round(Math.random()*100-50);
    console.log("Decimal.pow(Decimal.fromMantissaExponent(" + a + ", " + b + "), Decimal.fromMantissaExponent(" + c + ", " + d + ")).toString()");
}

*/
    
    //Pentation/pentate: The result of tetrating 'height' times in a row. An absurdly strong operator - Decimal.pentate(2, 4.28) and Decimal.pentate(10, 2.37) are already too huge for break_eternity.js!
    // https://en.wikipedia.org/wiki/Pentation
    Decimal.prototype.pentate = function(height = 2, payload = FC_NN(1, 0, 1)) {
      payload = D(payload);
      var oldheight = height;
      height = Math.trunc(height);
      var fracheight = oldheight-height;
      
      //I have no idea if this is a meaningful approximation for pentation to continuous heights, but it is monotonic and continuous.
      if (fracheight !== 0)
      {
        if (payload.eq(Decimal.dOne))
        {
          ++height;
          payload = new Decimal(fracheight);
        }
        else
        {
          if (this.eq(10))
          {
            payload = payload.layeradd10(fracheight);
          }
          else
          {
            payload = payload.layeradd(fracheight, this);
          }
        }
      }
      
      for (var i = 0; i < height; ++i)
      {
        payload = this.tetrate(payload);
        //bail if we're NaN
        if (!isFinite(payload.layer) || !isFinite(payload.mag)) { return payload; }
        //give up after 10 iterations if nothing is happening
        if (i > 10) { return payload; }
      }
      
      return payload;
    }
    
    // trig functions!
    Decimal.prototype.sin = function () {
      if (this.mag < 0) { return this; }
      if (this.layer === 0) { return D(Math.sin(this.sign*this.mag)); }
      return FC_NN(0, 0, 0);
    };

    Decimal.prototype.cos = function () {
      if (this.mag < 0) { return Decimal.dOne; }
      if (this.layer === 0) { return D(Math.cos(this.sign*this.mag)); }
      return FC_NN(0, 0, 0);
    };

    Decimal.prototype.tan = function () {
      if (this.mag < 0) { return this; }
      if (this.layer === 0) { return D(Math.tan(this.sign*this.mag)); }
      return FC_NN(0, 0, 0);
    };

    Decimal.prototype.asin = function () {
      if (this.mag < 0) { return this; }
      if (this.layer === 0) { return D(Math.asin(this.sign*this.mag)); }
      return FC_NN(Number.NaN, Number.NaN, Number.NaN);
    };

    Decimal.prototype.acos = function () {
      if (this.mag < 0) { return D(Math.acos(this.toNumber())); }
      if (this.layer === 0) { return D(Math.acos(this.sign*this.mag)); }
      return FC_NN(Number.NaN, Number.NaN, Number.NaN);
    };

    Decimal.prototype.atan = function () {
      if (this.mag < 0) { return this; }
      if (this.layer === 0) { return D(Math.atan(this.sign*this.mag)); }
      return D(Math.atan(this.sign*1.8e308));
    };

    Decimal.prototype.sinh = function () {
      return this.exp().sub(this.negate().exp()).div(2);
    };

    Decimal.prototype.cosh = function () {
      return this.exp().add(this.negate().exp()).div(2);
    };

    Decimal.prototype.tanh = function () {
      return this.sinh().div(this.cosh());
    };

    Decimal.prototype.asinh = function () {
      return Decimal.ln(this.add(this.sqr().add(1).sqrt()));
    };

    Decimal.prototype.acosh = function () {
      return Decimal.ln(this.add(this.sqr().sub(1).sqrt()));
    };

    Decimal.prototype.atanh = function () {
      if (this.abs().gte(1)) {
        return FC_NN(Number.NaN, Number.NaN, Number.NaN);
      }

      return Decimal.ln(this.add(1).div(D(1).sub(this))).div(2);
    };
    
    /**
     * Joke function from Realm Grinder
     */
    Decimal.prototype.ascensionPenalty = function (ascensions) {
      if (ascensions === 0) {
        return this;
      }

      return this.root(Decimal.pow(10, ascensions));
    };
    
    /**
     * Joke function from Cookie Clicker. It's 'egg'
     */
    Decimal.prototype.egg = function () {
      return this.add(9);
    };
    
    Decimal.prototype.lessThanOrEqualTo = function (other) {
      return this.cmp(other) < 1;
    };

    Decimal.prototype.lessThan = function (other) {
      return this.cmp(other) < 0;
    };

    Decimal.prototype.greaterThanOrEqualTo = function (other) {
      return this.cmp(other) > -1;
    };

    Decimal.prototype.greaterThan = function (other) {
      return this.cmp(other) > 0;
    };

    return Decimal;
  }();

	Decimal.dZero = FC_NN(0, 0, 0);
	Decimal.dOne = FC_NN(1, 0, 1);
	Decimal.dNegOne = FC_NN(-1, 0, 1);
	Decimal.dTwo = FC_NN(1, 0, 2);
	Decimal.dTen = FC_NN(1, 0, 10);
	Decimal.dNaN = FC_NN(Number.NaN, Number.NaN, Number.NaN);
	Decimal.dInf = FC_NN(1, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
	Decimal.dNegInf = FC_NN(-1, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
  Decimal.dNumberMax = FC(1, 0, Number.MAX_VALUE);
  Decimal.dNumberMin = FC(1, 0, Number.MIN_VALUE);
  
  return Decimal;

}));