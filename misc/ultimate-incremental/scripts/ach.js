
var achievementData = {
  11: {
      name: "Street Dance Crew",
      description: () => { return player.achs[11] ? "Electric Boogaloo." : "Insert Rhyme Here." },
    
      isComplete() {
        return theme_names[player.theme] == "Electric Boogaloo"
      }, 
  },
    12: {
      name: "Back To Basics!",
      description: "Select The Tree Style.",
 
      isComplete() {
        return theme_names[player.theme] == "Tree"
      }, 
  },
   13: {
      name: "Ima Need Some Eye Bleach...",
      description: "https://eyebleach.me/",
      
      isComplete() {
        return theme_names[player.theme] == "Cancer"
      }, 
  },
  14: {
      name: "Boosting To The Max!",
      description: "Buy a Booster.",
 
      isComplete() {
        return player.boosters.gt(0.5);
      }, 
  },
  15: {
      name: "I Believe I Can Fly!",
      description: "Lose a Booster.",
 
      isComplete() {
        return player.boostersLost.gt(0.5);
      }, 
  },
  21: {
      name: "I Need More Space!",
      description: "Unlock Space.",
 
      isComplete() {
        return player.space.gt(0.5);
      }, 
  },
  22: {
      name: "UNLIMITED POWER!",
      description: "Unlock Power.",
 
      isComplete() {
        return player.power.gt(0.5);
      }, 
  },
  23: {
      name: "I’m a Watt?",
      description: "Unlock Energy.",
 
      isComplete() {
        return player.energy.gt(0.5);
      }, 
  },
  24: {
      name: "Not So Challenging...",
      description: "Complete All Of The Energy Challenges.",
 
      isComplete() {
        return hasAllChallenges(layer="energy");
      }, 
  },
  25: {
      name: "Energetic!",
      description: "Obtain 10 Energy.",
 
      isComplete() {
        return player.energy.gt(10);
      }, 
  },
  31: {
      name: "Out Of This World!",
      description: "Obtain 1 Planet.",
      isComplete() {
        return player.planets.amt.gt(0.5);
      }, 
  },
  32: {
      name: "Solar System",
      description: "Obtain 8 Planets.",
      reward: "Unlock Stars.",
 
      isComplete() {
        return player.planets.amt.gt(7.5);
      }, 
  },
  33: {
      name: "EZ GAME",
      description: "Complete the current Endgame.",
 
      isComplete() {
        return player.points.gte(currentEndgameValue)
      }, 
  },
}
function getData(data) {
  if(data == undefined) return null
  if(typeof data == "function") {
    return data()
  }
  return data
}
function updateAchCompletions() {
  for(let i in achievementData) {
      let ach = achievementData[i];
      let id = i; // we need preservation yeah you do
      if(getData(ach.isComplete) && !player.achs[id]) {
        Vue.set(player.achs, id, true);
        player.totalAchCompletions++;
      }
  }
}

function getReward(achid) {
  return getData(achievementData[achid].calculateReward)
}
function getTotalAchsCompleted() {
  let achs_completed = 0;
  for (let id in achievementData) {
      if (player.achs[id]) achs_completed += 1;
  }
  return achs_completed;  
}

function getTotalAchPercentage() {
  return Math.min((getTotalAchsCompleted()/Object.keys(achievementData).length),1)*100;   
}

function areAllAchsCompleted() {
  return getTotalAchsCompleted()===Object.keys(achievementData).length;
}

function areAllAchsIncomplete() {
  return getTotalAchsCompleted()===0;
}

function getPBColor(percent) {
  switch (true) {
    case percent < 33.33:
      return "red";
    case percent < 66.67:
      return "orange";
    case percent <= 100.00:
      return "green";
  }
}

/*
If anyone WHO IS NOT A DEVELOPER sees this DM 💜Emi💜#8147 saying "11037" Extra credit if you know what it means
I don't know what it means and i'm a dev 
same
*/
