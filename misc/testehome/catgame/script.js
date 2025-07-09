let tab='main'
let deltatime=0
let loaftime = 0
const gel = (name) => document.getElementById(name)
const newsfile = ["owo", "uwu", "hello", "uparrow", "x²","you are very silly","why tf do you have so many cats","try the 'hyperspecificats' secret code","gato","welcome to the underground","how was the faaaallll",":3","insert catgame joke here","i can't code a news ticker","when the nip hits","why tf are you buying cat food with cats","mmmf yes pet cat"]

// jacorb's code for formatting
function exponentialFormat(num, precision) {
  let e = num.exponent;
  let m = num.mantissa;
  if (Number(new Decimal(m).toStringWithDecimalPlaces(precision))==10) {
    m = 1
    e++;
  }
  e = ((e>=1000) ? commaFormat(new Decimal(e), 0) : new Decimal(e).toStringWithDecimalPlaces(0))
  return new Decimal(m).toStringWithDecimalPlaces(precision)+"e"+e
}
function commaFormat(num, precision) {
  if (num === null || num === undefined) return "NaN"
  if (num.mag < 0.001) return (0).toFixed(precision)
  return num.toStringWithDecimalPlaces(precision).replace(/\B(?=(\d{3})+(?!\d))/g, "'")
}
function regularFormat(num, precision) {
  if (num === null || num === undefined) return "NaN"
  if (num.mag < 0.001) return (0).toFixed(precision)
  return num.toStringWithDecimalPlaces(precision)
}
function fixValue(x, y = 0) {
  return x || new Decimal(y)
}
function sumValues(x) {
  x = Object.values(x)
  if (!x[0]) return new Decimal(0)
  return x.reduce((a, b) => Decimal.add(a, b))
}
function format(decimal, precision=2, whole=false) {
  decimal = new Decimal(decimal)
  if (isNaN(decimal.sign)||isNaN(decimal.layer)||isNaN(decimal.mag)) {
    return "NaN"
  }
  if (decimal.sign<0) return "-"+format(decimal.neg(), precision)
  if (decimal.mag == Number.POSITIVE_INFINITY) return "Infinity"
  if (decimal.eq(0)) return "0"
  if (decimal.gte("eeee1000")) {
    var slog = decimal.slog()
    if (slog.gte(1e3)) return "10^^" + formatWhole(slog)
    else return "10^^" + regularFormat(slog, 3)
  } else if (decimal.gte("eee100000")) return "eee"+format(decimal.log10().log10().log10(), 3)
  else if (decimal.gte("ee100000")) return "ee"+format(decimal.log10().log10(), 3)
  else if (decimal.gte("1e100000")) return "e"+format(decimal.log10(), 3)
  else if (decimal.gte("1e1000")) return exponentialFormat(decimal, 0)
  else if (decimal.gte(1e9)) return exponentialFormat(decimal, precision)
  else if (decimal.gte(1e3)) return commaFormat(decimal, 0)
  else if (decimal.gte(Decimal.pow(0.1, precision)) || whole) return regularFormat(decimal, precision)
  else if (decimal.gt("1e-100000")) return exponentialFormat(decimal, decimal.gte("1e-1000")?precision:0)
  else return "1/("+format(decimal.pow(-1), precision)+")"
}
function formatWhole(decimal, reallyWhole=false) {
  decimal = new Decimal(decimal)
  if (decimal.gte(1e9)) return format(decimal, 2)
  if (decimal.lte(0.95) && !decimal.eq(0) && !reallyWhole) return format(decimal, 2)
  else return format(decimal, 0, true)
}
function formatTime(s) {
  s = new Decimal(s);
  if (s.gte(1/0)) return "Forever"
  else if (s.lt(60)) return format(s)+"s"
  else if (s.lt(3600)) return formatWhole(s.div(60).floor())+"m "+format(s.toNumber()%60)+"s"
  else if (s.lt(86400)) return formatWhole(s.div(3600).floor())+"h "+format(s.div(60).toNumber()%60)+"m"
  else if (s.lt(31536000)) return formatWhole(s.div(84600).floor())+"d " + formatWhole(s.div(3600).toNumber()%24)+"h"
  else if (s.lt(31536000000)) return formatWhole(s.div(31536000).floor())+"y "+formatWhole(s.div(84600).toNumber()%365)+"d"
  else return formatWhole(s.div(31536000))+"y"
}
function toPlaces(x, precision, maxAccepted) {
  x = new Decimal(x)
  let result = x.toStringWithDecimalPlaces(precision)
  if (new Decimal(result).gte(maxAccepted)) {
    result = new Decimal(maxAccepted-Math.pow(0.1, precision)).toStringWithDecimalPlaces(precision)
  }
  return result
}
// start of teste's code

