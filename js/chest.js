class Chest {
    constructor(ctx, canvasSize, height, width, map) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.chestSize = {
            h: height,
            w: width
        }
        this.chestPosition = {
            x: this.canvasSize.w / 2 - this.chestSize.w / 2,
            y: undefined
        }
        this.chestImg = {
            img: undefined,
            source: "images/cofre.png",
            frames: 6,
            framesIndex: 0
        }
        this.map = map
    }
    setChestY() {
        this.chestPosition.y = this.map.getTileYAxis(4) - this.chestSize.h + 7
    }
    createChest() {
        this.chestImg.img = new Image()
        this.chestImg.img.src = this.chestImg.source
    }
    drawChest() {
        this.ctx.drawImage(
            this.chestImg.img,
            this.chestImg.framesIndex * Math.floor(this.chestImg.img.width / this.chestImg.frames),
            0,
            Math.floor(this.chestImg.img.width / this.chestImg.frames),
            this.chestImg.img.height,
            this.chestPosition.x,
            this.chestPosition.y,
            this.chestSize.w,
            this.chestSize.h
        )
    }
    animateChest(framesCounter) {
        framesCounter % 12 === 0 ? this.chestImg.framesIndex++ : null
        this.chestImg.framesIndex > this.chestImg.frames - 1 ? this.chestImg.framesIndex = this.chestImg.frames - 1 : null
    }
}
