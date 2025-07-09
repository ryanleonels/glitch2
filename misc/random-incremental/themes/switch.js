function changeTheme() {
  player.theme++
  if (player.theme > 2) player.theme = 1
  updateTheme()
}

function updateTheme(){
  if (player.theme === 1) {
    lightTheme() 
    return "light"
  }
  else if (player.theme === 2) {
    darkTheme()
    return "dark"
  };
}

const r = document.querySelector(":root");

function darkTheme() {
  r.style.setProperty("--active-color", "#2e9735");
  r.style.setProperty("--inactive-color", "#743f3f")
  r.style.setProperty('--text-color', '#cccbcb')
  r.style.setProperty('--dice', '#9c4d4d')
  r.style.setProperty('--cubes', '#3f3fbb')
  r.style.setProperty('--challenges', '#943838')
  r.style.setProperty('--upgrades-primary', '#313131')
  r.style.setProperty('--button-primary', '#5c5c5c')
  r.style.setProperty('--button-text-color', '#fff')
  r.style.setProperty('--background-primary', '#3f3f3f')
  r.style.setProperty('--background-secondary', '#2c2c2c')
  r.style.setProperty('--lines','#4d6b59')
  r.style.setProperty('--hyperlink', '#0e82f5')
}

function lightTheme() {
  r.style.setProperty('--active-color', '#53f35e')
  r.style.setProperty('--inactive-color', '#8f4f4f')
  r.style.setProperty('--text-color', '#000')
  r.style.setProperty('--dice', '#ff7f7f')
  r.style.setProperty('--cubes', '#7f7fff')
  r.style.setProperty('--challenges', '#943838')
  r.style.setProperty('--upgrades-primary', '#8f8f8f')
  r.style.setProperty('--button-primary', '#acacac')
  r.style.setProperty('--button-text-color', '#000')
  r.style.setProperty('--background-primary','#d3d3d3')
  r.style.setProperty('--background-secondary', '#bebebe')
  r.style.setProperty('--lines','#67a780'),
  r.style.setProperty('--hyperlink', '#004f9f')
}