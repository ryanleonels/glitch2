var player = {
  upgBlocks: 0,
  prestigeFactor: 1,
  prestigeMul: 1,
  superMoneyFactor: 0,
  superMoney: 0,
  money: 0,
  timer: 3000,
  speed: 3,
  game: 0,
  merged: 0,
  cost: 90, //100
  cost2: 220, //410
  cost3: 2000, //2800
  seconds: 0,
  blockUpgs: 0,
  spawner: 0,
  oneBlock: 0,
  twoBlock: 0,
  threeBlock: 0,
  fourBlock: 0,
  fiveBlock: 0,
  sixBlock: 0,
  sevenBlock: 0,
  eightBlock: 0,
  nineBlock: 0,
  tenBlock: 0,
  elevenBlock: 0,
  twelveBlock: 0,
  thirteenBlock: 0,
  fourteenBlock: 0,
  fifteenBlock: 0,
  sixteenBlock: 0,
  seventeenBlock: 0,
  upgs: 0,
  moreUpgsOne: 22,
  twoUpgs: 0,
  threeUpgs: 0,
  moreUpgsThree: 10,
  twoTimes: 0,
  oneClick: 0,
  twoClick: 0,
  aa: 0, bb: 0, cc: 0, dd: 0, ee: 0, ff: 0, gg: 0, hh: 0, ii: 0, jj: 0, kk: 0, ll: 0, mm: 0, nn: 0, oo: 0, pp: 0, qq: 0, rr: 0, ss: 0, tt: 0, uu: 0, vv: 0, ww: 0, xx: 0, yy: 0, zz: 0,
  aaa: 0, bbb: 0, ccc: 0, ddd: 0, eee: 0, fff: 0, ggg: 0, hhh: 0, iii: 0, jjj: 0, kkk: 0, lll: 0, mmm: 0, nnn: 0, ooo: 0, ppp: 0, qqq: 0, rrr: 0, sss: 0, ttt: 0, uuu: 0, vvv: 0, www: 0, x4x: 0, yyy: 0, zzz: 0,
  aaaa: 0, bbbb: 0, cccc: 0, dddd: 0, eeee: 0, ffff: 0, gggg: 0, hhhh: 0, iiii: 0, jjjj: 0, kkkk: 0, llll: 0, mmmm: 0, nnnn: 0, oooo: 0, pppp: 0, qqqq: 0, rrrr: 0,
  ssss: 0, tttt: 0, uuuu: 0, vvvv: 0, wwww: 0, x44x: 0, yyyy: 0, zzzz: 0, aaaaa: 0, bbbbb: 0, ccccc: 0, ddddd: 0, eeeee: 0, fffff: 0, ggggg: 0, hhhhh: 0, iiiii: 0,
  jjjjj: 0, kkkkk: 0, lllll: 0, mmmmm: 0, nnnnn: 0, ooooo: 0, ppppp: 0, qqqqq: 0, rrrrr: 0, sssss: 0, ttttt: 0,
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  j1: 0, j2: 0, j3: 0, j4: 0, j5: 0, j6: 0, j7: 0, j8: 0, j9: 0, k1: 0, k2: 0, k3: 0, k4: 0, k5: 0, k6: 0, k7: 0, k8: 0, k9: 0, m1: 0, m2: 0, m3: 0, m4: 0, m5: 0, m6: 0, m7: 0, m8: 0, m9: 0, m10: 0,
  n1: 0, n2: 0, n3: 0, n4: 0, n5: 0, n6: 0,
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  n7: 0, n8: 0, n9: 0, n10: 0, o1: 0, o2: 0, o3: 0, o4: 0, o5: 0, o6: 0,
  o7: 0, o8: 0, o9: 0, o10: 0, p1: 0, p2: 0, p3: 0, p4: 0, p5: 0, p6: 0,
  p7: 0, p8: 0, p9: 0, p10: 0, q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0,
  q7: 0, q8: 0, q9: 0, q10: 0, r1: 0, r2: 0, r3: 0, r4: 0, r5: 0, r6: 0,
  r7: 0, r8: 0, r9: 0, r10: 0, s1: 0, s2: 0, s3: 0, s4: 0, s5: 0, s6: 0,
  s7: 0, s8: 0, s9: 0, s10: 0, t1: 0, t2: 0, t3: 0, t4: 0, t5: 0, t6: 0,
  t7: 0, t8: 0, t9: 0, t10: 0, u1: 0, u2: 0, u3: 0, u4: 0, u5: 0, u6: 0,
  u7: 0, u8: 0, u9: 0, u10: 0, v1: 0, v2: 0, v3: 0, v4: 0, v5: 0, v6: 0,
  v7: 0, v8: 0, v9: 0, v10: 0, w1: 0, w2: 0
}

function time(a) {
  if(a < 60) {
    return a + "s";
  }
  if(a > 60 && a < 3600) {
    return Math.floor(a/60) + "m " + Math.floor(a%60) + "s";
  }
  if(a > 3600) {
    return Math.floor(a/3600)+'h '+Math.floor(a/60%60)+'m '+Math.floor(a%60)+'s'
  }
}

function format(a) {
  if(a < 999) {
    return a.toFixed(0);
  }
  if(a > 999 && a < 999999) {
    return Math.floor(a).toLocaleString();
  }
  if(a > 999999 && a < 1e9) {
    return (a/1e6).toFixed(2)+"m";
  }
  if(a > 1e9 && a < 1e12) {
    return (a/1e9).toFixed(2)+"B";
  }
  if(a > 1e12 && a < 1e15) {
    return (a/1e12).toFixed(2)+"T";
  }
  if(a > 1e15 && a < 1e18) {
    return (a/1e15).toFixed(2)+"Qa";
  }
  if(a > 1e18 && a < 1e21) {
    return (a/1e18).toFixed(2)+"Qi";
  }
  if(a > 1e21 && a < 1e24) {
    return (a/1e21).toFixed(2)+"Sx";
  }
  if(a > 1e24 && a < 1e27) {
    return (a/1e24).toFixed(2)+"Sp";
  }
  if(a > 1e27 && a < 1e30) {
    return (a/1e27).toFixed(2)+"Oc";
  }
  if(a > 1e30 && a < 1e33) {
    return (a/1e30).toFixed(2)+"N";
  }
  if(a > 1e33 && a < 1e36) {
    return (a/1e33).toFixed(2)+"Dc";
  }
  if(a > 1e36 && a < 1e39) {
    return (a/1e36).toFixed(2)+"UDc";
  }
  if(a > 1e39 && a < 1e42) {
    return (a/1e39).toFixed(2)+"DDc";
  }
  if(a > 1e42 && a < 1e45) {
    return (a/1e42).toFixed(2)+"TDc";
  }
  if(a > 1e45 && a < 1e48) {
    return (a/1e45).toFixed(2)+"QaDc";
  }
  if(a > 1e48 && a < 1e51) {
    return (a/1e48).toFixed(2)+"QiDc";
  }
  if(a > 1e51 && a < 1e54) {
    return (a/1e51).toFixed(2)+"SxDc";
  }
  if(a > 1e54 && a < 1e57) {
    return (a/1e54).toFixed(2)+"SpDc";
  }
  if(a > 1e57 && a < 1e60) {
    return (a/1e57).toFixed(2)+"OcDc";
  }
  if(a > 1e60 && a < 1e63) {
    return (a/1e60).toFixed(2)+"NDc";
  }
  if(a > 1e63 && a < 1e66) {
    return (a/1e63).toFixed(2)+"Vg";
  }
  if(a > 1e66 && a < 1e69) {
    return (a/1e66).toFixed(2)+"UVg";
  }
  if(a > 1e69 && a < 1e72) {
    return (a/1e69).toFixed(2)+"DVg";
  }
  if(a > 1e72 && a < 1e75) {
    return (a/1e72).toFixed(2)+"TVg";
  }
  if(a > 1e75 && a < 1e78) {
    return (a/1e75).toFixed(2)+"QaVg";
  }
  if(a > 1e78 && a < 1e81) {
    return (a/1e78).toFixed(2)+"QiVg";
  }
  if(a > 1e81 && a < 1e84) {
    return (a/1e81).toFixed(2)+"SxVg";
  }
  if(a > 1e84 && a < 1e87) {
    return (a/1e84).toFixed(2)+"SpVg";
  }
  if(a > 1e87 && a < 1e90) {
    return (a/1e87).toFixed(2)+"OcVg";
  }
  if(a > 1e90 && a < 1e93) {
    return (a/1e90).toFixed(2)+"NVg";
  }
  if(a > 1e93 && a < 1e96) {
    return (a/1e93).toFixed(2)+"Tg";
  }
  if(a > 1e96 && a < 1e99) {
    return (a/1e96).toFixed(2)+"UTg";
  }
  if(a > 1e99 && a < 1e102) {
    return (a/1e99).toFixed(2)+"DTg";
  }
  if(a > 1e102 && a < 1e105) {
    return (a/1e102).toFixed(2)+"TTg";
  }
  if(a > 1e105 && a < 1e108) {
    return (a/1e105).toFixed(2)+"QaTg";
  }
  if(a > 1e108 && a < 1e111) {
    return (a/1e108).toFixed(2)+"QiTg";
  }
  if(a > 1e111 && a < 1e114) {
    return (a/1e111).toFixed(2)+"SxTg";
  }
  if(a > 1e114 && a < 1e117) {
    return (a/1e114).toFixed(2)+"SpTg";
  }
  if(a > 1e117 && a < 1e120) {
    return (a/1e117).toFixed(2)+"OcTg";
  }
  if(a > 1e120 && a < 1e123) {
    return (a/1e120).toFixed(2)+"NTg";
  }
  if(a > 1e123 && a < 1e126) {
    return (a/1e123).toFixed(2)+"Qag";
  }
  if(a > 1e126 && a < 1e129) {
    return (a/1e126).toFixed(2)+"UQag";
  }
  if(a > 1e129 && a < 1e132) {
    return (a/1e129).toFixed(2)+"DQag";
  }
  if(a > 1e132 && a < 1e135) {
    return (a/1e132).toFixed(2)+"TQag";
  }
  if(a > 1e135 && a < 1e138) {
    return (a/1e135).toFixed(2)+"QaQag";
  }
  if(a > 1e138 && a < 1e141) {
    return (a/1e138).toFixed(2)+"QiQag";
  }
  if(a > 1e141 && a < 1e144) {
    return (a/1e141).toFixed(2)+"SxQag";
  }
  if(a > 1e144 && a < 1e147) {
    return (a/1e144).toFixed(2)+"SpQag";
  }
  if(a > 1e147 && a < 1e150) {
    return (a/1e147).toFixed(2)+"OcQag";
  }
  if(a > 1e150 && a < 1e153) {
    return (a/1e150).toFixed(2)+"NQag";
  }
  if(a > 1e153 && a < 1e156) {
    return (a/1e153).toFixed(2)+"Qig";
  }
  if(a > 1e156 && a < 1e159) {
    return (a/1e156).toFixed(2)+"UQig";
  }
  if(a > 1e159 && a < 1e162) {
    return (a/1e159).toFixed(2)+"DQig";
  }
  if(a > 1e162 && a < 1e165) {
    return (a/1e162).toFixed(2)+"TQig";
  }
  if(a > 1e165 && a < 1e168) {
    return (a/1e165).toFixed(2)+"QaQig";
  }
  if(a > 1e168 && a < 1e171) {
    return (a/1e168).toFixed(2)+"QiQig";
  }
  if(a > 1e171 && a < 1e174) {
    return (a/1e171).toFixed(2)+"SxQig";
  }
  if(a > 1e174 && a < 1e177) {
    return (a/1e174).toFixed(2)+"SpQig";
  }
  if(a > 1e177 && a < 1e180) {
    return (a/1e177).toFixed(2)+"OcQig";
  }
  if(a > 1e180 && a < 1e183) {
    return (a/1e180).toFixed(2)+"NQig";
  }
  if(a > 1e183 && a < 1e186) {
    return (a/1e183).toFixed(2)+"Sxg";
  }
  if(a > 1e186 && a < 1e189) {
    return (a/1e186).toFixed(2)+"USxg";
  }
  if(a > 1e189 && a < 1e192) {
    return (a/1e189).toFixed(2)+"DSxg";
  }
  if(a > 1e192 && a < 1e195) {
    return (a/1e192).toFixed(2)+"TSxg";
  }
  if(a > 1e195 && a < 1e198) {
    return (a/1e195).toFixed(2)+"QaSxg";
  }
  if(a > 1e198) {
    return (a/1e198).toFixed(2)+"QiSxg";
  }
}

function kFormat(a) {
  if(a < 999) {
    return a.toFixed(0);
  }
  if(a > 999 && a < 999999) {
    return (a/1000).toFixed(2)+"k";
  }
  if(a > 999999 && a < 1e9) {
    return (a/1e6).toFixed(2)+"m";
  }
  if(a > 1e9 && a < 1e12) {
    return (a/1e9).toFixed(2)+"B";
  }
  if(a > 1e12 && a < 1e15) {
    return (a/1e12).toFixed(2)+"T";
  }
  if(a > 1e15 && a < 1e18) {
    return (a/1e15).toFixed(2)+"Qa";
  }
  if(a > 1e18 && a < 1e21) {
    return (a/1e18).toFixed(2)+"Qi";
  }
  if(a > 1e21 && a < 1e24) {
    return (a/1e21).toFixed(2)+"Sx";
  }
  if(a > 1e24 && a < 1e27) {
    return (a/1e24).toFixed(2)+"Sp";
  }
  if(a > 1e27 && a < 1e30) {
    return (a/1e27).toFixed(2)+"Oc";
  }
  if(a > 1e30 && a < 1e33) {
    return (a/1e30).toFixed(2)+"N";
  }
  if(a > 1e33 && a < 1e36) {
    return (a/1e33).toFixed(2)+"Dc";
  }
  if(a > 1e36 && a < 1e39) {
    return (a/1e36).toFixed(2)+"UDc";
  }
  if(a > 1e39 && a < 1e42) {
    return (a/1e39).toFixed(2)+"DDc";
  }
  if(a > 1e42 && a < 1e45) {
    return (a/1e42).toFixed(2)+"TDc";
  }
  if(a > 1e45 && a < 1e48) {
    return (a/1e45).toFixed(2)+"QaDc";
  }
  if(a > 1e48 && a < 1e51) {
    return (a/1e48).toFixed(2)+"QiDc";
  }
  if(a > 1e51 && a < 1e54) {
    return (a/1e51).toFixed(2)+"SxDc";
  }
  if(a > 1e54 && a < 1e57) {
    return (a/1e54).toFixed(2)+"SpDc";
  }
  if(a > 1e57 && a < 1e60) {
    return (a/1e57).toFixed(2)+"OcDc";
  }
  if(a > 1e60 && a < 1e63) {
    return (a/1e60).toFixed(2)+"NDc";
  }
  if(a > 1e63 && a < 1e66) {
    return (a/1e63).toFixed(2)+"Vg";
  }
  if(a > 1e66 && a < 1e69) {
    return (a/1e66).toFixed(2)+"UVg";
  }
  if(a > 1e69 && a < 1e72) {
    return (a/1e69).toFixed(2)+"DVg";
  }
  if(a > 1e72 && a < 1e75) {
    return (a/1e72).toFixed(2)+"TVg";
  }
  if(a > 1e75 && a < 1e78) {
    return (a/1e75).toFixed(2)+"QaVg";
  }
  if(a > 1e78 && a < 1e81) {
    return (a/1e78).toFixed(2)+"QiVg";
  }
  if(a > 1e81 && a < 1e84) {
    return (a/1e81).toFixed(2)+"SxVg";
  }
  if(a > 1e84 && a < 1e87) {
    return (a/1e84).toFixed(2)+"SpVg";
  }
  if(a > 1e87 && a < 1e90) {
    return (a/1e87).toFixed(2)+"OcVg";
  }
  if(a > 1e90 && a < 1e93) {
    return (a/1e90).toFixed(2)+"NVg";
  }
  if(a > 1e93 && a < 1e96) {
    return (a/1e93).toFixed(2)+"Tg";
  }
  if(a > 1e96 && a < 1e99) {
    return (a/1e96).toFixed(2)+"UTg";
  }
  if(a > 1e99 && a < 1e102) {
    return (a/1e99).toFixed(2)+"DTg";
  }
  if(a > 1e102 && a < 1e105) {
    return (a/1e102).toFixed(2)+"TTg";
  }
  if(a > 1e105 && a < 1e108) {
    return (a/1e105).toFixed(2)+"QaTg";
  }
  if(a > 1e108 && a < 1e111) {
    return (a/1e108).toFixed(2)+"QiTg";
  }
  if(a > 1e111 && a < 1e114) {
    return (a/1e111).toFixed(2)+"SxTg";
  }
  if(a > 1e114 && a < 1e117) {
    return (a/1e114).toFixed(2)+"SpTg";
  }
  if(a > 1e117 && a < 1e120) {
    return (a/1e117).toFixed(2)+"OcTg";
  }
  if(a > 1e120 && a < 1e123) {
    return (a/1e120).toFixed(2)+"NTg";
  }
  if(a > 1e123 && a < 1e126) {
    return (a/1e123).toFixed(2)+"Qag";
  }
  if(a > 1e126 && a < 1e129) {
    return (a/1e126).toFixed(2)+"UQag";
  }
  if(a > 1e129 && a < 1e132) {
    return (a/1e129).toFixed(2)+"DQag";
  }
  if(a > 1e132 && a < 1e135) {
    return (a/1e132).toFixed(2)+"TQag";
  }
  if(a > 1e135 && a < 1e138) {
    return (a/1e135).toFixed(2)+"QaQag";
  }
  if(a > 1e138 && a < 1e141) {
    return (a/1e138).toFixed(2)+"QiQag";
  }
  if(a > 1e141 && a < 1e144) {
    return (a/1e141).toFixed(2)+"SxQag";
  }
  if(a > 1e144 && a < 1e147) {
    return (a/1e144).toFixed(2)+"SpQag";
  }
  if(a > 1e147 && a < 1e150) {
    return (a/1e147).toFixed(2)+"OcQag";
  }
  if(a > 1e150 && a < 1e153) {
    return (a/1e150).toFixed(2)+"NQag";
  }
  if(a > 1e153 && a < 1e156) {
    return (a/1e153).toFixed(2)+"Qig";
  }
  if(a > 1e156 && a < 1e159) {
    return (a/1e156).toFixed(2)+"UQig";
  }
  if(a > 1e159 && a < 1e162) {
    return (a/1e159).toFixed(2)+"DQig";
  }
  if(a > 1e162 && a < 1e165) {
    return (a/1e162).toFixed(2)+"TQig";
  }
  if(a > 1e165 && a < 1e168) {
    return (a/1e165).toFixed(2)+"QaQig";
  }
  if(a > 1e168 && a < 1e171) {
    return (a/1e168).toFixed(2)+"QiQig";
  }
  if(a > 1e171 && a < 1e174) {
    return (a/1e171).toFixed(2)+"SxQig";
  }
  if(a > 1e174 && a < 1e177) {
    return (a/1e174).toFixed(2)+"SpQig";
  }
  if(a > 1e177 && a < 1e180) {
    return (a/1e177).toFixed(2)+"OcQig";
  }
  if(a > 1e180 && a < 1e183) {
    return (a/1e180).toFixed(2)+"NQig";
  }
  if(a > 1e183 && a < 1e186) {
    return (a/1e183).toFixed(2)+"Sxg";
  }
  if(a > 1e186 && a < 1e189) {
    return (a/1e186).toFixed(2)+"USxg";
  }
  if(a > 1e189 && a < 1e192) {
    return (a/1e189).toFixed(2)+"DSxg";
  }
  if(a > 1e192 && a < 1e195) {
    return (a/1e192).toFixed(2)+"TSxg";
  }
  if(a > 1e195 && a < 1e198) {
    return (a/1e195).toFixed(2)+"QaSxg";
  }
  if(a > 1e198) {
    return (a/1e198).toFixed(2)+"QiSxg";
  }
}

function resetGame() {
  if(confirm("Warning: Hard Reset will lose all your gameplay. Are you sure?")) {
    localStorage.removeItem("merge_block");
    location.reload();
  }
}

function save() {
  localStorage.setItem("merge_block", JSON.stringify(player));
}

setInterval(save, 6500);

document.onkeydown = function(e) {
  if(e.keyCode == 123) {
    e.preventDefault();
  }
}

var savegame;

function load() {
  if (localStorage.getItem("merge_block")) {
    savegame = JSON.parse(localStorage.getItem("merge_block"));
    objectToDecimal(savegame);
    merge(player, savegame);
    if(player.upgs < player.moreUpgsOne) {
      document.getElementById("1upg").innerHTML = "Faster Blocks " + player.upgs + "/" + player.moreUpgsOne + " (💰" + kFormat(player.cost) + ")<br>Blocks spawn 100ms faster";
    } else {
      document.getElementById("1upg").innerHTML = "Faster Blocks " + player.upgs + "/" + player.moreUpgsOne + " (Maxed)<br>Blocks spawn 100ms faster";
    }
    if(player.twoUpgs < 195) {
      document.getElementById("2upg").innerHTML = "Better Blocks - " + player.twoUpgs + "/205 (💰" + kFormat(player.cost2) + ")<br>Blocks spawn 1 tier higher";
    } else {
      document.getElementById("2upg").innerHTML = "Better Blocks - " + player.twoUpgs + "/205 (Maxed)<br>Blocks spawn 1 tier higher";
    }
    if(player.threeUpgs < player.moreUpgsThree) {
      try {
        document.getElementById("3upg").innerHTML = "2x Money (" + player.threeUpgs + "/" + player.moreUpgsThree + " (💰" + kFormat(player.cost3) + ")<br>Blocks spawn with 2x more money<br>Currently: " + (player.twoTimes * 100).toFixed(2) + "%";
      } catch (e) {
        alert("Could not load Merging Blocks, please reload or close the console.\nThis is a bug from opening the console, showing the messed graphics from Merge Blocks v1.0.\nThis will be fixed very soon.");
      }
    } else {
      document.getElementById("3upg").innerHTML = "2x Money (" + player.threeUpgs + "/" + player.moreUpgsThree + " (Maxed)<br>Blocks spawn with 2x more money<br>Currently: " + (player.twoTimes * 100).toFixed(2) + "%";
    }
    if(player.oneClick == 1) {
      document.getElementById("costs4").disabled = true;
    }
    if(player.oneClick == 2) {
      document.getElementById("costs5").disabled = true;
    }
  }
  try {
    document.getElementById("statt").innerHTML = "Time Played: " + time(player.game);
    document.getElementById("demo999").innerHTML = "Blocks Unlocked: " + player.upgBlocks + "/217";
  } catch (e) {
    var sss = 0;
    if(sss == 0) {
      sss = 1;
      alert("Don't forget to reload.");
    }
  }
  document.getElementsByClassName("round1")[0].className = "round" + (player.upgBlocks);
  for(var I = 0; I < player.upgBlocks; I++) {
    document.getElementsByClassName("a1")[0].className = "a"+(I + 1);
  }
  mobile();
}

function objectToDecimal(object) {
    for (let i in object) {
        if (typeof(object[i]) == "string" && !isNaN(new Decimal(object[i]).mag) && !(new Decimal(object[i]).sign == 0 && object[i] != "0")) {
            object[i] = new Decimal(object[i]);
        }
        if (typeof(object[i]) == "object") {
            objectToDecimal(object[i]);
        }
    }
}

