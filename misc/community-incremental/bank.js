function updateBankDisplay() {
  if (canBankPrestige() || game.bank.times > 0) {
    ge("sectionTabBank").style.display = "inline-block";
  } else ge("sectionTabBank").style.display = "none";
  if (canBankPrestige()) {
    ge("bankGainText").textContent = "deposit your paypal in the bank for " + creditGainedOnBank() + " credit."
  } else ge("bankGainText").textContent = "get " + formatNum(new Decimal(1e6), 0) + " paypal to be able to bank."
  
  ge("creditBonusText").textContent = formatNum(getCreditMultiplier(), 2)
}

function getCreditMultiplier() {
return ((game.bank.credit).add(1)).pow(0.8).max(1)
}

function creditGainedOnBank() {
return Decimal.floor(((game.paypal).div(1e6)).pow(0.6))
}

function canBankPrestige() {
return game.paypal.gte(1e6)
}

function totalMultiplier() {
var x = new Decimal(1)
if ((game.upgrades.amount[2]).gte(1)) x = x.times(paypalUpgEffect(2))
if ((game.bank.credit).gte(1)) x = x.times(getCreditMultiplier())
return x.max(1)
}

function bankPrestige() {
  if (canBankPrestige()) {
    game.bank.credit = Decimal.add(game.bank.credit, creditGainedOnBank())
    game = {
      paypal: new Decimal(0),
      settings: game.settings,
      upgrades: {
        amount: [new Decimal(0), new Decimal(0), new Decimal(0)],
        cost: [new Decimal(15), new Decimal(100), new Decimal(1e3)],
        costMult: [new Decimal(1.2), new Decimal(1.25), new Decimal(25)]
      },
      bank: game.bank
    }
    tab('paypalTab')
    game.bank.times++
  }
}

function bankUpgEffect(x) {
  switch (x) {
    case 0:
      return new Decimal(1);
    case 1:
      return new Decimal(1);
    case 2:
      return new Decimal(1);
  }
}