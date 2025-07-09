Vue.component("news-ticker", {
    data: function()
    {
        return {
            messages: [
                "modding.net",
                "layer name moment",
                "weird themes",
                "hey, you could make a mod out of this",
                "when the imp- oh wrong mod",
                "basically there is a thi- (softcapped)",
                "incremental thing i guess",
                "omega layers but steam engine",
                "mod.js: powering layers",
                "i ran out of words on my hard drive :(",
                "what if i told you that secret achievements are real",
                "omega layers 2, coming in 2048 years",
                "finally a major release",
                "go visit omega layers ez and sussy layers 2",
                "join the community server",
                "content when",
                "omega engine v-1.0.0: we removed all the features that aren't the main game",
                "R A I N B O W",
                "This news message is 1000x rarer than all the others.", Math.random() < 0.001,
                "(stickcapped)",
                "(hornex.pro-capped)",
                "hornex.pro",
                "Good news: everything is (hornex.pro-capped)!",
                "bad news: everything is at ee308 exept the fact that my game broke",
              () =>
                {
                    let res = "";
                    for(let i = 0; i < Math.floor(Math.random() * 6) + 4; i++)
                    {
                        let seed = Date.now() + i;
                        res += Utils.createRandomWord(Math.floor(Math.random() * 10) + 4, seed) + " ";
                    }
                    return res + "-" + Utils.createRandomWord(Math.floor(Math.random() * 3) + 4, Date.now() + 20) + " " + Utils.createRandomWord(Math.floor(Math.random() * 3) + 4, Date.now() + 21);
                },
                () => "This Number is randomly generated -> " + Math.pow(10, Math.random() * 3.01).toFixed(2) +
                    ". If it's above 1,000, consider yourself lucky!",
                () => `<a href="https://hornex.pro" target="_blank">get Layer ` + PrestigeLayer.getNameForLayer(game.metaLayer.active ? game.metaLayer.layer.add(1).floor() : game.layers.length) + ` now [working 2023]</a>`,
                () => functions.formatNumber(game.metaLayer.active ? game.metaLayer.getApproxAlpha() : game.layers[0].resource, 2, 0, 1e9) + " α? That's rookie numbers",
                () => "Motto of the Day: " + Utils.getMOTD()
              
            ],
            currentMessage: "",
            messageIndex: -1
        }
    },
    computed: {
        animationDuration: function()
        {
            return 10 + 0.1 * this.currentMessage.replace(/<.*?>/g, "").length;
        }
    },
    methods: {
        getMessage: function()
        {
            const arr = Array.from(this.messages);
            if(this.messageIndex !== -1)
            {
                arr.splice(this.messageIndex, 1);
            }
            const index = Math.floor(Math.random() * arr.length);
            this.messageIndex = index;
            const element = arr[index];
            this.currentMessage = typeof element === "string" ? element : element();
        }
    },
    mounted: function()
    {
        this.getMessage();
        this.$refs.message.onanimationiteration = e =>
        {
            const anim = this.$refs.message.style.animation.slice();
            this.getMessage();
            this.$refs.message.style.animation = "none";
            void this.$refs.message.offsetWidth; //very black magic
            this.$refs.message.style.animation = anim;
            Vue.nextTick(() =>
            {
                if(this.$refs.message.style.animationDuration === "")
                {
                    this.$refs.message.style.animationDuration = this.animationDuration + "s";
                }
            });
        };
    },
    template: `<div class="news-ticker">
    <span ref="message" :style="{'animation-duration': animationDuration + 's'}" v-html="currentMessage"></span>
</div>`
})
