const mod = {
    primaryName: "ω",
    secondaryName: "Engine",
    version: "1.0.0",
    engineVer: "1.0.0 P1", //DO NOT MODIFY
    debugMode: false,
    Infinities: [new Decimal(2).pow(1024), new Decimal("1.8e30008"), new Decimal("1.8e300000008"), new Decimal("ee38")],
    themes: [
        ["Dark", "css/themes/dark.css"],
        ["Dark Alt (by Jeehan2561)", "css/themes/darkalt.css"],
        ["Light", "css/themes/light.css"],
        ["Neon", "css/themes/neon.css"],
        ["Crismon", "css/themes/crismon.css"],
        ["Emerald", "css/themes/emerald.css"],
        ["Godot Blue", "css/themes/darkblue.css"],
        ["Halloween", "css/themes/spooky.css"],
        ["eXPerience", "css/themes/experience.css"]
    ],
    layerNames: [
        ["Greek",
        [
            "αβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ",
            "ψϝϛͱϻϙͳϸ",
            ["<span class='flipped-v'>Ω</span>", "<span class='flipped-v'>Ω</span><sup>2</sup>","<span class='flipped-v'>Ω</span><sup>3</sup>","<span class='flipped-v'>Ω</span><sup>2<sup>2</sup></sup>"]
        ]],
        ["Latin",
        [
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
            "ðþȝƿəŋſÐÞȜǷƏŊ",
            "æœĳǉ"
        ]],
        ["Alphabet",
        [
            "abcdefghijklmnopqrstuvwxyz",
            "123456789",
            "ABCD"
        ]],
        ["Prestiges",
        [
          ["Money", "Prestige Points", "Rebirth Power", "Souls", "AP", "TP", "Decelerate", "Crystalize", "Return", "Honor", "Glory", "Renown", "Stars", "Age", "Cluster", "Constellation", "Antimatter", "Quantum", "Planetoid", "Grasshop", "Steelie", "Supernova"],
          ["Rank", "Science", "Tier", "Tetr", "Astral", "Clone", "Meta", "Power", "Prototype", "Loop"],
          ["Infinity", "Eternity", "Reality", "Celestial"]
        ]],
        ["Elemental (WIP)",
        [
          ["Hydrogen", "Helium", "Lithium", "Beryllium", "Boron", "Carbon", "Nitrogen", "Oxygen", "Flourine", "Neon", "Sodium", "Magnesium", "Aluminium", "Silicon", "Phosphorus", "Sulfur", "Chlorine", "Argon", "Potassium", "Calcium", "Scandium", "Titanium", "Vanadium", "Chromium"],
          ["Up quark", "Down quark", "Charm quark"],
          ["negordyH", "muileH", "muihtiL", "muillyreB"]
        ]],
        ["Unary",
        [
            '1',
            "1",
            "2345"
        ]],
        ["Symbols",
        [
            '!"£$%^&*;:@',
            "<,[{}].>",
            "+×÷^"
        ]],
        ["Binary",
        [
            '01',
            "01",
            "2345"
        ]],
        ["Random",
        [
            Utils.createRandomWord(10, new Random(Date.now()).nextInt()),
            Utils.createRandomWord(10, new Random(Math.floor(Date.now()/2)).nextInt()),
            [Utils.createRandomWord(2, new Random(Math.floor(Date.now()/3)).nextInt()),Utils.createRandomWord(3, new Random(Math.floor(Date.now()/4)).nextInt()),Utils.createRandomWord(4, new Random(Math.floor(Date.now()/5)).nextInt()),Utils.createRandomWord(5, new Random(Math.floor(Date.now()/6)).nextInt())]
        ]]
    ],
    fonts: [
        ["Monospace Typewriter", "css/fonts/typespace.css"],
        ["Comic Sans", "css/fonts/comic.css"],
        ["Fredoka One", "css/fonts/fredokaone.css"],
        ["Arial", "css/fonts/arial.css"],
        ["Roboto", "css/fonts/roboto.css"],
        ["Courier", "css/fonts/courier.css"],
        ["Ubuntu", "css/fonts/ubuntu.css"],
        ["Comfortaa", "css/fonts/comfortaa.css"],
        ["Minecraft", "css/fonts/minecraft.css"],
    ],
    saves: [
        ["Save 1", ""],
        ["Save 2", "2"],
        ["Save 3", "3"],
        ["Save 4", "4"],
    ],
    extraNames: [
        this.primaryName+this.secondaryName, //title name
        this.primaryName+this.secondaryName, //save name
        this.primaryName+this.secondaryName, //save .txt name
    ],
    debugClasses: []
}

//DO NOT MODIFY CODE PAST THIS POINT AS IT IS NEEDED (unless your a pro coder then do some experimenting)

mod.layerNames.push(["Refresh Names", "refresh"])

document.getElementById("superImportantTitle").innerHTML = "<span class='omega'>"+mod.primaryName+"</span>"+mod.secondaryName
