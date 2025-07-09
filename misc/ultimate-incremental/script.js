//Jayman: I was thinking we could convert some of the codebase, little by little into ES6 [what is ES6?] classes to keep it maintainable in the future. Just a thought :)
// ES6 or EMCAScript is the javascript versioning thingy, I mean that we can use class contructors and stuff to handle state and functions. It's better practice as far as I know.
//gwa gwa! if you see this tell flame

function format(x,precision=2){
  if(D(x).gte(1e10000)){
    let num = D(x)
    let e = num.log10().floor() // lol
    return "e"+e
  }
  else if(D(x).gte(1e100)){
    let num = D(x)
    let e = num.log10().floor()
    let m = D(num.div(ExpantaNum.pow(10, e)).toFixed(precision))
    return m+"e"+e
  }
  else if(D(x).gte(1e7)){
    return D(x).toStringWithDecimalPlaces(precision)
  }
  return D(x).toFixed(2)
}
function exponentialFormat(num, precision, mantissa = true) { // the one you pasted here
  let e = num.log10().floor()
  let m = num.div(ExpantaNum.pow(10, e))
  if(m.toStringWithDecimalPlaces(precision) == 10) {
    m = D(1)
    e = e.add(1)
  }
  e = (e.gte(10000) ? commaFormat(e, 0) : e.toStringWithDecimalPlaces(0))
  if (mantissa)
    return m.toStringWithDecimalPlaces(precision)+"e"+e
    else return "e"+e
  }
function commaFormat(num, precision) {
  if (num === null || num === undefined) return "NaN"
  if (num.mag < 0.001) return D(0).toFixed(precision)
  return num.toStringWithDecimalPlaces(precision).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}

function regularFormat(num, precision) {
  if (num === null || num === undefined) return "NaN"
  if (num.mag < 0.001) return (0).toFixed(precision)
  return num.toStringWithDecimalPlaces(precision)
}
var player = {
  version: 0.02,
  data: {
    started: false,
    canGainPoints:false,
    tab: 1,
    subtab: 0,
    subsubtab: 1,
    lastTick: D(Date.now()),
    showChallenges: true
  },
  achs: [],
  unlocks:{
    booster: false,
    fly: false,
    air: false,
    power: false,
    energy: false,
    spaceAutobuyer: false,
    planets: false,
    brAutobuyer:false,
  },
  points:D(0),
  boosters:D(0),
  boostersLost:D(0),
  air:D(0),
  space:D(0),
  upgrades:{
    air:[false,false,false,false,false,false,false,false,false,false],
    energy:[false,false,false,false,false,false,false,false],
  },
  milestones:{
    space:[false,false,false,false],
    energy:[false,false,false],
    planets:[false,false,false,false,false,false]
  },
  rebuyables:{
    space:[D(0),D(0),D(0),D(0)],
    energy:[D(0),D(0),D(0)],
    boosters:[D(0),D(0),D(0)]
  },
  challenges:{
    energy:{
      inChallenge:[false,false,false,false],
      beatChallenge:[false,false,false,false]
    }
  },
  power:D(0),
  gainingPower: false,
  energy:D(0),
  stniop:D(1),
  automation:[false,false,false],
  planets:{
    amt:D(0),
    total:D(0),
    finished:D(0),
    planet:{},
    onPlanet:false,
    atWall:false,
  },
  achs: {},
  theme:0,
  font:0,
}
var oldPlayer = player;
function exitChallenge(){
  player.challenges.energy.inChallenge=[false,false,false,false]
  player.stniop=D(1)
}
function exitchallbtn() {
 for (layer in player.challenges) {
   for (chal_id in player.challenges[layer].inChallenge)  {
   finishChallenge(layer, chal_id)
     player.challenges[layer].inChallenge[chal_id]=false
  }
 }
  
    
  player.stniop=D(1)
}
function oldexitchallbtn() {

   for (chal_id in player.challenges["energy"].inChallenge)  {
     if (player.challenges["energy"].inChallenge[chal_id]) {
         finishChallenge("energy", chal_id)
       
     }
 
   
  }
   player.challenges.energy.inChallenge=[false,false,false,false]
  
    
  player.stniop=D(1)
}
function getcurrentLayer() {
  
  
  
}


var app = new Vue({
  el: "#app",
  data() {
    return {
      player,
      start,
      boosterData,
      pointGain,
      flyData,
      airData,
      spaceData,
      powerData,
      energyData,
      upgradeData,
      planetData,
      achievementData,
      randomizePlanetNames,
      buyUpgrade,
      save,
      hasUpgrade,
      hasMilestone,
      rebuyableAmt,
      rebuyableCost,
      D,
      format,
      getThemeName,
      getFontName,
      inAnyChallenge,
      hasAllChallenges,
      tickspeed,
      getData,
      pbGetters
    }
  }
})

