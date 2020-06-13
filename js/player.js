class Player {
    constructor(ctx, canvasSize, YBasePosition, playerImgSrc, playerImgFrames, keys, framesCounter) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.keys = keys
        this.isMoving = false
        this.isJumping = false
        this.isConstructing = false
        this.isFacingRight = true
        this.playerPosition = {
            x: 50,
            y: 500
        }
        this.basePosition = {
            y: this.playerPosition.y
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
            y: 20
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

        this.isMoving ? this.animatePlayer(framesCounter) : null
    }
    animatePlayer(framesCounter) {
        framesCounter % 5 === 0 ? this.playerImg.framesIndex++ : null
        this.playerImg.framesIndex > this.playerImg.frames - 1 ? this.playerImg.framesIndex = 0 : null
    }
    move(direction) {
        if (direction === "left") {
            this.playerPosition.x -= this.playerVelocity.x
        }
        if (direction === "right") {
            this.playerPosition.x += this.playerVelocity.x
        }
    }
    jump() {

    }
    createRainbow() {


    }
    setListeners() {
        document.addEventListener("keydown", e => {
            switch (e.keyCode) {
                case this.keys.LEFT:
                    this.isMoving = true
                    this.move("left")

                    break;
                case this.keys.RIGHT:
                    this.isMoving = true
                    this.move("right")

                    break;
                case this.keys.SPACE:

            }
        })
        document.addEventListener("keyup", e => {
            switch (e.keyCode) {
                case this.keys.LEFT:
                    this.isMoving = false

                    break;
                case this.keys.RIGHT:
                    this.isMoving = false
                    break;
            }

        })
    }

}