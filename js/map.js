class Map {
    constructor(ctx, cols, rows, mapTSize, canvasSize, cameraVelocity, source) {
        this.canvasSize = canvasSize
        this.ctx = ctx
        this.mapToDraw = {
            y: 0
        }
        this.cols = cols
        this.rows = rows
        this.tSize = mapTSize
        this.cameraVelocity = cameraVelocity,
            this.mapImg = {
                img: undefined,
                source: source,
                frames: 21
            }
        this.mapCoinImg = {
            img: undefined,
            source: "images/coin.png",
            frames: 6,
            framesIndex: 0
        }
        this.mapCoinSize = {
            w: 50,
            h: 150
        }
        this.layer = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 10, 11, 10, 11, 10, 11, 10, 11, 10, 11, 10, 11, 10, 11, 10, 11, 0, 0],
            [0, 0, 11, 10, 11, 10, 11, 10, 11, 10, 11, 10, 11, 10, 11, 10, 11, 10, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [7, 8, 8, 8, 8, 8, 8, 9, 0, 0, 0, 0, 7, 8, 8, 8, 8, 8, 8, 9],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
            [10, 10, 0, 0, 0, 0, 0, 7, 8, 8, 8, 8, 9, 0, 0, 0, 0, 0, 10, 10],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [7, 8, 8, 8, 8, 9, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 8, 8, 8, 9],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
            [10, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 10, 10, 10],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, , 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 7, 8, 8, 8, 8, 8, 9, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [7, 8, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 8, 8, 8, 9],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 1, 0, , 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 4, 5, 6],
            [0, 0, 0, 0, 11, 11, 4, 5, 5, 5, 5, 6, 11, 11, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [4, 5, 5, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 5, 5, 6],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [11, 11, 0, 0, 0, 0, 4, 5, 5, 5, 5, 5, 5, 6, 0, 0, 0, 0, 11, 11],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
            [4, 5, 5, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 5, 5, 6],
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 16, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, 0, 0, 0],
            [0, 0, 0, 14, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 15, 0, 0, 0]
        ]
    }
    createMapImage() {
        this.mapImg.img = new Image()
        this.mapImg.img.src = this.mapImg.source
    }

    createMapCoinImage() {
        this.mapCoinImg.img = new Image()
        this.mapCoinImg.img.src = this.mapCoinImg.source
    }
    drawMap() {
        this.layer.forEach((row, rowIndex) => row.forEach((col, colIndex) => {
            if (this.isTileOnScreen(rowIndex)) {
                if (col && col !== 1) {
                    this.ctx.drawImage(
                        this.mapImg.img,
                        (col - 1) * Math.floor(this.mapImg.img.width / this.mapImg.frames),
                        0,
                        Math.floor(this.mapImg.img.width / this.mapImg.frames),
                        Math.floor(this.mapImg.img.width / this.mapImg.frames),
                        this.getTileXAxis(colIndex),
                        this.getTileYAxis(rowIndex),
                        this.tSize,
                        this.tSize
                    )
                } else if (col === 1) {
                    this.ctx.drawImage(
                        this.mapCoinImg.img,
                        this.mapCoinImg.framesIndex * Math.floor(this.mapCoinImg.img.width / this.mapCoinImg.frames),
                        0,
                        Math.floor(this.mapCoinImg.img.width / this.mapCoinImg.frames),
                        this.mapCoinImg.img.height,
                        this.getTileXAxis(colIndex),
                        this.getTileYAxis(rowIndex) - 80,
                        this.mapCoinSize.w,
                        this.mapCoinSize.h
                    )
                }
            }
        }))
    }
    animateMapCoin(framesCounter) {
        framesCounter % 25 === 0 ? this.mapCoinImg.framesIndex++ : null
        this.mapCoinImg.framesIndex > this.mapCoinImg.frames - 1 ? this.mapCoinImg.framesIndex = 0 : null
    }
    setOffsetInMap(player) {
        this.mapToDraw.y += 10
        player.isJumping = false
    }
    getTileYAxis(rowIndex) {
        return -this.tSize * this.rows + rowIndex * this.tSize + this.canvasSize.h + this.mapToDraw.y
    }
    getTileXAxis(colIndex) {
        return this.tSize * colIndex
    }
    isTileOnScreen(rowIndex) {
        return this.getTileYAxis(rowIndex) > -3 * this.tSize && this.getTileYAxis(rowIndex) < this.canvasSize.h + 2 * this.tSize
    }
}