function merge(base, source) {
    for (let i in base) {
        if (source[i] != undefined) {
            if (typeof(base[i]) == "object" && typeof(source[i]) == "object" && !isDecimal(base[i]) && !isDecimal(source[i])) {
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
    if (x.mag == undefined) {
        return false;
    } else {
        return true;
    }
}

function exportSave() {
  return btoa(JSON.stringify(player));
}

function importSave(a) {
  try {
    savegame = JSON.parse(atob(a));
    objectToDecimal(savegame);
    merge(player, savegame); 
    save();
    document.getElementsByClassName("round1")[0].className = "round" + (player.upgBlocks);
    if(player.upgs < player.moreUpgsOne) {
      document.getElementById("1upg").innerHTML = "Faster Blocks " + player.upgs + "/" + player.moreUpgsOne + " (💰" + kFormat(player.cost) + ")<br>Blocks spawn 100ms faster";
    } else {
      document.getElementById("1upg").innerHTML = "Faster Blocks " + player.upgs + "/" + player.moreUpgsOne + " (Maxed)<br>Blocks spawn 100ms faster";
    }
    if(player.twoUpgs < 120) {
      document.getElementById("2upg").innerHTML = "Better Blocks - " + player.twoUpgs + "/205 (💰" + kFormat(player.cost2) + ")<br>Blocks spawn 1 tier higher";
    } else {
      document.getElementById("2upg").innerHTML = "Better Blocks - " + player.twoUpgs + "/205 (Maxed)<br>Blocks spawn 1 tier higher";
    }
    if(player.threeUpgs < player.moreUpgsThree) {
      try {
        document.getElementById("3upg").innerHTML = "2x Money (" + player.threeUpgs + "/" + player.moreUpgsThree + " (💰" + kFormat(player.cost3) + ")<br>Blocks spawn with 2x more money<br>Currently: " + (player.twoTimes * 100).toFixed(2) + "%";
      } catch (e) {
        alert("Failed to import save!");
      }
    } else {
      document.getElementById("3upg").innerHTML = "2x Money (" + player.threeUpgs + "/" + player.moreUpgsThree + " (Maxed)<br>Blocks spawn with 2x more money<br>Currently: " + (player.twoTimes * 100).toFixed(2) + "%";
    }
    if(player.oneClick == 1) {
      document.getElementById("costs4").disabled = true;
    }
    if(player.oneClick == 2) {
      document.getElementById("costs5").disabled = true;
    }
  } catch (e) {
    alert("Invalid save code!");
  }
}

function restartGame() {
  if(player.money >= 200000) {
    player.money = 0;
    player.upgBlocks = 0;
    player.prestigeMul *= player.prestigeFactor;
    player.cost = 100;
    player.cost2 = 410;
    player.cost3 = 2800;
    player.superMoney += player.superMoneyFactor;
    player.upgs = 0;
    player.twoUpgs = 0;
    player.threeUpgs = 0;
    player.twoTimes = 0;
    player.spawner = 0;
    player.prestigeFactor = 1;
    player.superMoneyFactor = 0;
    player.seconds = 0;
    player.speed = 3;
    player.aa = 0, player.bb = 0, player.cc = 0, player.dd = 0, player.ee = 0, player.ff = 0, player.gg = 0, player.hh = 0, player.ii = 0, player.jj = 0, player.kk = 0, player.ll = 0, player.mm = 0, player.nn = 0, player.oo = 0, player.pp = 0, player.qq = 0, player.rr = 0, player.ss = 0, player.tt = 0, player.uu = 0, player.vv = 0, player.ww = 0, player.xx = 0, player.yy = 0, player.xx = 0, player.aaa = 0, player.bbb = 0, player.ccc = 0, player.ddd = 0, player.eee = 0, player.fff = 0, player.ggg = 0, player.hhh = 0, player.iii = 0, player.jjj = 0, player.kkk = 0, player.lll = 0, player.mmm = 0, player.nnn = 0, player.ooo = 0, player.ppp = 0, player.qqq = 0, player.rrr = 0, player.sss = 0, player.ttt = 0, player.uuu = 0, player.vvv = 0, player.www = 0, player.x4x = 0, player.yyy = 0, player.zzz = 0, player.aaaa = 0, player.bbbb = 0, player.cccc = 0, player.dddd = 0, player.eeee = 0,
      player.ffff = 0, player.gggg = 0, player.hhhh = 0, player.iiii = 0, player.jjjj = 0, player.kkkk = 0, player.llll = 0, player.mmmm = 0, player.nnnn = 0, player.oooo = 0, player.pppp = 0, player.qqqq = 0, player.rrrr = 0, player.ssss = 0, player.tttt = 0, player.uuuu = 0, player.vvvv = 0, player.wwww = 0, player.x44x = 0, player.yyyy = 0, player.zzzz = 0, player.aaaaa = 0, player.bbbbb = 0, player.ccccc = 0, player.ddddd = 0, player.eeeee = 0, player.fffff = 0, player.ggggg = 0, player.hhhhh = 0, player.iiiii = 0,
      player.j1 = 0, player.j2 = 0, player.j3 = 0, player.j4 = 0, player.j5 = 0, player.j6 = 0, player.j7 = 0, player.j8 = 0, player.j9 = 0,
      player.k1 = 0, player.k2 = 0, player.k3 = 0, player.k4 = 0, player.k5 = 0, player.k6 = 0, player.k7 = 0, player.k8 = 0, player.k9 = 0,
      player.m1 = 0, player.m2 = 0, player.m3 = 0, player.m4 = 0, player.m5 = 0, player.m6 = 0, player.m7 = 0, player.m8 = 0, player.m9 = 0,
      player.n1 = 0, player.n2 = 0, player.n3 = 0, player.n4 = 0, player.n5 = 0, player.n6 = 0,
      player.jjjjj = 0, player.kkkkk = 0, player.lllll = 0, player.mmmmm = 0, player.nnnnn = 0, player.ooooo = 0, player.ppppp = 0, player.qqqqq = 0, player.rrrrr = 0, player.sssss = 0, player.ttttt = 0,
      player.n7 = 0, player.n8 = 0, player.n9 = 0, player.n10 = 0, player.o1 = 0, player.o2 = 0, player.o3 = 0, player.o4 = 0, player.o5 = 0, player.o6 = 0,
      player.o7 = 0, player.o8 = 0, player.o9 = 0, player.o10 = 0, player.p1 = 0, player.p2 = 0, player.p3 = 0, player.p4 = 0, player.p5 = 0, player.p6 = 0,
      player.p7 = 0, player.p8 = 0, player.p9 = 0, player.p10 = 0, player.q1 = 0, player.q2 = 0, player.q3 = 0, player.q4 = 0, player.q5 = 0, player.q6 = 0,
      player.q7 = 0, player.q8 = 0, player.q9 = 0, player.q10 = 0, player.r1 = 0, player.r2 = 0, player.r3 = 0, player.r4 = 0, player.r5 = 0, player.r6 = 0,
      player.r7 = 0, player.r8 = 0, player.r9 = 0, player.r10 = 0, player.s1 = 0, player.s2 = 0, player.s3 = 0, player.s4 = 0, player.s5 = 0, player.s6 = 0,
      player.s7 = 0, player.s8 = 0, player.s9 = 0, player.s10 = 0, player.t1 = 0, player.t2 = 0, player.t3 = 0, player.t4 = 0, player.t5 = 0, player.t6 = 0,
      player.t7 = 0, player.t8 = 0, player.t9 = 0, player.t10 = 0, player.u1 = 0, player.u2 = 0, player.u3 = 0, player.u4 = 0, player.u5 = 0, player.u6 = 0,
      player.u7 = 0, player.u8 = 0, player.u9 = 0, player.u10 = 0, player.v1 = 0, player.v2 = 0, player.v3 = 0, player.v4 = 0, player.v5 = 0, player.v6 = 0,
      player.v7 = 0, player.v8 = 0, player.v9 = 0, player.v10 = 0, player.w1 = 0, player.w2 = 0
    save();
    setTimeout(() => {
      location.reload();
    }, 100);
  }
}

setInterval(mobile, 200);

var done = 0;

setInterval(() => {
  player.game++;
}, 1000);

var ddd = "#fff";

setInterval(() => {
  document.getElementById("demo9").innerHTML = "<span style='background-color: #336b2e' color=" + ddd + ">💰" + format(player.money) + "&nbsp&nbsp&nbsp</span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<span style='background-color: #336b2e' color=" + ddd + ">" + time(player.game) + "&nbsp&nbsp&nbsp</span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<span style='background-color: #336b2e'>📦" + player.merged.toLocaleString() + "&nbsp&nbsp&nbsp</span>";
  document.getElementById("merge").innerHTML = "Merge - (" + (player.timer/1000).toFixed(2) + ") | " + player.speed.toFixed(1) + "s";
  document.getElementById("demo10").innerHTML = "<span style='background-color: #336b2e'>💎" + player.superMoney.toFixed(0) + "&nbsp&nbsp&nbsp</span>&nbsp&nbsp&nbsp&nbsp<span style='background-color: #336b2e'>x" + format(player.prestigeMul) + "&nbsp&nbsp&nbsp</span>";
  document.getElementById("statt").innerHTML = "Time Played: " + time(player.game);
  document.getElementById("demo999").innerHTML = "Blocks Unlocked: " + player.upgBlocks + "/217";
  document.getElementById("prestige").innerHTML = "Prestige for 💎" + player.superMoneyFactor.toFixed(0) + " and " + player.prestigeFactor.toFixed(2) + "x more boost";
  if(player.money >= 200000) {
    document.getElementById("prestige").disabled = false;
  } else {
    document.getElementById("prestige").disabled = true;
  }
}, 1);

var ka = 100;

function faster() {
  if(player.money >= player.cost) {
    if(player.upgs < player.moreUpgsOne) {
      player.upgs++;
      player.money -= player.cost;
      if(player.upgs < 22) {
        player.cost *= 1.38;
      } else {
        player.cost *= 6.5;
      }
      player.seconds += ka;
      player.timer -= player.seconds;
      player.speed -= 0.1;
      document.getElementById("1upg").innerHTML = "Faster Blocks " + player.upgs + "/" + player.moreUpgsOne + " (💰" + kFormat(player.cost) + ")<br>Blocks spawn 100ms faster";
    } else {
      document.getElementById("1upg").innerHTML = "Faster Blocks " + player.upgs + "/" + player.moreUpgsOne + " (Maxed)<br>Blocks spawn 100ms faster";
    }
  }
}

function moreFasterUpgs() {
  if(player.superMoney >= 7 && player.oneClick == 0) {
    player.superMoney -= 7;
    player.moreUpgsOne = 30;
    player.oneClick = 1;
    document.getElementById("costs4").disabled = true;
  }
}

function moreDoubleUpgs() {
  if(player.superMoney >= 35 && player.twoClick == 0) {
    player.superMoney -= 35;
    player.moreUpgsThree = 30;
    player.twoClick = 1;
    document.getElementById("costs5").disabled = true;
  }
}

function doubleMoney() {
  if(player.money >= player.cost3) {
    if(player.threeUpgs < player.moreUpgsThree) {
      player.threeUpgs++;
      player.money -= player.cost3;
      player.cost3 *= 3;
      player.twoTimes += 0.02;
      document.getElementById("3upg").innerHTML = "2x Money (" + player.threeUpgs + "/" + player.moreUpgsThree + " (💰" + kFormat(player.cost3) + ")<br>Blocks spawn with 2x more money<br>Currently: " + (player.twoTimes * 100).toFixed(2) + "%";
    } else {
      document.getElementById("3upg").innerHTML = "2x Money (" + player.threeUpgs + "/" + player.moreUpgsThree + " (Maxed)<br>Blocks spawn with 2x more money<br>Currently: " + (player.twoTimes * 100).toFixed(2) + "%";
    }
  }
}

function betterBlock() {
  if(player.money >= player.cost2) {
    if(player.twoUpgs < 205) {
      player.twoUpgs++;
      player.money -= player.cost2;
      if(player.twoUpgs < 20) {
        player.cost2 *= 3.5;
      }
      if(player.twoUpgs == 20) {
        player.cost2 *= 5.5;
      }
      if(player.twoUpgs > 20 && player.twoUpgs < 41) {
        player.cost2 *= 5.5;
      }
      if(player.twoUpgs == 41) {
        player.cost2 *= 10;
      }
      if(player.twoUpgs > 41 && player.twoUpgs < 55) {
        player.cost2 *= 6.5;
      }
      if(player.twoUpgs == 55) {
        player.cost2 *= 12;
      }
      if(player.twoUpgs > 55 && player.twoUpgs < 63) {
        player.cost2 *= 8;
      }
      if(player.twoUpgs == 63) {
        player.cost2 *= 14;
      }
      if(player.twoUpgs > 63 && player.twoUpgs < 74) {
        player.cost2 *= 9;
      }
      if(player.twoUpgs == 74) {
        player.cost2 *= 17;
      }
      if(player.twoUpgs > 74) {
        player.cost2 *= 10;
      }
      player.spawner++;
      document.getElementById("2upg").innerHTML = "Better Blocks - " + player.twoUpgs + "/205 (💰" + kFormat(player.cost2) + ")<br>Blocks spawn 1 tier higher";
    } else {
      document.getElementById("2upg").innerHTML = "Better Blocks - " + player.twoUpgs + "/205 (Maxed)<br>Blocks spawn 1 tier higher";
    }
    if(player.spawner == 1) {
      if(player.aa == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.aa = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round2")[0].className = "round3";
          document.getElementsByClassName("round2")[0].className = "round3";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round2")[0].className = "round3";
            document.getElementsByClassName("round2")[0].className = "round3";
          }, 100);
        }
      }
    }
    if(player.spawner == 2) {
      if(player.bb == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.bb = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round3")[0].className = "round4";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round3")[0].className = "round4";
          }, 100);
        }
      }
    }
    if(player.spawner == 3) {
      if(player.cc == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.cc = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round4")[0].className = "round5";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round4")[0].className = "round5";
          }, 100);
        }
      }
    }
    if(player.spawner == 4) {
      if(player.dd = 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.dd == 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round5")[0].className = "round6";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round5")[0].className = "round6";
          }, 100);
        }
      }
    }
    if(player.spawner == 5) {
      if(player.ee == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.ee = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round6")[0].className = "round7";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round6")[0].className = "round7";
          }, 100);
        }
      }
    }
    if(player.spawner == 6) {
      if(player.ff == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.ff = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round7")[0].className = "round8";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round7")[0].className = "round8";
          }, 100);
        }
      }
    }
    if(player.spawner == 7) {
      if(player.gg == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.gg = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round8")[0].className = "round9";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round8")[0].className = "round9";
          }, 100);
        }
      }
    }
    if(player.spawner == 8) {
      if(player.hh == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.hh = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round9")[0].className = "round10";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round9")[0].className = "round10";
          }, 100);
        }
      }
    }
    if(player.spawner == 9) {
      if(player.ii == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.ii = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round10")[0].className = "round11";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round10")[0].className = "round11";
          }, 100);
        }
      }
    }
    if(player.spawner == 10) {
      if(player.jj == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.jj = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round11")[0].className = "round12";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round11")[0].className = "round12";
          }, 100);
        }
      }
    }
    if(player.spawner == 11) {
      if(player.kk == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.kk = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round12")[0].className = "round13";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round12")[0].className = "round13";
          }, 100);
        }
      }
    }
    if(player.spawner == 12) {
      if(player.ll == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.ll = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round13")[0].className = "round14";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round13")[0].className = "round14";
          }, 100);
        }
      }
    }
    if(player.spawner == 13) {
      if(player.mm == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.mm = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round14")[0].className = "round15";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round14")[0].className = "round15";
          }, 100);
        }
      }
    }
    if(player.spawner == 14) {
      if(player.nn == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.nn = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round15")[0].className = "round16";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round15")[0].className = "round16";
          }, 100);
        }
      }
    }
    if(player.spawner == 15) {
      if(player.oo == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.oo = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round16")[0].className = "round17";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round16")[0].className = "round17";
          }, 100);
        }
      }
    }
    if(player.spawner == 16) {
      if(player.pp == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.pp = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round17")[0].className = "round18";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round17")[0].className = "round18";
          }, 100);
        }
      }
    }
    if(player.spawner == 17) {
      if(player.qq == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.qq = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round18")[0].className = "round19";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round18")[0].className = "round19";
          }, 100);
        }
      }
    }
    if(player.spawner == 18) {
      if(player.rr == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.rr = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round19")[0].className = "round20";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round19")[0].className = "round20";
          }, 100);
        }
      }
    }
    if(player.spawner == 19) {
      if(player.ss == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.ss = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round20")[0].className = "round21";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round20")[0].className = "round21";
          }, 100);
        }
      }
    }
    if(player.spawner == 20) {
      if(player.tt == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.tt = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round21")[0].className = "round22";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round21")[0].className = "round22";
          }, 100);
        }
      }
    }
    if(player.spawner == 21) {
      if(player.uu == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.uu = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round22")[0].className = "round23";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round22")[0].className = "round23";
          }, 100);
        }
      }
    }
    if(player.spawner == 22) {
      if(player.vv == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.vv = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round23")[0].className = "round24";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round23")[0].className = "round24";
          }, 100);
        }
      }
    }
    if(player.spawner == 23) {
      if(player.ww == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.ww = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round24")[0].className = "round25";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round24")[0].className = "round25";
          }, 100);
        }
      }
    }
    if(player.spawner == 24) {
      if(player.xx == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.xx = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round25")[0].className = "round26";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round25")[0].className = "round26";
          }, 100);
        }
      }
    }
    if(player.spawner == 25) {
      if(player.yy == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.yy = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round26")[0].className = "round27";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round26")[0].className = "round27";
          }, 100);
        }
      }
    }
    if(player.spawner == 26) {
      if(player.zz == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.zz = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round27")[0].className = "round28";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round27")[0].className = "round28";
          }, 100);
        }
      }
    }
    if(player.spawner == 27) {
      if(player.aaa == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.aaa = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round28")[0].className = "round29";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round28")[0].className = "round29";
          }, 100);
        }
      }
    }
    if(player.spawner == 28) {
      if(player.bbb == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.bbb = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round29")[0].className = "round30";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round29")[0].className = "round30";
          }, 100);
        }
      }
    }
    if(player.spawner == 29) {
      if(player.ccc == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.ccc = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round30")[0].className = "round31";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round30")[0].className = "round31";
          }, 100);
        }
      }
    }
    if(player.spawner == 30) {
      if(player.ddd == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.ddd = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round31")[0].className = "round32";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round31")[0].className = "round32";
          }, 100);
        }
      }
    }
    if(player.spawner == 31) {
      if(player.eee == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.eee = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round32")[0].className = "round33";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round32")[0].className = "round33";
          }, 100);
        }
      }
    }
    if(player.spawner == 32) {
      if(player.fff == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.fff = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round33")[0].className = "round34";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round33")[0].className = "round34";
          }, 100);
        }
      }
    }
    if(player.spawner == 33) {
      if(player.ggg == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.ggg = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round34")[0].className = "round35";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round34")[0].className = "round35";
          }, 100);
        }
      }
    }
    if(player.spawner == 34) {
      if(player.hhh == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.hhh = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round35")[0].className = "round36";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round35")[0].className = "round36";
          }, 100);
        }
      }
    }
    if(player.spawner == 35) {
      if(player.iii == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.iii = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round36")[0].className = "round37";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round36")[0].className = "round37";
          }, 100);
        }
      }
    }
    if(player.spawner == 36) {
      if(player.jjj == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.jjj = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round37")[0].className = "round38";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round37")[0].className = "round38";
          }, 100);
        }
      }
    }
    if(player.spawner == 37) {
      if(player.kkk == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.kkk = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round38")[0].className = "round39";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round38")[0].className = "round39";
          }, 100);
        }
      }
    }
    if(player.spawner == 38) {
      if(player.lll == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.lll = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round39")[0].className = "round40";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round39")[0].className = "round40";
          }, 100);
        }
      }
    }
    if(player.spawner == 39) {
      if(player.mmm == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.mmm = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round40")[0].className = "round41";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round40")[0].className = "round41";
          }, 100);
        }
      }
    }
    if(player.spawner == 40) {
      if(player.nnn == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.nnn = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round41")[0].className = "round42";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round41")[0].className = "round42";
          }, 100);
        }
      }
    }
    if(player.spawner == 41) {
      if(player.ooo == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.ooo = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round42")[0].className = "round43";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round42")[0].className = "round43";
          }, 100);
        }
      }
    }
    if(player.spawner == 42) {
      if(player.ppp == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.ppp = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round43")[0].className = "round44";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round43")[0].className = "round44";
          }, 100);
        }
      }
    }
    if(player.spawner == 43) {
      if(player.qqq == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.qqq = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round44")[0].className = "round45";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round44")[0].className = "round45";
          }, 100);
        }
      }
    }
    if(player.spawner == 44) {
      if(player.rrr == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.rrr = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round45")[0].className = "round46";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round45")[0].className = "round46";
          }, 100);
        }
      }
    }
    if(player.spawner == 45) {
      if(player.sss == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.sss = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round46")[0].className = "round47";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round46")[0].className = "round47";
          }, 100);
        }
      }
    }
    if(player.spawner == 46) {
      if(player.ttt == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.ttt = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round47")[0].className = "round48";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round47")[0].className = "round48";
          }, 100);
        }
      }
    }
    if(player.spawner == 47) {
      if(player.uuu == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.uuu = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round48")[0].className = "round49";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round48")[0].className = "round49";
          }, 100);
        }
      }
    }
    if(player.spawner == 48) {
      if(player.vvv == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.vvv = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round49")[0].className = "round50";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round49")[0].className = "round50";
          }, 100);
        }
      }
    }
    if(player.spawner == 49) {
      if(player.www == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.www = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round50")[0].className = "round51";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round50")[0].className = "round51";
          }, 100);
        }
      }
    }
    if(player.spawner == 50) {
      if(player.x4x == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.x4x = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round51")[0].className = "round52";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round51")[0].className = "round52";
          }, 100);
        }
      }
    }
    if(player.spawner == 51) {
      if(player.yyy == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.yyy = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round52")[0].className = "round53";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round52")[0].className = "round53";
          }, 100);
        }
      }
    }
    if(player.spawner == 52) {
      if(player.zzz == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.zzz = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round53")[0].className = "round54";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round53")[0].className = "round54";
          }, 100);
        }
      }
    }
    if(player.spawner == 53) {
      if(player.aaaa == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.aaaa = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round54")[0].className = "round55";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round54")[0].className = "round55";
          }, 100);
        }
      }
    }
    if(player.spawner == 54) {
      if(player.bbbb == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.bbbb = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round55")[0].className = "round56";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round55")[0].className = "round56";
          }, 100);
        }
      }
    }
    if(player.spawner == 55) {
      if(player.cccc == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.cccc = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round56")[0].className = "round57";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round56")[0].className = "round57";
          }, 100);
        }
      }
    }
    if(player.spawner == 56) {
      if(player.dddd == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.dddd = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round57")[0].className = "round58";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round57")[0].className = "round58";
          }, 100);
        }
      }
    }
    if(player.spawner == 57) {
      if(player.eeee == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.eeee = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round58")[0].className = "round59";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round58")[0].className = "round59";
          }, 100);
        }
      }
    }
    if(player.spawner == 58) {
      if(player.ffff == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.ffff = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round59")[0].className = "round60";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round59")[0].className = "round60";
          }, 100);
        }
      }
    }
    if(player.spawner == 59) {
      if(player.gggg == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.gggg = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round60")[0].className = "round61";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round60")[0].className = "round61";
          }, 100);
        }
      }
    }
    if(player.spawner == 60) {
      if(player.hhhh == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.hhhh = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round61")[0].className = "round62";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round61")[0].className = "round62";
          }, 100);
        }
      }
    }
    if(player.spawner == 61) {
      if(player.iiii == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.iiii = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round62")[0].className = "round63";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round62")[0].className = "round63";
          }, 100);
        }
      }
    }
    if(player.spawner == 62) {
      if(player.jjjj == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.jjjj = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round63")[0].className = "round64";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round63")[0].className = "round64";
          }, 100);
        }
      }
    }
    if(player.spawner == 63) {
      if(player.kkkk == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.kkkk = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round64")[0].className = "round65";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round64")[0].className = "round65";
          }, 100);
        }
      }
    }
    if(player.spawner == 64) {
      if(player.llll == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.llll = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round65")[0].className = "round66";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round65")[0].className = "round66";
          }, 100);
        }
      }
    }
    if(player.spawner == 65) {
      if(player.mmmm == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.mmmm = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round66")[0].className = "round67";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round66")[0].className = "round67";
          }, 100);
        }
      }
    }
    if(player.spawner == 66) {
      if(player.nnnn == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.nnnn = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round67")[0].className = "round68";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round67")[0].className = "round68";
          }, 100);
        }
      }
    }
    if(player.spawner == 67) {
      if(player.oooo == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.oooo = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round68")[0].className = "round69";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round68")[0].className = "round69";
          }, 100);
        }
      }
    }
    if(player.spawner == 68) {
      if(player.pppp == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.pppp = 1;
      }
      for(var kk = 0; kk <20; kk++) {
        try {
          document.getElementsByClassName("round69")[0].className = "round70";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round69")[0].className = "round70";
          }, 100);
        }
      }
    }
    if(player.spawner == 69) {
      if(player.qqqq == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.qqqq = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round70")[0].className = "round71";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round70")[0].className = "round71";
          }, 100);
        }
      }
    }
    if(player.spawner == 70) {
      if(player.rrrr == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.rrrr = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round71")[0].className = "round72";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round71")[0].className = "round72";
          }, 100);
        }
      }
    }
    if(player.spawner == 71) {
      if(player.ssss == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.ssss = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round72")[0].className = "round73";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round72")[0].className = "round73";
          }, 100);
        }
      }
    }
    if(player.spawner == 72) {
      if(player.tttt == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.tttt = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round73")[0].className = "round74";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round73")[0].className = "round74";
          }, 100);
        }
      }
    }
    if(player.spawner == 73) {
      if(player.uuuu == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.uuuu = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round74")[0].className = "round75";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round74")[0].className = "round75";
          }, 100);
        }
      }
    }
    if(player.spawner == 74) {
      if(player.vvvv == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.vvvv = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round75")[0].className = "round76";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round75")[0].className = "round76";
          }, 100);
        }
      }
    }
    if(player.spawner == 75) {
      if(player.wwww == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.wwww = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round76")[0].className = "round77";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round76")[0].className = "round77";
          }, 100);
        }
      }
    }
    if(player.spawner == 76) {
      if(player.x44x == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.x44x = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round77")[0].className = "round78";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round77")[0].className = "round78";
          }, 100);
        }
      }
    }
    if(player.spawner == 77) {
      if(player.yyyy == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.yyyy = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round78")[0].className = "round79";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round78")[0].className = "round79";
          }, 100);
        }
      }
    }
    if(player.spawner == 78) {
      if(player.zzzz == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.zzzz = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round79")[0].className = "round80";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round79")[0].className = "round80";
          }, 100);
        }
      }
    }
    if(player.spawner == 79) {
      if(player.aaaaa == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.aaaaa = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round80")[0].className = "round81";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round80")[0].className = "round81";
          }, 100);
        }
      }
    }
    if(player.spawner == 80) {
      if(player.bbbbb == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.bbbbb = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round81")[0].className = "round82";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round81")[0].className = "round82";
          }, 100);
        }
      }
    }
    if(player.spawner == 81) {
      if(player.ccccc == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.ccccc = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round82")[0].className = "round83";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round82")[0].className = "round83";
          }, 100);
        }
      }
    }
    if(player.spawner == 82) {
      if(player.ddddd == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.ddddd = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round83")[0].className = "round84";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round83")[0].className = "round84";
          }, 100);
        }
      }
    }
    if(player.spawner == 83) {
      if(player.eeeee == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.eeeee = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round84")[0].className = "round85";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round84")[0].className = "round85";
          }, 100);
        }
      }
    }
    if(player.spawner == 84) {
      if(player.fffff == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.fffff = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round85")[0].className = "round86";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round85")[0].className = "round86";
          }, 100);
        }
      }
    }
    if(player.spawner == 85) {
      if(player.ggggg == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.ggggg = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round86")[0].className = "round87";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round86")[0].className = "round87";
          }, 100);
        }
      }
    }
    if(player.spawner == 86) {
      if(player.hhhhh == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.hhhhh = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round87")[0].className = "round88";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round87")[0].className = "round88";
          }, 100);
        }
      }
    }
    if(player.spawner == 87) {
      if(player.iiiii == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.iiiii = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round88")[0].className = "round89";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round88")[0].className = "round89";
          }, 100);
        }
      }
    }
    if(player.spawner == 88) {
      if(player.j1 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.j1 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round89")[0].className = "round90";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round89")[0].className = "round90";
          }, 100);
        }
      }
    }
    if(player.spawner == 89) {
      if(player.j2 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.j2 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round90")[0].className = "round91";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round90")[0].className = "round91";
          }, 100);
        }
      }
    }
    if(player.spawner == 90) {
      if(player.j3 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.j3 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round91")[0].className = "round92";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round91")[0].className = "round92";
          }, 100);
        }
      }
    }
    if(player.spawner == 91) {
      if(player.j4 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.j4 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round92")[0].className = "round93";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round92")[0].className = "round93";
          }, 100);
        }
      }
    }
    if(player.spawner == 92) {
      if(player.j5 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.j5 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round93")[0].className = "round94";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round93")[0].className = "round94";
          }, 100);
        }
      }
    }
    if(player.spawner == 93) {
      if(player.j6 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.j6 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round94")[0].className = "round95";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round94")[0].className = "round95";
          }, 100);
        }
      }
    }
    if(player.spawner == 94) {
      if(player.j7 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.j7 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round95")[0].className = "round96";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round95")[0].className = "round96";
          }, 100);
        }
      }
    }
    if(player.spawner == 95) {
      if(player.j8 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.j8 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round96")[0].className = "round97";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round96")[0].className = "round97";
          }, 100);
        }
      }
    }
    if(player.spawner == 96) {
      if(player.j9 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.j9 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round97")[0].className = "round98";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round97")[0].className = "round98";
          }, 100);
        }
      }
    }
    if(player.spawner == 97) {
      if(player.k1 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.k1 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round98")[0].className = "round99";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round98")[0].className = "round99";
          }, 100);
        }
      }
    }
    if(player.spawner == 98) {
      if(player.k2 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.k2 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round99")[0].className = "round100";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round99")[0].className = "round100";
          }, 100);
        }
      }
    }
    if(player.spawner == 99) {
      if(player.k3 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.k3 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round100")[0].className = "round101";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round100")[0].className = "round101";
          }, 100);
        }
      }
    }
    if(player.spawner == 100) {
      if(player.k4 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.k4 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round101")[0].className = "round102";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round101")[0].className = "round102";
          }, 100);
        }
      }
    }
    if(player.spawner == 101) {
      if(player.k5 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.k5 = 1;
      }
      for(var kk = 0; kk <20; kk++) {
        try {
          document.getElementsByClassName("round102")[0].className = "round103";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round102")[0].className = "round103";
          }, 100);
        }
      }
    }
    if(player.spawner == 102) {
      if(player.k6 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.k6 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round103")[0].className = "round104";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round103")[0].className = "round104";
          }, 100);
        }
      }
    }
    if(player.spawner == 103) {
      if(player.k7 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.k7 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round104")[0].className = "round105";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round104")[0].className = "round105";
          }, 100);
        }
      }
    }
    if(player.spawner == 104) {
      if(player.k8 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.k8 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round105")[0].className = "round106";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round105")[0].className = "round106";
          }, 100);
        }
      }
    }
    if(player.spawner == 105) {
      if(player.k9 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.k9 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round106")[0].className = "round107";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round106")[0].className = "round107";
          }, 100);
        }
      }
    }
    if(player.spawner == 106) {
      if(player.m1 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.m1 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round107")[0].className = "round108";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round107")[0].className = "round108";
          }, 100);
        }
      }
    }
    if(player.spawner == 107) {
      if(player.m2 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.m2 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round108")[0].className = "round109";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round108")[0].className = "round109";
          }, 100);
        }
      }
    }
    if(player.spawner == 108) {
      if(player.m3 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.m3 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round109")[0].className = "round110";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round109")[0].className = "round110";
          }, 100);
        }
      }
    }
    if(player.spawner == 109) {
      if(player.m4 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.m4 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round110")[0].className = "round111";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round110")[0].className = "round111";
          }, 100);
        }
      }
    }
    if(player.spawner == 110) {
      if(player.m5 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.m5 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round1111")[0].className = "round112";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round111")[0].className = "round112";
          }, 100);
        }
      }
    }
    if(player.spawner == 111) {
      if(player.m6 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.m6 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round112")[0].className = "round113";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round112")[0].className = "round113";
          }, 100);
        }
      }
    }
    if(player.spawner == 112) {
      if(player.m7 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.m7 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round113")[0].className = "round114";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round113")[0].className = "round114";
          }, 100);
        }
      }
    }
    if(player.spawner == 113) {
      if(player.m8 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.m8 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round114")[0].className = "round115";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round114")[0].className = "round115";
          }, 100);
        }
      }
    }
    if(player.spawner == 114) {
      if(player.m9 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.m9 = 1;
      }
      for(var kk = 0; kk <20; kk++) {
        try {
          document.getElementsByClassName("round115")[0].className = "round116";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round115")[0].className = "round116";
          }, 100);
        }
      }
    }
    if(player.spawner == 115) {
      if(player.m10 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.m10 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round116")[0].className = "round117";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round116")[0].className = "round117";
          }, 100);
        }
      }
    }
    if(player.spawner == 116) {
      if(player.n1 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.n1 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round117")[0].className = "round118";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round117")[0].className = "round118";
          }, 100);
        }
      }
    }
    if(player.spawner == 117) {
      if(player.n2 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.n2 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round118")[0].className = "round119";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round118")[0].className = "round119";
          }, 100);
        }
      }
    }
    if(player.spawner == 118) {
      if(player.n3 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.n3 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round119")[0].className = "round120";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round119")[0].className = "round120";
          }, 100);
        }
      }
    }
    if(player.spawner == 119) {
      if(player.n4 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.n4 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round120")[0].className = "round121";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round120")[0].className = "round121";
          }, 100);
        }
      }
    }
    if(player.spawner == 120) {
      if(player.n5 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.n5 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round121")[0].className = "round122";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round121")[0].className = "round122";
          }, 100);
        }
      }
    }
    if(player.spawner == 121) {
      if(player.n6 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.n6 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round122")[0].className = "round123";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round122")[0].className = "round123";
          }, 100);
        }
      }
    }
    if(player.spawner == 122) {
      if(player.n7 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.n7 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round123")[0].className = "round124";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round123")[0].className = "round124";
          }, 100);
        }
      }
    }
    if(player.spawner == 123) {
      if(player.n8 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.n8 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round124")[0].className = "round125";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round124")[0].className = "round125";
          }, 100);
        }
      }
    }
    if(player.spawner == 124) {
      if(player.n9 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.n9 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round125")[0].className = "round126";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round125")[0].className = "round126";
          }, 100);
        }
      }
    }
    if(player.spawner == 125) {
      if(player.n10 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.n10 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round126")[0].className = "round127";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round126")[0].className = "round127";
          }, 100);
        }
      }
    }
    if(player.spawner == 126) {
      if(player.o1 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.o1 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round127")[0].className = "round128";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round127")[0].className = "round128";
          }, 100);
        }
      }
    }
    if(player.spawner == 127) {
      if(player.o2 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.o2 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round128")[0].className = "round129";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round128")[0].className = "round129";
          }, 100);
        }
      }
    }
    if(player.spawner == 128) {
      if(player.o3 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.o3 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round129")[0].className = "round130";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round129")[0].className = "round130";
          }, 100);
        }
      }
    }
    if(player.spawner == 129) {
      if(player.o4 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.o4 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round130")[0].className = "round131";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round130")[0].className = "round131";
          }, 100);
        }
      }
    }
    if(player.spawner == 130) {
      if(player.o5 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.o5 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round131")[0].className = "round132";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round131")[0].className = "round132";
          }, 100);
        }
      }
    }
    if(player.spawner == 131) {
      if(player.o6 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.o6 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round132")[0].className = "round133";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round132")[0].className = "round133";
          }, 100);
        }
      }
    }
    if(player.spawner == 132) {
      if(player.o7 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.o7 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round133")[0].className = "round134";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round133")[0].className = "round134";
          }, 100);
        }
      }
    }
    if(player.spawner == 133) {
      if(player.o8 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.o8 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round134")[0].className = "round135";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round134")[0].className = "round135";
          }, 100);
        }
      }
    }
    if(player.spawner == 134) {
      if(player.o9 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.o9 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round135")[0].className = "round136";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round135")[0].className = "round136";
          }, 100);
        }
      }
    }
    if(player.spawner == 135) {
      if(player.o10 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.o10 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round136")[0].className = "round137";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round136")[0].className = "round137";
          }, 100);
        }
      }
    }
    if(player.spawner == 136) {
      if(player.p1 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.p1 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round137")[0].className = "round138";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round137")[0].className = "round138";
          }, 100);
        }
      }
    }
    if(player.spawner == 137) {
      if(player.p2 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.p2 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round138")[0].className = "round139";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round138")[0].className = "round139";
          }, 100);
        }
      }
    }
    if(player.spawner == 138) {
      if(player.p3 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.p3 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round139")[0].className = "round140";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round139")[0].className = "round140";
          }, 100);
        }
      }
    }
    if(player.spawner == 139) {
      if(player.p4 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.p4 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round140")[0].className = "round141";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round140")[0].className = "round141";
          }, 100);
        }
      }
    }
    if(player.spawner == 140) {
      if(player.p5 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.p5 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round141")[0].className = "round142";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round141")[0].className = "round142";
          }, 100);
        }
      }
    }
    if(player.spawner == 141) {
      if(player.p6 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.p6 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round142")[0].className = "round143";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round142")[0].className = "round143";
          }, 100);
        }
      }
    }
    if(player.spawner == 142) {
      if(player.p7 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.p7 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round143")[0].className = "round144";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round143")[0].className = "round144";
          }, 100);
        }
      }
    }
    if(player.spawner == 143) {
      if(player.p8 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.p8 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round144")[0].className = "round145";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round144")[0].className = "round145";
          }, 100);
        }
      }
    }
    if(player.spawner == 144) {
      if(player.p9 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.p9 = 1;
      }
      for(var kk = 0; kk <20; kk++) {
        try {
          document.getElementsByClassName("round145")[0].className = "round146";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round145")[0].className = "round146";
          }, 100);
        }
      }
    }
    if(player.spawner == 145) {
      if(player.p10 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.p10 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round146")[0].className = "round147";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round146")[0].className = "round147";
          }, 100);
        }
      }
    }
    if(player.spawner == 146) {
      if(player.q1 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.q1 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round147")[0].className = "round148";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round147")[0].className = "round148";
          }, 100);
        }
      }
    }
    if(player.spawner == 147) {
      if(player.q2 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.q2 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round148")[0].className = "round149";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round148")[0].className = "round149";
          }, 100);
        }
      }
    }
    if(player.spawner == 148) {
      if(player.q3 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.q3 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round149")[0].className = "round150";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round149")[0].className = "round150";
          }, 100);
        }
      }
    }
    if(player.spawner == 149) {
      if(player.q4 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.q4 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round150")[0].className = "round151";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round150")[0].className = "round151";
          }, 100);
        }
      }
    }
    if(player.spawner == 150) {
      if(player.q5 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.q5 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round151")[0].className = "round152";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round151")[0].className = "round152";
          }, 100);
        }
      }
    }
    if(player.spawner == 151) {
      if(player.q6 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.q6 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round152")[0].className = "round153";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round152")[0].className = "round153";
          }, 100);
        }
      }
    }
    if(player.spawner == 152) {
      if(player.q7 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.q7 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round153")[0].className = "round154";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round153")[0].className = "round154";
          }, 100);
        }
      }
    }
    if(player.spawner == 153) {
      if(player.q8 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.q8 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round154")[0].className = "round155";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round154")[0].className = "round155";
          }, 100);
        }
      }
    }
    if(player.spawner == 154) {
      if(player.q9 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.q9 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round155")[0].className = "round156";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round155")[0].className = "round156";
          }, 100);
        }
      }
    }
    if(player.spawner == 155) {
      if(player.q10 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.q10 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round156")[0].className = "round157";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round156")[0].className = "round157";
          }, 100);
        }
      }
    }
    if(player.spawner == 156) {
      if(player.r1 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.r1 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round157")[0].className = "round158";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round157")[0].className = "round158";
          }, 100);
        }
      }
    }
    if(player.spawner == 157) {
      if(player.r2 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.r2 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round158")[0].className = "round159";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round158")[0].className = "round159";
          }, 100);
        }
      }
    }
    if(player.spawner == 158) {
      if(player.r3 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.r3 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round159")[0].className = "round160";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round159")[0].className = "round160";
          }, 100);
        }
      }
    }
    if(player.spawner == 159) {
      if(player.r4 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.r4 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round160")[0].className = "round161";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round160")[0].className = "round161";
          }, 100);
        }
      }
    }
    if(player.spawner == 160) {
      if(player.r5 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.r5 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round161")[0].className = "round162";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round161")[0].className = "round162";
          }, 100);
        }
      }
    }
    if(player.spawner == 161) {
      if(player.r6 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.r6 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round162")[0].className = "round163";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round162")[0].className = "round163";
          }, 100);
        }
      }
    }
    if(player.spawner == 162) {
      if(player.r7 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.r7 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round163")[0].className = "round164";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round163")[0].className = "round164";
          }, 100);
        }
      }
    }
    if(player.spawner == 163) {
      if(player.r8 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.r8 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round164")[0].className = "round165";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round164")[0].className = "round165";
          }, 100);
        }
      }
    }
    if(player.spawner == 164) {
      if(player.r9 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.r9 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round165")[0].className = "round166";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round165")[0].className = "round166";
          }, 100);
        }
      }
    }
    if(player.spawner == 165) {
      if(player.r10 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.r10 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round166")[0].className = "round167";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round166")[0].className = "round167";
          }, 100);
        }
      }
    }
    if(player.spawner == 166) {
      if(player.s1 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.s1 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round167")[0].className = "round168";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round167")[0].className = "round168";
          }, 100);
        }
      }
    }
    if(player.spawner == 167) {
      if(player.s2 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.s2 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round168")[0].className = "round169";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round168")[0].className = "round169";
          }, 100);
        }
      }
    }
    if(player.spawner == 168) {
      if(player.s3 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.s3 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round169")[0].className = "round170";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round169")[0].className = "round170";
          }, 100);
        }
      }
    }
    if(player.spawner == 169) {
      if(player.s4 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.s4 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round170")[0].className = "round171";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round170")[0].className = "round171";
          }, 100);
        }
      }
    }
    if(player.spawner == 170) {
      if(player.s5 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.s5 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round171")[0].className = "round172";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round171")[0].className = "round172";
          }, 100);
        }
      }
    }
    if(player.spawner == 171) {
      if(player.s6 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.s6 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round172")[0].className = "round173";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round172")[0].className = "round173";
          }, 100);
        }
      }
    }
    if(player.spawner == 172) {
      if(player.s7 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.s7 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round173")[0].className = "round174";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round173")[0].className = "round174";
          }, 100);
        }
      }
    }
    if(player.spawner == 173) {
      if(player.s8 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.s8 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round174")[0].className = "round175";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round174")[0].className = "round175";
          }, 100);
        }
      }
    }
    if(player.spawner == 174) {
      if(player.s9 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.s9 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round175")[0].className = "round176";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round175")[0].className = "round176";
          }, 100);
        }
      }
    }
    if(player.spawner == 175) {
      if(player.s10 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.s10 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round176")[0].className = "round177";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round176")[0].className = "round177";
          }, 100);
        }
      }
    }
    if(player.spawner == 176) {
      if(player.t1 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.t1 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round177")[0].className = "round178";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round177")[0].className = "round178";
          }, 100);
        }
      }
    }
    if(player.spawner == 177) {
      if(player.t2 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.t2 = 1;
      }
      for(var kk = 0; kk <20; kk++) {
        try {
          document.getElementsByClassName("round178")[0].className = "round179";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round178")[0].className = "round179";
          }, 100);
        }
      }
    }
    if(player.spawner == 178) {
      if(player.t3 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.t3 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round179")[0].className = "round180";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round179")[0].className = "round180";
          }, 100);
        }
      }
    }
    if(player.spawner == 179) {
      if(player.t4 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.t4 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round180")[0].className = "round181";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round180")[0].className = "round181";
          }, 100);
        }
      }
    }
    if(player.spawner == 180) {
      if(player.t5 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.t5 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round181")[0].className = "round182";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round181")[0].className = "round182";
          }, 100);
        }
      }
    }
    if(player.spawner == 181) {
      if(player.t6 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.t6 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round182")[0].className = "round183";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round182")[0].className = "round183";
          }, 100);
        }
      }
    }
    if(player.spawner == 182) {
      if(player.t7 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.t7 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round183")[0].className = "round184";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round183")[0].className = "round184";
          }, 100);
        }
      }
    }
    if(player.spawner == 183) {
      if(player.t8 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.t8 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round184")[0].className = "round185";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round184")[0].className = "round185";
          }, 100);
        }
      }
    }
    if(player.spawner == 184) {
      if(player.t9 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.t9 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round185")[0].className = "round186";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round185")[0].className = "round186";
          }, 100);
        }
      }
    }
    if(player.spawner == 185) {
      if(player.t10 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.t10 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round186")[0].className = "round187";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round186")[0].className = "round187";
          }, 100);
        }
      }
    }
    if(player.spawner == 186) {
      if(player.u1 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.u1 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round187")[0].className = "round188";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round187")[0].className = "round188";
          }, 100);
        }
      }
    }
    if(player.spawner == 187) {
      if(player.u2 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.u2 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round188")[0].className = "round189";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round188")[0].className = "round189";
          }, 100);
        }
      }
    }
    if(player.spawner == 188) {
      if(player.u3 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.u3 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round189")[0].className = "round190";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round189")[0].className = "round190";
          }, 100);
        }
      }
    }
    if(player.spawner == 189) {
      if(player.u4 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.u4 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round190")[0].className = "round191";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round190")[0].className = "round191";
          }, 100);
        }
      }
    }
    if(player.spawner == 190) {
      if(player.u5 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.u5 = 1;
      }
      for(var kk = 0; kk <20; kk++) {
        try {
          document.getElementsByClassName("round191")[0].className = "round192";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round191")[0].className = "round192";
          }, 100);
        }
      }
    }
    if(player.spawner == 191) {
      if(player.u6 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.u6 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round192")[0].className = "round193";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round192")[0].className = "round193";
          }, 100);
        }
      }
    }
    if(player.spawner == 192) {
      if(player.u7 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.u7 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round193")[0].className = "round194";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round193")[0].className = "round194";
          }, 100);
        }
      }
    }
    if(player.spawner == 193) {
      if(player.u8 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.u8 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round194")[0].className = "round195";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round194")[0].className = "round195";
          }, 100);
        }
      }
    }
    if(player.spawner == 194) {
      if(player.u9 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.u9 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round195")[0].className = "round196";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round195")[0].className = "round196";
          }, 100);
        }
      }
    }
    if(player.spawner == 195) {
      if(player.u10 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.u10 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round196")[0].className = "round197";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round196")[0].className = "round197";
          }, 100);
        }
      }
    }
    if(player.spawner == 196) {
      if(player.v1 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.v1 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round197")[0].className = "round198";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round197")[0].className = "round198";
          }, 100);
        }
      }
    }
    if(player.spawner == 197) {
      if(player.v2 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.v2 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round198")[0].className = "round199";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round198")[0].className = "round199";
          }, 100);
        }
      }
    }
    if(player.spawner == 198) {
      if(player.v3 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.v3 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round199")[0].className = "round200";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round199")[0].className = "round200";
          }, 100);
        }
      }
    }
    if(player.spawner == 199) {
      if(player.v4 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.v4 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round200")[0].className = "round201";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round200")[0].className = "round201";
          }, 100);
        }
      }
    }
    if(player.spawner == 200) {
      if(player.v5 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.v5 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round201")[0].className = "round202";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round201")[0].className = "round202";
          }, 100);
        }
      }
    }
    if(player.spawner == 201) {
      if(player.v6 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.v6 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round202")[0].className = "round203";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round202")[0].className = "round203";
          }, 100);
        }
      }
    }
    if(player.spawner == 202) {
      if(player.v7 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.v7 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round203")[0].className = "round204";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round203")[0].className = "round204";
          }, 100);
        }
      }
    }
    if(player.spawner == 203) {
      if(player.v8 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.v8 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round204")[0].className = "round205";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round204")[0].className = "round205";
          }, 100);
        }
      }
    }
    if(player.spawner == 204) {
      if(player.v9 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.v9 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round205")[0].className = "round206";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round205")[0].className = "round206";
          }, 100);
        }
      }
    }
    if(player.spawner == 205) {
      if(player.v10 == 0) {
        player.upgBlocks++;
        document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
        player.v10 = 1;
      }
      for(var kk = 0; kk < 20; kk++) {
        try {
          document.getElementsByClassName("round206")[0].className = "round207";
        } catch (e) {
          setTimeout(() => {
            document.getElementsByClassName("round206")[0].className = "round207";
          }, 100);
        }
      }
    }
  }
}

