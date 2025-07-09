/* TODO:
Base currency
Overall Multiplier ordinal
Base currency has generic incremental setup around it
OM ordinal goes up based on current base currency - initially exponentially, with upgrades to decrease base, then drop it to polynomial, dropping order of polynomial all the way to linear
Once linear, one final upgrade to make it logarithmic, which plays an animation as the ordinal supertasks to omega.
Each omega gives a 50% slowdown to the next, and can be spent on powerful upgrades/automation - including reducing the slowdown. Eventually becomes neutral, then a boost, hastening the production of omegas until it once again telescopes into omega^2 */

var layers = [Base, Omega, Square];

function load() {
  clearInterval(timer);
  const prevSave = localStorage.getItem("layers");
  if (prevSave != null) {
    var temp = JSON.parse(prevSave);
    for (let l of temp) {
      for (let l2 of layers) {
        if (l2.name == l.name) {
          l2.upgradeCount = l.upgradeCount;
        }
      }
      for (let b of l.buildings) {
        for (let i = 0; i < allBuildings.length; i++) {
          if (allBuildings[i].name == b.name) {
            var p1, p2;
            for (let p of allProducibles) {
              if (p.name == b.basePriceCurr) {
                p1 = p;
              }
            }
            if (Array.isArray(b.baseProd)) {
              p2 = b.baseProd;
              for (let j = 0; j < b.baseProd.length; j++) {
                for (let p of allProducibles) {
                  if (p.name == b.baseProd[j]) {
                    p2[j] = p;
                  }
                }
              }
            } else {
              for (let p of allProducibles) {
                if (p.name == b.baseProd) {
                  p2 = p;
                }
              }
            }
            allBuildings[i].update(
              b.name,
              b.basePrice,
              p1,
              p2,
              b.baseProdAmt,
              b.baseScaling,
              b.HTMLPrefix,
              b.bought,
              b.made
            );
          }
        }
      }
      for (let c of allCurrencies) {
        if (c.name == l.currency.name) {
          c.made = l.currency.made;
        }
      }
    }
  }
  for (var l of layers) {
    for (var b of l.buildings) {
      let temp = b;
      b.button.onclick = function () {
        if (temp.basePriceCurr.amount >= temp.cost) {
          temp.basePriceCurr.made -= temp.cost;
          temp.bought++;
          display();
        }
      };
    }
    let temp = l;
    l.upbutt.onclick = function () {
      if (
        temp.currency.amount >= temp.upgrades[temp.upgradeCount][0] &&
        temp.upgrades[temp.upgradeCount][0] != Infinity
      ) {
        temp.currency.made -= temp.upgrades[temp.upgradeCount][0];
        temp.upgradeCount++;
        display();
      }
    };
  }
  if (omegas.amount > 0 || Omega.upgradeCount > 0 || omega1.amount > 0) {
    document.getElementById("layerchange").style.display = "";
  }
  if (squares.amount > 0 || Square.upgradeCount > 0 || square1.amount > 0) {
    document.getElementById("layerchange").style.display = "";
    document.getElementById("squarepage").style.display = "";
  }
  let old = Number(localStorage.getItem("saveTime"));
  let dif = Math.floor((Date.now() - old) / 200);
  if (old != 0) {
    for (let i = 0; i < dif; i++) {
      processSilent();
    }
  }
  timer = setInterval(processSec, 100);
}

const ordDisplay = document.getElementById("ordinal");

const updesc = document.getElementById("baseupgradedesc");
const upcost = document.getElementById("baseupgradecost");
const pointsDisplay = document.getElementById("basecurrencycount");
const incomeDisplay = document.getElementById("basecurrencyincome");
const ordReqDisplay = document.getElementById("nextordinalat");
const ordBoostDisplay = document.getElementById("ordinalboost");
var ordinalboost = 1;
var finiteordinal = 1;
var ordinalreq = 100;

function log(num, base) {
  return Math.log(num) / Math.log(base);
}

function prettyNum(num) {
  if ((num >= 1e15 || num <= 1e-3) && num != Infinity) {
    if (num == 0) {
      return "0";
    } else {
      return num.toExponential(3);
    }
  } else {
    return num.toLocaleString();
  }
}

