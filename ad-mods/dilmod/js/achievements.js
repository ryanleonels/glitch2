const achievements = 108;

function updateAchievementDescriptions() {
    achievementDescriptions = [
        "The first one's always free", `Buy a single first dimension.`,
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
        "You got past the big wall", `Buy an antimatter galaxy. Reward: All dimensions are 25% stronger.`, 
        "Triple Galaxy", `Have 3 antimatter galaxies at once.`, 
        "Nerf the Galaxies Please", `Have 4 antimatter galaxies at once.`, 
        "There's no point in doing that", `Sacrifice without having any ninth dimensions.`, 
        "Unhevi", `Get over ${shortenMoney(6.66e201)} antimatter with exactly 9 ninth dimensions. Reward: Ninth dimensions are 9% stronger.`,
        
        "The gods are pleased", `Get a multiplier of over 66,666 from dimensional sacrifice. Challenge 8 doesn't count. Reward: Sacrifice is 10% stronger.`,
        "Multidimensional", `Reach ${shortenCosts(1e27)} eighth dimensions.`,
        "Faster than a potato", `Get more than ${shortenCosts(1e16)} ticks per second. Reward: Tickspeed is 1% faster.`,
        "That's a lot of infinities", `Reach infinity 10 times.`,
        "I am speed", `Infinity in under 5 hours. Reward: Start with 1,000 extra antimatter.`,
        "The way it's meant to be", `Reach infinity with 2 or fewer antimatter galaxies. Reward: Tickspeed is 2% faster.`,
        "You didn't need it anyway", `Reach infinity without having any ninth dimensions. Challenge 10 doesn't count. Reward: Dimensions 1-8 are 8% stronger.`,
        "Cast out the heretic", `Reach infinity without ever buying a ninth dimension during the current infinity. Challenge 10 doesn't count.`,
        "I don't believe in gods", `Reach infinity without sacrificing.`,
        
        "Galaxy Cluster", `Buy 100 antimatter galaxies.`,
        "Hoarding infinities", `Have over 1,000 unspent Infinity Points at once.`,
        "Slower than a potato", `Reach infinity without any tickspeed upgrades. Reward: Tickspeed is 5% faster.`,
        "The Grind Begins", `Infinity 1,000 times.`,
        "That's fast!", `Infinity in under an hour. Reward: Start with 200,000 antimatter.`,
        "That sucked", `Complete a challenge.`,
        "Suffer", `Complete challenge 9.`,
        "Confused Screaming", `Reach infinity without any antimatter galaxies. Reward: Tickspeed is 10% faster.`,
        "Hevi would be proud", `Complete all of the challenges.`,
        
        "And Beyond", `Break Infinity.`,
        "Two Infinities at Once", `Reach ${shorten(infp(2))} antimatter. Reward: 2x multiplier to IP.`,
        "Powered Up", `Buy 6 Break Infinity upgrades.`,
        "New Dimensions", `Unlock the first infinity dimension.`,
        "Supersanic", `Infinity in under a minute. Reward: Start with 10 billion antimatter.`,
        "Boosted", `Dimension boost 27 times in a single infinity. Reward: Dimension boosts are 1% stronger.`,
        "Zero Deaths", `Reach infinity without any dimension shifts, boosts, or galaxies. Reward: You can start with dimension shifts in challenges.`,
        "Life is pain", `Complete a challenge in under 3 minutes.`,
        "Suicide is badass", `Get the sum of all challenge times under 3 minutes.`,
        
        "1 million is a lot", `Reach 1 million infinity power.`,
        "Get off of Amazon", `Buy 150 first dimensions in a single infinity. Reward: Dimensions get a multiplier based on the amount bought.`,
        "Oh hey", `Have exactly 69 ninth dimensions at once. Reward: Break Infinity upgrade 3 is 3.14x stronger.`,
        "There better not be 9", `Unlock the second infinity dimension.`,
        "Forever isn't that long", `Infinity in under a second. Reward: Start with ${getFullExpansion(1e25)} antimatter.`,
        "Unholy Infinity", `Get all dimension multipliers over ${shorten(infp())}. Reward: Infinity dimensions are 1% stronger.`,
        "Infinitely Challenging", `Complete Infinity Challenge 1.`,
        "Don't judge me, I'm a sadist", `Complete Infinity Challenge 5.`,
        "Is this hell?", `Get the sum of all challenge times under 5 seconds.`,
        
        "ERROR 909: Dimension Not Found", `Reach infinity with only 1 first dimension. Reward: First dimensions are stronger the more you have.`,
        "INFINITE POWER", `Reach ${shorten(infp())} Infinity Power.`,
        "THIS<BR>ACHIEVEMENT<BR>DOESN'T<BR>EXIST", `Reach ${shortenMoney("9.99e9999")} antimatter. Reward: Dimensions are more powerful the more antimatter you have.`,
        "You can get 50 galaxies?", `Get 50 galaxies.`,
        "Blink of an Eye", `Infinity in under a tenth of a second. Reward: Start with ${getFullExpansion(1e100)} antimatter.`,
        "Yet another infinity reference", `Get a total sacrifice multiplier of ${shorten(infp())}. Reward: Sacrifice is stronger.`,
        "Hevipelle did nothing wrong", `Complete Infinity Challenge 5 in 10 seconds or less.`,
        "Antichallenged", `Complete all 12 infinity challenges.`,
        "Yes. This is hell.", `Get the sum of all infinity challenge times under 6.66 seconds.`,
        
        "Galaxy Supercluster", `Buy 10,000 antimatter galaxies.`,
        "Ludicrous Speed", `Big Crunch for 1e200 IP in 2 seconds or less.`,
        "I got a few to spare", `Reach ${shorten("1e35000")} antimatter. Reward: Dimensions are more powerful the more antimatter you have.`,
        "All your IP are belong to us", `Big Crunch for ${shorten(infp())} IP.`,
        "Time is Relative", `Go Eternal.`,
        "Maximum Overdrive", `Reach ${shorten(1e303)} IP per minute.`,
        "Oh hey... You're still here?", `Reach ${shorten("1e333")} IP.`,
        "0 degrees from infinity", `Unlock the eighth infinity dimension.`,
        "Are you kidding me?", `Unlock the ninth infinity dimension. Reward: Dimension boosts and antimatter galaxies no longer reset dimensions.`,
        
        "Galaxy Filament", `Buy 50,000 antimatter galaxies.`,
        "Is this safe?", `Reach Infinite replicanti in under 30 minutes.`,
        "Minute of Infinity", `Reach Infinite replicanti in under a minute.`,
        "Infinite Time", `Get 308 tickspeed upgrades. Reward: Time dimensions get a boost based on tickspeed upgrades.`,
        "That wasn't a eternity", `Eternity in 30 seconds. Reward: You start eternities with ${shorten("1e30")} IP.`,
        "ONE HUNDRED THOUSAND INFINITIES", `Reach ${shorten("1e5")} infinities. Reward: Infinities more than one second long give 50x infinities.`,
        "That took a while", `Reach 100 eternities.`,
        "Quick spender", `Buy 10 time theorems.`,
        "Faster than a potato^3000", `Reach ${shorten(Decimal.pow(1e16,3000))} tick per second. Reward: Tickspeed is 1% faster.`,

        "We didn't need them anyway", `Eternity without any Infinity Dimensions (including EC1).`,
        "Eternal Suffering", `Complete a Eternity Challenge.`,
        "You can't stop me!", `Get the sum of all infinity challenge times under 1 second.`,
        "Nerf replicanti", `Get a multiplier from replicanti equal to ${shorten(1e20)}x.`,
        "Eternity is the new infinity", `Eternity in one second. Reward: You start eternities with ${shorten("1e100")} IP.`,
        "But I wanted a new prestige layer!", `Reach ${shorten(infp())} eternity points.`,
        "I do not trust you", `Reach 9,999 ninth dimensions.`,
        "I told you already, time is relative.", `Dilate time.`,
        "Este logro no existe 2", `Reach ${shortenMoney("9.99e99999")} IP. Reward: Gain more infinity points based on antimatter.`,

        "Now you're thinking with dilation!", `Undilate time for ${shortenCosts("1e600")} EP in 10 seconds. Reward: Dilation doesn't affect Time Dimensions.`,
        "Faster than a Dry Bones", `Reach ${shorten(Decimal.pow(1e16,125000))} ticks per second. Reward: Time Dimensions are 3% stronger.`,
        "I gotta keep grinding!", `Buy six dilation upgrades.`,
        "It won't be enough", `Reach ${shorten(new Decimal("1e20000"))} replicanti.`,
        "Time goes by fast", `Eternity in one tenth of a second.`,
        "Unique Snowflakes", `Reach ${shortenMoney(250)} galaxies without any replicated galaxies. Reward: Normal galaxies are 1% stronger.`,
        "GAS GAS GAS", `Reach ${shortenMoney(1e4)} tickspeed upgrades.`,
        "The next update is in 5 eternities", `Complete all of the eternity challenges.`,
        "Once More, Beyond", `Ex-dilate.`,

        "In the depths of the far endgame", `Reach ${shortenMoney("1e4000")} eternity points. Reward: Small multiplier to ex-dilation based on eternity points.`,
        "This game is easy<br><br>Bottom text", `Reach ${shortenMoney("8e8888888")} antimatter.`,
        "Galactic Great Wall", `Buy 200,000 antimatter galaxies.`,
        "Infinite free real estate", `Reach ${shorten(new Decimal("5e7"))} banked infinities. Reward: You gain 10% of your infinities on eternity as banked infinities.`,
        "Empowered!", `Energize. (You can't get this yet, as Energize hasn't been finished.)`,
        "I never really liked this infinity stuff anyway", `Reach ${shorten("1.79e300008")} IP while in dilation, without IP multipliers. Reward: You gain more infinities based on your tachyon particles.`,
        "Still waiting for Battle Replicants", `Get a multiplier from replicanti equal to ${shorten(1e30)}x.`,
        "", ``,
        "When will I get rid of you?", `Reach ${shortenMoney("1e7000")} infinity points within EC10. Reward: Upgrades that use infinities are ${shortenMoney("1e10")}x stronger.`,
    ],
  
  achievementImages = [
    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2F47ca946b-e0d4-422d-a703-a54e525f58ad.image.png?v=1579974571096",
    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2Ff71e7fdb-28fa-4a2f-955f-a38ffc3906f8.image.png?v=1579974666134",
    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2Ff6613a04-50c3-45dd-b64f-a07061a1b60a.image.png?v=1579974981322",
    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2F54a5d596-58d6-4691-82b6-416d6eef41f3.image.png?v=1579975038412",
    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2F0316d24d-4861-4f23-a6da-37c903a68113.image.png?v=1579976854826",
    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2F7966dcb0-71ad-49f7-bafe-b945539c53f6.image.png?v=1579976917879",
    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2F6ee34ee5-85ae-4276-b3eb-b54b53addab3.image.png?v=1579978320203",
    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2Fcc09d0d8-f8bb-4eb7-b7fe-a71da895b7b8.image.png?v=1579978377630",
    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2Fb29c3dbe-f8f5-4fc6-be07-01c2d251b0b2.image.png?v=1579978737303",
    
    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2Ff9315565-332b-4d7e-a9a8-ec710ba73fc8.image.png?v=1579979045495",
    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2Fff0a0eb7-2317-48e2-9d68-990b063b1089.image.png?v=1580066793987",
    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2Ff1346995-580b-4950-8745-9c706f6585ce.image.png?v=1580593295076",
    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2Feb7a54ec-335f-4813-bc01-18935348b662.image.png?v=1580593340352",
    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2F351408c8-7cb6-4033-9a19-274e79ff232c.image.png?v=1580006883418",
    undefined,
    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2Fba625dc4-c5f2-4b98-a745-8bde91e9e222.image.png?v=1580066381514",
    undefined,
    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2F6cf77690-35b0-4b2f-9a29-7dff4c4871bb.image.png?v=1611796357429",

    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2Fabb4e2d8-98c0-40a4-8fea-0da8581387a5.image.png?v=1580067259509",
    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2F43cdb4fb-952c-4870-b433-7a3afd0acd53.image.png?v=1580593122881",
    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2F7b8d37b3-cedc-47e1-ada0-28dc8ccbfa08.image.png?v=1580592607187",
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,

    undefined,
    undefined,
    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2F02f833df-03fc-4108-b3d2-cd1c8ab3e8e5.image.png?v=1611796624414",
    undefined,
    undefined,
    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2Fb4c3e66c-1f24-4643-a519-fc3bd883e321.image.png?v=1580592666446",
    undefined,
    undefined,
    undefined,

    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2F012d8779-cae2-4458-b32e-75cc9f4a00b5.image.png?v=1580593308693",

    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2F50fa3ffd-7820-45b1-8e70-e8fe0ec2c97b.image.png?v=1611796475295",

    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,

    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,

    undefined,
    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2F8d095400-28b9-44a8-8174-c2723d813512.image.png?v=1611796655539",
    undefined,
    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2F84478ae2-6bee-447f-a19e-204a94bf9195.image.png?v=1580592961390",
    undefined,
    undefined,
    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2F75e573ab-74c2-4290-89cf-518cd57731f8.image.png?v=1580593001934",
    undefined,
    undefined,

    undefined,
    undefined,
    undefined,
    undefined,
    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2Fb92040d0-f63f-43a4-a47b-674ab4013051.image.png?v=1580592787108",
    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2Fccf6e4ca-caf8-4031-b892-913916213b78.image.png?v=1580076574065",
    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2F9c7744df-c992-47c7-b9c7-e9db1a66e476.image.png?v=1580592899062",
    undefined,
    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2F2ac10597-15a1-4dac-848a-4fa62c8b68f7.image.png?v=1580592934326",

    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2F820cd2ff-4ffe-4644-a2a2-1c530c9952a6.image.png?v=1581446675843",
    undefined,
    undefined,

    undefined,
    undefined,
    undefined,
    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2Fcfbb2c82-4559-4bb1-8414-5430977ac37f.image.png?v=1580593167697",
    undefined,
    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2F327e21d4-8212-48e0-b1f5-16545cd25ada.image.png?v=1580593085274",
    "https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2Fed211c28-4389-431f-a560-e562ecfa504c.image.png?v=1581446617183",
    undefined,
    undefined,

  ],
    
  placeholderImage = ["https://cdn.glitch.com/83b2486f-7428-43b5-8145-638f923ef852%2Fec7b91e6-97d4-4cc1-a46f-f1ae6618f4f7.image.png?v=1579974900384"]
}



function giveAchievement(id) {
    if(game.achievements.includes(id)) return;
    game.achievements.push(id);
    updateAchievements();
  $.notify(achievementDescriptions[id * 2], "success");
}

function updateAchievements() {
    updateAchievementDescriptions();
    
    for(var i = 0; i < achievements; i++) {
        var a = ge("achievement" + i)
        a.className = game.achievements.includes(i) ? "achievementunlocked" : "achievementlocked"
        a.innerHTML = "<br>" + achievementDescriptions[i * 2] + "<br>" + (devMode ? i : "") 
        a.setAttribute("tooltip", achievementDescriptions[i * 2 + 1])
    a.style.zIndex = 1e6-i;
      if (achievementImages[i]) {
      a.setAttribute("background", achievementImages[i])
    } else {
      a.setAttribute("background", placeholderImage[0])
    }
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