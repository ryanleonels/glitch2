document.getElementById("loadScreen").innerHTML = "Loading...";
document.getElementById("loadScreen").style.fontSize = "72px";
document.getElementById("loadScreen").style.backgroundImage = "url(https://i.ibb.co/rwvJnf7/load.png)";
document.getElementById("loadScreen").style.backgroundSize = "3840px 2160px";
document.getElementById("loadScreen").style.width = "3840px";
document.getElementById("loadScreen").style.height = "2160px";

setTimeout(() => {
  document.getElementById("loadScreen").remove();
}, 800);

if(navigator.userAgent.indexOf("Windows NT 5.1") > -1) {
  document.getElementsByClassName("warning")[1].style.display = "block";
} else if(navigator.userAgent.indexOf("Windows NT 5.0") > -1) {
  document.getElementsByClassName("warning")[1].style.display = "block";
}

if (navigator.userAgent.indexOf("Windows NT 5.0") > -1) {
  alert("ERROR: Your operating system and browser is not compatible with this site.")
}

setInterval(() => {
  debugger;
});