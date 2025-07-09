let O = x => {
  return new OmegaNum(x); // Ignore
};

var Omg = OmegaNum; // Ignore

function Game() {
  this.pts = O("0"); // The number
  this.btn = O("1"); // Button level
  this.bc = O("20"); // Button cost
  this.ps = O("1"); // Number per second (modified)
  this.auto1 = { // Autobuyer stats
    lv: 0, // Level
    tick: 0,
  };
  this.tet = { // Tetrate (prestige layer) stats
    pts: O(0),
    pdpt: O(0), // Pending points
    ups: [false,false], // Whether or not upgrades were bought
    upcs: [O(7),O(100)], // Costs of upgrades
    bmlt: O(1), // Linear multiplier on buttons
  };
  this.pnt = { // Pentate (prestige layer) stats
    pts: O(0),
    pdpt: O(0),
    ups: [false,false,false],
    upcs: [O(7),O(20),O(50)],
    bmlt: O(1),
  }
}

var interval = 10;

var game = new Game();

var tab = "lngi";

load();

setInterval(save, interval/1000);

function switchTabs(newtab){ // Switches between different tabs
  document.getElementById(tab).style.display = "none";
  document.getElementById(newtab).style.display = "block";
  tab = newtab;
}

function loga3(onum) { // Pentation log
  if(onum.array.length > 4){
    return O(onum);
  } else if(onum.array.length == 4){
    onum.array[3]--;
    return O(onum);
  } else if(onum.array.length == 3){
    onum = O(onum.array[2]).add(1);
    return O(onum);
  } else if(onum.array.length == 2 && onum.array[1] >= 10){
    return O(2);
  } else if(onum.array[1] < 10 || onum.array.length == 1){
    return O(1);
  } else {
    return O(0);
  }
}

function notate(omgnum,fp) { // How to write things ingame
  if(O(omgnum).lt("1e6")){
    return O(omgnum).toNumber().toFixed(fp);
  } else if(O(omgnum).lt("ee6")){
    return O(omgnum).div(O(10).pow(O(omgnum).log10().floor())).toNumber().toFixed(2) + "e" + O(omgnum).log10().floor();
  } else if(O(omgnum).slog(10).lt(10)) {
    return "e" + notate(O(omgnum).log10(),fp);
  } else if(O(omgnum).lt("10^^^5"))  {
    return "10^^" + notate(O(omgnum).slog(10),fp);
  } else {
    return O(omgnum).toHyperE();
  }
}

function updateText() { // Updates all text
  document.getElementById("num").textContent = notate(O(game.pts),1);
  document.getElementById("btn1").textContent = notate(O(game.btn),1);
  if(game.auto1.lv < 20){
    document.getElementById("al1").textContent = game.auto1.lv;
    document.getElementById("at1").textContent = 1000-game.auto1.lv*50;
    document.getElementById("ac1").textContent = notate(O(10000).pow(O(game.auto1.lv).add(1)),1);
  } else {
    document.getElementById("al1").textContent = "MAX";
    document.getElementById("at1").textContent = "instant";
    document.getElementById("ac1").textContent = "Infinite";
  }
  document.getElementById("bc1").textContent = notate(O(game.bc),1);
  document.getElementById("tp").textContent = notate(O(game.tet.pts),1);
  document.getElementById("tb").textContent = notate(O(1.05).add(O(game.tet.pts).add(O(game.pnt.pts)).div(100)).pent(O(game.pnt.pts).div(100).add(1)),2);
  document.getElementById("tpdpt").textContent = notate(O(game.tet.pdpt),1);
  document.getElementById("tps").textContent = notate(O(game.tet.pts).div(100).mul(O(game.pnt.bmlt)).add(O(0.01)),2);
  document.getElementById("pp").textContent = notate(O(game.pnt.pts),1);
  document.getElementById("pb").textContent = notate(O(1).add(O(game.pnt.pts).div(100)),2);
  document.getElementById("ppdpt").textContent = notate(O(game.pnt.pdpt),0);
  if(game.tet.ups[0]){
    document.getElementById("tu1").textContent = "Bought!";
  } else {
    document.getElementById("tu1").textContent = "Not bought!";
  }
  if(game.tet.ups[1]){
    document.getElementById("tu2").textContent = "Bought!";
  } else {
    document.getElementById("tu2").textContent = "Not bought!";
  }
  if(game.pnt.ups[0]){
    document.getElementById("pu1").textContent = "Bought!";
  } else {
    document.getElementById("pu1").textContent = "Not bought!";
  }
  if(game.pnt.ups[1]){
    document.getElementById("pu2").textContent = "Bought!";
  } else {
    document.getElementById("pu2").textContent = "Not bought!";
  }
  if(game.pnt.ups[2]){
    document.getElementById("pu3").textContent = "Bought!";
  } else {
    document.getElementById("pu3").textContent = "Not bought!";
  }
}

function updateBtn(){ // Updates buttons
  if(O(game.pts).gte("e100") && !game.tet.ups[1]){
    document.getElementById("tetrate").style.display = "inline";
  } else {
    document.getElementById("tetrate").style.display = "none";
  }
  if(game.auto1.lv == 20 || O(game.tet.pts).gt(0)){
    document.getElementById("tetbtn").style.display = "inline";
  }
  if(O(game.pts).gte("10^^12") && !game.pnt.ups[2]){
    document.getElementById("pentate").style.display = "inline";
  } else {
    document.getElementById("pentate").style.display = "none";
  }
  if(O(game.tet.pts).gte("e10") || O(game.pnt.pts).gt(0) || game.pnt.ups[0] || game.pnt.ups[1]){
    document.getElementById("pntbtn").style.display = "inline";
  } else {
    document.getElementById("pntbtn").style.display = "none";
  }
}

