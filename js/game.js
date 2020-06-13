const Game = {
    title: 'Rainbow Island',
    author: 'Cristian Viñuales & Laura del Toro',
    license: null,
    version: '1.0.0',
    canvasDom: undefined,
    ctx: undefined,
    FPS: 60,
    intervalId: undefined,
    framesCounter: 0,
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
    player: undefined,
    basePosition: {
        y: 200,
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

    },
    startGame() {
        this.background = new Background(this.ctx, this.canvasSize, "images/skybackground.jpeg", this.basePosition.y)
        this.background.createBackground()
        this.player = new Player(this.ctx, this.canvasSize, this.basePosition.y, "images/running.png", 8, this.keys)
        this.player.createImgPlayer()
        this.intervalId = setInterval(() => {
            this.clearGame()
            this.background.drawBackground()
            this.player.drawPlayer(this.framesCounter)

            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++

        }, 1000 / this.FPS)
    },
    endGame() {
        clearInterval(this.intervalId)
    },
    clearGame() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    }
}