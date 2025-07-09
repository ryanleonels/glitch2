setTimeout(() => {
  if(navigator.userAgent.indexOf("Windows NT 5.0") > -1) {
    document.getElementById("yourStats").innerHTML = "Cannot load stats. Reason:<br>Your browser is too old!";
    document.getElementById("prestigeStats").innerHTML = "Cannot load stats. Reason:<br>Your browser is too old!";
    document.getElementById("moreStats").innerHTML = "Cannot load stats. Reason:<br>Your browser is too old!";
  } else {
    document.getElementById("yourStats").innerHTML = "Cannot load stats. Reason:<br>Syntax Error in main code or not updating automatically.";
    document.getElementById("prestigeStats").innerHTML = "Cannot load stats. Reason:<br>Syntax Error in main code or not updating automatically.";
    document.getElementById("moreStats").innerHTML = "Cannot load stats. Reason:<br>Syntax Error in main code or not updating automatically.";
  }
}, 10000);

function tab(evt, tabs) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabs).style.display = "block";
  evt.currentTarget.className += " active";
}

/* Tab */
function tabb(evt, tabs) {
  var i, upgTab, upgLinks;
  upgTab = document.getElementsByClassName("upgTab");
  for (i = 0; i < upgTab.length; i++) {
    upgTab[i].style.display = "none";
  }
  upgLinks = document.getElementsByClassName("upgLinks");
  for (i = 0; i < upgLinks.length; i++) {
    upgLinks[i].className = upgLinks[i].className.replace(" active", "");
  }
  document.getElementById(tabs).style.display = "block";
  evt.currentTarget.className += " active";
}
/* Tab */

function hideTabs() {
  document.getElementById("Stats").style.display = "none";
  document.getElementById("MoreStats").style.display = "none";
  document.getElementById("Update").style.display = "none";
  document.getElementById("About").style.display = "none";
  document.getElementById("Help").style.display = "none";
  document.getElementById("Options").style.display = "none";
  try {
    document.getElementById("Stuff").style.display = "none";
  }
  catch(e) {
    console.log(
      "%c Currently one of this is giving an error.",
      "background-color: #feff55; color: #000000; font-family: Consolas, sans-serif; font-size: 12px;"
    )
  }
  document.getElementById("Options").style.display = "none";
  document.getElementById("Gold").style.display = "none";
}

// YES MUSIC FROM ORDINAL MARKUP OKAY
const links = [
  "https://cdn.glitch.com/03a4b67b-6f18-4f6d-8d37-50a18fb615c8%2FHypnothis.mp3?v=1584285594822",
  "https://cdn.glitch.com/310d7aca-4728-445f-9084-db26ceccd7b5%2FHeaven%20and%20Hell%20-%20Jeremy%20Blake%20%5BMpgun.com%5D.mp3?v=1592859293921",
  "https://cdn.discordapp.com/attachments/670777278699012136/723885956926668860/TheRatFat_-_Monody.mp3",
  "https://cdn.discordapp.com/attachments/670777278699012136/724242522280427590/TheFatRat_-_Fly_Away_feat._Anjulie.mp3",
  "https://cdn.discordapp.com/attachments/670777278699012136/724242811142275113/TheFatRat_-_Time_Lapse.mp3"
]

// this can be copyrighted
const names = [
  "Kevin Macleod - Hypnothis [Royalty Free]",
  "Jeremy Blake - Heaven and Hell (YT Library) [Public Domain]",
  "TheFatRat - Monody",
  "TheFatRat - Fly Away feat. Anjulie",
  "TheFatRat - Time Lapse"
]
var audio = 0;

function music() {
  audio = (audio + 1) % (links.length + 1);
  if (audio == 0) {
    document.getElementById("playMusic").pause();
    document.getElementsByClassName("button button16")[0].innerHTML = "Play Music";
  } else {
    document.getElementById("playMusic").src = links[audio - 1] || "";
    document.getElementById("playMusic").play();
    document.getElementsByClassName("button button16")[0].innerHTML = names[audio - 1] || "";
  }
}

document.addEventListener("keydown", function(e) {
    if (e.keyCode == 112) {
      e.preventDefault();
    }
});

