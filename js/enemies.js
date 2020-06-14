class Enemie {
    constructor(ctx, enemieImgSrc, enemieImgFrames, framesCounter, enemiePosX, enemiePosY, enemieSizeW, enemieSizeH, enemieVelX, enemieVelY, maxX, minX) {

        this.ctx = ctx
        this.enemiePosition = {
            x: enemiePosX,
            y: enemiePosY
        }
        // this.basePosition = {
        //     y: this.enemiePosition.y
        // }
        this.enemieImg = {
            img: undefined,
            src: enemieImgSrc,
            frames: enemieImgFrames,
            framesIndex: 0
        }
        this.enemieSize = {
            w: enemieSizeW,
            h: enemieSizeH,
        }
        this.enemieVelocity = {
            x: enemieVelX,
            y: enemieVelY
        }
        this.rangeX = {
            min: minX,
            max: maxX
        }

    }
    createImgEnemie() {
        this.enemieImg.img = new Image
        this.enemieImg.img.src = this.enemieImg.src
    }
    drawEnemie(framesCounter) {

        this.ctx.drawImage(
            this.enemieImg.img,
            this.enemieImg.framesIndex * Math.floor(this.enemieImg.img.width / this.enemieImg.frames),
            0,
            Math.floor(this.enemieImg.img.width / this.enemieImg.frames),
            this.enemieImg.img.height,
            this.enemiePosition.x,
            this.enemiePosition.y,
            this.enemieSize.w,
            this.enemieSize.h
        )
    }
    animateEnemie(framesCounter) {
        framesCounter % 15 === 0 ? this.enemieImg.framesIndex++ : null
        this.enemieImg.framesIndex > this.enemieImg.frames - 1 ? this.enemieImg.framesIndex = 0 : null
    }
}




class FloorEnemie extends Enemie {
    constructor(ctx, enemieImgSrc, enemieImgFrames, framesCounter, enemiePosX, enemiePosY, enemieSizeW, enemieSizeH, enemieVelX, enemieVelY, maxX, minX) {
        super(ctx, enemieImgSrc, enemieImgFrames, framesCounter, enemiePosX, enemiePosY, enemieSizeW, enemieSizeH, enemieVelX, enemieVelY, maxX, minX)
    }
    move() {

        this.enemiePosition.x + this.enemieSize.w >= this.rangeX.max || this.enemiePosition.x <= this.rangeX.min ? this.enemieVelocity.x = -this.enemieVelocity.x : null
        this.enemiePosition.x += this.enemieVelocity.x
    }
    drawFloorEnemie(framesCounter) {
        this.drawEnemie()
        this.animateEnemie(framesCounter)
        this.move()

    }
}