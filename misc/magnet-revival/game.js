/* EVERYTHING for the Magnet Revival to function correctly.
Formatter takes many lines of code due to how trashy it is. Sorry!
*/


alert("This project is no longer being updated");

if (navigator.userAgent.indexOf("Windows NT 5.1") > -1 || navigator.userAgent.indexOf("Windows NT 5.2") > -1 || navigator.userAgent.indexOf("Windows NT 6") > -1) {
  alert("WARNING: Your operating system and browser is outdated, please update for the best experience!")
}

var game = {
  // Currencies
  magnets: 0,
  goldMagnets: 0,
  platinumMagnets: 0,
  diamondMagnets: 0,
  superMagnets: 0,
  legendaryMagnets: 0,
  // Multipliers and Costs
  multiply: 1,
  goldMagnetCost: 1250,
  goldMagnetGain: 1,
  firstMulCost: 25,
  secondMulCost: 50,
  thirdMulCost: 100,
  fourthMulCost: 200,
  fifthMulCost: 2500,
  autoMagnetCost: 5000,
  multiplyTwo: 1.8,
  multiplyThree: 4.2,
  multiplyFour: 7,
  multiplyFive: 11,
  multiplySix: 33,
  multiplySeven: 2,
  // Auto Stuff
  autoNumber: 6,
  autoSpeed: 0,
  goldBuyCost: 15,
  // Player Stats (Reset on prestige)
  gainMagsClicks: 0,
  firstMulClicks: 0,
  secondMulClicks: 0,
  thirdMulClicks: 0,
  fourthMulClicks: 0,
  fifthMulClicks: 0,
  goldMagsClicks: 0,
  autoMagsClicks: 0,
  // Player Stats (Permanent)
  gainMagsClicksTotal: 0,
  firstMulClicksTotal: 0,
  secondMulClicksTotal: 0,
  thirdMulClicksTotal: 0,
  fourthMulClicksTotal: 0,
  fifthMulClicksTotal: 0,
  goldMagsClicksTotal: 0,
  autoMagsClicksTotal: 0,
  // Prestige Boosts
  goldGainMul: 1.0000001,
  multiplyMul: 1.0000001,
  autoNumberMul: 1.001,
  platinumMagsGain: 1.001,
  // Store in-game time
  secondsPlayed: 0,
  minutesPlayed: 0,
  hoursPlayed: 0,
  daysPlayed: 0,
  // Gold Magnet Costs for Multipliers
  goldUpgOneCost: 60,
  goldUpgTwoCost: 150,
  goldUpgThreeCost: 400,
  goldUpgFourCost: 1200,
  goldUpgFiveCost: 4000,
  goldUpgSixCost: 7000,
  // Automator costs
  autoFirstMulCost: 1e21,
  autoSecondMulCost: 1e25,
  autoThirdMulCost: 1e29,
  autoFourthMulCost: 1e33,
  autoFifthMulCost: 1e41,
  // Automator intervals
  autoFirstMulInterval: 61800,
  autoSecondMulInterval: 82400,
  autoThirdMulInterval: 103000,
  autoFourthMulInterval: 123600,
  autoFifthMulInterval: 144200
}

/* EVERYTHING for the Magnet Revival to function correctly */
/* Modal Element (Display upon first time playing) */

var modal = document.getElementById("tutorial");

var span = document.getElementsByClassName("close")[0];

setInterval(() => {
  if (game.magnets == 0) {
    modal.style.display = "block";
  }
}, 100);

setInterval(() => {
  if (game.magnets > 0) {
    modal.remove();
  }
}, 100);

span.onclick = function() {
  modal.style.display = "none";
  modal.remove();
}

/* Count In-Game Time */
setInterval(() => {
  setTimeout(() => {
    game.secondsPlayed = game.secondsPlayed + 1;
  }, 0);
}, 1000);
setInterval(() => {
  if (game.secondsPlayed == 60) {
    game.secondsPlayed = 0;
    game.minutesPlayed = game.minutesPlayed + 1;
  }
}, 0);
setInterval(() => {
  if (game.minutesPlayed == 60) {
    game.minutesPlayed = 0;
    game.hoursPlayed = game.hoursPlayed + 1;
  }
}, 0);
setInterval(() => {
  if (game.hoursPlayed == 24) {
    game.hoursPlayed = 0;
    game.daysPlayed = game.daysPlayed + 1;
  }
}, 0);

setInterval(() => {
  document.getElementById('thirteen').innerHTML = "You have played for "+game.daysPlayed+" days, "+game.hoursPlayed+" hours, "+game.minutesPlayed+" minutes, and "+game.secondsPlayed+" seconds.<br>In-game time will reset if you hard reset the game."
}, 1000);

/* Check to see if on Android device (Keycodes don't work on mobile) */
function checkMobile() {
  var ua = navigator.userAgent.toLowerCase();
  var Android = ua.indexOf("android") > -1;
  if(Android) {
    document.getElementById('eleven').innerHTML = "Sorry mobile users, you have no access to keycodes! Also sorry about the low resolution as some phone screens are quite small.";
    document.getElementById('eleven').style.fontSize = "17px";
    document.getElementById('saveText').style.width = "80%";
  }
}

// fifthMulClicks
function timewallFive() {
  if (game.fifthMulClicks == 3) {
    game.fifthMulCost = game.fifthMulCost * 2;
  } else {
    game.fifthMulCost = game.fifthMulCost;
  }
}

function timewallFiveAgain() {
  if (game.fifthMulClicks == 5) {
    game.fifthMulCost = game.fifthMulCost * 2.25;
  } else {
    game.fifthMulCost = game.fifthMulCost;
  }
}

function timewallFiveAgainn() {
  if (game.fifthMulClicks == 6) {
    game.fifthMulCost = game.fifthMulCost * 2.5;
  } else {
    game.fifthMulCost = game.fifthMulCost;
  }
}

function timewallFiveAgainnn() {
  if (game.fifthMulClicks == 6) {
    game.fifthMulCost = game.fifthMulCost * 2.75;
  } else {
    game.fifthMulCost = game.fifthMulCost;
  }
}

// autoMagsClicks
function timewallSix() {
  if (game.autoMagsClicks == 5) {
    game.autoMagnetCost = game.autoMagnetCost * 3;
  } else {
    game.autoMagnetCost = game.autoMagnetCost;
  }
}

function timewallSixAgain() {
  if (game.autoMagsClicks == 10) {
    game.autoMagnetCost = game.autoMagnetCost * 6;
  } else {
    game.autoMagnetCost = game.autoMagnetCost;
  }
}

function timewallSixAgainn() {
  if (game.autoMagsClicks == 15) {
    game.autoMagnetCost = game.autoMagnetCost * 8.5;
  } else {
    game.autoMagnetCost = game.autoMagnetCost;
  }
}

function timewallSixAgainnn() {
  if (game.autoMagsClicks == 25) {
    game.autoMagnetCost = game.autoMagnetCost * 12;
  } else {
    game.autoMagnetCost = game.autoMagnetCost;
  }
}

/* Gain prestige multi when player clicks button */
function multiplyVersionTwoOne() {
  if (game.firstMulCost > 1e9 && game.magnets > 1e9) {
    game.goldGainMul = game.goldGainMul * 1.0004;
    game.multiplyMul = game.multiplyMul * 1.0012;
    game.autoNumberMul = game.autoNumberMul * 1.0008;
    game.platinumMagsGain = game.platinumMagsGain * 1.0012;
  }
}

function multiplyVersionTwoTwo() {
  if (game.magnets > 1e9 && game.magnets > 1e9) {
    game.goldGainMul = game.goldGainMul * 1.0008;
    game.multiplyMul = game.multiplyMul * 1.0024;
    game.autoNumberMul = game.autoNumberMul * 1.0016;
    game.platinumMagsGain = game.platinumMagsGain * 1.0024;
  }
}

function multiplyVersionTwoThree() {
  if (game.thirdMulCost > 1e9 && game.magnets > 1e9) {
    game.goldGainMul = game.goldGainMul * 1.0014;
    game.multiplyMul = game.multiplyMul * 1.004;
    game.autoNumberMul = game.autoNumberMul * 1.0026;
    game.platinumMagsGain = game.platinumMagsGain * 1.005;
  }
}

function multiplyVersionTwoFour() {
  if (game.fourthMulCost > 1e9 && game.magnets > 1e9) {
    game.goldGainMul = game.goldGainMul * 1.0022;
    game.multiplyMul = game.multiplyMul * 1.0066;
    game.autoNumberMul = game.autoNumberMul * 1.003;
    game.platinumMagsGain = game.platinumMagsGain * 1.007;
  }
}

function multiplyVersionTwoFive() {
  if (game.fifthMulCost > 1e9 && game.magnets > 1e9) {
    game.goldGainMul = game.goldGainMul * 1.006;
    game.multiplyMul = game.multiplyMul * 1.018;
    game.autoNumberMul = game.autoNumberMul * 1.012;
    game.platinumMagsGain = game.platinumMagsGain * 1.018;
  }
}

