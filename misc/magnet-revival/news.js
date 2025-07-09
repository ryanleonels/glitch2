/* A trashy news script, poor JavaScript because the dev of this is an addiction */

function androidMessage() {
  var html = document.getElementById("news").innerHTML = "You are viewing this news on Computer right now.";
  var ua = navigator.userAgent.toLowerCase();
  var Android = ua.indexOf("android") > -1;
  if(Android) {
    html = "You are viewing this news on Android right now.";
  } else {
    html = "You are viewing this news on Computer right now.";
  }
  return html;
}


function goodBadGame() {
  var goodGames = [
    "Scrap Clicker 2",
    "BOXD Without the E",
    "Ordinal Markup",
    "Scrap Clicker++ by Bullz 04",
    "Antimatter Dimensions",
    "Scrap 2 Fanmade",
    "Idle Mine Remix",
    "Yet Another Merge Game"
  ]
  var badGames = [
    "Minecraft",
    "Among Us",
    "Scrap TD",
    "True Infinity",
    "Antimatter Dimensions NG-4",
    "Roblox",
    "Nebulous",
    "SuperSpruce incrementals",
    "AAU Mode"
  ]
  return goodGames[Math.floor(Math.random() * goodGames.length)] + " good, " + badGames[Math.floor(Math.random() * badGames.length)] + " bad"
}


var news = [
  "This game autosaves every 10 sec to prevent data loss.",
  "The news text is still again. It will be still for days and a bit boring.",
  "COVID-19 is over now.",
  "This game is an incremental revival game of \"The Magnet\", the old one was totally broken.",
  "This game was made using JavaScript.",
  "WARNING: THIS GAME IS VERY BORING.",
  "NaN means \"Not a Number\". If you ever get that in-game you're screwed. Same for \"undefined\"",
  "How to get Magnets? If you just forgot, you just click certain buttons under this news ticker.",
  "WARNING: The game you're playing will refresh automatically while the dev is updating this game.",
  "No, this is not news, like you'll see in the inspect. It's just messages. Okay?",
  "You think the game is boring? You want auto-collect magnets? You need 3000 magnets!",
  "This incremental is slow and fast at times.",
  "Code for this news ticker made up.",
  "If anyone wanna see the broken old the magnet game, go ahead. <a style='color:#777' href='https://the-magnet.glitch.me/'>DONT ENTER, BROKEN PROJECT DELETED APRIL 1ST</a>",
  "Have fun if you can, not very much content...",
  "Don't go playing this at work! Your worker might fire you if you go too long. It is NSFW, but not really that inappropriate.",
  "In this game, you can get magnets 99,999x faster than in Scrap Clicker 2! Why? Because, it's the main currency of this game.",
  "If you like big numbers you will like this game",
  "Our news messages are from 8-13+.",
  "If you don't like those messages you can always go to the \"Options\" tab and turn them off.",
  "If you wanna go and mod the game in public GIVE CREDIT please and use a different name.",
  "WARNING: Keep in mind you can hack this game in the console and change everything, ruining gameplay. Be sure to not touch that! The dev don't know about fixing this stuff.",
  "Hey! Did you know that about 1 in 64.25 people in the whole world are infected with COVID-19 now? That is crazy big pandemic and is not ending.", // Coronavirus
  "This game should not have any bugs, but unless you see an error in the console you will know that as a bug.",
  "Infinity in JavaScript = 1.79e308. No, there is no \"break-infinity.js\" in this game. So you will definitely not be able to go past that large number.",
  "There are currently 56 different messages/news in this game right now. More will be added in later updates.",
  "Do you still think the game is boring after you've unlocked the auto collect? Just put music on.",
  "If you don't like incrementals you will hate this trash",
  "Still boring, even with the music and auto collect on? Well that means you don't like incrementals then.",
  "Auto collect will get you going into very sluggish progression. You better be clicking buttons to keep progression going quick!",
  "Alert: Some of the news may be inaccurate from farther in the game. Sorry about that if it is! You can always turn them off.",
  "What will be added in the next version? Maybe more better stuff? You'll find out soon!",
  "This incremental game only goes up to 100 billion magnets at the moment. Other incrementals: 1e333333!",
  "WARNING: Prestige is still under construction. There will be buffs to decrease multiplier since stuff is not balanced good.",
  "If you can't click those magnet buttons you are a big noob.",
  "Changing the font too much can break the game, please don't do it.",
  "Some people say Infinity is 1.79e308. But really it's not until after Graham's Number and numbers are just so freaking big they don't make sense anymore.",
  "You guys don't know what JavaScript is?<a style='color:#777' href='https://www.w3schools.com/js/js_history.asp/'>I tell you this in 4 news messages</a>",
  "Mobile users cannot hack this game luckily, since there is no \"Inspect\" in the mobile Chrome.",
  "Press F12 for total mayhem!",
  "Hey? Did you know the COVID-19 lockdown is just about over now?",
  "Numbers start formatting after 1k, and 1e6 has a plus symbol for some stupid ass reason.",
  androidMessage(), // This don't count up in the news array
  goodBadGame(), // This don't count up in the news array
  "How to get FREE MAGNETS. 1. You need red and blue parts for the magnet. 2. You need the metal to attract. 3. You need to click buttons many times. 4. Use them on your multipliers. <del>Only in the Magnet Revival game.</del>",
  "Only dumb people don't know how to play this game.",
  "Currently adding new gold magnet upgrades at the moment.",
  "If you're wondering why numbers don't go up past 1e12 in this game, that is because of the low amount of multiplier there is. By the time v3.2 is finished, magnets will go even further than ever.",
  "Don't play this game in class, also NSFW like at work. The teacher can catch you.",
  "Cannot make scrolling news ticker due to issues in Glitch. Will convert to Github very very soon.",
  "Gold Magnets, Platinum Magnets, and Super Magnets are not in real life, They don't exist anywhere. It's only in the Magnet Revival game.",
  "No 6th Magnet Multiplier Upgrade until v3.3.",
  "This website was suspended on August 20th 2023, can you believe it? This was because the favicon for this website had a potentially malicious link that Glitch didn't like!",
  "Jesse Kohn was streaming on this website here on 08/30/2023"
]

document.getElementById("news").innerHTML = news[Math.floor(Math.random() * news.length)]

setInterval(() => {
  if(navigator.userAgent.indexOf("Windows NT 5.0") > -1) {
    document.getElementById("news").innerHTML = "UPDATE YOUR BROWSER AND OS NOW"
  } else {
    document.getElementById("news").innerHTML = news[Math.floor(Math.random() * news.length)];
  }
}, 10000);

console.log(
  "%cThere is never NaN in this game unless you mess with the console.",
  "background-color: #00ff00; color: #000000; font-family: Trebuchet MS, sans-serif; font-size: 25px;"
)