function one() {
  if(player.spawner == 0) {
    if(player.aa == 0) {
      player.aa = 1;
      player.upgBlocks++;
      document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    }
    document.getElementsByClassName("round1")[0].className = "round2";
    if(Math.random() < player.twoTimes) {
      player.money += 2 * player.prestigeMul;
    } else {
      player.money += 1 * player.prestigeMul;
    }
  }
  if(player.spawner == 1) {
    document.getElementsByClassName("round1")[0].className = "round3";
    if(Math.random() < player.twoTimes) {
      player.money += 6 * player.prestigeMul;
    } else {
      player.money += 3 * player.prestigeMul;
    }
  }
  if(player.spawner == 2) {
    document.getElementsByClassName("round1")[0].className = "round4";
    if(Math.random() < player.twoTimes) {
      player.money += 12 * player.prestigeMul;
    } else {
      player.money += 6 * player.prestigeMul;
    }
  }
  if(player.spawner == 3) {
    document.getElementsByClassName("round1")[0].className = "round5";
    if(Math.random() < player.twoTimes) {
      player.money += 24 * player.prestigeMul;
    } else {
      player.money += 12 * player.prestigeMul;
    }
  }
  if(player.spawner == 4) {
    document.getElementsByClassName("round1")[0].className = "round6";
    if(Math.random() < player.twoTimes) {
      player.money += 48 * player.prestigeMul;
    } else {
      player.money += 24 * player.prestigeMul;
    }
  }
  if(player.spawner == 5) {
    document.getElementsByClassName("round1")[0].className = "round7";
    if(Math.random() < player.twoTimes) {
      player.money += 96 * player.prestigeMul;
    } else {
      player.money += 48 * player.prestigeMul;
    }
  }
  if(player.spawner == 6) {
    document.getElementsByClassName("round1")[0].className = "round8";
    if(Math.random() < player.twoTimes) {
      player.money += 192 * player.prestigeMul;
    } else {
      player.money += 96 * player.prestigeMul;
    }
  }
  if(player.spawner == 7) {
    document.getElementsByClassName("round1")[0].className = "round9";
    if(Math.random() < player.twoTimes) {
      player.money += 384 * player.prestigeMul;
    } else {
      player.money += 192 * player.prestigeMul;
    }
  }
  if(player.spawner == 8) {
    document.getElementsByClassName("round1")[0].className = "round10";
    if(Math.random() < player.twoTimes) {
      player.money += 768 * player.prestigeMul;
    } else {
      player.money += 384 * player.prestigeMul;
    }
  }
  if(player.spawner == 9) {
    document.getElementsByClassName("round1")[0].className = "round11";
    if(Math.random() < player.twoTimes) {
      player.money += 1536 * player.prestigeMul;
    } else {
      player.money += 768 * player.prestigeMul;
    }
  }
  if(player.spawner == 10) {
    document.getElementsByClassName("round1")[0].className = "round12";
    if(Math.random() < player.twoTimes) {
      player.money += 3072 * player.prestigeMul;
    } else {
      player.money += 1536 * player.prestigeMul;
    }
  }
  if(player.spawner == 11) {
    document.getElementsByClassName("round1")[0].className = "round13";
    if(Math.random() < player.twoTimes) {
      player.money += 5600 * player.prestigeMul;
    } else {
      player.money += 2800 * player.prestigeMul;
    }
  }
  if(player.spawner == 12) {
    document.getElementsByClassName("round1")[0].className = "round14";
    if(Math.random() < player.twoTimes) {
      player.money += 9000 * player.prestigeMul;
    } else {
      player.money += 4500 * player.prestigeMul;
    }
  }
  if(player.spawner == 13) {
    document.getElementsByClassName("round1")[0].className = "round15";
    if(Math.random() < player.twoTimes) {
      player.money += 13600 * player.prestigeMul;
    } else {
      player.money += 6800 * player.prestigeMul;
    }
  }
  if(player.spawner == 14) {
    document.getElementsByClassName("round1")[0].className = "round16";
    if(Math.random() < player.twoTimes) {
      player.money += 24000 * player.prestigeMul;
    } else {
      player.money += 12000 * player.prestigeMul;
    }
  }
  if(player.spawner == 15) {
    document.getElementsByClassName("round1")[0].className = "round17";
    if(Math.random() < player.twoTimes) {
      player.money += 36000 * player.prestigeMul;
    } else {
      player.money += 18000 * player.prestigeMul;
    }
  }
  if(player.spawner == 16) {
    document.getElementsByClassName("round1")[0].className = "round18";
    if(Math.random() < player.twoTimes) {
      player.money += 58000 * player.prestigeMul;
    } else {
      player.money += 29000 * player.prestigeMul;
    }
  }
  if(player.spawner == 17) {
    document.getElementsByClassName("round1")[0].className = "round19";
    if(Math.random() < player.twoTimes) {
      player.money += 88000 * player.prestigeMul;
    } else {
      player.money += 44000 * player.prestigeMul;
    }
  }
  if(player.spawner == 18) {
    document.getElementsByClassName("round1")[0].className = "round20";
    if(Math.random() < player.twoTimes) {
      player.money += 124000 * player.prestigeMul;
    } else {
      player.money += 62000 * player.prestigeMul;
    }
  }
  if(player.spawner == 19) {
    document.getElementsByClassName("round1")[0].className = "round21";
    if(Math.random() < player.twoTimes) {
      player.money += 180000 * player.prestigeMul;
    } else {
      player.money += 90000 * player.prestigeMul;
    }
  }
  if(player.spawner == 20) {
    document.getElementsByClassName("round1")[0].className = "round22";
    if(Math.random() < player.twoTimes) {
      player.money += 334000 * player.prestigeMul;
    } else {
      player.money += 167000 * player.prestigeMul;
    }
  }
  if(player.spawner == 21) {
    document.getElementsByClassName("round1")[0].className = "round23";
    if(Math.random() < player.twoTimes) {
      player.money += 668000 * player.prestigeMul;
    } else {
      player.money += 334000 * player.prestigeMul;
    }
  }
  if(player.spawner == 22) {
    document.getElementsByClassName("round1")[0].className = "round24";
    if(Math.random() < player.twoTimes) {
      player.money += 1.3e6 * player.prestigeMul;
    } else {
      player.money += 650000 * player.prestigeMul;
    }
  }
  if(player.spawner == 23) {
    document.getElementsByClassName("round1")[0].className = "round25";
    if(Math.random() < player.twoTimes) {
      player.money += 2.64e6 * player.prestigeMul;
    } else {
      player.money += 1.32e6 * player.prestigeMul;
    }
  }
  if(player.spawner == 24) {
    document.getElementsByClassName("round1")[0].className = "round26";
    if(Math.random() < player.twoTimes) {
      player.money += 5.5e6 * player.prestigeMul;
    } else {
      player.money += 2.75e6 * player.prestigeMul;
    }
  }
  if(player.spawner == 25) {
    document.getElementsByClassName("round1")[0].className = "round27";
    if(Math.random() < player.twoTimes) {
      player.money += 1.14e7 * player.prestigeMul;
    } else {
      player.money += 5.7e6 * player.prestigeMul;
    }
  }
  if(player.spawner == 26) {
    document.getElementsByClassName("round1")[0].className = "round28";
    if(Math.random() < player.twoTimes) {
      player.money += 2.6e7 * player.prestigeMul;
    } else {
      player.money += 1.3e7 * player.prestigeMul;
    }
  }
  if(player.spawner == 27) {
    document.getElementsByClassName("round1")[0].className = "round29";
    if(Math.random() < player.twoTimes) {
      player.money += 6e7 * player.prestigeMul;
    } else {
      player.money += 3e7 * player.prestigeMul;
    }
  }
  if(player.spawner == 28) {
    document.getElementsByClassName("round1")[0].className = "round30";
    if(Math.random() < player.twoTimes) {
      player.money += 1.6e8 * player.prestigeMul;
    } else {
      player.money += 8e7 * player.prestigeMul;
    }
  }
  if(player.spawner == 29) {
    document.getElementsByClassName("round1")[0].className = "round31";
    if(Math.random() < player.twoTimes) {
      player.money += 3.2e8 * player.prestigeMul;
    } else {
      player.money += 1.6e8 * player.prestigeMul;
    }
  }
  if(player.spawner == 30) {
    document.getElementsByClassName("round1")[0].className = "round32";
    if(Math.random() < player.twoTimes) {
      player.money += 8.4e8 * player.prestigeMul;
    } else {
      player.money += 4.2e8 * player.prestigeMul;
    }
  }
  if(player.spawner == 31) {
    document.getElementsByClassName("round1")[0].className = "round33";
    if(Math.random() < player.twoTimes) {
      player.money += 2e9 * player.prestigeMul;
    } else {
      player.money += 1e9 * player.prestigeMul;
    }
  }
  if(player.spawner == 32) {
    document.getElementsByClassName("round1")[0].className = "round34";
    if(Math.random() < player.twoTimes) {
      player.money += 6e9 * player.prestigeMul;
    } else {
      player.money += 3e9 * player.prestigeMul;
    }
  }
  if(player.spawner == 33) {
    document.getElementsByClassName("round1")[0].className = "round35";
    if(Math.random() < player.twoTimes) {
      player.money += 1.8e10 * player.prestigeMul;
    } else {
      player.money += 9e9 * player.prestigeMul;
    }
  }
  if(player.spawner == 34) {
    document.getElementsByClassName("round1")[0].className = "round36";
    if(Math.random() < player.twoTimes) {
      player.money += 6e10 * player.prestigeMul;
    } else {
      player.money += 3e10 * player.prestigeMul;
    }
  }
  if(player.spawner == 35) {
    document.getElementsByClassName("round1")[0].className = "round37";
    if(Math.random() < player.twoTimes) {
      player.money += 2e11 * player.prestigeMul;
    } else {
      player.money += 1e11 * player.prestigeMul;
    }
  }
  if(player.spawner == 36) {
    document.getElementsByClassName("round1")[0].className = "round38";
    if(Math.random() < player.twoTimes) {
      player.money += 7e11 * player.prestigeMul;
    } else {
      player.money += 3.5e11 * player.prestigeMul;
    }
  }
  if(player.spawner == 37) {
    document.getElementsByClassName("round1")[0].className = "round39";
    if(Math.random() < player.twoTimes) {
      player.money += 2e12 * player.prestigeMul;
    } else {
      player.money += 1e12 * player.prestigeMul;
    }
  }
  if(player.spawner == 38) {
    document.getElementsByClassName("round1")[0].className = "round40";
    if(Math.random() < player.twoTimes) {
      player.money += 7.6e12 * player.prestigeMul;
    } else {
      player.money += 3.8e12 * player.prestigeMul;
    }
  }
  if(player.spawner == 39) {
    document.getElementsByClassName("round1")[0].className = "round41";
    if(Math.random() < player.twoTimes) {
      player.money += 2.6e13 * player.prestigeMul;
    } else {
      player.money += 1.3e13 * player.prestigeMul;
    }
  }
  if(player.spawner == 40) {
    document.getElementsByClassName("round1")[0].className = "round42";
    if(Math.random() < player.twoTimes) {
      player.money += 1e14 * player.prestigeMul;
    } else {
      player.money += 5e13 * player.prestigeMul;
    }
  }
  if(player.spawner == 41) {
    document.getElementsByClassName("round1")[0].className = "round43";
    if(Math.random() < player.twoTimes) {
      player.money += 4e14 * player.prestigeMul;
    } else {
      player.money += 2e14 * player.prestigeMul;
    }
  }
  if(player.spawner == 42) {
    document.getElementsByClassName("round1")[0].className = "round44";
    if(Math.random() < player.twoTimes) {
      player.money += 1.2e15 * player.prestigeMul;
    } else {
      player.money += 6e14 * player.prestigeMul;
    }
  }
  if(player.spawner == 43) {
    document.getElementsByClassName("round1")[0].className = "round45";
    if(Math.random() < player.twoTimes) {
      player.money += 3e15 * player.prestigeMul;
    } else {
      player.money += 1.5e15 * player.prestigeMul;
    }
  }
  if(player.spawner == 44) {
    document.getElementsByClassName("round1")[0].className = "round46";
    if(Math.random() < player.twoTimes) {
      player.money += 1e16 * player.prestigeMul;
    } else {
      player.money += 5e15 * player.prestigeMul;
    }
  }
  if(player.spawner == 45) {
    document.getElementsByClassName("round1")[0].className = "round47";
    if(Math.random() < player.twoTimes) {
      player.money += 3e16 * player.prestigeMul;
    } else {
      player.money += 1.5e16 * player.prestigeMul;
    }
  }
  if(player.spawner == 46) {
    document.getElementsByClassName("round1")[0].className = "round48";
    if(Math.random() < player.twoTimes) {
      player.money += 9e16 * player.prestigeMul;
    } else {
      player.money += 4.5e16 * player.prestigeMul;
    }
  }
  if(player.spawner == 47) {
    document.getElementsByClassName("round1")[0].className = "round49";
    if(Math.random() < player.twoTimes) {
      player.money += 2.7e17 * player.prestigeMul;
    } else {
      player.money += 1.35e17 * player.prestigeMul;
    }
  }
  if(player.spawner == 48) {
    document.getElementsByClassName("round1")[0].className = "round50";
    if(Math.random() < player.twoTimes) {
      player.money += 6.1e17 * player.prestigeMul;
    } else {
      player.money += 3.05e17 * player.prestigeMul;
    }
  }
  if(player.spawner == 49) {
    document.getElementsByClassName("round1")[0].className = "round51";
    if(Math.random() < player.twoTimes) {
      player.money += 1.83e18 * player.prestigeMul;
    } else {
      player.money += 9.15e17 * player.prestigeMul;
    }
  }
  if(player.spawner == 50) {
    document.getElementsByClassName("round1")[0].className = "round52";
    if(Math.random() < player.twoTimes) {
      player.money += 6e18 * player.prestigeMul;
    } else {
      player.money += 3e18 * player.prestigeMul;
    }
  }
  if(player.spawner == 51) {
    document.getElementsByClassName("round1")[0].className = "round53";
    if(Math.random() < player.twoTimes) {
      player.money += 1.8e19 * player.prestigeMul;
    } else {
      player.money += 9e18 * player.prestigeMul;
    }
  }
  if(player.spawner == 52) {
    document.getElementsByClassName("round1")[0].className = "round54";
    if(Math.random() < player.twoTimes) {
      player.money += 5.4e19 * player.prestigeMul;
    } else {
      player.money += 2.7e19 * player.prestigeMul;
    }
  }
  if(player.spawner == 53) {
    document.getElementsByClassName("round1")[0].className = "round55";
    if(Math.random() < player.twoTimes) {
      player.money += 1.62e20 * player.prestigeMul;
    } else {
      player.money += 8.1e19 * player.prestigeMul;
    }
  }
  if(player.spawner == 54) {
    document.getElementsByClassName("round1")[0].className = "round56";
    if(Math.random() < player.twoTimes) {
      player.money += 5.5e20 * player.prestigeMul;
    } else {
      player.money += 2.75e20 * player.prestigeMul;
    }
  }
  if(player.spawner == 55) {
    document.getElementsByClassName("round1")[0].className = "round57";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e21 * player.prestigeMul;
    } else {
      player.money += 7.5e20 * player.prestigeMul;
    }
  }
  if(player.spawner == 56) {
    document.getElementsByClassName("round1")[0].className = "round58";
    if(Math.random() < player.twoTimes) {
      player.money += 5.5e21 * player.prestigeMul;
    } else {
      player.money += 2.25e21 * player.prestigeMul;
    }
  }
  if(player.spawner == 57) {
    document.getElementsByClassName("round1")[0].className = "round59";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e22 * player.prestigeMul;
    } else {
      player.money += 7.5e21 * player.prestigeMul;
    }
  }
  if(player.spawner == 58) {
    document.getElementsByClassName("round1")[0].className = "round60";
    if(Math.random() < player.twoTimes) {
      player.money += 5e22 * player.prestigeMul;
    } else {
      player.money += 2.5e22 * player.prestigeMul;
    }
  }
  if(player.spawner == 59) {
    document.getElementsByClassName("round1")[0].className = "round61";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e23 * player.prestigeMul;
    } else {
      player.money += 7.5e22 * player.prestigeMul;
    }
  }
  if(player.spawner == 60) {
    document.getElementsByClassName("round1")[0].className = "round62";
    if(Math.random() < player.twoTimes) {
      player.money += 5e23 * player.prestigeMul;
    } else {
      player.money += 2.5e23 * player.prestigeMul;
    }
  }
  if(player.spawner == 61) {
    document.getElementsByClassName("round1")[0].className = "round63";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e24 * player.prestigeMul;
    } else {
      player.money += 7.5e23 * player.prestigeMul;
    }
  }
  if(player.spawner == 62) {
    document.getElementsByClassName("round1")[0].className = "round64";
    if(Math.random() < player.twoTimes) {
      player.money += 6e24 * player.prestigeMul;
    } else {
      player.money += 3e24 * player.prestigeMul;
    }
  }
  if(player.spawner == 63) {
    document.getElementsByClassName("round1")[0].className = "round65";
    if(Math.random() < player.twoTimes) {
      player.money += 1.8e25 * player.prestigeMul;
    } else {
      player.money += 9e24 * player.prestigeMul;
    }
  }
  if(player.spawner == 64) {
    document.getElementsByClassName("round1")[0].className = "round66";
    if(Math.random() < player.twoTimes) {
      player.money += 5.4e25 * player.prestigeMul;
    } else {
      player.money += 2.7e25 * player.prestigeMul;
    }
  }
  if(player.spawner == 65) {
    document.getElementsByClassName("round1")[0].className = "round67";
    if(Math.random() < player.twoTimes) {
      player.money += 1.62e26 * player.prestigeMul;
    } else {
      player.money += 8.1e25 * player.prestigeMul;
    }
  }
  if(player.spawner == 66) {
    document.getElementsByClassName("round1")[0].className = "round68";
    if(Math.random() < player.twoTimes) {
      player.money += 4.86e26 * player.prestigeMul;
    } else {
      player.money += 2.43e26 * player.prestigeMul;
    }
  }
  if(player.spawner == 67) {
    document.getElementsByClassName("round1")[0].className = "round69";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e27 * player.prestigeMul;
    } else {
      player.money += 7.5e26 * player.prestigeMul;
    }
  }
  if(player.spawner == 68) {
    document.getElementsByClassName("round1")[0].className = "round70";
    if(Math.random() < player.twoTimes) {
      player.money += 5.5e27 * player.prestigeMul;
    } else {
      player.money += 2.25e27 * player.prestigeMul;
    }
  }
  if(player.spawner == 69) {
    document.getElementsByClassName("round1")[0].className = "round71";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e28 * player.prestigeMul;
    } else {
      player.money += 7.5e27 * player.prestigeMul;
    }
  }
  if(player.spawner == 70) {
    document.getElementsByClassName("round1")[0].className = "round72";
    if(Math.random() < player.twoTimes) {
      player.money += 5e28 * player.prestigeMul;
    } else {
      player.money += 2.5e28 * player.prestigeMul;
    }
  }
  if(player.spawner == 71) {
    document.getElementsByClassName("round1")[0].className = "round73";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e29 * player.prestigeMul;
    } else {
      player.money += 7.5e28 * player.prestigeMul;
    }
  }
  if(player.spawner == 72) {
    document.getElementsByClassName("round1")[0].className = "round74";
    if(Math.random() < player.twoTimes) {
      player.money += 4.5e29 * player.prestigeMul;
    } else {
      player.money += 2.25e29 * player.prestigeMul;
    }
  }
  if(player.spawner == 73) {
    document.getElementsByClassName("round1")[0].className = "round75";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e30 * player.prestigeMul;
    } else {
      player.money += 7.5e29 * player.prestigeMul;
    }
  }
  if(player.spawner == 74) {
    document.getElementsByClassName("round1")[0].className = "round76";
    if(Math.random() < player.twoTimes) {
      player.money += 5e30 * player.prestigeMul;
    } else {
      player.money += 2.5e30 * player.prestigeMul;
    }
  }
  if(player.spawner == 75) {
    document.getElementsByClassName("round1")[0].className = "round77";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e31 * player.prestigeMul;
    } else {
      player.money += 7.5e30 * player.prestigeMul;
    }
  }
  if(player.spawner == 76) {
    document.getElementsByClassName("round1")[0].className = "round78";
    if(Math.random() < player.twoTimes) {
      player.money += 5e31 * player.prestigeMul;
    } else {
      player.money += 2.5e31 * player.prestigeMul;
    }
  }
  if(player.spawner == 77) {
    document.getElementsByClassName("round1")[0].className = "round79";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e32 * player.prestigeMul;
    } else {
      player.money += 7.5e31 * player.prestigeMul;
    }
  }
  if(player.spawner == 78) {
    document.getElementsByClassName("round1")[0].className = "round80";
    if(Math.random() < player.twoTimes) {
      player.money += 5e32 * player.prestigeMul;
    } else {
      player.money += 2.5e32 * player.prestigeMul;
    }
  }
  if(player.spawner == 79) {
    document.getElementsByClassName("round1")[0].className = "round81";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e33 * player.prestigeMul;
    } else {
      player.money += 7.5e32 * player.prestigeMul;
    }
  }
  if(player.spawner == 80) {
    document.getElementsByClassName("round1")[0].className = "round82";
    if(Math.random() < player.twoTimes) {
      player.money += 5e33 * player.prestigeMul;
    } else {
      player.money += 2.5e33 * player.prestigeMul;
    }
  }
  if(player.spawner == 81) {
    document.getElementsByClassName("round1")[0].className = "round83";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e34 * player.prestigeMul;
    } else {
      player.money += 7.5e33 * player.prestigeMul;
    }
  }
  if(player.spawner == 82) {
    document.getElementsByClassName("round1")[0].className = "round84";
    if(Math.random() < player.twoTimes) {
      player.money += 5e34 * player.prestigeMul;
    } else {
      player.money += 2.5e34 * player.prestigeMul;
    }
  }
  if(player.spawner == 83) {
    document.getElementsByClassName("round1")[0].className = "round85";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e35 * player.prestigeMul;
    } else {
      player.money += 7.5e34 * player.prestigeMul;
    }
  }
  if(player.spawner == 84) {
    document.getElementsByClassName("round1")[0].className = "round86";
    if(Math.random() < player.twoTimes) {
      player.money += 5e35 * player.prestigeMul;
    } else {
      player.money += 2.5e35 * player.prestigeMul;
    }
  }
  if(player.spawner == 85) {
    document.getElementsByClassName("round1")[0].className = "round87";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e36 * player.prestigeMul;
    } else {
      player.money += 7.5e35 * player.prestigeMul;
    }
  }
  if(player.spawner == 86) {
    document.getElementsByClassName("round1")[0].className = "round88";
    if(Math.random() < player.twoTimes) {
      player.money += 5e36 * player.prestigeMul;
    } else {
      player.money += 2.5e36 * player.prestigeMul;
    }
  }
  if(player.spawner == 87) {
    document.getElementsByClassName("round1")[0].className = "round89";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e37 * player.prestigeMul;
    } else {
      player.money += 7.5e36 * player.prestigeMul;
    }
  }
  if(player.spawner == 88) {
    document.getElementsByClassName("round1")[0].className = "round90";
    if(Math.random() < player.twoTimes) {
      player.money += 5e37 * player.prestigeMul;
    } else {
      player.money += 2.5e37 * player.prestigeMul;
    }
  }
  if(player.spawner == 89) {
    document.getElementsByClassName("round1")[0].className = "round91";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e38 * player.prestigeMul;
    } else {
      player.money += 7.5e37 * player.prestigeMul;
    }
  }
  if(player.spawner == 90) {
    document.getElementsByClassName("round1")[0].className = "round92";
    if(Math.random() < player.twoTimes) {
      player.money += 5e38 * player.prestigeMul;
    } else {
      player.money += 2.5e38 * player.prestigeMul;
    }
  }
  if(player.spawner == 91) {
    document.getElementsByClassName("round1")[0].className = "round93";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e39 * player.prestigeMul;
    } else {
      player.money += 7.5e38 * player.prestigeMul;
    }
  }
  if(player.spawner == 92) {
    document.getElementsByClassName("round1")[0].className = "round94";
    if(Math.random() < player.twoTimes) {
      player.money += 5e39 * player.prestigeMul;
    } else {
      player.money += 2.5e39 * player.prestigeMul;
    }
  }
  if(player.spawner == 93) {
    document.getElementsByClassName("round1")[0].className = "round95";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e40 * player.prestigeMul;
    } else {
      player.money += 7.5e39 * player.prestigeMul;
    }
  }
  if(player.spawner == 94) {
    document.getElementsByClassName("round1")[0].className = "round96";
    if(Math.random() < player.twoTimes) {
      player.money += 5e40 * player.prestigeMul;
    } else {
      player.money += 2.5e40 * player.prestigeMul;
    }
  }
  if(player.spawner == 95) {
    document.getElementsByClassName("round1")[0].className = "round97";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e41 * player.prestigeMul;
    } else {
      player.money += 7.5e40 * player.prestigeMul;
    }
  }
  if(player.spawner == 96) {
    document.getElementsByClassName("round1")[0].className = "round98";
    if(Math.random() < player.twoTimes) {
      player.money += 5e41 * player.prestigeMul;
    } else {
      player.money += 2.5e41 * player.prestigeMul;
    }
  }
  if(player.spawner == 97) {
    document.getElementsByClassName("round1")[0].className = "round99";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e42 * player.prestigeMul;
    } else {
      player.money += 7.5e41 * player.prestigeMul;
    }
  }
  if(player.spawner == 98) {
    document.getElementsByClassName("round1")[0].className = "round100";
    if(Math.random() < player.twoTimes) {
      player.money += 5e42 * player.prestigeMul;
    } else {
      player.money += 2.5e42 * player.prestigeMul;
    }
  }
  if(player.spawner == 99) {
    document.getElementsByClassName("round1")[0].className = "round101";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e43 * player.prestigeMul;
    } else {
      player.money += 7.5e42 * player.prestigeMul;
    }
  }
  if(player.spawner == 100) {
    document.getElementsByClassName("round1")[0].className = "round102";
    if(Math.random() < player.twoTimes) {
      player.money += 5e43 * player.prestigeMul;
    } else {
      player.money += 2.5e43 * player.prestigeMul;
    }
  }
  if(player.spawner == 101) {
    document.getElementsByClassName("round1")[0].className = "round103";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e44 * player.prestigeMul;
    } else {
      player.money += 7.5e43 * player.prestigeMul;
    }
  }
  if(player.spawner == 102) {
    document.getElementsByClassName("round1")[0].className = "round104";
    if(Math.random() < player.twoTimes) {
      player.money += 5e44 * player.prestigeMul;
    } else {
      player.money += 2.5e44 * player.prestigeMul;
    }
  }
  if(player.spawner == 103) {
    document.getElementsByClassName("round1")[0].className = "round105";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e45 * player.prestigeMul;
    } else {
      player.money += 7.5e44 * player.prestigeMul;
    }
  }
  if(player.spawner == 104) {
    document.getElementsByClassName("round1")[0].className = "round106";
    if(Math.random() < player.twoTimes) {
      player.money += 5e45 * player.prestigeMul;
    } else {
      player.money += 2.5e45 * player.prestigeMul;
    }
  }
  if(player.spawner == 105) {
    document.getElementsByClassName("round1")[0].className = "round107";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e46 * player.prestigeMul;
    } else {
      player.money += 7.5e45 * player.prestigeMul;
    }
  }
  if(player.spawner == 106) {
    document.getElementsByClassName("round1")[0].className = "round108";
    if(Math.random() < player.twoTimes) {
      player.money += 5e46 * player.prestigeMul;
    } else {
      player.money += 2.5e46 * player.prestigeMul;
    }
  }
  if(player.spawner == 107) {
    document.getElementsByClassName("round1")[0].className = "round109";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e47 * player.prestigeMul;
    } else {
      player.money += 7.5e46 * player.prestigeMul;
    }
  }
  if(player.spawner == 108) {
    document.getElementsByClassName("round1")[0].className = "round110";
    if(Math.random() < player.twoTimes) {
      player.money += 5e47 * player.prestigeMul;
    } else {
      player.money += 2.5e47 * player.prestigeMul;
    }
  }
  if(player.spawner == 109) {
    document.getElementsByClassName("round1")[0].className = "round111";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e48 * player.prestigeMul;
    } else {
      player.money += 7.5e47 * player.prestigeMul;
    }
  }
  if(player.spawner == 110) {
    document.getElementsByClassName("round1")[0].className = "round112";
    if(Math.random() < player.twoTimes) {
      player.money += 5e48 * player.prestigeMul;
    } else {
      player.money += 2.5e48 * player.prestigeMul;
    }
  }
  if(player.spawner == 111) {
    document.getElementsByClassName("round1")[0].className = "round113";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e49 * player.prestigeMul;
    } else {
      player.money += 7.5e48 * player.prestigeMul;
    }
  }
  if(player.spawner == 112) {
    document.getElementsByClassName("round1")[0].className = "round114";
    if(Math.random() < player.twoTimes) {
      player.money += 5e49 * player.prestigeMul;
    } else {
      player.money += 2.5e49 * player.prestigeMul;
    }
  }
  if(player.spawner == 113) {
    document.getElementsByClassName("round1")[0].className = "round115";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e50 * player.prestigeMul;
    } else {
      player.money += 7.5e49 * player.prestigeMul;
    }
  }
  if(player.spawner == 114) {
    document.getElementsByClassName("round1")[0].className = "round116";
    if(Math.random() < player.twoTimes) {
      player.money += 5e50 * player.prestigeMul;
    } else {
      player.money += 2.5e50 * player.prestigeMul;
    }
  }
  if(player.spawner == 115) {
    document.getElementsByClassName("round1")[0].className = "round117";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e51 * player.prestigeMul;
    } else {
      player.money += 7.5e50 * player.prestigeMul;
    }
  }
  if(player.spawner == 116) {
    document.getElementsByClassName("round1")[0].className = "round118";
    if(Math.random() < player.twoTimes) {
      player.money += 5e51 * player.prestigeMul;
    } else {
      player.money += 2.5e51 * player.prestigeMul;
    }
  }
  if(player.spawner == 117) {
    document.getElementsByClassName("round1")[0].className = "round119";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e52 * player.prestigeMul;
    } else {
      player.money += 7.5e51 * player.prestigeMul;
    }
  }
  if(player.spawner == 118) {
    document.getElementsByClassName("round1")[0].className = "round120";
    if(Math.random() < player.twoTimes) {
      player.money += 5e52 * player.prestigeMul;
    } else {
      player.money += 2.5e52 * player.prestigeMul;
    }
  }
  if(player.spawner == 119) {
    document.getElementsByClassName("round1")[0].className = "round121";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e53 * player.prestigeMul;
    } else {
      player.money += 7.5e52 * player.prestigeMul;
    }
  }
  if(player.spawner == 120) {
    document.getElementsByClassName("round1")[0].className = "round122";
    if(Math.random() < player.twoTimes) {
      player.money += 5e53 * player.prestigeMul;
    } else {
      player.money += 2.5e53 * player.prestigeMul;
    }
  }
  if(player.spawner == 121) {
    document.getElementsByClassName("round1")[0].className = "round123";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e54 * player.prestigeMul;
    } else {
      player.money += 7.5e53 * player.prestigeMul;
    }
  }
  if(player.spawner == 122) {
    document.getElementsByClassName("round1")[0].className = "round124";
    if(Math.random() < player.twoTimes) {
      player.money += 5e54 * player.prestigeMul;
    } else {
      player.money += 2.5e54 * player.prestigeMul;
    }
  }
  if(player.spawner == 123) {
    document.getElementsByClassName("round1")[0].className = "round125";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e55 * player.prestigeMul;
    } else {
      player.money += 7.5e54 * player.prestigeMul;
    }
  }
  if(player.spawner == 124) {
    document.getElementsByClassName("round1")[0].className = "round126";
    if(Math.random() < player.twoTimes) {
      player.money += 5e55 * player.prestigeMul;
    } else {
      player.money += 2.5e55 * player.prestigeMul;
    }
  }
  if(player.spawner == 125) {
    document.getElementsByClassName("round1")[0].className = "round127";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e56 * player.prestigeMul;
    } else {
      player.money += 7.5e55 * player.prestigeMul;
    }
  }
  if(player.spawner == 126) {
    document.getElementsByClassName("round1")[0].className = "round128";
    if(Math.random() < player.twoTimes) {
      player.money += 5e56 * player.prestigeMul;
    } else {
      player.money += 2.5e56 * player.prestigeMul;
    }
  }
  if(player.spawner == 127) {
    document.getElementsByClassName("round1")[0].className = "round129";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e57 * player.prestigeMul;
    } else {
      player.money += 7.5e56 * player.prestigeMul;
    }
  }
  if(player.spawner == 128) {
    document.getElementsByClassName("round1")[0].className = "round130";
    if(Math.random() < player.twoTimes) {
      player.money += 5e57 * player.prestigeMul;
    } else {
      player.money += 2.5e57 * player.prestigeMul;
    }
  }
  if(player.spawner == 129) {
    document.getElementsByClassName("round1")[0].className = "round131";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e58 * player.prestigeMul;
    } else {
      player.money += 7.5e57 * player.prestigeMul;
    }
  }
  if(player.spawner == 130) {
    document.getElementsByClassName("round1")[0].className = "round132";
    if(Math.random() < player.twoTimes) {
      player.money += 5e58 * player.prestigeMul;
    } else {
      player.money += 2.5e58 * player.prestigeMul;
    }
  }
  if(player.spawner == 131) {
    document.getElementsByClassName("round1")[0].className = "round133";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e59 * player.prestigeMul;
    } else {
      player.money += 7.5e58 * player.prestigeMul;
    }
  }
  if(player.spawner == 132) {
    document.getElementsByClassName("round1")[0].className = "round134";
    if(Math.random() < player.twoTimes) {
      player.money += 5e59 * player.prestigeMul;
    } else {
      player.money += 2.5e59 * player.prestigeMul;
    }
  }
  if(player.spawner == 133) {
    document.getElementsByClassName("round1")[0].className = "round135";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e60 * player.prestigeMul;
    } else {
      player.money += 7.5e59 * player.prestigeMul;
    }
  }
  if(player.spawner == 134) {
    document.getElementsByClassName("round1")[0].className = "round136";
    if(Math.random() < player.twoTimes) {
      player.money += 5e60 * player.prestigeMul;
    } else {
      player.money += 2.5e60 * player.prestigeMul;
    }
  }
  if(player.spawner == 135) {
    document.getElementsByClassName("round1")[0].className = "round137";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e61 * player.prestigeMul;
    } else {
      player.money += 7.5e60 * player.prestigeMul;
    }
  }
  if(player.spawner == 136) {
    document.getElementsByClassName("round1")[0].className = "round138";
    if(Math.random() < player.twoTimes) {
      player.money += 5e61 * player.prestigeMul;
    } else {
      player.money += 2.5e61 * player.prestigeMul;
    }
  }
  if(player.spawner == 137) {
    document.getElementsByClassName("round1")[0].className = "round139";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e62 * player.prestigeMul;
    } else {
      player.money += 7.5e61 * player.prestigeMul;
    }
  }
  if(player.spawner == 138) {
    document.getElementsByClassName("round1")[0].className = "round140";
    if(Math.random() < player.twoTimes) {
      player.money += 5e62 * player.prestigeMul;
    } else {
      player.money += 2.5e62 * player.prestigeMul;
    }
  }
  if(player.spawner == 139) {
    document.getElementsByClassName("round1")[0].className = "round141";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e63 * player.prestigeMul;
    } else {
      player.money += 7.5e62 * player.prestigeMul;
    }
  }
  if(player.spawner == 140) {
    document.getElementsByClassName("round1")[0].className = "round142";
    if(Math.random() < player.twoTimes) {
      player.money += 5e63 * player.prestigeMul;
    } else {
      player.money += 2.5e63 * player.prestigeMul;
    }
  }
  if(player.spawner == 141) {
    document.getElementsByClassName("round1")[0].className = "round143";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e64 * player.prestigeMul;
    } else {
      player.money += 7.5e63 * player.prestigeMul;
    }
  }
  if(player.spawner == 142) {
    document.getElementsByClassName("round1")[0].className = "round144";
    if(Math.random() < player.twoTimes) {
      player.money += 5e64 * player.prestigeMul;
    } else {
      player.money += 2.5e64 * player.prestigeMul;
    }
  }
  if(player.spawner == 143) {
    document.getElementsByClassName("round1")[0].className = "round145";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e65 * player.prestigeMul;
    } else {
      player.money += 7.5e64 * player.prestigeMul;
    }
  }
  if(player.spawner == 144) {
    document.getElementsByClassName("round1")[0].className = "round146";
    if(Math.random() < player.twoTimes) {
      player.money += 5e65 * player.prestigeMul;
    } else {
      player.money += 2.5e65 * player.prestigeMul;
    }
  }
  if(player.spawner == 145) {
    document.getElementsByClassName("round1")[0].className = "round147";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e66 * player.prestigeMul;
    } else {
      player.money += 7.5e65 * player.prestigeMul;
    }
  }
  if(player.spawner == 146) {
    document.getElementsByClassName("round1")[0].className = "round148";
    if(Math.random() < player.twoTimes) {
      player.money += 5e66 * player.prestigeMul;
    } else {
      player.money += 2.5e66 * player.prestigeMul;
    }
  }
  if(player.spawner == 147) {
    document.getElementsByClassName("round1")[0].className = "round149";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e67 * player.prestigeMul;
    } else {
      player.money += 7.5e66 * player.prestigeMul;
    }
  }
  if(player.spawner == 148) {
    document.getElementsByClassName("round1")[0].className = "round150";
    if(Math.random() < player.twoTimes) {
      player.money += 5e67 * player.prestigeMul;
    } else {
      player.money += 2.5e67 * player.prestigeMul;
    }
  }
  if(player.spawner == 149) {
    document.getElementsByClassName("round1")[0].className = "round151";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e68 * player.prestigeMul;
    } else {
      player.money += 7.5e67 * player.prestigeMul;
    }
  }
  if(player.spawner == 150) {
    document.getElementsByClassName("round1")[0].className = "round152";
    if(Math.random() < player.twoTimes) {
      player.money += 5e68 * player.prestigeMul;
    } else {
      player.money += 2.5e68 * player.prestigeMul;
    }
  }
  if(player.spawner == 151) {
    document.getElementsByClassName("round1")[0].className = "round153";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e69 * player.prestigeMul;
    } else {
      player.money += 7.5e68 * player.prestigeMul;
    }
  }
  if(player.spawner == 152) {
    document.getElementsByClassName("round1")[0].className = "round154";
    if(Math.random() < player.twoTimes) {
      player.money += 5e69 * player.prestigeMul;
    } else {
      player.money += 2.5e69 * player.prestigeMul;
    }
  }
  if(player.spawner == 153) {
    document.getElementsByClassName("round1")[0].className = "round155";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e70 * player.prestigeMul;
    } else {
      player.money += 7.5e69 * player.prestigeMul;
    }
  }
  if(player.spawner == 154) {
    document.getElementsByClassName("round1")[0].className = "round156";
    if(Math.random() < player.twoTimes) {
      player.money += 5e70 * player.prestigeMul;
    } else {
      player.money += 2.5e70 * player.prestigeMul;
    }
  }
  if(player.spawner == 155) {
    document.getElementsByClassName("round1")[0].className = "round157";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e71 * player.prestigeMul;
    } else {
      player.money += 7.5e70 * player.prestigeMul;
    }
  }
  if(player.spawner == 156) {
    document.getElementsByClassName("round1")[0].className = "round158";
    if(Math.random() < player.twoTimes) {
      player.money += 5e71 * player.prestigeMul;
    } else {
      player.money += 2.5e71 * player.prestigeMul;
    }
  }
  if(player.spawner == 157) {
    document.getElementsByClassName("round1")[0].className = "round159";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e72 * player.prestigeMul;
    } else {
      player.money += 7.5e71 * player.prestigeMul;
    }
  }
  if(player.spawner == 158) {
    document.getElementsByClassName("round1")[0].className = "round160";
    if(Math.random() < player.twoTimes) {
      player.money += 5e72 * player.prestigeMul;
    } else {
      player.money += 2.5e72 * player.prestigeMul;
    }
  }
  if(player.spawner == 159) {
    document.getElementsByClassName("round1")[0].className = "round161";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e73 * player.prestigeMul;
    } else {
      player.money += 7.5e72 * player.prestigeMul;
    }
  }
  if(player.spawner == 160) {
    document.getElementsByClassName("round1")[0].className = "round162";
    if(Math.random() < player.twoTimes) {
      player.money += 5e73 * player.prestigeMul;
    } else {
      player.money += 2.5e73 * player.prestigeMul;
    }
  }
  if(player.spawner == 161) {
    document.getElementsByClassName("round1")[0].className = "round163";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e74 * player.prestigeMul;
    } else {
      player.money += 7.5e73 * player.prestigeMul;
    }
  }
  if(player.spawner == 162) {
    document.getElementsByClassName("round1")[0].className = "round164";
    if(Math.random() < player.twoTimes) {
      player.money += 5e74 * player.prestigeMul;
    } else {
      player.money += 2.5e74 * player.prestigeMul;
    }
  }
  if(player.spawner == 163) {
    document.getElementsByClassName("round1")[0].className = "round165";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e75 * player.prestigeMul;
    } else {
      player.money += 7.5e74 * player.prestigeMul;
    }
  }
  if(player.spawner == 164) {
    document.getElementsByClassName("round1")[0].className = "round166";
    if(Math.random() < player.twoTimes) {
      player.money += 5e75 * player.prestigeMul;
    } else {
      player.money += 2.5e75 * player.prestigeMul;
    }
  }
  if(player.spawner == 165) {
    document.getElementsByClassName("round1")[0].className = "round167";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e76 * player.prestigeMul;
    } else {
      player.money += 7.5e75 * player.prestigeMul;
    }
  }
  if(player.spawner == 166) {
    document.getElementsByClassName("round1")[0].className = "round168";
    if(Math.random() < player.twoTimes) {
      player.money += 5e76 * player.prestigeMul;
    } else {
      player.money += 2.5e76 * player.prestigeMul;
    }
  }
  if(player.spawner == 167) {
    document.getElementsByClassName("round1")[0].className = "round169";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e76 * player.prestigeMul;
    } else {
      player.money += 7.5e76 * player.prestigeMul;
    }
  }
  if(player.spawner == 168) {
    document.getElementsByClassName("round1")[0].className = "round170";
    if(Math.random() < player.twoTimes) {
      player.money += 5e77 * player.prestigeMul;
    } else {
      player.money += 2.5e77 * player.prestigeMul;
    }
  }
  if(player.spawner == 169) {
    document.getElementsByClassName("round1")[0].className = "round171";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e78 * player.prestigeMul;
    } else {
      player.money += 7.5e77 * player.prestigeMul;
    }
  }
  if(player.spawner == 170) {
    document.getElementsByClassName("round1")[0].className = "round172";
    if(Math.random() < player.twoTimes) {
      player.money += 5e78 * player.prestigeMul;
    } else {
      player.money += 2.5e78 * player.prestigeMul;
    }
  }
  if(player.spawner == 171) {
    document.getElementsByClassName("round1")[0].className = "round173";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e79 * player.prestigeMul;
    } else {
      player.money += 7.5e78 * player.prestigeMul;
    }
  }
  if(player.spawner == 172) {
    document.getElementsByClassName("round1")[0].className = "round174";
    if(Math.random() < player.twoTimes) {
      player.money += 5e79 * player.prestigeMul;
    } else {
      player.money += 2.5e79 * player.prestigeMul;
    }
  }
  if(player.spawner == 173) {
    document.getElementsByClassName("round1")[0].className = "round175";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e80 * player.prestigeMul;
    } else {
      player.money += 7.5e79 * player.prestigeMul;
    }
  }
  if(player.spawner == 174) {
    document.getElementsByClassName("round1")[0].className = "round176";
    if(Math.random() < player.twoTimes) {
      player.money += 5e80 * player.prestigeMul;
    } else {
      player.money += 2.5e80 * player.prestigeMul;
    }
  }
  if(player.spawner == 175) {
    document.getElementsByClassName("round1")[0].className = "round177";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e81 * player.prestigeMul;
    } else {
      player.money += 7.5e80 * player.prestigeMul;
    }
  }
  if(player.spawner == 176) {
    document.getElementsByClassName("round1")[0].className = "round178";
    if(Math.random() < player.twoTimes) {
      player.money += 5e81 * player.prestigeMul;
    } else {
      player.money += 2.5e81 * player.prestigeMul;
    }
  }
  if(player.spawner == 177) {
    document.getElementsByClassName("round1")[0].className = "round179";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e82 * player.prestigeMul;
    } else {
      player.money += 7.5e81 * player.prestigeMul;
    }
  }
  if(player.spawner == 178) {
    document.getElementsByClassName("round1")[0].className = "round180";
    if(Math.random() < player.twoTimes) {
      player.money += 5e82 * player.prestigeMul;
    } else {
      player.money += 2.5e82 * player.prestigeMul;
    }
  }
  if(player.spawner == 179) {
    document.getElementsByClassName("round1")[0].className = "round181";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e83 * player.prestigeMul;
    } else {
      player.money += 7.5e82 * player.prestigeMul;
    }
  }
  if(player.spawner == 180) {
    document.getElementsByClassName("round1")[0].className = "round182";
    if(Math.random() < player.twoTimes) {
      player.money += 5e83 * player.prestigeMul;
    } else {
      player.money += 2.5e83 * player.prestigeMul;
    }
  }
  if(player.spawner == 181) {
    document.getElementsByClassName("round1")[0].className = "round183";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e84 * player.prestigeMul;
    } else {
      player.money += 7.5e83 * player.prestigeMul;
    }
  }
  if(player.spawner == 182) {
    document.getElementsByClassName("round1")[0].className = "round184";
    if(Math.random() < player.twoTimes) {
      player.money += 5e84 * player.prestigeMul;
    } else {
      player.money += 2.5e84 * player.prestigeMul;
    }
  }
  if(player.spawner == 183) {
    document.getElementsByClassName("round1")[0].className = "round185";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e85 * player.prestigeMul;
    } else {
      player.money += 7.5e84 * player.prestigeMul;
    }
  }
  if(player.spawner == 184) {
    document.getElementsByClassName("round1")[0].className = "round186";
    if(Math.random() < player.twoTimes) {
      player.money += 5e85 * player.prestigeMul;
    } else {
      player.money += 2.5e85 * player.prestigeMul;
    }
  }
  if(player.spawner == 185) {
    document.getElementsByClassName("round1")[0].className = "round187";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e86 * player.prestigeMul;
    } else {
      player.money += 7.5e85 * player.prestigeMul;
    }
  }
  if(player.spawner == 186) {
    document.getElementsByClassName("round1")[0].className = "round188";
    if(Math.random() < player.twoTimes) {
      player.money += 5e86 * player.prestigeMul;
    } else {
      player.money += 2.5e86 * player.prestigeMul;
    }
  }
  if(player.spawner == 187) {
    document.getElementsByClassName("round1")[0].className = "round189";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e87 * player.prestigeMul;
    } else {
      player.money += 7.5e86 * player.prestigeMul;
    }
  }
  if(player.spawner == 188) {
    document.getElementsByClassName("round1")[0].className = "round190";
    if(Math.random() < player.twoTimes) {
      player.money += 5e87 * player.prestigeMul;
    } else {
      player.money += 2.5e87 * player.prestigeMul;
    }
  }
  if(player.spawner == 189) {
    document.getElementsByClassName("round1")[0].className = "round191";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e88 * player.prestigeMul;
    } else {
      player.money += 7.5e87 * player.prestigeMul;
    }
  }
  if(player.spawner == 190) {
    document.getElementsByClassName("round1")[0].className = "round192";
    if(Math.random() < player.twoTimes) {
      player.money += 5e88 * player.prestigeMul;
    } else {
      player.money += 2.5e88 * player.prestigeMul;
    }
  }
  if(player.spawner == 191) {
    document.getElementsByClassName("round1")[0].className = "round193";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e89 * player.prestigeMul;
    } else {
      player.money += 7.5e88 * player.prestigeMul;
    }
  }
  if(player.spawner == 192) {
    document.getElementsByClassName("round1")[0].className = "round194";
    if(Math.random() < player.twoTimes) {
      player.money += 5e89 * player.prestigeMul;
    } else {
      player.money += 2.5e89 * player.prestigeMul;
    }
  }
  if(player.spawner == 193) {
    document.getElementsByClassName("round1")[0].className = "round195";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e90 * player.prestigeMul;
    } else {
      player.money += 7.5e89 * player.prestigeMul;
    }
  }
  if(player.spawner == 194) {
    document.getElementsByClassName("round1")[0].className = "round196";
    if(Math.random() < player.twoTimes) {
      player.money += 5e90 * player.prestigeMul;
    } else {
      player.money += 2.5e90 * player.prestigeMul;
    }
  }
  if(player.spawner == 195) {
    document.getElementsByClassName("round1")[0].className = "round197";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e91 * player.prestigeMul;
    } else {
      player.money += 7.5e90 * player.prestigeMul;
    }
  }
  if(player.spawner == 196) {
    document.getElementsByClassName("round1")[0].className = "round198";
    if(Math.random() < player.twoTimes) {
      player.money += 5e91 * player.prestigeMul;
    } else {
      player.money += 2.5e91 * player.prestigeMul;
    }
  }
  if(player.spawner == 197) {
    document.getElementsByClassName("round1")[0].className = "round199";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e92 * player.prestigeMul;
    } else {
      player.money += 7.5e91 * player.prestigeMul;
    }
  }
  if(player.spawner == 198) {
    document.getElementsByClassName("round1")[0].className = "round200";
    if(Math.random() < player.twoTimes) {
      player.money += 5e92 * player.prestigeMul;
    } else {
      player.money += 2.5e92 * player.prestigeMul;
    }
  }
  if(player.spawner == 199) {
    document.getElementsByClassName("round1")[0].className = "round201";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e93 * player.prestigeMul;
    } else {
      player.money += 7.5e92 * player.prestigeMul;
    }
  }
  if(player.spawner == 200) {
    document.getElementsByClassName("round1")[0].className = "round202";
    if(Math.random() < player.twoTimes) {
      player.money += 5e93 * player.prestigeMul;
    } else {
      player.money += 2.5e93 * player.prestigeMul;
    }
  }
  if(player.spawner == 201) {
    document.getElementsByClassName("round1")[0].className = "round203";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e94 * player.prestigeMul;
    } else {
      player.money += 7.5e93 * player.prestigeMul;
    }
  }
  if(player.spawner == 202) {
    document.getElementsByClassName("round1")[0].className = "round204";
    if(Math.random() < player.twoTimes) {
      player.money += 5e94 * player.prestigeMul;
    } else {
      player.money += 2.5e94 * player.prestigeMul;
    }
  }
  if(player.spawner == 203) {
    document.getElementsByClassName("round1")[0].className = "round205";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e95 * player.prestigeMul;
    } else {
      player.money += 7.5e94 * player.prestigeMul;
    }
  }
  if(player.spawner == 204) {
    document.getElementsByClassName("round1")[0].className = "round206";
    if(Math.random() < player.twoTimes) {
      player.money += 5e95 * player.prestigeMul;
    } else {
      player.money += 2.5e95 * player.prestigeMul;
    }
  }
  if(player.spawner == 205) {
    document.getElementsByClassName("round1")[0].className = "round207";
    if(Math.random() < player.twoTimes) {
      player.money += 1.5e96 * player.prestigeMul;
    } else {
      player.money += 7.5e95 * player.prestigeMul;
    }
  }
}