function start(){
  if (typeof localStorage.ultimateIncremental != "undefined") {
    player = decimalize(loopAssign(player, JSON.parse(localStorage.ultimateIncremental)));
    player.data.started=false
    player.canGainPoints=false
  }
  player.version = 0.1;
  switchtheme();
  switchfont();
  for(let i in achievementData) {
      let ach = achievementData[i];
      let id = i; // we need preservation yeah you do
      if(player.achs[id]===undefined) Vue.set(player.achs, id, false);
  }
  setInterval(loop,50)
  setInterval(checkForUnlocks,100)
  setInterval(save,1000)
  window.addEventListener("keydown",function(k){
    let key = k.key.toString()
    if(key=="b"){
      boosterData.buy()
    }
    else if(key=="f"){
      flyData.reset()
    }
    else if(key=="p"){
      if(player.points.gte(1e7)&&player.unlocks.power)player.gainingPower=!player.gainingPower
    }
    else if(key=="e"){
      energyData.buy()
    }
    else if(key=="a"){
      if(hasAllChallenges('energy'))player.automation[0]=!player.automation[0]
      if(player.unlocks.spaceAutobuyer)player.automation[1]=!player.automation[1]
      if(player.unlocks.brAutobuyer)player.automation[2]=!player.automation[2]
    }
   /* else if(key=="c"){
      if(inAnyChallenge('energy'))exitChallenge()
    } */
    else if(key=="P" /*wow it actually functions correctly*/){
      planetData.buy()
      if(player.planets.atWall && !player.planets.planet[player.planets.amt.toNumber()].completed && planetData.canBeatWall()) planetData.beatWall()
      else if(player.planets.planet[player.planets.amt.toNumber()].completed)planetData.completePlanet()
    }
  },false)
}
function tickspeed(){
  return D(1/20)
}
function pointGain(){
  let basepointgain = D(0.1).add(hasUpgrade("air",1)&&!inChallenge("energy",1)&&!inChallenge("energy",2)&&!inChallenge("energy",3)?0.02:0)
  let boosterBase = D(2).add(rebuyableAmt("boosters",0).div(100))
  let mul = boosterBase.pow(D(player.boosters).add(boosterData.extra())).pow(inAnyChallenge("energy")?0.5:1)
  mul=mul.mul(flyData.boost())
  if(hasUpgrade("air",0) && !inChallenge("energy",1)&&!inChallenge("energy",2)&&!inChallenge("energy",3))mul=mul.mul(2)
  if(hasUpgrade("air",2)&&!inChallenge("energy",1)&&!inChallenge("energy",2)&&!inChallenge("energy",3)){mul=mul.mul(airData.boost());mul=mul.mul(1.5)}
  mul=mul.mul(D(1.2).pow(rebuyableAmt("space",0)))
  mul=mul.mul(powerData.boost())
  if(hasUpgrade("energy",2))mul=mul.mul(energyData.boost().pow(0.75))
  if(hasChallenge("energy",0)&&!inChallenge("energy",3))mul=mul.mul(1.5)
  if(inAnyChallenge("energy"))mul=mul.mul(3)
  mul=mul.mul(D(25).pow(rebuyableAmt("boosters",1)))
  mul=mul.mul(planetData.planetBoost())
  if(hasMilestone("planets",0))mul=mul.mul(1e10)
  if(hasMilestone("planets",4))mul=mul.mul(1e10)
  if(inAnyChallenge("energy"))mul=mul.pow(1.5)
  if(player.achs[41])mul=mul.mul(2) // Not permanent. Take it out if you see this as it was a test as an achievement reward.
  let gain = basepointgain.mul(mul)
  gain=gain.pow(player.stniop)
  if(hasChallenge("energy",2))gain=gain.pow(1.05)
  return gain
}
function loop() {
  if(player.data.canGainPoints)tick(Date.now() - player.data.lastTick.toNumber())
  player.data.lastTick = D(Date.now())
}
function tick(diff){
  updateAchCompletions();
  if (player.version==0.02) {
    player.rebuyables.energy=[D(0),D(0),D(0)]
  }
  if(player.planets.total.gt(0) && player.planets.planet=={}) planetData.createPlanet()
  if(!player.planets.total.eq(player.planets.amt) && player.planets.onPlanet==false){
    if(!("planet" in player.planets))player.planets.planet={}
    if(player.planets.amt.toNumber() in player.planets.planet){
      if(player.planets.planet[player.planets.amt.toNumber()].progress.lt(100))player.planets.onPlanet=true
      else player.planets.onPlanet=false
    }else player.planets.onPlanet=false
  }
  if (player.automation[0]){
    let maxBuy = 3
    if(hasMilestone("energy",0))maxBuy=5
    if(hasMilestone("energy",1))maxBuy=10
    if(hasMilestone("energy",2))maxBuy=25
    if(hasMilestone("planets",4))maxBuy=100
    for(let x=0;x<maxBuy;x++){boosterData.buy()}
  }
  if (player.automation[1]){
    buyRebuyable('space',0)
    buyRebuyable('space',1)
    buyRebuyable('space',2)
    if(hasUpgrade("air",6))buyRebuyable("space",3)
  }
  if(player.automation[2]){
    buyRebuyable("boosters",2,false)
    buyRebuyable("boosters",1,false)
    buyRebuyable("boosters",0,false)
  }
  if(!player.gainingPower) player.points=player.points.add(pointGain().mul(tickspeed()).mul(diff/50).mul(player.milestones.space[1]?2:1)) //
  else{
    player.points=player.points.div(powerData.lossEffectOnPoints().pow(tickspeed()).pow(diff/50))
    player.power=player.power.plus(powerData.gain().mul(diff/50).mul(tickspeed()))
    if(player.points.lt(1e7))player.gainingPower=false
  }
  if(player.planets.onPlanet&&!player.planets.amt.eq(player.planets.total)){
    if(player.planets.planet[player.planets.amt.toNumber()]==undefined)planetData.createPlanet()
    if(player.planets.planet[player.planets.amt.toNumber()].progress.gte(D(99).div(player.planets.planet[player.planets.amt.toNumber()].wallsAmt).mul(player.planets.planet[player.planets.amt.toNumber()].wallsBeat.add(1)))){if(player.planets.planet[player.planets.amt.toNumber()].progress.gte(99)){player.planets.planet[player.planets.amt.toNumber()].progress=D(99)};player.planets.atWall=true}
    else if(player.planets.planet[player.planets.amt.toNumber()].progress.lt(100)){
      player.planets.planet[player.planets.amt.toNumber()].progress=player.planets.planet[player.planets.amt.toNumber()].progress.add(tickspeed().mul(diff/50).mul(hasMilestone("planets",3)?2:1))
    }
    else if(player.planets.planet[player.planets.amt.toNumber()].progress.gte(100)){
      player.planets.planet[player.planets.amt.toNumber()].progress=D(100)
      player.planets.planet[player.planets.amt.toNumber()].completed=true
    }
  }
  if(hasUpgrade("air",4))player.space=player.space.add(spaceData.gain().mul(tickspeed()).mul(diff/50))
  if(inChallenge("energy",2)||inChallenge("energy",3)){
    if(D(player.stniop).gt(0.01))player.stniop=player.stniop.sub(D(0.01).mul(tickspeed()).mul(diff/50))
    else{
      player.stniop=D(0.01)
    }
  }else{
    player.stniop=D(1)
  }
}
function checkForUnlocks(){
  let unlock = player.unlocks
  unlock.booster = unlock.booster || player.points.gte(1)
  unlock.fly = unlock.fly || player.boosters.gte(4)
  unlock.air = unlock.air || player.boosters.gte(7)
  unlock.power = unlock.power || player.points.gte(2.5e7)
  unlock.energy = unlock.energy || player.power.gte(10)
  unlock.spaceAutobuyer = unlock.spaceAutobuyer || player.energy.gte(5)
  unlock.planets = unlock.planets || player.points.gte(1e100)
  unlock.brAutobuyer = unlock.brAutobuyer || player.energy.gt(14)
  completeMilestones()
}