var catspersecond = new Decimal(0)
function formatforh(x){
 return format(x)}
function formatforz(x){
  return format(x, 0, true)
}
var d = {
  // other stats
  startPlaying: new Decimal(Date.now()),
  lastTick: new Decimal(Date.now()),
  HighCats: new Decimal(0),
  //cats and CL
  cats : new Decimal(11),
  catlimit: new Decimal(1),
  // cat upgrades
  cat_summoners: new Decimal(0),
  cat_food: new Decimal(0),
  // cat coins
  spent_cat_coins: new Decimal(0),
  less_space: new Decimal(0),
  better_magic: new Decimal(0),
  //cat god
  cat_god_sacrificed: new Decimal(0),
  //hypercats
  hypercats: new Decimal(0),
  //energy cats
  energycats: new Decimal(0),
  energycatmilestone: new Decimal(0),
  //energy autobuyers
  eautobuycs: new Decimal(1),
  eautobuycf: new Decimal(1),
  eautobuyl:  new Decimal(1),
  eautobuys:  new Decimal(1),
  //void cats
  voidcats: new Decimal(0),
  voidgain: new Decimal(0),
  voidup1: new Decimal(0),
  voidup2: new Decimal(0),
  voidup3: new Decimal(0),
  voidhypercats: new Decimal(0),
  voidupcooldown: new Decimal(0)
}
var time_since_last_news_message = new Decimal(0)
var secrets = {
  
}
var options = {
  progresstype: 0
}

function Export(){
  gel("savedata").value = btoa(JSON.stringify(d))
}
function Import(){
   var data = JSON.parse(atob(document.getElementById("savedata").value))
   for (const i in data) d[i] = data[i]
  Save()
  location.reload()
}

