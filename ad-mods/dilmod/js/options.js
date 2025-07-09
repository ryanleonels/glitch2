function notations(yes) {
  displayIf("notationsSelect", yes) 
}

function themes(yes) {
  displayIf("themeSelect", yes) 
}

function switchNotation(notation) {
  game.options.notation = notation
}

function saves(yes) {
  displayIf("notationsSelect", yes) 
}

function presets(yes) {
  displayIf("presetsSelect", yes) 
}

function updatePresets(num) {
   game.presets[num] = game.timestudy.studies
}

function switchPresets(num) {
  if (!game.presets[num]) return;
	game.timestudy.theorems = getTotalTT();
	game.timestudy.studies = [];
	eternity();
  for (i in game.presets[num]) {
    tree.getStudy(game.presets[num][i]).buy()
  }
  presets(false)
}

themes(false)