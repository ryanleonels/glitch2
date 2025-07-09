"use strict"
let reader = new FileReader()
function save() {
  localStorage.setItem('ordinalMarkdownSave', JSON.stringify(game))
}

function load(saveData) {
  if (typeof saveData != "undefined") {
    let saveCounter
    for (saveCounter in saveData) {
      game[saveCounter] = saveData[saveCounter]
      if ((typeof game[saveCounter] == "object")&&(typeof game[saveCounter].array != "undefined")&&(typeof game[saveCounter].sign != "undefined")&&(typeof game[saveCounter].layer != "undefined")) {
        game[saveCounter]=ENify(saveData[saveCounter])
      }
      if ((typeof game[saveCounter] == "object")&&(typeof game[saveCounter].level != "undefined")&&(typeof game[saveCounter].base != "undefined")&&(typeof game[saveCounter].reduced != "undefined")) {
        game[saveCounter]=Ordinalfy(saveData[saveCounter])
      }
      //for (saveCounter in game.prime) {
      //game.prime[saveCounter]=ENify(game.prime[saveCounter])
      //}
    } // fixed? i think?
  } //Yes, I copy and pasted it from OM code lol
}// well now it works i guess poggers now time to clear my save data

function ENify(x) {
  let newEN = new EN(0)
  newEN.array = x.array
  newEN.sign = x.sign
  newEN.layer = x.layer
  return newEN
}

function Ordinalfy(x) {
  return new Ordinal(x.level,x.base,x.reduced,x.limit)
}
function exporty(file=0) {
  if(file) {
    save();
    let file = new Blob([btoa(JSON.stringify(game))], {type: "text/plain"})
    window.URL = window.URL || window.webkitURL;
    let a = document.createElement("a")
    a.href = window.URL.createObjectURL(file)
    a.download = "Ordinal Markup Save.txt"
    a.click()
    notify("File Export Successful!")
  } else {
    copyStringToClipboard(btoa(JSON.stringify(game)));
  }
}

function importy(file=0) {
  if(file) {
    let loadgame = "";
    reader.readAsText(document.getElementById("a").files[0]);
      
      window.setTimeout(function() {
      console.log(52)
      loadgame=JSON.parse(atob(reader.result))
      if (loadgame !== "") {
      load(loadgame);
      notify("File Import Successful!")
      }
        window.setTimeout(() => {
        save()
       window.location.reload()
        },200)
      }, 100)
      

  } else {
  let loadgame = "";
  loadgame = JSON.parse(atob(prompt("Paste in your save WARNING: WILL OVERWRITE YOUR CURRENT SAVE")));
  if (loadgame !== "") {
    load(loadgame);
    notify("Import successful!")
    window.setTimeout(() => {
    save()
    window.location.reload()
    },200)
  }
  }
}
function copyStringToClipboard(str) {
  var el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style = {
    position: "absolute",
    left: "-9999px"
  };
  document.body.appendChild(el);
  copyToClipboard(el);
  document.body.removeChild(el);
  notify("Copied to clipboard")
}

function copyToClipboard(el) {
  el = typeof el === "string" ? document.querySelector(el) : el;
  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
    var editable = el.contentEditable;
    var readOnly = el.readOnly;
    el.contentEditable = true;
    el.readOnly = true;
    var range = document.createRange();
    range.selectNodeContents(el);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    el.setSelectionRange(0, 999999);
    el.contentEditable = editable;
    el.readOnly = readOnly;
  } else {
    el.select();
  }
  document.execCommand("copy");
}