const themes = ["light", "dark"];
const themesLength = themes.length;

function hardReset() {
  if (!confirm("Are you sure you want to reset all your progress? This can't be undone!")) return;
  localStorage.removeItem("powgame1");
  merge(player, basePlayer);
  merge(tmp, baseTmp)
  notifier.success("hard reset successful")
}

function exportSave() {
  navigator.clipboard.writeText(JSON.stringify(player));
  notifier.info("exported to clipboard");
}

function importSave(imported = prompt("paste your save here")) {
  try {
    const parsedSave = JSON.parse(imported);
    objectToDecimal(parsedSave);
    merge(player, parsedSave);
    save();
  } 
  catch {
    notifier.error("invaild save");
    return;
  }
}

function togglesave() {
  player.options.autoSave = !player.options.autoSave
}

function toggletheme() {
  player.theme = player.theme + 1 % themesLength;
}
