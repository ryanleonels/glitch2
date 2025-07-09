class Game {
  constructor() {
    this.paypal = new Decimal(0);
    this.settings = {
      funmode: false
    };
    this.upgrades = {
      amount: [new Decimal(0), new Decimal(0), new Decimal(0)],
      cost: [new Decimal(15), new Decimal(100), new Decimal(1e3)],
      costMult: [new Decimal(1.2), new Decimal(1.25), new Decimal(25)]
    };
    this.bank = {
      credit: new Decimal(0),
      times: 0,
      upgrades: {
        purchased: [new Decimal(0), new Decimal(0), new Decimal(0)],
        cost: [new Decimal(1), new Decimal(20), new Decimal(60), new Decimal(1000)],
        costMult: [1, new Decimal(1.05), new Decimal(1.05), 1] // upgrades 2/3 are rebuyable
      }
    };
  }
}

let dev = {
  funnerMode: function() {
    setInterval(function() {
      game.settings.funmode = true;
    }, 0);
  }
};

function checkUndefined() {
  if (game.bank == undefined)
    game.bank = {
      credit: new Decimal(0),
      times: 0,
      upgrades: {
        purchased: [new Decimal(0), new Decimal(0), new Decimal(0)],
        cost: [new Decimal(1), new Decimal(20), new Decimal(60), new Decimal(1000)],
        costMult: [1, new Decimal(1.05), new Decimal(1.05), 1] // upgrades 2/3 are rebuyable
    }
  }
}

let canpaypal = true;

//saving
var pastGame;

function save() {
  localStorage.setItem("cisave", JSON.stringify(game));
}

function load() {
  if (localStorage.getItem("cisave")) {
    pastGame = JSON.parse(localStorage.getItem("cisave"));
    objectToDecimal(pastGame);
    merge(game, pastGame);
  }
}

function exportSave() {
  //won't work unless you create an exportArea textfield
  document.getElementById("exportArea").style.display = "inline-block";
  document.getElementById("exportArea").innerHTML = btoa(JSON.stringify(game));
  document.getElementById("exportArea").select();
  document.execCommand("copy");
  document.getElementById("exportArea").style.display = "none";
}

function importSave() {
  let save = prompt(
    "Please enter export text.\nWarning: Your current save will be over-written."
  );
  if (save !== null) {
    localStorage.setItem("emsave", atob(save));
    load();
  }
}

function wipe() {
  if (
    confirm(
      "Are you sure you want to wipe your save? This WILL overwrite your current save with the default save, and there is NO method of restoring your old save data."
    )
  ) {
    game = new Game();
    save();
  }
}

function objectToDecimal(object) {
  for (let i in object) {
    if (
      typeof object[i] === "string" &&
      new Decimal(object[i]).toString() === object[i]
    ) {
      object[i] = new Decimal(object[i]);
    }
    if (typeof object[i] == "object") {
      objectToDecimal(object[i]);
    }
  }
}

