
var damage =1.0
var damagepersecond=0.0
var prestigekittensmulti=1.0
var prestigekittensgain=0.0
var currenttab="main"
var o = {
  wallnametype:0,
  notation:0,
  alertwb:1,
  savetime:30000,
  tps:20
}
var newstickerlist=["What is a wall?","When is a wall?",">:3","Programming is hard","OwO","Good Job.","Furries are cute"
,"1","nice.","h","I hate walls.","^w^","testicle catss","<button>button</button>","uwu"
,"Bill Nye the <button class='button' onclick='o.notation=1'>Science</button> Guy","thats a low amount of wall"
,"The next news message is true","ew",'"Youre either a smart fella or a fart smella" -cello',"hexagons",":3","I want to pet you"
,"antimatter? nah, walls.","WALLS","this is 100% not copied from FE000000","squeesh","...","my head hurts","pi","i cant make a news ticker"
,"hi","<button class='button'>button 2</button>"]
const listofnotationnames= ["Mixed Scientific","Scientific","Engineering","Letters","Standard","Infinity","Logarithm"]
const listofwalltypenames=["Normal","Simple","Letters","Nothing."]
function format(n){
  const mis = new ADNotations.MixedScientificNotation();
  const sci = new ADNotations.ScientificNotation();
  const eng = new ADNotations.EngineeringNotation();
  const lee = new ADNotations.LettersNotation();
  const sta = new ADNotations.StandardNotation();
  const ini = new ADNotations.InfinityNotation();
  const log = new ADNotations.LogarithmNotation();
  const listofnotations = [mis,sci,eng,lee,sta,ini,log]
  if (o.notation > 6){o.notation=0}
  return listofnotations[o.notation].format(n,2,2)
}
var d = {
  timesincestart: Date.now(),
  time: Date.now(),
  achievements:[],
  required:1,
  dpspercentcost:1.0e5,
  dpspercent:0.0,
  damagemulticost:10.0,
  damagemulti:1.0,
  basedamagecost:100.0,
  basedamage:1.0,
  wallhp:1.0,
  walllevel:0,
  maxwalllevel:0,
  money:0,
  prestigekittens:0,
  prestigeshow:0,
  pupgexpercent:0,
  pupgexpercentcost:12.0,
  pupgpresmulti:1,
  pupgpresmulticost:25.0,
  curpchallange:0,
  pcha1goal:25,
  pcha1complete:0,
  pcha2goal: 1e30,
  pcha2complete: 0,
  showinf:0,
  infinitycats:0
}
Load()
Save()
var tsincelg = (Date.now() - d.time)/1000
console.log(tsincelg)

function HardReset(){
  if (confirm("Are you sure?")){
    if (confirm("Are you REALLY sure?")){
  localStorage.removeItem("cmowre-save")
  location.reload()}}
}
function Addach(id){
  if (d.achievements.includes(id)){}
  else{
    document.getElementById("a"+id).classList.add("achbc")
    d.achievements.push(id)
    $.notify("You Gained Achevement "+id+" !","success")
  }
}
function Save(){
  localStorage.setItem("cmowre-save",btoa(JSON.stringify(d)))
  localStorage.setItem("cmowre-options",btoa(JSON.stringify(o)))
}
function Load(){
if (localStorage.getItem("cmowre-save") != null) {
var data = JSON.parse(atob(localStorage.getItem("cmowre-save")))
for (const i in data) d[i] = data[i];}
if (localStorage.getItem("cmowre-options") != null){
var zata = JSON.parse(atob(localStorage.getItem("cmowre-options")))
for (const j in zata) o[j] = zata[j];}
d.achievements.forEach(id => {document.getElementById("a"+id).classList.add("achbc")})}

function Export(){
  document.getElementById("savedata").value = btoa(JSON.stringify(d))
}
function Import(){
  if (document.getElementById("savedata").value != "i like furries"){
   var data = JSON.parse(atob(document.getElementById("savedata").value))
   for (const i in data) d[i] = data[i]}
  else {currenttab='secret'}
}
function PChallange(x){
  if (d.curpchallange == 0){
    d.curpchallange = x
    $.notify("Prestige Challange "+d.curpchallange+" Started!","warn")
    Prestige()}}

