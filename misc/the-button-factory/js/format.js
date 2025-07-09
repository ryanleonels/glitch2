var {
  c = new OmegaNum
}

// from the incremental headstart set under the WTFPL - https://github.com/e666666/incremental-headstart-set/ -  http://www.wtfpl.net/about/
// Origin from AD (IvarK.github.io), edited by Nyan Cat, "The regex fix" version

/*
const inflog = OmegaNum.log10(Number.MAX_VALUE);
function formatValue(value, places = 2, placesUnder1000 = 1, startSci) {
  places = places || 6;
  placesUnder1000 = placesUnder1000 || 5;
  startSci = startSci || 1000000;
  if (value >= startSci) {
    if (typeof Decimal !== "undefined" && value instanceof Decimal) {
      let power = value.e;
      let matissa = value.mantissa;
    } else if (typeof OmegaNum !== "undefined" && value instanceof OmegaNum) {
      return value.toExponential(places).replace("+", "");
    } else {
      let power = Math.floor(Math.log10(value));
      let matissa = value / Math.pow(10, Math.floor(Math.log10(value)));
    }
    matissa = matissa.toFixed(places);
    if (matissa >= 10) {
      matissa /= 10;
      power++;
    }
    if (power > 1e6)
      return (
        matissa + "e" + power.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      );
    return matissa + "e" + power;
  } else {
    return value
      .toFixed(placesUnder1000)
      .replace(/(?:(\.\d*?[1-9]+)|\.)0*$/, "$1");
  }
}

function formatPercent(value) {
  return `${value.times(100).toFixed(1)}%`;
}

window.formatNumber = formatValue;
window.nf = formatValue;
*/

function timeDisplay(time) {
  if (time <= 100) return time.toFixed(3) + " seconds";
  if (time >= 31536000) {
    return (
      Decimal.floor(time / 31536000) +
      " years, " +
      Decimal.floor((time % 31536000) / 86400) +
      " days, " +
      Decimal.floor((time % 86400) / 3600) +
      " hours, " +
      Decimal.floor((time % 3600) / 60) +
      " minutes, and " +
      Decimal.floor(time % 60) +
      " seconds"
    );
  } else if (time >= 86400) {
    return (
      Decimal.floor(time / 86400) +
      " days, " +
      Decimal.floor((time % 86400) / 3600) +
      " hours, " +
      Decimal.floor((time % 3600) / 60) +
      " minutes, and " +
      Decimal.floor(time % 60) +
      " seconds"
    );
  } else if (time >= 3600) {
    return (
      Decimal.floor(time / 3600) +
      " hours, " +
      Decimal.floor((time % 3600) / 60) +
      " minutes, and " +
      Decimal.floor(time % 60) +
      " seconds"
    );
  } else if (time >= 60) {
    return (
      Decimal.floor(time / 60) +
      " minutes, and " +
      Decimal.floor(time % 60) +
      " seconds"
    );
  } else return Decimal.floor(time % 60) + " seconds";
}