function two() {
  if(player.bb == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+(player.upgBlocks-1);
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.bb = 1;
  }
  document.getElementsByClassName("round2")[0].className = "round3";
  document.getElementsByClassName("round2")[0].className = "round1";
  document.getElementsByClassName("round2")[0].className = "round1";
  if(player.money >= 200000) {
    player.prestigeFactor += .00011;
    player.superMoneyFactor += .00022;
  }
  player.oneBlock++;
  if(Math.random() < player.twoTimes) {
    player.money += 6 * player.prestigeMul;
  } else {
    player.money += 3 * player.prestigeMul;
  }
}

function three() {
  if(player.cc == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.cc = 1;
  }
  document.getElementsByClassName("round1")[0].className = "round2";
  document.getElementsByClassName("round2")[0].className = "round1";
  if(player.money >= 200000) {
    player.prestigeFactor += .00022;
    player.superMoneyFactor += .0044;
  }
  if(Math.random() < player.twoTimes) {
    player.money += 2 * player.prestigeMul;
  } else {
    player.money += 1 * player.prestigeMul;
  }
  player.twoBlock++;
}

function four() {
  if(player.dd == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+(player.upgBlocks);
    player.dd = 1;
  }
  document.getElementsByClassName("round3")[0].className = "round4";
  document.getElementsByClassName("round3")[0].className = "round1";
  if(player.money >= 200000) {
    player.prestigeFactor += .00035;
    player.superMoneyFactor += .0007;
  }
  if(Math.random() < player.twoTimes) {
    player.money += 12 * player.prestigeMul;
  } else {
    player.money += 6 * player.prestigeMul;
  }
  player.threeBlock++;
}

