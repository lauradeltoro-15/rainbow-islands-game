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
            y: undefined,
        }
        this.cols = cols
        this.rows = rows
        this.tSize = this.canvasSize.w / this.cols
        this.layer = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
            [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
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

    drawMap(camera) {

        this.layer.forEach((row, j) => row.forEach((col, i) => {
            if (col) {
                this.ctx.fillStyle = "#fe5340"
                this.ctx.fillRect(this.tSize * i,
                    -this.tSize * this.rows + j * this.tSize + this.canvasSize.h,
                    this.tSize,
                    this.tSize)
            }
        }))

        // this.mapToDraw.startRow = this.layer.length - Math.floor((camera.cameraPosition.y + camera.cameraSize.h) / this.tSize) //Obtiene la fila en la que debemos empezar
        // this.mapToDraw.endRow = this.layer.length - Math.floor(camera.cameraPosition.y / this.tSize) //Obtiene la última fila a dibujar
        // this.mapToDraw.offsetY = -camera.cameraPosition.y % this.tSize //La posición de la cámara puede no cuadrar exactamente con la cuadrícula del mapa, por eso hacemos el offset.
        // for (let i = this.mapToDraw.startRow; i <= this.mapToDraw.endRow; i++) {
        //     this.mapToDraw.y = (i - this.mapToDraw.startRow) * this.tSize + this.mapToDraw.offsetY
        //     this.layer[i] ? this.layer[i].forEach((row, i) => {
        //         if (row) {
        //             this.ctx.fillRect(i * this.tSize, this.mapToDraw.y, this.tSize, this.tSize)
        //         }
        //     }) : null
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