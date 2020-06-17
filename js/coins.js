class Coin {
    constructor(ctx, framesCounter) {
        this.ctx = ctx
        this.framesCounter = framesCounter
        this.coinSize = {
            w: 50,
            h: 150
        }

        this.coinImg = {
            img: undefined,
            source: "images/coin.png",
            frames: 6,
            framesIndex: 0
        }
    }
    createImgCoin() {
        this.coinImg.img = new Image()
        this.coinImg.img.src = this.coinImg.source
    }
    drawCoin(xPosition, yPosition) {
        this.ctx.drawImage(
            this.coinImg.img,
            this.coinImg.framesIndex * Math.floor(this.coinImg.img.width / this.coinImg.frames),
            0,
            Math.floor(this.coinImg.img.width / this.coinImg.frames),
            this.coinImg.img.height,
            xPosition,
            yPosition,
            this.coinSize.w,
            this.coinSize.h
        )
        this.animateCoin()
    }
    animateCoin() {
        this.framesCounter % 30 === 0 ? this.coinImg.framesIndex++ : null
        this.coinImg.framesIndex > this.coinImg.frames - 1 ? this.coinImg.framesIndex = 0 : null
    }
}