function multiplyVersionTwoSix() {
  if (game.goldMagnetCost > 1e9) {
    game.goldGainMul = game.goldGainMul * 1.0075;
    game.multiplyMul = game.multiplyMul * 1.0075;
    game.autoNumberMul = game.autoNumberMul * 1.0075;
    game.platinumMagsGain = game.platinumMagsGain * 1.0075;
  } else if (game.magnets < 1e9) {
    game.goldGainMul = game.goldGainMul * 1.0075;
    game.multiplyMul = game.multiplyMul * 1.0075;
    game.autoNumberMul = game.autoNumberMul * 1.0075;
    game.platinumMagsGain = game.platinumMagsGain * 1.0075;
  }
}

/* Update Element Interval */
setInterval(() => {
  document.title = "Magnet Revival";
  document.getElementById("mags").innerHTML = ""+formatNum()+"";
  document.getElementById("gold").innerHTML = ""+game.goldMagnets.toFixed(0)+"";
  document.getElementById("plat").innerHTML = ""+game.platinumMagnets.toFixed(0)+"";
  document.getElementById("mult").innerHTML = "x"+formatNumTwo()+".<br>";
  document.getElementById("auto").innerHTML = ""+formatNumTen()+"";
  document.getElementById("goldGain").innerHTML = ""+game.autoSpeed.toFixed(toFixedValue)+"";
}, 200);
/* Update Element Interval */

var toFixedValue = 2;

setInterval(() => {
  if (game.magnets > 3.14 && game.magnets < 3.15) {
    var a = document.getElementById("snackbar");
    a.className = "show";
    a.innerHTML = "You reached the PI secret!";
    setTimeout(function(){ a.className = a.className.replace("show", ""); }, 7500);
    setTimeout(() => {
      a.innerHTML = "Not enough magnets!"
    }, 8500);
  }
}, 1000);

/* Colors */
setInterval(() => {
  if (game.multiply > 10) {
    document.getElementById("mult").style.color = "#e52c00";
  }
  if (game.multiply > 100) {
    document.getElementById("mult").style.color = "#fd5229";
  }
  if (game.multiply > 1000) {
    document.getElementById("mult").style.color = "#cc4e01";
  }
  if (game.multiply > 10000) {
    document.getElementById("mult").style.color = "#ff6201";
  }
  if (game.multiply > 100000) {
    document.getElementById("mult").style.color = "#feac00";
  }
  if (game.multiply > 1e6) {
    document.getElementById("mult").style.color = "#e7e600";
  }
  if (game.multiply > 1e7) {
    document.getElementById("mult").style.color = "#71a003";
  }
  if (game.multiply > 1e8) {
    document.getElementById("mult").style.color = "#0b8a00";
  }
  if (game.multiply > 1e9) {
    document.getElementById("mult").style.color = "#44d091";
  }
}, 500);
setInterval(() => {
  if (game.autoNumber > 60) {
    document.getElementById("auto").style.color = "#e52c00";
  }
  if (game.autoNumber > 600) {
    document.getElementById("auto").style.color = "#fd5229";
  }
  if (game.autoNumber > 6000) {
    document.getElementById("auto").style.color = "#cc4e01";
  }
  if (game.autoNumber > 60000) {
    document.getElementById("auto").style.color = "#ff6201";
  }
  if (game.autoNumber > 600000) {
    document.getElementById("auto").style.color = "#feac00";
  }
  if (game.autoNumber > 6e6) {
    document.getElementById("auto").style.color = "#e7e600";
  }
  if (game.autoNumber > 6e7) {
    document.getElementById("auto").style.color = "#71a003";
  }
  if (game.autoNumber > 6e8) {
    document.getElementById("auto").style.color = "#0b8a00";
  }
  if (game.autoNumber > 6e9) {
    document.getElementById("auto").style.color = "#44d091";
  }
}, 500);

/* Functions (Yes it is for a setting) */
function why() {
  document.querySelector("#fix").addEventListener('change', function() {
    if (this.checked) {
      toFixedValue = 3
      document.getElementById("mult").innerHTML = ""+formatNumTwo()+"x.<br>";
      document.getElementById("auto").innerHTML = ""+formatNumTen()+"";
      document.getElementById("goldGain").innerHTML = ""+game.autoSpeed.toFixed(toFixedValue)+"";
    } else {
      toFixedValue = 2
      document.getElementById("mult").innerHTML = ""+formatNumTwo()+"x.<br>";
      document.getElementById("auto").innerHTML = ""+formatNumTen()+"";
      document.getElementById("goldGain").innerHTML = ""+game.autoSpeed.toFixed(toFixedValue)+"";
    }
  })
}

function whyy() {
  document.querySelector("#hide").addEventListener('change', function() {
    if (this.checked) {
      document.getElementById("news").style.display = "none";
    } else {
      document.getElementById("news").style.display = "block";
    }
  })
}


/* Trash number format, getting better though */
// Formatter variable
var formatter = {
  fixedValOne: 2,
  fixedValTwo: 2,
  fixedValThree: 2,
  fixedValFour: 2,
  fixedValFive: 2,
  fixedValSix: 2,
  fixedValSeven: 2,
  fixedValEight: 2,
  fixedValSeven: 2,
  fixedValEight: 2,
  fixedValNine: 2,
  fixedValTen: 2
}
// Formatter variable
// Format intervals
setInterval(() => {
  if (game.magnets > 9999) {
    formatter.fixedValOne = 1;
  } else {
    formatter.fixedValOne = 2;
  }
}, 100);

setInterval(() => {
  if (game.multiply > 9999) {
    formatter.fixedValTwo = 1;
  } else {
    formatter.fixedValTwo = 2;
  }
}, 100);

setInterval(() => {
  if (game.goldMagnetCost > 9999) {
    formatter.fixedValThree = 1;
  } else {
    formatter.fixedValThree = 2;
  }
}, 100);

setInterval(() => {
  if (game.firstMulCost > 9999) {
    formatter.fixedValFour = 1;
  } else {
    formatter.fixedValFour = 2;
  }
}, 100);

setInterval(() => {
  if (game.secondMulCost > 9999) {
    formatter.fixedValFive = 1;
  } else {
    formatter.fixedValFive = 2;
  }
}, 100);

setInterval(() => {
  if (game.thirdMulCost > 9999) {
    formatter.fixedValSix = 1;
  } else {
    formatter.fixedValSix = 2;
  }
}, 100);

setInterval(() => {
  if (game.fourthMulCost > 9999) {
    formatter.fixedValSeven = 1;
  } else {
    formatter.fixedValSeven = 2;
  }
}, 100);

setInterval(() => {
  if (game.fifthMulCost > 9999) {
    formatter.fixedValEight = 1;
  } else {
    formatter.fixedValEight = 2;
  }
}, 100);

setInterval(() => {
  if (game.autoMagnetCost > 9999) {
    formatter.fixedValNine = 1;
  } else {
    formatter.fixedValNine = 2;
  }
}, 100);

setInterval(() => {
  if (game.autoNumber > 9999) {
    formatter.fixedValTen = 1;
  } else {
    formatter.fixedValTen = 2;
  }
}, 100);
// Format intervals
// The actual format
function formatNum() {
  if (game.magnets > 999999) {
    return game.magnets.toExponential(2)
  } else if (game.magnets > 999 && game.magnets < 999999) {
    return Math.abs(game.magnets) > 999 ? Math.sign(game.magnets)*((Math.abs(game.magnets)/1000).toFixed(formatter.fixedValOne)) + 'k' : Math.sign(game.magnets)*Math.abs(game.magnets)
  } else {
    return game.magnets.toFixed(0)
  }
}

function formatNumTwo() {
  if (game.multiply > 999999) {
    return game.multiply.toExponential(2)
  } else if (game.multiply > 999 && game.multiply < 999999) {
    return Math.abs(game.multiply) > 999 ? Math.sign(game.multiply)*((Math.abs(game.multiply)/1000).toFixed(formatter.fixedValTwo)) + 'k' : Math.sign(game.multiply)*Math.abs(game.multiply)
  } else {
    return game.multiply.toFixed(0)
  }
}

function formatNumThree() {
  if (game.goldMagnetCost > 999999) {
    return game.goldMagnetCost.toExponential(2)
  } else if (game.goldMagnetCost > 999 && game.multiply < 999999) {
    return Math.abs(game.goldMagnetCost) > 999 ? Math.sign(game.goldMagnetCost)*((Math.abs(game.goldMagnetCost)/1000).toFixed(formatter.fixedValThree)) + 'k' : Math.sign(game.goldMagnetCost)*Math.abs(game.goldMagnetCost)
  } else {
    return game.goldMagnetCost.toFixed(0)
  }
}

