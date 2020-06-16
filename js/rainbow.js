class Rainbow {
    constructor(ctx, playerPosition, playerSize, isPlayerFacingRight) {
        this.ctx = ctx
        this.playerPosition = playerPosition
        this.playerSize = playerSize
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
            h: 40,
            maxW: 250
        }
        this.growVel = 5
        this.isPlayerFacingRight = isPlayerFacingRight
        this.rainbowColors = ["#ff0000", "#ffa500", "#ffff00", "#008000", "#0000ff", "#4b0082", "#ee82ee"]
    }
    createRightRainbow(mapMargin) {
        this.rainbowColors.forEach((elm, i) => {
            this.ctx.fillStyle = elm
            this.ctx.fillRect(
                this.rainbowPosition.facingRigth.x,
                this.rainbowPosition.facingRigth.y + (this.rainbowSize.h / this.rainbowColors.length) * i - mapMargin,
                this.rainbowSize.w,
                this.rainbowSize.h / this.rainbowColors.length)
        });
    }
    createLeftRainbow(mapMargin) {
        this.rainbowColors.forEach((elm, i) => {
            this.ctx.fillStyle = elm
            this.ctx.fillRect(
                this.rainbowPosition.facingLeft.x - this.rainbowSize.w,
                this.rainbowPosition.facingLeft.y + (this.rainbowSize.h / this.rainbowColors.length) * i - mapMargin,
                this.rainbowSize.w,
                this.rainbowSize.h / this.rainbowColors.length)
        });
    }

    drawRainbow(mapMargin) {
        if (this.isPlayerFacingRight) {
            if (this.rainbowSize.w >= this.rainbowSize.maxW) {
                this.createRightRainbow(mapMargin)
                return
            }
            this.rainbowSize.w += this.growVel
            this.createRightRainbow(mapMargin)
        } else {
            if (this.rainbowSize.w >= this.rainbowSize.maxW) {
                this.createLeftRainbow(mapMargin)
                return
            }
            this.rainbowSize.w += this.growVel
            this.createLeftRainbow(mapMargin)

        }
    }
}