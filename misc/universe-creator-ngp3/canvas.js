let canvas = get("treeCanvas");
let ctx = canvas.getContext("2d");
function resizeCanvas() {
  canvas.width = 0;
  canvas.height = 0;
  canvas.width = document.body.scrollWidth;
  canvas.height = document.body.scrollHeight;
  drawTree();
}
function drawTreeBranch(name1, name2) {
  if (get("upgradeTree").style.display === "none") return
  
  let start = get("s"+name1).getBoundingClientRect();
  let end = get("s"+name2).getBoundingClientRect();
  let x1 = start.left + (start.width / 2) + (document.documentElement.scrollLeft || document.body.scrollLeft);
  let y1 = start.top + (start.height / 2) + (document.documentElement.scrollTop || document.body.scrollTop);
  let x2 = end.left + (end.width / 2) + (document.documentElement.scrollLeft || document.body.scrollLeft);
  let y2 = end.top + (end.height / 2) + (document.documentElement.scrollTop || document.body.scrollTop);
  ctx.lineWidth=15;
  ctx.beginPath();

  if(player.treeUpgrades.includes("s"+name1) && player.treeUpgrades.includes("s"+name2)) {
    ctx.strokeStyle = "#5AC467";
  } else if (canBuyTreeUpgrade(name1) || canBuyTreeUpgrade(name2)) {
    ctx.strokeStyle = "#443284";
  } else {
    ctx.strokeStyle = "#000055";
  }
  
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}
function drawTree() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTreeBranch("t11", "t21");
  drawTreeBranch("t11", "t22");
  drawTreeBranch("t11", "t23");
  drawTreeBranch("t21", "t31");
  drawTreeBranch("t22", "t31");
  drawTreeBranch("t23", "t31");
  drawTreeBranch("t31", "t41");
  drawTreeBranch("t41", "t51");
  drawTreeBranch("t41", "t52");
  drawTreeBranch("t41", "t53");
  drawTreeBranch("t52", "d1");
  drawTreeBranch("t51", "t61");
  drawTreeBranch("t53", "t62");
  if(player.treeUpgrades.includes("sd1")) {
    drawTreeBranch("d1", "t71");
    drawTreeBranch("t71", "t81");
    drawTreeBranch("t71", "t82");
    drawTreeBranch("t81", "t91");
    drawTreeBranch("t81", "t92");
    drawTreeBranch("t82", "t93");
    drawTreeBranch("t82", "t94");
    drawTreeBranch("t91", "t101");
    drawTreeBranch("t92", "t101");
    drawTreeBranch("t93", "t102");
    drawTreeBranch("t94", "t102");
    drawTreeBranch("t101", "d2");
    drawTreeBranch("t102", "d2");
  }
  if(player.treeUpgrades.includes("sd2")) {
    drawTreeBranch("d2", "t111");
    drawTreeBranch("t111", "t121");
    drawTreeBranch("t111", "t122");
    drawTreeBranch("t111", "t123");
    drawTreeBranch("t121", "t132");
    drawTreeBranch("t123", "t133");
    drawTreeBranch("t132", "t131");
    drawTreeBranch("t133", "t134");
    drawTreeBranch("t131", "a1");
    drawTreeBranch("t134", "a2");
  }
}