function ordinalProcess() {
  if (Omega.upgradeCount < 9) {
    if (Base.upgrades[Base.upgradeCount][2] == "exp") {
      finiteordinal =
        2 +
        Math.floor(
          Math.max(
            -1,
            log(points.amount / 100, Base.upgrades[Base.upgradeCount][3])
          )
        );
      ordinalreq =
        Math.pow(Base.upgrades[Base.upgradeCount][3], finiteordinal - 1) * 100;
      ordinalboost = finiteordinal;
    } else if (Base.upgrades[Base.upgradeCount][2] == "poly") {
      finiteordinal =
        1 +
        Math.floor(
          Math.max(
            -1,
            Math.pow(
              points.amount / 100,
              1.0 / Base.upgrades[Base.upgradeCount][3]
            )
          )
        );
      ordinalreq =
        Math.pow(finiteordinal, Base.upgrades[Base.upgradeCount][3]) * 100;
      ordinalboost = finiteordinal;
    } else if (Base.upgrades[Base.upgradeCount][2] == "const") {
      clearInterval(timer);
      points.made = Infinity;
      points.income = Infinity;
      ordinalboost = Infinity;
      ordinalreq = Infinity;
      omegaAnim();
    }
  } else {
    if (Omega.upgradeCount == 13) {
      clearInterval(timer);
      omegas.income = Infinity;
      omega1.prodMult = Infinity;
      squareAnim();
    }
  }
}
function omegabutton() {
  omegas.made++;
  reset(1);
  document.getElementById("layers").style.display = "";
  document.getElementById("layerchange").style.display = "";
  document.getElementById("omegabutton").style.display = "none";
}

function squarebutton() {
  squares.made++;
  reset(2);
  document.getElementById("layers").style.display = "";
  document.getElementById("layerchange").style.display = "";
  document.getElementById("squarepage").style.display = "";
  document.getElementById("omegabutton").style.display = "none";
}

function showSquare() {
  document.getElementById("baselayer").style.display = "none";
  document.getElementById("omegalayer").style.display = "none";
  document.getElementById("squarelayer").style.display = "";
}

function showOmega() {
  document.getElementById("baselayer").style.display = "none";
  document.getElementById("omegalayer").style.display = "";
  document.getElementById("squarelayer").style.display = "none";
}

function showBase() {
  document.getElementById("baselayer").style.display = "";
  document.getElementById("omegalayer").style.display = "none";
  document.getElementById("squarelayer").style.display = "none";
}

function reset(level) {
  clearInterval(timer);
  if (level == 1) {
    for (let l of layers) {
      if (l.level == 1) {
        ordinalboost = 1;
        if (Omega.upgradeCount >= 1) {
          if (Omega.upgradeCount >= 3) {
            if (Omega.upgradeCount >= 9) {
              l.upgradeCount = 7;
            } else {
              l.upgradeCount = 6;
            }
          } else {
            l.upgradeCount = 4;
          }
        } else {
          l.upgradeCount = 0;
        }
        l.currency.made = 0;
        l.currency.income = 0;
        for (let b of l.buildings) {
          b.made = 0;
          b.bought = 0;
          b.prodMult = 1;
        }
      }
    }
  } else if (level == 2) {
    for (let l of layers) {
      ordinalboost = 1;
      if (l.level <= 2) {
        l.upgradeCount = 0;
        l.currency.made = 0;
        l.currency.income = 0;
        for (let b of l.buildings) {
          b.made = 0;
          b.bought = 0;
          b.prodMult = 1;
        }
      }
    }
  }
  ordinalProcess();
  display();
  timer = setInterval(processSec, 100);
}

