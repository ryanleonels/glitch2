addLayer("f", {
    name: "furnace", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 6, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
    points: new Decimal(0),
      furnace:{
        t: new Decimal(0),
      energy: new Decimal(10),
        thing: 0,
        txt: "",
        story:{
          ice: 10,
          matches: 0,
          wait: 0,
        }
      },
      
    }},
    color: "#ffffff",
  tooltip:"",
    row: "side", 
    layerShown(){return player.e.buyables[13].gte(66)||player.f.unlocked},
    type: "none", 
  update(diff){
    if(!player.f.unlocked&&player.e.buyables[13].gte(66))player.f.unlocked=true
    if(player.f.unlocked){
      player.f.furnace.energy=player.f.furnace.energy.add(diff*2).min(10)
      if(player.f.furnace.thing==6){
        player.f.furnace.t=player.f.furnace.t.add(diff).min(20)
        if(player.f.furnace.t.eq(20)){player.f.furnace.thing++
                              player.f.furnace.txt="The fire is now at room temperature.<br><br>"+player.f.furnace.txt       }
      }
      if(player.f.furnace.thing>=15){
        for(let i in layers.e.buyables){
          if(Number(i)==Number(i)){
            if(tmp.e.buyables[i].canAfford){
              layers.e.buyables[i].buy()
            }
          }
        }
      }
    }
},
  clickables:{
    11:{
      display(){
        let x=player.f.furnace.thing
        if(x<5)return "Attempt to light the fire"
        if(x<7)return "Wait for the fire to reach room temperature"
        if(x<8)return "Wait for a future update"
        if(x<11)return "Re-light the fire"
        if(x==11)return "Touch the fire"
        if(x==12)return "Unlock the ability to see the fire"
        if(x==13)return "Make the fire more realistic"
        if(x==14)return "Autobuy fome buyables"
        if(x==15)return "Change the fire boost formula from temperature^0 to log10(temperature+1)+1"
        return "Do nothing"
      },
      canClick(){return player.f.furnace.energy.gte(10)},
      onClick(){
        player.f.furnace.energy=player.f.furnace.energy.sub(10)
        let x=player.f.furnace.thing
        if(x==0||x==1){player.f.furnace.txt="You need to remove the ice.<br><br>"+player.f.furnace.txt;player.f.furnace.thing=1}
        if(x==2||x==3){player.f.furnace.txt="You don't have anything to light it with.<br><br>"+player.f.furnace.txt;player.f.furnace.thing=3}
        if(x==4){player.f.furnace.txt="You failed :troll:<br><br>"+player.f.furnace.txt;player.f.furnace.thing++
        }
        if(x==5){player.f.furnace.thing++}
        if(x==7){
          if(player.f.furnace.story.wait==4){player.f.furnace.story.wait++
            player.f.furnace.thing++
                                            player.f.furnace.txt="You wait for an hour. pog update!!!<br><br>"+player.f.furnace.txt
                                            setTimeout(()=>{player.f.furnace.txt="The fire is out.<br><br>"+player.f.furnace.txt;player.f.furnace.t=new Decimal(0)},1000)
                                            }
          else{
            player.f.furnace.story.wait++
            player.f.furnace.txt="You wait for an hour. It feels like an eternity.<br><br>"+player.f.furnace.txt
          }
        }
        if(x==8||x==9){
          player.f.furnace.txt="You need another match. The second clickable has been re-unlocked.<br><br>"+player.f.furnace.txt;
          player.f.furnace.thing++
        }
        if(x==10){
          player.f.furnace.txt="ok fine<br><br>"+player.f.furnace.txt;
          setTimeout(()=>{player.f.furnace.t=new Decimal(30)},1000)
          player.f.furnace.thing++
        }
        if(x==11){
          player.f.furnace.txt="You put your hand into the fire. It feels warm.<br><br>"+player.f.furnace.txt;
          player.f.furnace.t=player.f.furnace.t.add(1)
          if(player.f.furnace.t.eq(37)){
            player.f.furnace.thing++
          }
        }
        if(x==12){
          player.f.furnace.txt="There is a new tab.<br><br>"+player.f.furnace.txt;
            player.f.furnace.thing++
        }
        if(x==13){
          player.f.furnace.txt="It's now slightly more realistic :troll:.<br><br>"+player.f.furnace.txt;
            player.f.furnace.t=player.f.furnace.t.add(10).min(100)
          if(player.f.furnace.t.eq(100))player.f.furnace.thing++
        }
        if(x==14||x==15){
          player.f.furnace.txt="done<br><br>"+player.f.furnace.txt;
          player.f.furnace.thing++
        }
      },
    },
    12:{
      display(){
        let x=player.f.furnace.thing
return getClickable12Display(x)
      },
      canClick(){return player.f.furnace.energy.gte(10)},
      onClick(){
        player.f.furnace.energy=player.f.furnace.energy.sub(10)
        let x=player.f.furnace.thing
        if(x==1){
          player.f.furnace.story.ice--
          if(player.f.furnace.story.ice==0){
            player.f.furnace.txt="You removed 1 ice. There is no ice left.<br><br>"+player.f.furnace.txt
            player.f.furnace.thing++
          }
          else player.f.furnace.txt="You removed 1 ice and there are still "+player.f.furnace.story.ice+" ice remaining.<br><br>"+player.f.furnace.txt
        }
        if(x>2&&x<10){
          player.f.furnace.txt="You found a match!<br><br>"+player.f.furnace.txt
            if(x==3||x==9)player.f.furnace.thing++
          player.f.furnace.story.matches++
        }
      },
      unlocked(){return c12U(player.f.furnace.thing)}
    },
  },
  bars: {
    t: {
        direction: UP,
        width: 50,
        height: 400,
        progress() { return player.f.furnace.t.div(100) },
    },
},
  tabFormat:{
    "Furnace":{
    content:[
      ["display-text",function(){
        return "Your furnace's fire is burning at "+format(player.f.furnace.t)+"°C, which multiplies all types of fome by "+format(fireEffect())
      }],"blank",["display-text",function(){
        return "You have "+format(player.f.furnace.energy)+"/10 energy."
      }],"blank","clickables","blank",
      ["display-text",function(){
        return player.f.furnace.txt
      }],
    ]},
  Fire:{
    content:[["display-text",function(){return "🔥"}],"blank",["bar","t"]],
    unlocked(){return player.f.furnace.thing>=13},
  }
  }
})
function fireEffect(){
  if(player.f.furnace.thing>=16)return player.f.furnace.t.add(1).log10().add(1)
  return player.f.furnace.t.pow(0)
}
function furnaceThing(){
  return true
}
function getClickable12Display(x){
  if(x==1)return "Remove 1 piece of ice"
  if(x>2&&x<10)return "Find something to light a fire with"
}
function c12U(x){
  return([1,3,4,9].includes(x))
}