function formatNumFour() {
  if (game.firstMulCost > 999999) {
    return game.firstMulCost.toExponential(2)
  } else if (game.firstMulCost > 999 && game.multiply < 999999) {
    return Math.abs(game.firstMulCost) > 999 ? Math.sign(game.firstMulCost)*((Math.abs(game.firstMulCost)/1000).toFixed(formatter.fixedValFour)) + 'k' : Math.sign(game.firstMulCost)*Math.abs(game.firstMulCost)
  } else {
    return game.firstMulCost.toFixed(0)
  }
}

function formatNumFive() {
  if (game.secondMulCost > 999999) {
    return game.secondMulCost.toExponential(2)
  } else if (game.secondMulCost > 999 && game.multiply < 999999) {
    return Math.abs(game.secondMulCost) > 999 ? Math.sign(game.secondMulCost)*((Math.abs(game.secondMulCost)/1000).toFixed(formatter.fixedValFive)) + 'k' : Math.sign(game.secondMulCost)*Math.abs(game.secondMulCost)
  } else {
    return game.secondMulCost.toFixed(0)
  }
}

function formatNumSix() {
  if (game.thirdMulCost > 999999) {
    return game.thirdMulCost.toExponential(2)
  } else if (game.thirdMulCost > 999 && game.multiply < 999999) {
    return Math.abs(game.thirdMulCost) > 999 ? Math.sign(game.thirdMulCost)*((Math.abs(game.thirdMulCost)/1000).toFixed(formatter.fixedValSix)) + 'k' : Math.sign(game.thirdMulCost)*Math.abs(game.thirdMulCost)
  } else {
    return game.thirdMulCost.toFixed(0)
  }
}

function formatNumSeven() {
  if (game.fourthMulCost > 999999) {
    return game.fourthMulCost.toExponential(2)
  } else if (game.fourthMulCost > 999 && game.multiply < 999999) {
    return Math.abs(game.fourthMulCost) > 999 ? Math.sign(game.fourthMulCost)*((Math.abs(game.fourthMulCost)/1000).toFixed(formatter.fixedValSeven)) + 'k' : Math.sign(game.fourthMulCost)*Math.abs(game.fourthMulCost)
  } else {
    return game.fourthMulCost.toFixed(0)
  }
}

function formatNumEight() {
  if (game.fifthMulCost > 999999) {
    return game.fifthMulCost.toExponential(2)
  } else if (game.fifthMulCost > 999 && game.multiply < 999999) {
    return Math.abs(game.fifthMulCost) > 999 ? Math.sign(game.fifthMulCost)*((Math.abs(game.fifthMulCost)/1000).toFixed(formatter.fixedValEight)) + 'k' : Math.sign(game.fifthMulCost)*Math.abs(game.fifthMulCost)
  } else {
    return game.fifthMulCost.toFixed(0)
  }
}

function formatNumNine() {
  if (game.autoMagnetCost > 999999) {
    return game.autoMagnetCost.toExponential(2)
  } else if (game.autoMagnetCost > 999 && game.multiply < 999999) {
    return Math.abs(game.autoMagnetCost) > 999 ? Math.sign(game.autoMagnetCost)*((Math.abs(game.autoMagnetCost)/1000).toFixed(formatter.fixedValNine)) + 'k' : Math.sign(game.autoMagnetCost)*Math.abs(game.autoMagnetCost)
  } else {
    return game.autoMagnetCost.toFixed(0)
  }
}

function formatNumTen() {
  if (game.autoNumber > 999999) {
    return game.autoNumber.toExponential(2)
  } else if (game.autoNumber > 999 && game.multiply < 999999) {
    return Math.abs(game.autoNumber) > 999 ? Math.sign(game.autoNumber)*((Math.abs(game.autoNumber)/1000).toFixed(formatter.fixedValTen)) + 'k' : Math.sign(game.autoNumber)*Math.abs(game.autoNumber)
  } else {
    return game.autoNumber.toFixed(0)
  }
}
// The actual format
/* Trash number format, getting better though */
/* Intervals */
setInterval(why, 200);
setInterval(whyy, 200);
setInterval(detectNumber, 200);
setInterval(unlockGoldUpg, 1000);
setInterval(diamondMags, 1000);

setInterval(() => {
  document.getElementById("yourStats").innerHTML = "Your Magnets: "+formatNum()+".<br>Your Magnet Multiplier: x"+formatNumTwo()+".<br>Gold Magnets: "+game.goldMagnets.toFixed(0)+".<br>Current Gold Magnet Cost: "+game.goldMagnetCost.toFixed(0)+" Magnets.<br>Platinum Magnets: "+game.platinumMagnets.toFixed(0)+".<br>Diamond Magnets: "+game.diamondMagnets.toFixed(0)+".<br>Legendary Magnets: "+game.legendaryMagnets.toFixed(0)+".<h3>Button Click Stats</h3>Gain Magnets Button Clicked: "+game.gainMagsClicks+" times.<br>First Mul. Clicks: "+game.firstMulClicks+" times.<br>Second Mul. Clicks: "+game.secondMulClicks+" times.<br>Third Mul. Clicks: "+game.thirdMulClicks+" times.<br>Fourth Mul. Clicks: "+game.fourthMulClicks+" times.<br>Fifth Mul. Clicks: "+game.fifthMulClicks+" times.<br>Gold Magnet Clicks: "+game.goldMagsClicks+" times.<br>Auto Magnet Clicks: "+game.autoMagsClicks+" times.";
  document.getElementById("moreStats").innerHTML = "First Multiplier Cost: "+game.multiplyTwo.toFixed(2)+".<br>Second Multiplier Cost: "+game.multiplyThree.toFixed(2)+".<br>Third Multiplier Cost: "+game.multiplyFour.toFixed(2)+".<br>Fourth Multiplier Cost: "+game.multiplyFive.toFixed(2)+".<br>Fifth Multiplier Cost: "+game.multiplySix.toFixed(2)+".<br>Sixth Multiplier Cost: "+game.multiplySeven.toFixed(2)+".<br>Auto Gain Magnet Multiplier: "+formatNumTen()+".";
  document.getElementById("totalStats").innerHTML = "Gain Magnets Button Clicked: "+game.gainMagsClicksTotal+" times.<br>First Mul. Clicks: "+game.firstMulClicksTotal+" times.<br>Second Mul. Clicks: "+game.secondMulClicksTotal+" times.<br>Third Mul. Clicks: "+game.thirdMulClicksTotal+" times.<br>Fourth Mul. Clicks: "+game.fourthMulClicksTotal+" times.<br>Fifth Mul. Clicks: "+game.fifthMulClicksTotal+" times.<br>Gold Magnet Clicks: "+game.goldMagsClicksTotal+" times.<br>Auto Magnet Clicks: "+game.autoMagsClicksTotal+" times.";
}, 50);

setInterval(() => {
  document.getElementsByClassName("button2")[0].innerHTML = "Gain 1st Multiplier ("+formatNumFour()+" mags)";
  document.getElementsByClassName("button3")[0].innerHTML = "Gain 2nd Multiplier ("+formatNumFive()+" mags)";
  document.getElementsByClassName("button4")[0].innerHTML = "Gain 3rd Multiplier ("+formatNumSix()+" mags)";
  document.getElementsByClassName("button5")[0].innerHTML = "Gain 4th Multiplier ("+formatNumSeven()+" mags)";
  document.getElementsByClassName("button6")[0].innerHTML = "Gain 5th Multiplier ("+formatNumEight()+" mags)";
  document.getElementsByClassName("button8")[0].innerHTML = "Earn Gold Magnets ("+formatNumThree()+" mags)";
  document.getElementsByClassName("button10")[0].innerHTML = "Earn Auto-Magnets Multi ("+formatNumNine()+" mags)";
}, 600);

/* The main game functions
Earning multipliers, gold magnets, and auto magnets are all in there.
*/
function earnMoney() {
  game.magnets = game.magnets + game.multiply;
  document.getElementById("mags").innerHTML = ""+formatNum()+"";
  document.getElementById("gold").innerHTML = ""+game.goldMagnets.toFixed(0)+"";
  document.getElementById("plat").innerHTML = ""+game.platinumMagnets.toFixed(0)+"";
  document.getElementsByClassName("button2")[0].innerHTML = "Gain 1st Multiplier ("+formatNumFour()+" mags)";
  document.getElementsByClassName("button3")[0].innerHTML = "Gain 2nd Multiplier ("+formatNumFive()+" mags)";
  document.getElementsByClassName("button4")[0].innerHTML = "Gain 3rd Multiplier ("+formatNumSix()+" mags)";
  document.getElementsByClassName("button5")[0].innerHTML = "Gain 4th Multiplier ("+formatNumSeven()+" mags)";
  document.getElementsByClassName("button6")[0].innerHTML = "Gain 5th Multiplier ("+formatNumEight()+" mags)";
  document.getElementsByClassName("button8")[0].innerHTML = "Earn Gold Magnets ("+formatNumThree()+" mags)";
  document.getElementsByClassName("button10")[0].innerHTML = "Earn Auto-Magnets Multi ("+formatNumNine()+" mags)";
  game.gainMagsClicks = game.gainMagsClicks + 1;
  game.gainMagsClicksTotal = game.gainMagsClicksTotal + 1;
}