function catsize(cats){
  const size_of_cat = new Decimal(11470.9448) //in cm^3/cat
  var size_of_all_cats = size_of_cat.times(cats) // cats * cm^3/cat = cm^3
  const density_of_cat_cm3 = new Decimal(0.00106202412) //in kg/cm^3
  var weight_of_all_cats = size_of_all_cats.times(density_of_cat_cm3) // cm^3 * kg/cm^3 = kg
  var p = [size_of_all_cats, weight_of_all_cats]
  return p
}
function UpdateScreen(){
  let catlimtemp = (new Decimal(1000).pow(d.catlimit)).times(new Decimal(0.85).pow(d.less_space))
  //buy all
  if (d.catlimit.gte(6)){gel("buyallbutton").textContent = "Buy All"}
  else {gel("buyallbutton").textContent = "Locked"}
  //hypercat button
  if (d.cats.gte(new Decimal(1e3).times(new Decimal(4e2).pow(d.hypercats))))
  {gel("hcbutton").textContent = "Hyper Cat Reset"}
  else {gel("hcbutton").textContent = "You need "+formatforh(new Decimal(1e3).times(new Decimal(4e2).pow(d.hypercats)))+" Cats to (HC)Reset"}
  //HyperVoidCat button
  if (d.voidcats.gte(new Decimal(1e5).times(new Decimal(2.25).pow(new Decimal(0.93).times(d.voidhypercats)))))
  {gel("hvcbutton").textContent = "Hyper Void-Cat Reset"}
  else {gel("hvcbutton").textContent = "You need "+formatforh(new Decimal(1e5).times(new Decimal(2.25).pow(new Decimal(0.93).times(d.voidhypercats))))+" Void Cats to (HVC)Reset"}
  // percentage stuff
  let percent = 0
  switch (options.progresstype) {
    case 0:
        percent = d.cats.log10().divide(catlimtemp.log10())
        break
    case 1:
        percent = d.cats.divide(catlimtemp)
        break
    default:
        options.progresstype = 0
  }
  gel("pbloglin").textContent=(options.progresstype==1) ? "linear" : "logarithmic"
    
if (d.cats.gte(1)){
  gel("catlimbar").value = percent.mag
  gel("catbarpercent").textContent = formatforh(percent.times(100))+"%"}
  else {gel("catlimbar").value = 0;gel("catbarpercent").textContent = "0%"}
  
  gel("cats").textContent = formatforh(d.cats)
  gel("cps").textContent = formatforh(catspersecond)
  gel("catlim").textContent = formatforh(catlimtemp)
  gel("catsummoners").textContent = formatforz(d.cat_summoners)
  gel("catfood").textContent = formatforz(d.cat_food)
  gel("basecats").textContent = formatforh(d.cat_summoners.pow(d.better_magic.divide(60).plus(1)))
  gel("catmulti").textContent = formatforh(new Decimal(1.75).pow(d.cat_food))
  gel("cscost").textContent = formatforh(new Decimal(10).times(new Decimal(1.75).pow(d.cat_summoners)))
  gel("cfcost").textContent = formatforh(new Decimal(25).times(new Decimal(2.05).pow(d.cat_food)))
  gel("catlimitnum").textContent = formatforz(d.catlimit.minus(1))
  gel("maxccs").textContent = formatforz(d.catlimit)
   gel("ccs").textContent = formatforz(d.catlimit.minus(d.spent_cat_coins))
  gel("ls").textContent = formatforz(d.less_space)
  gel("bm").textContent = formatforz(d.better_magic)
  gel("lscost").textContent = formatforz(new Decimal(1.15).pow(d.less_space).floor())
  gel("bmcost").textContent = formatforz(new Decimal(1.25).pow(d.better_magic).floor())
  gel("lsboost").textContent = formatforh(new Decimal(0.85).pow(d.less_space).times(100))
  gel("bmboost").textContent = formatforh(d.better_magic.divide(60).plus(1))
  gel("catssacrificed").textContent = formatforh(d.cat_god_sacrificed)
  gel("sacrificedboost").textContent = formatforh(((d.cat_god_sacrificed.plus(1)).logarithm(new Decimal(5).minus(VoidUpgradeBoosts(1))).plus(1)).pow(1.01))
  gel("hc").textContent = formatforz(d.hypercats)
  gel("hcboost").textContent = formatforh(d.hypercats.plus(1).pow(VoidUpgradeBoosts(2)))
  gel("timeplayed").textContent = formatTime(new Decimal(Date.now()).minus(d.startPlaying).divide(1000))
  gel("energycats").textContent = formatforh(d.energycats)
  gel("ecps").textContent = formatforh(d.cats.log(10))
  gel("highcats").textContent = formatforh(d.HighCats)
  gel("voidc").textContent = formatforh(d.voidcats)
  gel("exenercat").textContent = formatforh(d.energycats)
  gel("voidg").textContent = formatforh(d.energycats.log(10).times(new Decimal(1.375).pow(d.voidhypercats)
  ))
  gel("hypervoidcats").textContent = formatforz(d.voidhypercats)
  gel("hypervoidcatsboost").textContent = formatforh(new Decimal(1.375).pow(d.voidhypercats))
  
  gel("voidb").textContent = formatforh(!isNaN(d.cats.log(10).mag) ? d.voidcats.plus(1).log(3).times((catlimtemp.log(10).divide(d.cats.plus(1).log(10)))).plus(1) : 1)
  gel("catsize").textContent = format(catsize(d.cats)[0],6)
  gel("catweight").textContent = format(catsize(d.cats)[1],6)
  let percent_to_cl = isNaN(d.cats.log(10).divide(catlimtemp.log(10)).mag) ? new Decimal(0) :
  d.cats.log(10).divide(catlimtemp.log(10))
  gel("voidpower").textContent = formatforh(d.voidcats.pow(0.6).times(new Decimal(1).minus(percent_to_cl)))
  
  gel("catlimitboost").textContent = d.voidup3.lt(1) ? "" : "Boost: *" +format((((new Decimal(1.05).plus(VoidUpgradeBoosts(3))).pow(d.catlimit.minus(1)))),3) + " More Cats"
  
  gel("catgodvboost").textContent = format(VoidUpgradeBoosts(1),4)
  gel("hypercatvboost").textContent = format(VoidUpgradeBoosts(2),4)
  gel("catlimitvboost").textContent = format(VoidUpgradeBoosts(3),4)
  
  gel("csas").textContent = d.eautobuycs.gte(1) ? "ON" : "OFF"
  gel("cfas").textContent = d.eautobuycf.gte(1) ? "ON" : "OFF"
  gel("las" ).textContent = d.eautobuyl.gte(1)  ? "ON" : "OFF"
  gel("sas" ).textContent = d.eautobuys.gte(1)  ? "ON" : "OFF"
  
  gel("voidup1" ).className = d.voidup1.gte(1)  ? "vu1button" : "vu0button"
  gel("voidup2" ).className = d.voidup2.gte(1)  ? "vu1button" : "vu0button"
  gel("voidup3" ).className = d.voidup3.gte(1)  ? "vu1button" : "vu0button"
  
  const emprefix = ["csa","cfa","ear","as"]
  const emvalues = [10000,75000,50000,100000]
  for (let i = 0; i < 4; i++){
    gel(emprefix[i]+"em").textContent = d.energycats.gte(emvalues[i])?"Unlocked ("+formatforh(emvalues[i])+" EC)":formatforh(new Decimal(emvalues[i]).minus(d.energycats))+" ECs left ("+formatforh(emvalues[i])+" Required)"
  }
} 

