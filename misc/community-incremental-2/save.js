/*
This place is a message... and part of a system of messages... pay attention to it!

Sending this message was important to us. We considered ourselves to be a powerful culture.

This place is not a place of honor... no highly esteemed deed is commemorated here... nothing valued is here.

What is here was dangerous and repulsive to us. This message is a warning about danger.

The danger is in a particular location... it increases towards a center... the center of danger is here... of a particular size and shape, and below us.

The danger is still present, in your time, as it was in ours.

The danger is to the body, and it can kill.

The form of the danger is an emanation of energy.

The danger is unleashed only if you substantially disturb this place physically. This place is best shunned and left uninhabited.
*/
const D = _ => new Decimal(_);
let $=x=>document.getElementById(x)
function loopAssign(x, y) {
    if(y instanceof Array) {
        x = []
    } 
    for (var key in y) {
        if (!y.hasOwnProperty(key)) continue;
        if (typeof y[key] == "object" && !(y[key] instanceof Array) && !(y[key] instanceof Decimal)) {
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
        if (typeof x[i] == "object" && !(x[i] instanceof Decimal)) {
          // making it not turn upgrade ids into Decimals
          decimalize(x[i]) // you don't need that
        }// i already made it exclude Number and saving turns it all into String so
        else if (typeof x[i] == "string"){
          if (x[i].split("STRING").length > 1) {
            //console.log("TEST"+x[i])
            x[i] = x[i].split("STRING")[1]//should work, going to do some testing
            continue;
          }
          let tmpX = x[i];
          x[i] = D(x[i]);
          if (isNaN(x[i])) x[i] = tmpX;
        }
    }
    
    return x
}
function undecimalize(z) { // imma continue working
    let x = {}
    for (var i in z) {
        if (typeof z[i] == "object" && !(z[i] instanceof Decimal)) {
          x[i] = undecimalize(z[i])
        }
        else if ((z[i] instanceof Decimal)){
          x[i] = z[i].toString()
        }
        else if ((typeof z[i]) == "string") {
          //console.log(z[i])
          x[i]="STRING"+z[i]
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
  localStorage.setItem("communityincremental", JSON.stringify(undecimalize(player)));
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
  localStorage.setItem("communityincremental", JSON.stringify(undecimalize(decimalize(JSON.parse(window.atob(x))))));//oh wow i sure hope this doesn't lead to any long lasting consequences
  if (typeof localStorage.getItem("communityincremental") != "undefined") {
    player = decimalize(loopAssign(player, JSON.parse(localStorage.getItem("communityincremental"))), player);
    console.log(JSON.parse(localStorage.getItem("communityincremental")))
    console.log(player)
  }
  //location.reload();
}
function hardReset(){
  let x = window.confirm("Are you sure you want to reset your game?")
  if(x){
    localStorage.clear();
    player = {};
    location.reload();
  }else window.confirm("You have not reset your game.")
}
function load(){
  if (typeof localStorage.getItem("communityincremental") != "undefined") {
    player = decimalize(loopAssign(player, JSON.parse(localStorage.getItem("communityincremental"))));
    if (player.technobabble.photonType instanceof Decimal) {
      player.technobabble.photonType = "Up"
    }
  }
  
  //app.$forceUpdate();
}

setInterval(save,10000)