function changeTab(num,tabType){
  switch(tabType) {
    case "tab":
      player.data.tab = num
      player.data.subtab = 1
      player.data.subsubtab = 1
      break;
    case "subtab":
      player.data.subtab = num
      player.data.subsubtab = 1
      break;
    case "subsubtab":
      player.data.subsubtab = num
      break;
    default:
      throw Error("Changing tabs failed: "+tabType+" is not a valid tab type.")
  }
}
const tabnames = {
  1:"Main",
  2:"Options",
  3:"Changelog",
  4:"Achievements",
  
  
  
}
const subtabnames = {
  1:"Boosters",
  2:"Fly",
  3:"Power",
  4:"Planet"
  
  
  
}

const subsubtabnamesfly = {
  1:"Main",
  2:"Air",
  3:"Space",
 

}
const subsubtabnamespower = {
   1:"Power",
  2:"Energy",
  3:"Automation",
  
}
const subsubtabs = {
  2:subsubtabnamesfly,
  3:subsubtabnamespower
}

function getTabName(tabType) {
 
    switch(tabType) { 
    case "all": 
      return [tabnames[player.data.tab],player.data.tab==(1) ? (subtabnames[player.data.subsubtab]) :"none",player.data.subtab==(2||3)? (subsubtabs[player.data.subtab])[player.data.subsubtab]:"none"
]
      break;
    case "tab":
      return tabnames[player.data.tab]
      break;
    case "subtab":
      return  player.data.tab==(1) ? (subtabnames[player.data.subsubtab]) :"none"

      break;
    case "subsubtab":
         
       return player.data.subtab==(2||3)? (subsubtabs[player.data.subtab])[player.data.subsubtab]:"none"

      break;
    
  }
}
  
  

