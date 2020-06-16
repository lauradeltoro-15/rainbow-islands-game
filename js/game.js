const Game = {
    title: 'Rainbow Island',
    author: 'Cristian Viñuales & Laura del Toro',
    license: null,
    version: '1.0.0',
    canvasDom: undefined,
    ctx: undefined,
    FPS: 60,
    intervalId: undefined,
    framesCounter: 0,
    maxFrames: 5000,
    canvasSize: {
        w: undefined,
        h: undefined
    },
    keys: {
        SPACE: 32,
        LEFT: 37,
        RIGHT: 39,
        XKey: 88
    },
    cameraVelocity: 10,
    background: undefined,
    player: undefined,
    higherPlayerPosition: 300,
    map: undefined,
    mapCols: 20,
    mapRows: 40,
    mapTSize: undefined,
    enemies: [],
    basePosition: {
        y: undefined,
        x: undefined
    },
    platformCollision: false,
    initGame(id) {
        this.canvasDom = document.getElementById(id)
        this.ctx = this.canvasDom.getContext('2d')
        this.setDimensions()
        this.startGame()
    },
    setDimensions() {
        this.canvasSize.w = window.innerWidth
        this.canvasSize.h = window.innerHeight
        this.mapTSize = this.canvasSize.w / this.mapCols
        this.basePosition.y = this.canvasSize.h - this.mapTSize * 2
        this.canvasDom.setAttribute('width', this.canvasSize.w)
        this.canvasDom.setAttribute('height', this.canvasSize.h)
    },

    startGame() {
        this.background = new Background(this.ctx, this.canvasSize, "images/skybackground.jpeg")
        this.map = new Map(this.ctx, this.mapCols, this.mapRows, this.mapTSize, this.canvasSize, this.higherPlayerPosition, this.cameraVelocity)
        this.player = new Player(this.ctx, this.canvasSize, this.basePosition.y, "images/running-bothsides.png", 16, this.keys, this.cameraVelocity)
        this.enemies.push(new FloorEnemie(this.ctx, "images/floor-enemie-1.png", 2, this.framesCounter, 400, this.canvasSize.w / 20 * 1, 70, 70, 1, 1, this.canvasSize.w, 0), new FloorEnemie(this.ctx, "images/floor-enemie-1.png", 2, this.framesCounter, 400, this.basePosition.y, 70, 70, -1, 1, this.canvasSize.w, 0))

        this.background.createBackground()
        this.player.createImgPlayer()
        this.enemies.forEach(enemie => enemie.createImgEnemie())


        this.intervalId = setInterval(() => {
            this.clearGame()
            this.background.drawBackground()
            this.map.drawMap(this.player)
            this.player.drawPlayer(this.framesCounter, this.higherPlayerPosition)
            this.enemies.forEach(enemie => enemie.drawFloorEnemie(this.framesCounter))
            //this.isCollidingEnemies() ? console.log("colliding with enemie") : null
            this.player.playerVelocity.y < 0 ? this.player.isFalling = true : this.player.isFalling = false
            this.managePlayerCollisionWithPlatforms(this.canvasSize.w / 20)
            this.manageEnemiesCollisonWithPlatforms()

            this.framesCounter > this.maxFrames ? this.framesCounter = 0 : this.framesCounter++

        }, 1000 / this.FPS)
    },
    endGame() {
        clearInterval(this.intervalId)
    },
    clearGame() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    isCollidingEnemies() {
        return this.enemies.some(enem => {
            return (
                this.player.playerPosition.x + this.player.playerSize.w >= enem.enemiePosition.x &&
                this.player.playerPosition.y + this.player.playerSize.h >= enem.enemiePosition.y &&
                this.player.playerPosition.x <= enem.enemiePosition.x + enem.enemieSize.w &&
                this.player.playerPosition.y < enem.enemiePosition.y + enem.enemieSize.h
            )
        })
    },
    isCharacterWidthAfterTileXOrigin(colIndex, characterXPosition, characterWidth) {
        return characterXPosition + characterWidth >= this.mapTSize * colIndex
    },
    isCharacterHeightOverTileYOrigin(rowIndex, characterPositionY, characterHeight) {
        return characterPositionY + characterHeight + 5 >= this.map.getTileYAxis(rowIndex)
    },
    isCharacterXOriginBeforeTileWidth(colIndex, characterXPosition) {
        return characterXPosition <= this.mapTSize * colIndex + this.mapTSize
    },
    isCharacterYOrigingOverTileYWidth(rowIndex, characterYPosition, characterHeight) {
        return characterYPosition <= this.map.getTileYAxis(rowIndex) + this.mapTSize / 10 - characterHeight
    },
    isSomeTileColliding(row, rowIndex, characterPosition, characterSize) {
        return row.some((col, colIndex) => {
            return (
                col &&
                this.isCharacterWidthAfterTileXOrigin(colIndex, characterPosition.x, characterSize.w) &&
                this.isCharacterHeightOverTileYOrigin(rowIndex, characterPosition.y, characterSize.h) &&
                this.isCharacterXOriginBeforeTileWidth(colIndex, characterPosition.x) &&
                this.isCharacterYOrigingOverTileYWidth(rowIndex, characterPosition.y, characterSize.h)
            )

        })
    },
    managePlayerCollisionWithPlatforms() {
        if (!this.map.layer.some((row, rowIndex) => {
                if (this.isSomeTileColliding(row, rowIndex, this.player.playerPosition, this.player.playerSize)) {
                    if (this.player.isFalling) {
                        this.player.basePosition.y = this.map.getTileYAxis(rowIndex)
                        this.player.setPlayerToStaticPosition()
                    }
                    return true
                }
            })) {
            if (!this.player.isJumping) {
                this.player.playerVelocity.y = -this.cameraVelocity
                this.player.playerPosition.y -= this.player.playerVelocity.y
            }
        }
    },
    manageEnemiesCollisonWithPlatforms() {
        this.enemies.forEach(enem => {
            if (!this.map.layer.some((row, rowIndex) => {
                    if (this.isSomeTileColliding(row, rowIndex, enem.enemiePosition, enem.enemieSize)) {
                        enem.enemieVelocity.y = 0
                        enem.enemiePosition.y = this.map.getTileYAxis(rowIndex) - enem.enemieSize.h
                    }
                })) {
                //if (this.isCharacterHeightOverTileYOrigin(rowIndex, enem.enemiePosition.y, enem.enemieSize.h)) {
                enem.enemieVelocity.y = -6
                enem.enemiePosition.y -= enem.enemieVelocity.y
                //}

                //Si no hay colisión, entonces haz Y Para este enemigo
                //enem.enemieVelocity.x = -enem.enemieVelocity.x
            }
        })
    },

    drawEnemiesWhenMoving() {
        this.enemies.forEach(enem => enem.enemiePosition.y += 10)
    }
}