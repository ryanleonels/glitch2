var c = document.querySelector("canvas")
var ctx = c.getContext("2d");
const targetNode = document.querySelector('textarea');
const callback = (mutationList, observer) => {
  targetNode.value = targetNode.value.replace(/N/g, "ŋ")
  targetNode.value = targetNode.value.replace(/S/g, "ʃ")
  targetNode.value = targetNode.value.replace(/E/g, "ɛ")
  targetNode.value = targetNode.value.replace(/D/g, "ɔ")
  targetNode.value = targetNode.value.replace(/O/g, "ø")
  targetNode.value = targetNode.value.replace(/r/g, "ɾ")
  ctx.clearRect(0,0,c.width,c.height)
  c.width = 100*targetNode.value.split("\n").sort((a,b)=>(a.length<b.length)-0.5)[0].length
  c.height = 100*targetNode.value.split("\n").length
  write(targetNode.value)
};
function pair(e) {
  let temp = e.replace(/[^a|e|i|o|u|ɛ|y|ɔ|ø|"|'|\s]{0,1}[a|e|i|o|u|ɛ|y|ɔ|ø]/g,(a,b,c,d,e,f) => {
    return "||sereperatororer||"+a+"||sereperatororer||"
  }).split("||sereperatororer||").filter(n => n.length>0)
  let temp2 = []
  temp.forEach(n => {
    if(n.length > 2) {
      temp2 = temp2.concat(n.split(""))
      return
    }
    if(['a','e','i','o','u','ɛ','y','ɔ','ø'].includes(n[n.length-1])) {
      temp2.push(n)
      return
    }
    temp2 = temp2.concat(n.split(""))
    return
  })
  return temp2
}
function drawChar(char,offset=0,v=0) {
  switch(char) {
    case "a":
      ctx.beginPath();
      ctx.arc(offset+50, v+15, 4, 0, 2 * Math.PI);
      ctx.fill();
      break;
    case "e":
      ctx.beginPath();
      ctx.moveTo(offset+45, v+20);
      ctx.lineTo(offset+50, v+20-Math.sin(Math.PI*0.333)*10);
      ctx.lineTo(offset+55, v+20);
      ctx.moveTo(offset+45, v+20);
      ctx.fill();
      break;
    case "i":
      ctx.beginPath();
      ctx.moveTo(offset+35, v+20);
      ctx.lineTo(offset+40, v+20-Math.sin(Math.PI*0.333)*10);
      ctx.lineTo(offset+45, v+20);
      ctx.moveTo(offset+35, v+20);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(offset+55, v+20);
      ctx.lineTo(offset+60, v+20-Math.sin(Math.PI*0.333)*10);
      ctx.lineTo(offset+65, v+20);
      ctx.moveTo(offset+55, v+20);
      ctx.fill();
      break;
    case "o":
      ctx.beginPath();
      ctx.moveTo(offset+30, v+20);
      ctx.lineTo(offset+70, v+20);
      ctx.stroke();
      break;
    case "u":
      ctx.beginPath();
      ctx.moveTo(offset+30, v+20);
      ctx.lineTo(offset+70, v+20);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+30, v+15);
      ctx.lineTo(offset+70,v+ 15);
      ctx.stroke();
      break;
    case "ɛ":
      ctx.beginPath();
      ctx.arc(offset+50, v+15, 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(offset+50, v+5, 4, 0, 2 * Math.PI);
      ctx.fill();
      break;
    case "y":
      ctx.beginPath();
      ctx.moveTo(offset+45, v+20);
      ctx.lineTo(offset+45, v+5);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+55, v+20);
      ctx.lineTo(offset+55, v+5);
      ctx.stroke();
      break;
    case "ɔ":
      ctx.beginPath();
      ctx.arc(offset+40, v+15, 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(offset+60, v+15, 4, 0, 2 * Math.PI);
      ctx.fill();
      break;
    case "ø":
      ctx.beginPath();
      ctx.moveTo(offset+45, v+20);
      ctx.lineTo(offset+50, v+20-Math.sin(Math.PI*0.333)*10);
      ctx.lineTo(offset+55, v+20);
      ctx.moveTo(offset+45, v+20);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(offset+45, v+10);
      ctx.lineTo(offset+50, v+10-Math.sin(Math.PI*0.333)*10);
      ctx.lineTo(offset+55, v+10);
      ctx.moveTo(offset+45, v+10);
      ctx.fill();
      break;
    case "place":
      ctx.beginPath();
      ctx.moveTo(offset, v+30);
      ctx.lineTo(offset+100, v+30);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+50, v+30);
      ctx.lineTo(offset+50, v+100);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+35, v+65);
      ctx.lineTo(offset+65, v+65);
      ctx.stroke();
      break;
    case "b":
      ctx.beginPath();
      ctx.moveTo(offset, v+30);
      ctx.lineTo(offset+100, v+30);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+50, v+30);
      ctx.lineTo(offset+50, v+100);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+100, v+30);
      ctx.lineTo(offset+100, v+100);
      ctx.stroke();
      break;
    case "g":
      ctx.beginPath();
      ctx.moveTo(offset, v+30);
      ctx.lineTo(offset+100, v+30);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+50, v+30);
      ctx.lineTo(offset+50, v+85);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(offset+67.5, v+65+17.5, 17.5, 0, 1 * Math.PI);
      ctx.stroke();
      break;
    case "d":
      ctx.beginPath();
      ctx.moveTo(offset, v+30);
      ctx.lineTo(offset+100, v+30);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+50, v+30);
      ctx.lineTo(offset+50, v+75);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+50, v+75);
      ctx.bezierCurveTo(offset+40,v+120,offset+10,v+75,offset+60,v+65);
      ctx.stroke();
      break;
    case "f":
      ctx.beginPath();
      ctx.moveTo(offset, v+30);
      ctx.lineTo(offset+100, v+30);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+35, v+30);
      ctx.lineTo(offset+35, v+100);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+65, v+30);
      ctx.lineTo(offset+65, v+100);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+35, v+65);
      ctx.lineTo(offset+65, v+65);
      ctx.stroke();
      break;
    case "v":
      ctx.beginPath();
      ctx.moveTo(offset, v+30);
      ctx.lineTo(offset+100, v+30);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+60, v+30);
      ctx.lineTo(offset+60, v+85);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(offset+72.5, v+65+17.5, 12.5, 0, 1 * Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+40, v+30);
      ctx.lineTo(offset+40, v+85);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(offset+27.5, v+65+17.5, 12.5, 0, -1 * Math.PI);
      ctx.stroke();
      break;
    case "k":
      ctx.beginPath();
      ctx.moveTo(offset, v+30);
      ctx.lineTo(offset+100, v+30);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+10,v+ 30);
      ctx.lineTo(offset+75, v+50);
      ctx.lineTo(offset+75, v+100);
      ctx.stroke();
      break;
    case "j":
      ctx.beginPath();
      ctx.moveTo(offset, v+30);
      ctx.lineTo(offset+100, v+30);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+50, v+30);
      ctx.lineTo(offset+50, v+90);
      ctx.bezierCurveTo(offset+60,v+110,offset+80,v+85,offset+50,v+70)
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(offset+37.5, v+55, 12.5, 0, 1 * Math.PI);
      ctx.stroke();
      break;
    case "l":
      ctx.beginPath();
      ctx.moveTo(offset, v+30);
      ctx.lineTo(offset+100, v+30);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+50, v+30);
      ctx.lineTo(offset+10, v+100);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+50, v+30);
      ctx.lineTo(offset+90, v+100);
      ctx.stroke();
      break;
    case "m":
      ctx.beginPath();
      ctx.moveTo(offset, v+30);
      ctx.lineTo(offset+100, v+30);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+50, v+30);
      ctx.lineTo(offset+50, v+100);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+35, v+100);
      ctx.lineTo(offset+65, v+100);
      ctx.stroke();
      break;
    case "n":
      ctx.beginPath();
      ctx.moveTo(offset, v+30);
      ctx.lineTo(offset+100, v+30);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+50, v+30);
      ctx.lineTo(offset+50, v+100);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(offset+40,v+77.5,12.5,Math.PI, -Math.PI*1/6)
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(offset+60,v+62.5,12.5,0, Math.PI*5/6)
      ctx.stroke();
      break;
    case "ŋ":
      ctx.beginPath();
      ctx.moveTo(offset, v+30);
      ctx.lineTo(offset+100, v+30);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+50, v+30);
      ctx.lineTo(offset+50, v+100);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+50, v+70);
      ctx.lineTo(offset+30, v+50);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+50, v+70);
      ctx.lineTo(offset+70, v+50);
      ctx.stroke();
      break;
    case "p":
      ctx.beginPath();
      ctx.moveTo(offset, v+30);
      ctx.lineTo(offset+100, v+30);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(offset+50,v+30,15,0,Math.PI)
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+65, v+30);
      ctx.lineTo(offset+65, v+70);
      ctx.quadraticCurveTo(offset+65,v+80,offset+35,v+85);
      ctx.bezierCurveTo(offset+30,v+65,offset+40,v+55,offset+60,v+80);
      ctx.stroke();
      break;
    case "ɾ":
      ctx.beginPath();
      ctx.moveTo(offset, v+30);
      ctx.lineTo(offset+100, v+30);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+35, v+30);
      ctx.lineTo(offset+10, v+100);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+22.5, v+65);
      ctx.lineTo(offset+60, v+65);
      ctx.stroke();
      break;
    case "s":
      ctx.beginPath();
      ctx.moveTo(offset, v+30);
      ctx.lineTo(offset+100, v+30);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+50, v+100);
      ctx.lineTo(offset+10, v+30);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+50, v+100);
      ctx.lineTo(offset+90, v+30);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+50, v+30);
      ctx.lineTo(offset+50, v+50);
      ctx.stroke();
      break;
    case "ʃ":
      ctx.beginPath();
      ctx.moveTo(offset, v+30);
      ctx.lineTo(offset+100, v+30);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+50, v+100);
      ctx.lineTo(offset+10, v+30);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+50, v+100);
      ctx.lineTo(offset+90, v+30);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+30, v+65);
      ctx.lineTo(offset+70, v+65);
      ctx.stroke();
      break;
    case "t":
      ctx.beginPath();
      ctx.moveTo(offset, v+30);
      ctx.lineTo(offset+100, v+30);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+70, v+30);
      ctx.lineTo(offset+70, v+100);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(offset+70,v+30,35,Math.PI*0.5,Math.PI)
      ctx.stroke();
      break;
    case "w":
      ctx.beginPath();
      ctx.moveTo(offset, v+30);
      ctx.lineTo(offset+100, v+30);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+50, v+30);
      ctx.lineTo(offset+50, v+80);
      ctx.bezierCurveTo(offset+55,v+95,offset+80,v+95,offset+90,v+80)
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+50, v+60);
      ctx.lineTo(offset+90, v+60);
      ctx.stroke();
      break;
    case "x":
      ctx.beginPath();
      ctx.moveTo(offset, v+30);
      ctx.lineTo(offset+100, v+30);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+50, v+30);
      ctx.lineTo(offset+50, v+100);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+50,v+65)
      ctx.bezierCurveTo(offset+40,v+65,offset+20,v+73,offset+15,v+85)
      ctx.stroke();
      break;
    case "z":
      ctx.beginPath();
      ctx.moveTo(offset, v+30);
      ctx.lineTo(offset+100, v+30);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+50, v+30);
      ctx.lineTo(offset+50, v+100);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+30, v+30);
      ctx.lineTo(offset+50, v+70);
      ctx.stroke();
      break;
    case "z":
      ctx.beginPath();
      ctx.moveTo(offset, v+30);
      ctx.lineTo(offset+100, v+30);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+50, v+30);
      ctx.lineTo(offset+50, v+100);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+30, v+30);
      ctx.lineTo(offset+50, v+70);
      ctx.stroke();
      break;
    case "h":
      ctx.beginPath();
      ctx.moveTo(offset, v+30);
      ctx.lineTo(offset+100, v+30);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offset+50, v+30);
      ctx.lineTo(offset+50, v+80);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(offset+40, v+80,10,0,Math.PI*2);
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(offset+60, v+80,10,0,Math.PI*2);
      ctx.stroke();
      break;
    case '"1':
      ctx.beginPath();
      ctx.moveTo(offset+50, v+30);
      ctx.lineTo(offset+50, v+100);
      ctx.lineTo(offset+100, v+100);
      ctx.stroke();
      break;
    case '"2':
      ctx.beginPath();
      ctx.moveTo(offset+50, v+30);
      ctx.lineTo(offset+50, v+100);
      ctx.lineTo(offset, v+100);
      ctx.stroke();
      break;
    case "'":
      ctx.beginPath();
      ctx.arc(offset+70, v+40, 15, Math.PI*1.5, Math.PI*0.5);
      ctx.stroke();
      break;
    case ".":
      ctx.beginPath();
      ctx.arc(offset+90, v+80, 10, 0, Math.PI);
      ctx.moveTo(offset+80,v+85)
      ctx.lineTo(offset+80,v+35)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(offset+70, v+35, 10, Math.PI, 0);
      ctx.stroke()
      break;
    case "!":
      ctx.beginPath();
      ctx.arc(offset+90, v+80, 10, 0, Math.PI);
      ctx.moveTo(offset+80,v+85)
      ctx.lineTo(offset+80,v+35)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(offset+70, v+35, 10, Math.PI, 0);
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(offset+70,v+65)
      ctx.lineTo(offset+90,v+35)
      ctx.stroke()
      break;
  }
}
function write(str) {
  ctx.beginPath() 
  ctx.fillStyle = "white"
  ctx.rect(0,0,c.width,c.height)
  ctx.fill()
  ctx.fillStyle = "black"
  let pairs = pair(str)
  let isClosing = false
  let offset = 0
  let v = 0
  pairs.forEach(n => {
    if(n === "\n") {
      v+=100
      offset=0
      return
    }
    if(n === '"') {
      drawChar('"'+(isClosing+1),offset,v)
      offset+=100
      isClosing = !isClosing
      return
    }
    if(['a','e','i','o','u','ɛ','y','ɔ','ø'].includes(n)) {
      drawChar("place",offset,v)
      drawChar(n,offset,v)
      offset+= 100
    } else {
      drawChar(n[0],offset,v)
      if(n.length == 2) drawChar(n[1],offset,v)
      offset+=100
    }
  })
}
// Create an observer instance linked to the callback function
const observer = setInterval(callback);