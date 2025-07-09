const achievements = 59;
const secretAchievements = 10;

function updateAchievementDescriptions() {
    achievementDescriptions = [
        "You gotta start somewhere", `Buy a single first dimension.`,
        "100 antimatter is a lot", `Buy a single second dimension.`,
        "Half Life 3 unconfirmed", `Buy a single third dimension.`,
        "Hard to imagine", `Buy a single fourth dimension.`,
        "First Death", `Buy a single fifth dimension.`,
        "We could barely afford 9", `Buy a single sixth dimension.`,
        "Praise hevi", `Buy a single seventh dimension.`,
        "90 degrees to infinity", `Buy a single eighth dimension.`,
        "Impossible", `Buy a single ninth dimension.`,
        
        "To Infinity", `Reach ${shortenMoney("1.8e308")} antimatter. Reward: Start with 100 extra antimatter.`,
        "The tenth dimension is a lie", `Get 5 dimension shifts.`, 
        "Boosting to the max", `Get 5 dimension boosts.`,
        "Uh oh", `Get over ${shortenMoney(1e303)} antimatter.`, 
        "You got past the big wall", `Have 2 antimatter galaxies simultaneously.`, 
        "Triple Galaxy", `Have 3 antimatter galaxies simultaneously.`, 
        "Intergalactic", `Have 4 antimatter galaxies simultaneously.`, 
        "There's no point in doing that", `Sacrifice without having any ninth dimensions.`, 
        "Unhevi", `Get over ${shortenMoney(6.66e201)} antimatter with exactly 9 ninth dimensions. Reward: Ninth dimensions are 9% stronger.`,
        
        "The gods are pleased", `Get a multiplier of over 66,666 from dimensional sacrifice, excluding Challenge 8. Reward: Sacrifice is 10% stronger.`,
        "Multidimensional", `Reach ${shortenCosts(1e27)} eighth dimensions.`,
        "Faster than a potato", `Get more than ${shortenCosts(1e16)} ticks per second.`,
        "That's a lot of infinities", `Reach infinity 10 times.`,
        "I am speed", `Infinity in under 5 hours. Reward: Start with 1,000 extra antimatter.`,
        "The way it's meant to be", `Reach infinity with 2 or fewer antimatter galaxies.`,
        "You didn't need it anyway", `Reach infinity without having any ninth dimensions, excluding Challenge 10. Reward: Dimensions 1-8 are 8% stronger.`,
        "Cast out the heretic", `Reach infinity without ever buying a ninth dimension during the current infinity, excluding Challenge 10.`,
        "I don't believe in gods", `Reach infinity without sacrificing.`,
        
        "Galaxy Cluster", `Buy 100 antimatter galaxies.`,
        "Hoarding infinities", `Have over 1,000 unspent Infinity Points at once.`,
        "Slower than a potato", `Reach infinity without any tickspeed upgrades.`,
        "The Grind Begins", `Infinity 1,000 times.`,
        "That's fast!", `Infinity in under an hour.`,
        "That sucked", `Complete a challenge.`,
        "Suffer", `Complete challenge 9.`,
        "Confused Screaming", `Reach infinity without any antimatter galaxies.`,
        "Hevi would be proud", `Complete all of the challenges.`,
        
        "And Beyond", `Break Infinity.`,
        "Two Infinities at Once", `Reach ${shorten(Decimal.pow(Number.MAX_VALUE, 2))} antimatter.`,
        "New Dimensions", `Unlock the first infinity dimension.`,
        "Galaxy Supercluster", `Buy 10,000 antimatter galaxies in total.`,
        "Zero Deaths", `Reach infinity without any dimension shifts, boosts, or galaxies. Reward: You can start with dimension shifts in challenges.`,
        "1 million is a lot", `Reach 1 million infinity power.`,
        "Get off of Amazon", `Buy 150 first dimensions in a single infinity. Reward: Dimensions get a multiplier based on the amount bought.`,
        "Life is pain", `Complete a challenge in under 3 minutes.`,
        "Suicide is badass", `Get the sum of all challenge times under 3 minutes.`,
        
        "There better not be 9", `Unlock the second infinity dimension.`,
        "Is this hell?", `Get the sum of all challenge times under 5 seconds.`,
        "Oh hey", `Have exactly 69 ninth dimensions.`,
        "Infinitely Challenging", `Complete Infinity Challenge 1.`,
        "Don't judge me, I'm a sadist", `Complete Infinity Challenge 5.`,
        "That's quite a few infinities", `Get all dimension multipliers over ${shorten(Number.MAX_VALUE)}. Reward: Infinity dimensions are 1% stronger.`,
        "Supersanic", `Infinity in under a minute.`,
        "Forever isn't that long", `Infinity in under a second.`,
        "Blink of an Eye", `Infinity in under a tenth of a second.`,
    
        "Yes. This is hell.", `Get the sum of all infinity challenge times under 6.66 seconds.`,
        "Galaxy Filament", `Buy 1,000,000 antimatter galaxies in total.`,
    "Dimensional Fools", `Reach ${shortenMoney("9.99e9900")} antimatter while in Infinity Challenge 9.`,
        "THIS<br>ACHIEVEMENT<br>DOESN'T<br>EXIST", `Reach ${shortenMoney("9.9999e9999")} antimatter.`,
    "I'm singular", `Distort space.`
    ]
  secretAchievementDescriptions = [
    "The first one's always free.", `Click this achievement.`,
    "Just in case.", `Save 100 times without refreshing.`,
    "No thanks.", `Add the tenth dimension.`,
    "Should we tell them about buy max?", `Buy single tickspeed ${shortenMoney(1e6)} times.`,
    "Are you in pain?", `Use cancer, standard, or letter notation with more than ${shortenMoney("1e1e8")} antimatter for more than 10 minutes without refreshing.`
  ]
}

function giveAchievement(id) {
    if(game.achievements.includes(id)) return;
    game.achievements.push(id);
    updateAchievements();
}

function giveSAchievement(id) {
    if(game.secretAchievements.includes(id)) return;
    game.secretAchievements.push(id);
    updateAchievements();
}

function updateAchievements() {
    updateAchievementDescriptions();
    
    for(var i = 0; i < achievements; i++) {
        var a = ge("achievement" + i)
        a.className = game.achievements.includes(i) ? "achievementunlocked" : "achievementlocked"
        a.innerHTML = achievementDescriptions[i * 2] + "<br>" + i
        a.setAttribute("tooltip", achievementDescriptions[i * 2 + 1])
        a.style.zIndex = 1e6-i;
    }
    for(var i = 0; i < secretAchievements; i++) {
        var a = ge("secretAchievement" + i)
        a.className = game.secretAchievements.includes(i) ? "achievementunlocked" : "achievementlocked"
        a.innerHTML = game.secretAchievements.includes(i) ? secretAchievementDescriptions[i * 2] + "<br>" + i : "?"
        a.setAttribute("tooltip", game.secretAchievements.includes(i) ? secretAchievementDescriptions[i * 2 + 1] : secretAchievementDescriptions[i * 2])
        a.style.zIndex = 1e6-i;
    }
}

function getAchievementMultiplier() {
    var multiplier = new Decimal(1);
    game.achievementRowsCompleted = 0;
    for(var i = 0; i < achievements; i += 9) {
        var completed = true;
        for(var j = 0; j < 9; j++) {
            if(!game.achievements.includes(i + j)) completed = false;
        }
        if(completed) {
            game.achievementRowsCompleted++;
            multiplier = multiplier.multiply(2);
        }
    }
    return multiplier;
}