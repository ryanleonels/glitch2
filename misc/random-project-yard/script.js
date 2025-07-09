// This is not my code, credit goes to javascripter.net

var nVer = navigator.appVersion;
var nAgt = navigator.userAgent;
var browserName = navigator.appName;
var fullVersion = "" + parseFloat(navigator.appVersion);
var majorVersion = parseInt(navigator.appVersion, 10);
var nameOffset, verOffset, ix;

if ((verOffset = nAgt.indexOf("OPR/")) != -1) {
  browserName = "Opera";
  fullVersion = nAgt.substring(verOffset + 4);
} else if ((verOffset = nAgt.indexOf("Opera")) != -1) {
  browserName = "Opera";
  fullVersion = nAgt.substring(verOffset + 6);
  if ((verOffset = nAgt.indexOf("Version")) != -1)
    fullVersion = nAgt.substring(verOffset + 8);
} else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
  browserName = "Microsoft Internet Explorer";
  fullVersion = nAgt.substring(verOffset + 5);
} else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
  browserName = "Google Chrome";
  fullVersion = nAgt.substring(verOffset + 7);
} else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
  browserName = "Safari";
  fullVersion = nAgt.substring(verOffset + 7);
  if ((verOffset = nAgt.indexOf("Version")) != -1)
    fullVersion = nAgt.substring(verOffset + 8);
} else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
  browserName = "Mozilla Firefox";
  fullVersion = nAgt.substring(verOffset + 8);
} else if (
  (nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/"))
) {
  browserName = nAgt.substring(nameOffset, verOffset);
  fullVersion = nAgt.substring(verOffset + 1);
  if (browserName.toLowerCase() == browserName.toUpperCase()) {
    browserName = navigator.appName;
  }
}
if ((ix = fullVersion.indexOf(";")) != -1)
  fullVersion = fullVersion.substring(0, ix);
if ((ix = fullVersion.indexOf(" ")) != -1)
  fullVersion = fullVersion.substring(0, ix);

majorVersion = parseInt("" + fullVersion, 10);
if (isNaN(majorVersion)) {
  fullVersion = "" + parseFloat(navigator.appVersion);
  majorVersion = parseInt(navigator.appVersion, 10);
}

window.onload = function () {
  if(majorVersion >= 20 && majorVersion <= 71) {
    alert("You're using an outdated browser (" + navigator.userAgent.substring(navigator.userAgent.indexOf("Android"), 34) + "), so some pages may not work correctly. It is recommended that you update your browser or device in order for everything to work properly.")
  } else if(majorVersion <= 19) {
    alert("Your browser or OS is too old. (" + navigator.userAgent.substring(navigator.userAgent.indexOf("Android"), 34) + "). You can still continue to use the website, but many games will not work/not load. Please update or use a newer OS.");
  }
  browserName != "Mozilla Firefox" && browserName != "Google Chrome" && browserName != "Safari" && browserName != "Opera" && navigator.userAgent.indexOf("Windows NT 5.0") > -1 && alert("Your browser and operating system is too old for this website! Some pages will not work properly!")
};