function omegaAnim() {
  if (Omega.upgradeCount >= 6) {
    omegabutton();
  } else {
    if (omegas.amount == 0) {
      display();
      ordDisplay.innerHTML = finiteordinal = 1e100;
      function loop1(i) {
        if (i < 20) {
          setTimeout(function () {
            i++;
            loop2(i, 0);
          }, 100 - 4 * i);
        } else {
          ordDisplay.innerHTML = "e".repeat(25) + "...";
          setTimeout(function () {
            ordDisplay.innerHTML = "ω";
            document.getElementById("layers").style.display = "none";
            document.getElementById("omegabutton").style.display = "";
          }, 1000);
        }
      }
      function loop2(i, j) {
        if (j < 10) {
          setTimeout(function () {
            j++;
            ordDisplay.innerHTML = "e".repeat(i + 1) + j.toString();
            loop2(i, j);
          }, 50 - 2 * i);
        } else {
          loop1(i);
        }
      }
      loop1(0);
    } else {
      finiteordinal = "ω";
      display();
      document.getElementById("baselayer").style.display = "none";
      document.getElementById("omegabutton").style.display = "";
      if (omegas.amount > 1) {
        ordDisplay.innerHTML = "ω" + omegas.amount + " + ω";
      } else {
        ordDisplay.innerHTML = "ω + ω";
      }
    }
  }
}

function squareAnim() {
  if (squares.amount == 0) {
    display();
    ordDisplay.innerHTML = "ωe100";
    function loop1(i) {
      if (i < 20) {
        setTimeout(function () {
          i++;
          loop2(i, 0);
        }, 100 - 4 * i);
      } else {
        ordDisplay.innerHTML = "ω" + "e".repeat(25) + "...";
        setTimeout(function () {
          ordDisplay.innerHTML = "ω<sup>2</sup>";
          document.getElementById("layers").style.display = "none";
          document.getElementById("squarebutton").style.display = "";
        }, 1000);
      }
    }
    function loop2(i, j) {
      if (j < 10) {
        setTimeout(function () {
          j++;
          ordDisplay.innerHTML = "ω" + "e".repeat(i + 1) + j.toString();
          loop2(i, j);
        }, 50 - 2 * i);
      } else {
        loop1(i);
      }
    }
    loop1(0);
  } else {
    finiteordinal = "ω";
    display();
    document.getElementById("omegalayer").style.display = "none";
    document.getElementById("squarebutton").style.display = "";
    if (squares.amount > 1) {
      ordDisplay.innerHTML =
        "ω<sup>2</sup>" + squares.amount + " + ω<sup>2</sup>";
    } else {
      ordDisplay.innerHTML = "ω<sup>2</sup> + ω<sup>2</sup>";
    }
  }
}

var omegapenalty = 0.5;
function calculateMults() {
  for (let l of layers) {
    for (let b of l.buildings) {
      b.prodMult = 1;
    }
  }

  base1.prodMult *= ordinalboost;
  for (let b of Base.buildings) {
    b.prodMult *= Math.pow(omegapenalty, omegas.amount);
  }
  if (Omega.upgradeCount >= 10) {
    omega1.prodMult *= 1 + (Math.pow(omegapenalty, 0.01) - 1) * omegas.amount;
    if (Omega.upgradeCount >= 12) {
      omega2.prodMult *= 1 + (Math.pow(omegapenalty, 0.01) - 1) * omegas.amount;
      omega3.prodMult *= 1 + (Math.pow(omegapenalty, 0.01) - 1) * omegas.amount;
    }
  }
}
function calculatePenalty() {
  if (Omega.upgradeCount > 0) {
    omegapenalty =
      0.5 + Math.max(0, Omega.upgrades[Omega.upgradeCount - 1][3] * 0.1);
  } else {
    omegapenalty = 0.5;
  }
}
function processSilent() {
  for (let p of allCurrencies) {
    p.income = 0;
  }
  calculatePenalty();
  calculateMults();
  if (Omega.upgradeCount >= 9) {
    omega1.baseProd = omegas;
    omega1.baseProdAmt = 0.0005;
  } else {
    omega1.baseProd = [base1, base2, base3, base4, base5];
    omega1.baseProdAmt = 0.1;
  }
  for (let l = 0; l < layers.length; l++) {
    for (let b = 0; b < layers[l].buildings.length; b++) {
      if (Array.isArray(layers[l].buildings[b].baseProd)) {
        for (let i of layers[l].buildings[b].baseProd) {
          i.made += layers[l].buildings[b].production * 0.1;
          if (i instanceof Currency) {
            i.income += layers[l].buildings[b].production;
          }
        }
      } else {
        layers[l].buildings[b].baseProd.made +=
          0.1 * layers[l].buildings[b].production;
        if (layers[l].buildings[b].baseProd instanceof Currency) {
          layers[l].buildings[b].baseProd.income +=
            layers[l].buildings[b].production;
        }
      }
    }
  }
  if (
    points.amount >= Base.upgrades[Base.upgradeCount][0] &&
    Omega.upgradeCount >= 6
  ) {
    Base.upgradeCount++;
  }
  if (points.amount == Infinity) {
    Base.upgradeCount = 8;
  }
  if (
    omegas.amount == Infinity ||
    (omegas.amount = NaN && Omega.upgradeCount >= 9)
  ) {
    Omega.upgradeCount = 13;
  }
  ordinalProcess();
}
function processSec() {
  processSilent();
  display();
}

