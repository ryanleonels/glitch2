"use strict"

const achieveData = [
  {
    unlockReq: () => game.highestReset>=0,
    achieve: [
      () => game.universeAge.gte(6.9420),
      () => game.universeAge.gte(69420),
      () => game.universeAge.gte(60*60*24*7*Math.PI),
      () => game.spaceFoam.gte(2),
      () => game.spaceFoam.gte(256)&&game.timeFoam.gte(65536)&&game.spacetime.gte(256**3),
      () => game.spaceFoam.gte(1e3),
      () => game.spaceEnergy.gte(3),
      () => game.tempComp.eq(9)&&game.spaceComp.eq(9)&&game.spacetimeComp.eq(9),
    ],
    name: [
      "Tick Tock Aarex's Glock",
      "This should be like Aarex's army",
      "Pi weeks have passed",
      "Here's a free double meterstick",
      "Computer Byte Master",
      "SI units finally",
      "All of your upgrades belong to us",
      "NEIN NEIN NEIN",
    ],
    tooltip: [
      "Have a 6.9420 second old universe REWARD: time is 5*(1+log_10(1+time)) as fast",
      "Have a 69420 second old universe REWARD: time is 5*(1+log_10000(1+time)) as fast",
      "Have a π week old universe REWARD: time is π*(1+log_π(1+time)) as fast ",
      "Double your base spacefoam amount REWARD: Double your base spacefoam amount",
      "Have 256m of space, 65536s of time, and 1677716 m*s of spacetime REWARD: gain 2*spacetime, 4*time and 8*space",
      "Reach a kilometer of space foam REWARD: Gain 10x more spacetime foam",
      "Buy all of the row 1 upgrades REWARD: Unlock the second row of upgrades",
      "Have exactly 9 of each compressor REWARD: Boost Spatial Compressor by 9%",
    ]
  },
  {
    unlockReq: () => game.highestReset>=0,
    achieve: [
      () => game.spaceFoam.gte(1609)&&game.nucleoTime.lt(240),
      () => game.spaceFoam.gte(42195)&&game.nucleoTime.lt(7200),
      () => game.spaceFoam.gte(20000)&&game.nucleoTime.lt(120),
      () => game.spaceFoam.gte(1e27),
      () => game.spaceEnergy.gte(4e69),
      () => getNucleoLength().gte(3e12),
      () => starMile(6),
      () => game.spacetimeComp.eq(19)&&game.tempComp.eq(19),
    ],
    name: [
      "Four Minute Mile",
      "Two Hour Marathon",
      "Neutron Star",
      "Larger than the Observable Universe",
      "Hevi-er than the Observable Universe",
      "A Supergiant Star",
      "Even more upgrades belong to us",
      "NEIN TIEN NEIN TIEN",
    ],
    tooltip: [
      "Have 1,609 meters of space with under 4 minutes of nucleosynthesis REWARD: space is multiplied by 1+log(1+1609*space/4)",
      "Have 42,195 meters of space with under 2 hours of nucleosynthesis REWARD: space is multiplied by 1+log(1+42195*space/20)" ,
      "Have 20,000 meters of space before nucleosynthesis even starts REWARD: space is multiplied by 1+log(1+20000*space)",
      "Reach 1e27 meters of space foam REWARD: time foam boosts space foam",
      "Have 4e69 (nice) Joule of Space Energy REWARD: Space Energy boosts itself",
      "Reach 3e15 mm of deuterium nuclei REWARD: Nucleosynthesis boosts Space Energy gain",
      "Buy all of the row 2 upgrades REWARD: Unlock the third row",
      "Have exactly 19 Spacetime and Temporal Compressors REWARD: These compressors are 19% stronger",
    ]
  },
  {
    unlockReq: () => game.highestReset>=0,
    achieve: [
      () => starMile(1),
      () => game.normalEnergy.gte(1),
      () => game.galaxies[0].gte(1),
      () => game.galaxies[0].gte(2)&&game.galaxies[1].gte(2),
      () => starMile(3),
      () => game.supernova[0].gte(1),
      () => game.spacetime.gte("e1000"),
      () => game.spaceComp.gte(999),
    ],
    name: [
      "Shoot for the stars, you will fail anyways!",
      "Normies are taking over the world",
      "You got past the big wall",
      "Double Galaxy Double Trouble",
      "The good, the bad, and the ugly",
      "Star goes boom boom",
      "Notation, I no want no notation",
      "Triple Nines for real",
    ],
    tooltip: [
      "Own a protostar (1 star type) REWARD: gain more space, time and spacetime based on stars",
      "Get 1 Normal Energy REWARD: 1e60 nerf is lower based on energy",
      "Obtain a Galaxy REWARD: you gain more space energy based on galaxies",
      "Obtain two Galaxies on Galaxy Types 1 and 2 each REWARD: time foam gain is buffed by galaxies",
      "Own three different star types REWARD: spacial compression buff is more powerfull",
      "Blow up a star REWARD: You gain your stars back to your best amount each time you reset",
      "Have 1e1000 Spacetime Foam REWARD: Very small numbers are expressed in scientific notation",
      "Have exactly 999 Spatial Compressors REWARD: Cheapen Spacetime Compressors by 1e999",
    ]
  },
  {
    unlockReq: () => game.highestReset>=0,
    achieve: [
      () => game.perspectivePoint.gte(1),
      () => inGalChal(2)&&game.spacetime.gte(1e6)&&game.spaceless,
      () => inGalChal(3)&&game.spaceComp.eq(0)&&game.tempComp.eq(0)&&game.spacetimeComp.eq(0)&&game.spacetime.gte("6e666"),
      () => false,
      () => false,
      () => game.superComp.temp.gte(1),
      () => getNucleoLength().gte(1.2e18),
      () => game.starTypes.eq(29)&&game.spacetimeComp.eq(29)&&game.tempComp.eq(29)
    ],
    name: [
      "A new perspective",
      "You know that doesn't work",
      "Where's the first two layers?",
      "This achievement is impossible to achieve",
      "This achievement is impossible to achieve",
      "Star Super compressed into a black hole",
      "The Star Cluster of Protostars",
      "Twenty Nine of Three",
    ],
    tooltip: [
      "Gain a perspective point REWARD: you can gain more than 23 perspective points",
      "Reach enough spacetime for Normal Energy while being in Galaxy 2 REWARD: get 2x more normal energy",
      "Reach 6e666 spacetime while in Galaxy 3 and without any compressors REWARD: in galaxies, compressors cost ^0.8",
      "For now",
      "For now",
      "Have a Supercompressor REWARD: Keep perspective power on perspective resets",
      "Have 1.2e21 mm of deuterium nuclei REWARD: Add massive QoL changes to Supernovas and double Normal Energy gain.",
      "Have exactly 29 star types, spacetime, and temporal compressors REWARD: Stars are 29% more effective",
    ]
  }
]

let achieveRowCheck = 0

function checkAchieve() {
  achieveRowCheck = ((achieveRowCheck+1)%(game.highestReset+1))
  let currentRow = achieveData[achieveRowCheck]
  for (let i in currentRow.achieve) {
    let achieveID=achieveRowCheck*10+Number(i)+11
    if (!game.achievement.includes(achieveID)) {
      if (currentRow.achieve[i]()) {
        game.achievement.push(achieveID)
        $.notify("New Achievement: " + currentRow.name[i],"achieve")
      }
    }
  }
}