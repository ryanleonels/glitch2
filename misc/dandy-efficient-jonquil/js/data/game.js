const game = {
    version: "1.1",
    timeSaved: Date.now(),
    layers: [],
    highestLayer: 0,
    highestUpdatedLayer: 0,
    automators: {
        autoMaxAll: new Automator("Auto Max All", "Automatically buys max on all Layers", () =>
        {
            for(let i = Math.max(0, game.volatility.autoMaxAll.apply().toNumber()); i < game.layers.length; i++)
            {
                game.layers[i].maxAll();
            }
        }, new DynamicLayerUpgrade(level => Math.floor(level / 3) + 1, () => null, () => "Decrease the Automator interval",
            level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.toNumber()) * [0.2, 0.5, 0.8][level.toNumber() % 3]),
            level => level.gt(0) ? Math.pow(0.8, level.toNumber() - 1) * 10 : Infinity, null, {
                getEffectDisplay: effectDisplayTemplates.automator()
            })),
        autoPrestige: new Automator("Auto Prestige", "Automatically prestiges all Layers", () =>
        {
            for(let i = 0; i < game.layers.length - 1; i++)
            {
                if(game.layers[game.layers.length - 2].canPrestige() && !game.settings.autoPrestigeHighestLayer)
                {
                    break;
                }
                if(game.layers[i].canPrestige() && !game.layers[i].isNonVolatile())
                {
                    game.layers[i].prestige();
                }
            }
        }, new DynamicLayerUpgrade(level => Math.floor(level / 2) + 2, () => null, () => "Decrease the Automator interval",
            level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.add(2).toNumber()) * (level.toNumber() % 2 === 0 ? 0.25 : 0.75)),
            level => level.gt(0) ? Math.pow(0.6, level.toNumber() - 1) * 30 : Infinity, null, {
                getEffectDisplay: effectDisplayTemplates.automator()
            })),
        autoAleph: new Automator("Auto Aleph", "Automatically Max All Aleph Upgrades", () =>
        {
            game.alephLayer.maxAll();
        }, new DynamicLayerUpgrade(level => level + 3, () => null, () => "Decrease the Automator interval",
            level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.add(3).toNumber()) * 0.7),
            level => level.gt(0) ? Math.pow(0.6, level.toNumber() - 1) * 60 : Infinity, null, {
                getEffectDisplay: effectDisplayTemplates.automator()
            })),
        autoAuto: new Automator("Auto Automators", "Automatically Max All Automators (except this)", () =>
        {
            for(let i = 0; i < game.automators.length - 2; i++)
            {
                game.automators[i].upgrade.buyMax()
            }
        }, new DynamicLayerUpgrade(level => level + 7, () => null, () => "Decrease the Automator interval",
            level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.add(10).toNumber()) * 10),
            level => level.gt(0) ? Math.pow(0.6, level.toNumber() - 1) * 500 : Infinity, null, {
                getEffectDisplay: effectDisplayTemplates.automator()
            })),
    },
    volatility: {
        layerVolatility: new DynamicLayerUpgrade(level => level + 1, level => level,
            function()
            {
                return "Make the next Layer non-volatile";
            }, level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.add(1).toNumber())), level => level.sub(1), null, {
                getEffectDisplay: function()
                {
                    const val1 = this.level.eq(0) ? "None" : PrestigeLayer.getNameForLayer(this.apply().toNumber());
                    const val2 = PrestigeLayer.getNameForLayer(this.getEffect(this.level.add(1)).toNumber());
                    return val1 + " → " + val2;
                }
            }),
        prestigePerSecond: new DynamicLayerUpgrade(level => Math.round(level * 1.3) + 3, level => null,
            () => "Boost the Prestige Reward you get per second",
            function(level)
            {
                const max = PrestigeLayer.getPrestigeCarryOverForLayer(Math.round(level.toNumber() * 1.3) + 3);
                return Decimal.pow(10, new Random(level.toNumber() * 10 + 10).nextDouble() * max).round();
            }, level => new Decimal(0.5 + 0.1 * level), null, {
                getEffectDisplay: effectDisplayTemplates.percentStandard(0)
            }),
        autoMaxAll: new DynamicLayerUpgrade(level => level + 2, level => level,
            function()
            {
                return "The next Layer is maxed automatically each tick";
            }, level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.add(2).toNumber()) * 0.125), level => level.sub(1), null, {
                getEffectDisplay: function()
                {
                    const val1 = this.level.eq(0) ? "None" : PrestigeLayer.getNameForLayer(this.apply().toNumber());
                    const val2 = PrestigeLayer.getNameForLayer(this.getEffect(this.level.add(1)).toNumber());
                    return val1 + " → " + val2;
                }
            }),
    },
    achievements: [
        new Achievement("You played!", "If you dont have this, you shouldn't exist", "&omega;", () => true),
        new Achievement("The beginning of Idling", "Have 1 <span>α<sub>1</sub></span> Generator", "<span>α<sub>1</sub></span>", () => game.layers[0] && game.layers[0].generators[0].bought.gt(0)),
        new Achievement("Polynomial Growth", "Have 1 <span>α<sub>2</sub></span> Generator", "<span>α<sub>2</sub></span>", () => game.layers[0] && game.layers[0].generators[1].bought.gt(0)),
        new Achievement("Pentagen", "Have 1 <span>α<sub>5</sub></span> Generator", "<span>α<sub>5</sub></span>", () => game.layers[0] && game.layers[0].generators[4].bought.gt(0)),
        new Achievement("The end of idling?", "Have 1 <span>α<sub>10</sub></span> Generator", "<span>α<sub>10</sub></span>", () => game.layers[0] && game.layers[0].generators[9].bought.gt(0)),
        new Achievement("Other Times Await", "Go β", "β", () => game.layers[1] && game.layers[1].timesReset > 0),
        new Achievement("POW", "Have 1 <span>β<sub>P<sub>1</sub></sub></span> Generator", "<span>β<sub>P<sub>1</sub></sub></span>", () => game.layers[1] && game.layers[1].powerGenerators[0].bought.gt(0)),
        new Achievement("Polynomial POW", "Have 1 <span>β<sub>P<sub>2</sub></sub></span> Generator", "<span>β<sub>P<sub>2</sub></sub></span>", () => game.layers[1] && game.layers[1].powerGenerators[1].bought.gt(0)),
        new Achievement("In thousands", "Have over 1,000 <span>α<sub>1</sub></span> Generators", "<span>α<sub>1</sub></span>", () => game.layers[0] && game.layers[0].generators[0].bought.gte(1000)),
        new Achievement("Other Times Arrived", "Go β 10 Times", "β", () => game.layers[1] && game.layers[1].timesReset >= 10),
        new Achievement("Automatic!", "Enable the \"Max All\" Automator", "<img src=\"images/hardware-chip.svg\" alt=\"A\">", () => game.automators.autoMaxAll.upgrade.level.gte(1)),
        new Achievement("Exploding Numbers", "Reach 1e6 β", "β", () => game.layers[1] && game.layers[1].resource.gte(1e6)),
        new Achievement("A big Boost", "Reach 1e9 β-Power", "<span>β<sub>P</sub></span>", () => game.layers[1] && game.layers[1].power.gte(1e9)),
        new Achievement("A Square of Power", "Have 1 <span>β<sub>P<sub>4</sub></sub></span> Generator", "<span>β<sub>P<sub>4</sub></sub></span>", () => game.layers[1] && game.layers[1].powerGenerators[3].bought.gt(0)),
        new Achievement("Another Layer?!", "Reach 1e20 β", "β", () => game.layers[1] && game.layers[1].resource.gte(1e20)),
        new Achievement("Other Times Await... Again", "Go γ", "γ", () => game.layers[2] && game.layers[2].timesReset > 0),
        new Achievement("POγγ", "Have 1 <span>γ<sub>P<sub>1</sub></sub></span> Generator", "<span>γ<sub>P<sub>1</sub></sub></span>", () => game.layers[2] && game.layers[2].powerGenerators[0].bought.gt(0)),
        new Achievement("The True Time", "Go γ 42 Times", "γ", () => game.layers[2] && game.layers[2].timesReset >= 42),
        new Achievement("More Gamma, more Boost", "Reach 1e6 γ", "γ", () => game.layers[2] && game.layers[2].resource.gte(1e6)),
        new Achievement("Huge Numbers", "Reach 1e100,000 α", "α", () => game.layers[0] && game.layers[0].resource.gte("1e100000")),
        new Achievement("How Challenging", "Beat Challenge y-01 at least once", "γ", () => game.layers[2] && game.layers[2].challenges[0].level > 0),
        new Achievement("Persistence", "Make Layer α Non-Volatile", '<img src="images/save.svg" alt="S">', () => game.volatility.layerVolatility.level.gt(0)),
        new Achievement("Other Times Await... Yet Again", "Go δ", "δ", () => game.layers[3] && game.layers[3].timesReset > 0),
        new Achievement("Aleph-0", "Start gaining aleph", "&aleph;", () => game.alephLayer.isUnlocked()),
        new Achievement("Aleph-1", "Have 1e75 aleph", "&aleph;<sub>1</sub>", () => game.alephLayer.aleph.gte("1e75")),
        new Achievement("Aleph-2", "Have 1e200 aleph", "&aleph;<sub>2</sub>", () => game.alephLayer.aleph.gte("1e200")),
        new Achievement("Aleph-3", "Have 1.8e308 aleph", "&aleph;<sub>3</sub>", () => game.alephLayer.aleph.gte("1.8e308")),
        new Achievement("Stacking up", "Do a restack and restart your progress", "&kappa;", () => game.restackLayer.timesReset > 0),
        new Achievement("Upgradalicious", "Max all the non-meta upgrades", "↑<sub>↑<sub>↑</sub></sub>", () => (Object.values(game.restackLayer.permUpgrades).filter(u => u.level.gt(0)).length + Object.values(game.restackLayer.permUpgrades).filter(u => u.level.gt(1)).length) == 12),
        new Achievement("Idle^2", "Buy the meta upgrade", "↑<sub>2<sub>", () => game.restackLayer.metaUpgrade.level.gte(1)),
        new Achievement("No turning back", "Go meta and be reborn", "&Omega;", () => game.metaLayer.active),
        new Achievement("EXA-Stage", "Reach to EXA-Stage", "<span style='font-size: 82%;'><span><sub>↑</sub></span>",  () => game.layers[60] && game.layers[60].timesReset > 0),
        new Achievement("ERA-Stage", "Reach to ERA-Stage", "<span style='font-size: 82%;'><span><sub>↑3↑</sub></span>",  () => game.layers[90] && game.layers[90].timesReset > 0),
        new Achievement("EXRA-Stage", "Reach to EXRA-Stage", "<span style='font-size: 82%;'><span><sub>↑9↑</span>",  () => game.layers[110] && game.layers[110].timesReset > 0),
        new Achievement("INFINITY-Stage", "Reach to INFINITY-Stage", "<span style='font-size: 82%;'><span><sub>↑81↑</sub></span>",  () => game.layers[120] && game.layers[120].timesReset > 0),
        new Achievement("One for each Second", "Advance 1 Layer per second", "»", () => game.metaLayer.getLayersPS().gte(1)),
        new Achievement("The Ladder is Infinite", "Reach Layer 1000", "Ρ↑β", () => game.metaLayer.layer.gte(1000)),
        new Achievement("Stupidly fast", "Advance 10 Layer per second", "»»", () => game.metaLayer.getLayersPS().gte(10)),
        new Achievement("What are Layer resets?", "Buy the ReStack Tree Upgrade in Row 5", "<img alt=\"LC\" class=\"inline\" src=\"images/layercoin.svg\"/>", () => game.restackLayer.upgradeTreeNames.substractLayers.apply()),
        new Achievement("Faster than Light", "Advance ~300e9 Layers per second", "»»»", () => game.metaLayer.getLayersPS().gte(299792458)),
        new Achievement("It never Ends", "Reach Layer 1e10", "<span style='font-size: 30%;'><span>Ω<sub>ϝ</sub></span><sup>ρ</sup>↑<span>Ω<sub>ϙ</sub></span><sup>Ν</sup>↑<span>Ω<sub>ϛ</sub></span><sup>κ</sup>↑<span>Ω</span><sup>Σ</sup></span>", () => game.metaLayer.layer.gte(1e10)),
        new Achievement("It truly never Ends", "Reach Layer 1e100", "<span style='font-size: 30%;'><span>2Ω<sub>ϝ</sub></span><sup>ρ</sup>↑<span>Ω<sub>ϙ</sub></span><sup>Ν</sup>↑<span>Ω<sub>ϛ</sub></span><sup>κ</sup>↑<span>Ω</span><sup>Σ</sup></span>", () => game.metaLayer.layer.gte(1e100)),
        new Achievement("Inf-Infinity", "Reach Layer ~1.8e308", "<span class='flipped-v'>Ω</span>", () => game.metaLayer.layer.gte(INFINITY)),
        new Achievement("Was that supposed to be happen?", "Reach Layer ~e35K", "<span style='font-size: 50%;'>(↑↑↑114)", () => game.metaLayer.layer.gte("1e35000")),
        new Achievement("Endgame", "Reach layer e1.00e38 and finish "+mod.primaryName+mod.secondaryName, "Ʊ4", () => game.metaLayer.layer.gte(mod.Infinities[3])),
    ],
    secretAchievements: [
        new Achievement("A very long wait...", "Have a game with over 3 months of time", "...", () => game.timeSpent > 50803200),
        new Achievement("Aleph-π", "Have πe314 aleph", "&aleph;<sub>π</sub>", () => game.alephLayer.aleph.gte("3.141e341")),
        new Achievement("Meta sucks!", "Get &Omega; without meta", "&Omega;&Omega;&Omega;&Omega;&Omega;&Omega;&Omega;&Omega;&Omega;&Omega;", () => game.highestLayer >= 47 && !game.metaLayer.active),
        new Achievement("Volatility sucks!", "Get &epsilon; without layer volatility upgrade", "&epsilon;&epsilon;&epsilon;&epsilon;&epsilon;&epsilon;&epsilon;&epsilon;&epsilon;&epsilon;", () => game.highestLayer >= 5 && game.volatility.layerVolatility.level.eq(0)),
    ],
    alephLayer: new AlephLayer(),
    restackLayer: new ReStackLayer(),
    metaLayer: new MetaLayer(),
    currentLayer: null,
    currentChallenge: null,
    notifications: [],
    timeSpent: 0,
    settings: {
        tab: "Layers",
        showAllLayers: true,
        showMinLayers: 5,
        showMaxLayers: 5,
        showLayerOrdinals: true,
        layerTickSpeed: 1,
        buyMaxAlways10: true,
        disableBuyMaxOnHighestLayer: false,
        resourceColors: true,
        resourceGlow: true,
        newsTicker: true,
        autoMaxAll: true,
        autoPrestigeHighestLayer: true,
        notifications: true,
        saveNotifications: true,
        confirmations: true,
        offlineProgress: true,
        titleStyle: 2,
        theme: mod.themes[0][1],
        layerNames: mod.layerNames[0][1],
        font: mod.fonts[0][1],
        saveInfo: "i have no idea"
    },
};
const initialGame = functions.getSaveString();