function five() {
  if(player.ee == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.ee = 1;
  }
  document.getElementsByClassName("round4")[0].className = "round5";
  document.getElementsByClassName("round4")[0].className = "round1";
  if(player.money >= 200000) {
    player.prestigeFactor += .00047;
    player.superMoneyFactor += .0094;
  }
  if(Math.random() < player.twoTimes) {
    player.money += 24 * player.prestigeMul;
  } else {
    player.money += 12 * player.prestigeMul;
  }
  player.fourBlock++;
}

function six() {
  if(player.ff == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.ff = 1;
  }
  document.getElementsByClassName("round5")[0].className = "round6";
  document.getElementsByClassName("round5")[0].className = "round1";
  if(player.money >= 200000) {
    player.prestigeFactor += .00055;
    player.superMoneyFactor += .0011;
  }
  if(Math.random() < player.twoTimes) {
    player.money += 48 * player.prestigeMul;
  } else {
    player.money += 24 * player.prestigeMul;
  }
  player.fiveBlock++;
}

function seven() {
  if(player.gg == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.gg = 1;
  }
  document.getElementsByClassName("round6")[0].className = "round7";
  document.getElementsByClassName("round6")[0].className = "round1";
  if(player.money >= 200000) {
    player.prestigeFactor += .00066;
    player.superMoneyFactor += .00132;
  }
  if(Math.random() < player.twoTimes) {
    player.money += 96 * player.prestigeMul;
  } else {
    player.money += 48 * player.prestigeMul;
  }
  player.sixBlock++;
}

function eight() {
  if(player.hh == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.hh = 1;
  }
  document.getElementsByClassName("round7")[0].className = "round8";
  document.getElementsByClassName("round7")[0].className = "round1";
  if(player.money >= 200000) {
    player.prestigeFactor += .00073;
    player.superMoneyFactor += .00146;
  }
  if(Math.random() < player.twoTimes) {
    player.money += 192 * player.prestigeMul;
  } else {
    player.money += 96 * player.prestigeMul;
  }
  player.sevenBlock++;
}

function nine() {
  if(player.ii == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.ii = 1;
  }
  document.getElementsByClassName("round8")[0].className = "round9";
  document.getElementsByClassName("round8")[0].className = "round1";
  if(player.money >= 200000) {
    player.prestigeFactor += .0008;
    player.superMoneyFactor += .0016;
  }
  if(Math.random() < player.twoTimes) {
    player.money += 384 * player.prestigeMul;
  } else {
    player.money += 192 * player.prestigeMul;
  }
  player.eightBlock++;
}

function ten() {
  if(player.jj == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.jj = 1;
  }
  document.getElementsByClassName("round9")[0].className = "round10";
  document.getElementsByClassName("round9")[0].className = "round1";
  if(player.money >= 200000) {
    player.prestigeFactor += .00088;
    player.superMoneyFactor += .00176;
  }
  if(Math.random() < player.twoTimes) {
    player.money += 768 * player.prestigeMul;
  } else {
    player.money += 384 * player.prestigeMul;
  }
  player.nineBlock++;
}

function eleven() {
  if(player.kk == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.kk = 1;
  }
  document.getElementsByClassName("round10")[0].className = "round11";
  document.getElementsByClassName("round10")[0].className = "round1";
  if(player.money >= 200000) {
    player.prestigeFactor += .00096;
    player.superMoneyFactor += .00192;
  }
  if(Math.random() < player.twoTimes) {
    player.money += 1536 * player.prestigeMul;
  } else {
    player.money += 768 * player.prestigeMul;
  }
  player.tenBlock++;
}

function twelve() {
  if(player.ll == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.ll = 1;
  }
  document.getElementsByClassName("round11")[0].className = "round12";
  document.getElementsByClassName("round11")[0].className = "round1";
  if(player.money >= 200000) {
    player.prestigeFactor += .00104;
    player.superMoneyFactor += .00208;
  }
  if(Math.random() < player.twoTimes) {
    player.money += 3072 * player.prestigeMul;
  } else {
    player.money += 1536 * player.prestigeMul;
  }
  player.elevenBlock++;
}

function n13() {
  if(player.mm == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.mm = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .00112;
    player.superMoneyFactor += .00224;
  }
  document.getElementsByClassName("round12")[0].className = "round13";
  document.getElementsByClassName("round12")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5600 * player.prestigeMul;
  } else {
    player.money += 2800 * player.prestigeMul;
  }
  player.twelveBlock++;
}

function n14() {
  if(player.nn == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.nn = 1;
  }
  document.getElementsByClassName("round13")[0].className = "round14";
  document.getElementsByClassName("round13")[0].className = "round1";
  if(player.money >= 200000) {
    player.prestigeFactor += .0012;
    player.superMoneyFactor += .0024;
  }
  if(Math.random() < player.twoTimes) {
    player.money += 9000 * player.prestigeMul;
  } else {
    player.money += 4500 * player.prestigeMul;
  }
  player.thirteenBlock++;
}

function n15() {
  if(player.oo == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.oo = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .00128;
    player.superMoneyFactor += .00256;
  }
  document.getElementsByClassName("round14")[0].className = "round15";
  document.getElementsByClassName("round14")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 13600 * player.prestigeMul;
  } else {
    player.money += 6800 * player.prestigeMul;
  }
  player.fourteenBlock++;
}

function n16() {
  if(player.pp == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.pp = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .00133;
    player.superMoneyFactor += .00266;
  }
  document.getElementsByClassName("round15")[0].className = "round16";
  document.getElementsByClassName("round15")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 24000 * player.prestigeMul;
  } else {
    player.money += 12000 * player.prestigeMul;
  }
  player.fifteenBlock++;
}

function n17() {
  if(player.qq == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.qq = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .00138;
    player.superMoneyFactor += .00276;
  }
  document.getElementsByClassName("round16")[0].className = "round17";
  document.getElementsByClassName("round16")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 36000 * player.prestigeMul;
  } else {
    player.money += 18000 * player.prestigeMul;
  }
}

function n18() {
  if(player.rr == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.rr = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .001428;
    player.superMoneyFactor += .002456;
  }
  document.getElementsByClassName("round17")[0].className = "round18";
  document.getElementsByClassName("round17")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 58000 * player.prestigeMul;
  } else {
    player.money += 29000 * player.prestigeMul;
  }
}

function n19() {
  if(player.ss == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.ss = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .00146;
    player.superMoneyFactor += .00292;
  }
  document.getElementsByClassName("round18")[0].className = "round19";
  document.getElementsByClassName("round18")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 88000 * player.prestigeMul;
  } else {
    player.money += 44000 * player.prestigeMul;
  }
}

var done3 = 0;

function n20() {
  if(player.tt == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.tt = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .001488;
    player.superMoneyFactor += .002976;
  }
  document.getElementsByClassName("round19")[0].className = "round20";
  document.getElementsByClassName("round19")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 124000 * player.prestigeMul;
  } else {
    player.money += 62000 * player.prestigeMul;
  }
}

function n21() {
  if(player.uu == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.uu = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .00152;
    player.superMoneyFactor += .00304;
  }
  document.getElementsByClassName("round20")[0].className = "round21";
  document.getElementsByClassName("round20")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 180000 * player.prestigeMul;
  } else {
    player.money += 90000 * player.prestigeMul;
  }
}

function n22() {
  if(player.vv == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.vv = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .001552;
    player.superMoneyFactor += .003104;
  }
  document.getElementsByClassName("round21")[0].className = "round22";
  document.getElementsByClassName("round21")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 334000 * player.prestigeMul;
  } else {
    player.money += 167000 * player.prestigeMul;
  }
}

function n23() {
  if(player.ww == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.ww = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .0016;
    player.superMoneyFactor += .0032;
  }
  document.getElementsByClassName("round22")[0].className = "round23";
  document.getElementsByClassName("round22")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 668000 * player.prestigeMul;
  } else {
    player.money += 334000 * player.prestigeMul;
  }
}