function merge(base, source) {
  //for cross version save handling
  for (let i in base) {
    if (source[i] !== undefined) {
      if (
        typeof base[i] === "object" &&
        typeof source[i] === "object" &&
        !isDecimal(base[i]) &&
        !isDecimal(source[i])
      ) {
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
  return x.mag === undefined ? false : true;
}

//ui
function ge(x) {
  return document.getElementById(x);
}

function tab(tab) {
  document
    .getElementById(tab)
    .parentNode.querySelectorAll(
      "#" + document.getElementById(tab).parentNode.id + " > .tab"
    )
    .forEach(function(element) {
      element.style.display = "none";
    });
  document.getElementById(tab).style.display = "inline-block";
}

function formatNum(n, toFixed) {
  let output;
  if (n.gte(1e6)) {
    output = n.toPrecision(3).replace("+", "");
  } else output = n.toFixed(toFixed);
  return output;
}

function randColor() {
  let color = "#";
  for (let i = 0; i < 6; i++)
    color += Math.floor(Math.random() * 0x10).toString(16);
  return color;
}

//production, upgrades
document.addEventListener("keydown", event => {
  if (event.keyCode === 70 && canpaypal) {
    // press F
    paypal();
    canpaypal = false;
  } else if (event.keyCode === 71)
    window.location.replace("https://you-are-a-failure.glitch.me/"); // DON'T PRESS G.
  // you thought inappropriate stuff was funny but i don't think it's funny
});

function paypal() {
  game.paypal = game.paypal.add(paypalUpgEffect(0).times(paypalUpgEffect(2)));
}

document.addEventListener("keyup", event => {
  if (event.keyCode === 70) canpaypal = true;
});

function buyPaypalUpg(x) {
  if (game.upgrades.cost[x].lte(game.paypal)) {
    game.paypal = game.paypal.sub(game.upgrades.cost[x]);
    game.upgrades.amount[x] = game.upgrades.amount[x].add(1);
    game.upgrades.cost[x] = new Decimal(game.upgrades.cost[x])
      .times(game.upgrades.costMult[x])
      .floor();
  }
}

function paypalUpgEffect(x) {
  switch (x) {
    case 0:
      return new Decimal((game.upgrades.amount[0]).add(1)).times(totalMultiplier()).max(1);
    case 1:
      return new Decimal(game.upgrades.amount[1])
        .times(Math.log(game.upgrades.amount[1] + 1))
        .times(totalMultiplier());
    case 2:
      return new Decimal(Decimal.add(game.upgrades.amount[2], 1))
        .pow(1.5)
        .max(1);
  }
}

// update

function updateUpgradeText() {
  var credit;
  if (game.bank.times > 0) {
    credit = ", " + game.bank.credit + " credit";
  } else credit = "";
  ge("currencyDisplay").innerHTML =
    "you have " + formatNum(game.paypal, 2) + " paypal" + credit;
  ge("paypalupg1").textContent =
    "get more paypal (currently: +" +
    formatNum(paypalUpgEffect(0), 0) +
    " paypal) | cost: " +
    formatNum(game.upgrades.cost[0], 0) +
    " paypal";
  ge("paypalupg2").textContent =
    "automatically make paypal (currently: +" +
    formatNum(paypalUpgEffect(1), 2) +
    " paypal/sec) | cost: " +
    formatNum(game.upgrades.cost[1], 0) +
    " paypal";
  ge("paypalupg3").textContent =
    "multiply paypal (currently: " +
    formatNum(paypalUpgEffect(2), 2) +
    "x) | cost: " +
    formatNum(game.upgrades.cost[2], 0) +
    " paypal";
}

// music - because don wada wanted it
function toggleMusic(x) {
  if (x == 1) {
    document.getElementById("music").play();
  } else if (x == 0) document.getElementById("music").pause();
}

//init
var game;
function init() {
  game = new Game();
  tab("paypalTab");
  setInterval(function() {
    let allBtns = document.getElementsByTagName("button");
    if (game.settings.funmode) {
      toggleMusic(1);
      ge("game").style.color = randColor();
      for (let i = 0; i < allBtns.length; i++)
        allBtns[i].style.color = randColor();

      ge("game").style.backgroundColor = randColor();
      for (let i = 0; i < allBtns.length; i++)
        allBtns[i].style.backgroundColor = randColor();
    } else {
      toggleMusic(0);
      ge("game").style.color = "black";
      for (let i = 0; i < allBtns.length; i++) allBtns[i].style.color = "black";

      ge("game").style.backgroundColor = "white";
      for (let i = 0; i < allBtns.length; i++)
        allBtns[i].style.backgroundColor = "white";
    }
    updateUpgradeText();
    updateBankDisplay();
    checkUndefined();
    game.paypal = game.paypal.add(
      paypalUpgEffect(1)
        .div(100)
        .times(paypalUpgEffect(2))
    );
  }, 10);
  load();
}

init();
