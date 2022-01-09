var app = new Vue({
    el: '#app',
    data: {
        page: 'home',
        fishs: ['🐟', '🐠', '🦈', '🐋'],
        score: [0, 0, 0, 0],
        stick: 50,
        stickRang: 10,
        fishLv: 1,
        fish: 81,
        fishPattern: [],
        userFishPattern: [],
        fishPatternIndex: 0,
        isDown: 0,
        speed: 8,
        percent: 50,
        isRun: false,
        isRuler: false,
        gil: {
            price: 0,
        },
        fhtn: {
            price: 0,
        },
        isDarkmode: 0,
    },
    created: function () {
        this.getFishPattern();
        this.setRod(3);
        this.start();
        this.getGIL();
    },
    methods: {
        toggleBackground() {
            this.isDarkmode =! this.isDarkmode;
        },
        setPage(page) {
            this.page = page;
        },
        up() {
            this.isDown = 0;
        },
        down() {
            this.isDown = 1;
        },
        win() {
            this.isRun = false;
            this.score[this.fishLv - 1]++;
        },
        play() {
            this.stick = 50;
            this.isDown = 0;
            this.percent = 50;
            this.isRun = true;
        },
        isPercentUp() {

            if (this.stick + this.stickRang > this.fish && this.stick - this.stickRang < this.fish)
                return true;
            else
                return false;
        },
        swimFish() {

            const t = this.fishPattern[this.fishPatternIndex];
            const s = 0.25 * (this.fishLv);

            if (this.fish < t) {
                this.fish += s;
            }

            else if (this.fish > t) {
                this.fish -= s;
            }

            if (Math.floor(this.fish) == Math.floor(t)) {
                this.fishPatternIndex++
                if (this.fishPatternIndex == this.fishPattern.length)
                    this.fishPatternIndex = 0;
            }
        },
        start() {
            setInterval(() => {
                if (!this.isRun)
                    return;

                this.swimFish();
                if (this.isDown) {
                    if (this.stick < 100 - this.stickRang)
                        this.stick += 0.75;
                }
                else {
                    if (this.stick > 0 + this.stickRang)
                        this.stick -= 0.75;
                }

                if (this.isPercentUp() && this.percent < 100)
                    this.percent += 0.25;
                else if (this.percent > 0)
                    this.percent -= 0.25;

                if (this.percent >= 100)
                    this.win();

            }, this.speed);
        },
        getFishPattern() {
            const arr = [];
            for (let index = 0; index < 15; index++) {
                arr.push(Math.floor(Math.random() * 90) + 5);
            }
            this.fishPattern = arr;
            this.fishPatternIndex = 0;
        },
        setRod(level) {
            this.isRun = true;
            this.stick = 50;
            this.stickRang = 5 + (level * 3);
            this.fish = 5;
            this.isDown = 0;
            this.percent = 50;
        },
        setFish(level) {
            this.isRun = true;
            if (!this.userFishPattern.length)
                this.getFishPattern();
            this.fishLv = level;
            this.stick = 50;
            this.fish = 5;
            this.isDown = 0;
            this.percent = 50;
        },
        getGIL() {
            axios.get('https://api.pancakeswap.info/api/v2/tokens/0xc5b9b7dcb988c86ba37853761fea692772c9937d')
                .then(res => {
                    this.gil.price = res.data.data.price;
                })
                .catch(error => console.error(error));
        }
    },
    computed: {
        stickDisplay: function () {
            return this.stick * 4;
        },
        stickRangDisplay: function () {
            return this.stickRang * 4;
        },
        percentDisplay: function () {
            return this.percent * 4;
        },
        fishDisplay: function () {
            return this.fish * 4;
        }
    },
    watch: {
        userFishPattern: function (val) {
            let arr = val.split(",");
            arr = arr.map(n => {
                let f = parseFloat(n);
                if (f > 100)
                    f = 100;
                else if (f < 0)
                    f = 0;
                return f;
            });
            if (arr.length > 1) {
                this.fishPattern = arr;
                this.fishPatternIndex = 0;
            } else {
                this.getFishPattern();
            }
        },
    }
})
/* บัคไม่มี บารมีไม่เกิด 🤣 */