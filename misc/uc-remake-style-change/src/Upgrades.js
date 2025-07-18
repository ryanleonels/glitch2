let upgradeNames = ["1", "2", "3", "4", "⬥"]
function buyUpgrade(x){
    let i = x-1
    if (data.oddities.gte(data.upgrades[i].c)){
        data.oddities = data.oddities.sub(data.upgrades[i].c)
        data.upgrades[i].amt = data.upgrades[i].amt.plus(1)
    }
}
function buyUpgrade5(){
    if (data.upgrades[0].amt.plus(data.upgrades[1].amt).plus(data.upgrades[2].amt).plus(data.upgrades[3].amt).gte(data.upgrades[4].c)){
        data.upgrades[4].amt = data.upgrades[4].amt.plus(1)
    }
}
function calculateUpgradeCosts(){
    for (let i=0;i<data.upgrades.length-1;i++){
        let costBases = [D(2e18),D(5e19),D(5e20),D(6e21)]
        data.upgrades[i].c = data.upgrades[i].amt.gte(1)?
            costBases[i].times(D(1).plus(data.upgrades[i].amt.plus(1).div(1.1).pow(data.upgrades[i].amt))).div(theoryEffects[6]).div(dreamParticleEffects[2]): costBases[i]
    }
    data.upgrades[4].c = data.upgrades[4].amt.gte(1)?D(22).times(data.upgrades[4].amt.times(1.5)).div(theoryEffects[5]).floor():D(22)

}
let upgradeEffects = [D(0), D(0), D(0), D(0), D(0)]
function calculateUpgradeEffects(){
    for (let i=1;i<upgradeEffects.length-1;i++){
        upgradeEffects[i] = D(data.upgrades[i].amt.plus(1)).times(upgradeEffects[4])
    }
    upgradeEffects[0] = D(data.upgrades[0].amt.plus(1)).times(theoryEffects[3]).times(theoryEffects[4]).times(upgradeEffects[4])
    upgradeEffects[4] = D(data.upgrades[4].amt.plus(1)).times(theoryEffects[8]).times(theoryEffects[11]).times(theoryEffects[14])
}
function buyMaxUpgrades(){
    for(let i=0;i<10;i++){
        calculateUpgradeCosts()
        buyUpgrade(1)
        buyUpgrade(2)
        buyUpgrade(3)
        buyUpgrade(4)
    }
}
let lastUpgHeld = 10
function updateUpgText(i){
  if(lastUpgHeld!=i)upgInfo[0].textContent = `Upgrade ${upgradeNames[i]}`
  if(i==4){
    if(lastUpgHeld!=4)upgInfo[3].textContent=""
    upgInfo[1].textContent = `Requires: ${format(data.upgrades[4].c)} Total Upgrade levels (you have ${formatWhole(data.upgrades[0].amt.plus(data.upgrades[1].amt).plus(data.upgrades[2].amt).plus(data.upgrades[3].amt))})`
    upgInfo[2].textContent = `Multiplies all upgrade effects by ${formatWhole(upgradeEffects[4])}x`
  }
  else{
    upgInfo[1].textContent = `Cost: ${format(data.upgrades[i].c)} Oddities`
    upgInfo[2].textContent = `Amount: ${formatWhole(data.upgrades[i].amt)}`
    upgInfo[3].textContent = `Current effect: ${formatWhole(upgradeEffects[i])}x [+${formatWhole(upgradeEffects[i].div(data.upgrades[i].amt.plus(1)))}x]`
  }
  lastUpgHeld=i
}