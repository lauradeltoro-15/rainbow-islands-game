class WinMessage {
    constructor(ctx, canvasSize, height, width, map) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.winMsgSize = {
            h: height,
            w: width
        }
        this.winMsgPosition = {
            x: this.canvasSize.w / 2 - this.winMsgSize.w / 2,
            y: -this.winMsgSize.h - 100
        }
        this.winMsgImg = {
            img: undefined,
            src: "images/goal-in.png"
        }
        this.map = map
    }
    createWinMessage() {
        this.winMsgImg.img = new Image()
        this.winMsgImg.img.src = this.winMsgImg.src
    }
    drawWinMessage() {
        console.log(`Image: ${this.winMsgImg.img} xPosition: ${this.winMsgPosition.x}yPosition: ${this.winMsgPosition.y}Width:${this.winMsgSize.w}Height:${this.winMsgSize.h}`)
        this.ctx.drawImage(
            this.winMsgImg.img,
            this.winMsgPosition.x,
            this.winMsgPosition.y,
            this.winMsgSize.w,
            this.winMsgSize.h
        )
    }
    animateWinMessage() {
        this.winMsgPosition.y <= this.map.getTileYAxis(4) - this.winMsgSize.h ? this.winMsgPosition.y += 2 : null

    }
}