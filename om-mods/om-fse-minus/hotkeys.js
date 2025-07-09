
"use strict";

const keybinds = {
    i: () => infinity(1),
    m: () => {
      maxall()
      maxFactors()
    },
    s: () => factorShift(),
    d: () => (game.diagonalizeUnlock==1 ? diagonalize() : 0),
    r: () => {if (game.boostUnlock === 1) refund()}
};

// Declaring it once is probably faster
window.onkeypress = _ => {
  const k = _.key.toLowerCase();
  if (keybinds[k]) keybinds[k]();
};
