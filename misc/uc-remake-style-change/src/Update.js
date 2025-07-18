// region element declarations
const oddityDisplay = document.getElementById("oddityDisplay")
const derivI = document.getElementById("derivI")
const derivDisplays = [];
for (let i=1; i<data.derivs.length; i++){
    derivDisplays[i] = document.getElementById(`deriv${derivNames[i]}`)
}
const derivInfo = [document.getElementById("derivName"),document.getElementById("derivCost"),document.getElementById("derivAmt"),document.getElementById("derivProduce")]
const upgInfo = [document.getElementById("upgName"),document.getElementById("upgCost"),document.getElementById("upgAmt"),document.getElementById("upgProduce")]
const upgrade5 = document.getElementById("upgrade5")
const upgradeDisplays = [];
for (let i=0; i<4; i++){
    upgradeDisplays[i] = document.getElementById(`upgrade${upgradeNames[i]}`)
}
const mysteriesNav = document.getElementById("mysteriesNav")
const milestoneNav = document.getElementById("milestoneNav")
const lostNav = document.getElementById("lostNav")
const stairsNav = document.getElementById("stairNav")
const autoBuymax = document.getElementById("autoBuymax")
const upgrades = [document.getElementById("upgrade1"),document.getElementById("upgrade2"),document.getElementById("upgrade3"),document.getElementById("upgrade4"),document.getElementById("upgrade5")]
const theoryDisplays = []
for (let i=0; i<data.hasTheory.length; i++){
    theoryDisplays[i] = document.getElementById(`theory${i+1}`)
}
const legendsDispays = []
for (let i=0; i<data.hasLegend.length; i++){
    legendsDispays[i] = document.getElementById(`legend${legendsNumbers[i]}`)
}
const lostTexts = [document.getElementById('lostEffect'),document.getElementById('lostInfo')]
const lostTopText = document.getElementById('lostTopText')
const lostTheoryDisplays = []
for (let i=0;i<lostTheoryNumbers.length;i++){
    lostTheoryDisplays[i] = document.getElementById(`lostTheory${lostTheoryNumbers[i]}`)
}
const lostCycleDisplays = []
for (let i=0;i<lostCycleNumbers.length;i++){
    lostCycleDisplays[i] = document.getElementById(`lostCycle${lostCycleNumbers[i]}`)
}
const particleEffectsTexts = [document.getElementById('derivativeParticleEffect'), document.getElementById("dreamParticleEffect")]
const lostInDisplay = document.getElementById("lostInDisplay")
const ourgwa = document.getElementById("ourgwa")
// endregion
function updateHTML(){
    // region constant
    oddityDisplay.innerText = `There are ${format(data.oddities)} Oddities [${format(data.oddityGain)}/s]`
    mysteriesNav.innerText = data.hasTab[0]?'Theories':'???'
    milestoneNav.innerText = data.hasTab[1]?'Legends':'???'
    lostNav.innerText = data.hasTab[2]?'Lost Derivatives':'???'
    stairsNav.innerText = data.hasTab[3]?'The Stairway':'???'
    lostInDisplay.style.display = data.inLost?'flex':'none'
    ourgwa.style.display = ourgwatriggered ? 'flex':'none'
    //endregion
    //derivs
    if (data.currentTab === 1){
      updateDerivText(data.hovering.deriv)
      updateUpgText(data.hovering.upg)
        //upgrades
        autoBuymax.textContent = data.autoToggled?'Auto Buymax: ON':'Auto Buymax: OFF'
        autoBuymax.style.display = data.upgrades[3].amt.gte(1) ? 'flex' : 'none'
        upgrades[4].style.display = data.upgrades[3].amt.gte(1) ? 'flex' : 'none'
    }
    //theories
    if (data.currentTab === 2){
        for (let i=0;i<data.hasTheory.length;i++){
            theoryDisplays[i].style.backgroundColor = data.hasTheory[i] ? '#9d670a' : '#0a629d'
        }
    }
    //lost
    if (data.currentTab === 4){
        lostTopText.innerText=`Ancient Particles: ${format(data.particles[0])} // Derivative Particles: ${format(data.particles[1])} [${format(particleGains[0])}/s] // Dream Particles: ${format(data.particles[2])} [${format(particleGains[1])}/s]`
        lostTexts[0].innerHTML=`<br>Activating The Lost Derivative will reset everything before Theories<br>While the Lost Derivative is active only D1 can be purchased, but you will gain Ancient Particles based on how many Oddities you gain!<br>`
        lostTexts[1].innerText= data.inLost?data.oddities.gt(data.highestOdditiesInLost)?`You'll gain ${format(ancientParticleGain)} Ancient Particles if you disable The Lost Derivative`:`You need more than ${format(data.highestOdditiesInLost)} Oddities to gain more Ancient Particles`:`Activate The Lost Derivative to gain more Ancient Particles`
        particleEffectsTexts[0].innerHTML=`Current Derivative Particle effects:<br>Dream Particle gain multiplier [${format(derivativeParticleEffect)}x]`
        particleEffectsTexts[1].innerHTML=`Current Dream Particle effects:<br>Oddity gain multiplier [${format(dreamParticleEffects[0])}x]<br>D1 Cost divisor [/${format(dreamParticleEffects[1])}]<br>Upgrade Requirement divisor [/${format(dreamParticleEffects[2])}]`
        lostTheoryDisplays[0].innerHTML= data.hasLostTheory[0]?`This Theory was Remembered`:`Lost Theory of Dreams<br>Dream Particles divide D1s cost<br>Unlock Cost: ${format(lostTheoryCosts[0])} Derivative Particles`
        lostTheoryDisplays[1].innerHTML= data.hasLostTheory[1]?`This Theory was Remembered`:`Lost Theory of Dreams II <br>Dream Particles divide the cost of Upgrades 1-4<br>Unlock Cost: ${format(lostTheoryCosts[1])} Derivative Particles`
        lostTheoryDisplays[2].innerHTML= data.hasLostTheory[2]?`This Theory was Remembered<br>Total Lost Cycle levels multiply Oddity gain<br>Currently: ${format(lostTheory3Effect)}x`:`Lost Theory of Cycles <br>Total Lost Cycle levels multiply Oddity gain<br>Unlock Cost: ${format(lostTheoryCosts[2])} Derivative Particles<br>Currently: ${format(lostTheory3Effect)}x`
        lostTheoryDisplays[3].innerHTML= data.hasLostTheory[3]?`Check the Derivatives Tab`:`ǝ̴̨̨̦̙͍̆̀̃͐̊̽̈̔̈̋̿͒͝ͅʌ̶̡̤̕͝͠ᴉ̷̮̬̥̳̎̔̓̽̄Ⅎ̴͓̫̖̻̗̤̟̣̿͋̔̅̊͂̓̑̎͌͋͒͘͝ʌ̶̗͚͚̬̊̀̾̏́̇͋̂̍̋̽͝ᴉ̷̧̯̺̞͍̳̼̤͔̠͑̓̑̈́͂͝ɹ̶̡̮͔̗͙̰̗̘͍̘͓̩̾͘ǝ̸̛̹̙̖̈́͋͋̕p̷̯̳͔͉̗̱̒̀ʞ̴͓̝̹͈̩̮̈́͛͜͜ɔ̴̡̨̨͍̭͎̽̑̎̾̄̔̌͋͂͘͜͝͝ỡ̶̢̲͍͙̮͒̕l̷̥̠͑̏͗̉̑̌̍ũ̸̡̨̡͙͚̟̞̤̦͖̞̖͖̅̀͋͂̎̓̈̊∩̸͎̐͂̕<br><br>Unlock Cost: ${format(lostTheoryCosts[3])} Ancient Particles`
        for (let i=0;i<data.lostCycleLevels.length;i++){
            lostCycleDisplays[i].innerHTML = `Lost Cycle ${lostCycleNumbers[i]}<br>${lostCycleEffectTexts[i]} [${format(lostCycleEffects[i])}x]<br>Cost: ${format(lostCycleCosts[i])} Derivative Particles<br>This Lost Cycle is currently level ${formatWhole(data.lostCycleLevels[i])}`
        }
    }
    //misc
    if (data.currentTab === 3){
        for (let i=0;i<legendsNumbers.length;i++){
            legendsDispays[i].style.backgroundColor = data.hasLegend[i] ? '#967109' : '#542780'
        }
    }
    unlockLegends()
    unlockTabs()
    tabChangeHTML()
}
let theoryDescriptions = [
    ()=>`The Theory of Reversal<br>Bought D4s multiply D1 production<br>Currently: ${format(theoryEffects[0])}x<br>Unlock Cost: ${format(theoryCosts[0])} Oddities`,
    ()=>`The Theory of Numbers<br>Bought D1s multiply D4 production<br>Currently: ${format(theoryEffects[1])}x<br>Unlock Cost: ${format(theoryCosts[1])} Oddities`,
    ()=>`The Theory of Multiplication<br>Bought D1s multiply Oddity gain<br>Currently: ${format(theoryEffects[2])}x<br>Unlock Cost: ${format(theoryCosts[2])} Oddities`,
    ()=>`The Theory of Upgrade Derivatives<br>Bought D1s multiply Upgrade 1's effect<br>Currently: ${format(theoryEffects[3])}x<br>Unlock Cost: ${format(theoryCosts[3])} Oddities`,
    ()=>`The Theory of Upgrade Derivatives II<br>Bought D4s multiply Upgrade 1's effect<br>Currently: ${format(theoryEffects[4])}x<br>Unlock Cost: ${format(theoryCosts[4])} Oddities`,
    ()=>`The Theory of Division<br>Total Upgrade levels lower the Upgrade ⬥ requirement<br>Currently: /${format(theoryEffects[5])}<br>Unlock Cost: ${format(theoryCosts[5])} Oddities`,
    ()=>`The Theory of Division II<br>Bought D1s slightly reduce the requirement for all Upgrades<br>Currently: /${format(theoryEffects[6])}<br>Unlock Cost: ${format(theoryCosts[6])} Oddities`,
    ()=>`The Theory of Multiplication II<br>Apply The Theory of Multiplication again<br>Currently: ${format(theoryEffects[7])}x<br>Unlock Cost: ${format(theoryCosts[7])} Oddities`,
    ()=>`The Theory of Peak Synergy<br>Bought D4s multiply the Upgrade ⬥ effect, and Upgrade ⬥ multiplies D4 production<br>Currently: ${format(theoryEffects[8])}x<br>Unlock Cost: ${format(theoryCosts[8])} Oddities`,
    ()=>`The Theory of Lost Derivatives<br>Unlock Lost Derivatives, and Oddities multiply Oddity gain<br>Currently: ${format(theoryEffects[9])}x<br>Unlock Cost: ${format(theoryCosts[9])} Oddities`,
    ()=>`The Theory of Multiplication III<br>Bought D2s and D3s multiply Oddity gain<br>Currently: ${format(theoryEffects[10])}x<br>Unlock Cost: ${format(theoryCosts[10])} Oddities`,
    ()=>`The Theory of Upgrade Derivatives III<br>Bought D5s multiply the Upgrade ⬥ effect<br>Currently: ${format(theoryEffects[11])}x<br>Unlock Cost: ${format(theoryCosts[11])} Oddities`,
    ()=>`The Theory of Reversal II<br>Bought D5s multiply D1 production<br>Currently: ${format(theoryEffects[12])}x<br>Unlock Cost: ${format(theoryCosts[12])} Oddities`,
    ()=>`The Theory of Numbers II<br>Bought D1s multiply D5 production<br>Currently: ${format(theoryEffects[13])}x<br>Unlock Cost: ${format(theoryCosts[13])} Oddities`,
    ()=>`The Theory of Peak Synergy II<br>Bought D5s boost D4, bought D4s boost D5, Upgrade ⬥ boosts D5, AND Bought D5s boost Upgrade ⬥ again<br>Currently: ${format(theoryEffects[14])}x<br>Unlock Cost: ${format(theoryCosts[14])} Oddities`,
]
function theoryTextUpdate(x){
    let i = x-1
    document.getElementById("theoriesText").innerHTML = `${theoryDescriptions[i]()}<br>Effects are only shown once you've unlocked the Theory!`
}
function unlockTabs(){
    data.hasTab[0] = data.derivs[3].amt.gte(1) || data.hasTab[0]
    data.hasTab[1] = data.upgrades[3].amt.gte(1) || data.hasTab[1]
    data.hasTab[2] = data.hasTheory[9] || data.hasTab[2]
    data.hasTab[3] = data.derivs[4].amt.gte(1) || data.hasTab[3]
}
const derivStuff = document.getElementById("bigDerivativeContainer")
const buyMax = document.getElementById("buymaxContainer")
const upgradesBuymax = document.getElementById("upgradeBuymax")
const deriv5 = document.getElementById("derivVButton")
const upgradesStuff = document.getElementById("upgradeContainer")
const theoryStuff = document.getElementById("theoriesContainer")
const theoryRow4 = document.getElementById("theoryRow4")
const legendsStuff = document.getElementById("legendsContainer")
const lostStuff = document.getElementById("bigLostContainer")
const lostCanvas = document.getElementById("animationCanvas")
const settingsStuff = document.getElementById("settingsContainer")
function tabChangeHTML(){
    //derivs
    derivStuff.style.display = data.currentTab===1 ? 'flex' : 'none'
    buyMax.style.display = data.currentTab===1 ? 'flex' : 'none'
    upgradesBuymax.style.display = data.hasLegend[1]?'flex':'none'
    deriv5.style.display = data.hasLostTheory[3]?'flex':'none'
    upgradesStuff.style.display = data.oddities.gte(1e17) || data.upgrades[0].amt.gte(1)?'flex':'none'
    //upgrades
    //theories
    theoryStuff.style.display = data.currentTab===2?'flex':'none'
    theoryRow4.style.display = data.hasLostTheory[3]?'flex':'none'
    //legends
    legendsStuff.style.display = data.currentTab===3?'flex':'none'
    //lost
    lostStuff.style.display = data.currentTab===4?'flex':'none'
    lostCanvas.style.display = data.currentTab===4?'flex':'none'
    //settings
    settingsStuff.style.display = data.currentTab===0 ? 'flex':'none'
    //nav
    milestoneNav.style.display = data.hasTab[0] || data.hasTab[1]?'inline':'none'
    lostNav.style.display = data.hasLegend[0] || data.hasTab[2]?'inline':'none'
    stairsNav.style.display = 'none'
}