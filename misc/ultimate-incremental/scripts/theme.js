


const themes = {
  0: "dark",
  1: "light",
  2: "electric",
  3: "space",
  4: "tree",
  5: "cancer",
  6: "gapples",
  7: "true-dark",
}
const theme_names = {
  0: "Dark",
  1: "Light",
  2: "Electric Boogaloo",
  3: "Space",
  4: "Tree",
  5: "Cancer",
  6: "Gapples",
  7: "True Dark",
} 
const font = {
  0: "Lucida Console",
  1: "Times New Roman",
  2: "Arial",
  3: "Courier",
  4: "Wingdings",
  5: "Verdana",
}
var colors = {
  dark: {

  
    background: "#000000",
    background_tooltip: "rgba(123, 123, 123, 0.75)",
    color: "#FFFFFF",
    points: "#FFFFFF",
    locked: "#bf8f8f"
  },
  light: {

    background: "#FFFFFF",
    background_tooltip: "rgba(0, 15, 31, 0.75)",
    color: "#000000",
    points: "#dfefff",
    locked: "#c4a7b3"
  }, 
  electric: {
    background: "#ffff33",
    background_tooltip: "rgba(0, 15, 31, 0.75)",
    color: "#000000",
    points: "#dfefff",
    locked: "#c4a7b3"
  },
    space: {
    background: "#1d1135",
    background_tooltip: "#ffffff",
    color: "#7649fe",
    points: "#dfefff",
    locked: "#c4a7b3"
  },
    tree: {
    background: "#2c1c03",
    background_tooltip: "#0059b3",
    color: "#639e47",
    points: "#dfefff",
    locked: "#c4a7b3"
  },
  cancer: {
    background: " #00ff00",
    background_tooltip: "rgba(0, 235, 0, 0.75)",
    color: "#ffff00",
    points: "#dfefff",
    locked: "#c4a7b3"
  },
  gapples: {
    background: "#FFFF00",
    background_tooltip: "rgba(255, 255, 0, 0.75)",
    color: "#FFFF00",
    points: "#FFFF00",
    locked: "#FFFF00"
  },
  "true-dark": {
    background: "#000000",
    background_tooltip: "rgba(0, 0, 0, 0.75)",
    color: "#000000",
    points: "#000000",
    locked: "#000000"
  },
 
}
var colors_theme
function switchtheme() {
  colors_theme = colors[themes[player.theme] || "dark"]
  document.body.style.setProperty('--background', colors_theme["background"])
  document.body.style.setProperty('--background_tooltip', colors_theme["background_tooltip"])
  document.body.style.setProperty('--color', colors_theme["color"])
  document.body.style.setProperty('--points', colors_theme["points"])
  document.body.style.setProperty('--locked', colors_theme["locked"])
  
}
var current_font
function switchfont() {
  current_font = [font[player.font] || "Lucida Console"]
  document.body.style.setProperty('--font', current_font)
  
}
function getThemeName() {
  return player.theme ? theme_names[player.theme] : "Dark"
}
function getFontName() {
  return player.font ? font[player.font] : "Lucida Console"
}
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show")

}
function myFunction2() {
    document.getElementById("myDropdown2").classList.toggle("show")
}
function changeTheme(new_theme) {
  player.theme = new_theme;
  switchtheme();
}
function changeFont(new_font) {
  player.font = new_font;
  switchfont();
}
window.onclick = function(event) {
  if (!event.target.matches('.settingsbutton')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
function Stylechange() {
   
  
   if (player.theme === undefined || typeof player.theme == "string") player.theme = 1;
    else {
    if (!((player.theme + 1) in themes)) player.theme = 0;
    else player.theme += 1;
    }
    switchtheme() 
}