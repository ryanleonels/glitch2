const Milestones = {
  activate(x) {
    if (player.perkPoints.gte(x < 7 ? 1 : x < 13 ? 5 : x < 19 ? 2 : 6) && !player.milestones.includes(x)) {
      player.perkPoints = player.perkPoints.sub(x < 7 ? 1 : x < 13 ? 5 : x < 19 ? 2 : 6)
      player.milestones.push(x)
    }
  },
  desc(x) {
    if (x < 7) {
      return "Unlock the Accelerator " + x + " Autobuyer. Cost: 1 Perk Point"
    } else if (x < 13) {
      return "Accelerator " + (x-6) + " produces 1,000x more power. Cost: 5 Perk Points"
    } else if (x < 19) {
      return "Unlock the Golden Accelerator " + formatWhole(x-12) + " Autobuyer. Cost: 2 Perk Points"
    } else {
      return "Golden Accelerator " + (x-18) + " produces 1,000x more power. Cost: 6 Perk Points"
    } 
  }
}