function earnMultiplier() {
  if (game.magnets > game.firstMulCost) {
    game.magnets = game.magnets - game.firstMulCost;
    game.multiply = game.multiply * 1.1;
    game.firstMulCost = game.firstMulCost * game.multiplyTwo;
    document.getElementById("mags").innerHTML = ""+formatNum()+"";
    document.getElementById("gold").innerHTML = ""+game.goldMagnets.toFixed(0)+"";
    document.getElementById("plat").innerHTML = ""+game.platinumMagnets.toFixed(0)+"";
    document.getElementById("mult").innerHTML = ""+formatNumTwo()+"x.<br>";
    document.getElementById("auto").innerHTML = ""+formatNumTen()+"";
    document.getElementById("goldGain").innerHTML = ""+game.autoSpeed.toFixed(toFixedValue)+"";
    document.getElementsByClassName("button2")[0].innerHTML = "Gain 1st Multiplier ("+formatNumFour()+" mags)";
    document.getElementsByClassName("button3")[0].innerHTML = "Gain 2nd Multiplier ("+formatNumFive()+" mags)";
    document.getElementsByClassName("button4")[0].innerHTML = "Gain 3rd Multiplier ("+formatNumSix()+" mags)";
    document.getElementsByClassName("button5")[0].innerHTML = "Gain 4th Multiplier ("+formatNumSeven()+" mags)";
    document.getElementsByClassName("button6")[0].innerHTML = "Gain 5th Multiplier ("+formatNumEight()+" mags)";
    document.getElementsByClassName("button8")[0].innerHTML = "Earn Gold Magnets ("+formatNumThree()+" mags)";
    document.getElementsByClassName("button10")[0].innerHTML = "Earn Auto-Magnets Multi ("+formatNumNine()+" mags)";
    game.firstMulClicks = game.firstMulClicks + 1;
    game.firstMulClicksTotal = game.firstMulClicksTotal + 1;
    if (game.secondMulClicks == 15) {
      game.firstMulCost = game.firstMulCost * 3.6;
    }
    if (game.secondMulClicks == 25) {
      game.firstMulCost = game.firstMulCost * 6;
    }
    if (game.secondMulClicks == 35) {
      game.firstMulCost = game.firstMulCost * 11;
    }
    if (game.secondMulClicks == 45) {
      game.firstMulCost = game.firstMulCost * 25;
    }
    multiplyVersionTwoOne()
  } else {
    var a = document.getElementById("snackbar");
    a.className = "show";
    a.innerHTML = "Not enough magnets!";
    setTimeout(function(){ a.className = a.className.replace("show", ""); }, 3000);
  }
}

function earnSecondMultiplier() {
  if (game.magnets > game.secondMulCost) {
    game.magnets = game.magnets - game.secondMulCost;
    game.multiply = game.multiply * 1.233;
    game.secondMulCost = game.secondMulCost * game.multiplyThree;
    document.getElementById("mags").innerHTML = ""+formatNum()+"";
    document.getElementById("gold").innerHTML = ""+game.goldMagnets.toFixed(0)+"";
    document.getElementById("plat").innerHTML = ""+game.platinumMagnets.toFixed(0)+"";
    document.getElementById("mult").innerHTML = ""+formatNumTwo()+"x.<br>";
    document.getElementById("auto").innerHTML = ""+formatNumTen()+"";
    document.getElementById("goldGain").innerHTML = ""+game.autoSpeed.toFixed(toFixedValue)+"";
    document.getElementsByClassName("button2")[0].innerHTML = "Gain 1st Multiplier ("+formatNumFour()+" mags)";
    document.getElementsByClassName("button3")[0].innerHTML = "Gain 2nd Multiplier ("+formatNumFive()+" mags)";
    document.getElementsByClassName("button4")[0].innerHTML = "Gain 3rd Multiplier ("+formatNumSix()+" mags)";
    document.getElementsByClassName("button5")[0].innerHTML = "Gain 4th Multiplier ("+formatNumSeven()+" mags)";
    document.getElementsByClassName("button6")[0].innerHTML = "Gain 5th Multiplier ("+formatNumEight()+" mags)";
    document.getElementsByClassName("button8")[0].innerHTML = "Earn Gold Magnets ("+formatNumThree()+" mags)";
    document.getElementsByClassName("button10")[0].innerHTML = "Earn Auto-Magnets Multi ("+formatNumNine()+" mags)";
    game.multiplyThree = game.multiplyThree * 1.055;
    game.secondMulClicks = game.secondMulClicks + 1;
    game.secondMulClicksTotal = game.secondMulClicksTotal + 1;
    if (game.secondMulClicks == 5) {
      game.secondMulCost = game.secondMulCost * 2.5;
    }
    if (game.secondMulClicks == 8) {
      game.secondMulCost = game.secondMulCost * 3.75;
    }
    if (game.secondMulClicks == 11) {
      game.secondMulCost = game.secondMulCost * 5.5;
    }
    if (game.secondMulClicks == 15) {
      game.secondMulCost = game.secondMulCost * 8.5;
    }
    multiplyVersionTwoTwo()
  } else {
    var a = document.getElementById("snackbar");
    a.className = "show";
    a.innerHTML = "Not enough magnets!";
    setTimeout(function(){ a.className = a.className.replace("show", ""); }, 3000); 
  }
}

function earnThirdMultiplier() {
  if (game.magnets > game.thirdMulCost) {
    game.magnets = game.magnets - game.thirdMulCost;
    game.multiply = game.multiply * 1.475;
    game.thirdMulCost = game.thirdMulCost * game.multiplyFour;
    document.getElementById("mags").innerHTML = ""+formatNum()+"";
    document.getElementById("gold").innerHTML = ""+game.goldMagnets.toFixed(0)+"";
    document.getElementById("plat").innerHTML = ""+game.platinumMagnets.toFixed(0)+"";
    document.getElementById("mult").innerHTML = ""+formatNumTwo()+"x.<br>";
    document.getElementById("auto").innerHTML = ""+formatNumTen()+"";
    document.getElementById("goldGain").innerHTML = ""+game.autoSpeed.toFixed(toFixedValue)+"";
    document.getElementsByClassName("button2")[0].innerHTML = "Gain 1st Multiplier ("+formatNumFour()+" mags)";
    document.getElementsByClassName("button3")[0].innerHTML = "Gain 2nd Multiplier ("+formatNumFive()+" mags)";
    document.getElementsByClassName("button4")[0].innerHTML = "Gain 3rd Multiplier ("+formatNumSix()+" mags)";
    document.getElementsByClassName("button5")[0].innerHTML = "Gain 4th Multiplier ("+formatNumSeven()+" mags)";
    document.getElementsByClassName("button6")[0].innerHTML = "Gain 5th Multiplier ("+formatNumEight()+" mags)";
    document.getElementsByClassName("button8")[0].innerHTML = "Earn Gold Magnets ("+formatNumThree()+" mags)";
    document.getElementsByClassName("button10")[0].innerHTML = "Earn Auto-Magnets Multi ("+formatNumNine()+" mags)";
    game.multiplyFour = game.multiplyFour * 1.09;
    game.thirdMulClicks = game.thirdMulClicks + 1;
    game.thirdMulClicksTotal = game.thirdMulClicksTotal + 1;
    if (game.thirdMulClicks == 5) {
      game.thirdMulCost = game.thirdMulCost * 3.1;
    }
    if (game.thirdMulClicks == 7) {
      game.thirdMulCost = game.thirdMulCost * 5.35;
    }
    if (game.thirdMulClicks == 10) {
      game.thirdMulCost = game.thirdMulCost * 8.75;
    }
    if (game.thirdMulClicks == 13) {
      game.thirdMulCost = game.thirdMulCost * 15;
    }
    multiplyVersionTwoThree()
  } else {
    var a = document.getElementById("snackbar");
    a.className = "show";
    a.innerHTML = "Not enough magnets!";
    setTimeout(function(){ a.className = a.className.replace("show", ""); }, 3000); 
  }
}

