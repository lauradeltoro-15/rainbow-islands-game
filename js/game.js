const Game = {
    title: 'Rainbow Island',
    author: 'Cristian Viñuales & Laura del Toro',
    license: null,
    version: '1.0.0',
    canvasDom: undefined,
    ctx: undefined,
    FPS: 60,
    intervalId: undefined,
    canvasSize: {
        w: undefined,
        h: undefined
    },
    keys: {
        SPACE: 32,
        LEFT: 37,
        RIGHT: 39,
        XKey: 88
    },
    background: undefined,
    basePosition: {
        y: 20,
        x: undefined
    },



    initGame(id) {
        this.canvasDom = document.getElementById(id)
        this.ctx = this.canvasDom.getContext('2d')
        this.setDimensions()
        this.setEventListeners()
        this.startGame()
    },
    setDimensions() {
        this.canvasSize.w = window.innerWidth
        this.canvasSize.h = window.innerHeight
        this.canvasDom.setAttribute('width', this.canvasSize.w)
        this.canvasDom.setAttribute('height', this.canvasSize.h)
    },
    setEventListeners() {
        document.onkeydown = e => {
            e.keyCode === this.keys.SPACE ? console.log("SPACE") : null
            e.keyCode === this.keys.LEFT ? console.log("LEFT") : null
            e.keyCode === this.keys.RIGHT ? console.log("RIGHT") : null
            e.keyCode === this.keys.XKey ? console.log("X") : null
        }
    },
    startGame() {
        this.background = new Background(this.ctx, this.canvasSize, "images/skybackground.jpeg", this.basePosition.y)
        this.background.createBackground()
        this.intervalId = setInterval(() => {
            this.clearGame()
            this.background.drawBackground()
        }, 1000 / this.FPS)
    },
    endGame() {
        clearInterval(this.intervalId)
    },
    clearGame() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    }
}

