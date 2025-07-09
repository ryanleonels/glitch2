addLayer("m", {
  name: "m",
  startData() {
    return {
      unlocked: true,
      points: new Decimal(0)
    };
  },
  color: "#fff",
  row: 3,
  layerShown() {
    return true;
  },
  resource: "m keys",
  hotkeys: [
    {
      key: "m",
      description: "m: reset your keys for m keys",
      onPress() {
        if (player.m.unlocked() && canReset("m")) doReset("m");
      }
    }
  ],
  symbol: "M",
  position: 2,
  type: "static",
  baseResource: "keys",
  baseAmount() {
    return player.points;
  },
  requires() {
    return new Decimal(1);
  }, // past 1.79e308 you have to put it in quotes because you know why
  exponent() {
    return hasUpgrade("m", 33) ? new Decimal(1.31415) : new Decimal(1.42069);
  },
  base() {
    return new Decimal(1.69);
  },
  automate() {
    if (hasMilestone("m", 0)) {
      let x = player.points
        .div(420)
        .max(1)
        .log(6.9)
        .root(1.69)
        .add(1)
        .floor();
      if (x.gte(getBuyableAmount("m", 11))) setBuyableAmount("m", 11, x);
    }
  },
  upgrades: {
    11: {
      fullDisplay() {
        return `<h3>thonkeres</h3><br>
        make key gain gooder<br>
        cost: 4 m keys and 6.9420 keys`;
      },
      canAfford() {
        return player.m.points.gte(4) && player.points.gte(6.942);
      },
      pay() {
        player.m.points = player.m.points.sub(4);
        player.points = player.points.sub(6.942);
      }
    },
    12: {
      fullDisplay() {
        return `<h3>thunk</h3><br>
        make key nerf badder<br>
        cost: 4 m keys and 25 keys`;
      },
      unlocked() {
        return hasUpgrade("m", 11);
      },
      canAfford() {
        return player.m.points.gte(4) && player.points.gte(25);
      },
      pay() {
        player.m.points = player.m.points.sub(4);
        player.points = player.points.sub(25);
      }
    },
    13: {
      fullDisplay() {
        return `<h3>thonk</h3><br>
        make key nerf badder but in a different way<br>
        cost: 5 m keys and 50 keys`;
      },
      unlocked() {
        return hasUpgrade("m", 12);
      },
      canAfford() {
        return player.m.points.gte(5) && player.points.gte(50);
      },
      pay() {
        player.m.points = player.m.points.sub(5);
        player.points = player.points.sub(50);
      }
    },
    14: {
      fullDisplay() {
        return `<h3>thinking</h3><br>
        make m keys gooder<br>
        cost: 6 m keys and 100 keys<br>
        currently: making point nerf start ${format(
          upgradeEffect("m", 14)
        )}x later pog`;
      },
      effect() {
        let x = player.m.points.max(1).pow(0.69);
        if (hasUpgrade("m", 21)) x = x.mul(player.points.max(69).log(69));
        if (hasChallenge("m", 11)) x = x.mul(player.m.upgrades.length);
        if (x.gte(10)) x = x.log10().mul(10);
        if (inChallenge("m", 11)) x = new Decimal(1);
        return x;
      },
      unlocked() {
        return hasUpgrade("m", 13);
      },
      canAfford() {
        return player.m.points.gte(6) && player.points.gte(100);
      },
      pay() {
        player.m.points = player.m.points.sub(6);
        player.points = player.points.sub(100);
      }
    },
    21: {
      fullDisplay() {
        return `<h3>big brain</h3><br>
        think harder<br>
        cost: 150 keys`;
      },
      unlocked() {
        return hasUpgrade("m", 14);
      },
      canAfford() {
        return player.points.gte(150);
      },
      pay() {
        player.points = player.points.sub(150);
      }
    },
    22: {
      fullDisplay() {
        return `<h3>bigger brain</h3><br>
        think so hard your thinking makes keys<br>
        cost: 200 keys`;
      },
      unlocked() {
        return hasUpgrade("m", 21);
      },
      canAfford() {
        return player.points.gte(200);
      },
      pay() {
        player.points = player.points.sub(200);
      }
    },
    23: {
      fullDisplay() {
        return `<h3>biggest brain</h3><br>
        think so hard your thinking baddens the nerf<br>
        cost: 666 keys`;
      },
      unlocked() {
        return hasUpgrade("m", 22);
      },
      canAfford() {
        return player.points.gte(666);
      },
      pay() {
        player.points = player.points.sub(666);
      }
    },
    24: {
      fullDisplay() {
        return `<h3>m</h3><br>
        finally press the m key<br>
        cost: 1000 keys`;
      },
      unlocked() {
        return hasUpgrade("m", 23);
      },
      canAfford() {
        return player.points.gte(1000);
      },
      pay() {
        player.points = player.points.sub(1000);
      }
    },
    31: {
      fullDisplay() {
        return `<h3>do a little trolling</h3><br>
        and make key gain stronger?<br>
        cost: 10,000 keys`;
      },
      unlocked() {
        return hasUpgrade("m", 24);
      },
      canAfford() {
        return player.points.gte(10000);
      },
      pay() {
        player.points = player.points.sub(10000);
      }
    },
    32: {
      fullDisplay() {
        return `<h3>do a little more trolling</h3><br>
        and make nerf weaker??<br>
        cost: 100,000 keys`;
      },
      unlocked() {
        return hasUpgrade("m", 31);
      },
      canAfford() {
        return player.points.gte(100000);
      },
      pay() {
        player.points = player.points.sub(100000);
      }
    },
    33: {
      fullDisplay() {
        return `<h3>do a lot of trolling</h3><br>
        and make m key gain stronger???<br>
        cost: 10 m keys`;
      },
      unlocked() {
        return hasUpgrade("m", 32);
      },
      canAfford() {
        return player.m.points.gte(10);
      },
      pay() {
        player.m.points = player.m.points.sub(10);
      }
    },
    34: {
      fullDisplay() {
        return `<h3>actually do some trolling</h3><br>
        and make the nerf super bad and reset everything lol<br>
        cost: 12 m keys`;
      },
      unlocked() {
        return hasUpgrade("m", 33);
      },
      canAfford() {
        return player.m.points.gte(12);
      },
      pay() {
        player.points = new Decimal(0);
        player.m.points = new Decimal(0);
      }
    },
    41: {
      fullDisplay() {
        return `<h3>Unlock</h3><br>
        something lol<br>
        cost: 12 m keys`;
      },
      unlocked() {
        return hasUpgrade("m", 34);
      },
      canAfford() {
        return player.m.points.gte(12);
      },
      pay() {
        player.m.points = player.m.points.sub(12);
      }
    },
    42: {
      fullDisplay() {
        return `<h3>Unlock</h3><br>
        another thing lol<br>
        cost: 1e6 keys`;
      },
      unlocked() {
        return hasUpgrade("m", 41);
      },
      canAfford() {
        return player.points.gte(1e6);
      },
      pay() {
        player.points = player.points.sub(1e6);
      }
    },
    43: {
      fullDisplay() {
        return `<h3>Unlock</h3><br>
        another thing lol<br>
        cost: 1e7 keys`;
      },
      unlocked() {
        return hasUpgrade("m", 42);
      },
      canAfford() {
        return player.points.gte(1e7);
      },
      pay() {
        player.points = player.points.sub(1e7);
      }
    },
    44: {
      fullDisplay() {
        return `<h3>finally</h3><br>
        make nerf worse and reset everything but unlock a new layer (actually no because im lazy)<br>
        cost: 15 m keys`;
      }, // should be at 5 mil
      unlocked() {
        return hasUpgrade("m", 42);
      },
      canAfford() {
        return player.m.points.gte(15);
      },
      pay() {
        player.points = new Decimal(0);
        player.m.points = new Decimal(0);
      }
    }
  },
  challenges: {
    11: {
      name: "small brain",
      challengeDescription: "no more think",
      goalDescription: "690 keys",
      canComplete() {
        return player.points.gte(690);
      },
      rewardDescription: "yes",
      unlocked() {
        return hasUpgrade("m", 41);
      }
    }
  },
  buyables: {
    11: {
      title: "",
      cost() {
        let x = new Decimal(420);
        let a = new Decimal(6.9).pow(getBuyableAmount("m", 11).pow(1.69));
        return x.mul(a);
      },
      effect() {
        let x = new Decimal(1.42).pow(getBuyableAmount("m", 11));
        return x;
      },
      display() {
        return hasMilestone("m", 0)
          ? `amount: ${format(getBuyableAmount("m", 11))}<br>cost: ${format(
              tmp.m.buyables[11].cost
            )}`
          : "";
      },
      unlocked() {
        return hasUpgrade("m", 42);
      },
      canAfford() {
        return player.points.gte(tmp.m.buyables[11].cost);
      },
      buy() {
        player.points = player.points.sub(tmp.m.buyables[11].cost);
        setBuyableAmount("m", 11, getBuyableAmount("m", 11).add(1));
      }
    }
  },
  milestones: {
    0: {
      requirementDescription: "14 m keys",
      effectDescription:
        "epic milestrone effect that auto buys the first buyable and also makes it not blank",
      done() {
        return player.m.points.gte(14);
      },
      unlocked() {
        return hasUpgrade("m", 43);
      }
    }
  }
});