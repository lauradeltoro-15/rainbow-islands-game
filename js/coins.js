class Coins {
    constructor(x, y) {
        this.coinSize = {
            w: 50,
            h: 50
        }
        this.coinPosition = {
            x: x,
            y: y
        }
        this.coinImg = {
            img: undefined,
            source: "images/coin.png",
            frames: 6,
            framesIndex: 0
        }
    }
    createCoin() {
        this.coinImg.img = new Image()
        this.coinImg.img.src = this.coinImg.source
    }
    drawCoin() {
        this.ctx.drawImage(
            this.coinImg.img,
            this.coinImg.framesIndex * Math.floor(this.coinImg.img.width / this.coinImg.frames),
            0,
            Math.floor(this.coinImg.img.width / this.coinImg.frames),
            this.coinImg.img.height,
            this.coinPosition.x,
            this.coinPosition.y,
            this.coinSize.w,
            this.coinSize.h
        )
    }
    animateCoin(framesCounter) {
        framesCounter % 10 === 0 ? this.coinImg.framesIndex++ : null
        this.coinImg.framesIndex > this.coinImg.frames - 1 ? this.coinImg.framesIndex = 0 : null
    }
}