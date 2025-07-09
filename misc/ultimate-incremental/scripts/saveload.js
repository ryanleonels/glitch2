let D=x => new ExpantaNum(x)
let $=x=>document.getElementById(x)
function loopAssign(x, y) {
  
    for (var key in y) {

      if (key=="planet") x["planet"]=y["planet"]
        if (!y.hasOwnProperty(key)) continue;
        if (typeof y[key] == "object" && !(y[key] instanceof Array) && !(y[key] instanceof ExpantaNum)) {
            loopAssign(x[key],y[key])
        }
      else if (typeof y[key] == "undefined") {}
        else {
            x[key] = y[key]
        }
    }
    return x
}
function decimalize(x) { // imma continue working

    for (var i in x) {
      /*if (i == "planet"){
        for(let y=0;y<x[i].length;y++){
          console.log("planet",y+1)
          for(let z=0;z<x[i][y].walls.length;z++){
            console.log("planet",y+1,"wall",z+1)
            x[i][y].walls[z]=D(x[i][y].walls[z])
          } 
          x[i][y].wallsBeat=D(x[i][y].wallsBeat)
        }
        continue;
      }*/

        if (typeof x[i] == "object" && !(x[i] instanceof ExpantaNum)) {
        decimalize(x[i])
        }
        else if (typeof x[i] == "string" || typeof x[i] == 'number'){

          if (i=="name" || i=="theme"){}
        else {
          x[i] = D(x[i]);
          if (x[i].isNaN()) x[i] = D(0);
             }
        }
    }
    return x
}
function undecimalize(z) { // imma continue working
    let x = {}
    for (var i in z) {
        if (typeof z[i] == "object" && !(z[i] instanceof ExpantaNum)) {
          x[i] = undecimalize(z[i])
        }
        else if ((z[i] instanceof ExpantaNum)){
          x[i] = z[i].toString()
        }
        else x[i] = z[i]
    }
    return x
}
function copyStringToClipboard (str) {
   // Create new element
   var el = document.createElement('textarea');
   // Set value (string to be copied)
   el.value = str;
   // Set non-editable to avoid focus and move outside of view
   el.setAttribute('readonly', '');
   el.style = {position: 'absolute', left: '-9999px'};
   document.body.appendChild(el);
   // Select text inside element
   el.select();
   // Copy text to clipboard
   document.execCommand('copy');
   // Remove temporary element
   document.body.removeChild(el);
}
function save() {
  localStorage.ultimateIncremental = JSON.stringify(undecimalize(player))
}
function exportSave() {
  copyStringToClipboard(btoa(JSON.stringify(undecimalize(player))))
}
function importSave() {
  var x = window.prompt("Please enter your save in the text box below.");
  if (x == "") {
    if (window.confirm('Are you sure you want to reset? This is not a prestige layer; you do not get a boost. This action is irreversible.')) {
      localStorage.clear();
      location.reload();
    }; 
    return
  };
  localStorage.ultimateIncremental = JSON.stringify(undecimalize(JSON.parse(window.atob(x))));
  if (typeof localStorage.ultimateIncremental != "undefined") {
    player = decimalize(loopAssign(player, JSON.parse(localStorage.ultimateIncremental)));
  }
  player.version = 0.1;
  switchtheme();
  switchfont();
}
function hardReset(){
  let x = window.confirm("Are you sure you want to reset your game?")
  if(x){
    localStorage.clear();
    player = {};
    location.reload();
  }else window.confirm("You have not reset your game.")
}