function PCheck(){
  if (d.curpchallange == 1 && d.walllevel >= d.pcha1goal){
    $.notify("Prestige Challange "+d.curpchallange+" Complete!","success")
    d.curpchallange = 0
    Prestige()
    d.pcha1goal += 10
    d.pcha1complete += 1
    d.money = 0
  }
  if (d.curpchallange == 2 && d.money >= d.pcha2goal){
    $.notify("Prestige Challange "+d.curpchallange+" Complete!","success")
    d.curpchallange = 0
    Prestige()
    d.pcha2goal *= 100
    d.pcha2complete += 1
    d.money = 0
  }
}
function UpdateScreen(x){
  document.getElementById("timesincestart").innerHTML = Math.floor((Date.now()-d.timesincestart)/1000)
  document.getElementById("achcounter").innerHTML = d.achievements.length
  document.getElementById("multi").innerHTML = format(d.damagemulti)
  document.getElementById("base").innerHTML = format(d.basedamage)
  document.getElementById("dpc").innerHTML = format(damage)
  document.getElementById("dps").innerHTML = format(damagepersecond)
  document.getElementById("money").innerHTML = format(d.money)
  document.getElementById("wallhp").innerHTML = format(d.wallhp)
  document.getElementById("maxwallhp").innerHTML = format(10**d.walllevel)
  document.getElementById("wallname").innerHTML = WallName(d.walllevel)
  document.getElementById("bbase").innerHTML = format(d.basedamagecost)
  document.getElementById("bmul").innerHTML = format(d.damagemulticost)
  document.getElementById("bper").innerHTML = format(d.dpspercentcost)
  document.getElementById("percen").innerHTML = format(d.dpspercent)
  document.getElementById("require").innerHTML = format(d.required)
  document.getElementById("wallnum").innerHTML = d.walllevel+1
  document.getElementById("wallmax").innerHTML = d.maxwalllevel+1
  document.getElementById("pkittengain").innerHTML = format(prestigekittensgain)
  document.getElementById("pkitten").innerHTML = format(d.prestigekittens)
  document.getElementById("pkboost").innerHTML = format(prestigekittensmulti)
  document.getElementById("pmulc").innerHTML = format(d.pupgpresmulticost)
  document.getElementById("pmul").innerHTML = format(d.pupgpresmulti)
  document.getElementById("pperc").innerHTML = format(d.pupgexpercentcost)
  document.getElementById("pper").innerHTML = format(d.pupgexpercent)
  document.getElementById("tps").innerHTML = o.savetime
  document.getElementById("pcha1g").innerHTML = format(d.pcha1goal)
  document.getElementById("pcha1c").innerHTML = d.pcha1complete
  document.getElementById("pcha1r").innerHTML = format((1+(d.pcha1complete/7)))
   document.getElementById("pcha1w").innerHTML = format((2.5+(d.pcha1complete/3)))
  document.getElementById("pcha2g").innerHTML = format(d.pcha2goal)
  document.getElementById("pcha2c").innerHTML = d.pcha2complete
  document.getElementById("pcha2r").innerHTML = format((1+(d.pcha2complete/5.5)))
   document.getElementById("pcha2w").innerHTML = format((1.35+(d.pcha2complete/3)))
  document.getElementById("notation").innerHTML = listofnotationnames[o.notation]
  document.getElementById("walltype").innerHTML = listofwalltypenames[o.wallnametype]
  if (d.walllevel == d.maxwalllevel){document.getElementById("wallneed").style.display = "inline";}
  else {document.getElementById("wallneed").style.display = "none";}
  if (d.prestigeshow == 1){document.getElementById("prestigetab").style.display = "inline";}
  else {document.getElementById("prestigetab").style.display = "none";}
  if (d.showinf == 1){document.getElementById("infinitytab").style.display = "inline";}
  else {document.getElementById("infinitytab").style.display = "none";}
}
function Achievements(){
  if(d.walllevel >= 1){Addach(1)}
  if(d.money >= 10){Addach(2)}
  if(d.dpspercent > 0){Addach(3)}
  if(d.money >= 1e9){Addach(4)}
  if(damage >= 1.0e15){Addach(5)}
  if(d.walllevel >= 17){Addach(6)}
  if(d.prestigeshow == 1){Addach(7)}
  if(d.prestigekittens >= 1){Addach(8)}
  if(d.prestigekittens >= 25){Addach(9)}
  if(d.pupgpresmulti > 1){Addach(10)}
  if(d.pupgexpercent >= 1){Addach(11)}
  if(damagepersecond >= 1.0e14){Addach(12)}
  if(d.curpchallange > 0){Addach(13)}
  if(d.pcha1complete > 0){Addach(14)}
  if(d.pcha1complete > 4){Addach(15)}
  if(d.pcha2complete > 0){Addach(16)}
  if(d.pcha2complete > 2){Addach(17)}
  if(d.pcha2complete > 4){Addach(18)}
}
function WallName(x){
  if (o.wallnametype > 3){
    o.wallnametype=0
  }
  if (o.wallnametype == 0){
  var walltypes=["Paper ","Very Thick Paper ","Wooden ","Wooden² ","Rock ","Void Rock ","Pure Void Rock ",'Pure Iron ',"Purest Of Iron ","Tungsten ","Hyper-Tungsten ",'Void Tungsten ',"Void Hyper-Tunsten ","Void ","Pure Void ","Infinte ","Eternal ","Unobtainum ","Pure Unobtanium ","Pure Void Unobtanium ","Code ",'←{¬ĸ³đ€©?ŧ ',"Space-Time "]
  var hyperwalltypes=["","Meta-","Eta-","Kilo-","Mega-","Giga-","Tera-",'Alpha-','Beta-','Gamma-','Delta-','Psi-','Omega-','?????-',"?????²-"]
  return "The "+hyperwalltypes[Math.floor(x/walltypes.length)]+walltypes[x%walltypes.length]
}
  if (o.wallnametype == 1){
  var nths=["th","st","nd","rd","th","th","th","th","th","th"]
  if (10 < x+1 < 20){
    return "The "+(x+1).toString()+"th "
  }
    else{
      return "The "+(x+1).toString()+nths[parseInt((x+1).toString().slice(-1))]+" "
    }
  }
  if (o.wallnametype == 2){
      var walltypesa=["a ","b ","c ","d ","e ","f ","g ",'h ',"i ","j ","k ",'l ',"m ","n ","o ","p ","q ","r ","s ","t ","u ",'v ',"w ","x ","y ","z "]
  var hyperwalltypesa=["","a","b","c","d","e","f",'g','h','i','j','k','l','m',"n"]
  return "The "+hyperwalltypesa[Math.floor(x/walltypesa.length)]+walltypesa[x%walltypesa.length]
  }
  if (o.wallnametype==3){
    return "The   "
  }
}
function MoveWall(x){
  d.walllevel+=x
  if (d.walllevel > d.maxwalllevel || d.walllevel < 0){
    if (d.walllevel < 0){
      d.walllevel = 0
    }
    else{
      d.walllevel = d.maxwalllevel
    }
  }
  else{
  }
  d.wallhp = 10**d.walllevel}
