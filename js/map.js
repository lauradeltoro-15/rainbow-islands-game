class Map {
    constructor(ctx, cols, rows, canvasSize) {
        this.canvasSize = canvasSize
        this.ctx = ctx
        this.mapToDraw = {
            startRow: undefined,
            endRow: undefined,
            offsetY: undefined,
            actualTile: undefined,
            filteredLayer: undefined,
            y: 0,
            maxMovement: 500,
            actualMovement: 0
        }
        this.cols = cols
        this.rows = rows
        this.tSize = this.canvasSize.w / this.cols
        this.layer = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 6],
            [0, 0, 0, 0, 4, 5, 5, 5, 5, 5, 5, 5, 5, 6, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [4, 4, 5, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 5, 6, 6],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 4, 5, 5, 5, 5, 5, 5, 6, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
            [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7]
        ]
    }
    getCol(x) {
        return Math.floor(x / this.tSize)
    }
    getRow(y) {
        return Math.floor(y / this.tSize)
    }
    getTile(col, row) {
        return this.layer[row][col]
    }
    isSolidTile(x, y) {
        const col = this.getCol(x)
        const row = this.getRow(y)
        return this.layer[row][col] === 0 ? false : true
    }

    drawMap(player, framesCounter) {
        this.layer.forEach((row, rowIndex) => row.forEach((col, colIndex) => {
            if (col) {
                if (player.playerPosition.y <= 100 && framesCounter % 4500 && !player.isJumping) {
                    this.mapToDraw.y++
                }
                this.ctx.fillStyle = "#fe5340"
                this.ctx.fillRect(this.tSize * colIndex,
                    this.getTileYAxis(rowIndex),
                    //Que empieze a dibujar en el punto más alto del mapa. 
                    this.tSize,
                    this.tSize)
            }
        }))
    }
    getTileYAxis(tileIndex) {
        return -this.tSize * this.rows + tileIndex * this.tSize + this.canvasSize.h + this.mapToDraw.y
    }


}


class Camera {
    constructor(map, canvasSize) {
        this.cameraPosition = {
            y: 0
        }
        this.cameraSize = {
            w: canvasSize.w,
            h: canvasSize.h,
            maxY: map.rows * map.tSize,
        }
    }
    followCharacter(player) {
        this.playerFollowed = player
        player.screenY = 0
    }
    update() {

        //La cámara estará en la parte inferior del canvas(a 1/4 del borde inferior)
        this.playerFollowed.screenY = this.cameraSize.h / 3 * (this.cameraSize.h / 4)

        //Que la cámara siga al personaje
        this.cameraPosition.y = this.playerFollowed.playerPosition.y - this.playerFollowed.playerSize.h

    }

}