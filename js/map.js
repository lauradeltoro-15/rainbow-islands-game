class Map {
    constructor(cols, rows, tSize) {
        this.cols = cols
        this.rows = rows
        this.tSize = tSize
        this.layer = [
            [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
}

class Camera {
    constructor(map, canvasSize) {
        this.cameraPosition = {
            x: 0,
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
        this.cameraPosition.y = this.playerFollowed.playerPosition.y - 3 * (this.cameraSize.h / 4)
    }
}