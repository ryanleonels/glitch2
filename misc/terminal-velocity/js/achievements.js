const Achievements = {
  listOfRequirements(){
    return {
      1: {desc: "Polygrowth Free Gameplay", goal: function(){return  player.speed.gte("100")}, tooltip: "Reach 100 planck lengths."},
      2: {desc: "Hyperacceleration", goal: function(){return  player.accelerators[6].bought.gte(1)}, tooltip: "Purchase the 6th Accelerator."},
      3: {desc: "A New Direction", goal: function(){return  player.ranks.rank.gte(1)}, tooltip: "Reach Rank 1."},
      4: {desc: "Climbing the Leaderboards", goal: function(){return  player.ranks.rank.gte(3)}, tooltip: "Reach Rank 3."},
      5: {desc: "\"Isn't this just DI?\"", goal: function(){return  player.ranks.tier.gte(1)}, tooltip: "Reach Tier 1."},
      6: {desc: "Déjá Vu", goal: function(){return player.ranks.tier.gte(2)}, tooltip: "Reach Tier 2."},
      7: {desc: "And the Best Length Unit Award goes to...", goal: function(){return player.speed.gte("1.874e43")}, tooltip: "Reach a light year's worth of planck lengths (~1.88e43 PL)."},
      8: {desc: "Monumental Ranking", goal: function(){return  player.ranks.rank.gte(10)}, tooltip: "Reach Rank 10."},
      9: {desc: "Lap Hell", goal: function(){return  player.meta.lap.gte(9)}, tooltip: "Reach Lap 10."},
      10: {desc: "Mountains of Gold", goal: function(){return  player.goldenAccelerators[6].bought.gte(1)}, tooltip: "Purchase the 6th Golden Accelerator."},
      11: {desc: "Vertical Acceleration", goal: function(){return  player.meta.totalAscenders.gte(1)}, tooltip: "Buy an ascender."},
      12: {desc: "Cycle of Life", goal: function(){return  player.hexachamber.completions[0].gt(0) && player.hexachamber.completions[1].gt(0) && player.hexachamber.completions[2].gt(0) && player.hexachamber.completions[3].gt(0) && player.hexachamber.completions[4].gt(0) && player.hexachamber.completions[5].gt(0)}, tooltip: "Complete each chamber at least once."},
      13: {desc: "It's Rocket Science", goal: function(){return  player.ranks.prestige.gte(1)}, tooltip: "Reach Prestige 1 and unlock the Collider."},
      14: {desc: "Lap Purgatory", goal: function(){return  player.meta.lap.gte(999)}, tooltip: "Reach Lap 1,000."},
      15: {desc: "The Ten Millenium", goal: function(){return  player.speed.gte("1e10000")}, tooltip: "Reach 1e10,000 planck lengths."},
      16: {desc: "Circles!", goal: function(){return  player.meta.points.gte("1.444e314")}, tooltip: "Reach 1e100π meta points (~1.44e314). "},
      17: {desc: "Oh No My Prestige", goal: function(){return false}, tooltip: "Lose a prestige while in a chamber"},
      18: {desc: "Six Six Six Six Six Six", goal: function(){return  player.hexachamber.completions[0].gt(5) && player.hexachamber.completions[1].gt(5) && player.hexachamber.completions[2].gt(5) && player.hexachamber.completions[3].gt(5) && player.hexachamber.completions[4].gt(5) && player.hexachamber.completions[5].gt(5)}, tooltip: "Complete each chamber at least 6 times."},
      19: {desc: "Liquid Particle Accelerator", goal: function(){return player.hexachamber.crafted[0].gt(0)}, tooltip: "Craft 1 hexa fluid"},
      20: {desc: "Yhvr's Website", goal: function(){return player.galactics.gt(0)}, tooltip: "Go Galactic"},
      }
  },
  display(x){
    return this.listOfRequirements()[x].desc
  },
  done(x){
    return this.listOfRequirements()[x].goal()
  },
  tooltip(){
    if(player.achievementDisplay === 0) return ""
    return this.listOfRequirements()[player.achievementDisplay].tooltip
  }
}
Achievements.length = Object.keys(Achievements.listOfRequirements()).length