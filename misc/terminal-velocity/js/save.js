const player = Vue.reactive({});
function start() {
  const data = {
    speed: new Decimal(0),
    accelerators: {
      1: {bought: new Decimal(0), power: new Decimal(0)},
      2: {bought: new Decimal(0), power: new Decimal(0)},
      3: {bought: new Decimal(0), power: new Decimal(0)},
      4: {bought: new Decimal(0), power: new Decimal(0)},
      5: {bought: new Decimal(0), power: new Decimal(0)},
      6: {bought: new Decimal(0), power: new Decimal(0)},
    },
    goldenAccelerators: {
      1: {bought: new Decimal(0), power: new Decimal(0)},
      2: {bought: new Decimal(0), power: new Decimal(0)},
      3: {bought: new Decimal(0), power: new Decimal(0)},
      4: {bought: new Decimal(0), power: new Decimal(0)},
      5: {bought: new Decimal(0), power: new Decimal(0)},
      6: {bought: new Decimal(0), power: new Decimal(0)},
    },
    particleAccelerators: {
      1: {bought: new Decimal(0), power: new Decimal(0)},
      2: {bought: new Decimal(0), power: new Decimal(0)},
      3: {bought: new Decimal(0), power: new Decimal(0)},
      4: {bought: new Decimal(0), power: new Decimal(0)},
      5: {bought: new Decimal(0), power: new Decimal(0)},
      6: {bought: new Decimal(0), power: new Decimal(0)},
    },
    currentTab: 'accelerators',
    subtab: 'normal',
    minitab: 'normal',
    totalSpeed: new Decimal(0),
    timePlayed: 0,
    lastTick: Date.now(),
    notation: 1,
    ranks: {
      rank: new Decimal(0),
      tier: new Decimal(0),
      prestige: new Decimal(0)
    },
    perkPoints: new Decimal(0),
    milestones: [],
    autobuyers: [false,false,false,false,false,false],
    goldenAutobuyers: [false,false,false,false,false,false],
    bestRank: new Decimal(0),
    bestTier: new Decimal(0),
    bestPrestige: new Decimal(0),
    achievements: [],
    achievementDisplay: 0,
    unlocks: {
      goldenAccelerators: false,
      ranks: false,
      tiers: false,
      prestige: false,
      perks: false,
      metapoints: false,
      ascenders: false,
      hexachamber: false,
      collider: false,
      crafting: false,
      galactic: false
    },
    meta: {
      purchases: new Decimal(0),
      points: new Decimal(0),
      lap: new Decimal(0),
      upgrades: [],
      hyperPurchases: new Decimal(0),
      hyperLap: new Decimal(0),
      ascenders: new Decimal(0),
      totalAscenders: new Decimal(0),
      ascenderUpgrades: [],
    },
    hexachamber: {
      completions: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
      in: 0,
      resources: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
      crafted: [new Decimal(0),new Decimal(0),new Decimal(0)],
    },
    cosmicFragments: new Decimal(0),
    galactics: new Decimal(0),
    space: {
      theorems: new Decimal(0),
      total: new Decimal(0),
      studies: [],
      respec: false,
      purchases: [null,0,0,0]
    },
  };
  return data;
}

function exportedSave() {
  return btoa(JSON.stringify(player))
}

function parseSave(text) {
  return JSON.parse(atob(text))
}

function save() {
  localStorage.setItem("TerminalVelocity", exportedSave());
}

function fixSave() {
  const defaultData = start();

  fixData(defaultData, player);
}

function fixData(defaultData, newData) {
  for (let item in defaultData) {
    if (defaultData[item] == null) {
      if (newData[item] === undefined) newData[item] = null;
    } else if (Array.isArray(defaultData[item])) {
      if (newData[item] === undefined) newData[item] = defaultData[item];
      else fixData(defaultData[item], newData[item]);
    } else if (defaultData[item] instanceof Decimal) {
      // Convert to Decimal
      if (newData[item] === undefined) newData[item] = defaultData[item];
      else newData[item] = new Decimal(newData[item]);
    } else if (!!defaultData[item] && typeof defaultData[item] === "object") {
      if (newData[item] === undefined || typeof defaultData[item] !== "object")
        newData[item] = defaultData[item];
      else fixData(defaultData[item], newData[item]);
    } else {
      if (newData[item] === undefined) newData[item] = defaultData[item];
    }
  }
}

function load() {
  const get = localStorage.getItem("TerminalVelocity");

  if (get === null || get === undefined) {
    Object.assign(player, start());
  } else {
    Object.assign(
      player,
      start(),
      parseSave(get)
    );
    fixSave();
  }
  player.lastTick = Date.now()
  Vue.createApp({
    data() {
      return { // why is it not reactive? what the hell
        player,
        Decimal,
        Accelerators,
        Milestones,
        Achievements,
        GoldenAccelerators,
        MetaPoints,
        Hexachamber,
        Galactic,
        ParticleAccelerators,
        SpaceStudies
      }
    },
    methods: {
      format,
      formatWhole,
      formatTime,
      save,
      exportSave,
      exportAsFile,
      importSave,
      hardReset,
      rankReq, tierReq, prestigeReq, rankUp, tierUp, prestige, unprestige,
      automate,
      rankBoostDisplay, tierBoostDisplay, prestigeBoostDisplay,
      speedPerSecond
    }
  }).mount("#app")
}

window.onload = function () {
  load();
  player.lastTick = Date.now()
  window.saveInterval = setInterval(save,5000)
}

function exportSave() {
  const str = btoa(JSON.stringify(player));
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  el.setSelectionRange(0, 99999);
  document.execCommand("copy");
  document.body.removeChild(el);
  alert("Save successfully copied to clipboard!")
}

function download(filename, text) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function exportAsFile(text = exportedSave()) {
  download("TerminalVelocitySave.txt", text)
}

function importSave(imported = undefined) {
  if (imported === undefined) imported = prompt("Paste your save string in the input box below!");
  Object.assign(player, parseSave(imported));
  fixSave();
  save();
  //window.location.reload();
}

function hardReset() {
  if (
    confirm(
      "Are you sure? It will reset EVERYTHING and you will not get any reward!"
    )
  ) {
    Object.assign(player, start());
    player.lastTick = Date.now()
    save();
    //window.location.reload();
  }
}