var diff = 0; // used for the set interval loop at the bottom of this file
// most values are in OmegaNums as they are planned to go beyond e308

function () {
  return {
    points: new Decimal(0),
    settings: {
      started: false
    }
  };
}


player = resetGame();
displayIntro()

function start() {
  player.settings.started = true
  displayIntro()
}

function displayIntro() {
  document.getElementById("intro").style.display = player.settings.started ? "none" : "block";
  document.getElementById("game").style.display = "block";
}