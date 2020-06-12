class Background {
    constructor(ctx, canvasSize, backgroundImgSrc, YBasePosition) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.backgroundSize = {
            w: this.canvasSize.w,
            h: this.canvasSize.h
        }
        this.backgroundImg = undefined

        this.backgroundImgSrc = backgroundImgSrc
        this.backgroundPosition = {
            x: 0,
            y: 0
        }
        this.basePosition = {
            y: YBasePosition
        }
        this.backgroundVel = { //Esto va a depender de la BASE-POSITION
            x: 0,
            y: 3
        }
    }
    createBackground() {
        this.backgroundImg = new Image
        this.backgroundImg.src = this.backgroundImgSrc

    }
    drawBackground() {
        this.ctx.drawImage(this.backgroundImg, this.backgroundPosition.x, this.backgroundPosition.y, this.canvasSize.w, this.canvasSize.h)
        this.ctx.drawImage(this.backgroundImg, this.backgroundPosition.x, this.backgroundPosition.y - this.canvasSize.h, this.canvasSize.w, this.canvasSize.h)
        this.moveBackground()
    }
    moveBackground() {
        this.backgroundPosition.y >= this.canvasSize.h ? this.backgroundPosition.y = 0 : this.backgroundPosition.y = this.backgroundPosition.y + this.backgroundVel.y
        //El cambio será en relación a la baseY 

    }
}