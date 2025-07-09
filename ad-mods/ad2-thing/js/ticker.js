var newsArray;

function updateNewsArray() {
newsArray = [//always true
["This ticker exists", true, "a1"],["Credit to Sigma for adding Aarex Dimensions", true, "a2"],["Don't you just hate it when somebody doesn't finish their", true, "a3"],
["Jokes aside, I really enjoyed playing TrueInfinity. Go check it out, or don't.", true, "a4"],
["'This message is totally real.' - George Washington", true, "a4"],["First to react", true, "a5"],["Antimatter is honest, matter makes up everything.", true, "a6"],
["Zoinks, scoobs! The antimatter is heading straight towards us!", true, "a7"],

//pre-infinity tickers
["You can't talk about something that doesn't exist. In this case, the Tenth Dimension.", game.dimensions[8].amount.gt(0), "pi1"],
["👍❓💀⚠🎃🍆🍆❓⚠🌙💀", game.options.notation == "Cancer", "pi2"],
  
//infinitied tickers
["Welcome to the cool club.", game.infinities.gt(0) || game.singularities.gt(0), "in1"],
["Can you get infinite IP?", game.infinityPoints.gt(Math.MAX_NUMBER), "in2"],
["Infinity Challenges aren't that challenging", getInfinityChallengesUnlocked() > 0, "in3"],


//secret tickers
["You /can/ infinity, you know?", game.singularities.gt(0) && getTimeSince("infinity") > 1000000, "i1"],
["congrats for beating aarex", game.dimensions[0].amount.gt(Decimal.pow(10, 57e15)), "i2"],
["Why must you do this", game.why > 1e6, "i3"],
];}

document.addEventListener("visibilitychange", function() {if (!document.hidden) {scrollNextMessage();}}, false);
var scrollTimeouts = [];
var nextMsgIndex;
function scrollNextMessage() {
  //don't run if hidden to save performance
  if (game.options.newsHidden) return false
  var s = document.getElementById('news');
  updateNewsArray();
  //select a message at random

  try {
    do {nextMsgIndex = Math.floor(Math.random() * newsArray.length)} while (!eval(newsArray[nextMsgIndex][1]) || (newsArray[nextMsgIndex][2].indexOf("am") > -1 && !game.achievements.includes("r22")) || newsArray[nextMsgIndex][2].indexOf("gn") > -1)
  } catch(e) {
      console.log("Newsarray doesn't work at idx " + nextMsgIndex)
  }

  scrollTimeouts.forEach(function(v) {clearTimeout(v);});
  scrollTimeouts = [];

  //set the text
  s.textContent = newsArray[nextMsgIndex][0];
  if (newsArray[nextMsgIndex][2] == "a1000") {
    //coded by Naruyoko
    var m="";
    for (var i=0;i<256;i++) m+=String.fromCharCode(Math.random()*95+32);
    s.textContent = m
  }

  //get the parent width so we can start the message beyond it
  let parentWidth = s.parentElement.clientWidth;

  //set the transition to blank so the move happens immediately
  s.style.transition = '';
  //move div_text to the right, beyond the edge of the div_container
  s.style.transform = 'translateX('+parentWidth+'px)';

  //we need to use a setTimeout here to allow the browser time to move the div_text before we start the scrolling
  scrollTimeouts.push(setTimeout( function() {
    //distance to travel is s.parentElement.clientWidth + s.clientWidth + parent padding
    //we want to travel at rate pixels per second so we need to travel for (distance / rate) seconds
    let dist = s.parentElement.clientWidth + s.clientWidth; //20 is div_container padding
    let rate = 125; //change this value to change the scroll speed
    let transformDuration = dist / rate;


    //set the transition duration
    s.style.transition = 'transform '+transformDuration+'s linear';
    let textWidth = s.clientWidth;
    //we need to move it to -(width+parent padding) before it won't be visible
    s.style.transform = 'translateX(-'+(textWidth+5)+'px)';
    //automatically start the next message scrolling after this one finishes
    //you could add more time to this timeout if you wanted to have some time between messages
    scrollTimeouts.push(setTimeout(scrollNextMessage, Math.ceil(transformDuration * 1000 + (newsArray[nextMsgIndex][2] == "am104" ? 6e4 : 0))));
  }, 100));
}