function randomizePlanetNamesOld(){
  let lettersAmt = 15
  let letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
  let name = ""
  for(x=0;x<lettersAmt;x++){
    let randomNum = Math.floor(Math.random()*62)
    if(randomNum>=10){
      if(randomNum>=36){
        name = name+letters[randomNum-36].toUpperCase()
      }
      else{
        name=name+letters[randomNum-10]
      }
    }
    else{
      name=name+randomNum
    }
  }
  return name
}

function randInt(x) {
  return Math.floor(Math.random()*x);
}

function chooseElement(arr) {
  return arr[randInt(arr.length)];
}

function randomizePlanetNames() {
  // Copied from https://www.fantasynamegenerators.com/planet_names.php

  let part1 = ["b","c","ch","d","g","h","k","l","m","n","p","r","s","t","th","v","x","y","z","","","","",""];
  let part2 = ["a","e","i","o","u"];
  let part3 = ["b","bb","br","c","cc","ch","cr","d","dr","g","gn","gr","l","ll","lr","lm","ln","lv","m","n","nd","ng","nk","nn","nr","nv","nz","ph","s","str","th","tr","v","z"];
  let part3b = ["b","br","c","ch","cr","d","dr","g","gn","gr","l","ll","m","n","ph","s","str","th","tr","v","z"];
  let part4 = ["a","e","i","o","u","a","e","i","o","u","a","e","i","o","u","ae","ai","ao","au","a","ea","ei","eo","eu","e","ua","ue","ui","u","ia","ie","iu","io","oa","ou","oi","o"];
  let part5 = ["turn","ter","nus","rus","tania","hiri","hines","gawa","nides","carro","rilia","stea","lia","lea","ria","nov","phus","mia","nerth","wei","ruta","tov","zuno","vis","lara","nia","liv","tera","gantu","yama","tune","ter","nus","cury","bos","pra","thea","nope","tis","clite"];
  let part6 = ["una","ion","iea","iri","illes","ides","agua","olla","inda","eshan","oria","ilia","erth","arth","orth","oth","illon","ichi","ov","arvis","ara","ars","yke","yria","onoe","ippe","osie","one","ore","ade","adus","urn","ypso","ora","iuq","orix","apus","ion","eon","eron","ao","omia"];
  let part7 = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9","0","1","2","3","4","5","6","7","8","9","","","","","","","","","","","","","",""];

  let type = randInt(10);
  let name = "";
  
  if(type < 2){
      let name_p1 = chooseElement(part1);
      let name_p2 = chooseElement(part2);
      let name_p3 = chooseElement(part3);
      while(name_p1 == name_p3){
        name_p3 = chooseElement(part3);
      }
      let name_p4 = chooseElement(part4);
      let name_p5 = chooseElement(part5);
      name = name_p1 + name_p2 + name_p3 + name_p4 + name_p5;
    }
    else if(type < 4){
      let name_p1 = chooseElement(part1);
      let name_p2 = chooseElement(part2);
      let name_p3 = chooseElement(part3);
      while(name_p1 == name_p3){
        name_p3 = chooseElement(part3);
      }
      let name_p4 = chooseElement(part6);
      name = name_p1 + name_p2 + name_p3 + name_p4;
    }
    else if(type < 6){
      let name_p1 = chooseElement(part1);
      let name_p2 = chooseElement(part4);
      let name_p3 = chooseElement(part5);
      name = name_p1 + name_p2 + name_p3;
    }
    else if(type < 8){
      let name_p1 = chooseElement(part1);
      let name_p2 = chooseElement(part2);
      let name_p3 = chooseElement(part3b);
      while(name_p1 == name_p3){
        name_p3 = chooseElement(part3b);
      }
      let name_p4 = chooseElement(part2);
      let name_p5 = chooseElement(part5);
      name = name_p1 + name_p2 + name_p3 + name_p4 + name_p5;
    }
    else{
      let name_p1 = chooseElement(part3b);
      let name_p2 = chooseElement(part6);
      let name_p3 = chooseElement(part7);
      let name_p4 = chooseElement(part7);
      let name_p5 = chooseElement(part7);
      let name_p6 = chooseElement(part7);
      name = name_p1 + name_p2 + " " + name_p3 + name_p4 + name_p5 + name_p6;
    }
    
    name = name.charAt(0).toUpperCase() + name.slice(1);
    return name;
}
window.onload = () => start();