function Prestige(){
  if (d.maxwalllevel < 19){
  d.prestigekittens+=0}
  else{
    $.notify("You have prestiged for "+prestigekittensgain.toPrecision(4)+" PK(s)!", "info");
    d.prestigekittens+=(2**(d.maxwalllevel-19))*d.pupgpresmulti
  }
  d.required=1
  d.dpspercentcost=1.0e5
  d.dpspercent=0.0
  d.damagemulticost=10.0
  d.damagemulti=1.0
  d.basedamagecost=100.0
  d.basedamage=1.0
  d.wallhp=1.0
  d.walllevel=0
  d.maxwalllevel=0
  d.money=1.0
}
function InfPrestige(){
  if (d.maxwalllevel==308){
  d.required=1
  d.dpspercentcost=1.0e5
  d.dpspercent=0.0
  d.damagemulticost=10.0
  d.damagemulti=1.0
  d.basedamagecost=100.0
  d.basedamage=1.0
  d.wallhp=1.0
  d.walllevel=0
  d.maxwalllevel=0
  d.money=1.0
  d.prestigekittens=0
  d.prestigeshow=0
  d.pupgexpercent=0
  d.pupgexpercentcost=12.0
  d.pupgpresmulti=1
  d.pupgpresmulticost=25.0
  d.infinitycats+=1
  $.notify("You have Brick Prestiged for 1 BK!","info")
}}
function Attack(x){
  if (x==1){
  d.wallhp-=damage
  d.money+=damage*(1+(d.pcha2complete/5.5))
  if (d.wallhp <= 0){
    d.money+=10**d.walllevel
    if (d.maxwalllevel==d.walllevel){d.required-=Math.floor(d.wallhp/-(10.0**d.walllevel))+1; if (d.required < 1){d.maxwalllevel+=1; MoveWall(1); d.required=Math.round(1.25**d.maxwalllevel);$.notify("You unlocked a new wall!", "success");}}
    d.wallhp=10**d.walllevel
  }}
  if (x==2){
  d.wallhp-=damagepersecond/o.tps
  d.money+=damagepersecond*(1+(d.pcha2complete/5.5))/o.tps
  if (d.wallhp <= 0){
    if (o.alertwb ==1){$.notify("You broke a wall!", "warn");}
    d.money+=10**d.walllevel
    if (d.maxwalllevel==d.walllevel){d.required-=Math.floor(d.wallhp/-(10.0**d.walllevel))+1; if (d.required < 1){d.maxwalllevel+=1; MoveWall(1); d.required=Math.round(1.25**d.maxwalllevel);$.notify("You unlocked a new wall!", "success");}}
    d.wallhp=10**d.walllevel
  }
}}
function Cost(x){
  if (x==1){
    if (d.money >= d.basedamagecost){
      d.money -= d.basedamagecost
      d.basedamage+=1
      d.basedamagecost=Math.floor(d.basedamagecost*1.25)
    }}
  if (x==2){
    if (d.money >= d.damagemulticost){
      d.money-=d.damagemulticost
      d.damagemulti*=2
      d.damagemulticost=Math.floor(d.damagemulticost*2.25)
    }}
  if (x==3){
    if (d.money >= d.dpspercentcost && d.dpspercent != 125){
      d.money-=d.dpspercentcost
      d.dpspercent+=0.5
      d.dpspercentcost=Math.floor(d.dpspercentcost*1.95)
      }
    if (d.dpspercent == 125){
        d.dpspercentcost=1e308
      d.dpspercent=125
      $.notify("ALREADY MAXED!", "error");
    }
  }
  if (x==4){
    if (d.prestigekittens >= d.pupgpresmulticost){
      d.prestigekittens-=d.pupgpresmulticost
      d.pupgpresmulti*=1.2
      d.pupgpresmulticost=Math.floor(d.pupgpresmulticost*2.15)
    }}
  if (x==5){
    if (d.prestigekittens >= d.pupgexpercentcost && d.pupgexpercent < 25){
      d.prestigekittens-=d.pupgexpercentcost
      d.pupgexpercent+=2.5
      d.pupgexpercentcost=Math.round(d.pupgexpercentcost*1.95)
    }
     if (d.pupgexpercent == 25){
  d.pupgexpercentcost=1e308
  d.pupgexpercent=25
  $.notify("ALREADY MAXED!", "error");
  }
}}
function Tabs(){
  if (currenttab == "main"){document.getElementById("main").style.display = "inline";}
  else {document.getElementById("main").style.display = "none";}
  if (currenttab == "options"){document.getElementById("options").style.display = "inline";}
  else {document.getElementById("options").style.display = "none";}
  if (currenttab == "prestige"){document.getElementById("prestige").style.display = "inline";}
  else {document.getElementById("prestige").style.display = "none";}
  if (currenttab == "infinity"){document.getElementById("infinity").style.display = "inline";}
  else {document.getElementById("infinity").style.display = "none";}
  if (currenttab == "ach"){document.getElementById("ach").style.display = "inline";}
  else {document.getElementById("ach").style.display = "none";}
  if (currenttab == "secret"){document.getElementById("secret").style.display = "inline";}
  else {document.getElementById("secret").style.display = "none";}
}
UpdateScreen()
Tabs()
setInterval(() => {Save(); $.notify("Saved!","success")},o.savetime)
setInterval(() => {document.getElementById("newsticker").innerHTML = newstickerlist[Math.floor(Math.random()*(newstickerlist.length-1))]},10000)

