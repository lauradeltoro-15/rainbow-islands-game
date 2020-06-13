class Player {
    constructor(ctx, canvasSize, YBasePosition, playerImgSrc, playerImgFrames, keys, framesCounter) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.keys = keys
        this.isMoving = false
        this.isJumping = false
        this.isConstructing = false
        this.isFacingRight = true
        this.rainbowsConstructed = []
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
            y: 10
        }
        this.playerPhysics = {
            gravity: 0.5
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
        );
        this.rainbowsConstructed.forEach(elm => {
            elm.drawRainbow()
        })
        this.isMoving ? this.animatePlayer(framesCounter) : null
        if (this.isJumping) {
            this.animatePlayer(framesCounter)
            this.aplyJumpGravity()
        }
        // if (this.isConstructing) {
        //     this.rainbowsConstructed[this.rainbowsConstructed.length - 1].drawRainbow()
        //     if (this.rainbowsConstructed[this.rainbowsConstructed.length - 1].rainbowSize.w >= 150) {
        //         this.isConstructing = false
        //     }
        // }

    }
    animatePlayer(framesCounter) {
        framesCounter % 3 === 0 ? this.playerImg.framesIndex++ : null
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
    aplyJumpGravity() {
        this.playerPosition.y -= this.playerVelocity.y
        this.playerVelocity.y -= this.playerPhysics.gravity
        if (this.playerPosition.y + this.playerVelocity.y >= this.basePosition.y) {
            this.playerVelocity.y = 10
            this.playerPosition.y = this.basePosition.y
            this.playerImg.framesIndex = 0
            this.isJumping = false;
        }
    }
    // createRainbow() {
    //     this.rainbow.w += this.rainbow.grow



    //     let rainbowItem
    //     if (this.isFacingRight) {
    //         this.ctx.fillRect(this.rainbow.position.x, this.rainbow.position.y, this.rainbow.w, this.rainbow.h)
    //     }
    //     if (this.rainbow.w >= 300) {

    //         this.rainbows.push(this.rainbow)
    //         this.isConstructing = false
    //     }
    // }
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
                    this.isJumping = true
                    break;
                case this.keys.XKey:
                    this.isConstructing = true
                    this.rainbowsConstructed.push(new Rainbow(this.ctx, this.playerPosition, this.playerSize, this.isFacingRight))

                    break;

            }
        })
        document.addEventListener("keyup", e => {
            switch (e.keyCode) {
                case this.keys.LEFT:
                    this.playerImg.framesIndex = 0
                    this.isMoving = false

                    break;
                case this.keys.RIGHT:
                    this.playerImg.framesIndex = 0
                    this.isMoving = false
                    break;
                case this.keys.XKey:
                    this.isConstructing = false
                    break;

            }

        })
    }

}