function buybtn1(amt){ // Buys button
  if(amt != "max") {
    if(O(game.pts).gte(O(amt).mul(O(game.bc)))){
      game.pts = game.pts.sub(O(amt).mul(O(game.bc)));
      game.btn = O(game.btn).add(O(amt));
    }
  } else {
    buybtn1(O(game.pts).div(O(game.bc)).floor());
  }
}

function auto1(){ // Buys autobuyer
  if(O(game.pts).gte(O(10000).pow(O(game.auto1.lv).add(1))) && game.auto1.lv < 20) {
    game.pts = O(game.pts).sub(O(10000).pow(O(game.auto1.lv).add(1)));
    game.auto1.lv++;
    if(game.auto1.lv == 20){
      document.getElementById("tetbtn").style.display = "inline";
    }
  }
}

function maxall(){ // Maxes button level
  buybtn1("max");
}

function tetrate(){ // Tetrates (prestige layer), resets various things while increasing tetration points.
  game.tet.pts = O(game.tet.pts).add(O(game.tet.pdpt));
  game.pts = O("0");
  game.btn = O("1");
  game.bc = O("20");
  game.ps = O("1");
  game.auto1 = {
    lv: 0,
    tick: 0,
  };
}

function tu(upg){ // Buys specified tetration upgrade
  if(O(game.tet.pts).gte(O(game.tet.upcs[upg])) && !game.tet.ups[upg]){
    game.tet.pts = O(game.tet.pts).sub(O(game.tet.upcs[upg]));
    if(upg >= 1){
      game.pts = O(0);
      tetrate();
      game.tet.pts = O(1);
    }
    game.tet.ups[upg] = true;
    document.getElementById("tu" + (upg+1)).textContent = "Bought!";
  } else if(!O(game.tet.pts).gte(O(game.tet.upcs[upg]))) {
    document.getElementById("tu" + (upg+1)).textContent = "Not bought!";
  }
}

function pentate(){
  game.pnt.pts = O(game.pnt.pts).add(O(game.pnt.pdpt));
  tetrate();
  game.tet.pts = O(0);
  if(!game.pnt.ups[1]){
    game.tet.ups = [false,false];
  }
}

function pu(upg){ // Buys specified pentation upgrade
  if(O(game.pnt.pts).gte(O(game.pnt.upcs[upg])) && !game.pnt.ups[upg]){
    game.pnt.pts = O(game.pnt.pts).sub(O(game.pnt.upcs[upg]));
    if(upg == 2){
      game.pts = O(0);
      pentate();
      game.pnt.pts = O(1);
    }
    if(upg == 1){
      game.tet.ups = [true,true];
    }
    game.pnt.ups[upg] = true;
    document.getElementById("pu" + (upg+1)).textContent = "Bought!";
  } else if(!O(game.tet.pts).gte(O(game.tet.upcs[upg]))) {
    document.getElementById("pu" + (upg+1)).textContent = "Not bought!";
  }
}

function loop() { // Main game loop
  game.tet.upcs = [O(7),O(100)];
  if(game.auto1.lv > 0 && game.auto1.lv < 20){
    game.auto1.tick++;
  } else if(game.auto1.lv == 20){
    game.btn = O(game.btn).mul(O(game.tet.bmlt).div(600).add(1));
    game.pts = O(game.ps).div(30);
  }
  if(game.pnt == undefined){
    game.pnt = { // Pentate (prestige layer) stats
      pts: O(0),
      pdpt: O(0),
      ups: [false,false,false],
      upcs: [O(7),O(20),O(50)],
      bmlt: O(1),
    };
  }
  game.pnt.upcs = [O(7),O(20),O(50)];
  game.ps = O(game.btn).tetr(O(1.05).add(O(game.tet.pts).div(100)).mul(O(game.pnt.pts).add(1)).pent(O(game.pnt.pts).div(100).add(1)));
  game.bc = O(game.ps).div(O(0.05).mul(O(game.btn)));
  game.pts = O(game.pts).add(O(game.ps).mul(O(game.tet.bmlt)).div(30));
  game.tet.pdpt = O(game.pts).pow(0.1).add(1).slog(10).mul(O(game.pnt.bmlt));
  game.pnt.pdpt = loga3(O(game.pts).add(1));
  if(game.tet.ups[0]){
    game.tet.bmlt = O(game.tet.pts).add(1).sqrt();
  } else {
    game.tet.bmlt = O(1);
  }
  if(game.tet.ups[1]){
    game.tet.pts = O(game.tet.pts).add(O(1).div(3000));
    game.tet.pts = O(game.tet.pts).add(O(game.tet.pts).mul(O(game.pnt.bmlt)).div(3000));
  }
  if(game.pnt.ups[0]){
    game.pnt.bmlt = O(game.pnt.pts).add(1).sqrt();
  } else {
    game.pnt.bmlt = O(1);
  }
  if(game.pnt.ups[2]){
    game.pnt.pts = O(game.pnt.pts).add(O(game.pnt.pts).div(3000));
  }
  if(game.pnt.ups[1] && O(game.pts).lt(1)){
    game.tet.pts = O(1);
  }
  updateText();
  updateBtn();
  if(game.auto1.tick >= (1000-game.auto1.lv*50)/(100/3)){
    game.auto1.tick -= (1000-game.auto1.lv*50)/(100/3);
    buybtn1("max");
  }
}

setInterval(loop, 1000/30);