setInterval(() => {
    if (d.curpchallange == 1){
    damage=(d.damagemulti*d.basedamage*prestigekittensmulti*((7+d.pcha1complete)/7))/(2.5+(d.pcha1complete/3))}
    else{
    damage=(d.damagemulti*d.basedamage*prestigekittensmulti*((7+d.pcha1complete)/7))}
    
    damagepersecond= (damage*((d.dpspercent+d.pupgexpercent)/100))
    if(d.curpchallange==2){
      prestigekittensmulti=(((d.prestigekittens+1)**(1/2.5)))**(1/(1.35+(d.pcha2complete/3)))
    }
    else{prestigekittensmulti=((d.prestigekittens+1)**(1/2.5))}
    if (d.maxwalllevel >308){d.walllevel=308; d.maxwalllevel=308;}
    if (d.walllevel < 19){
      prestigekittensgain=0}
    else{
      prestigekittensgain=(2**(d.maxwalllevel-19))*d.pupgpresmulti
    }
    if (d.walllevel == 308){
      d.showinf = 1
    }
    if ((d.maxwalllevel > 18 || d.prestigekittens > 0 ) && d.prestigeshow!=1){d.prestigeshow=1; $.notify("You Unlocked Prestige!", "info");}
    Tabs()
    UpdateScreen()
    Attack(2);
    Achievements();
    PCheck();
    document.title = WallName(d.walllevel)+" Wall | CMOWRe"
    d.time=Date.now();}, 1000/o.tps);