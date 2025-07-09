 function thing() {
      if (inChallenge() && !game.distort) {
            document.getElementById("progressbar").style.width = Decimal.min((Decimal.log10(game.dimensions[0].amount.add(1)) / Decimal.log10(getChallengeGoal()) * 100), 100).toFixed(2) + "%"
            document.getElementById("progressbar").innerHTML = Decimal.min((Decimal.log10(game.dimensions[0].amount.add(1)) / Decimal.log10(getChallengeGoal()) * 100), 100).toFixed(2) + "%"
            document.getElementById("progress").setAttribute('tooltip',"Percentage to challenge goal")
        } else if (!game.break) {
            document.getElementById("progressbar").style.width = Decimal.min((Decimal.log10(game.dimensions[0].amount.add(1)) / Decimal.log10(Number.MAX_VALUE) * 100), 100).toFixed(2) + "%"
            document.getElementById("progressbar").innerHTML = Decimal.min((Decimal.log10(game.dimensions[0].amount.add(1)) / Decimal.log10(Number.MAX_VALUE) * 100), 100).toFixed(2) + "%"
            document.getElementById("progress").setAttribute('tooltip',"Percentage to Infinity")
        } else if (game.distort && !canPerformSingularity()) {
            document.getElementById("progressbar").style.width = Decimal.min((Decimal.log10(game.dimensions[0].amount.add(1)) / Decimal.log10("1e60000") * 100), 100).toFixed(2) + "%"
            document.getElementById("progressbar").innerHTML = Decimal.min((Decimal.log10(game.dimensions[0].amount.add(1)) / Decimal.log10("1e60000") * 100), 100).toFixed(2) + "%"
            document.getElementById("progress").setAttribute('tooltip',"Percentage to Singularity")
        } else if (!game.distort) {
          var gipLog = gainedInfinityPoints().log(2)
          var goal = Decimal.pow(2,Decimal.ceil(Decimal.log10(gipLog) / Decimal.log10(2)))
          var percentage = Decimal.min(gipLog / goal * 100, 100).toFixed(2) + "%"
            document.getElementById("progressbar").style.width = percentage
            document.getElementById("progressbar").innerHTML = percentage
            document.getElementById("progress").setAttribute('tooltip',"Percentage to " + shortenMoney(Decimal.pow(2, gipLog)) + " IP")
        } else {
          var gppLog = gainedPlanckParticles().log(2)
          var goal = Decimal.pow(2,Decimal.ceil(Decimal.log10(gppLog) / Decimal.log10(2)))
          var percentage = Decimal.min(gppLog / goal * 100, 100).toFixed(2) + "%"
            document.getElementById("progressbar").style.width = percentage
            document.getElementById("progressbar").innerHTML = percentage
            document.getElementById("progress").setAttribute('tooltip',"Percentage to " + shortenMoney(Decimal.pow(2, gppLog)) + " PP")
        } 
 } 