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
    map: undefined,
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
        this.basePosition.y = this.canvasSize.h - (this.canvasSize.w / 20) * 2 //Hardcoded habrá que mirar cómo ponerlo mejor
        this.canvasDom.setAttribute('width', this.canvasSize.w)
        this.canvasDom.setAttribute('height', this.canvasSize.h)
    },

    startGame() {
        this.background = new Background(this.ctx, this.canvasSize, "images/skybackground.jpeg")
        this.map = new Map(this.ctx, 20, 40, this.canvasSize)
        this.player = new Player(this.ctx, this.canvasSize, this.basePosition.y, "images/running-bothsides.png", 16, this.keys)
        this.enemies.push(new FloorEnemie(this.ctx, "images/floor-enemie-1.png", 2, this.framesCounter, 400, this.canvasSize.w / 20 * 8, 70, 70, 1, 1, this.canvasSize.w, 0), new FloorEnemie(this.ctx, "images/floor-enemie-1.png", 2, this.framesCounter, 400, this.basePosition.y, 70, 70, 1, 1, this.canvasSize.w, 0))

        this.background.createBackground()
        this.player.createImgPlayer()
        this.enemies.forEach(elm => elm.createImgEnemie())


        this.intervalId = setInterval(() => {
            this.clearGame()
            this.background.drawBackground()
            this.map.drawMap(this.player)
            this.player.drawPlayer(this.framesCounter)
            this.enemies.forEach(elm => elm.drawFloorEnemie(this.framesCounter))
            //this.isCollidingEnemies() ? console.log("colliding with enemie") : null
            this.player.playerVelocity.y < 0 ? this.player.isFalling = true : this.player.isFalling = false
            this.isCollidingPlatforms(this.canvasSize.w / 20)

            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++

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
        let trace = ""
        if (!this.map.layer.some((row, j) => {
                if (row.some((col, i) => {
                        if (col === 7 && j === 38) {
                            trace += `1: ${this.player.playerPosition.x + this.player.playerSize.w >= tSize * i}, 
                                2: ${this.player.playerPosition.y + this.player.playerSize.h >= this.map.getTileYAxis(j)}, 
                                3: ${this.player.playerPosition.x <= tSize * i + tSize}
                                4: ${this.player.playerPosition.y <= this.map.getTileYAxis(j) + tSize / 10 - this.player.playerSize.w}, col:${col}  
                                ${this.player.playerPosition.y}, ${this.player.playerSize.h}, ${this.map.getTileYAxis(j)}, 
                                row: ${i}\n`
                        }

                        if (col &&
                            this.player.playerPosition.x + this.player.playerSize.w >= tSize * i && //is playerx+width after the X tile ?  
                            this.player.playerPosition.y + this.player.playerSize.h + 5 >= this.map.getTileYAxis(j) /*.toFixed(6)*/ &&
                            //is playery+height after the y tile ? 
                            this.player.playerPosition.x <= tSize * i + tSize &&
                            //is playerPosition before tilepositionX + width?
                            this.player.playerPosition.y <= this.map.getTileYAxis(j) + tSize / 10 - this.player.playerSize.w)
                        //is playerPosition before tilepositionX + height?
                        {
                            return true
                        }
                    })) {
                    if (this.player.isFalling) {
                        this.player.basePosition.y = this.map.getTileYAxis(j)
                        this.setPlayerToStaticPosition()
                    }

                    return true
                }
            })) {
            if (!this.player.isJumping) {
                console.log(`HIIII \n ${trace}`)
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
    }

}