/* Font change */
function WorkSansFont() {
  document.body.style.font = "22px Work Sans";
  document.getElementsByClassName("button button1")[0].style.font = "16px Work Sans";
  document.getElementsByClassName("button button2")[0].style.font = "16px Work Sans";
  document.getElementsByClassName("button button3")[0].style.font = "16px Work Sans";
  document.getElementsByClassName("button button4")[0].style.font = "16px Work Sans";
  document.getElementsByClassName("button button5")[0].style.font = "16px Work Sans";
  document.getElementsByClassName("button button6")[0].style.font = "16px Work Sans";
  document.getElementsByClassName("button button7")[0].style.font = "16px Work Sans";
  document.getElementsByClassName("button button8")[0].style.font = "16px Work Sans";
  document.getElementsByClassName("button button9")[0].style.font = "16px Work Sans";
  document.getElementsByClassName("button button10")[0].style.font = "16px Work Sans";
  document.getElementsByClassName("button button11")[0].style.font = "16px Work Sans";
  document.getElementsByClassName("button button12")[0].style.font = "16px Work Sans";
  document.getElementsByClassName("button button13")[0].style.font = "16px Work Sans";
  document.getElementsByClassName("button button14")[0].style.font = "16px Work Sans";
  document.getElementsByClassName("button button15")[0].style.font = "16px Work Sans";
  document.getElementsByClassName("button button16")[0].style.font = "16px Work Sans";
  document.getElementsByClassName("tablinks")[0].style.font = "16px Work Sans";
  document.getElementsByClassName("tablinks")[1].style.font = "16px Work Sans";
  document.getElementsByClassName("tablinks")[2].style.font = "16px Work Sans";
  document.getElementsByClassName("tablinks")[3].style.font = "16px Work Sans";
  document.getElementsByClassName("tablinks")[4].style.font = "16px Work Sans";
  document.getElementsByClassName("tablinks")[5].style.font = "16px Work Sans";
  document.getElementsByClassName("tablinks")[6].style.font = "16px Work Sans";
  document.getElementsByClassName("tablinks")[7].style.font = "16px Work Sans";
}

function InconsolataFont() {
  document.body.style.font = "22px Inconsolata";
  document.getElementsByClassName("button button1")[0].style.font = "16px Inconsolata";
  document.getElementsByClassName("button button2")[0].style.font = "16px Inconsolata";
  document.getElementsByClassName("button button3")[0].style.font = "16px Inconsolata";
  document.getElementsByClassName("button button4")[0].style.font = "16px Inconsolata";
  document.getElementsByClassName("button button5")[0].style.font = "16px Inconsolata";
  document.getElementsByClassName("button button6")[0].style.font = "16px Inconsolata";
  document.getElementsByClassName("button button7")[0].style.font = "16px Inconsolata";
  document.getElementsByClassName("button button8")[0].style.font = "16px Inconsolata";
  document.getElementsByClassName("button button9")[0].style.font = "16px Inconsolata";
  document.getElementsByClassName("button button10")[0].style.font = "16px Inconsolata";
  document.getElementsByClassName("button button11")[0].style.font = "16px Inconsolata";
  document.getElementsByClassName("button button12")[0].style.font = "16px Inconsolata";
  document.getElementsByClassName("button button13")[0].style.font = "16px Inconsolata";
  document.getElementsByClassName("button button14")[0].style.font = "16px Inconsolata";
  document.getElementsByClassName("button button15")[0].style.font = "16px Inconsolata";
  document.getElementsByClassName("button button16")[0].style.font = "16px Inconsolata";
  document.getElementsByClassName("tablinks")[0].style.font = "16px Inconsolata";
  document.getElementsByClassName("tablinks")[1].style.font = "16px Inconsolata";
  document.getElementsByClassName("tablinks")[2].style.font = "16px Inconsolata";
  document.getElementsByClassName("tablinks")[3].style.font = "16px Inconsolata";
  document.getElementsByClassName("tablinks")[4].style.font = "16px Inconsolata";
  document.getElementsByClassName("tablinks")[5].style.font = "16px Inconsolata";
  document.getElementsByClassName("tablinks")[6].style.font = "16px Inconsolata";
  document.getElementsByClassName("tablinks")[7].style.font = "16px Inconsolata";
}