/* x: index, i: tab */
function BuyItem(x,i){
  var catcoins=d.catlimit.minus(d.spent_cat_coins)
  if (i == 1){
    if (x == 1 && d.cats.gte(new Decimal(10).times(new Decimal(1.75).pow(d.cat_summoners)))){
      d.cats=d.cats.minus(new Decimal(10).times(new Decimal(1.75).pow(d.cat_summoners)))
      d.cat_summoners=d.cat_summoners.plus(1)
    }
    if (x == 2 && d.cats.gte(new Decimal(25).times(new Decimal(2.05).pow(d.cat_food)))){
      d.cats=d.cats.minus(new Decimal(25).times(new Decimal(2.05).pow(d.cat_food)))
      d.cat_food=d.cat_food.plus(1)
    }
  }

 if (i == 2){
   if (x==1 && catcoins.gte(new Decimal(1.15).pow(d.less_space).floor())){
     d.spent_cat_coins = d.spent_cat_coins.add(new Decimal(1.15).pow(d.less_space).floor())
     d.less_space = d.less_space.add(1)
   }
   if (x==2 && catcoins.gte(new Decimal(1.25).pow(d.better_magic).floor())){
     d.spent_cat_coins = d.spent_cat_coins.plus(new Decimal(1.25).pow(d.better_magic).floor())
     d.better_magic = d.better_magic.add(1)
   }
 }
  if (i == 3){
    if (x==1 && !d.voidup1.eq(1) && d.cat_god_sacrificed.gte(1e30)){
      d.voidup1 = new Decimal(1)
    }
    if (x==2 && !d.voidup2.eq(1) && d.hypercats.gte(10)){
      d.voidup2 = new Decimal(1)
    }
    if (x==3 && !d.voidup3.eq(1) && d.cats.gte(1e35)){
      d.voidup3 = new Decimal(1)
    }
  }
}
function VoidUpgradeBoosts(x){
  let catlimtemp = (new Decimal(1000).pow(d.catlimit)).times((new Decimal(0.85).pow(d.less_space)))
  let percent_to_cl = isNaN(d.cats.log(10).divide(catlimtemp.log(10)).mag) ? new Decimal(0) :
  d.cats.log(10).divide(catlimtemp.log(10))
  let voidenergy = d.voidcats.pow(0.6).times(new Decimal(1).minus(percent_to_cl))
  if (x==1){
    if (d.voidup1.lt(1) || d.voidupcooldown.gt(0)){
      return new Decimal(0)
    }
    else {
      return (new Decimal(1).divide(new Decimal(-0.00015).times(voidenergy.plus(4000)))).plus(2)
    }
  }
  if (x==2){
    if (d.voidup2.lt(1) || d.voidupcooldown.gt(0)){
      return new Decimal(1)
    }
    else {
      return (new Decimal(1).divide(new Decimal(-0.00022).times(voidenergy.plus(2280)))).plus(2).divide(3).plus(1)
    }
}
  if (x==3){
    if (d.voidup3.lt(1) || d.voidupcooldown.gt(0)){
      return new Decimal(0)
    }
    else{
      if (voidenergy.divide(10000).gte(4)){
      return new Decimal(4)}
      else{
        return voidenergy.divide(10000)
      }
    }
  }
}
function EnergyMilestone(){
  if (d.energycats.gte(0)){
    d.energycatmilestone = new Decimal(0)
  }
  if (d.energycats.gte(10000)){
    d.energycatmilestone = new Decimal(1)
  }
  if (d.energycats.gte(50000)){
    d.energycatmilestone = new Decimal(2)
  }
  if (d.energycats.gte(75000)){
    d.energycatmilestone = new Decimal(3)
  }
  if (d.energycats.gte(100000)){
    d.energycatmilestone = new Decimal(4)
  }
}
function Save(){localStorage.setItem("catgame-save",btoa(JSON.stringify(d)));localStorage.setItem("catgame-secrets",btoa(JSON.stringify(secrets)));localStorage.setItem("catgame-opt",btoa(JSON.stringify(options)))}
function Load(){
if (localStorage.getItem("catgame-save") != null) {
let data = JSON.parse(atob(localStorage.getItem("catgame-save")))
for (const i in data) d[i] = new Decimal(data[i])};
if (localStorage.getItem("catgame-secrets") != null) {
let data = JSON.parse(atob(localStorage.getItem("catgame-secrets")))
for (const i in data) secrets[i] = new Decimal(data[i]);}
if (localStorage.getItem("catgame-opt") != null) {
let data = JSON.parse(atob(localStorage.getItem("catgame-opt")))
for (const i in data) options[i] = data[i];}}
function HardReset(){
  if (confirm("Are you sure?")){
    if (confirm("Are you REALLY sure?")){
  localStorage.removeItem("catgame-save")
  localStorage.removeItem("catgame-secrets")
  location.reload()}}
}
function Tabs() {
  if (tab == "main"){gel("main").style.display = "inline";}
  else {gel("main").style.display = "none";}
  if (tab == "options"){gel("options").style.display = "inline";}
  else {gel("options").style.display = "none";}
  if (tab == "catlimit"){gel("catlimit").style.display = "inline";}
  else {gel("catlimit").style.display = "none";}
  if (tab == "catcoins"){gel("catcoins").style.display = "inline";}
  else {gel("catcoins").style.display = "none";}
  if (tab == "catgod"){gel("catgod").style.display = "inline";}
  else {gel("catgod").style.display = "none";}
  if (tab == "hypercats"){gel("hypercats").style.display = "inline";}
  else {gel("hypercats").style.display = "none";}
  if (tab == "energy"){gel("energy").style.display = "inline";}
  else {gel("energy").style.display = "none";}
  if (tab == "void"){gel("void").style.display = "inline";}
  else {gel("void").style.display = "none";}
  
  if (loaftime > 10){
  gel("loafing").style.display = "none";
  }
  loaftime+=1
  //secretcodes
  //hyper specifi-cats
  if (tab == "hyperspecificats")
  {gel("hyperspecificats").style.display = "inline";
    gel("hyperspecificcats").textContent = format(d.cats,12)
   gel("hyperspecifichighcats").textContent = format(d.HighCats,12)
  gel("hyperspecificcatsize").textContent = format(catsize(d.cats)[0],12)
  gel("hyperspecificcatweight").textContent = format(catsize(d.cats)[1],12)}
  else {gel("hyperspecificats").style.display = "none";}
  //dogs^4
  if (tab == "dogsdogsdogsdogs")
  {gel("dogsdogsdogsdogs").style.display = "inline";}
  else {gel("dogsdogsdogsdogs").style.display = "none";}
  //stupidoptions
  if (tab == "stupidoptionslol")
  {gel("stupidoptionslol").style.display = "inline";}
  else {gel("stupidoptionslol").style.display = "none";}
  //??????
  
  if ((d.voidcats.gte(100000) || d.voidhypercats.gte(1)) && d.catlimit.gte(11)){
    gel("voidhypercatstuff").disabled = false;
  gel("voidhypercatstuff").style = "visibility: visible";
  }else{
    gel("voidhypercatstuff").disabled = true;
  gel("voidhypercatstuff").style = "visibility: hidden";
  }
 
   gel("overlay").style.display= d.voidgain.gte(1) ? "inline" : "none"
  
  if (d.cats.greaterThanOrEqualTo(999) || d.catlimit.greaterThanOrEqualTo(2)){gel("catlimbutton").style.display = "inline";}
  else {gel("catlimbutton").style.display = "none";}
  if (d.catlimit.greaterThanOrEqualTo(2)){gel("catcoinbutton").style.display = "inline";}
  else {gel("catcoinbutton").style.display = "none";}
  if (d.catlimit.greaterThanOrEqualTo(4)){gel("catgodbutton").style.display = "inline";}
  else {gel("catgodbutton").style.display = "none";}
  if (d.catlimit.greaterThanOrEqualTo(7)){gel("hypercatsbutton").style.display = "inline";}
  else {gel("hypercatsbutton").style.display = "none";}
  if (d.catlimit.greaterThanOrEqualTo(8)){gel("energybutton").style.display = "inline";}
  else {gel("energybutton").style.display = "none";}
  if (d.catlimit.greaterThanOrEqualTo(11)){gel("voidbutton").style.display = "inline";}
  else {gel("voidbutton").style.display = "none";}
}
function CatGodSacrifice(){
  var p = d.cats
  if (d.cat_summoners.gte(1)){
  d.cats = new Decimal(0)
  d.cat_god_sacrificed = d.cat_god_sacrificed.plus(p)
  d.voidupcooldown = new Decimal(1)
}}
function HyperCatsReset(multicat){
  const mulcat = new Decimal(multicat)
  if (mulcat.gte(1)){}
  else {
    if (d.cats.gte(new Decimal(1e3).times(new Decimal(4e2).pow(d.hypercats)))){
      d.cats = new Decimal(11)
      d.cat_summoners = new Decimal(0)
      d.cat_food = new Decimal(0)
      d.hypercats = d.hypercats.plus(1)
      d.voidupcooldown = new Decimal(10)
    }
  }
}
function VHyperCatsReset(multicat){
  const mulcat = new Decimal(multicat)
  if (mulcat.gte(1)){}
  else {
    if (d.voidcats.gte(new Decimal(1e5).times(new Decimal(2.25).pow(new Decimal(0.93).times(d.voidhypercats))))){
      d.voidcats = new Decimal(1e5).times(new Decimal(2.25).pow(new Decimal(0.93).times(d.voidhypercats)))
      d.voidhypercats = d.voidhypercats.plus(1)
    }
  }
}
function CatLimReset(force=0){
  let catlimtemp = (new Decimal(1000).pow(d.catlimit)).times((new Decimal(0.85).pow(d.less_space)))
  if (d.cats.greaterThanOrEqualTo(catlimtemp) || force==1){
  d.cats= new Decimal(11)
  if (force==0){d.catlimit = d.catlimit.plus(1)}
  d.cat_summoners = new Decimal(0)
  d.cat_food = new Decimal(0)
  d.cat_god_sacrificed = new Decimal(0)
  d.hypercats = new Decimal(0)
    d.energycats = new Decimal(0)
    d.voidupcooldown = new Decimal(1)
}}
function BuyAll(){
  if (d.catlimit.gte(6)){
  while (d.cats.greaterThanOrEqualTo(new Decimal(10).times(new Decimal(1.75).pow(d.cat_summoners))) || d.cats.greaterThanOrEqualTo(new Decimal(25).times(new Decimal(2.05).pow(d.cat_food)))){
    BuyItem(2,1);BuyItem(1,1);
  }
}}
function Respec(x){
  if (x==1){
    if (confirm("Are you sure? you will regain all your Cat Coins, but you will have to retry the CL!")){
  d.spent_cat_coins= new Decimal(0)
  d.less_space= new Decimal(0)
  d.better_magic= new Decimal(0)
  CatLimReset(1)
  }}
}
function VerifyCode(code){
  if (code.length !== 16) return;
  switch (code) {
    case "hyperspecificats":
      tab = "hyperspecificats";
      break;
    case "killsyourselfasap":
      HardReset()
      break
    case "dogsdogsdogsdogs":
      d.cats = new Decimal(0)
      tab = "dogsdogsdogsdogs"
      break
    case "mewwhenthecatsdo":
      console.log("mew in 3m")
      setTimeout(() => {  console.log('mew'); alert("mew sound not found") }, 180000);
      break
    case "excludeallstyles":
      document.querySelectorAll('style,link[rel="stylesheet"]').forEach(item => item.remove())
      break
    case "moregamesbyteste":
      window.location.href = "https://testehome.glitch.me/cmowre";
      break
    case "stupidoptionslol":
      tab = "stupidoptionslol"
      break
    default:
      alert("Invalid code")
  } gel("secretpasses").value = "";}
