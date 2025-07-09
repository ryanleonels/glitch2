var currentEndgameString = "1.00e715 points";
var currentEndgameValue = D("1e715");

let pbGetters = {
  percentToEndgame: function() {return player.points.add(1).log().div(currentEndgameValue.log()).min(1).mul(100).toFixed(2)}, 
  percentToEndgameColor: function() {return getPBColor(pbGetters.percentToEndgame())},
  percentToAchCompletion: function() {return getTotalAchPercentage().toFixed(2)},
  percentToAchCompletionColor: function() {return getPBColor(pbGetters.percentToAchCompletion())}
} 

var boosterData={
  cost(){
    let base = D(3)
    if (inChallenge("energy",3))base=D(4.2069)
    if (hasChallenge("energy",0)&&!inChallenge("energy",3))base=base.pow(0.9)
    if (hasChallenge("energy",3))base=base.pow(0.9)
    let divider = D(hasUpgrade("air",3)&&!inChallenge("energy",1)&&!inChallenge("energy",2)&&!inChallenge("energy",3)?0.8:1).div(D(1.5).pow(rebuyableAmt("space",1))).div(hasMilestone("space",2)?2:1).mul(hasUpgrade("energy",4)?0.1:1)
    let superscaledB=D(player.boosters).mul(player.boosters.gte(150)?player.boosters.minus(149).div(hasMilestone("planets",0)?(hasMilestone("planets",2)?1000:500):250).add(1):1).mul(player.boosters.gte(650)?player.boosters.minus(649).div(100).add(1):1)
    return base.pow(superscaledB).mul(divider).pow(player.boosters.gte(720)?player.boosters.sub(719).div(720).plus(1).pow(24):1)
    },
  bulkBuy(max){
    if(player.points.lt(this.cost())) return [D(0),this.cost()]
  },
  buy(){
    if(!player.points.gte(this.cost()))return;
    player.points=player.points.minus(this.cost())
    player.boosters=player.boosters.add(1)
  },
  extra(){
    let extra = D(0)
    if(hasUpgrade("energy",1))extra=extra.add(10)
    extra=extra.add(rebuyableAmt("energy",1))
    extra=extra.add(rebuyableAmt("boosters",2).mul(20))
    if(hasMilestone("planets",4))extra=extra.add(55)
    return extra
  }
}
var flyData={
  gain(){
    let gain = player.boosters
    if(gain.lt(4))gain=D(0)
    if(hasMilestone("planets",1))gain=gain.pow(1.5).floor()
    return gain
  },
  reset(){
    if(player.boosters.lt(4))return;
    player.boostersLost=player.boostersLost.add(this.gain())
    player.air=player.air.add(airData.gain())
    player.boosters=(player.milestones.space[0]?D(1):D(0))
    player.points=D(0)
  },
  boost(){
    return D(player.boostersLost).add(1).pow(0.6).add(1).pow(inAnyChallenge("energy")?0.5:1).pow(hasUpgrade("air",8)?1.5:1).pow(hasMilestone("planets",1)?2:1)
  }
}
var airData={
  gain(){
    let gain = player.boosters.minus(6).times(player.milestones.space[3]?2:1).floor()
    if(hasUpgrade("energy",6))gain=gain.mul(player.energy.div(2).add(1))
    if(gain.lt(1))gain=D(0)
    return gain
  },
  boost(){
    let boost = D(player.air).add(4).pow(0.66)
    if(hasChallenge("energy",1))boost=boost.pow(1.15)
    if(inAnyChallenge("energy"))boost=boost.pow(0.5)
    if(hasUpgrade("air",7))boost=boost.pow(2)
    if(boost.lt(1))boost=D(1)
    return boost
  }
}
var spaceData={
  gain(){
    let gain = player.boosters.minus(11).max(3).pow(0.5).times(D(2).pow(rebuyableAmt("space",2)))
    if(hasUpgrade("air",5))gain=gain.mul(player.air.pow(0.25))
    if(hasMilestone("planets",3))gain=gain.pow(3)
    if(gain.lt(0))gain=D(0)
    return gain
  },
}
var powerData={
  gain(){
    let gain = player.points.div(1e7).add(2).log(10).minus(0.098).mul(energyData.boost())
    if(hasUpgrade("energy",0))gain=gain.mul(4)
    if(hasUpgrade("energy",4))gain=gain.mul(3)
    gain=gain.mul(D(1.5).pow(rebuyableAmt("space",3)))
    if(gain.lt(1))gain=D(0)
    return gain
  },
  boost(){
    let boost = D(player.power).times(2).plus(1).pow(0.55).plus(1)
    if(inAnyChallenge("energy"))boost=boost.pow(0.5)
    boost=boost.mul(D(2).pow(rebuyableAmt("energy",2)))
    if(hasUpgrade("energy",3))boost=boost.pow(1.5)
    if(hasUpgrade("energy",7))boost=boost.pow(2)
    return boost
  },
  lossEffectOnPoints(){
    return D(hasUpgrade("energy",0)?4:2)
  }
}
var energyData={
  cost(){
    //let cost = D(10).pow(player.energy.add(1)).div(D(2).pow(rebuyableAmt("energy",0)))
    return this.costFixed(player.energy);
  },
  costFixed(n) {
    let cost = D(10).pow(n.add(1)).div(D(2).pow(rebuyableAmt("energy",0)))
    return cost
  },
  costMax() {
    if (player.power.lte(0)) return [D(0), this.cost()];
    let max_energy_possible = player.power.mul(D(2).pow(rebuyableAmt("energy",0))).logBase(10).floor();
    if (max_energy_possible.lte(player.energy)) return [D(0), this.cost()];
    let cost_max_energy = this.costFixed(max_energy_possible).sub(this.costFixed(player.energy)).div(9);
    if (player.power.lt(cost_max_energy)) {
      max_energy_possible = max_energy_possible.sub(1);
      cost_max_energy = cost_max_energy.sub(this.costFixed(max_energy_possible));
    }
    return [max_energy_possible.sub(player.energy), cost_max_energy];
  },
  buy(){
    let price = this.costMax();
    if(player.power.gte(price[1])){
      player.power=player.power.minus(price[1]);
      player.energy=player.energy.add(price[0]);
    }
    /*if(player.power.gte(this.cost())){
      player.power=player.power.minus(this.cost())
      player.energy=player.energy.add(1)
    }else return;*/
  },
  boost(){
    return D(2).pow(player.energy).pow(inAnyChallenge("energy")?0.5:1).pow(hasMilestone("planets",5)?1.1:1)
  }
}
var automationData={
  cost(){
    let cost = D(5)
    return cost
  },
  buy(){
    if(player.energy.gte(this.cost())){
      player.energy=player.energy.minus(this.cost())
      player.automation[1]=true
    }
  }
}
var planetData={
  cost(){
    return D(1e110).pow(D(player.planets.total).add(1)).pow(D(player.planets.total).div(100).add(1))
  },
  totalPlanetBoost(){
    return D(player.planets.total).add(1).pow(D(4).add(D(player.planets.amt).div(5))).pow(2)
  },
  exploredPlanetsAmt() {
    if (player.planets.onPlanet) return D(player.planets.amt).add(player.planets.planet[player.planets.amt.toNumber()].progress.min(99).div(100));
    else return D(player.planets.amt);
  },
  finishedPlanetBoost(){
    //return D(1e5).pow(D(player.planets.amt).mul(3)).pow(D(player.planets.amt).div(50).add(1))
    return D(1e5).pow(this.exploredPlanetsAmt().mul(3)).pow(this.exploredPlanetsAmt().div(50).add(1));
  },
  planetBoost(){
    return this.totalPlanetBoost().mul(this.finishedPlanetBoost())
  },
  buy(){
    if(player.points.gte(this.cost())){
      player.planets.total=D(player.planets.total).add(1)
      this.reset()
      this.createPlanet()
    }
  },
  completePlanet(){
    let num = player.planets.amt.toNumber()
    let planet = player.planets.planet[num]
    if(planet.completed){
      player.planets.amt=D(player.planets.amt).add(1)
      player.planets.onPlanet=false
    }
  },
  createPlanet(){
    let wallsAmt = Math.floor(D(player.planets.total).times(Math.random()*2))+3
    console.log(wallsAmt)
    let walls = {}
    let wallsArr = [];
    for(let x=0;x<wallsAmt;x++){
      let cost = D(10).pow(D(Math.floor(Math.random()*10)).mul(D(player.planets.total).add(1).div(10).add(0.9))).mul(Math.floor(Math.random()*900)/100+1)
      wallsArr.push(cost);
    }
    wallsArr.sort(function(a, b) { if (a.gt(b)) return 1; else if (a.lt(b)) return -1; else return 0; });
    for(let x=0;x<wallsAmt;x++) walls[x] = wallsArr[x];
    console.log(walls)
    let i = {completed:false,progress:D(0),walls,wallsAmt:D(Object.keys(walls).length),wallsBeat:D(0),name:randomizePlanetNames()}
    console.log(JSON.stringify(walls))
    if(!("planet" in player.planets))player.planets.planet={}
    player.planets.planet[player.planets.total.minus(1).toNumber()]=i
    console.log(player.planets)
    player.planets.onPlanet=true
  },
  wallData(){
    return player.planets.planet[player.planets.amt.toNumber()].walls[player.planets.planet[player.planets.amt.toNumber()].wallsBeat.toNumber()]
  },
  wallCost(){
    return {
      points:this.wallData().pow(10),
      boosters:this.wallData().pow(0.2).min(player.planets.amt.add(1).mul(100)).floor(),
      air:this.wallData().pow(0.4).min(player.planets.amt.add(1).mul(5e4)).floor(),
      power:this.wallData().pow(0.6).min(player.planets.amt.add(1).mul(D(1e10).mul(player.planets.amt.div(5).floor().add(1))))
    }
  },
  canBeatWall(){
    if(player.points.gte(this.wallCost().points)&&player.boosters.gte(this.wallCost().boosters)&&player.air.gte(this.wallCost().air)&&player.power.gte(this.wallCost().power)){
      return true
    }else return false
  },
  beatWall(){
    if(this.canBeatWall()){
      player.points=player.points.minus(this.wallCost().points)
      player.boosters=player.boosters.minus(this.wallCost().boosters)
      player.air=player.air.minus(this.wallCost().air)
      player.power=player.power.minus(this.wallCost().power)
      player.planets.atWall=false
      player.planets.planet[player.planets.amt.toNumber()].wallsBeat=player.planets.planet[player.planets.amt.toNumber()].wallsBeat.add(1)
    }
  },
  reset(){
    player.points=D(0)
    player.boosters=D(0)
    player.air=D(0)
    player.boostersLost=D(0)
    player.upgrades.air=[false,false,false,false,false,hasUpgrade("air",5),hasUpgrade("air",6),hasUpgrade("air",7),hasUpgrade("air",8),hasUpgrade("air",9)]
    player.rebuyables.boosters=[D(0),D(0),D(0)]
    player.rebuyables.space=[D(0),D(0),D(0),rebuyableAmt("space",3)]
    player.space=D(0)
    player.milestones.space=[false,false,false,false]
  }
}
var upgradeData={
  air:{
    effect:["Double point gain.","Increase base point gain by 0.02.","Boost point gain based on air AND multiply point gain by 1.5.","Decrease base booster costs by 20%.","Unlock space.","Boost space gain based on air.","Unlock the 4th space rebuyable.","Square the air effect.","Raise the lost booster effect to ^1.5.","Unlock booster rebuyables."],
    cost: [1,2,4,7,10,2000,5000,10000,25000,45000],
  },
  energy:{
    effect:["Double power gain AND when obtaining power, divide points twice as fast.","Obtain 10 free boosters.","Boost points by energy's effect raised to ^0.75.","Raise power's effect to ^1.5.","Multiply power gain by 3 AND decrease booster costs by 90%.","Unlock 5 more air upgrades.","Boost air gain based on energy.","Square the power effect."],
    cost: [5,6,7,8,9,10,11,14]
  }
}
var rebuyableData={
  space:{
    effect:["Multiply point gain by 1.2.","Divide booster costs by 1.5.","Double space gain.","Multiply power gain by 1.5."],
    cost: [10,150,100,100000],
    costScaling: [10,50,10,100]
  },
  energy:{
   effect:["Halve energy requirements.","Obtain a free booster.","Double power's base effect."],
    cost:[3,3,5],
    costScaling:[1,1,2]
  },
  boosters:{
    effect:["Increase the booster effect base by 0.01.","Multiply point gain by 25.","Obtain 20 free boosters."],
    cost:[150,200,490],
    costScaling:[10,20,20]
  }
}
var challengeData={
  energy:{
    //EVERY multiplier to point gain is square-rooted. However, your point gain is multiplied by 3, and then raised to ^1.5.
    //ANYTHING air-related does nothing. EC1's nerf is applied.
    //Point gain is raised to the amount of stniop you have. Stniop decreases by 0.01 (starting at 1.00) every second, stopping at 0.01. EC2's nerfs are applied.
    //Base booster cost scaling is set to 4.2069x instead of 3.00x. EC3's nerfs are applied.
    nerfs:["EVERY multiplier to point gain is square-rooted. However, your point gain is multiplied by 3, and then raised to ^1.5.","ANYTHING air-related does nothing. EC1's nerf is applied.","Point gain is raised to the amount of stniop you have. Stniop decreases by 0.01 (starting at 1.00) every second, stopping at 0.01. EC2's nerfs are applied.","Base booster cost scaling is set to 4.2069x instead of 3.00x. EC3's nerfs are applied."],
    effect:["Boosters’ cost scaling is 0.9x stronger, and point gain is multiplied by 1.5x.","Air's effect on points is x^1.15.","Point production is x^1.05.","Boosters’ cost scaling is 0.9x stronger (after EC1's effect)."],
    goal:["player.space.gte(1)","player.space.gte(1)","player.space.gte(1)","player.space.gte(1)"],
    displayGoal:["1 space","1 space","1 space","1 space"]
  }
}
var milestoneData={
  space:{
    effect:["Start flights with 1 booster.","Double point gain.","Halve booster costs.","Double air gain."],
    goal:["player.space.gte(100)","player.boosters.gte(20)","player.points.gte('1e10')","player.air.gte(100)"],
    displayGoal:["250 space","20 boosters","1e10 points","100 air"]
  },
  energy:{
    effect:["The booster autobuyer bulk-buys 5 boosters.","The booster autobuyer bulk-buys 10 boosters.","The booster autobuyer bulk-buys 25 boosters."],
    goal:["player.energy.gte(8)","player.energy.gte(10)","player.energy.gte(14)"],
    displayGoal:["8 energy","10 energy","14 energy"]
  },
  planets:{
    effect:["Gain 1e10x more points, whilst weakening booster super-scaling.","The lost boosters effect is x^2, and lost boosters gain is x^1.5.","Booster super-scaling is EVEN WEAKER.","Space gain is CUBED and you explore planets 2x faster.","Gain 55 free boosters, booster-bulk 25 -> 100, and point gain is x*1e10.","The energy effect is ^1.1 better."],
    goal:["player.planets.amt.gte(1)","player.planets.amt.gte(2)","player.planets.amt.gte(3)","player.planets.amt.gte(4)","player.planets.amt.gt(4.5)","player.planets.amt.gt(5.5)"],
    displayGoal:["1 explored planet","2 explored planets","3 explored planets","4 explored planets","5 explored planets","6 explored planets"]
  },
}