function earnFourthMultiplier() {
  if (game.magnets > game.fourthMulCost) {
    game.magnets = game.magnets - game.fourthMulCost;
    game.multiply = game.multiply * 1.75;
    game.fourthMulCost = game.fourthMulCost * game.multiplyFive;
    document.getElementById("mags").innerHTML = ""+formatNum()+"";
    document.getElementById("gold").innerHTML = ""+game.goldMagnets.toFixed(0)+"";
    document.getElementById("plat").innerHTML = ""+game.platinumMagnets.toFixed(0)+"";
    document.getElementById("mult").innerHTML = ""+formatNumTwo()+"x.<br>";
    document.getElementById("auto").innerHTML = ""+formatNumTen()+"";
    document.getElementById("goldGain").innerHTML = ""+game.autoSpeed.toFixed(toFixedValue)+"";
    document.getElementsByClassName("button2")[0].innerHTML = "Gain 1st Multiplier ("+formatNumFour()+" mags)";
    document.getElementsByClassName("button3")[0].innerHTML = "Gain 2nd Multiplier ("+formatNumFive()+" mags)";
    document.getElementsByClassName("button4")[0].innerHTML = "Gain 3rd Multiplier ("+formatNumSix()+" mags)";
    document.getElementsByClassName("button5")[0].innerHTML = "Gain 4th Multiplier ("+formatNumSeven()+" mags)";
    document.getElementsByClassName("button6")[0].innerHTML = "Gain 5th Multiplier ("+formatNumEight()+" mags)";
    document.getElementsByClassName("button8")[0].innerHTML = "Earn Gold Magnets ("+formatNumThree()+" mags)";
    document.getElementsByClassName("button10")[0].innerHTML = "Earn Auto-Magnets Multi ("+formatNumNine()+" mags)";
    game.multiplyFive = game.multiplyFive * 1.14;
    game.fourthMulClicks = game.fourthMulClicks + 1;
    game.fourthMulClicksTotal = game.fourthMulClicksTotal + 1;
    if (game.fourthMulClicks == 5) {
      game.fourthMulCost = game.fourthMulCost * 3;
    }
    if (game.fourthMulClicks == 7) {
      game.fourthMulCost = game.fourthMulCost * 4;
    }
    if (game.fourthMulClicks == 9) {
      game.fourthMulCost = game.fourthMulCost * 5.25;
    }
    if (game.fourthMulClicks == 12) {
      game.fourthMulCost = game.fourthMulCost * 7.25;
    }
    multiplyVersionTwoFour()
  } else {
    var a = document.getElementById("snackbar");
    a.className = "show";
    a.innerHTML = "Not enough magnets!";
    setTimeout(function(){ a.className = a.className.replace("show", ""); }, 3000); 
  }
}

function earnFifthMultiplier() {
  if (game.magnets > game.fifthMulCost) {
    game.magnets = game.magnets - game.fifthMulCost;
    game.multiply = game.multiply * 2.5;
    game.fifthMulCost = game.fifthMulCost * game.multiplySix;
    document.getElementById("mags").innerHTML = ""+formatNum()+"";
    document.getElementById("gold").innerHTML = ""+game.goldMagnets.toFixed(0)+"";
    document.getElementById("plat").innerHTML = ""+game.platinumMagnets.toFixed(0)+"";
    document.getElementById("mult").innerHTML = ""+formatNumTwo()+"x.<br>";
    document.getElementById("auto").innerHTML = ""+formatNumTen()+"";
    document.getElementById("goldGain").innerHTML = ""+game.autoSpeed.toFixed(toFixedValue)+"";
    document.getElementsByClassName("button2")[0].innerHTML = "Gain 1st Multiplier ("+formatNumFour()+" mags)";
    document.getElementsByClassName("button3")[0].innerHTML = "Gain 2nd Multiplier ("+formatNumFive()+" mags)";
    document.getElementsByClassName("button4")[0].innerHTML = "Gain 3rd Multiplier ("+formatNumSix()+" mags)";
    document.getElementsByClassName("button5")[0].innerHTML = "Gain 4th Multiplier ("+formatNumSeven()+" mags)";
    document.getElementsByClassName("button6")[0].innerHTML = "Gain 5th Multiplier ("+formatNumEight()+" mags)";
    document.getElementsByClassName("button8")[0].innerHTML = "Earn Gold Magnets ("+formatNumThree()+" mags)";
    document.getElementsByClassName("button10")[0].innerHTML = "Earn Auto-Magnets Multi ("+formatNumNine()+" mags)";
    game.multiplySix = game.multiplySix * 1.2;
    game.fifthMulClicks = game.fifthMulClicks + 1;
    game.fifthMulClicksTotal = game.fifthMulClicksTotal + 1;
    timewallFive()
    timewallFiveAgain()
    timewallFiveAgainn()
    timewallFiveAgainnn()
    multiplyVersionTwoFive()
  } else {
    var a = document.getElementById("snackbar");
    a.className = "show";
    a.innerHTML = "Not enough magnets!";
    setTimeout(function(){ a.className = a.className.replace("show", ""); }, 3000); 
  }
}

function autoCollect() {
  if (game.magnets > game.autoMagnetCost) {
    game.magnets = game.magnets - game.autoMagnetCost;
    game.autoMagnetCost = game.autoMagnetCost * 3.62;
    game.autoNumber = game.autoNumber * 4;
    document.getElementById("mags").innerHTML = ""+formatNum()+"";
    document.getElementById("gold").innerHTML = ""+game.goldMagnets.toFixed(0)+"";
    document.getElementById("plat").innerHTML = ""+game.platinumMagnets.toFixed(0)+"";
    document.getElementById("mult").innerHTML = ""+formatNumTwo()+"x.<br>";
    document.getElementById("auto").innerHTML = ""+formatNumTen()+"";
    document.getElementById("goldGain").innerHTML = ""+game.autoSpeed.toFixed(toFixedValue)+"";
    document.getElementsByClassName("button2")[0].innerHTML = "Gain 1st Multiplier ("+formatNumFour()+" mags)";
    document.getElementsByClassName("button3")[0].innerHTML = "Gain 2nd Multiplier ("+formatNumFive()+" mags)";
    document.getElementsByClassName("button4")[0].innerHTML = "Gain 3rd Multiplier ("+formatNumSix()+" mags)";
    document.getElementsByClassName("button5")[0].innerHTML = "Gain 4th Multiplier ("+formatNumSeven()+" mags)";
    document.getElementsByClassName("button6")[0].innerHTML = "Gain 5th Multiplier ("+formatNumEight()+" mags)";
    document.getElementsByClassName("button8")[0].innerHTML = "Earn Gold Magnets ("+formatNumThree()+" mags)";
    document.getElementsByClassName("button10")[0].innerHTML = "Earn Auto-Magnets Multi ("+formatNumNine()+" mags)";
    game.autoMagsClicks = game.autoMagsClicks + 1;
    game.autoMagsClicksTotal = game.autoMagsClicksTotal + 1;
    timewallSix()
    timewallSixAgain()
    timewallSixAgainn()
    timewallSixAgainnn()
  } else {
    var a = document.getElementById("snackbar");
    a.className = "show";
    a.innerHTML = "Not enough magnets!";
    setTimeout(function(){ a.className = a.className.replace("show", ""); }, 3000); 
  }
}

function goldMagnets() {
  if (game.magnets > game.goldMagnetCost) {
    game.magnets = 0;
    game.goldMagnetCost = game.goldMagnetCost * game.multiplySeven;
    game.multiply = game.multiply * 1.15;
    game.goldMagnets = game.goldMagnets + game.goldMagnetGain;
    document.getElementById("mags").innerHTML = ""+formatNum()+"";
    document.getElementById("gold").innerHTML = ""+game.goldMagnets.toFixed(0)+"";
    document.getElementById("plat").innerHTML = ""+game.platinumMagnets.toFixed(0)+"";
    document.getElementById("mult").innerHTML = ""+formatNumTwo()+"x.<br>";
    document.getElementById("auto").innerHTML = ""+formatNumTen()+"";
    document.getElementById("goldGain").innerHTML = ""+game.autoSpeed.toFixed(toFixedValue)+"";
    document.getElementsByClassName("button2")[0].innerHTML = "Gain 1st Multiplier ("+formatNumFour()+" mags)";
    document.getElementsByClassName("button3")[0].innerHTML = "Gain 2nd Multiplier ("+formatNumFive()+" mags)";
    document.getElementsByClassName("button4")[0].innerHTML = "Gain 3rd Multiplier ("+formatNumSix()+" mags)";
    document.getElementsByClassName("button5")[0].innerHTML = "Gain 4th Multiplier ("+formatNumSeven()+" mags)";
    document.getElementsByClassName("button6")[0].innerHTML = "Gain 5th Multiplier ("+formatNumEight()+" mags)";
    document.getElementsByClassName("button8")[0].innerHTML = "Earn Gold Magnets ("+formatNumThree()+" mags)";
    document.getElementsByClassName("button10")[0].innerHTML = "Earn Auto-Magnets Multi ("+formatNumNine()+" mags)";
    game.goldMagsClicks = game.goldMagsClicks + 1;
    game.goldMagsClicksTotal = game.goldMagsClicksTotal + 1;
    multiplyVersionTwoSix()
  } else {
    var a = document.getElementById("snackbar");
    a.className = "show";
    a.innerHTML = "Not enough magnets!";
    setTimeout(function(){ a.className = a.className.replace("show", ""); }, 3000); 
  }
}

