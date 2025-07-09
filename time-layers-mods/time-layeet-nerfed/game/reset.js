"use strict"

function reset(layer) {
  let blankSave = newGame()
  let resetList = []
  switch(layer) {
      case 1:
        if (game.spaceless) {
          game.normalEnergy=game.normalEnergy.add(getPrestige(1)).min(game.galaxies[0].add(1).add(game.perspectivePower.floor())).times(game.achievement.includes(42)?2:1)
        } else {
          game.spaceEnergy=game.spaceEnergy.add(getPrestige(1))
        }
        game.highestReset=Math.max(game.highestReset,1)
        resetList = ["spaceFoam","timeFoam","tempComp","spaceComp","spacetime","spacetimeComp"]
        if (!game.SEU.includes(2)) {
          resetList.push("spaceTimeFoamUpgrade")
        }
        if (!(game.PEU.includes(3)&&game.PEU.includes(4))) {
          resetList.push("nucleoTime")
          resetList.push("nucleoUps")
          resetList.push("spentNucleo")
        }
        for (let i in resetList) {
          game[resetList[i]]=blankSave[resetList[i]]
        }
        break
      case 2:
        if (canPrestige(2)) {
          if (inAnyGalChal()) {
            game.galaxies[game.galChal-1]=game.galaxies[game.galChal-1].add(1)
          } else {
            game.starTypes = game.PEU.includes(2) ? getStarGain(app.$data.overallSpeed.div(YEAR_IN_SECONDS)) : game.starTypes.add(1)
          }
        }
        game.starTypes=game.starTypes.max(game.bestStarTypes)
        game.highestReset=Math.max(game.highestReset,2)
        resetList=["spaceFoam","timeFoam","tempComp","spaceComp","spacetime","spacetimeComp",
                   "spaceEnergy","SEU","spaceless","normalEnergy"]
        if (game.toggle.resetSupernova||!game.achievement.includes(47)) {
          resetList.push("supernova")
        }
        if (!game.PEU.includes(5)) {
          resetList.push("spaceTimeFoamUpgrade")
        }
        if (!(game.PEU.includes(3)&&game.PEU.includes(4))) {
          resetList.push("nucleoTime")
          resetList.push("nucleoUps")
          resetList.push("spentNucleo")
          resetList.push("NEU")
        }
        for (let i in resetList) {
          game[resetList[i]]=blankSave[resetList[i]]
        }
        break
    case 3:
        if (canPrestige(3)) {
          game.perspectivePoint=game.perspectivePoint.add(1)
        }
        game.highestReset=Math.max(game.highestReset,3)
        resetList=["spaceFoam","timeFoam","tempComp","spaceComp","spacetime","spacetimeComp","nucleoTime",
                   "spaceEnergy","SEU","nucleoUps","spentNucleo","spaceless","normalEnergy","supernova","timeInL3R", "galChal"]
        if (!game.PEU.includes(5)) {
          resetList.push("spaceTimeFoamUpgrade")
        }
        if (!game.PEU.includes(4)) {
          resetList.push("NEU")
        }
        if (!game.PEU.includes(6)) {
          resetList.push("bestStarTypes")
          resetList.push("starTypes")
        } else {
          game.starTypes=game.bestStarTypes
        }
        if (!game.PEU.includes(7)) {
          resetList.push("galaxies")
        }
        if (!(game.superComp.temp.gte(1)||game.achievement.includes(46))) {
          resetList.push("perspectivePower")
        }
        for (let i in resetList) {
          game[resetList[i]]=blankSave[resetList[i]]
        }
      break
      case Infinity:
        game=newGame()
        break
      default:
        break
  }
} 

function getPrestige(layer) {
  if (!canPrestige(layer)) return EN(0)
  switch (layer) {
    case 1:
      if ((inGalChal(2) && game.spaceless) || (inGalChal(5) && game.spaceless) || (inGalChal(3))) return EN(0)
      if (game.spaceless) return game.spacetime.pow(1/17).div(10).times(1+game.achievement.includes(47)).floor()

      return game.spacetime.pow(EN(game.SEU.includes(5)?1/16:1/17).add(game.galaxies[2].div(100))).div(10)
        .times(stinc(34)?Math.min(Math.max(game.spaceTimeFoamUpgrade.length-9,1),9):1)
        .times(game.spaceComp.gte(13)&&stinc(15)?game.spaceComp.minus(12).pow(stinc(18)?getSpacetimeCompEffect():1):1)
        .times(game.achievement.includes(26)?getNucleoLength().add(1):1)
        .times(game.perspectivePower.pow(5).max(1))
        .times(game.achievement.includes(25)?game.spaceEnergy.max(1).logBase(4.20).add(1).pow(4.20):1)
        .times(game.achievement.includes(33)?ExpantaNum.pow(2,(game.galaxies[0]).add(game.galaxies[1]).add(game.galaxies[2]).add(game.galaxies[3]).add(game.galaxies[4]).add(game.galaxies[5]).add(game.galaxies[6]).add(game.galaxies[7]).max(1)):1)
        .floor()
    case 2:
      return getStarGain(app.$data.overallSpeed.div(YEAR_IN_SECONDS)).max(game.bestStarTypes)
    case 3:
      return 1
    default:
      return EN(0)
  }
}

const canPrestige = function(layer) {
  switch (layer) {
    case 1:
      return game.spacetime.gte(1e17)
    case 2:
      let starLevel = game.starTypes
      if (inAnyGalChal()) starLevel = game.galaxies[game.galChal-1]
      return app.$data.overallSpeed.div(YEAR_IN_SECONDS).gte(getStarTypeCost(starLevel))
    case 3:
      return game.starTypes.gte(ExpantaNum([16,20,24,26,28,30,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48][game.perspectivePoint.min(22).toNumber()]).add(game.perspectivePoint.gte(23)?game.perspectivePoint.minus(22).times(game.perspectivePoint.minus(21)).div(4).add(1).floor():0))
    default:
      return false
  }
}


function getStarTypeCost(x) {
  if (x.lte(5)) {
    return EN(80000).times(EN(2).pow([0,4,6,23,25,27][x.toNumber()]))
  } else {
    return EN(80000).times(EN(2).pow(x.times(2).add(17)))
  }
}

function getStarGain(x) {
  if (x.lt(5000)) {
    return EN(0)
  }
  return x.div(5000).logBase(2).minus(3).floor().max(0)
}