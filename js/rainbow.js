class Rainbow {
    constructor(ctx, playerPosition, playerSize, isPlayerFacingRight, actualRainbowDirection) {
        this.ctx = ctx
        this.playerPosition = playerPosition
        this.playerSize = playerSize
        this.actualRainbowDirection = actualRainbowDirection
        this.isErasing = false
        this.rainbowCounter = 0
        this.superRainbowCounter = 0
        this.growVel = 5
        this.superGrowVel = 7
        this.isPlayerFacingRight = isPlayerFacingRight
        this.rainbowToDraw = {
            y: 0
        }
        this.rainbowPosition = {
            facingLeft: {
                x: this.playerPosition.x,
                y: this.playerPosition.y + 30
            },
            facingRigth: {
                x: this.playerPosition.x + this.playerSize.w,
                y: this.playerPosition.y + 30
            }
        }
        this.rainbowSize = {
            w: 0,
            h: 65,
            maxW: 300,
            superMaxW: 600,

        }
        this.rainbowColors = ["#ED2224", "#EF4B26", "#F1772F", "#F9A23A", "#FBD11B", "#FFEB00", "#BFD721", "#91C73D", "#34A742", "#039453", "#1790A5", "##268AE2", "#2B5AB6", "#372D8D", "#4B2481"]
    }
    createRightRainbow() {
        this.rainbowColors.forEach((elm, i) => {
            this.ctx.fillStyle = elm
            this.ctx.fillRect(
                this.rainbowPosition.facingRigth.x,
                this.rainbowPosition.facingRigth.y + (this.rainbowSize.h / this.rainbowColors.length) * i + this.rainbowToDraw.y,
                this.rainbowSize.w,
                this.rainbowSize.h / this.rainbowColors.length)
        });
    }
    createLeftRainbow() {
        this.rainbowColors.forEach((elm, i) => {
            this.ctx.fillStyle = elm
            this.ctx.fillRect(
                this.rainbowPosition.facingLeft.x - this.rainbowSize.w,
                this.rainbowPosition.facingLeft.y + (this.rainbowSize.h / this.rainbowColors.length) * i + this.rainbowToDraw.y,
                this.rainbowSize.w,
                this.rainbowSize.h / this.rainbowColors.length)
        });
    }
    drawRainbow(higherPlayerPosition, player, cameraVelocity) {
        player.playerPosition.y <= higherPlayerPosition && !player.isJumping ? this.setOffsetInRainbow(cameraVelocity) : null
        if (this.isPlayerFacingRight) {
            if (this.rainbowSize.w >= this.rainbowSize.maxW || this.isErasing) {
                this.createRightRainbow()
                return
            }
            this.rainbowSize.w += this.growVel
            this.createRightRainbow()
        } else {
            if (this.rainbowSize.w >= this.rainbowSize.maxW || this.isErasing) {
                this.createLeftRainbow()
                return
            }
            this.rainbowSize.w += this.growVel
            this.createLeftRainbow()

        }
    }
    drawSuperRainbow(higherPlayerPosition, player, cameraVelocity) {
        player.playerPosition.y <= higherPlayerPosition && !player.isJumping ? this.setOffsetInRainbow(cameraVelocity) : null
        if (this.isPlayerFacingRight) {
            if (this.rainbowSize.w >= this.rainbowSize.superMaxW || this.isErasing) {
                this.createRightRainbow()
                return
            }
            this.rainbowSize.w += this.superGrowVel
            this.createRightRainbow()
        } else {
            if (this.rainbowSize.w >= this.rainbowSize.superMaxW || this.isErasing) {
                this.createLeftRainbow()
                return
            }
            this.rainbowSize.w += this.superGrowVel
            this.createLeftRainbow()
        }
    }
    setOffsetInRainbow(cameraVelocity) {
        this.rainbowToDraw.y += cameraVelocity
    }
}