/* Gold Magnet Upgrades */
function unlockGoldUpg() {
  if (game.platinumMagnets >= 5) {
    document.getElementById("eight").innerHTML = "Gold Magnets Upgrades";
    document.getElementById("twelve").style.display = "block";
    document.getElementById("twelve").innerHTML = "You have "+game.goldMagnets.toFixed(0)+" Gold Magnets.";
    document.getElementsByClassName("goldUpgrades")[0].style.display = "inline";
    document.getElementsByClassName("goldUpgrades")[1].style.display = "inline";
    document.getElementsByClassName("goldUpgrades")[2].style.display = "inline";
    document.getElementsByClassName("goldUpgrades")[3].style.display = "inline";
    document.getElementsByClassName("goldUpgrades")[4].style.display = "inline";
    document.getElementsByClassName("goldUpgrades")[5].style.display = "inline";
    document.getElementsByClassName("goldUpgrades")[6].style.display = "inline";
    document.getElementsByClassName("goldUpgrades")[7].style.display = "inline";
    document.getElementsByClassName("goldUpgrades")[8].style.display = "inline";
    document.getElementsByClassName("goldUpgrades")[9].style.display = "inline";
    document.getElementsByClassName("goldUpgrades")[10].style.display = "inline";
  }
}

/* Diamond Magnet Upgrades */
function diamondMags() {
  if (game.goldMagnets >= 150000) {
    document.getElementById("fourteen").innerHTML = "Diamond Magnets Upgrades";
    document.getElementById("fifteen").style.display = "block";
    document.getElementById("fifteen").innerHTML = "You have "+game.diamondMagnets.toFixed(0)+" Diamond Magnets.";
    document.getElementsByClassName("diamondUpgrades")[0].style.display = "inline";
    document.getElementsByClassName("diamondUpgrades")[1].style.display = "inline";
    document.getElementsByClassName("diamondUpgrades")[2].style.display = "inline";
    document.getElementsByClassName("diamondUpgrades")[3].style.display = "inline";
    document.getElementsByClassName("diamondUpgrades")[4].style.display = "inline";
    document.getElementsByClassName("diamondUpgrades")[5].style.display = "inline";
    document.getElementsByClassName("diamondUpgrades")[6].style.display = "inline";
    document.getElementsByClassName("diamondUpgrades")[7].style.display = "inline";
    document.getElementsByClassName("diamondUpgrades")[8].style.display = "inline";
    document.getElementsByClassName("diamondUpgrades")[9].style.display = "inline";
  }
}

function autoGoldMags() {
  if (game.platinumMagnets >= 5) {
      setInterval(() => {
        document.getElementsByClassName("button2")[0].innerHTML = "Gain 1st Multiplier ("+formatNumFour()+" mags)";
        document.getElementsByClassName("button3")[0].innerHTML = "Gain 2nd Multiplier ("+formatNumFive()+" mags)";
        document.getElementsByClassName("button4")[0].innerHTML = "Gain 3rd Multiplier ("+formatNumSix()+" mags)";
        document.getElementsByClassName("button5")[0].innerHTML = "Gain 4th Multiplier ("+formatNumSeven()+" mags)";
        document.getElementsByClassName("button6")[0].innerHTML = "Gain 5th Multiplier ("+formatNumEight()+" mags)";
        document.getElementsByClassName("button8")[0].innerHTML = "Earn Gold Magnets ("+formatNumThree()+" mags)";
        document.getElementsByClassName("button10")[0].innerHTML = "Earn Auto-Magnets Multi ("+formatNumNine()+" mags)";
        document.getElementsByClassName("button15")[0].innerHTML = "Less Gold Magnet Cost ("+game.goldBuyCost.toFixed(0)+" Gold Mags)";
        game.goldMagnets = game.goldMagnets + game.autoSpeed;
        game.autoSpeed = game.autoSpeed * 1.0006;
        game.multiply = game.multiply * 1.0006;
      }, 1000);
    document.getElementsByClassName("button14")[0].remove();
  } else {
    var s = document.getElementById("snackbar");
    s.className = "show";
    s.innerHTML = "Not enough gold magnets!";
    setTimeout(function(){ s.className = s.className.replace("show", ""); }, 3000); 
  }
}

function moreGoldMags() {
  if (game.goldMagnets > game.goldBuyCost) {
    game.goldMagnetCost = game.goldMagnetCost / 1.0036;
    game.goldBuyCost = game.goldBuyCost * 1.05;
    game.goldMagnets = game.goldMagnets - game.goldBuyCost;
    document.getElementsByClassName("button10")[0].innerHTML = "Earn Auto-Magnets Multi ("+formatNumNine()+" mags)";
    document.getElementsByClassName("button14")[0].innerHTML = "Auto Gold Magnets Multi ("+game.goldBuyCost.toFixed(0)+" Gold Mags)";
    document.getElementsByClassName("button15")[0].innerHTML = "Less Gold Magnet Cost ("+game.goldBuyCost.toFixed(1)+" gold mags)";
    document.getElementsByClassName("button8")[0].innerHTML = "Earn Gold Magnets ("+formatNumThree()+" mags)";
  } else {
    var t = document.getElementById("snackbar");
    t.className = "show";
    t.innerHTML = "Not enough gold magnets!";
    setTimeout(function(){ t.className = t.className.replace("show", ""); }, 3000); 
  }
}

/* Auto Collect */
function buyAuto() {
  if (game.magnets > 2999) {
    setInterval(() => {
      game.magnets = game.magnets + game.autoNumber;
    }, 1000);
    game.magnets = game.magnets - 3000;
    document.getElementsByClassName("button13")[0].remove();
  }
}

/* Gold Magnet Functions */

function moreMagsUpgOne() {
  if (game.goldMagnets >= game.goldUpgOneCost) {
    game.goldUpgOneCost = game.goldUpgOneCost * 3.5;
    game.goldMagnets = game.goldMagnets - game.goldUpgOneCost/3.5;
    game.multiply = game.multiply * 2;
    game.autoNumber = game.autoNumber * 2;
    document.getElementById("auto").innerHTML = ""+formatNumTen()+"";
    document.getElementById("mult").innerHTML = ""+formatNumTwo()+"x.<br>";
    document.getElementsByClassName("goldUpgrades")[0].innerHTML = "You gain 2x more magnets<br>Cost: "+game.goldUpgOneCost.toFixed(0)+" Gold Magnets.";
    document.getElementById("gold").innerHTML = ""+game.goldMagnets.toFixed(0)+"";
    document.getElementById("fourteen").innerHTML = "You have "+game.goldMagnets.toFixed(0)+" Gold Magnets.";
  } else {
    var t = document.getElementById("snackbar");
    t.className = "show";
    t.innerHTML = "Not enough gold magnets!";
    setTimeout(function(){ t.className = t.className.replace("show", ""); }, 3000); 
  }
}

function moreMultUpgOne() {
  if (game.goldMagnets > game.goldUpgSixCost) {
    game.goldUpgSixCost = game.goldUpgSixCost * 3;
    game.goldMagnets = game.goldMagnets - game.goldUpgSixCost/3;
    game.multiplyMul = game.multiplyMul * 1.2;
    game.goldGainMul = game.goldGainMul * 1.2;
    game.autoNumberMul = game.autoNumberMul * 1.2;
    game.platinumMagsGain = game.platinumMagsGain * 1.2;
    document.getElementById("auto").innerHTML = ""+formatNumTen()+"";
    document.getElementById("mult").innerHTML = ""+formatNumTwo()+"x.<br>";
    document.getElementsByClassName("goldUpgrades")[1].innerHTML = "You gain more multiplier on prestige.<br>Cost: "+game.goldUpgSixCost.toFixed(0)+" Gold Magnets.";
    document.getElementById("gold").innerHTML = ""+game.goldMagnets.toFixed(0)+"";
    document.getElementById("fourteen").innerHTML = "You have "+game.goldMagnets.toFixed(0)+" Gold Magnets.";
  } else {
    var t = document.getElementById("snackbar");
    t.className = "show";
    t.innerHTML = "Not enough gold magnets!";
    setTimeout(function(){ t.className = t.className.replace("show", ""); }, 3000); 
  }
}

function autoBuyMag() {
  if (game.goldMagnets > 400) {
    game.goldMagnets = game.goldMagnets - 400;
    document.getElementById("seventeen").innerHTML = "Buy 1-5th Multiplier Automators";
    document.getElementsByClassName("autoMultButton")[0].style.display = "block";
    document.getElementsByClassName("autoMultButton")[1].style.display = "block";
    document.getElementsByClassName("autoMultButton")[2].style.display = "block";
    document.getElementsByClassName("autoMultButton")[3].style.display = "block";
    document.getElementsByClassName("autoMultButton")[4].style.display = "block";
  } else {
    var t = document.getElementById("snackbar");
    t.className = "show";
    t.innerHTML = "Not enough gold magnets!";
    setTimeout(function(){ t.className = t.className.replace("show", ""); }, 3000); 
  }
}

