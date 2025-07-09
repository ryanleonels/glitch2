function objectToDecimal(object) {
  for (let i in object) {
    if (
      typeof object[i] == "string" &&
      !isNaN(new Decimal(object[i]).s) &&
      !(new Decimal(object[i]).e == 0 && object[i] != "0")
    ) {
      object[i] = new Decimal(object[i]);
    }
    if (typeof object[i] == "object") {
      objectToDecimal(object[i]);
    }
  }
}

function merge(base, source) {
  for (let i in base) {
    if (source[i] != undefined) {
      if (
        typeof base[i] == "object" &&
        typeof source[i] == "object" &&
        !isDecimal(base[i]) &&
        !isDecimal(source[i]) /* && base[i] != game.achievement*/
      ) {
        merge(base[i], source[i]);
      } else {
        if (isDecimal(base[i]) && !isDecimal(source[i])) {
          base[i] = new Decimal(source[i]);
        } else if (!isDecimal(base[i]) && isDecimal(source[i])) {
          base[i] = source[i].toNumber();
        } else {
          base[i] = source[i];
        }
      }
    }
  }
}

function isDecimal(x) {
  if (x.s == undefined) {
    return false;
  } else {
    return true;
  }
}

var savegame;

function save() {
  localStorage.setItem("a", JSON.stringify(game));
}

function load() {
  if (localStorage.getItem("a")) {
    savegame = JSON.parse(localStorage.getItem("a"));
    objectToDecimal(savegame);
    merge(game, savegame);
  }
}

function wipeSave() {
  getNewSave();
  save();
  load();
  save();
}

function exportSave() {
  return btoa(JSON.stringify(game));
}

function importSave(text) {
  savegame = JSON.parse(atob(text));
  objectToDecimal(savegame);
  merge(game, savegame);

  save();
}