Load()
gel("newsticker").textContent = newsfile[Math.floor(Math.random()*(newsfile.length-1))]
setInterval(() => {Save()},10000)
setInterval(() => {
  let catlimtemp = (new Decimal(1000).pow(d.catlimit)).times((new Decimal(0.85).pow(d.less_space)))
  if (d.cats.gte(d.HighCats)){d.HighCats = d.cats}
  let dt = (new Decimal(Date.now()).minus(d.lastTick).divide(1000))
  deltatime = (new Decimal(Date.now()).minus(d.lastTick).divide(1000))
  d.lastTick = new Decimal(Date.now());
  document.title = formatforh(d.cats)+" Cats | CatGame"
  Tabs()
  
  // CS^((cc.BM/60)+1)*(1.75^CF)
  let base_cps = (d.cat_summoners.pow(d.better_magic.divide(60).plus(1))).times(new Decimal(1.75).pow(d.cat_food))
  
  //1.05^CL
  let catlimit_boost = ((new Decimal(1.05).plus(VoidUpgradeBoosts(3))).pow(d.catlimit.minus(1)))
  
  //(log5(cg.SA+1)+1)^1.01
  let catgod_boost = ((d.cat_god_sacrificed.plus(1)).logarithm(new Decimal(5).minus(VoidUpgradeBoosts(1))).plus(1)).pow(1.01)
  let hypercat_boost = d.hypercats.plus(1).pow(VoidUpgradeBoosts(2))
  
  // log3(VC+1)*(log10(CL.v)/(log10(cats+1))+1 if >1 or not undefined, else 1
  let void_boost = !isNaN(d.voidcats.plus(1).log(3).times((catlimtemp.log(10).divide(d.cats.plus(1).log(10)))).plus(1)) && d.voidcats.plus(1).log(3).times((catlimtemp.log(10).divide(d.cats.plus(1).log(10)))).plus(1).gte(1) ? d.voidcats.plus(1).log(3).times((catlimtemp.log(10).divide(d.cats.plus(1).log(10)))).plus(1) : 1
  
  catspersecond = base_cps.times(catlimit_boost).times(catgod_boost).times(hypercat_boost).times(void_boost)
  
UpdateScreen()
  
  d.voidupcooldown = d.voidupcooldown.minus(dt)
  
  if (d.catlimit.greaterThanOrEqualTo(8) && !isNaN(d.cats.log(10).mag) && !d.voidgain.gte(1)){d.energycats = d.energycats.plus(d.cats.log(10).times(dt))}
  
    if (d.catlimit.greaterThanOrEqualTo(11) && !isNaN(d.energycats.log(10).mag) && d.voidgain.gte(1)){d.voidcats = d.voidcats.plus((d.energycats.log(10).times(new Decimal(1.375).pow(d.voidhypercats)
  )).mul(dt))}
  
d.cats = d.cats.plus(catspersecond.mul(dt))
  
  if (d.cats.greaterThanOrEqualTo(catlimtemp)){d.cats = catlimtemp }
if (d.catlimit.greaterThanOrEqualTo(8)){
EnergyMilestone()
if (d.energycatmilestone.gte(4) && d.eautobuys.gte(1) && !d.voidgain.gte(1)){
  d.cat_god_sacrificed=d.cat_god_sacrificed.plus(d.cats.divide(20).mul(dt))
}
if (d.energycatmilestone.gte(2) && d.eautobuyl.gte(1) && !d.voidgain.gte(1)){
  CatLimReset(0)
}
if (d.energycatmilestone.gte(3) && d.eautobuycf.gte(1) && !d.voidgain.gte(1)){
  BuyItem(2,1)
}
if (d.energycatmilestone.gte(1) && d.eautobuycs.gte(1) && !d.voidgain.gte(1)){
  BuyItem(1,1)
}}
if (tab == "dogsdogsdogsdogs"){d.cats=new Decimal(0)}

time_since_last_news_message = time_since_last_news_message.add(dt)
if (time_since_last_news_message.gte(10)){
  console.log(newsfile[Math.floor(Math.random()*(newsfile.length-1))])
  gel("newsticker").textContent = newsfile[Math.floor(Math.random()*(newsfile.length-1))]
  time_since_last_news_message = new Decimal(0)
}},1000/60)