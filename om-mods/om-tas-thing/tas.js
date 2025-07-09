const allElements = document.body.querySelectorAll("*")
try {
  for (const i in allElements) if (!allElements[i].className.split(" ").includes("fghzj")) allElements[i].onclick = () => null // no cheating
} catch {}

alert("im coding stuff rn theres probably bugs")

let tasCommands = []

function startTas(r) {
  tasCommands = []
  if (r) reset()
  
  tasCommands = document.getElementById("tas").value
    .split("\n").join("")
    .split("\r").join("")
    .split(" ").join("")
    .split(",")
  
  // expand REPs
  // get rheddi for spaghetti
  // and bad puns
  for (let i = 0; i < tasCommands.length; i++) {
    const subCommands = tasCommands[i].split("_")
    if (subCommands[0] !== "REP") continue
    
    const expanded = []
    for (let j = 0; j < subCommands[1]; j++) {
      let thing = [...subCommands]
      thing.shift()
      thing.shift()
      console.log(thing)
      for (const bruhanotherone in thing) expanded.push(thing[bruhanotherone])
    }
    
    tasCommands.splice(i, 1, ...expanded)
  }
  
  window.setInterval(() => {
    loop(20) // no lag inconsistentcies (i cant spell)
    clickCoolDown--
    
    if (!tasCommands[game.tasStep]) return
    
    const subCommands = tasCommands[game.tasStep].split("_")
    
    switch (subCommands[0]) {
      case "s":
      case "succ":
      case "successor":
        increment(1)
        break
      case "m":
      case "maxim":
      case "maximize":
        maximize(1)
        break
          
      case "i":
      case "inf":
      case "infinity":
        infinity(1)
        break
          
      case "S":
      case "sh":
      case "shift":
        factorShift()
        break
          
      case "a1":
      case "auto1":
        buysucc(1)
        break
      case "a2":
      case "auto2":
        buylim(1)
        break
      case "f":
      case "fact":
      case "buyfactor":
        const n = Math.max(0, Math.min(subCommands[1] - 1, 6))
        buyFactor(n)
        break
          
      case "M":
      case "max":
      case "maxall":
        maxInfStuff()
        break
      case "mf":
      case "mfact":
      case "maxfactors":
        maxFactors()
        break
      case "ma":
      case "mauto":
      case "maxautoclickers":
        if (game.succAuto == 0) buysucc()
        if (game.limAuto == 0) buylim()
        maxall()
        break
    }
    game.tasStep++
    document.getElementById("tasStep").textContent = ga
  }, game.intms)
}