function display() {
  let ordString = "";

  if (squares.amount >= 1) {
    if (squares.amount == 1) {
      ordString += "ω<sup>2</sup>";
    } else {
      ordString +=
        "ω<sup>2</sup>" + prettyNum(Math.floor(squares.amount));
    }
  }
    if (omegas.amount >= 1) {
      if(ordString != "") {
        ordString += " + "
      }
    if (omegas.amount == 1) {
      ordString += "ω"
    } else {
      ordString +=
        "ω" +
        prettyNum(Math.floor(omegas.amount));
    }
    }
    if (Omega.upgradeCount < 9){
      if(ordString != "") {
        ordString += " + "
      }
      ordString += prettyNum(Math.floor(points.amount));
    }
    ordDisplay.innerHTML = ordString;
  
  let ordBoost = "";
    if (Omega.upgradeCount >= 10) {
      ordBoost =
        prettyNum(omega1.prodMult) + "x multiplier to omega speed.";
    } else {
      if (omegas.amount >= 1) {
        ordBoost += prettyNum(Math.pow(omegapenalty, omegas.amount)) +
          "x multiplier to all point power"
      }
      if (ordinalboost > 1) {
        if(ordBoost != "") {
        ordBoost += ", "
      }
        ordBoost += prettyNum(ordinalboost) +
          "x boost to f<sub>0</sub>(n) power";
      }
      else if (ordinalboost == Infinity) {
        if(ordBoost != "") {
        ordBoost += ", "
      }
        ordBoost+= 
          "∞x boost to f<sub>0</sub>(n) power";
      } else {
        if(ordBoost == "") {
        ordBoost = "None."
      }
      }}
  ordBoostDisplay.innerHTML = ordBoost;
    if (Omega.upgradeCount >= 9) {
      document.getElementById("pointpage").style.display = "none";
      if (document.getElementById("baselayer").style.display == "") {
        showOmega();
      }
    } else {
      document.getElementById("pointpage").style.display = "";
    }

  if (Omega.upgradeCount >= 9) {
    ordReqDisplay.style.display = "none";
  } else {
    ordReqDisplay.innerHTML =
      "Next ordinal at: " + prettyNum(ordinalreq) + " points.";
    ordReqDisplay.style.display = "";
  }

  for (let l of layers) {
    l.pointsDisplay.innerHTML = prettyNum(Math.floor(l.currency.amount));
    l.incomeDisplay.innerHTML = prettyNum(l.currency.income);
    for (let b of l.buildings) {
      b.amountDisplay.innerHTML = prettyNum(Math.floor(b.amount));
      b.costDisplay.innerHTML = prettyNum(b.cost);
    }
    l.updesc.innerHTML = l.upgrades[l.upgradeCount][1];
    l.upcost.innerHTML = prettyNum(l.upgrades[l.upgradeCount][0]);
  }
}

function save() {
  localStorage.setItem("layers", JSON.stringify(layers));
  localStorage.setItem("saveTime", Date.now().toString());
}

function wipeSave() {
  var input = prompt("Please type CONFIRM to continue:");
  if (input == "CONFIRM") {
    localStorage.clear();
    location.reload();
  }
}

load();
var timer;
var saver = setInterval(save, 30000);