function n24() {
  if(player.xx == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.xx = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .00167;
    player.superMoneyFactor += .00334;
  }
  document.getElementsByClassName("round23")[0].className = "round24";
  document.getElementsByClassName("round23")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.3e6 * player.prestigeMul;
  } else {
    player.money += 650000 * player.prestigeMul;
  }
}

var done4 = 0;

function n25() {
  if(player.yy == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.yy = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .00175;
    player.superMoneyFactor += .0035;
  }
  document.getElementsByClassName("round24")[0].className = "round25";
  document.getElementsByClassName("round24")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 2.64e6 * player.prestigeMul;
  } else {
    player.money += 1.32e6 * player.prestigeMul;
  }
}

function n26() {
  if(player.zz == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.zz = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .00183;
    player.superMoneyFactor += .00366;
  }
  document.getElementsByClassName("round25")[0].className = "round26";
  document.getElementsByClassName("round25")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5.5e6 * player.prestigeMul;
  } else {
    player.money += 2.75e6 * player.prestigeMul;
  }
}

function n27() {
  if(player.aaa == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.aaa = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .0019;
    player.superMoneyFactor += .0038;
  }
  document.getElementsByClassName("round26")[0].className = "round27";
  document.getElementsByClassName("round26")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.14e7 * player.prestigeMul;
  } else {
    player.money += 5.7e6 * player.prestigeMul;
  }
}

function n28() {
  if(player.bbb == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    document.getElementsByClassName("a1")[0].className = "a"+(player.upgBlocks+1);
    player.bbb = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .002;
    player.superMoneyFactor += .004;
  }
  document.getElementsByClassName("round27")[0].className = "round28";
  document.getElementsByClassName("round27")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 2.6e7 * player.prestigeMul;
  } else {
    player.money += 1.3e7 * player.prestigeMul;
  }
}

function n29() {
  if(player.ccc == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    document.getElementsByClassName("a1")[0].className = "a"+(player.upgBlocks+1);
    player.ccc = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .00212;
    player.superMoneyFactor += .00424;
  }
  document.getElementsByClassName("round28")[0].className = "round29";
  document.getElementsByClassName("round28")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.75e7 * player.prestigeMul;
  } else {
    player.money += 3.5e7 * player.prestigeMul;
  }
}

function n30() {
  if(player.ddd == 0) {
    player.upgBlocks += 2;
    document.getElementsByClassName("a1")[0].className = "a"+(player.upgBlocks-1);
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.ddd = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .00225;
    player.superMoneyFactor += .0045;
  }
  document.getElementsByClassName("round29")[0].className = "round30";
  document.getElementsByClassName("round29")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.6e8 * player.prestigeMul;
  } else {
    player.money += 8e7 * player.prestigeMul;
  }
}

function n31() {
  if(player.eee == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.eee = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .00242;
    player.superMoneyFactor += .00484;
  }
  document.getElementsByClassName("round30")[0].className = "round31";
  document.getElementsByClassName("round30")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 3.2e8 * player.prestigeMul;
  } else {
    player.money += 1.6e8 * player.prestigeMul;
  }
}

function n32() {
  if(player.fff == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.fff = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .00258;
    player.superMoneyFactor += .00516;
  }
  document.getElementsByClassName("round31")[0].className = "round32";
  document.getElementsByClassName("round31")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 8.4e8 * player.prestigeMul;
  } else {
    player.money += 4.2e8 * player.prestigeMul;
  }
}

function n33() {
  if(player.ggg == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.ggg = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .00277;
    player.superMoneyFactor += .00554;
  }
  document.getElementsByClassName("round32")[0].className = "round33";
  document.getElementsByClassName("round32")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 2e9 * player.prestigeMul;
  } else {
    player.money += 1e9 * player.prestigeMul;
  }
}

function n34() {
  if(player.hhh == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.hhh = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .003;
    player.superMoneyFactor += .006;
  }
  document.getElementsByClassName("round33")[0].className = "round34";
  document.getElementsByClassName("round33")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 6e9 * player.prestigeMul;
  } else {
    player.money += 3e9 * player.prestigeMul;
  }
}

function n35() {
  if(player.iii == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.iii = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .00321;
    player.superMoneyFactor += .00442;
  }
  document.getElementsByClassName("round34")[0].className = "round35";
  document.getElementsByClassName("round34")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.8e10 * player.prestigeMul;
  } else {
    player.money += 9e9 * player.prestigeMul;
  }
}

function n36() {
  if(player.jjj == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.jjj = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .00343;
    player.superMoneyFactor += .00686;
  }
  document.getElementsByClassName("round35")[0].className = "round36";
  document.getElementsByClassName("round35")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 6e10 * player.prestigeMul;
  } else {
    player.money += 3e10 * player.prestigeMul;
  }
}

function n37() {
  if(player.kkk == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.kkk = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .00366;
    player.superMoneyFactor += .00734;
  }
  document.getElementsByClassName("round36")[0].className = "round37";
  document.getElementsByClassName("round36")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 2e11 * player.prestigeMul;
  } else {
    player.money += 1e11 * player.prestigeMul;
  }
}

function n38() {
  if(player.lll == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.lll = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .0039;
    player.superMoneyFactor += .0078;
  }
  document.getElementsByClassName("round37")[0].className = "round38";
  document.getElementsByClassName("round37")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 7e11 * player.prestigeMul;
  } else {
    player.money += 3.5e11 * player.prestigeMul;
  }
}

function n39() {
  if(player.mmm == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.mmm = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .00415;
    player.superMoneyFactor += .0083;
  }
  document.getElementsByClassName("round38")[0].className = "round39";
  document.getElementsByClassName("round38")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 2e12 * player.prestigeMul;
  } else {
    player.money += 1e12 * player.prestigeMul;
  }
}

function n40() {
  if(player.nnn == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.nnn = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .00445;
    player.superMoneyFactor += .0089;
  }
  document.getElementsByClassName("round39")[0].className = "round40";
  document.getElementsByClassName("round39")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 7.6e12 * player.prestigeMul;
  } else {
    player.money += 3.8e12 * player.prestigeMul;
  }
}

function n41() {
  if(player.ooo == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.ooo = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .00475;
    player.superMoneyFactor += .00950;
  }
  document.getElementsByClassName("round40")[0].className = "round41";
  document.getElementsByClassName("round40")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 2.6e13 * player.prestigeMul;
  } else {
    player.money += 1.3e13 * player.prestigeMul;
  }
}

function n42() {
  if(player.ppp == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.ppp = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .0051;
    player.superMoneyFactor += .0102;
  }
  document.getElementsByClassName("round41")[0].className = "round42";
  document.getElementsByClassName("round41")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1e14 * player.prestigeMul;
  } else {
    player.money += 5e13 * player.prestigeMul;
  }
}

function n43() {
  if(player.qqq == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.qqq = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .0055;
    player.superMoneyFactor += .011;
  }
  document.getElementsByClassName("round42")[0].className = "round43";
  document.getElementsByClassName("round42")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 4e14 * player.prestigeMul;
  } else {
    player.money += 2e14 * player.prestigeMul;
  }
}

function n44() {
  if(player.rrr == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.rrr = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .006;
    player.superMoneyFactor += .012;
  }
  document.getElementsByClassName("round43")[0].className = "round44";
  document.getElementsByClassName("round43")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.2e15 * player.prestigeMul;
  } else {
    player.money += 6e14 * player.prestigeMul;
  }
}

function n45() {
  if(player.sss == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.sss = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .0065;
    player.superMoneyFactor += .013;
  }
  document.getElementsByClassName("round44")[0].className = "round45";
  document.getElementsByClassName("round44")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 3e15 * player.prestigeMul;
  } else {
    player.money += 1.5e15 * player.prestigeMul;
  }
}

function n46() {
  if(player.ttt == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.ttt = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .0071;
    player.superMoneyFactor += .0142;
  }
  document.getElementsByClassName("round45")[0].className = "round46";
  document.getElementsByClassName("round45")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1e16 * player.prestigeMul;
  } else {
    player.money += 5e15 * player.prestigeMul;
  }
}

function n47() {
  if(player.uuu == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.uuu = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .0077;
    player.superMoneyFactor += .0154;
  }
  document.getElementsByClassName("round46")[0].className = "round47";
  document.getElementsByClassName("round46")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 3e16 * player.prestigeMul;
  } else {
    player.money += 1.5e16 * player.prestigeMul;
  }
}

function n48() {
  if(player.vvv == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.vvv = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .0084;
    player.superMoneyFactor += .0168;
  }
  document.getElementsByClassName("round47")[0].className = "round48";
  document.getElementsByClassName("round47")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 9e16 * player.prestigeMul;
  } else {
    player.money += 4.5e16 * player.prestigeMul;
  }
}

function n49() {
  if(player.www == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.www = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .009;
    player.superMoneyFactor += .018;
  }
  document.getElementsByClassName("round48")[0].className = "round49";
  document.getElementsByClassName("round48")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 2.7e17 * player.prestigeMul;
  } else {
    player.money += 1.35e17 * player.prestigeMul;
  }
}

function n50() {
  if(player.x4x == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.x4x = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .01;
    player.superMoneyFactor += .02;
  }
  document.getElementsByClassName("round49")[0].className = "round50";
  document.getElementsByClassName("round49")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 6.1e17 * player.prestigeMul;
  } else {
    player.money += 3.05e17 * player.prestigeMul;
  }
}

function n51() {
  if(player.yyy == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.yyy = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .012;
    player.superMoneyFactor += .024;
  }
  document.getElementsByClassName("round50")[0].className = "round51";
  document.getElementsByClassName("round50")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.83e18 * player.prestigeMul;
  } else {
    player.money += 9.15e17 * player.prestigeMul;
  }
}

function n52() {
  if(player.zzz == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.zzz = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .0142;
    player.superMoneyFactor += .0284;
  }
  document.getElementsByClassName("round51")[0].className = "round52";
  document.getElementsByClassName("round51")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 6e18 * player.prestigeMul;
  } else {
    player.money += 3e18 * player.prestigeMul;
  }
}

function n53() {
  if(player.aaaa == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.aaaa = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .0168;
    player.superMoneyFactor += .0336;
  }
  document.getElementsByClassName("round52")[0].className = "round53";
  document.getElementsByClassName("round52")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.8e19 * player.prestigeMul;
  } else {
    player.money += 9e18 * player.prestigeMul;
  }
}

function n54() {
  if(player.bbbb == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.bbbb = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .02;
    player.superMoneyFactor += .04;
  }
  document.getElementsByClassName("round53")[0].className = "round54";
  document.getElementsByClassName("round53")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5.4e19 * player.prestigeMul;
  } else {
    player.money += 2.7e19 * player.prestigeMul;
  }
}

function n55() {
  if(player.cccc == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.cccc = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .024;
    player.superMoneyFactor += .048;
  }
  document.getElementsByClassName("round54")[0].className = "round55";
  document.getElementsByClassName("round54")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.62e20 * player.prestigeMul;
  } else {
    player.money += 8.1e19 * player.prestigeMul;
  }
}

function n56() {
  if(player.dddd == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.dddd = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .03;
    player.superMoneyFactor += .06;
  }
  document.getElementsByClassName("round55")[0].className = "round56";
  document.getElementsByClassName("round55")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5.5e20 * player.prestigeMul;
  } else {
    player.money += 2.75e20 * player.prestigeMul;
  }
}

function n57() {
  if(player.eeee == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.eeee = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .04;
    player.superMoneyFactor += .08;
  }
  document.getElementsByClassName("round56")[0].className = "round57";
  document.getElementsByClassName("round56")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e21 * player.prestigeMul;
  } else {
    player.money += 7.5e20 * player.prestigeMul;
  }
}

function n58() {
  if(player.ffff == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.ffff = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .041;
    player.superMoneyFactor += .082;
  }
  document.getElementsByClassName("round57")[0].className = "round58";
  document.getElementsByClassName("round57")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5.5e21 * player.prestigeMul;
  } else {
    player.money += 2.25e21 * player.prestigeMul;
  }
}

function n59() {
  if(player.gggg == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.gggg = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .042;
    player.superMoneyFactor += .084;
  }
  document.getElementsByClassName("round58")[0].className = "round59";
  document.getElementsByClassName("round58")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e22 * player.prestigeMul;
  } else {
    player.money += 7.5e21 * player.prestigeMul;
  }
}

function n60() {
  if(player.hhhh == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.hhhh = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .0432;
    player.superMoneyFactor += .864;
  }
  document.getElementsByClassName("round59")[0].className = "round60";
  document.getElementsByClassName("round59")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e22 * player.prestigeMul;
  } else {
    player.money += 2.5e22 * player.prestigeMul;
  }
}

function n61() {
  if(player.iiii == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.iiii = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .045;
    player.superMoneyFactor += .09;
  }
  document.getElementsByClassName("round60")[0].className = "round61";
  document.getElementsByClassName("round60")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e23 * player.prestigeMul;
  } else {
    player.money += 7.5e22 * player.prestigeMul;
  }
}

function n62() {
  if(player.jjjj == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.jjjj = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .046;
    player.superMoneyFactor += .092;
  }
  document.getElementsByClassName("round61")[0].className = "round62";
  document.getElementsByClassName("round61")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e23 * player.prestigeMul;
  } else {
    player.money += 2.5e23 * player.prestigeMul;
  }
}

function n63() {
  if(player.kkkk == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.kkkk = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .047;
    player.superMoneyFactor += .94;
  }
  document.getElementsByClassName("round62")[0].className = "round63";
  document.getElementsByClassName("round62")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e24 * player.prestigeMul;
  } else {
    player.money += 7.5e23 * player.prestigeMul;
  }
}

function n64() {
  if(player.llll == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.llll = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .048;
    player.superMoneyFactor += .096;
  }
  document.getElementsByClassName("round63")[0].className = "round64";
  document.getElementsByClassName("round63")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 6e24 * player.prestigeMul;
  } else {
    player.money += 3e24 * player.prestigeMul;
  }
}

function n65() {
  if(player.mmmm == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.mmmm = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .05;
    player.superMoneyFactor += .1;
  }
  document.getElementsByClassName("round64")[0].className = "round65";
  document.getElementsByClassName("round64")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.8e25 * player.prestigeMul;
  } else {
    player.money += 9e24 * player.prestigeMul;
  }
}

function n66() {
  if(player.nnnn == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.nnnn = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .051;
    player.superMoneyFactor += .102;
  }
  document.getElementsByClassName("round65")[0].className = "round66";
  document.getElementsByClassName("round65")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5.4e25 * player.prestigeMul;
  } else {
    player.money += 2.7e25 * player.prestigeMul;
  }
}

function n67() {
  if(player.oooo == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.oooo = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .052;
    player.superMoneyFactor += .104;
  }
  document.getElementsByClassName("round66")[0].className = "round67";
  document.getElementsByClassName("round66")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.62e26 * player.prestigeMul;
  } else {
    player.money += 8.1e25 * player.prestigeMul;
  }
}

function n68() {
  if(player.pppp == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.pppp = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .053;
    player.superMoneyFactor += .106;
  }
  document.getElementsByClassName("round67")[0].className = "round68";
  document.getElementsByClassName("round67")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 4.86e26 * player.prestigeMul;
  } else {
    player.money += 2.43e26 * player.prestigeMul;
  }
}

function n69() {
  if(player.qqqq == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.qqqq = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .054;
    player.superMoneyFactor += .108;
  }
  document.getElementsByClassName("round68")[0].className = "round69";
  document.getElementsByClassName("round68")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e27 * player.prestigeMul;
  } else {
    player.money += 7.5e26 * player.prestigeMul;
  }
}

function n70() {
  if(player.rrrr == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.rrrr = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .055;
    player.superMoneyFactor += .11;
  }
  document.getElementsByClassName("round69")[0].className = "round70";
  document.getElementsByClassName("round69")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5.5e27 * player.prestigeMul;
  } else {
    player.money += 2.25e27 * player.prestigeMul;
  }
}

function n71() {
  if(player.ssss == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.ssss = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .056;
    player.superMoneyFactor += .112;
  }
  document.getElementsByClassName("round70")[0].className = "round71";
  document.getElementsByClassName("round70")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e28 * player.prestigeMul;
  } else {
    player.money += 7.5e27 * player.prestigeMul;
  }
}

function n72() {
  if(player.tttt == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.tttt = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .057;
    player.superMoneyFactor += .114;
  }
  document.getElementsByClassName("round71")[0].className = "round72";
  document.getElementsByClassName("round71")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e28 * player.prestigeMul;
  } else {
    player.money += 2.5e28 * player.prestigeMul;
  }
}

function n73() {
  if(player.uuuu == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.uuuu = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .058;
    player.superMoneyFactor += .116;
  }
  document.getElementsByClassName("round72")[0].className = "round73";
  document.getElementsByClassName("round72")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e29 * player.prestigeMul;
  } else {
    player.money += 7.5e28 * player.prestigeMul;
  }
}

function n74() {
  if(player.vvvv == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.vvvv = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .059;
    player.superMoneyFactor += .0118;
  }
  document.getElementsByClassName("round73")[0].className = "round74";
  document.getElementsByClassName("round73")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 4.5e29 * player.prestigeMul;
  } else {
    player.money += 2.25e29 * player.prestigeMul;
  }
}

function n75() {
  if(player.wwww == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.wwww = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .06;
    player.superMoneyFactor += .12;
  }
  document.getElementsByClassName("round74")[0].className = "round75";
  document.getElementsByClassName("round74")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e30 * player.prestigeMul;
  } else {
    player.money += 7.5e29 * player.prestigeMul;
  }
}

function n76() {
  if(player.x44x == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.x44x = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .062;
    player.superMoneyFactor += .124;
  }
  document.getElementsByClassName("round75")[0].className = "round76";
  document.getElementsByClassName("round75")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e30 * player.prestigeMul;
  } else {
    player.money += 2.5e30 * player.prestigeMul;
  }
}

function n77() {
  if(player.yyyy == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.yyyy = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .064;
    player.superMoneyFactor += .128;
  }
  document.getElementsByClassName("round76")[0].className = "round77";
  document.getElementsByClassName("round76")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e31 * player.prestigeMul;
  } else {
    player.money += 7.5e30 * player.prestigeMul;
  }
}

function n78() {
  if(player.zzzz == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.zzzz = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .065;
    player.superMoneyFactor += .13;
  }
  document.getElementsByClassName("round77")[0].className = "round78";
  document.getElementsByClassName("round77")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e31 * player.prestigeMul;
  } else {
    player.money += 2.5e31 * player.prestigeMul;
  }
}

function n79() {
  if(player.aaaaa == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.aaaaa = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .066;
    player.superMoneyFactor += .132;
  }
  document.getElementsByClassName("round78")[0].className = "round79";
  document.getElementsByClassName("round78")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e32 * player.prestigeMul;
  } else {
    player.money += 7.5e31 * player.prestigeMul;
  }
}

function n80() {
  if(player.bbbbb == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.bbbbb = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .068;
    player.superMoneyFactor += .136;
  }
  document.getElementsByClassName("round79")[0].className = "round80";
  document.getElementsByClassName("round79")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e32 * player.prestigeMul;
  } else {
    player.money += 2.5e32 * player.prestigeMul;
  }
}

function n81() {
  if(player.ccccc == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.ccccc = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .07;
    player.superMoneyFactor += .14;
  }
  document.getElementsByClassName("round80")[0].className = "round81";
  document.getElementsByClassName("round80")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e33 * player.prestigeMul;
  } else {
    player.money += 7.5e32 * player.prestigeMul;
  }
}

function n82() {
  if(player.ddddd == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.ddddd = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .071;
    player.superMoneyFactor += .142;
  }
  document.getElementsByClassName("round81")[0].className = "round82";
  document.getElementsByClassName("round81")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e33 * player.prestigeMul;
  } else {
    player.money += 2.5e33 * player.prestigeMul;
  }
}

function n83() {
  if(player.eeeee == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.eeeee = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .072;
    player.superMoneyFactor += .144;
  }
  document.getElementsByClassName("round82")[0].className = "round83";
  document.getElementsByClassName("round82")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e34 * player.prestigeMul;
  } else {
    player.money += 7.5e33 * player.prestigeMul;
  }
}

function n84() {
  if(player.fffff == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.fffff = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .073;
    player.superMoneyFactor += .146;
  }
  document.getElementsByClassName("round83")[0].className = "round84";
  document.getElementsByClassName("round83")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e34 * player.prestigeMul;
  } else {
    player.money += 2.5e34 * player.prestigeMul;
  }
}

function n85() {
  if(player.ggggg == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.ggggg = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .074;
    player.superMoneyFactor += .148;
  }
  document.getElementsByClassName("round84")[0].className = "round85";
  document.getElementsByClassName("round84")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e35 * player.prestigeMul;
  } else {
    player.money += 7.5e34 * player.prestigeMul;
  }
}

function n86() {
  if(player.hhhhh == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.hhhhh = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .075;
    player.superMoneyFactor += .15;
  }
  document.getElementsByClassName("round85")[0].className = "round86";
  document.getElementsByClassName("round85")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e35 * player.prestigeMul;
  } else {
    player.money += 2.5e35 * player.prestigeMul;
  }
}

function n87() {
  if(player.iiiii == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.iiiii = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .076;
    player.superMoneyFactor += .152;
  }
  document.getElementsByClassName("round86")[0].className = "round87";
  document.getElementsByClassName("round86")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e36 * player.prestigeMul;
  } else {
    player.money += 7.5e35 * player.prestigeMul;
  }
}

function n88() {
  if(player.j1 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.j1 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .077;
    player.superMoneyFactor += .154;
  }
  document.getElementsByClassName("round87")[0].className = "round88";
  document.getElementsByClassName("round87")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e36 * player.prestigeMul;
  } else {
    player.money += 2.5e36 * player.prestigeMul;
  }
}

function n89() {
  if(player.j2 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.j2 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .078;
    player.superMoneyFactor += .156;
  }
  document.getElementsByClassName("round88")[0].className = "round89";
  document.getElementsByClassName("round88")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e37 * player.prestigeMul;
  } else {
    player.money += 7.5e36 * player.prestigeMul;
  }
}

function n90() {
  if(player.j3 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.j3 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .079;
    player.superMoneyFactor += .158;
  }
  document.getElementsByClassName("round89")[0].className = "round90";
  document.getElementsByClassName("round89")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e37 * player.prestigeMul;
  } else {
    player.money += 2.5e37 * player.prestigeMul;
  }
}

function n91() {
  if(player.j4 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.j4 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .08;
    player.superMoneyFactor += .16;
  }
  document.getElementsByClassName("round90")[0].className = "round91";
  document.getElementsByClassName("round90")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e38 * player.prestigeMul;
  } else {
    player.money += 7.5e37 * player.prestigeMul;
  }
}

function n92() {
  if(player.j5 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.j5 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .0815;
    player.superMoneyFactor += .163;
  }
  document.getElementsByClassName("round91")[0].className = "round92";
  document.getElementsByClassName("round91")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e38 * player.prestigeMul;
  } else {
    player.money += 2.5e38 * player.prestigeMul;
  }
}

function n93() {
  if(player.j6 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.j6 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .083;
    player.superMoneyFactor += .166;
  }
  document.getElementsByClassName("round92")[0].className = "round93";
  document.getElementsByClassName("round92")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e39 * player.prestigeMul;
  } else {
    player.money += 7.5e38 * player.prestigeMul;
  }
}

function n94() {
  if(player.j7 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.j7 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .084;
    player.superMoneyFactor += .168;
  }
  document.getElementsByClassName("round93")[0].className = "round94";
  document.getElementsByClassName("round93")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e39 * player.prestigeMul;
  } else {
    player.money += 2.5e39 * player.prestigeMul;
  }
}

function n95() {
  if(player.j8 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.j8 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .085;
    player.superMoneyFactor += .17;
  }
  document.getElementsByClassName("round94")[0].className = "round95";
  document.getElementsByClassName("round94")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e40 * player.prestigeMul;
  } else {
    player.money += 7.5e39 * player.prestigeMul;
  }
}

function n96() {
  if(player.j9 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.j9 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .086;
    player.superMoneyFactor += .172;
  }
  document.getElementsByClassName("round95")[0].className = "round96";
  document.getElementsByClassName("round95")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e40 * player.prestigeMul;
  } else {
    player.money += 2.5e40 * player.prestigeMul;
  }
}

function n97() {
  if(player.k1 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.k1 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .087;
    player.superMoneyFactor += .174;
  }
  document.getElementsByClassName("round96")[0].className = "round97";
  document.getElementsByClassName("round96")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e41 * player.prestigeMul;
  } else {
    player.money += 7.5e40 * player.prestigeMul;
  }
}

function n98() {
  if(player.k2 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.k2 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .088;
    player.superMoneyFactor += .176;
  }
  document.getElementsByClassName("round97")[0].className = "round98";
  document.getElementsByClassName("round97")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e41 * player.prestigeMul;
  } else {
    player.money += 2.5e41 * player.prestigeMul;
  }
}

function n99() {
  if(player.k3 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.k3 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .089;
    player.superMoneyFactor += .178;
  }
  document.getElementsByClassName("round98")[0].className = "round99";
  document.getElementsByClassName("round98")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e42 * player.prestigeMul;
  } else {
    player.money += 7.5e41 * player.prestigeMul;
  }
}

function n100() {
  if(player.k4 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.k4 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .09;
    player.superMoneyFactor += .18;
  }
  document.getElementsByClassName("round99")[0].className = "round100";
  document.getElementsByClassName("round99")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e42 * player.prestigeMul;
  } else {
    player.money += 2.5e42 * player.prestigeMul;
  }
}

function n101() {
  if(player.k5 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.k5 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .092;
    player.superMoneyFactor += .184;
  }
  document.getElementsByClassName("round100")[0].className = "round101";
  document.getElementsByClassName("round100")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e43 * player.prestigeMul;
  } else {
    player.money += 7.5e42 * player.prestigeMul;
  }
}

function n102() {
  if(player.k6 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.k6 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .093;
    player.superMoneyFactor += .186;
  }
  document.getElementsByClassName("round101")[0].className = "round102";
  document.getElementsByClassName("round101")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e43 * player.prestigeMul;
  } else {
    player.money += 2.5e43 * player.prestigeMul;
  }
}

function n103() {
  if(player.k7 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.k7 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .094;
    player.superMoneyFactor += .188;
  }
  document.getElementsByClassName("round102")[0].className = "round103";
  document.getElementsByClassName("round102")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e44 * player.prestigeMul;
  } else {
    player.money += 7.5e43 * player.prestigeMul;
  }
}

