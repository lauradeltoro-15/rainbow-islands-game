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
        this.map = new Map(this.ctx, this.mapCols, this.mapRows, this.mapTSize, this.canvasSize, this.higherPlayerPosition)
        this.player = new Player(this.ctx, this.canvasSize, this.basePosition.y, "images/running-bothsides.png", 16, this.keys)
        this.enemies.push(new FloorEnemie(this.ctx, "images/floor-enemie-1.png", 2, this.framesCounter, 400, this.canvasSize.w / 20 * 8, 70, 70, 1, 1, this.canvasSize.w, 0), new FloorEnemie(this.ctx, "images/floor-enemie-1.png", 2, this.framesCounter, 400, this.basePosition.y, 70, 70, 1, 1, this.canvasSize.w, 0))

        this.background.createBackground()
        this.player.createImgPlayer()
        this.enemies.forEach(enemie => enemie.createImgEnemie())


        this.intervalId = setInterval(() => {
            this.clearGame()
            this.background.drawBackground()
            this.map.drawMap(this.player)
            this.player.drawPlayer(this.framesCounter)
            this.enemies.forEach(enemie => enemie.drawFloorEnemie(this.framesCounter))
            //this.isCollidingEnemies() ? console.log("colliding with enemie") : null
            this.player.playerVelocity.y < 0 ? this.player.isFalling = true : this.player.isFalling = false
            this.isCollidingPlatforms(this.canvasSize.w / 20)

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
    isCollidingPlatforms(tSize) {
        if (!this.map.layer.some((row, rowIndex) => {
                if (row.some((col, colIndex) => {
                        if (col &&
                            this.isCharacterWidthAfterTileXOrigin(colIndex, this.player.playerPosition.x, this.player.playerSize.w) &&
                            this.isCharacterHeightOverTileYOrigin(rowIndex, this.player.playerPosition.y, this.player.playerSize.h) &&
                            this.isCharacterXOriginBeforeTileWidth(colIndex, this.player.playerPosition.x) &&
                            this.isCharacterYOrigingOverTileYWidth(rowIndex, this.player.playerPosition.y, this.player.playerSize.h)) {
                            return true
                        }
                    })) {
                    if (this.player.isFalling) {
                        this.player.basePosition.y = this.map.getTileYAxis(rowIndex)
                        this.setPlayerToStaticPosition()
                    }

                    return true
                }
            })) {
            if (!this.player.isJumping) {
                this.player.playerVelocity.y = -10
                this.player.playerPosition.y -= this.player.playerVelocity.y
                this.drawEnemiesWhenMoving()

            }

        }
    },
    setPlayerToStaticPosition() {
        this.player.playerImg.framesIndex = 0
        this.player.isJumping = false
        this.player.jumpDirection = undefined
        this.player.playerVelocity.y = 10
        this.player.playerVelocity.x = 15
        this.player.isFacingRight ? this.player.playerImg.framesIndex = 8 : this.player.playerImg.framesIndex = 7
    },
    drawEnemiesWhenMoving() {
        this.enemies.forEach(enem => enem.enemiePosition.y += 10)
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
}