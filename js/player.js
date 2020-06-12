class Player {
    constructor(ctx, canvasSize, YBasePosition, playerImgSrc, playerImgFrames, keys, framesCounter) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.keys = keys
        this.playerPosition = {
            x: 50,
            y: 500
        }
        this.basePosition = {
            y: YBasePosition
        }
        this.playerImg = {
            img: undefined,
            src: playerImgSrc,
            frames: playerImgFrames,
            framesIndex: 0
        }
        this.playerSize = {
            w: 80,
            h: 80,
        }
        this.playerVelocity = {
            x: 5,
            y: 5
        }
        this.playerPhysics = {
            gravity: 0.4
        }
    }
    createImgPlayer() {
        this.setListeners()
        this.playerImg.img = new Image
        this.playerImg.img.src = this.playerImg.src
        this.drawPlayer()
    }
    drawPlayer(framesCounter) {

        this.ctx.drawImage(
            this.playerImg.img,
            this.playerImg.framesIndex * Math.floor(this.playerImg.img.width / this.playerImg.frames),
            0,
            Math.floor(this.playerImg.img.width / this.playerImg.frames),
            this.playerImg.img.height,
            this.playerPosition.x,
            this.playerPosition.y,
            this.playerSize.w,
            this.playerSize.h
        )

        this.animatePlayer(framesCounter)
    }
    animatePlayer(framesCounter) {
        framesCounter % 5 === 0 ? this.playerImg.framesIndex++ : null
        this.playerImg.framesIndex > this.playerImg.frames - 1 ? this.playerImg.framesIndex = 0 : null
    }
    walk(direction) {
        if (direction === "left") {
            this.playerPosition.x -= this.playerVelocity.x
        }
        if (direction === "right") {
            this.playerPosition.x += this.playerVelocity.x
        }
    }
    jump() {
        this.playerPosition.y -= 40
        this.velY -= 8

    }
    createRainbow() {


    }
    setListeners() {
        document.addEventListener("keydown", e => {
            switch (e.keyCode) {
                case this.keys.LEFT:
                    this.walk("left")
                    break;
                case this.keys.RIGHT:
                    this.walk("right")
                    break;
                case this.keys.SPACE:
                    this.jump()
            }
        })
    }

}