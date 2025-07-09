var game = {}; 
function $(id) { 
  return document.getElementById(id) 
} 

function hide(id) { 
  $(id).style.display = "none" 
} 

function show(id) {
  $(id).style.display = "inline-block" 
} 

function set(id,thing) { // next level laziness
  $(id).innerHTML = thing 
} 

function prettify(n = 69.420, r = 1) { 
  return n.toFixed(r) 
}

var Decimal = Decimal
const D = (stuff) => {return new Decimal(stuff)} 

function getNewSave() { 
  game.energy = D(0); 
  game.energyCap = D(500); 
  game.idleEnergy = D(0);
  game.assignedAttackEnergy = D(0);
  game.assignedDefenceEnergy = D(0);
  game.attackEnergy = D(0);
  game.defenceEnergy = D(0);
  game.stats = { hp: D(10), 
    atk: D(1), 
    def: D(1), 
    regen: D(0.1)
  }; 
} 

function tick() { 
  game.idleEnergy = game.energy.minus(game.assignedAttackEnergy).minus(game.assignedDefenceEnergy);
  game.attackEnergy = game.attackEnergy.plus(game.assignedAttackEnergy);
  game.defenceEnergy = game.defenceEnergy.plus(game.assignedDefenceEnergy);
  if (game.energyCap.gt(game.energy))
    game.energy = game.energy.plus(0.02); 
  else game.energy = game.energyCap;
  
  set("energy", "Your Total Energy: " + prettify(game.energy.mul(100).round().div(100)) + "/" + prettify(game.energyCap));
  set("idleEnergy", "Your Idle Energy: " + prettify(game.idleEnergy.mul(100).round().div(100)))
  set("attackEnergy", "Your Attack Energy: " + prettify(game.attackEnergy.mul(100).round().div(100)))
  set("defenceEnergy", "Your Defence Energy: " + prettify(game.defenceEnergy.mul(100).round().div(100)))
}



function assignToAttackTraining() {
  if (game.idleEnergy.gte(1))
  game.assignedAttackEnergy = game.assignedAttackEnergy.plus(1)
  game.idleEnergy = game.idleEnergy.minus(1)
}

function assignToDefenceTraining() {
  if (game.idleEnergy.gte(1))
  game.assignedDefenceEnergy = game.assignedDefenceEnergy.plus(1)
  game.idleEnergy = game.idleEnergy.minus(1)
}

function unassignToAttackTraining() {
  if (game.assignedAttackEnergy.gte(1))
  game.assignedAttackEnergy = game.assignedAttackEnergy.minus(1)
  game.idleEnergy = game.idleEnergy.plus(1)
}

function unassignToDefenceTraining() {
  if (game.assignedDefenceEnergy.gte(1))
  game.assignedDefenceEnergy = game.assignedDefenceEnergy.minus(1)
  game.idleEnergy = game.idleEnergy.plus(1)
}




function init() {
  getNewSave() 
  load();
  setInterval(tick,20) //speed 100 function
  setInterval(save, 1337)
}

init()
  