function moreMagsUpgTwo() {
  if (game.goldMagnets >= game.goldUpgTwoCost) {
    game.goldUpgTwoCost = game.goldUpgTwoCost * 6;
    game.goldMagnets = game.goldMagnets - game.goldUpgTwoCost/6;
    game.autoNumber = game.autoNumber * 3;
    document.getElementById("auto").innerHTML = ""+formatNumTen()+"";
    document.getElementById("mult").innerHTML = ""+formatNumTwo()+"x.<br>";
    document.getElementsByClassName("goldUpgrades")[3].innerHTML = "You gain 3x more auto-multi.<br>Cost: "+game.goldUpgTwoCost.toFixed(0)+" Gold Magnets.";
    document.getElementById("gold").innerHTML = ""+game.goldMagnets.toFixed(0)+"";
    document.getElementById("fourteen").innerHTML = "You have "+game.goldMagnets.toFixed(0)+" Gold Magnets.";
  } else {
    var t = document.getElementById("snackbar");
    t.className = "show";
    t.innerHTML = "Not enough gold magnets!";
    setTimeout(function(){ t.className = t.className.replace("show", ""); }, 3000); 
  }
}

function moreMagsUpgThree() {
  if (game.goldMagnets >= game.goldUpgThreeCost) {
    game.goldUpgThreeCost = game.goldUpgThreeCost * 11;
    game.goldMagnets = game.goldMagnets - game.goldUpgThreeCost/11;
    game.multiply = game.multiply * 4;
    game.autoNumber = game.autoNumber * 4;
    document.getElementById("mult").innerHTML = ""+formatNumTwo()+"x.<br>";
    document.getElementById("auto").innerHTML = ""+formatNumTen()+"";
    document.getElementsByClassName("goldUpgrades")[5].innerHTML = "You gain 4x more magnets<br>Cost: "+game.goldUpgThreeCost.toFixed(0)+" Gold Magnets.";
    document.getElementById("gold").innerHTML = ""+game.goldMagnets.toFixed(0)+"";
    document.getElementById("fourteen").innerHTML = "You have "+game.goldMagnets.toFixed(0)+" Gold Magnets.";
  } else {
    var t = document.getElementById("snackbar");
    t.className = "show";
    t.innerHTML = "Not enough gold magnets!";
    setTimeout(function(){ t.className = t.className.replace("show", ""); }, 3000); 
  }
}

function moreGoldMagsUpgOne() {
  if (game.goldMagnets >= game.goldUpgFourCost) {
    game.goldUpgFourCost = game.goldUpgFourCost * 3;
    game.goldMagnets = game.goldMagnets - game.goldUpgFourCost/3;
    game.goldMagnetGain = game.goldMagnetGain * 2;
    document.getElementById("mult").innerHTML = ""+formatNumTwo()+"x.<br>";
    document.getElementById("auto").innerHTML = ""+formatNumTen()+"";
    document.getElementsByClassName("goldUpgrades")[6].innerHTML = "You gain 2x more gold magnets<br>Cost: "+game.goldUpgFourCost.toFixed(0)+" Gold Magnets.";
    document.getElementById("gold").innerHTML = ""+game.goldMagnets.toFixed(0)+"";
    document.getElementById("fourteen").innerHTML = "You have "+game.goldMagnets.toFixed(0)+" Gold Magnets.";
  } else {
    var t = document.getElementById("snackbar");
    t.className = "show";
    t.innerHTML = "Not enough gold magnets!";
    setTimeout(function(){ t.className = t.className.replace("show", ""); }, 3000);
  }
}

function morePlatMagsUpgOne() {
  if (game.goldMagnets >= game.goldUpgFiveCost) {
    game.goldUpgFiveCost = game.goldUpgFiveCost * 5;
    game.goldMagnets = game.goldMagnets - game.goldUpgFourCost/5;
    game.platinumMagsGain = game.platinumMagsGain * 2;
    document.getElementById("mult").innerHTML = ""+formatNumTwo()+"x.<br>";
    document.getElementById("auto").innerHTML = ""+formatNumTen()+"";
    document.getElementsByClassName("goldUpgrades")[7].innerHTML = "You gain 2x more platinum magnets<br>Cost: "+game.goldUpgFiveCost.toFixed(0)+" Gold Magnets.";
    document.getElementById("gold").innerHTML = ""+game.goldMagnets.toFixed(0)+"";
    document.getElementById("fourteen").innerHTML = "You have "+game.goldMagnets.toFixed(0)+" Gold Magnets.";
  } else {
    var t = document.getElementById("snackbar");
    t.className = "show";
    t.innerHTML = "Not enough gold magnets!";
    setTimeout(function(){ t.className = t.className.replace("show", ""); }, 3000);
  }
}

/* Diamond Magnets Upgrades */

/* Automators */

function autoFirstMul() {
  if (game.magnets > game.autoFirstMulCost) {
    game.magnets = game.magnets - game.autoFirstMulCost;
    game.autoFirstMulCost = game.autoFirstMulCost * 10;
    game.autoFirstMulInterval = game.autoFirstMulInterval / 1.03;
    document.getElementsByClassName("autoMultButton")[0].innerHTML = "1st Multiplier<br>Current Speed: 1 every "+game.autoFirstMulInterval.toFixed(1)+" ms.<br>Cost: "+game.autoFirstMulCost+" Magnets.";
    setInterval(() => {
      earnMultiplier();
    }, game.autoFirstMulInterval);
  } else {
    var t = document.getElementById("snackbar");
    t.className = "show";
    t.innerHTML = "Not enough magnets!";
    setTimeout(function(){ t.className = t.className.replace("show", ""); }, 3000);
  }
}

function autoSecondMul() {
  if (game.magnets > game.autoSecondMulCost) {
    game.magnets = game.magnets - game.autoSecondMulCost;
    game.autoSecondMulCost = game.autoSecondMulCost * 11;
    game.autoSecondMulInterval = game.autoSecondMulInterval / 1.03;
    document.getElementsByClassName("autoMultButton")[1].innerHTML = "2nd Multiplier<br>Current Speed: 1 every "+game.autoSecondMulInterval.toFixed(1)+" ms.<br>Cost: "+game.autoSecondMulCost+" Magnets.";
    setInterval(() => {
      earnSecondMultiplier();
    }, game.autoSecondMulInterval);
  } else {
    var t = document.getElementById("snackbar");
    t.className = "show";
    t.innerHTML = "Not enough magnets!";
    setTimeout(function(){ t.className = t.className.replace("show", ""); }, 3000);
  }
}

function autoThirdMul() {
  if (game.magnets > game.autoThirdMulCost) {
    game.magnets = game.magnets - game.autoThirdMulCost;
    game.autoThirdMulCost = game.autoThirdMulCost * 12.2;
    game.autoThirdMulInterval = game.autoThirdMulInterval / 1.03;
    document.getElementsByClassName("autoMultButton")[2].innerHTML = "3rd Multiplier<br>Current Speed: 1 every "+game.autoThirdMulInterval.toFixed(1)+" ms.<br>Cost: "+game.autoThirdMulCost+" Magnets.";
    setInterval(() => {
      earnSecondMultiplier();
    }, game.autoThirdMulInterval);
  } else {
    var t = document.getElementById("snackbar");
    t.className = "show";
    t.innerHTML = "Not enough magnets!";
    setTimeout(function(){ t.className = t.className.replace("show", ""); }, 3000);
  }
}

function autoFourthMul() {
  if (game.magnets > game.autoFourthMulCost) {
    game.magnets = game.magnets - game.autoFourthMulCost;
    game.autoFourthMulCost = game.autoFourthMulCost * 13.75;
    game.autoFourthMulInterval = game.autoFourthMulInterval / 1.03;
    document.getElementsByClassName("autoMultButton")[3].innerHTML = "4th Multiplier<br>Current Speed: 1 every "+game.autoFourthMulInterval.toFixed(1)+" ms.<br>Cost: "+game.autoFourthMulCost+" Magnets.";
    setInterval(() => {
      earnSecondMultiplier();
    }, game.autoFourthMulInterval);
  } else {
    var t = document.getElementById("snackbar");
    t.className = "show";
    t.innerHTML = "Not enough magnets!";
    setTimeout(function(){ t.className = t.className.replace("show", ""); }, 3000);
  }
}

function autoFifthMul() {
  if (game.magnets > game.autoFifthMulCost) {
    game.magnets = game.magnets - game.autoFifthMulCost;
    game.autoFifthMulCost = game.autoFifthMulCost * 17.25;
    game.autoFifthMulInterval = game.autoFifthMulInterval / 1.03;
    document.getElementsByClassName("autoMultButton")[3].innerHTML = "5th Multiplier<br>Current Speed: 1 every "+game.autoFifthMulInterval.toFixed(1)+" ms.<br>Cost: "+game.autoFifthMulCost+" Magnets.";
    setInterval(() => {
      earnSecondMultiplier();
    }, game.autoFifthMulInterval);
  } else {
    var t = document.getElementById("snackbar");
    t.className = "show";
    t.innerHTML = "Not enough magnets!";
    setTimeout(function(){ t.className = t.className.replace("show", ""); }, 3000);
  }
}

