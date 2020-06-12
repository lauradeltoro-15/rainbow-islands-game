class Player {
    constructor(ctx, canvasSize, YBasePosition, playerImgSrc, playerImgFrames, keys) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.keys = keys
        this.playerPosition = {
            x: 50,
            y: this.canvasSize - 100
        }
        this.basePosition = {
            y: YBasePosition
        }
        this.playerImg = {
            img: undefined,
            src: playerImgSrc,
            w: 100,
            h: 100,
            frames: playerImgFrames,
            framesIndex: 0
        }

        this.velocity = {
            x: 1,
            y: 1
        }
        this.playerPhysics = {
            gravity: 0.4
        }
    }
    createImgPlayer() {
        this.playerImg.img = new Image
        this.playerImg.img.src = this.playerImg.src
        this.drawPlayer()
    }
    drawPlayer(framesCounter) { //No sé de dónde viene

    }
    walk() {

    }
    jump() {

    }
    createRainbow() {

    }

}