function n104() {
  if(player.k8 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.k8 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .095;
    player.superMoneyFactor += .19;
  }
  document.getElementsByClassName("round103")[0].className = "round104";
  document.getElementsByClassName("round103")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e44 * player.prestigeMul;
  } else {
    player.money += 2.5e44 * player.prestigeMul;
  }
}

function n105() {
  if(player.k9 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.k9 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .096;
    player.superMoneyFactor += .192;
  }
  document.getElementsByClassName("round104")[0].className = "round105";
  document.getElementsByClassName("round104")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e45 * player.prestigeMul;
  } else {
    player.money += 7.5e44 * player.prestigeMul;
  }
}

function n106() {
  if(player.m1 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.m1 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .097;
    player.superMoneyFactor += .194;
  }
  document.getElementsByClassName("round105")[0].className = "round106";
  document.getElementsByClassName("round105")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e45 * player.prestigeMul;
  } else {
    player.money += 2.5e45 * player.prestigeMul;
  }
}

function n107() {
  if(player.m2 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.m2 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .098;
    player.superMoneyFactor += .196;
  }
  document.getElementsByClassName("round106")[0].className = "round107";
  document.getElementsByClassName("round106")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e46 * player.prestigeMul;
  } else {
    player.money += 7.5e45 * player.prestigeMul;
  }
}

function n108() {
  if(player.m3 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.m3 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .099;
    player.superMoneyFactor += .198;
  }
  document.getElementsByClassName("round107")[0].className = "round108";
  document.getElementsByClassName("round107")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e46 * player.prestigeMul;
  } else {
    player.money += 2.5e46 * player.prestigeMul;
  }
}

function n109() {
  if(player.m4 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.m4 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .1;
    player.superMoneyFactor += .2;
  }
  document.getElementsByClassName("round108")[0].className = "round109";
  document.getElementsByClassName("round108")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e47 * player.prestigeMul;
  } else {
    player.money += 7.5e46 * player.prestigeMul;
  }
}

function n110() {
  if(player.m5 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.m5 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .102;
    player.superMoneyFactor += .204;
  }
  document.getElementsByClassName("round109")[0].className = "round110";
  document.getElementsByClassName("round109")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e47 * player.prestigeMul;
  } else {
    player.money += 2.5e47 * player.prestigeMul;
  }
}

function n111() {
  if(player.m6 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.m6 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .104;
    player.superMoneyFactor += .208;
  }
  document.getElementsByClassName("round110")[0].className = "round111";
  document.getElementsByClassName("round110")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e48 * player.prestigeMul;
  } else {
    player.money += 7.5e47 * player.prestigeMul;
  }
}

function n112() {
  if(player.m7 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.m7 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .105;
    player.superMoneyFactor += .21;
  }
  document.getElementsByClassName("round111")[0].className = "round112";
  document.getElementsByClassName("round111")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e48 * player.prestigeMul;
  } else {
    player.money += 2.5e48 * player.prestigeMul;
  }
}

function n113() {
  if(player.m8 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.m8 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .106;
    player.superMoneyFactor += .212;
  }
  document.getElementsByClassName("round112")[0].className = "round113";
  document.getElementsByClassName("round112")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e49 * player.prestigeMul;
  } else {
    player.money += 7.5e48 * player.prestigeMul;
  }
}

function n114() {
  if(player.m9 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.m9 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .107;
    player.superMoneyFactor += .214;
  }
  document.getElementsByClassName("round113")[0].className = "round114";
  document.getElementsByClassName("round113")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e49 * player.prestigeMul;
  } else {
    player.money += 2.5e49 * player.prestigeMul;
  }
}

function n115() {
  if(player.n1 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.n1 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .108;
    player.superMoneyFactor += .216;
  }
  document.getElementsByClassName("round114")[0].className = "round115";
  document.getElementsByClassName("round114")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e50 * player.prestigeMul;
  } else {
    player.money += 7.5e49 * player.prestigeMul;
  }
}

function n116() {
  if(player.n2 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.n2 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .109;
    player.superMoneyFactor += .218;
  }
  document.getElementsByClassName("round115")[0].className = "round116";
  document.getElementsByClassName("round115")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e50 * player.prestigeMul;
  } else {
    player.money += 2.5e50 * player.prestigeMul;
  }
}

function n117() {
  if(player.n3 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.n3 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .11;
    player.superMoneyFactor += .22;
  }
  document.getElementsByClassName("round116")[0].className = "round117";
  document.getElementsByClassName("round116")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e51 * player.prestigeMul;
  } else {
    player.money += 7.5e50 * player.prestigeMul;
  }
}

function n118() {
  if(player.n4 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.n4 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .111;
    player.superMoneyFactor += .222;
  }
  document.getElementsByClassName("round117")[0].className = "round118";
  document.getElementsByClassName("round117")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e51 * player.prestigeMul;
  } else {
    player.money += 2.5e51 * player.prestigeMul;
  }
}

function n119() {
  if(player.n5 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.n5 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .112;
    player.superMoneyFactor += .224;
  }
  document.getElementsByClassName("round118")[0].className = "round119";
  document.getElementsByClassName("round118")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e52 * player.prestigeMul;
  } else {
    player.money += 7.5e51 * player.prestigeMul;
  }
}

function n120() {
  if(player.n6 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.n6 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .113;
    player.superMoneyFactor += .226;
  }
  document.getElementsByClassName("round119")[0].className = "round120";
  document.getElementsByClassName("round119")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e52 * player.prestigeMul;
  } else {
    player.money += 2.5e52 * player.prestigeMul;
  }
}

function n121() {
  if(player.jjjjj == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.jjjjj = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .114;
    player.superMoneyFactor += .228;
  }
  document.getElementsByClassName("round120")[0].className = "round121";
  document.getElementsByClassName("round120")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e53 * player.prestigeMul;
  } else {
    player.money += 7.5e52 * player.prestigeMul;
  }
}

function n122() {
  if(player.kkkkk == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.kkkkk = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .115;
    player.superMoneyFactor += .23;
  }
  document.getElementsByClassName("round121")[0].className = "round122";
  document.getElementsByClassName("round121")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e53 * player.prestigeMul;
  } else {
    player.money += 2.5e53 * player.prestigeMul;
  }
}

function n123() {
  if(player.lllll == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.lllll = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .116;
    player.superMoneyFactor += .232;
  }
  document.getElementsByClassName("round122")[0].className = "round123";
  document.getElementsByClassName("round122")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e54 * player.prestigeMul;
  } else {
    player.money += 7.5e53 * player.prestigeMul;
  }
}

function n124() {
  if(player.mmmmm == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.mmmmm = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .117;
    player.superMoneyFactor += .234;
  }
  document.getElementsByClassName("round123")[0].className = "round124";
  document.getElementsByClassName("round123")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e54 * player.prestigeMul;
  } else {
    player.money += 2.5e54 * player.prestigeMul;
  }
}

function n125() {
  if(player.nnnnn == 0) {
    player.upgBlocks++;
    //document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.nnnnn = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .118;
    player.superMoneyFactor += .236;
  }
  document.getElementsByClassName("round124")[0].className = "round125";
  document.getElementsByClassName("round124")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e55 * player.prestigeMul;
  } else {
    player.money += 7.5e54 * player.prestigeMul;
  }
}

function n126() {
  if(player.ooooo == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.ooooo = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .119;
    player.superMoneyFactor += .238;
  }
  document.getElementsByClassName("round125")[0].className = "round126";
  document.getElementsByClassName("round125")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e55 * player.prestigeMul;
  } else {
    player.money += 2.5e55 * player.prestigeMul;
  }
}

function n127() {
  if(player.ppppp == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.ppppp = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .12;
    player.superMoneyFactor += .24;
  }
  document.getElementsByClassName("round126")[0].className = "round127";
  document.getElementsByClassName("round126")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e56 * player.prestigeMul;
  } else {
    player.money += 7.5e55 * player.prestigeMul;
  }
}

function n128() {
  if(player.qqqqq == 0) {
    player.upgBlocks++;
    //document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.qqqqq = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .121;
    player.superMoneyFactor += .242;
  }
  document.getElementsByClassName("round127")[0].className = "round128";
  document.getElementsByClassName("round127")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e56 * player.prestigeMul;
  } else {
    player.money += 2.5e56 * player.prestigeMul;
  }
}

function n129() {
  if(player.rrrrr == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.rrrrr = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .122;
    player.superMoneyFactor += .244;
  }
  document.getElementsByClassName("round128")[0].className = "round129";
  document.getElementsByClassName("round128")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e57 * player.prestigeMul;
  } else {
    player.money += 7.5e56 * player.prestigeMul;
  }
}

function n130() {
  if(player.sssss == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.sssss = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .123;
    player.superMoneyFactor += .246;
  }
  document.getElementsByClassName("round129")[0].className = "round130";
  document.getElementsByClassName("round129")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e57 * player.prestigeMul;
  } else {
    player.money += 2.5e57 * player.prestigeMul;
  }
}

function n131() {
  if(player.ttttt == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.ttttt = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .124;
    player.superMoneyFactor += .248;
  }
  document.getElementsByClassName("round130")[0].className = "round131";
  document.getElementsByClassName("round130")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e58 * player.prestigeMul;
  } else {
    player.money += 7.5e57 * player.prestigeMul;
  }
}

function n132() {
  if(player.n7 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.n7 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .125;
    player.superMoneyFactor += .25;
  }
  document.getElementsByClassName("round131")[0].className = "round132";
  document.getElementsByClassName("round131")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e58 * player.prestigeMul;
  } else {
    player.money += 2.5e58 * player.prestigeMul;
  }
}

function n133() {
  if(player.n8 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.n8 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .125;
    player.superMoneyFactor += .25;
  }
  document.getElementsByClassName("round132")[0].className = "round133";
  document.getElementsByClassName("round132")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e59 * player.prestigeMul;
  } else {
    player.money += 7.5e58 * player.prestigeMul;
  }
}

function n134() {
  if(player.n9 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.n9 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .125;
    player.superMoneyFactor += .25;
  }
  document.getElementsByClassName("round133")[0].className = "round134";
  document.getElementsByClassName("round133")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e59 * player.prestigeMul;
  } else {
    player.money += 2.5e59 * player.prestigeMul;
  }
}

function n135() {
  if(player.n10 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.n10 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .125;
    player.superMoneyFactor += .25;
  }
  document.getElementsByClassName("round134")[0].className = "round135";
  document.getElementsByClassName("round134")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e60 * player.prestigeMul;
  } else {
    player.money += 7.5e59 * player.prestigeMul;
  }
}

function n136() {
  if(player.o1 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.o1 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .125;
    player.superMoneyFactor += .25;
  }
  document.getElementsByClassName("round135")[0].className = "round136";
  document.getElementsByClassName("round135")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e60 * player.prestigeMul;
  } else {
    player.money += 2.5e60 * player.prestigeMul;
  }
}

function n137() {
  if(player.o2 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.o2 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .125;
    player.superMoneyFactor += .25;
  }
  document.getElementsByClassName("round136")[0].className = "round137";
  document.getElementsByClassName("round136")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e61 * player.prestigeMul;
  } else {
    player.money += 7.5e60 * player.prestigeMul;
  }
}

function n138() {
  if(player.o3 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.o3 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .125;
    player.superMoneyFactor += .25;
  }
  document.getElementsByClassName("round137")[0].className = "round138";
  document.getElementsByClassName("round137")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e61 * player.prestigeMul;
  } else {
    player.money += 2.5e61 * player.prestigeMul;
  }
}

function n139() {
  if(player.o4 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.o4 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .125;
    player.superMoneyFactor += .25;
  }
  document.getElementsByClassName("round138")[0].className = "round139";
  document.getElementsByClassName("round138")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e62 * player.prestigeMul;
  } else {
    player.money += 7.5e61 * player.prestigeMul;
  }
}

function n140() {
  if(player.o5 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.o5 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .13;
    player.superMoneyFactor += .26;
  }
  document.getElementsByClassName("round139")[0].className = "round140";
  document.getElementsByClassName("round139")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e62 * player.prestigeMul;
  } else {
    player.money += 2.5e62 * player.prestigeMul;
  }
}

function n141() {
  if(player.o6 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.o6 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .13;
    player.superMoneyFactor += .26;
  }
  document.getElementsByClassName("round140")[0].className = "round141";
  document.getElementsByClassName("round140")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e63 * player.prestigeMul;
  } else {
    player.money += 7.5e62 * player.prestigeMul;
  }
}

function n142() {
  if(player.o7 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.o7 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .13;
    player.superMoneyFactor += .26;
  }
  document.getElementsByClassName("round141")[0].className = "round142";
  document.getElementsByClassName("round141")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e63 * player.prestigeMul;
  } else {
    player.money += 2.5e63 * player.prestigeMul;
  }
}

function n143() {
  if(player.o8 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.o8 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .13;
    player.superMoneyFactor += .26;
  }
  document.getElementsByClassName("round142")[0].className = "round143";
  document.getElementsByClassName("round142")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e64 * player.prestigeMul;
  } else {
    player.money += 7.5e63 * player.prestigeMul;
  }
}

function n144() {
  if(player.o9 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.o9 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .13;
    player.superMoneyFactor += .26;
  }
  document.getElementsByClassName("round143")[0].className = "round144";
  document.getElementsByClassName("round143")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e64 * player.prestigeMul;
  } else {
    player.money += 2.5e64 * player.prestigeMul;
  }
}

function n145() {
  if(player.o10 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.o10 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .13;
    player.superMoneyFactor += .26;
  }
  document.getElementsByClassName("round144")[0].className = "round145";
  document.getElementsByClassName("round144")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e65 * player.prestigeMul;
  } else {
    player.money += 7.5e64 * player.prestigeMul;
  }
}

function n146() {
  if(player.p1 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.p1 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .13;
    player.superMoneyFactor += .26;
  }
  document.getElementsByClassName("round145")[0].className = "round146";
  document.getElementsByClassName("round145")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e65 * player.prestigeMul;
  } else {
    player.money += 2.5e65 * player.prestigeMul;
  }
}

function n147() {
  if(player.p2 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.p2 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .13;
    player.superMoneyFactor += .26;
  }
  document.getElementsByClassName("round146")[0].className = "round147";
  document.getElementsByClassName("round146")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e66 * player.prestigeMul;
  } else {
    player.money += 7.5e65 * player.prestigeMul;
  }
}

function n148() {
  if(player.p3 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.p3 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .13;
    player.superMoneyFactor += .26;
  }
  document.getElementsByClassName("round147")[0].className = "round148";
  document.getElementsByClassName("round147")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e66 * player.prestigeMul;
  } else {
    player.money += 2.5e66 * player.prestigeMul;
  }
}

function n149() {
  if(player.p4 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.p4 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .13;
    player.superMoneyFactor += .26;
  }
  document.getElementsByClassName("round148")[0].className = "round149";
  document.getElementsByClassName("round148")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e67 * player.prestigeMul;
  } else {
    player.money += 7.5e66 * player.prestigeMul;
  }
}

function n150() {
  if(player.p5 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.p5 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .14;
    player.superMoneyFactor += .28;
  }
  document.getElementsByClassName("round149")[0].className = "round150";
  document.getElementsByClassName("round149")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e67 * player.prestigeMul;
  } else {
    player.money += 2.5e67 * player.prestigeMul;
  }
}

function n151() {
  if(player.p6 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.p6 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .14;
    player.superMoneyFactor += .28;
  }
  document.getElementsByClassName("round150")[0].className = "round151";
  document.getElementsByClassName("round150")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e68 * player.prestigeMul;
  } else {
    player.money += 7.5e67 * player.prestigeMul;
  }
}

function n152() {
  if(player.p7 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.p7 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .14;
    player.superMoneyFactor += .28;
  }
  document.getElementsByClassName("round151")[0].className = "round152";
  document.getElementsByClassName("round151")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e68 * player.prestigeMul;
  } else {
    player.money += 2.5e68 * player.prestigeMul;
  }
}

function n153() {
  if(player.p8 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.p8 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .14;
    player.superMoneyFactor += .28;
  }
  document.getElementsByClassName("round152")[0].className = "round153";
  document.getElementsByClassName("round152")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e69 * player.prestigeMul;
  } else {
    player.money += 7.5e68 * player.prestigeMul;
  }
}

function n154() {
  if(player.p9 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.p9 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .14;
    player.superMoneyFactor += .28;
  }
  document.getElementsByClassName("round153")[0].className = "round154";
  document.getElementsByClassName("round153")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e69 * player.prestigeMul;
  } else {
    player.money += 2.5e69 * player.prestigeMul;
  }
}

function n155() {
  if(player.p10 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.p10 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .14;
    player.superMoneyFactor += .28;
  }
  document.getElementsByClassName("round154")[0].className = "round155";
  document.getElementsByClassName("round154")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e70 * player.prestigeMul;
  } else {
    player.money += 7.5e69 * player.prestigeMul;
  }
}

function n156() {
  if(player.q1 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.q1 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .14;
    player.superMoneyFactor += .28;
  }
  document.getElementsByClassName("round155")[0].className = "round156";
  document.getElementsByClassName("round155")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e70 * player.prestigeMul;
  } else {
    player.money += 2.5e70 * player.prestigeMul;
  }
}

function n157() {
  if(player.q2 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.q2 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .14;
    player.superMoneyFactor += .28;
  }
  document.getElementsByClassName("round156")[0].className = "round157";
  document.getElementsByClassName("round156")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e71 * player.prestigeMul;
  } else {
    player.money += 7.5e70 * player.prestigeMul;
  }
}

function n158() {
  if(player.q3 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.q3 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .14;
    player.superMoneyFactor += .28;
  }
  document.getElementsByClassName("round157")[0].className = "round158";
  document.getElementsByClassName("round157")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e71 * player.prestigeMul;
  } else {
    player.money += 2.5e71 * player.prestigeMul;
  }
}

function n159() {
  if(player.q4 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.q4 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .14;
    player.superMoneyFactor += .28;
  }
  document.getElementsByClassName("round158")[0].className = "round159";
  document.getElementsByClassName("round158")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e72 * player.prestigeMul;
  } else {
    player.money += 7.5e71 * player.prestigeMul;
  }
}

function n160() {
  if(player.q5 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.q5 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .15;
    player.superMoneyFactor += .3;
  }
  document.getElementsByClassName("round159")[0].className = "round160";
  document.getElementsByClassName("round159")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e72 * player.prestigeMul;
  } else {
    player.money += 2.5e72 * player.prestigeMul;
  }
}

function n161() {
  if(player.q6 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.q6 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .15;
    player.superMoneyFactor += .3;
  }
  document.getElementsByClassName("round160")[0].className = "round161";
  document.getElementsByClassName("round160")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e73 * player.prestigeMul;
  } else {
    player.money += 7.5e72 * player.prestigeMul;
  }
}

function n162() {
  if(player.q7 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.q7 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .15;
    player.superMoneyFactor += .3;
  }
  document.getElementsByClassName("round161")[0].className = "round162";
  document.getElementsByClassName("round161")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e73 * player.prestigeMul;
  } else {
    player.money += 2.5e73 * player.prestigeMul;
  }
}

function n163() {
  if(player.q8 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.q8 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .15;
    player.superMoneyFactor += .3;
  }
  document.getElementsByClassName("round162")[0].className = "round163";
  document.getElementsByClassName("round162")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e74 * player.prestigeMul;
  } else {
    player.money += 7.5e73 * player.prestigeMul;
  }
}

function n164() {
  if(player.q9 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.q9 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .15;
    player.superMoneyFactor += .3;
  }
  document.getElementsByClassName("round163")[0].className = "round164";
  document.getElementsByClassName("round163")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e74 * player.prestigeMul;
  } else {
    player.money += 2.5e74 * player.prestigeMul;
  }
}

function n165() {
  if(player.q10 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.q10 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .15;
    player.superMoneyFactor += .3;
  }
  document.getElementsByClassName("round164")[0].className = "round165";
  document.getElementsByClassName("round164")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e75 * player.prestigeMul;
  } else {
    player.money += 7.5e74 * player.prestigeMul;
  }
}

function n166() {
  if(player.r1 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.r1 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .15;
    player.superMoneyFactor += .3;
  }
  document.getElementsByClassName("round165")[0].className = "round166";
  document.getElementsByClassName("round165")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e75 * player.prestigeMul;
  } else {
    player.money += 2.5e75 * player.prestigeMul;
  }
}

function n167() {
  if(player.r2 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.r2 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .15;
    player.superMoneyFactor += .3;
  }
  document.getElementsByClassName("round166")[0].className = "round167";
  document.getElementsByClassName("round166")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e76 * player.prestigeMul;
  } else {
    player.money += 7.5e75 * player.prestigeMul;
  }
}

function n168() {
  if(player.r3 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.r3 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .15;
    player.superMoneyFactor += .3;
  }
  document.getElementsByClassName("round167")[0].className = "round168";
  document.getElementsByClassName("round167")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e76 * player.prestigeMul;
  } else {
    player.money += 2.5e76 * player.prestigeMul;
  }
}

function n169() {
  if(player.r4 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.r4 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .15;
    player.superMoneyFactor += .3;
  }
  document.getElementsByClassName("round168")[0].className = "round169";
  document.getElementsByClassName("round168")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e77 * player.prestigeMul;
  } else {
    player.money += 7.5e76 * player.prestigeMul;
  }
}

function n170() {
  if(player.r5 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.r5 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .162;
    player.superMoneyFactor += .324;
  }
  document.getElementsByClassName("round169")[0].className = "round170";
  document.getElementsByClassName("round169")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e77 * player.prestigeMul;
  } else {
    player.money += 2.5e77 * player.prestigeMul;
  }
}

function n171() {
  if(player.r6 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.r6 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .162;
    player.superMoneyFactor += .324;
  }
  document.getElementsByClassName("round170")[0].className = "round171";
  document.getElementsByClassName("round170")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e78 * player.prestigeMul;
  } else {
    player.money += 7.5e77 * player.prestigeMul;
  }
}

function n172() {
  if(player.r7 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.r7 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .162;
    player.superMoneyFactor += .324;
  }
  document.getElementsByClassName("round171")[0].className = "round172";
  document.getElementsByClassName("round171")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e78 * player.prestigeMul;
  } else {
    player.money += 2.5e78 * player.prestigeMul;
  }
}

function n173() {
  if(player.r8 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.r8 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .162;
    player.superMoneyFactor += .324;
  }
  document.getElementsByClassName("round172")[0].className = "round173";
  document.getElementsByClassName("round172")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e79 * player.prestigeMul;
  } else {
    player.money += 7.5e78 * player.prestigeMul;
  }
}

function n174() {
  if(player.r9 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.r9 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .162;
    player.superMoneyFactor += .324;
  }
  document.getElementsByClassName("round173")[0].className = "round174";
  document.getElementsByClassName("round173")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e79 * player.prestigeMul;
  } else {
    player.money += 2.5e79 * player.prestigeMul;
  }
}

function n175() {
  if(player.r10 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.r10 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .162;
    player.superMoneyFactor += .324;
  }
  document.getElementsByClassName("round174")[0].className = "round175";
  document.getElementsByClassName("round174")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e80 * player.prestigeMul;
  } else {
    player.money += 7.5e79 * player.prestigeMul;
  }
}

function n176() {
  if(player.s1 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.s1 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .162;
    player.superMoneyFactor += .324;
  }
  document.getElementsByClassName("round175")[0].className = "round176";
  document.getElementsByClassName("round175")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e80 * player.prestigeMul;
  } else {
    player.money += 2.5e80 * player.prestigeMul;
  }
}

function n177() {
  if(player.s2 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.s2 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .162;
    player.superMoneyFactor += .324;
  }
  document.getElementsByClassName("round176")[0].className = "round177";
  document.getElementsByClassName("round176")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e81 * player.prestigeMul;
  } else {
    player.money += 7.5e80 * player.prestigeMul;
  }
}

function n178() {
  if(player.s3 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.s3 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .162;
    player.superMoneyFactor += .324;
  }
  document.getElementsByClassName("round177")[0].className = "round178";
  document.getElementsByClassName("round177")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e81 * player.prestigeMul;
  } else {
    player.money += 2.5e81 * player.prestigeMul;
  }
}

function n179() {
  if(player.s4 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.s4 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .162;
    player.superMoneyFactor += .324;
  }
  document.getElementsByClassName("round178")[0].className = "round179";
  document.getElementsByClassName("round178")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e82 * player.prestigeMul;
  } else {
    player.money += 7.5e81 * player.prestigeMul;
  }
}

function n180() {
  if(player.s5 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.s5 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .175;
    player.superMoneyFactor += .35;
  }
  document.getElementsByClassName("round179")[0].className = "round180";
  document.getElementsByClassName("round179")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e82 * player.prestigeMul;
  } else {
    player.money += 2.5e82 * player.prestigeMul;
  }
}

function n181() {
  if(player.s6 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.s6 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .175;
    player.superMoneyFactor += .35;
  }
  document.getElementsByClassName("round180")[0].className = "round181";
  document.getElementsByClassName("round180")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e83 * player.prestigeMul;
  } else {
    player.money += 7.5e82 * player.prestigeMul;
  }
}

function n182() {
  if(player.s7 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.s7 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .175;
    player.superMoneyFactor += .35;
  }
  document.getElementsByClassName("round181")[0].className = "round182";
  document.getElementsByClassName("round181")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e83 * player.prestigeMul;
  } else {
    player.money += 2.5e83 * player.prestigeMul;
  }
}

function n183() {
  if(player.s8 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.s8 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .175;
    player.superMoneyFactor += .35;
  }
  document.getElementsByClassName("round182")[0].className = "round183";
  document.getElementsByClassName("round182")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e84 * player.prestigeMul;
  } else {
    player.money += 7.5e83 * player.prestigeMul;
  }
}

function n184() {
  if(player.s9 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.s9 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .175;
    player.superMoneyFactor += .35;
  }
  document.getElementsByClassName("round183")[0].className = "round184";
  document.getElementsByClassName("round183")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e84 * player.prestigeMul;
  } else {
    player.money += 2.5e84 * player.prestigeMul;
  }
}

function n185() {
  if(player.s10 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.s10 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .175;
    player.superMoneyFactor += .35;
  }
  document.getElementsByClassName("round184")[0].className = "round185";
  document.getElementsByClassName("round184")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e85 * player.prestigeMul;
  } else {
    player.money += 7.5e84 * player.prestigeMul;
  }
}

function n186() {
  if(player.t1 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.t1 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .175;
    player.superMoneyFactor += .35;
  }
  document.getElementsByClassName("round185")[0].className = "round186";
  document.getElementsByClassName("round185")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e85 * player.prestigeMul;
  } else {
    player.money += 2.5e85 * player.prestigeMul;
  }
}

function n187() {
  if(player.t2 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.t2 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .175;
    player.superMoneyFactor += .35;
  }
  document.getElementsByClassName("round186")[0].className = "round187";
  document.getElementsByClassName("round186")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e86 * player.prestigeMul;
  } else {
    player.money += 7.5e85 * player.prestigeMul;
  }
}