/* Detect if number is NaN or undefined */
function detectNumber() {
  if (isNaN(game.magnets)) {
    window.location.reload();
  }
  if (isNaN(game.goldMagnets)) {
    window.location.reload();
  }
  if (isNaN(game.platinumMagnets)) {
    window.location.reload();
  }
  if (isNaN(game.legendaryMagnets)) {
    window.location.reload();
  }
}

setInterval(() => {
  if (game.magnets > 1e9) {
    document.getElementById("info").innerHTML = "Now you are able to prestige. Go to the \"Stats\" menu and try now.";
  } else if (game.magnets < 1e9) {
    document.getElementById("info").innerHTML = "Right now you cannot prestige. You need 1 billion magnets.";
  }
}, 2000);

setInterval(() => {
  document.getElementById("prestigeStats").innerHTML = "Gold Magnets Gain Multiplier: "+game.goldGainMul.toFixed(3)+".<br>Your Multiplier will be "+game.multiplyMul.toFixed(3)+"x higher in the next prestige.<br>The Platinum Magnets gain will be "+game.platinumMagsGain.toFixed(3)+"x.";
}, 50);

/* Prestige function */
function prestige() {
  if (game.magnets > 1e9) {
    let prestigeAlert = confirm(
      'Do you wanna prestige? You will lose all magnets, mults, and more!\nIf yes you will get:\n'+game.platinumMagsGain.toFixed(3)+' Platinum Magnets.\n'+game.multiplyMul.toFixed(3)+'x Magnet Multiplier.\n'+game.goldGainMul.toFixed(3)+' Gold Magnets upon button click.\n'+6*game.autoNumberMul.toFixed(3)+' magnets/second.\nAlso keep in mind every prestige increases cost of every other multiplier costs!\nAre you sure you wanna prestige?'
    );
    if (prestigeAlert) {
      game.magnets = 0;
      game.goldMagnets = 0;
      game.goldMagnetCost = 1250;
      game.goldMagnetGain = game.goldMagnetGain * game.goldGainMul;
      game.firstMulCost = 25;
      game.secondMulCost = 50;
      game.thirdMulCost = 100;
      game.fourthMulCost = 200;
      game.fifthMulCost = 2500;
      game.autoMagnetCost = 5000;
      game.autoNumber = 6;
      game.multiply = 1;
      game.gainMagsClicks = 0;
      game.firstMulClicks = 0;
      game.secondMulClicks = 0;
      game.thirdMulClicks = 0;
      game.fourthMulClicks = 0;
      game.fifthMulClicks = 0;
      game.goldMagsClicks = 0;
      game.autoMagsClicks = 0;
      game.multiply = game.multiply * game.multiplyMul;
      game.autoNumber = game.autoNumber * game.autoNumberMul;
      game.platinumMagnets = game.platinumMagnets * game.platinumMagsGain;
      document.getElementById("mags").innerHTML = ""+formatNum()+"";
      document.getElementById("gold").innerHTML = ""+game.goldMagnets.toFixed(0)+"";
      document.getElementById("plat").innerHTML = ""+game.platinumMagnets.toFixed(0)+"";
      document.getElementById("mult").innerHTML = ""+formatNumTwo()+"x.<br>";
      document.getElementById("auto").innerHTML = ""+formatNumTen()+"";
      document.getElementById("goldGain").innerHTML = ""+game.autoSpeed.toFixed(toFixedValue)+"";
      document.getElementsByClassName("button2")[0].innerHTML = "Gain 1st Multiplier ("+formatNumFour()+" mags)";
      document.getElementsByClassName("button3")[0].innerHTML = "Gain 2nd Multiplier ("+formatNumFive()+" mags)";
      document.getElementsByClassName("button4")[0].innerHTML = "Gain 3rd Multiplier ("+formatNumSix()+" mags)";
      document.getElementsByClassName("button5")[0].innerHTML = "Gain 4th Multiplier ("+formatNumSeven()+" mags)";
      document.getElementsByClassName("button6")[0].innerHTML = "Gain 5th Multiplier ("+formatNumEight()+" mags)";
      document.getElementsByClassName("button8")[0].innerHTML = "Earn Gold Magnets ("+formatNumThree()+" mags)";
      document.getElementsByClassName("button10")[0].innerHTML = "Earn Auto-Magnets Multi ("+formatNumNine()+" mags)";
      document.getElementById("mult").style.color = "#e52c00";
      document.getElementById("auto").style.color = "#e52c00";
    } else {
      var zz = document.getElementById("snackbar");
      zz.className = "show";
      zz.innerHTML = "Prestige canceled.";
      setTimeout(function(){ zz.className = zz.className.replace("show", ""); }, 3000);
      setTimeout(() => {
        zz.innerHTML = "Not enough magnets!"
      }, 4000);
    }
  } else {
    var a = document.getElementById("snackbar");
    a.className = "show";
    a.innerHTML = "Need over 1 billion magnets to prestige";
    setTimeout(function(){ a.className = a.className.replace("show", ""); }, 3000);
    setTimeout(() => {
      a.innerHTML = "Not enough magnets!"
    }, 4000);
  }
}

/* Hard Reset Game */
function hardReset() {
  let confirmed = confirm(
    "Are you sure? Hard reset means, lose all your progress, your magnets, prestiges, and EVERYTHING. Once you did it, you cannot reverse!"
  );
  if (confirmed) {
    try {
      localStorage.removeItem("theGame");
      window.location.reload();
    }
    catch(g) {
      alert("You lucky, no data lost!")
    }
  } else {
    var za = document.getElementById("snackbar");
    za.className = "show";
    za.innerHTML = "Hard Reset Canceled. No data was lost.";
    setTimeout(function(){ za.className = za.className.replace("show", ""); }, 3000);
    za.style.color = "#fff";
    setTimeout(() => {
      za.innerHTML = "Not enough magnets!"
    }, 4000);
  }
}

/* Saving */

setInterval(save, 10000);
load();

//taken from SuperSpruce for the Magnet Revival game
//slightly modified to make space for a few options

function objectToDecimal(object) {
    for (let i in object) {
        if (typeof(object[i]) == "string" && !isNaN(new Decimal(object[i]).mag) && !(new Decimal(object[i]).sign == 0 && object[i] != "0")) {
            object[i] = new Decimal(object[i]);
        }
        if (typeof(object[i]) == "object") {
            objectToDecimal(object[i]);
        }
    }
}

function merge(base, source) {
    for (let i in base) {
        if (source[i] != undefined) {
            if (typeof(base[i]) == "object" && typeof(source[i]) == "object" && !isDecimal(base[i]) && !isDecimal(source[i])) {
                merge(base[i], source[i]);
            } else {
                if (isDecimal(base[i]) && !isDecimal(source[i])) {
                    base[i] = new Decimal(source[i]);
                } else if (!isDecimal(base[i]) && isDecimal(source[i])) {
                    base[i] = source[i].toNumber();
                } else {
                    base[i] = source[i];
                }
            }
        }
    }
}


function isDecimal(x) {
    if (x.mag == undefined) {
        return false;
    } else {
        return true;
    }
}

var savegame;

function save() {
  localStorage.setItem("theGame", JSON.stringify(game));
}

function load() {
  try {
    if (localStorage.getItem("theGame")) {
      savegame = JSON.parse(localStorage.getItem("theGame"));
      objectToDecimal(savegame);
      merge(game, savegame);
      buyAuto();
      checkMobile();
    }
  }
  catch(e) {
    alert("ERROR: Could not load savefile. There might be an error in the parsing or some other thing.\nPress OK to try again.");
    window.location.reload();
  }
}

function wipeSave() {
  save();
  load();
}

function exportSave() {
  return btoa(JSON.stringify(game));
}

function importSave(text) {
  try {
    savegame = JSON.parse(atob(text));
    objectToDecimal(savegame);
    merge(game, savegame);
    save();
  }
  catch(e) {
    alert("Import code failed! Please make sure you have copied and pasted the code correctly!")
  }
}

function saveGame() {
  save();
  var zC = document.getElementById("snackbar");
  zC.className = "show";
  zC.innerHTML = "Game saved!";
  setTimeout(function(){ zC.className = zC.className.replace("show", ""); }, 3000);
  setTimeout(() => {
    zC.innerHTML = "Not enough magnets!"
  }, 4000);
}

/* Event Listeners for Buttons */

function n() {
  return 222;
}

document.getElementsByClassName("button17")[0].addEventListener("click", click);

try {
  document.getElementsByClassName("button13")[0].addEventListener("click", auto);
}
catch(eee) {
  n();
}

function click() {
  alert("Export code successful. If you wanna copy the text press Ctrl+C to copy, Ctrl+V to paste (import). Make sure to keep this code in a safe place!")
}

function auto() {
  if (game.magnets > 3000) {
    game.autoNumber = 6;
  }
}

function goldStart() {
  game.autoSpeed = 0.025;
}