function n188() {
  if(player.t3 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.t3 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .175;
    player.superMoneyFactor += .35;
  }
  document.getElementsByClassName("round187")[0].className = "round188";
  document.getElementsByClassName("round187")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e86 * player.prestigeMul;
  } else {
    player.money += 2.5e86 * player.prestigeMul;
  }
}

function n189() {
  if(player.t4 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.t4 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .175;
    player.superMoneyFactor += .35;
  }
  document.getElementsByClassName("round188")[0].className = "round189";
  document.getElementsByClassName("round188")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e87 * player.prestigeMul;
  } else {
    player.money += 7.5e86 * player.prestigeMul;
  }
}

function n190() {
  if(player.t5 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.t5 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .188;
    player.superMoneyFactor += .376;
  }
  document.getElementsByClassName("round189")[0].className = "round190";
  document.getElementsByClassName("round189")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e87 * player.prestigeMul;
  } else {
    player.money += 2.5e87 * player.prestigeMul;
  }
}

function n191() {
  if(player.t6 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.t6 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .188;
    player.superMoneyFactor += .376;
  }
  document.getElementsByClassName("round190")[0].className = "round191";
  document.getElementsByClassName("round190")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e88 * player.prestigeMul;
  } else {
    player.money += 7.5e87 * player.prestigeMul;
  }
}

function n192() {
  if(player.t7 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.t7 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .188;
    player.superMoneyFactor += .376;
  }
  document.getElementsByClassName("round191")[0].className = "round192";
  document.getElementsByClassName("round191")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e88 * player.prestigeMul;
  } else {
    player.money += 2.5e88 * player.prestigeMul;
  }
}

function n193() {
  if(player.t8 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.t8 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .188;
    player.superMoneyFactor += .376;
  }
  document.getElementsByClassName("round192")[0].className = "round193";
  document.getElementsByClassName("round192")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e89 * player.prestigeMul;
  } else {
    player.money += 7.5e88 * player.prestigeMul;
  }
}

function n194() {
  if(player.t9 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.t9 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .188;
    player.superMoneyFactor += .376;
  }
  document.getElementsByClassName("round193")[0].className = "round194";
  document.getElementsByClassName("round193")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e89 * player.prestigeMul;
  } else {
    player.money += 2.5e89 * player.prestigeMul;
  }
}

function n195() {
  if(player.t10 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.t10 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .188;
    player.superMoneyFactor += .376;
  }
  document.getElementsByClassName("round194")[0].className = "round195";
  document.getElementsByClassName("round194")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e90 * player.prestigeMul;
  } else {
    player.money += 7.5e89 * player.prestigeMul;
  }
}

function n196() {
  if(player.u1 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.u1 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .188;
    player.superMoneyFactor += .376;
  }
  document.getElementsByClassName("round195")[0].className = "round196";
  document.getElementsByClassName("round195")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e90 * player.prestigeMul;
  } else {
    player.money += 2.5e90 * player.prestigeMul;
  }
}

function n197() {
  if(player.u2 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.u2 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .188;
    player.superMoneyFactor += .376;
  }
  document.getElementsByClassName("round196")[0].className = "round197";
  document.getElementsByClassName("round196")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e91 * player.prestigeMul;
  } else {
    player.money += 7.5e90 * player.prestigeMul;
  }
}

function n198() {
  if(player.u3 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.u3 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .188;
    player.superMoneyFactor += .376;
  }
  document.getElementsByClassName("round197")[0].className = "round198";
  document.getElementsByClassName("round197")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e91 * player.prestigeMul;
  } else {
    player.money += 2.5e91 * player.prestigeMul;
  }
}

function n199() {
  if(player.u4 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.u4 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .188;
    player.superMoneyFactor += .376;
  }
  document.getElementsByClassName("round198")[0].className = "round199";
  document.getElementsByClassName("round198")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e92 * player.prestigeMul;
  } else {
    player.money += 7.5e91 * player.prestigeMul;
  }
}

function n200() {
  if(player.u5 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.u5 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .2;
    player.superMoneyFactor += .4;
  }
  document.getElementsByClassName("round199")[0].className = "round200";
  document.getElementsByClassName("round199")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e92 * player.prestigeMul;
  } else {
    player.money += 2.5e92 * player.prestigeMul;
  }
}

function n201() {
  if(player.u6 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.u6 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .2;
    player.superMoneyFactor += .4;
  }
  document.getElementsByClassName("round200")[0].className = "round201";
  document.getElementsByClassName("round200")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e93 * player.prestigeMul;
  } else {
    player.money += 7.5e92 * player.prestigeMul;
  }
}

function n202() {
  if(player.u7 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.u7 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .2;
    player.superMoneyFactor += .4;
  }
  document.getElementsByClassName("round201")[0].className = "round202";
  document.getElementsByClassName("round201")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e93 * player.prestigeMul;
  } else {
    player.money += 2.5e93 * player.prestigeMul;
  }
}

function n203() {
  if(player.u8 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.u8 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .2;
    player.superMoneyFactor += .4;
  }
  document.getElementsByClassName("round202")[0].className = "round203";
  document.getElementsByClassName("round202")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e94 * player.prestigeMul;
  } else {
    player.money += 7.5e93 * player.prestigeMul;
  }
}

function n204() {
  if(player.u9 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.u9 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .2;
    player.superMoneyFactor += .4;
  }
  document.getElementsByClassName("round203")[0].className = "round204";
  document.getElementsByClassName("round203")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e94 * player.prestigeMul;
  } else {
    player.money += 2.5e94 * player.prestigeMul;
  }
}

function n205() {
  if(player.u10 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.u10 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .2;
    player.superMoneyFactor += .4;
  }
  document.getElementsByClassName("round204")[0].className = "round205";
  document.getElementsByClassName("round204")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e95 * player.prestigeMul;
  } else {
    player.money += 7.5e94 * player.prestigeMul;
  }
}

function n206() {
  if(player.v1 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.v1 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .2;
    player.superMoneyFactor += .4;
  }
  document.getElementsByClassName("round205")[0].className = "round206";
  document.getElementsByClassName("round205")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e95 * player.prestigeMul;
  } else {
    player.money += 2.5e95 * player.prestigeMul;
  }
}

function n207() {
  if(player.v2 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.v2 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .2;
    player.superMoneyFactor += .4;
  }
  document.getElementsByClassName("round206")[0].className = "round207";
  document.getElementsByClassName("round206")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e96 * player.prestigeMul;
  } else {
    player.money += 7.5e95 * player.prestigeMul;
  }
}

function n208() {
  if(player.v3 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.v3 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .2;
    player.superMoneyFactor += .4;
  }
  document.getElementsByClassName("round207")[0].className = "round208";
  document.getElementsByClassName("round207")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e96 * player.prestigeMul;
  } else {
    player.money += 2.5e96 * player.prestigeMul;
  }
}

function n209() {
  if(player.v4 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.v4 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .2;
    player.superMoneyFactor += .4;
  }
  document.getElementsByClassName("round208")[0].className = "round209";
  document.getElementsByClassName("round208")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e97 * player.prestigeMul;
  } else {
    player.money += 7.5e96 * player.prestigeMul;
  }
}

function n210() {
  if(player.v5 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.v5 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .2;
    player.superMoneyFactor += .4;
  }
  document.getElementsByClassName("round209")[0].className = "round210";
  document.getElementsByClassName("round209")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e97 * player.prestigeMul;
  } else {
    player.money += 2.5e97 * player.prestigeMul;
  }
}

function n211() {
  if(player.v6 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.v6 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .2;
    player.superMoneyFactor += .4;
  }
  document.getElementsByClassName("round210")[0].className = "round211";
  document.getElementsByClassName("round210")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e98 * player.prestigeMul;
  } else {
    player.money += 7.5e97 * player.prestigeMul;
  }
}

function n212() {
  if(player.v7 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.v7 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .2;
    player.superMoneyFactor += .4;
  }
  document.getElementsByClassName("round211")[0].className = "round212";
  document.getElementsByClassName("round211")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e98 * player.prestigeMul;
  } else {
    player.money += 2.5e98 * player.prestigeMul;
  }
}

function n213() {
  if(player.v8 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.v8 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .2;
    player.superMoneyFactor += .4;
  }
  document.getElementsByClassName("round212")[0].className = "round213";
  document.getElementsByClassName("round212")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e99 * player.prestigeMul;
  } else {
    player.money += 7.5e98 * player.prestigeMul;
  }
}

function n214() {
  if(player.v9 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.v9 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .2;
    player.superMoneyFactor += .4;
  }
  document.getElementsByClassName("round213")[0].className = "round214";
  document.getElementsByClassName("round213")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e99 * player.prestigeMul;
  } else {
    player.money += 2.5e99 * player.prestigeMul;
  }
}

function n215() {
  if(player.v10 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.v10 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .2;
    player.superMoneyFactor += .4;
  }
  document.getElementsByClassName("round214")[0].className = "round215";
  document.getElementsByClassName("round214")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e100 * player.prestigeMul;
  } else {
    player.money += 7.5e99 * player.prestigeMul;
  }
}

function n216() {
  if(player.w1 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.w1 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .2;
    player.superMoneyFactor += .4;
  }
  document.getElementsByClassName("round215")[0].className = "round216";
  document.getElementsByClassName("round215")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 5e100 * player.prestigeMul;
  } else {
    player.money += 2.5e100 * player.prestigeMul;
  }
}

function n217() {
  if(player.w2 == 0) {
    player.upgBlocks++;
    document.getElementsByClassName("a1")[0].className = "a"+player.upgBlocks;
    player.w2 = 1;
  }
  if(player.money >= 200000) {
    player.prestigeFactor += .2;
    player.superMoneyFactor += .4;
  }
  document.getElementsByClassName("round216")[0].className = "round217";
  document.getElementsByClassName("round216")[0].className = "round1";
  if(Math.random() < player.twoTimes) {
    player.money += 1.5e101 * player.prestigeMul;
  } else {
    player.money += 7.5e100 * player.prestigeMul;
  }
}

var ja = 3.6;

function mobile() {
  var ua = navigator.userAgent.toLowerCase();
  var Android = ua.indexOf("linux") > -1;
  if(Android) {
    ja = 11.1;
    ka = 110;
  } else {
    ja = 3.6;
    ka = 100;
  }
}

//setInterval(mergeBlock, 1)

function mergeBlock() {
  player.merged++;
  document.getElementById("merge").disabled = true;
  var c22 = setInterval(() => {
    player.timer -= ja;
    if(player.timer < 0) {
      player.timer = 0;
      clearInterval(c22);
      document.getElementById("merge").disabled = false;
    }
  }, 1);
  if(player.timer == 0) {
    if(document.getElementsByClassName("round1")[0]) {
      one();
    }
    if(document.getElementsByClassName("round2")[2]) {
      two();
    }
    if(document.getElementsByClassName("round3")[1]) {
      three();
    }
    if(document.getElementsByClassName("round3")[1]) {
      four();
    }
    if(document.getElementsByClassName("round4")[1]) {
      five();
    }
    if(document.getElementsByClassName("round5")[1]) {
      six();
    }
    if(document.getElementsByClassName("round6")[1]) {
      seven();
    }
    if(document.getElementsByClassName("round7")[1]) {
      eight();
    }
    if(document.getElementsByClassName("round8")[1]) {
      nine();
    }
    if(document.getElementsByClassName("round9")[1]) {
      ten();
    }
    if(document.getElementsByClassName("round10")[1]) {
      eleven();
    }
    if(document.getElementsByClassName("round11")[1]) {
      twelve();
    }
    if(document.getElementsByClassName("round12")[1]) {
      n13();
    }
    if(document.getElementsByClassName("round13")[1]) {
      n14();
    }
    if(document.getElementsByClassName("round14")[1]) {
      n15();
    }
    if(document.getElementsByClassName("round15")[1]) {
      n16();
    }
    if(document.getElementsByClassName("round16")[1]) {
      n17();
    }
    if(document.getElementsByClassName("round17")[1]) {
      n18();
    }
    if(document.getElementsByClassName("round18")[1]) {
      n19();
    }
    if(document.getElementsByClassName("round19")[1]) {
      n20();
    }
    if(document.getElementsByClassName("round20")[1]) {
      n21();
    }
    if(document.getElementsByClassName("round21")[1]) {
      n22();
    }
    if(document.getElementsByClassName("round22")[1]) {
      n23();
    }
    if(document.getElementsByClassName("round23")[1]) {
      n24();
    }
    if(document.getElementsByClassName("round24")[1]) {
      n25();
    }
    if(document.getElementsByClassName("round25")[1]) {
      n26();
    }
    if(document.getElementsByClassName("round26")[1]) {
      n27();
    }
    if(document.getElementsByClassName("round27")[1]) {
      n28();
    }
    if(document.getElementsByClassName("round28")[1]) {
      n29();
    }
    if(document.getElementsByClassName("round29")[1]) {
      n30();
    }
    if(document.getElementsByClassName("round30")[1]) {
      n31();
    }
    if(document.getElementsByClassName("round31")[1]) {
      n32();
    }
    if(document.getElementsByClassName("round32")[1]) {
      n33();
    }
    if(document.getElementsByClassName("round33")[1]) {
      n34();
    }
    if(document.getElementsByClassName("round34")[1]) {
      n35();
    }
    if(document.getElementsByClassName("round35")[1]) {
      n36();
    }
    if(document.getElementsByClassName("round36")[1]) {
      n37();
    }
    if(document.getElementsByClassName("round37")[1]) {
      n38();
    }
    if(document.getElementsByClassName("round38")[1]) {
      n39();
    }
    if(document.getElementsByClassName("round39")[1]) {
      n40();
    }
    if(document.getElementsByClassName("round40")[1]) {
      n41();
    }
    if(document.getElementsByClassName("round41")[1]) {
      n42();
    }
    if(document.getElementsByClassName("round42")[1]) {
      n43();
    }
    if(document.getElementsByClassName("round43")[1]) {
      n44();
    }
    if(document.getElementsByClassName("round44")[1]) {
      n45();
    }
    if(document.getElementsByClassName("round45")[1]) {
      n46();
    }
    if(document.getElementsByClassName("round46")[1]) {
      n47();
    }
    if(document.getElementsByClassName("round47")[1]) {
      n48();
    }
    if(document.getElementsByClassName("round48")[1]) {
      n49();
    }
    if(document.getElementsByClassName("round49")[1]) {
      n50();
    }
    if(document.getElementsByClassName("round50")[1]) {
      n51();
    }
    if(document.getElementsByClassName("round51")[1]) {
      n52();
    }
    if(document.getElementsByClassName("round52")[1]) {
      n53();
    }
    if(document.getElementsByClassName("round53")[1]) {
      n54();
    }
    if(document.getElementsByClassName("round54")[1]) {
      n55();
    }
    if(document.getElementsByClassName("round55")[1]) {
      n56();
    }
    if(document.getElementsByClassName("round56")[1]) {
      n57();
    }
    if(document.getElementsByClassName("round57")[1]) {
      n58();
    }
    if(document.getElementsByClassName("round58")[1]) {
      n59();
    }
    if(document.getElementsByClassName("round59")[1]) {
      n60();
    }
    if(document.getElementsByClassName("round60")[1]) {
      n61();
    }
    if(document.getElementsByClassName("round61")[1]) {
      n62();
    }
    if(document.getElementsByClassName("round62")[1]) {
      n63();
    }
    if(document.getElementsByClassName("round63")[1]) {
      n64();
    }
    if(document.getElementsByClassName("round64")[1]) {
      n65();
    }
    if(document.getElementsByClassName("round65")[1]) {
      n66();
    }
    if(document.getElementsByClassName("round66")[1]) {
      n67();
    }
    if(document.getElementsByClassName("round67")[1]) {
      n68();
    }
    if(document.getElementsByClassName("round68")[1]) {
      n69();
    }
    if(document.getElementsByClassName("round69")[1]) {
      n70();
    }
    if(document.getElementsByClassName("round70")[1]) {
      n71();
    }
    if(document.getElementsByClassName("round71")[1]) {
      n72();
    }
    if(document.getElementsByClassName("round72")[1]) {
      n73();
    }
    if(document.getElementsByClassName("round73")[1]) {
      n74();
    }
    if(document.getElementsByClassName("round74")[1]) {
      n75();
    }
    if(document.getElementsByClassName("round75")[1]) {
      n76();
    }
    if(document.getElementsByClassName("round76")[1]) {
      n77();
    }
    if(document.getElementsByClassName("round77")[1]) {
      n78();
    }
    if(document.getElementsByClassName("round78")[1]) {
      n79();
    }
    if(document.getElementsByClassName("round79")[1]) {
      n80();
    }
    if(document.getElementsByClassName("round80")[1]) {
      n81();
    }
    if(document.getElementsByClassName("round81")[1]) {
      n82();
    }
    if(document.getElementsByClassName("round82")[1]) {
      n83();
    }
    if(document.getElementsByClassName("round83")[1]) {
      n84();
    }
    if(document.getElementsByClassName("round84")[1]) {
      n85();
    }
    if(document.getElementsByClassName("round85")[1]) {
      n86();
    }
    if(document.getElementsByClassName("round86")[1]) {
      n87();
    }
    if(document.getElementsByClassName("round87")[1]) {
      n88();
    }
    if(document.getElementsByClassName("round88")[1]) {
      n89();
    }
    if(document.getElementsByClassName("round89")[1]) {
      n90();
    }
    if(document.getElementsByClassName("round90")[1]) {
      n91();
    }
    if(document.getElementsByClassName("round91")[1]) {
      n92();
    }
    if(document.getElementsByClassName("round92")[1]) {
      n93();
    }
    if(document.getElementsByClassName("round93")[1]) {
      n94();
    }
    if(document.getElementsByClassName("round94")[1]) {
      n95();
    }
    if(document.getElementsByClassName("round95")[1]) {
      n96();
    }
    if(document.getElementsByClassName("round96")[1]) {
      n97();
    }
    if(document.getElementsByClassName("round97")[1]) {
      n98();
    }
    if(document.getElementsByClassName("round98")[1]) {
      n99();
    }
    if(document.getElementsByClassName("round99")[1]) {
      n100();
    }
    if(document.getElementsByClassName("round100")[1]) {
      n101();
    }
    if(document.getElementsByClassName("round101")[1]) {
      n102();
    }
    if(document.getElementsByClassName("round102")[1]) {
      n103();
    }
    if(document.getElementsByClassName("round103")[1]) {
      n104();
    }
    if(document.getElementsByClassName("round104")[1]) {
      n105();
    }
    if(document.getElementsByClassName("round105")[1]) {
      n106();
    }
    if(document.getElementsByClassName("round106")[1]) {
      n107();
    }
    if(document.getElementsByClassName("round107")[1]) {
      n108();
    }
    if(document.getElementsByClassName("round108")[1]) {
      n109();
    }
    if(document.getElementsByClassName("round109")[1]) {
      n110();
    }
    if(document.getElementsByClassName("round110")[1]) {
      n111();
    }
    if(document.getElementsByClassName("round111")[1]) {
      n112();
    }
    if(document.getElementsByClassName("round112")[1]) {
      n113();
    }
    if(document.getElementsByClassName("round113")[1]) {
      n114();
    }
    if(document.getElementsByClassName("round114")[1]) {
      n115();
    }
    if(document.getElementsByClassName("round115")[1]) {
      n116();
    }
    if(document.getElementsByClassName("round116")[1]) {
      n117();
    }
    if(document.getElementsByClassName("round117")[1]) {
      n118();
    }
    if(document.getElementsByClassName("round118")[1]) {
      n119();
    }
    if(document.getElementsByClassName("round119")[1]) {
      n120();
    }
    if(document.getElementsByClassName("round120")[1]) {
      n121();
    }
    if(document.getElementsByClassName("round121")[1]) {
      n122();
    }
    if(document.getElementsByClassName("round122")[1]) {
      n123();
    }
    if(document.getElementsByClassName("round123")[1]) {
      n124();
    }
    if(document.getElementsByClassName("round124")[1]) {
      n125();
    }
    if(document.getElementsByClassName("round125")[1]) {
      n126();
    }
    if(document.getElementsByClassName("round126")[1]) {
      n127();
    }
    if(document.getElementsByClassName("round127")[1]) {
      n128();
    }
    if(document.getElementsByClassName("round128")[1]) {
      n129();
    }
    if(document.getElementsByClassName("round129")[1]) {
      n130();
    }
    if(document.getElementsByClassName("round130")[1]) {
      n131();
    }
    if(document.getElementsByClassName("round131")[1]) {
      n132();
    }
    if(document.getElementsByClassName("round132")[1]) {
      n133();
    }
    if(document.getElementsByClassName("round133")[1]) {
      n134();
    }
    if(document.getElementsByClassName("round134")[1]) {
      n135();
    }
    if(document.getElementsByClassName("round135")[1]) {
      n136();
    }
    if(document.getElementsByClassName("round136")[1]) {
      n137();
    }
    if(document.getElementsByClassName("round137")[1]) {
      n138();
    }
    if(document.getElementsByClassName("round138")[1]) {
      n139();
    }
    if(document.getElementsByClassName("round139")[1]) {
      n140();
    }
    if(document.getElementsByClassName("round140")[1]) {
      n141();
    }
    if(document.getElementsByClassName("round141")[1]) {
      n142();
    }
    if(document.getElementsByClassName("round142")[1]) {
      n143();
    }
    if(document.getElementsByClassName("round143")[1]) {
      n144();
    }
    if(document.getElementsByClassName("round144")[1]) {
      n145();
    }
    if(document.getElementsByClassName("round145")[1]) {
      n146();
    }
    if(document.getElementsByClassName("round146")[1]) {
      n147();
    }
    if(document.getElementsByClassName("round147")[1]) {
      n148();
    }
    if(document.getElementsByClassName("round148")[1]) {
      n149();
    }
    if(document.getElementsByClassName("round149")[1]) {
      n150();
    }
    if(document.getElementsByClassName("round150")[1]) {
      n151();
    }
    if(document.getElementsByClassName("round151")[1]) {
      n152();
    }
    if(document.getElementsByClassName("round152")[1]) {
      n153();
    }
    if(document.getElementsByClassName("round153")[1]) {
      n154();
    }
    if(document.getElementsByClassName("round154")[1]) {
      n155();
    }
    if(document.getElementsByClassName("round155")[1]) {
      n156();
    }
    if(document.getElementsByClassName("round156")[1]) {
      n157();
    }
    if(document.getElementsByClassName("round157")[1]) {
      n158();
    }
    if(document.getElementsByClassName("round158")[1]) {
      n159();
    }
    if(document.getElementsByClassName("round159")[1]) {
      n160();
    }
    if(document.getElementsByClassName("round160")[1]) {
      n161();
    }
    if(document.getElementsByClassName("round161")[1]) {
      n162();
    }
    if(document.getElementsByClassName("round162")[1]) {
      n163();
    }
    if(document.getElementsByClassName("round163")[1]) {
      n164();
    }
    if(document.getElementsByClassName("round164")[1]) {
      n165();
    }
    if(document.getElementsByClassName("round165")[1]) {
      n166();
    }
    if(document.getElementsByClassName("round166")[1]) {
      n167();
    }
    if(document.getElementsByClassName("round167")[1]) {
      n168();
    }
    if(document.getElementsByClassName("round168")[1]) {
      n169();
    }
    if(document.getElementsByClassName("round169")[1]) {
      n170();
    }
    if(document.getElementsByClassName("round170")[1]) {
      n171();
    }
    if(document.getElementsByClassName("round171")[1]) {
      n172();
    }
    if(document.getElementsByClassName("round172")[1]) {
      n173();
    }
    if(document.getElementsByClassName("round173")[1]) {
      n174();
    }
    if(document.getElementsByClassName("round174")[1]) {
      n175();
    }
    if(document.getElementsByClassName("round175")[1]) {
      n176();
    }
    if(document.getElementsByClassName("round176")[1]) {
      n177();
    }
    if(document.getElementsByClassName("round177")[1]) {
      n178();
    }
    if(document.getElementsByClassName("round178")[1]) {
      n179();
    }
    if(document.getElementsByClassName("round179")[1]) {
      n180();
    }
    if(document.getElementsByClassName("round180")[1]) {
      n181();
    }
    if(document.getElementsByClassName("round181")[1]) {
      n182();
    }
    if(document.getElementsByClassName("round182")[1]) {
      n183();
    }
    if(document.getElementsByClassName("round183")[1]) {
      n184();
    }
    if(document.getElementsByClassName("round184")[1]) {
      n185();
    }
    if(document.getElementsByClassName("round185")[1]) {
      n186();
    }
    if(document.getElementsByClassName("round186")[1]) {
      n187();
    }
    if(document.getElementsByClassName("round187")[1]) {
      n188();
    }
    if(document.getElementsByClassName("round188")[1]) {
      n189();
    }
    if(document.getElementsByClassName("round189")[1]) {
      n190();
    }
    if(document.getElementsByClassName("round190")[1]) {
      n191();
    }
    if(document.getElementsByClassName("round191")[1]) {
      n192();
    }
    if(document.getElementsByClassName("round192")[1]) {
      n193();
    }
    if(document.getElementsByClassName("round193")[1]) {
      n194();
    }
    if(document.getElementsByClassName("round194")[1]) {
      n195();
    }
    if(document.getElementsByClassName("round195")[1]) {
      n196();
    }
    if(document.getElementsByClassName("round196")[1]) {
      n197();
    }
    if(document.getElementsByClassName("round197")[1]) {
      n198();
    }
    if(document.getElementsByClassName("round198")[1]) {
      n199();
    }
    if(document.getElementsByClassName("round199")[1]) {
      n200();
    }
    if(document.getElementsByClassName("round200")[1]) {
      n201();
    }
    if(document.getElementsByClassName("round201")[1]) {
      n202();
    }
    if(document.getElementsByClassName("round202")[1]) {
      n203();
    }
    if(document.getElementsByClassName("round203")[1]) {
      n204();
    }
    if(document.getElementsByClassName("round204")[1]) {
      n205();
    }
    if(document.getElementsByClassName("round205")[1]) {
      n206();
    }
    if(document.getElementsByClassName("round206")[1]) {
      n207();
    }
    if(document.getElementsByClassName("round207")[1]) {
      n208();
    }
    if(document.getElementsByClassName("round208")[1]) {
      n209();
    }
    if(document.getElementsByClassName("round209")[1]) {
      n210();
    }
    if(document.getElementsByClassName("round210")[1]) {
      n211();
    }
    if(document.getElementsByClassName("round211")[1]) {
      n212();
    }
    if(document.getElementsByClassName("round212")[1]) {
      n213();
    }
    if(document.getElementsByClassName("round213")[1]) {
      n214();
    }
    if(document.getElementsByClassName("round214")[1]) {
      n215();
    }
    if(document.getElementsByClassName("round215")[1]) {
      n216();
    }
    if(document.getElementsByClassName("round216")[1]) {
      n217();
    }
  }
  player.timer = 750 - player.seconds;
}